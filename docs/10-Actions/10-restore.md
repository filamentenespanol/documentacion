---
title: Action de restauración
---

## Introducción

Filament incluye una action que puede restaurar registros Eloquent [eliminados suavemente](https://laravel.com/docs/eloquent#soft-deleting). Cuando se hace clic en el botón de activación, un modal pide confirmación al usuario. Puedes usarla de esta manera:

```php
use Filament\Actions\RestoreAction;

RestoreAction::make()
```

O si deseas agregarla como una action masiva de tabla, para que el usuario pueda elegir qué filas restaurar, usa `Filament\Actions\RestoreBulkAction`:

```php
use Filament\Actions\RestoreBulkAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            RestoreBulkAction::make(),
        ]);
}
```

## Redirigir después de restaurar

Puedes configurar una redirección personalizada cuando se envía el formulario usando el método `successRedirectUrl()`:

```php
use Filament\Actions\RestoreAction;

RestoreAction::make()
    ->successRedirectUrl(route('posts.list'))
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de `$record`, la función `successRedirectUrl()` puede inyectar varias utilidades como parámetros.

</details>

## Personalizar la notificación de restauración

Cuando el registro se restaura exitosamente, se envía una notificación al usuario, que indica el éxito de su acción.

Para personalizar el título de esta notificación, usa el método `successNotificationTitle()`:

```php
use Filament\Actions\RestoreAction;

RestoreAction::make()
    ->successNotificationTitle('User restored')
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `successNotificationTitle()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Puedes personalizar toda la notificación usando el método `successNotification()`:

```php
use Filament\Actions\RestoreAction;
use Filament\Notifications\Notification;

RestoreAction::make()
    ->successNotification(
       Notification::make()
            ->success()
            ->title('User restored')
            ->body('The user has been restored successfully.'),
    )
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `successNotification()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Para deshabilitar la notificación por completo, usa el método `successNotification(null)`:

```php
use Filament\Actions\RestoreAction;

RestoreAction::make()
    ->successNotification(null)
```

## Hooks de ciclo de vida

Puedes usar los métodos `before()` y `after()` para ejecutar código antes y después de que se restaure un registro:

```php
use Filament\Actions\RestoreAction;

RestoreAction::make()
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

## Mejorar el rendimiento de las actions de restauración masiva

De forma predeterminada, el `RestoreBulkAction` cargará todos los registros Eloquent en memoria, antes de recorrerlos y restaurarlos uno por uno.

Si estás restaurando un gran número de registros, es posible que desees usar el método `chunkSelectedRecords()` para obtener un número menor de registros a la vez. Esto reducirá el uso de memoria de tu aplicación:

```php
use Filament\Actions\RestoreBulkAction;

RestoreBulkAction::make()
    ->chunkSelectedRecords(250)
```

Filament carga los registros Eloquent en memoria antes de restaurarlos por dos razones:

- Para permitir que los registros individuales en la colección sean autorizados con una policy de modelo antes de la restauración (usando `authorizeIndividualRecords('restore')`, por ejemplo).
- Para asegurar que los eventos del modelo se ejecuten al restaurar registros, como los eventos `restoring` y `restored` en un observer de modelo.

Si no requieres autorización de policy de registros individuales y eventos de modelo, puedes usar el método `fetchSelectedRecords(false)`, que no obtendrá los registros en memoria antes de restaurarlos, y en su lugar los restaurará en una sola consulta:

```php
use Filament\Actions\RestoreBulkAction;

RestoreBulkAction::make()
    ->fetchSelectedRecords(false)
```
