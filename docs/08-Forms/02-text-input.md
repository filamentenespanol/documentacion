---
title: Text input
---

## Introducción

El campo de texto te permite interactuar con una cadena:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
```

## Configurar el tipo de input HTML

Puedes establecer el tipo de cadena usando varios métodos. Algunos, como `email()`, también proporcionan validación:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('text')
    ->email() // o
    ->numeric() // o
    ->integer() // o
    ->password() // o
    ->tel() // o
    ->url()
```

También puedes usar el método `type()` para pasar otro [tipo de input HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types):

```php
use Filament\Forms\Components\TextInput;

TextInput::make('backgroundColor')
    ->type('color')
```

Los métodos individuales de tipo también aceptan un valor booleano para controlar si el campo debe ser de ese tipo o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('text')
    ->email(FeatureFlag::active()) // o
    ->numeric(FeatureFlag::active()) // o
    ->integer(FeatureFlag::active()) // o
    ->password(FeatureFlag::active()) // o
    ->tel(FeatureFlag::active()) // o
    ->url(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, estos métodos también aceptan una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Configurar el modo de input HTML

Puedes establecer el atributo [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#inputmode) del input usando el método `inputMode()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('text')
    ->numeric()
    ->inputMode('decimal')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>inputMode()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Configurar el paso numérico

Puedes establecer el atributo [`step`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step) del input usando el método `step()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('number')
    ->numeric()
    ->step(100)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>step()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Autocompletar texto

Puedes permitir que el texto sea [autocompletado por el navegador](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete) usando el método `autocomplete()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password')
    ->password()
    ->autocomplete('new-password')
```

Como atajo para `autocomplete="off"`, puedes usar `autocomplete(false)`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password')
    ->password()
    ->autocomplete(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>autocomplete()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

Para opciones de autocompletado más complejas, los inputs de texto también soportan [datalists](#autocompletar-texto-con-una-datalist).

### Autocompletar texto con una datalist

Puedes especificar opciones de [datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) para un input de texto usando el método `datalist()`:

```php
TextInput::make('manufacturer')
    ->datalist([
        'BMW',
        'Ford',
        'Mercedes-Benz',
        'Porsche',
        'Toyota',
        'Volkswagen',
    ])
```

Las datalists proporcionan opciones de autocompletado a los usuarios cuando usan un input de texto. Sin embargo, son solo recomendaciones, y el usuario aún puede escribir cualquier valor. Si quieres limitar estrictamente a opciones predefinidas, mira el [campo select](select).

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>datalist()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Autocapitalizar texto

Puedes permitir que el texto sea [autocapitalizado por el navegador](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocapitalize) usando el método `autocapitalize()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->autocapitalize('words')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>autocapitalize()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Añadir texto de prefijo/sufijo junto al campo

Puedes colocar texto antes y después del input usando los métodos `prefix()` y `suffix()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('domain')
    ->prefix('https://')
    ->suffix('.com')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>prefix()</code> y <code>suffix()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Usar iconos como prefijos/sufijos

Puedes colocar un [icono](../styling/icons) antes y después del input usando los métodos `prefixIcon()` y `suffixIcon()`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Support\Icons\Heroicon;

TextInput::make('domain')
    ->url()
    ->suffixIcon(Heroicon::GlobeAlt)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>prefixIcon()</code> y <code>suffixIcon()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

#### Establecer el color del icono de prefijo/sufijo

Los iconos de prefijo/sufijo son grises por defecto, pero puedes establecer otro color usando `prefixIconColor()` y `suffixIconColor()`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Support\Icons\Heroicon;

TextInput::make('domain')
    ->url()
    ->suffixIcon(Heroicon::CheckCircle)
    ->suffixIconColor('success')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>prefixIconColor()</code> y <code>suffixIconColor()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Inputs de contraseña revelables

Al usar `password()`, también puedes hacer el input `revealable()`, para que el usuario vea en texto plano la contraseña que escribe pulsando un botón:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password')
    ->password()
    ->revealable()
```

Opcionalmente, puedes pasar un booleano para controlar si el input debe ser revelable o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password')
    ->password()
    ->revealable(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>revealable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Permitir copiar el texto al portapapeles

Puedes hacer que el texto sea copiable, de modo que al hacer clic en un botón junto al input se copie el texto al portapapeles, y opcionalmente especificar un mensaje de confirmación personalizado y duración en milisegundos:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('apiKey')
    ->label('API key')
    ->copyable(copyMessage: 'Copied!', copyMessageDuration: 1500)
```

Opcionalmente, puedes pasar un booleano para controlar si el texto debe ser copiable o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('apiKey')
    ->label('API key')
    ->copyable(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los parámetros de <code>copyable()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

:::warning
Esta funcionalidad solo funciona cuando SSL está habilitado para la aplicación.
:::

## Enmascarar inputs

El enmascarado de inputs es la práctica de definir un formato al que el valor del input debe ajustarse.

En Filament, puedes usar el método `mask()` para configurar una [máscara de Alpine.js](https://alpinejs.dev/plugins/mask#x-mask):

```php
use Filament\Forms\Components\TextInput;

TextInput::make('birthday')
    ->mask('99/99/9999')
    ->placeholder('MM/DD/YYYY')
```

Para usar una [máscara dinámica](https://alpinejs.dev/plugins/mask#mask-functions), envuelve el JavaScript en un objeto `RawJs`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Support\RawJs;

TextInput::make('cardNumber')
    ->mask(RawJs::make(<<<'JS'
        $input.startsWith('34') || $input.startsWith('37') ? '9999 999999 99999' : '9999 9999 9999 9999'
    JS))
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>mask()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

Alpine.js enviará todo el valor enmascarado al servidor, por lo que puede que necesites eliminar ciertos caracteres del estado antes de validar y guardar. Puedes hacerlo con el método `stripCharacters()`, pasando un carácter o un array de caracteres a eliminar del valor enmascarado:

```php
use Filament\Forms\Components\TextInput;
use Filament\Support\RawJs;

TextInput::make('amount')
    ->mask(RawJs::make('$money($input)'))
    ->stripCharacters(',')
    ->numeric()
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>stripCharacters()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Recortar espacios en blanco

Puedes recortar automáticamente los espacios en blanco al principio y al final del valor usando el método `trim()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->trim()
```

Quizá quieras habilitar el recorte globalmente para todos los inputs de texto, similar al middleware `TrimStrings` de Laravel. Puedes hacerlo en un service provider usando `configureUsing()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::configureUsing(function (TextInput $component): void {
    $component->trim();
});
```

## Hacer el campo de solo lectura

Sin confundirlo con [deshabilitar el campo](overview#disabling-a-field), puedes hacer el campo "solo lectura" usando `readOnly()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->readOnly()
```

Hay algunas diferencias respecto a [`disabled()`](overview#disabling-a-field):

- Al usar `readOnly()`, el campo seguirá enviándose al servidor cuando se envíe el formulario. Puede modificarse con la consola del navegador o vía JavaScript. Puedes usar [`dehydrated(false)`](overview#preventing-a-field-from-being-dehydrated) para evitarlo.
- No hay cambios de estilo, como menor opacidad, al usar `readOnly()`.
- El campo sigue siendo enfocable al usar `readOnly()`.

Opcionalmente, puedes pasar un booleano para controlar si el campo debe ser de solo lectura o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->readOnly(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>readOnly()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Validación del input de texto

Además de todas las reglas listadas en la página de [validación](validation), hay reglas adicionales específicas para inputs de texto.

### Validación de longitud

Puedes limitar la longitud del input estableciendo los métodos `minLength()` y `maxLength()`. Estos métodos añaden validación tanto en frontend como en backend:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->minLength(2)
    ->maxLength(255)
```

También puedes especificar la longitud exacta del input estableciendo `length()`. Este método añade validación tanto en frontend como en backend:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('code')
    ->length(8)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>minLength()</code>, <code>maxLength()</code> y <code>length()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Validación de tamaño

Puedes validar el valor mínimo y máximo de un input numérico estableciendo los métodos `minValue()` y `maxValue()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('number')
    ->numeric()
    ->minValue(1)
    ->maxValue(100)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>minValue()</code> y <code>maxValue()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Validación de número de teléfono

Al usar un campo `tel()`, el valor se validará con: `/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/`.

Si deseas cambiarlo, puedes usar el método `telRegex()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('phone')
    ->tel()
    ->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/')
```

Alternativamente, para personalizar `telRegex()` en todos los campos, usa un service provider:

```php
use Filament\Forms\Components\TextInput;

TextInput::configureUsing(function (TextInput $component): void {
    $component->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/');
});
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>telRegex()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>
