---
title: Componentes prime
---

## Introducción

Dentro de los schemas de Filament, los componentes prime son los bloques constructivos más básicos que se pueden usar para insertar contenido arbitrario en un schema, como texto e imágenes. Como su nombre sugiere, los componentes prime no son divisibles y no se pueden simplificar más. Filament proporciona un conjunto de componentes prime integrados:

- [Texto](#text-component)
- [Ícono](#icon-component)
- [Imagen](#image-component)
- [Lista desordenada](#unordered-list-component)

También puedes [crear tus propios componentes personalizados](custom-components) para agregar tu propio contenido arbitrario a un schema.

En este ejemplo, los componentes prime se usan para mostrar instrucciones al usuario, un código QR que el usuario puede escanear, y una lista de códigos de recuperación que el usuario puede guardar:

```php
use Filament\Actions\Action;
use Filament\Schemas\Components\Image;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Text;
use Filament\Schemas\Components\UnorderedList;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\TextSize;

$schema
    ->components([
        Text::make('Escanea este código QR con tu aplicación de autenticación:')
            ->color('neutral'),
        Image::make(
            url: asset('images/qr.jpg'),
            alt: 'Código QR para escanear con una aplicación de autenticación',
        )
            ->imageHeight('12rem')
            ->alignCenter(),
        Section::make()
            ->schema([
                Text::make('Por favor guarda los siguientes códigos de recuperación en un lugar seguro. Solo se mostrarán una vez, pero los necesitarás si pierdes acceso a tu aplicación de autenticación:')
                    ->weight(FontWeight::Bold)
                    ->color('neutral'),
                UnorderedList::make(fn (): array => array_map(
                    fn (string $recoveryCode): Text => Text::make($recoveryCode)
                        ->copyable()
                        ->fontFamily(FontFamily::Mono)
                        ->size(TextSize::ExtraSmall)
                        ->color('neutral'),
                    ['tYRnCqNLUx-3QOLNKyDiV', 'cKok2eImKc-oWHHH4VhNe', 'C0ZstEcSSB-nrbyk2pv8z', '49EXLRQ8MI-FpWywpSDHE', 'TXjHnvkUrr-KuiVJENPmJ', 'BB574ookll-uI20yxP6oa', 'BbgScF2egu-VOfHrMtsCl', 'cO0dJYqmee-S9ubJHpRFR'],
                ))
                    ->size(TextSize::ExtraSmall),
            ])
            ->compact()
            ->secondary(),
    ])
```

Aunque el texto se puede renderizar en un schema usando una [entrada de texto de infolist](../infolists/text-entry), las entradas están destinadas a renderizar un detalle etiqueta-valor sobre una entidad (como un modelo Eloquent), y no para renderizar texto arbitrario. Los componentes prime son más adecuados para este propósito. Las infolists se pueden considerar más similares a [listas de descripción](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) en HTML.

Las clases de componentes prime se pueden encontrar en el namespace `Filament\Schemas\Components`. Residen dentro del array de componentes del schema.

## Componente de texto

El texto se puede insertar en un schema usando el componente `Text`. El contenido del texto se pasa al método `make()`:

```php
use Filament\Schemas\Components\Text;

Text::make('Modificar estos permisos puede dar a los usuarios acceso a información sensible.')
```

Para renderizar contenido HTML crudo, puedes pasar un objeto `HtmlString` al método `make()`:

```php
use Filament\Schemas\Components\Text;
use Illuminate\Support\HtmlString;

Text::make(new HtmlString('<strong>Advertencia:</strong> Modificar estos permisos puede dar a los usuarios acceso a información sensible.'))
```

:::danger
Ten en cuenta que necesitarás asegurarte de que el HTML sea seguro para renderizar, de lo contrario tu aplicación será vulnerable a ataques XSS.
:::

Para renderizar Markdown, puedes usar el helper `str()` de Laravel para convertir Markdown a HTML, y luego transformarlo en un objeto `HtmlString`:

```php
use Filament\Schemas\Components\Text;

Text::make(
    str('**Advertencia:** Modificar estos permisos puede dar a los usuarios acceso a información sensible.')
        ->inlineMarkdown()
        ->toHtmlString(),
)
```

<details>
<summary>💡 Nota sobre valores dinámicos</summary>
El método `make()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Personalizar el color del texto

Puedes establecer un [color](../styling/colors) para el texto:

```php
use Filament\Schemas\Components\Text;

Text::make('Información')
    ->color('info')
```

<details>
<summary>💡 Nota sobre color dinámico</summary>
El método `color()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Usar un color neutral

Por defecto, el color del texto está establecido en `gray`, que típicamente es bastante tenue contra su fondo. Puedes oscurecerlo usando el método `color('neutral')`:

```php
use Filament\Schemas\Components\Text;

Text::make('Modificar estos permisos puede dar a los usuarios acceso a información sensible.')

Text::make('Modificar estos permisos puede dar a los usuarios acceso a información sensible.')
    ->color('neutral')
```

### Mostrar como una "insignia"

Por defecto, el texto es bastante simple y no tiene color de fondo. Puedes hacer que aparezca como una "insignia" en su lugar usando el método `badge()`. Un gran caso de uso para esto es con estados, donde puedes querer mostrar una insignia con un [color](#customizing-the-text-color) que coincida con el estado:

```php
use Filament\Schemas\Components\Text;

Text::make('Advertencia')
    ->color('warning')
    ->badge()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe estar en una insignia o no:

```php
use Filament\Schemas\Components\Text;

Text::make('Advertencia')
    ->color('warning')
    ->badge(FeatureFlag::active())
```

<details>
<summary>💡 Nota sobre insignia dinámica</summary>
El método `badge()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

#### Agregar un ícono a la insignia

Puedes agregar otras cosas a la insignia, como un [ícono](../styling/icons):

```php
use Filament\Schemas\Components\Text;
use Filament\Support\Icons\Heroicon;

Text::make('Advertencia')
    ->color('warning')
    ->badge()
    ->icon(Heroicon::ExclamationTriangle)
```

### Personalizar el tamaño del texto

El texto tiene un tamaño de fuente pequeño por defecto, pero puedes cambiarlo a `TextSize::ExtraSmall`, `TextSize::Medium`, o `TextSize::Large`.

Por ejemplo, puedes hacer el texto más grande usando `size(TextSize::Large)`:

```php
use Filament\Schemas\Components\Text;
use Filament\Support\Enums\TextSize;

Text::make('Modificar estos permisos puede dar a los usuarios acceso a información sensible.')
    ->size(TextSize::Large)
```

### Personalizar el peso de la fuente

Las entradas de texto tienen peso de fuente regular por defecto, pero puedes cambiarlo a cualquiera de las siguientes opciones: `FontWeight::Thin`, `FontWeight::ExtraLight`, `FontWeight::Light`, `FontWeight::Medium`, `FontWeight::SemiBold`, `FontWeight::Bold`, `FontWeight::ExtraBold` o `FontWeight::Black`.

Por ejemplo, puedes hacer la fuente negrita usando `weight(FontWeight::Bold)`:

```php
use Filament\Schemas\Components\Text;
use Filament\Support\Enums\FontWeight;

Text::make('Modificar estos permisos puede dar a los usuarios acceso a información sensible.')
    ->weight(FontWeight::Bold)
```

<details>
<summary>💡 Nota sobre peso dinámico</summary>
El método `weight()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Personalizar la familia de fuente

Puedes cambiar la familia de fuente del texto a cualquiera de las siguientes opciones: `FontFamily::Sans`, `FontFamily::Serif` o `FontFamily::Mono`.

Por ejemplo, puedes hacer la fuente monoespaciada usando `fontFamily(FontFamily::Mono)`:

```php
use Filament\Support\Enums\FontFamily;
use Filament\Schemas\Components\Text;

Text::make('28o.-AK%D~xh*.:[4"3)zPiC')
    ->fontFamily(FontFamily::Mono)
```

<details>
<summary>💡 Nota sobre familia de fuente dinámica</summary>
El método `fontFamily()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Agregar un tooltip al texto

Puedes agregar un tooltip al texto usando el método `tooltip()`:

```php
use Filament\Schemas\Components\Text;

Text::make('28o.-AK%D~xh*.:[4"3)zPiC')
    ->tooltip('Tu código secreto de recuperación')
```

<details>
<summary>💡 Nota sobre tooltip dinámico</summary>
El método `tooltip()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Usar JavaScript para determinar el contenido del texto

Puedes usar JavaScript para determinar el contenido del texto. Esto es útil si quieres mostrar un mensaje diferente dependiendo del estado de un [campo de formulario](../forms/fields), sin hacer una petición al servidor para re-renderizar el schema. Para permitir esto, puedes usar el método `js()`:

```php
use Filament\Schemas\Components\Text;

Text::make(<<<'JS'
    $get('name') ? `Hola, ${$get('name')}` : 'Por favor ingresa tu nombre.'
    JS)
    ->js()
```

Las utilidades [`$state`](../forms/fields#injecting-the-current-state-of-the-field) y [`$get()`](../forms/fields#injecting-the-state-of-another-field) están disponibles en el contexto de JavaScript, por lo que puedes usarlas para obtener el estado de los campos en el schema.

## Componente de ícono

Los íconos se pueden insertar en un schema usando el componente `Icon`. Los [íconos](../styling/icons) se pasan al método `make()`:

```php
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

Icon::make(Heroicon::Star)
```

<details>
<summary>💡 Nota sobre valores dinámicos</summary>
El método `make()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Personalizar el color del ícono

Puedes establecer un [color](../styling/colors) para el ícono:

```php
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

Icon::make(Heroicon::ExclamationCircle)
    ->color('danger')
```

<details>
<summary>💡 Nota sobre color dinámico</summary>
El método `color()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Agregar un tooltip al ícono

Puedes agregar un tooltip al ícono usando el método `tooltip()`:

```php
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

Icon::make(Heroicon::ExclamationTriangle)
    ->tooltip('Advertencia')
```

<details>
<summary>💡 Nota sobre tooltip dinámico</summary>
El método `tooltip()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Componente de imagen

Las imágenes se pueden insertar en un schema usando el componente `Image`. La URL de la imagen y el texto alternativo se pasan al método `make()`:

```php
use Filament\Schemas\Components\Image;

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
```

<details>
<summary>💡 Nota sobre valores dinámicos</summary>
Los argumentos del método `make()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades como parámetros en las funciones.
</details>

### Personalizar el tamaño de la imagen

Puedes personalizar el tamaño de la imagen pasando `imageWidth()` e `imageHeight()`, o ambos con `imageSize()`:

```php
use Filament\Schemas\Components\Image;

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
    ->imageWidth('12rem')

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
    ->imageHeight('12rem')

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
    ->imageSize('12rem')
```

<details>
<summary>💡 Nota sobre tamaño dinámico</summary>
Los métodos `imageWidth()`, `imageHeight()` e `imageSize()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Alinear la imagen

Puedes alinear la imagen al inicio (izquierda en interfaces de izquierda a derecha, derecha en interfaces de derecha a izquierda), centro, o final (derecha en interfaces de izquierda a derecha, izquierda en interfaces de derecha a izquierda) usando los métodos `alignStart()`, `alignCenter()` o `alignEnd()`:

```php
use Filament\Schemas\Components\Image;

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
    ->alignStart() // Esta es la alineación por defecto.

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
    ->alignCenter()

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
    ->alignEnd()
```

Alternativamente, puedes pasar un enum `Alignment` al método `alignment()`:

```php
use Filament\Schemas\Components\Image;
use Filament\Support\Enums\Alignment;

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
    ->alignment(Alignment::Center)
```

<details>
<summary>💡 Nota sobre alineación dinámica</summary>
El método `alignment()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Agregar un tooltip a la imagen

Puedes agregar un tooltip a la imagen usando el método `tooltip()`:

```php
use Filament\Schemas\Components\Image;

Image::make(
    url: asset('images/qr.jpg'),
    alt: 'Código QR para escanear con una aplicación de autenticación',
)
    ->tooltip('Escanea este código QR con tu aplicación de autenticación')
    ->alignCenter()
```

<details>
<summary>💡 Nota sobre tooltip dinámico</summary>
El método `tooltip()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Componente de lista desordenada

Las listas desordenadas se pueden insertar en un schema usando el componente `UnorderedList`. Los elementos de la lista, que comprenden texto plano o [componentes de texto](#text-component), se pasan al método `make()`:

```php
use Filament\Schemas\Components\UnorderedList;

UnorderedList::make([
    'Tablas',
    'Schemas',
    'Acciones',
    'Notificaciones',
])
```

<details>
<summary>💡 Nota sobre valores dinámicos</summary>
El método `make()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

Los componentes de texto se pueden usar como elementos de lista, lo que te permite personalizar el formato de cada elemento:

```php
use Filament\Schemas\Components\Text;
use Filament\Schemas\Components\UnorderedList;
use Filament\Support\Enums\FontFamily;

UnorderedList::make([
    Text::make('Tablas')->fontFamily(FontFamily::Mono),
    Text::make('Schemas')->fontFamily(FontFamily::Mono),
    Text::make('Acciones')->fontFamily(FontFamily::Mono),
    Text::make('Notificaciones')->fontFamily(FontFamily::Mono),
])
```

### Personalizar el tamaño de las viñetas

Si estás modificando el tamaño del texto del contenido de la lista, probablemente querrás ajustar el tamaño de las viñetas para que coincidan. Para hacer esto, puedes usar el método `size()`. Las viñetas tienen tamaño de fuente pequeño por defecto, pero puedes cambiarlo a `TextSize::ExtraSmall`, `TextSize::Medium`, o `TextSize::Large`.

Por ejemplo, puedes hacer las viñetas más grandes usando `size(TextSize::Large)`:

```php
use Filament\Schemas\Components\Text;
use Filament\Schemas\Components\UnorderedList;

UnorderedList::make([
    Text::make('Tablas')->size(TextSize::Large),
    Text::make('Schemas')->size(TextSize::Large),
    Text::make('Acciones')->size(TextSize::Large),
    Text::make('Notificaciones')->size(TextSize::Large),
])
    ->size(TextSize::Large)
```

<details>
<summary>💡 Nota sobre tamaño dinámico</summary>
El método `size()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Agregar atributos HTML extra a un componente prime

Puedes pasar atributos HTML extra al componente a través del método `extraAttributes()`, que se fusionarán en su elemento HTML externo. Los atributos deben representarse por un array, donde la clave es el nombre del atributo y el valor es el valor del atributo:

```php
use Filament\Schemas\Components\Text;

Text::make('Modificar estos permisos puede dar a los usuarios acceso a información sensible.')
    ->extraAttributes(['class' => 'custom-text-style'])
```

<details>
<summary>💡 Nota sobre atributos dinámicos</summary>
El método `extraAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

Por defecto, llamar `extraAttributes()` múltiples veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.
