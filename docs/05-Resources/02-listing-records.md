---
title: Listado de registros
---

## Usar pestañas para filtrar los registros

Puedes añadir pestañas sobre la tabla, que pueden usarse para filtrar los registros según condiciones predefinidas. Cada pestaña puede acotar la consulta Eloquent de la tabla de una forma distinta. Para registrar pestañas, añade un método `getTabs()` a la clase de la página List y retorna un array de objetos `Tab`:

```php
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

public function getTabs(): array
{
    return [
        'all' => Tab::make(),
        'active' => Tab::make()
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', true)),
        'inactive' => Tab::make()
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', false)),
    ];
}
```

### Personalizar las etiquetas de las pestañas de filtro

Las claves del array se utilizarán como identificadores para las pestañas, por lo que pueden persistirse en la query string de la URL. La etiqueta de cada pestaña también se genera a partir de la clave, pero puedes sobrescribirla pasando una etiqueta al método `make()` de la pestaña:

```php
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

public function getTabs(): array
{
    return [
        'all' => Tab::make('Todos los clientes'),
        'active' => Tab::make('Clientes activos')
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', true)),
        'inactive' => Tab::make('Clientes inactivos')
            ->modifyQueryUsing(fn (Builder $query) => $query->where('active', false)),
    ];
}
```

### Añadir iconos a las pestañas de filtro

Puedes añadir iconos a las pestañas pasando un [icono](../styling/icons) al método `icon()` de la pestaña:

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->icon('heroicon-m-user-group');
```

También puedes cambiar la posición del icono para que aparezca después de la etiqueta en vez de antes, usando el método `iconPosition()`:

```php
use Filament\Support\Enums\IconPosition;

Tab::make()
    ->icon('heroicon-m-user-group')
    ->iconPosition(IconPosition::After);
```

### Añadir badges a las pestañas de filtro

Puedes añadir badges a las pestañas pasando una cadena al método `badge()` de la pestaña:

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->badge(Customer::query()->where('active', true)->count());
```

#### Cambiar el color de los badges de las pestañas de filtro

El color de un badge puede cambiarse usando el método `badgeColor()`:

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->badge(Customer::query()->where('active', true)->count())
    ->badgeColor('success');
```

### Añadir atributos extra a las pestañas de filtro

También puedes pasar atributos HTML extra a las pestañas usando `extraAttributes()`:

```php
use Filament\Schemas\Components\Tabs\Tab;

Tab::make()
    ->extraAttributes(['data-cy' => 'statement-confirmed-tab']);
```

### Personalizar la pestaña por defecto

Para personalizar la pestaña seleccionada por defecto al cargar la página, puedes retornar la clave del array de la pestaña desde el método `getDefaultActiveTab()`:

```php
use Filament\Schemas\Components\Tabs\Tab;

public function getTabs(): array
{
    return [
        'all' => Tab::make(),
        'active' => Tab::make(),
        'inactive' => Tab::make(),
    ];
}

public function getDefaultActiveTab(): string | int | null
{
    return 'active';
}
```

## Autorización

Para la autorización, Filament observará cualquier [policy de modelo](https://laravel.com/docs/authorization#creating-policies) que esté registrada en tu aplicación.

Los usuarios pueden acceder a la página List si el método `viewAny()` de la policy del modelo retorna `true`.

El método `reorder()` se utiliza para controlar el [reordenado de registros](#reordering-records).

## Personalizar la consulta Eloquent de la tabla

Aunque puedes [personalizar la consulta Eloquent para todo el resource](overview#customizing-the-resource-eloquent-query), también puedes hacer modificaciones específicas para la tabla de la página List. Para ello, usa el método `modifyQueryUsing()` en el método `table()` del resource:

```php
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

public static function table(Table $table): Table
{
    return $table
        ->modifyQueryUsing(fn (Builder $query) => $query->withoutGlobalScopes());
}
```

## Contenido personalizado de la página

Cada página en Filament tiene su propio [schema](../schemas), que define la estructura y el contenido general. Puedes sobrescribir el schema de la página definiendo un método `content()` en ella. El método `content()` para la página List contiene los siguientes componentes por defecto:

```php
use Filament\Schemas\Components\EmbeddedTable;
use Filament\Schemas\Components\RenderHook;
use Filament\Schemas\Schema;

public function content(Schema $schema): Schema
{
    return $schema
        ->components([
            $this->getTabsContentComponent(), // Este método devuelve un componente para mostrar las pestañas sobre una tabla
            RenderHook::make(PanelsRenderHook::RESOURCE_PAGES_LIST_RECORDS_TABLE_BEFORE),
            EmbeddedTable::make(), // Este es el componente que renderiza la tabla definida en este resource
            RenderHook::make(PanelsRenderHook::RESOURCE_PAGES_LIST_RECORDS_TABLE_AFTER),
        ]);
}
```

Dentro del array `components()`, puedes insertar cualquier [componente de schema](../schemas). Puedes reordenar los componentes cambiando el orden del array o eliminar cualquiera de los componentes que no necesites.

### Usar una vista Blade personalizada

Para mayores opciones de personalización, puedes sobrescribir la propiedad estática `$view` en la clase de la página a una vista personalizada en tu aplicación:

```php
protected string $view = 'filament.resources.users.pages.list-users';
```

Esto asume que has creado una vista en `resources/views/filament/resources/users/pages/list-users.blade.php`:

```blade
<x-filament-panels::page>
    {{ $this->content }} {{-- Esto renderizará el contenido de la página definido en el método `content()`, que puede eliminarse si quieres empezar desde cero --}}
</x-filament-panels::page>
```
