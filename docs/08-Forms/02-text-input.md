---
title: Campo de texto
---

## Introducción

El campo de texto te permite interactuar con una cadena:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
```

<AutoScreenshot name="forms/fields/text-input/simple" alt="Campo de texto" version="4.x" />

## Establecer el tipo de input HTML

Puedes establecer el tipo de cadena usando un conjunto de métodos. Algunos, como `email()`, también proporcionan validación:

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

Los métodos de tipo individuales también te permiten pasar un valor booleano para controlar si el campo debe ser de ese tipo o no:

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

## Establecer el modo de input HTML

Puedes establecer el atributo [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#inputmode) del campo usando el método `inputMode()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('text')
    ->numeric()
    ->inputMode('decimal')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `inputMode()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Establecer el paso numérico

Puedes establecer el atributo [`step`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step) del campo usando el método `step()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('number')
    ->numeric()
    ->step(100)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `step()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

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

Además de permitir un valor estático, el método `autocomplete()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Para opciones de autocompletado más complejas, los campos de texto también soportan [datalists](#autocompleting-text-with-a-datalist).

### Autocompletar texto con un datalist

Puedes especificar opciones de [datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) para un campo de texto usando el método `datalist()`:

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

Los datalists proporcionan opciones de autocompletado a los usuarios cuando usan un campo de texto. Sin embargo, son solo recomendaciones, y el usuario aún puede escribir cualquier valor en el campo. Si deseas limitar estrictamente a los usuarios a un conjunto de opciones predefinidas, revisa el [campo select](select).

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `datalist()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

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

Además de permitir un valor estático, el método `autocapitalize()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Añadir texto como prefijo o sufijo

Puedes colocar texto antes y después del campo usando los métodos `prefix()` y `suffix()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('domain')
    ->prefix('https://')
    ->suffix('.com')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `prefix()` y `suffix()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<AutoScreenshot name="forms/fields/text-input/affix" alt="Campo de texto con prefijos y sufijos" version="4.x" />

### Usar iconos como prefijos o sufijos

Puedes colocar un [icono](../styling/icons) antes y después del campo usando los métodos `prefixIcon()` y `suffixIcon()`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Support\Icons\Heroicon;

TextInput::make('domain')
    ->url()
    ->suffixIcon(Heroicon::GlobeAlt)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `prefixIcon()` y `suffixIcon()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<AutoScreenshot name="forms/fields/text-input/suffix-icon" alt="Campo de texto con icono como sufijo" version="4.x" />

#### Establecer el color del icono de prefijo/sufijo

Los iconos de prefijo y sufijo son grises por defecto, pero puedes establecer un color diferente usando los métodos `prefixIconColor()` y `suffixIconColor()`:

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

Además de permitir valores estáticos, los métodos `prefixIconColor()` y `suffixIconColor()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Campos de contraseña revelable

Al usar `password()`, también puedes hacer que el campo sea `revealable()`, de modo que el usuario pueda ver en texto plano la contraseña que está escribiendo al hacer clic en un botón:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password')
    ->password()
    ->revealable()
```

<AutoScreenshot name="forms/fields/text-input/revealable-password" alt="Campo de texto con contraseña revelable" version="4.x" />

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe ser revelable o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password')
    ->password()
    ->revealable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `revealable()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Permitir que el texto se copie al portapapeles

Puedes hacer que el texto sea copiable, de modo que al hacer clic en un botón junto al campo se copie el texto al portapapeles, y opcionalmente especificar un mensaje de confirmación personalizado y una duración en milisegundos:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('apiKey')
    ->label('API key')
    ->copyable(copyMessage: 'Copied!', copyMessageDuration: 1500)
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe ser copiable o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('apiKey')
    ->label('API key')
    ->copyable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los parámetros del método `copyable()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<Aside variant="warning">
    Esta característica solo funciona cuando SSL está habilitado en la aplicación.
</Aside>

## Enmascarado de input

El enmascarado de input es la práctica de definir un formato que el valor del campo debe seguir.

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

Además de permitir un valor estático, el método `mask()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Alpine.js enviará el valor completo enmascarado al servidor, por lo que puede que necesites eliminar ciertos caracteres del estado antes de validarlo y guardarlo. Puedes hacerlo con el método `stripCharacters()`, pasando un carácter o un array de caracteres a eliminar del valor enmascarado:

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

Además de permitir un valor estático, el método `stripCharacters()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Recortar espacios en blanco

Puedes recortar automáticamente los espacios en blanco del inicio y fin del valor del campo usando el método `trim()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->trim()
```

Puede que quieras habilitar el recorte globalmente para todos los campos de texto, similar al middleware `TrimStrings` de Laravel. Puedes hacerlo en un service provider usando el método `configureUsing()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::configureUsing(function (TextInput $component): void {
    $component->trim();
});
```

## Hacer el campo de solo lectura

No debe confundirse con [deshabilitar el campo](overview#disabling-a-field), puedes hacer que sea de "solo lectura" usando el método `readOnly()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->readOnly()
```

Existen algunas diferencias en comparación con [`disabled()`](overview#disabling-a-field):

- Con `readOnly()`, el campo aún se enviará al servidor al enviar el formulario. Puede ser modificado con la consola del navegador o mediante JavaScript. Puedes usar [`dehydrated(false)`](overview#preventing-a-field-from-being-dehydrated) para evitarlo.
- No hay cambios de estilo, como menor opacidad, al usar `readOnly()`.
- El campo sigue siendo enfocable con `readOnly()`.

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe ser de solo lectura o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->readOnly(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `readOnly()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Validación en campos de texto

Además de todas las reglas listadas en la página de [validación](validation), existen reglas adicionales específicas para campos de texto.

### Validación de longitud

Puedes limitar la longitud del campo estableciendo los métodos `minLength()` y `maxLength()`. Estos métodos agregan validación tanto en el frontend como en el backend:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->minLength(2)
    ->maxLength(255)
```

También puedes especificar la longitud exacta estableciendo `length()`. Este método agrega validación tanto en el frontend como en el backend:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('code')
    ->length(8)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `minLength()`, `maxLength()` y `length()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Validación de tamaño

Puedes validar el valor mínimo y máximo de un campo numérico estableciendo los métodos `minValue()` y `maxValue()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('number')
    ->numeric()
    ->minValue(1)
    ->maxValue(100)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `minValue()` y `maxValue()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Validación de número de teléfono

Al usar un campo `tel()`, el valor se validará usando: `/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/`.

Si deseas cambiar eso, entonces puedes usar el método `telRegex()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('phone')
    ->tel()
    ->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/')
```

Alternativamente, para personalizar el `telRegex()` en todos los campos, usa un service provider:

```php
use Filament\Forms\Components\TextInput;

TextInput::configureUsing(function (TextInput $component): void {
    $component->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/');
});
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `telRegex()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>
