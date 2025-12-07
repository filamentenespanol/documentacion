---
title: Configuración del panel
---

## Introducción

De forma predeterminada, el archivo de configuración se encuentra en `app/Providers/Filament/AdminPanelProvider.php`. Continúe leyendo para obtener más información sobre los [paneles](#presentando-paneles) y cómo cada uno tiene [su propio archivo de configuración](#creando-un-nuevo-panel).

## Presentación de paneles

De forma predeterminada, cuando instala el paquete, hay un panel que se ha configurado para usted y se encuentra en `/admin`. Todos los [recursos](recursos), [páginas personalizadas](navegación/páginas personalizadas) y [widgets de panel](panel) que cree se registran en este panel.

Sin embargo, puedes crear tantos paneles como quieras y cada uno puede tener su propio conjunto de recursos, páginas y widgets.

Por ejemplo, podría crear un panel donde los usuarios puedan iniciar sesión en `/app` y ​​acceder a su panel, y los administradores puedan iniciar sesión en `/admin` y ​​administrar la aplicación. El panel `/app` y ​​el panel `/admin` cuentan con recursos propios, ya que cada grupo de usuarios tiene requerimientos diferentes. Filament le permite hacerlo brindándole la posibilidad de crear múltiples paneles.

### El panel de administración predeterminado

Cuando ejecuta `filament:install`, se crea un nuevo archivo en `app/Providers/Filament` - `AdminPanelProvider.php`. Este archivo contiene la configuración del panel `/admin`.

Cuando esta documentación se refiere a la "configuración", este es el archivo que necesita editar. Te permite personalizar completamente la aplicación.

### Creando un nuevo panel

Para crear un nuevo panel, puede usar el comando `make:filament-panel`, pasando el nombre único del nuevo panel:

```bash
php artisan make:filament-panel app
```

Este comando creará un nuevo panel llamado "aplicación". Se creará un archivo de configuración en `app/Providers/Filament/AppPanelProvider.php`. Puedes acceder a este panel en `/app`, pero puedes [personalizar la ruta](#cambiando-la-ruta) si no lo deseas.

Dado que este archivo de configuración también es un [proveedor de servicios de Laravel] (https://laravel.com/docs/providers), debe registrarse en `bootstrap/providers.php` (Laravel 11 y superior) o `config/app.php` (Laravel 10 y inferior). Filament intentará hacer esto por usted, pero si recibe un error al intentar acceder a su panel, es probable que este proceso haya fallado.

## Cambiando el camino

En un archivo de configuración del panel, puede cambiar la ruta a la que se puede acceder a la aplicación utilizando el método `path()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->path('app');
}
```

Si desea que se pueda acceder a la aplicación sin ningún prefijo, puede configurarla para que sea una cadena vacía:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->path('');
}
```

Asegúrese de que su archivo `routes/web.php` no defina ya la ruta `''` o `'/'`, ya que tendrá prioridad.

## Ganchos de renderizado

Los [ganchos de renderizado] (avanzado/ganchos de renderizado) le permiten renderizar contenido de Blade en varios puntos de las vistas del marco. Puede [registrar ganchos de renderizado globales](advanced/render-hooks#registering-render-hooks) en un proveedor de servicios o middleware, pero también le permite registrar ganchos de renderizado que son específicos de un panel. Para hacer eso, puede usar el método `renderHook()` en el objeto de configuración del panel. Aquí hay un ejemplo, integrando [`wire-elements/modal`](https://github.com/wire-elements/modal) con Filament:

```php
use Filament\Panel;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->renderHook(
            PanelsRenderHook::BODY_START,
            fn (): string => Blade::render('@livewire(\'livewire-ui-modal\')'),
        );
}
```

Puede encontrar una lista completa de ganchos de renderizado disponibles [aquí](avanzado/render-hooks#available-render-hooks).

## Configurar un dominio

De forma predeterminada, Filament responderá a las solicitudes de todos los dominios. Si desea limitarlo a un dominio específico, puede utilizar el método `domain()`, similar a [`Route::domain()` en Laravel](https://laravel.com/docs/routing#route-group-subdomain-routing):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->domain('admin.example.com');
}
```

## Personalizando el ancho máximo del contenido

De forma predeterminada, Filament restringirá el ancho del contenido de la página, para que no sea demasiado ancho en pantallas grandes. Para cambiar esto, puede utilizar el método `maxContentWidth()`. Las opciones corresponden a [escala de ancho máximo de Tailwind] (https://tailwindcss.com/docs/max-width). Las opciones son `ExtraSmall`, `Small`, `Medium`, `Large`, `ExtraLarge`, `TwoExtraLarge`, `ThreeExtraLarge`, `FourExtraLarge`, `FiveExtraLarge`, `SixExtraLarge`, `SevenExtraLarge`, `Full`, `MinContent`, `MaxContent`, `FitContent`, `Prose`, `ScreenSmall`, `ScreenMedium`, `ScreenLarge`, `ScreenExtraLarge` y `ScreenTwoExtraLarge`. El valor predeterminado es `SevenExtraLarge`:

```php
use Filament\Panel;
use Filament\Support\Enums\Width;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->maxContentWidth(Width::Full);
}
```

Si desea establecer el ancho máximo de contenido para páginas del tipo `SimplePage`, como páginas de inicio de sesión y registro, puede hacerlo utilizando el método `simplePageMaxContentWidth()`. El valor predeterminado es `Large`:

```php
use Filament\Panel;
use Filament\Support\Enums\Width;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->simplePageMaxContentWidth(Width::Small);
}
```

## Establecer la posición de subnavegación predeterminada

La subnavegación se representa al inicio de cada página de forma predeterminada. Se puede personalizar por página, por recurso y por clúster, pero también puede personalizarlo para todo el panel a la vez usando el método `subNavigationPosition()`. El valor puede ser `SubNavigationPosition::Start`, `SubNavigationPosition::End` o `SubNavigationPosition::Top` para representar la subnavegación como pestañas:

```php
use Filament\Pages\Enums\SubNavigationPosition;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->subNavigationPosition(SubNavigationPosition::End);
}
```

## Ganchos del ciclo de vida

Se pueden utilizar ganchos para ejecutar código durante el ciclo de vida de un panel. `bootUsing()` es un gancho que se ejecuta en cada solicitud que tiene lugar dentro de ese panel. Si tiene varios paneles, solo se ejecutará el `bootUsing()` del panel actual. La función se ejecuta desde el middleware, después de que se hayan iniciado todos los proveedores de servicios:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->bootUsing(function (Panel $panel) {
            // ...
        });
}
```

## modo SPA

El modo SPA utiliza [la característica `wire:navigate` de Livewire](https://livewire.laravel.com/docs/navigate) para hacer que su panel renderizado por el servidor se sienta como una aplicación de una sola página, con menos demora entre cargas de página y una barra de carga para solicitudes más largas. Para habilitar el modo SPA en un panel, puede utilizar el método `spa()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->spa();
}
```

### Deshabilitar la navegación SPA para URL específicas

De forma predeterminada, al habilitar el modo SPA, cualquier URL que resida en el mismo dominio que la solicitud actual será navegada mediante la función [`wire:navigate`](https://livewire.laravel.com/docs/navigate) de Livewire. Si desea desactivar esto para URL específicas, puede utilizar el método `spaUrlExceptions()`:

```php
use App\Filament\Resources\Posts\PostResource;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->spa()
        ->spaUrlExceptions(fn (): array => [
            url('/admin'),
            PostResource::getUrl(),
        ]);
}
```

:::info
    En este ejemplo, utilizamos [`getUrl()`](/resources#generating-urls-to-resource-pages) en un recurso para obtener la URL de la página de índice del recurso. Sin embargo, esta característica requiere que el panel ya esté registrado y la configuración se encuentra en una etapa demasiado temprana del ciclo de vida de la solicitud para hacerlo. En su lugar, puede utilizar una función para devolver las URL, lo que se resolverá cuando se haya registrado el panel.
:::

Estas URL deben coincidir exactamente con la URL a la que navega el usuario, incluidos el dominio y el protocolo. Si desea utilizar un patrón para hacer coincidir varias URL, puede utilizar un asterisco (`*`) como carácter comodín:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->spa()
        ->spaUrlExceptions([
            '*/admin/posts/*',
        ]);
}
```

### Habilitación de la captación previa de SPA

La captación previa de SPA mejora la experiencia del usuario al precargar automáticamente las páginas cuando los usuarios pasan el cursor sobre los enlaces, lo que hace que la navegación parezca aún más receptiva. Esta función utiliza [la funcionalidad `wire:navigate.hover` de Livewire](https://livewire.laravel.com/docs/navigate#prefetching-links).

Para habilitar el modo SPA con captación previa, puede pasar el parámetro `hasPrefetching: true` al método `spa()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->spa(hasPrefetching: true);
}
```

Cuando la captura previa está habilitada, todos los enlaces dentro de su panel incluirán automáticamente `wire:navigate.hover`, que captura previamente el contenido de la página cuando los usuarios pasan el cursor sobre el enlace. Esto funciona perfectamente con [excepciones de URL] (#disabling-spa-navigation-for-specific-urls): cualquier URL excluida del modo SPA también se excluirá de la captación previa.

:::info
    La captación previa solo funciona cuando el modo SPA está habilitado. Si desactiva el modo SPA, la captación previa también se desactivará automáticamente.
:::

:::warning
    La captura previa de páginas pesadas puede provocar un mayor uso del ancho de banda y una mayor carga del servidor, especialmente si los usuarios pasan el cursor sobre muchos enlaces en rápida sucesión. Utilice esta función con prudencia, especialmente si su aplicación tiene páginas con grandes cantidades de datos o consultas complejas.
:::

## Alertas de cambios no guardados

Puede alertar a los usuarios si intentan salir de una página sin guardar los cambios. Esto se aplica en las páginas [Crear](recursos/creación de registros) y [Editar](recursos/edición de registros) de un recurso, así como en cualquier modo de acción abierto. Para habilitar esta función, puede utilizar el método `unsavedChangesAlerts()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->unsavedChangesAlerts();
}
```

## Habilitación de transacciones de bases de datos

De forma predeterminada, Filament no envuelve operaciones en transacciones de bases de datos y permite al usuario habilitar esto por sí mismo cuando lo ha probado para garantizar que sus operaciones sean seguras para incluirse en una transacción. Sin embargo, puede habilitar transacciones de base de datos a la vez para todas las operaciones utilizando el método `databaseTransactions()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->databaseTransactions();
}
```

Para cualquier acción que no desee incluir en una transacción, puede utilizar el método `databaseTransaction(false)`:

```php
CreateAction::make()
    ->databaseTransaction(false)
```

Y para cualquier página como [Crear recurso](recursos/creación de registros) y [Editar recurso](recursos/edición de registros), puede definir la propiedad `$hasDatabaseTransactions` en `false` en la clase de página:

```php
use Filament\Resources\Pages\CreateRecord;

class CreatePost extends CreateRecord
{
    protected ?bool $hasDatabaseTransactions = false;

    // ...
}
```

### Optar por las transacciones de la base de datos para acciones y páginas específicas

En lugar de habilitar transacciones de bases de datos en todas partes y excluirlas para acciones y páginas específicas, puede optar por transacciones de bases de datos para acciones y páginas específicas.

Para acciones, puedes utilizar el método `databaseTransaction()`:

```php
CreateAction::make()
    ->databaseTransaction()
```

Para páginas como [Crear recurso](recursos/creación-registros) y [Editar recurso](recursos/edición-registros), puede definir la propiedad `$hasDatabaseTransactions` en `true` en la clase de página:

```php
use Filament\Resources\Pages\CreateRecord;

class CreatePost extends CreateRecord
{
    protected ?bool $hasDatabaseTransactions = true;

    // ...
}
```

## Registro de activos para un panel

Puede registrar [activos](../avanzado/activos) que solo se cargarán en páginas dentro de un panel específico, y no en el resto de la aplicación. Para hacer eso, pase una matriz de activos al método `assets()`:

```php
use Filament\Panel;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->assets([
            Css::make('custom-stylesheet', resource_path('css/custom.css')),
            Js::make('custom-script', resource_path('js/custom.js')),
        ]);
}
```

Antes de poder utilizar estos [activos](../advanced/assets), deberá ejecutar `php artisan filament:assets`.

## Aplicar middleware

Puede aplicar middleware adicional a todas las rutas pasando una serie de clases de middleware al método `middleware()` en la configuración:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->middleware([
            // ...
        ]);
}
```

De forma predeterminada, el middleware se ejecutará cuando la página se cargue por primera vez, pero no en solicitudes posteriores de Livewire AJAX. Si desea ejecutar middleware en cada solicitud, puede hacerlo persistente pasando `true` como segundo argumento del método `middleware()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->middleware([
            // ...
        ], isPersistent: true);
}
```

### Aplicar middleware a rutas autenticadas

Puede aplicar middleware a todas las rutas autenticadas pasando una serie de clases de middleware al método `authMiddleware()` en la configuración:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->authMiddleware([
            // ...
        ]);
}
```

De forma predeterminada, el middleware se ejecutará cuando la página se cargue por primera vez, pero no en solicitudes posteriores de Livewire AJAX. Si desea ejecutar middleware en cada solicitud, puede hacerlo persistente pasando `true` como segundo argumento del método `authMiddleware()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->authMiddleware([
            // ...
        ], isPersistent: true);
}
```

## Deshabilitar la transmisión

De forma predeterminada, Laravel Echo se conectará automáticamente para cada panel, si las credenciales se han configurado en el [archivo de configuración publicado `config/filament.php`] (instalación#publishing-configuration). Para deshabilitar esta conexión automática en un panel, puedes utilizar el método `broadcasting(false)`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->broadcasting(false);
}
```

## Modo de autorización estricta

De forma predeterminada, cuando Filament autoriza al usuario a acceder a un recurso, primero verificará si la política existe para ese modelo y, si es así, verificará si existe un método en la política para realizar la acción. Si la política o el método de política no existe, otorgará al usuario acceso al recurso, ya que se supone que aún no ha configurado la autorización o que no la necesita.

Si prefiere que Filament genere una excepción si la política o el método de política no existe, puede habilitar el modo de autorización estricta utilizando el método `strictAuthorization()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->strictAuthorization();
}
```

## Configurar notificaciones de errores

Cuando el modo de depuración de Laravel está deshabilitado, Filament reemplazará los modos de error de pantalla completa de Livewire con notificaciones flash más ordenadas. Puede desactivar este comportamiento utilizando el método `errorNotifications(false)`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->errorNotifications(false);
}
```

Puede personalizar el texto de notificación de error pasando cadenas a los parámetros `title` y ​​`body` del método `registerErrorNotification()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->registerErrorNotification(
            title: 'An error occurred',
            body: 'Please try again later.',
        );
}
```

También puede registrar texto de notificación de error para un código de estado HTTP específico, como `404`, pasando ese código de estado en el parámetro `statusCode`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->registerErrorNotification(
            title: 'An error occurred',
            body: 'Please try again later.',
        )
        ->registerErrorNotification(
            title: 'Record not found',
            body: 'A record you are looking for does not exist.',
            statusCode: 404,
        );
}
```

También puede habilitar o deshabilitar las notificaciones de error para páginas específicas en un panel configurando la propiedad `$hasErrorNotifications` en la clase de página:

```php
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected ?bool $hasErrorNotifications = true;
    
    // or
    
    protected ?bool $hasErrorNotifications = false;

    // ...
}
```

Si desea ejecutar código personalizado para verificar si se deben mostrar notificaciones de error, puede usar el método `hasErrorNotifications()` en la clase de página:

```php
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    public function hasErrorNotifications(): bool
    {
        return FeatureFlag::active();
    }

    // ...
}
```

También puede registrar el texto de notificación de error llamando al método `registerErrorNotification()` en la clase de página desde dentro del método `setUpErrorNotifications()`:

```php
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected function setUpErrorNotifications(): void
    {
        $this->registerErrorNotification(
            title: 'An error occurred',
            body: 'Please try again later.',
        );
    }

    // ...
}
```

También puede registrar texto de notificación de error para un código de estado HTTP específico, como `404`, pasando ese código de estado en el parámetro `statusCode`:

```php
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected function setUpErrorNotifications(): void
    {
        $this->registerErrorNotification(
            title: 'An error occurred',
            body: 'Please try again later.',
        );
    
        $this->registerErrorNotification(
            title: 'Record not found',
            body: 'A record you are looking for does not exist.',
            statusCode: 404,
        );
    }

    // ...
}
```
