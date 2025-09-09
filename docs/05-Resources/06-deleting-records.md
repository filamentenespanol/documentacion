---
title: Eliminar registros
---

## Manejo de soft-deletes

## Crear un recurso con soft-delete

Por defecto, no podrás interactuar con registros eliminados en la aplicación.  
Si deseas añadir funcionalidad para restaurar, eliminar permanentemente y filtrar registros eliminados (*trashed*) en tu recurso, usa la opción `--soft-deletes` al generar el recurso:

```bash
php artisan make:filament-resource Customer --soft-deletes
```

## Añadir soft-deletes a un recurso existente

También puedes agregar funcionalidad de *soft-delete* a un recurso ya existente.

Primero, debes actualizar el recurso:

```php
use Filament\Actions\BulkActionGroup;
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

public static function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->filters([
            TrashedFilter::make(),
            // ...
        ])
        ->recordActions([
            // Puedes añadir estas acciones a tu tabla si usas un recurso simple,
            // o si solo quieres poder eliminar registros sin salir de la tabla.
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

public static function getRecordRouteBindingEloquentQuery(): Builder
{
    return parent::getRecordRouteBindingEloquentQuery()
        ->withoutGlobalScopes([
            SoftDeletingScope::class,
        ]);
}
```

Ahora, actualiza la clase de la página Edit si tienes una:

```php
use Filament\Actions;

protected function getHeaderActions(): array
{
    return [
        Actions\DeleteAction::make(),
        Actions\ForceDeleteAction::make(),
        Actions\RestoreAction::make(),
        // ...
    ];
}
```

## Eliminar registros desde la página List

Por defecto, puedes eliminar registros en bloque dentro de tu tabla.  
También puedes permitir eliminar un registro individual usando `DeleteAction`:

```php
use Filament\Actions\DeleteAction;
use Filament\Tables\Table;

public static function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->recordActions([
            // ...
            DeleteAction::make(),
        ]);
}
```

## Autorización

Para la autorización, Filament observará las [policies de modelos](https://laravel.com/docs/authorization#creating-policies) registradas en tu aplicación.

- Los usuarios podrán eliminar registros si el método `delete()` de la policy retorna `true`.  
- También podrán eliminar en bloque si el método `deleteAny()` retorna `true`.  
  Filament usa `deleteAny()` porque iterar entre múltiples registros y comprobar `delete()` no es eficiente.

Puedes usar el método `authorizeIndividualRecords()` en `BulkDeleteAction` para comprobar la policy `delete()` en cada registro individualmente.

### Autorización de soft-deletes

- El método `forceDelete()` de la policy se usa para evitar que un registro eliminado sea eliminado permanentemente.  
- El método `forceDeleteAny()` evita que múltiples registros eliminados sean eliminados permanentemente en bloque.  

Filament usa `forceDeleteAny()` por eficiencia.  

- El método `restore()` evita que un registro eliminado sea restaurado.  
- El método `restoreAny()` evita restauraciones masivas.  

Filament usa `restoreAny()` porque resulta más eficiente que revisar `restore()` en cada registro.
