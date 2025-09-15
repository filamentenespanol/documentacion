---
title: Agrupación de filas
---

## Introducción

Puedes permitir que los usuarios agrupen filas de tabla por un atributo común. Esto es útil para mostrar grandes cantidades de datos de manera más organizada.

Los grupos pueden configurarse usando el nombre del atributo (ej. `'status'`), o un objeto `Group` que permite personalizar el comportamiento de ese grupo (ej. `Group::make('status')->collapsible()`).

## Agrupando filas por defecto

Puedes agrupar siempre por un atributo específico usando `defaultGroup()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->defaultGroup('status');
}
```

## Permitir que el usuario elija entre agrupaciones

Puedes dejar que el usuario seleccione entre diferentes grupos con `groups()`:

```php
public function table(Table $table): Table
{
    return $table
        ->groups([
            'status',
            'category',
        ]);
}
```

Puedes combinar `groups()` y `defaultGroup()`:

```php
public function table(Table $table): Table
{
    return $table
        ->groups([
            'status',
            'category',
        ])
        ->defaultGroup('status');
}
```

## Agrupar por atributo de relación

Es posible agrupar usando atributos de relaciones con notación de puntos:

```php
public function table(Table $table): Table
{
    return $table
        ->groups([
            'author.name',
        ]);
}
```

## Configurar etiqueta de agrupación

Usa `label()`:

```php
use Filament\Tables\Grouping\Group;

public function table(Table $table): Table
{
    return $table
        ->groups([
            Group::make('author.name')
                ->label('Nombre del autor'),
        ]);
}
```

## Configurar título de grupo

Por defecto, el título es el valor del atributo. Puedes personalizarlo con `getTitleFromRecordUsing()`:

```php
Group::make('status')
    ->getTitleFromRecordUsing(fn (Post $record): string => ucfirst($record->status->getLabel())),
```

### Deshabilitar el prefijo de la etiqueta

```php
Group::make('status')
    ->titlePrefixedWithLabel(false),
```

## Configurar descripción del grupo

Puedes añadir descripciones con `getDescriptionFromRecordUsing()`:

```php
Group::make('status')
    ->getDescriptionFromRecordUsing(fn (Post $record): string => $record->status->getDescription()),
```

## Clave del grupo

Personalizar la clave con `getKeyFromRecordUsing()`:

```php
Group::make('status')
    ->getKeyFromRecordUsing(fn (Post $record): string => $record->status->value),
```

## Grupos de fecha

Para agrupar por fecha y omitir la hora:

```php
Group::make('created_at')->date(),
```

## Grupos colapsables

Puedes habilitar `collapsible()`:

```php
Group::make('author.name')->collapsible(),
```

## Resúmenes en grupos

Puedes usar [resúmenes](summaries) en grupos. También puedes ocultar filas y mostrar solo el resumen con `groupsOnly()`:

```php
public function table(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('views_count')
                ->summarize(Sum::make()),
            TextColumn::make('likes_count')
                ->summarize(Sum::make()),
        ])
        ->defaultGroup('category')
        ->groupsOnly();
}
```

## Personalizar ordenamiento por grupo

```php
Group::make('status')
    ->orderQueryUsing(fn (Builder $query, string $direction) => $query->orderBy('status', $direction)),
```

## Personalizar scoping por grupo

```php
Group::make('status')
    ->scopeQueryByKeyUsing(fn (Builder $query, string $key) => $query->where('status', $key)),
```

## Personalizar agrupamiento en query

```php
Group::make('status')
    ->groupQueryUsing(fn (Builder $query) => $query->groupBy('status')),
```

## Personalizar el botón de trigger del dropdown de grupos

```php
->groupRecordsTriggerAction(
    fn (Action $action) => $action
        ->button()
        ->label('Agrupar registros'),
)
```

## Usar dropdown de agrupación en escritorio

```php
->groupingSettingsInDropdownOnDesktop();
```

## Ocultar configuraciones de agrupación

```php
->defaultGroup('status')
->groupingSettingsHidden();
```

### Ocultar configuración de dirección de agrupación

```php
->defaultGroup('status')
->groupingDirectionSettingHidden();
```
