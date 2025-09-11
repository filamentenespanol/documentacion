---
title: Columna de entrada de texto
---

## Introducción

La columna de entrada de texto te permite renderizar un campo de entrada de texto dentro de la tabla, que puede usarse para actualizar ese registro de la base de datos sin necesidad de abrir una nueva página o modal:

```php
use Filament\Tables\Columns\TextInputColumn;

TextInputColumn::make('email')
```

## Validación

Puedes validar la entrada pasando cualquier [regla de validación de Laravel](https://laravel.com/docs/validation#available-validation-rules) en un array:

```php
use Filament\Tables\Columns\TextInputColumn;

TextInputColumn::make('name')
    ->rules(['required', 'max:255'])
```

## Personalizar el tipo de entrada HTML

Puedes usar el método `type()` para pasar un [tipo de entrada HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) personalizado:

```php
use Filament\Tables\Columns\TextInputColumn;

TextInputColumn::make('background_color')->type('color')
```

## Hooks del ciclo de vida

Los hooks pueden usarse para ejecutar código en varios puntos dentro del ciclo de vida de la entrada:

```php
TextInputColumn::make()
    ->beforeStateUpdated(function ($record, $state) {
        // Se ejecuta antes de que el estado se guarde en la base de datos.
    })
    ->afterStateUpdated(function ($record, $state) {
        // Se ejecuta después de que el estado se guarde en la base de datos.
    })
```
