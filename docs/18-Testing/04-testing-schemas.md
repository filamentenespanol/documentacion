---
title: Esquemas de prueba
---

## Llenar un formulario en una prueba

Para llenar un formulario con datos, pasa los datos a `fillForm()`:

```php
use function Pest\Livewire\livewire;

livewire(CreatePost::class)
    ->fillForm([
        'title' => fake()->sentence(),
        // ...
    ]);
```

> Si tiene varios esquemas en un componente Livewire, puede especificar qué formulario desea completar usando `fillForm([...], 'createPostForm')`.

## Campo de formulario de prueba y estado de entrada de infolista

Para comprobar que un formulario tiene datos utilice `assertSchemaStateSet()`:

```php
use Illuminate\Support\Str;
use function Pest\Livewire\livewire;

it('can automatically generate a slug from the title', function () {
    $title = fake()->sentence();

    livewire(CreatePost::class)
        ->fillForm([
            'title' => $title,
        ])
        ->assertSchemaStateSet([
            'slug' => Str::slug($title),
        ]);
});
```

> Si tiene varios esquemas en un componente Livewire, puede especificar qué esquema desea verificar usando `assertSchemaStateSet([...], 'createPostForm')`.

También puede resultarle útil pasar una función al método `assertSchemaStateSet()`, que le permite acceder al formulario `$state` y ​​realizar aserciones adicionales:

```php
use Illuminate\Support\Str;
use function Pest\Livewire\livewire;

it('can automatically generate a slug from the title without any spaces', function () {
    $title = fake()->sentence();

    livewire(CreatePost::class)
        ->fillForm([
            'title' => $title,
        ])
        ->assertSchemaStateSet(function (array $state): array {
            expect($state['slug'])
                ->not->toContain(' ');
                
            return [
                'slug' => Str::slug($title),
            ];
        });
});
```

Puede devolver una matriz de la función si desea que Filament continúe afirmando el estado del esquema después de que se haya ejecutado la función.

## Validación del formulario de prueba

Utilice `assertHasFormErrors()` para garantizar que los datos se validen correctamente en un formulario:

```php
use function Pest\Livewire\livewire;

it('can validate input', function () {
    livewire(CreatePost::class)
        ->fillForm([
            'title' => null,
        ])
        ->call('create')
        ->assertHasFormErrors(['title' => 'required']);
});
```

Y `assertHasNoFormErrors()` para asegurar que no haya errores de validación:

```php
use function Pest\Livewire\livewire;

livewire(CreatePost::class)
    ->fillForm([
        'title' => fake()->sentence(),
        // ...
    ])
    ->call('create')
    ->assertHasNoFormErrors();
```

> Si tiene varios esquemas en un componente Livewire, puede pasar el nombre de un formulario específico como segundo parámetro como `assertHasFormErrors(['title' => 'required'], 'createPostForm')` o `assertHasNoFormErrors([], 'createPostForm')`.

## Probando la existencia de un formulario

Para comprobar que un componente Livewire tiene un formulario, utilice `assertFormExists()`:

```php
use function Pest\Livewire\livewire;

it('has a form', function () {
    livewire(CreatePost::class)
        ->assertFormExists();
});
```

> Si tiene varios esquemas en un componente Livewire, puede pasar el nombre de un formulario específico como `assertFormExists('createPostForm')`.

## Probando la existencia de campos de formulario

Para asegurarse de que un formulario tenga un campo determinado, pase el nombre del campo a `assertFormFieldExists()`:

```php
use function Pest\Livewire\livewire;

it('has a title field', function () {
    livewire(CreatePost::class)
        ->assertFormFieldExists('title');
});
```

Puede pasar una función como argumento adicional para afirmar que un campo pasa una "prueba de verdad" determinada. Esto es útil para afirmar que un campo tiene una configuración específica:

```php
use function Pest\Livewire\livewire;

it('has a title field', function () {
    livewire(CreatePost::class)
        ->assertFormFieldExists('title', function (TextInput $field): bool {
            return $field->isDisabled();
        });
});
```

Para afirmar que un formulario no tiene un campo determinado, pase el nombre del campo a `assertFormFieldDoesNotExist()`:

```php
use function Pest\Livewire\livewire;

it('does not have a conditional field', function () {
    livewire(CreatePost::class)
        ->assertFormFieldDoesNotExist('no-such-field');
});
```

> Si tiene varios esquemas en un componente Livewire, puede especificar en qué formulario desea verificar la existencia del campo como `assertFormFieldExists('title', 'createPostForm')`.

## Probando la visibilidad de los campos del formulario

Para asegurarse de que un campo sea visible, pase el nombre a `assertFormFieldVisible()`:

```php
use function Pest\Livewire\livewire;

test('title is visible', function () {
    livewire(CreatePost::class)
        ->assertFormFieldVisible('title');
});
```

O para asegurarse de que un campo esté oculto, puede pasar el nombre a `assertFormFieldHidden()`:

```php
use function Pest\Livewire\livewire;

test('title is hidden', function () {
    livewire(CreatePost::class)
        ->assertFormFieldHidden('title');
});
```

> Tanto para `assertFormFieldHidden()` como para `assertFormFieldVisible()` puedes pasar el nombre de un formulario específico al que pertenece el campo como segundo argumento como `assertFormFieldHidden('title', 'createPostForm')`.

## Prueba de campos de formulario deshabilitados

Para asegurarse de que un campo esté habilitado, pase el nombre a `assertFormFieldEnabled()`:

```php
use function Pest\Livewire\livewire;

test('title is enabled', function () {
    livewire(CreatePost::class)
        ->assertFormFieldEnabled('title');
});
```

O para asegurarse de que un campo esté deshabilitado, puede pasar el nombre a `assertFormFieldDisabled()`:

```php
use function Pest\Livewire\livewire;

test('title is disabled', function () {
    livewire(CreatePost::class)
        ->assertFormFieldDisabled('title');
});
```

> Para `assertFormFieldEnabled()` y ​​`assertFormFieldDisabled()` puede pasar el nombre de un formulario específico al que pertenece el campo como segundo argumento como `assertFormFieldEnabled('title', 'createPostForm')`.

## Probar otros componentes del esquema

Si necesita verificar si existe un componente de esquema en particular en lugar de un campo, puede usar `assertSchemaComponentExists()`.  Como los componentes no tienen nombre, este método utiliza el `key()` proporcionado por el desarrollador:

```php
use Filament\Schemas\Components\Section;

Section::make('Comments')
    ->key('comments-section')
    ->schema([
        //
    ])
```

```php
use function Pest\Livewire\livewire;

test('comments section exists', function () {
    livewire(EditPost::class)
        ->assertSchemaComponentExists('comments-section');
});
```

Para afirmar que un esquema no tiene un componente determinado, pase la clave del componente a `assertSchemaComponentDoesNotExist()`:

```php
use function Pest\Livewire\livewire;

it('does not have a conditional component', function () {
    livewire(CreatePost::class)
        ->assertSchemaComponentDoesNotExist('no-such-section');
});
```

Para verificar si el componente existe y pasa una prueba de verdad determinada, puede pasar una función al argumento `checkComponentUsing` de `assertSchemaComponentExists()`, devolviendo verdadero o falso si el componente pasa la prueba o no:

```php
use Filament\Forms\Components\Component;

use function Pest\Livewire\livewire;

test('comments section has heading', function () {
    livewire(EditPost::class)
        ->assertSchemaComponentExists(
            'comments-section',
            checkComponentUsing: function (Component $component): bool {
                return $component->getHeading() === 'Comments';
            },
        );
});
```

Si desea resultados de prueba más informativos, puede insertar una afirmación dentro de su devolución de llamada de prueba de verdad:

```php
use Filament\Forms\Components\Component;
use Illuminate\Testing\Assert;

use function Pest\Livewire\livewire;

test('comments section is enabled', function () {
    livewire(EditPost::class)
        ->assertSchemaComponentExists(
            'comments-section',
            checkComponentUsing: function (Component $component): bool {
                Assert::assertTrue(
                    $component->isEnabled(),
                    'Failed asserting that comments-section is enabled.',
                );
                
                return true;
            },
        );
});
```

## Probando repetidores

Internamente, los repetidores generan UUID para los elementos para realizar un seguimiento más fácil en el HTML de Livewire. Esto significa que cuando prueba un formulario con un repetidor, debe asegurarse de que los UUID sean coherentes entre el formulario y la prueba. Esto puede ser complicado y, si no lo hace correctamente, sus pruebas pueden fallar ya que esperan un UUID, no una clave numérica.

Sin embargo, dado que Livewire no necesita realizar un seguimiento de los UUID en una prueba, puede desactivar la generación de UUID y reemplazarlos con claves numéricas, utilizando el método `Repeater::fake()` al inicio de la prueba:

```php
use Filament\Forms\Components\Repeater;
use function Pest\Livewire\livewire;

$undoRepeaterFake = Repeater::fake();

livewire(EditPost::class, ['record' => $post])
    ->assertSchemaStateSet([
        'quotes' => [
            [
                'content' => 'First quote',
            ],
            [
                'content' => 'Second quote',
            ],
        ],
        // ...
    ]);

$undoRepeaterFake();
```

También puede resultarle útil probar la cantidad de elementos en un repetidor pasando una función al método `assertSchemaStateSet()`:

```php
use Filament\Forms\Components\Repeater;
use function Pest\Livewire\livewire;

$undoRepeaterFake = Repeater::fake();

livewire(EditPost::class, ['record' => $post])
    ->assertSchemaStateSet(function (array $state) {
        expect($state['quotes'])
            ->toHaveCount(2);
    });

$undoRepeaterFake();
```

### Probando acciones repetidoras

Para probar que las acciones del repetidor funcionan como se esperaba, puede utilizar el método `callFormComponentAction()` para llamar a las acciones del repetidor y luego [realizar afirmaciones adicionales](../testing#actions).

Para interactuar con una acción en un elemento repetidor en particular, debe pasar el argumento `item` con la clave de ese elemento repetidor. Si su repetidor está leyendo una relación, debe anteponer el ID (clave) del registro relacionado con `record-` para formar la clave del elemento repetidor:

```php
use App\Models\Quote;
use Filament\Forms\Components\Repeater;
use function Pest\Livewire\livewire;

$quote = Quote::first();

livewire(EditPost::class, ['record' => $post])
    ->callAction(TestAction::make('sendQuote')->schemaComponent('quotes')->arguments([
        'item' => "record-{$quote->getKey()}",
    ]))
    ->assertNotified('Quote sent!');
```

## Constructores de pruebas

Internamente, los constructores generan UUID para los elementos para realizar un seguimiento más fácil en el HTML de Livewire. Esto significa que cuando prueba un formulario con un constructor, debe asegurarse de que los UUID sean coherentes entre el formulario y la prueba. Esto puede ser complicado y, si no lo hace correctamente, sus pruebas pueden fallar ya que esperan un UUID, no una clave numérica.

Sin embargo, dado que Livewire no necesita realizar un seguimiento de los UUID en una prueba, puede desactivar la generación de UUID y reemplazarlos con claves numéricas, utilizando el método `Builder::fake()` al inicio de la prueba:

```php
use Filament\Forms\Components\Builder;
use function Pest\Livewire\livewire;

$undoBuilderFake = Builder::fake();

livewire(EditPost::class, ['record' => $post])
    ->assertSchemaStateSet([
        'content' => [
            [
                'type' => 'heading',
                'data' => [
                    'content' => 'Hello, world!',
                    'level' => 'h1',
                ],
            ],
            [
                'type' => 'paragraph',
                'data' => [
                    'content' => 'This is a test post.',
                ],
            ],
        ],
        // ...
    ]);

$undoBuilderFake();
```

También puede resultarle útil acceder a probar la cantidad de elementos en un repetidor pasando una función al método `assertSchemaStateSet()`:

```php
use Filament\Forms\Components\Builder;
use function Pest\Livewire\livewire;

$undoBuilderFake = Builder::fake();

livewire(EditPost::class, ['record' => $post])
    ->assertSchemaStateSet(function (array $state) {
        expect($state['content'])
            ->toHaveCount(2);
    });

$undoBuilderFake();
```

## Asistentes de pruebas

Para ir al siguiente paso del asistente, use `goToNextWizardStep()`:

```php
use function Pest\Livewire\livewire;

it('moves to next wizard step', function () {
    livewire(CreatePost::class)
        ->goToNextWizardStep()
        ->assertHasFormErrors(['title']);
});
```

También puedes ir al paso anterior llamando a `goToPreviousWizardStep()`:

```php
use function Pest\Livewire\livewire;

it('moves to next wizard step', function () {
    livewire(CreatePost::class)
        ->goToPreviousWizardStep()
        ->assertHasFormErrors(['title']);
});
```

Si desea ir a un paso específico, use `goToWizardStep()`, luego el método `assertWizardCurrentStep` que puede garantizar que esté en el paso deseado sin errores de validación del anterior:

```php
use function Pest\Livewire\livewire;

it('moves to the wizards second step', function () {
    livewire(CreatePost::class)
        ->goToWizardStep(2)
        ->assertWizardCurrentStep(2);
});
```

Si tiene varios esquemas en un único componente Livewire, cualquiera de los asistentes de prueba del asistente puede aceptar un parámetro `schema`:

```php
use function Pest\Livewire\livewire;

it('moves to next wizard step only for fooForm', function () {
    livewire(CreatePost::class)
        ->goToNextWizardStep(schema: 'fooForm')
        ->assertHasFormErrors(['title'], schema: 'fooForm');
});
```
