---
title: Agrupar actions
---

## Introducción

Puedes agrupar actions juntas en un menú desplegable usando un objeto `ActionGroup`. Los grupos pueden contener muchas actions, u otros grupos:

```php
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;

ActionGroup::make([
    Action::make('view'),
    Action::make('edit'),
    Action::make('delete'),
])
```

Esta página trata sobre la personalización de la apariencia del botón de activación del grupo y el desplegable.

## Personalizar el estilo del activador del grupo

El botón que abre el desplegable puede personalizarse de la misma manera que una action normal. [Todos los métodos disponibles para botones de activación](overview) pueden usarse para personalizar el botón de activación del grupo:

```php
use Filament\Actions\ActionGroup;
use Filament\Support\Enums\Size;

ActionGroup::make([
    // Array de actions
])
    ->label('More actions')
    ->icon('heroicon-m-ellipsis-vertical')
    ->size(Size::Small)
    ->color('primary')
    ->button()
```

### Usar un diseño de grupo de botones

En lugar de un desplegable, un grupo de actions puede renderizarse a sí mismo como un grupo de botones. Este diseño funciona con y sin etiquetas de botón. Para usar esta función, usa el método `buttonGroup()`:

```php
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Support\Icons\Heroicon;

ActionGroup::make([
    Action::make('edit')
        ->color('gray')
        ->icon(Heroicon::PencilSquare)
        ->hiddenLabel(),
    Action::make('delete')
        ->color('gray')
        ->icon(Heroicon::Trash)
        ->hiddenLabel(),
])
    ->buttonGroup()
```

## Establecer la ubicación del desplegable

El desplegable puede posicionarse en relación con el botón de activación usando el método `dropdownPlacement()`:

```php
use Filament\Actions\ActionGroup;

ActionGroup::make([
    // Array de actions
])
    ->dropdownPlacement('top-start')
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `dropdownPlacement()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregar divisores entre actions

Puedes agregar divisores entre grupos de actions usando objetos `ActionGroup` anidados:

```php
use Filament\Actions\ActionGroup;

ActionGroup::make([
    ActionGroup::make([
        // Array de actions
    ])->dropdown(false),
    // Array de actions
])
```

El método `dropdown(false)` coloca las actions dentro del desplegable padre, en lugar de un nuevo desplegable anidado.

<details>
<summary>Información de inyección de utilidades</summary>

El método `dropdown()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Establecer el ancho del desplegable

El desplegable puede configurarse con un ancho usando el método `dropdownWidth()`. Las opciones corresponden a la [escala de ancho máximo de Tailwind](https://tailwindcss.com/docs/max-width). Las opciones son `ExtraSmall`, `Small`, `Medium`, `Large`, `ExtraLarge`, `TwoExtraLarge`, `ThreeExtraLarge`, `FourExtraLarge`, `FiveExtraLarge`, `SixExtraLarge` y `SevenExtraLarge`:

```php
use Filament\Actions\ActionGroup;
use Filament\Support\Enums\Width;

ActionGroup::make([
    // Array de actions
])
    ->dropdownWidth(Width::ExtraSmall)
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `dropdownWidth()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Controlar el desplazamiento del desplegable

Puedes controlar el desplazamiento del desplegable usando el método `dropdownOffset()`, de forma predeterminada el desplazamiento se establece en `8`.

```php
use Filament\Actions\ActionGroup;

ActionGroup::make([
    // Array de actions
])
    ->dropdownOffset(16)
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `dropdownOffset()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Controlar la altura máxima del desplegable

El contenido del desplegable puede tener una altura máxima usando el método `maxHeight()`, para que se desplace. Puedes pasar una [longitud CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/length):

```php
use Filament\Actions\ActionGroup;

ActionGroup::make([
    // Array de actions
])
    ->maxHeight('400px')
```

<details>
<summary>Información de inyección de utilidades</summary>

El método `maxHeight()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

</details>
