---
title: Filtros ternarios
---

## Introducción

Los filtros ternarios te permiten crear fácilmente un filtro select que tiene tres estados: usualmente verdadero, falso y en blanco. Para filtrar una columna llamada `is_admin` como `true` o `false`, puedes usar el filtro ternario:

```php
use Filament\Tables\Filters\TernaryFilter;

TernaryFilter::make('is_admin')
```

## Usar un filtro ternario con una columna nullable

Otro patrón común es usar una columna nullable. Por ejemplo, al filtrar usuarios verificados y no verificados usando la columna `email_verified_at`, los usuarios no verificados tienen un valor nulo en esta columna. Para aplicar esa lógica, puedes usar el método `nullable()`:

```php
use Filament\Tables\Filters\TernaryFilter;

TernaryFilter::make('email_verified_at')
    ->nullable()
```

## Personalizar la columna usada por un filtro ternario

El nombre de la columna usada para delimitar la consulta es el nombre del filtro. Para personalizar esto, puedes usar el método `attribute()`:

```php
use Filament\Tables\Filters\TernaryFilter;

TernaryFilter::make('verified')
    ->nullable()
    ->attribute('status_id')
```

## Personalizar las etiquetas de opciones del filtro ternario

Puedes personalizar las etiquetas usadas para cada estado del filtro ternario. La etiqueta para la opción verdadero puede personalizarse usando el método `trueLabel()`. La etiqueta para la opción falso puede personalizarse usando el método `falseLabel()`. La etiqueta para la opción en blanco (por defecto) puede personalizarse usando el método `placeholder()`:

```php
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Filters\TernaryFilter;

TernaryFilter::make('email_verified_at')
    ->label('Verificación de correo')
    ->nullable()
    ->placeholder('Todos los usuarios')
    ->trueLabel('Usuarios verificados')
    ->falseLabel('Usuarios no verificados')
```

## Personalizar cómo un filtro ternario modifica la consulta

Puedes personalizar cómo cambia la consulta para cada estado del filtro ternario usando el método `queries()`:

```php
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Filters\TernaryFilter;

TernaryFilter::make('email_verified_at')
    ->label('Verificación de correo')
    ->placeholder('Todos los usuarios')
    ->trueLabel('Usuarios verificados')
    ->falseLabel('Usuarios no verificados')
    ->queries(
        true: fn (Builder $query) => $query->whereNotNull('email_verified_at'),
        false: fn (Builder $query) => $query->whereNull('email_verified_at'),
        blank: fn (Builder $query) => $query, // En este ejemplo, no queremos filtrar la consulta cuando está en blanco.
    )
```

## Filtrar registros eliminables lógicamente (soft-deletes)

El `TrashedFilter` puede usarse para filtrar registros eliminados lógicamente. Es un tipo de filtro ternario que viene integrado en Filament. Puedes usarlo así:

```php
use Filament\Tables\Filters\TrashedFilter;

TrashedFilter::make()
```
