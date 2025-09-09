---
title: Recursos (Resources)
---

## Introducción

Los Resources son clases estáticas que se utilizan para construir interfaces CRUD para tus modelos Eloquent. Describen cómo los administradores deberían poder interactuar con los datos de tu aplicación usando tablas y formularios.

## Creando un resource

Para crear un resource para el modelo `App\Models\Customer`:

```bash
php artisan make:filament-resource Customer
```

Esto creará varios archivos en el directorio `app/Filament/Resources`:

```
.
+-- Customers
|   +-- CustomerResource.php
|   +-- Pages
|   |   +-- CreateCustomer.php
|   |   +-- EditCustomer.php
|   |   +-- ListCustomers.php
|   +-- Schemas
|   |   +-- CustomerForm.php
|   +-- Tables
|   |   +-- CustomersTable.php
```

Tu nueva clase resource se encuentra en `CustomerResource.php`.

Las clases en el directorio `Pages` se usan para personalizar las páginas de la aplicación que interactúan con tu resource. Son componentes [Livewire](https://livewire.laravel.com) de página completa que puedes personalizar como desees.

Las clases en el directorio `Schemas` se usan para definir el contenido de los [formularios](../forms) e [infolists](../infolists) de tu resource. Las clases en el directorio `Tables` se usan para construir la tabla de tu resource.

:::tip
¿Has creado un resource pero no aparece en el menú de navegación? Si tienes una [policy del modelo](#authorization), asegúrate de retornar `true` desde el método `viewAny()`.
:::

### Resources simples (modales)

A veces, tus modelos son lo suficientemente simples como para que solo quieras gestionar registros en una página, usando modales para crear, editar y eliminar registros. Para generar un resource simple con modales:

```bash
php artisan make:filament-resource Customer --simple
```

Tu resource tendrá una página "Manage", que es una página List con modales añadidos.

Además, tu resource simple no tendrá método `getRelations()`, ya que los [relation managers](managing-relationships) solo se muestran en las páginas Edit y View, que no están presentes en resources simples. Todo lo demás es igual.

### Generación automática de formularios y tablas

Si quieres ahorrar tiempo, Filament puede generar automáticamente el [formulario](#resource-forms) y la [tabla](#resource-tables) basándose en las columnas de la base de datos de tu modelo, usando `--generate`:

```bash
php artisan make:filament-resource Customer --generate
```

### Manejo de soft-deletes

Por defecto, no podrás interactuar con registros eliminados en la aplicación. Si quieres añadir funcionalidad para restaurar, forzar eliminación y filtrar registros eliminados en tu resource, usa la bandera `--soft-deletes` al generar el resource:

```bash
php artisan make:filament-resource Customer --soft-deletes
```

Puedes encontrar más información sobre soft-deleting [aquí](deleting-records#handling-soft-deletes).

### Generando una página View

Por defecto, solo se generan las páginas List, Create y Edit para tu resource. Si también quieres una [página View](viewing-records), usa la bandera `--view`:

```bash
php artisan make:filament-resource Customer --view
```

### Especificando un namespace personalizado del modelo

Por defecto, Filament asumirá que tu modelo existe en el directorio `App\Models`. Puedes pasar un namespace diferente para el modelo usando la bandera `--model-namespace`:

```bash
php artisan make:filament-resource Customer --model-namespace=Custom\Path\Models
```

En este ejemplo, el modelo debería existir en `Custom\Path\Models\Customer`. Ten en cuenta las dobles barras invertidas `\` en el comando que son requeridas.

Ahora al [generar el resource](#automatically-generating-forms-and-tables), Filament podrá localizar el modelo y leer el esquema de la base de datos.

### Generando el modelo, migración y factory al mismo tiempo

Si quieres ahorrar tiempo al crear tus resources, Filament también puede generar el modelo, migración y factory para el nuevo resource al mismo tiempo usando las banderas `--model`, `--migration` y `--factory` en cualquier combinación:

```bash
php artisan make:filament-resource Customer --model --migration --factory
```

## Títulos de registros

Se puede establecer un `$recordTitleAttribute` para tu resource, que es el nombre de la columna en tu modelo que puede usarse para identificarlo de otros.

Por ejemplo, esto podría ser el `title` de un post de blog o el `name` de un cliente:

```php
protected static ?string $recordTitleAttribute = 'name';
```

Esto es requerido para que funcionen características como [búsqueda global](global-search).

:::tip
Puedes especificar el nombre de un [accessor de Eloquent](https://laravel.com/docs/eloquent-mutators#defining-an-accessor) si una sola columna es inadecuada para identificar un registro.
:::

## Formularios de resources

Las clases resource contienen un método `form()` que se usa para construir los formularios en las páginas [Create](creating-records) y [Edit](editing-records).

Por defecto, Filament crea un archivo de esquema de formulario para ti, que se referencia en el método `form()`. Esto es para mantener tu clase resource limpia y organizada, de lo contrario puede volverse bastante grande:

```php
use App\Filament\Resources\Customers\Schemas\CustomerForm;
use Filament\Schemas\Schema;

public static function form(Schema $schema): Schema
{
    return CustomerForm::configure($schema);
}
```

En la clase `CustomerForm`, puedes definir los campos y diseño de tu formulario:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

public static function configure(Schema $schema): Schema
{
    return $schema
        ->components([
            TextInput::make('name')->required(),
            TextInput::make('email')->email()->required(),
            // ...
        ]);
}
```

El método `components()` se usa para definir la estructura de tu formulario. Es un array de [campos](../forms#available-fields) y [componentes de diseño](../schemas/layout#available-layout-components), en el orden que deberían aparecer en tu formulario.

Consulta la documentación de Forms para una [guía](../forms) sobre cómo construir formularios con Filament.

:::tip
Si prefieres definir el formulario directamente en la clase resource, puedes hacerlo y eliminar la clase de esquema de formulario por completo:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

public static function form(Schema $schema): Schema
{
    return $schema
        ->components([
            TextInput::make('name')->required(),
            TextInput::make('email')->email()->required(),
            // ...
        ]);
}
```
:::

### Ocultando componentes basado en la operación actual

El método `hiddenOn()` de los componentes de formulario te permite ocultar dinámicamente campos basándose en la página o acción actual.

En este ejemplo, ocultamos el campo `password` en la página `edit`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Support\Enums\Operation;

TextInput::make('password')
    ->password()
    ->required()
    ->hiddenOn(Operation::Edit),
```

Alternativamente, tenemos un método de atajo `visibleOn()` para mostrar un campo solo en una página o acción:

```php
use Filament\Forms\Components\TextInput;
use Filament\Support\Enums\Operation;

TextInput::make('password')
    ->password()
    ->required()
    ->visibleOn(Operation::Create),
```

## Tablas de resources

Las clases resource contienen un método `table()` que se usa para construir la tabla en la [página List](listing-records).

Por defecto, Filament crea un archivo de tabla para ti, que se referencia en el método `table()`. Esto es para mantener tu clase resource limpia y organizada, de lo contrario puede volverse bastante grande:

```php
use App\Filament\Resources\Customers\Schemas\CustomersTable;
use Filament\Tables\Table;

public static function table(Table $table): Table
{
    return CustomersTable::configure($table);
}
```

En la clase `CustomersTable`, puedes definir las columnas, filtros y acciones de la tabla:

```php
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

public static function configure(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('name'),
            TextColumn::make('email'),
            // ...
        ])
        ->filters([
            Filter::make('verified')
                ->query(fn (Builder $query): Builder => $query->whereNotNull('email_verified_at')),
            // ...
        ])
        ->recordActions([
            EditAction::make(),
        ])
        ->toolbarActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
        ]);
}
```

Consulta la documentación de [tables](../tables) para descubrir cómo añadir columnas de tabla, filtros, acciones y más.

:::tip
Si prefieres definir la tabla directamente en la clase resource, puedes hacerlo y eliminar la clase de tabla por completo:

```php
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

public static function table(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('name'),
            TextColumn::make('email'),
            // ...
        ])
        ->filters([
            Filter::make('verified')
                ->query(fn (Builder $query): Builder => $query->whereNotNull('email_verified_at')),
            // ...
        ])
        ->recordActions([
            EditAction::make(),
        ])
        ->toolbarActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
        ]);
}
```
:::

## Personalizando la etiqueta del modelo

Cada resource tiene una "etiqueta de modelo" que se genera automáticamente desde el nombre del modelo. Por ejemplo, un modelo `App\Models\Customer` tendrá una etiqueta `customer`.

La etiqueta se usa en varias partes de la UI, y puedes personalizarla usando la propiedad `$modelLabel`:

```php
protected static ?string $modelLabel = 'cliente';
```

Alternativamente, puedes usar `getModelLabel()` para definir una etiqueta dinámica:

```php
public static function getModelLabel(): string
{
    return __('filament/resources/customer.label');
}
```

### Personalizando la etiqueta plural del modelo

Los resources también tienen una "etiqueta plural del modelo" que se genera automáticamente desde la etiqueta del modelo. Por ejemplo, una etiqueta `customer` se pluralizará en `customers`.

Puedes personalizar la versión plural de la etiqueta usando la propiedad `$pluralModelLabel`:

```php
protected static ?string $pluralModelLabel = 'clientes';
```

Alternativamente, puedes establecer una etiqueta plural dinámica en el método `getPluralModelLabel()`:

```php
public static function getPluralModelLabel(): string
{
    return __('filament/resources/customer.plural_label');
}
```

### Capitalización automática de la etiqueta del modelo

Por defecto, Filament capitalizará automáticamente cada palabra en la etiqueta del modelo, para algunas partes de la UI. Por ejemplo, en títulos de página, el menú de navegación y las migas de pan.

Si quieres deshabilitar este comportamiento para un resource, puedes establecer `$hasTitleCaseModelLabel` en el resource:

```php
protected static bool $hasTitleCaseModelLabel = false;
```

## Elementos de navegación del resource

Filament generará automáticamente un elemento del menú de navegación para tu resource usando la [etiqueta plural](#plural-label).

Si quieres personalizar la etiqueta del elemento de navegación, puedes usar la propiedad `$navigationLabel`:

```php
protected static ?string $navigationLabel = 'Mis Clientes';
```

Alternativamente, puedes establecer una etiqueta de navegación dinámica en el método `getNavigationLabel()`:

```php
public static function getNavigationLabel(): string
{
    return __('filament/resources/customer.navigation_label');
}
```

### Estableciendo un ícono de navegación del resource

La propiedad `$navigationIcon` soporta el nombre de cualquier componente Blade. Por defecto, [Heroicons](https://heroicons.com) están instalados. Sin embargo, puedes crear tus propios componentes de íconos personalizados o instalar una librería alternativa si lo deseas.

```php
use BackedEnum;

protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-user-group';
```

Alternativamente, puedes establecer un ícono de navegación dinámico en el método `getNavigationIcon()`:

```php
use BackedEnum;
use Illuminate\Contracts\Support\Htmlable;

public static function getNavigationIcon(): string | BackedEnum | Htmlable | null
{
    return 'heroicon-o-user-group';
}
```

### Ordenando elementos de navegación del resource

La propiedad `$navigationSort` te permite especificar el orden en que se listan los elementos de navegación:

```php
protected static ?int $navigationSort = 2;
```

Alternativamente, puedes establecer un orden dinámico del elemento de navegación en el método `getNavigationSort()`:

```php
public static function getNavigationSort(): ?int
{
    return 2;
}
```

### Agrupando elementos de navegación del resource

Puedes agrupar elementos de navegación especificando una propiedad `$navigationGroup`:

```php
use UnitEnum;

protected static string | UnitEnum | null $navigationGroup = 'Tienda';
```

Alternativamente, puedes usar el método `getNavigationGroup()` para establecer una etiqueta de grupo dinámica:

```php
public static function getNavigationGroup(): ?string
{
    return __('filament/navigation.groups.shop');
}
```

#### Agrupando elementos de navegación del resource bajo otros elementos

Puedes agrupar elementos de navegación como hijos de otros elementos, pasando la etiqueta del elemento padre como `$navigationParentItem`:

```php
use UnitEnum;

protected static ?string $navigationParentItem = 'Productos';

protected static string | UnitEnum | null $navigationGroup = 'Tienda';
```

Como se ve arriba, si el elemento padre tiene un grupo de navegación, ese grupo de navegación también debe definirse, para que el elemento padre correcto pueda ser identificado.

También puedes usar el método `getNavigationParentItem()` para establecer una etiqueta de elemento padre dinámica:

```php
public static function getNavigationParentItem(): ?string
{
    return __('filament/navigation.groups.shop.items.products');
}
```

:::tip
Si estás buscando un tercer nivel de navegación como este, deberías considerar usar [clusters](../navigation/clusters) en su lugar, que son una agrupación lógica de resources y [páginas personalizadas](../navigation/custom-pages), que pueden compartir su propia navegación separada.
:::

## Generando URLs a páginas de resources

Filament proporciona el método estático `getUrl()` en las clases resource para generar URLs a resources y páginas específicas dentro de ellos. Tradicionalmente, necesitarías construir la URL a mano o usando el helper `route()` de Laravel, pero estos métodos dependen del conocimiento del slug del resource o convenciones de nomenclatura de rutas.

El método `getUrl()`, sin argumentos, generará una URL a la [página List](listing-records) del resource:

```php
use App\Filament\Resources\Customers\CustomerResource;

CustomerResource::getUrl(); // /admin/customers
```

También puedes generar URLs a páginas específicas dentro del resource. El nombre de cada página es la clave del array en el array `getPages()` del resource. Por ejemplo, para generar una URL a la [página Create](creating-records):

```php
use App\Filament\Resources\Customers\CustomerResource;

CustomerResource::getUrl('create'); // /admin/customers/create
```

Algunas páginas en el método `getPages()` usan parámetros de URL como `record`. Para generar una URL a estas páginas y pasar un registro, deberías usar el segundo argumento:

```php
use App\Filament\Resources\Customers\CustomerResource;

CustomerResource::getUrl('edit', ['record' => $customer]); // /admin/customers/edit/1
```

En este ejemplo, `$customer` puede ser un objeto modelo Eloquent, o un ID.

### Generando URLs a modales de resources

Esto puede ser especialmente útil si estás usando [resources simples](#simple-modal-resources) con solo una página.

Para generar una URL para una acción en la tabla del resource, deberías pasar `tableAction` y `tableActionRecord` como parámetros de URL:

```php
use App\Filament\Resources\Customers\CustomerResource;
use Filament\Actions\EditAction;

CustomerResource::getUrl(parameters: [
    'tableAction' => EditAction::getDefaultName(),
    'tableActionRecord' => $customer,
]); // /admin/customers?tableAction=edit&tableActionRecord=1
```

O si quieres generar una URL para una acción en la página como un `CreateAction` en el header, puedes pasarla al parámetro `action`:

```php
use App\Filament\Resources\Customers\CustomerResource;
use Filament\Actions\CreateAction;

CustomerResource::getUrl(parameters: [
    'action' => CreateAction::getDefaultName(),
]); // /admin/customers?action=create
```

### Generando URLs a resources en otros paneles

Si tienes múltiples paneles en tu aplicación, `getUrl()` generará una URL dentro del panel actual. También puedes indicar con qué panel está asociado el resource, pasando el ID del panel al argumento `panel`:

```php
use App\Filament\Resources\Customers\CustomerResource;

CustomerResource::getUrl(panel: 'marketing');
```

## Personalizando la consulta Eloquent del resource

Dentro de Filament, cada consulta a tu modelo resource comenzará con el método `getEloquentQuery()`.

Debido a esto, es muy fácil aplicar tus propias restricciones de consulta o [scopes del modelo](https://laravel.com/docs/eloquent#query-scopes) que afecten todo el resource:

```php
public static function getEloquentQuery(): Builder
{
    return parent::getEloquentQuery()->where('is_active', true);
}
```

### Deshabilitando global scopes

Por defecto, Filament observará todos los global scopes que están registrados en tu modelo. Sin embargo, esto puede no ser ideal si deseas acceder, por ejemplo, a registros soft-deleted.

Para superar esto, puedes sobrescribir el método `getEloquentQuery()` que usa Filament:

```php
public static function getEloquentQuery(): Builder
{
    return parent::getEloquentQuery()->withoutGlobalScopes();
}
```

Alternativamente, puedes remover global scopes específicos:

```php
public static function getEloquentQuery(): Builder
{
    return parent::getEloquentQuery()->withoutGlobalScopes([ActiveScope::class]);
}
```

Más información sobre remover global scopes puede encontrarse en la [documentación de Laravel](https://laravel.com/docs/eloquent#removing-global-scopes).

## Personalizando la URL del resource

Por defecto, Filament generará una URL basada en el nombre del resource. Puedes personalizar esto estableciendo la propiedad `$slug` en el resource:

```php
protected static ?string $slug = 'pending-orders';
```

## Sub-navegación del resource

La sub-navegación permite al usuario navegar entre diferentes páginas dentro de un resource. Típicamente, todas las páginas en la sub-navegación estarán relacionadas con el mismo registro en el resource. Por ejemplo, en un resource Customer, puedes tener una sub-navegación con las siguientes páginas:

- Ver cliente, una [página `ViewRecord`](viewing-records) que proporciona una vista de solo lectura de los detalles del cliente.
- Editar cliente, una [página `EditRecord`](editing-records) que permite al usuario editar los detalles del cliente.
- Editar contacto del cliente, una [página `EditRecord`](editing-records) que permite al usuario editar los detalles de contacto del cliente. Puedes [aprender cómo crear más de una página Edit](editing-records#creating-another-edit-page).
- Gestionar direcciones, una [página `ManageRelatedRecords`](managing-relationships#relation-pages) que permite al usuario gestionar las direcciones del cliente.
- Gestionar pagos, una [página `ManageRelatedRecords`](managing-relationships#relation-pages) que permite al usuario gestionar los pagos del cliente.

Para añadir una sub-navegación a cada página de "registro singular" en el resource, puedes añadir el método `getRecordSubNavigation()` a la clase resource:

```php
use Filament\Resources\Pages\Page;

public static function getRecordSubNavigation(Page $page): array
{
    return $page->generateNavigationItems([
        ViewCustomer::class,
        EditCustomer::class,
        EditCustomerContact::class,
        ManageCustomerAddresses::class,
        ManageCustomerPayments::class,
    ]);
}
```

Cada elemento en la sub-navegación puede personalizarse usando los [mismos métodos de navegación que las páginas normales](../navigation).

:::tip
Si estás buscando añadir sub-navegación para cambiar *entre* resources completos y [páginas personalizadas](../navigation/custom-pages), podrías estar buscando [clusters](../navigation/clusters), que se usan para agrupar estos juntos. El método `getRecordSubNavigation()` está destinado a construir una navegación entre páginas que se relacionan con un registro particular *dentro* de un resource.
:::

### Estableciendo la posición de sub-navegación para un resource

La sub-navegación se renderiza al inicio de la página por defecto. Puedes cambiar la posición para todas las páginas en un resource estableciendo la propiedad `$subNavigationPosition` en el resource. El valor puede ser `SubNavigationPosition::Start`, `SubNavigationPosition::End`, o `SubNavigationPosition::Top` para renderizar la sub-navegación como pestañas:

```php
use Filament\Pages\Enums\SubNavigationPosition;

protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;
```

## Eliminando páginas de resources

Si quieres eliminar una página de tu resource, puedes simplemente eliminar el archivo de página del directorio `Pages` de tu resource, y su entrada en el método `getPages()`.

Por ejemplo, puedes tener un resource con registros que no pueden ser creados por nadie. Elimina el archivo de página `Create`, y luego remuévelo de `getPages()`:

```php
public static function getPages(): array
{
    return [
        'index' => ListCustomers::route('/'),
        'edit' => EditCustomer::route('/{record}/edit'),
    ];
}
```

Eliminar una página no eliminará ninguna acción que enlace a esa página. Cualquier acción abrirá un modal en lugar de enviar al usuario a la página no existente. Por ejemplo, el `CreateAction` en la página List, el `EditAction` en la tabla o página View, o el `ViewAction` en la tabla o página Edit. Si quieres remover esos botones, debes eliminar las acciones también.

## Seguridad

## Autorización

Para autorización, Filament observará cualquier [policy de modelo](https://laravel.com/docs/authorization#creating-policies) que esté registrada en tu aplicación. Se usan los siguientes métodos:

- `viewAny()` se usa para ocultar completamente resources del menú de navegación, y previene que el usuario acceda a cualquier página.
- `create()` se usa para controlar [crear nuevos registros](creating-records).
- `update()` se usa para controlar [editar un registro](editing-records).
- `view()` se usa para controlar [ver un registro](viewing-records).
- `delete()` se usa para prevenir que un solo registro sea eliminado. `deleteAny()` se usa para prevenir que los registros sean eliminados en lote. Filament usa el método `deleteAny()` porque iterar a través de múltiples registros y verificar la policy `delete()` no es muy performante. Al usar un `DeleteBulkAction`, si quieres llamar al método `delete()` para cada registro de todos modos, deberías usar el método `DeleteBulkAction::make()->authorizeIndividualRecords()`. Cualquier registro que falle la verificación de autorización no será procesado.
- `forceDelete()` se usa para prevenir que un solo registro soft-deleted sea forzado a eliminarse. `forceDeleteAny()` se usa para prevenir que los registros sean forzados a eliminarse en lote. Filament usa el método `forceDeleteAny()` porque iterar a través de múltiples registros y verificar la policy `forceDelete()` no es muy performante. Al usar un `ForceDeleteBulkAction`, si quieres llamar al método `forceDelete()` para cada registro de todos modos, deberías usar el método `ForceDeleteBulkAction::make()->authorizeIndividualRecords()`. Cualquier registro que falle la verificación de autorización no será procesado.
- `restore()` se usa para prevenir que un solo registro soft-deleted sea restaurado. `restoreAny()` se usa para prevenir que los registros sean restaurados en lote. Filament usa el método `restoreAny()` porque iterar a través de múltiples registros y verificar la policy `restore()` no es muy performante. Al usar un `RestoreBulkAction`, si quieres llamar al método `restore()` para cada registro de todos modos, deberías usar el método `RestoreBulkAction::make()->authorizeIndividualRecords()`. Cualquier registro que falle la verificación de autorización no será procesado.
- `reorder()` se usa para controlar [reordenar registros en una tabla](listing-records#reordering-records).

### Omitiendo autorización

Si quieres omitir la autorización para un resource, puedes establecer la propiedad `$shouldSkipAuthorization` a `true`:

```php
protected static bool $shouldSkipAuthorization = true;
```

### Protegiendo atributos del modelo

Filament expondrá todos los atributos del modelo a JavaScript, excepto si están `$hidden` en tu modelo. Este es el comportamiento de Livewire para el binding de modelos. Preservamos esta funcionalidad para facilitar la adición y eliminación dinámica de campos de formulario después de que se cargan inicialmente, mientras se preservan los datos que pueden necesitar.

:::danger
Aunque los atributos pueden ser visibles en JavaScript, solo aquellos con un campo de formulario son realmente editables por el usuario. Esto no es un problema con la asignación masiva.
:::

Para remover ciertos atributos de JavaScript en las páginas Edit y View, puedes sobrescribir [el método `mutateFormDataBeforeFill()`](editing-records#customizing-data-before-filling-the-form):

```php
protected function mutateFormDataBeforeFill(array $data): array
{
    unset($data['is_admin']);

    return $data;
}
```

En este ejemplo, removemos el atributo `is_admin` de JavaScript, ya que no está siendo usado por el formulario.
