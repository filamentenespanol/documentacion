---
title: Autenticación multifactor
---

## Introducción

Los usuarios de Filament pueden iniciar sesión con su dirección de correo electrónico y contraseña de forma predeterminada. Sin embargo, puede habilitar la autenticación multifactor (MFA) para agregar una capa adicional de seguridad a las cuentas de sus usuarios.

Cuando MFA está habilitado, los usuarios deben realizar un paso adicional antes de autenticarse y tener acceso a la aplicación.

Filament incluye dos métodos de MFA que puede habilitar de inmediato:

- [Autenticación de aplicación](#app-authentication) utiliza una aplicación compatible con Google Authenticator (como las aplicaciones Google Authenticator, Authy o Microsoft Authenticator) para generar una contraseña de un solo uso basada en el tiempo (TOTP) que se utiliza para verificar al usuario.
- [Autenticación de correo electrónico](#email-authentication) envía un código único a la dirección de correo electrónico del usuario, que debe ingresar para verificar su identidad.

En Filament, los usuarios configuran la autenticación multifactor desde su [página de perfil] (descripción general#características de autenticación). Si utiliza la función de página de perfil de Filament, la configuración de la autenticación multifactor agregará automáticamente los elementos de interfaz de usuario correctos a la página de perfil:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->profile();
}
```

## Autenticación de aplicaciones

Para habilitar la autenticación de aplicaciones en un panel, primero debe agregar una nueva columna a su tabla `users` (o cualquier tabla que se esté utilizando para su modelo Eloquent "autenticable" en este panel). La columna necesita almacenar la clave secreta utilizada para generar y verificar las contraseñas de un solo uso basadas en el tiempo. Puede ser una columna `text()` normal en una migración:

```php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

Schema::table('users', function (Blueprint $table) {
    $table->text('app_authentication_secret')->nullable();
});
```

En el modelo `User`, debe asegurarse de que esta columna esté cifrada y `$hidden`, ya que se trata de información increíblemente confidencial que debe almacenarse de forma segura:

```php
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser, MustVerifyEmail
{
    // ...

    /**
     * @var array<string>
     */
    protected $hidden = [
        // ...
        'app_authentication_secret',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            // ...
            'app_authentication_secret' => 'encrypted',
        ];
    }
    
    // ...
}
```

A continuación, debe implementar la interfaz `HasAppAuthentication` en el modelo `User`. Esto proporciona a Filament los métodos necesarios para interactuar con el código secreto y otra información sobre la integración:

```php
use Filament\Auth\MultiFactor\App\Contracts\HasAppAuthentication;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser, HasAppAuthentication, MustVerifyEmail
{
    // ...

    public function getAppAuthenticationSecret(): ?string
    {
        // This method should return the user's saved app authentication secret.
    
        return $this->app_authentication_secret;
    }

    public function saveAppAuthenticationSecret(?string $secret): void
    {
        // This method should save the user's app authentication secret.
    
        $this->app_authentication_secret = $secret;
        $this->save();
    }

    public function getAppAuthenticationHolderName(): string
    {
        // In a user's authentication app, each account can be represented by a "holder name".
        // If the user has multiple accounts in your app, it might be a good idea to use
        // their email address as then they are still uniquely identifiable.
    
        return $this->email;
    }
}
```

:::tip
    Dado que Filament usa una interfaz en su modelo `User` en lugar de asumir que la columna `app_authentication_secret` existe, puede usar cualquier nombre de columna que desee. Incluso podrías usar un modelo completamente diferente si deseas almacenar el secreto en una tabla diferente.
:::

Finalmente, debes activar la función de autenticación de la aplicación en tu panel. Para hacer esto, use el método `multiFactorAuthentication()` en la [configuración](../panel-configuration) y pásele una instancia `AppAuthentication`:

```php
use Filament\Auth\MultiFactor\App\AppAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            AppAuthentication::make(),
        ]);
}
```

### Configuración de códigos de recuperación de aplicaciones

Si sus usuarios pierden el acceso a su aplicación de autenticación de dos factores, no podrán iniciar sesión en su aplicación. Para evitar esto, puede generar un conjunto de códigos de recuperación que los usuarios pueden usar para iniciar sesión si pierden el acceso a su aplicación de autenticación de dos factores.

De manera similar a la columna `app_authentication_secret`, debe agregar una nueva columna a su tabla `users` (o cualquier tabla que se esté utilizando para su modelo Eloquent "autenticable" en este panel). La columna necesita almacenar los códigos de recuperación. Puede ser una columna `text()` normal en una migración:

```php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

Schema::table('users', function (Blueprint $table) {
    $table->text('app_authentication_recovery_codes')->nullable();
});
```

En el modelo `User`, debe asegurarse de que esta columna esté cifrada como una matriz y `$hidden`, ya que se trata de información increíblemente confidencial que debe almacenarse de forma segura:

```php
use Filament\Auth\MultiFactor\App\Contracts\HasAppAuthentication;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser, HasAppAuthentication, MustVerifyEmail
{
    // ...

    /**
     * @var array<string>
     */
    protected $hidden = [
        // ...
        'app_authentication_recovery_codes',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            // ...
            'app_authentication_recovery_codes' => 'encrypted:array',
        ];
    }
    
    // ...
}
```

A continuación, debe implementar la interfaz `HasAppAuthenticationRecovery` en el modelo `User`. Esto proporciona a Filament los métodos necesarios para interactuar con los códigos de recuperación:

```php
use Filament\Auth\MultiFactor\App\Contracts\HasAppAuthentication;
use Filament\Auth\MultiFactor\App\Contracts\HasAppAuthenticationRecovery;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser, HasAppAuthentication, HasAppAuthenticationRecovery, MustVerifyEmail
{
    // ...

    /**
     * @return ?array<string>
     */
    public function getAppAuthenticationRecoveryCodes(): ?array
    {
        // This method should return the user's saved app authentication recovery codes.
    
        return $this->app_authentication_recovery_codes;
    }

    /**
     * @param  array<string> | null  $codes
     */
    public function saveAppAuthenticationRecoveryCodes(?array $codes): void
    {
        // This method should save the user's app authentication recovery codes.
    
        $this->app_authentication_recovery_codes = $codes;
        $this->save();
    }
}
```

:::tip
    Dado que Filament usa una interfaz en su modelo `User` en lugar de asumir que la columna `app_authentication_recovery_codes` existe, puede usar cualquier nombre de columna que desee. Incluso podrías usar un modelo completamente diferente si deseas almacenar los códigos de recuperación en una tabla diferente.
:::

Finalmente, debes activar la función de códigos de recuperación de autenticación de aplicaciones en tu panel. Para hacer esto, pase el método `recoverable()` a la instancia `AppAuthentication` en el método `multiFactorAuthentication()` en la [configuración](../panel-configuration):

```php
use Filament\Auth\MultiFactor\App\AppAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            AppAuthentication::make()
                ->recoverable(),
        ]);
}
```

#### Cambiar la cantidad de códigos de recuperación que se generan

De forma predeterminada, Filament genera 8 códigos de recuperación para cada usuario. Si desea cambiar esto, puede usar el método `recoveryCodeCount()` en la instancia `AppAuthentication` en el método `multiFactorAuthentication()` en la [configuración](../panel-configuration):

```php
use Filament\Auth\MultiFactor\App\AppAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            AppAuthentication::make()
                ->recoverable()
                ->recoveryCodeCount(10),
        ]);
}
```

#### Impedir que los usuarios regeneren sus códigos de recuperación

De forma predeterminada, los usuarios pueden visitar su perfil para regenerar sus códigos de recuperación. Si desea evitar esto, puede usar el método `regenerableRecoveryCodes(false)` en la instancia `AppAuthentication` en el método `multiFactorAuthentication()` en la [configuración](../panel-configuration):

```php
use Filament\Auth\MultiFactor\App\AppAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            AppAuthentication::make()
                ->recoverable()
                ->regenerableRecoveryCodes(false),
        ]);
}
```

### Cambiar el tiempo de vencimiento del código de la aplicación

Los códigos de aplicación se emiten utilizando un algoritmo de contraseña de un solo uso basado en el tiempo (TOTP), lo que significa que solo son válidos durante un corto período de tiempo antes y después del momento en que se generan. El tiempo se define en una "ventana" de tiempo. De forma predeterminada, Filament utiliza una ventana de vencimiento de `8`, que crea un período de validez de 4 minutos a cada lado del tiempo de generación (8 minutos en total).

Para cambiar la ventana, por ejemplo para que solo sea válida durante 2 minutos después de generarse, puede usar el método `codeWindow()` en la instancia `AppAuthentication`, configurada en `4`:

```php
use Filament\Auth\MultiFactor\App\AppAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            AppAuthentication::make()
                ->codeWindow(4),
        ]);
}
```

### Personalización del nombre de la marca de autenticación de la aplicación

Cada integración de autenticación de aplicaciones tiene una "marca" que se muestra en la aplicación de autenticación. De forma predeterminada, este es el nombre de tu aplicación. Si desea cambiar esto, puede usar el método `brandName()` en la instancia `AppAuthentication` en el método `multiFactorAuthentication()` en la [configuración](../panel-configuration):

```php
use Filament\Auth\MultiFactor\App\AppAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            AppAuthentication::make()
                ->brandName('Filament Demo'),
        ]);
}
```

## Autenticación de correo electrónico

La autenticación por correo electrónico envía al usuario códigos únicos a su dirección de correo electrónico, que debe ingresar para verificar su identidad.

Para habilitar la autenticación de correo electrónico en un panel, primero debe agregar una nueva columna a su tabla `users` (o cualquier tabla que se esté utilizando para su modelo Eloquent "autenticable" en este panel). La columna debe almacenar un valor booleano que indique si la autenticación de correo electrónico está habilitada o no:

```php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

Schema::table('users', function (Blueprint $table) {
    $table->boolean('has_email_authentication')->default(false);
});
```

En el modelo `User`, debe asegurarse de que esta columna se convierta en un valor booleano:

```php
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser, MustVerifyEmail
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            // ...
            'has_email_authentication' => 'boolean',
        ];
    }
    
    // ...
}
```

A continuación, debe implementar la interfaz `HasEmailAuthentication` en el modelo `User`. Esto proporciona a Filament los métodos necesarios para interactuar con la columna que indica si la autenticación de correo electrónico está habilitada o no:

```php
use Filament\Auth\MultiFactor\Email\Contracts\HasEmailAuthentication;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser, HasEmailAuthentication, MustVerifyEmail
{
    // ...

    public function hasEmailAuthentication(): bool
    {
        // This method should return true if the user has enabled email authentication.
        
        return $this->has_email_authentication;
    }

    public function toggleEmailAuthentication(bool $condition): void
    {
        // This method should save whether or not the user has enabled email authentication.
    
        $this->has_email_authentication = $condition;
        $this->save();
    }
}
```

:::tip
    Dado que Filament usa una interfaz en su modelo `User` en lugar de asumir que la columna `has_email_authentication` existe, puede usar cualquier nombre de columna que desee. Incluso podría utilizar un modelo completamente diferente si desea almacenar la configuración en una tabla diferente.
:::

Finalmente, debes activar la función de autenticación de correo electrónico en tu panel. Para hacer esto, use el método `multiFactorAuthentication()` en la [configuración](../panel-configuration) y pásele una instancia `EmailAuthentication`:

```php
use Filament\Auth\MultiFactor\Email\EmailAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            EmailAuthentication::make(),
        ]);
}
```

### Cambiar el tiempo de vencimiento del código de correo electrónico

Los códigos de correo electrónico se emiten con una vida útil de 4 minutos, después de los cuales caducan.

Para cambiar el período de vencimiento, por ejemplo, para que solo sea válido durante 2 minutos después de que se generen los códigos, puede usar el método `codeExpiryMinutes()` en la instancia `EmailAuthentication`, configurada en `2`:

```php
use Filament\Auth\MultiFactor\Email\EmailAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            EmailAuthentication::make()
                ->codeExpiryMinutes(2),
        ]);
}
```

## Requerir autenticación multifactor

De forma predeterminada, los usuarios no están obligados a configurar la autenticación multifactor. Puede solicitar a los usuarios que lo configuren pasando `isRequired: true` como parámetro al método `multiFactorAuthentication()` en la [configuración](../panel-configuration):

```php
use Filament\Auth\MultiFactor\App\AppAuthentication;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->multiFactorAuthentication([
            AppAuthentication::make(),
        ], isRequired: true);
}
```

Cuando esto esté habilitado, se pedirá a los usuarios que configuren la autenticación multifactor después de iniciar sesión, si aún no lo han hecho.

## Notas de seguridad sobre la autenticación multifactor

En Filament, el proceso de autenticación multifactor ocurre antes de que el usuario se autentique en la aplicación. Esto le permite estar seguro de que ningún usuario pueda autenticarse y acceder a la aplicación sin pasar el paso de autenticación multifactor. No es necesario que recuerde agregar middleware a ninguna de sus rutas autenticadas para garantizar que los usuarios hayan completado el paso de autenticación multifactor.

Sin embargo, si tiene otras partes de su aplicación Laravel que autentican a los usuarios, tenga en cuenta que no se les solicitará la autenticación multifactor si ya están autenticados en otro lugar y luego visitan el panel, a menos que [se requiera autenticación multifactor] (#requiring-multi-factor-authentication) y aún no lo hayan configurado.

