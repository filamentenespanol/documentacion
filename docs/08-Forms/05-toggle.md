---
title: Toggle
---

## Introducción

El componente toggle, similar a un [checkbox](checkbox), te permite interactuar con un valor booleano.

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
```

Si estás guardando el valor booleano usando Eloquent, debes asegurarte de agregar un `boolean` [cast](https://laravel.com/docs/eloquent-mutators#attribute-casting) a la propiedad del modelo:

```php
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_admin' => 'boolean',
        ];
    }

    // ...
}
```

## Añadir iconos al botón toggle

Los toggles también pueden usar un [icono](../styling/icons) para representar el estado "on" y "off" del botón. Para añadir un icono al estado "on", utiliza el método `onIcon()`. Para añadir un icono al estado "off", utiliza el método `offIcon()`:

```php
use Filament\Forms\Components\Toggle;
use Filament\Support\Icons\Heroicon;

Toggle::make('is_admin')
    ->onIcon(Heroicon::Bolt)
    ->offIcon(Heroicon::User)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>onIcon()</code> y <code>offIcon()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar el color del botón toggle

También puedes personalizar el [color](../styling/colors) que representa el estado "on" u "off" del toggle. Para añadir un color al estado "on", utiliza el método `onColor()`. Para añadir un color al estado "off", utiliza el método `offColor()`:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->onColor('success')
    ->offColor('danger')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>onColor()</code> y <code>offColor()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Posicionar la etiqueta arriba

Los campos toggle tienen dos modos de diseño, en línea (inline) y apilado (stacked). Por defecto, son en línea.

Cuando el toggle está en línea, su etiqueta está adyacente a él:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->inline()
```

Cuando el toggle está apilado, su etiqueta está arriba:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->inline(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>inline()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Validación del toggle

Además de todas las reglas listadas en la página de [validación](validation), existen reglas adicionales que son específicas para toggles.

### Validación "accepted"

Puedes asegurarte de que el toggle esté en "on" usando el método `accepted()`:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('terms_of_service')
    ->accepted()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la regla de validación debe aplicarse o no:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('terms_of_service')
    ->accepted(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>accepted()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Validación "declined"

Puedes asegurarte de que el toggle esté en "off" usando el método `declined()`:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_under_18')
    ->declined()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la regla de validación debe aplicarse o no:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_under_18')
    ->declined(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>declined()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>
