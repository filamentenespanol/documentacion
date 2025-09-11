---
title: Recursos singulares
---

## Visión general

Los recursos no son la única manera de interactuar con registros Eloquent en un panel de Filament. Aunque los recursos pueden resolver muchos de tus requerimientos, la página "index" (raíz) de un recurso contiene una tabla con la lista de registros de ese recurso.

A veces no es necesario tener una tabla que liste registros en un recurso. Solo existe un único registro con el que el usuario interactúa. Si ese registro aún no existe cuando el usuario visita la página, se crea al enviar el formulario por primera vez. Si el registro ya existe, se carga en el formulario cuando la página se abre y se actualiza cuando el formulario es enviado.

Por ejemplo, un CMS podría tener un modelo Eloquent `Page` y un `PageResource`, pero también puedes querer crear una página singular fuera de `PageResource` para editar la "homepage" del sitio web. Esto permite al usuario editar directamente la página de inicio sin tener que navegar a `PageResource` y encontrar el registro correspondiente en la tabla.

Otros ejemplos incluyen una página de "Configuración" o una página de "Perfil" para el usuario autenticado. Para estos casos, sin embargo, recomendamos usar el [plugin Spatie Settings](/plugins/filament-spatie-settings) y las características de [Perfil](../users#authentication-features) de Filament, que requieren menos código para implementarse.

## Crear un recurso singular

Aunque no existe una característica específica llamada "recurso singular" en Filament, es un comportamiento muy solicitado y puede implementarse fácilmente usando una [página personalizada](../navigation/custom-pages) con un [formulario](../forms). Esta guía explica cómo hacerlo.

Primero, crea una [página personalizada](../navigation/custom-pages):

```bash
php artisan make:filament-page ManageHomepage
```

Este comando creará dos archivos:  
- Una clase de página en el directorio `/Filament/Pages` de tu aplicación.  
- Una vista Blade en el directorio `/filament/pages` de tus vistas de recurso.

La clase de la página debería contener los siguientes elementos:
- Una propiedad `$data`, que contendrá el estado actual del formulario.  
- Un método `mount()`, que cargará el registro actual desde la base de datos y llenará el formulario con esa información. Si el registro no existe, se pasará `null` al método `fill()` del formulario, lo que asignará los valores por defecto a los campos.  
- Un método `form()`, que definirá el esquema del formulario. Este debe contener los campos en `components()`. El método `record()` se usa para especificar el registro desde el cual cargar datos de relaciones. El método `statePath()` se usa para especificar el nombre de la propiedad donde se guardará el estado (`$data`).  
- Un método `save()`, que guardará los datos del formulario en la base de datos. El método `getState()` ejecuta la validación y devuelve los datos correctos. Debe comprobarse si el registro ya existe; si no, crear uno nuevo. La propiedad `wasRecentlyCreated` del modelo puede usarse para determinar si el registro se acaba de crear, y en tal caso, guardar también sus relaciones. Se envía una notificación al usuario al confirmar que se guardó.  
- Un método `getRecord()`, no es obligatorio, pero es recomendable. Devuelve el registro Eloquent que el formulario está editando. Puedes usarlo en otros métodos para evitar duplicar código.

```php
namespace App\Filament\Pages;

use App\Models\WebsitePage;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Schema;

/**
 * @property-read Schema $form
 */
class ManageHomepage extends Page
{
    /**
    * @var array<string, mixed> | null
    */
    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill($this->getRecord()?->attributesToArray());
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                RichEditor::make('content'),
                // ...
            ])
            ->record($this->getRecord())
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        $record = $this->getRecord();

        if (! $record) {
            $record = new WebsitePage();
            $record->is_homepage = true;
        }

        $record->fill($data);
        $record->save();

        if ($record->wasRecentlyCreated) {
            $this->form->record($record)->saveRelationships();
        }

        Notification::make()
            ->success()
            ->title('Guardado')
            ->send();
    }

    public function getRecord(): ?WebsitePage
    {
        return WebsitePage::query()
            ->where('is_homepage', true)
            ->first();
    }
}
```

La vista Blade de la página debería renderizar el formulario y un botón Guardar. La directiva `wire:submit` debe usarse para llamar al método `save()` cuando se envíe el formulario:

```blade
<x-filament::page>
    <form wire:submit="save">
        {{ $this->form }}

        <div>
            <x-filament::button type="submit">
                Guardar
            </x-filament::button>
        </div>
    </form>
</x-filament::page>
```
