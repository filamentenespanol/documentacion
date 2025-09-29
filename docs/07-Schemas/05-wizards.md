---
title: Asistentes (Wizards)
---

## Introducción

Similar a las [pestañas](tabs), puedes usar un asistente de múltiples pasos para reducir el número de componentes visibles a la vez. Esto es especialmente útil si tu formulario tiene un orden cronológico definido, donde cada paso debe validarse a medida que el usuario avanza.

```php
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;

Wizard::make([
    Step::make('Pedido')
        ->schema([
            // ...
        ]),
    Step::make('Entrega')
        ->schema([
            // ...
        ]),
    Step::make('Facturación')
        ->schema([
            // ...
        ]),
])
```

:::tip
Si quieres agregar un asistente al proceso de creación dentro de un [panel resource](../resources/creating-records#using-a-wizard) o un [modal de acción](../actions/modals#rendering-a-wizard-in-a-modal), sigue esa documentación. De esta manera te aseguras de que la posibilidad de enviar el formulario solo esté disponible en el último paso.
:::

## Renderizar un botón de envío en el último paso

Puedes usar el método `submitAction()` para renderizar un botón de envío o una vista al final del asistente, en el último paso:

```php
use Filament\Schemas\Components\Wizard;
use Illuminate\Support\HtmlString;

Wizard::make([
    // ...
])->submitAction(view('order-form.submit-button'))

Wizard::make([
    // ...
])->submitAction(new HtmlString('<button type="submit">Enviar</button>'))
```

También puedes usar el componente Blade de botón integrado de Filament:

```php
use Filament\Schemas\Components\Wizard;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\HtmlString;

Wizard::make([
    // ...
])->submitAction(new HtmlString(Blade::render(<<<BLADE
    <x-filament::button
        type="submit"
        size="sm"
    >
        Enviar
    </x-filament::button>
BLADE)))
```

## Establecer un ícono en los pasos

Los pasos pueden tener un [ícono](../styling/icons), que puedes establecer con `icon()`:

```php
use Filament\Schemas\Components\Wizard\Step;
use Filament\Support\Icons\Heroicon;

Step::make('Pedido')
    ->icon(Heroicon::ShoppingBag)
    ->schema([
        // ...
    ])
```

## Personalizar el ícono de pasos completados

Puedes personalizar el ícono de un paso completado usando `completedIcon()`:

```php
Step::make('Pedido')
    ->completedIcon(Heroicon::HandThumbUp)
    ->schema([
        // ...
    ])
```

## Agregar descripciones a los pasos

Puedes agregar una breve descripción a cada paso con `description()`:

```php
Step::make('Pedido')
    ->description('Revisa tu carrito')
    ->schema([
        // ...
    ])
```

## Establecer el paso activo por defecto

Con `startOnStep()` puedes cargar un paso específico al iniciar el asistente:

```php
Wizard::make([
    // ...
])->startOnStep(2)
```

## Permitir saltar pasos

Si quieres permitir navegación libre, donde todos los pasos sean salteables, usa `skippable()`:

```php
Wizard::make([
    // ...
])->skippable()
```

Opcionalmente, `skippable()` acepta un valor booleano para definir si el paso es salteable o no:

```php
Step::make('Pedido')
    ->skippable(FeatureFlag::active())
    ->schema([
        // ...
    ])
```

## Persistir el paso actual en la URL

Por defecto, el paso actual no se persiste en la query string. Puedes habilitarlo con `persistStepInQueryString()`:

```php
Wizard::make([
    // ...
])->persistStepInQueryString()
```

Puedes personalizar la clave de query string:

```php
Wizard::make([
    // ...
])->persistStepInQueryString('wizard-step')
```

## Hooks de ciclo de vida del paso

Puedes usar `afterValidation()` y `beforeValidation()` para ejecutar código antes o después de la validación del paso:

```php
Step::make('Pedido')
    ->afterValidation(function () {
        // ...
    })
    ->beforeValidation(function () {
        // ...
    })
```

### Prevenir que se cargue el siguiente paso

Dentro de estos métodos, puedes lanzar `Filament\Support\Exceptions\Halt` para evitar que se cargue el siguiente paso:

```php
use Filament\Support\Exceptions\Halt;

Step::make('Pedido')
    ->afterValidation(function () {
        if (true) {
            throw new Halt();
        }
    })
```

## Usar grid dentro de un paso

```php
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;

Wizard::make([
    Step::make('Pedido')
        ->columns(2)
        ->schema([
            // ...
        ]),
])
```

## Personalizar las acciones del asistente

Este componente usa objetos de acción para personalizar los botones `next` y `previous`. Ejemplo:

```php
use Filament\Actions\Action;
use Filament\Schemas\Components\Wizard;

Wizard::make([
    // ...
])
    ->nextAction(
        fn (Action $action) => $action->label('Siguiente paso'),
    )
```
