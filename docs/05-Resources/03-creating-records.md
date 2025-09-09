---
title: Crear registros
---

## Personalizar datos antes de guardar

A veces, puedes querer modificar los datos del formulario antes de que se guarden finalmente en la base de datos. Para hacer esto, puedes definir un método `mutateFormDataBeforeCreate()` en la clase de la página Create, que acepta los `$data` como un array y retorna la versión modificada:

```php
protected function mutateFormDataBeforeCreate(array $data): array
{
    $data['user_id'] = auth()->id();

    return $data;
}
```

Alternativamente, si estás creando registros en una acción modal, consulta la [documentación de Actions](../actions/create#customizing-data-before-saving).

## Personalizar el proceso de creación

Puedes ajustar cómo se crea el registro usando el método `handleRecordCreation()` en la clase de la página Create:

```php
use Illuminate\Database\Eloquent\Model;

protected function handleRecordCreation(array $data): Model
{
    return static::getModel()::create($data);
}
```

Alternativamente, si estás creando registros en una acción modal, consulta la [documentación de Actions](../actions/create#customizing-the-creation-process).

## Personalizar redirecciones

Por defecto, después de guardar el formulario, el usuario será redirigido a la [página Edit](editing-records) del resource, o a la [página View](viewing-records) si está presente.

Puedes configurar una redirección personalizada cuando se guarda el formulario sobrescribiendo el método `getRedirectUrl()` en la clase de la página Create.

Por ejemplo, el formulario puede redirigir de vuelta a la [página List](listing-records):

```php
protected function getRedirectUrl(): string
{
    return $this->getResource()::getUrl('index');
}
```

Si deseas ser redirigido a la página anterior, o sino a la página index:

```php
protected function getRedirectUrl(): string
{
    return $this->previousUrl ?? $this->getResource()::getUrl('index');
}
```

También puedes usar la [configuración](../panel-configuration) para personalizar la página de redirección por defecto para todos los resources a la vez:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->resourceCreatePageRedirect('index') // o
        ->resourceCreatePageRedirect('view') // o
        ->resourceCreatePageRedirect('edit');
}
```

## Personalizar la notificación de guardado

Cuando el registro se crea exitosamente, se envía una notificación al usuario, que indica el éxito de su acción.

Para personalizar el título de esta notificación, define un método `getCreatedNotificationTitle()` en la clase de la página create:

```php
protected function getCreatedNotificationTitle(): ?string
{
    return 'Usuario registrado';
}
```

Alternativamente, si estás creando registros en una acción modal, consulta la [documentación de Actions](../actions/create#customizing-the-save-notification).

Puedes personalizar toda la notificación sobrescribiendo el método `getCreatedNotification()` en la clase de la página create:

```php
use Filament\Notifications\Notification;

protected function getCreatedNotification(): ?Notification
{
    return Notification::make()
        ->success()
        ->title('Usuario registrado')
        ->body('El usuario ha sido creado exitosamente.');
}
```

Para deshabilitar la notificación por completo, retorna `null` desde el método `getCreatedNotification()` en la clase de la página create:

```php
use Filament\Notifications\Notification;

protected function getCreatedNotification(): ?Notification
{
    return null;
}
```

## Crear otro registro

### Deshabilitar crear otro

Para deshabilitar la función "crear y crear otro", define la propiedad `$canCreateAnother` como `false` en la clase de la página Create:

```php
protected static bool $canCreateAnother = false;
```

Alternativamente, si quieres especificar una condición dinámica cuando la función está deshabilitada, puedes sobrescribir el método `canCreateAnother()` en la clase de la página Create:

```php
public function canCreateAnother(): bool
{
    return false;
}
```

### Preservar datos al crear otro

Por defecto, cuando el usuario usa la función "crear y crear otro", todos los datos del formulario se limpian para que el usuario pueda empezar de nuevo. Si quieres preservar algunos de los datos en el formulario, puedes sobrescribir el método `preserveFormDataWhenCreatingAnother()` en la clase de la página Create, y retornar la parte del array `$data` que quieres mantener:

```php
use Illuminate\Support\Arr;

protected function preserveFormDataWhenCreatingAnother(array $data): array
{
    return Arr::only($data, ['is_admin', 'organization']);
}
```

Para preservar todos los datos, retorna todo el array `$data`:

```php
protected function preserveFormDataWhenCreatingAnother(array $data): array
{
    return $data;
}
```

## Hooks del ciclo de vida

Los hooks pueden usarse para ejecutar código en varios puntos dentro del ciclo de vida de una página, como antes de que se guarde un formulario. Para configurar un hook, crea un método protegido en la clase de la página Create con el nombre del hook:

```php
protected function beforeCreate(): void
{
    // ...
}
```

En este ejemplo, el código en el método `beforeCreate()` será llamado antes de que los datos del formulario se guarden en la base de datos.

Hay varios hooks disponibles para la página Create:

```php
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    // ...

    protected function beforeFill(): void
    {
        // Se ejecuta antes de que los campos del formulario se llenen con sus valores por defecto.
    }

    protected function afterFill(): void
    {
        // Se ejecuta después de que los campos del formulario se llenen con sus valores por defecto.
    }

    protected function beforeValidate(): void
    {
        // Se ejecuta antes de que los campos del formulario se validen cuando se envía el formulario.
    }

    protected function afterValidate(): void
    {
        // Se ejecuta después de que los campos del formulario se validen cuando se envía el formulario.
    }

    protected function beforeCreate(): void
    {
        // Se ejecuta antes de que los campos del formulario se guarden en la base de datos.
    }

    protected function afterCreate(): void
    {
        // Se ejecuta después de que los campos del formulario se guarden en la base de datos.
    }
}
```

Alternativamente, si estás creando registros en una acción modal, consulta la [documentación de Actions](../actions/create#lifecycle-hooks).

## Detener el proceso de creación

En cualquier momento, puedes llamar `$this->halt()` desde dentro de un hook del ciclo de vida o método de mutación, lo que detendrá todo el proceso de creación:

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;

protected function beforeCreate(): void
{
    if (! auth()->user()->team->subscribed()) {
        Notification::make()
            ->warning()
            ->title('¡No tienes una suscripción activa!')
            ->body('Elige un plan para continuar.')
            ->persistent()
            ->actions([
                Action::make('subscribe')
                    ->button()
                    ->url(route('subscribe'), shouldOpenInNewTab: true),
            ])
            ->send();

        $this->halt();
    }
}
```

Alternativamente, si estás creando registros en una acción modal, consulta la [documentación de Actions](../actions/create#halting-the-creation-process).

## Autorización

Para la autorización, Filament observará cualquier [policy de modelo](https://laravel.com/docs/authorization#creating-policies) que esté registrada en tu aplicación.

Los usuarios pueden acceder a la página Create si el método `create()` de la policy del modelo retorna `true`.

## Usar un wizard

Puedes transformar fácilmente el proceso de creación en un wizard de múltiples pasos.

En la clase de la página, añade el trait correspondiente `HasWizard`:

```php
use App\Filament\Resources\Categories\CategoryResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCategory extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;

    protected static string $resource = CategoryResource::class;

    protected function getSteps(): array
    {
        return [
            // ...
        ];
    }
}
```

Dentro del array `getSteps()`, retorna tus [pasos del wizard](../schemas/wizards):

```php
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Wizard\Step;

protected function getSteps(): array
{
    return [
        Step::make('Nombre')
            ->description('Dale a la categoría un nombre claro y único')
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->live()
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->disabled()
                    ->required()
                    ->unique(Category::class, 'slug', fn ($record) => $record),
            ]),
        Step::make('Descripción')
            ->description('Añade algunos detalles extra')
            ->schema([
                MarkdownEditor::make('description')
                    ->columnSpan('full'),
            ]),
        Step::make('Visibilidad')
            ->description('Controla quién puede verlo')
            ->schema([
                Toggle::make('is_visible')
                    ->label('Visible para clientes.')
                    ->default(true),
            ]),
    ];
}
```

Alternativamente, si estás creando registros en una acción modal, consulta la [documentación de Actions](../actions/create#using-a-wizard).

¡Ahora, crea un nuevo registro para ver tu wizard en acción! Edit seguirá usando el formulario definido dentro de la clase resource.

Si quieres permitir navegación libre, para que todos los pasos sean omitibles, sobrescribe el método `hasSkippableSteps()`:

```php
public function hasSkippableSteps(): bool
{
    return true;
}
```

### Compartir campos entre el schema del formulario y wizards

Si quieres reducir la cantidad de repetición entre el formulario del resource y los pasos del wizard, es una buena idea extraer funciones de formulario estáticas públicas para tus campos, donde puedes recuperar fácilmente una instancia de un campo del schema del formulario o del wizard:

```php
use Filament\Forms;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                static::getNameFormField(),
                static::getSlugFormField(),
                // ...
            ]);
    }

    public static function getNameFormField(): Forms\Components\TextInput
    {
        return TextInput::make('name')
            ->required()
            ->live()
            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state)));
    }

    public static function getSlugFormField(): Forms\Components\TextInput
    {
        return TextInput::make('slug')
            ->disabled()
            ->required()
            ->unique(Category::class, 'slug', fn ($record) => $record);
    }
}
```

```php
use App\Filament\Resources\Categories\Schemas\CategoryForm;
use Filament\Resources\Pages\CreateRecord;

class CreateCategory extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;

    protected static string $resource = CategoryResource::class;

    protected function getSteps(): array
    {
        return [
            Step::make('Nombre')
                ->description('Dale a la categoría un nombre claro y único')
                ->schema([
                    CategoryForm::getNameFormField(),
                    CategoryForm::getSlugFormField(),
                ]),
            // ...
        ];
    }
}
```

## Importar registros del resource

Filament incluye un `ImportAction` que puedes añadir a los `getHeaderActions()` de la [página List](listing-records). Permite a los usuarios subir un CSV de datos para importar al resource:

```php
use App\Filament\Imports\ProductImporter;
use Filament\Actions;

protected function getHeaderActions(): array
{
    return [
        Actions\ImportAction::make()
            ->importer(ProductImporter::class),
        Actions\CreateAction::make(),
    ];
}
```

La clase "importer" [necesita ser creada](../actions/import#creating-an-importer) para decirle a Filament cómo importar cada fila del CSV. Puedes aprender todo sobre el `ImportAction` en la [documentación de Actions](../actions/import).

## Acciones personalizadas

Las "Actions" son botones que se muestran en las páginas, que permiten al usuario ejecutar un método Livewire en la página o visitar una URL.

En las páginas de resources, las acciones usualmente están en 2 lugares: en la parte superior derecha de la página, y debajo del formulario.

Por ejemplo, puedes añadir un nuevo botón de acción en el header de la página Create:

```php
use App\Filament\Imports\UserImporter;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    // ...

    protected function getHeaderActions(): array
    {
        return [
            Actions\ImportAction::make()
                ->importer(UserImporter::class),
        ];
    }
}
```

O, un nuevo botón junto a "Create" debajo del formulario:

```php
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    // ...

    protected function getFormActions(): array
    {
        return [
            ...parent::getFormActions(),
            Action::make('close')->action('createAndClose'),
        ];
    }

    public function createAndClose(): void
    {
        // ...
    }
}
```

Para ver toda la API de actions, por favor visita la [sección de páginas](../navigation/custom-pages#adding-actions-to-pages).

### Añadir un botón de acción create al header

El botón "Create" puede moverse al header de la página sobrescribiendo el método `getHeaderActions()` y usando `getCreateFormAction()`. Necesitas pasar `formId()` a la acción, para especificar que la acción debe enviar el formulario con el ID de `form`, que es el ID del `<form>` usado en la vista de la página:

```php
protected function getHeaderActions(): array
{
    return [
        $this->getCreateFormAction()
            ->formId('form'),
    ];
}
```

Puedes remover todas las acciones del formulario sobrescribiendo el método `getFormActions()` para retornar un array vacío:

```php
protected function getFormActions(): array
{
    return [];
}
```

## Contenido personalizado de la página

Cada página en Filament tiene su propio [schema](../schemas), que define la estructura y el contenido general. Puedes sobrescribir el schema de la página definiendo un método `content()` en ella. El método `content()` para la página Create contiene los siguientes componentes por defecto:

```php
use Filament\Schemas\Schema;

public function content(Schema $schema): Schema
{
    return $schema
        ->components([
            $this->getFormContentComponent(), // Este método devuelve un componente para mostrar el formulario definido en este resource
        ]);
}
```

Dentro del array `components()`, puedes insertar cualquier [componente de schema](../schemas). Puedes reordenar los componentes cambiando el orden del array o eliminar cualquiera de los componentes que no necesites.

### Usar una vista Blade personalizada

Para mayores opciones de personalización, puedes sobrescribir la propiedad estática `$view` en la clase de la página a una vista personalizada en tu aplicación:

```php
protected string $view = 'filament.resources.users.pages.create-user';
```

Esto asume que has creado una vista en `resources/views/filament/resources/users/pages/create-user.blade.php`:

```blade
<x-filament-panels::page>
    {{ $this->content }} {{-- Esto renderizará el contenido de la página definido en el método `content()`, que puede eliminarse si quieres empezar desde cero --}}
</x-filament-panels::page>
```
