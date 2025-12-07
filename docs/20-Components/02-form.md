---
title: Representar un formulario en una vista Blade
---

:::warning
    Antes de continuar, asegúrese de que `filament/forms` esté instalado en su proyecto. Puedes comprobarlo ejecutando:

```bash
    composer show filament/forms
    ```
    Si no está instalado, consulte la [guía de instalación](../introduction/installation#installing-the-individual-components) y configure los **componentes individuales** según las instrucciones.
:::

## Configurando el componente Livewire

Primero, genere un nuevo componente Livewire:

```bash
php artisan make:livewire CreatePost
```

Luego, renderice su componente Livewire en la página:

```blade
@livewire('create-post')
```

Alternativamente, puede utilizar un componente Livewire de página completa:

```php
use App\Livewire\CreatePost;
use Illuminate\Support\Facades\Route;

Route::get('posts/create', CreatePost::class);
```

## Agregando el formulario

:::warning
    Antes de continuar, asegúrese de que el **paquete de formularios** esté instalado en su proyecto. Consulte la [guía de instalación](../introduction/installation#installing-the-individual-components) y configure los **componentes individuales** según las instrucciones.
:::

Hay 5 tareas principales al agregar un formulario a una clase de componente Livewire. Cada uno es esencial:

1) Implemente la interfaz `HasSchemas` y ​​use el rasgo `InteractsWithSchemas`.
2) Defina una propiedad pública Livewire para almacenar los datos de su formulario. En nuestro ejemplo, lo llamaremos `$data`, pero puedes llamarlo como quieras.
3) Agrega un método `form()`, que es donde configuras el formulario. [Agregue el esquema del formulario] (primeros pasos#esquemas de formulario) y dígale a Filament que almacene los datos del formulario en la propiedad `$data` (usando `statePath('data')`).
4) Inicialice el formulario con `$this->form->fill()` en `mount()`. Esto es imperativo para cada formulario que cree, incluso si no tiene datos iniciales.
5) Defina un método para manejar el envío del formulario. En nuestro ejemplo, lo llamaremos `create()`, pero puedes llamarlo como quieras. Dentro de ese método, puedes validar y obtener los datos del formulario usando `$this->form->getState()`. Es importante que utilice este método en lugar de acceder directamente a la propiedad `$this->data`, porque los datos del formulario deben validarse y transformarse a un formato útil antes de ser devueltos.

```php
<?php

namespace App\Livewire;

use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Illuminate\Contracts\View\View;
use Filament\Schemas\Schema;
use Livewire\Component;

class CreatePost extends Component implements HasSchemas
{
    use InteractsWithSchemas;
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $this->form->fill();
    }
    
    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                MarkdownEditor::make('content'),
                // ...
            ])
            ->statePath('data');
    }
    
    public function create(): void
    {
        dd($this->form->getState());
    }
    
    public function render(): View
    {
        return view('livewire.create-post');
    }
}
```

Finalmente, en la vista de su componente Livewire, renderice el formulario:

```blade
<div>
    <form wire:submit="create">
        {{ $this->form }}
        
        <button type="submit">
            Submit
        </button>
    </form>
    
    <x-filament-actions::modals />
</div>
```

:::info
    `<x-filament-actions::modals />` se utiliza para representar el componente del formulario [modales de acción](../esquemas/acciones). El código se puede colocar en cualquier lugar fuera del elemento `<form>`, siempre que esté dentro del componente Livewire.
:::

Visite su componente Livewire en el navegador y debería ver los componentes del formulario de `components()`:

Envíe el formulario con los datos y verá los datos del formulario volcados en la pantalla. Puede guardar los datos en un modelo en lugar de volcarlos:

```php
use App\Models\Post;

public function create(): void
{
    Post::create($this->form->getState());
}
```

:::info
    `filament/forms` también incluye los siguientes paquetes:

- `filament/actions`
    - `filament/schemas`
    - `filament/support`
    
Estos paquetes le permiten utilizar sus componentes dentro de los componentes de Livewire.
    Por ejemplo, si su formulario usa [Acciones](../acciones), recuerde implementar la interfaz `HasActions` y ​​usar el rasgo `InteractsWithActions` en su clase de componente Livewire.
    
Si está utilizando otros [componentes de filamento] (descripción general#componentes del paquete) en su formulario, asegúrese de instalar e integrar también el paquete correspondiente.
:::

## Inicializando el formulario con datos

Para llenar el formulario con datos, simplemente pase esos datos al método `$this->form->fill()`. Por ejemplo, si estás editando una publicación existente, puedes hacer algo como esto:

```php
use App\Models\Post;

public function mount(Post $post): void
{
    $this->form->fill($post->attributesToArray());
}
```

Es importante que utilices el método `$this->form->fill()` en lugar de asignar los datos directamente a la propiedad `$this->data`. Esto se debe a que los datos de la publicación deben transformarse internamente a un formato útil antes de almacenarse.

## Estableciendo un modelo de formulario

Dar acceso a `$form` a un modelo es útil por varias razones:

- Permite que los campos dentro de ese formulario carguen información de ese modelo. Por ejemplo, los campos seleccionados pueden [cargar sus opciones desde la base de datos](fields/select#integrating-with-an-eloquent-relationship) automáticamente.
- El formulario puede cargar y guardar los datos de relación del modelo automáticamente. Por ejemplo, tiene un formulario Editar publicación, con un [Repetidor](campos/repetidor#integrándose-con-una-relación-elocuente) que administra los comentarios asociados con esa publicación. Filament cargará automáticamente los comentarios de esa publicación cuando llames a `$this->form->fill([...])` y ​​los guardará en la relación cuando llames a `$this->form->getState()`.
- Las reglas de validación como `exists()` y ​​`unique()` pueden recuperar automáticamente el nombre de la tabla de la base de datos del modelo.

Se aconseja pasar siempre el modelo al formulario cuando lo haya. Como se explicó, desbloquea muchos poderes nuevos del sistema de forma de Filament.

Para pasar el modelo al formulario, utilice el método `$form->model()`:

```php
use Filament\Schemas\Schema;

public Post $post;

public function form(Schema $schema): Schema
{
    return $schema
        ->components([
            // ...
        ])
        ->statePath('data')
        ->model($this->post);
}
```

### Pasar el modelo de formulario después de enviar el formulario

En algunos casos, el modelo del formulario no está disponible hasta que se haya enviado el formulario. Por ejemplo, en un formulario Crear publicación, la publicación no existe hasta que se envía el formulario. Por lo tanto, no puede pasarlo a `$form->model()`. Sin embargo, puedes pasar una clase modelo en su lugar:

```php
use App\Models\Post;
use Filament\Schemas\Schema;

public function form(Schema $schema): Schema
{
    return $schema
        ->components([
            // ...
        ])
        ->statePath('data')
        ->model(Post::class);
}
```

Por sí solo, esto no es tan poderoso como pasar una instancia de modelo. Por ejemplo, las relaciones no se guardarán en la publicación una vez creada. Para hacer eso, deberá pasar la publicación al formulario después de haberla creado y llamar a `saveRelationships()` para guardar las relaciones:

```php
use App\Models\Post;

public function create(): void
{
    $post = Post::create($this->form->getState());
    
    // Save the relationships from the form to the post after it is created.
    $this->form->model($post)->saveRelationships();
}
```

## Guardar datos del formulario en propiedades individuales

En todos nuestros ejemplos anteriores, hemos estado guardando los datos del formulario en la propiedad pública `$data` en el componente Livewire. Sin embargo, puede guardar los datos en propiedades individuales. Por ejemplo, si tiene un formulario con un campo `title`, puede guardar los datos del formulario en la propiedad `$title`. Para hacer esto, no pase un `statePath()` al formulario en absoluto. Asegúrese de que todos sus campos tengan sus propias propiedades **públicas** en la clase.

```php
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

public ?string $title = null;

public ?string $content = null;

public function form(Schema $schema): Schema
{
    return $schema
        ->components([
            TextInput::make('title')
                ->required(),
            MarkdownEditor::make('content'),
            // ...
        ]);
}
```

## Usando múltiples formularios

Se pueden definir muchas formas utilizando el rasgo `InteractsWithSchemas`. Cada uno de los formularios debe utilizar un método con el mismo nombre:

```php
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

public ?array $postData = [];

public ?array $commentData = [];

public function editPostForm(Schema $schema): Schema
{
    return $schema
        ->components([
            TextInput::make('title')
                ->required(),
            MarkdownEditor::make('content'),
            // ...
        ])
        ->statePath('postData')
        ->model($this->post);
}

public function createCommentForm(Schema $schema): Schema
{
    return $schema
        ->components([
            TextInput::make('name')
                ->required(),
            TextInput::make('email')
                ->email()
                ->required(),
            MarkdownEditor::make('content')
                ->required(),
            // ...
        ])
        ->statePath('commentData')
        ->model(Comment::class);
}
```

Ahora, se puede acceder a cada formulario por su nombre en lugar de `form`. Por ejemplo, para completar el formulario de publicación, puede usar `$this->editPostForm->fill([...])`, o para obtener los datos del formulario de comentarios puede usar `$this->createCommentForm->getState()`.

Notarás que cada formulario tiene su propio `statePath()`. Cada formulario escribirá su estado en una matriz diferente en su componente Livewire, por lo que es importante definir las propiedades públicas, `$postData` y ​​`$commentData` en este ejemplo.

## Restablecer los datos de un formulario

Puede restablecer un formulario a sus datos predeterminados en cualquier momento llamando a `$this->form->fill()`. Por ejemplo, es posible que desees borrar el contenido de un formulario cada vez que se envía:

```php
use App\Models\Comment;

public function createComment(): void
{
    Comment::create($this->form->getState());

    // Reinitialize the form to clear its data.
    $this->form->fill();
}
```

## Generando componentes de formulario Livewire con la CLI

Se recomienda que aprenda cómo configurar un componente Livewire con formularios manualmente, pero una vez que esté seguro, puede usar la CLI para generar un formulario.

```bash
php artisan make:filament-livewire-form RegistrationForm
```

Esto generará un nuevo componente `app/Livewire/RegistrationForm.php`, que puedes personalizar.

### Generando un formulario para un modelo Eloquent

Filament también puede generar formularios para un modelo Eloquent específico. Estos son más poderosos, ya que guardarán automáticamente los datos en el formulario y [asegúrese de que los campos del formulario estén configurados correctamente](#setting-a-form-model) para acceder a ese modelo.

Al generar un formulario con el comando `make:livewire-form`, pedirá el nombre del modelo:

```bash
php artisan make:filament-livewire-form Products/CreateProduct
```

#### Generando un formulario de edición para un registro de Eloquent

De forma predeterminada, pasar un modelo al comando `make:livewire-form` dará como resultado un formulario que crea un nuevo registro en su base de datos. Si pasa el indicador `--edit` al comando, generará un formulario de edición para un registro específico. Esto completará automáticamente el formulario con los datos del registro y guardará los datos en el modelo cuando se envíe el formulario.

```bash
php artisan make:filament-livewire-form Products/EditProduct --edit
```

### Generar esquemas de formulario automáticamente

Filament también puede adivinar qué campos de formulario desea en el esquema, según las columnas de la base de datos del modelo. Puede utilizar la bandera `--generate` al generar su formulario:

```bash
php artisan make:filament-livewire-form Products/CreateProduct --generate
```
