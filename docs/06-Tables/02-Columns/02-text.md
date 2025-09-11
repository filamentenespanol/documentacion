---
title: Columna de texto
---

## Introducción

Las columnas de texto muestran texto simple:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
```

## Personalizar el color

Puedes establecer un [color](../../styling/colors) para el texto:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('status')
    ->color('primary')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `color()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Añadir un ícono

Las columnas de texto también pueden tener un [ícono](../../styling/icons):

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Support\Icons\Heroicon;

TextColumn::make('email')
    ->icon(Heroicon::Envelope)
```

<details>
<summary>💡 Utility Injection</summary>

El método `icon()` también acepta una función para calcular dinámicamente el ícono. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Puedes establecer la posición de un ícono usando `iconPosition()`:

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Support\Enums\IconPosition;
use Filament\Support\Icons\Heroicon;

TextColumn::make('email')
    ->icon(Heroicon::Envelope)
    ->iconPosition(IconPosition::After) // `IconPosition::Before` o `IconPosition::After`
```

<details>
<summary>💡 Utility Injection</summary>

El método `iconPosition()` también acepta una función para calcular dinámicamente la posición del ícono. Puedes inyectar varias utilidades en la función como parámetros.

</details>

El color del ícono por defecto es el color del texto, pero puedes personalizar el [color](../../styling/colors) del ícono por separado usando `iconColor()`:

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Support\Icons\Heroicon;

TextColumn::make('email')
    ->icon(Heroicon::Envelope)
    ->iconColor('primary')
```

<details>
<summary>💡 Utility Injection</summary>

El método `iconColor()` también acepta una función para calcular dinámicamente el color del ícono. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Mostrar como una "insignia"

Por defecto, el texto es bastante simple y no tiene color de fondo. Puedes hacer que aparezca como una "insignia" en su lugar usando el método `badge()`. Un gran caso de uso para esto es con estados, donde puedes querer mostrar una insignia con un [color](#personalizar-el-color) que coincida con el estado:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('status')
    ->badge()
    ->color(fn (string $state): string => match ($state) {
        'draft' => 'gray',
        'reviewing' => 'warning',
        'published' => 'success',
        'rejected' => 'danger',
    })
```

Puedes añadir otras cosas a la insignia, como un [ícono](#añadir-un-ícono).

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe estar en una insignia o no:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('status')
    ->badge(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `badge()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Formateo

Al usar una columna de texto, puedes querer que el texto real mostrado en la UI difiera del [estado](overview#column-content-state) crudo de la columna, que a menudo se recupera automáticamente de un modelo Eloquent. Formatear el estado te permite preservar la integridad de los datos crudos mientras también permite que se presenten de una manera más amigable para el usuario.

Para formatear el estado de una columna de texto sin cambiar el estado en sí, puedes usar el método `formatStateUsing()`. Este método acepta una función que toma el estado como argumento y devuelve el estado formateado:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('status')
    ->formatStateUsing(fn (string $state): string => __("statuses.{$state}"))
```

En este caso, la columna `status` en la base de datos podría contener valores como `draft`, `reviewing`, `published`, o `rejected`, pero el estado formateado será la versión traducida de estos valores.

<details>
<summary>💡 Utility Injection</summary>

La función pasada a `formatStateUsing()` puede inyectar varias utilidades como parámetros.

</details>

### Formateo de fechas

En lugar de pasar una función a `formatStateUsing()`, puedes usar los métodos `date()`, `dateTime()`, y `time()` para formatear el estado de la columna usando [tokens de formateo de fecha de PHP](https://www.php.net/manual/en/datetime.format.php):

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('created_at')
    ->date()

TextColumn::make('created_at')
    ->dateTime()

TextColumn::make('created_at')
    ->time()
```

Puedes personalizar el formato de fecha pasando una cadena de formato personalizada a los métodos `date()`, `dateTime()`, o `time()`. Puedes usar cualquier [token de formateo de fecha de PHP](https://www.php.net/manual/en/datetime.format.php):

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('created_at')
    ->date('M j, Y')

TextColumn::make('created_at')
    ->dateTime('M j, Y H:i:s')

TextColumn::make('created_at')
    ->time('H:i:s')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, los métodos `date()`, `dateTime()`, y `time()` también aceptan una función para calcular dinámicamente el formato. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Formateo de fechas usando formatos macro de Carbon

También puedes usar los métodos `isoDate()`, `isoDateTime()`, y `isoTime()` para formatear el estado de la columna usando [macro-formatos de Carbon](https://carbon.nesbot.com/docs/#available-macro-formats):

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('created_at')
    ->isoDate()

TextColumn::make('created_at')
    ->isoDateTime()

TextColumn::make('created_at')
    ->isoTime()
```

Puedes personalizar el formato de fecha pasando una cadena de formato macro personalizada a los métodos `isoDate()`, `isoDateTime()`, o `isoTime()`. Puedes usar cualquier [macro-formato de Carbon](https://carbon.nesbot.com/docs/#available-macro-formats):

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('created_at')
    ->isoDate('L')

TextColumn::make('created_at')
    ->isoDateTime('LLL')

TextColumn::make('created_at')
    ->isoTime('LT')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, los métodos `isoDate()`, `isoDateTime()`, y `isoTime()` también aceptan una función para calcular dinámicamente el formato. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Formateo de fecha relativa

Puedes usar el método `since()` para formatear el estado de la columna usando [`diffForHumans()` de Carbon](https://carbon.nesbot.com/docs/#api-humandiff):

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('created_at')
    ->since()
```

#### Mostrar una fecha formateada en un tooltip

Adicionalmente, puedes usar los métodos `dateTooltip()`, `dateTimeTooltip()`, `timeTooltip()`, `isoDateTooltip()`, `isoDateTimeTooltip()`, `isoTime()`, `isoTimeTooltip()`, o `sinceTooltip()` para mostrar una fecha formateada en un [tooltip](overview#adding-a-tooltip-to-an-column), a menudo para proporcionar información extra:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('created_at')
    ->since()
    ->dateTooltip() // Acepta una cadena de formateo de fecha PHP personalizada

TextColumn::make('created_at')
    ->since()
    ->dateTimeTooltip() // Acepta una cadena de formateo de fecha PHP personalizada

TextColumn::make('created_at')
    ->since()
    ->timeTooltip() // Acepta una cadena de formateo de fecha PHP personalizada

TextColumn::make('created_at')
    ->since()
    ->isoDateTooltip() // Acepta una cadena de formato macro de Carbon personalizada

TextColumn::make('created_at')
    ->since()
    ->isoDateTimeTooltip() // Acepta una cadena de formato macro de Carbon personalizada

TextColumn::make('created_at')
    ->since()
    ->isoTimeTooltip() // Acepta una cadena de formato macro de Carbon personalizada

TextColumn::make('created_at')
    ->dateTime()
    ->sinceTooltip()
```

#### Establecer la zona horaria para el formateo de fechas

Cada uno de los métodos de formateo de fecha listados arriba también acepta un argumento `timezone`, que te permite convertir el tiempo establecido en el estado a una zona horaria diferente:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('created_at')
    ->dateTime(timezone: 'America/New_York')
```

También puedes pasar una zona horaria al método `timezone()` de la columna para aplicar una zona horaria a todos los métodos de formateo de fecha-hora de una vez:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('created_at')
    ->timezone('America/New_York')
    ->dateTime()
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, el método `timezone()` también acepta una función para calcular dinámicamente la zona horaria. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si no pasas un `timezone()` a la columna, usará la zona horaria por defecto de Filament. Puedes establecer la zona horaria por defecto de Filament usando el método `FilamentTimezone::set()` en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
use Filament\Support\Facades\FilamentTimezone;

public function boot(): void
{
    FilamentTimezone::set('America/New_York');
}
```

Esto es útil si quieres establecer una zona horaria por defecto para todas las columnas de texto en tu aplicación. También se usa en otros lugares donde se usan zonas horarias en Filament.

:::warning
La zona horaria por defecto de Filament solo se aplicará cuando la columna almacene una hora. Si la columna almacena solo una fecha (`date()` en lugar de `dateTime()`), la zona horaria no se aplicará. Esto es para prevenir cambios de zona horaria al almacenar fechas sin horas.
:::

### Formateo de números

En lugar de pasar una función a `formatStateUsing()`, puedes usar el método `numeric()` para formatear una columna como un número:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('stock')
    ->numeric()
```

Si quieres personalizar el número de lugares decimales usados para formatear el número, puedes usar el argumento `decimalPlaces`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('stock')
    ->numeric(decimalPlaces: 0)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, el argumento `decimalPlaces` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, se usará la configuración regional de tu aplicación para formatear el número adecuadamente. Si quieres personalizar la configuración regional usada, puedes pasarla al argumento `locale`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('stock')
    ->numeric(locale: 'nl')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, el argumento `locale` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Formateo de dinero

En lugar de pasar una función a `formatStateUsing()`, puedes usar el método `money()` para formatear fácilmente cantidades de dinero, en cualquier moneda:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('price')
    ->money('EUR')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, el método `money()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

También hay un argumento `divideBy` para `money()` que te permite dividir el valor original por un número antes de formatearlo. Esto podría ser útil si tu base de datos almacena el precio en centavos, por ejemplo:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('price')
    ->money('EUR', divideBy: 100)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, el argumento `divideBy` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, se usará la configuración regional de tu aplicación para formatear el dinero adecuadamente. Si quieres personalizar la configuración regional usada, puedes pasarla al argumento `locale`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('price')
    ->money('EUR', locale: 'nl')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, el argumento `locale` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si quieres personalizar el número de lugares decimales usados para formatear el número, puedes usar el argumento `decimalPlaces`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('price')
    ->money('EUR', decimalPlaces: 3)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, el argumento `decimalPlaces` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Renderizar Markdown

Si el valor de tu columna es Markdown, puedes renderizarlo usando `markdown()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->markdown()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe renderizarse como Markdown o no:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->markdown(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `markdown()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Renderizar HTML

Si el valor de tu columna es HTML, puedes renderizarlo usando `html()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->html()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe renderizarse como HTML o no:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->html(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `html()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Renderizar HTML crudo sin sanitización

Si usas este método, entonces el HTML será sanitizado para remover cualquier contenido potencialmente inseguro antes de ser renderizado. Si quieres optar por no usar este comportamiento, puedes envolver el HTML en un objeto `HtmlString` formateándolo:

```php
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\HtmlString;

TextColumn::make('description')
    ->formatStateUsing(fn (string $state): HtmlString => new HtmlString($state))
```

:::danger
Ten cuidado al renderizar HTML crudo, ya que puede contener contenido malicioso, lo que puede llevar a vulnerabilidades de seguridad en tu aplicación como ataques de cross-site scripting (XSS). Siempre asegúrate de que el HTML que estás renderizando sea seguro antes de usar este método.
:::

Alternativamente, puedes devolver un objeto `view()` del método `formatStateUsing()`, que tampoco será sanitizado:

```php
use Filament\Tables\Columns\TextColumn;
use Illuminate\Contracts\View\View;

TextColumn::make('description')
    ->formatStateUsing(fn (string $state): View => view(
        'filament.tables.columns.description-column-content',
        ['state' => $state],
    ))
```

## Mostrar una descripción

Las descripciones pueden usarse para renderizar fácilmente texto adicional arriba o abajo del contenido de la columna.

Puedes mostrar una descripción debajo del contenido de una columna de texto usando el método `description()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->description(fn (Post $record): string => $record->description)
```

<details>
<summary>💡 Utility Injection</summary>

La función pasada a `description()` puede inyectar varias utilidades como parámetros.

</details>

Por defecto, la descripción se muestra debajo del texto principal, pero puedes moverla usando `'above'` como segundo parámetro:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->description(fn (Post $record): string => $record->description, position: 'above')
```

## Listar múltiples valores

Múltiples valores pueden renderizarse en una columna de texto si su [estado](overview#column-content-state) es un array. Esto puede suceder si estás usando un cast `array` en un atributo Eloquent, una relación Eloquent con múltiples resultados, o si has pasado un array al [método `state()`](overview#setting-the-state-of-an-column). Si hay múltiples valores dentro de tu columna de texto, estarán separados por comas. Puedes usar el método `listWithLineBreaks()` para mostrarlos en nuevas líneas en su lugar:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('authors.name')
    ->listWithLineBreaks()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe tener saltos de línea entre cada elemento o no:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('authors.name')
    ->listWithLineBreaks(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `listWithLineBreaks()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Añadir puntos de viñeta a la lista

Puedes añadir un punto de viñeta a cada elemento de la lista usando el método `bulleted()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('authors.name')
    ->bulleted()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe tener puntos de viñeta o no:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('authors.name')
    ->bulleted(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `bulleted()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Limitar el número de valores en la lista

Puedes limitar el número de valores en la lista usando el método `limitList()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('authors.name')
    ->listWithLineBreaks()
    ->limitList(3)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `limitList()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Expandir la lista limitada

Puedes permitir que los elementos limitados se expandan y colapsen, usando el método `expandableLimitedList()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('authors.name')
    ->listWithLineBreaks()
    ->limitList(3)
    ->expandableLimitedList()
```

:::info
Esta es solo una característica para `listWithLineBreaks()` o `bulleted()`, donde cada elemento está en su propia línea.
:::

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe ser expandible o no:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('authors.name')
    ->listWithLineBreaks()
    ->limitList(3)
    ->expandableLimitedList(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `expandableLimitedList()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Dividir un solo valor en múltiples elementos de lista

Si quieres "explotar" una cadena de texto de tu modelo en múltiples elementos de lista, puedes hacerlo con el método `separator()`. Esto es útil para mostrar etiquetas separadas por comas [como insignias](#mostrar-como-una-insignia), por ejemplo:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('tags')
    ->badge()
    ->separator(',')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `separator()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar el tamaño del texto

Las columnas de texto tienen un tamaño de fuente pequeño por defecto, pero puedes cambiarlo a `TextSize::ExtraSmall`, `TextSize::Medium`, o `TextSize::Large`.

Por ejemplo, puedes hacer el texto más grande usando `size(TextSize::Large)`:

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Support\Enums\TextSize;

TextColumn::make('title')
    ->size(TextSize::Large)
```

## Personalizar el peso de la fuente

Las columnas de texto tienen peso de fuente regular por defecto, pero puedes cambiarlo a cualquiera de las siguientes opciones: `FontWeight::Thin`, `FontWeight::ExtraLight`, `FontWeight::Light`, `FontWeight::Medium`, `FontWeight::SemiBold`, `FontWeight::Bold`, `FontWeight::ExtraBold` o `FontWeight::Black`.

Por ejemplo, puedes hacer la fuente negrita usando `weight(FontWeight::Bold)`:

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Support\Enums\FontWeight;

TextColumn::make('title')
    ->weight(FontWeight::Bold)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `weight()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar la familia de fuente

Puedes cambiar la familia de fuente del texto a cualquiera de las siguientes opciones: `FontFamily::Sans`, `FontFamily::Serif` o `FontFamily::Mono`.

Por ejemplo, puedes hacer la fuente monoespaciada usando `fontFamily(FontFamily::Mono)`:

```php
use Filament\Support\Enums\FontFamily;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('email')
    ->fontFamily(FontFamily::Mono)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `fontFamily()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Manejar texto largo

### Limitar la longitud del texto

Puedes `limit()` la longitud del valor de la columna:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->limit(50)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `limit()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, cuando el texto se trunca, se añaden puntos suspensivos (`...`) al final del texto. Puedes personalizar esto pasando una cadena personalizada al argumento `end`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->limit(50, end: ' (más)')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el argumento `end` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

También puedes reutilizar el valor que se está pasando a `limit()` en una función, obteniéndolo usando el método `getCharacterLimit()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->limit(50)
    ->tooltip(function (TextColumn $column): ?string {
        $state = $column->getState();

        if (strlen($state) <= $column->getCharacterLimit()) {
            return null;
        }

        // Solo renderizar el tooltip si el contenido de la columna excede el límite de longitud.
        return $state;
    })
```

### Limitar el conteo de palabras

Puedes limitar el número de `words()` mostradas en la columna:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->words(10)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `words()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, cuando el texto se trunca, se añaden puntos suspensivos (`...`) al final del texto. Puedes personalizar esto pasando una cadena personalizada al argumento `end`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->words(10, end: ' (más)')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el argumento `end` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Permitir el ajuste de texto

Por defecto, el texto no se ajustará a la siguiente línea si excede el ancho del contenedor. Puedes habilitar este comportamiento usando el método `wrap()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->wrap()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe ajustarse o no:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->wrap(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `wrap()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Limitar texto a un número específico de líneas

Puedes querer limitar el texto a un número específico de líneas en lugar de limitarlo a una longitud fija. Sujetar texto a un número de líneas es útil en interfaces responsivas donde quieres asegurar una experiencia consistente en todos los tamaños de pantalla. Esto se puede lograr usando el método `lineClamp()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('description')
    ->wrap()
    ->lineClamp(2)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `lineClamp()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Permitir que el texto sea copiado al portapapeles

Puedes hacer el texto copiable, de tal manera que hacer clic en la columna copie el texto al portapapeles, y opcionalmente especificar un mensaje de confirmación personalizado y duración en milisegundos:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('email')
    ->copyable()
    ->copyMessage('Dirección de email copiada')
    ->copyMessageDuration(1500)
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe ser copiable o no:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('email')
    ->copyable(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, los métodos `copyable()`, `copyMessage()`, y `copyMessageDuration()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::warning
Esta funcionalidad solo funciona cuando SSL está habilitado para la aplicación.
:::