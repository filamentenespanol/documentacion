---
title: Widgets de resumen de estadísticas
---

## Introducción

Filament viene con una plantilla de widget "stats overview" (resumen de estadísticas), que puedes usar para mostrar varias estadísticas diferentes en un solo widget, sin necesidad de escribir una vista personalizada.

Comienza creando un widget con el comando:

```bash
php artisan make:filament-widget StatsOverview --stats-overview
```

Este comando creará un nuevo archivo `StatsOverview.php`. Ábrelo y devuelve instancias de `Stat` desde el método `getStats()`:

```php
<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Unique views', '192.1k'),
            Stat::make('Bounce rate', '21%'),
            Stat::make('Average time on page', '3:12'),
        ];
    }
}
```

Ahora, revisa tu widget en el panel de control.

## Agregar una descripción e icono a una estadística

Puedes agregar una `description()` para proporcionar información adicional, junto con un `descriptionIcon()`:

```php
use Filament\Widgets\StatsOverviewWidget\Stat;

protected function getStats(): array
{
    return [
        Stat::make('Unique views', '192.1k')
            ->description('32k increase')
            ->descriptionIcon('heroicon-m-arrow-trending-up'),
        Stat::make('Bounce rate', '21%')
            ->description('7% decrease')
            ->descriptionIcon('heroicon-m-arrow-trending-down'),
        Stat::make('Average time on page', '3:12')
            ->description('3% increase')
            ->descriptionIcon('heroicon-m-arrow-trending-up'),
    ];
}
```

El método `descriptionIcon()` también acepta un segundo parámetro para poner el icono antes de la descripción en lugar de después:

```php
use Filament\Support\Enums\IconPosition;
use Filament\Widgets\StatsOverviewWidget\Stat;

Stat::make('Unique views', '192.1k')
    ->description('32k increase')
    ->descriptionIcon('heroicon-m-arrow-trending-up', IconPosition::Before)
```

## Cambiar el color de la estadística

También puedes dar a las estadísticas un [color](../styling/colors):

```php
use Filament\Widgets\StatsOverviewWidget\Stat;

protected function getStats(): array
{
    return [
        Stat::make('Unique views', '192.1k')
            ->description('32k increase')
            ->descriptionIcon('heroicon-m-arrow-trending-up')
            ->color('success'),
        Stat::make('Bounce rate', '21%')
            ->description('7% increase')
            ->descriptionIcon('heroicon-m-arrow-trending-down')
            ->color('danger'),
        Stat::make('Average time on page', '3:12')
            ->description('3% increase')
            ->descriptionIcon('heroicon-m-arrow-trending-up')
            ->color('success'),
    ];
}
```

## Agregar atributos HTML adicionales a una estadística

También puedes pasar atributos HTML adicionales a las estadísticas usando `extraAttributes()`:

```php
use Filament\Widgets\StatsOverviewWidget\Stat;

protected function getStats(): array
{
    return [
        Stat::make('Processed', '192.1k')
            ->color('success')
            ->extraAttributes([
                'class' => 'cursor-pointer',
                'wire:click' => "\$dispatch('setStatusFilter', { filter: 'processed' })",
            ]),
        // ...
    ];
}
```

En este ejemplo, estamos escapando deliberadamente el `$` en `$dispatch()` ya que esto necesita pasarse directamente al HTML, no es una variable PHP.

## Agregar un gráfico a una estadística

También puedes agregar o encadenar un `chart()` a cada estadística para proporcionar datos históricos. El método `chart()` acepta un array de puntos de datos para graficar:

```php
use Filament\Widgets\StatsOverviewWidget\Stat;

protected function getStats(): array
{
    return [
        Stat::make('Unique views', '192.1k')
            ->description('32k increase')
            ->descriptionIcon('heroicon-m-arrow-trending-up')
            ->chart([7, 2, 10, 3, 15, 4, 17])
            ->color('success'),
        // ...
    ];
}
```

## Actualización en vivo de estadísticas (polling)

De forma predeterminada, los widgets de resumen de estadísticas actualizan sus datos cada 5 segundos.

Para personalizar esto, puedes sobrescribir la propiedad `$pollingInterval` en la clase con un nuevo intervalo:

```php
protected ?string $pollingInterval = '10s';
```

Alternativamente, puedes deshabilitar el polling por completo:

```php
protected ?string $pollingInterval = null;
```

## Deshabilitar la carga diferida

De forma predeterminada, los widgets se cargan de forma diferida (lazy-loaded). Esto significa que solo se cargarán cuando sean visibles en la página.

Para deshabilitar este comportamiento, puedes sobrescribir la propiedad `$isLazy` en la clase del widget:

```php
protected static bool $isLazy = false;
```

## Agregar un encabezado y descripción

También puedes agregar texto de encabezado y descripción encima del widget sobrescribiendo las propiedades `$heading` y `$description`:

```php
protected ?string $heading = 'Analytics';

protected ?string $description = 'An overview of some analytics.';
```

Si necesitas generar dinámicamente el texto del encabezado o descripción, puedes sobrescribir los métodos `getHeading()` y `getDescription()` en su lugar:

```php
protected function getHeading(): ?string
{
    return 'Analytics';
}

protected function getDescription(): ?string
{
    return 'An overview of some analytics.';
}
```
