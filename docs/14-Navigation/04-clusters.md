---
title: Clústeres
---

## Introducción

Los clústeres son una estructura jerárquica en paneles que le permiten agrupar [recursos](../recursos) y [páginas personalizadas](páginas personalizadas). Son útiles para organizar su panel en secciones lógicas y pueden ayudar a reducir el tamaño de la barra lateral de su panel.

Cuando se utiliza un clúster, suceden algunas cosas:

- Se agrega un nuevo elemento de navegación a la navegación, que es un enlace al primer recurso o página del clúster.
- Los elementos de navegación individuales para los recursos o páginas ya no son visibles en la navegación principal.
- Se agrega una nueva interfaz de usuario de subnavegación a cada recurso o página del clúster, que contiene los elementos de navegación para los recursos o páginas del clúster.
- Los recursos y las páginas del clúster obtienen una nueva URL, con el prefijo del nombre del clúster. Si está generando URL para [recursos](../resources#generating-urls-to-resource-pages) y [páginas](custom-pages#generating-urls-to-pages) correctamente, entonces este cambio debería manejarse automáticamente.
- El nombre del clúster está en la ruta de navegación de todos los recursos y páginas del clúster. Al hacer clic en él, accederá al primer recurso o página del clúster.

## Creando un clúster

Antes de crear su primer clúster, debe indicarle al panel dónde deben ubicarse las clases del clúster. Además de métodos como `discoverResources()` y ​​`discoverPages()` en la [configuración](../panel-configuration), puedes usar `discoverClusters()`:

```php
public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
        ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
        ->discoverClusters(in: app_path('Filament/Clusters'), for: 'App\\Filament\\Clusters');
}
```

Ahora puede crear un clúster con el comando `php artisan make:filament-cluster`:

```bash
php artisan make:filament-cluster Settings
```

Esto creará una nueva clase de clúster en el directorio `app/Filament/Clusters`:

```php
<?php

namespace App\Filament\Clusters\Settings;

use BackedEnum;
use Filament\Clusters\Cluster;
use Filament\Support\Icons\Heroicon;

class SettingsCluster extends Cluster
{
    protected static string | BackedEnum | null $navigationIcon = Heroicon::OutlinedSquares2x2;
}
```

La propiedad [`$navigationIcon`](../navigation#customizing-a-navigation-items-icon) está definida de forma predeterminada, ya que lo más probable es que desee personalizarla de inmediato. Todas las demás [propiedades y métodos de navegación](../navigation) también están disponibles para su uso, incluido [`$navigationLabel`](../navigation#customizing-a-navigation-items-label), [`$navigationSort`](../navigation#sorting-navigation-items) y [`$navigationGroup`](../navegación#agrupación-elementos-de-navegación). Se utilizan para personalizar el elemento de navegación principal del clúster, de la misma manera que personalizaría el elemento para un recurso o página.

## Agregar recursos y páginas a un clúster

Para agregar recursos y páginas a un clúster, solo necesita definir la propiedad `$cluster` en la clase de recurso o página y configurarla en la clase de clúster [que creó] (#creando-un-clúster):

```php
use App\Filament\Clusters\Settings;

protected static ?string $cluster = SettingsCluster::class;
```

## Recomendaciones de estructura de código para paneles que utilizan clústeres

Cuando utilice clústeres, se recomienda mover todos sus recursos y páginas a un directorio con el mismo nombre que el clúster. Por ejemplo, aquí hay una estructura de directorio para un panel que utiliza un clúster llamado `Settings`, que contiene un `ColorResource` y ​​dos páginas personalizadas:

```
.
+-- Clusters
|   +-- Settings
|   |   +-- SettingsCluster.php
|   |   +-- Pages
|   |   |   +-- ManageBranding.php
|   |   |   +-- ManageNotifications.php
|   |   +-- Resources
|   |   |   +-- ColorResource.php
|   |   |   +-- ColorResource
|   |   |   |   +-- Pages
|   |   |   |   |   +-- CreateColor.php
|   |   |   |   |   +-- EditColor.php
|   |   |   |   |   +-- ListColors.php
```

Esta es una recomendación, no un requisito. Puede estructurar su panel como desee, siempre y cuando los recursos y las páginas de su clúster utilicen la propiedad [`$cluster`](#adding-resources-and-pages-to-a-cluster). Esta es sólo una sugerencia para ayudarle a mantener su panel organizado.

Cuando existe un clúster en tu panel y generas nuevos recursos o páginas con los comandos `make:filament-resource` o `make:filament-page`, se te preguntará si deseas crearlos dentro de un directorio de clúster, de acuerdo con estas pautas. Si lo desea, Filament también asignará la propiedad `$cluster` correcta al recurso o clase de página por usted. Si no lo hace, deberá [definir la propiedad `$cluster`](#agregar-recursos-y-páginas-a-un-clúster) usted mismo.

## Establecer la posición de subnavegación para todas las páginas de un grupo

La subnavegación se representa al inicio de cada página de forma predeterminada. Se puede personalizar por página, pero también puede personalizarlo para todo el clúster a la vez configurando la propiedad `$subNavigationPosition`. El valor puede ser `SubNavigationPosition::Start`, `SubNavigationPosition::End` o `SubNavigationPosition::Top` para representar la subnavegación como pestañas:

```php
use Filament\Pages\Enums\SubNavigationPosition;

protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;
```

## Personalización de la ruta de navegación del clúster

El nombre del clúster se encuentra en la ruta de navegación de todos los recursos y páginas del clúster.

Puede personalizar el nombre de la ruta de navegación utilizando la propiedad `$clusterBreadcrumb` en la clase de clúster:

```php
protected static ?string $clusterBreadcrumb = 'cluster';
```

Alternativamente, puede usar `getClusterBreadcrumb()` para definir un nombre de ruta de navegación dinámica:

```php
public static function getClusterBreadcrumb(): string
{
    return __('filament/clusters/cluster.name');
}
```
