---
title: Action de replicación
---

## Introducción

Filament incluye una action que puede [replicar](https://laravel.com/docs/eloquent#replicating-models) registros Eloquent. Puedes usarla de esta manera:

```php
use Filament\Actions\ReplicateAction;

ReplicateAction::make()
```

## Excluir atributos

El método `excludeAttributes()` se usa para instruir a la action qué columnas deben excluirse de la replicación:

```php
use Filament\Actions\ReplicateAction;

ReplicateAction::make()
    ->excludeAttributes(['slug'])
```

## Personalizar datos antes de llenar el formulario

Es posible que desees modificar los datos de un registro antes de que se llenen en el formulario. Para hacer esto, puedes usar el método `mutateRecordDataUsing()` para modificar el array `$data`, y devolver la versión modificada antes de que se llene en el formulario:

```php
use Filament\Actions\ReplicateAction;

ReplicateAction::make()
    ->mutateRecordDataUsing(function (array $data): array {
        $data['user_id'] = auth()->id();

        return $data;
    })
```

## Redirigir después de la replicación

Puedes configurar una redirección personalizada cuando se envía el formulario usando el método `successRedirectUrl()`:

```php
use Filament\Actions\ReplicateAction;

ReplicateAction::make()
    ->successRedirectUrl(route('posts.list'))
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de `$record`, la función `successRedirectUrl()` puede inyectar varias utilidades como parámetros.

</details>

## Personalizar la notificación de replicación

Cuando el registro se replica exitosamente, se envía una notificación al usuario, que indica el éxito de su acción.

Para personalizar el título de esta notificación, usa el método `successNotificationTitle()`:

```php
use Filament\Actions\ReplicateAction;

ReplicateAction::make()
    ->successNotificationTitle('Category replicated')
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `successNotificationTitle()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Puedes personalizar toda la notificación usando el método `successNotification()`:

```php
use Filament\Actions\ReplicateAction;
use Filament\Notifications\Notification;

ReplicateAction::make()
    ->successNotification(
       Notification::make()
            ->success()
            ->title('Category replicated')
            ->body('The category has been replicated successfully.'),
    )
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `successNotification()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Para deshabilitar la notificación por completo, usa el método `successNotification(null)`:

```php
use Filament\Actions\RestoreAction;

ReplicateAction::make()
    ->successNotification(null)
```

## Hooks de ciclo de vida

Los hooks pueden usarse para ejecutar código en varios puntos dentro del ciclo de vida de la action, como antes de que se guarde la réplica.

```php
use Filament\Actions\ReplicateAction;
use Illuminate\Database\Eloquent\Model;

ReplicateAction::make()
    ->before(function () {
        // Se ejecuta antes de que el registro haya sido replicado.
    })
    ->beforeReplicaSaved(function (Model $replica): void {
        // Se ejecuta después de que el registro haya sido replicado pero antes de que se guarde en la base de datos.
    })
    ->after(function (Model $replica): void {
        // Se ejecuta después de que la réplica se haya guardado en la base de datos.
    })
```

<details>
<summary>Información de inyección de utilidades</summary>

Estas funciones hook pueden inyectar varias utilidades como parámetros.

</details>

## Detener el proceso de replicación

En cualquier momento, puedes llamar a `$action->halt()` desde dentro de un hook de ciclo de vida, lo que detendrá todo el proceso de replicación:

```php
use App\Models\Post;
use Filament\Actions\Action;
use Filament\Actions\ReplicateAction;
use Filament\Notifications\Notification;

ReplicateAction::make()
    ->before(function (ReplicateAction $action, Post $record) {
        if (! $record->team->subscribed()) {
            Notification::make()
                ->warning()
                ->title('You don\'t have an active subscription!')
                ->body('Choose a plan to continue.')
                ->persistent()
                ->actions([
                    Action::make('subscribe')
                        ->button()
                        ->url(route('subscribe'), shouldOpenInNewTab: true),
                ])
                ->send();
        
            $action->halt();
        }
    })
```

Si deseas que el modal de la action también se cierre, puedes `cancel()` completamente la action en lugar de detenerla:

```php
$action->cancel();
```
