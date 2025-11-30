---
title: Action de eliminación forzada
---

## Introducción

Filament incluye una action que puede forzar la eliminación de registros Eloquent [eliminados suavemente](https://laravel.com/docs/eloquent#soft-deleting). Cuando se hace clic en el botón de activación, un modal pide confirmación al usuario. Puedes usarla de esta manera:

```php
use Filament\Actions\ForceDeleteAction;

ForceDeleteAction::make()
```

O si deseas agregarla como una action masiva de tabla, para que el usuario pueda elegir qué filas forzar a eliminar, usa `Filament\Actions\ForceDeleteBulkAction`:

```php
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            ForceDeleteBulkAction::make(),
        ]);
}
```

## Redirigir después de forzar la eliminación

Puedes configurar una redirección personalizada cuando se envía el formulario usando el método `successRedirectUrl()`:

```php
use Filament\Actions\ForceDeleteAction;

ForceDeleteAction::make()
    ->successRedirectUrl(route('posts.list'))
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de `$record`, la función `successRedirectUrl()` puede inyectar varias utilidades como parámetros.

</details>

## Personalizar la notificación de eliminación forzada

Cuando el registro se elimina forzadamente de manera exitosa, se envía una notificación al usuario, que indica el éxito de su acción.

Para personalizar el título de esta notificación, usa el método `successNotificationTitle()`:

```php
use Filament\Actions\ForceDeleteAction;

ForceDeleteAction::make()
    ->successNotificationTitle('User force-deleted')
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `successNotificationTitle()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Puedes personalizar toda la notificación usando el método `successNotification()`:

```php
use Filament\Actions\ForceDeleteAction;
use Filament\Notifications\Notification;

ForceDeleteAction::make()
    ->successNotification(
       Notification::make()
            ->success()
            ->title('User force-deleted')
            ->body('The user has been force-deleted successfully.'),
    )
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `successNotification()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Para deshabilitar la notificación por completo, usa el método `successNotification(null)`:

```php
use Filament\Actions\ForceDeleteAction;

ForceDeleteAction::make()
    ->successNotification(null)
```

## Hooks de ciclo de vida

Puedes usar los métodos `before()` y `after()` para ejecutar código antes y después de que se fuerce la eliminación de un registro:

```php
use Filament\Actions\ForceDeleteAction;

ForceDeleteAction::make()
    ->before(function () {
        // ...
    })
    ->after(function () {
        // ...
    })
```

<details>
<summary>Información de inyección de utilidades</summary>

Estas funciones hook pueden inyectar varias utilidades como parámetros.

</details>

## Mejorar el rendimiento de las actions de eliminación forzada masiva

De forma predeterminada, el `ForceDeleteBulkAction` cargará todos los registros Eloquent en memoria, antes de recorrerlos y eliminarlos uno por uno.

Si estás eliminando un gran número de registros, es posible que desees usar el método `chunkSelectedRecords()` para obtener un número menor de registros a la vez. Esto reducirá el uso de memoria de tu aplicación:

```php
use Filament\Actions\ForceDeleteBulkAction;

ForceDeleteBulkAction::make()
    ->chunkSelectedRecords(250)
```

Filament carga los registros Eloquent en memoria antes de eliminarlos por dos razones:

- Para permitir que los registros individuales en la colección sean autorizados con una policy de modelo antes de la eliminación (usando `authorizeIndividualRecords('forceDelete')`, por ejemplo).
- Para asegurar que los eventos del modelo se ejecuten al eliminar registros, como los eventos `forceDeleting` y `forceDeleted` en un observer de modelo.

Si no requieres autorización de policy de registros individuales y eventos de modelo, puedes usar el método `fetchSelectedRecords(false)`, que no obtendrá los registros en memoria antes de eliminarlos, y en su lugar los eliminará en una sola consulta:

```php
use Filament\Actions\ForceDeleteBulkAction;

ForceDeleteBulkAction::make()
    ->fetchSelectedRecords(false)
```
