---
title: Constructor de consultas
---

## Introducción

El constructor de consultas te permite definir un conjunto complejo de condiciones para filtrar los datos en tu tabla. Es capaz de manejar anidamiento ilimitado de condiciones, que puedes agrupar con operaciones "and" y "or".

Para usarlo, necesitas definir un conjunto de "restricciones" que se usarán para filtrar los datos. Filament incluye algunas restricciones prediseñadas, que siguen tipos de datos comunes, pero también puedes definir tus propias restricciones personalizadas.

Puedes añadir un constructor de consultas a cualquier tabla usando el filtro `QueryBuilder`:

```php
use Filament\Tables\Filters\QueryBuilder;
use Filament\Tables\Filters\QueryBuilder\Constraints\BooleanConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\DateConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\NumberConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\RelationshipConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\RelationshipConstraint\Operators\IsRelatedToOperator;
use Filament\Tables\Filters\QueryBuilder\Constraints\SelectConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\TextConstraint;

QueryBuilder::make()
    ->constraints([
        TextConstraint::make('name'),
        BooleanConstraint::make('is_visible'),
        NumberConstraint::make('stock'),
        SelectConstraint::make('status')
            ->options([
                'draft' => 'Borrador',
                'reviewing' => 'Revisando',
                'published' => 'Publicado',
            ])
            ->multiple(),
        DateConstraint::make('created_at'),
        RelationshipConstraint::make('categories')
            ->multiple()
            ->selectable(
                IsRelatedToOperator::make()
                    ->titleAttribute('name')
                    ->searchable()
                    ->multiple(),
            ),
        NumberConstraint::make('reviewsRating')
            ->relationship('reviews', 'rating')
            ->integer(),
    ])
```

Cuando anides profundamente el constructor de consultas, puede que necesites aumentar la cantidad de espacio que los filtros pueden consumir. Una forma de hacer esto es [colocando los filtros encima del contenido de la tabla](layout#displaying-filters-above-the-table-content):

```php
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\QueryBuilder;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            QueryBuilder::make()
                ->constraints([
                    // ...
                ]),
        ], layout: FiltersLayout::AboveContent);
}
```

## Restricciones disponibles

Filament incluye muchas restricciones diferentes que puedes usar inmediatamente. También puedes [crear tus propias restricciones personalizadas](#crear-restricciones-personalizadas):

- [Restricción de texto](#restricciones-de-texto)
- [Restricción booleana](#restricciones-booleanas)
- [Restricción numérica](#restricciones-numericas)
- [Restricción de fecha](#restricciones-de-fecha)
- [Restricción select](#restricciones-select)
- [Restricción de relaciones](#restricciones-de-relaciones)

### Restricciones de texto

Permiten filtrar campos de texto. Se pueden usar para filtrar cualquier campo de texto, incluso a través de relaciones.

```php
use Filament\Tables\Filters\QueryBuilder\Constraints\TextConstraint;

TextConstraint::make('name') // Filtra la columna `name`

TextConstraint::make('creatorName')
    ->relationship(name: 'creator', titleAttribute: 'name') // Filtra la columna `name` en la relación `creator`
```

Operadores disponibles:

- Contiene
- No contiene
- Empieza con
- No empieza con
- Termina con
- No termina con
- Es igual
- No es igual
- Está lleno
- Está vacío

### Restricciones booleanas

Permiten filtrar campos booleanos.

```php
use Filament\Tables\Filters\QueryBuilder\Constraints\BooleanConstraint;

BooleanConstraint::make('is_visible') // Filtra la columna `is_visible`

BooleanConstraint::make('creatorIsAdmin')
    ->relationship(name: 'creator', titleAttribute: 'is_admin')
```

Operadores disponibles:

- Es verdadero
- Es falso

### Restricciones numéricas

Permiten filtrar campos numéricos.

```php
use Filament\Tables\Filters\QueryBuilder\Constraints\NumberConstraint;

NumberConstraint::make('stock') // Filtra la columna `stock`

NumberConstraint::make('ordersItemCount')
    ->relationship(name: 'orders', titleAttribute: 'item_count')
```

Operadores disponibles:

- Es mínimo
- Es menor que
- Es máximo
- Es mayor que
- Es igual
- No es igual
- Está lleno
- Está vacío

#### Enteros

Por defecto, las restricciones numéricas permiten decimales. Para restringir a enteros, usa `integer()`:

```php
NumberConstraint::make('stock')
    ->integer()
```

### Restricciones de fecha

Permiten filtrar campos de fecha.

```php
use Filament\Tables\Filters\QueryBuilder\Constraints\DateConstraint;

DateConstraint::make('created_at')

DateConstraint::make('creatorCreatedAt')
    ->relationship(name: 'creator', titleAttribute: 'created_at')
```

Operadores disponibles incluyen: "Es después", "No es después", "Es antes", "No es antes", "Es fecha", "No es fecha", "Es mes", "No es mes", "Es año", "No es año".

### Restricciones select

Permiten filtrar campos usando un campo select.

```php
use Filament\Tables\Filters\QueryBuilder\Constraints\SelectConstraint;

SelectConstraint::make('status')
    ->options([
        'draft' => 'Borrador',
        'reviewing' => 'Revisando',
        'published' => 'Publicado',
    ])
```

- Se puede hacer `searchable()`.
- Se puede hacer `multiple()` para selección múltiple.

### Restricciones de relaciones

Permiten filtrar campos usando datos de relaciones.

```php
use Filament\Tables\Filters\QueryBuilder\Constraints\RelationshipConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\RelationshipConstraint\Operators\IsRelatedToOperator;

RelationshipConstraint::make('creator')
    ->selectable(
        IsRelatedToOperator::make()
            ->titleAttribute('name')
            ->searchable()
            ->multiple(),
    )
```

#### Relaciones múltiples

Puedes usar `multiple()` para relaciones como `HasMany`.

#### Relaciones vacías

Puedes usar `emptyable()` para incluir/excluir relaciones vacías.

#### Restricciones nullable

Puedes usar `nullable()` para mostrar opciones de filtrar valores nulos.

## Alcance de relaciones

Puedes usar `modifyQueryUsing` en la relación para aplicar un alcance.

```php
TextConstraint::make('adminCreatorName')
    ->relationship(
        name: 'creator',
        titleAttribute: 'name',
        modifyQueryUsing: fn (Builder $query) => $query->where('is_admin', true),
    )
```

## Personalizar el ícono de la restricción

Puedes usar `icon('heroicon-m-user')`.

## Sobrescribir operadores por defecto

Puedes usar `operators()`, `pushOperators()` o `unshiftOperators()`.

## Crear restricciones personalizadas

Crea restricciones "inline" usando `Constraint::make()`. Les puedes definir `icon()`, `label()` y `operators()`.

## Crear operadores personalizados

Puedes usar `Operator::make()` con `label()`, `summary()`, y `baseQuery()` o `query()`.

## Personalizar el selector de restricciones

- Puedes cambiar el número de columnas con `constraintPickerColumns()`.
- Puedes personalizar el ancho máximo usando `constraintPickerWidth()`.
