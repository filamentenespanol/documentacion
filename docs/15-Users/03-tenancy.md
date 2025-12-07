---
title: multiinquilino
---

## Introducción

El arrendamiento múltiple es un concepto en el que una única instancia de una aplicación sirve a varios clientes. Cada cliente tiene sus propios datos y reglas de acceso que les impiden ver o modificar los datos de los demás. Este es un patrón común en las aplicaciones SaaS. Los usuarios suelen pertenecer a grupos de usuarios (a menudo denominados equipos u organizaciones). Los registros son propiedad del grupo y los usuarios pueden ser miembros de varios grupos. Esto es adecuado para aplicaciones donde los usuarios necesitan colaborar en datos.

El arrendamiento múltiple es un tema muy delicado. Es importante comprender las implicaciones de seguridad del arrendamiento múltiple y cómo implementarlo correctamente. Si se implementa parcial o incorrectamente, los datos que pertenecen a un inquilino pueden quedar expuestos a otro inquilino. Filament proporciona un conjunto de herramientas para ayudarle a implementar la tenencia múltiple en su aplicación, pero depende de usted entender cómo usarlas.

:::warning
    Filament no ofrece ninguna garantía sobre la seguridad de su aplicación. Es su responsabilidad asegurarse de que su aplicación sea segura. Consulte la sección [seguridad](#tenancy-security) para obtener más información.
:::

## Arrendamiento simple de uno a muchos

El término "inquilino múltiple" es amplio y puede significar diferentes cosas en diferentes contextos. El sistema de arrendamiento de Filament implica que el usuario pertenece a **muchos** inquilinos (*organizaciones, equipos, empresas, etc.*) y puede cambiar entre ellos.

Si su caso es más simple y no necesita una relación de muchos a muchos, entonces no necesita configurar el arrendamiento en Filament. Podrías usar [observadores](https://laravel.com/docs/eloquent#observers) y [ámbitos globales](https://laravel.com/docs/eloquent#global-scopes) en su lugar.

Digamos que tiene una columna de base de datos `users.team_id`, puede abarcar todos los registros para que tengan el mismo `team_id` que el usuario usando un [alcance global](https://laravel.com/docs/eloquent#global-scopes):

```php
use Illuminate\Database\Eloquent\Builder;

class Post extends Model
{
    protected static function booted(): void
    {
        static::addGlobalScope('team', function (Builder $query) {
            if (auth()->hasUser()) {
                $query->where('team_id', auth()->user()->team_id);
                // or with a `team` relationship defined:
                $query->whereBelongsTo(auth()->user()->team);
            }
        });
    }
}
```

Para configurar automáticamente el `team_id` en el registro cuando se crea, puede crear un [observador](https://laravel.com/docs/eloquent#observers):

```php
class PostObserver
{
    public function creating(Post $post): void
    {
        if (auth()->hasUser()) {
            $post->team_id = auth()->user()->team_id;
            // or with a `team` relationship defined:
            $post->team()->associate(auth()->user()->team);
        }
    }
}
```

## Configurar el arrendamiento

Para configurar el arrendamiento, deberá especificar el modelo de "inquilino" (como equipo u organización) en la [configuración](../panel-configuration):

```php
use App\Models\Team;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenant(Team::class);
}
```

También deberá indicarle a Filament a qué inquilinos pertenece un usuario. Puede hacer esto implementando la interfaz `HasTenants` en el modelo `App\Models\User`:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasTenants;
use Filament\Panel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Collection;

class User extends Authenticatable implements FilamentUser, HasTenants
{
    // ...

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class);
    }

    public function getTenants(Panel $panel): Collection
    {
        return $this->teams;
    }

    public function canAccessTenant(Model $tenant): bool
    {
        return $this->teams()->whereKey($tenant)->exists();
    }
}
```

En este ejemplo, los usuarios pertenecen a muchos equipos, por lo que existe una relación `teams()`. El método `getTenants()` devuelve los equipos a los que pertenece el usuario. Filament usa esto para enumerar los inquilinos a los que el usuario tiene acceso.

Por seguridad, también debe implementar el método `canAccessTenant()` de la interfaz `HasTenants` para evitar que los usuarios accedan a los datos de otros inquilinos adivinando su ID de inquilino e introduciéndolo en la URL.

También querrá que los usuarios puedan [registrar nuevos equipos](#adding-a-tenant-registration-page).

## Agregar una página de registro de inquilinos

Una página de registro permitirá a los usuarios crear un nuevo inquilino.

Al visitar su aplicación después de iniciar sesión, los usuarios serán redirigidos a esta página si aún no tienen un inquilino.

Para configurar una página de registro, deberá crear una nueva clase de página que extienda `Filament\Pages\Tenancy\RegisterTenant`. Este es un componente Livewire de página completa. Puedes poner esto en cualquier lugar que quieras, como `app/Filament/Pages/Tenancy/RegisterTeam.php`:

```php
namespace App\Filament\Pages\Tenancy;

use App\Models\Team;
use Filament\Forms\Components\TextInput;
use Filament\Pages\Tenancy\RegisterTenant;
use Filament\Schemas\Schema;

class RegisterTeam extends RegisterTenant
{
    public static function getLabel(): string
    {
        return 'Register team';
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name'),
                // ...
            ]);
    }

    protected function handleRegistration(array $data): Team
    {
        $team = Team::create($data);

        $team->members()->attach(auth()->user());

        return $team;
    }
}
```

Puede agregar cualquier [componente de formulario](../formularios) al método `form()` y ​​crear el equipo dentro del método `handleRegistration()`.

Ahora, debemos decirle a Filament que use esta página. Esto lo podemos hacer en la [configuración](../panel-configuration):

```php
use App\Filament\Pages\Tenancy\RegisterTeam;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantRegistration(RegisterTeam::class);
}
```

### Personalización de la página de registro de inquilinos

Puede anular cualquier método que desee en la clase de la página de registro base para que actúe como desee. Incluso la propiedad `$view` se puede anular para utilizar una vista personalizada de su elección.

## Agregar una página de perfil de inquilino

Una página de perfil permitirá a los usuarios editar información sobre el inquilino.

Para configurar una página de perfil, deberá crear una nueva clase de página que extienda `Filament\Pages\Tenancy\EditTenantProfile`. Este es un componente Livewire de página completa. Puedes poner esto en cualquier lugar que quieras, como `app/Filament/Pages/Tenancy/EditTeamProfile.php`:

```php
namespace App\Filament\Pages\Tenancy;

use Filament\Forms\Components\TextInput;
use Filament\Pages\Tenancy\EditTenantProfile;
use Filament\Schemas\Schema;

class EditTeamProfile extends EditTenantProfile
{
    public static function getLabel(): string
    {
        return 'Team profile';
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name'),
                // ...
            ]);
    }
}
```

Puede agregar cualquier [componente de formulario](../formularios) al método `form()`. Se guardarán directamente en el modelo de inquilino.

Ahora, debemos decirle a Filament que use esta página. Esto lo podemos hacer en la [configuración](../panel-configuration):

```php
use App\Filament\Pages\Tenancy\EditTeamProfile;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantProfile(EditTeamProfile::class);
}
```

### Personalización de la página de perfil del inquilino

Puede anular cualquier método que desee en la clase de la página de perfil base para que actúe como desee. Incluso la propiedad `$view` se puede anular para utilizar una vista personalizada de su elección.

## Accediendo al inquilino actual

En cualquier lugar de la aplicación, puede acceder al modelo de inquilino para la solicitud actual usando `Filament::getTenant()`:

```php
use Filament\Facades\Filament;

$tenant = Filament::getTenant();
```

## Facturación

### Usando Laravel Spark

Filament proporciona una integración de facturación con [Laravel Spark](https://spark.laravel.com). Sus usuarios pueden iniciar suscripciones y administrar su información de facturación.

Para instalar la integración, primero [instale Spark](https://spark.laravel.com/docs/installation.html) y configúrelo para su modelo de inquilino.

Ahora puedes instalar el proveedor de facturación de Filament para Spark usando Composer:

```bash
composer require filament/spark-billing-provider
```

En la [configuración](../panel-configuration), configure Spark como `tenantBillingProvider()`:

```php
use Filament\Billing\Providers\SparkBillingProvider;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantBillingProvider(new SparkBillingProvider());
}
```

¡Ahora ya está todo listo! Los usuarios pueden administrar su facturación haciendo clic en un enlace en el menú del inquilino.

### Requerir una suscripción

Para requerir una suscripción para usar cualquier parte de la aplicación, puede usar el método de configuración `requiresTenantSubscription()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->requiresTenantSubscription();
}
```

Ahora, los usuarios serán redirigidos a la página de facturación si no tienen una suscripción activa.

#### Requerir una suscripción para recursos y páginas específicas

A veces, es posible que desees solicitar solo una suscripción para ciertos [recursos](recursos) y [páginas personalizadas](../navigación/páginas personalizadas) en tu aplicación. Puede hacer esto devolviendo `true` del método `isTenantSubscriptionRequired()` en el recurso o clase de página:

```php
public static function isTenantSubscriptionRequired(Panel $panel): bool
{
    return true;
}
```

Si está utilizando el método de configuración `requiresTenantSubscription()`, puede devolver `false` desde este método para permitir el acceso al recurso o página como excepción.

### Escribir una integración de facturación personalizada

Las integraciones de facturación son bastante sencillas de escribir. Sólo necesitas una clase que implemente la interfaz `Filament\Billing\Providers\Contracts\Provider`. Esta interfaz tiene dos métodos.

`getRouteAction()` se utiliza para obtener la acción de ruta que debe ejecutarse cuando el usuario visita la página de facturación. Esto podría ser una función de devolución de llamada, el nombre de un controlador o un componente Livewire, cualquier cosa que funcione cuando se usa `Route::get()` en Laravel normalmente. Por ejemplo, puede realizar una redirección simple a su propia página de facturación mediante una función de devolución de llamada.

`getSubscribedMiddleware()` devuelve el nombre de un middleware que debe usarse para verificar si el inquilino tiene una suscripción activa. Este middleware debería redirigir al usuario a la página de facturación si no tiene una suscripción activa.

A continuación se muestra un ejemplo de proveedor de facturación que utiliza una función de devolución de llamada para la acción de ruta y un middleware para el middleware suscrito:

```php
use App\Http\Middleware\RedirectIfUserNotSubscribed;
use Filament\Billing\Providers\Contracts\BillingProvider;
use Illuminate\Http\RedirectResponse;

class ExampleBillingProvider implements BillingProvider
{
    public function getRouteAction(): string
    {
        return function (): RedirectResponse {
            return redirect('https://billing.example.com');
        };
    }

    public function getSubscribedMiddleware(): string
    {
        return RedirectIfUserNotSubscribed::class;
    }
}
```

### Personalización del slug de ruta de facturación

Puede personalizar el slug URL utilizado para la ruta de facturación utilizando el método `tenantBillingRouteSlug()` en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantBillingRouteSlug('billing');
}
```

## Personalizando el menú del inquilino

El menú de cambio de inquilino aparece en el diseño de administración. Es totalmente personalizable.

Cada elemento del menú está representado por una [acción](../acciones) y se puede personalizar de la misma manera. Para registrar nuevos elementos, puede pasar las acciones al método `tenantMenuItems()` de la [configuración](../panel-configuration):

```php
use App\Filament\Pages\Settings;
use Filament\Actions\Action;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantMenuItems([
            Action::make('settings')
                ->url(fn (): string => Settings::getUrl())
                ->icon('heroicon-m-cog-8-tooth'),
            // ...
        ]);
}
```

### Personalizando el enlace de registro

Para personalizar el enlace [registro](#adding-a-tenant-registration-page) en el menú de inquilinos, registre un nuevo elemento con la clave de matriz `register` y ​​pase una función que [personalice la acción](../acciones) objeto:

```php
use Filament\Actions\Action;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantMenuItems([
            'register' => fn (Action $action) => $action->label('Register new team'),
            // ...
        ]);
}
```

### Personalizando el enlace del perfil

Para personalizar el enlace del perfil de usuario al inicio del menú del inquilino, registre un nuevo elemento con la clave de matriz `profile` y ​​pase una función que [personalice la acción](../acciones) objeto:

```php
use Filament\Actions\Action;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantMenuItems([
            'profile' => fn (Action $action) => $action->label('Edit team profile'),
            // ...
        ]);
}
```

### Personalizando el enlace de facturación

Para personalizar el enlace de facturación en el menú del inquilino, registre un nuevo elemento con la clave de matriz `profile` y ​​pase una función que [personalice la acción](../acciones):

```php
use Filament\Actions\Action
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantMenuItems([
            'billing' => fn (Action $action) => $action->label('Manage subscription'),
            // ...
        ]);
}
```

### Ocultar condicionalmente elementos del menú de inquilinos

También puede ocultar condicionalmente un elemento del menú de inquilino utilizando los métodos `visible()` o `hidden()`, pasando una condición para verificar. Pasar una función pospondrá la evaluación de la condición hasta que el menú se esté procesando realmente:

```php
use Filament\Actions\Action;

Action::make('settings')
    ->visible(fn (): bool => auth()->user()->can('manage-team'))
    // or
    ->hidden(fn (): bool => ! auth()->user()->can('manage-team'))
```

### Envío de una solicitud HTTP `POST` desde un elemento del menú de inquilino

Puede enviar una solicitud HTTP `POST` desde un elemento del menú de inquilino pasando una URL al método `url()` y ​​también usando `postToUrl()`:

```php
use Filament\Actions\Action;

Action::make('lockSession')
    ->url(fn (): string => route('lock-session'))
    ->postToUrl()
```

### Ocultar el menú del inquilino

Puede ocultar el menú de inquilinos usando `tenantMenu(false)`

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantMenu(false);
}
```

Sin embargo, esto es una señal de que la función de arrendamiento de Filament no es adecuada para su proyecto. Si cada usuario solo pertenece a un inquilino, debe ceñirse al [inquilino simple de uno a muchos] (#inquilino simple de uno a muchos).

## Configurar avatares

De fábrica, Filament utiliza [ui-avatars.com](https://ui-avatars.com) para generar avatares basados ​​en el nombre de un usuario. Sin embargo, si su modelo de usuario tiene un atributo `avatar_url`, se utilizará en su lugar. Para personalizar cómo Filament obtiene la URL del avatar de un usuario, puede implementar el contrato `HasAvatar`:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasAvatar;
use Illuminate\Database\Eloquent\Model;

class Team extends Model implements HasAvatar
{
    // ...

    public function getFilamentAvatarUrl(): ?string
    {
        return $this->avatar_url;
    }
}
```

El método `getFilamentAvatarUrl()` se utiliza para recuperar el avatar del usuario actual. Si este método devuelve `null`, Filament recurrirá a [ui-avatars.com](https://ui-avatars.com).

Puedes cambiar fácilmente [ui-avatars.com](https://ui-avatars.com) por un servicio diferente creando un nuevo proveedor de avatar. [Puedes aprender cómo hacer esto aquí.](descripción general#uso-de-un-proveedor-de-avatar-diferente)

## Configurar las relaciones de inquilinos

Al crear y enumerar registros asociados con un inquilino, Filament necesita acceso a dos relaciones Eloquent para cada recurso: una relación de "propiedad" que se define en la clase de modelo de recurso y una relación en la clase de modelo de inquilino. De forma predeterminada, Filament intentará adivinar los nombres de estas relaciones basándose en las convenciones estándar de Laravel. Por ejemplo, si el modelo de inquilino es `App\Models\Team`, buscará una relación `team()` en la clase de modelo de recurso. Y si la clase de modelo de recurso es `App\Models\Post`, buscará una relación `posts()` en la clase de modelo de inquilino.

### Personalización del nombre de la relación de propiedad

Puede personalizar el nombre de la relación de propiedad utilizada en todos los recursos a la vez, utilizando el argumento `ownershipRelationship` en el método de configuración `tenant()`. En este ejemplo, las clases de modelo de recursos tienen una relación `owner` definida:

```php
use App\Models\Team;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenant(Team::class, ownershipRelationship: 'owner');
}
```

Alternativamente, puede establecer la propiedad estática `$tenantOwnershipRelationshipName` en la clase de recurso, que luego puede usarse para personalizar el nombre de la relación de propiedad que solo se usa para ese recurso. En este ejemplo, la clase de modelo `Post` tiene una relación `owner` definida:

```php
use Filament\Resources\Resource;

class PostResource extends Resource
{
    protected static ?string $tenantOwnershipRelationshipName = 'owner';

    // ...
}
```

### Personalización del nombre de la relación de recursos

Puede establecer la propiedad estática `$tenantRelationshipName` en la clase de recurso, que luego se puede usar para personalizar el nombre de la relación que se usa para recuperar ese recurso. En este ejemplo, la clase de modelo de inquilino tiene una relación `blogPosts` definida:

```php
use Filament\Resources\Resource;

class PostResource extends Resource
{
    protected static ?string $tenantRelationshipName = 'blogPosts';

    // ...
}
```

## Configurando el atributo slug

Cuando utilice un inquilino como un equipo, es posible que desee agregar un campo slug a la URL en lugar del ID del equipo. Puede hacerlo con el argumento `slugAttribute` en el método de configuración `tenant()`:

```php
use App\Models\Team;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenant(Team::class, slugAttribute: 'slug');
}
```

## Configurando el atributo de nombre

De forma predeterminada, Filament utilizará el atributo `name` del inquilino para mostrar su nombre en la aplicación. Para cambiar esto, puede implementar el contrato `HasName`:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\HasName;
use Illuminate\Database\Eloquent\Model;

class Team extends Model implements HasName
{
    // ...

    public function getFilamentName(): string
    {
        return "{$this->name} {$this->subscription_plan}";
    }
}
```

El método `getFilamentName()` se utiliza para recuperar el nombre del usuario actual.

## Configuración de la etiqueta del inquilino actual

Dentro del selector de inquilinos, es posible que desees agregar una pequeña etiqueta como "Equipo activo" encima del nombre del equipo actual. Puede hacerlo implementando el método `HasCurrentTenantLabel` en el modelo de inquilino:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\HasCurrentTenantLabel;
use Illuminate\Database\Eloquent\Model;

class Team extends Model implements HasCurrentTenantLabel
{
    // ...

    public function getCurrentTenantLabel(): string
    {
        return 'Active team';
    }
}
```

## Configurar el inquilino predeterminado

Al iniciar sesión, Filament redirigirá al usuario al primer inquilino devuelto por el método `getTenants()`.

A veces, es posible que desees cambiar esto. Por ejemplo, puede almacenar qué equipo estuvo activo por última vez y, en su lugar, redirigir al usuario a ese equipo.

Para personalizar esto, puede implementar el contrato `HasDefaultTenant` en el usuario:

```php
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasDefaultTenant;
use Filament\Models\Contracts\HasTenants;
use Filament\Panel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Model implements FilamentUser, HasDefaultTenant, HasTenants
{
    // ...

    public function getDefaultTenant(Panel $panel): ?Model
    {
        return $this->latestTeam;
    }

    public function latestTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'latest_team_id');
    }
}
```

## Aplicar middleware a rutas conscientes de los inquilinos

Puede aplicar middleware adicional a todas las rutas compatibles con los inquilinos pasando una serie de clases de middleware al método `tenantMiddleware()` en el [archivo de configuración del panel](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantMiddleware([
            // ...
        ]);
}
```

De forma predeterminada, el middleware se ejecutará cuando la página se cargue por primera vez, pero no en solicitudes posteriores de Livewire AJAX. Si desea ejecutar middleware en cada solicitud, puede hacerlo persistente pasando `true` como segundo argumento del método `tenantMiddleware()`:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantMiddleware([
            // ...
        ], isPersistent: true);
}
```

## Agregar un prefijo de ruta de inquilino

De forma predeterminada, la estructura de la URL colocará el ID del inquilino o el slug inmediatamente después de la ruta del panel. Si desea anteponerle otro segmento de URL, utilice el método `tenantRoutePrefix()`:

```php
use App\Models\Team;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->path('admin')
        ->tenant(Team::class)
        ->tenantRoutePrefix('team');
}
```

Antes, la estructura de URL era `/admin/1` para el inquilino 1. Ahora es `/admin/team/1`.

## Usar un dominio para identificar al inquilino

Cuando utilice un inquilino, es posible que desee utilizar enrutamiento de dominio o subdominio como `team1.example.com/posts` en lugar de un prefijo de ruta como `/team1/posts`. Puede hacerlo con el método `tenantDomain()`, junto con el método de configuración `tenant()`. El argumento `tenant` corresponde al atributo slug del modelo de inquilino:

```php
use App\Models\Team;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenant(Team::class, slugAttribute: 'slug')
        ->tenantDomain('{tenant:slug}.example.com');
}
```

En los ejemplos anteriores, los inquilinos viven en subdominios del dominio de la aplicación principal. También puede configurar el sistema para resolver todo el dominio del inquilino:

```php
use App\Models\Team;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenant(Team::class, slugAttribute: 'domain')
        ->tenantDomain('{tenant:domain}');
}
```

En este ejemplo, el atributo `domain` debe contener un host de dominio válido, como `example.com` o `subdomain.example.com`.

:::info
    Cuando se utiliza un parámetro para todo el dominio (`tenantDomain('{tenant:domain}')`), Filament registrará un [patrón de parámetro de ruta global](https://laravel.com/docs/routing#parameters-global-constraints) para que todos los parámetros `tenant` en la aplicación sean `[a-z0-9.\-]+`. Esto se debe a que Laravel no permite el carácter `.` en los parámetros de ruta de forma predeterminada. Esto podría entrar en conflicto con otros paneles que usan arrendamiento u otras partes de su aplicación que usan un parámetro de ruta `tenant`.
:::

## Deshabilitar el arrendamiento de un recurso

De forma predeterminada, todos los recursos dentro de un panel con arrendamiento tendrán como ámbito el inquilino actual. Si tiene recursos compartidos entre inquilinos, puede deshabilitar el arrendamiento para ellos configurando la propiedad estática `$isScopedToTenant` en `false` en la clase de recurso:

```php
protected static bool $isScopedToTenant = false;
```

### Deshabilitar el arrendamiento para todos los recursos

Si desea optar por el arrendamiento para cada recurso en lugar de excluirse, puede llamar a `Resource::scopeToTenant(false)` dentro del método `boot()` de un proveedor de servicios o un middleware:

```php
use Filament\Resources\Resource;

Resource::scopeToTenant(false);
```

Ahora, puede optar por el arrendamiento de cada recurso configurando la propiedad estática `$isScopedToTenant` en `true` en una clase de recurso:

```php
protected static bool $isScopedToTenant = true;
```

## Seguridad de arrendamiento

Es importante comprender las implicaciones de seguridad del arrendamiento múltiple y cómo implementarlo correctamente. Si se implementa parcial o incorrectamente, los datos que pertenecen a un inquilino pueden quedar expuestos a otro inquilino. Filament proporciona un conjunto de herramientas para ayudarle a implementar la tenencia múltiple en su aplicación, pero depende de usted entender cómo usarlas. Filament no ofrece ninguna garantía sobre la seguridad de su aplicación. Es su responsabilidad asegurarse de que su aplicación sea segura.

A continuación se muestra una lista de características que Filament proporciona para ayudarlo a implementar el arrendamiento múltiple en su aplicación:

- Alcance global automático de consultas del modelo Eloquent para recursos [conscientes del inquilino](#disabling-tenancy-for-a-resource) que pertenecen al panel con el inquilino habilitado. La consulta utilizada para recuperar registros de un recurso tiene como alcance automáticamente el inquilino actual. Esta consulta se usa para representar la tabla de lista del recurso y también se usa para resolver registros de la URL actual al editar o ver un registro. Esto significa que si un usuario intenta ver un registro que no pertenece al inquilino actual, recibirá un error 404.
    - Debe existir un recurso [conocido por el inquilino] (#disabling-tenancy-for-a-resource) en el panel con el inquilino habilitado para que el modelo del recurso tenga aplicado el alcance global. Si desea definir el alcance de las consultas para un modelo que no tiene un recurso correspondiente, debe [usar middleware para aplicar alcances globales adicionales](#using-tenant-aware-middleware-to-apply-additional-global-scopes) para ese modelo.
    - Los alcances globales se aplican una vez identificado el inquilino a partir de la solicitud. Esto sucede durante la pila de middleware de solicitudes de panel. Si realiza una consulta antes de que se haya identificado al inquilino, como por ejemplo desde el middleware inicial en la pila o en un proveedor de servicios, la consulta no se limitará al inquilino actual. Para garantizar que el middleware se ejecute después de identificar al inquilino actual, debe registrarlo como [middleware de inquilino] (#applying-middleware-to-tenant-aware-routes).
    - Según el punto anterior, las consultas realizadas fuera del panel con el arrendamiento habilitado no tienen acceso al inquilino actual, por lo que no tienen alcance. En caso de duda, verifique si sus consultas tienen el alcance adecuado o no antes de implementar su aplicación.
    - Si necesita deshabilitar el alcance global de arrendamiento para una consulta específica, puede usar el método `withoutGlobalScope(filament()->getTenancyScopeName())` en la consulta.
    - Si alguna de sus consultas deshabilita todos los ámbitos globales, el alcance global del arrendamiento también se deshabilitará. Debe tener cuidado al utilizar este método, ya que puede provocar una fuga de datos. Si necesita deshabilitar todos los ámbitos globales excepto el alcance global de arrendamiento, puede usar el método `withoutGlobalScopes()` pasando una matriz de los ámbitos globales que desea deshabilitar.

- Asociación automática de modelos Eloquent recién creados con el inquilino actual. Cuando se crea un nuevo registro para un recurso [consciente del inquilino](#disabling-tenancy-for-a-resource), el inquilino se asocia automáticamente con el registro. Esto significa que el registro pertenecerá al inquilino actual, ya que la columna de clave externa se establece automáticamente en el ID del inquilino. Esto se hace al registrar Filament un detector de eventos para los eventos `creating` y ​​`created` en el modelo Eloquent del recurso. Si necesita desactivar esta función para un modelo específico, puede utilizar el método `withoutTenancy()` en el modelo.
    - Debe existir un recurso [conocido por el inquilino](#disabling-tenancy-for-a-resource) en el panel con el inquilino habilitado para que el modelo del recurso tenga la asociación automática. Si desea una asociación automática para un modelo que no tiene un recurso correspondiente, debe [registrar un oyente para el evento `creating`](https://laravel.com/docs/eloquent#events) para ese modelo y asociar el `filament()->getTenant()` con él.
    - Los eventos se ejecutan una vez identificado el inquilino a partir de la solicitud. Esto sucede durante la pila de middleware de solicitudes de panel. Si crea un modelo antes de que se haya identificado al inquilino, como a partir del middleware inicial en la pila o en un proveedor de servicios, no se asociará con el inquilino actual. Para garantizar que el middleware se ejecute después de identificar al inquilino actual, debe registrarlo como [middleware de inquilino] (#applying-middleware-to-tenant-aware-routes).
    - Según el punto anterior, los modelos creados fuera del panel con el arrendamiento habilitado no tienen acceso al inquilino actual, por lo que no están asociados. En caso de duda, verifique si sus modelos están asociados correctamente o no antes de implementar su aplicación.
    - Si necesita desactivar la asociación automática para un modelo en particular, puede [silenciar los eventos](https://laravel.com/docs/eloquent#muting-events) temporalmente mientras lo crea. Si alguno de sus códigos actualmente hace esto o elimina los detectores de eventos de forma permanente, debe verificar que esto no afecte la función de arrendamiento.

### `unique` y ​​`exists` validación

Las reglas de validación `unique` y ​​`exists` de Laravel no utilizan modelos Eloquent para consultar la base de datos de forma predeterminada, por lo que no utilizará ningún ámbito global definido en el modelo, incluso para arrendamiento múltiple. Como tal, incluso si hay un registro eliminado temporalmente con el mismo valor en un inquilino diferente, la validación fallará.

Si desea que dos inquilinos tengan una separación completa de datos, debe usar los métodos `scopedUnique()` o `scopedExists()`, que reemplazan las implementaciones `unique` y ​​`exists` de Laravel con otras que usan el modelo para consultar la base de datos, aplicando cualquier alcance global definido en el modelo, incluso para inquilinos múltiples:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('email')
    ->scopedUnique()
    // or
    ->scopedExists()
```

Para obtener más información, consulte la [documentación de validación](../forms/validation) para [`unique()`](../forms/validation#unique) y [`exists()`](../forms/validation#exists).

### Uso de middleware compatible con inquilinos para aplicar ámbitos globales adicionales

Dado que solo los modelos con recursos que existen en el panel tienen automáticamente el alcance del inquilino actual, podría ser útil aplicar un alcance de inquilino adicional a otros modelos de Eloquent mientras se usan en su panel. Esto le permitiría olvidarse de limitar el alcance de sus consultas al inquilino actual y, en su lugar, aplicar el alcance automáticamente. Para hacer esto, puede crear una nueva clase de middleware como `ApplyTenantScopes`:

```bash
php artisan make:middleware ApplyTenantScopes
```

Dentro del método `handle()`, puedes aplicar cualquier alcance global que desees:

```php
use App\Models\Author;
use Closure;
use Filament\Facades\Filament;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ApplyTenantScopes
{
    public function handle(Request $request, Closure $next)
    {
        Author::addGlobalScope(
            'tenant',
            fn (Builder $query) => $query->whereBelongsTo(Filament::getTenant()),
        );

        return $next($request);
    }
}
```

Ahora puede [registrar este middleware](#applying-middleware-to-tenant-aware-routes) para todas las rutas con reconocimiento de inquilinos y asegurarse de que se utilice en todas las solicitudes Livewire AJAX haciéndolo persistente:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->tenantMiddleware([
            ApplyTenantScopes::class,
        ], isPersistent: true);
}
```
