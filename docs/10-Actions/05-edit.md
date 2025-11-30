---

title: Editar acción

---

## Introducción

Filament incluye una acción que puede editar registros de Eloquent. Cuando se hace clic en el botón disparador, se abrirá un modal con un formulario en su interior. El usuario completa el formulario y esos datos se validan y guardan en la base de datos. Puedes usarlo así:

```php
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;

EditAction::make()
    ->schema([
        TextInput::make('title')
            ->required()
            ->maxLength(255),
        // ...
    ])
```

## Personalización de datos antes de rellenar el formulario

Es posible que desee modificar los datos de un registro antes de completarlo en el formulario. Para hacer esto, puede usar el método `mutateRecordDataUsing()` para modificar la matriz `$data` y devolver la versión modificada antes de completarla en el formulario:

```php
use Filament\Actions\EditAction;

EditAction::make()
    ->mutateRecordDataUsing(function (array $data): array {
        $data['user_id'] = auth()->id();

        return $data;
    })
```

<details>
<summary>Utility Injection Info</summary>

As well as `$data`, the `mutateRecordDataUsing()` function can inject various utilities as parameters.

</details>

## Personalizar datos antes de guardar

A veces, es posible que desee modificar los datos del formulario antes de que finalmente se guarden en la base de datos. Para hacer esto, puede usar el método `mutateDataUsing()`, que tiene acceso a `$data` como una matriz y devuelve la versión modificada:

```php
use Filament\Actions\EditAction;

EditAction::make()
    ->mutateDataUsing(function (array $data): array {
        $data['last_edited_by_id'] = auth()->id();

        return $data;
    })
```

<details>
<summary>Utility Injection Info</summary>

As well as `$data`, the `mutateDataUsing()` function can inject various utilities as parameters.

</details>

## Personalizando el proceso de guardado

Puedes modificar cómo se actualiza el registro con el método `using()`:

```php
use Filament\Actions\EditAction;
use Illuminate\Database\Eloquent\Model;

EditAction::make()
    ->using(function (Model $record, array $data): Model {
        $record->update($data);

        return $record;
    })
```

<details>
<summary>Utility Injection Info</summary>

As well as `$record` and `$data`, the `using()` function can inject various utilities as parameters.

</details>

## Redirigir después de guardar

Puede configurar una redirección personalizada cuando el formulario se envía utilizando el método `successRedirectUrl()`:

```php
use Filament\Actions\EditAction;

EditAction::make()
    ->successRedirectUrl(route('posts.list'))
```

Si desea redirigir usando el registro creado, use el parámetro `$record`:

```php
use Filament\Actions\EditAction;
use Illuminate\Database\Eloquent\Model;

EditAction::make()
    ->successRedirectUrl(fn (Model $record): string => route('posts.view', [
        'post' => $record,
    ]))
```

<details>
<summary>Utility Injection Info</summary>

As well as `$record`, the `successRedirectUrl()` function can inject various utilities as parameters.

</details>

## Personalizando la notificación de guardado

Cuando el registro se actualiza correctamente, se envía una notificación al usuario, que indica el éxito de su acción.

Para personalizar el título de esta notificación, utilice el método `successNotificationTitle()`:

```php
use Filament\Actions\EditAction;

EditAction::make()
    ->successNotificationTitle('User updated')
```

<details>
<summary>Utility Injection Info</summary>

As well as allowing a static value, the `successNotificationTitle()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.

</details>

Puede personalizar toda la notificación utilizando el método `successNotification()`:

```php
use Filament\Actions\EditAction;
use Filament\Notifications\Notification;

EditAction::make()
    ->successNotification(
       Notification::make()
            ->success()
            ->title('User updated')
            ->body('The user has been saved successfully.'),
    )
```

<details>
<summary>Utility Injection Info</summary>

As well as allowing a static value, the `successNotification()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.

</details>

Para desactivar la notificación por completo, utilice el método `successNotification(null)`:

```php
use Filament\Actions\EditAction;

EditAction::make()
    ->successNotification(null)
```

## Ganchos del ciclo de vida

Se pueden usar ganchos para ejecutar código en varios puntos dentro del ciclo de vida de la acción, como antes de guardar un formulario.

Hay varios ganchos disponibles:

```php
use Filament\Actions\EditAction;

EditAction::make()
    ->beforeFormFilled(function () {
        // Runs before the form fields are populated from the database.
    })
    ->afterFormFilled(function () {
        // Runs after the form fields are populated from the database.
    })
    ->beforeFormValidated(function () {
        // Runs before the form fields are validated when the form is saved.
    })
    ->afterFormValidated(function () {
        // Runs after the form fields are validated when the form is saved.
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

## Detener el proceso de guardado

En cualquier momento, puedes llamar a `$action->halt()` desde dentro de un gancho de ciclo de vida o método de mutación, lo que detendrá todo el proceso de guardado:

```php
use App\Models\Post;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Notifications\Notification;

EditAction::make()
    ->before(function (EditAction $action, Post $record) {
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

