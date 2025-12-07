---
title: Páginas personalizadas
---

## Introducción

Filament te permite crear páginas completamente personalizadas para la aplicación.

## Creando una página

Para crear una nueva página, puede utilizar:

```bash
php artisan make:filament-page Settings
```

Este comando creará dos archivos: una clase de página en el directorio `/Pages` del directorio Filament y una vista en el directorio `/pages` del directorio de vistas Filament.

Las clases de página son todas componentes de página completa [Livewire](https://livewire.laravel.com) con algunas utilidades adicionales que puede usar con el panel.

## Autorización

Puede evitar que aparezcan páginas en el menú anulando el método `canAccess()` en su clase de página. Esto es útil si desea controlar qué usuarios pueden ver la página en la navegación y también qué usuarios pueden visitar la página directamente:

```php
public static function canAccess(): bool
{
    return auth()->user()->canManageSettings();
}
```

## Agregar acciones a las páginas

Las acciones son botones que pueden realizar tareas en la página o visitar una URL. Puedes leer más sobre sus capacidades [aquí](../acciones).

Dado que todas las páginas son componentes de Livewire, puede [agregar acciones](../components/action#adding-the-action) en cualquier lugar. Las páginas ya tienen el rasgo `InteractsWithActions`, la interfaz `HasActions` y ​​el componente Blade `<x-filament-actions::modals />`, todos configurados para usted.

### Acciones de encabezado

También puede agregar fácilmente acciones al encabezado de cualquier página, incluidas [páginas de recursos](recursos). No necesita preocuparse por agregar nada a la plantilla Blade, nosotros nos encargamos de eso por usted. Simplemente devuelva sus acciones desde el método `getHeaderActions()` de la clase de página:

```php
use Filament\Actions\Action;

protected function getHeaderActions(): array
{
    return [
        Action::make('edit')
            ->url(route('posts.edit', ['post' => $this->post])),
        Action::make('delete')
            ->requiresConfirmation()
            ->action(fn () => $this->post->delete()),
    ];
}
```

### Abrir un modal de acción cuando se carga una página

También puede abrir una acción cuando se carga una página configurando la propiedad `$defaultAction` con el nombre de la acción que desea abrir:

```php
use Filament\Actions\Action;

public $defaultAction = 'onboarding';

public function onboardingAction(): Action
{
    return Action::make('onboarding')
        ->modalHeading('Welcome')
        ->visible(fn (): bool => ! auth()->user()->isOnBoarded());
}
```

También puedes pasar una serie de argumentos a la acción predeterminada usando la propiedad `$defaultActionArguments`:

```php
public $defaultActionArguments = ['step' => 2];
```

Alternativamente, puede abrir un modo de acción cuando se carga una página especificando `action` como parámetro de cadena de consulta para la página:

```
/admin/products/edit/932510?action=onboarding
```

### Actualizando datos del formulario

Si está utilizando acciones en una página de recursos [Editar](recursos/edición de registros) o [Ver](recursos/visualización de registros), puede actualizar los datos dentro del formulario principal usando el método `refreshFormData()`:

```php
use App\Models\Post;
use Filament\Actions\Action;

Action::make('approve')
    ->action(function (Post $record) {
        $record->approve();

        $this->refreshFormData([
            'status',
        ]);
    })
```

Este método acepta una serie de atributos del modelo que desea actualizar en el formulario.

## Agregar widgets a las páginas

Filament le permite mostrar [widgets](panel de control) dentro de las páginas, debajo del encabezado y encima del pie de página.

Para agregar un widget a una página, use los métodos `getHeaderWidgets()` o `getFooterWidgets()`:

```php
use App\Filament\Widgets\StatsOverviewWidget;

protected function getHeaderWidgets(): array
{
    return [
        StatsOverviewWidget::class
    ];
}
```

`getHeaderWidgets()` devuelve una serie de widgets para mostrar encima del contenido de la página, mientras que `getFooterWidgets()` se muestran debajo.

Si desea aprender cómo crear y personalizar widgets, consulte la sección de documentación [Panel de control](panel de control).

### Personalizando la grilla de widgets

Puede cambiar cuántas columnas de la cuadrícula se utilizan para mostrar los widgets.

Puede anular los métodos `getHeaderWidgetsColumns()` o `getFooterWidgetsColumns()` para devolver una cantidad de columnas de cuadrícula para usar:

```php
public function getHeaderWidgetsColumns(): int | array
{
    return 3;
}
```

#### Cuadrícula de widgets responsivos

Es posible que desee cambiar la cantidad de columnas de la cuadrícula del widget según el [punto de interrupción] de respuesta (https://tailwindcss.com/docs/responsive-design#overview) del navegador. Puede hacer esto usando una matriz que contenga la cantidad de columnas que deben usarse en cada punto de interrupción:

```php
public function getHeaderWidgetsColumns(): int | array
{
    return [
        'md' => 4,
        'xl' => 5,
    ];
}
```

Esto combina bien con [anchos de widget responsivos] (panel de control#anchos-widget-responsivos).

#### Pasar datos a widgets desde la página

Puede pasar datos a widgets desde la página usando el método `getWidgetData()`:

```php
public function getWidgetData(): array
{
    return [
        'stats' => [
            'total' => 100,
        ],
    ];
}
```

Ahora, puede definir una propiedad de matriz pública `$stats` correspondiente en la clase de widget, que se completará automáticamente:

```php
public $stats = [];
```

### Pasar propiedades a widgets en páginas

Al registrar un widget en una página, puede usar el método `make()` para pasarle una matriz de [propiedades de Livewire](https://livewire.laravel.com/docs/properties):

```php
use App\Filament\Widgets\StatsOverviewWidget;

protected function getHeaderWidgets(): array
{
    return [
        StatsOverviewWidget::make([
            'status' => 'active',
        ]),
    ];
}
```

Este conjunto de propiedades se asigna a [propiedades públicas de Livewire](https://livewire.laravel.com/docs/properties) en la clase de widget:

```php
use Filament\Widgets\Widget;

class StatsOverviewWidget extends Widget
{
    public string $status;

    // ...
}
```

Ahora, puede acceder a `status` en la clase de widget usando `$this->status`.

## Personalizando el título de la página

De forma predeterminada, Filament generará automáticamente un título para su página según su nombre. Puede anular esto definiendo una propiedad `$title` en su clase de página:

```php
protected static ?string $title = 'Custom Page Title';
```

Alternativamente, puedes devolver una cadena del método `getTitle()`:

```php
use Illuminate\Contracts\Support\Htmlable;

public function getTitle(): string | Htmlable
{
    return __('Custom Page Title');
}
```

## Personalización de la etiqueta de navegación de la página

De forma predeterminada, Filament utilizará el [título] de la página (#personalizando-el-título-de-la-página) como etiqueta de elemento de [navegación](navegación). Puede anular esto definiendo una propiedad `$navigationLabel` en su clase de página:

```php
protected static ?string $navigationLabel = 'Custom Navigation Label';
```

Alternativamente, puedes devolver una cadena del método `getNavigationLabel()`:

```php
public static function getNavigationLabel(): string
{
    return __('Custom Navigation Label');
}
```

## Personalizando la URL de la página

De forma predeterminada, Filament generará automáticamente una URL (slug) para su página en función de su nombre. Puede anular esto definiendo una propiedad `$slug` en su clase de página:

```php
protected static ?string $slug = 'custom-url-slug';
```

## Personalizando el encabezado de la página

De forma predeterminada, Filament utilizará el [título] de la página (#personalizando-el-título-de-la-página) como encabezado. Puede anular esto definiendo una propiedad `$heading` en su clase de página:

```php
protected ?string $heading = 'Custom Page Heading';
```

Alternativamente, puedes devolver una cadena del método `getHeading()`:

```php
public function getHeading(): string
{
    return __('Custom Page Heading');
}
```

### Agregar un subtítulo de página

También puede agregar un subtítulo a su página definiendo una propiedad `$subheading` en su clase de página:

```php
protected ?string $subheading = 'Custom Page Subheading';
```

Alternativamente, puedes devolver una cadena del método `getSubheading()`:

```php
public function getSubheading(): ?string
{
    return __('Custom Page Subheading');
}
```

## Reemplazar el encabezado de la página con una vista personalizada

Puede reemplazar el [encabezado](#customizing-the-page-heading), el [subheading](#adding-a-page-subheading) y las [acciones](#header-actions) predeterminados con una vista de encabezado personalizada para cualquier página. Puedes devolverlo desde el método `getHeader()`:

```php
use Illuminate\Contracts\View\View;

public function getHeader(): ?View
{
    return view('filament.settings.custom-header');
}
```

Este ejemplo supone que tiene una vista Blade en `resources/views/filament/settings/custom-header.blade.php`.

## Representación de una vista personalizada en el pie de página de la página

También puedes agregar un pie de página a cualquier página, debajo de su contenido. Puedes devolverlo desde el método `getFooter()`:

```php
use Illuminate\Contracts\View\View;

public function getFooter(): ?View
{
    return view('filament.settings.custom-footer');
}
```

Este ejemplo supone que tiene una vista Blade en `resources/views/filament/settings/custom-footer.blade.php`.

## Personalizando el ancho máximo del contenido

De forma predeterminada, Filament restringirá el ancho del contenido de la página, para que no sea demasiado ancho en pantallas grandes. Para cambiar esto, puede anular el método `getMaxContentWidth()`. Las opciones corresponden a [escala de ancho máximo de Tailwind] (https://tailwindcss.com/docs/max-width). Las opciones son `ExtraSmall`, `Small`, `Medium`, `Large`, `ExtraLarge`, `TwoExtraLarge`, `ThreeExtraLarge`, `FourExtraLarge`, `FiveExtraLarge`, `SixExtraLarge`, `SevenExtraLarge`, `Full`, `MinContent`, `MaxContent`, `FitContent`, `Prose`, `ScreenSmall`, `ScreenMedium`, `ScreenLarge`, `ScreenExtraLarge` y `ScreenTwoExtraLarge`. El valor predeterminado es `SevenExtraLarge`:

```php
use Filament\Support\Enums\Width;

public function getMaxContentWidth(): Width
{
    return Width::Full;
}
```

## Generando URL a páginas

Filament proporciona `getUrl()` método estático en clases de páginas para generarles URL. Tradicionalmente, necesitarías construir la URL a mano o usando el asistente `route()` de Laravel, pero estos métodos dependen del conocimiento de las convenciones de nomenclatura de rutas o slugs de la página.

El método `getUrl()`, sin ningún argumento, generará una URL:

```php
use App\Filament\Pages\Settings;

Settings::getUrl(); // /admin/settings
```

Si su página usa URL/parámetros de consulta, debe usar el argumento:

```php
use App\Filament\Pages\Settings;

Settings::getUrl(['section' => 'notifications']); // /admin/settings?section=notifications
```

### Generando URL a páginas en otros paneles

Si tiene varios paneles en su aplicación, `getUrl()` generará una URL dentro del panel actual. También puedes indicar a qué panel está asociada la página, pasando el ID del panel al argumento `panel`:

```php
use App\Filament\Pages\Settings;

Settings::getUrl(panel: 'marketing');
```

## Agregar subnavegación entre páginas

Es posible que desee agregar una subnavegación común a varias páginas para permitir a los usuarios navegar rápidamente entre ellas. Puede hacer esto definiendo un [clúster](clústeres). Los clústeres también pueden contener [recursos](recursos) y puede cambiar entre varias páginas o recursos dentro de un clúster.

## Establecer la posición de subnavegación

La subnavegación se representa al inicio de la página de forma predeterminada. Puede cambiar la posición de una página configurando la propiedad `$subNavigationPosition` en la página. El valor puede ser `SubNavigationPosition::Start`, `SubNavigationPosition::End` o `SubNavigationPosition::Top` para representar la subnavegación como pestañas:

```php
use Filament\Pages\Enums\SubNavigationPosition;

protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;
```

## Agregar atributos adicionales a la etiqueta del cuerpo de una página

Es posible que desee agregar atributos adicionales a la etiqueta `<body>` de una página. Para hacer esto, puede configurar una serie de atributos en `$extraBodyAttributes`:

```php
protected array $extraBodyAttributes = [];
```

O puede devolver una matriz de atributos y sus valores desde el método `getExtraBodyAttributes()`:

```php
public function getExtraBodyAttributes(): array
{
    return [
        'class' => 'settings-page',
    ];
}
```
