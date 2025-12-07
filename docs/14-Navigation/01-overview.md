---
title: Descripción general
---

## Introducción

De forma predeterminada, Filament registrará elementos de navegación para cada uno de sus [recursos](../recursos), [páginas personalizadas](páginas personalizadas) y [clústeres](clústeres). Estas clases contienen propiedades y métodos estáticos que puede anular para configurar ese elemento de navegación.

Si desea agregar una segunda capa de navegación a su aplicación, puede usar [clústeres](clústeres). Son útiles para agrupar recursos y páginas.

## Personalizar la etiqueta de un elemento de navegación

De forma predeterminada, la etiqueta de navegación se genera a partir del nombre del recurso o de la página. Puede personalizar esto usando la propiedad `$navigationLabel`:

```php
protected static ?string $navigationLabel = 'Custom Navigation Label';
```

Alternativamente, puede anular el método `getNavigationLabel()`:

```php
public static function getNavigationLabel(): string
{
    return 'Custom Navigation Label';
}
```

## Personalizar el icono de un elemento de navegación

Para personalizar el [icono](../estilo/iconos) de un elemento de navegación, puede anular la propiedad `$navigationIcon` en la clase [recurso](recursos) o [página](páginas):

```php
use BackedEnum;

protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-document-text';
```


Si configura `$navigationIcon = null` en todos los elementos dentro del mismo grupo de navegación, esos elementos se unirán con una barra vertical debajo de la etiqueta del grupo.

### Cambiar el icono del elemento de navegación cuando está activo

Puede asignar un [icono] de navegación (../estilo/iconos) que solo se usará para elementos activos usando la propiedad `$activeNavigationIcon`:

```php
protected static ?string $activeNavigationIcon = 'heroicon-o-document-text';
```


## Ordenar elementos de navegación

De forma predeterminada, los elementos de navegación están ordenados alfabéticamente. Puede personalizar esto usando la propiedad `$navigationSort`:

```php
protected static ?int $navigationSort = 3;
```

Ahora, los elementos de navegación con un valor de clasificación más bajo aparecerán antes que aquellos con un valor de clasificación más alto: el orden es ascendente.


## Agregar una insignia a un elemento de navegación

Para agregar una insignia junto al elemento de navegación, puede usar el método `getNavigationBadge()` y ​​devolver el contenido de la insignia:

```php
public static function getNavigationBadge(): ?string
{
    return static::getModel()::count();
}
```


Si `getNavigationBadge()` devuelve un valor de insignia, se mostrará usando el color primario de forma predeterminada. Para diseñar la insignia contextualmente, devuelva `danger`, `gray`, `info`, `primary`, `success` o `warning` del método `getNavigationBadgeColor()`:

```php
public static function getNavigationBadgeColor(): ?string
{
    return static::getModel()::count() > 10 ? 'warning' : 'primary';
}
```


Se puede configurar una información sobre herramientas personalizada para la insignia de navegación en `$navigationBadgeTooltip`:

```php
protected static ?string $navigationBadgeTooltip = 'The number of users';
```

O se puede devolver desde `getNavigationBadgeTooltip()`:

```php
public static function getNavigationBadgeTooltip(): ?string
{
    return 'The number of users';
}
```


## Agrupar elementos de navegación

Puede agrupar elementos de navegación especificando una propiedad `$navigationGroup` en un [recurso](recursos) y [página personalizada](páginas personalizadas):

```php
use UnitEnum;

protected static string | UnitEnum | null $navigationGroup = 'Settings';
```


Todos los elementos del mismo grupo de navegación se mostrarán juntos bajo la misma etiqueta de grupo, en este caso "Configuración". Los elementos desagrupados permanecerán al inicio de la navegación.

### Agrupar elementos de navegación bajo otros elementos

Puede agrupar elementos de navegación como hijos de otros elementos, pasando la etiqueta del elemento principal como `$navigationParentItem`:

```php
use UnitEnum;

protected static ?string $navigationParentItem = 'Notifications';

protected static string | UnitEnum | null $navigationGroup = 'Settings';
```

También puede utilizar el método `getNavigationParentItem()` para establecer una etiqueta de elemento principal dinámica:

```php
public static function getNavigationParentItem(): ?string
{
    return __('filament/navigation.groups.settings.items.notifications');
}
```

Como se vio arriba, si el elemento principal tiene un grupo de navegación, ese grupo de navegación también debe definirse, para que se pueda identificar el elemento principal correcto.

:::tip
    Si está buscando un tercer nivel de navegación como este, debería considerar usar [clústeres](clústeres) en su lugar, que son una agrupación lógica de recursos y páginas personalizadas, que pueden compartir su propia navegación separada.
:::

### Personalización de grupos de navegación

Puede personalizar los grupos de navegación llamando a `navigationGroups()` en la [configuración](../panel-configuration) y pasando `NavigationGroup` objetos en orden:

```php
use Filament\Navigation\NavigationGroup;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->navigationGroups([
            NavigationGroup::make()
                 ->label('Shop')
                 ->icon('heroicon-o-shopping-cart'),
            NavigationGroup::make()
                ->label('Blog')
                ->icon('heroicon-o-pencil'),
            NavigationGroup::make()
                ->label(fn (): string => __('navigation.settings'))
                ->icon('heroicon-o-cog-6-tooth')
                ->collapsed(),
        ]);
}
```

En este ejemplo, pasamos un `icon()` personalizado para los grupos y creamos uno `collapsed()` de forma predeterminada.

#### Ordenar grupos de navegación

Al utilizar `navigationGroups()`, estás definiendo un nuevo orden para los grupos de navegación. Si solo desea reordenar los grupos y no definir un objeto `NavigationGroup` completo, puede simplemente pasar las etiquetas de los grupos en el nuevo orden:

```php
$panel
    ->navigationGroups([
        'Shop',
        'Blog',
        'Settings',
    ])
```

#### Hacer que los grupos de navegación no sean plegables

De forma predeterminada, los grupos de navegación son plegables.


Puede desactivar este comportamiento llamando a `collapsible(false)` en el objeto `NavigationGroup`:

```php
use Filament\Navigation\NavigationGroup;

NavigationGroup::make()
    ->label('Settings')
    ->icon('heroicon-o-cog-6-tooth')
    ->collapsible(false);
```


O puede hacerlo globalmente para todos los grupos en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->collapsibleNavigationGroups(false);
}
```

#### Agregar atributos HTML adicionales a los grupos de navegación

Puede pasar atributos HTML adicionales al grupo de navegación, que se fusionarán con el elemento DOM externo. Pase una matriz de atributos al método `extraSidebarAttributes()` o `extraTopbarAttributes()`, donde la clave es el nombre del atributo y el valor es el valor del atributo:

```php
NavigationGroup::make()
    ->extraSidebarAttributes(['class' => 'featured-sidebar-group']),
    ->extraTopbarAttributes(['class' => 'featured-topbar-group']),
```

El `extraSidebarAttributes()` se aplicará a los elementos del grupo de navegación contenidos en la barra lateral, y el `extraTopbarAttributes()` solo se aplicará a los menús desplegables del grupo de navegación de la barra superior cuando se use [navegación superior](#using-top-navigation).

### Registrar grupos de navegación con una enumeración

Puedes usar una clase enum para registrar grupos de navegación, lo que te permite controlar sus etiquetas, íconos y orden en un solo lugar, sin necesidad de registrarlos en la [configuración](../panel-configuration).

Para hacer esto, puede crear una clase de enumeración con casos para cada grupo:

```php
enum NavigationGroup
{
    case Shop;
    
    case Blog;
    
    case Settings;
}
```

Para ordenar que se definan los casos en se controlará el orden de los grupos de navegación.

Para utilizar un grupo de navegación de enumeración para un recurso o una página personalizada, puede establecer la propiedad `$navigationGroup` en el caso de enumeración:

```php
protected static string | UnitEnum | null $navigationGroup = NavigationGroup::Shop;
```

También puedes implementar la interfaz `HasLabel` en la clase enum, para definir una etiqueta personalizada para cada grupo:

```php
use Filament\Support\Contracts\HasLabel;

enum NavigationGroup implements HasLabel
{
    case Shop;
    
    case Blog;
    
    case Settings;

    public function getLabel(): string
    {
        return match ($this) {
            self::Shop => __('navigation-groups.shop'),
            self::Blog => __('navigation-groups.blog'),
            self::Settings => __('navigation-groups.settings'),
        };
    }
}
```

También puedes implementar la interfaz `HasIcon` en la clase enum, para definir un icono personalizado para cada grupo:

```php
use Filament\Support\Contracts\HasIcon;

enum NavigationGroup implements HasIcon
{
    case Shop;
    
    case Blog;
    
    case Settings;

    public function getIcon(): ?string
    {
        return match ($this) {
            self::Shop => 'heroicon-o-shopping-cart',
            self::Blog => 'heroicon-o-pencil',
            self::Settings => 'heroicon-o-cog-6-tooth',
        };
    }
}
```

## Barra lateral plegable en el escritorio

Para hacer que la barra lateral sea plegable tanto en computadoras de escritorio como en dispositivos móviles, puede usar la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->sidebarCollapsibleOnDesktop();
}
```


De forma predeterminada, cuando contraes la barra lateral en el escritorio, los íconos de navegación aún se muestran. Puedes contraer completamente la barra lateral usando el método `sidebarFullyCollapsibleOnDesktop()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->sidebarFullyCollapsibleOnDesktop();
}
```


### Grupos de navegación en una barra lateral plegable en el escritorio

:::info
    Esta sección solo se aplica a `sidebarCollapsibleOnDesktop()`, no a `sidebarFullyCollapsibleOnDesktop()`, ya que la interfaz de usuario completamente plegable simplemente oculta toda la barra lateral en lugar de cambiar su diseño.
:::

Cuando utilice una barra lateral plegable en el escritorio, a menudo también utilizará [grupos de navegación] (#grouping-navigation-items). De forma predeterminada, las etiquetas de cada grupo de navegación estarán ocultas cuando la barra lateral esté colapsada, ya que no hay espacio para mostrarlas. Incluso si el grupo de navegación en sí es [plegable] (#making-navigation-groups-not-collapsible), todos los elementos seguirán siendo visibles en la barra lateral contraída, ya que no hay ninguna etiqueta de grupo en la que hacer clic para expandir el grupo.

Estos problemas se pueden resolver, para lograr un diseño de barra lateral mínimo, [pasando un `icon()`](#customizing-navigation-groups) a los objetos del grupo de navegación. Cuando se define un ícono, el ícono se mostrará en la barra lateral contraída en lugar de los elementos en todo momento. Cuando se hace clic en el ícono, se abrirá un menú desplegable al costado del ícono, que revela los elementos del grupo.

Al pasar un ícono a un grupo de navegación, incluso si los elementos también tienen íconos, la interfaz de usuario de la barra lateral expandida no mostrará los íconos de los elementos. Esto es para mantener clara la jerarquía de navegación y el diseño mínimo. Sin embargo, los íconos de los elementos se mostrarán en los menús desplegables de la barra lateral contraída, ya que la jerarquía ya está clara por el hecho de que el menú desplegable está abierto.

## Registrar elementos de navegación personalizados

Para registrar nuevos elementos de navegación, puede utilizar la [configuración](../panel-configuration):

```php
use Filament\Navigation\NavigationItem;
use Filament\Pages\Dashboard;
use Filament\Panel;
use function Filament\Support\original_request;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->navigationItems([
            NavigationItem::make('Analytics')
                ->url('https://filament.pirsch.io', shouldOpenInNewTab: true)
                ->icon('heroicon-o-presentation-chart-line')
                ->group('Reports')
                ->sort(3),
            NavigationItem::make('dashboard')
                ->label(fn (): string => __('filament-panels::pages/dashboard.title'))
                ->url(fn (): string => Dashboard::getUrl())
                ->isActiveWhen(fn () => original_request()->routeIs('filament.admin.pages.dashboard')),
            // ...
        ]);
}
```

## Ocultar condicionalmente elementos de navegación

También puede ocultar condicionalmente un elemento de navegación utilizando los métodos `visible()` o `hidden()`, pasando una condición para verificar:

```php
use Filament\Navigation\NavigationItem;

NavigationItem::make('Analytics')
    ->visible(fn(): bool => auth()->user()->can('view-analytics'))
    // or
    ->hidden(fn(): bool => ! auth()->user()->can('view-analytics')),
```

## Deshabilitar elementos de navegación de páginas o recursos

Para evitar que aparezcan recursos o páginas en la navegación, puede utilizar:

```php
protected static bool $shouldRegisterNavigation = false;
```

O puede anular el método `shouldRegisterNavigation()`:

```php
public static function shouldRegisterNavigation(): bool
{
    return false;
}
```

Tenga en cuenta que estos métodos no controlan el acceso directo al recurso o página. Solo controlan si el recurso o la página aparecerá en la navegación. Si también desea controlar el acceso, debe utilizar [autorización de recursos](../recursos#autorización) o [autorización de página](páginas personalizadas#autorización).

## Usando la navegación superior

De forma predeterminada, Filament utilizará una barra de navegación lateral. En su lugar, puede utilizar una navegación superior utilizando [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->topNavigation();
}
```


## Personalizando el ancho de la barra lateral

Puedes personalizar el ancho de la barra lateral pasándola al método `sidebarWidth()` en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->sidebarWidth('40rem');
}
```

Además, si está utilizando el método `sidebarCollapsibleOnDesktop()`, puede personalizar el ancho de los iconos contraídos utilizando el método `collapsedSidebarWidth()` en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->sidebarCollapsibleOnDesktop()
        ->collapsedSidebarWidth('9rem');
}
```

## Personalización de navegación avanzada

El método `navigation()` se puede llamar desde la [configuración](../panel-configuration). Le permite crear una navegación personalizada que anula los elementos generados automáticamente por Filament. Esta API está diseñada para brindarle un control total sobre la navegación.

### Registro de elementos de navegación personalizados

Para registrar elementos de navegación, llame al método `items()`:

```php
use App\Filament\Pages\Settings;
use App\Filament\Resources\Users\UserResource;
use Filament\Navigation\NavigationBuilder;
use Filament\Navigation\NavigationItem;
use Filament\Pages\Dashboard;
use Filament\Panel;
use function Filament\Support\original_request;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->navigation(function (NavigationBuilder $builder): NavigationBuilder {
            return $builder->items([
                NavigationItem::make('Dashboard')
                    ->icon('heroicon-o-home')
                    ->isActiveWhen(fn (): bool => original_request()->routeIs('filament.admin.pages.dashboard'))
                    ->url(fn (): string => Dashboard::getUrl()),
                ...UserResource::getNavigationItems(),
                ...Settings::getNavigationItems(),
            ]);
        });
}
```


### Registro de grupos de navegación personalizados

Si desea registrar grupos, puede llamar al método `groups()`:

```php
use App\Filament\Pages\HomePageSettings;
use App\Filament\Resources\Categories\CategoryResource;
use App\Filament\Resources\Pages\PageResource;
use Filament\Navigation\NavigationBuilder;
use Filament\Navigation\NavigationGroup;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->navigation(function (NavigationBuilder $builder): NavigationBuilder {
            return $builder->groups([
                NavigationGroup::make('Website')
                    ->items([
                        ...PageResource::getNavigationItems(),
                        ...CategoryResource::getNavigationItems(),
                        ...HomePageSettings::getNavigationItems(),
                    ]),
            ]);
        });
}
```

### Desactivar la navegación

Puede deshabilitar la navegación por completo pasando `false` al método `navigation()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->navigation(false);
}
```


### Deshabilitar la barra superior

Puede desactivar la barra superior por completo pasando `false` al método `topbar()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->topbar(false);
}
```

### Reemplazo de los componentes Livewire de la barra lateral y superior

Puede reemplazar completamente los componentes Livewire que se utilizan para representar la barra lateral y la barra superior, pasando su propio nombre de clase de componente Livewire al método `sidebarLivewireComponent()` o `topbarLivewireComponent()`:

```php
use App\Livewire\Sidebar;
use App\Livewire\Topbar;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->sidebarLivewireComponent(Sidebar::class)
        ->topbarLivewireComponent(Topbar::class);
}
```

## Deshabilitar las rutas de navegación

El diseño predeterminado mostrará rutas de navegación para indicar la ubicación de la página actual dentro de la jerarquía de la aplicación.

Puede desactivar las rutas de navegación en su [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->breadcrumbs(false);
}
```

## Recargando la barra lateral y la barra superior

Una vez que se carga una página en el panel, la barra lateral y la barra superior no se recargan hasta que salga de la página o hasta que se haga clic en un elemento del menú para activar una acción. Puede recargar manualmente estos componentes para actualizarlos enviando un evento de navegador `refresh-sidebar` o `refresh-topbar`.

Para enviar un evento desde PHP, puede llamar al método `$this->dispatch()` desde cualquier componente Livewire, como una clase de página, una clase de administrador de relaciones o una clase de widget:

```php
$this->dispatch('refresh-sidebar');
```

Cuando su código no se encuentra dentro de un componente Livewire, como cuando tiene una clase de acción personalizada, puede inyectar el argumento `$livewire` en una función de cierre y llamar a `dispatch()` en eso:

```php
use Filament\Actions\Action;
use Livewire\Component;

Action::make('create')
    ->action(function (Component $livewire) {
        // ...
    
        $livewire->dispatch('refresh-sidebar');
    })
```

Alternativamente, puede enviar un evento desde JavaScript usando el método auxiliar `$dispatch()` Alpine.js o el método `window.dispatchEvent()` del navegador nativo:

```html
<button x-on:click="$dispatch('refresh-sidebar')" type="button">
    Refresh Sidebar
</button>
```

```javascript
window.dispatchEvent(new CustomEvent('refresh-sidebar'));
```
