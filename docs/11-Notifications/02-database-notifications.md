---
title: Notificaciones de base de datos
---

## Configurar la tabla de notificaciones de base de datos

Antes de comenzar, asegúrate de que la [tabla de notificaciones de Laravel](https://laravel.com/docs/notifications#database-prerequisites) esté agregada a tu base de datos:

```bash
# Laravel 11 y superior
php artisan make:notifications-table

# Laravel 10
php artisan notifications:table
```

> Si estás usando PostgreSQL, asegúrate de que la columna `data` en la migración esté usando `json()`: `$table->json('data')`.

> Si estás usando UUIDs para tu modelo `User`, asegúrate de que tu columna `notifiable` esté usando `uuidMorphs()`: `$table->uuidMorphs('notifiable')`.

## Habilitar notificaciones de base de datos en un panel

Si deseas recibir notificaciones de base de datos en un panel, puedes habilitarlas en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->databaseNotifications();
}
```

## Enviar notificaciones de base de datos

Hay varias formas de enviar notificaciones de base de datos, dependiendo de cuál te convenga más.

Puedes usar nuestra API fluida:

```php
use Filament\Notifications\Notification;

$recipient = auth()->user();

Notification::make()
    ->title('Saved successfully')
    ->sendToDatabase($recipient);
```

O, usa el método `notify()`:

```php
use Filament\Notifications\Notification;

$recipient = auth()->user();

$recipient->notify(
    Notification::make()
        ->title('Saved successfully')
        ->toDatabase(),
);
```

> Laravel envía notificaciones de base de datos usando la cola. Asegúrate de que tu cola esté ejecutándose para recibir las notificaciones.

Alternativamente, usa una [clase de notificación tradicional de Laravel](https://laravel.com/docs/notifications#generating-notifications) devolviendo la notificación desde el método `toDatabase()`:

```php
use App\Models\User;
use Filament\Notifications\Notification;

public function toDatabase(User $notifiable): array
{
    return Notification::make()
        ->title('Saved successfully')
        ->getDatabaseMessage();
}
```

## Recibir notificaciones de base de datos

Sin ninguna configuración, las nuevas notificaciones de base de datos solo se recibirán cuando se cargue la página por primera vez.

### Polling para nuevas notificaciones de base de datos

El polling es la práctica de realizar periódicamente una solicitud al servidor para verificar nuevas notificaciones. Este es un buen enfoque ya que la configuración es simple, pero algunos pueden decir que no es una solución escalable ya que aumenta la carga del servidor.

De forma predeterminada, Livewire hace polling para nuevas notificaciones cada 30 segundos:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->databaseNotifications()
        ->databaseNotificationsPolling('30s');
}
```

Puedes deshabilitar completamente el polling si lo deseas:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->databaseNotifications()
        ->databaseNotificationsPolling(null);
}
```

### Usar Echo para recibir nuevas notificaciones de base de datos con websockets

Los websockets son una forma más eficiente de recibir nuevas notificaciones en tiempo real. Para configurar websockets, primero debes [configurarlo](broadcast-notifications#setting-up-websockets-in-a-panel) en el panel.

Una vez que los websockets estén configurados, puedes despachar automáticamente un evento `DatabaseNotificationsSent` configurando el parámetro `isEventDispatched` en `true` al enviar la notificación. Esto activará la obtención inmediata de nuevas notificaciones para el usuario:

```php
use Filament\Notifications\Notification;

$recipient = auth()->user();

Notification::make()
    ->title('Saved successfully')
    ->sendToDatabase($recipient, isEventDispatched: true);
```

## Marcar notificaciones de base de datos como leídas

Hay un botón en la parte superior del modal para marcar todas las notificaciones como leídas a la vez. También puedes agregar [Actions](overview#adding-actions-to-notifications) a las notificaciones, que puedes usar para marcar notificaciones individuales como leídas. Para hacer esto, usa el método `markAsRead()` en la action:

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->success()
    ->body('Changes to the post have been saved.')
    ->actions([
        Action::make('view')
            ->button()
            ->markAsRead(),
    ])
    ->send();
```

Alternativamente, puedes usar el método `markAsUnread()` para marcar una notificación como no leída:

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->success()
    ->body('Changes to the post have been saved.')
    ->actions([
        Action::make('markAsUnread')
            ->button()
            ->markAsUnread(),
    ])
    ->send();
```

## Abrir el modal de notificaciones de base de datos

Puedes abrir el modal de notificaciones de base de datos desde cualquier lugar despachando un evento de navegador `open-modal`:

```blade
<button
    x-data="{}"
    x-on:click="$dispatch('open-modal', { id: 'database-notifications' })"
    type="button"
>
    Notifications
</button>
```
