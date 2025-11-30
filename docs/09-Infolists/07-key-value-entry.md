---
title: Entrada de clave-valor
---

## Introducción

La entrada de clave-valor te permite renderizar pares de datos clave-valor, de un objeto JSON / array PHP de una dimensión.

```php
use Filament\Infolists\Components\KeyValueEntry;

KeyValueEntry::make('meta')
```

Por ejemplo, el estado de esta entrada podría representarse como:

```php
[
    'description' => 'Filament is a collection of Laravel packages',
    'og:type' => 'website',
    'og:site_name' => 'Filament',
]
```

Si estás guardando los datos en Eloquent, debes asegurarte de agregar un cast `array` [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) a la propiedad del modelo:

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

## Personalizando la etiqueta de la columna de clave

Puedes personalizar la etiqueta para la columna de clave usando el método `keyLabel()`:

```php
use Filament\Infolists\Components\KeyValueEntry;

KeyValueEntry::make('meta')
    ->keyLabel('Property name')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `keyLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizando la etiqueta de la columna de valor

Puedes personalizar la etiqueta para la columna de valor usando el método `valueLabel()`:

```php
use Filament\Infolists\Components\KeyValueEntry;

KeyValueEntry::make('meta')
    ->valueLabel('Property value')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `valueLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>
