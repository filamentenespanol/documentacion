---
title: Acciones
---

## Introducción

Las tablas de Filament pueden usar [Acciones](../actions). Son botones que pueden añadirse al [final de cualquier fila de tabla](#acciones-de-registro), o incluso en el [encabezado](#acciones-de-encabezado) o [barra de herramientas](#acciones-de-barra-de-herramientas) de una tabla. Por ejemplo, puedes querer una acción para "crear" un nuevo registro en el encabezado, y luego acciones de "editar" y "eliminar" en cada fila. Las [acciones masivas](#acciones-masivas) pueden usarse para ejecutar código cuando se seleccionan registros en la tabla. Además, las acciones pueden añadirse a cualquier [columna de tabla](#acciones-de-columna), de modo que cada celda en esa columna sea un disparador para tu acción.

Es altamente recomendable que leas la documentación sobre [personalización de botones de activación de acciones](../actions/overview) y [modales de acciones](../actions/modals) para que estés al tanto de todas las capacidades de las acciones.

## Acciones de registro

Los botones de acción pueden renderizarse al final de cada fila de tabla. Puedes colocarlos en el método `$table->recordActions()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->recordActions([
            // ...
        ]);
}
```

Las acciones pueden crearse usando el método estático `make()`, pasando su nombre único.

Luego puedes pasar una función a `action()` que ejecute la tarea, o una función a `url()` que cree un enlace:

```php
use App\Models\Post;
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (Post $record): string => route('posts.edit', $record))
    ->openUrlInNewTab()

Action::make('delete')
    ->requiresConfirmation()
    ->action(fn (Post $record) => $record->delete())
```

Todos los métodos en la acción aceptan funciones callback, donde puedes acceder al `$record` actual de la tabla que fue clickeado.

### Posicionar acciones de registro antes de las columnas

Por defecto, las acciones de registro en tu tabla se renderizan en la celda final de cada fila. Puedes moverlas antes de las columnas usando el argumento `position`:

```php
use Filament\Tables\Enums\RecordActionsPosition;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->recordActions([
            // ...
        ], position: RecordActionsPosition::BeforeColumns);
}
```

### Posicionar acciones de registro antes de la columna de checkbox

Por defecto, las acciones de registro en tu tabla se renderizan en la celda final de cada fila. Puedes moverlas antes de la columna de checkbox usando el argumento `position`:

```php
use Filament\Tables\Enums\RecordActionsPosition;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->recordActions([
            // ...
        ], position: RecordActionsPosition::BeforeCells);
}
```

### Configuración global de acciones de registro

Para personalizar la configuración por defecto usada para acciones de registro no agrupadas, puedes usar `modifyUngroupedRecordActionsUsing()` desde una función [`Table::configureUsing()`](overview#global-settings) en el método `boot()` de un service provider:

```php
use Filament\Actions\Action;
use Filament\Tables\Table;

Table::configureUsing(function (Table $table): void {
    $table
        ->modifyUngroupedRecordActionsUsing(fn (Action $action) => $action->iconButton());
});
```

### Acceder a las filas seleccionadas de la tabla

Puedes querer que una acción sea capaz de acceder a todas las filas seleccionadas en la tabla. Usualmente, esto se hace con una [acción masiva](#acciones-masivas) en el encabezado de la tabla. Sin embargo, puedes querer hacer esto con una acción de fila, donde las filas seleccionadas proporcionan contexto para la acción.

Por ejemplo, puedes querer tener una acción de fila que copie los datos de la fila a todos los registros seleccionados. Para forzar que la tabla sea seleccionable, incluso si no hay acciones masivas definidas, necesitas usar el método `selectable()`. Para permitir que la acción acceda a los registros seleccionados, necesitas usar el método `accessSelectedRecords()`. Luego, puedes usar el parámetro `$selectedRecords` en tu acción para acceder a los registros seleccionados:

```php
use Filament\Actions\Action;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

public function table(Table $table): Table
{
    return $table
        ->selectable()
        ->recordActions([
            Action::make('copyToSelected')
                ->accessSelectedRecords()
                ->action(function (Model $record, Collection $selectedRecords) {
                    $selectedRecords->each(
                        fn (Model $selectedRecord) => $selectedRecord->update([
                            'is_active' => $record->is_active,
                        ]),
                    );
                }),
        ]);
}
```

## Acciones masivas

Las tablas también soportan "acciones masivas". Estas pueden usarse cuando el usuario selecciona filas en la tabla. Tradicionalmente, cuando se seleccionan filas, aparece un botón de "acciones masivas". Cuando el usuario hace clic en este botón, se le presenta un menú desplegable de acciones para elegir. Puedes colocarlas en los métodos `$table->toolbarActions()` o `$table->headerActions()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            // ...
        ]);
}
```

Las acciones masivas pueden crearse usando el método estático `make()`, pasando su nombre único. Luego debes pasar un callback a `action()` que ejecute la tarea:

```php
use Filament\Actions\BulkAction;
use Illuminate\Database\Eloquent\Collection;

BulkAction::make('delete')
    ->requiresConfirmation()
    ->action(fn (Collection $records) => $records->each->delete())
```

La función te permite acceder a los `$records` actuales de la tabla que están seleccionados. Es una colección Eloquent de modelos.

### Autorizar acciones masivas

Cuando uses una acción masiva, puedes verificar un método de política para cada registro que esté seleccionado. Esto es útil para verificar si el usuario tiene permiso para realizar la acción en cada registro. Puedes usar el método `authorizeIndividualRecords()`, pasando el nombre de un método de política, que será llamado para cada registro. Si la política niega la autorización, el registro no estará presente en el parámetro `$records` de la acción masiva:

```php
use Filament\Actions\BulkAction;
use Illuminate\Database\Eloquent\Collection;

BulkAction::make('delete')
    ->requiresConfirmation()
    ->authorizeIndividualRecords('delete')
    ->action(fn (Collection $records) => $records->each->delete())
```

### Notificaciones de acciones masivas

Después de que se complete una acción masiva, puedes querer enviar una notificación al usuario con un resumen del éxito de la acción. Esto es especialmente útil si estás usando [autorización](#autorizar-acciones-masivas) para registros individuales, ya que el usuario puede no saber cuántos registros fueron realmente afectados.

Para enviar una notificación después de que se complete la acción masiva, debes establecer `successNotificationTitle()` y `failureNotificationTitle()`:

- El `successNotificationTitle()` se usa como el título de la notificación cuando todos los registros han sido procesados exitosamente.
- El `failureNotificationTitle()` se usa como el título de la notificación cuando algunos o todos los registros fallaron al ser procesados. Al pasar una función a estos métodos, puedes inyectar los parámetros `$successCount` y `$failureCount`, para proporcionar esta información al usuario.

Por ejemplo:

```php
use Filament\Actions\BulkAction;
use Illuminate\Database\Eloquent\Collection;

BulkAction::make('delete')
    ->requiresConfirmation()
    ->authorizeIndividualRecords('delete')
    ->action(fn (Collection $records) => $records->each->delete())
    ->successNotificationTitle('Deleted users')
    ->failureNotificationTitle(function (int $successCount, int $totalCount): string {
        if ($successCount) {
            return "{$successCount} of {$totalCount} users deleted";
        }

        return 'Failed to delete any users';
    })
```

También puedes usar un [objeto de respuesta de autorización](https://laravel.com/docs/authorization#policy-responses) especial en un método de política para proporcionar un mensaje personalizado sobre por qué falló la autorización. El objeto especial se llama `DenyResponse` y reemplaza `Response::deny()`, permitiendo al desarrollador pasar una función como mensaje que puede recibir información sobre cuántos registros fueron denegados por esa verificación de autorización:

```php
use App\Models\User;
use Filament\Support\Authorization\DenyResponse;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function delete(User $user, User $model): bool | Response
    {
        if (! $model->is_admin) {
            return true;
        }

        return DenyResponse::make('cannot_delete_admin', message: function (int $failureCount, int $totalCount): string {
            if (($failureCount === 1) && ($totalCount === 1)) {
                return 'You cannot delete an admin user.';
            }

            if ($failureCount === $totalCount) {
                return 'All users selected were admin users.';
            }

            if ($failureCount === 1) {
                return 'One of the selected users was an admin user.';
            }

            return "{$failureCount} of the selected users were admin users.";
        });
    }
}
```

El primer argumento del método `make()` es una clave única para identificar ese tipo de falla. Si se detectan múltiples fallas de esa clave, se agrupan juntas y solo se genera un mensaje. Si hay múltiples puntos de falla en el método de política, cada objeto de respuesta puede tener su propia clave, y los mensajes se concatenarán juntos en la notificación.

#### Reportar fallas en el procesamiento de acciones masivas

Junto con los mensajes de [autorización de registros individuales](#autorizar-acciones-masivas), también puedes reportar fallas en el procesamiento de la acción masiva en sí. Esto es útil si quieres proporcionar un mensaje para cada registro que falló al ser procesado por una razón particular, incluso después de que pase la autorización. Esto se hace inyectando la instancia `Action` en la función `action()`, y llamando el método `reportBulkProcessingFailure()` en ella, pasando una clave y función de mensaje similar a `DenyResponse`:

```php
use Filament\Actions\BulkAction;
use Illuminate\Database\Eloquent\Collection;

BulkAction::make('delete')
    ->requiresConfirmation()
    ->authorizeIndividualRecords('delete')
    ->action(function (BulkAction $action, Collection $records) {
        $records->each(function (Model $record) use ($action) {
            $record->delete() || $action->reportBulkProcessingFailure(
                'deletion_failed',
                message: function (int $failureCount, int $totalCount): string {
                    if (($failureCount === 1) && ($totalCount === 1)) {
                        return 'One user failed to delete.';
                    }

                    if ($failureCount === $totalCount) {
                        return 'All users failed to delete.';
                    }

                    if ($failureCount === 1) {
                        return 'One of the selected users failed to delete.';
                    }

                    return "{$failureCount} of the selected users failed to delete.";
                },
            );
        });
    })
    ->successNotificationTitle('Deleted users')
    ->failureNotificationTitle(function (int $successCount, int $totalCount): string {
        if ($successCount) {
            return "{$successCount} of {$totalCount} users deleted";
        }

        return 'Failed to delete any users';
    })
```

El método `delete()` en un modelo Eloquent devuelve `false` si la eliminación falla, por lo que puedes usar eso para determinar si el registro fue eliminado exitosamente. El método `reportBulkProcessingFailure()` entonces añadirá un mensaje de falla a la notificación, que se mostrará cuando se complete la acción.

El método `reportBulkProcessingFailure()` puede llamarse en múltiples puntos durante la ejecución de la acción por diferentes razones, pero solo debes llamarlo una vez por registro. No debes proceder con la acción para ese registro particular una vez que hayas llamado el método para él.

### Agrupar acciones masivas

Puedes usar un objeto `BulkActionGroup` para [agrupar múltiples acciones masivas juntas](../actions/grouping-actions) en un desplegable. Cualquier acción masiva que permanezca fuera del `BulkActionGroup` se renderizará junto al botón de activación del desplegable:

```php
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            BulkActionGroup::make([
                BulkAction::make('delete')
                    ->requiresConfirmation()
                    ->action(fn (Collection $records) => $records->each->delete()),
                BulkAction::make('forceDelete')
                    ->requiresConfirmation()
                    ->action(fn (Collection $records) => $records->each->forceDelete()),
            ]),
            BulkAction::make('export')->button()->action(fn (Collection $records) => ...),
        ]);
}
```

Alternativamente, si todas tus acciones masivas están agrupadas, puedes usar el método abreviado `groupedBulkActions()`:

```php
use Filament\Actions\BulkAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->groupedBulkActions([
            BulkAction::make('delete')
                ->requiresConfirmation()
                ->action(fn (Collection $records) => $records->each->delete()),
            BulkAction::make('forceDelete')
                ->requiresConfirmation()
                ->action(fn (Collection $records) => $records->each->forceDelete()),
        ]);
}
```

### Deseleccionar registros una vez que una acción masiva ha terminado

Puedes deseleccionar los registros después de que se haya ejecutado una acción masiva usando el método `deselectRecordsAfterCompletion()`:

```php
use Filament\Actions\BulkAction;
use Illuminate\Database\Eloquent\Collection;

BulkAction::make('delete')
    ->action(fn (Collection $records) => $records->each->delete())
    ->deselectRecordsAfterCompletion()
```

### Deshabilitar acciones masivas para algunas filas

Puedes deshabilitar condicionalmente acciones masivas para un registro específico:

```php
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            // ...
        ])
        ->checkIfRecordIsSelectableUsing(
            fn (Model $record): bool => $record->status === Status::Enabled,
        );
}
```

### Limitar el número de registros seleccionables

Puedes restringir cuántos registros puede seleccionar el usuario en total:

```php
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            // ...
        ])
        ->maxSelectableRecords(4);
}
```

### Prevenir la selección masiva de todas las páginas

El método `selectCurrentPageOnly()` puede usarse para prevenir que el usuario seleccione fácilmente todos los registros en la tabla de una vez, y en su lugar solo les permite seleccionar una página a la vez:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            // ...
        ])
        ->selectCurrentPageOnly();
}
```

### Mejorar el rendimiento de las acciones masivas

Por defecto, una acción masiva cargará todos los registros Eloquent en memoria antes de pasarlos a la función `action()`.

Si estás procesando un gran número de registros, puedes querer usar el método `chunkSelectedRecords()` para obtener un número menor de registros a la vez. Esto reducirá el uso de memoria de tu aplicación:

```php
use Filament\Actions\BulkAction;
use Illuminate\Support\LazyCollection;

BulkAction::make()
    ->chunkSelectedRecords(250)
    ->action(function (LazyCollection $records) {
        // Process the records...
    })
```

Aún puedes iterar a través de la colección `$records` como normal, pero la colección será una `LazyCollection` en lugar de una colección normal.

También puedes prevenir que Filament obtenga los modelos Eloquent en primer lugar, y en su lugar solo pasar los IDs de los registros seleccionados a la función `action()`. Esto es útil si estás procesando un gran número de registros, y no necesitas cargarlos en memoria:

```php
use Filament\Actions\BulkAction;
use Illuminate\Support\Collection;

BulkAction::make()
    ->fetchSelectedRecords(false)
    ->action(function (Collection $records) {
        // Process the records...
    })
```

## Acciones de encabezado

Tanto las acciones como las [acciones masivas](#acciones-masivas) pueden renderizarse en el encabezado de la tabla. Puedes colocarlas en el método `$table->headerActions()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->headerActions([
            // ...
        ]);
}
```

Esto es útil para cosas como acciones de "crear", que no están relacionadas con ninguna fila específica de la tabla, o acciones masivas que necesitan ser más visibles.

## Acciones de barra de herramientas

Tanto las acciones como las [acciones masivas](#acciones-masivas) pueden renderizarse en la barra de herramientas de la tabla. Puedes colocarlas en el método `$table->toolbarActions()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            // ...
        ]);
}
```

Esto es útil para cosas como acciones de "crear", que no están relacionadas con ninguna fila específica de la tabla, o acciones masivas que necesitan ser más visibles.

## Acciones de columna

Las acciones pueden añadirse a columnas, de modo que cuando se hace clic en una celda en esa columna, actúa como el disparador para una acción. Puedes aprender más sobre [acciones de columna](columns/overview#triggering-actions) en la documentación.

## Agrupar acciones

Puedes usar un objeto `ActionGroup` para agrupar múltiples acciones de tabla juntas en un desplegable:

```php
use Filament\Actions\ActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->recordActions([
            ActionGroup::make([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ]),
            // ...
        ]);
}
```

Puedes encontrar más sobre personalizar grupos de acciones en la [documentación de Acciones](../actions/grouping-actions).
