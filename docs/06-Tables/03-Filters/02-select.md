---
title: Filtros select
---

## Introducción

A menudo, querrás usar un [campo select](../../forms/fields/select) en lugar de un checkbox. Esto es especialmente cierto cuando quieres filtrar una columna basándote en un conjunto de opciones predefinidas que el usuario puede elegir. Para hacer esto, puedes crear un filtro usando la clase `SelectFilter`:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('status')
    ->options([
        'draft' => 'Borrador',
        'reviewing' => 'Revisando',
        'published' => 'Publicado',
    ])
```

Los `options()` que se pasan al filtro son los mismos que se pasan al [campo select](../../forms/fields/select).

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `options()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar la columna usada por un filtro select

Los filtros select no requieren un método `query()` personalizado. El nombre de la columna usada para delimitar la consulta es el nombre del filtro. Para personalizar esto, puedes usar el método `attribute()`:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('status')
    ->options([
        'draft' => 'Borrador',
        'reviewing' => 'Revisando',
        'published' => 'Publicado',
    ])
    ->attribute('status_id')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `attribute()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Filtros multi-select

Estos permiten al usuario [seleccionar múltiples opciones](../../forms/select#multi-select) para aplicar el filtro en su tabla. Por ejemplo, un filtro de estado puede presentar al usuario varias opciones de estado entre las que elegir y filtrar la tabla. Cuando el usuario selecciona múltiples opciones, la tabla se filtrará para mostrar registros que coincidan con cualquiera de las opciones seleccionadas. Puedes habilitar este comportamiento usando el método `multiple()`:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('status')
    ->multiple()
    ->options([
        'draft' => 'Borrador',
        'reviewing' => 'Revisando',
        'published' => 'Publicado',
    ])
```

## Filtros select de relaciones

Los filtros select también pueden poblarse automáticamente basándose en una relación. Por ejemplo, si tu tabla tiene una relación `author` con una columna `name`, puedes usar `relationship()` para filtrar los registros que pertenezcan a un autor:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('author')
    ->relationship('author', 'name')
```

### Precargar las opciones de relación del filtro select

Si deseas poblar las opciones buscables desde la base de datos cuando se carga la página, en lugar de cuando el usuario busca, puedes usar el método `preload()`:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('author')
    ->relationship('author', 'name')
    ->searchable()
    ->preload()
```

### Filtrar relaciones vacías

Por defecto, al seleccionar una opción, todos los registros que tengan una relación vacía se excluirán de los resultados. Si deseas introducir una opción adicional "Ninguno" para que el usuario pueda seleccionarla e incluir todos los registros que no tengan relación, puedes usar el argumento `hasEmptyOption()` del método `relationship()`:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('author')
    ->relationship('author', 'name', hasEmptyOption: true)
```

Puedes renombrar la opción "Ninguno" usando el método `emptyRelationshipOptionLabel()`:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('author')
    ->relationship('author', 'name', hasEmptyOption: true)
    ->emptyRelationshipOptionLabel('Sin autor')
```

### Personalizar la consulta de relación del filtro select

Puedes personalizar la consulta de base de datos que recupera las opciones usando el tercer parámetro del método `relationship()`:

```php
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;

SelectFilter::make('author')
    ->relationship('author', 'name', fn (Builder $query) => $query->withTrashed())
```

### Buscar opciones del filtro select

Puedes habilitar un campo de búsqueda para permitir un acceso más fácil a muchas opciones, usando el método `searchable()`:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('author')
    ->relationship('author', 'name')
    ->searchable()
```

## Desactivar la selección del placeholder

Puedes eliminar el placeholder (opción null), lo que desactiva el filtro para que se apliquen todas las opciones, usando el método `selectablePlaceholder()`:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('status')
    ->options([
        'draft' => 'Borrador',
        'reviewing' => 'Revisando',
        'published' => 'Publicado',
    ])
    ->default('draft')
    ->selectablePlaceholder(false)
```

## Aplicar filtros select por defecto

Puedes establecer que un filtro select se habilite por defecto, usando el método `default()`. Si usas un filtro select simple, el método `default()` acepta un solo valor de opción. Si usas un filtro select `multiple()`, el método `default()` acepta un array de valores de opción:

```php
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('status')
    ->options([
        'draft' => 'Borrador',
        'reviewing' => 'Revisando',
        'published' => 'Publicado',
    ])
    ->default('draft')

SelectFilter::make('status')
    ->options([
        'draft' => 'Borrador',
        'reviewing' => 'Revisando',
        'published' => 'Publicado',
    ])
    ->multiple()
    ->default(['draft', 'reviewing'])
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `default()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>
