---
title: Gestionar relaciones
---

## Elegir la herramienta adecuada para el trabajo

Filament proporciona muchas formas de gestionar relaciones en la aplicación. La funcionalidad que debes usar depende del tipo de relación que estés gestionando y de la interfaz de usuario que busques.

### Relation managers - tablas interactivas debajo de los formularios de recursos

:::info
Estos son compatibles con relaciones `HasMany`, `HasManyThrough`, `BelongsToMany`, `MorphMany` y `MorphToMany`.
:::

Los [relation managers](#creating-a-relation-manager) son tablas interactivas que permiten a los administradores listar, crear, adjuntar, asociar, editar, desadjuntar, desasociar y eliminar registros relacionados sin salir de la página Edit o View del recurso.

### Select y checkbox list - elegir entre registros existentes o crear uno nuevo

:::info
Estos son compatibles con relaciones `BelongsTo`, `MorphTo` y `BelongsToMany`.
:::

Usando un [select](../forms/select#integrating-with-an-eloquent-relationship), los usuarios podrán elegir de una lista de registros existentes. También puedes [añadir un botón que permita crear un nuevo registro dentro de un modal](../forms/select#creating-new-records), sin salir de la página.

Cuando uses una relación `BelongsToMany` con un select, podrás seleccionar múltiples opciones, no solo una. Los registros se añadirán automáticamente a tu tabla pivot cuando envíes el formulario. Si lo deseas, puedes cambiar el dropdown multi-select por una simple [checkbox list](../forms/checkbox-list#integrating-with-an-eloquent-relationship). Ambos componentes funcionan de la misma manera.

### Repeaters - CRUD múltiples registros relacionados dentro del formulario del propietario

:::info
Estos son compatibles con relaciones `HasMany` y `MorphMany`.
:::

Los [Repeaters](../forms/repeater#integrating-with-an-eloquent-relationship) son componentes de formulario estándar, que pueden renderizar un conjunto repetible de campos infinitamente. Pueden conectarse a una relación, por lo que los registros se leen, crean, actualizan y eliminan automáticamente de la tabla relacionada. Viven dentro del esquema del formulario principal, y pueden usarse dentro de páginas de recursos, así como anidarse dentro de modales de acción.

Desde una perspectiva de UX, esta solución solo es adecuada si tu modelo relacionado solo tiene unos pocos campos. De lo contrario, el formulario puede volverse muy largo.

### Componentes de layout de formulario - guardar campos de formulario en una sola relación

:::info
Estos son compatibles con relaciones `BelongsTo`, `HasOne` y `MorphOne`.
:::

Todos los componentes de layout de formulario ([Grid](../schemas/layouts#grid-component), [Section](../schemas/sections), [Fieldset](../schemas/layouts#fieldset-component), etc.) tienen un [método `relationship()`](../forms/overview#saving-data-to-relationships). Cuando lo usas, todos los campos dentro de ese layout se guardan en el modelo relacionado en lugar del modelo propietario:

```php
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Fieldset;

Fieldset::make('Metadata')
    ->relationship('metadata')
    ->schema([
        TextInput::make('title'),
        Textarea::make('description'),
        FileUpload::make('image'),
    ])
```

En este ejemplo, el `title`, `description` e `image` se cargan automáticamente desde la relación `metadata`, y se guardan nuevamente cuando se envía el formulario. Si el registro `metadata` no existe, se crea automáticamente.

Esta funcionalidad se explica más en profundidad en la [documentación de Forms](../forms/overview#saving-data-to-relationships). Por favor visita esa página para más información sobre cómo usarla.

## Crear un relation manager

Para crear un relation manager, puedes usar el comando `make:filament-relation-manager`:

```bash
php artisan make:filament-relation-manager CategoryResource posts title
```

- `CategoryResource` es el nombre de la clase del recurso para el modelo propietario (padre).
- `posts` es el nombre de la relación que quieres gestionar.
- `title` es el nombre del atributo que se usará para identificar posts.

Esto creará un archivo `CategoryResource/RelationManagers/PostsRelationManager.php`. Este contiene una clase donde puedes definir un [form](overview#resource-forms) y [table](overview#resource-tables) para tu relation manager:

```php
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

public function form(Schema $schema): Schema
{
    return $schema
        ->components([
            Forms\Components\TextInput::make('title')->required(),
            // ...
        ]);
}

public function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('title'),
            // ...
        ]);
}
```

Debes registrar el nuevo relation manager en el método `getRelations()` de tu recurso:

```php
public static function getRelations(): array
{
    return [
        RelationManagers\PostsRelationManager::class,
    ];
}
```

Una vez que se hayan definido una tabla y un formulario para el relation manager, visita la página [Edit](editing-records) o [View](viewing-records) de tu recurso para verlo en acción.

### Personalizar el parámetro URL del relation manager

Si pasas una clave al array devuelto por `getRelations()`, se usará en la URL para ese relation manager al cambiar entre múltiples relation managers. Por ejemplo, puedes pasar `posts` para usar `?relation=posts` en la URL en lugar de un índice numérico del array:

```php
public static function getRelations(): array
{
    return [
        'posts' => RelationManagers\PostsRelationManager::class,
    ];
}
```

### Modo solo lectura

Los relation managers usualmente se muestran en la página Edit o View de un recurso. En la página View, Filament automáticamente ocultará todas las acciones que modifican la relación, como crear, editar y eliminar. Llamamos a esto "modo solo lectura", y está ahí por defecto para preservar el comportamiento de solo lectura de la página View. Sin embargo, puedes deshabilitar este comportamiento, sobrescribiendo el método `isReadOnly()` en la clase del relation manager para que devuelva `false` siempre:

```php
public function isReadOnly(): bool
{
    return false;
}
```

Alternativamente, si odias esta funcionalidad, puedes deshabilitarla para todos los relation managers a la vez en la [configuración](../panel-configuration) del panel:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->readOnlyRelationManagersOnResourceViewPagesByDefault(false);
}
```

### Nombres de relación inversa no convencionales

Para relaciones inversas que no siguen las pautas de nomenclatura de Laravel, puedes usar el método `inverseRelationship()` en la tabla:

```php
use Filament\Tables;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('title'),
            // ...
        ])
        ->inverseRelationship('section'); // Como el modelo relacionado inverso es `Category`, esto normalmente es `category`, no `section`.
}
```

### Manejo de soft-deletes

Por defecto, no podrás interactuar con registros eliminados en el relation manager. Si deseas añadir funcionalidad para restaurar, eliminar permanentemente y filtrar registros eliminados en tu relation manager, usa la opción `--soft-deletes` al generar el relation manager:

```bash
php artisan make:filament-relation-manager CategoryResource posts title --soft-deletes
```

Puedes encontrar más información sobre soft-deleting [aquí](#deleting-records).

## Listar registros relacionados

Los registros relacionados se listarán en una tabla. Todo el relation manager se basa en esta tabla, que contiene acciones para [crear](#creating-related-records), [editar](#editing-related-records), [adjuntar / desadjuntar](#attaching-and-detaching-records), [asociar / desasociar](#associating-and-dissociating-records), y eliminar registros.

Puedes usar cualquier funcionalidad del [Table Builder](../tables) para personalizar relation managers.

### Listar con atributos pivot

Para relaciones `BelongsToMany` y `MorphToMany`, también puedes añadir atributos de tabla pivot. Por ejemplo, si tienes un `TeamsRelationManager` para tu `UserResource`, y quieres añadir el atributo pivot `role` a la tabla, puedes usar:

```php
use Filament\Tables;

public function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('name'),
            Tables\Columns\TextColumn::make('role'),
        ]);
}
```

Por favor asegúrate de que cualquier atributo pivot esté listado en el método `withPivot()` de la relación *y* la relación inversa.

## Crear registros relacionados

### Crear con atributos pivot

Para relaciones `BelongsToMany` y `MorphToMany`, también puedes añadir atributos de tabla pivot. Por ejemplo, si tienes un `TeamsRelationManager` para tu `UserResource`, y quieres añadir el atributo pivot `role` al formulario de creación, puedes usar:

```php
use Filament\Forms;
use Filament\Schemas\Schema;

public function form(Schema $schema): Schema
{
    return $schema
        ->components([
            Forms\Components\TextInput::make('name')->required(),
            Forms\Components\TextInput::make('role')->required(),
            // ...
        ]);
}
```

Por favor asegúrate de que cualquier atributo pivot esté listado en el método `withPivot()` de la relación *y* la relación inversa.

### Personalizar el `CreateAction`

Para aprender cómo personalizar el `CreateAction`, incluyendo mutar los datos del formulario, cambiar la notificación, y añadir hooks de ciclo de vida, por favor consulta la [documentación de Actions](../actions/create).

## Editar registros relacionados

### Editar con atributos pivot

Para relaciones `BelongsToMany` y `MorphToMany`, también puedes editar atributos de tabla pivot. Por ejemplo, si tienes un `TeamsRelationManager` para tu `UserResource`, y quieres añadir el atributo pivot `role` al formulario de edición, puedes usar:

```php
use Filament\Forms;
use Filament\Schemas\Schema;

public function form(Schema $schema): Schema
{
    return $schema
        ->components([
            Forms\Components\TextInput::make('name')->required(),
            Forms\Components\TextInput::make('role')->required(),
            // ...
        ]);
}
```

Por favor asegúrate de que cualquier atributo pivot esté listado en el método `withPivot()` de la relación *y* la relación inversa.

### Personalizar el `EditAction`

Para aprender cómo personalizar el `EditAction`, incluyendo mutar los datos del formulario, cambiar la notificación, y añadir hooks de ciclo de vida, por favor consulta la [documentación de Actions](../actions/edit).

## Adjuntar y desadjuntar registros

Filament puede adjuntar y desadjuntar registros para relaciones `BelongsToMany` y `MorphToMany`.

Al generar tu relation manager, puedes pasar la opción `--attach` para también añadir `AttachAction`, `DetachAction` y `DetachBulkAction` a la tabla:

```bash
php artisan make:filament-relation-manager CategoryResource posts title --attach
```

Alternativamente, si ya has generado tu recurso, puedes simplemente añadir las acciones a los arrays `$table`:

```php
use Filament\Actions\AttachAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DetachAction;
use Filament\Actions\DetachBulkAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->headerActions([
            // ...
            AttachAction::make(),
        ])
        ->recordActions([
            // ...
            DetachAction::make(),
        ])
        ->toolbarActions([
            BulkActionGroup::make([
                // ...
                DetachBulkAction::make(),
            ]),
        ]);
}
```

### Precargar las opciones del select del modal de adjuntar

Por defecto, mientras buscas un registro para adjuntar, las opciones se cargarán desde la base de datos vía AJAX. Si deseas precargar estas opciones cuando el formulario se carga por primera vez, puedes usar el método `preloadRecordSelect()` de `AttachAction`:

```php
use Filament\Actions\AttachAction;

AttachAction::make()
    ->preloadRecordSelect()
```

### Adjuntar con atributos pivot

Cuando adjuntas un registro con el botón `Attach`, puedes definir un formulario personalizado para añadir atributos pivot a la relación:

```php
use Filament\Actions\AttachAction;
use Filament\Forms;

AttachAction::make()
    ->schema(fn (AttachAction $action): array => [
        $action->getRecordSelect(),
        Forms\Components\TextInput::make('role')->required(),
    ])
```

En este ejemplo, `$action->getRecordSelect()` devuelve el campo select para elegir el registro a adjuntar. El input de texto `role` se guarda entonces en la columna `role` de la tabla pivot.

Por favor asegúrate de que cualquier atributo pivot esté listado en el método `withPivot()` de la relación *y* la relación inversa.

### Delimitar las opciones para adjuntar

Puedes delimitar las opciones disponibles para `AttachAction`:

```php
use Filament\Actions\AttachAction;
use Illuminate\Database\Eloquent\Builder;

AttachAction::make()
    ->recordSelectOptionsQuery(fn (Builder $query) => $query->whereBelongsTo(auth()->user()))
```

### Buscar las opciones para adjuntar en múltiples columnas

Por defecto, las opciones disponibles para `AttachAction` se buscarán en el `recordTitleAttribute()` de la tabla. Si deseas buscar en múltiples columnas, puedes usar el método `recordSelectSearchColumns()`:

```php
use Filament\Actions\AttachAction;

AttachAction::make()
    ->recordSelectSearchColumns(['title', 'description'])
```

### Adjuntar múltiples registros

El método `multiple()` en el componente `AttachAction` te permite seleccionar múltiples valores:

```php
use Filament\Actions\AttachAction;

AttachAction::make()
    ->multiple()
```

### Personalizar el campo select en el modal de adjuntar

Puedes personalizar el objeto del campo select que se usa durante la adjunción pasando una función al método `recordSelect()`:

```php
use Filament\Actions\AttachAction;
use Filament\Forms\Components\Select;

AttachAction::make()
    ->recordSelect(
        fn (Select $select) => $select->placeholder('Selecciona un post'),
    )
```

### Manejar duplicados

Por defecto, no se te permitirá adjuntar un registro más de una vez. Esto es porque también debes configurar una columna `id` primaria en la tabla pivot para que esta funcionalidad funcione.

Por favor asegúrate de que el atributo `id` esté listado en el método `withPivot()` de la relación *y* la relación inversa.

Finalmente, añade el método `allowDuplicates()` a la tabla:

```php
public function table(Table $table): Table
{
    return $table
        ->allowDuplicates();
}
```

### Mejorar el rendimiento de las acciones masivas de desadjuntar

Por defecto, el `DetachBulkAction` cargará todos los registros Eloquent en memoria, antes de hacer un bucle sobre ellos y desadjuntarlos uno por uno.

Si estás desadjuntando un gran número de registros, puedes usar el método `chunkSelectedRecords()` para obtener un número menor de registros a la vez. Esto reducirá el uso de memoria de tu aplicación:

```php
use Filament\Actions\DetachBulkAction;

DetachBulkAction::make()
    ->chunkSelectedRecords(250)
```

Filament carga registros Eloquent en memoria antes de desadjuntarlos por dos razones:

- Para permitir que registros individuales en la colección sean autorizados con una policy de modelo antes de desadjuntar (usando `authorizeIndividualRecords('delete')`, por ejemplo).
- Para asegurar que los eventos del modelo se ejecuten al desadjuntar registros, como los eventos `deleting` y `deleted` en un observer de modelo.

Si no requieres autorización de policy de registro individual y eventos de modelo, puedes usar el método `fetchSelectedRecords(false)`, que no obtendrá los registros en memoria antes de desadjuntarlos, y en su lugar los desadjuntará en una sola consulta:

```php
use Filament\Actions\DetachBulkAction;

DetachBulkAction::make()
    ->fetchSelectedRecords(false)
```

## Asociar y desasociar registros

Filament puede asociar y desasociar registros para relaciones `HasMany` y `MorphMany`.

Al generar tu relation manager, puedes pasar la opción `--associate` para también añadir `AssociateAction`, `DissociateAction` y `DissociateBulkAction` a la tabla:

```bash
php artisan make:filament-relation-manager CategoryResource posts title --associate
```

Alternativamente, si ya has generado tu recurso, puedes simplemente añadir las acciones a los arrays `$table`:

```php
use Filament\Actions\AssociateAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DissociateAction;
use Filament\Actions\DissociateBulkAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->headerActions([
            // ...
            AssociateAction::make(),
        ])
        ->recordActions([
            // ...
            DissociateAction::make(),
        ])
        ->toolbarActions([
            BulkActionGroup::make([
                // ...
                DissociateBulkAction::make(),
            ]),
        ]);
}
```

### Precargar las opciones del select del modal de asociar

Por defecto, mientras buscas un registro para asociar, las opciones se cargarán desde la base de datos vía AJAX. Si deseas precargar estas opciones cuando el formulario se carga por primera vez, puedes usar el método `preloadRecordSelect()` de `AssociateAction`:

```php
use Filament\Actions\AssociateAction;

AssociateAction::make()
    ->preloadRecordSelect()
```

### Delimitar las opciones para asociar

Puedes delimitar las opciones disponibles para `AssociateAction`:

```php
use Filament\Actions\AssociateAction;
use Illuminate\Database\Eloquent\Builder;

AssociateAction::make()
    ->recordSelectOptionsQuery(fn (Builder $query) => $query->whereBelongsTo(auth()->user()))
```

### Buscar las opciones para asociar en múltiples columnas

Por defecto, las opciones disponibles para `AssociateAction` se buscarán en el `recordTitleAttribute()` de la tabla. Si deseas buscar en múltiples columnas, puedes usar el método `recordSelectSearchColumns()`:

```php
use Filament\Actions\AssociateAction;

AssociateAction::make()
    ->recordSelectSearchColumns(['title', 'description'])
```

### Asociar múltiples registros

El método `multiple()` en el componente `AssociateAction` te permite seleccionar múltiples valores:

```php
use Filament\Actions\AssociateAction;

AssociateAction::make()
    ->multiple()
```

### Personalizar el campo select en el modal de asociar

Puedes personalizar el objeto del campo select que se usa durante la asociación pasando una función al método `recordSelect()`:

```php
use Filament\Actions\AssociateAction;
use Filament\Forms\Components\Select;

AssociateAction::make()
    ->recordSelect(
        fn (Select $select) => $select->placeholder('Selecciona un post'),
    )
```

### Mejorar el rendimiento de las acciones masivas de desasociar

Por defecto, el `DissociateBulkAction` cargará todos los registros Eloquent en memoria, antes de hacer un bucle sobre ellos y desasociarlos uno por uno.

Si estás desasociando un gran número de registros, puedes usar el método `chunkSelectedRecords()` para obtener un número menor de registros a la vez. Esto reducirá el uso de memoria de tu aplicación:

```php
use Filament\Actions\DissociateBulkAction;

DissociateBulkAction::make()
    ->chunkSelectedRecords(250)
```

Filament carga registros Eloquent en memoria antes de desasociarlos por dos razones:

- Para permitir que registros individuales en la colección sean autorizados con una policy de modelo antes de desasociar (usando `authorizeIndividualRecords('update')`, por ejemplo).
- Para asegurar que los eventos del modelo se ejecuten al desasociar registros, como los eventos `updating` y `updated` en un observer de modelo.

Si no requieres autorización de policy de registro individual y eventos de modelo, puedes usar el método `fetchSelectedRecords(false)`, que no obtendrá los registros en memoria antes de desasociarlos, y en su lugar los desasociará en una sola consulta:

```php
use Filament\Actions\DissociateBulkAction;

DissociateBulkAction::make()
    ->fetchSelectedRecords(false)
```

## Ver registros relacionados

Al generar tu relation manager, puedes pasar la opción `--view` para también añadir un `ViewAction` a la tabla:

```bash
php artisan make:filament-relation-manager CategoryResource posts title --view
```

Alternativamente, si ya has generado tu relation manager, puedes simplemente añadir el `ViewAction` al array `$table->recordActions()`:

```php
use Filament\Actions\ViewAction;
use Filament\Tables\Table;

public function table(Table $table): Table
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

## Eliminar registros relacionados

Por defecto, no podrás interactuar con registros eliminados en el relation manager. Si deseas añadir funcionalidad para restaurar, eliminar permanentemente y filtrar registros eliminados en tu relation manager, usa la opción `--soft-deletes` al generar el relation manager:

```bash
php artisan make:filament-relation-manager CategoryResource posts title --soft-deletes
```

Alternativamente, puedes añadir funcionalidad de soft-deleting a un relation manager existente:

```php
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

public function table(Table $table): Table
{
    return $table
        ->modifyQueryUsing(fn (Builder $query) => $query->withoutGlobalScopes([
            SoftDeletingScope::class,
        ]))
        ->columns([
            // ...
        ])
        ->filters([
            TrashedFilter::make(),
            // ...
        ])
        ->recordActions([
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
            // ...
        ])
        ->toolbarActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
                ForceDeleteBulkAction::make(),
                RestoreBulkAction::make(),
                // ...
            ]),
        ]);
}
```

### Personalizar el `DeleteAction`

Para aprender cómo personalizar el `DeleteAction`, incluyendo cambiar la notificación y añadir hooks de ciclo de vida, por favor consulta la [documentación de Actions](../actions/delete).

## Importar registros relacionados

El [`ImportAction`](../actions/import) puede añadirse al encabezado de un relation manager para importar registros. En este caso, probablemente quieras decirle al importador a qué propietario pertenecen estos nuevos registros. Puedes usar [opciones de importación](../actions/import#using-import-options) para pasar el ID del registro propietario:

```php
ImportAction::make()
    ->importer(ProductImporter::class)
    ->options(['categoryId' => $this->getOwnerRecord()->getKey()])
```

Ahora, en la clase del importador, puedes asociar el propietario en una relación uno-a-muchos con el registro importado:

```php
public function resolveRecord(): ?Product
{
    $product = Product::firstOrNew([
        'sku' => $this->data['sku'],
    ]);

    $product->category()->associate($this->options['categoryId']);

    return $product;
}
```

Alternativamente, puedes adjuntar el registro en una relación muchos-a-muchos usando el hook `afterSave()` del importador:

```php
protected function afterSave(): void
{
    $this->record->categories()->syncWithoutDetaching([$this->options['categoryId']]);
}
```

## Acceder al registro propietario de la relación

Los relation managers son componentes Livewire. Cuando se cargan por primera vez, el registro propietario (el registro Eloquent que sirve como padre - el modelo del recurso principal) se guarda en una propiedad. Puedes leer esta propiedad usando:

```php
$this->getOwnerRecord()
```

Sin embargo, si estás dentro de un método `static` como `form()` o `table()`, `$this` no es accesible. Así que, puedes [usar un callback](../forms/overview#field-utility-injection) para acceder a la instancia `$livewire`:

```php
use Filament\Forms;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;

public function form(Schema $schema): Schema
{
    return $schema
        ->components([
            Forms\Components\Select::make('store_id')
                ->options(function (RelationManager $livewire): array {
                    return $livewire->getOwnerRecord()->stores()
                        ->pluck('name', 'id')
                        ->toArray();
                }),
            // ...
        ]);
}
```

Todos los métodos en Filament aceptan un callback en el que puedes acceder a `$livewire->ownerRecord`.

## Agrupar relation managers

Puedes elegir agrupar relation managers juntos en una pestaña. Para hacer esto, puedes envolver múltiples managers en un objeto `RelationGroup`, con una etiqueta:

```php
use Filament\Resources\RelationManagers\RelationGroup;

public static function getRelations(): array
{
    return [
        // ...
        RelationGroup::make('Contactos', [
            RelationManagers\IndividualsRelationManager::class,
            RelationManagers\OrganizationsRelationManager::class,
        ]),
        // ...
    ];
}
```

## Mostrar relation managers condicionalmente

Por defecto, los relation managers serán visibles si el método `viewAny()` para la policy del modelo relacionado devuelve `true`.

Puedes usar el método `canViewForRecord()` para determinar si el relation manager debe ser visible para un registro propietario específico y página:

```php
use Illuminate\Database\Eloquent\Model;

public static function canViewForRecord(Model $ownerRecord, string $pageClass): bool
{
    return $ownerRecord->status === Status::Draft;
}
```

## Combinar las pestañas del relation manager con el formulario

En la clase de la página Edit o View, sobrescribe el método `hasCombinedRelationManagerTabsWithContent()`:

```php
public function hasCombinedRelationManagerTabsWithContent(): bool
{
    return true;
}
```

### Personalizar la pestaña de contenido

En la clase de la página Edit o View, sobrescribe el método `getContentTabComponent()`, y usa cualquier método de personalización de [Tab](../schemas/tabs):

```php
use Filament\Schemas\Components\Tabs\Tab;

public function getContentTabComponent(): Tab
{
    return Tab::make('Configuración')
        ->icon('heroicon-m-cog');
}
```

### Establecer la posición de la pestaña del formulario

Por defecto, la pestaña del formulario se renderiza antes de las pestañas de relación. Para renderizarla después, puedes sobrescribir el método `getContentTabPosition()` en la clase de la página Edit o View:

```php
use Filament\Resources\Pages\Enums\ContentTabPosition;

public function getContentTabPosition(): ?ContentTabPosition
{
    return ContentTabPosition::After;
}
```

## Personalizar pestañas de relation manager

Para personalizar la pestaña de un relation manager, sobrescribe el método `getTabComponent()`, y usa cualquier método de personalización de [Tab](../schemas/tabs):

```php
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Model;

public static function getTabComponent(Model $ownerRecord, string $pageClass): Tab
{
    return Tab::make('Posts del blog')
        ->badge($ownerRecord->posts()->count())
        ->badgeColor('info')
        ->badgeTooltip('El número de posts en esta categoría')
        ->icon('heroicon-m-document-text');
}
```

Si estás usando un [grupo de relación](#grouping-relation-managers), puedes usar el método `tab()`:

```php
use Filament\Resources\RelationManagers\RelationGroup;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Model;

RelationGroup::make('Contactos', [
    // ...
])
    ->tab(fn (Model $ownerRecord): Tab => Tab::make('Posts del blog')
        ->badge($ownerRecord->posts()->count())
        ->badgeColor('info')
        ->badgeTooltip('El número de posts en esta categoría')
        ->icon('heroicon-m-document-text'));
```

## Compartir el formulario y tabla de un recurso con un relation manager

Puedes decidir que quieres que el formulario y tabla de un recurso sean idénticos a los de un relation manager, y posteriormente querer reutilizar el código que escribiste previamente. Esto es fácil, llamando a los métodos `form()` y `table()` del recurso desde el relation manager:

```php
use App\Filament\Resources\Blog\Posts\PostResource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

public function form(Schema $schema): Schema
{
    return PostResource::form($schema);
}

public function table(Table $table): Table
{
    return PostResource::table($table);
}
```

### Ocultar un componente de formulario compartido en el relation manager

Si estás compartiendo un componente de formulario del recurso con el relation manager, puedes querer ocultarlo en el relation manager. Esto es especialmente útil si quieres ocultar un campo `Select` para el registro propietario en el relation manager, ya que Filament se encargará de esto por ti de todos modos. Para hacer esto, puedes usar el método `hiddenOn()`, pasando el nombre del relation manager:

```php
use App\Filament\Resources\Blog\Posts\PostResource\RelationManagers\CommentsRelationManager;
use Filament\Forms\Components\Select;

Select::make('post_id')
    ->relationship('post', 'title')
    ->hiddenOn(CommentsRelationManager::class)
```

### Ocultar una columna de tabla compartida en el relation manager

Si estás compartiendo una columna de tabla del recurso con el relation manager, puedes querer ocultarla en el relation manager. Esto es especialmente útil si quieres ocultar una columna para el registro propietario en el relation manager, ya que esto no es apropiado cuando el registro propietario ya está listado arriba del relation manager. Para hacer esto, puedes usar el método `hiddenOn()`, pasando el nombre del relation manager:

```php
use App\Filament\Resources\Blog\Posts\PostResource\RelationManagers\CommentsRelationManager;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('post.title')
    ->hiddenOn(CommentsRelationManager::class)
```

### Ocultar un filtro de tabla compartido en el relation manager

Si estás compartiendo un filtro de tabla del recurso con el relation manager, puedes querer ocultarlo en el relation manager. Esto es especialmente útil si quieres ocultar un filtro para el registro propietario en el relation manager, ya que esto no es apropiado cuando la tabla ya está filtrada por el registro propietario. Para hacer esto, puedes usar el método `hiddenOn()`, pasando el nombre del relation manager:

```php
use App\Filament\Resources\Blog\Posts\PostResource\RelationManagers\CommentsRelationManager;
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('post')
    ->relationship('post', 'title')
    ->hiddenOn(CommentsRelationManager::class)
```

### Sobrescribir configuración compartida en el relation manager

Cualquier configuración que hagas dentro del recurso puede ser sobrescrita en el relation manager. Por ejemplo, si quisieras deshabilitar la paginación en la tabla heredada del relation manager pero no en el recurso mismo:

```php
use App\Filament\Resources\Blog\Posts\PostResource;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return PostResource::table($table)
        ->paginated(false);
}
```

Probablemente también sea útil proporcionar configuración extra en el relation manager si quisieras añadir una acción de encabezado para [crear](#creating-related-records), [adjuntar](#attaching-and-detaching-records), o [asociar](#associating-and-dissociating-records) registros en el relation manager:

```php
use App\Filament\Resources\Blog\Posts\PostResource;
use Filament\Actions\AttachAction;
use Filament\Actions\CreateAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return PostResource::table($table)
        ->headerActions([
            CreateAction::make(),
            AttachAction::make(),
        ]);
}
```

## Personalizar la consulta Eloquent del relation manager

Puedes aplicar tus propias restricciones de consulta o [scopes de modelo](https://laravel.com/docs/eloquent#query-scopes) que afecten a todo el relation manager. Para hacer esto, puedes pasar una función al método `modifyQueryUsing()` de la tabla, dentro de la cual puedes personalizar la consulta:

```php
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;

public function table(Table $table): Table
{
    return $table
        ->modifyQueryUsing(fn (Builder $query) => $query->where('is_active', true))
        ->columns([
            // ...
        ]);
}
```

## Personalizar el título del relation manager

Para establecer el título del relation manager, puedes usar la propiedad `$title` en la clase del relation manager:

```php
protected static ?string $title = 'Posts';
```

Para establecer el título del relation manager dinámicamente, puedes sobrescribir el método `getTitle()` en la clase del relation manager:

```php
use Illuminate\Database\Eloquent\Model;

public static function getTitle(Model $ownerRecord, string $pageClass): string
{
    return __('relation-managers.posts.title');
}
```

El título se reflejará en el [encabezado de la tabla](../tables/overview#customizing-the-table-header), así como en la pestaña del relation manager si hay más de uno. Si quieres personalizar el encabezado de la tabla independientemente, aún puedes usar el método `$table->heading()`:

```php
use Filament\Tables;

public function table(Table $table): Table
{
    return $table
        ->heading('Posts')
        ->columns([
            // ...
        ]);
}
```

## Personalizar el título del registro del relation manager

El relation manager usa el concepto de un "atributo de título de registro" para determinar qué atributo del modelo relacionado debe usarse para identificarlo. Al crear un relation manager, este atributo se pasa como el tercer argumento al comando `make:filament-relation-manager`:

```bash
php artisan make:filament-relation-manager CategoryResource posts title
```

En este ejemplo, el atributo `title` del modelo `Post` se usará para identificar un post en el relation manager.

Esto se usa principalmente por las clases de acción. Por ejemplo, cuando [adjuntas](#attaching-and-detaching-records) o [asocias](#associating-and-dissociating-records) un registro, los títulos se listarán en el campo select. Cuando [editas](#editing-related-records), [ves](#viewing-related-records) o [eliminas](#deleting-related-records) un registro, el título se usará en el encabezado del modal.

En algunos casos, puedes querer concatenar múltiples atributos juntos para formar un título. Puedes hacer esto reemplazando el método de configuración `recordTitleAttribute()` con `recordTitle()`, pasando una función que transforme un modelo en un título:

```php
use App\Models\Post;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->recordTitle(fn (Post $record): string => "{$record->title} ({$record->id})")
        ->columns([
            // ...
        ]);
}
```

Si estás usando `recordTitle()`, y tienes una [acción de asociar](#associating-and-dissociating-records) o [acción de adjuntar](#attaching-and-detaching-records), también querrás especificar columnas de búsqueda para esas acciones:

```php
use Filament\Actions\AssociateAction;
use Filament\Actions\AttachAction;

AssociateAction::make()
    ->recordSelectSearchColumns(['title', 'id']);

AttachAction::make()
    ->recordSelectSearchColumns(['title', 'id'])
```

## Páginas de relación

Usar una página `ManageRelatedRecords` es una alternativa a usar un relation manager, si quieres mantener la funcionalidad de gestionar una relación separada de editar o ver el registro propietario.

Esta funcionalidad es ideal si estás usando [sub-navegación de recursos](overview#resource-sub-navigation), ya que puedes cambiar fácilmente entre la página View o Edit y la página de relación.

Para crear una página de relación, debes usar el comando `make:filament-page`:

```bash
php artisan make:filament-page ManageCustomerAddresses --resource=CustomerResource --type=ManageRelatedRecords
```

Cuando ejecutes este comando, se te hará una serie de preguntas para personalizar la página, por ejemplo, el nombre de la relación y su atributo de título.

Debes registrar esta nueva página en el método `getPages()` de tu recurso:

```php
public static function getPages(): array
{
    return [
        'index' => Pages\ListCustomers::route('/'),
        'create' => Pages\CreateCustomers::route('/create'),
        'view' => Pages\ViewCustomer::route('/{record}'),
        'edit' => Pages\EditCustomer::route('/{record}/edit'),
        'addresses' => Pages\ManageCustomerAddresses::route('/{record}/addresses'),
    ];
}
```

:::warning
Cuando uses una página de relación, no necesitas generar un relation manager con `make:filament-relation-manager`, y no necesitas registrarlo en el método `getRelations()` del recurso.
:::

Ahora, puedes personalizar la página exactamente de la misma manera que un relation manager, con los mismos métodos `table()` y `form()`.

### Añadir páginas de relación a la sub-navegación de recursos

Si estás usando [sub-navegación de recursos](overview#resource-sub-navigation), puedes registrar esta página normalmente en `getRecordSubNavigation()` del recurso:

```php
use App\Filament\Resources\Customers\Pages;
use Filament\Resources\Pages\Page;

public static function getRecordSubNavigation(Page $page): array
{
    return $page->generateNavigationItems([
        // ...
        Pages\ManageCustomerAddresses::class,
    ]);
}
```

## Pasar propiedades a relation managers

Al registrar un relation manager en un recurso, puedes usar el método `make()` para pasar un array de [propiedades de Livewire](https://livewire.laravel.com/docs/properties) a él:

```php
use App\Filament\Resources\Blog\Posts\PostResource\RelationManagers\CommentsRelationManager;

public static function getRelations(): array
{
    return [
        CommentsRelationManager::make([
            'status' => 'approved',
        ]),
    ];
}
```

Este array de propiedades se mapea a [propiedades públicas de Livewire](https://livewire.laravel.com/docs/properties) en la clase del relation manager:

```php
use Filament\Resources\RelationManagers\RelationManager;

class CommentsRelationManager extends RelationManager
{
    public string $status;

    // ...
}
```

Ahora, puedes acceder al `status` en la clase del relation manager usando `$this->status`.

## Deshabilitar lazy loading

Por defecto, los relation managers se cargan de forma lazy. Esto significa que solo se cargarán cuando sean visibles en la página.

Para deshabilitar este comportamiento, puedes sobrescribir la propiedad `$isLazy` en la clase del relation manager:

```php
protected static bool $isLazy = false;
```
