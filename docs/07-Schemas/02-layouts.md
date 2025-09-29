---
title: Layouts
---

## Introducción

El sistema de **grid** de Filament te permite crear layouts responsivos y multicolumna usando cualquier componente de layout. Filament incluye varios componentes integrados:

- [Grid](#grid-component)
- [Flex](#flex-component)
- [Fieldset](#fieldset-component)
- [Section](sections)
- [Tabs](tabs)
- [Wizard](wizards)

También puedes [crear tus propios componentes de layout personalizados](custom-components#custom-layout-components).

## Sistema de grid

Todos los componentes de layout tienen un método `columns()` que puedes usar de dos formas:

- Pasando un entero, por ejemplo `columns(2)`. Esto indica el número de columnas usadas a partir del breakpoint `lg`. En dispositivos más pequeños, siempre será 1 columna.
- Pasando un array, donde la clave es el breakpoint y el valor es el número de columnas. Ejemplo: `columns(['md' => 2, 'xl' => 4])`. En `md` tendrá 2 columnas, en `xl` tendrá 4. El valor por defecto para dispositivos pequeños es 1 columna, salvo que uses la clave `default`.

Breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`) están definidos por Tailwind, ver [documentación oficial](https://tailwindcss.com/docs/responsive-design#overview).

<details>
<summary>💡 Nota sobre columnas dinámicas</summary>
Además de valores estáticos, `columns()` acepta funciones de callback. En estas puedes inyectar utilidades como parámetros (por ejemplo `$get`, `$set`, etc.).
</details>

### Span de columnas

Además de establecer cuántas columnas tiene un layout, puedes decidir cuántas columnas ocupa cada componente dentro de ese grid con `columnSpan()`:

- `columnSpan(2)` → ocupa 2 columnas en todos los breakpoints.  
- `columnSpan(['md' => 2, 'xl' => 4])` → ocupa 2 columnas en `md` y 4 en `xl`.  
- `columnSpan('full')` o `columnSpanFull()` → ocupa todo el ancho del grid.

<details>
<summary>💡 Nota sobre span dinámico</summary>
`columnSpan()` también acepta callbacks con utilidades inyectables.
</details>

### Column start

Controla en qué columna empieza un componente dentro del grid con `columnStart()`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;

Grid::make()
    ->columns(['sm' => 3,'xl' => 6,'2xl' => 8])
    ->schema([
        TextInput::make('name')
            ->columnStart(['sm' => 2,'xl' => 3,'2xl' => 4]),
    ])
```

<details>
<summary>💡 Nota sobre inicio dinámico</summary>
`columnStart()` acepta funciones con utilidades inyectadas.
</details>

### Orden visual de columnas

Puedes manipular el orden visual de los elementos sin cambiar el orden en el markup con `columnOrder()`:

```php
Grid::make()->columns(3)->schema([
    TextInput::make('first')->columnOrder(3),
    TextInput::make('second')->columnOrder(1),
    TextInput::make('third')->columnOrder(2),
])
```

En este ejemplo: primero `second`, luego `third`, finalmente `first`.

<details>
<summary>💡 Nota sobre orden dinámico</summary>
`columnOrder()` acepta closures que calculan dinámicamente el orden.
</details>

### Ejemplo completo

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;

Section::make()
    ->columns(['sm' => 3,'xl' => 6,'2xl' => 8])
    ->schema([
        TextInput::make('name')
            ->columnSpan(['sm' => 2,'xl' => 3,'2xl' => 4])
            ->columnOrder(['default' => 2,'xl' => 1]),
        TextInput::make('email')
            ->columnSpan(['default' => 1,'xl' => 2])
            ->columnOrder(['default' => 1,'xl' => 2]),
    ])
```

## Componentes básicos de layout

### Grid

Funciona igual que otros layouts pero con sintaxis explícita:

```php
use Filament\Schemas\Components\Grid;

Grid::make(['default' => 1,'sm' => 2,'md' => 3,'lg' => 4,'xl' => 6,'2xl' => 8])
    ->schema([
        // ...
    ])
```

### Flex

Define layouts con flexbox y anchos flexibles:

```php
Flex::make([
    Section::make([TextInput::make('title'),Textarea::make('content')]),
    Section::make([Toggle::make('is_published'),Toggle::make('is_featured')])->grow(false),
])->from('md')
```

<details>
<summary>💡 Nota sobre grow() y from()</summary>
Estos métodos también aceptan funciones con utilidades.
</details>

### Fieldset

Agrupa campos con borde y etiqueta:

```php
Fieldset::make('Label')->columns(['default' => 1,'md' => 2,'xl' => 3])
```

<details>
<summary>💡 Nota sobre make()</summary>
Puedes pasar una función en lugar de un label fijo.
</details>

Puedes remover el borde con `contained(false)`.

## Container queries

También puedes usar [container queries](https://tailwindcss.com/docs/responsive-design#container-queries):

```php
Grid::make()->gridContainer()->columns(['@md' => 3,'@xl' => 4])
```

Soporta fallback con `!@` para navegadores antiguos. Ejemplo:

```php
Grid::make()
    ->gridContainer()
    ->columns(['@md' => 3,'@xl' => 4,'!@md' => 2,'!@xl' => 3])
```

## Atributos extra HTML

Puedes pasar atributos HTML extra con `extraAttributes()`:

```php
Section::make()
    ->extraAttributes(['class' => 'custom-section-style'])
```

Por defecto sobrescribe, pero se puede hacer merge con `merge: true`.
