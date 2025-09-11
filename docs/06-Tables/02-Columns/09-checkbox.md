---
title: Columna de casilla de verificación
---

## Introducción

La columna de casilla de verificación te permite renderizar un checkbox dentro de la tabla, que puede usarse para actualizar ese registro de la base de datos sin necesidad de abrir una nueva página o modal:

```php
use Filament\Tables\Columns\CheckboxColumn;

CheckboxColumn::make('is_admin')
```

## Hooks del ciclo de vida

Los hooks pueden usarse para ejecutar código en varios puntos dentro del ciclo de vida de la casilla de verificación:

```php
CheckboxColumn::make()
    ->beforeStateUpdated(function ($record, $state) {
        // Se ejecuta antes de que el estado se guarde en la base de datos.
    })
    ->afterStateUpdated(function ($record, $state) {
        // Se ejecuta después de que el estado se guarde en la base de datos.
    })
```
