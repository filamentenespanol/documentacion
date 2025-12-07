---
title: Colores
---

## Introducción

Filament utiliza variables CSS para definir su paleta de colores. Estas variables CSS se asignan a las clases Tailwind en el archivo preestablecido que carga al instalar Filament. La razón por la que Filament usa variables CSS es que permite que el marco pase una paleta de colores desde PHP a través de un elemento `<style>` que se representa como parte de la directiva Blade `@filamentStyles`.

De forma predeterminada, el archivo preestablecido Tailwind de Filament se envía con 6 colores:

- `primary`, que es [el color `amber` de Tailwind](https://tailwindcss.com/docs/customizing-colors) de forma predeterminada
- `success`, que es [el color `green` de Tailwind](https://tailwindcss.com/docs/customizing-colors) de forma predeterminada
- `warning`, que es [el color `amber` de Tailwind](https://tailwindcss.com/docs/customizing-colors) de forma predeterminada
- `danger`, que es [el color `red` de Tailwind](https://tailwindcss.com/docs/customizing-colors) de forma predeterminada
- `info`, que es [el color `blue` de Tailwind](https://tailwindcss.com/docs/customizing-colors) de forma predeterminada
- `gray`, que es [el color `zinc` de Tailwind](https://tailwindcss.com/docs/customizing-colors) de forma predeterminada

Puedes [aprender a cambiar estos colores y registrar otros nuevos](#personalizar-los-colores-predeterminados).

## Cómo pasar un color a Filament

Un "color" registrado en Filament no es solo un tono. De hecho, es una paleta de colores completa hecha de [11 tonos](https://tailwindcss.com/docs/customizing-colors): `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900` y `950`. Cuando usas un color en Filament, el marco decidirá qué tono usar según el contexto. Por ejemplo, podría usar el tono `600` para el fondo de un componente, `500` cuando se coloca el cursor sobre él y `400` para su borde. Si el usuario tiene habilitado el modo oscuro, podría usar `700`, `800` o `900` en su lugar.

Por un lado, esto significa que puedes especificar un color en Filament sin tener que preocuparte por el tono exacto a usar, o especificar un tono para cada parte del componente. Filament se encarga de seleccionar un tono que, siempre que sea posible, cree un contraste accesible con otros elementos.

Para personalizar el color de algo en Filament, puedes usar su nombre. Por ejemplo, si quisieras usar el color `success`, podrías pasarlo a un método de color de un componente PHP de esta manera:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Toggle;

Action::make('proceed')
    ->color('success')
    
Toggle::make('is_active')
    ->onColor('success')
```

Si desea utilizar un color en un [componente Blade](../componentes), puede pasarlo como atributo:

```blade
<x-filament::badge color="success">
    Active
</x-filament::badge>
```

## Personalizando los colores predeterminados

Desde el método `boot()` o middleware de un proveedor de servicios, puede llamar al método `FilamentColor::register()`, que puede utilizar para personalizar qué colores utiliza Filament para los elementos de la interfaz de usuario.

Hay 6 colores predeterminados que se utilizan en todo Filament y que puedes personalizar:

```php
use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentColor;

FilamentColor::register([
    'danger' => Color::Red,
    'gray' => Color::Zinc,
    'info' => Color::Blue,
    'primary' => Color::Amber,
    'success' => Color::Green,
    'warning' => Color::Amber,
]);
```

La clase `Color` contiene todos los [colores CSS de Tailwind](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) para elegir.

También puede pasar una función a `register()` que solo se llamará cuando se esté procesando la aplicación. Esto es útil si llama a `register()` desde un proveedor de servicios y desea acceder a objetos como el usuario actualmente autenticado, que se inicializan más adelante en el middleware.

### Registrar colores adicionales

Puede registrar un nuevo color para usarlo en cualquier componente de Filamento pasándolo al método `FilamentColor::register()`, con su nombre como clave en la matriz:

```php
use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentColor;

FilamentColor::register([
    'secondary' => Color::Indigo,
]);
```

Ahora podrá utilizar `secondary` como color en cualquier componente de Filamento.

## Usar un color que no sea Tailwind

Puede utilizar colores personalizados que no están incluidos en la paleta [Color CSS de Tailwind](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) pasando una serie de tonos de color de `50` a `950` en formato OKLCH:

```php
use Filament\Support\Facades\FilamentColor;

FilamentColor::register([
    'danger' => [
        50 => 'oklch(0.969 0.015 12.422)',
        100 => 'oklch(0.941 0.03 12.58)',
        200 => 'oklch(0.892 0.058 10.001)',
        300 => 'oklch(0.81 0.117 11.638)',
        400 => 'oklch(0.712 0.194 13.428)',
        500 => 'oklch(0.645 0.246 16.439)',
        600 => 'oklch(0.586 0.253 17.585)',
        700 => 'oklch(0.514 0.222 16.935)',
        800 => 'oklch(0.455 0.188 13.697)',
        900 => 'oklch(0.41 0.159 10.272)',
        950 => 'oklch(0.271 0.105 12.094)',
    ],
]);
```

### Generando una paleta de colores personalizada

Si desea que intentemos generar una paleta para usted basada en un valor hexadecimal o RGB singular, puede pasarlo:

```php
use Filament\Support\Facades\FilamentColor;

FilamentColor::register([
    'danger' => '#ff0000',
]);

FilamentColor::register([
    'danger' => 'rgb(255, 0, 0)',
]);
```
