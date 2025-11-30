---
title: Descripción general
---

## Introducción

Las notificaciones se envían usando un objeto `Notification` que se construye a través de una API fluida. Llamar al método `send()` en el objeto `Notification` despachará la notificación y la mostrará en tu aplicación. Como se usa la sesión para hacer flash de notificaciones, pueden enviarse desde cualquier lugar en tu código, incluido JavaScript, no solo componentes Livewire.

```php
<?php

namespace App\Livewire;

use Filament\Notifications\Notification;
use Livewire\Component;

class EditPost extends Component
{
    public function save(): void
    {
        // ...

        Notification::make()
            ->title('Saved successfully')
            ->success()
            ->send();
    }
}
```

## Establecer un título

El mensaje principal de la notificación se muestra en el título. Puedes establecer el título de la siguiente manera:

```php
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->send();
```

El texto del título puede contener elementos HTML básicos y seguros. Para generar HTML seguro con Markdown, puedes usar el [helper `Str::markdown()`](https://laravel.com/docs/strings#method-str-markdown): `title(Str::markdown('Saved **successfully**'))`

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .send()
```

## Establecer un icono

Opcionalmente, una notificación puede tener un [icono](../styling/icons) que se muestra delante de su contenido. También puedes establecer un color para el icono, que es gris de forma predeterminada:

```php
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->icon('heroicon-o-document-text')
    ->iconColor('success')
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .icon('heroicon-o-document-text')
    .iconColor('success')
    .send()
```

Las notificaciones a menudo tienen un estado como `success`, `warning`, `danger` o `info`. En lugar de establecer manualmente los [iconos](../styling/icons) y [colores](../styling/colors) correspondientes, hay un método `status()` al que puedes pasar el estado. También puedes usar los métodos dedicados `success()`, `warning()`, `danger()` e `info()` en su lugar. Entonces, limpiar el ejemplo anterior se vería así:

```php
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->success()
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .send()
```

## Establecer un color de fondo

Las notificaciones no tienen color de fondo de forma predeterminada. Es posible que desees proporcionar contexto adicional a tu notificación estableciendo un color de la siguiente manera:

```php
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->color('success')
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .color('success')
    .send()
```

## Establecer una duración

De forma predeterminada, las notificaciones se muestran durante 6 segundos antes de cerrarse automáticamente. Puedes especificar un valor de duración personalizado en milisegundos de la siguiente manera:

```php
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->success()
    ->duration(5000)
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .duration(5000)
    .send()
```

Si prefieres establecer una duración en segundos en lugar de milisegundos, puedes hacerlo:

```php
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->success()
    ->seconds(5)
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .seconds(5)
    .send()
```

Es posible que desees que algunas notificaciones no se cierren automáticamente y requieran que el usuario las cierre manualmente. Esto se puede lograr haciendo que la notificación sea persistente:

```php
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->success()
    ->persistent()
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .persistent()
    .send()
```

## Establecer texto del cuerpo

Se puede mostrar texto de notificación adicional en el `body()`:

```php
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->success()
    ->body('Changes to the post have been saved.')
    ->send();
```

El texto del cuerpo puede contener elementos HTML básicos y seguros. Para generar HTML seguro con Markdown, puedes usar el [helper `Str::markdown()`](https://laravel.com/docs/strings#method-str-markdown): `body(Str::markdown('Changes to the **post** have been saved.'))`

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .body('Changes to the post have been saved.')
    .send()
```

## Agregar actions a las notificaciones

Las notificaciones admiten [Actions](../actions/overview), que son botones que se renderizan debajo del contenido de la notificación. Pueden abrir una URL o despachar un evento de Livewire. Las actions se pueden definir de la siguiente manera:

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;

Notification::make()
    ->title('Saved successfully')
    ->success()
    ->body('Changes to the post have been saved.')
    ->actions([
        Action::make('view')
            ->button(),
        Action::make('undo')
            ->color('gray'),
    ])
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .body('Changes to the post have been saved.')
    .actions([
        new FilamentNotificationAction('view')
            .button(),
        new FilamentNotificationAction('undo')
            .color('gray'),
    ])
    .send()
```

Puedes obtener más información sobre cómo estilizar botones de action [aquí](../actions/overview).

### Abrir URLs desde actions de notificación

Puedes abrir una URL, opcionalmente en una nueva pestaña, al hacer clic en una action:

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
            ->url(route('posts.show', $post), shouldOpenInNewTab: true),
        Action::make('undo')
            ->color('gray'),
    ])
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .body('Changes to the post have been saved.')
    .actions([
        new FilamentNotificationAction('view')
            .button()
            .url('/view')
            .openUrlInNewTab(),
        new FilamentNotificationAction('undo')
            .color('gray'),
    ])
    .send()
```

### Despachar eventos de Livewire desde actions de notificación

A veces deseas ejecutar código adicional cuando se hace clic en una action de notificación. Esto se puede lograr estableciendo un evento de Livewire que debe despacharse al hacer clic en la action. Opcionalmente, puedes pasar un array de datos, que estarán disponibles como parámetros en el event listener en tu componente Livewire:

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
            ->url(route('posts.show', $post), shouldOpenInNewTab: true),
        Action::make('undo')
            ->color('gray')
            ->dispatch('undoEditingPost', [$post->id]),
    ])
    ->send();
```

También puedes usar `dispatchSelf` y `dispatchTo`:

```php
Action::make('undo')
    ->color('gray')
    ->dispatchSelf('undoEditingPost', [$post->id])

Action::make('undo')
    ->color('gray')
    ->dispatchTo('another_component', 'undoEditingPost', [$post->id])
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .body('Changes to the post have been saved.')
    .actions([
        new FilamentNotificationAction('view')
            .button()
            .url('/view')
            .openUrlInNewTab(),
        new FilamentNotificationAction('undo')
            .color('gray')
            .dispatch('undoEditingPost'),
    ])
    .send()
```

De manera similar, `dispatchSelf` y `dispatchTo` también están disponibles:

```js
new FilamentNotificationAction('undo')
    .color('gray')
    .dispatchSelf('undoEditingPost')

new FilamentNotificationAction('undo')
    .color('gray')
    .dispatchTo('another_component', 'undoEditingPost')
```

### Cerrar notificaciones desde actions

Después de abrir una URL o despachar un evento desde tu action, es posible que desees cerrar la notificación de inmediato:

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
            ->url(route('posts.show', $post), shouldOpenInNewTab: true),
        Action::make('undo')
            ->color('gray')
            ->dispatch('undoEditingPost', [$post->id])
            ->close(),
    ])
    ->send();
```

O con JavaScript:

```js
new FilamentNotification()
    .title('Saved successfully')
    .success()
    .body('Changes to the post have been saved.')
    .actions([
        new FilamentNotificationAction('view')
            .button()
            .url('/view')
            .openUrlInNewTab(),
        new FilamentNotificationAction('undo')
            .color('gray')
            .dispatch('undoEditingPost')
            .close(),
    ])
    .send()
```

## Usar los objetos JavaScript

Los objetos JavaScript (`FilamentNotification` y `FilamentNotificationAction`) están asignados a `window.FilamentNotification` y `window.FilamentNotificationAction`, por lo que están disponibles en scripts en la página.

También puedes importarlos en un archivo JavaScript empaquetado:

```js
import { Notification, NotificationAction } from '../../vendor/filament/notifications/dist/index.js'

// ...
```

## Cerrar una notificación con JavaScript

Una vez que se ha enviado una notificación, puedes cerrarla bajo demanda despachando un evento de navegador en la ventana llamado `close-notification`.

El evento necesita contener el ID de la notificación que enviaste. Para obtener el ID, puedes usar el método `getId()` en el objeto `Notification`:

```php
use Filament\Notifications\Notification;

$notification = Notification::make()
    ->title('Hello')
    ->persistent()
    ->send()

$notificationId = $notification->getId()
```

Para cerrar la notificación, puedes despachar el evento desde Livewire:

```php
$this->dispatch('close-notification', id: $notificationId);
```

O desde JavaScript, en este caso Alpine.js:

```blade
<button x-on:click="$dispatch('close-notification', { id: notificationId })" type="button">
    Close Notification
</button>
```

Si puedes recuperar el ID de la notificación, persistirlo y luego usarlo para cerrar la notificación, ese es el enfoque recomendado, ya que los IDs se generan de manera única y no correrás el riesgo de cerrar la notificación incorrecta. Sin embargo, si no es posible persistir el ID aleatorio, puedes pasar un ID personalizado al enviar la notificación:

```php
use Filament\Notifications\Notification;

Notification::make('greeting')
    ->title('Hello')
    ->persistent()
    ->send()
```

En este caso, puedes cerrar la notificación despachando el evento con el ID personalizado:

```blade
<button x-on:click="$dispatch('close-notification', { id: 'greeting' })" type="button">
    Close Notification
</button>
```

Ten en cuenta que si envías múltiples notificaciones con el mismo ID, puedes experimentar efectos secundarios inesperados, por lo que se recomiendan IDs aleatorios.

## Posicionar notificaciones

Puedes configurar la alineación de las notificaciones en un service provider o middleware, llamando a `Notifications::alignment()` y `Notifications::verticalAlignment()`. Puedes pasar `Alignment::Start`, `Alignment::Center`, `Alignment::End`, `VerticalAlignment::Start`, `VerticalAlignment::Center` o `VerticalAlignment::End`:

```php
use Filament\Notifications\Livewire\Notifications;
use Filament\Support\Enums\Alignment;
use Filament\Support\Enums\VerticalAlignment;

Notifications::alignment(Alignment::Start);
Notifications::verticalAlignment(VerticalAlignment::End);
```
