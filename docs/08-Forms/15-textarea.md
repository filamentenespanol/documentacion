---
title: Textarea
---

## Introducción

El textarea te permite interactuar con una cadena de varias líneas:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
```

## Redimensionar el textarea

Puedes cambiar el tamaño del textarea definiendo los métodos `rows()` y `cols()`:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->rows(10)
    ->cols(20)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>rows()</code> y <code>cols()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.
</details>

### Autoajustar el tamaño del textarea

Puedes permitir que el textarea se ajuste automáticamente para encajar su contenido estableciendo el método `autosize()`:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->autosize()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el textarea debe ser autoajustable o no:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->autosize(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>autosize()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Hacer el campo de solo lectura

Para no confundirse con [deshabilitar el campo](overview#disabling-a-field), puedes hacer el campo "solo lectura" usando el método `readOnly()`:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->readOnly()
```

Hay algunas diferencias, en comparación con [`disabled()`](overview#disabling-a-field):

- Al usar `readOnly()`, el campo aún se enviará al servidor cuando se envíe el formulario. Puede ser mutado con la consola del navegador o mediante JavaScript. Puedes usar [`dehydrated(false)`](overview#preventing-a-field-from-being-dehydrated) para evitar esto.
- No hay cambios de estilo, como menor opacidad, al usar `readOnly()`.
- El campo aún se puede enfocar al usar `readOnly()`.

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe ser de solo lectura o no:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->readOnly(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>readOnly()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Deshabilitar comprobaciones de Grammarly

Si el usuario tiene Grammarly instalado y deseas evitar que analice el contenido del textarea, puedes usar el método `disableGrammarly()`:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->disableGrammarly()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe desactivar las comprobaciones de Grammarly o no:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->disableGrammarly(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>disableGrammarly()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Recortar espacios en blanco

Puedes recortar automáticamente los espacios en blanco del principio y el final del valor del textarea usando el método `trim()`:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->trim()
```

Puede que quieras habilitar el recorte globalmente para todos los textareas, similar al middleware `TrimStrings` de Laravel. Puedes hacer esto en un service provider usando el método `configureUsing()`:

```php
use Filament\Forms\Components\Textarea;

Textarea::configureUsing(function (Textarea $component): void {
    $component->trim();
});
```

## Validación de textarea

Además de todas las reglas listadas en la página de [validación](validation), hay reglas adicionales que son específicas para los textareas.

### Validación de longitud

Puedes limitar la longitud del textarea estableciendo los métodos `minLength()` y `maxLength()`. Estos métodos agregan validación tanto en frontend como en backend:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('description')
    ->minLength(2)
    ->maxLength(1024)
```

También puedes especificar la longitud exacta del textarea estableciendo `length()`. Este método agrega validación tanto en frontend como en backend:

```php
use Filament\Forms\Components\Textarea;

Textarea::make('question')
    ->length(100)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>minLength()</code>, <code>maxLength()</code> y <code>length()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>
