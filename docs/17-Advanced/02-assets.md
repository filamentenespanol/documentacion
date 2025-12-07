---
title: Registro de bienes
---

## Introducción

Todos los paquetes del ecosistema Filament comparten un sistema de gestión de activos. Esto permite que tanto los complementos oficiales como los de terceros registren archivos CSS y JavaScript que luego pueden ser consumidos por las vistas de Blade.

## La fachada `FilamentAsset`

La fachada `FilamentAsset` se utiliza para registrar archivos en el sistema de activos. Estos archivos pueden obtenerse de cualquier parte del sistema de archivos, pero luego se copian en el directorio `/public` de la aplicación cuando se ejecuta el comando `php artisan filament:assets`. Al copiarlos en el directorio `/public`, podemos cargarlos de manera predecible en las vistas Blade y también garantizar que los paquetes de terceros puedan cargar sus recursos sin tener que preocuparnos de dónde están ubicados.

Los activos siempre tienen una ID única elegida por usted, que se utiliza como nombre de archivo cuando el activo se copia en el directorio `/public`. Este ID también se utiliza para hacer referencia al activo en las vistas Blade. Si bien el ID es único, si está registrando activos para un complemento, no necesita preocuparse de que los ID entren en conflicto con otros complementos, ya que el activo se copiará en un directorio con el nombre de su complemento.

La fachada `FilamentAsset` debe usarse en el método `boot()` de un proveedor de servicios. Se puede utilizar dentro de un proveedor de servicios de aplicaciones como `AppServiceProvider`, o dentro de un proveedor de servicios de complementos.

La fachada `FilamentAsset` tiene un método principal, `register()`, que acepta una serie de activos para registrar:

```php
use Filament\Support\Facades\FilamentAsset;

public function boot(): void
{
    // ...
    
    FilamentAsset::register([
        // ...
    ]);
    
    // ...
}
```

### Registrar activos para un complemento

Al registrar recursos para un complemento, debe pasar el nombre del paquete Composer como segundo argumento del método `register()`:

```php
use Filament\Support\Facades\FilamentAsset;

FilamentAsset::register([
    // ...
], package: 'danharrin/filament-blog');
```

Ahora, todos los recursos de este complemento se copiarán en su propio directorio dentro de `/public`, para evitar la posibilidad de que entren en conflicto con los archivos de otros complementos con los mismos nombres.

## Registrar archivos CSS

Para registrar un archivo CSS con el sistema de activos, utilice el método `FilamentAsset::register()` en el método `boot()` de un proveedor de servicios. Debe pasar una matriz de `Css` objetos, cada uno de los cuales representa un archivo CSS que debe registrarse en el sistema de activos.

Cada objeto `Css` tiene una identificación única y una ruta al archivo CSS:

```php
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;

FilamentAsset::register([
    Css::make('custom-stylesheet', __DIR__ . '/../../resources/css/custom.css'),
]);
```

En este ejemplo, usamos `__DIR__` para generar una ruta relativa al activo desde el archivo actual. Por ejemplo, si estuviera agregando este código a `/app/Providers/AppServiceProvider.php`, entonces el archivo CSS debería existir en `/resources/css/custom.css`.

Ahora, cuando se ejecuta el comando `php artisan filament:assets`, este archivo CSS se copia en el directorio `/public`. Además, ahora está cargado en todas las vistas de Blade que usan Filament. Si está interesado en cargar CSS solo cuando lo requiera un elemento de la página, consulte la sección [Carga diferida de CSS](#lazy-loading-css).

### Uso de Tailwind CSS en complementos

Normalmente, el registro de archivos CSS se utiliza para registrar hojas de estilo personalizadas para su aplicación. Si desea procesar estos archivos usando Tailwind CSS, debe considerar las implicaciones de esto, especialmente si es un desarrollador de complementos.

Las compilaciones de Tailwind son únicas para cada aplicación: contienen un conjunto mínimo de clases de utilidad, solo las que realmente estás usando en tu aplicación. Esto significa que si es un desarrollador de complementos, probablemente no debería crear sus archivos CSS de Tailwind en su complemento. En su lugar, debe proporcionar los archivos CSS sin formato e indicarle al usuario que debe crear el archivo CSS Tailwind por sí mismo. Para hacer esto, probablemente solo necesiten agregar su directorio de proveedores en la matriz `content` de su archivo `tailwind.config.js`:

```js
export default {
    content: [
        './resources/**/*.blade.php',
        './vendor/filament/**/*.blade.php',
        './vendor/danharrin/filament-blog/resources/views/**/*.blade.php', // Your plugin's vendor directory
    ],
    // ...
}
```

Esto significa que cuando construyan su archivo CSS Tailwind, incluirá todas las clases de utilidad que se utilizan en las vistas de su complemento, así como las clases de utilidad que se utilizan en su aplicación y el núcleo de Filament.

Sin embargo, con esta técnica, puede haber complicaciones adicionales para los usuarios que usan su complemento con el [Panel Builder](../panels). Si tienen un [tema personalizado] (../paneles/temas), estarán bien, ya que de todos modos están creando su propio archivo CSS usando Tailwind CSS. Sin embargo, si utilizan la hoja de estilo predeterminada que se incluye con Panel Builder, es posible que deba tener cuidado con las clases de utilidad que utiliza en las vistas de su complemento. Por ejemplo, si utiliza una clase de utilidad que no está incluida en la hoja de estilo predeterminada, el usuario no la compilará por sí mismo y no se incluirá en el archivo CSS final. Esto significa que es posible que las vistas de su complemento no se vean como se esperaba. Esta es una de las pocas situaciones en las que recomendaría compilar y [registrar](#registering-css-files) una hoja de estilo compilada con Tailwind CSS en su complemento.

### Carga diferida de CSS

De forma predeterminada, todos los archivos CSS registrados con el sistema de activos se cargan en el `<head>` de cada página de Filament. Esta es la forma más sencilla de cargar archivos CSS, pero a veces pueden ser bastante pesados ​​y no necesarios en todas las páginas. En este caso, puede aprovechar el paquete [Alpine.js Lazy Load Assets](https://github.com/tanthammar/alpine-lazy-load-assets) que viene incluido con Filament. Le permite cargar fácilmente archivos CSS bajo demanda utilizando Alpine.js. La premisa es muy simple: usa la directiva `x-load-css` en un elemento, y cuando ese elemento se carga en la página, los archivos CSS especificados se cargan en el `<head>` de la página. Esto es perfecto tanto para elementos pequeños de la interfaz de usuario como para páginas enteras que requieren un archivo CSS:

```blade
### Registrar archivos CSS desde una URL

Si desea registrar un archivo CSS desde una URL, puede hacerlo. Estos recursos se cargarán en cada página normalmente, pero no se copiarán en el directorio `/public` cuando se ejecute el comando `php artisan filament:assets`. Esto es útil para registrar hojas de estilo externas desde una CDN, u hojas de estilo que ya esté compilando directamente en el directorio `/public`:

```php
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;

FilamentAsset::register([
    Css::make('example-external-stylesheet', 'https://example.com/external.css'),
    Css::make('example-local-stylesheet', asset('css/local.css')),
]);
```

### Registrar variables CSS

A veces, es posible que desee utilizar datos dinámicos del backend en archivos CSS. Para hacer esto, puede utilizar el método `FilamentAsset::registerCssVariables()` en el método `boot()` de un proveedor de servicios:

```php
use Filament\Support\Facades\FilamentAsset;

FilamentAsset::registerCssVariables([
    'background-image' => asset('images/background.jpg'),
]);
```

Ahora puedes acceder a estas variables desde cualquier archivo CSS:

```css
background-image: var(--background-image);
```

## Registrar archivos JavaScript

Para registrar un archivo JavaScript con el sistema de activos, utilice el método `FilamentAsset::register()` en el método `boot()` de un proveedor de servicios. Debe pasar una matriz de `Js` objetos, cada uno de los cuales representa un archivo JavaScript que debe registrarse en el sistema de activos.

Cada objeto `Js` tiene una identificación única y una ruta al archivo JavaScript:

```php
use Filament\Support\Assets\Js;

FilamentAsset::register([
    Js::make('custom-script', __DIR__ . '/../../resources/js/custom.js'),
]);
```

En este ejemplo, usamos `__DIR__` para generar una ruta relativa al activo desde el archivo actual. Por ejemplo, si estuviera agregando este código a `/app/Providers/AppServiceProvider.php`, entonces el archivo JavaScript debería existir en `/resources/js/custom.js`.

Ahora, cuando se ejecuta el comando `php artisan filament:assets`, este archivo JavaScript se copia en el directorio `/public`. Además, ahora está cargado en todas las vistas de Blade que usan Filament. Si está interesado en cargar JavaScript solo cuando lo requiera un elemento de la página, consulte la sección [Carga diferida de JavaScript](#lazy-loading-javascript).

### Carga diferida de JavaScript

De forma predeterminada, todos los archivos JavaScript registrados con el sistema de activos se cargan en la parte inferior de cada página de Filament. Esta es la forma más sencilla de cargar archivos JavaScript, pero a veces pueden ser bastante pesados ​​y no necesarios en todas las páginas. En este caso, puede aprovechar el paquete [Alpine.js Lazy Load Assets](https://github.com/tanthammar/alpine-lazy-load-assets) que viene incluido con Filament. Le permite cargar fácilmente archivos JavaScript bajo demanda utilizando Alpine.js. La premisa es muy simple: usa la directiva `x-load-js` en un elemento y cuando ese elemento se carga en la página, los archivos JavaScript especificados se cargan en la parte inferior de la página. Esto es perfecto tanto para elementos pequeños de la interfaz de usuario como para páginas completas que requieren un archivo JavaScript:

```blade
#### Componentes asincrónicos de Alpine.js

A veces, es posible que desee cargar bibliotecas JavaScript externas para sus componentes basados ​​en Alpine.js. La mejor manera de hacerlo es almacenando el componente JavaScript y Alpine compilado en un archivo separado y permitiéndonos cargarlo cada vez que se renderice el componente.

En primer lugar, debes instalar [esbuild](https://esbuild.github.io) a través de NPM, que usaremos para crear un único archivo JavaScript que contenga tu biblioteca externa y el componente Alpine:

```bash
npm install esbuild --save-dev
```

Luego, debe crear un script para compilar su componente JavaScript y Alpine. Puedes poner esto en cualquier lugar, por ejemplo `bin/build.js`:

```js
import * as esbuild from 'esbuild'

const isDev = process.argv.includes('--dev')

async function compile(options) {
    const context = await esbuild.context(options)

    if (isDev) {
        await context.watch()
    } else {
        await context.rebuild()
        await context.dispose()
    }
}

const defaultOptions = {
    define: {
        'process.env.NODE_ENV': isDev ? `'development'` : `'production'`,
    },
    bundle: true,
    mainFields: ['module', 'main'],
    platform: 'neutral',
    sourcemap: isDev ? 'inline' : false,
    sourcesContent: isDev,
    treeShaking: true,
    target: ['es2020'],
    minify: !isDev,
    plugins: [{
        name: 'watchPlugin',
        setup(build) {
            build.onStart(() => {
                console.log(`Build started at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`)
            })

            build.onEnd((result) => {
                if (result.errors.length > 0) {
                    console.log(`Build failed at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`, result.errors)
                } else {
                    console.log(`Build finished at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`)
                }
            })
        }
    }],
}

compile({
    ...defaultOptions,
    entryPoints: ['./resources/js/components/test-component.js'],
    outfile: './resources/js/dist/components/test-component.js',
})
```

Como puede ver en la parte inferior del script, estamos compilando un archivo llamado `resources/js/components/test-component.js` en `resources/js/dist/components/test-component.js`. Puede cambiar estas rutas para adaptarlas a sus necesidades. Puede compilar tantos componentes como desee.

Ahora, crea un nuevo archivo llamado `resources/js/components/test-component.js`:

```js
// Import any external JavaScript libraries from NPM here.

export default function testComponent({
    state,
}) {
    return {
        state,
        
        // You can define any other Alpine.js properties here.

        init() {
            // Initialise the Alpine component here, if you need to.
        },
        
        // You can define any other Alpine.js functions here.
    }
}
```

Ahora puede compilar este archivo en `resources/js/dist/components/test-component.js` ejecutando el siguiente comando:

```bash
node bin/build.js
```

Si desea observar los cambios en este archivo en lugar de compilarlo una vez, pruebe el siguiente comando:

```bash
node bin/build.js --dev
```

Ahora, debe decirle a Filament que publique este archivo JavaScript compilado en el directorio `/public` de la aplicación Laravel, para que sea accesible para el navegador. Para hacer esto, puede usar el método `FilamentAsset::register()` en el método `boot()` de un proveedor de servicios, pasando un objeto `AlpineComponent`:

```php
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;

FilamentAsset::register([
    AlpineComponent::make('test-component', __DIR__ . '/../../resources/js/dist/components/test-component.js'),
]);
```

Cuando ejecute `php artisan filament:assets`, el archivo compilado se copiará en el directorio `/public`.

Finalmente, puede cargar este componente Alpine asíncrono en su vista usando los atributos `x-load` y ​​el método `FilamentAsset::getAlpineComponentSrc()`:

```blade
### Registrar datos de script

A veces, es posible que desee que los datos del backend estén disponibles para archivos JavaScript. Para hacer esto, puede usar el método `FilamentAsset::registerScriptData()` en el método `boot()` de un proveedor de servicios:

```php
use Filament\Support\Facades\FilamentAsset;

FilamentAsset::registerScriptData([
    'user' => [
        'name' => auth()->user()?->name,
    ],
]);
```

Ahora, puedes acceder a esos datos desde cualquier archivo JavaScript en tiempo de ejecución, usando el objeto `window.filamentData`:

```js
window.filamentData.user.name // 'Dan Harrin'
```

### Registrar archivos JavaScript desde una URL

Si desea registrar un archivo JavaScript desde una URL, puede hacerlo. Estos recursos se cargarán en cada página normalmente, pero no se copiarán en el directorio `/public` cuando se ejecute el comando `php artisan filament:assets`. Esto es útil para registrar scripts externos desde una CDN o scripts que ya esté compilando directamente en el directorio `/public`:

```php
use Filament\Support\Assets\Js;

FilamentAsset::register([
    Js::make('example-external-script', 'https://example.com/external.js'),
    Js::make('example-local-script', asset('js/local.js')),
]);
```
