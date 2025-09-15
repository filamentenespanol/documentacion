---
title: Introducción
---

## Introducción

Los filtros te permiten definir ciertas restricciones en tus datos y permiten a los usuarios delimitarlos para encontrar la información que necesitan. Los colocas en el método `$table->filters()`.

Los filtros pueden crearse usando el método estático `make()`, pasando su nombre único. Luego debes pasar un callback a `query()` que aplique el alcance de tu filtro:

```php
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

public function table(Table $table): Table
{
    return $table
        ->filters([
            Filter::make('is_featured')
                ->query(fn (Builder $query): Builder => $query->where('is_featured', true))
            // ...
        ]);
}
```

## Filtros disponibles

Por defecto, usar el método `Filter::make()` renderizará un componente de formulario checkbox. Cuando el checkbox esté activado, se activará el `query()`.

- También puedes [reemplazar el checkbox con un toggle](#usar-un-botón-toggle-en-lugar-de-un-checkbox).
- Puedes usar un [filtro select](select) para permitir a los usuarios seleccionar de una lista de opciones y filtrar usando la selección.
- Puedes usar un [filtro ternario](ternary) para reemplazar el checkbox con un campo select que permita a los usuarios elegir entre 3 estados - usualmente "verdadero", "falso" y "en blanco". Esto es útil para filtrar columnas booleanas.
- El [filtro de papelera](ternary#filtering-soft-deletable-records) es un filtro ternario preconfigurado que te permite filtrar registros eliminables suavemente.
- Usando un [constructor de consultas](query-builder), los usuarios pueden crear conjuntos complejos de filtros, con una interfaz de usuario avanzada para combinar restricciones.
- Puedes construir [filtros personalizados](custom) con otros campos de formulario, para hacer lo que quieras.

## Establecer una etiqueta

Por defecto, la etiqueta del filtro se genera a partir del nombre del filtro. Puedes personalizar esto usando el método `label()`:

```php
use Filament\Tables\Filters\Filter;

Filter::make('is_featured')
    ->label('Destacado')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `label()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Personalizar la etiqueta de esta manera es útil si deseas usar una [cadena de traducción para localización](https://laravel.com/docs/localization#retrieving-translation-strings):

```php
use Filament\Tables\Filters\Filter;

Filter::make('is_featured')
    ->label(__('filters.is_featured'))
```

## Personalizar el esquema del filtro

Por defecto, crear un filtro con la clase `Filter` renderizará un [componente de formulario checkbox](../../forms/fields/checkbox). Cuando el checkbox esté marcado, la función `query()` se aplicará a la consulta de la tabla, delimitando los registros en la tabla. Cuando el checkbox esté desmarcado, la función `query()` se eliminará de la consulta de la tabla.

Los filtros están construidos completamente sobre los campos de formulario de Filament. Pueden renderizar cualquier combinación de campos de formulario, con los que los usuarios pueden interactuar para filtrar la tabla.

### Usar un botón toggle en lugar de un checkbox

El ejemplo más simple de gestionar el campo de formulario que se usa para un filtro es reemplazar el [checkbox](../../forms/fields/checkbox) con un [botón toggle](../../forms/fields/toggle), usando el método `toggle()`:

```php
use Filament\Tables\Filters\Filter;

Filter::make('is_featured')
    ->toggle()
```

### Personalizar el campo de formulario integrado del filtro

Ya sea que estés usando un checkbox, un [toggle](#usar-un-botón-toggle-en-lugar-de-un-checkbox) o un [select](select), puedes personalizar el campo de formulario integrado usado para el filtro, usando el método `modifyFormFieldUsing()`. El método acepta una función con un parámetro `$field` que te da acceso al objeto del campo de formulario para personalizar:

```php
use Filament\Forms\Components\Checkbox;
use Filament\Tables\Filters\Filter;

Filter::make('is_featured')
    ->modifyFormFieldUsing(fn (Checkbox $field) => $field->inline(false))
```

<details>
<summary>💡 Utility Injection</summary>

La función pasada a `modifyFormFieldUsing()` puede inyectar varias utilidades como parámetros.

</details>

## Aplicar el filtro por defecto

Puedes establecer que un filtro esté habilitado por defecto, usando el método `default()`:

```php
use Filament\Tables\Filters\Filter;

Filter::make('is_featured')
    ->default()
```

Si estás usando un [filtro select](select), [visita la sección "aplicar filtros select por defecto"](select#applying-select-filters-by-default).

## Persistir filtros en la sesión del usuario

Para persistir los filtros de la tabla en la sesión del usuario, usa el método `persistFiltersInSession()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->persistFiltersInSession();
}
```

## Filtros en vivo

Por defecto, los cambios de filtro se difieren y no afectan la tabla, hasta que el usuario hace clic en un botón "Aplicar". Para desactivar esto y hacer que los filtros sean "en vivo" en su lugar, usa el método `deferFilters(false)`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->deferFilters(false);
}
```

### Personalizar la acción de aplicar filtros

Cuando se difieren los filtros, puedes personalizar el botón "Aplicar", usando el método `filtersApplyAction()`, pasando un closure que devuelve una acción. Todos los métodos que están disponibles para [personalizar botones de activación de acciones](../../actions/overview) pueden usarse:

```php
use Filament\Actions\Action;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->filtersApplyAction(
            fn (Action $action) => $action
                ->link()
                ->label('Guardar filtros en tabla'),
        );
}
```

## Deseleccionar registros cuando cambien los filtros

Por defecto, todos los registros se deseleccionarán cuando cambien los filtros. Usando el método `deselectAllRecordsWhenFiltered(false)`, puedes desactivar este comportamiento:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->deselectAllRecordsWhenFiltered(false);
}
```

## Modificar la consulta base

Por defecto, las modificaciones a la consulta Eloquent realizadas en el método `query()` se aplicarán dentro de una cláusula `where()` con alcance. Esto es para asegurar que la consulta no entre en conflicto con otros filtros que puedan aplicarse, especialmente aquellos que usan `orWhere()`.

Sin embargo, la desventaja de esto es que el método `query()` no puede usarse para modificar la consulta de otras maneras, como eliminar alcances globales, ya que la consulta base necesita modificarse directamente, no la consulta con alcance.

Para modificar la consulta base directamente, puedes usar el método `baseQuery()`, pasando un closure que recibe la consulta base:

```php
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Filters\TernaryFilter;

TernaryFilter::make('trashed')
    // ...
    ->baseQuery(fn (Builder $query) => $query->withoutGlobalScopes([
        SoftDeletingScope::class,
    ]))
```

## Personalizar la acción de activación de filtros

Para personalizar los botones de activación de filtros, puedes usar el método `filtersTriggerAction()`, pasando un closure que devuelve una acción. Todos los métodos que están disponibles para [personalizar botones de activación de acciones](../../actions/overview) pueden usarse:

```php
use Filament\Actions\Action;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->filtersTriggerAction(
            fn (Action $action) => $action
                ->button()
                ->label('Filtrar'),
        );
}
```

## Inyección de utilidades de filtro

La gran mayoría de métodos usados para configurar filtros aceptan funciones como parámetros en lugar de valores codificados:

```php
use App\Models\Author;
use Filament\Tables\Filters\SelectFilter;

SelectFilter::make('author')
    ->options(fn (): array => Author::query()->pluck('name', 'id')->all())
```

Esto por sí solo desbloquea muchas posibilidades de personalización.

El paquete también es capaz de inyectar muchas utilidades para usar dentro de estas funciones, como parámetros. Todos los métodos de personalización que aceptan funciones como argumentos pueden inyectar utilidades.

Estas utilidades inyectadas requieren que se usen nombres de parámetros específicos. De lo contrario, Filament no sabe qué inyectar.

### Inyectar la instancia del filtro actual

Si deseas acceder a la instancia del filtro actual, define un parámetro `$filter`:

```php
use Filament\Tables\Filters\BaseFilter;

function (BaseFilter $filter) {
    // ...
}
```

### Inyectar la instancia del componente Livewire actual

Si deseas acceder a la instancia del componente Livewire actual al que pertenece la tabla, define un parámetro `$livewire`:

```php
use Filament\Tables\Contracts\HasTable;

function (HasTable $livewire) {
    // ...
}
```

### Inyectar la instancia de la tabla actual

Si deseas acceder a la instancia de configuración de la tabla actual a la que pertenece el filtro, define un parámetro `$table`:

```php
use Filament\Tables\Table;

function (Table $table) {
    // ...
}
```

### Inyectar múltiples utilidades

Los parámetros se inyectan dinámicamente usando reflexión, por lo que puedes combinar múltiples parámetros en cualquier orden:

```php
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;

function (HasTable $livewire, Table $table) {
    // ...
}
```

### Inyectar dependencias del contenedor de Laravel

Puedes inyectar cualquier cosa del contenedor de Laravel como normal, junto con utilidades:

```php
use Filament\Tables\Table;
use Illuminate\Http\Request;

function (Request $request, Table $table) {
    // ...
}
```
