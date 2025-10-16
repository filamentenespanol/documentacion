---
title: Tags input
---

## Introducción

El componente tags input te permite interactuar con una lista de etiquetas.

Por defecto, las etiquetas se almacenan en JSON:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
```

Si estás guardando las etiquetas JSON usando Eloquent, debes asegurarte de añadir un [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) `array` a la propiedad del modelo:

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
            'tags' => 'array',
        ];
    }

    // ...
}
```

:::tip
Filament también soporta [`spatie/laravel-tags`](https://github.com/spatie/laravel-tags). Consulta nuestra [documentación de plugin](/plugins/filament-spatie-tags) para más información.
:::

## Etiquetas separadas por comas

Puedes permitir que las etiquetas se almacenen en un string separado, en lugar de JSON. Para configurar esto, pasa el carácter separador al método `separator()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
    ->separator(',')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>separator()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Autocompletar sugerencias de etiquetas

Los tags inputs pueden tener sugerencias de autocompletado. Para habilitar esto, pasa un array de sugerencias al método `suggestions()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
    ->suggestions([
        'tailwindcss',
        'alpinejs',
        'laravel',
        'livewire',
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un array estático, el método <code>suggestions()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Definir teclas de división

Las teclas de división te permiten mapear botones específicos en el teclado de tu usuario para crear una nueva etiqueta. Por defecto, cuando el usuario presiona "Enter", se crea una nueva etiqueta en el input. También puedes definir otras teclas para crear nuevas etiquetas, como "Tab" o " ". Para hacer esto, pasa un array de teclas al método `splitKeys()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
    ->splitKeys(['Tab', ' '])
```

Puedes [leer más sobre las opciones posibles para las teclas](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key).

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un array estático, el método <code>splitKeys()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Añadir un prefijo y sufijo a etiquetas individuales

Puedes añadir prefijo y sufijo a las etiquetas sin modificar el estado real del campo. Esto puede ser útil si necesitas mostrar formato de presentación a los usuarios sin guardarlo. Esto se hace con el método `tagPrefix()` o `tagSuffix()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('percentages')
    ->tagSuffix('%')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>tagPrefix()</code> y <code>tagSuffix()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.
</details>

## Reordenar etiquetas

Puedes permitir que el usuario reordene las etiquetas dentro del campo usando el método `reorderable()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
    ->reorderable()
```

Opcionalmente, puedes pasar un valor booleano para controlar si las etiquetas deben ser reordenables o no:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
    ->reorderable(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>reorderable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Cambiar el color de las etiquetas

Puedes cambiar el color de las etiquetas pasando un [color](../styling/colors) al método `color()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
    ->color('danger')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>color()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Recortar espacios en blanco

Puedes recortar automáticamente los espacios en blanco del principio y el final de cada etiqueta usando el método `trim()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
    ->trim()
```

Puede que desees habilitar el recorte globalmente para todos los tags inputs, similar al middleware `TrimStrings` de Laravel. Puedes hacer esto en un service provider usando el método `configureUsing()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::configureUsing(function (TagsInput $component): void {
    $component->trim();
});
```

## Validación de etiquetas

Puedes añadir reglas de validación para cada etiqueta pasando un array de reglas al método `nestedRecursiveRules()`:

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('tags')
    ->nestedRecursiveRules([
        'min:3',
        'max:255',
    ])
```
