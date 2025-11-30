---
title: Entrada de imagen
---

## Introducción

Los infolists pueden renderizar imágenes, basándose en la ruta en el estado de la entrada:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('header_image')
```

En este caso, el estado `header_image` podría contener `posts/header-images/4281246003439.jpg`, que es relativo al directorio raíz del disco de almacenamiento. El disco de almacenamiento se define en el [archivo de configuración](../introduction/installation#publishing-configuration), `local` por defecto. También puedes establecer la variable de entorno `FILESYSTEM_DISK` para cambiar esto.

Alternativamente, el estado podría contener una URL absoluta a una imagen, como `https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/6720dff9eada99162c95b2dc_6720d2b615942a4c363974ed_3%2520-%252029.10-min.jpeg`.

## Gestionando el disco de imagen

El disco de almacenamiento predeterminado se define en el [archivo de configuración](../introduction/installation#publishing-configuration), `local` por defecto. También puedes establecer la variable de entorno `FILESYSTEM_DISK` para cambiar esto. Si deseas desviarte del disco predeterminado, puedes pasar un nombre de disco personalizado al método `disk()`:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('header_image')
    ->disk('s3')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `disk()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Imágenes públicas

Por defecto, Filament generará URLs temporales a las imágenes en el sistema de archivos, a menos que el [disco](#gestionando-el-disco-de-imagen) esté configurado como `public`. Si tus imágenes están almacenadas en un disco público, puedes establecer la `visibility()` como `public`:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('header_image')
    ->visibility('public')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `visibility()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizando el tamaño

Puedes personalizar el tamaño de la imagen pasando un `imageWidth()` e `imageHeight()`, o ambos con `imageSize()`:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('header_image')
    ->imageWidth(200)

ImageEntry::make('header_image')
    ->imageHeight(50)

ImageEntry::make('author.avatar')
    ->imageSize(40)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `imageWidth()`, `imageHeight()` e `imageSize()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Imágenes cuadradas

Puedes mostrar la imagen usando una relación de aspecto 1:1:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('author.avatar')
    ->imageHeight(40)
    ->square()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la imagen debe ser cuadrada o no:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('author.avatar')
    ->imageHeight(40)
    ->square(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `square()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Imágenes circulares

Puedes hacer que la imagen sea completamente redondeada, lo cual es útil para renderizar avatares:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('author.avatar')
    ->imageHeight(40)
    ->circular()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la imagen debe ser circular o no:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('author.avatar')
    ->imageHeight(40)
    ->circular(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `circular()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregando una URL de imagen predeterminada

Puedes mostrar una imagen de marcador de posición si aún no existe una, pasando una URL al método `defaultImageUrl()`:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('header_image')
    ->defaultImageUrl(url('storage/posts/header-images/default.jpg'))
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `defaultImageUrl()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Apilando imágenes

Puedes mostrar múltiples imágenes como una pila de imágenes superpuestas usando `stacked()`:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
```

Opcionalmente, puedes pasar un valor booleano para controlar si las imágenes deben apilarse o no:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `stacked()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizando el ancho del anillo apilado

El ancho del anillo predeterminado es `3`, pero puedes personalizarlo para que sea de `0` a `8`:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->ring(5)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `ring()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizando la superposición apilada

La superposición predeterminada es `4`, pero puedes personalizarla para que sea de `0` a `8`:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->overlap(2)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `overlap()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Estableciendo un límite

Puedes limitar el número máximo de imágenes que deseas mostrar pasando `limit()`:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->limit(3)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `limit()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Mostrando el conteo de imágenes restantes

Cuando estableces un límite, también puedes mostrar el conteo de imágenes restantes pasando `limitedRemainingText()`.

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->limit(3)
    ->limitedRemainingText()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto restante debe mostrarse o no:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->limit(3)
    ->limitedRemainingText(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `limitedRemainingText()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Personalizando el tamaño del texto restante limitado

Por defecto, el tamaño del texto restante es `TextSize::Small`. Puedes personalizarlo para que sea `TextSize::ExtraSmall`, `TextSize::Medium` o `TextSize::Large` usando el parámetro `size`:

```php
use Filament\Infolists\Components\ImageEntry;
use Filament\Support\Enums\TextSize;

ImageEntry::make('colleagues.avatar')
    ->imageHeight(40)
    ->circular()
    ->stacked()
    ->limit(3)
    ->limitedRemainingText(size: TextSize::Large)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `limitedRemainingText()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Prevenir verificaciones de existencia de archivos

Cuando se carga el esquema, detectará automáticamente si las imágenes existen para evitar errores de archivos faltantes. Todo esto se hace en el backend. Cuando uses almacenamiento remoto con muchas imágenes, esto puede llevar mucho tiempo. Puedes usar el método `checkFileExistence(false)` para deshabilitar esta característica:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('attachment')
    ->checkFileExistence(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `checkFileExistence()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregando atributos HTML adicionales a la imagen

Puedes pasar atributos HTML adicionales al elemento `<img>` a través del método `extraImgAttributes()`. Los atributos deben representarse mediante un array, donde la clave es el nombre del atributo y el valor es el valor del atributo:

```php
use Filament\Infolists\Components\ImageEntry;

ImageEntry::make('logo')
    ->extraImgAttributes([
        'alt' => 'Logo',
        'loading' => 'lazy',
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `extraImgAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, llamar a `extraImgAttributes()` múltiples veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.
