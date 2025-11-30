---
title: Widgets de gráficos
---

## Introducción

Filament viene con muchas plantillas de widgets de "gráficos", que puedes usar para mostrar gráficos interactivos en tiempo real.

Comienza creando un widget con el comando:

```bash
php artisan make:filament-widget BlogPostsChart --chart
```

Hay una única clase `ChartWidget` que se usa para todos los gráficos. El tipo de gráfico se establece mediante el método `getType()`. En este ejemplo, ese método devuelve la cadena `'line'`.

La variable `protected ?string $heading` se usa para establecer el encabezado que describe el gráfico. Si necesitas establecer el encabezado dinámicamente, puedes sobrescribir el método `getHeading()`.

El método `getData()` se usa para devolver un array de conjuntos de datos y etiquetas. Cada conjunto de datos es un array etiquetado de puntos para trazar en el gráfico, y cada etiqueta es una cadena. Esta estructura es idéntica a la biblioteca [Chart.js](https://www.chartjs.org/docs), que Filament usa para renderizar gráficos. Puedes usar la [documentación de Chart.js](https://www.chartjs.org/docs) para comprender completamente las posibilidades de devolver desde `getData()`, según el tipo de gráfico.

```php
<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class BlogPostsChart extends ChartWidget
{
    protected ?string $heading = 'Blog Posts';

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Blog posts created',
                    'data' => [0, 10, 5, 2, 21, 32, 45, 74, 65, 45, 77, 89],
                ],
            ],
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
```

Ahora, revisa tu widget en el dashboard.

## Tipos de gráficos disponibles

A continuación se muestra una lista de clases de widgets de gráficos disponibles que puedes extender, y su correspondiente página de documentación de [Chart.js](https://www.chartjs.org/docs), para inspirarte en qué devolver desde `getData()`:

- Gráfico de barras - [Documentación de Chart.js](https://www.chartjs.org/docs/latest/charts/bar)
- Gráfico de burbujas - [Documentación de Chart.js](https://www.chartjs.org/docs/latest/charts/bubble)
- Gráfico de dona - [Documentación de Chart.js](https://www.chartjs.org/docs/latest/charts/doughnut)
- Gráfico de líneas - [Documentación de Chart.js](https://www.chartjs.org/docs/latest/charts/line)
- Gráfico circular - [Documentación de Chart.js](https://www.chartjs.org/docs/latest/charts/doughnut.html#pie)
- Gráfico de área polar - [Documentación de Chart.js](https://www.chartjs.org/docs/latest/charts/polar)
- Gráfico de radar - [Documentación de Chart.js](https://www.chartjs.org/docs/latest/charts/radar)
- Gráfico de dispersión - [Documentación de Chart.js](https://www.chartjs.org/docs/latest/charts/scatter)

## Personalizar el color del gráfico

Puedes personalizar el [color](../styling/colors) de los datos del gráfico estableciendo la propiedad `$color`:

```php
protected string $color = 'info';
```

Si deseas personalizar el color aún más, o usar múltiples colores en múltiples conjuntos de datos, aún puedes hacer uso de las [opciones de color](https://www.chartjs.org/docs/latest/general/colors.html) de Chart.js en los datos:

```php
protected function getData(): array
{
    return [
        'datasets' => [
            [
                'label' => 'Blog posts created',
                'data' => [0, 10, 5, 2, 21, 32, 45, 74, 65, 45, 77, 89],
                'backgroundColor' => '#36A2EB',
                'borderColor' => '#9BD0F5',
            ],
        ],
        'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ];
}
```

## Generar datos de gráficos desde un modelo Eloquent

Para generar datos de gráficos desde un modelo Eloquent, Filament recomienda que instales el paquete `flowframe/laravel-trend`. Puedes ver la [documentación](https://github.com/Flowframe/laravel-trend).

Aquí hay un ejemplo de generación de datos de gráficos desde un modelo usando el paquete `laravel-trend`:

```php
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;

protected function getData(): array
{
    $data = Trend::model(BlogPost::class)
        ->between(
            start: now()->startOfYear(),
            end: now()->endOfYear(),
        )
        ->perMonth()
        ->count();

    return [
        'datasets' => [
            [
                'label' => 'Blog posts',
                'data' => $data->map(fn (TrendValue $value) => $value->aggregate),
            ],
        ],
        'labels' => $data->map(fn (TrendValue $value) => $value->date),
    ];
}
```

## Filtrar datos de gráficos

### Filtro Select básico

Puedes configurar filtros de gráficos para cambiar los datos que se presentan. Comúnmente, esto se usa para cambiar el período de tiempo para el cual se renderizan los datos del gráfico.

Para establecer un valor de filtro predeterminado, establece la propiedad `$filter`:

```php
public ?string $filter = 'today';
```

Luego, define el método `getFilters()` para devolver un array de valores y etiquetas para tu filtro:

```php
protected function getFilters(): ?array
{
    return [
        'today' => 'Today',
        'week' => 'Last week',
        'month' => 'Last month',
        'year' => 'This year',
    ];
}
```

Puedes usar el valor del filtro activo dentro de tu método `getData()`:

```php
protected function getData(): array
{
    $activeFilter = $this->filter;

    // ...
}
```

### Filtros personalizados

Puedes usar [componentes de schema](../schemas) para construir filtros personalizados para tu widget de gráficos. Este enfoque ofrece una forma más flexible de definir filtros.

Para comenzar, usa el trait `HasFiltersSchema` e implementa el método `filtersSchema()`:

```php
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;

class BlogPostsChart extends ChartWidget
{
    use HasFiltersSchema;
    
    // ...
    
    public function filtersSchema(Schema $schema): Schema
    {
        return $schema->components([
            DatePicker::make('startDate')
                ->default(now()->subDays(30)),
            DatePicker::make('endDate')
                ->default(now()),
        ]);
    }
}
```

Los valores de filtro son accesibles a través del array `$this->filters`. Puedes usar estos valores dentro de tu método `getData()`:

```php
protected function getData(): array
{
    $startDate = $this->filters['startDate'] ?? null;
    $endDate = $this->filters['endDate'] ?? null;

    return [
        // ...
    ];
}
```

El array `$this->filters` siempre reflejará los datos actuales del formulario. Ten en cuenta que estos datos no están validados, ya que están disponibles en vivo y no están destinados a usarse para nada más que consultar la base de datos. Debes asegurarte de que los datos sean válidos antes de usarlos.

:::note
Si deseas agregar filtros que se apliquen a múltiples widgets a la vez, consulta [filtrado de datos de widgets](overview#filtering-widget-data) en el dashboard.
:::

## Actualización en vivo de datos de gráficos (polling)

De forma predeterminada, los widgets de gráficos actualizan sus datos cada 5 segundos.

Para personalizar esto, puedes sobrescribir la propiedad `$pollingInterval` en la clase con un nuevo intervalo:

```php
protected ?string $pollingInterval = '10s';
```

Alternativamente, puedes deshabilitar el polling por completo:

```php
protected ?string $pollingInterval = null;
```

## Establecer una altura máxima del gráfico

Puedes colocar una altura máxima en el gráfico para asegurarte de que no se vuelva demasiado grande, usando la propiedad `$maxHeight`:

```php
protected ?string $maxHeight = '300px';
```

## Establecer opciones de configuración del gráfico

Puedes especificar una variable `$options` en la clase del gráfico para controlar las muchas opciones de configuración que proporciona la biblioteca Chart.js. Por ejemplo, podrías desactivar la [leyenda](https://www.chartjs.org/docs/latest/configuration/legend.html) para un gráfico de líneas:

```php
protected ?array $options = [
    'plugins' => [
        'legend' => [
            'display' => false,
        ],
    ],
];
```

Alternativamente, puedes sobrescribir el método `getOptions()` para devolver un array dinámico de opciones:

```php
protected function getOptions(): array
{
    return [
        'plugins' => [
            'legend' => [
                'display' => false,
            ],
        ],
    ];
}
```

Estos arrays PHP se transformarán en objetos JSON cuando se renderice el gráfico. Si deseas devolver JavaScript sin procesar desde este método en su lugar, puedes devolver un objeto `RawJs`. Esto es útil si deseas usar una función de callback de JavaScript, por ejemplo:

```php
use Filament\Support\RawJs;

protected function getOptions(): RawJs
{
    return RawJs::make(<<<JS
        {
            scales: {
                y: {
                    ticks: {
                        callback: (value) => '€' + value,
                    },
                },
            },
        }
    JS);
}
```

## Agregar una descripción

Puedes agregar una descripción, debajo del encabezado del gráfico, usando el método `getDescription()`:

```php
public function getDescription(): ?string
{
    return 'The number of blog posts published per month.';
}
```

## Deshabilitar la carga diferida

De forma predeterminada, los widgets se cargan de forma diferida (lazy-loaded). Esto significa que solo se cargarán cuando sean visibles en la página.

Para deshabilitar este comportamiento, puedes sobrescribir la propiedad `$isLazy` en la clase del widget:

```php
protected static bool $isLazy = true;
```

## Hacer que el gráfico sea plegable

Puedes permitir que el gráfico sea plegable estableciendo la propiedad `$isCollapsible` en la clase del widget en `true`:

```php
protected bool $isCollapsible = true;
```

## Usar plugins personalizados de Chart.js

Chart.js ofrece un poderoso sistema de plugins que te permite extender su funcionalidad y crear comportamientos de gráficos personalizados. Esta guía detalla cómo usarlos en un widget de gráficos.

### Paso 1: Instalar el plugin con NPM

Para comenzar, instala el plugin usando NPM en tu proyecto. En esta guía, instalaremos [`chartjs-plugin-datalabels`](https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html#installation):

```bash
npm install chartjs-plugin-datalabels --save-dev
```

### Paso 2: Crear un archivo JavaScript importando el plugin

Crea un nuevo archivo JavaScript donde definirás tu plugin personalizado. En esta guía, lo llamaremos `filament-chart-js-plugins.js`. Importa el plugin y agrégalo al array `window.filamentChartJsPlugins`:

```javascript
import ChartDataLabels from 'chartjs-plugin-datalabels'

window.filamentChartJsPlugins ??= []
window.filamentChartJsPlugins.push(ChartDataLabels)
```

Es importante inicializar el array si aún no se ha hecho, antes de hacer push. Esto asegura que múltiples archivos JavaScript (especialmente aquellos de plugins de Filament) que registran plugins de Chart.js no se sobrescriban entre sí, independientemente del orden en que se inicien.

Puedes hacer push de tantos plugins al array `filamentChartJsPlugins` como desees instalar, no necesitas un archivo separado para importar cada plugin.

### Paso 3: Compilar el archivo JavaScript con Vite

Ahora, necesitas construir el archivo JavaScript con Vite, o tu bundler de elección. Incluye el archivo en tu configuración de Vite (usualmente `vite.config.js`). Por ejemplo:

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/css/filament/admin/theme.css',
                'resources/js/filament-chart-js-plugins.js', // Incluye el nuevo archivo en el array `input` para que se construya
            ],
        }),
    ],
});
```

Construye el archivo con `npm run build`.

### Paso 4: Registrar el archivo JavaScript en Filament

Filament necesita saber que debe incluir este archivo JavaScript al renderizar widgets de gráficos. Puedes hacer esto en el método `boot()` de un service provider como `AppServiceProvider`:

```php
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Illuminate\Support\Facades\Vite;

FilamentAsset::register([
    Js::make('chart-js-plugins', Vite::asset('resources/js/filament-chart-js-plugins.js'))->module(),
]);
```

Puedes obtener más información sobre el [registro de assets](../advanced/assets), e incluso [registrar assets para un panel específico](../panel-configuration#registering-assets-for-a-panel).
