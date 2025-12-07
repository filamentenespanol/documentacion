---
title: Descripción general
---

## Cambiando los colores

En la [configuración](../panel-configuration), puedes cambiar fácilmente los colores que se utilizan. El filamento se envía con 6 colores predefinidos que se utilizan en todas partes dentro del marco. Son personalizables de la siguiente manera:

```php
use Filament\Panel;
use Filament\Support\Colors\Color;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->colors([
            'danger' => Color::Rose,
            'gray' => Color::Gray,
            'info' => Color::Blue,
            'primary' => Color::Indigo,
            'success' => Color::Emerald,
            'warning' => Color::Orange,
        ]);
}
```

La clase `Filament\Support\Colors\Color` contiene opciones de color para todas las [paletas de colores CSS de Tailwind](https://tailwindcss.com/docs/customizing-colors).

También puede pasar una función a `register()` que solo se llamará cuando se esté procesando la aplicación. Esto es útil si llama a `register()` desde un proveedor de servicios y desea acceder a objetos como el usuario actualmente autenticado, que se inicializan más adelante en el middleware.

Alternativamente, puede pasar su propia paleta como una variedad de colores OKLCH:

```php
$panel
    ->colors([
        'primary' => [
            50 => 'oklch(0.969 0.015 12.422)',
            100 => 'oklch(0.941 0.03 12.58)',
            200 => 'oklch(0.892 0.058 10.001)',
            300 => 'oklch(0.81 0.117 11.638)',
            400 => 'oklch(0.712 0.194 13.428)',
            500 => 'oklch(0.645 0.246 16.439)',
            600 => 'oklch(0.586 0.253 17.585)',
            700 => 'oklch(0.514 0.222 16.935)',
            800 => 'oklch(0.455 0.188 13.697)',
            900 => 'oklch(0.41 0.159 10.272)',
            950 => 'oklch(0.271 0.105 12.094)',
        ],
    ])
```

### Generando una paleta de colores

Si desea que intentemos generar una paleta para usted basada en un valor hexadecimal o RGB singular, puede pasarlo:

```php
$panel
    ->colors([
        'primary' => '#6366f1',
    ])

$panel
    ->colors([
        'primary' => 'rgb(99, 102, 241)',
    ])
```

## Cambiando la fuente

De forma predeterminada, utilizamos la fuente [Inter](https://fonts.google.com/specimen/Inter). Puede cambiar esto usando el método `font()` en el archivo [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->font('Poppins');
}
```

Todas las [fuentes de Google](https://fonts.google.com) están disponibles para su uso.

### Cambiar el proveedor de fuentes

[Bunny Fonts CDN](https://fonts.bunny.net) se utiliza para servir las fuentes. Cumple con el RGPD. Si desea utilizar [Google Fonts CDN](https://fonts.google.com) en su lugar, puede hacerlo utilizando el argumento `provider` del método `font()`:

```php
use Filament\FontProviders\GoogleFontProvider;

$panel->font('Inter', provider: GoogleFontProvider::class)
```

O si desea servir las fuentes desde una hoja de estilo local, puede usar `LocalFontProvider`:

```php
use Filament\FontProviders\LocalFontProvider;

$panel->font(
    'Inter',
    url: asset('css/fonts.css'),
    provider: LocalFontProvider::class,
)
```

## Creando un tema personalizado

Filament le permite cambiar el CSS utilizado para representar la interfaz de usuario compilando una hoja de estilo personalizada para reemplazar la predeterminada. Esta hoja de estilo personalizada se llama "tema". Los temas utilizan [Tailwind CSS] (https://tailwindcss.com).

Para crear un tema personalizado para un panel, puede usar el comando `php artisan make:filament-theme`:

```bash
php artisan make:filament-theme
```

Si tiene varios paneles, puede especificar el panel para el que desea crear un tema:

```bash
php artisan make:filament-theme admin
```

De forma predeterminada, este comando utilizará NPM para instalar dependencias. Si desea utilizar un administrador de paquetes diferente, puede utilizar la opción `--pm`:

```bash
php artisan make:filament-theme --pm=bun
````

Este comando genera un archivo CSS en el directorio `resources/css/filament`.

Agregue el archivo CSS del tema a la matriz `input` del complemento Laravel en `vite.config.js`:

```js
input: [
    // ...
    'resources/css/filament/admin/theme.css',
]
```

Ahora, registre el archivo CSS del tema compilado por Vite en el proveedor del panel:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->viteTheme('resources/css/filament/admin/theme.css');
}
```

Finalmente, compila el tema con Vite:

```bash
npm run build
```

:::info
    Verifique el resultado del comando para conocer la ruta exacta del archivo (por ejemplo, `app/theme.css`), ya que puede variar según la identificación de su panel.
:::

Ahora puede personalizar el tema editando el archivo CSS en `resources/css/filament`.

## Uso de clases CSS de Tailwind en tus vistas Blade o archivos PHP

Aunque Filament usa Tailwind CSS para compilar el marco, no está configurado para buscar automáticamente ninguna clase de Tailwind que use en su proyecto, por lo que estas clases no se incluirán en el CSS compilado.

Para utilizar las clases CSS de Tailwind en su proyecto, debe configurar un [tema personalizado] (#creando-un-tema-personalizado) para personalizar el archivo CSS compilado en el panel. En el archivo `theme.css` del tema, encontrarás dos líneas:

```css
@source '../../../../app/Filament';
@source '../../../../resources/views/filament';
```

Estas líneas le indican a Tailwind que escanee los directorios `app/Filament` y ​​`resources/views/filament` en busca de cualquier clase de Tailwind que utilice en su proyecto. Puede [agregar cualquier otro directorio](https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-registering-sources) que desee buscar clases de Tailwind aquí.

## Deshabilitar el modo oscuro

Para deshabilitar el cambio de modo oscuro, puede usar el archivo [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->darkMode(false);
}
```

## Cambiar el modo de tema predeterminado

De forma predeterminada, Filament utiliza el tema del sistema del usuario como modo predeterminado. Por ejemplo, si la computadora del usuario está en modo oscuro, Filament usará el modo oscuro de forma predeterminada. El modo del sistema en Filament es reactivo si el usuario cambia el modo de su computadora. Si desea cambiar el modo predeterminado para forzar el modo claro u oscuro, puede usar el método `defaultThemeMode()`, pasando `ThemeMode::Light` o `ThemeMode::Dark`:

```php
use Filament\Enums\ThemeMode;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->defaultThemeMode(ThemeMode::Light);
}
```

## Agregar un logotipo

De forma predeterminada, Filament usa el nombre de su aplicación para representar un logotipo simple basado en texto. Sin embargo, puedes personalizarlo fácilmente.

Si desea simplemente cambiar el texto que se utiliza en el logotipo, puede utilizar el método `brandName()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->brandName('Filament Demo');
}
```

En su lugar, para representar una imagen, puede pasar una URL al método `brandLogo()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->brandLogo(asset('images/logo.svg'));
}
```

Alternativamente, puede pasar HTML directamente al método `brandLogo()` para representar un elemento SVG en línea, por ejemplo:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->brandLogo(fn () => view('filament.admin.logo'));
}
```

```blade
<svg
    viewBox="0 0 128 26"
    xmlns="http://www.w3.org/2000/svg"
    class="h-full fill-gray-500 dark:fill-gray-400"
>
    <!-- ... -->
</svg>
```

Si necesitas usar un logo diferente cuando la aplicación está en modo oscuro, puedes pasarlo a `darkModeBrandLogo()` de la misma manera.

La altura del logotipo tiene por defecto un valor razonable, pero es imposible tener en cuenta todas las relaciones de aspecto posibles. Por lo tanto, puedes personalizar la altura del logotipo renderizado usando el método `brandLogoHeight()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->brandLogo(fn () => view('filament.admin.logo'))
        ->brandLogoHeight('2rem');
}
```


## Agregar un favicon

Para agregar un favicon, puedes usar el archivo [configuración](../panel-configuration), pasando la URL pública del favicon:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->favicon(asset('images/favicon.png'));
}
```
