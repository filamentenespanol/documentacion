---
title: Descripción general
---

## Introducción

De forma predeterminada, todos los `App\Models\User`s pueden acceder a Filament localmente. Para permitirles acceder a Filament en producción, debe realizar algunos pasos adicionales para garantizar que solo los usuarios correctos tengan acceso a la aplicación.

## Autorizando el acceso al panel

Para configurar su `App\Models\User` para acceder a Filament en entornos no locales, debe implementar el contrato `FilamentUser`:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser
{
    // ...

    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->email, '@yourdomain.com') && $this->hasVerifiedEmail();
    }
}
```

El método `canAccessPanel()` devuelve `true` o `false` dependiendo de si el usuario tiene permiso para acceder a `$panel`. En este ejemplo, verificamos si el correo electrónico del usuario termina en `@yourdomain.com` y ​​si ha verificado su dirección de correo electrónico.

Dado que tiene acceso al `$panel` actual, puede escribir cheques condicionales para paneles separados. Por ejemplo, restringir solo el acceso al panel de administración y al mismo tiempo permitir que todos los usuarios accedan a los otros paneles de su aplicación:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser
{
    // ...

    public function canAccessPanel(Panel $panel): bool
    {
        if ($panel->getId() === 'admin') {
            return str_ends_with($this->email, '@yourdomain.com') && $this->hasVerifiedEmail();
        }

        return true;
    }
}
```

## Autorizar el acceso a los Recursos

Consulte la sección [Autorización](../resources/overview#authorization) en la documentación de recursos para controlar el acceso a las páginas de recursos y sus registros de datos.

## Configurar avatares de usuario

De fábrica, Filament utiliza [ui-avatars.com](https://ui-avatars.com) para generar avatares basados ​​en el nombre de un usuario. Sin embargo, si su modelo de usuario tiene un atributo `avatar_url`, se utilizará en su lugar. Para personalizar cómo Filament obtiene la URL del avatar de un usuario, puede implementar el contrato `HasAvatar`:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasAvatar;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser, HasAvatar
{
    // ...

    public function getFilamentAvatarUrl(): ?string
    {
        return $this->avatar_url;
    }
}
```

El método `getFilamentAvatarUrl()` se utiliza para recuperar el avatar del usuario actual. Si este método devuelve `null`, Filament recurrirá a [ui-avatars.com](https://ui-avatars.com).

### Usando un proveedor de avatar diferente

Puedes cambiar fácilmente [ui-avatars.com](https://ui-avatars.com) por un servicio diferente creando un nuevo proveedor de avatar.

En este ejemplo, creamos un nuevo archivo en `app/Filament/AvatarProviders/BoringAvatarsProvider.php` para [boringavatars.com](https://boringavatars.com). El método `get()` acepta una instancia de modelo de usuario y devuelve una URL de avatar para ese usuario:

```php
<?php

namespace App\Filament\AvatarProviders;

use Filament\AvatarProviders\Contracts;
use Filament\Facades\Filament;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class BoringAvatarsProvider implements Contracts\AvatarProvider
{
    public function get(Model | Authenticatable $record): string
    {
        $name = str(Filament::getNameForDefaultAvatar($record))
            ->trim()
            ->explode(' ')
            ->map(fn (string $segment): string => filled($segment) ? mb_substr($segment, 0, 1) : '')
            ->join(' ');

        return 'https://source.boringavatars.com/beam/120/' . urlencode($name);
    }
}
```

Ahora, registre este nuevo proveedor de avatar en la [configuración](../panel-configuration):

```php
use App\Filament\AvatarProviders\BoringAvatarsProvider;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->defaultAvatarProvider(BoringAvatarsProvider::class);
}
```

## Configurando el atributo de nombre de usuario

De forma predeterminada, Filament utilizará el atributo `name` del usuario para mostrar su nombre en la aplicación. Para cambiar esto, puede implementar el contrato `HasName`:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser, HasName
{
    // ...

    public function getFilamentName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
```

El método `getFilamentName()` se utiliza para recuperar el nombre del usuario actual.

## Funciones de autenticación

Puede habilitar fácilmente las funciones de autenticación para un panel en el archivo de configuración:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->login()
        ->registration()
        ->passwordReset()
        ->emailVerification()
        ->emailChangeVerification()
        ->profile();
}
```

Filament también admite la autenticación multifactor, sobre la cual puede obtener más información en la sección [Autenticación multifactor](autenticación multifactor).

### Personalización de las funciones de autenticación

Si desea reemplazar estas páginas con las suyas propias, puede pasar cualquier clase de página Filament a estos métodos.

La mayoría de las personas podrán realizar las personalizaciones que deseen ampliando la clase de página base desde el código base de Filament, anulando métodos como `form()` y ​​luego pasando la nueva clase de página a la configuración:

```php
use App\Filament\Pages\Auth\EditProfile;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->profile(EditProfile::class);
}
```

En este ejemplo, personalizaremos la página de perfil. Necesitamos crear una nueva clase PHP en `app/Filament/Pages/Auth/EditProfile.php`:

```php
<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\EditProfile as BaseEditProfile;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class EditProfile extends BaseEditProfile
{
    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('username')
                    ->required()
                    ->maxLength(255),
                $this->getNameFormComponent(),
                $this->getEmailFormComponent(),
                $this->getPasswordFormComponent(),
                $this->getPasswordConfirmationFormComponent(),
            ]);
    }
}
```

Esta clase extiende la clase de página de perfil base del código base de Filament. Otras clases de páginas que podría ampliar incluyen:

- `Filament\Auth\Pages\Login`
- `Filament\Auth\Pages\Register`
- `Filament\Auth\Pages\EmailVerification\EmailVerificationPrompt`
- `Filament\Auth\Pages\PasswordReset\RequestPasswordReset`
- `Filament\Auth\Pages\PasswordReset\ResetPassword`

En el método `form()` del ejemplo, llamamos a métodos como `getNameFormComponent()` para obtener los componentes del formulario predeterminados para la página. Puede personalizar estos componentes según sea necesario. Para conocer todas las opciones de personalización disponibles, consulte la clase de página base `EditProfile` en el código base de Filament: contiene todos los métodos que puede anular para realizar cambios.

#### Personalizar un campo de autenticación sin necesidad de redefinir el formulario

Si desea personalizar un campo en un formulario de autenticación sin necesidad de definir un nuevo método `form()`, puede ampliar el método de campo específico y encadenar sus personalizaciones:

```php
use Filament\Schemas\Components\Component;

protected function getPasswordFormComponent(): Component
{
    return parent::getPasswordFormComponent()
        ->revealable(false);
}
```

### Verificación de cambio de correo electrónico

Si está utilizando la función `profile()` con la función `emailChangeVerification()`, los usuarios que cambien su dirección de correo electrónico desde el formulario de perfil deberán verificar su nueva dirección de correo electrónico antes de poder iniciar sesión con ella. Esto se hace enviando un correo electrónico de verificación a la nueva dirección, que contiene un enlace en el que el usuario debe hacer clic para verificar su nueva dirección de correo electrónico. La dirección de correo electrónico en la base de datos no se actualiza hasta que el usuario hace clic en el enlace del correo electrónico.

El enlace que se envía a un usuario tiene una validez de 60 minutos. Al mismo tiempo que se envía el correo electrónico a la nueva dirección, también se envía un correo electrónico a la dirección anterior, con un enlace para bloquear el cambio. Esta es una característica de seguridad para evitar potencialmente que un usuario se vea afectado por un actor malintencionado.

### Usando una barra lateral en la página de perfil

De forma predeterminada, la página de perfil no utiliza el diseño de página estándar con barra lateral. Esto es para que funcione con la función [inquilino](inquilino); de lo contrario, no sería accesible si el usuario no tuviera inquilinos, ya que los enlaces de la barra lateral se dirigen al inquilino actual.

Si no está utilizando [inquilino](inquilino) en su panel y desea que la página de perfil use el diseño de página estándar con una barra lateral, puede pasar el parámetro `isSimple: false` a `$panel->profile()` al registrar la página:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->profile(isSimple: false);
}
```

### Personalización de los slugs de ruta de autenticación

Puede personalizar los slugs de URL utilizados para las rutas de autenticación en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->loginRouteSlug('login')
        ->registrationRouteSlug('register')
        ->passwordResetRoutePrefix('password-reset')
        ->passwordResetRequestRouteSlug('request')
        ->passwordResetRouteSlug('reset')
        ->emailVerificationRoutePrefix('email-verification')
        ->emailVerificationPromptRouteSlug('prompt')
        ->emailVerificationRouteSlug('verify')
        ->emailChangeVerificationRoutePrefix('email-change-verification')
        ->emailChangeVerificationRouteSlug('verify');
}
```

### Configuración de la protección de autenticación

Para configurar la protección de autenticación que utiliza Filament, puede pasar el nombre de la protección al método `authGuard()` [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->authGuard('web');
}
```

### Configuración del intermediario de contraseñas

Para configurar el intermediario de contraseñas que utiliza Filament, puede pasar el nombre del intermediario al método `authPasswordBroker()` [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->authPasswordBroker('users');
}
```

### Deshabilitar la entrada de contraseñas revelables

De forma predeterminada, todas las entradas de contraseña en los formularios de autenticación son [`revealable()`](../forms/text-input#revealable-password-inputs). Esto permite que el usuario pueda ver una versión de texto sin formato de la contraseña que está escribiendo haciendo clic en un botón. Para deshabilitar esta característica, puede pasar `false` al método `revealablePasswords()` [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->revealablePasswords(false);
}
```

También puede desactivar esta función por campo llamando a `->revealable(false)` en el objeto de campo al [extender la clase de página base](#personalizar-un-campo-de-autenticación-sin-necesidad-de-redefinir-el-formulario).

## Configurar el acceso de invitados a un panel

De forma predeterminada, Filament espera trabajar únicamente con usuarios autenticados. Para permitir que los invitados accedan a un panel, debe evitar el uso de componentes que esperan que un usuario haya iniciado sesión (como perfiles, avatares) y eliminar el middleware de autenticación integrado:

- Eliminar el `Authenticate::class` predeterminado del conjunto `authMiddleware()` en la configuración del panel.
- Elimine `->login()` y ​​cualquier otra [función de autenticación](#authentication-features) del panel.
- Elimina el `AccountWidget` predeterminado de la matriz `widgets()`, porque lee los datos del usuario actual.

### Autorizar invitados en políticas

Cuando está presente, Filament se basa en [Laravel Model Policies](https://laravel.com/docs/authorization#generating-policies) para el control de acceso. Para otorgar acceso de lectura a [usuarios invitados en una política modelo] (https://laravel.com/docs/authorization#guest-users), cree la Política y actualice los métodos `viewAny()` y ​​`view()`, cambiando el parámetro `User $user` a `?User $user` para que sea opcional, y `return true;`. Alternativamente, puede eliminar esos métodos de la política por completo.
