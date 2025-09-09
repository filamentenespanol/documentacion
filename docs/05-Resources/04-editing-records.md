---
title: Editar registros
---

## Personalizar datos antes de llenar el formulario

Puedes querer modificar los datos de un registro antes de que se rellenen en el formulario. Para hacerlo, puedes definir un método `mutateFormDataBeforeFill()` en la clase de la página Edit, modificar el array `$data` y devolver la versión modificada antes de rellenar el formulario:

```php
protected function mutateFormDataBeforeFill(array $data): array
{
    $data['user_id'] = auth()->id();

    return $data;
}
```

Alternativamente, si estás editando registros en una acción modal, consulta la [documentación de Actions](../actions/edit#customizing-data-before-filling-the-form).

## Personalizar datos antes de guardar

A veces, puedes querer modificar los datos del formulario antes de que se guarden en la base de datos. Para hacerlo, puedes definir un método `mutateFormDataBeforeSave()` en la clase de la página Edit, que acepte el array `$data` y retorne la versión modificada:

```php
protected function mutateFormDataBeforeSave(array $data): array
{
    $data['last_edited_by_id'] = auth()->id();

    return $data;
}
```

Alternativamente, si estás editando registros en una acción modal, consulta la [documentación de Actions](../actions/edit#customizing-data-before-saving).

## Personalizar el proceso de guardado

Puedes ajustar cómo se actualiza el registro usando el método `handleRecordUpdate()` en la clase de la página Edit:

```php
use Illuminate\Database\Eloquent\Model;

protected function handleRecordUpdate(Model $record, array $data): Model
{
    $record->update($data);

    return $record;
}
```

Alternativamente, si estás editando registros en una acción modal, consulta la [documentación de Actions](../actions/edit#customizing-the-saving-process).

## Personalizar redirecciones

Por defecto, al guardar el formulario no se redirige al usuario a otra página.

Puedes configurar una redirección personalizada sobrescribiendo el método `getRedirectUrl()` en la clase de la página Edit.  

Ejemplo: redirigir a la [página List](listing-records) del recurso:

```php
protected function getRedirectUrl(): string
{
    return $this->getResource()::getUrl('index');
}
```

O a la [página View](viewing-records):

```php
protected function getRedirectUrl(): string
{
    return $this->getResource()::getUrl('view', ['record' => $this->getRecord()]);
}
```

Si deseas redirigir a la página anterior, o en caso contrario a la index:

```php
protected function getRedirectUrl(): string
{
    return $this->previousUrl ?? $this->getResource()::getUrl('index');
}
```

También puedes usar la [configuración](../panel-configuration) para cambiar la redirección por defecto de todas las páginas a nivel global:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->resourceEditPageRedirect('index') // o
        ->resourceEditPageRedirect('view');
}
```

## Personalizar la notificación de guardado

Cuando se actualiza un registro de forma exitosa, se muestra una notificación al usuario.  

Puedes personalizar el título de esta notificación sobrescribiendo `getSavedNotificationTitle()`:

```php
protected function getSavedNotificationTitle(): ?string
{
    return 'Usuario actualizado';
}
```

También puedes sobrescribir el método completo `getSavedNotification()`:

```php
use Filament\Notifications\Notification;

protected function getSavedNotification(): ?Notification
{
    return Notification::make()
        ->success()
        ->title('Usuario actualizado')
        ->body('El usuario ha sido guardado correctamente.');
}
```

Para desactivar la notificación, retorna `null`:

```php
use Filament\Notifications\Notification;

protected function getSavedNotification(): ?Notification
{
    return null;
}
```

## Hooks de ciclo de vida

Los *hooks* permiten ejecutar código en distintos momentos del ciclo de vida de una página.  

Ejemplo: ejecutar antes de guardar:

```php
protected function beforeSave(): void
{
    // ...
}
```

Lista de hooks disponibles:

```php
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected function beforeFill(): void {}
    protected function afterFill(): void {}
    protected function beforeValidate(): void {}
    protected function afterValidate(): void {}
    protected function beforeSave(): void {}
    protected function afterSave(): void {}
}
```

## Guardar una parte del formulario de manera independiente

Puedes permitir guardar solo una sección del formulario, usando `saveFormComponentOnly()` dentro de una acción de sección:

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Section;

Section::make('Rate limiting')
    ->schema([
        // ...
    ])
    ->footerActions([
        fn (string $operation): Action => Action::make('save')
            ->action(function (Section $component, EditRecord $livewire) {
                $livewire->saveFormComponentOnly($component);

                Notification::make()
                    ->title('Rate limiting guardado')
                    ->body('Los ajustes de rate limiting se guardaron correctamente.')
                    ->success()
                    ->send();
            })
            ->visible($operation === 'edit'),
    ])
```

## Detener el proceso de guardado

Puedes detener todo el proceso de guardado llamando a `$this->halt()` dentro de un hook:

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;

protected function beforeSave(): void
{
    if (! $this->getRecord()->team->subscribed()) {
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

## Autorización

Filament respeta las [policies de modelos](https://laravel.com/docs/authorization#creating-policies).  

- Si la policy permite `update()`, el usuario podrá editar.  
- Si la policy permite `delete()`, podrá eliminar.

## Acciones personalizadas

Las *Actions* son botones en las páginas. Pueden añadirse arriba a la derecha o debajo del formulario.  

Ejemplo, añadir botón de "impersonate":

```php
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('impersonate')
                ->action(function (): void {
                    // ...
                }),
            Actions\DeleteAction::make(),
        ];
    }
}
```

Ejemplo, añadir botón junto a "Save":

```php
use Filament\Actions\Action;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected function getFormActions(): array
    {
        return [
            ...parent::getFormActions(),
            Action::make('close')->action('saveAndClose'),
        ];
    }

    public function saveAndClose(): void
    {
        // ...
    }
}
```

Mover "Save" al header:

```php
protected function getHeaderActions(): array
{
    return [
        $this->getSaveFormAction()
            ->formId('form'),
    ];
}
```

Eliminar todas las acciones:

```php
protected function getFormActions(): array
{
    return [];
}
```

## Crear otra página de edición

Puedes crear varias páginas de edición si un solo formulario es muy largo:

```bash
php artisan make:filament-page EditCustomerContact --resource=CustomerResource --type=EditRecord
```

Después, debes registrarla en `getPages()`:

```php
public static function getPages(): array
{
    return [
        'index' => Pages\ListCustomers::route('/'),
        'create' => Pages\CreateCustomer::route('/create'),
        'view' => Pages\ViewCustomer::route('/{record}'),
        'edit' => Pages\EditCustomer::route('/{record}/edit'),
        'edit-contact' => Pages\EditCustomerContact::route('/{record}/edit/contact'),
    ];
}
```

Cada nueva página podrá tener su propio `form()`.

## Añadir páginas de edición a sub-navegación

Si usas sub-navegación de recursos, puedes añadir estas páginas en `getRecordSubNavigation()`:

```php
use App\Filament\Resources\Customers\Pages;
use Filament\Resources\Pages\Page;

public static function getRecordSubNavigation(Page $page): array
{
    return $page->generateNavigationItems([
        Pages\EditCustomerContact::class,
    ]);
}
```

## Contenido personalizado de la página

Cada página en Filament tiene su propio [schema](../schemas).  

El método `content()` en la página Edit incluye por defecto:

```php
use Filament\Schemas\Schema;

public function content(Schema $schema): Schema
{
    return $schema
        ->components([
            $this->getFormContentComponent(),
            $this->getRelationManagersContentComponent(),
        ]);
}
```

Puedes añadir, reordenar o eliminar componentes según necesites.

### Usar una vista Blade personalizada

También puedes sobrescribir la propiedad `$view` de la página para usar una vista Blade personalizada:

```php
protected string $view = 'filament.resources.users.pages.edit-user';
```

Ejemplo de Blade:

```blade
<x-filament-panels::page>
    {{-- `$this->getRecord()` retorna el registro de Eloquent actual --}}

    {{ $this->content }} {{-- Renderiza el contenido definido en `content()` --}}
</x-filament-panels::page>
```
