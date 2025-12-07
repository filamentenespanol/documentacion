---
title: Representar una acción en un componente Livewire
---

:::warning
    Antes de continuar, asegúrese de que `filament/actions` esté instalado en su proyecto. Puedes comprobarlo ejecutando:

```bash
    composer show filament/actions
    ```
    Si no está instalado, consulte la [guía de instalación](../introduction/installation#installing-the-individual-components) y configure los **componentes individuales** según las instrucciones.
:::

## Configurando el componente Livewire

Primero, genere un nuevo componente Livewire:

```bash
php artisan make:livewire ManagePost
```

Luego, renderice su componente Livewire en la página:

```blade
@livewire('manage-post')
```

Alternativamente, puede utilizar un componente Livewire de página completa:

```php
use App\Livewire\ManagePost;
use Illuminate\Support\Facades\Route;

Route::get('posts/{post}/manage', ManagePost::class);
```

Debe utilizar los rasgos `InteractsWithActions` y ​​`InteractsWithSchemas` e implementar las interfaces `HasActions` y ​​`HasSchemas` en su clase de componente Livewire:

```php
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Livewire\Component;

class ManagePost extends Component implements HasActions, HasSchemas
{
    use InteractsWithActions;
    use InteractsWithSchemas;

    // ...
}
```

## Agregar la acción

Agregue un método que devuelva su acción. El método debe compartir exactamente el mismo nombre que la acción, o el nombre seguido de `Action`:

```php
use App\Models\Post;
use Filament\Actions\Action;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Livewire\Component;

class ManagePost extends Component implements HasActions, HasSchemas
{
    use InteractsWithActions;
    use InteractsWithSchemas;

    public Post $post;

    public function deleteAction(): Action
    {
        return Action::make('delete')
            ->color('danger')
            ->requiresConfirmation()
            ->action(fn () => $this->post->delete());
    }
    
    // This method name also works, since the action name is `delete`:
    // public function delete(): Action
    
    // This method name does not work, since the action name is `delete`, not `deletePost`:
    // public function deletePost(): Action

    // ...
}
```

Finalmente, necesitas representar la acción en tu vista. Para hacer esto, puedes usar `{{ $this->deleteAction }}`, donde reemplazas `deleteAction` con el nombre de tu método de acción:

```blade
<div>
    {{ $this->deleteAction }}

    <x-filament-actions::modals />
</div>
```

También necesita `<x-filament-actions::modals />` que inyecta el HTML necesario para representar los modales de acción. Esto solo debe incluirse dentro del componente Livewire una vez, independientemente de cuántas acciones tenga para ese componente.

:::info
    `filament/actions` también incluye los siguientes paquetes:
    
- `filament/forms`
    - `filament/infolists`
    - `filament/notifications`
    - `filament/support`
    
Estos paquetes le permiten utilizar sus componentes dentro de los componentes de Livewire.
    Por ejemplo, si su acción utiliza [Notificaciones](notificaciones), recuerde incluir `@livewire('notifications')` en su diseño y agregue `@import '../../vendor/filament/notifications/resources/css/index.css'` a su archivo CSS.
    
Si está utilizando otros [componentes de filamento] (descripción general#componentes del paquete) en su acción, asegúrese de instalar e integrar también el paquete correspondiente.
:::

## Pasar argumentos de acción

A veces, es posible que desees transmitir argumentos a tu acción. Por ejemplo, si representa la misma acción varias veces en la misma vista, pero cada vez para un modelo diferente, puede pasar el ID del modelo como argumento y luego recuperarlo más tarde. Para hacer esto, puedes invocar la acción en tu vista y pasar los argumentos como una matriz:

```php
<div>
    @foreach ($posts as $post)
        <h2>{{ $post->title }}</h2>

        {{ ($this->deleteAction)(['post' => $post->id]) }}
    @endforeach

    <x-filament-actions::modals />
</div>
```

Ahora puedes acceder al ID de la publicación en tu método de acción:

```php
use App\Models\Post;
use Filament\Actions\Action;

public function deleteAction(): Action
{
    return Action::make('delete')
        ->color('danger')
        ->requiresConfirmation()
        ->action(function (array $arguments) {
            $post = Post::find($arguments['post']);

            $post?->delete();
        });
}
```

## Ocultar acciones en una vista Livewire

Si usa `hidden()` o `visible()` para controlar si se representa una acción, debe envolver la acción en una verificación `@if` para `isVisible()`:

```blade
<div>
    @if ($this->deleteAction->isVisible())
        {{ $this->deleteAction }}
    @endif
    
    {{-- Or --}}
    
    @if (($this->deleteAction)(['post' => $post->id])->isVisible())
        {{ ($this->deleteAction)(['post' => $post->id]) }}
    @endif
</div>
```

Los métodos `hidden()` y ​​`visible()` también controlan si la acción es `disabled()`, por lo que siguen siendo útiles para proteger la acción para que no se ejecute si el usuario no tiene permiso. Encapsular esta lógica en el `hidden()` o `visible()` de la acción en sí es una buena práctica; de lo contrario, deberá definir la condición en la vista y en `disabled()`.

También puedes aprovechar esto para ocultar cualquier elemento envolvente que quizás no necesite renderizarse si la acción está oculta:

```blade
<div>
    @if ($this->deleteAction->isVisible())
        <div>
            {{ $this->deleteAction }}
        </div>
    @endif
</div>
```

## Agrupar acciones en una vista Livewire

Puede [agrupar acciones en un menú desplegable](acciones de agrupación) utilizando el componente Blade `<x-filament-actions::group>`, pasando la matriz `actions` como atributo:

```blade
<div>
    <x-filament-actions::group :actions="[
        $this->editAction,
        $this->viewAction,
        $this->deleteAction,
    ]" />

    <x-filament-actions::modals />
</div>
```

También puede pasar cualquier atributo para personalizar la apariencia del botón de activación y el menú desplegable:

```blade
<div>
    <x-filament-actions::group
        :actions="[
            $this->editAction,
            $this->viewAction,
            $this->deleteAction,
        ]"
        label="Actions"
        icon="heroicon-m-ellipsis-vertical"
        color="primary"
        size="md"
        tooltip="More actions"
        dropdown-placement="bottom-start"
    />

    <x-filament-actions::modals />
</div>
```

## Encadenamiento de acciones

Puedes encadenar varias acciones juntas llamando al método `replaceMountedAction()` para reemplazar la acción actual por otra cuando haya finalizado:

```php
use App\Models\Post;
use Filament\Actions\Action;

public function editAction(): Action
{
    return Action::make('edit')
        ->schema([
            // ...
        ])
        // ...
        ->action(function (array $arguments) {
            $post = Post::find($arguments['post']);

            // ...

            $this->replaceMountedAction('publish', $arguments);
        });
}

public function publishAction(): Action
{
    return Action::make('publish')
        ->requiresConfirmation()
        // ...
        ->action(function (array $arguments) {
            $post = Post::find($arguments['post']);

            $post->publish();
        });
}
```

Ahora, cuando se envíe la primera acción, se abrirá la segunda acción en su lugar. Los [argumentos](#passing-action-arguments) que se pasaron originalmente a la primera acción se pasan a la segunda acción, por lo que puede usarlos para conservar datos entre solicitudes.

Si se cancela la primera acción, la segunda no se abre. Si se cancela la segunda acción, la primera ya se ejecutó y no se puede cancelar.

## Activar acciones programáticamente

A veces, es posible que necesite activar una acción sin que el usuario haga clic en el botón de activación integrado, especialmente desde JavaScript. A continuación se muestra una acción de ejemplo que podría registrarse en un componente Livewire:

```php
use Filament\Actions\Action;

public function testAction(): Action
{
    return Action::make('test')
        ->requiresConfirmation()
        ->action(function (array $arguments) {
            dd('Test action called', $arguments);
        });
}
```

Puede desencadenar esa acción haciendo clic en su HTML usando el atributo `wire:click`, llamando al método `mountAction()` y ​​opcionalmente pasando cualquier argumento que desee que esté disponible:

```blade
<button wire:click="mountAction('test', { id: 12345 })">
    Button
</button>
```

Para activar esa acción desde JavaScript, puede usar la [utilidad`$wire`](https://livewire.laravel.com/docs/alpine#controlling-livewire-from-alpine-using-wire), pasando los mismos argumentos:

```js
$wire.mountAction('test', { id: 12345 })
```
