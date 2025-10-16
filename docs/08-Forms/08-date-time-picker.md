---
title: Date-time picker
---

## Introducción

El selector de fecha y hora proporciona una interfaz interactiva para seleccionar una fecha y/o una hora.

```php
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TimePicker;

DateTimePicker::make('published_at')
DatePicker::make('date_of_birth')
TimePicker::make('alarm_at')
```

## Personalizar el formato de almacenamiento

Puedes personalizar el formato del campo cuando se guarda en tu base de datos usando el método `format()`. Este acepta un string de formato de fecha, usando [tokens de formato de fecha de PHP](https://www.php.net/manual/en/datetime.format.php):

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('date_of_birth')
    ->format('d/m/Y')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>format()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Deshabilitar la entrada de segundos

Al usar el selector de tiempo, puedes deshabilitar la entrada de segundos usando el método `seconds(false)`:

```php
use Filament\Forms\Components\DateTimePicker;

DateTimePicker::make('published_at')
    ->seconds(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>seconds()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Zonas horarias

Si quieres que los usuarios puedan gestionar fechas en su propia zona horaria, puedes usar el método `timezone()`:

```php
use Filament\Forms\Components\DateTimePicker;

DateTimePicker::make('published_at')
    ->timezone('America/New_York')
```

Aunque las fechas seguirán almacenándose usando la zona horaria configurada de la aplicación, la fecha ahora se cargará en la nueva zona horaria y se convertirá de vuelta cuando se guarde el formulario.

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>timezone()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si no pasas un `timezone()` al componente, usará la zona horaria predeterminada de Filament. Puedes establecer la zona horaria predeterminada de Filament usando el método `FilamentTimezone::set()` en el método `boot()` de un service provider como `AppServiceProvider`:

```php
use Filament\Support\Facades\FilamentTimezone;

public function boot(): void
{
    FilamentTimezone::set('America/New_York');
}
```

Esto es útil si quieres establecer una zona horaria predeterminada para todos los selectores de fecha y hora en tu aplicación. También se usa en otros lugares donde se usan zonas horarias en Filament.

:::warning
La zona horaria predeterminada de Filament solo se aplicará cuando el campo almacene una hora. Si el campo almacena solo una fecha (`DatePicker` en lugar de `DateTimePicker` o `TimePicker`), la zona horaria no se aplicará. Esto es para evitar cambios de zona horaria al almacenar fechas sin horas.
:::

## Habilitar el selector de fecha en JavaScript

Por defecto, Filament usa el selector de fecha nativo de HTML5. Puedes habilitar un selector de fecha en JavaScript más personalizable usando el método `native(false)`:

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('date_of_birth')
    ->native(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>native()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::info
El selector de fecha en JavaScript no admite entrada completa por teclado de la misma manera que el selector de fecha nativo. Si necesitas entrada completa por teclado, deberías usar el selector nativo.
:::

### Personalizar el formato de visualización

Puedes personalizar el formato de visualización del campo, por separado del formato usado cuando se guarda en tu base de datos. Para esto, usa el método `displayFormat()`, que también acepta un string de formato de fecha, usando [tokens de formato de fecha de PHP](https://www.php.net/manual/en/datetime.format.php):

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('date_of_birth')
    ->native(false)
    ->displayFormat('d/m/Y')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>displayFormat()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

También puedes configurar la localización que se usa al renderizar la visualización, si quieres usar una localización distinta a la de la configuración de tu app. Para esto, puedes usar el método `locale()`:

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('date_of_birth')
    ->native(false)
    ->displayFormat('d F Y')
    ->locale('fr')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>locale()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Configurar los intervalos de entrada de tiempo

Puedes personalizar el intervalo de entrada para incrementar/decrementar horas/minutos/segundos usando los métodos `hoursStep()`, `minutesStep()` o `secondsStep()`:

```php
use Filament\Forms\Components\DateTimePicker;

DateTimePicker::make('published_at')
    ->native(false)
    ->hoursStep(2)
    ->minutesStep(15)
    ->secondsStep(10)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>hoursStep()</code>, <code>minutesStep()</code> y <code>secondsStep()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

### Configurar el primer día de la semana

En algunos países, el primer día de la semana no es lunes. Para personalizar el primer día de la semana en el selector de fecha, usa el método `firstDayOfWeek()` en el componente. Se aceptan valores del 0 al 7, con lunes como 1 y domingo como 7 o 0:

```php
use Filament\Forms\Components\DateTimePicker;

DateTimePicker::make('published_at')
    ->native(false)
    ->firstDayOfWeek(7)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>firstDayOfWeek()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Hay, además, métodos helper convenientes para establecer el primer día de la semana de forma más semántica:

```php
use Filament\Forms\Components\DateTimePicker;

DateTimePicker::make('published_at')
    ->native(false)
    ->weekStartsOnMonday()

DateTimePicker::make('published_at')
    ->native(false)
    ->weekStartsOnSunday()
```

### Deshabilitar fechas específicas

Para evitar que se seleccionen fechas específicas:

```php
use Filament\Forms\Components\DateTimePicker;

DateTimePicker::make('date')
    ->native(false)
    ->disabledDates(['2000-01-03', '2000-01-15', '2000-01-20'])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>disabledDates()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Cerrar el selector cuando se elige una fecha

Para cerrar el selector cuando se elige una fecha, puedes usar el método `closeOnDateSelection()`:

```php
use Filament\Forms\Components\DateTimePicker;

DateTimePicker::make('date')
    ->native(false)
    ->closeOnDateSelection()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el input debe cerrarse cuando se elige una fecha o no:

```php
use Filament\Forms\Components\DateTimePicker;

DateTimePicker::make('date')
    ->native(false)
    ->closeOnDateSelection(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>closeOnDateSelection()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Autocompletar fechas con un datalist

A menos que estés usando el [selector de fecha en JavaScript](#habilitar-el-selector-de-fecha-en-javascript), puedes especificar opciones de [datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) para un selector de fecha usando el método `datalist()`:

```php
use Filament\Forms\Components\TimePicker;

TimePicker::make('appointment_at')
    ->datalist([
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
    ])
```

Los datalists proporcionan opciones de autocompletar a los usuarios cuando usan el selector. Sin embargo, son recomendaciones, y el usuario aún puede escribir cualquier valor en el input. Si buscas limitar estrictamente a un conjunto de opciones predefinidas, revisa el [campo select](select).

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>datalist()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Enfocar una fecha predeterminada del calendario

Por defecto, si el campo no tiene estado, al abrir el panel del calendario se abrirá en la fecha actual. Esto puede no ser conveniente cuando quieres abrir el calendario en una fecha específica. Puedes usar `defaultFocusedDate()` para establecer una fecha enfocada predeterminada en el calendario:

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('custom_starts_at')
    ->native(false)
    ->placeholder(now()->startOfMonth())
    ->defaultFocusedDate(now()->startOfMonth())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>defaultFocusedDate()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Añadir texto afijo junto al campo

Puedes colocar texto antes y después del input usando los métodos `prefix()` y `suffix()`:

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('date')
    ->prefix('Starts')
    ->suffix('at midnight')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>prefix()</code> y <code>suffix()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Usar iconos como afijos

Puedes colocar un [icono](../styling/icons) antes y después del input usando los métodos `prefixIcon()` y `suffixIcon()`:

```php
use Filament\Forms\Components\TimePicker;
use Filament\Support\Icons\Heroicon;

TimePicker::make('at')
    ->prefixIcon(Heroicon::Play)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>prefixIcon()</code> y <code>suffixIcon()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Establecer el color del icono afijo

Los iconos afijos son grises por defecto, pero puedes establecer un color diferente usando los métodos `prefixIconColor()` y `suffixIconColor()`:

```php
use Filament\Forms\Components\TimePicker;
use Filament\Support\Icons\Heroicon;

TimePicker::make('at')
    ->prefixIcon(Heroicon::CheckCircle)
    ->prefixIconColor('success')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>prefixIconColor()</code> y <code>suffixIconColor()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Hacer el campo de solo lectura

Para no confundir con [deshabilitar el campo](overview#disabling-a-field), puedes hacer que el campo sea "solo lectura" usando el método `readonly()`:

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('date_of_birth')
    ->readonly()
```

Ten en cuenta que esta configuración solo se aplica a selectores de fecha nativos. Si estás usando el [selector de fecha en JavaScript](#habilitar-el-selector-de-fecha-en-javascript), necesitarás usar [`disabled()`](overview#disabling-a-field).

Hay algunas diferencias en comparación con [`disabled()`](overview#disabling-a-field):

- Cuando usas `readOnly()`, el campo aún se enviará al servidor cuando se envíe el formulario. Puede ser mutado con la consola del navegador o via JavaScript. Puedes usar [`dehydrated(false)`](overview#preventing-a-field-from-being-dehydrated) para prevenir esto.
- No hay cambios de estilo, como menor opacidad, cuando usas `readOnly()`.
- El campo aún es enfocable cuando usas `readOnly()`.

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe ser de solo lectura o no:

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('date_of_birth')
    ->readOnly(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>readOnly()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Validación del selector de fecha y hora

Además de todas las reglas listadas en la página de [validación](validation), hay reglas adicionales específicas para los selectores de fecha y hora.

### Validación de fecha máxima / mínima

Puedes restringir la fecha mínima y máxima que se puede seleccionar con el selector. Los métodos `minDate()` y `maxDate()` aceptan una instancia de `DateTime` (por ejemplo, `Carbon`), o un string:

```php
use Filament\Forms\Components\DatePicker;

DatePicker::make('date_of_birth')
    ->native(false)
    ->minDate(now()->subYears(150))
    ->maxDate(now())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>minDate()</code> y <code>maxDate()</code> también aceptan funciones para calcularlos dinámicamente. Si las funciones devuelven <code>null</code>, la regla de validación no se aplica. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>
