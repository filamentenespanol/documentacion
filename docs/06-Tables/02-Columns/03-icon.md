---
title: Columna de icono
---

## Introducción

Las columnas de icono renderizan un [icono](../../styling/icons) que representa el estado de la columna:

```php
use Filament\Tables\Columns\IconColumn;
use Filament\Support\Icons\Heroicon;

IconColumn::make('status')
    ->icon(fn (string $state): Heroicon => match ($state) {
        'draft' => Heroicon::OutlinedPencil,
        'reviewing' => Heroicon::OutlinedClock,
        'published' => Heroicon::OutlinedCheckCircle,
    })
```

<details>
<summary>💡 Utility Injection</summary>

El método `icon()` puede inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar el color

Puedes cambiar el [color](../../styling/colors) del icono usando el método `color()`:

```php
use Filament\Tables\Columns\IconColumn;

IconColumn::make('status')
    ->color('success')
```

Pasando una función a `color()`, puedes personalizar el color dependiendo del estado de la columna:

```php
use Filament\Tables\Columns\IconColumn;

IconColumn::make('status')
    ->color(fn (string $state): string => match ($state) {
        'draft' => 'info',
        'reviewing' => 'warning',
        'published' => 'success',
        default => 'gray',
    })
```

<details>
<summary>💡 Utility Injection</summary>

El método `color()` puede inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar el tamaño

El tamaño de icono por defecto es `IconSize::Large`, pero puedes cambiarlo a `IconSize::ExtraSmall`, `IconSize::Small`, `IconSize::Medium`, `IconSize::ExtraLarge` o `IconSize::TwoExtraLarge`:

```php
use Filament\Tables\Columns\IconColumn;
use Filament\Support\Enums\IconSize;

IconColumn::make('status')
    ->size(IconSize::Medium)
```

<details>
<summary>💡 Utility Injection</summary>

Además de aceptar valores estáticos, el método `size()` también admite una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Manejar valores booleanos

Las columnas de icono pueden mostrar un ícono de check o “X” dependiendo del estado de la columna (`true` o `false`), usando el método `boolean()`:

```php
use Filament\Tables\Columns\IconColumn;

IconColumn::make('is_featured')
    ->boolean()
```

> Si este atributo en la clase del modelo ya está casteado como `bool` o `boolean`, Filament puede detectarlo y no necesitas usar `boolean()` manualmente.

Opcionalmente, puedes pasar un valor booleano para controlar si el icono debe interpretarse como booleano:

```php
use Filament\Tables\Columns\IconColumn;

IconColumn::make('is_featured')
    ->boolean(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de aceptar valores estáticos, el método `boolean()` también admite una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar los iconos booleanos

Puedes personalizar el [icono](../../styling/icons) que representa cada estado:

```php
use Filament\Tables\Columns\IconColumn;
use Filament\Support\Icons\Heroicon;

IconColumn::make('is_featured')
    ->boolean()
    ->trueIcon(Heroicon::OutlinedCheckBadge)
    ->falseIcon(Heroicon::OutlinedXMark)
```

<details>
<summary>💡 Utility Injection</summary>

Además de aceptar valores estáticos, los métodos `trueIcon()` y `falseIcon()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

### Personalizar los colores booleanos

Puedes personalizar el [color](../../styling/colors) del icono que representa cada estado:

```php
use Filament\Tables\Columns\IconColumn;

IconColumn::make('is_featured')
    ->boolean()
    ->trueColor('info')
    ->falseColor('warning')
```

<details>
<summary>💡 Utility Injection</summary>

Además de aceptar valores estáticos, los métodos `trueColor()` y `falseColor()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

## Agrupar múltiples iconos

Cuando se muestran varios iconos, pueden configurarse para que se ajusten (`wrap()`) en caso de no caber en una sola línea:

```php
use Filament\Tables\Columns\IconColumn;

IconColumn::make('icon')
    ->wrap()
```

:::tip
El "ancho" para que se haga el ajuste depende de la etiqueta de la columna, así que puede que necesites usar una etiqueta más corta u oculta para que se ajuste más estrechamente.
:::
