---
title: Instalación
contents: false
---

Filament requiere lo siguiente para ejecutarse:

- PHP 8.2+
- Laravel v11.28+
- Tailwind CSS v4.0+

La instalación tiene dos variantes, dependiendo de si quieres construir una aplicación usando nuestro generador de paneles o solo usar los componentes dentro de tus vistas Blade:

## Instalando el generador de paneles

Instala el **Panel Builder** de Filament ejecutando los siguientes comandos en el directorio de tu proyecto Laravel:

```bash
composer require filament/filament:"^4.0"

php artisan filament:install --panels
```

:::warning
Si utilizas Windows PowerShell para instalar Filament, puede que necesites ejecutar el siguiente comando, ya que ignora los caracteres `^` en las versiones:

```bash
composer require filament/filament:"~4.0"

php artisan filament:install --panels
```
:::

Esto creará y registrará un nuevo [Service Provider de Laravel](https://laravel.com/docs/providers) llamado `app/Providers/Filament/AdminPanelProvider.php`.

:::tip
Si obtienes un error al acceder a tu panel, revisa que el service provider esté registrado en `bootstrap/providers.php`. Si no lo está, tendrás que [añadirlo manualmente](https://laravel.com/docs/providers#registering-providers).
:::

Puedes crear un nuevo usuario con el siguiente comando:

```bash
php artisan make:filament-user
```

Abre `/admin` en tu navegador, inicia sesión y ¡[comienza a construir tu app](../getting-started)!

---

## Instalando los componentes individuales

Instala los componentes de Filament que quieras usar con Composer:

```bash
composer require
    filament/tables:"^4.0"
    filament/schemas:"^4.0"
    filament/forms:"^4.0"
    filament/infolists:"^4.0"
    filament/actions:"^4.0"
    filament/notifications:"^4.0"
    filament/widgets:"^4.0"
```

Puedes instalar paquetes adicionales después sin repetir este paso.

:::warning
Si utilizas Windows PowerShell puede que necesites ejecutar:

```bash
composer require
    filament/tables:"~4.0"
    filament/schemas:"~4.0"
    filament/forms:"~4.0"
    filament/infolists:"~4.0"
    filament/actions:"~4.0"
    filament/notifications:"~4.0"
    filament/widgets:"~4.0"
```
:::

Si solo quieres usar el set de [componentes Blade](../components), deberás requerir también `filament/support`.

### Proyectos Laravel nuevos

Para configurar Filament rápidamente en un proyecto nuevo, instala [Livewire](https://livewire.laravel.com), [Alpine.js](https://alpinejs.dev) y [Tailwind CSS](https://tailwindcss.com):

:::warning
Estos comandos sobrescribirán archivos existentes en tu aplicación, ¡úsalos solo en proyectos nuevos!
:::

Ejecuta este comando:

```bash
php artisan filament:install --scaffold

npm install

npm run dev
```

Durante el scaffolding, si tienes el paquete [Notifications](../notifications) instalado, Filament preguntará si quieres añadir el componente Livewire requerido en tu layout. Este componente es necesario para enviar notificaciones flash.

### Proyectos Laravel existentes

Ejecuta el comando:

```bash
php artisan filament:install
```

#### Instalando Tailwind CSS

Si aún no lo tienes:

```bash
npm install tailwindcss @tailwindcss/vite --save-dev
```

#### Configurando estilos

Debes importar los archivos CSS de los paquetes Filament que hayas instalado, normalmente en `resources/css/app.css`:

```css
@import 'tailwindcss';

/* Requerido por todos los componentes */
@import '../../vendor/filament/support/resources/css/index.css';

/* Requerido por acciones y tablas */
@import '../../vendor/filament/actions/resources/css/index.css';

/* Requerido por acciones, formularios y tablas */
@import '../../vendor/filament/forms/resources/css/index.css';

/* Requerido por acciones e infolists */
@import '../../vendor/filament/infolists/resources/css/index.css';

/* Requerido por notificaciones */
@import '../../vendor/filament/notifications/resources/css/index.css';

/* Requerido por acciones, infolists, formularios, schemas y tablas */
@import '../../vendor/filament/schemas/resources/css/index.css';

/* Requerido por tablas */
@import '../../vendor/filament/tables/resources/css/index.css';

/* Requerido por widgets */
@import '../../vendor/filament/widgets/resources/css/index.css';

@variant dark (&:where(.dark, .dark *));
```

#### Configurar el plugin de Vite

En `vite.config.js` añade:

```js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
})
```

#### Compilando assets

Ejecuta:

```bash
npm run dev
```

#### Configurando el layout

Si no tienes un layout Blade, créalo con:

```bash
php artisan livewire:layout
```

Esto genera `resources/views/components/layouts/app.blade.php`. Añade el siguiente contenido:

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">

        <meta name="application-name" content="{{ config('app.name') }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <style>
            [x-cloak] {
                display: none !important;
            }
        </style>

        @filamentStyles
        @vite('resources/css/app.css')
    </head>

    <body class="antialiased">
        {{ $slot }}

        @livewire('notifications') {{-- Solo si quieres enviar notificaciones flash --}}

        @filamentScripts
        @vite('resources/js/app.js')
    </body>
</html>
```

Lo importante aquí son las directivas `@filamentStyles` en el `<head>` y `@filamentScripts` al final del `<body>`. Asegúrate también de incluir tus archivos compilados de Vite.

:::info
La línea `@livewire('notifications')` solo es necesaria si tienes el paquete [Notifications](../notifications) instalado y quieres enviar notificaciones flash.
:::
