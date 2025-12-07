---
title: Empezando
---

## Introducción

Si bien Filament viene con prácticamente cualquier herramienta que necesites para crear excelentes aplicaciones, a veces necesitarás agregar tu propia funcionalidad, ya sea solo para tu aplicación o como paquetes redistribuibles que otros desarrolladores pueden incluir en sus propias aplicaciones. Es por eso que Filament ofrece un sistema de complementos que le permite ampliar su funcionalidad.

Antes de profundizar, es importante comprender los diferentes contextos en los que se pueden utilizar los complementos. Hay dos contextos principales:

1. **Complementos de panel**: Estos son complementos que se utilizan con [Panel Builders](../introducción/instalación). Por lo general, se usan solo para agregar funcionalidad cuando se usan dentro de un Panel o como un Panel completo en sí mismo. Ejemplos de esto son:
   1. Un complemento que agrega funcionalidad específica al panel en forma de widgets.
   2. Un complemento que agrega un conjunto de recursos/funcionalidades a una aplicación, como un blog o una función de administración de usuarios.
2. **Complementos independientes**: Estos son complementos que se utilizan en cualquier contexto fuera de un Panel Builder. Ejemplos de esto son:
   1. Un complemento que agrega campos personalizados para usar con los [Creadores de formularios] (../forms/installation/).
   2. Un complemento que agrega columnas o filtros personalizados a los [Creadores de tablas] (../tables/installation/).

Aunque estos son dos contextos mentales diferentes a tener en cuenta al crear complementos, se pueden usar juntos dentro del mismo complemento. No tienen por qué ser mutuamente excluyentes.

## Conceptos importantes

Antes de profundizar en los detalles de la creación de complementos, hay algunos conceptos que es importante comprender. Debes familiarizarte con lo siguiente antes de crear un complemento:

1. [Desarrollo de paquetes Laravel](https://laravel.com/docs/packages)
2. [Herramientas del paquete Spatie](https://github.com/spatie/laravel-package-tools)
3. [Gestión de activos de filamentos](../avanzado/activos)

### El objeto complemento

Filament introduce el concepto de objeto Complemento que se utiliza para configurar el complemento. Este objeto es una clase PHP simple que implementa la interfaz `Filament\Contracts\Plugin`. Esta clase se utiliza para configurar el complemento y es el punto de entrada principal del complemento. También se utiliza para registrar recursos e íconos que su complemento podría utilizar.

Si bien el objeto de complemento es extremadamente útil, no es necesario crear un complemento. Aún puedes crear complementos sin usar el objeto de complemento, como puedes ver en el tutorial [crear un complemento de panel](crear-un-panel-plugin).

:::info
   El objeto Complemento solo se utiliza para Proveedores de paneles. Los complementos independientes no utilizan este objeto. Toda la configuración de los complementos independientes debe realizarse en el proveedor de servicios del complemento.
:::

### Registro de activos

Todo el [registro de activos](../advanced/assets), incluidos CSS, JS y Alpine Components, debe realizarse a través del proveedor de servicios del complemento en el método `packageBooted()`. Esto permite a Filament registrar los activos con Asset Manager y cargarlos cuando sea necesario.

## Creando un complemento

Si bien es cierto que puedes crear complementos desde cero, te recomendamos utilizar el [Esqueleto de complementos de filamentos] (https://github.com/filamentphp/plugin-skeleton) para comenzar rápidamente. Este esqueleto incluye todo el texto estándar necesario para que pueda comenzar a trabajar rápidamente.

### Uso

Para usar el esqueleto, simplemente vaya al repositorio de GitHub y haga clic en el botón "Usar esta plantilla". Esto creará un nuevo repositorio en su cuenta con el código esqueleto. Después de eso, puedes clonar el repositorio en tu máquina. Una vez que tenga el código en su máquina, navegue hasta la raíz del proyecto y ejecute el siguiente comando:

```bash
php ./configure.php
```

Esto le hará una serie de preguntas para configurar el complemento. Una vez que haya respondido todas las preguntas, el script creará un nuevo complemento para usted y podrá comenzar a crear su increíble nueva extensión para Filament.

## Actualización de complementos existentes

Dado que cada complemento varía mucho en su alcance de uso y funcionalidad, no existe un enfoque único que se adapte a todos los casos para actualizar los complementos existentes. Sin embargo, una cosa a tener en cuenta, que es consistente con todos los complementos, es la obsolescencia de `PluginServiceProvider`.

En su proveedor de servicios de complemento, deberá cambiarlo para ampliar PackageServiceProvider. También deberá agregar una propiedad estática `$name` al proveedor de servicios. Esta propiedad se utiliza para registrar el complemento con Filament. A continuación se muestra un ejemplo de cómo podría verse su proveedor de servicios:

```php
class MyPluginServiceProvider extends PackageServiceProvider
{
    public static string $name = 'my-plugin';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name);
    }
}
```

### Enlaces útiles

Lea esta guía en su totalidad antes de actualizar su complemento. Le ayudará a comprender los conceptos y cómo crear su complemento.

1. [Gestión de activos de filamentos](../avanzado/activos)
2. [Desarrollo de complementos de panel](../panels/plugins)
3. [Gestión de iconos](../styling/icons)
4. [Gestión de colores](../estilo/colores)
5. [Ganchos CSS](../styling/css-hooks)
