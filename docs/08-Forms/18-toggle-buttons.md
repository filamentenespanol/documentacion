---
title: Toggle buttons
---

## Introducción

El input de toggle buttons proporciona un grupo de botones para seleccionar un único valor, o múltiples valores, de una lista de opciones predefinidas:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('status')
    ->options([
        'draft' => 'Draft',
        'scheduled' => 'Scheduled',
        'published' => 'Published'
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un array estático, el método <code>options()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Cambiar el color de los botones de opción

Puedes cambiar el [color](../styling/colors) de los botones de opción usando el método `colors()`. Cada clave del array debe corresponder a un valor de opción:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('status')
    ->options([
        'draft' => 'Draft',
        'scheduled' => 'Scheduled',
        'published' => 'Published'
    ])
    ->colors([
        'draft' => 'info',
        'scheduled' => 'warning',
        'published' => 'success',
    ])
```

Si estás usando un enum para las opciones, puedes usar la interfaz [`HasColor`](../advanced/enums#enum-colors) para definir colores en su lugar.

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un array estático, el método <code>colors()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Añadir iconos a los botones de opción

Puedes añadir [icono](../styling/icons) a los botones de opción usando el método `icons()`. Cada clave del array debe corresponder a un valor de opción, y el valor puede ser cualquier [icono](../styling/icons) válido:

```php
use Filament\Forms\Components\ToggleButtons;
use Filament\Support\Icons\Heroicon;

ToggleButtons::make('status')
    ->options([
        'draft' => 'Draft',
        'scheduled' => 'Scheduled',
        'published' => 'Published'
    ])
    ->icons([
        'draft' => Heroicon::OutlinedPencil,
        'scheduled' => Heroicon::OutlinedClock,
        'published' => Heroicon::OutlinedCheckCircle,
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un array estático, el método <code>icons()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

Si estás usando un enum para las opciones, puedes usar la interfaz [`HasIcon`](../advanced/enums#enum-icons) para definir iconos en su lugar.

Si quieres mostrar solo iconos, puedes usar `hiddenButtonLabels()` para ocultar las etiquetas de las opciones.

## Opciones booleanas

Si quieres un grupo de botones booleano simple, con opciones "Yes" y "No", puedes usar el método `boolean()`:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('feedback')
    ->label('Like this post?')
    ->boolean()
```

Las opciones tendrán [colores](#cambiar-el-color-de-los-botones-de-opción) e [iconos](#añadir-iconos-a-los-botones-de-opción) configurados automáticamente, pero puedes sobrescribirlos con `colors()` o `icons()`.

Para personalizar la etiqueta de "Yes", puedes usar el argumento `trueLabel` en el método `boolean()`:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('feedback')
    ->label('Like this post?')
    ->boolean(trueLabel: 'Absolutely!')
```

Para personalizar la etiqueta de "No", puedes usar el argumento `falseLabel` en el método `boolean()`:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('feedback')
    ->label('Like this post?')
    ->boolean(falseLabel: 'Not at all!')
```

## Posicionar las opciones en línea entre sí

Puede que desees mostrar los botones `inline()` entre sí:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('feedback')
    ->label('Like this post?')
    ->boolean()
    ->inline()
```

Opcionalmente, puedes pasar un valor booleano para controlar si los botones deben estar en línea o no:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('feedback')
    ->label('Like this post?')
    ->boolean()
    ->inline(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>inline()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Agrupar botones de opción

Puede que desees agrupar botones de opción para que sean más compactos, usando el método `grouped()`. Esto también hace que aparezcan horizontalmente en línea entre sí:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('feedback')
    ->label('Like this post?')
    ->boolean()
    ->grouped()
```

Opcionalmente, puedes pasar un valor booleano para controlar si los botones deben agruparse o no:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('feedback')
    ->label('Like this post?')
    ->boolean()
    ->grouped(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>grouped()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Seleccionar múltiples botones

El método `multiple()` en el componente `ToggleButtons` te permite seleccionar múltiples valores de la lista de opciones:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('technologies')
    ->multiple()
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
```

Estas opciones se devuelven en formato JSON. Si las estás guardando usando Eloquent, debes asegurarte de añadir un [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) `array` a la propiedad del modelo:

```php
use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    { 
        return [
            'technologies' => 'array',
        ];
    }

    // ...
}
```

Opcionalmente, puedes pasar un valor booleano para controlar si los botones deben permitir selecciones múltiples o no:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('technologies')
    ->multiple(FeatureFlag::active())
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>multiple()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Dividir opciones en columnas

Puedes dividir opciones en columnas usando el método `columns()`:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('technologies')
    ->options([
        // ...
    ])
    ->columns(2)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>columns()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

Este método acepta las mismas opciones que el método `columns()` del [grid](../schemas/layouts#grid-system). Esto te permite personalizar responsivamente el número de columnas en varios breakpoints.

### Establecer la dirección de la cuadrícula

Por defecto, cuando organizas botones en columnas, se listarán en orden vertical. Si quieres listarlos horizontalmente, puedes usar el método `gridDirection(GridDirection::Row)`:

```php
use Filament\Forms\Components\ToggleButtons;
use Filament\Support\Enums\GridDirection;

ToggleButtons::make('technologies')
    ->options([
        // ...
    ])
    ->columns(2)
    ->gridDirection(GridDirection::Row)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>gridDirection()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Deshabilitar opciones específicas

Puedes deshabilitar opciones específicas usando el método `disableOptionWhen()`. Acepta un closure, en el que puedes comprobar si la opción con un `$value` específico debe estar deshabilitada:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('status')
    ->options([
        'draft' => 'Draft',
        'scheduled' => 'Scheduled',
        'published' => 'Published',
    ])
    ->disableOptionWhen(fn (string $value): bool => $value === 'published')
```

<details>
  <summary>Inyección de utilidades</summary>
  Puedes inyectar varias utilidades en la función como parámetros.
</details>

Si quieres recuperar las opciones que no han sido deshabilitadas, por ejemplo, para propósitos de validación, puedes hacerlo usando `getEnabledOptions()`:

```php
use Filament\Forms\Components\ToggleButtons;

ToggleButtons::make('status')
    ->options([
        'draft' => 'Draft',
        'scheduled' => 'Scheduled',
        'published' => 'Published',
    ])
    ->disableOptionWhen(fn (string $value): bool => $value === 'published')
    ->in(fn (ToggleButtons $component): array => array_keys($component->getEnabledOptions()))
```

Para más información sobre la función `in()`, consulta la [documentación de Validación](validation#in).
