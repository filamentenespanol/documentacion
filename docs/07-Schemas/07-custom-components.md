---
title: Componentes personalizados
---

## Insertar una vista Blade en un schema

Puedes usar un componente `view` para insertar una vista Blade arbitrariamente en un schema:

```php
use Filament\Schemas\Components\View;

View::make('filament.schemas.components.chart')
```

Esto asume que tienes un archivo `resources/views/filament/schemas/components/chart.blade.php`.

### Renderizar el schema hijo del componente

Puedes pasar un array de componentes de schema hijos al método `schema()` del componente:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\View;

View::make('filament.schemas.components.chart')
    ->schema([
        TextInput::make('subtotal'),
        TextInput::make('total'),
    ])
```

Dentro de la vista Blade, puedes renderizar el `schema()` del componente usando la función `$getChildSchema()`:

```blade
<div>
    {{ $getChildSchema() }}
</div>
```

### Acceder al estado de otro componente en la vista Blade

Dentro de la vista Blade, puedes acceder al estado de otro componente en el schema usando la función `$get()`:

```blade
<div>
    {{ $get('email') }}
</div>
```

:::tip
A menos que un campo de formulario sea [reactivo](../forms/overview#the-basics-of-reactivity), la vista Blade no se actualizará cuando cambie el valor del campo, solo cuando la siguiente interacción del usuario haga una petición al servidor. Si necesitas reaccionar a los cambios en el valor de un campo, este debe ser `live()`.
:::

### Acceder al registro Eloquent en la vista Blade

```blade
<div>
    {{ $record->name }}
</div>
```

### Acceder a la operación actual en la vista Blade

```blade
<p>
    @if ($operation === 'create')
        Este es un nuevo post.
    @else
        Este es un post existente.
    @endif
</p>
```

### Acceder a la instancia actual del componente Livewire en la vista Blade

```blade
@php
    use Filament\Resources\Users\RelationManagers\PostsRelationManager;
@endphp

<p>
    @if ($this instanceof PostsRelationManager)
        Estás editando posts de un usuario.
    @endif
</p>
```

### Acceder a la instancia actual del componente en la vista Blade

```blade
<p>
    @if ($schemaComponent->getState())
        Este es un nuevo post.
    @endif
</p>
```

## Insertar un componente Livewire en un schema

Puedes insertar un componente Livewire directamente en un schema:

```php
use App\Livewire\Chart;
use Filament\Schemas\Components\Livewire;

Livewire::make(Chart::class)
```

:::info
Al insertar un componente Livewire en el schema, las capacidades son limitadas. Solo los datos serializables son accesibles, ya que se renderizan por separado. Por lo tanto, no puedes [renderizar el schema hijo](#rendering-the-components-child-schema), [acceder al estado en vivo de otro componente](#accessing-the-state-of-another-component-in-the-blade-view), [acceder a la instancia Livewire actual](#accessing-the-current-livewire-component-instance-in-the-blade-view), o [acceder a la instancia del componente](#accessing-the-current-component-instance-in-the-blade-view). Solo [datos estáticos pasados al componente Livewire](#passing-parameters-to-a-livewire-component), y [el registro actual](#accessing-the-current-record-in-the-livewire-component) son accesibles.
:::

### Pasar parámetros a un componente Livewire

```php
use App\Livewire\Chart;
use Filament\Schemas\Components\Livewire;

Livewire::make(Chart::class, ['bar' => 'baz'])
```

Los parámetros estarán disponibles en el método `mount()`:

```php
class Chart extends Component
{
    public function mount(string $bar): void
    {       
        // ...
    }
}
```

O como propiedades públicas:

```php
class Chart extends Component
{
    public string $bar;
}
```

#### Acceder al registro actual en el componente Livewire

```php
use Illuminate\Database\Eloquent\Model;

class Chart extends Component
{
    public function mount(?Model $record = null): void
    {       
        // ...
    }

    public ?Model $record = null;
}
```

Puedes ocultar el componente si el registro aún no ha sido creado:

```php
use Filament\Schemas\Components\Livewire;
use Illuminate\Database\Eloquent\Model;

Livewire::make(Chart::class)
    ->hidden(fn (?Model $record): bool => $record === null)
```

### Carga diferida de un componente Livewire

```php
use Filament\Schemas\Components\Livewire;
use App\Livewire\Chart;

Livewire::make(Chart::class)
    ->lazy()       
```

## Clases de componentes personalizados

Puedes crear tus propias clases y vistas de componentes personalizados:

```bash
php artisan make:filament-schema-component Chart
```

Clase creada:

```php
use Filament\Schemas\Components\Component;

class Chart extends Component
{
    protected string $view = 'filament.schemas.components.chart';

    public static function make(): static
    {
        return app(static::class);
    }
}
```

:::info
Los componentes de schema de Filament **no** son componentes Livewire. Definir propiedades públicas y métodos en la clase no los hace accesibles en la vista Blade.
:::

### Agregar un método de configuración a una clase de componente personalizada

```php
use Filament\Schemas\Components\Component;

class Chart extends Component
{
    protected string $view = 'filament.schemas.components.chart';

    protected ?string $heading = null;

    public static function make(): static
    {
        return app(static::class);
    }

    public function heading(?string $heading): static
    {
        $this->heading = $heading;
        return $this;
    }

    public function getHeading(): ?string
    {
        return $this->heading;
    }
}
```

En la vista Blade puedes acceder con:

```blade
<div>
    {{ $getHeading() }}
</div>
```

### Permitir inyección de utilidades en métodos personalizados

```php
use Closure;
use Filament\Schemas\Components\Component;

class Chart extends Component
{
    protected string $view = 'filament.schemas.components.chart';

    protected string | Closure | null $heading = null;

    public function heading(string | Closure | null $heading): static
    {
        $this->heading = $heading;

        return $this;
    }

    public function getHeading(): ?string
    {
        return $this->evaluate($this->heading);
    }
}
```

### Aceptar configuración en el constructor

```php
use Closure;
use Filament\Schemas\Components\Component;

class Chart extends Component
{
    protected string $view = 'filament.schemas.components.chart';

    protected string | Closure | null $heading = null;

    public function __construct(string | Closure | null $heading = null)
    {
        $this->heading($heading);
    }

    public static function make(string | Closure | null $heading = null): static
    {
        return app(static::class, ['heading' => $heading]);
    }

    public function heading(string | Closure | null $heading): static
    {
        $this->heading = $heading;
        return $this;
    }

    public function getHeading(): ?string
    {
        return $this->evaluate($this->heading);
    }
}
```