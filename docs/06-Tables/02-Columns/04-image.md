---
title: Columna de imagen
---

## Introducción

Las tablas pueden renderizar imágenes, basadas en la ruta en el estado de la columna:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('avatar')
```

En este caso, el estado `header_image` podría contener `posts/header-images/4281246003439.jpg`, que es relativo al directorio raíz del disco de almacenamiento. El disco de almacenamiento se define en el [archivo de configuración](../../introduction/installation#publishing-configuration), `local` por defecto. También puedes establecer la variable de entorno `FILESYSTEM_DISK` para cambiarlo.

Alternativamente, el estado podría contener una URL absoluta a una imagen, como `https://example.com/images/header.jpg`.

## Administrar el disco de imágenes

El disco de almacenamiento por defecto se define en el [archivo de configuración](../../introduction/installation#publishing-configuration), `local` por defecto. También puedes establecer la variable de entorno `FILESYSTEM_DISK` para cambiarlo. Si quieres usar un disco diferente, puedes pasar un nombre de disco personalizado al método `disk()`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('header_image')
    ->disk('s3')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `disk()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Imágenes públicas

Por defecto, Filament generará URLs temporales a las imágenes en el sistema de archivos, a menos que el [disco](#administrar-el-disco-de-imágenes) esté configurado como `public`. Si tus imágenes están almacenadas en un disco público, puedes establecer la `visibility()` a `public`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('header_image')
    ->visibility('public')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `visibility()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar el tamaño

Puedes personalizar el tamaño de la imagen pasando `imageWidth()` y `imageHeight()`, o ambos con `imageSize()`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('header_image')
    ->imageWidth(200)

ImageColumn::make('header_image')
    ->imageHeight(50)

ImageColumn::make('avatar')
    ->imageSize(40)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, los métodos `imageWidth()`, `imageHeight()` y `imageSize()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Imágenes cuadradas

Puedes mostrar la imagen usando una relación de aspecto 1:1:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('avatar')
    ->imageHeight(40)
    ->square()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la imagen debe ser cuadrada o no:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('avatar')
    ->imageHeight(40)
    ->square(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `square()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Imágenes circulares

Puedes hacer que la imagen sea completamente redonda, lo cual es útil para renderizar avatares:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('avatar')
    ->imageHeight(40)
    ->circular()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la imagen debe ser circular o no:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('avatar')
    ->imageHeight(40)
    ->circular(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `circular()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Añadir una URL de imagen por defecto

Puedes mostrar una imagen placeholder si aún no existe, pasando una URL al método `defaultImageUrl()`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('header_image')
    ->defaultImageUrl(url('storage/posts/header-images/default.jpg'))
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `defaultImageUrl()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Apilar imágenes

Puedes mostrar varias imágenes como un grupo superpuesto usando `stacked()`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
```

Opcionalmente, puedes pasar un valor booleano para controlar si las imágenes deben apilarse o no:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `stacked()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar el ancho del borde de apilado

El ancho de borde por defecto es `3`, pero puedes personalizarlo de `0` a `8`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->ring(5)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `ring()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar el solapamiento de apilado

El solapamiento por defecto es `4`, pero puedes personalizarlo de `0` a `8`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->overlap(2)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `overlap()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Establecer un límite

Puedes limitar el número máximo de imágenes a mostrar pasando `limit()`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->limit(3)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `limit()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Mostrar el conteo de imágenes restantes

Cuando estableces un límite, puedes mostrar el número de imágenes restantes usando `limitedRemainingText()`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->limit(3)
    ->limitedRemainingText()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto de imágenes restantes debe mostrarse o no:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->limit(3)
    ->limitedRemainingText(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `limitedRemainingText()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Personalizar el tamaño del texto de imágenes restantes

Por defecto, el tamaño del texto restante es `TextSize::Small`. Puedes personalizarlo con `TextSize::ExtraSmall`, `TextSize::Medium` o `TextSize::Large` usando el parámetro `size`:

```php
use Filament\Tables\Columns\ImageColumn;
use Filament\Support\Enums\TextSize;

ImageColumn::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->limit(3)
    ->limitedRemainingText(size: TextSize::Large)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `limitedRemainingText()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Evitar la verificación de existencia de archivos

Cuando se carga el esquema, se detecta automáticamente si las imágenes existen para evitar errores de archivos faltantes. Esto se hace en el backend. Cuando uses almacenamiento remoto con muchas imágenes, esto puede ser lento. Puedes usar el método `checkFileExistence(false)` para desactivar esta verificación:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('attachment')
    ->checkFileExistence(false)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `checkFileExistence()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Ajustar múltiples imágenes

Las imágenes pueden configurarse para ajustarse a la línea si no caben, usando `wrap()`:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('colleagues.avatar')
    ->circular()
    ->stacked()
    ->wrap()
```

:::tip
El "ancho" para que se haga el ajuste depende de la etiqueta de la columna, así que puede que necesites usar una etiqueta más corta u oculta para que se ajuste más estrechamente.
:::

## Añadir atributos HTML extra a la imagen

Puedes pasar atributos adicionales al elemento `<img>` mediante `extraImgAttributes()`. Los atributos deben representarse como un array, donde la clave es el nombre del atributo y el valor es su valor:

```php
use Filament\Tables\Columns\ImageColumn;

ImageColumn::make('logo')
    ->extraImgAttributes([
        'alt' => 'Logo',
        'loading' => 'lazy',
    ])
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `extraImgAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, llamar varias veces a `extraImgAttributes()` sobrescribirá los atributos anteriores. Si deseas fusionar los atributos, puedes pasar `merge: true` al método.
