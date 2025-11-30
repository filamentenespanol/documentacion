---
title: Descripción general
---

## Introducción

Filament te permite construir paneles de control dinámicos, compuestos por "widgets". Cada widget es un elemento en el panel de control que muestra datos de una manera específica. Por ejemplo, puedes mostrar [estadísticas](stats-overview), [gráficos](charts) o una [tabla](#widgets-de-tabla).

## Crear un widget

Para crear un widget, puedes usar el comando `make:filament-widget`:

```bash
php artisan make:filament-widget MyWidget
```

Este comando te preguntará qué tipo de widget deseas crear. Puedes elegir entre las siguientes opciones:

- **Custom**: Un widget personalizado que puedes construir desde cero.
- **Chart**: Un widget que muestra un [gráfico](charts).
- **Stats overview**: Un widget que muestra [estadísticas](stats-overview).
- **Table**: Un widget que muestra una [tabla](#widgets-de-tabla).

## Ordenar widgets

Cada clase de widget contiene una propiedad `$sort` que puede usarse para cambiar su orden en la página, en relación con otros widgets:

```php
protected static ?int $sort = 2;
```

## Personalizar la página del panel de control

Si deseas personalizar la clase del dashboard, por ejemplo, para [cambiar el número de columnas de widgets](#personalizar-la-cuadricula-de-widgets), crea un nuevo archivo en `app/Filament/Pages/Dashboard.php`:

```php
<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    // ...
}
```

Finalmente, elimina la clase `Dashboard` original del [archivo de configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
        ->pages([]);
}
```

Si no descubres páginas con `discoverPages()` en el directorio donde creaste la nueva clase de dashboard, debes registrar manualmente la clase en el método `pages()`:

```php
use App\Filament\Pages\Dashboard;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->pages([
            Dashboard::class,
        ]);
}
```

### Crear múltiples paneles de control

Si deseas crear múltiples paneles de control, puedes hacerlo repitiendo [el proceso descrito anteriormente](#personalizar-la-página-del-panel-de-control). Crear nuevas páginas que extiendan la clase `Dashboard` te permitirá crear tantos paneles de control como necesites.

También necesitarás definir la ruta URL al dashboard adicional, de lo contrario estará en `/`:

```php
protected static string $routePath = 'finance';
```

También puedes personalizar el título del dashboard sobrescribiendo la propiedad `$title`:

```php
protected static ?string $title = 'Finance dashboard';
```

El dashboard principal mostrado a un usuario es el primero al que tiene acceso (controlado por el [método `canAccess()`](../navigation/custom-pages#authorization)), según el orden de clasificación de navegación definido.

El orden de clasificación predeterminado para los dashboards es `-2`. Puedes controlar el orden de clasificación de los dashboards personalizados con `$navigationSort`:

```php
protected static ?int $navigationSort = 15;
```

### Personalizar la cuadrícula de widgets

Puedes cambiar cuántas columnas de cuadrícula se usan para mostrar widgets.

Primero, debes [reemplazar la página Dashboard original](#personalizar-la-página-del-panel-de-control).

Ahora, en tu nuevo archivo `app/Filament/Pages/Dashboard.php`, puedes sobrescribir el método `getColumns()` para devolver un número de columnas de cuadrícula a usar:

```php
public function getColumns(): int | array
{
    return 2;
}
```

#### Cuadrícula de widgets responsiva

Es posible que desees cambiar el número de columnas de cuadrícula de widgets según el [breakpoint](https://tailwindcss.com/docs/responsive-design#overview) responsivo del navegador. Puedes hacer esto usando un array que contenga el número de columnas que se deben usar en cada breakpoint:

```php
public function getColumns(): int | array
{
    return [
        'md' => 4,
        'xl' => 5,
    ];
}
```

Esto funciona bien con [anchos de widget responsivos](#anchos-de-widget-responsivos).

#### Personalizar el ancho del widget

Puedes personalizar el ancho de un widget usando la propiedad `$columnSpan`. Puedes usar un número entre 1 y 12 para indicar cuántas columnas debe ocupar el widget, o `full` para que ocupe el ancho completo de la página:

```php
protected int | string | array $columnSpan = 'full';
```

##### Anchos de widget responsivos

Es posible que desees cambiar el ancho del widget según el [breakpoint](https://tailwindcss.com/docs/responsive-design#overview) responsivo del navegador. Puedes hacer esto usando un array que contenga el número de columnas que el widget debe ocupar en cada breakpoint:

```php
protected int | string | array $columnSpan = [
    'md' => 2,
    'xl' => 3,
];
```

Esto es especialmente útil cuando se usa una [cuadrícula de widgets responsiva](#cuadricula-de-widgets-responsiva).

## Ocultar widgets condicionalmente

Puedes sobrescribir el método estático `canView()` en los widgets para ocultarlos condicionalmente:

```php
public static function canView(): bool
{
    return auth()->user()->isAdmin();
}
```

## Widgets de tabla

Puedes agregar fácilmente tablas a tu dashboard. Comienza creando un widget con el comando:

```bash
php artisan make:filament-widget LatestOrders --table
```

Ahora puedes [personalizar la tabla](../tables) editando el archivo del widget.

## Widgets personalizados

Para comenzar a construir un widget `BlogPostsOverview`:

```bash
php artisan make:filament-widget BlogPostsOverview
```

Este comando creará dos archivos: una clase de widget en el directorio `/Widgets` del directorio de Filament, y una vista en el directorio `/widgets` del directorio de vistas de Filament.

La clase es un [componente Livewire](https://livewire.laravel.com/docs/components), por lo que todas las características de Livewire están disponibles para ti. La vista Blade puede contener cualquier HTML que desees, y puedes acceder a cualquier propiedad pública de Livewire en la vista. También puedes acceder a la instancia del componente Livewire en la vista usando `$this`.

## Filtrar datos de widgets

Puedes agregar un formulario al dashboard que permita al usuario filtrar los datos mostrados en todos los widgets. Cuando se actualizan los filtros, los widgets se recargarán con los nuevos datos.

Primero, debes [reemplazar la página Dashboard original](#personalizar-la-página-del-panel-de-control).

Ahora, en tu nuevo archivo `app/Filament/Pages/Dashboard.php`, puedes agregar el trait `HasFiltersForm`, y agregar el método `filtersForm()` para devolver componentes de formulario:

```php
use Filament\Forms\Components\DatePicker;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Pages\Dashboard\Concerns\HasFiltersForm;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class Dashboard extends BaseDashboard
{
    use HasFiltersForm;

    public function filtersForm(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        DatePicker::make('startDate'),
                        DatePicker::make('endDate'),
                        // ...
                    ])
                    ->columns(3),
            ]);
    }
}
```

En las clases de widget que requieren datos de los filtros, necesitas agregar el trait `InteractsWithPageFilters`, que te permitirá usar la propiedad `$this->pageFilters` para acceder a los datos sin procesar del formulario de filtros:

```php
use App\Models\BlogPost;
use Carbon\CarbonImmutable;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Database\Eloquent\Builder;

class BlogPostsOverview extends StatsOverviewWidget
{
    use InteractsWithPageFilters;

    public function getStats(): array
    {
        $startDate = $this->pageFilters['startDate'] ?? null;
        $endDate = $this->pageFilters['endDate'] ?? null;

        return [
            StatsOverviewWidget\Stat::make(
                label: 'Total posts',
                value: BlogPost::query()
                    ->when($startDate, fn (Builder $query) => $query->whereDate('created_at', '>=', $startDate))
                    ->when($endDate, fn (Builder $query) => $query->whereDate('created_at', '<=', $endDate))
                    ->count(),
            ),
            // ...
        ];
    }
}
```

El array `$this->pageFilters` siempre reflejará los datos actuales del formulario. Ten en cuenta que estos datos no están validados, ya que están disponibles en vivo y no están destinados a usarse para nada más que consultar la base de datos. Debes asegurarte de que los datos sean válidos antes de usarlos. En este ejemplo, verificamos si la fecha de inicio está configurada antes de usarla en la consulta.

### Filtrar datos de widgets usando un modal de action

Alternativamente, puedes cambiar el formulario de filtros por un modal de action, que se puede abrir haciendo clic en un botón en el encabezado de la página. Hay muchos beneficios al usar este enfoque:

- El formulario de filtros no siempre es visible, lo que te permite usar toda la altura de la página para widgets.
- Los filtros no actualizan los widgets hasta que el usuario hace clic en el botón "Apply", lo que significa que los widgets no se recargan hasta que el usuario esté listo. Esto puede mejorar el rendimiento si los widgets son costosos de cargar.
- Se puede realizar validación en el formulario de filtros, lo que significa que los widgets pueden confiar en que los datos son válidos: el usuario no puede enviar el formulario hasta que lo sea. Cancelar el modal descartará los cambios del usuario.

Para usar un modal de action en lugar de un formulario de filtros, puedes usar el trait `HasFiltersAction` en lugar de `HasFiltersForm`. Luego, registra la clase `FilterAction` como una action en `getHeaderActions()`:

```php
use Filament\Forms\Components\DatePicker;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Pages\Dashboard\Actions\FilterAction;
use Filament\Pages\Dashboard\Concerns\HasFiltersAction;

class Dashboard extends BaseDashboard
{
    use HasFiltersAction;
    
    protected function getHeaderActions(): array
    {
        return [
            FilterAction::make()
                ->schema([
                    DatePicker::make('startDate'),
                    DatePicker::make('endDate'),
                    // ...
                ]),
        ];
    }
}
```

El manejo de datos de la action de filtro es el mismo que el manejo de datos del formulario de encabezado de filtros, excepto que los datos se validan antes de pasarse al widget. El trait `InteractsWithPageFilters` aún se aplica.

### Persistir filtros de widgets en la sesión del usuario

De forma predeterminada, los filtros de dashboard aplicados persistirán en la sesión del usuario entre cargas de página. Para deshabilitar esto, sobrescribe la propiedad `$persistsFiltersInSession` en la clase de página del dashboard:

```php
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Pages\Dashboard\Concerns\HasFiltersForm;

class Dashboard extends BaseDashboard
{
    use HasFiltersForm;

    protected bool $persistsFiltersInSession = false;
}
```

Alternativamente, sobrescribe el método `persistsFiltersInSession()` en la clase de página del dashboard:

```php
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Pages\Dashboard\Concerns\HasFiltersForm;

class Dashboard extends BaseDashboard
{
    use HasFiltersForm;

    public function persistsFiltersInSession(): bool
    {
        return false;
    }
}
```

## Deshabilitar los widgets predeterminados

De forma predeterminada, se muestran dos widgets en el dashboard. Estos widgets se pueden deshabilitar actualizando el array `widgets()` de la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->widgets([]);
}
```
