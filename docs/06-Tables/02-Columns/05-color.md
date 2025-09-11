---
title: Columna de color
---

## Introducción

La columna de color te permite mostrar una vista previa del color a partir de una definición CSS de color, normalmente introducida usando el [campo selector de color](../../forms/color-picker), en uno de los formatos soportados (HEX, HSL, RGB, RGBA).

```php
use Filament\Tables\Components\ColorColumn;

ColorColumn::make('color')
```

## Permitir copiar el color al portapapeles

Puedes hacer que el color sea copiable, de manera que al hacer clic en la vista previa se copie el valor CSS al portapapeles, pudiendo opcionalmente especificar un mensaje de confirmación personalizado y la duración en milisegundos. Esta funcionalidad solo funciona cuando la aplicación tiene SSL habilitado.

```php
use Filament\Tables\Components\ColorColumn;

ColorColumn::make('color')
    ->copyable()
    ->copyMessage('¡Copiado!')
    ->copyMessageDuration(1500)
```

Opcionalmente, puedes pasar un valor booleano para controlar si el texto debe ser copiable o no:

```php
use Filament\Tables\Components\ColorColumn;

ColorColumn::make('color')
    ->copyable(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir valores estáticos, los métodos `copyable()`, `copyMessage()` y `copyMessageDuration()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Ajustar múltiples bloques de color

Los bloques de color pueden configurarse para ajustarse si no caben en una línea, usando `wrap()`:

```php
use Filament\Tables\Columns\ColorColumn;

ColorColumn::make('color')
    ->wrap()
```

:::tip
El "ancho" para que se haga el ajuste depende de la etiqueta de la columna, así que puede que necesites usar una etiqueta más corta u oculta para que se ajuste más estrechamente.
:::
