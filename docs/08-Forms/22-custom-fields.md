---
title: Custom fields
---

## Introducción

Los componentes de Livewire son clases PHP que mantienen su estado en el navegador del usuario. Cuando se realiza una solicitud de red, el estado se envía al servidor y se rellena en propiedades públicas de la clase del componente Livewire, donde puede accederse a él como a cualquier otra propiedad de clase en PHP.

Imagina que tienes un componente Livewire con una propiedad pública llamada `$name`. Podrías enlazar esa propiedad a un campo input en el HTML del componente Livewire de dos maneras: con el atributo [`wire:model`](https://livewire.laravel.com/docs/properties#data-binding), o [entrelazándola](https://livewire.laravel.com/docs/javascript#the-wire-object) con una propiedad de Alpine.js:

```blade
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <input wire:model="name" />

    <!-- O -->

    <div x-data="{ state: $wire.$entangle('name') }">
        <input x-model="state" />
    </div>
</x-dynamic-component>
```

Cuando el usuario teclea en el campo, la propiedad `$name` se actualiza en la clase del componente Livewire. Cuando el usuario envía el formulario, la propiedad `$name` se envía al servidor, donde puede guardarse.

Esta es la base de cómo funcionan los campos en Filament. Cada campo se asigna a una propiedad pública en la clase del componente Livewire, que es donde se almacena el estado del campo. Llamamos al nombre de esta propiedad la "ruta de estado" (state path) del campo. Puedes acceder a la ruta de estado de un campo usando la función `$getStatePath()` en la vista del campo:

```blade
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <input wire:model="{{ $getStatePath() }}" />

    <!-- O -->

    <div x-data="{ state: $wire.$entangle('{{ $getStatePath() }}') }">
        <input x-model="state" />
    </div>
</x-dynamic-component>
```

Si tu componente depende mucho de bibliotecas de terceros, te recomendamos cargar de forma asíncrona el componente de Alpine.js usando el sistema de assets de Filament. Esto garantiza que el componente de Alpine.js solo se cargue cuando sea necesario, y no en cada carga de página. Para saber cómo hacerlo, consulta la [documentación de Assets](../assets#asynchronous-alpinejs-components).

### Clases de campos personalizados

Puedes crear tus propias clases y vistas de campos personalizados, que puedes reutilizar en tu proyecto e incluso publicar como un plugin para la comunidad.

Para crear una clase y vista de campo personalizado, puedes usar el siguiente comando:

```bash
php artisan make:filament-form-field LocationPicker
```

Esto creará la siguiente clase de componente:

```php
use Filament\Forms\Components\Field;

class LocationPicker extends Field
{
    protected string $view = 'filament.forms.components.location-picker';
}
```

También creará un archivo de vista en `resources/views/filament/forms/components/location-picker.blade.php`.

:::info
Los campos de formulario de Filament **no** son componentes Livewire. Definir propiedades y métodos públicos en una clase de campo de formulario no los hará accesibles en la vista Blade.
:::

## Acceder al estado de otro componente en la vista Blade

Dentro de la vista Blade, puedes acceder al estado de otro componente en el esquema usando la función `$get()`:

```blade
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    {{ $get('email') }}
</x-dynamic-component>
```

:::tip
A menos que un campo de formulario sea [reactivo](../forms/overview#the-basics-of-reactivity), la vista Blade no se refrescará cuando cambie el valor del campo, solo cuando ocurra la siguiente interacción del usuario que realice una solicitud al servidor. Si necesitas reaccionar a cambios en el valor de un campo, debe ser `live()`.
:::

## Acceder al registro de Eloquent en la vista Blade

Dentro de la vista Blade, puedes acceder al registro de Eloquent actual usando la variable `$record`:

```blade
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    {{ $record->name }}
</x-dynamic-component>
```

## Acceder a la operación actual en la vista Blade

Dentro de la vista Blade, puedes acceder a la operación actual, normalmente `create`, `edit` o `view`, usando la variable `$operation`:

```blade
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    @if ($operation === 'create')
        This is a new conference.
    @else
        This is an existing conference.
    @endif
</x-dynamic-component>
```

## Acceder a la instancia actual de Livewire en la vista Blade

Dentro de la vista Blade, puedes acceder a la instancia actual del componente Livewire usando `$this`:

```blade
@php
    use Filament\Resources\Users\RelationManagers\ConferencesRelationManager;
@endphp

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    @if ($this instanceof ConferencesRelationManager)
        You are editing conferences the of a user.
    @endif
</x-dynamic-component>
```

## Acceder a la instancia actual del campo en la vista Blade

Dentro de la vista Blade, puedes acceder a la instancia actual del campo usando `$field`. Puedes llamar métodos públicos en este objeto para acceder a otra información que puede no estar disponible en variables:

```blade
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    @if ($field->getState())
        This is a new conference.
    @endif
</x-dynamic-component>
```

## Añadir un método de configuración a una clase de campo personalizado

Puedes añadir un método público a la clase de campo personalizado que acepte un valor de configuración, lo almacene en una propiedad protegida y lo devuelva de nuevo desde otro método público:

```php
use Filament\Forms\Components\Field;

class LocationPicker extends Field
{
    protected string $view = 'filament.forms.components.location-picker';

    protected ?float $zoom = null;

    public function zoom(?float $zoom): static
    {
        $this->zoom = $zoom;

        return $this;
    }

    public function getZoom(): ?float
    {
        return $this->zoom;
    }
}
```

Ahora, en la vista Blade del campo personalizado, puedes acceder al zoom usando la función `$getZoom()`:

```blade
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    {{ $getZoom() }}
</x-dynamic-component>
```

Cualquier método público que definas en la clase de campo personalizado puede accederse en la vista Blade como una función de variable de esta manera.

Para pasar el valor de configuración a la clase de campo personalizado, puedes usar el método público:

```php
use App\Filament\Forms\Components\LocationPicker;

LocationPicker::make('location')
    ->zoom(0.5)
```

## Permitir inyección de utilidades en un método de configuración de campo personalizado

La [inyección de utilidades](overview#field-utility-injection) es una característica potente de Filament que permite a los usuarios configurar un componente usando funciones que pueden acceder a varias utilidades. Puedes permitir la inyección de utilidades asegurándote de que el tipo del parámetro y el tipo de la propiedad de la configuración permitan al usuario pasar un `Closure`. En el método getter, debes pasar el valor de configuración al método `$this->evaluate()`, que inyectará utilidades en la función del usuario si la pasa, o devolverá el valor si es estático:

```php
use Closure;
use Filament\Forms\Components\Field;

class LocationPicker extends Field
{
    protected string $view = 'filament.forms.components.location-picker';

    protected float | Closure | null $zoom = null;

    public function zoom(float | Closure | null $zoom): static
    {
        $this->zoom = $zoom;

        return $this;
    }

    public function getZoom(): ?float
    {
        return $this->evaluate($this->zoom);
    }
}
```

Ahora, puedes pasar un valor estático o una función al método `zoom()`, y [inyectar cualquier utilidad](overview#component-utility-injection) como parámetro:

```php
use App\Filament\Forms\Components\LocationPicker;

LocationPicker::make('location')
    ->zoom(fn (Conference $record): float => $record->isGlobal() ? 1 : 0.5)
```

## Respetar los modificadores de enlace de estado

Cuando enlazas un campo a una ruta de estado, puedes usar el modificador `defer` para asegurarte de que el estado solo se envíe al servidor cuando el usuario envíe el formulario, o cuando se realice la siguiente solicitud de Livewire. Este es el comportamiento por defecto.

Sin embargo, puedes usar [`live()`](overview#the-basics-of-reactivity) en un campo para asegurarte de que el estado se envíe al servidor inmediatamente cuando el usuario interactúe con el campo. Esto permite muchos casos de uso avanzados como se explica en la sección de [reactividad](overview#the-basics-of-reactivity) de la documentación.

Filament proporciona una función `$applyStateBindingModifiers()` que puedes usar en tu vista para aplicar cualquier modificador de enlace de estado a un `wire:model` o a un enlace `$wire.$entangle()`:

```blade
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <input {{ $applyStateBindingModifiers('wire:model') }}="{{ $getStatePath() }}" />

    <!-- O -->

    <div x-data="{ state: $wire.{{ $applyStateBindingModifiers("$entangle('{$getStatePath()}')") }} }">
        <input x-model="state" />
    </div>
</x-dynamic-component>
```
