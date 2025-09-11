---
title: Columnas personalizadas
---

## Introducción

Puedes crear tus propias clases y vistas de columnas personalizadas, que podrás reutilizar en tu proyecto e incluso publicar como un plugin para la comunidad.

Para crear una clase y vista de columna personalizada, puedes usar el siguiente comando:

```bash
php artisan make:filament-table-column AudioPlayerColumn
```

Esto creará la siguiente clase de componente:

```php
use Filament\Tables\Columns\Column;

class AudioPlayerColumn extends Column
{
    protected string $view = 'filament.tables.columns.audio-player-column';
}
```

También generará un archivo de vista en `resources/views/filament/tables/columns/audio-player-column.blade.php`.

:::info
Las columnas de tabla de Filament **no** son componentes Livewire. Definir propiedades y métodos públicos en una clase de columna de tabla no los hará accesibles en la vista Blade.
:::

## Acceder al estado de la columna en la vista Blade

Dentro de la vista Blade, puedes acceder al [estado](overview#column-content-state) de la columna usando la función `$getState()`:

```blade
<div>
    {{ $getState() }}
</div>
```

## Acceder al registro Eloquent en la vista Blade

Dentro de la vista Blade, puedes acceder al registro Eloquent de la fila actual de la tabla usando la variable `$record`:

```blade
<div>
    {{ $record->name }}
</div>
```

## Acceder a la instancia del componente Livewire actual en la vista Blade

Dentro de la vista Blade, puedes acceder a la instancia actual del componente Livewire usando `$this`:

```blade
@php
    use Filament\Resources\Users\RelationManagers\ConferencesRelationManager;
@endphp

<div>
    @if ($this instanceof ConferencesRelationManager)
        Estás editando las conferencias de un usuario.
    @endif
</div>
```

## Acceder a la instancia de la columna actual en la vista Blade

Dentro de la vista Blade, puedes acceder a la instancia de la columna actual usando `$column`. Puedes llamar métodos públicos de este objeto para acceder a otra información que no esté disponible en variables:

```blade
<div>
    @if ($column->isLabelHidden())
        Esta es una nueva conferencia.
    @endif
</div>
```

## Añadir un método de configuración a una clase de columna personalizada

Puedes añadir un método público a la clase personalizada de la columna que acepte un valor de configuración, lo almacene en una propiedad protegida y lo devuelva nuevamente desde otro método público:

```php
use Filament\Tables\Columns\Column;

class AudioPlayerColumn extends Column
{
    protected string $view = 'filament.tables.columns.audio-player-column';

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

Ahora, en la vista Blade de la columna personalizada, puedes acceder a la velocidad usando la función `$getSpeed()`:

```blade
<div>
    {{ $getSpeed() }}
</div>
```

Cualquier método público definido en la clase de columna personalizada puede ser accedido en la vista Blade como una función de variable de esta manera.

Para pasar el valor de configuración a la clase personalizada, puedes usar el método público:

```php
use App\Filament\Tables\Columns\AudioPlayerColumn;

AudioPlayerColumn::make('recording')
    ->speed(0.5)
```

## Permitir inyección de utilidades en un método de configuración de columna personalizada

La [inyección de utilidades](overview#column-utility-injection) es una característica poderosa de Filament que permite a los usuarios configurar un componente utilizando funciones que pueden acceder a varias utilidades. Puedes permitir la inyección de utilidades asegurándote de que el tipo de parámetro y propiedad de la configuración permita al usuario pasar un `Closure`. En el método getter, debes pasar el valor de configuración al método `$this->evaluate()`, que inyectará utilidades en la función del usuario si este pasa una, o devolverá el valor si es estático:

```php
use Closure;
use Filament\Tables\Columns\Column;

class AudioPlayerColumn extends Column
{
    protected string $view = 'filament.tables.columns.audio-player-column';

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

Ahora, puedes pasar un valor estático o una función al método `speed()`, e [inyectar cualquier utilidad](overview#component-utility-injection) como parámetro:

```php
use App\Filament\Tables\Columns\AudioPlayerColumn;

AudioPlayerColumn::make('recording')
    ->speed(fn (Conference $record): float => $record->isGlobal() ? 1 : 0.5)
```
