---
title: Acciones de prueba
---

## Llamar a una acción en una prueba

Puedes llamar a una acción pasando su nombre o clase a `callAction()`:

```php
use function Pest\Livewire\livewire;

it('can send invoices', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->callAction('send');

    expect($invoice->refresh())
        ->isSent()->toBeTrue();
});
```

## Acciones de la tabla de prueba

Para probar acciones de tabla, puede utilizar un objeto `TestAction` con el método `table()`. Este objeto recibe el nombre de la acción que desea probar y reemplaza el nombre de la acción en cualquier método de prueba que desee utilizar. Por ejemplo:

```php
use Filament\Actions\Testing\TestAction;
use function Pest\Livewire\livewire;

$invoice = Invoice::factory()->create();

livewire(ListInvoices::class)
    ->callAction(TestAction::make('send')->table($invoice));

livewire(ListInvoices::class)
    ->assertActionVisible(TestAction::make('send')->table($invoice))

livewire(ListInvoices::class)
    ->assertActionExists(TestAction::make('send')->table($invoice))
```

### Probar acciones de encabezado de tabla

Para probar una acción de encabezado, puede usar el método `table()` sin pasar un registro específico para probar:

```php
use Filament\Actions\Testing\TestAction;
use function Pest\Livewire\livewire;

livewire(ListInvoices::class)
    ->callAction(TestAction::make('create')->table());

livewire(ListInvoices::class)
    ->assertActionVisible(TestAction::make('create')->table())

livewire(ListInvoices::class)
    ->assertActionExists(TestAction::make('create')->table())
```

### Prueba de acciones masivas de la tabla

Para probar una acción masiva, primero llame a `selectTableRecords()` y ​​pase los registros que desee seleccionar. Luego, use el método `bulk()` de `TestAction` para especificar la acción que desea probar. Por ejemplo:

```php
use Filament\Actions\Testing\TestAction;
use function Pest\Livewire\livewire;

$invoices = Invoice::factory()->count(3)->create();

livewire(ListInvoices::class)
    ->selectTableRecords($invoices->pluck('id')->toArray())
    ->callAction(TestAction::make('send')->table()->bulk());

livewire(ListInvoices::class)
    ->assertActionVisible(TestAction::make('send')->table()->bulk())

livewire(ListInvoices::class)
    ->assertActionExists(TestAction::make('send')->table()->bulk())
```

## Probar acciones en un esquema

Si una acción pertenece a un componente en la infolista de un recurso, por ejemplo, si está en el método `belowContent()` de una entrada de infolista, puede usar el objeto `TestAction` con el método `schemaComponent()`. Este objeto recibe el nombre de la acción que desea probar y reemplaza el nombre de la acción en cualquier método de prueba que desee utilizar. Por ejemplo:

```php
use Filament\Actions\Testing\TestAction;
use function Pest\Livewire\livewire;

$invoice = Invoice::factory()->create();

livewire(EditInvoice::class)
    ->callAction(TestAction::make('send')->schemaComponent('customer_id'));

livewire(EditInvoice::class)
    ->assertActionVisible(TestAction::make('send')->schemaComponent('customer_id'))

livewire(EditInvoice::class)
    ->assertActionExists(TestAction::make('send')->schemaComponent('customer_id'))
```

## Probar acciones dentro del esquema/formulario de otra acción

Si una acción pertenece a un componente en el `schema()` de otra acción (o `form()`), por ejemplo, si está en el método `belowContent()` de un campo de formulario en un modal de acción, puede usar el objeto `TestAction` con el método `schemaComponent()`. Este objeto recibe el nombre de la acción que desea probar y reemplaza el nombre de la acción en cualquier método de prueba que desee utilizar. Debes pasar una matriz de objetos `TestAction` en orden, por ejemplo:

```php
use Filament\Actions\Testing\TestAction;
use function Pest\Livewire\livewire;

$invoice = Invoice::factory()->create();

livewire(ManageInvoices::class)
    ->callAction([
        TestAction::make('view')->table($invoice),
        TestAction::make('send')->schemaComponent('customer.name'),
    ]);
    
livewire(ManageInvoices::class)
    ->assertActionVisible([
        TestAction::make('view')->table($invoice),
        TestAction::make('send')->schemaComponent('customer.name'),
    ]);
    
livewire(ManageInvoices::class)
    ->assertActionExists([
        TestAction::make('view')->table($invoice),
        TestAction::make('send')->schemaComponent('customer.name'),
    ]);
```

## Probar formularios en modos de acción

Para pasar una matriz de datos a una acción, use el parámetro `data`:

```php
use function Pest\Livewire\livewire;

it('can send invoices', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->callAction('send', data: [
            'email' => $email = fake()->email(),
        ])
        ->assertHasNoFormErrors();

    expect($invoice->refresh())
        ->isSent()->toBeTrue()
        ->recipient_email->toBe($email);
});
```

Si alguna vez necesita configurar solo los datos de una acción sin llamarla inmediatamente, puede usar `fillForm()`:

```php
use function Pest\Livewire\livewire;

it('can send invoices', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->mountAction('send')
        ->fillForm([
            'email' => $email = fake()->email(),
        ])
});
```

### Prueba de errores de validación en el formulario de un modal de acción

`assertHasNoFormErrors()` se utiliza para afirmar que no se produjeron errores de validación al enviar el formulario de acción.

Para comprobar si se ha producido un error de validación con los datos, utilice `assertHasFormErrors()`, similar a `assertHasErrors()` en Livewire:

```php
use function Pest\Livewire\livewire;

it('can validate invoice recipient email', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->callAction('send', data: [
            'email' => Str::random(),
        ])
        ->assertHasFormErrors(['email' => ['email']]);
});
```

Para comprobar si una acción está precargada con datos, puede utilizar el método `assertSchemaStateSet()`:

```php
use function Pest\Livewire\livewire;

it('can send invoices to the primary contact by default', function () {
    $invoice = Invoice::factory()->create();
    $recipientEmail = $invoice->company->primaryContact->email;

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->mountAction('send')
        ->assertSchemaStateSet([
            'email' => $recipientEmail,
        ])
        ->callMountedAction()
        ->assertHasNoFormErrors();

    expect($invoice->refresh())
        ->isSent()->toBeTrue()
        ->recipient_email->toBe($recipientEmail);
});
```

## Probando el contenido de un modal de acción

Para afirmar el contenido de un modal, primero debes montar la acción (en lugar de llamarla para cerrar el modal). Luego puede usar [aserciones de Livewire](https://livewire.laravel.com/docs/testing#assertions) como `assertSee()` para afirmar que el modal contiene el contenido que espera:

```php
use function Pest\Livewire\livewire;

it('confirms the target address before sending', function () {
    $invoice = Invoice::factory()->create();
    $recipientEmail = $invoice->company->primaryContact->email;

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->mountAction('send')
        ->assertSee($recipientEmail);
});
```

## Probar la existencia de una acción

Para asegurarse de que una acción exista o no, puede utilizar el método `assertActionExists()` o `assertActionDoesNotExist()`:

```php
use function Pest\Livewire\livewire;

it('can send but not unsend invoices', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionExists('send')
        ->assertActionDoesNotExist('unsend');
});
```

Puede pasar una función como argumento adicional para afirmar que una acción pasa una "prueba de verdad" determinada. Esto es útil para afirmar que una acción tiene una configuración específica:

```php
use Filament\Actions\Action;
use function Pest\Livewire\livewire;

it('has the correct description', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionExists('send', function (Action $action): bool {
            return $action->getModalDescription() === 'This will send an email to the customer\'s primary address, with the invoice attached as a PDF';
        });
});
```

## Probar la visibilidad de una acción

Para garantizar que una acción esté oculta o visible para un usuario, puede utilizar los métodos `assertActionHidden()` o `assertActionVisible()`:

```php
use function Pest\Livewire\livewire;

it('can only print invoices', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionHidden('send')
        ->assertActionVisible('print');
});
```

## Probando acciones deshabilitadas

Para garantizar que una acción esté habilitada o deshabilitada para un usuario, puede utilizar los métodos `assertActionEnabled()` o `assertActionDisabled()`:

```php
use function Pest\Livewire\livewire;

it('can only print a sent invoice', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionDisabled('send')
        ->assertActionEnabled('print');
});
```

Para garantizar que existan conjuntos de acciones en el orden correcto, puede utilizar `assertActionsExistInOrder()`:

```php
use function Pest\Livewire\livewire;

it('can have actions in order', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionsExistInOrder(['send', 'export']);
});
```

Para comprobar si una acción está oculta para un usuario, puede utilizar el método `assertActionHidden()`:

```php
use function Pest\Livewire\livewire;

it('can not send invoices', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionHidden('send');
});
```

## Probando la etiqueta de una acción

Para garantizar que una acción tenga la etiqueta correcta, puede utilizar `assertActionHasLabel()` y ​​`assertActionDoesNotHaveLabel()`:

```php
use function Pest\Livewire\livewire;

it('send action has correct label', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionHasLabel('send', 'Email Invoice')
        ->assertActionDoesNotHaveLabel('send', 'Send');
});
```

## Probando el icono de una acción

Para asegurarse de que el botón de una acción muestre el ícono correcto, puede usar `assertActionHasIcon()` o `assertActionDoesNotHaveIcon()`:

```php
use function Pest\Livewire\livewire;

it('when enabled the send button has correct icon', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionEnabled('send')
        ->assertActionHasIcon('send', 'envelope-open')
        ->assertActionDoesNotHaveIcon('send', 'envelope');
});
```

## Probando el color de una acción

Para asegurarse de que el botón de una acción muestre el color correcto, puede usar `assertActionHasColor()` o `assertActionDoesNotHaveColor()`:

```php
use function Pest\Livewire\livewire;

it('actions display proper colors', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionHasColor('delete', 'danger')
        ->assertActionDoesNotHaveColor('print', 'danger');
});
```

## Probando la URL de una acción

Para garantizar que una acción tenga la URL correcta, puede utilizar `assertActionHasUrl()`, `assertActionDoesNotHaveUrl()`, `assertActionShouldOpenUrlInNewTab()` y ​​`assertActionShouldNotOpenUrlInNewTab()`:

```php
use function Pest\Livewire\livewire;

it('links to the correct Filament sites', function () {
    $invoice = Invoice::factory()->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->assertActionHasUrl('filament', 'https://filamentphp.com/')
        ->assertActionDoesNotHaveUrl('filament', 'https://github.com/filamentphp/filament')
        ->assertActionShouldOpenUrlInNewTab('filament')
        ->assertActionShouldNotOpenUrlInNewTab('github');
});
```

## Probar argumentos de acción

Para probar argumentos de acción, puede utilizar un objeto `TestAction` con el método `arguments()`. Este objeto recibe el nombre de la acción que desea probar y reemplaza el nombre de la acción en cualquier método de prueba que desee utilizar. Por ejemplo:

```php
use Filament\Actions\Testing\TestAction;
use function Pest\Livewire\livewire;

$invoice = Invoice::factory()->create();

livewire(ManageInvoices::class)
    ->callAction(TestAction::make('send')->arguments(['invoice' => $invoice->getKey()]));

livewire(ManageInvoices::class)
    ->assertActionVisible(TestAction::make('send')->arguments(['invoice' => $invoice->getKey()]))

livewire(ManageInvoices::class)
    ->assertActionExists(TestAction::make('send')->arguments(['invoice' => $invoice->getKey()]))
```

## Probar si una acción se ha detenido

Para comprobar si una acción ha sido detenida, puedes usar `assertActionHalted()`:

```php
use function Pest\Livewire\livewire;

it('stops sending if invoice has no email address', function () {
    $invoice = Invoice::factory(['email' => null])->create();

    livewire(EditInvoice::class, [
        'invoice' => $invoice,
    ])
        ->callAction('send')
        ->assertActionHalted('send');
});
```

## Usar nombres de clases de acción en pruebas

Filament incluye una serie de acciones prediseñadas como `CreateAction`, `EditAction` y ​​`DeleteAction`, y puedes usar estos nombres de clases en tus pruebas en lugar de nombres de acciones, por ejemplo:

```php
use Filament\Actions\CreateAction;
use function Pest\Livewire\livewire;

livewire(ManageInvoices::class)
    ->callAction(CreateAction::class)
```

Si tiene sus propias clases de acción en su aplicación con un método `make()`, Filament no puede descubrir el nombre de su acción a menos que ejecute el método `make()`, lo cual no es eficiente. Para usar sus propios nombres de clases de acción en sus pruebas, puede agregar un atributo `#[ActionName]` a su clase de acción, que Filament puede usar para descubrir el nombre de su acción. El nombre pasado al atributo `#[ActionName]` debe ser el mismo que el nombre de la acción que normalmente usaría en sus pruebas. Por ejemplo:

```php
use Filament\Actions\Action;
use Filament\Actions\ActionName;

#[ActionName('send')]
class SendInvoiceAction
{
    public static function make(): Action
    {
        return Action::make('send')
            ->requiresConfirmation()
            ->action(function () {
                // ...
            });
    }
}
```

Ahora, puedes usar el nombre de la clase en tus pruebas:

```php
use App\Filament\Resources\Invoices\Actions\SendInvoiceAction;
use Filament\Actions\Testing\TestAction;
use function Pest\Livewire\livewire;

$invoice = Invoice::factory()->create();

livewire(ManageInvoices::class)
    ->callAction(TestAction::make(SendInvoiceAction::class)->table($invoice);
```

Si tiene una clase de acción que extiende la clase `Action`, puede agregar un método estático `getDefaultName()` a la clase, que se utilizará para descubrir el nombre de la acción. También permite a los usuarios omitir el nombre de la acción del método `make()` al crear una instancia. Por ejemplo:

```php
use Filament\Actions\Action;

class SendInvoiceAction extends Action
{
    public static function getDefaultName(): string
    {
        return 'send';
    }

    protected function setUp(): void
    {
        parent::setUp();
        
        $this
            ->requiresConfirmation()
            ->action(function () {
                // ...
            });
    }
}
```
