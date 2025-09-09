---
title: Ver registros
---

## Crear un recurso con una página de Vista

Para crear un nuevo recurso con una página de Vista, puedes usar la opción `--view`:

```bash
php artisan make:filament-resource User --view
```

## Usar un infolist en lugar de un formulario deshabilitado

Por defecto, la página de Vista mostrará un formulario deshabilitado con los datos del registro.  
Si prefieres mostrar los datos en un *infolist*, puedes definir un método `infolist()` en la clase del recurso:

```php
use Filament\Infolists;
use Filament\Schemas\Schema;

public static function infolist(Schema $schema): Schema
{
    return $schema
        ->components([
            Infolists\Components\TextEntry::make('name'),
            Infolists\Components\TextEntry::make('email'),
            Infolists\Components\TextEntry::make('notes')
                ->columnSpanFull(),
        ]);
}
```

El método `components()` define la estructura del *infolist*. Es un array de [entradas](../infolists#available-entries) y [componentes de layout](../schemas/layout#available-layout-components), en el orden en que deben aparecer.  

Consulta la documentación de Infolists para ver una [guía](../infolists) sobre cómo construirlos en Filament.

## Agregar una página de Vista a un recurso existente

Si deseas añadir una página de Vista a un recurso existente, crea una nueva página en el directorio `Pages` del recurso:

```bash
php artisan make:filament-page ViewUser --resource=UserResource --type=ViewRecord
```

Luego debes registrar esta nueva página en el método `getPages()` del recurso:

```php
public static function getPages(): array
{
    return [
        'index' => Pages\ListUsers::route('/'),
        'create' => Pages\CreateUser::route('/create'),
        'view' => Pages\ViewUser::route('/{record}'),
        'edit' => Pages\EditUser::route('/{record}/edit'),
    ];
}
```

## Ver registros en modales

Si tu recurso es simple, puedes preferir ver los registros en modales en lugar de en la [página de Vista](viewing-records).  
En ese caso, basta con [eliminar la página View](overview#deleting-resource-pages).  

Si tu recurso no incluye un `ViewAction`, puedes añadirlo al array `$table->recordActions()`:

```php
use Filament\Actions\ViewAction;
use Filament\Tables\Table;

public static function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->recordActions([
            ViewAction::make(),
            // ...
        ]);
}
```

## Personalizar datos antes de llenar el formulario

Puedes querer modificar los datos de un registro antes de que se carguen en el formulario.  
Para hacerlo, define un método `mutateFormDataBeforeFill()` en la clase de la página View:

```php
protected function mutateFormDataBeforeFill(array $data): array
{
    $data['user_id'] = auth()->id();

    return $data;
}
```

Si estás viendo registros desde una acción modal, consulta la [documentación de Actions](../actions/view#customizing-data-before-filling-the-form).

## Hooks del ciclo de vida

Puedes usar *hooks* para ejecutar código en diferentes momentos del ciclo de vida de la página, como antes de cargar el formulario.  

Ejemplo:

```php
use Filament\Resources\Pages\ViewRecord;

class ViewUser extends ViewRecord
{
    protected function beforeFill(): void
    {
        // Se ejecuta antes de que los campos del formulario deshabilitado sean cargados desde la base de datos.
        // No se ejecuta si la página usa un infolist.
    }

    protected function afterFill(): void
    {
        // Se ejecuta después de cargar los campos del formulario deshabilitado desde la base de datos.
        // No se ejecuta si la página usa un infolist.
    }
}
```

## Autorización

Filament respeta las [policies de modelos](https://laravel.com/docs/authorization#creating-policies) registradas en tu aplicación.  

Los usuarios pueden acceder a la página View si el método `view()` de la policy retorna `true`.

## Crear otra página de Vista

Una única página de Vista puede no ser suficiente cuando hay mucha información.  
Puedes crear tantas páginas de Vista como necesites.  

Esto es especialmente útil si usas [sub-navegación de recursos](overview#resource-sub-navigation), ya que puedes alternar fácilmente entre las distintas páginas.  

Ejemplo para crearla:

```bash
php artisan make:filament-page ViewCustomerContact --resource=CustomerResource --type=ViewRecord
```

Debes registrarla en `getPages()`:

```php
public static function getPages(): array
{
    return [
        'index' => Pages\ListCustomers::route('/'),
        'create' => Pages\CreateCustomer::route('/create'),
        'view' => Pages\ViewCustomer::route('/{record}'),
        'view-contact' => Pages\ViewCustomerContact::route('/{record}/contact'),
        'edit' => Pages\EditCustomer::route('/{record}/edit'),
    ];
}
```

Puedes definir un `infolist()` o `form()` personalizado para esa página.

## Personalizar relation managers en una página de Vista

Puedes especificar qué relation managers mostrar en una página de Vista con el método `getAllRelationManagers()`:

```php
protected function getAllRelationManagers(): array
{
    return [
        CustomerAddressesRelationManager::class,
        CustomerContactsRelationManager::class,
    ];
}
```

Esto es útil cuando existen [múltiples páginas de Vista](#creating-another-view-page):

```php
// ViewCustomer.php
protected function getAllRelationManagers(): array
{
    return [
        RelationManagers\OrdersRelationManager::class,
        RelationManagers\SubscriptionsRelationManager::class,
    ];
}

// ViewCustomerContact.php
protected function getAllRelationManagers(): array
{
    return [
        RelationManagers\ContactsRelationManager::class,
        RelationManagers\AddressesRelationManager::class,
    ];
}
```

Si `getAllRelationManagers()` no está definido, se usarán los managers del recurso principal.

## Añadir páginas de Vista a la sub-navegación de recursos

Si usas [sub-navegación](overview#resource-sub-navigation), puedes registrar estas páginas en `getRecordSubNavigation()`:

```php
use App\Filament\Resources\Customers\Pages;
use Filament\Resources\Pages\Page;

public static function getRecordSubNavigation(Page $page): array
{
    return $page->generateNavigationItems([
        Pages\ViewCustomerContact::class,
    ]);
}
```

## Contenido personalizado de la página

Cada página en Filament tiene su propio [schema](../schemas).  
El método `content()` de la página View incluye normalmente:

```php
use Filament\Schemas\Schema;

public function content(Schema $schema): Schema
{
    return $schema
        ->components([
            $this->hasInfolist()
                ? $this->getInfolistContentComponent()
                : $this->getFormContentComponent(),
            $this->getRelationManagersContentComponent(),
        ]);
}
```

En el array `components()` puedes añadir, reordenar o eliminar componentes.

### Usar una vista Blade personalizada

También puedes sobrescribir la propiedad `$view` de la página para usar una vista Blade personalizada:

```php
protected string $view = 'filament.resources.users.pages.view-user';
```

Y crear la vista en `resources/views/filament/resources/users/pages/view-user.blade.php`:

```blade
<x-filament-panels::page>
    {{-- `$this->getRecord()` devuelve el registro Eloquent actual de la página --}}

    {{ $this->content }} {{-- Renderiza el contenido definido en `content()`. --}}
</x-filament-panels::page>
```
