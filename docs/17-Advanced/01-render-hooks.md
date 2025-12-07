---
title: Ganchos de renderizado
---

## Introducción

Filament le permite representar contenido de Blade en varios puntos de las vistas de los marcos. Es útil que los complementos puedan inyectar HTML en el marco. Además, dado que Filament no recomienda publicar las vistas debido a un mayor riesgo de cambios importantes, también es útil para los usuarios.

## Registrar ganchos de renderizado

Para registrar ganchos de renderizado, puede llamar a `FilamentView::registerRenderHook()` desde un proveedor de servicios o middleware. El primer argumento es el nombre del gancho de renderizado y el segundo argumento es una devolución de llamada que devuelve el contenido que se va a renderizar:

```php
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;

FilamentView::registerRenderHook(
    PanelsRenderHook::BODY_START,
    fn (): string => Blade::render('@livewire(\'livewire-ui-modal\')'),
);
```

También puedes renderizar el contenido de la vista desde un archivo:

```php
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Illuminate\Contracts\View\View;

FilamentView::registerRenderHook(
    PanelsRenderHook::BODY_START,
    fn (): View => view('impersonation-banner'),
);
```

## Ganchos de renderizado disponibles

### Ganchos de renderizado del Panel Builder

```php
use Filament\View\PanelsRenderHook;
```

- `PanelsRenderHook::AUTH_LOGIN_FORM_AFTER` - Después del formulario de inicio de sesión
- `PanelsRenderHook::AUTH_LOGIN_FORM_BEFORE` - Antes del formulario de inicio de sesión
- `PanelsRenderHook::AUTH_PASSWORD_RESET_REQUEST_FORM_AFTER` - Después del formulario de solicitud de restablecimiento de contraseña
- `PanelsRenderHook::AUTH_PASSWORD_RESET_REQUEST_FORM_BEFORE` - Antes del formulario de solicitud de restablecimiento de contraseña
- `PanelsRenderHook::AUTH_PASSWORD_RESET_RESET_FORM_AFTER` - Después del formulario de restablecimiento de contraseña
- `PanelsRenderHook::AUTH_PASSWORD_RESET_RESET_FORM_BEFORE` - Antes del formulario de restablecimiento de contraseña
- `PanelsRenderHook::AUTH_REGISTER_FORM_AFTER` - Después del formulario de registro
- `PanelsRenderHook::AUTH_REGISTER_FORM_BEFORE` - Antes del formulario de registro
- `PanelsRenderHook::BODY_END` - Antes de `</body>`
- `PanelsRenderHook::BODY_START` - Después de `<body>`
- `PanelsRenderHook::CONTENT_AFTER` - Después del contenido de la página
- `PanelsRenderHook::CONTENT_BEFORE` - Antes del contenido de la página
- `PanelsRenderHook::CONTENT_END` - Después del contenido de la página, dentro de `<main>`
- `PanelsRenderHook::CONTENT_START` - Antes del contenido de la página, dentro de `<main>`
- `PanelsRenderHook::FOOTER` - Pie de página
- `PanelsRenderHook::GLOBAL_SEARCH_AFTER` - Después del contenedor [búsqueda global](../panels/resources/global-search), dentro de la barra superior
- `PanelsRenderHook::GLOBAL_SEARCH_BEFORE` - Antes del contenedor [búsqueda global](../panels/resources/global-search), dentro de la barra superior
- `PanelsRenderHook::GLOBAL_SEARCH_END` - El final del contenedor [búsqueda global](../panels/resources/global-search)
- `PanelsRenderHook::GLOBAL_SEARCH_START` - El inicio del contenedor [búsqueda global](../panels/resources/global-search)
- `PanelsRenderHook::HEAD_END` - Antes de `</head>`
- `PanelsRenderHook::HEAD_START` - Después de `<head>`
- `PanelsRenderHook::LAYOUT_END` - Fin del contenedor de diseño, también [puede tener alcance](#scoping-render-hooks) a la clase de página
- `PanelsRenderHook::LAYOUT_START` - Inicio del contenedor de diseño, también [puede tener alcance](#scoping-render-hooks) a la clase de página
- `PanelsRenderHook::PAGE_END` - Fin del contenedor de contenido de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_FOOTER_WIDGETS_AFTER` - Después de los widgets del pie de página, también [se puede limitar](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_FOOTER_WIDGETS_BEFORE` - Antes de los widgets de pie de página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_FOOTER_WIDGETS_END` - Widgets de fin de pie de página, también [pueden tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_FOOTER_WIDGETS_START` - Inicio de los widgets del pie de página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_HEADER_ACTIONS_AFTER` - Después de las acciones del encabezado de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_HEADER_ACTIONS_BEFORE` - Antes de las acciones del encabezado de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_HEADER_WIDGETS_AFTER` - Después de los widgets del encabezado de la página, también [se puede limitar el alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_HEADER_WIDGETS_BEFORE` - Antes de los widgets de encabezado de página, también [se puede limitar el alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_HEADER_WIDGETS_END` - Fin de los widgets del encabezado de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_HEADER_WIDGETS_START` - Inicio de los widgets del encabezado de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_START` - Inicio del contenedor de contenido de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_END_AFTER` - Después de la posición de la barra lateral "final" de la subnavegación de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_END_BEFORE` - Antes de la posición de la barra lateral "final" de la subnavegación de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_SELECT_AFTER` - Después de seleccionar la subnavegación de la página (para dispositivos móviles), también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_SELECT_BEFORE` - Antes de seleccionar la subnavegación de la página (para dispositivos móviles), también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_SIDEBAR_AFTER` - Después de la barra lateral de subnavegación de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_SIDEBAR_BEFORE` - Antes de la barra lateral de subnavegación de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_START_AFTER` - Después de la posición de la barra lateral de "inicio" de la subnavegación de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_START_BEFORE` - Antes de la posición de la barra lateral de "inicio" de la subnavegación de la página, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_TOP_AFTER` - Después de la posición de las pestañas "superiores" de la subnavegación de la página, también [se puede delimitar](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::PAGE_SUB_NAVIGATION_TOP_BEFORE` - Antes de la posición de las pestañas "superiores" de subnavegación de la página, también [se puede delimitar](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::RESOURCE_PAGES_LIST_RECORDS_TABLE_AFTER` - Después de la tabla de recursos, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::RESOURCE_PAGES_LIST_RECORDS_TABLE_BEFORE` - Antes de la tabla de recursos, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::RESOURCE_PAGES_LIST_RECORDS_TABS_END` - El final de las pestañas de filtro (después de la última pestaña), también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::RESOURCE_PAGES_LIST_RECORDS_TABS_START` - El inicio de las pestañas de filtro (antes de la primera pestaña), también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::RESOURCE_PAGES_MANAGE_RELATED_RECORDS_TABLE_AFTER` - Después de la tabla del administrador de relaciones, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::RESOURCE_PAGES_MANAGE_RELATED_RECORDS_TABLE_BEFORE` - Antes de la tabla del administrador de relaciones, también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::RESOURCE_RELATION_MANAGER_AFTER` - Después de la tabla del administrador de relaciones, también [puede tener alcance](#scoping-render-hooks) a la página o clase del administrador de relaciones
- `PanelsRenderHook::RESOURCE_RELATION_MANAGER_BEFORE` - Antes de la tabla del administrador de relaciones, también [puede tener alcance](#scoping-render-hooks) a la página o clase del administrador de relaciones
- `PanelsRenderHook::RESOURCE_TABS_END` - El final de las pestañas de recursos (después de la última pestaña), también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::RESOURCE_TABS_START` - El inicio de las pestañas de recursos (antes de la primera pestaña), también [puede tener alcance](#scoping-render-hooks) a la página o clase de recurso
- `PanelsRenderHook::SCRIPTS_AFTER` - Después de definir los scripts
- `PanelsRenderHook::SCRIPTS_BEFORE` - Antes de definir los scripts
- `PanelsRenderHook::SIDEBAR_LOGO_AFTER` - Después del logo en la barra lateral
- `PanelsRenderHook::SIDEBAR_LOGO_BEFORE` - Antes del logo en la barra lateral
- `PanelsRenderHook::SIDEBAR_NAV_END` - En la [barra lateral](../paneles/navegación), antes de `</nav>`
- `PanelsRenderHook::SIDEBAR_NAV_START` - En la [barra lateral](../paneles/navegación), después de `<nav>`
- `PanelsRenderHook::SIMPLE_LAYOUT_END` - Fin del contenedor de diseño simple, también [puede tener alcance](#scoping-render-hooks) a la clase de página
- `PanelsRenderHook::SIMPLE_LAYOUT_START` - Inicio del contenedor de diseño simple, también [puede tener alcance](#scoping-render-hooks) a la clase de página
- `PanelsRenderHook::SIMPLE_PAGE_END` - Fin del contenedor de contenido de página simple, también [puede tener alcance](#scoping-render-hooks) a la clase de página
- `PanelsRenderHook::SIMPLE_PAGE_START` - Inicio del contenedor de contenido de página simple, también [puede tener alcance](#scoping-render-hooks) a la clase de página
- `PanelsRenderHook::SIDEBAR_FOOTER` - Fijado en la parte inferior de la barra lateral, debajo del contenido
- `PanelsRenderHook::STYLES_AFTER` - Después de definir los estilos
- `PanelsRenderHook::STYLES_BEFORE` - Antes de definir los estilos
- `PanelsRenderHook::TENANT_MENU_AFTER` - Después del [menú de inquilino](../users/tenancy#customizing-the-tenant-menu)
- `PanelsRenderHook::TENANT_MENU_BEFORE` - Antes del [menú de inquilino](../users/tenancy#customizing-the-tenant-menu)
- `PanelsRenderHook::TOPBAR_AFTER` - Debajo de la barra superior
- `PanelsRenderHook::TOPBAR_BEFORE` - Encima de la barra superior
- `PanelsRenderHook::TOPBAR_END` - Fin del contenedor de la barra superior
- `PanelsRenderHook::TOPBAR_LOGO_AFTER` - Después del logo en la barra superior
- `PanelsRenderHook::TOPBAR_LOGO_BEFORE` - Antes del logo en la barra superior
- `PanelsRenderHook::TOPBAR_START` - Inicio del contenedor de la barra superior
- `PanelsRenderHook::USER_MENU_AFTER` - Después del [menú de usuario](../navegación/menú-usuario)
- `PanelsRenderHook::USER_MENU_BEFORE` - Antes del [menú de usuario](../navegación/menú-usuario)
- `PanelsRenderHook::USER_MENU_PROFILE_AFTER` - Después del elemento de perfil en el [menú de usuario](../navigation/user-menu)
- `PanelsRenderHook::USER_MENU_PROFILE_BEFORE` - Antes del elemento de perfil en el [menú de usuario](../navigación/menú-usuario)


### Ganchos de renderizado de Table Builder

Todos estos ganchos de renderizado [pueden tener alcance] (#scoping-render-hooks) a cualquier clase de componente Livewire de tabla. Cuando se utiliza el Generador de paneles, estas clases pueden ser la página Listar o Administrar de un recurso, o un administrador de relaciones. Los widgets de tabla también son clases de componentes Livewire.

```php
use Filament\Tables\View\TablesRenderHook;
```

- `TablesRenderHook::FILTER_INDICATORS` - Reemplaza los indicadores de filtro existentes, recibe datos `filterIndicators` como `array<Filament\Tables\Filters\Indicator>`
- `TablesRenderHook::SELECTION_INDICATOR_ACTIONS_AFTER` - Después de los botones de acción "seleccionar todo" y "deseleccionar todo" en la barra indicadora de selección
- `TablesRenderHook::SELECTION_INDICATOR_ACTIONS_BEFORE` - Antes de los botones de acción "seleccionar todo" y "deseleccionar todo" en la barra indicadora de selección
- `TablesRenderHook::HEADER_AFTER` - Después del contenedor del encabezado
- `TablesRenderHook::HEADER_BEFORE` - Antes del contenedor de encabezado
- `TablesRenderHook::TOOLBAR_AFTER` - Después del contenedor de la barra de herramientas
- `TablesRenderHook::TOOLBAR_BEFORE` - Antes del contenedor de la barra de herramientas
- `TablesRenderHook::TOOLBAR_END` - El final de la barra de herramientas
- `TablesRenderHook::TOOLBAR_GROUPING_SELECTOR_AFTER` - Después del selector [agrupación](../tablas/agrupación)
- `TablesRenderHook::TOOLBAR_GROUPING_SELECTOR_BEFORE` - Antes del selector [agrupación](../tablas/agrupación)
- `TablesRenderHook::TOOLBAR_REORDER_TRIGGER_AFTER` - Después del activador [reordenar](../tables/overview#reordering-records)
- `TablesRenderHook::TOOLBAR_REORDER_TRIGGER_BEFORE` - Antes del activador [reordering](../tables/overview#reordering-records)
- `TablesRenderHook::TOOLBAR_SEARCH_AFTER` - Después del contenedor [búsqueda](../tables/overview#making-columns-sortable-and-searchable)
- `TablesRenderHook::TOOLBAR_SEARCH_BEFORE` - Antes del contenedor [búsqueda](../tables/overview#making-columns-sortable-and-searchable)
- `TablesRenderHook::TOOLBAR_START` - El inicio de la barra de herramientas
- `TablesRenderHook::TOOLBAR_COLUMN_MANAGER_TRIGGER_AFTER` - Después del activador [administrador de columnas](../tables/columns/getting-started#toggling-column-visibility)
- `TablesRenderHook::TOOLBAR_COLUMN_MANAGER_TRIGGER_BEFORE` - Antes del activador [administrador de columnas](../tables/columns/getting-started#toggling-column-visibility)


### Los widgets representan ganchos

```php
use Filament\Widgets\View\WidgetsRenderHook;
```

- `WidgetsRenderHook::TABLE_WIDGET_END` - Fin del [widget de tabla](../widgets/overview#table-widgets), después de la tabla misma, también [se puede delimitar](#scoping-render-hooks) a la clase de widget de tabla
- `WidgetsRenderHook::TABLE_WIDGET_START` - Inicio del [widget de tabla](../widgets/overview#table-widgets), antes de la tabla en sí, también [se puede delimitar](#scoping-render-hooks) a la clase de widget de tabla


## Ganchos de renderizado de alcance

A algunos ganchos de renderizado se les puede dar un "alcance", lo que les permite generarse solo en una página específica o componente Livewire. Por ejemplo, es posible que desees registrar un gancho de renderizado para solo 1 página. Para hacer eso, puedes pasar la clase de la página o componente como segundo argumento a `registerRenderHook()`:

```php
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;

FilamentView::registerRenderHook(
    PanelsRenderHook::PAGE_START,
    fn (): View => view('warning-banner'),
    scopes: \App\Filament\Resources\Users\Pages\EditUser::class,
);
```

También puede pasar una serie de ámbitos para registrar el gancho de renderizado para:

```php
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;

FilamentView::registerRenderHook(
    PanelsRenderHook::PAGE_START,
    fn (): View => view('warning-banner'),
    scopes: [
        \App\Filament\Resources\Users\Pages\CreateUser::class,
        \App\Filament\Resources\Users\Pages\EditUser::class,
    ],
);
```

Algunos ganchos de renderizado para el [Panel Builder](#panel-builder-render-hooks) le permiten limitar el alcance de los ganchos a todas las páginas de un recurso:

```php
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;

FilamentView::registerRenderHook(
    PanelsRenderHook::PAGE_START,
    fn (): View => view('warning-banner'),
    scopes: \App\Filament\Resources\Users\UserResource::class,
);
```

### Recuperando los ámbitos actualmente activos dentro del gancho de renderizado

Los `$scopes` se pasan a la función de gancho de renderizado y puedes usarlos para determinar en qué página o componente se está renderizando el gancho de renderizado:

```php
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;

FilamentView::registerRenderHook(
    PanelsRenderHook::PAGE_START,
    fn (array $scopes): View => view('warning-banner', ['scopes' => $scopes]),
    scopes: \App\Filament\Resources\Users\UserResource::class,
);
```

## Pasar datos para renderizar ganchos

Los ganchos de procesamiento pueden recibir "datos" desde el momento en que se procesa el gancho. Para acceder a datos desde un gancho de renderizado, puede inyectarlos usando un parámetro `array $data` en la función de renderizado del gancho:

```php
use Filament\Support\Facades\FilamentView;
use Filament\Tables\View\TablesRenderHook;

FilamentView::registerRenderHook(
    TablesRenderHook::FILTER_INDICATORS,
    fn (array $data): View => view('filter-indicators', ['indicators' => $data['filterIndicators']]),
);
```

## Ganchos de renderizado

A los desarrolladores de complementos les puede resultar útil exponer los ganchos de renderizado a sus usuarios. No es necesario registrarlos en ningún lugar, simplemente envíelos a Blade de esta manera:

```blade
{{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::PAGE_START) }}
```

Para proporcionar [alcance](#scoping-render-hooks) su gancho de renderizado, puede pasarlo como segundo argumento a `renderHook()`. Por ejemplo, si su gancho está dentro de un componente Livewire, puede pasar la clase del componente usando `static::class`:

```blade
{{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::PAGE_START, scopes: $this->getRenderHookScopes()) }}
```

Incluso puedes pasar múltiples ámbitos como una matriz, y se representarán todos los ganchos de renderizado que coincidan con cualquiera de los ámbitos:

```blade
{{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::PAGE_START, scopes: [static::class, \App\Filament\Resources\Users\UserResource::class]) }}
```

Puede pasar [datos](#passing-data-to-render-hooks) a un gancho de renderizado usando un argumento `data` para la función `renderHook()`:

```blade
{{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\Tables\View\TablesRenderHook::FILTER_INDICATORS, data: ['filterIndicators' => $filterIndicators]) }}
```
