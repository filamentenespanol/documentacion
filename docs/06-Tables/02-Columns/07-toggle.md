---
title: Columna de toggle
---

## Introducción

La columna de toggle te permite renderizar un botón de alternancia dentro de la tabla, que puede usarse para actualizar ese registro de la base de datos sin necesidad de abrir una nueva página o modal:

```php
use Filament\Tables\Columns\ToggleColumn;

ToggleColumn::make('is_admin')
```

## Hooks del ciclo de vida

Los hooks pueden usarse para ejecutar código en varios puntos dentro del ciclo de vida del toggle:

```php
ToggleColumn::make()
    ->beforeStateUpdated(function ($record, $state) {
        // Se ejecuta antes de que el estado se guarde en la base de datos.
    })
    ->afterStateUpdated(function ($record, $state) {
        // Se ejecuta después de que el estado se guarde en la base de datos.
    })
```
