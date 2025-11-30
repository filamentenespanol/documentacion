---

title: Crear acción

---

## Introducción

Filament incluye una acción que es capaz de crear registros Eloquent. Cuando se hace clic en el botón disparador, se abrirá un modal con un formulario en su interior. El usuario completa el formulario y esos datos se validan y guardan en la base de datos. Puedes usarlo así:

```php
use Filament\Actions\CreateAction;
use Filament\Forms\Components\TextInput;

CreateAction::make()
    ->schema([
        TextInput::make('title')
            ->required()
            ->maxLength(255),
        // ...
    ])
```

## Personalizar datos antes de guardar

A veces, es posible que desee modificar los datos del formulario antes de que finalmente se guarden en la base de datos. Para hacer esto, puede usar el método `mutateDataUsing()`, que tiene acceso a `$data` como una matriz y devuelve la versión modificada:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->mutateDataUsing(function (array $data): array {
        $data['user_id'] = auth()->id();

        return $data;
    })
```

<details>
<summary>Utility Injection Info</summary>

As well as `$data`, the `mutateDataUsing()` function can inject various utilities as parameters.

</details>

## Personalizando el proceso de creación

Puedes modificar cómo se crea el registro con el método `using()`:

```php
use Filament\Actions\CreateAction;
use Illuminate\Database\Eloquent\Model;

CreateAction::make()
    ->using(function (array $data, string $model): Model {
        return $model::create($data);
    })
```

`$model` es el nombre de clase del modelo, pero puedes reemplazarlo con tu propia clase codificada si lo deseas.

<details>
<summary>Utility Injection Info</summary>

As well as `$data` and `$model`, the `using()` function can inject various utilities as parameters.

</details>

## Redireccionamiento después de la creación

Puede configurar una redirección personalizada cuando el formulario se envía utilizando el método `successRedirectUrl()`:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->successRedirectUrl(route('posts.list'))
```

Si desea redirigir usando el registro creado, use el parámetro `$record`:

```php
use Filament\Actions\CreateAction;
use Illuminate\Database\Eloquent\Model;

CreateAction::make()
    ->successRedirectUrl(fn (Model $record): string => route('posts.edit', [
        'post' => $record,
    ]))
```

<details>
<summary>Utility Injection Info</summary>

As well as `$record`, the `successRedirectUrl()` function can inject various utilities as parameters.

</details>

## Personalizando la notificación de guardado

Cuando el registro se crea correctamente, se envía una notificación al usuario, que indica el éxito de su acción.

Para personalizar el título de esta notificación, utilice el método `successNotificationTitle()`:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->successNotificationTitle('User registered')
```

<details>
<summary>Utility Injection Info</summary>

As well as allowing a static value, the `successNotificationTitle()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.

</details>

Puede personalizar toda la notificación utilizando el método `successNotification()`:

```php
use Filament\Actions\CreateAction;
use Filament\Notifications\Notification;

CreateAction::make()
    ->successNotification(
       Notification::make()
            ->success()
            ->title('User registered')
            ->body('The user has been created successfully.'),
    )
```

<details>
<summary>Utility Injection Info</summary>

As well as allowing a static value, the `successNotification()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.

</details>

Para desactivar la notificación por completo, utilice el método `successNotification(null)`:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->successNotification(null)
```

## Ganchos del ciclo de vida

Se pueden usar ganchos para ejecutar código en varios puntos dentro del ciclo de vida de la acción, como antes de guardar un formulario.

Hay varios ganchos disponibles:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->beforeFormFilled(function () {
        // Runs before the form fields are populated with their default values.
    })
    ->afterFormFilled(function () {
        // Runs after the form fields are populated with their default values.
    })
    ->beforeFormValidated(function () {
        // Runs before the form fields are validated when the form is submitted.
    })
    ->afterFormValidated(function () {
        // Runs after the form fields are validated when the form is submitted.
    })
    ->before(function () {
        // Runs before the form fields are saved to the database.
    })
    ->after(function () {
        // Runs after the form fields are saved to the database.
    })
```

<details>
<summary>Utility Injection Info</summary>

These hook functions can inject various utilities as parameters.

</details>

## Detener el proceso de creación

En cualquier momento, puedes llamar a `$action->halt()` desde dentro de un gancho de ciclo de vida o método de mutación, lo que detendrá todo el proceso de creación:

```php
use App\Models\Post;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Notifications\Notification;

CreateAction::make()
    ->before(function (CreateAction $action, Post $record) {
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

Si desea que el modo de acción también se cierre, puede `cancelar()` completamente la acción en lugar de detenerla:

```php
$action->cancel();
```

## Usando un asistente

Puede transformar fácilmente el proceso de creación en un asistente de varios pasos. En lugar de usar un `schema()`, define una matriz `steps()` y pasa tus objetos `Step`:

```php
use Filament\Actions\CreateAction;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Wizard\Step;

CreateAction::make()
    ->steps([
        Step::make('Name')
            ->description('Give the category a unique name')
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->live()
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->disabled()
                    ->required()
                    ->unique(Category::class, 'slug'),
            ])
            ->columns(2),
        Step::make('Description')
            ->description('Add some extra details')
            ->schema([
                MarkdownEditor::make('description'),
            ]),
        Step::make('Visibility')
            ->description('Control who can view it')
            ->schema([
                Toggle::make('is_visible')
                    ->label('Visible to customers.')
                    ->default(true),
            ]),
    ])
```

Ahora, crea un nuevo registro para ver tu asistente en acción. Editar seguirá utilizando el formulario definido dentro de la clase de recurso.

Si desea permitir la navegación libre, de modo que todos los pasos se puedan omitir, use el método `skippableSteps()`:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->steps([
        // ...
    ])
    ->skippableSteps()
```

## Creando otro registro

### Modificando la acción de crear otra

Si desea modificar la acción "crear otra", puede utilizar el método `createAnotherAction()`, pasando una función que devuelve una acción. Se pueden utilizar todos los métodos que están disponibles para [personalizar los botones de activación de acciones] (descripción general):

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->createAnotherAction(fn (Action $action): Action => $aciton->label('Custom create another label'))
```

### Deshabilitar crear otro

Si desea eliminar el botón "crear otro" del modal, puede utilizar el método `createAnother(false)`:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->createAnother(false)
```

<details>
<summary>Utility Injection Info</summary>

As well as allowing a static value, the `createAnother()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.

</details>

### Preservar datos al crear otro

De forma predeterminada, cuando el usuario utiliza la función "crear y crear otro", todos los datos del formulario se borran para que el usuario pueda comenzar de nuevo. Si desea conservar algunos de los datos del formulario, puede utilizar el método `preserveFormDataWhenCreatingAnother()`, pasando una serie de campos para preservar:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->preserveFormDataWhenCreatingAnother(['is_admin', 'organization'])
```

Alternativamente, puede definir una función que devuelva una matriz de `$data` para preservar:

```php
use Filament\Actions\CreateAction;
use Illuminate\Support\Arr;

CreateAction::make()
    ->preserveFormDataWhenCreatingAnother(fn (array $data): array => Arr::only($data, ['is_admin', 'organization']))
```

Para conservar todos los datos, devuelva la matriz `$data` completa:

```php
use Filament\Actions\CreateAction;

CreateAction::make()
    ->preserveFormDataWhenCreatingAnother(fn (array $data): array => $data)
```

<details>
<summary>Utility Injection Info</summary>

As well as allowing a static value, the `preserveFormDataWhenCreatingAnother()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.

</details>

