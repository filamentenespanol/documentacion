---
title: Estado vacío
---

## Introducción

El "estado vacío" de la tabla se muestra cuando no hay filas en la tabla.

## Personalizar el encabezado del estado vacío

Para personalizar el encabezado, usa `emptyStateHeading()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->emptyStateHeading('Aún no hay publicaciones');
}
```

## Personalizar la descripción del estado vacío

Para la descripción, usa `emptyStateDescription()`:

```php
public function table(Table $table): Table
{
    return $table
        ->emptyStateDescription('Cuando escribas tu primera publicación, aparecerá aquí.');
}
```

## Personalizar el ícono del estado vacío

Puedes asignar un [ícono](../styling/icons) con `emptyStateIcon()`:

```php
public function table(Table $table): Table
{
    return $table
        ->emptyStateIcon('heroicon-o-bookmark');
}
```

## Agregar acciones al estado vacío

Puedes añadir [acciones](actions) con `emptyStateActions()`:

```php
use Filament\Actions\Action;

public function table(Table $table): Table
{
    return $table
        ->emptyStateActions([
            Action::make('create')
                ->label('Crear publicación')
                ->url(route('posts.create'))
                ->icon('heroicon-m-plus')
                ->button(),
        ]);
}
```

## Usar una vista personalizada para el estado vacío

También puedes usar una vista Blade personalizada con `emptyState()`:

```php
public function table(Table $table): Table
{
    return $table
        ->emptyState(view('tables.posts.empty-state'));
}
```
