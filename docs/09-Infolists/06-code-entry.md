---
title: Entrada de código
---

## Introducción

La entrada de código te permite presentar un fragmento de código resaltado en tu infolist. Utiliza [Phiki](https://github.com/phikiphp/phiki) para el resaltado de código en el servidor:

```php
use Filament\Infolists\Components\CodeEntry;
use Phiki\Grammar\Grammar;

CodeEntry::make('code')
    ->grammar(Grammar::Php)
```

Para usar la entrada de código, primero necesitas instalar el paquete Composer [`phiki/phiki`](https://github.com/phikiphp/phiki). Filament no lo incluye por defecto para permitirte elegir explícitamente qué versión principal de Phiki usar, ya que las versiones principales pueden tener diferentes gramáticas y temas disponibles. Puedes instalar la última versión de Phiki usando el siguiente comando:

```bash
composer require phiki/phiki
```

## Cambiando la gramática del código (lenguaje)

Puedes cambiar la gramática (lenguaje) del código usando el método `grammar()`. Hay más de 200 gramáticas disponibles, y puedes abrir la clase enum `Phiki\Grammar\Grammar` para ver la lista completa. Para cambiar a usar JavaScript como gramática, puedes usar el valor enum `Grammar::Javascript`:

```php
use Filament\Infolists\Components\CodeEntry;
use Phiki\Grammar\Grammar;

CodeEntry::make('code')
    ->grammar(Grammar::Javascript)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `grammar()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::tip
Si el contenido de tu entrada de código es un array PHP, se convertirá automáticamente a una cadena JSON, y la gramática se establecerá en `Grammar::Json`.
:::

## Cambiando el tema del código (resaltado)

Puedes cambiar el tema del código usando los métodos `lightTheme()` y `darkTheme()`. Hay más de 50 temas disponibles, y puedes abrir la clase enum `Phiki\Theme\Theme` para ver la lista completa. Para usar el popular tema `Dracula`, puedes usar el valor enum `Theme::Dracula`:

```php
use Filament\Infolists\Components\CodeEntry;
use Phiki\Theme\Theme;

CodeEntry::make('code')
    ->lightTheme(Theme::Dracula)
    ->darkTheme(Theme::Dracula)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `lightTheme()` y `darkTheme()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

## Permitiendo que el código se copie al portapapeles

Puedes hacer que el código sea copiable, de modo que al hacer clic en él se copie el código al portapapeles, y opcionalmente especificar un mensaje de confirmación personalizado y la duración en milisegundos. Esta característica solo funciona cuando SSL está habilitado para la aplicación.

```php
use Filament\Infolists\Components\CodeEntry;

CodeEntry::make('code')
    ->copyable()
    ->copyMessage('Copied!')
    ->copyMessageDuration(1500)
```

Opcionalmente, puedes pasar un valor booleano para controlar si el código debe ser copiable o no:

```php
use Filament\Infolists\Components\CodeEntry;

CodeEntry::make('code')
    ->copyable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `copyable()`, `copyMessage()` y `copyMessageDuration()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>
