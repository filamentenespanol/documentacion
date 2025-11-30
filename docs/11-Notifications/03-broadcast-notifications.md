---
title: Notificaciones broadcast
---

## Introducción

De forma predeterminada, Filament enviará notificaciones flash a través de la sesión de Laravel. Sin embargo, es posible que desees que tus notificaciones se "transmitan" (broadcast) a un usuario en tiempo real. Esto podría usarse para enviar una notificación de éxito temporal desde un trabajo en cola después de que haya terminado de procesarse.

Tenemos una integración nativa con [Laravel Echo](https://laravel.com/docs/broadcasting#client-side-installation). Asegúrate de que Echo esté instalado, así como una [integración de websockets del lado del servidor](https://laravel.com/docs/broadcasting#server-side-installation) como Pusher.

## Enviar notificaciones broadcast

Hay varias formas de enviar notificaciones broadcast, dependiendo de cuál te convenga más.

Puedes usar nuestra API fluida:

```php
use Filament\Notifications\Notification;

$recipient = auth()->user();

Notification::make()
    ->title('Saved successfully')
    ->broadcast($recipient);
```

O, usa el método `notify()`:

```php
use Filament\Notifications\Notification;

$recipient = auth()->user();

$recipient->notify(
    Notification::make()
        ->title('Saved successfully')
        ->toBroadcast(),
)
```

Alternativamente, usa una [clase de notificación tradicional de Laravel](https://laravel.com/docs/notifications#generating-notifications) devolviendo la notificación desde el método `toBroadcast()`:

```php
use App\Models\User;
use Filament\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

public function toBroadcast(User $notifiable): BroadcastMessage
{
    return Notification::make()
        ->title('Saved successfully')
        ->getBroadcastMessage();
}
```

## Configurar websockets en un panel

El Panel Builder viene con un nivel de soporte incorporado para notificaciones broadcast y de base de datos en tiempo real. Sin embargo, hay una serie de áreas que necesitarás instalar y configurar para conectar todo y hacerlo funcionar.

1. Si aún no lo has hecho, lee sobre [broadcasting](https://laravel.com/docs/broadcasting) en la documentación de Laravel.
2. Instala y configura broadcasting para usar una [integración de websockets del lado del servidor](https://laravel.com/docs/broadcasting#server-side-installation) como Pusher.
3. Si aún no lo has hecho, necesitarás publicar la configuración del paquete Filament:

```bash
php artisan vendor:publish --tag=filament-config
```

4. Edita la configuración en `config/filament.php` y descomenta la sección `broadcasting.echo` - asegurándote de que la configuración esté correctamente configurada de acuerdo con tu instalación de broadcasting.
5. Asegúrate de que las [entradas `VITE_*` relevantes](https://laravel.com/docs/broadcasting#client-pusher-channels) existan en tu archivo `.env`.
6. Limpia las cachés relevantes con `php artisan route:clear` y `php artisan config:clear` para asegurar que tu nueva configuración tenga efecto.

Tu panel ahora debería estar conectándose a tu servicio de broadcasting. Por ejemplo, si inicias sesión en la consola de depuración de Pusher, deberías ver una conexión entrante cada vez que cargues una página.
