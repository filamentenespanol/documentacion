---
title: Resúmenes
---

## Introducción

Puedes renderizar una sección de "resumen" debajo del contenido de tu tabla. Esto es útil para mostrar resultados de cálculos como promedios, sumas, conteos y rangos de los datos en tu tabla.

Por defecto, habrá una sola línea de resumen para la página actual de datos, y una línea adicional para el total de todos los datos si hay múltiples páginas. También puedes agregar resúmenes para [grupos](grouping) de registros, ver ["Resumir grupos de filas"](#resumir-grupos-de-filas).

Los objetos "Summarizer" pueden añadirse a cualquier [columna de tabla](columns) usando el método `summarize()`:

```php
use Filament\Tables\Columns\Summarizers\Average;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('rating')
    ->summarize(Average::make())
```

Múltiples "summarizers" pueden ser añadidos a la misma columna:

```php
use Filament\Tables\Columns\Summarizers\Average;
use Filament\Tables\Columns\Summarizers\Range;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('rating')
    ->numeric()
    ->summarize([
        Average::make(),
        Range::make(),
    ])
```

> La primera columna de una tabla no puede usar summarizers. Esa columna se usa para renderizar el título y subtítulos de la sección de resumen.

## Summarizers disponibles

Filament incluye cuatro tipos de summarizer:

- [Average](#average)
- [Count](#count)
- [Range](#range)
- [Sum](#sum)

También puedes [crear tus propios summarizers personalizados](#resúmenes-personalizados).

## Average

Se usa para calcular el promedio de todos los valores:

```php
use Filament\Tables\Columns\Summarizers\Average;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('rating')
    ->summarize(Average::make())
```

## Count

Se usa para contar el número total de valores en el dataset:

```php
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\Summarizers\Count;
use Illuminate\Database\Query\Builder;

IconColumn::make('is_published')
    ->boolean()
    ->summarize(
        Count::make()->query(fn (Builder $query) => $query->where('is_published', true)),
    ),
```

### Contar ocurrencia de íconos

Con columnas tipo ícono, puedes usar `icons()`:

```php
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\Summarizers\Count;

IconColumn::make('is_published')
    ->boolean()
    ->summarize(Count::make()->icons()),
```

## Range

Se usa para calcular el mínimo y el máximo:

```php
use Filament\Tables\Columns\Summarizers\Range;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('price')
    ->summarize(Range::make())
```

### Rango de fechas

```php
TextColumn::make('created_at')
    ->dateTime()
    ->summarize(Range::make()->minimalDateTimeDifference())
```

### Rango de texto

```php
TextColumn::make('sku')
    ->summarize(Range::make()->minimalTextualDifference())
```

### Incluir valores nulos

```php
TextColumn::make('sku')
    ->summarize(Range::make()->excludeNull(false))
```

## Sum

Calcular la suma total:

```php
use Filament\Tables\Columns\Summarizers\Sum;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('price')
    ->summarize(Sum::make())
```

## Configurar etiqueta

```php
TextColumn::make('price')
    ->summarize(Sum::make()->label('Total'))
```

## Limitar dataset con query

```php
use Filament\Tables\Columns\Summarizers\Average;
use Illuminate\Database\Query\Builder;

TextColumn::make('rating')
    ->summarize(
        Average::make()->query(fn (Builder $query) => $query->where('is_published', true)),
    ),
```

## Formateo

### Números

```php
TextColumn::make('rating')
    ->summarize(Average::make()->numeric(decimalPlaces: 0))
```

Con locale:

```php
TextColumn::make('rating')
    ->summarize(Average::make()->numeric(locale: 'nl'))
```

### Moneda

```php
TextColumn::make('price')
    ->summarize(Sum::make()->money('EUR'))
```

Dividir por 100:

```php
TextColumn::make('price')
    ->summarize(Sum::make()->money('EUR', divideBy: 100))
```

### Limitar longitud

```php
TextColumn::make('sku')
    ->summarize(Range::make()->limit(5))
```

### Prefijo y sufijo

```php
use Illuminate\Support\HtmlString;

TextColumn::make('volume')
    ->summarize(Sum::make()
        ->prefix('Total volume: ')
        ->suffix(new HtmlString(' m&sup3;'))
    )
```

## Resúmenes personalizados

```php
use Filament\Tables\Columns\Summarizers\Summarizer;
use Illuminate\Database\Query\Builder;

TextColumn::make('name')
    ->summarize(Summarizer::make()
        ->label('First last name')
        ->using(fn (Builder $query): string => $query->min('last_name')))
```

## Ocultar condicionalmente

```php
TextColumn::make('sku')
    ->summarize(Summarizer::make()
        ->hidden(fn (Builder $query): bool => ! $query->exists()))
```

Visibilidad opuesta:

```php
TextColumn::make('sku')
    ->summarize(Summarizer::make()
        ->visible(fn (Builder $query): bool => $query->exists()))
```

## Resumir grupos de filas

Puedes usar summaries con [groups](grouping):

```php
public function table(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('views_count')
                ->summarize(Sum::make()),
            TextColumn::make('likes_count')
                ->summarize(Sum::make()),
        ])
        ->defaultGroup('category')
        ->groupsOnly();
}
```
