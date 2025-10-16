---
title: Radio
---

## Introducción

El input de tipo radio proporciona un grupo de botones para seleccionar un único valor de una lista de opciones predefinidas:

```php
use Filament\Forms\Components\Radio;

Radio::make('status')
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

## Establecer descripciones de opciones

Opcionalmente puedes proporcionar descripciones para cada opción usando el método `descriptions()`:

```php
use Filament\Forms\Components\Radio;

Radio::make('status')
    ->options([
        'draft' => 'Draft',
        'scheduled' => 'Scheduled',
        'published' => 'Published'
    ])
    ->descriptions([
        'draft' => 'Is not visible.',
        'scheduled' => 'Will be visible.',
        'published' => 'Is visible.'
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un array estático, el método <code>descriptions()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::info
Asegúrate de usar la misma `key` en el array de descripciones que la `key` en el array de opciones para que la descripción correcta coincida con la opción correcta.
:::

## Colocar las opciones en línea entre sí

Puedes querer mostrar las opciones `inline()` entre sí:

```php
use Filament\Forms\Components\Radio;

Radio::make('feedback')
    ->label('Like this post?')
    ->boolean()
    ->inline()
```

Opcionalmente, puedes pasar un valor booleano para controlar si las opciones deben estar en línea o no:

```php
use Filament\Forms\Components\Radio;

Radio::make('feedback')
    ->label('Like this post?')
    ->boolean()
    ->inline(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>inline()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Deshabilitar opciones específicas

Puedes deshabilitar opciones específicas usando el método `disableOptionWhen()`. Acepta un closure, en el cual puedes comprobar si la opción con un `$value` específico debe estar deshabilitada:

```php
use Filament\Forms\Components\Radio;

Radio::make('status')
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

<strong>Parámetros adicionales disponibles:</strong>

- <strong>Valor de opción</strong> (<code>mixed</code> <code>$value</code>) - El valor de la opción a deshabilitar.
- <strong>Etiqueta de opción</strong> (<code>string | Illuminate\Contracts\Support\Htmlable</code> <code>$label</code>) - La etiqueta de la opción a deshabilitar.

</details>

Si quieres recuperar las opciones que no han sido deshabilitadas, p. ej., para propósitos de validación, puedes hacerlo usando `getEnabledOptions()`:

```php
use Filament\Forms\Components\Radio;

Radio::make('status')
    ->options([
        'draft' => 'Draft',
        'scheduled' => 'Scheduled',
        'published' => 'Published',
    ])
    ->disableOptionWhen(fn (string $value): bool => $value === 'published')
    ->in(fn (Radio $component): array => array_keys($component->getEnabledOptions()))
```

Para más información sobre la función `in()`, por favor consulta la [documentación de Validación](validation#in).

## Opciones booleanas

Si quieres un grupo de botones radio booleano simple, con opciones "Yes" y "No", puedes usar el método `boolean()`:

```php
use Filament\Forms\Components\Radio;

Radio::make('feedback')
    ->label('Like this post?')
    ->boolean()
```

Para personalizar la etiqueta de "Yes", puedes usar el argumento `trueLabel` en el método `boolean()`:

```php
use Filament\Forms\Components\Radio;

Radio::make('feedback')
    ->label('Like this post?')
    ->boolean(trueLabel: 'Absolutely!')
```

Para personalizar la etiqueta de "No", puedes usar el argumento `falseLabel` en el método `boolean()`:

```php
use Filament\Forms\Components\Radio;

Radio::make('feedback')
    ->label('Like this post?')
    ->boolean(falseLabel: 'Not at all!')
```
