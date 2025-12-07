---
title: Crear un complemento de panel
---

## Prefacio

Lea los documentos sobre [desarrollo de complementos de panel] (../panels/plugins) y la [guía de introducción] (introducción) antes de continuar.

## Introducción

En este tutorial, crearemos un complemento simple que agrega un nuevo campo de formulario que se puede usar en formularios. Esto también significa que estará disponible para los usuarios en sus paneles.

Puede encontrar el código final de este complemento en [https://github.com/awcodes/clock-widget](https://github.com/awcodes/clock-widget).

## Paso 1: crear el complemento

Primero, crearemos el complemento siguiendo los pasos descritos en la [guía de introducción] (primeros pasos#creación-de-un-complemento).

## Paso 2: Limpiar

A continuación, limpiaremos el complemento para eliminar el código repetitivo que no necesitamos. Esto parecerá mucho, pero como se trata de un complemento simple, podemos eliminar gran parte del código repetitivo.

Elimine los siguientes directorios y archivos:
1. `config`
1. `database`
1. `src/Commands`
1. `src/Facades`
1. `stubs`

Dado que nuestro complemento no tiene ninguna configuración ni métodos adicionales necesarios para la funcionalidad, también podemos eliminar el archivo `ClockWidgetPlugin.php`.

1. `ClockWidgetPlugin.php`

Dado que Filament recomienda que los usuarios diseñen sus complementos con un tema de filamento personalizado, eliminaremos los archivos necesarios para usar CSS en el complemento. Esto es opcional y aún puedes usar CSS si lo deseas, pero no se recomienda.

1. `resources/css`
2. `postcss.config.js`

Ahora podemos limpiar nuestro archivo `composer.json` para eliminar opciones innecesarias.

```json
"autoload": {
    "psr-4": {
        // We can remove the database factories
        "Awcodes\\ClockWidget\\Database\\Factories\\": "database/factories/"
    }
},
"extra": {
    "laravel": {
        // We can remove the facade
        "aliases": {
            "ClockWidget": "Awcodes\\ClockWidget\\Facades\\ClockWidget"
        }
    }
},
```

El último paso es actualizar el archivo `package.json` para eliminar opciones innecesarias. Reemplace el contenido de `package.json` con lo siguiente.

```json
{
    "private": true,
    "type": "module",
    "scripts": {
        "dev": "node bin/build.js --dev",
        "build": "node bin/build.js"
    },
    "devDependencies": {
        "esbuild": "^0.17.19"
    }
}
```

Luego necesitamos instalar nuestras dependencias.

```bash
npm install
```

También puede eliminar los directorios y archivos de Prueba, pero los dejaremos ahí por ahora, aunque no los usaremos para este ejemplo, y le recomendamos encarecidamente que escriba pruebas para sus complementos.

## Paso 3: Configurar el proveedor

Ahora que hemos limpiado nuestro complemento, podemos comenzar a agregar nuestro código. El texto estándar en el archivo `src/ClockWidgetServiceProvider.php` tiene muchas cosas que hacer, así que eliminemos todo y comencemos desde cero.

:::info
    En este ejemplo, registraremos un [componente Alpine asíncrono] (../assets#asynchronous-alpinejs-components). Dado que estos activos solo se cargan a pedido, podemos registrarlos normalmente en el método `packageBooted()`. Si está registrando activos, como archivos CSS o JS, que se cargan en cada página independientemente de si se usan o no, debe registrarlos en el método `register()` del objeto de configuración `Plugin`, usando [`$panel->assets()`](../panel-configuration#registering-assets-for-a-panel). De lo contrario, si los registras en el método `packageBooted()`, se cargarán en cada panel, independientemente de si el plugin ha sido registrado o no para ese panel.
:::

Necesitamos poder registrar nuestro widget con el panel y cargar nuestro componente Alpine cuando se use el widget. Para hacer esto, necesitaremos agregar lo siguiente al método `packageBooted` en nuestro proveedor de servicios. Esto registrará nuestro componente de widget con Livewire y nuestro componente Alpine con Filament Asset Manager.

```php
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;
use Livewire\Livewire;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class ClockWidgetServiceProvider extends PackageServiceProvider
{
    public static string $name = 'clock-widget';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasViews()
            ->hasTranslations();
    }

    public function packageBooted(): void
    {
        Livewire::component('clock-widget', ClockWidget::class);

        // Asset Registration
        FilamentAsset::register(
            assets:[
                 AlpineComponent::make('clock-widget', __DIR__ . '/../resources/dist/clock-widget.js'),
            ],
            package: 'awcodes/clock-widget'
        );
    }
}
```

## Paso 4: Crea el widget

Ahora podemos crear nuestro widget. Primero necesitaremos extender la clase `Widget` de Filament en nuestro archivo `ClockWidget.php` y ​​decirle dónde encontrar la vista para el widget. Dado que estamos usando PackageServiceProvider para registrar nuestras vistas, podemos usar la sintaxis `::` para indicarle a Filament dónde encontrar la vista.

```php
use Filament\Widgets\Widget;

class ClockWidget extends Widget
{
    protected static string $view = 'clock-widget::widget';
}
```

A continuación, necesitaremos crear la vista para nuestro widget. Cree un nuevo archivo en `resources/views/widget.blade.php` y ​​agregue el siguiente código. Usaremos los componentes blade de Filament para ahorrar tiempo al escribir el html para el widget.

Estamos usando async Alpine para cargar nuestro componente Alpine, por lo que necesitaremos agregar el atributo `x-load` al div para indicarle a Alpine que cargue nuestro componente. Puede obtener más información sobre esto en la sección [Conceptos básicos](../advanced/assets#asynchronous-alpinejs-components) de los documentos.

```blade
<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            {{ __('clock-widget::clock-widget.title') }}
        </x-slot>

        
