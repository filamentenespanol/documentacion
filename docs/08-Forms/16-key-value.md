---
title: Key-value
---

## Introducción

El campo key-value te permite interactuar con un objeto JSON unidimensional:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
```

Si estás guardando los datos en Eloquent, debes asegurarte de añadir un [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) `array` a la propiedad del modelo:

```php
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    { 
        return [
            'meta' => 'array',
        ];
    }

    // ...
}
```

## Añadir filas

Se muestra un botón de acción debajo del campo para permitir al usuario añadir una nueva fila.

## Establecer la etiqueta del botón de añadir

Puedes establecer una etiqueta para personalizar el texto que debe mostrarse en el botón para añadir una fila, usando el método `addActionLabel()`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->addActionLabel('Add property')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>addActionLabel()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Evitar que el usuario añada filas

Puedes evitar que el usuario añada filas usando el método `addable(false)`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->addable(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>addable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Eliminar filas

Se muestra un botón de acción en cada elemento para permitir al usuario eliminarlo.

### Evitar que el usuario elimine filas

Puedes evitar que el usuario elimine filas usando el método `deletable(false)`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->deletable(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>deletable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Editar claves

### Personalizar la etiqueta de los campos de clave

Puedes personalizar la etiqueta para los campos de clave usando el método `keyLabel()`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->keyLabel('Property name')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>keyLabel()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Añadir placeholders al campo de clave

También puedes añadir placeholders para los campos de clave usando el método `keyPlaceholder()`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->keyPlaceholder('Property name')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>keyPlaceholder()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Evitar que el usuario edite claves

Puedes evitar que el usuario edite claves usando el método `editableKeys(false)`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->editableKeys(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>editableKeys()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Editar valores

### Personalizar la etiqueta de los campos de valor

Puedes personalizar la etiqueta para los campos de valor usando el método `valueLabel()`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->valueLabel('Property value')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>valueLabel()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Añadir placeholders al campo de valor

También puedes añadir placeholders para los campos de valor usando el método `valuePlaceholder()`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->valuePlaceholder('Property value')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>valuePlaceholder()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Evitar que el usuario edite valores

Puedes evitar que el usuario edite valores usando el método `editableValues(false)`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->editableValues(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>editableValues()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Reordenar filas

Puedes permitir que el usuario reordene las filas dentro de la tabla usando el método `reorderable()`:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->reorderable()
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>reorderable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Personalizar los objetos de acción de key-value

Este campo usa objetos de acción para facilitar la personalización de los botones dentro de él. Puedes personalizar estos botones pasando una función a un método de registro de acciones. La función tiene acceso al objeto `$action`, que puedes usar para [personalizarlo](../actions/overview). Los siguientes métodos están disponibles para personalizar las acciones:

- `addAction()`
- `deleteAction()`
- `reorderAction()`

Aquí hay un ejemplo de cómo podrías personalizar una acción:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\KeyValue;
use Filament\Support\Icons\Heroicon;

KeyValue::make('meta')
    ->deleteAction(
        fn (Action $action) => $action->icon(Heroicon::XMark),
    )
```

<details>
  <summary>Inyección de utilidades</summary>
  Los métodos de registro de acción pueden inyectar varias utilidades en la función como parámetros.
</details>
