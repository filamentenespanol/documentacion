---
title: Descripción general
---

## Introducción

"Action" (Acción) es una palabra que se usa bastante dentro de la comunidad de Laravel. Tradicionalmente, las clases PHP de acción manejan "hacer" algo en la lógica de negocio de tu aplicación. Por ejemplo, iniciar sesión un usuario, enviar un correo electrónico o crear un nuevo registro de usuario en la base de datos.

En Filament, las actions también manejan "hacer" algo en tu aplicación. Sin embargo, son un poco diferentes de las actions tradicionales. Están diseñadas para ser utilizadas en el contexto de una interfaz de usuario. Por ejemplo, podrías tener un botón para eliminar un registro de cliente, que abre un modal para confirmar tu decisión. Cuando el usuario hace clic en el botón "Delete" en el modal, el cliente se elimina. Todo este flujo de trabajo es una "action".

```php
use Filament\Actions\Action;

Action::make('delete')
    ->requiresConfirmation()
    ->action(fn () => $this->client->delete())
```

Las actions también pueden recopilar información adicional del usuario. Por ejemplo, podrías tener un botón para enviar un correo electrónico a un cliente. Cuando el usuario hace clic en el botón, se abre un modal para recopilar el asunto y el cuerpo del correo electrónico. Cuando el usuario hace clic en el botón "Send" en el modal, se envía el correo electrónico:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Illuminate\Support\Facades\Mail;

Action::make('sendEmail')
    ->schema([
        TextInput::make('subject')->required(),
        RichEditor::make('body')->required(),
    ])
    ->action(function (array $data) {
        Mail::to($this->client)
            ->send(new GenericEmail(
                subject: $data['subject'],
                body: $data['body'],
            ));
    })
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de `$data`, la función `action()` puede inyectar varias utilidades como parámetros.

</details>

Por lo general, las actions se ejecutan sin redirigir al usuario fuera de la página. Esto es porque usamos extensivamente Livewire. Sin embargo, las actions pueden ser mucho más simples y ni siquiera necesitan un modal. Puedes pasar una URL a una action, y cuando el usuario hace clic en el botón, es redirigido a esa página:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `url()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Toda la apariencia del botón de activación de la action y el modal es personalizable usando métodos PHP fluidos. Proporcionamos un estilo sensato y consistente para la interfaz de usuario, pero todo esto es personalizable con CSS.

## Actions disponibles

Filament incluye varias actions que puedes agregar a tu aplicación. Su objetivo es simplificar las acciones más comunes relacionadas con Eloquent:

- [Create](create)
- [Edit](edit)
- [View](view)
- [Delete](delete)
- [Replicate](replicate)
- [Force-delete](force-delete)
- [Restore](restore)
- [Import](import)
- [Export](export)

También puedes crear tus propias actions para hacer cualquier cosa, estas son solo las comunes que incluimos por defecto.

## Elegir un estilo de activador

De forma predeterminada, los activadores de action tienen 4 estilos: "button", "link", "icon button" y "badge".

Los activadores "Button" tienen un color de fondo, una etiqueta y opcionalmente un [icono](#establecer-un-icono). Por lo general, este es el estilo de botón predeterminado, pero puedes usarlo manualmente con el método `button()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->button()
```

Los activadores "Link" no tienen color de fondo. Deben tener una etiqueta y opcionalmente un [icono](#establecer-un-icono). Parecen un enlace que podrías encontrar incrustado dentro del texto. Puedes cambiar a ese estilo con el método `link()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->link()
```

Los activadores "Icon button" son botones circulares con un [icono](#establecer-un-icono) y sin etiqueta. Puedes cambiar a ese estilo con el método `iconButton()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->icon('heroicon-m-pencil-square')
    ->iconButton()
```

Los activadores "Badge" tienen un color de fondo, una etiqueta y opcionalmente un [icono](#establecer-un-icono). Puedes usar un badge como activador usando el método `badge()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->badge()
```

### Usar un botón de icono solo en dispositivos móviles

Es posible que desees usar un estilo de botón con una etiqueta en escritorio, pero eliminar la etiqueta en móvil. Esto lo transformará en un botón de icono. Puedes hacer esto con el método `labeledFrom()`, pasando el [breakpoint](https://tailwindcss.com/docs/responsive-design#overview) responsivo en el que deseas que se agregue la etiqueta al botón:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->icon('heroicon-m-pencil-square')
    ->button()
    ->labeledFrom('md')
```

## Establecer una etiqueta

De forma predeterminada, la etiqueta del botón de activación se genera a partir de su nombre. Puedes personalizar esto usando el método `label()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->label('Edit post')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `label()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Establecer un color

Los botones pueden tener un [color](../styling/colors) para indicar su importancia:

```php
use Filament\Actions\Action;

Action::make('delete')
    ->color('danger')
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `color()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Establecer un tamaño

Los botones vienen en 3 tamaños: `Size::Small`, `Size::Medium` o `Size::Large`. Puedes cambiar el tamaño del activador de la action usando el método `size()`:

```php
use Filament\Actions\Action;
use Filament\Support\Enums\Size;

Action::make('create')
    ->size(Size::Large)
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `size()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Establecer un icono

Los botones pueden tener un [icono](../styling/icons) para agregar más detalle a la interfaz de usuario. Puedes establecer el icono usando el método `icon()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->icon('heroicon-m-pencil-square')
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `icon()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

También puedes cambiar la posición del icono para que esté después de la etiqueta en lugar de antes, usando el método `iconPosition()`:

```php
use Filament\Actions\Action;
use Filament\Support\Enums\IconPosition;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->icon('heroicon-m-pencil-square')
    ->iconPosition(IconPosition::After)
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `iconPosition()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Autorización

Puedes mostrar u ocultar condicionalmente las actions para ciertos usuarios. Para hacer esto, puedes usar los métodos `visible()` o `hidden()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->visible(auth()->user()->can('update', $this->post))

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->hidden(! auth()->user()->can('update', $this->post))
```

Esto es útil para autorizar ciertas actions solo a usuarios que tengan permiso.

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `visible()` y `hidden()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

### Autorización usando una policy

Puedes usar una policy para autorizar una action. Para hacer esto, pasa el nombre del método de la policy al método `authorize()`, y Filament usará el modelo Eloquent actual para esa action para encontrar la policy correcta:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->authorize('update')
```

:::note
Si estás usando una action en un recurso de panel o un relation manager, no necesitas usar el método `authorize()`, ya que Filament leerá automáticamente la policy basada en el modelo del recurso para las actions integradas como `CreateAction`, `EditAction` y `DeleteAction`. Para más información, visita la sección de [autorización de recursos](../resources/overview#authorization).
:::

Si tu método de policy devuelve un [mensaje de respuesta](https://laravel.com/docs/authorization#policy-responses), puedes deshabilitar la action en lugar de ocultarla, y agregar un tooltip que contenga el mensaje, usando el método `authorizationTooltip()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->authorize('update')
    ->authorizationTooltip()
```

En su lugar, puedes permitir que la action aún sea clickeable incluso si el usuario no está autorizado, pero enviar una notificación que contenga el mensaje de respuesta, usando el método `authorizationNotification()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->authorize('update')
    ->authorizationNotification()
```

### Deshabilitar un botón

Si deseas deshabilitar un botón en lugar de ocultarlo, puedes usar el método `disabled()`:

```php
use Filament\Actions\Action;

Action::make('delete')
    ->disabled()
```

Puedes deshabilitar condicionalmente un botón pasándole un booleano:

```php
use Filament\Actions\Action;

Action::make('delete')
    ->disabled(! auth()->user()->can('delete', $this->post))
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `disabled()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Registrar atajos de teclado

Puedes adjuntar atajos de teclado para activar botones. Estos usan los mismos códigos de tecla que [Mousetrap](https://craig.is/killing/mice):

```php
use Filament\Actions\Action;

Action::make('save')
    ->action(fn () => $this->save())
    ->keyBindings(['command+s', 'ctrl+s'])
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `keyBindings()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregar un badge en la esquina del botón

Puedes agregar un badge en la esquina del botón, para mostrar lo que quieras. Es útil para mostrar un contador de algo, o un indicador de estado:

```php
use Filament\Actions\Action;

Action::make('filter')
    ->iconButton()
    ->icon('heroicon-m-funnel')
    ->badge(5)
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `badge()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

También puedes pasar un [color](../styling/colors) para ser usado en el badge:

```php
use Filament\Actions\Action;

Action::make('filter')
    ->iconButton()
    ->icon('heroicon-m-funnel')
    ->badge(5)
    ->badgeColor('success')
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `badgeColor()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Estilo de botón delineado

Cuando estás usando el estilo de activador "button", es posible que desees hacerlo menos prominente. Podrías usar un [color](#establecer-un-color) diferente, pero a veces es posible que desees hacerlo delineado en su lugar. Puedes hacer esto con el método `outlined()`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->button()
    ->outlined()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la etiqueta debe ocultarse o no:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->button()
    ->outlined(FeatureFlag::active())
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `outlined()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregar atributos HTML adicionales a una action

Puedes pasar atributos HTML adicionales a la action a través del método `extraAttributes()`, que se fusionarán en su elemento HTML externo. Los atributos deben ser representados por un array, donde la clave es el nombre del atributo y el valor es el valor del atributo:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
    ->extraAttributes([
        'title' => 'Edit this post',
    ])
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `extraAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::tip
De forma predeterminada, llamar a `extraAttributes()` varias veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.
:::

## Limitar la tasa de las actions

Puedes limitar la tasa de las actions usando el método `rateLimit()`. Este método acepta el número de intentos por minuto que una dirección IP de usuario puede hacer. Si el usuario excede este límite, la action no se ejecutará y se mostrará una notificación:

```php
use Filament\Actions\Action;

Action::make('delete')
    ->rateLimit(5)
```

Si la action abre un modal, el límite de tasa se aplicará cuando se envíe el modal.

Si se abre una action con argumentos o para un registro Eloquent específico, el límite de tasa se aplicará a cada combinación única de argumentos o registro para cada action. El límite de tasa también es único para el componente / página Livewire actual en un panel.

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `rateLimit()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar la notificación de límite de tasa

Cuando una action tiene un límite de tasa, se envía una notificación al usuario, que indica el límite de tasa.

Para personalizar el título de esta notificación, usa el método `rateLimitedNotificationTitle()`:

```php
use Filament\Actions\DeleteAction;

DeleteAction::make()
    ->rateLimit(5)
    ->rateLimitedNotificationTitle('Slow down!')
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `rateLimitedNotificationTitle()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Puedes personalizar toda la notificación usando el método `rateLimitedNotification()`:

```php
use DanHarrin\LivewireRateLimiting\Exceptions\TooManyRequestsException;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;

DeleteAction::make()
    ->rateLimit(5)
    ->rateLimitedNotification(
       fn (TooManyRequestsException $exception): Notification => Notification::make()
            ->warning()
            ->title('Slow down!')
            ->body("You can try deleting again in {$exception->secondsUntilAvailable} seconds."),
    )
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `rateLimitedNotification()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar el comportamiento del límite de tasa

Si deseas personalizar el comportamiento del límite de tasa, puedes usar las características de [limitación de tasa](https://laravel.com/docs/rate-limiting#basic-usage) de Laravel y las [notificaciones flash](../notifications/overview) de Filament juntas en la action.

Si deseas limitar la tasa inmediatamente cuando se abre un modal de action, puedes hacerlo en el método `mountUsing()`:

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\RateLimiter;

Action::make('delete')
    ->mountUsing(function () {
        if (RateLimiter::tooManyAttempts(
            $rateLimitKey = 'delete:' . auth()->id(),
            maxAttempts: 5,
        )) {
            Notification::make()
                ->title('Too many attempts')
                ->body('Please try again in ' . RateLimiter::availableIn($rateLimitKey) . ' seconds.')
                ->danger()
                ->send();
                
            return;
        }
        
         RateLimiter::hit($rateLimitKey);
    })
```

Si deseas limitar la tasa cuando se ejecuta una action, puedes hacerlo en el método `action()`:

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\RateLimiter;

Action::make('delete')
    ->action(function () {
        if (RateLimiter::tooManyAttempts(
            $rateLimitKey = 'delete:' . auth()->id(),
            maxAttempts: 5,
        )) {
            Notification::make()
                ->title('Too many attempts')
                ->body('Please try again in ' . RateLimiter::availableIn($rateLimitKey) . ' seconds.')
                ->danger()
                ->send();
                
            return;
        }
        
         RateLimiter::hit($rateLimitKey);
        
        // ...
    })
```

## Inyección de utilidades en actions

La gran mayoría de los métodos utilizados para configurar actions aceptan funciones como parámetros en lugar de valores codificados:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->label('Edit post')
    ->url(fn (): string => route('posts.edit', ['post' => $this->post]))
```

Esto por sí solo desbloquea muchas posibilidades de personalización.

El paquete también puede inyectar muchas utilidades para usar dentro de estas funciones, como parámetros. Todos los métodos de personalización que aceptan funciones como argumentos pueden inyectar utilidades.

Estas utilidades inyectadas requieren que se usen nombres de parámetros específicos. De lo contrario, Filament no sabe qué inyectar.

### Inyectar los datos actuales del formulario del modal

Si deseas acceder a los [datos actuales del formulario del modal](modals#rendering-a-form-in-a-modal), define un parámetro `$data`:

```php
function (array $data) {
    // ...
}
```

Ten en cuenta que esto estará vacío si el modal aún no se ha enviado.

### Inyectar el registro Eloquent

Si tu action está asociada con un registro Eloquent, por ejemplo si está en una fila de tabla, puedes inyectar el registro usando un parámetro `$record`:

```php
use Illuminate\Database\Eloquent\Model;

function (Model $record) {
    // ...
}
```

### Inyectar los argumentos actuales

Si deseas acceder a los [argumentos actuales](../components/action#passing-action-arguments) que se han pasado a la action, define un parámetro `$arguments`:

```php
function (array $arguments) {
    // ...
}
```

### Inyectar utilidades desde un schema

Puedes acceder a varias utilidades adicionales si tu action está definida en un schema:

- `$schema` - La instancia del schema a la que pertenece la action.
- `$schemaComponent` - La instancia del componente del schema a la que pertenece la action.
- `$schemaComponentState` - El valor actual del componente del schema.
- `$schemaGet` - Una función para recuperar valores de los datos del schema. No se ejecuta la validación en los campos del formulario.
- `$schemaSet` - Una función para establecer valores en los datos del schema.
- `$schemaOperation` - La operación actual que está realizando el schema. Usualmente `create`, `edit` o `view`.

Para más información, por favor visita la [sección de Schemas](../schemas/overview#component-utility-injection).

### Inyectar la instancia actual del componente Livewire

Si deseas acceder a la instancia actual del componente Livewire al que pertenece la action, define un parámetro `$livewire`:

```php
use Livewire\Component;

function (Component $livewire) {
    // ...
}
```

### Inyectar la instancia actual de la action

Si deseas acceder a la instancia actual de la action, define un parámetro `$action`:

```php
function (Action $action) {
    // ...
}
```

### Inyectar múltiples utilidades

Los parámetros se inyectan dinámicamente usando reflexión, por lo que puedes combinar múltiples parámetros en cualquier orden:

```php
use Livewire\Component;

function (array $arguments, Component $livewire) {
    // ...
}
```

### Inyectar dependencias del contenedor de Laravel

Puedes inyectar cualquier cosa del contenedor de Laravel como normal, junto con las utilidades:

```php
use Illuminate\Http\Request;

function (Request $request, array $arguments) {
    // ...
}
```
