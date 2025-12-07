---
title: Recursos de prueba
---

## Autenticarse como usuario

Asegúrese de estar autenticado para acceder a la aplicación en su `TestCase`:

```php
use App\Models\User;

protected function setUp(): void
{
    parent::setUp();

    $this->actingAs(User::factory()->create());
}
```

Alternativamente, si está utilizando Pest, puede usar una función `beforeEach()` en la parte superior de su archivo de prueba para autenticarse:

```php
use App\Models\User;

beforeEach(function () {
    $user = User::factory()->create();

    actingAs($user);
});
```

## Probando una página de lista de recursos

Para probar si la página de lista se puede cargar, pruebe la página de lista como un componente Livewire y llame a `assertOk()` para asegurarse de que la respuesta HTTP haya sido 200 correcta. También puede utilizar el método `assertCanSeeTableRecords()` para comprobar si los registros se muestran en la tabla:

```php
use App\Filament\Resources\Users\Pages\ListUsers;
use App\Models\User;

it('can load the page', function () {
    $users = User::factory()->count(5)->create();

    livewire(ListUsers::class)
        ->assertOk()
        ->assertCanSeeTableRecords($users);
});
```

Para probar la tabla en la página de lista, debe visitar la sección [Tablas de prueba](tablas de prueba). Para probar cualquier acción en el encabezado de la página o acciones en la tabla, debe visitar la sección [Acciones de prueba](acciones de prueba). A continuación se muestran algunos ejemplos comunes de otras pruebas que puede ejecutar en la página de lista.

Para [probar que la búsqueda en la tabla está funcionando](testing-tables#testing-that-a-column-can-be-searched), puede utilizar el método `searchTable()` para buscar un registro específico. También puede utilizar los métodos `assertCanSeeTableRecords()` y ​​`assertCanNotSeeTableRecords()` para comprobar si se muestran los registros correctos en la tabla:

```php
use App\Filament\Resources\Users\Pages\ListUsers;
use App\Models\User;

it('can search users by `name` or `email`', function () {
    $users = User::factory()->count(5)->create();

    livewire(ListUsers::class)
        ->assertCanSeeTableRecords($users)
        ->searchTable($users->first()->name)
        ->assertCanSeeTableRecords($users->take(1))
        ->assertCanNotSeeTableRecords($users->skip(1))
        ->searchTable($users->last()->email)
        ->assertCanSeeTableRecords($users->take(-1))
        ->assertCanNotSeeTableRecords($users->take($users->count() - 1));
});
```

Para [probar que la clasificación de la tabla funciona](testing-tables#testing-that-a-column-can-be-sorted), puede utilizar el método `sortTable()` para ordenar la tabla por una columna específica. También puede utilizar el método `assertCanSeeTableRecords()` para comprobar si los registros se muestran en el orden correcto:

```php
use App\Filament\Resources\Users\Pages\ListUsers;
use App\Models\User;

it('can sort users by `name`', function () {
    $users = User::factory()->count(5)->create();

    livewire(ListUsers::class)
        ->assertCanSeeTableRecords($users)
        ->sortTable('name')
        ->assertCanSeeTableRecords($users->sortBy('name'), inOrder: true)
        ->sortTable('name', 'desc')
        ->assertCanSeeTableRecords($users->sortByDesc('name'), inOrder: true);
});
```

Para [probar que el filtrado de la tabla está funcionando](testing-tables#testing-filters), puede utilizar el método `filterTable()` para filtrar la tabla por una columna específica. También puede utilizar los métodos `assertCanSeeTableRecords()` y ​​`assertCanNotSeeTableRecords()` para comprobar si se muestran los registros correctos en la tabla:

```php
use App\Filament\Resources\Users\Pages\ListUsers;
use App\Models\User;

it('can filter users by `locale`', function () {
    $users = User::factory()->count(5)->create();

    livewire(ListUsers::class)
        ->assertCanSeeTableRecords($users)
        ->filterTable('locale', $users->first()->locale)
        ->assertCanSeeTableRecords($users->where('locale', $users->first()->locale))
        ->assertCanNotSeeTableRecords($users->where('locale', '!=', $users->first()->locale));
});
```

Para [probar que las acciones masivas de la tabla están funcionando](testing-actions#testing-table-bulk-actions), puede utilizar el método `selectTableRecords()` para seleccionar varios registros en la tabla. También puedes utilizar el método `callAction()` para llamar a una acción específica en los registros seleccionados:

```php
use App\Filament\Resources\Users\Pages\ListUsers;
use App\Models\User;
use Filament\Actions\Testing\TestAction;
use function Pest\Laravel\assertDatabaseMissing;

it('can bulk delete users', function () {
    $users = User::factory()->count(5)->create();

    livewire(ListUsers::class)
        ->assertCanSeeTableRecords($users)
        ->selectTableRecords($users)
        ->callAction(TestAction::make(DeleteBulkAction::class)->table()->bulk())
        ->assertNotified()
        ->assertCanNotSeeTableRecords($users);

    $users->each(fn (User $user) => assertDatabaseMissing($user));
});
```

## Probando una página de creación de recursos

Para probar si la página de creación se puede cargar, pruebe la página de creación como un componente Livewire y llame a `assertOk()` para asegurarse de que la respuesta HTTP haya sido 200 OK:

```php
use App\Filament\Resources\Users\Pages\CreateUser;
use App\Models\User;

it('can load the page', function () {
    livewire(CreateUser::class)
        ->assertOk();
});
```

Para probar el formulario en la página de creación, debe visitar la sección [Esquemas de prueba](esquemas de prueba). Para probar cualquier acción en el encabezado de la página o en el formulario, debes visitar la sección [Acciones de prueba](acciones-de prueba). A continuación se muestran algunos ejemplos comunes de otras pruebas que puede ejecutar en la página de creación.

Para probar que el formulario está creando registros correctamente, puede usar el método `fillForm()` para completar los campos del formulario y luego usar el método `call('create')` para crear el registro. También puede utilizar el método `assertNotified()` para comprobar si se mostró una notificación y el método `assertRedirect()` para comprobar si el usuario fue redirigido a otra página:

```php
use App\Filament\Resources\Users\Pages\CreateUser;
use App\Models\User;
use function Pest\Laravel\assertDatabaseHas;

it('can create a user', function () {
    $newUserData = User::factory()->make();

    livewire(CreateUser::class)
        ->fillForm([
            'name' => $newUserData->name,
            'email' => $newUserData->email,
        ])
        ->call('create')
        ->assertNotified()
        ->assertRedirect();

    assertDatabaseHas(User::class, [
        'name' => $newUserData->name,
        'email' => $newUserData->email,
    ]);
});
```

Para probar que el formulario se está validando correctamente, puede usar el método `fillForm()` para completar los campos del formulario y luego usar el método `call('create')` para crear el registro. También puede usar el método `assertHasFormErrors()` para verificar si el formulario tiene algún error y el método `assertNotNotified()` para verificar si no se mostró ninguna notificación. También puedes utilizar el método `assertNoRedirect()` para comprobar si el usuario no fue redirigido a otra página. En este ejemplo, utilizamos un [conjunto de datos de Pest](https://pestphp.com/docs/datasets#content-bound-datasets) para probar varias reglas sin tener que repetir el código de prueba:

```php
use App\Filament\Resources\Users\Pages\CreateUser;
use App\Models\User;
use Illuminate\Support\Str;

it('validates the form data', function (array $data, array $errors) {
    $newUserData = User::factory()->make();

    livewire(CreateUser::class)
        ->fillForm([
            'name' => $newUserData->name,
            'email' => $newUserData->email,
            ...$data,
        ])
        ->call('create')
        ->assertHasFormErrors($errors)
        ->assertNotNotified()
        ->assertNoRedirect();
})->with([
    '`name` is required' => [['name' => null], ['name' => 'required']],
    '`name` is max 255 characters' => [['name' => Str::random(256)], ['name' => 'max']],
    '`email` is a valid email address' => [['email' => Str::random()], ['email' => 'email']],
    '`email` is required' => [['email' => null], ['email' => 'required']],
    '`email` is max 255 characters' => [['email' => Str::random(256)], ['email' => 'max']],
]);
```

## Probando una página de edición de recursos

Para probar si la página de edición se puede cargar, pruebe la página de edición como un componente Livewire y llame a `assertOk()` para asegurarse de que la respuesta HTTP sea 200 OK. También puede utilizar el método `assertSchemaStateSet()` para comprobar si los campos del formulario están configurados con los valores correctos:

```php
use App\Filament\Resources\Users\Pages\EditUser;
use App\Models\User;

it('can load the page', function () {
    $user = User::factory()->create();

    livewire(EditUser::class, [
        'record' => $user->id,
    ])
        ->assertOk()
        ->assertSchemaStateSet([
            'name' => $user->name,
            'email' => $user->email,
        ]);
});
```

Para probar el formulario en la página de edición, debe visitar la sección [Esquemas de prueba](esquemas de prueba). Para probar cualquier acción en el encabezado de la página o en el formulario, debes visitar la sección [Acciones de prueba](acciones-de prueba). A continuación se muestran algunos ejemplos comunes de otras pruebas que puede ejecutar en la página de edición.

```php
use App\Filament\Resources\Users\Pages\EditUser;
use App\Models\User;
use function Pest\Laravel\assertDatabaseHas;

it('can update a user', function () {
    $user = User::factory()->create();

    $newUserData = User::factory()->make();

    livewire(EditUser::class, [
        'record' => $user->id,
    ])
        ->fillForm([
            'name' => $newUserData->name,
            'email' => $newUserData->email,
        ])
        ->call('save')
        ->assertNotified();

    assertDatabaseHas(User::class, [
        'id' => $user->id,
        'name' => $newUserData->name,
        'email' => $newUserData->email,
    ]);
});
```

Para probar que el formulario se valida correctamente, puede usar el método `fillForm()` para completar los campos del formulario y luego usar el método `call('save')` para guardar el registro. También puede usar el método `assertHasFormErrors()` para verificar si el formulario tiene algún error y el método `assertNotNotified()` para verificar si no se mostró ninguna notificación. En este ejemplo, utilizamos un [conjunto de datos de Pest](https://pestphp.com/docs/datasets#content-bound-datasets) para probar varias reglas sin tener que repetir el código de prueba:

```php
use App\Filament\Resources\Users\Pages\EditUser;
use App\Models\User;
use Illuminate\Support\Str;

it('validates the form data', function (array $data, array $errors) {
    $user = User::factory()->create();

    $newUserData = User::factory()->make();

    livewire(EditUser::class, [
        'record' => $user->id,
    ])
        ->fillForm([
            'name' => $newUserData->name,
            'email' => $newUserData->email,
            ...$data,
        ])
        ->call('save')
        ->assertHasFormErrors($errors)
        ->assertNotNotified();
})->with([
    '`name` is required' => [['name' => null], ['name' => 'required']],
    '`name` is max 255 characters' => [['name' => Str::random(256)], ['name' => 'max']],
    '`email` is a valid email address' => [['email' => Str::random()], ['email' => 'email']],
    '`email` is required' => [['email' => null], ['email' => 'required']],
    '`email` is max 255 characters' => [['email' => Str::random(256)], ['email' => 'max']],
]);
```

Para [probar que una acción está funcionando] (acciones de prueba), como `DeleteAction`, puede usar el método `callAction()` para llamar a la acción de eliminación. También puede utilizar el método `assertNotified()` para comprobar si se mostró una notificación y el método `assertRedirect()` para comprobar si el usuario fue redirigido a otra página:

```php
use App\Filament\Resources\Users\Pages\EditUser;
use App\Models\User;
use Filament\Actions\DeleteAction;
use function Pest\Laravel\assertDatabaseMissing;

it('can delete a user', function () {
    $user = User::factory()->create();

    livewire(EditUser::class, [
        'record' => $user->id,
    ])
        ->callAction(DeleteAction::class)
        ->assertNotified()
        ->assertRedirect();

    assertDatabaseMissing($user);
});
```

## Probando una página de vista de recursos

Para probar si la página de visualización se puede cargar, pruebe la página de visualización como un componente Livewire y llame a `assertOk()` para asegurarse de que la respuesta HTTP haya sido 200 OK. También puede utilizar el método `assertSchemaStateSet()` para comprobar si las entradas de la infolista están configuradas con los valores correctos:

```php
use App\Filament\Resources\Users\Pages\ViewUser;
use App\Models\User;

it('can load the page', function () {
    $user = User::factory()->create();

    livewire(ViewUser::class, [
        'record' => $user->id,
    ])
        ->assertOk()
        ->assertSchemaStateSet([
            'name' => $user->name,
            'email' => $user->email,
        ]);
});
```

Para probar la infolista en la página de visualización, debe visitar la sección [Esquemas de prueba](esquemas de prueba). Para probar cualquier acción en el encabezado de la página o en la infolista, debes visitar la sección [Acciones de prueba](acciones-de prueba).

## Probando gerentes de relaciones

Para probar si se representa un administrador de relaciones en una página, como la página de edición de un recurso, puede usar el método `assertSeeLivewire()` para verificar si se está representando el administrador de relaciones:

```php
use App\Filament\Resources\Users\Pages\EditUser;
use App\Filament\Resources\Users\RelationManagers\PostsRelationManager;
use App\Models\User;

it('can load the relation manager', function () {
    $user = User::factory()->create();

    livewire(EditUser::class, [
        'record' => $user->id,
    ])
        ->assertSeeLivewire(PostsRelationManager::class);
});
```

Dado que los administradores de relaciones son componentes de Livewire, también puede probar la funcionalidad de un administrador de relaciones en sí, como su capacidad para cargarse exitosamente con una respuesta 200 OK, con los registros correctos en la tabla. Al probar un administrador de relaciones, debe pasar `ownerRecord`, que es el registro del recurso en el que se encuentra, y `pageClass`, que es la clase de la página en la que se encuentra:

```php
use App\Filament\Resources\Users\Pages\EditUser;
use App\Filament\Resources\Users\RelationManagers\PostsRelationManager;
use App\Models\Post;
use App\Models\User;

it('can load the relation manager', function () {
    $user = User::factory()
        ->has(Post::factory()->count(5))
        ->create();

    livewire(PostsRelationManager::class, [
        'ownerRecord' => $user,
        'pageClass' => EditUser::class,
    ])
        ->assertOk()
        ->assertCanSeeTableRecords($user->posts);
});
```

Puede [probar la búsqueda](testing-tables#testing-that-a-column-can-be-searched), [testing](testing-tables#testing-that-a-column-can-be-sorted) y [filtrado](testing-tables#testing-filters) de la misma manera que lo haría en una página de lista de recursos.

También puedes [probar acciones](testing-actions), por ejemplo, el `CreateAction` en el encabezado de la tabla:

```php
use App\Filament\Resources\Users\Pages\EditUser;
use App\Filament\Resources\Users\RelationManagers\PostsRelationManager;
use App\Models\Post;
use App\Models\User;
use Filament\Actions\Testing\TestAction;
use function Pest\Laravel\assertDatabaseHas;

it('can create a post', function () {
    $user = User::factory()->create();

    $newPostData = Post::factory()->make();

    livewire(PostsRelationManager::class, [
        'ownerRecord' => $user,
        'pageClass' => EditUser::class,
    ])
        ->callAction(TestAction::make(CreateAction::class)->table(), [
            'title' => $newPostData->title,
            'content' => $newPostData->content,
        ])
        ->assertNotified();

    assertDatabaseHas(Post::class, [
        'title' => $newPostData->title,
        'content' => $newPostData->content,
        'user_id' => $user->id,
    ]);
});
```

## Probando múltiples paneles

Si tiene varios paneles y desea probar un panel no predeterminado, deberá indicarle a Filament qué panel está probando. Esto se puede hacer en el método `setUp()` del caso de prueba, o puede hacerlo al comienzo de una prueba en particular. Filament generalmente hace esto en un middleware cuando accede al panel a través de una solicitud, por lo que si no realiza una solicitud en su prueba, como cuando prueba un componente Livewire, debe configurar el panel actual manualmente:

```php
use Filament\Facades\Filament;

Filament::setCurrentPanel('app'); // Where `app` is the ID of the panel you want to test.
```
