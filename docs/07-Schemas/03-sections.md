---
title: Secciones
---

## Introducción

Puedes separar tus campos en secciones, cada una con un encabezado y descripción. Para esto, usa el componente section:

```php
use Filament\Schemas\Components\Section;

Section::make('Limitación de velocidad')
    ->description('Previene abuso limitando el número de peticiones por período')
    ->schema([
        // ...
    ])
```

<details>
<summary>💡 Nota sobre valores dinámicos</summary>
Los métodos `make()` y `description()` también aceptan funciones para calcular valores dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

También puedes usar una sección sin encabezado, que simplemente envuelve los componentes en una tarjeta simple:

```php
use Filament\Schemas\Components\Section;

Section::make()
    ->schema([
        // ...
    ])
```

## Agregar un ícono al encabezado de la sección

Puedes agregar un [ícono](../styling/icons) al encabezado de la sección usando el método `icon()`:

```php
use Filament\Schemas\Components\Section;
use Filament\Support\Icons\Heroicon;

Section::make('Carrito')
    ->description('Los artículos que has seleccionado para comprar')
    ->icon(Heroicon::ShoppingBag)
    ->schema([
        // ...
    ])
```

<details>
<summary>💡 Nota sobre íconos dinámicos</summary>
El método `icon()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Posicionar el encabezado y descripción a un lado

Puedes usar `aside()` para alinear el encabezado y descripción a la izquierda, y los componentes dentro de una tarjeta a la derecha:

```php
use Filament\Schemas\Components\Section;

Section::make('Limitación de velocidad')
    ->description('Previene abuso limitando el número de peticiones por período')
    ->aside()
    ->schema([
        // ...
    ])
```

Opcionalmente, puedes pasar un valor booleano para controlar si la sección debe estar a un lado o no:

```php
use Filament\Schemas\Components\Section;

Section::make('Limitación de velocidad')
    ->description('Previene abuso limitando el número de peticiones por período')
    ->aside(FeatureFlag::active())
    ->schema([
        // ...
    ])
```

<details>
<summary>💡 Nota sobre aside dinámico</summary>
El método `aside()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Secciones colapsables

Las secciones pueden ser `collapsible()` para ocultar opcionalmente contenido largo:

```php
use Filament\Schemas\Components\Section;

Section::make('Carrito')
    ->description('Los artículos que has seleccionado para comprar')
    ->schema([
        // ...
    ])
    ->collapsible()
```

Tus secciones pueden estar `collapsed()` por defecto:

```php
use Filament\Schemas\Components\Section;

Section::make('Carrito')
    ->description('Los artículos que has seleccionado para comprar')
    ->schema([
        // ...
    ])
    ->collapsed()
```

Opcionalmente, los métodos `collapsible()` y `collapsed()` aceptan un valor booleano para controlar si la sección debe ser colapsable y colapsada o no:

```php
use Filament\Schemas\Components\Section;

Section::make('Carrito')
    ->description('Los artículos que has seleccionado para comprar')
    ->schema([
        // ...
    ])
    ->collapsible(FeatureFlag::active())
    ->collapsed(FeatureFlag::active())
```

<details>
<summary>💡 Nota sobre colapsado dinámico</summary>
Los métodos `collapsible()` y `collapsed()` también aceptan funciones para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

### Persistir secciones colapsadas en la sesión del usuario

Puedes persistir si una sección está colapsada en el almacenamiento local usando el método `persistCollapsed()`, para que permanezca colapsada cuando el usuario actualice la página:

```php
use Filament\Schemas\Components\Section;

Section::make('Carrito')
    ->description('Los artículos que has seleccionado para comprar')
    ->schema([
        // ...
    ])
    ->collapsible()
    ->persistCollapsed()
```

Para persistir el estado de colapso, el almacenamiento local necesita un ID único para almacenar el estado. Este ID se genera basado en el encabezado de la sección. Si tu sección no tiene encabezado, o si tienes múltiples secciones con el mismo encabezado que no quieres que colapsen juntas, puedes especificar manualmente el `id()` de esa sección para prevenir un conflicto de ID:

```php
use Filament\Schemas\Components\Section;

Section::make('Carrito')
    ->description('Los artículos que has seleccionado para comprar')
    ->schema([
        // ...
    ])
    ->collapsible()
    ->persistCollapsed()
    ->id('order-cart')
```

Opcionalmente, el método `persistCollapsed()` acepta un valor booleano para controlar si la sección debe persistir su estado colapsado o no:

```php
use Filament\Schemas\Components\Section;

Section::make('Carrito')
    ->description('Los artículos que has seleccionado para comprar')
    ->schema([
        // ...
    ])
    ->collapsible()
    ->persistCollapsed(FeatureFlag::active())
```

<details>
<summary>💡 Nota sobre persistencia dinámica</summary>
Los métodos `persistCollapsed()` e `id()` también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Estilo de sección compacta

Al anidar secciones, puedes usar un estilo más compacto:

```php
use Filament\Schemas\Components\Section;

Section::make('Limitación de velocidad')
    ->description('Previene abuso limitando el número de peticiones por período')
    ->schema([
        // ...
    ])
    ->compact()
```

Opcionalmente, el método `compact()` acepta un valor booleano para controlar si la sección debe ser compacta o no:

```php
use Filament\Schemas\Components\Section;

Section::make('Limitación de velocidad')
    ->description('Previene abuso limitando el número de peticiones por período')
    ->schema([
        // ...
    ])
    ->compact(FeatureFlag::active())
```

<details>
<summary>💡 Nota sobre compacto dinámico</summary>
El método `compact()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Estilo de sección secundaria

Por defecto, las secciones tienen un color de fondo contrastante, que las hace destacar contra un fondo gris. El estilo secundario le da a la sección un fondo menos contrastante, por lo que usualmente es ligeramente más oscuro. Este es un mejor estilo cuando el color de fondo detrás de la sección es el mismo color que el color de fondo de la sección por defecto, por ejemplo cuando una sección está anidada dentro de otra sección. Las secciones secundarias se pueden crear usando el método `secondary()`:

```php
use Filament\Schemas\Components\Section;

Section::make('Notas')
    ->schema([
        // ...
    ])
    ->secondary()
    ->compact()
```

Opcionalmente, el método `secondary()` acepta un valor booleano para controlar si la sección debe ser secundaria o no:

```php
use Filament\Schemas\Components\Section;

Section::make('Notas')
    ->schema([
        // ...
    ])
    ->secondary(FeatureFlag::active())
```

## Insertar acciones y otros componentes en el encabezado de una sección

Puedes insertar [acciones](../actions) y cualquier otro componente de schema (usualmente [componentes prime](primes)) en el encabezado de una sección pasando un array de componentes al método `afterHeader()`:

```php
use Filament\Schemas\Components\Section;

Section::make('Limitación de velocidad')
    ->description('Previene abuso limitando el número de peticiones por período')
    ->afterHeader([
        Action::make('test'),
    ])
    ->schema([
        // ...
    ])
```

<details>
<summary>💡 Nota sobre afterHeader dinámico</summary>
El método `afterHeader()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Insertar acciones y otros componentes en el pie de una sección

Puedes insertar [acciones](../actions) y cualquier otro componente de schema (usualmente [componentes prime](primes)) en el pie de una sección pasando un array de componentes al método `footer()`:

```php
use Filament\Schemas\Components\Section;

Section::make('Limitación de velocidad')
    ->description('Previene abuso limitando el número de peticiones por período')
    ->schema([
        // ...
    ])
    ->footer([
        Action::make('test'),
    ])
```

<details>
<summary>💡 Nota sobre footer dinámico</summary>
El método `footer()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>

## Usar columnas de grid dentro de una sección

Puedes usar el método `columns()` para crear fácilmente un [grid](layouts#grid-system) dentro de la sección:

```php
use Filament\Schemas\Components\Section;

Section::make('Encabezado')
    ->schema([
        // ...
    ])
    ->columns(2)
```

<details>
<summary>💡 Nota sobre columnas dinámicas</summary>
El método `columns()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades como parámetros en la función.
</details>
