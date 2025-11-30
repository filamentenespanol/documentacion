---
title: Entrada de icono
---

## Introducción

Las entradas de icono renderizan un [icono](../styling/icons) que representa el estado de la entrada:

```php
use Filament\Infolists\Components\IconEntry;
use Filament\Support\Icons\Heroicon;

IconEntry::make('status')
    ->icon(fn (string $state): Heroicon => match ($state) {
        'draft' => Heroicon::OutlinedPencil,
        'reviewing' => Heroicon::OutlinedClock,
        'published' => Heroicon::OutlinedCheckCircle,
    })
```

<details>
<summary>Inyección de utilidades</summary>

El método `icon()` puede inyectar varias utilidades en la función como parámetros.

</details>

## Personalizando el color

Puedes cambiar el [color](../styling/colors) del icono, usando el método `color()`:

```php
use Filament\Infolists\Components\IconEntry;

IconEntry::make('status')
    ->color('success')
```

Al pasar una función a `color()`, puedes personalizar el color basándote en el estado de la entrada:

```php
use Filament\Infolists\Components\IconEntry;

IconEntry::make('status')
    ->color(fn (string $state): string => match ($state) {
        'draft' => 'info',
        'reviewing' => 'warning',
        'published' => 'success',
        default => 'gray',
    })
```

<details>
<summary>Inyección de utilidades</summary>

El método `color()` puede inyectar varias utilidades en la función como parámetros.

</details>

## Personalizando el tamaño

El tamaño predeterminado del icono es `IconSize::Large`, pero puedes personalizar el tamaño para que sea `IconSize::ExtraSmall`, `IconSize::Small`, `IconSize::Medium`, `IconSize::ExtraLarge` o `IconSize::TwoExtraLarge`:

```php
use Filament\Infolists\Components\IconEntry;
use Filament\Support\Enums\IconSize;

IconEntry::make('status')
    ->size(IconSize::Medium)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `size()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Manejando booleanos

Las entradas de icono pueden mostrar un icono de check o "X" basándose en el estado de la entrada, ya sea verdadero o falso, usando el método `boolean()`:

```php
use Filament\Infolists\Components\IconEntry;

IconEntry::make('is_featured')
    ->boolean()
```

> Si este atributo en la clase del modelo ya está convertido como `bool` o `boolean`, Filament puede detectar esto, y no necesitas usar `boolean()` manualmente.

Opcionalmente, puedes pasar un valor booleano para controlar si el icono debe ser booleano o no:

```php
use Filament\Infolists\Components\IconEntry;

IconEntry::make('is_featured')
    ->boolean(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `boolean()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizando los iconos booleanos

Puedes personalizar el [icono](../styling/icons) que representa cada estado:

```php
use Filament\Infolists\Components\IconEntry;
use Filament\Support\Icons\Heroicon;

IconEntry::make('is_featured')
    ->boolean()
    ->trueIcon(Heroicon::OutlinedCheckBadge)
    ->falseIcon(Heroicon::OutlinedXMark)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `trueIcon()` y `falseIcon()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

### Personalizando los colores booleanos

Puedes personalizar el [color](../styling/colors) del icono que representa cada estado:

```php
use Filament\Infolists\Components\IconEntry;

IconEntry::make('is_featured')
    ->boolean()
    ->trueColor('info')
    ->falseColor('warning')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `trueColor()` y `falseColor()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>
