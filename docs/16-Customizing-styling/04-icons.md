---
title: Iconos
---

## Introducción

Los íconos se utilizan en toda la interfaz de usuario de Filament para comunicar visualmente partes centrales de la experiencia del usuario. Para representar iconos, utilizamos el paquete [Blade Icons](https://github.com/blade-ui-kit/blade-icons) de Blade UI Kit.

Tienen un sitio web donde puedes [buscar todos los íconos disponibles](https://blade-ui-kit.com/blade-icons?set=1#search) desde varios paquetes de Blade Icons. Cada paquete contiene un conjunto de iconos diferente entre los que puede elegir. Filament instala el ícono "Heroicons" configurado de forma predeterminada, por lo que si está utilizando íconos de este conjunto, no necesita instalar ningún paquete adicional.

## Usando Heroicons en Filamento

El filamento incluye el icono [Heroicons](https://heroicons.com) configurado de forma predeterminada. Puede utilizar cualquiera de los iconos de este conjunto en su aplicación Filament sin instalar ningún paquete adicional. La clase de enumeración `Heroicon` le permite aprovechar las funciones de autocompletado de su IDE para encontrar el ícono que desea usar:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Toggle;
use Filament\Support\Icons\Heroicon;

Action::make('star')
    ->icon(Heroicon::OutlinedStar)
    
Toggle::make('is_starred')
    ->onIcon(Heroicon::Star)
```

Cada ícono viene con una variante "delineada" y "sólida", y el nombre de la variante "delineada" tiene el prefijo `Outlined`. Por ejemplo, el ícono `Heroicon::Star` es la variante sólida, mientras que el ícono `Heroicon::OutlinedStar` es la variante delineada.

El conjunto Heroicons incluye múltiples tamaños (16px, 20px y 24px) de ícono sólido, y cuando se usa la clase de enumeración `Heroicon`, Filament usará automáticamente el tamaño correcto para el contexto en el que lo esté usando.

Si desea utilizar un icono en un [componente Blade](../componentes), puede pasarlo como atributo:

```blade
@php
    use Filament\Support\Icons\Heroicon;
@endphp

<x-filament::badge :icon="Heroicon::Star">
    Star
</x-filament::badge>
```

## Usando otros conjuntos de iconos en Filament

Una vez que hayas [encontrado un ícono](https://blade-ui-kit.com/blade-icons?set=1#search), hayas instalado el conjunto de íconos (si no es un Heroicon) que deseas usar en Filament, debes usar su nombre. Por ejemplo, si quisieras usar el ícono [`iconic-star`](https://blade-ui-kit.com/blade-icons/iconic-star), podrías pasarlo a un método de ícono de un componente PHP de esta manera:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Toggle;

Action::make('star')
    ->icon('iconic-star')
    
Toggle::make('is_starred')
    ->onIcon('iconic-check-circle')
```

Si desea utilizar un icono en un [componente Blade](../componentes), puede pasarlo como atributo:

```blade
<x-filament::badge icon="iconic-star">
    Star
</x-filament::badge>
```

## Usar SVG personalizados como íconos

El paquete [Blade Icons](https://github.com/blade-ui-kit/blade-icons) le permite registrar SVG personalizados como iconos. Esto es útil si desea utilizar sus propios íconos personalizados en Filament.

Para empezar, publique el archivo de configuración de Blade Icons:

```bash
php artisan vendor:publish --tag=blade-icons
```

Ahora, abra el archivo `config/blade-icons.php` y ​​descomente el conjunto `default` en la matriz `sets`.

Ahora que el conjunto predeterminado existe en el archivo de configuración, simplemente puede colocar los íconos que desee dentro del directorio `resources/svg` de su aplicación. Por ejemplo, si coloca un archivo SVG llamado `star.svg` dentro del directorio `resources/svg`, puede hacer referencia a él en cualquier lugar de Filament como `icon-star` (ver más abajo). El prefijo `icon-` también se puede configurar en el archivo `config/blade-icons.php`. También puede representar el ícono personalizado en una vista Blade usando la [directiva`@svg('icon-star')`](https://github.com/blade-ui-kit/blade-icons#directive).

```php
use Filament\Actions\Action;

Action::make('star')
    ->icon('icon-star')
```

## Reemplazo de los íconos predeterminados

Filament incluye un sistema de administración de íconos que le permite reemplazar cualquier ícono que se usa de forma predeterminada en la interfaz de usuario por el suyo propio. Esto sucede en el método `boot()` de cualquier proveedor de servicios, como `AppServiceProvider`, o incluso un proveedor de servicios dedicado a íconos. Si desea crear un complemento para reemplazar Heroicons con un conjunto diferente, puede hacerlo creando un paquete Laravel con un proveedor de servicios similar.

Para reemplazar un ícono, puede usar la fachada `FilamentIcon`. Tiene un método `register()`, que acepta una serie de iconos para reemplazar. La clave de la matriz es el [alias de ícono] único (#alias-de-icono-disponibles) que identifica el ícono en la interfaz de usuario de Filament, y el valor es el nombre de un ícono de Blade para reemplazarlo. Alternativamente, puede usar HTML en lugar del nombre de un ícono para representar un ícono desde una vista Blade, por ejemplo:

```php
use Filament\Support\Facades\FilamentIcon;
use Filament\View\PanelsIconAlias;

FilamentIcon::register([
    PanelsIconAlias::GLOBAL_SEARCH_FIELD => 'fas-magnifying-glass',
    PanelsIconAlias::SIDEBAR_GROUP_COLLAPSE_BUTTON => view('icons.chevron-up'),
]);
```

## Alias ​​de iconos disponibles

### Alias ​​del icono de acciones

Usando la clase `Filament\Actions\View\ActionsIconAlias`

- `ActionsIconAlias::ACTION_GROUP` - Botón de activación de un grupo de acciones
- `ActionsIconAlias::CREATE_ACTION_GROUPED` - Botón de activación de una acción de creación agrupada
- `ActionsIconAlias::DELETE_ACTION` - Botón desencadenante de una acción de eliminación
- `ActionsIconAlias::DELETE_ACTION_GROUPED` - Botón de activación de una acción de eliminación agrupada
- `ActionsIconAlias::DELETE_ACTION_MODAL` - Modal de una acción de eliminación
- `ActionsIconAlias::DETACH_ACTION` - Botón de activación de una acción de desconexión
- `ActionsIconAlias::DETACH_ACTION_MODAL` - Modal de una acción de desconexión
- `ActionsIconAlias::DISSOCIATE_ACTION` - Botón desencadenante de una acción de disociar
- `ActionsIconAlias::DISSOCIATE_ACTION_MODAL` - Modal de una acción disociada
- `ActionsIconAlias::EDIT_ACTION` - Botón desencadenante de una acción de edición
- `ActionsIconAlias::EDIT_ACTION_GROUPED` - Botón de activación de una acción de edición agrupada
- `ActionsIconAlias::EXPORT_ACTION_GROUPED` - Botón desencadenante de una acción de exportación agrupada
- `ActionsIconAlias::FORCE_DELETE_ACTION` - Botón de activación de una acción de eliminación forzada
- `ActionsIconAlias::FORCE_DELETE_ACTION_GROUPED` - Botón de activación de una acción de eliminación forzada agrupada
- `ActionsIconAlias::FORCE_DELETE_ACTION_MODAL` - Modal de una acción de eliminación forzada
- `ActionsIconAlias::IMPORT_ACTION_GROUPED` - Botón desencadenante de una acción de importación agrupada
- `ActionsIconAlias::MODAL_CONFIRMATION` - Modal de una acción que requiere confirmación
- `ActionsIconAlias::REPLICATE_ACTION` - Botón de activación de una acción replicada
- `ActionsIconAlias::REPLICATE_ACTION_GROUPED` - Botón de activación de una acción de replicación agrupada
- `ActionsIconAlias::RESTORE_ACTION` - Botón de activación de una acción de restauración
- `ActionsIconAlias::RESTORE_ACTION_GROUPED` - Botón de activación de una acción de restauración agrupada
- `ActionsIconAlias::RESTORE_ACTION_MODAL` - Modal de una acción de restauración
- `ActionsIconAlias::VIEW_ACTION` - Botón desencadenante de una acción de vista
- `ActionsIconAlias::VIEW_ACTION_GROUPED` - Botón desencadenante de una acción de vista agrupada

### Alias ​​de iconos de formularios

Usando la clase `Filament\Forms\View\FormsIconAlias`

- `FormsIconAlias::COMPONENTS_BUILDER_ACTIONS_CLONE` - Botón de activación de una acción de clonación en un elemento del constructor
- `FormsIconAlias::COMPONENTS_BUILDER_ACTIONS_COLLAPSE` - Botón de activación de una acción de colapso en un elemento del constructor
- `FormsIconAlias::COMPONENTS_BUILDER_ACTIONS_DELETE` - Botón de activación de una acción de eliminación en un elemento del constructor
- `FormsIconAlias::COMPONENTS_BUILDER_ACTIONS_EXPAND` - Botón de activación de una acción de expansión en un elemento del constructor
- `FormsIconAlias::COMPONENTS_BUILDER_ACTIONS_MOVE_DOWN` - Botón de activación de una acción de bajar en un elemento del constructor
- `FormsIconAlias::COMPONENTS_BUILDER_ACTIONS_MOVE_UP` - Botón de activación de una acción de ascenso en un elemento de construcción
- `FormsIconAlias::COMPONENTS_BUILDER_ACTIONS_REORDER` - Botón de activación de una acción de reorden en un elemento del constructor
- `FormsIconAlias::COMPONENTS_CHECKBOX_LIST_SEARCH_FIELD` - Buscar entrada en una lista de casillas de verificación
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_DRAG_CROP` - Botón activador de una acción de arrastre y recorte en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_DRAG_MOVE` - Botón de activación de una acción de movimiento de arrastre en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_FLIP_HORIZONTAL` - Botón de activación de una acción de giro horizontal en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_FLIP_VERTICAL` - Botón de activación de una acción de giro vertical en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_MOVE_DOWN` - Botón de activación de una acción de bajar en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_MOVE_LEFT` - Botón activador de una acción de mover hacia la izquierda en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_MOVE_RIGHT` - Botón de activación de una acción de mover hacia la derecha en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_MOVE_UP` - Botón de activación de una acción de subir en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_ROTATE_LEFT` - Botón de activación de una acción de girar hacia la izquierda en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_ROTATE_RIGHT` - Botón de activación de una acción de girar a la derecha en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_ZOOM_100` - Botón de activación de una acción de zoom 100 en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_ZOOM_IN` - Botón de activación de una acción de acercamiento en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_FILE_UPLOAD_EDITOR_ACTIONS_ZOOM_OUT` - Botón de activación de una acción de alejamiento en un editor de carga de archivos
- `FormsIconAlias::COMPONENTS_KEY_VALUE_ACTIONS_DELETE` - Botón desencadenante de una acción de eliminación en un elemento de campo clave-valor
- `FormsIconAlias::COMPONENTS_KEY_VALUE_ACTIONS_REORDER` - Botón de activación de una acción de reorden en un elemento de campo clave-valor
- `FormsIconAlias::COMPONENTS_REPEATER_ACTIONS_CLONE` - Botón desencadenante de una acción de clonación en un elemento repetidor
- `FormsIconAlias::COMPONENTS_REPEATER_ACTIONS_COLLAPSE` - Botón desencadenante de una acción de colapso en un elemento repetidor
- `FormsIconAlias::COMPONENTS_REPEATER_ACTIONS_DELETE` - Botón de activación de una acción de eliminación en un elemento repetidor
- `FormsIconAlias::COMPONENTS_REPEATER_ACTIONS_EXPAND` - Botón desencadenante de una acción de expansión en un elemento repetidor
- `FormsIconAlias::COMPONENTS_REPEATER_ACTIONS_MOVE_DOWN` - Botón de activación de una acción de bajar en un elemento repetidor
- `FormsIconAlias::COMPONENTS_REPEATER_ACTIONS_MOVE_UP` - Botón de activación de una acción de subir en un elemento repetidor
- `FormsIconAlias::COMPONENTS_REPEATER_ACTIONS_REORDER` - Botón de activación de una acción de reorden en un artículo repetidor
- `FormsIconAlias::COMPONENTS_RICH_EDITOR_PANELS_CUSTOM_BLOCKS_CLOSE_BUTTON` - Botón cerrar para panel de bloques personalizados en un editor enriquecido
- `FormsIconAlias::COMPONENTS_RICH_EDITOR_PANELS_CUSTOM_BLOCK_DELETE_BUTTON` - Botón Eliminar para un bloque personalizado en un editor enriquecido
- `FormsIconAlias::COMPONENTS_RICH_EDITOR_PANELS_CUSTOM_BLOCK_EDIT_BUTTON` - Botón Editar para un bloque personalizado en un editor enriquecido
- `FormsIconAlias::COMPONENTS_RICH_EDITOR_PANELS_MERGE_TAGS_CLOSE_BUTTON` - Botón Cerrar para el panel de etiquetas de combinación en un editor enriquecido
- `FormsIconAlias::COMPONENTS_SELECT_ACTIONS_CREATE_OPTION` - Botón desencadenante de una acción de creación de opción en un campo de selección
- `FormsIconAlias::COMPONENTS_SELECT_ACTIONS_EDIT_OPTION` - Botón de activación de una acción de opción de edición en un campo de selección
- `FormsIconAlias::COMPONENTS_TEXT_INPUT_ACTIONS_HIDE_PASSWORD` - Botón de activación de una acción de ocultar contraseña en un campo de entrada de texto
- `FormsIconAlias::COMPONENTS_TEXT_INPUT_ACTIONS_SHOW_PASSWORD` - Botón de activación de una acción de mostrar contraseña en un campo de entrada de texto
- `FormsIconAlias::COMPONENTS_TOGGLE_BUTTONS_BOOLEAN_FALSE` - Opción "Falso" de un campo de botones de alternancia `boolean()`
- `FormsIconAlias::COMPONENTS_TOGGLE_BUTTONS_BOOLEAN_TRUE` - Opción "Verdadera" de un campo de botones de alternancia `boolean()`

### Alias ​​de iconos de infolistas

Usando la clase `Filament\Infolists\View\InfolistsIconAlias`

- `InfolistsIconAlias::COMPONENTS_ICON_ENTRY_FALSE` - Estado falso de una entrada de icono
- `InfolistsIconAlias::COMPONENTS_ICON_ENTRY_TRUE` - Estado veraz de una entrada de icono

### Alias ​​del icono de notificaciones

Usando la clase `Filament\Notifications\View\NotificationsIconAlias`

- `NotificationsIconAlias::DATABASE_MODAL_EMPTY_STATE` - Estado vacío del modal de notificaciones de la base de datos
- `NotificationsIconAlias::NOTIFICATION_CLOSE_BUTTON` - Botón para cerrar una notificación
- `NotificationsIconAlias::NOTIFICATION_DANGER` - Notificación de peligro
- `NotificationsIconAlias::NOTIFICATION_INFO` - Notificación de información
- `NotificationsIconAlias::NOTIFICATION_SUCCESS` - Notificación de éxito
- `NotificationsIconAlias::NOTIFICATION_WARNING` - Notificación de advertencia

### Alias ​​de iconos de paneles

Usando la clase `Filament\View\PanelsIconAlias`

- `PanelsIconAlias::GLOBAL_SEARCH_FIELD` - Campo de búsqueda global
- `PanelsIconAlias::PAGES_DASHBOARD_ACTIONS_FILTER` - Botón de activación de la acción de filtro del panel
- `PanelsIconAlias::PAGES_DASHBOARD_NAVIGATION_ITEM` - Elemento de navegación de la página del panel de control
- `PanelsIconAlias::PAGES_PASSWORD_RESET_REQUEST_PASSWORD_RESET_ACTIONS_LOGIN` - Botón de activación de la acción de inicio de sesión en la página de solicitud de restablecimiento de contraseña
- `PanelsIconAlias::PAGES_PASSWORD_RESET_REQUEST_PASSWORD_RESET_ACTIONS_LOGIN_RTL` - Botón de activación de la acción de inicio de sesión en la página de solicitud de restablecimiento de contraseña (dirección de derecha a izquierda)
- `PanelsIconAlias::RESOURCES_PAGES_EDIT_RECORD_NAVIGATION_ITEM` - Elemento de navegación de la página de registro de edición de recursos
- `PanelsIconAlias::RESOURCES_PAGES_MANAGE_RELATED_RECORDS_NAVIGATION_ITEM` - Elemento de navegación de la página de registros relacionados de gestión de recursos
- `PanelsIconAlias::RESOURCES_PAGES_VIEW_RECORD_NAVIGATION_ITEM` - Elemento de navegación de la página de registro de vista de recursos
- `PanelsIconAlias::SIDEBAR_COLLAPSE_BUTTON` - Botón para contraer la barra lateral
- `PanelsIconAlias::SIDEBAR_COLLAPSE_BUTTON_RTL` - Botón para colapsar la barra lateral (dirección de derecha a izquierda)
- `PanelsIconAlias::SIDEBAR_EXPAND_BUTTON` - Botón para expandir la barra lateral
- `PanelsIconAlias::SIDEBAR_EXPAND_BUTTON_RTL` - Botón para expandir la barra lateral (dirección de derecha a izquierda)
- `PanelsIconAlias::SIDEBAR_GROUP_COLLAPSE_BUTTON` - Botón contraer para un grupo de la barra lateral
- `PanelsIconAlias::TENANT_MENU_BILLING_BUTTON` - Botón de facturación en el menú del inquilino
- `PanelsIconAlias::TENANT_MENU_PROFILE_BUTTON` - Botón de perfil en el menú del inquilino
- `PanelsIconAlias::TENANT_MENU_REGISTRATION_BUTTON` - Botón de registro en el menú del inquilino
- `PanelsIconAlias::TENANT_MENU_TOGGLE_BUTTON` - Botón para alternar el menú del inquilino
- `PanelsIconAlias::THEME_SWITCHER_LIGHT_BUTTON` - Botón para cambiar al tema claro desde el selector de temas
- `PanelsIconAlias::THEME_SWITCHER_DARK_BUTTON` - Botón para cambiar al tema oscuro desde el selector de temas
- `PanelsIconAlias::THEME_SWITCHER_SYSTEM_BUTTON` - Botón para cambiar al tema del sistema desde el selector de temas
- `PanelsIconAlias::TOPBAR_CLOSE_SIDEBAR_BUTTON` - Botón para cerrar la barra lateral
- `PanelsIconAlias::TOPBAR_OPEN_SIDEBAR_BUTTON` - Botón para abrir la barra lateral
- `PanelsIconAlias::TOPBAR_GROUP_TOGGLE_BUTTON` - Botón de alternancia para un grupo de la barra superior
- `PanelsIconAlias::TOPBAR_OPEN_DATABASE_NOTIFICATIONS_BUTTON` - Botón para abrir el modal de notificaciones de la base de datos
- `PanelsIconAlias::USER_MENU_PROFILE_ITEM` - Elemento de perfil en el menú de usuario
- `PanelsIconAlias::USER_MENU_LOGOUT_BUTTON` - Botón en el menú de usuario para cerrar sesión
- `PanelsIconAlias::WIDGETS_ACCOUNT_LOGOUT_BUTTON` - Botón en el widget de la cuenta para cerrar sesión
- `PanelsIconAlias::WIDGETS_FILAMENT_INFO_OPEN_DOCUMENTATION_BUTTON` - Botón para abrir la documentación desde el widget Información del filamento
- `PanelsIconAlias::WIDGETS_FILAMENT_INFO_OPEN_GITHUB_BUTTON` - Botón para abrir GitHub desde el widget de información de filamento

### Alias ​​de iconos de esquema

Usando la clase `Filament\Schemas\View\SchemaIconAlias`

- `SchemaIconAlias::COMPONENTS_WIZARD_COMPLETED_STEP` - Paso completado en un asistente

### Alias ​​de iconos de tablas

Usando la clase `Filament\Tables\View\TablesIconAlias`

- `TablesIconAlias::ACTIONS_DISABLE_REORDERING` - Botón de activación de la acción de desactivar reordenamiento
- `TablesIconAlias::ACTIONS_ENABLE_REORDERING` - Botón de activación de la acción de habilitar reordenamiento
- `TablesIconAlias::ACTIONS_FILTER` - Botón de activación de la acción de filtrado
- `TablesIconAlias::ACTIONS_GROUP` - Botón de activación de una acción de registros de grupo
- `TablesIconAlias::ACTIONS_OPEN_BULK_ACTIONS` - Botón de activación de una acción de acciones masivas abiertas
- `TablesIconAlias::ACTIONS_COLUMN_MANAGER` - Botón de activación de la acción del administrador de columnas
- `TablesIconAlias::COLUMNS_COLLAPSE_BUTTON` - Botón para colapsar una columna
- `TablesIconAlias::COLUMNS_ICON_COLUMN_FALSE` - Estado falso de una columna de icono
- `TablesIconAlias::COLUMNS_ICON_COLUMN_TRUE` - Estado veraz de una columna de iconos
- `TablesIconAlias::EMPTY_STATE` - Icono de estado vacío
- `TablesIconAlias::FILTERS_QUERY_BUILDER_CONSTRAINTS_BOOLEAN` - Icono predeterminado para una restricción booleana en el generador de consultas
- `TablesIconAlias::FILTERS_QUERY_BUILDER_CONSTRAINTS_DATE` - Icono predeterminado para una restricción de fecha en el generador de consultas
- `TablesIconAlias::FILTERS_QUERY_BUILDER_CONSTRAINTS_NUMBER` - Icono predeterminado para una restricción numérica en el generador de consultas
- `TablesIconAlias::FILTERS_QUERY_BUILDER_CONSTRAINTS_RELATIONSHIP` - Icono predeterminado para una restricción de relación en el generador de consultas
- `TablesIconAlias::FILTERS_QUERY_BUILDER_CONSTRAINTS_SELECT` - Icono predeterminado para una restricción de selección en el generador de consultas
- `TablesIconAlias::FILTERS_QUERY_BUILDER_CONSTRAINTS_TEXT` - Icono predeterminado para una restricción de texto en el generador de consultas
- `TablesIconAlias::FILTERS_REMOVE_ALL_BUTTON` - Botón para eliminar todos los filtros
- `TablesIconAlias::GROUPING_COLLAPSE_BUTTON` - Botón para colapsar un grupo de registros
- `TablesIconAlias::HEADER_CELL_SORT_ASC_BUTTON` - Botón ordenar de una columna ordenada en orden ascendente
- `TablesIconAlias::HEADER_CELL_SORT_BUTTON` - Botón ordenar de una columna cuando actualmente no está ordenada
- `TablesIconAlias::HEADER_CELL_SORT_DESC_BUTTON` - Botón ordenar de una columna ordenada en orden descendente
- `TablesIconAlias::REORDER_HANDLE` - Mango para agarrar para reordenar un registro con arrastrar y soltar
- `TablesIconAlias::SEARCH_FIELD` - Entrada de búsqueda

### Alias ​​de iconos de componentes de UI

Usando la clase `Filament\Support\View\SupportIconAlias`

- `SupportIconAlias::BADGE_DELETE_BUTTON` - Botón para eliminar una insignia
- `SupportIconAlias::BREADCRUMBS_SEPARATOR` - Separador entre pan rallado
- `SupportIconAlias::BREADCRUMBS_SEPARATOR_RTL` - Separador entre migas de pan (dirección de derecha a izquierda)
- `SupportIconAlias::MODAL_CLOSE_BUTTON` - Botón para cerrar un modal
- `SupportIconAlias::PAGINATION_FIRST_BUTTON` - Botón para ir a la primera página
- `SupportIconAlias::PAGINATION_FIRST_BUTTON_RTL` - Botón para ir a la primera página (dirección de derecha a izquierda)
- `SupportIconAlias::PAGINATION_LAST_BUTTON` - Botón para ir a la última página
- `SupportIconAlias::PAGINATION_LAST_BUTTON_RTL` - Botón para ir a la última página (dirección de derecha a izquierda)
- `SupportIconAlias::PAGINATION_NEXT_BUTTON` - Botón para ir a la página siguiente
- `SupportIconAlias::PAGINATION_NEXT_BUTTON_RTL` - Botón para pasar a la página siguiente (dirección de derecha a izquierda)
- `SupportIconAlias::PAGINATION_PREVIOUS_BUTTON` - Botón para ir a la página anterior
- `SupportIconAlias::PAGINATION_PREVIOUS_BUTTON_RTL` - Botón para ir a la página anterior (dirección de derecha a izquierda)
- `SupportIconAlias::SECTION_COLLAPSE_BUTTON` - Botón para colapsar una sección

### Alias ​​de iconos de widgets

Usando la clase `Filament\Widgets\View\WidgetsIconAlias`

- `WidgetsIconAlias::CHART_WIDGET_FILTER` - Botón de la acción de filtro
