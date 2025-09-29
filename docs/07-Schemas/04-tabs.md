---
title: Pestañas
---

## Introducción

Algunos schemas pueden ser largos y complejos. Puedes usar pestañas para reducir el número de componentes que son visibles a la vez:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Pestaña 1')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 2')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 3')
            ->schema([
                // ...
            ]),
    ])
```

<details>
<summary>💡 Nota sobre valores dinámicos</summary>
El método `make()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Establecer la pestaña activa por defecto

La primera pestaña estará abierta por defecto. Puedes cambiar la pestaña abierta por defecto usando el método `activeTab()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Pestaña 1')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 2')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 3')
            ->schema([
                // ...
            ]),
    ])
    ->activeTab(2)
```

<details>
<summary>💡 Nota sobre pestaña activa dinámica</summary>
El método `activeTab()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Establecer un ícono de pestaña

Las pestañas pueden tener un [ícono](../styling/icons), que puedes establecer usando el método `icon()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Support\Icons\Heroicon;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Notificaciones')
            ->icon(Heroicon::Bell)
            ->schema([
                // ...
            ]),
        // ...
    ])
```

<details>
<summary>💡 Nota sobre íconos dinámicos</summary>
El método `icon()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Establecer la posición del ícono de la pestaña

El ícono de la pestaña puede posicionarse antes o después de la etiqueta usando el método `iconPosition()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Support\Enums\IconPosition;
use Filament\Support\Icons\Heroicon;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Notificaciones')
            ->icon(Heroicon::Bell)
            ->iconPosition(IconPosition::After)
            ->schema([
                // ...
            ]),
        // ...
    ])
```

<details>
<summary>💡 Nota sobre posición de ícono dinámica</summary>
El método `iconPosition()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Establecer una insignia de pestaña

Las pestañas pueden tener una insignia, que puedes establecer usando el método `badge()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Notificaciones')
            ->badge(5)
            ->schema([
                // ...
            ]),
        // ...
    ])
```

<details>
<summary>💡 Nota sobre insignias dinámicas</summary>
El método `badge()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

Si quieres cambiar el [color](../styling/colors) de una insignia, puedes usar el método `badgeColor()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Notificaciones')
            ->badge(5)
            ->badgeColor('info')
            ->schema([
                // ...
            ]),
        // ...
    ])
```

<details>
<summary>💡 Nota sobre color de insignia dinámico</summary>
El método `badgeColor()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Usar columnas de grid dentro de una pestaña

Puedes usar el método `columns()` para personalizar el [grid](layouts#grid-system) dentro de la pestaña:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Pestaña 1')
            ->schema([
                // ...
            ])
            ->columns(3),
        // ...
    ])
```

<details>
<summary>💡 Nota sobre columnas dinámicas</summary>
El método `columns()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Usar pestañas verticales

Puedes renderizar las pestañas verticalmente usando el método `vertical()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Pestaña 1')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 2')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 3')
            ->schema([
                // ...
            ]),
    ])
    ->vertical()
```

Opcionalmente, puedes pasar un valor booleano al método `vertical()` para controlar si las pestañas deben renderizarse verticalmente o no:

```php
use Filament\Schemas\Components\Tabs;

Tabs::make('Pestañas')
    ->tabs([
        // ...
    ])
    ->vertical(FeatureFlag::active())
```

<details>
<summary>💡 Nota sobre vertical dinámico</summary>
El método `vertical()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Remover el contenedor estilizado

Por defecto, las pestañas y su contenido están envueltas en un contenedor estilizado como una tarjeta. Puedes remover el contenedor estilizado usando `contained()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Pestaña 1')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 2')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 3')
            ->schema([
                // ...
            ]),
    ])
    ->contained(false)
```

<details>
<summary>💡 Nota sobre contained dinámico</summary>
El método `contained()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Persistir la pestaña actual en la sesión del usuario

Por defecto, la pestaña actual no se persiste en el almacenamiento local del navegador. Puedes cambiar este comportamiento usando el método `persistTab()`. También debes pasar un `id()` único para el componente de pestañas, para distinguirlo de todos los otros conjuntos de pestañas en la aplicación. Este ID se usará como la clave en el almacenamiento local para almacenar la pestaña actual:

```php
use Filament\Schemas\Components\Tabs;

Tabs::make('Pestañas')
    ->tabs([
        // ...
    ])
    ->persistTab()
    ->id('order-tabs')
```

Opcionalmente, el método `persistTab()` acepta un valor booleano para controlar si la pestaña activa debe persistir o no:

```php
use Filament\Schemas\Components\Tabs;

Tabs::make('Pestañas')
    ->tabs([
        // ...
    ])
    ->persistTab(FeatureFlag::active())
    ->id('order-tabs')
```

<details>
<summary>💡 Nota sobre persistencia dinámica</summary>
Los métodos `persistTab()` e `id()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Persistir la pestaña actual en la cadena de consulta de la URL

Por defecto, la pestaña actual no se persiste en la cadena de consulta de la URL. Puedes cambiar este comportamiento usando el método `persistTabInQueryString()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Pestaña 1')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 2')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 3')
            ->schema([
                // ...
            ]),
    ])
    ->persistTabInQueryString()
```

Cuando está habilitado, la pestaña actual se persiste en la cadena de consulta de la URL usando la clave `tab`. Puedes cambiar esta clave pasándola al método `persistTabInQueryString()`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

Tabs::make('Pestañas')
    ->tabs([
        Tab::make('Pestaña 1')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 2')
            ->schema([
                // ...
            ]),
        Tab::make('Pestaña 3')
            ->schema([
                // ...
            ]),
    ])
    ->persistTabInQueryString('settings-tab')
```

<details>
<summary>💡 Nota sobre persistencia en query string dinámica</summary>
El método `persistTabInQueryString()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>
