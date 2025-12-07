---
title: Desarrollo de complementos
---

## Introducción

La base de los complementos de Filament son los paquetes de Laravel. Se instalan en su proyecto Filament a través de Composer y siguen todas las técnicas estándar, como utilizar proveedores de servicios para registrar rutas, vistas y traducciones. Si eres nuevo en el desarrollo de paquetes Laravel, aquí tienes algunos recursos que pueden ayudarte a comprender los conceptos básicos:

- [La sección Desarrollo de paquetes de los documentos de Laravel](https://laravel.com/docs/packages) sirve como una excelente guía de referencia.
- [Curso de capacitación sobre paquetes de Spapatie](https://spatie.be/products/laravel-package-training) es una buena serie de videos instructivos para enseñarle el proceso paso a paso.
- [Herramientas de paquete de Spapatie](https://github.com/spatie/laravel-package-tools) le permite simplificar sus clases de proveedor de servicios utilizando un objeto de configuración fluido.

Los complementos de Filament se basan en los conceptos de los paquetes de Laravel y le permiten enviar y consumir funciones reutilizables para cualquier panel de Filament. Se pueden agregar a cada panel uno a la vez y también se pueden configurar de manera diferente por panel.

## Configurando el panel con una clase de complemento

Se utiliza una clase de complemento para permitir que su paquete interactúe con un archivo de panel [configuración](../panel-configuration). Es una clase PHP simple que implementa la interfaz `Plugin`. Se requieren 3 métodos:

- El método `getId()` devuelve el identificador único del complemento entre otros complementos. Asegúrese de que sea lo suficientemente específico como para no chocar con otros complementos que puedan usarse en el mismo proyecto.
- El método `register()` permite utilizar cualquier opción de [configuración](../panel-configuration) que esté disponible para el panel. Esto incluye registrar [recursos](recursos), [páginas personalizadas](../navigación/páginas personalizadas), [temas](temas), [enganches de renderizado](../panel-configuration#render-hooks) y más.
- El método `boot()` se ejecuta solo cuando el panel en el que se está registrando el complemento está realmente en uso. Es ejecutado por una clase de middleware.

```php
<?php

namespace DanHarrin\FilamentBlog;

use DanHarrin\FilamentBlog\Pages\Settings;
use DanHarrin\FilamentBlog\Resources\CategoryResource;
use DanHarrin\FilamentBlog\Resources\PostResource;
use Filament\Contracts\Plugin;
use Filament\Panel;

class BlogPlugin implements Plugin
{
    public function getId(): string
    {
        return 'blog';
    }

    public function register(Panel $panel): void
    {
        $panel
            ->resources([
                PostResource::class,
                CategoryResource::class,
            ])
            ->pages([
                Settings::class,
            ]);
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
```

Los usuarios de su complemento pueden agregarlo a un panel creando una instancia de la clase del complemento y pasándola al método `plugin()` de la [configuración](../panel-configuration):

```php
use DanHarrin\FilamentBlog\BlogPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->plugin(new BlogPlugin());
}
```

### Creación de instancias fluidas de la clase de complemento

Es posible que desee agregar un método `make()` a su clase de complemento para proporcionar una interfaz fluida para que sus usuarios puedan crear una instancia. Además, al utilizar el contenedor (`app()`) para crear una instancia del objeto del complemento, se puede reemplazar con una implementación diferente en tiempo de ejecución:

```php
use Filament\Contracts\Plugin;

class BlogPlugin implements Plugin
{
    public static function make(): static
    {
        return app(static::class);
    }
    
    // ...
}
```

Ahora, tus usuarios pueden usar el método `make()`:

```php
use DanHarrin\FilamentBlog\BlogPlugin;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->plugin(BlogPlugin::make());
}
```

### Configuración de complementos por panel

Puede agregar otros métodos a su clase de complemento, que permitan a sus usuarios configurarlo. Le sugerimos que agregue un método de establecimiento y de obtención para cada opción que proporcione. Debe usar una propiedad para almacenar la preferencia en el definidor y recuperarla nuevamente en el captador:

```php
use DanHarrin\FilamentBlog\Resources\AuthorResource;
use Filament\Contracts\Plugin;
use Filament\Panel;

class BlogPlugin implements Plugin
{
    protected bool $hasAuthorResource = false;
    
    public function authorResource(bool $condition = true): static
    {
        // This is the setter method, where the user's preference is
        // stored in a property on the plugin object.
        $this->hasAuthorResource = $condition;
    
        // The plugin object is returned from the setter method to
        // allow fluent chaining of configuration options.
        return $this;
    }
    
    public function hasAuthorResource(): bool
    {
        // This is the getter method, where the user's preference
        // is retrieved from the plugin property.
        return $this->hasAuthorResource;
    }
    
    public function register(Panel $panel): void
    {
        // Since the `register()` method is executed after the user
        // configures the plugin, you can access any of their
        // preferences inside it.
        if ($this->hasAuthorResource()) {
            // Here, we only register the author resource on the
            // panel if the user has requested it.
            $panel->resources([
                AuthorResource::class,
            ]);
        }
    }
    
    // ...
}
```

Además, puede utilizar el ID único del complemento para acceder a cualquiera de sus opciones de configuración desde fuera de la clase del complemento. Para hacer esto, pase el ID al método `filament()`:

```php
filament('blog')->hasAuthorResource()
```

Es posible que desee tener una mejor seguridad de escritura y autocompletado IDE al acceder a la configuración. Depende completamente de usted cómo elige lograr esto, pero una idea podría ser agregar un método estático a la clase del complemento para recuperarlo:

```php
use Filament\Contracts\Plugin;

class BlogPlugin implements Plugin
{
    public static function get(): static
    {
        return filament(app(static::class)->getId());
    }
    
    // ...
}
```

Ahora puede acceder a la configuración del complemento utilizando el nuevo método estático:

```php
BlogPlugin::get()->hasAuthorResource()
```

## Distribuir un panel en un complemento

Es muy fácil distribuir un panel completo en un paquete Laravel. De esta manera, un usuario puede simplemente instalar su complemento y tener una parte completamente nueva de su aplicación prediseñada.

Al [configurar](../panel-configuration) un panel, la clase de configuración extiende la clase `PanelProvider`, y ese es un proveedor de servicios estándar de Laravel. Puedes utilizarlo como proveedor de servicios en tu paquete:

```php
<?php

namespace DanHarrin\FilamentBlog;

use Filament\Panel;
use Filament\PanelProvider;

class BlogPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('blog')
            ->path('blog')
            ->resources([
                // ...
            ])
            ->pages([
                // ...
            ])
            ->widgets([
                // ...
            ])
            ->middleware([
                // ...
            ])
            ->authMiddleware([
                // ...
            ]);
    }
}
```

Luego deberás registrarlo como proveedor de servicios en el `composer.json` de tu paquete:

```json
"extra": {
    "laravel": {
        "providers": [
            "DanHarrin\\FilamentBlog\\BlogPanelProvider"
        ]
    }
}
```
