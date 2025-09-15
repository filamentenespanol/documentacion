---
title: Disposición de filtros
---

## Posicionar filtros en columnas de cuadrícula

Para cambiar el número de columnas que los filtros pueden ocupar, puedes usar el método `filtersFormColumns()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->filtersFormColumns(3);
}
```

## Controlar el ancho del menú desplegable de filtros

Para personalizar el ancho del desplegable, puedes usar el método `filtersFormWidth()` y especificar un ancho - `ExtraSmall`, `Small`, `Medium`, `Large`, `ExtraLarge`, `TwoExtraLarge`, `ThreeExtraLarge`, `FourExtraLarge`, `FiveExtraLarge`, `SixExtraLarge` o `SevenExtraLarge`. Por defecto, el ancho es `ExtraSmall`:

```php
use Filament\Support\Enums\Width;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->filtersFormWidth(Width::FourExtraLarge);
}
```

## Controlar la altura máxima del menú desplegable de filtros

Para añadir una altura máxima al contenido del desplegable de filtros, de modo que sea desplazable, puedes usar el método `filtersFormMaxHeight()`, pasando una [longitud CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/length):

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->filtersFormMaxHeight('400px');
}
```

## Mostrar filtros en un modal

Para renderizar los filtros en un modal en lugar de en un desplegable, puedes usar:

```php
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ], layout: FiltersLayout::Modal);
}
```

También puedes usar la [API de acciones de disparador](overview#customizing-the-filters-trigger-action) para [personalizar el modal](../actions/modals), incluyendo el uso de un [`slideOver()`](../actions/modals#using-a-slide-over-instead-of-a-modal).

## Mostrar filtros encima del contenido de la tabla

Para renderizar los filtros encima del contenido de la tabla en lugar de en un desplegable, puedes usar:

```php
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ], layout: FiltersLayout::AboveContent);
}
```

### Permitir que los filtros encima del contenido de la tabla sean colapsables

Para permitir que los filtros colocados encima del contenido de la tabla puedan colapsarse, puedes usar:

```php
use Filament\Tables\Enums\FiltersLayout;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ], layout: FiltersLayout::AboveContentCollapsible);
}
```

## Mostrar filtros debajo del contenido de la tabla

Para renderizar los filtros debajo del contenido de la tabla en lugar de en un desplegable, puedes usar:

```php
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ], layout: FiltersLayout::BelowContent);
}
```

## Ocultar los indicadores de filtros

Para ocultar los indicadores de filtros activos sobre la tabla, puedes usar `hiddenFilterIndicators()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->hiddenFilterIndicators();
}
```

## Personalizar el esquema de formulario de filtros

Puedes personalizar el [esquema de formulario](../../schemas/layouts) de todos los filtros a la vez, para reorganizarlos en la disposición que desees, y usar cualquiera de los [componentes de diseño](../../schemas/layout) disponibles para formularios. Para esto, usa el método `filtersFormSchema()`, pasando una función de cierre que recibe el array de `$filters` definidos que puedes insertar:

```php
use Filament\Schemas\Components\Section;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            Filter::make('is_featured'),
            Filter::make('published_at'),
            Filter::make('author'),
        ])
        ->filtersFormColumns(2)
        ->filtersFormSchema(fn (array $filters): array => [
            Section::make('Visibilidad')
                ->description('Estos filtros afectan la visibilidad de los registros en la tabla.')
                ->schema([
                    $filters['is_featured'],
                    $filters['published_at'],
                ])
                    ->columns(2)
                ->columnSpanFull(),
            $filters['author'],
        ]);
}
```

En este ejemplo, hemos colocado dos de los filtros dentro de un componente [section](../../schemas/sections), y usamos el método `columns()` para especificar que la sección debería tener dos columnas. También usamos el método `columnSpanFull()` para indicar que la sección debe abarcar todo el ancho del formulario de filtros, que también tiene 2 columnas. Hemos insertado cada filtro dentro del esquema del formulario usando el nombre del filtro como clave en el array `$filters`.
