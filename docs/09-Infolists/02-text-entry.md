---
title: Entrada de texto
---

## Introducción

Las entradas de texto muestran texto simple:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
```

## Personalizando el color

Puedes establecer un [color](../styling/colors) para el texto:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('status')
    ->color('primary')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `color()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregando un icono

Las entradas de texto también pueden tener un [icono](../styling/icons):

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Icons\Heroicon;

TextEntry::make('email')
    ->icon(Heroicon::Envelope)
```

<details>
<summary>Inyección de utilidades</summary>

El método `icon()` también acepta una función para calcular dinámicamente el icono. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Puedes establecer la posición de un icono usando `iconPosition()`:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\IconPosition;
use Filament\Support\Icons\Heroicon;

TextEntry::make('email')
    ->icon(Heroicon::Envelope)
    ->iconPosition(IconPosition::After) // `IconPosition::Before` o `IconPosition::After`
```

<details>
<summary>Inyección de utilidades</summary>

El método `iconPosition()` también acepta una función para calcular dinámicamente la posición del icono. Puedes inyectar varias utilidades en la función como parámetros.

</details>

El color del icono es predeterminadamente el color del texto, pero puedes personalizar el [color](../styling/colors) del icono por separado usando `iconColor()`:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Icons\Heroicon;

TextEntry::make('email')
    ->icon(Heroicon::Envelope)
    ->iconColor('primary')
```

<details>
<summary>Inyección de utilidades</summary>

El método `iconColor()` también acepta una función para calcular dinámicamente el color del icono. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Mostrando como una "insignia"

Por defecto, el texto es bastante simple y no tiene color de fondo. Puedes hacer que aparezca como una "insignia" en su lugar usando el método `badge()`. Un gran caso de uso para esto es con estados, donde es posible que desees mostrar una insignia con un [color](#personalizando-el-color) que coincida con el estado:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('status')
    ->badge()
    ->color(fn (string $state): string => match ($state) {
        'draft' => 'gray',
        'reviewing' => 'warning',
        'published' => 'success',
        'rejected' => 'danger',
    })
```

Puedes agregar otras cosas a la insignia, como un [icono](#agregando-un-icono).

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe estar en una insignia o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('status')
    ->badge(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `badge()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Formato

Cuando usas una entrada de texto, es posible que desees que el texto de salida real en la UI difiera del [estado](overview#contenido-de-entrada-estado) sin procesar de la entrada, que a menudo se recupera automáticamente de un modelo Eloquent. Formatear el estado te permite preservar la integridad de los datos sin procesar mientras también permites que se presente de una manera más amigable para el usuario.

Para formatear el estado de una entrada de texto sin cambiar el estado mismo, puedes usar el método `formatStateUsing()`. Este método acepta una función que toma el estado como argumento y devuelve el estado formateado:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('status')
    ->formatStateUsing(fn (string $state): string => __("statuses.{$state}"))
```

En este caso, la columna `status` en la base de datos podría contener valores como `draft`, `reviewing`, `published` o `rejected`, pero el estado formateado será la versión traducida de estos valores.

<details>
<summary>Inyección de utilidades</summary>

La función pasada a `formatStateUsing()` puede inyectar varias utilidades como parámetros.

</details>

### Formato de fecha

En lugar de pasar una función a `formatStateUsing()`, puedes usar los métodos `date()`, `dateTime()` y `time()` para formatear el estado de la entrada usando [tokens de formato de fecha PHP](https://www.php.net/manual/en/datetime.format.php):

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('created_at')
    ->date()

TextEntry::make('created_at')
    ->dateTime()

TextEntry::make('created_at')
    ->time()
```

Puedes personalizar el formato de fecha pasando una cadena de formato personalizada al método `date()`, `dateTime()` o `time()`. Puedes usar cualquier [token de formato de fecha PHP](https://www.php.net/manual/en/datetime.format.php):

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('created_at')
    ->date('M j, Y')
    
TextEntry::make('created_at')
    ->dateTime('M j, Y H:i:s')
    
TextEntry::make('created_at')
    ->time('H:i:s')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `date()`, `dateTime()` y `time()` también aceptan una función para calcular dinámicamente el formato. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Formato de fecha usando formatos macro de Carbon

También puedes usar los métodos `isoDate()`, `isoDateTime()` e `isoTime()` para formatear el estado de la entrada usando [macro-formatos de Carbon](https://carbon.nesbot.com/docs/#available-macro-formats):

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('created_at')
    ->isoDate()

TextEntry::make('created_at')
    ->isoDateTime()

TextEntry::make('created_at')
    ->isoTime()
```

Puedes personalizar el formato de fecha pasando una cadena de formato macro personalizada al método `isoDate()`, `isoDateTime()` o `isoTime()`. Puedes usar cualquier [macro-formato de Carbon](https://carbon.nesbot.com/docs/#available-macro-formats):

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('created_at')
    ->isoDate('L')

TextEntry::make('created_at')
    ->isoDateTime('LLL')

TextEntry::make('created_at')
    ->isoTime('LT')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `isoDate()`, `isoDateTime()` e `isoTime()` también aceptan una función para calcular dinámicamente el formato. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Formato de fecha relativa

Puedes usar el método `since()` para formatear el estado de la entrada usando [`diffForHumans()` de Carbon](https://carbon.nesbot.com/docs/#api-humandiff):

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('created_at')
    ->since()
```

#### Mostrando una fecha de formato en un tooltip

Además, puedes usar los métodos `dateTooltip()`, `dateTimeTooltip()`, `timeTooltip()`, `isoDateTooltip()`, `isoDateTimeTooltip()`, `isoTime()`, `isoTimeTooltip()` o `sinceTooltip()` para mostrar una fecha formateada en un [tooltip](overview#agregando-un-tooltip-a-una-entrada), a menudo para proporcionar información adicional:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('created_at')
    ->since()
    ->dateTooltip() // Acepta una cadena de formato de fecha PHP personalizada

TextEntry::make('created_at')
    ->since()
    ->dateTimeTooltip() // Acepta una cadena de formato de fecha PHP personalizada

TextEntry::make('created_at')
    ->since()
    ->timeTooltip() // Acepta una cadena de formato de fecha PHP personalizada

TextEntry::make('created_at')
    ->since()
    ->isoDateTooltip() // Acepta una cadena de formato macro de Carbon personalizada

TextEntry::make('created_at')
    ->since()
    ->isoDateTimeTooltip() // Acepta una cadena de formato macro de Carbon personalizada

TextEntry::make('created_at')
    ->since()
    ->isoTimeTooltip() // Acepta una cadena de formato macro de Carbon personalizada

TextEntry::make('created_at')
    ->dateTime()
    ->sinceTooltip()
```

#### Estableciendo la zona horaria para el formato de fecha

Cada uno de los métodos de formato de fecha listados anteriormente también acepta un argumento `timezone`, que te permite convertir la hora establecida en el estado a una zona horaria diferente:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('created_at')
    ->dateTime(timezone: 'America/New_York')
```

También puedes pasar una zona horaria al método `timezone()` de la entrada para aplicar una zona horaria a todos los métodos de formato de fecha-hora a la vez:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('created_at')
    ->timezone('America/New_York')
    ->dateTime()
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el método `timezone()` también acepta una función para calcular dinámicamente la zona horaria. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si no pasas un `timezone()` a la entrada, usará la zona horaria predeterminada de Filament. Puedes establecer la zona horaria predeterminada de Filament usando el método `FilamentTimezone::set()` en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
use Filament\Support\Facades\FilamentTimezone;

public function boot(): void
{
    FilamentTimezone::set('America/New_York');
}
```

Esto es útil si deseas establecer una zona horaria predeterminada para todas las entradas de texto en tu aplicación. También se usa en otros lugares donde se usan zonas horarias en Filament.

:::warning
La zona horaria predeterminada de Filament solo se aplicará cuando la entrada almacene una hora. Si la entrada almacena solo una fecha (`date()` en lugar de `dateTime()`), la zona horaria no se aplicará. Esto es para evitar cambios de zona horaria al almacenar fechas sin horas.
:::

### Formato de números

En lugar de pasar una función a `formatStateUsing()`, puedes usar el método `numeric()` para formatear una entrada como un número:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('stock')
    ->numeric()
```

Si deseas personalizar el número de decimales utilizados para formatear el número, puedes usar el argumento `decimalPlaces`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('stock')
    ->numeric(decimalPlaces: 0)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el argumento `decimalPlaces` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, la configuración regional de tu aplicación se utilizará para formatear el número adecuadamente. Si deseas personalizar la configuración regional utilizada, puedes pasarla al argumento `locale`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('stock')
    ->numeric(locale: 'nl')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el argumento `locale` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Formato de dinero

En lugar de pasar una función a `formatStateUsing()`, puedes usar el método `money()` para formatear fácilmente cantidades de dinero, en cualquier moneda:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('price')
    ->money('EUR')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el método `money()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

También hay un argumento `divideBy` para `money()` que te permite dividir el valor original por un número antes de formatearlo. Esto podría ser útil si tu base de datos almacena el precio en centavos, por ejemplo:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('price')
    ->money('EUR', divideBy: 100)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el argumento `divideBy` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, la configuración regional de tu aplicación se utilizará para formatear el dinero adecuadamente. Si deseas personalizar la configuración regional utilizada, puedes pasarla al argumento `locale`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('price')
    ->money('EUR', locale: 'nl')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el argumento `locale` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si deseas personalizar el número de decimales utilizados para formatear el número, puedes usar el argumento `decimalPlaces`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('price')
    ->money('EUR', decimalPlaces: 3)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el argumento `decimalPlaces` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Renderizando Markdown

Si el valor de tu entrada es Markdown, puedes renderizarlo usando `markdown()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->markdown()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe renderizarse como Markdown o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->markdown(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `markdown()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Renderizando HTML

Si el valor de tu entrada es HTML, puedes renderizarlo usando `html()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->html()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe renderizarse como HTML o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->html(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `html()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Renderizando HTML sin procesar sin sanitización

Si usas este método, entonces el HTML será sanitizado para eliminar cualquier contenido potencialmente inseguro antes de ser renderizado. Si deseas optar por no participar en este comportamiento, puedes envolver el HTML en un objeto `HtmlString` formateándolo:

```php
use Filament\Infolists\Components\TextEntry;
use Illuminate\Support\HtmlString;

TextEntry::make('description')
    ->formatStateUsing(fn (string $state): HtmlString => new HtmlString($state))
```

:::danger
Ten cuidado al renderizar HTML sin procesar, ya que puede contener contenido malicioso, lo que puede conducir a vulnerabilidades de seguridad en tu aplicación, como ataques de cross-site scripting (XSS). Siempre asegúrate de que el HTML que estás renderizando sea seguro antes de usar este método.
:::

Alternativamente, puedes devolver un objeto `view()` del método `formatStateUsing()`, que tampoco será sanitizado:

```php
use Filament\Infolists\Components\TextEntry;
use Illuminate\Contracts\View\View;

TextEntry::make('description')
    ->formatStateUsing(fn (string $state): View => view(
        'filament.infolists.components.description-entry-content',
        ['state' => $state],
    ))
```

## Listando múltiples valores

Múltiples valores se pueden renderizar en una entrada de texto si su [estado](overview#contenido-de-entrada-estado) es un array. Esto puede suceder si estás usando un cast `array` en un atributo Eloquent, una relación Eloquent con múltiples resultados, o si has pasado un array al [método `state()`](overview#estableciendo-el-estado-de-una-entrada). Si hay múltiples valores dentro de tu entrada de texto, estarán separados por comas. Puedes usar el método `listWithLineBreaks()` para mostrarlos en nuevas líneas en su lugar:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('authors.name')
    ->listWithLineBreaks()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe tener saltos de línea entre cada elemento o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('authors.name')
    ->listWithLineBreaks(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `listWithLineBreaks()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Agregando puntos de viñeta a la lista

Puedes agregar un punto de viñeta a cada elemento de la lista usando el método `bulleted()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('authors.name')
    ->bulleted()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe tener puntos de viñeta o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('authors.name')
    ->bulleted(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `bulleted()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Limitando el número de valores en la lista

Puedes limitar el número de valores en la lista usando el método `limitList()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('authors.name')
    ->listWithLineBreaks()
    ->limitList(3)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `limitList()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Expandiendo la lista limitada

Puedes permitir que los elementos limitados se expandan y colapsen, usando el método `expandableLimitedList()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('authors.name')
    ->listWithLineBreaks()
    ->limitList(3)
    ->expandableLimitedList()
```

:::note
Esta es solo una característica para `listWithLineBreaks()` o `bulleted()`, donde cada elemento está en su propia línea.
:::

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe ser expandible o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('authors.name')
    ->listWithLineBreaks()
    ->limitList(3)
    ->expandableLimitedList(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `expandableLimitedList()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Dividiendo un solo valor en múltiples elementos de lista

Si deseas "explotar" una cadena de texto de tu modelo en múltiples elementos de lista, puedes hacerlo con el método `separator()`. Esto es útil para mostrar etiquetas separadas por comas [como insignias](#mostrando-como-una-insignia), por ejemplo:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('tags')
    ->badge()
    ->separator(',')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `separator()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregando relaciones

Filament proporciona varios métodos para agregar un campo de relación, incluyendo `avg()`, `max()`, `min()` y `sum()`. Por ejemplo, si deseas mostrar el promedio de un campo en todos los registros relacionados, puedes usar el método `avg()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('users_avg_age')->avg('users', 'age')
```

En este ejemplo, `users` es el nombre de la relación, mientras que `age` es el campo que se está promediando. El nombre de la entrada debe ser `users_avg_age`, ya que esta es la convención que [Laravel usa](https://laravel.com/docs/eloquent-relationships#other-aggregate-functions) para almacenar el resultado.

Si deseas delimitar la relación antes de agregar, puedes pasar un array al método, donde la clave es el nombre de la relación y el valor es la función para delimitar la consulta Eloquent con:

```php
use Filament\Infolists\Components\TextEntry;
use Illuminate\Database\Eloquent\Builder;

TextEntry::make('users_avg_age')->avg([
    'users' => fn (Builder $query) => $query->where('is_active', true),
], 'age')
```

## Personalizando el tamaño del texto

Las entradas de texto tienen un tamaño de fuente pequeño por defecto, pero puedes cambiar esto a `TextSize::ExtraSmall`, `TextSize::Medium` o `TextSize::Large`.

Por ejemplo, puedes hacer el texto más grande usando `size(TextSize::Large)`:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\TextSize;

TextEntry::make('title')
    ->size(TextSize::Large)
```

## Personalizando el peso de la fuente

Las entradas de texto tienen peso de fuente regular por defecto, pero puedes cambiar esto a cualquiera de las siguientes opciones: `FontWeight::Thin`, `FontWeight::ExtraLight`, `FontWeight::Light`, `FontWeight::Medium`, `FontWeight::SemiBold`, `FontWeight::Bold`, `FontWeight::ExtraBold` o `FontWeight::Black`.

Por ejemplo, puedes hacer la fuente negrita usando `weight(FontWeight::Bold)`:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\FontWeight;

TextEntry::make('title')
    ->weight(FontWeight::Bold)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `weight()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizando la familia de fuente

Puedes cambiar la familia de fuente del texto a cualquiera de las siguientes opciones: `FontFamily::Sans`, `FontFamily::Serif` o `FontFamily::Mono`.

Por ejemplo, puedes hacer la fuente monoespaciada usando `fontFamily(FontFamily::Mono)`:

```php
use Filament\Support\Enums\FontFamily;
use Filament\Infolists\Components\TextEntry;

TextEntry::make('apiKey')
    ->label('API key')
    ->fontFamily(FontFamily::Mono)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `fontFamily()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Manejando texto largo

### Limitando la longitud del texto

Puedes `limit()` la longitud del valor de la entrada:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->limit(50)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `limit()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, cuando se trunca el texto, se agrega un puntos suspensivos (`...`) al final del texto. Puedes personalizar esto pasando una cadena personalizada al argumento `end`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->limit(50, end: ' (more)')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el argumento `end` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

También puedes reutilizar el valor que se está pasando a `limit()` en una función, obteniéndolo usando el método `getCharacterLimit()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->limit(50)
    ->tooltip(function (TextEntry $component): ?string {
        $state = $component->getState();

        if (strlen($state) <= $component->getCharacterLimit()) {
            return null;
        }

        // Solo renderiza el tooltip si el contenido de la entrada excede el límite de longitud.
        return $state;
    })
```

### Limitando el conteo de palabras

Puedes limitar el número de `words()` mostradas en la entrada:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->words(10)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `words()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, cuando se trunca el texto, se agrega un puntos suspensivos (`...`) al final del texto. Puedes personalizar esto pasando una cadena personalizada al argumento `end`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->words(10, end: ' (more)')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el argumento `end` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Limitando el texto a un número específico de líneas

Es posible que desees limitar el texto a un número específico de líneas en lugar de limitarlo a una longitud fija. Limitar el texto a un número de líneas es útil en interfaces responsivas donde deseas asegurar una experiencia consistente en todos los tamaños de pantalla. Esto se puede lograr usando el método `lineClamp()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->lineClamp(2)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `lineClamp()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Previniendo el ajuste de texto

Por defecto, el texto se ajustará a la siguiente línea si excede el ancho del contenedor. Puedes prevenir este comportamiento usando el método `wrap(false)`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('description')
    ->wrap(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `wrap()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Permitiendo que el texto se copie al portapapeles

Puedes hacer que el texto sea copiable, de modo que al hacer clic en la entrada se copie el texto al portapapeles, y opcionalmente especificar un mensaje de confirmación personalizado y la duración en milisegundos:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('apiKey')
    ->label('API key')
    ->copyable()
    ->copyMessage('Copied!')
    ->copyMessageDuration(1500)
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe ser copiable o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('apiKey')
    ->label('API key')
    ->copyable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `copyable()`, `copyMessage()` y `copyMessageDuration()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::warning
Esta característica solo funciona cuando SSL está habilitado para la aplicación.
:::
