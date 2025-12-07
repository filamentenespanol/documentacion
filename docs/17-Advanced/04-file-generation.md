---
title: Generación de archivos
---

## Introducción

Filament incluye muchos comandos CLI que generan archivos. Esta guía es para explicar cómo puede personalizar los archivos generados.

La gran mayoría de archivos que genera Filament son clases PHP. Filament usa [`nette/php-generator`](https://github.com/nette/php-generator) para generar clases mediante programación, en lugar de usar archivos de plantilla. La ventaja de esto es que hay mucha más flexibilidad en los archivos generados, lo cual es importante cuando necesitas admitir tantas opciones de configuración diferentes como las que tiene Filament.

Cada tipo de clase es generado por una clase `ClassGenerator`. Aquí hay una lista de `ClassGenerator` clases que utiliza Filament:

- `Filament\Actions\Commands\FileGenerators\ExporterClassGenerator` es utilizado por el comando `make:filament-exporter`.
- `Filament\Actions\Commands\FileGenerators\ImporterClassGenerator` es utilizado por el comando `make:filament-importer`.
- `Filament\Forms\Commands\FileGenerators\FieldClassGenerator` es utilizado por el comando `make:filament-form-field`.
- `Filament\Forms\Commands\FileGenerators\FormSchemaClassGenerator` es utilizado por el comando `make:filament-form`.
- `Filament\Forms\Commands\FileGenerators\LivewireFormComponentClassGenerator` es utilizado por el comando `make:filament-livewire-form`.
- `Filament\Infolists\Commands\FileGenerators\EntryClassGenerator` es utilizado por el comando `make:filament-infolist-entry`.
- `Filament\Commands\FileGenerators\Resources\Pages\ResourceCreateRecordPageClassGenerator` es utilizado por los comandos `make:filament-resource` y ​​`make:filament-page`.
- `Filament\Commands\FileGenerators\Resources\Pages\ResourceCustomPageClassGenerator` es utilizado por los comandos `make:filament-resource` y ​​`make:filament-page`.
- `Filament\Commands\FileGenerators\Resources\Pages\ResourceEditRecordPageClassGenerator` es utilizado por los comandos `make:filament-resource` y ​​`make:filament-page`.
- `Filament\Commands\FileGenerators\Resources\Pages\ResourceListRecordsPageClassGenerator` es utilizado por los comandos `make:filament-resource` y ​​`make:filament-page`.
- `Filament\Commands\FileGenerators\Resources\Pages\ResourceManageRecordsPageClassGenerator` es utilizado por los comandos `make:filament-resource` y ​​`make:filament-page`.
- `Filament\Commands\FileGenerators\Resources\Pages\ResourceManageRelatedRecordsPageClassGenerator` es utilizado por los comandos `make:filament-resource` y ​​`make:filament-page`.
- `Filament\Commands\FileGenerators\Resources\Pages\ResourceViewRecordPageClassGenerator` es utilizado por los comandos `make:filament-resource` y ​​`make:filament-page`.
- `Filament\Commands\FileGenerators\Resources\SchemasResourceFormSchemaClassGenerator` es utilizado por el comando `make:filament-resource`.
- `Filament\Commands\FileGenerators\Resources\SchemasResourceInfolistSchemaClassGenerator` es utilizado por el comando `make:filament-resource`.
- `Filament\Commands\FileGenerators\Resources\SchemasResourceTableClassGenerator` es utilizado por el comando `make:filament-resource`.
- `Filament\Commands\FileGenerators\Resources\RelationManagerClassGenerator` es utilizado por el comando `make:filament-relation-manager`.
- `Filament\Commands\FileGenerators\Resources\ResourceClassGenerator` es utilizado por el comando `make:filament-resource`.
- `Filament\Commands\FileGenerators\ClusterClassGenerator` es utilizado por el comando `make:filament-cluster`.
- `Filament\Commands\FileGenerators\CustomPageClassGenerator` es utilizado por el comando `make:filament-page`.
- `Filament\Commands\FileGenerators\PanelProviderClassGenerator` es utilizado por los comandos `filament:install` y ​​`make:filament-panel`.
- `Filament\Schemas\Commands\FileGenerators\ComponentClassGenerator` es utilizado por el comando `make:filament-schema-component`.
- `Filament\Schemas\Commands\FileGenerators\LivewireSchemaComponentClassGenerator` es utilizado por el comando `make:filament-livewire-schema`.
- `Filament\Schemas\Commands\FileGenerators\SchemaClassGenerator` es utilizado por el comando `make:filament-schema`.
- `Filament\Tables\Commands\FileGenerators\ColumnClassGenerator` es utilizado por el comando `make:filament-table-column`.
- `Filament\Tables\Commands\FileGenerators\LivewireTableComponentClassGenerator` es utilizado por el comando `make:filament-livewire-table`.
- `Filament\Tables\Commands\FileGenerators\TableClassGenerator` es utilizado por el comando `make:filament-table`.
- `Filament\Widgets\Commands\FileGenerators\ChartWidgetClassGenerator` es utilizado por el comando `make:filament-widget`.
- `Filament\Widgets\Commands\FileGenerators\CustomWidgetClassGenerator` es utilizado por el comando `make:filament-widget`.
- `Filament\Widgets\Commands\FileGenerators\StatsOverviewWidgetClassGenerator` es utilizado por el comando `make:filament-widget`.
- `Filament\Widgets\Commands\FileGenerators\TableWidgetClassGenerator` es utilizado por el comando `make:filament-widget`.

## La anatomía de un generador de clases.

La mejor manera de aprender sobre los generadores de clases es mirar su código fuente. Todos siguen patrones muy similares y utilizan las funciones de [`nette/php-generator`](https://github.com/nette/php-generator).

Aquí hay algunos métodos a tener en cuenta:

- `__construct()` acepta los parámetros que se pasan al generador. Esta es toda la información a la que tiene acceso como contexto para generar la clase.
- `getImports()` devuelve las importaciones que se utilizan en la clase que se genera. Esta no es una lista exclusiva y también se pueden agregar importaciones mientras se generan propiedades y métodos, si eso es más fácil que proporcionarlos por adelantado.
- `getExtends()` devuelve el nombre completo de la clase que se está ampliando.
- `addTraitsToClass()` se utiliza para agregar rasgos a la clase que se está generando. El objeto `Class` de `nette/php-generator` se pasa como parámetro.
- `addPropertiesToClass()` se utiliza para agregar propiedades a la clase que se está generando. El objeto `Class` de `nette/php-generator` se pasa como parámetro.
- Los métodos `add*PropertyToClass()` se utilizan para agregar una sola propiedad a la clase que se está generando. El objeto `Class` de `nette/php-generator` se pasa como parámetro. Suelen llamarse desde `addPropertiesToClass()`.
- `addMethodsToClass()` se utiliza para agregar métodos a la clase que se está generando. El objeto `Class` de `nette/php-generator` se pasa como parámetro.
- Los métodos `add*MethodToClass()` se utilizan para agregar un solo método a la clase que se está generando. El objeto `Class` de `nette/php-generator` se pasa como parámetro. Suelen llamarse desde `addMethodsToClass()`.

## Reemplazo de un generador de clases

Para poder realizar cambios en la forma en que se genera un archivo, debe identificar el generador de clases correcto (consulte la lista anterior) y reemplazarlo.

Para reemplazarlo, cree una nueva clase que extienda el generador de clases que desea reemplazar. Por ejemplo, si desea reemplazar `ResourceClassGenerator`, cree una nueva clase como esta:

```php
namespace App\Filament\Commands\FileGenerators\Resources;

use Filament\Commands\FileGenerators\Resources\ResourceClassGenerator as BaseResourceClassGenerator;

class ResourceClassGenerator extends BaseResourceClassGenerator
{
   // ...
}
```

También debe registrarlo como enlace en el contenedor de servicios. Puedes hacer esto en un proveedor de servicios como `AppServiceProvider`:

```php
use App\Filament\Commands\FileGenerators\Resources\ResourceClassGenerator;
use Filament\Commands\FileGenerators\Resources\ResourceClassGenerator as BaseResourceClassGenerator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        // ...
    
        $this->app->bind(BaseResourceClassGenerator::class, ResourceClassGenerator::class);
        
        // ...
    }
}
```

## Personalizar una propiedad o método existente en una clase

Mientras visualiza el código fuente del generador de clases, ubique la propiedad o método que desea personalizar. Puedes anularlo en tu generador de clases simplemente definiendo un nuevo método con el mismo nombre. Por ejemplo, aquí hay un método que puede encontrar para agregar la propiedad `$navigationIcon` a una clase de recurso:

```php
use BackedEnum;
use Filament\Support\Icons\Heroicon;
use Nette\PhpGenerator\ClassType;
use Nette\PhpGenerator\Literal;

protected function addNavigationIconPropertyToClass(ClassType $class): void
{
    $this->namespace->addUse(BackedEnum::class);
    $this->namespace->addUse(Heroicon::class);

    $property = $class->addProperty('navigationIcon', new Literal('Heroicon::OutlinedRectangleStack'))
        ->setProtected()
        ->setStatic()
        ->setType('string|BackedEnum|null');
    $this->configureNavigationIconProperty($property);
}
```

Puede anular ese método para cambiar su comportamiento, o simplemente puede anular el método `configureNavigationIconProperty()` para entender cómo está configurada la propiedad. Por ejemplo, haga la propiedad `public` en lugar de `protected`:

```php
use Nette\PhpGenerator\Property;

protected function configureNavigationIconProperty(Property $property): void
{
    $property->setPublic();
}
```

## Agregar una nueva propiedad o método a una clase

Para agregar una nueva propiedad o método a una clase, puede hacerlo en los métodos `addPropertiesToClass()` o `addMethodsToClass()`. Para heredar las propiedades existentes en lugar de reemplazarlas, asegúrese de llamar a `parent::addPropertiesToClass()` o `parent::addMethodsToClass()` al comienzo de su método. Por ejemplo, aquí se explica cómo agregar una nueva propiedad a una clase de recurso:

```php
use Nette\PhpGenerator\ClassType;
use Nette\PhpGenerator\Literal;

protected function addPropertiesToClass(ClassType $class): void
{
    parent::addPropertiesToClass($class);

    $class->addProperty('navigationSort', 10)
        ->setProtected()
        ->setStatic()
        ->setType('?int');
}
```
