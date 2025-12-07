---
title: Menú de usuario
---

## Introducción

El menú de usuario aparece en la esquina superior derecha del diseño de administración. Es totalmente personalizable.

Cada elemento del menú está representado por una [acción](../acciones) y se puede personalizar de la misma manera. Para registrar nuevos elementos, puede pasar las acciones al método `userMenuItems()` de la [configuración](../panel-configuration):

```php
use App\Filament\Pages\Settings;
use Filament\Actions\Action;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->userMenuItems([
            Action::make('settings')
                ->url(fn (): string => Settings::getUrl())
                ->icon('heroicon-o-cog-6-tooth'),
            // ...
        ]);
}
```


## Personalizando el enlace del perfil

Para personalizar el enlace del perfil de usuario al inicio del menú de usuario, registre un nuevo elemento con la clave de matriz `profile` y ​​pase una función que [personalice la acción](../acciones):

```php
use Filament\Actions\Action;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->userMenuItems([
            'profile' => fn (Action $action) => $action->label('Edit profile'),
            // ...
        ]);
}
```

Para obtener más información sobre cómo crear una página de perfil, consulte la [documentación de funciones de autenticación] (../users#authentication-features).

## Personalizando el enlace de cierre de sesión

Para personalizar el enlace de cierre de sesión del usuario al final del menú de usuario, registre un nuevo elemento con la clave de matriz `logout` y ​​pase una función que [personalice la acción](../acciones):

```php
use Filament\Actions\Action;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->userMenuItems([
            'logout' => fn (Action $action) => $action->label('Log out'),
            // ...
        ]);
}
```

## Ocultar condicionalmente elementos del menú de usuario

También puede ocultar condicionalmente un elemento del menú de usuario utilizando los métodos `visible()` o `hidden()`, pasando una condición para verificar. Pasar una función pospondrá la evaluación de la condición hasta que el menú se esté procesando realmente:

```php
use App\Models\Payment;
use Filament\Actions\Action;

Action::make('payments')
    ->visible(fn (): bool => auth()->user()->can('viewAny', Payment::class))
    // or
    ->hidden(fn (): bool => ! auth()->user()->can('viewAny', Payment::class))
```

## Envío de una solicitud HTTP `POST` desde un elemento del menú de usuario

Puede enviar una solicitud HTTP `POST` desde un elemento del menú de usuario pasando una URL al método `url()` y ​​también usando `postToUrl()`:

```php
use Filament\Actions\Action;

Action::make('lockSession')
    ->url(fn (): string => route('lock-session'))
    ->postToUrl()
```

## Deshabilitar el menú de usuario

Puede desactivar el menú de usuario por completo pasando `false` al método `userMenu()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->userMenu(false);
}
```
