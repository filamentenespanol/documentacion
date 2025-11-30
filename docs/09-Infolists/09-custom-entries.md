---
title: Entradas personalizadas
---

## Introducción

Puedes crear tus propias clases y vistas de entrada personalizadas, que puedes reutilizar en tu proyecto e incluso publicar como un plugin para la comunidad.

Para crear una clase y vista de entrada personalizada, puedes usar el siguiente comando:

```bash
php artisan make:filament-infolist-entry AudioPlayerEntry
```

Esto creará la siguiente clase de componente:

```php
use Filament\Infolists\Components\Entry;

class AudioPlayerEntry extends Entry
{
    protected string $view = 'filament.infolists.components.audio-player-entry';
}
```

También creará un archivo de vista en `resources/views/filament/infolists/components/audio-player-entry.blade.php`.

:::note
Las entradas de infolist de Filament **no son** componentes de Livewire. Definir propiedades y métodos públicos en una clase de entrada de infolist no los hará accesibles en la vista Blade.
:::

## Accediendo al estado de la entrada en la vista Blade

Dentro de la vista Blade, puedes acceder al [estado](overview#contenido-de-entrada-estado) de la entrada usando la función `$getState()`:

```blade
<x-dynamic-component
    :component="$getEntryWrapperView()"
    :entry="$entry"
>
    {{ $getState() }}
</x-dynamic-component>
```

## Accediendo al estado de otro componente en la vista Blade

Dentro de la vista Blade, puedes acceder al estado de otro componente en el esquema usando la función `$get()`:

```blade
<x-dynamic-component
    :component="$getEntryWrapperView()"
    :entry="$entry"
>
    {{ $get('email') }}
</x-dynamic-component>
```

:::tip
A menos que un campo de formulario sea [reactivo](../infolists/overview#the-basics-of-reactivity), la vista Blade no se actualizará cuando cambie el valor del campo, solo cuando ocurra la siguiente interacción del usuario que haga una solicitud al servidor. Si necesitas reaccionar a los cambios en el valor de un campo, debe ser `live()`.
:::

## Accediendo al registro Eloquent en la vista Blade

Dentro de la vista Blade, puedes acceder al registro Eloquent actual usando la variable `$record`:

```blade
<x-dynamic-component
    :component="$getEntryWrapperView()"
    :entry="$entry"
>
    {{ $record->name }}
</x-dynamic-component>
```

## Accediendo a la operación actual en la vista Blade

Dentro de la vista Blade, puedes acceder a la operación actual, usualmente `create`, `edit` o `view`, usando la variable `$operation`:

```blade
<x-dynamic-component
    :component="$getEntryWrapperView()"
    :entry="$entry"
>
    @if ($operation === 'create')
        This is a new conference.
    @else
        This is an existing conference.
    @endif
</x-dynamic-component>
```

## Accediendo a la instancia del componente Livewire actual en la vista Blade

Dentro de la vista Blade, puedes acceder a la instancia del componente Livewire actual usando `$this`:

```blade
@php
    use Filament\Resources\Users\RelationManagers\ConferencesRelationManager;
@endphp

<x-dynamic-component
    :component="$getEntryWrapperView()"
    :entry="$entry"
>
    @if ($this instanceof ConferencesRelationManager)
        You are editing conferences the of a user.
    @endif
</x-dynamic-component>
```

## Accediendo a la instancia de entrada actual en la vista Blade

Dentro de la vista Blade, puedes acceder a la instancia de entrada actual usando `$entry`. Puedes llamar a métodos públicos en este objeto para acceder a otra información que puede no estar disponible en variables:

```blade
<x-dynamic-component
    :component="$getEntryWrapperView()"
    :entry="$entry"
>
    @if ($entry->isLabelHidden())
        This is a new conference.
    @endif
</x-dynamic-component>
```

## Agregando un método de configuración a una clase de entrada personalizada

Puedes agregar un método público a la clase de entrada personalizada que acepta un valor de configuración, lo almacena en una propiedad protegida y lo devuelve nuevamente desde otro método público:

```php
use Filament\Infolists\Components\Entry;

class AudioPlayerEntry extends Entry
{
    protected string $view = 'filament.infolists.components.audio-player-entry';
    
    protected ?float $speed = null;

    public function speed(?float $speed): static
    {
        $this->speed = $speed;

        return $this;
    }

    public function getSpeed(): ?float
    {
        return $this->speed;
    }
}
```

Ahora, en la vista Blade para la entrada personalizada, puedes acceder a la velocidad usando la función `$getSpeed()`:

```blade
<x-dynamic-component
    :component="$getEntryWrapperView()"
    :entry="$entry"
>
    {{ $getSpeed() }}
</x-dynamic-component>
```

Cualquier método público que definas en la clase de entrada personalizada se puede acceder en la vista Blade como una función variable de esta manera.

Para pasar el valor de configuración a la clase de entrada personalizada, puedes usar el método público:

```php
use App\Filament\Infolists\Components\AudioPlayerEntry;

AudioPlayerEntry::make('recording')
    ->speed(0.5)
```

## Permitiendo la inyección de utilidades en un método de configuración de entrada personalizada

La [inyección de utilidades](overview#inyección-de-utilidades-de-entrada) es una característica poderosa de Filament que permite a los usuarios configurar un componente usando funciones que pueden acceder a varias utilidades. Puedes permitir la inyección de utilidades asegurándote de que el tipo de parámetro y el tipo de propiedad de la configuración permitan al usuario pasar un `Closure`. En el método getter, debes pasar el valor de configuración al método `$this->evaluate()`, que inyectará utilidades en la función del usuario si pasa una, o devolverá el valor si es estático:

```php
use Closure;
use Filament\Infolists\Components\Entry;

class AudioPlayerEntry extends Entry
{
    protected string $view = 'filament.infolists.components.audio-player-entry';
    
    protected float | Closure | null $speed = null;

    public function speed(float | Closure | null $speed): static
    {
        $this->speed = $speed;

        return $this;
    }

    public function getSpeed(): ?float
    {
        return $this->evaluate($this->speed);
    }
}
```

Ahora, puedes pasar un valor estático o una función al método `speed()`, e [inyectar cualquier utilidad](overview#inyección-de-utilidades-de-entrada) como parámetro:

```php
use App\Filament\Infolists\Components\AudioPlayerEntry;

AudioPlayerEntry::make('recording')
    ->speed(fn (Conference $record): float => $record->isGlobal() ? 1 : 0.5)
```
