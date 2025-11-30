---
title: Modales
---

## Introducción

Las actions pueden requerir confirmación o entrada adicional del usuario antes de ejecutarse. Puedes abrir un modal antes de que se ejecute una action para hacer esto.

## Modales de confirmación

Puedes requerir confirmación antes de que se ejecute una action usando el método `requiresConfirmation()`. Esto es útil para actions particularmente destructivas, como aquellas que eliminan registros.

```php
use App\Models\Post;
use Filament\Actions\Action;

Action::make('delete')
    ->action(fn (Post $record) => $record->delete())
    ->requiresConfirmation()
```

:::warning
El modal de confirmación no está disponible cuando se establece un `url()` en lugar de un `action()`. En su lugar, debes redirigir a la URL dentro del closure `action()`.
:::

## Controlar el contenido del modal

### Personalizar el encabezado, descripción y etiqueta de la acción de envío del modal

Puedes personalizar el encabezado, la descripción y la etiqueta del botón de envío en el modal:

```php
use App\Models\Post;
use Filament\Actions\Action;

Action::make('delete')
    ->action(fn (Post $record) => $record->delete())
    ->requiresConfirmation()
    ->modalHeading('Delete post')
    ->modalDescription('Are you sure you\'d like to delete this post? This cannot be undone.')
    ->modalSubmitActionLabel('Yes, delete it')
```

### Renderizar un schema en un modal

Filament te permite renderizar un [schema](../schemas) en un modal, lo que te permite renderizar cualquiera de los componentes disponibles para construir una interfaz de usuario. Por lo general, es útil construir un formulario en el schema que pueda recopilar información adicional del usuario antes de que se ejecute la action, pero se puede renderizar cualquier interfaz de usuario:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;

Action::make('viewUser')
    ->schema([
        Grid::make(2)
            ->schema([
                Section::make('Details')
                    ->schema([
                        TextInput::make('name'),
                        Select::make('position')
                            ->options([
                                'developer' => 'Developer',
                                'designer' => 'Designer',
                            ]),
                        Checkbox::make('is_admin'),
                    ]),
                Section::make('Auditing')
                    ->schema([
                        TextEntry::make('created_at')
                            ->dateTime(),
                        TextEntry::make('updated_at')
                            ->dateTime(),
                    ]),
            ]),
    ])
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `schema()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Renderizar un formulario en un modal

Puedes usar [campos de formulario](../forms) para crear formularios de modal de action. Los datos del formulario están disponibles en el array `$data` del closure `action()`:

```php
use App\Models\Post;
use App\Models\User;
use Filament\Actions\Action;
use Filament\Forms\Components\Select;

Action::make('updateAuthor')
    ->schema([
        Select::make('authorId')
            ->label('Author')
            ->options(User::query()->pluck('name', 'id'))
            ->required(),
    ])
    ->action(function (array $data, Post $record): void {
        $record->author()->associate($data['authorId']);
        $record->save();
    })
```

##### Llenar el formulario con datos existentes

Puedes llenar el formulario con datos existentes, usando el método `fillForm()`:

```php
use App\Models\Post;
use App\Models\User;
use Filament\Actions\Action;
use Filament\Forms\Components\Select;

Action::make('updateAuthor')
    ->fillForm(fn (Post $record): array => [
        'authorId' => $record->author->id,
    ])
    ->schema([
        Select::make('authorId')
            ->label('Author')
            ->options(User::query()->pluck('name', 'id'))
            ->required(),
    ])
    ->action(function (array $data, Post $record): void {
        $record->author()->associate($data['authorId']);
        $record->save();
    })
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `fillForm()` también acepta una función para calcular dinámicamente los datos con los que llenar el formulario. Puedes inyectar varias utilidades en la función como parámetros.

</details>

##### Deshabilitar todos los campos del formulario

Es posible que desees deshabilitar todos los campos del formulario en el modal, asegurándote de que el usuario no pueda editarlos. Puedes hacerlo usando el método `disabledForm()`:

```php
use App\Models\Post;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;

Action::make('approvePost')
    ->schema([
        TextInput::make('title'),
        Textarea::make('content'),
    ])
    ->disabledForm()
    ->action(function (Post $record): void {
        $record->approve();
    })
```

#### Renderizar un wizard en un modal

Puedes crear un [wizard de formulario multipaso](../schemas/wizards) dentro de un modal. En lugar de usar un `schema()`, define un array `steps()` y pasa tus objetos `Step`:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Wizard\Step;

Action::make('create')
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

### Agregar un icono dentro del modal

Puedes agregar un [icono](../styling/icons) dentro del modal usando el método `modalIcon()`:

```php
use App\Models\Post;
use Filament\Actions\Action;

Action::make('delete')
    ->action(fn (Post $record) => $record->delete())
    ->requiresConfirmation()
    ->modalIcon('heroicon-o-trash')
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalIcon()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

De forma predeterminada, el icono heredará el color del botón de la action. Puedes personalizar el color del icono usando el método `modalIconColor()`:

```php
use App\Models\Post;
use Filament\Actions\Action;

Action::make('delete')
    ->action(fn (Post $record) => $record->delete())
    ->requiresConfirmation()
    ->color('danger')
    ->modalIcon('heroicon-o-trash')
    ->modalIconColor('warning')
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalIconColor()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar la alineación del contenido del modal

De forma predeterminada, el contenido del modal se alineará al inicio, o se centrará si el modal tiene un [ancho](#cambiar-el-ancho-del-modal) de `xs` o `sm`. Si deseas cambiar la alineación del contenido en un modal, puedes usar el método `modalAlignment()` y pasarle `Alignment::Start` o `Alignment::Center`:

```php
use Filament\Actions\Action;
use Filament\Support\Enums\Alignment;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->modalAlignment(Alignment::Center)
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalAlignment()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Hacer que el encabezado del modal sea fijo

El encabezado de un modal se desplaza fuera de la vista con el contenido del modal cuando este excede el tamaño del modal. Sin embargo, los slide-overs tienen un encabezado fijo que siempre es visible. Puedes controlar este comportamiento usando `stickyModalHeader()`:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->stickyModalHeader()
```

### Hacer que el pie de página del modal sea fijo

El pie de página de un modal se renderiza en línea después del contenido de forma predeterminada. Los slide-overs, sin embargo, tienen un pie de página fijo que siempre se muestra al desplazarse por el contenido. Puedes habilitar esto para un modal también usando `stickyModalFooter()`:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->stickyModalFooter()
```

### Contenido personalizado del modal

Puedes definir contenido personalizado para ser renderizado dentro de tu modal, que puedes especificar pasando una vista Blade al método `modalContent()`:

```php
use App\Models\Post;
use Filament\Actions\Action;

Action::make('advance')
    ->action(fn (Post $record) => $record->advance())
    ->modalContent(view('filament.pages.actions.advance'))
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalContent()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Pasar datos al contenido personalizado del modal

Puedes pasar datos a la vista devolviéndolos desde una función. Por ejemplo, si el `$record` de una action está establecido, puedes pasarlo a la vista:

```php
use Filament\Actions\Action;
use Illuminate\Contracts\View\View;

Action::make('advance')
    ->action(fn (Contract $record) => $record->advance())
    ->modalContent(fn (Contract $record): View => view(
        'filament.pages.actions.advance',
        ['record' => $record],
    ))
```

#### Agregar contenido personalizado del modal debajo del formulario

De forma predeterminada, el contenido personalizado se muestra encima del formulario del modal si hay uno, pero puedes agregar contenido debajo usando `modalContentFooter()` si lo deseas:

```php
use App\Models\Post;
use Filament\Actions\Action;

Action::make('advance')
    ->action(fn (Post $record) => $record->advance())
    ->modalContentFooter(view('filament.pages.actions.advance'))
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalContentFooter()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

#### Agregar una action al contenido personalizado del modal

Puedes agregar un botón de action a tu contenido personalizado del modal, lo cual es útil si deseas agregar un botón que realice una action diferente a la action principal. Puedes hacer esto registrando una action con el método `registerModalActions()`, y luego pasándola a la vista:

```php
use App\Models\Post;
use Filament\Actions\Action;
use Illuminate\Contracts\View\View;

Action::make('advance')
    ->registerModalActions([
        Action::make('report')
            ->requiresConfirmation()
            ->action(fn (Post $record) => $record->report()),
    ])
    ->action(fn (Post $record) => $record->advance())
    ->modalContent(fn (Action $action): View => view(
        'filament.pages.actions.advance',
        ['action' => $action],
    ))
```

Ahora, en el archivo de vista, puedes renderizar el botón de action llamando a `getModalAction()`:

```blade
<div>
    {{ $action->getModalAction('report') }}
</div>
```

## Usar un slide-over en lugar de un modal

Puedes abrir un diálogo "slide-over" en lugar de un modal usando el método `slideOver()`:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->slideOver()
```

En lugar de abrirse en el centro de la pantalla, el contenido del modal ahora se deslizará desde la derecha y consumirá toda la altura del navegador.

## Cambiar el ancho del modal

Puedes cambiar el ancho del modal usando el método `modalWidth()`. Las opciones corresponden a la [escala de ancho máximo de Tailwind](https://tailwindcss.com/docs/max-width). Las opciones son `ExtraSmall`, `Small`, `Medium`, `Large`, `ExtraLarge`, `TwoExtraLarge`, `ThreeExtraLarge`, `FourExtraLarge`, `FiveExtraLarge`, `SixExtraLarge`, `SevenExtraLarge` y `Screen`:

```php
use Filament\Actions\Action;
use Filament\Support\Enums\Width;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->modalWidth(Width::FiveExtraLarge)
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalWidth()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Ejecutar código cuando se abre el modal

Puedes ejecutar código dentro de un closure cuando se abre el modal, pasándolo al método `mountUsing()`:

```php
use Filament\Actions\Action;
use Filament\Schemas\Schema;

Action::make('create')
    ->mountUsing(function (Schema $form) {
        $form->fill();

        // ...
    })
```

> El método `mountUsing()`, de forma predeterminada, es utilizado por Filament para inicializar el [formulario](#renderizar-un-formulario-en-un-modal). Si sobrescribes este método, necesitarás llamar a `$form->fill()` para asegurar que el formulario se inicialice correctamente. Si deseas poblar el formulario con datos, puedes hacerlo pasando un array al método `fill()`, en lugar de [usar `fillForm()` en la action misma](#llenar-el-formulario-con-datos-existentes).

## Personalizar los botones de action en el pie de página del modal

De forma predeterminada, hay dos actions en el pie de página de un modal. La primera es un botón para enviar, que ejecuta el `action()`. El segundo botón cierra el modal y cancela la action.

### Modificar el botón de action del pie de página del modal predeterminado

Para modificar la instancia de action que se utiliza para renderizar uno de los botones de action predeterminados, puedes pasar un closure a los métodos `modalSubmitAction()` y `modalCancelAction()`:

```php
use Filament\Actions\Action;

Action::make('help')
    ->modalContent(view('actions.help'))
    ->modalCancelAction(fn (Action $action) => $action->label('Close'))
```

Los [métodos disponibles para personalizar botones de activación](overview) funcionarán para modificar la instancia `$action` dentro del closure.

:::tip
Para personalizar las etiquetas de los botones en tu modal, se pueden usar los métodos `modalSubmitActionLabel()` y `modalCancelActionLabel()` en lugar de pasar una función a `modalSubmitAction()` y `modalCancelAction()`, si no requieres ninguna otra personalización.
:::

### Eliminar un botón de action del pie de página del modal predeterminado

Para eliminar una action predeterminada, puedes pasar `false` a `modalSubmitAction()` o `modalCancelAction()`:

```php
use Filament\Actions\Action;

Action::make('help')
    ->modalContent(view('actions.help'))
    ->modalSubmitAction(false)
```

### Agregar un botón de action adicional al pie de página del modal

Puedes pasar un array de actions adicionales para ser renderizadas, entre las actions predeterminadas, en el pie de página del modal usando el método `extraModalFooterActions()`:

```php
use Filament\Actions\Action;

Action::make('create')
    ->schema([
        // ...
    ])
    // ...
    ->extraModalFooterActions(fn (Action $action): array => [
        $action->makeModalSubmitAction('createAnother', arguments: ['another' => true]),
    ])
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `extraModalFooterActions()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

`$action->makeModalSubmitAction()` devuelve una instancia de action que puede ser personalizada usando los [métodos disponibles para personalizar botones de activación](overview).

El segundo parámetro de `makeModalSubmitAction()` te permite pasar un array de argumentos que serán accesibles dentro del closure `action()` de la action como `$arguments`. Estos podrían ser útiles como indicadores para indicar que la action debe comportarse de manera diferente según la decisión del usuario:

```php
use Filament\Actions\Action;

Action::make('create')
    ->schema([
        // ...
    ])
    // ...
    ->extraModalFooterActions(fn (Action $action): array => [
        $action->makeModalSubmitAction('createAnother', arguments: ['another' => true]),
    ])
    ->action(function (array $data, array $arguments): void {
        // Crear

        if ($arguments['another'] ?? false) {
            // Restablecer el formulario y no cerrar el modal
        }
    })
```

#### Abrir otro modal desde una action de pie de página adicional

Puedes anidar actions unas dentro de otras, lo que te permite abrir un nuevo modal desde una action de pie de página adicional:

```php
use Filament\Actions\Action;

Action::make('edit')
    // ...
    ->extraModalFooterActions([
        Action::make('delete')
            ->requiresConfirmation()
            ->action(function () {
                // ...
            }),
    ])
```

Ahora, el modal de edición tendrá un botón "Delete" en el pie de página, que abrirá un modal de confirmación cuando se haga clic en él. Esta action es completamente independiente de la action `edit`, y no ejecutará la action `edit` cuando se haga clic en ella.

En este ejemplo, sin embargo, probablemente desees cancelar la action `edit` si se ejecuta la action `delete`. Puedes hacer esto usando el método `cancelParentActions()`:

```php
use Filament\Actions\Action;

Action::make('delete')
    ->requiresConfirmation()
    ->action(function () {
        // ...
    })
    ->cancelParentActions()
```

Si tienes anidamiento profundo con múltiples actions padre, pero no deseas cancelar todas ellas, puedes pasar el nombre de la action padre que deseas cancelar, incluidos sus hijos, a `cancelParentActions()`:

```php
use Filament\Actions\Action;

Action::make('first')
    ->requiresConfirmation()
    ->action(function () {
        // ...
    })
    ->extraModalFooterActions([
        Action::make('second')
            ->requiresConfirmation()
            ->action(function () {
                // ...
            })
            ->extraModalFooterActions([
                Action::make('third')
                    ->requiresConfirmation()
                    ->action(function () {
                        // ...
                    })
                    ->extraModalFooterActions([
                        Action::make('fourth')
                            ->requiresConfirmation()
                            ->action(function () {
                                // ...
                            })
                            ->cancelParentActions('second'),
                    ]),
            ]),
    ])
```

En este ejemplo, si se ejecuta la action `fourth`, la action `second` se cancela, pero también lo hace la action `third` ya que es hija de `second`. Sin embargo, la action `first` no se cancela, ya que es la padre de `second`. El modal de la action `first` permanecerá abierto.

## Acceder a información sobre actions padre desde una hija

Puedes acceder a las instancias de actions padre y sus datos y argumentos sin procesar inyectando el array `$mountedActions` en una función utilizada por tu action anidada. Por ejemplo, para obtener la action padre de nivel superior actualmente activa en la página, puedes usar `$mountedActions[0]`. Desde allí, puedes obtener los datos sin procesar para esa action llamando a `$mountedActions[0]->getRawData()`. Ten en cuenta que los datos sin procesar no están validados ya que la action aún no se ha enviado:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;

Action::make('first')
    ->schema([
        TextInput::make('foo'),
    ])
    ->action(function () {
        // ...
    })
    ->extraModalFooterActions([
        Action::make('second')
            ->requiresConfirmation()
            ->action(function (array $mountedActions) {
                dd($mountedActions[0]->getRawData());
            
                // ...
            }),
    ])
```

Puedes hacer algo similar con los argumentos actuales para una action padre, con el método `$mountedActions[0]->getArguments()`.

Incluso si tienes múltiples capas de anidamiento, el array `$mountedActions` contendrá cada action que esté actualmente activa, por lo que puedes acceder a información sobre ellas:

```php
use Filament\Actions\Action;

Action::make('first')
    ->schema([
        TextInput::make('foo'),
    ])
    ->action(function () {
        // ...
    })
    ->extraModalFooterActions([
        Action::make('second')
            ->schema([
                TextInput::make('bar'),
            ])
            ->arguments(['number' => 2])
            ->action(function () {
                // ...
            })
            ->extraModalFooterActions([
                Action::make('third')
                    ->schema([
                        TextInput::make('baz'),
                    ])
                    ->arguments(['number' => 3])
                    ->action(function () {
                        // ...
                    })
                    ->extraModalFooterActions([
                        Action::make('fourth')
                            ->requiresConfirmation()
                            ->action(function (array $mountedActions) {
                                dd(
                                    $mountedActions[0]->getRawData(),
                                    $mountedActions[0]->getArguments(),
                                    $mountedActions[1]->getRawData(),
                                    $mountedActions[1]->getArguments(),
                                    $mountedActions[2]->getRawData(),
                                    $mountedActions[2]->getArguments(),
                                );
                                // ...
                            }),
                    ]),
            ]),
    ])
```

## Cerrar el modal

### Cerrar el modal haciendo clic fuera

De forma predeterminada, cuando haces clic fuera de un modal, este se cerrará. Si deseas deshabilitar este comportamiento para una action específica, puedes usar el método `closeModalByClickingAway(false)`:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->closeModalByClickingAway(false)
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `closeModalByClickingAway()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si deseas cambiar el comportamiento para todos los modales en la aplicación, puedes hacerlo llamando a `ModalComponent::closedByClickingAway()` dentro de un service provider o middleware:

```php
use Filament\Support\View\Components\ModalComponent;

ModalComponent::closedByClickingAway(false);
```

### Cerrar el modal presionando escape

De forma predeterminada, cuando presionas escape en un modal, este se cerrará. Si deseas deshabilitar este comportamiento para una action específica, puedes usar el método `closeModalByEscaping(false)`:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->closeModalByEscaping(false)
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `closeModalByEscaping()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si deseas cambiar el comportamiento para todos los modales en la aplicación, puedes hacerlo llamando a `ModalComponent::closedByEscaping()` dentro de un service provider o middleware:

```php
use Filament\Support\View\Components\ModalComponent;

ModalComponent::closedByEscaping(false);
```

### Ocultar el botón de cerrar del modal

De forma predeterminada, los modales tienen un botón de cerrar en la esquina superior derecha. Si deseas ocultar el botón de cerrar, puedes usar el método `modalCloseButton(false)`:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->modalCloseButton(false)
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalCloseButton()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si deseas ocultar el botón de cerrar para todos los modales en la aplicación, puedes hacerlo llamando a `ModalComponent::closeButton(false)` dentro de un service provider o middleware:

```php
use Filament\Support\View\Components\ModalComponent;

ModalComponent::closeButton(false);
```

## Prevenir que el modal se enfoque automáticamente

De forma predeterminada, los modales se enfocarán automáticamente en el primer elemento enfocable cuando se abran. Si deseas deshabilitar este comportamiento, puedes usar el método `modalAutofocus(false)`:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->schema([
        // ...
    ])
    ->action(function (array $data): void {
        // ...
    })
    ->modalAutofocus(false)
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalAutofocus()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si deseas deshabilitar el enfoque automático para todos los modales en la aplicación, puedes hacerlo llamando a `ModalComponent::autofocus(false)` dentro de un service provider o middleware:

```php
use Filament\Support\View\Components\ModalComponent;

ModalComponent::autofocus(false);
```

## Optimizar métodos de configuración del modal

Cuando usas consultas de base de datos u otras operaciones pesadas dentro de métodos de configuración del modal como `modalHeading()`, pueden ejecutarse más de una vez. Esto es porque Filament usa estos métodos para decidir si renderizar el modal o no, y también para renderizar el contenido del modal.

Para omitir la verificación que Filament hace para decidir si renderizar el modal, puedes usar el método `modal()`, que informará a Filament que el modal existe para esta action, y no necesita verificar de nuevo:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->modal()
```

## Ocultar condicionalmente el modal

Es posible que necesites mostrar condicionalmente un modal por razones de confirmación mientras regresas a la action predeterminada. Esto se puede lograr usando `modalHidden()`:

```php
use Filament\Actions\Action;

Action::make('create')
    ->action(function (array $data): void {
        // ...
    })
    ->modalHidden($this->role !== 'admin')
    ->modalContent(view('filament.pages.actions.create'))
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `modalHidden()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregar atributos adicionales a la ventana del modal

Puedes pasar atributos HTML adicionales a la ventana del modal a través del método `extraModalWindowAttributes()`, que se fusionarán en su elemento HTML externo. Los atributos deben ser representados por un array, donde la clave es el nombre del atributo y el valor es el valor del atributo:

```php
use Filament\Actions\Action;

Action::make('updateAuthor')
    ->extraModalWindowAttributes(['class' => 'update-author-modal'])
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `extraModalWindowAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::tip
De forma predeterminada, llamar a `extraModalWindowAttributes()` varias veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.
:::
