---
title: Checkbox
---

## Introducción

El componente checkbox, similar a un [toggle](toggle), te permite interactuar con un valor booleano.

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('is_admin')
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

## Posicionar la etiqueta arriba

Los campos checkbox tienen dos modos de diseño, en línea (inline) y apilado (stacked). Por defecto, son en línea.

Cuando el checkbox está en línea, su etiqueta está adyacente a él:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('is_admin')
    ->inline()
```

Cuando el checkbox está apilado, su etiqueta está arriba:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('is_admin')
    ->inline(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>inline()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Validación del checkbox

Además de todas las reglas listadas en la página de [validación](validation), existen reglas adicionales que son específicas para checkboxes.

### Validación "accepted"

Puedes asegurarte de que el checkbox esté marcado usando el método `accepted()`:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('terms_of_service')
    ->accepted()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la regla de validación debe aplicarse o no:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('terms_of_service')
    ->accepted(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>accepted()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Validación "declined"

Puedes asegurarte de que el checkbox no esté marcado usando el método `declined()`:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('is_under_18')
    ->declined()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la regla de validación debe aplicarse o no:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('is_under_18')
    ->declined(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>declined()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>
