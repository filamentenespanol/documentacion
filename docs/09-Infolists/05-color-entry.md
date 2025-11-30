---
title: Entrada de color
---

## Introducción

La entrada de color te permite mostrar la vista previa del color de una definición de color CSS, típicamente ingresada usando el [campo selector de color](../forms/color-picker), en uno de los formatos soportados (HEX, HSL, RGB, RGBA).

```php
use Filament\Infolists\Components\ColorEntry;

ColorEntry::make('color')
```

## Permitiendo que el color se copie al portapapeles

Puedes hacer que el color sea copiable, de modo que al hacer clic en la vista previa se copie el valor CSS al portapapeles, y opcionalmente especificar un mensaje de confirmación personalizado y la duración en milisegundos. Esta característica solo funciona cuando SSL está habilitado para la aplicación.

```php
use Filament\Infolists\Components\ColorEntry;

ColorEntry::make('color')
    ->copyable()
    ->copyMessage('Copied!')
    ->copyMessageDuration(1500)
```

Opcionalmente, puedes pasar un valor booleano para controlar si el color debe ser copiable o no:

```php
use Filament\Infolists\Components\ColorEntry;

ColorEntry::make('color')
    ->copyable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `copyable()`, `copyMessage()` y `copyMessageDuration()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>
