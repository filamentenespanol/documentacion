---
title: Datos personalizados
---

## Introducción

El [constructor de tablas de Filament](overview/#introduction) fue diseñado originalmente para renderizar datos directamente desde una base de datos SQL usando [modelos Eloquent](https://laravel.com/docs/eloquent) en una aplicación Laravel. Cada fila en una tabla de Filament corresponde a una fila en la base de datos, representada por una instancia de modelo Eloquent.

Sin embargo, esta configuración no siempre es posible o práctica. Podrías necesitar mostrar datos que no están almacenados en una base de datos, o datos que están almacenados, pero no son accesibles a través de Eloquent.

En tales casos, puedes usar datos personalizados en su lugar. Pasa una función al método `records()` del constructor de tablas que devuelva un array de datos. Esta función se llama cuando la tabla se renderiza, y el valor que devuelve se usa para poblar la tabla.

```php
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->records(fn (): array => [
            1 => [
                'title' => 'Primer elemento',
                'slug' => 'primer-elemento',
                'is_featured' => true,
            ],
            2 => [
                'title' => 'Segundo elemento',
                'slug' => 'segundo-elemento',
                'is_featured' => false,
            ],
            3 => [
                'title' => 'Tercer elemento',
                'slug' => 'tercer-elemento',
                'is_featured' => true,
            ],
        ])
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('slug'),
            IconColumn::make('is_featured')
                ->boolean(),
        ]);
}
```

:::warning
Las claves del array (ej., 1, 2, 3) representan los IDs de los registros. Usa claves únicas y consistentes para asegurar un diffing y seguimiento de estado adecuados. Esto ayuda a prevenir problemas con la integridad de los registros durante las interacciones y actualizaciones de Livewire.
:::

## Columnas

Las [columnas](columns) en la tabla funcionan de manera similar a como lo hacen cuando se usan [modelos Eloquent](https://laravel.com/docs/eloquent), pero con una diferencia clave: en lugar de referirse a un atributo de modelo o relación, el nombre de la columna representa una clave en el array devuelto por la función `records()`.

Cuando trabajas con el registro actual dentro de una función de columna, establece el tipo `$record` como `array` en lugar de `Model`. Por ejemplo, para definir una columna usando la función [`state()`](columns#setting-the-state-of-a-column), podrías hacer lo siguiente:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('is_featured')
    ->state(function (array $record): string {
        return $record['is_featured'] ? 'Destacado' : 'No destacado';
    })
```

### Ordenación

La función de [ordenación](columns#sorting) incorporada de Filament usa SQL para ordenar datos. Cuando trabajas con datos personalizados, necesitarás manejar la ordenación tú mismo.

Para acceder a la columna y dirección de ordenación actuales, puedes inyectar `$sortColumn` y `$sortDirection` en la función `records()`. Estas variables son `null` si no se aplica ordenación.

En el ejemplo a continuación, se usa una [colección](https://laravel.com/docs/collections#method-sortby) para ordenar los datos por clave. La colección se devuelve en lugar de un array, y Filament la maneja de la misma manera. Sin embargo, usar una colección no es requerido para usar esta característica.

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Collection;

public function table(Table $table): Table
{
    return $table
        ->records(
            fn (?string $sortColumn, ?string $sortDirection): Collection => collect([
                1 => ['title' => 'Primer elemento'],
                2 => ['title' => 'Segundo elemento'],
                3 => ['title' => 'Tercer elemento'],
            ])->when(
                filled($sortColumn),
                fn (Collection $data): Collection => $data->sortBy(
                    $sortColumn,
                    SORT_REGULAR,
                    $sortDirection === 'desc',
                ),
            )
        )
        ->columns([
            TextColumn::make('title')
                ->sortable(),
        ]);
}
```

:::info
Podría parecer que Filament debería ordenar los datos por ti, pero en muchos casos, es mejor dejar que tu fuente de datos—como una consulta personalizada o llamada a API—maneje la ordenación en su lugar.
:::

### Búsqueda

La función de [búsqueda](columns#searching) incorporada de Filament usa SQL para buscar datos. Cuando trabajas con datos personalizados, necesitarás manejar la búsqueda tú mismo.

Para acceder a la consulta de búsqueda actual, puedes inyectar `$search` en la función `records()`. Esta variable es `null` si no se está usando actualmente una consulta de búsqueda.

En el ejemplo a continuación, se usa una [colección](https://laravel.com/docs/collections#method-filter) para filtrar los datos por la consulta de búsqueda. La colección se devuelve en lugar de un array, y Filament la maneja de la misma manera. Sin embargo, usar una colección no es requerido para usar esta característica.

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

public function table(Table $table): Table
{
    return $table
        ->records(
            fn (?string $search): Collection => collect([
                1 => ['title' => 'Primer elemento'],
                2 => ['title' => 'Segundo elemento'],
                3 => ['title' => 'Tercer elemento'],
            ])->when(
                filled($search),
                fn (Collection $data): Collection => $data->filter(
                    fn (array $record): bool => str_contains(
                        Str::lower($record['title']),
                        Str::lower($search),
                    ),
                ),
            )
        )
        ->columns([
            TextColumn::make('title'),
        ])
        ->searchable();
}
```

En este ejemplo, columnas específicas como `title` no necesitan ser `searchable()` porque la lógica de búsqueda se maneja dentro de la función `records()`. Sin embargo, si quieres habilitar el campo de búsqueda sin habilitar la búsqueda para una columna específica, puedes usar el método `searchable()` en toda la tabla.

:::info
Podría parecer que Filament debería buscar los datos por ti, pero en muchos casos, es mejor dejar que tu fuente de datos—como una consulta personalizada o llamada a API—maneje la búsqueda en su lugar.
:::

#### Búsqueda de columnas individuales

La característica de [búsquedas de columnas individuales](#searching-individually) proporciona una manera de renderizar un campo de búsqueda por separado para cada columna, permitiendo un filtrado más preciso. Cuando usas datos personalizados, necesitas implementar esta característica tú mismo.

En lugar de inyectar `$search` en la función `records()`, puedes inyectar un array de `$columnSearches`, que contiene las consultas de búsqueda para cada columna.

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

public function table(Table $table): Table
{
    return $table
        ->records(
            fn (array $columnSearches): Collection => collect([
                1 => ['title' => 'Primer elemento'],
                2 => ['title' => 'Segundo elemento'],
                3 => ['title' => 'Tercer elemento'],
            ])->when(
                filled($columnSearches['title'] ?? null),
                fn (Collection $data) => $data->filter(
                    fn (array $record): bool => str_contains(
                        Str::lower($record['title']),
                        Str::lower($columnSearches['title'])
                    ),
                ),
            )
        )
        ->columns([
            TextColumn::make('title')
                ->searchable(isIndividual: true),
        ]);
}
```

:::info
Podría parecer que Filament debería buscar los datos por ti, pero en muchos casos, es mejor dejar que tu fuente de datos—como una consulta personalizada o llamada a API—maneje la búsqueda en su lugar.
:::

## Filtros

Filament también proporciona una manera de filtrar datos usando [filtros](filters). Cuando trabajas con datos personalizados, necesitarás manejar el filtrado tú mismo.

Filament te da acceso a un array de datos de filtro inyectando `$filters` en la función `records()`. El array contiene los nombres de los filtros como claves y los valores de los formularios de filtro en sí mismos.

En el ejemplo a continuación, se usa una [colección](https://laravel.com/docs/collections#method-where) para filtrar los datos. La colección se devuelve en lugar de un array, y Filament la maneja de la misma manera. Sin embargo, usar una colección no es requerido para usar esta característica.

```php
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Collection;

public function table(Table $table): Table
{
    return $table
        ->records(fn (array $filters): Collection => collect([
            1 => [
                'title' => '¿Qué es Filament?',
                'slug' => 'que-es-filament',
                'author' => 'Dan Harrin',
                'is_featured' => true,
                'creation_date' => '2021-01-01',
            ],
            2 => [
                'title' => 'Las 5 mejores características de Filament',
                'slug' => 'top-5-caracteristicas',
                'author' => 'Ryan Chandler',
                'is_featured' => false,
                'creation_date' => '2021-03-01',
            ],
            3 => [
                'title' => 'Consejos para construir un gran plugin de Filament',
                'slug' => 'consejos-plugin',
                'author' => 'Zep Fietje',
                'is_featured' => true,
                'creation_date' => '2023-06-01',
            ],
        ])
            ->when(
                $filters['is_featured']['isActive'] ?? false,
                fn (Collection $data): Collection => $data->where(
                    'is_featured', true
                ),
            )
            ->when(
                filled($author = $filters['author']['value'] ?? null),
                fn (Collection $data): Collection => $data->where(
                    'author', $author
                ),
            )
            ->when(
                filled($date = $filters['creation_date']['date'] ?? null),
                fn (Collection $data): Collection => $data->where(
                    'creation_date', $date
                ),
            )
        )
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('slug'),
            IconColumn::make('is_featured')
                ->boolean(),
            TextColumn::make('author'),
        ])
        ->filters([
            Filter::make('is_featured'),
            SelectFilter::make('author')
                ->options([
                    'Dan Harrin' => 'Dan Harrin',
                    'Ryan Chandler' => 'Ryan Chandler',
                    'Zep Fietje' => 'Zep Fietje',
                ]),
            Filter::make('creation_date')
                ->schema([
                    DatePicker::make('date'),
                ]),
        ]);
}
```

Los valores de filtro no son directamente accesibles a través de `$filters['filterName']`. En su lugar, cada filtro contiene uno o más campos de formulario, y esos nombres de campo se usan como claves dentro del array de datos del filtro. Por ejemplo:

- Los filtros de [Checkbox](filters/overview#introduction) o [Toggle](filters/overview#using-a-toggle-button-instead-of-a-checkbox) sin un esquema personalizado (ej., featured) usan `isActive` como la `key`: `$filters['featured']['isActive']`

- Los [filtros Select](filters/select#introduction) (ej., author) usan `value`: `$filters['author']['value']`

- Los filtros de [esquema personalizado](filters/custom#custom-filter-schemas) (ej., creation_date) usan los nombres reales de los campos de formulario. Si el campo se llama `date`, accédelo así: `$filters['creation_date']['date']`

:::info
Podría parecer que Filament debería filtrar los datos por ti, pero en muchos casos, es mejor dejar que tu fuente de datos—como una consulta personalizada o llamada a API—maneje el filtrado en su lugar.
:::

## Paginación

La característica de [paginación](overview#pagination) incorporada de Filament usa SQL para paginar los datos. Cuando trabajas con datos personalizados, necesitarás manejar la paginación tú mismo.

Los argumentos `$page` y `$recordsPerPage` se inyectan en la función `records()`, y puedes usarlos para paginar los datos. Un `LengthAwarePaginator` debe ser devuelto desde la función `records()`, y Filament manejará los enlaces de paginación y otras características de paginación por ti:

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

public function table(Table $table): Table
{
    return $table
        ->records(function (int $page, int $recordsPerPage): LengthAwarePaginator {
            $records = collect([
                1 => ['title' => '¿Qué es Filament?'],
                2 => ['title' => 'Las 5 mejores características de Filament'],
                3 => ['title' => 'Consejos para construir un gran plugin de Filament'],
            ])->forPage($page, $recordsPerPage);

            return new LengthAwarePaginator(
                $records,
                total: 30, // Número total de registros a través de todas las páginas
                perPage: $recordsPerPage,
                currentPage: $page,
            );
        })
        ->columns([
            TextColumn::make('title'),
        ]);
}
```

En este ejemplo, el método `forPage()` se usa para paginar los datos. Esto probablemente no es la manera más eficiente de paginar datos de una consulta o API, pero es una manera simple de demostrar cómo paginar datos de un array personalizado.

:::info
Podría parecer que Filament debería paginar los datos por ti, pero en muchos casos, es mejor dejar que tu fuente de datos—como una consulta personalizada o llamada a API—maneje la paginación en su lugar.
:::

## Acciones

Las [acciones](actions) en la tabla funcionan de manera similar a como lo hacen cuando se usan [modelos Eloquent](https://laravel.com/docs/eloquent). La única diferencia es que el parámetro `$record` en la función callback de la acción será un `array` en lugar de un `Model`.

```php
use Filament\Actions\Action;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Collection;

public function table(Table $table): Table
{
    return $table
        ->records(fn (): Collection => collect([
            1 => [
                'title' => '¿Qué es Filament?',
                'slug' => 'que-es-filament',
            ],
            2 => [
                'title' => 'Las 5 mejores características de Filament',
                'slug' => 'top-5-caracteristicas',
            ],
            3 => [
                'title' => 'Consejos para construir un gran plugin de Filament',
                'slug' => 'consejos-plugin',
            ],
        ]))
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('slug'),
        ])
        ->recordActions([
            Action::make('view')
                ->color('gray')
                ->icon(Heroicon::Eye)
                ->url(fn (array $record): string => route('posts.view', $record['slug'])),
        ]);
}
```

### Acciones masivas

Para acciones que interactúan con un solo registro, el registro siempre está presente en la página actual de la tabla, por lo que el método `records()` puede usarse para obtener los datos. Sin embargo, para acciones masivas, los registros pueden seleccionarse a través de páginas de paginación. Si quieres usar una acción masiva que selecciona registros a través de páginas, necesitas darle a Filament una manera de obtener registros a través de páginas, de lo contrario solo devolverá los registros de la página actual. El método `resolveSelectedRecordsUsing()` debe aceptar una función que tenga un parámetro `$keys`, y devuelva un array de datos de registro:

```php
use Filament\Actions\BulkAction;
use Filament\Tables\Table;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

public function table(Table $table): Table
{
    return $table
        ->records(function (): array {
            // ...
        })
        ->resolveSelectedRecordsUsing(function (array $keys): array {
            return Arr::only([
                1 => [
                    'title' => 'Primer elemento',
                    'slug' => 'primer-elemento',
                    'is_featured' => true,
                ],
                2 => [
                    'title' => 'Segundo elemento',
                    'slug' => 'segundo-elemento',
                    'is_featured' => false,
                ],
                3 => [
                    'title' => 'Tercer elemento',
                    'slug' => 'tercer-elemento',
                    'is_featured' => true,
                ],
            ], $keys);
        })
        ->columns([
            // ...
        ])
        ->recordActions([
            BulkAction::make('feature')
                ->requiresConfirmation()
                ->action(function (Collection $records): void {
                    // Hacer algo con la colección de datos `$records`
                }),
        ]);
}
```

Sin embargo, si tu usuario usa el botón "Seleccionar Todo" para seleccionar todos los registros a través de páginas de paginación, Filament internamente cambiará a rastrear registros *deseleccionados* en lugar de registros seleccionados. Este es un mecanismo eficiente en conjuntos de datos significativamente grandes. Puedes inyectar dos parámetros adicionales en el método `resolveSelectedRecordsUsing()` para manejar este caso: `$isTrackingDeselectedKeys` y `$deselectedKeys`.

`$isTrackingDeselectedKeys` es un booleano que indica si el usuario está rastreando claves deseleccionadas. Si es `true`, `$deselectedKeys` contendrá las claves de los registros que están actualmente deseleccionados. Puedes usar esta información para filtrar los registros deseleccionados del array de registros devuelto por el método `resolveSelectedRecordsUsing()`:

```php
use Filament\Actions\BulkAction;
use Filament\Tables\Table;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

public function table(Table $table): Table
{
    return $table
        ->records(function (): array {
            // ...
        })
        ->resolveSelectedRecordsUsing(function (
            array $keys,
            bool $isTrackingDeselectedKeys,
            array $deselectedKeys
        ): array {
            $records = [
                1 => [
                    'title' => 'Primer elemento',
                    'slug' => 'primer-elemento',
                    'is_featured' => true,
                ],
                2 => [
                    'title' => 'Segundo elemento',
                    'slug' => 'segundo-elemento',
                    'is_featured' => false,
                ],
                3 => [
                    'title' => 'Tercer elemento',
                    'slug' => 'tercer-elemento',
                    'is_featured' => true,
                ],
            ];

            if ($isTrackingDeselectedKeys) {
                return Arr::except(
                    $records,
                    $deselectedKeys,
                );
            }

            return Arr::only(
                $records,
                $keys,
            );
        })
        ->columns([
            // ...
        ])
        ->recordActions([
            BulkAction::make('feature')
                ->requiresConfirmation()
                ->action(function (Collection $records): void {
                    // Hacer algo con la colección de datos `$records`
                }),
        ]);
}
```

## Usar una API externa como fuente de datos de tabla

El [constructor de tablas de Filament](overview/#introduction) te permite poblar tablas con datos obtenidos de cualquier fuente externa—no solo [modelos Eloquent](https://laravel.com/docs/eloquent). Esto es particularmente útil cuando quieres mostrar datos de una API REST o un servicio de terceros.

### Obtener datos de una API externa

El ejemplo a continuación demuestra cómo consumir datos de [DummyJSON](https://dummyjson.com), una API REST falsa gratuita para JSON de marcador de posición, y mostrarlos en una [tabla de Filament](overview/#introduction):

```php
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Http;

public function table(Table $table): Table
{
    return $table
        ->records(fn (): array => Http::baseUrl('https://dummyjson.com')
            ->get('products')
            ->collect()
            ->get('products', [])
        )
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category'),
            TextColumn::make('price')
                ->money(),
        ]);
}
```

`get('products')` hace una petición `GET` a [`https://dummyjson.com/products`](https://dummyjson.com/products). El método `collect()` convierte la respuesta JSON en una [colección de Laravel](https://laravel.com/docs/collections#main-content). Finalmente, `get('products', [])` recupera el array de productos de la respuesta. Si la clave falta, devuelve de manera segura un array vacío.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::info
DummyJSON devuelve 30 elementos por defecto. Puedes usar los parámetros de consulta [limit y skip](#external-api-pagination) para paginar a través de todos los elementos o usar [`limit=0`](https://dummyjson.com/docs/products#products-limit_skip) para obtener todos los elementos.
:::

#### Establecer el estado de una columna usando datos de API

Las [columnas](#columns) se mapean a las claves del array devueltas por la función `records()`.

Cuando trabajas con el registro actual dentro de una función de columna, establece el tipo `$record` como `array` en lugar de `Model`. Por ejemplo, para definir una columna usando la función [`state()`](columns/overview#setting-the-state-of-a-column), podrías hacer lo siguiente:

```php
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Str;

TextColumn::make('category_brand')
    ->label('Categoría - Marca')
    ->state(function (array $record): string {
        $category = Str::headline($record['category']);
        $brand = Str::title($record['brand'] ?? 'Desconocido');

        return "{$category} - {$brand}";
    })
```

:::tip
Puedes usar el método [`formatStateUsing()`](columns/text#formatting) para formatear el estado de una columna de texto sin cambiar el estado en sí mismo.
:::

### Ordenación de API externa

Puedes habilitar [ordenación](columns#sorting) en [columnas](columns) incluso cuando usas una API externa como fuente de datos. El ejemplo a continuación demuestra cómo pasar parámetros de ordenación (`sort_column` y `sort_direction`) a la API de [DummyJSON](https://dummyjson.com/docs/products#products-sort) y cómo son manejados por la API.

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Http;

public function table(Table $table): Table
{
    return $table
        ->records(function (?string $sortColumn, ?string $sortDirection): array {
            $response = Http::baseUrl('https://dummyjson.com/')
                ->get('products', [
                    'sortBy' => $sortColumn,
                    'order' => $sortDirection,
                ]);

            return $response
                ->collect()
                ->get('products', []);
        })
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category')
                ->sortable(),
            TextColumn::make('price')
                ->money(),
        ]);
}
```

`get('products')` hace una petición `GET` a [`https://dummyjson.com/products`](https://dummyjson.com/products). La petición incluye dos parámetros: `sortBy`, que especifica la columna por la cual ordenar (ej., category), y `order`, que especifica la dirección de la ordenación (ej., asc o desc). El método `collect()` convierte la respuesta JSON en una [colección de Laravel](https://laravel.com/docs/collections#main-content). Finalmente, `get('products', [])` recupera el array de productos de la respuesta. Si la clave falta, devuelve de manera segura un array vacío.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::info
DummyJSON devuelve 30 elementos por defecto. Puedes usar los parámetros de consulta [limit y skip](#external-api-pagination) para paginar a través de todos los elementos o usar [`limit=0`](https://dummyjson.com/docs/products#products-limit_skip) para obtener todos los elementos.
:::

### Búsqueda de API externa

Puedes habilitar [búsqueda](columns#searching) en [columnas](columns) incluso cuando usas una API externa como fuente de datos. El ejemplo a continuación demuestra cómo pasar el parámetro `search` a la API de [DummyJSON](https://dummyjson.com/docs/products#products-search) y cómo es manejado por la API.

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Http;

public function table(Table $table): Table
{
    return $table
        ->records(function (?string $search): array {
            $response = Http::baseUrl('https://dummyjson.com/')
                ->get('products/search', [
                    'q' => $search,
                ]);

            return $response
                ->collect()
                ->get('products', []);
        })
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category'),
            TextColumn::make('price')
                ->money(),
        ])
        ->searchable();
}
```

`get('products/search')` hace una petición `GET` a [`https://dummyjson.com/products/search`](https://dummyjson.com/products/search). La petición incluye el parámetro `q`, que se usa para filtrar los resultados basados en la consulta de `search`. El método `collect()` convierte la respuesta JSON en una [colección de Laravel](https://laravel.com/docs/collections#main-content). Finalmente, `get('products', [])` recupera el array de productos de la respuesta. Si la clave falta, devuelve de manera segura un array vacío.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::info
DummyJSON devuelve 30 elementos por defecto. Puedes usar los parámetros de consulta [limit y skip](#external-api-pagination) para paginar a través de todos los elementos o usar [`limit=0`](https://dummyjson.com/docs/products#products-limit_skip) para obtener todos los elementos.
:::

### Filtrado de API externa

Puedes habilitar [filtrado](filters) en tu tabla incluso cuando usas una API externa como fuente de datos. El ejemplo a continuación demuestra cómo pasar el parámetro `filter` a la API de [DummyJSON](https://dummyjson.com/docs/products#products-search) y cómo es manejado por la API.

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

public function table(Table $table): Table
{
    return $table
        ->records(function (array $filters): array {
            $category = $filters['category']['value'] ?? null;

            $endpoint = filled($category)
                ? "products/category/{$category}"
                : 'products';

            $response = Http::baseUrl('https://dummyjson.com/')
                ->get($endpoint);

            return $response
                ->collect()
                ->get('products', []);
        })
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category'),
            TextColumn::make('price')
                ->money(),
        ])
        ->filters([
            SelectFilter::make('category')
                ->label('Categoría')
                ->options(fn (): Collection => Http::baseUrl('https://dummyjson.com/')
                    ->get('products/categories')
                    ->collect()
                    ->pluck('name', 'slug')
                ),
        ]);
}
```

Si se selecciona un filtro de categoría, la petición se hace a `/products/category/{category}`; de lo contrario, por defecto es `/products`. El método `get()` envía una petición `GET` al endpoint apropiado. El método `collect()` convierte la respuesta JSON en una [colección de Laravel](https://laravel.com/docs/collections#main-content). Finalmente, `get('products', [])` recupera el array de productos de la respuesta. Si la clave falta, devuelve de manera segura un array vacío.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::info
DummyJSON devuelve 30 elementos por defecto. Puedes usar los parámetros de consulta [limit y skip](#external-api-pagination) para paginar a través de todos los elementos o usar [`limit=0`](https://dummyjson.com/docs/products#products-limit_skip) para obtener todos los elementos.
:::

### Paginación de API externa

Puedes habilitar [paginación](overview#pagination) cuando usas una API externa como fuente de datos de tabla. Filament pasará la página actual y el número de registros por página a tu función `records()`. El ejemplo a continuación demuestra cómo construir un `LengthAwarePaginator` manualmente y obtener datos paginados de la API de [DummyJSON](https://dummyjson.com/docs/products#products-limit_skip), que usa parámetros `limit` y `skip` para paginación:

```php
public function table(Table $table): Table
{
    return $table
        ->records(function (int $page, int $recordsPerPage): LengthAwarePaginator {
            $skip = ($page - 1) * $recordsPerPage;

            $response = Http::baseUrl('https://dummyjson.com')
                ->get('products', [
                    'limit' => $recordsPerPage,
                    'skip' => $skip,
                ])
                ->collect();

            return new LengthAwarePaginator(
                items: $response['products'],
                total: $response['total'],
                perPage: $recordsPerPage,
                currentPage: $page
            );
        })
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category'),
            TextColumn::make('price')
                ->money(),
        ]);
}
```

`$page` y `$recordsPerPage` son automáticamente inyectados por Filament basados en el estado actual de paginación.
El valor calculado `skip` le dice a la API cuántos registros omitir antes de devolver resultados para la página actual.
La respuesta contiene `products` (los elementos paginados) y `total` (el número total de elementos disponibles).
Estos valores se pasan a un `LengthAwarePaginator`, que Filament usa para renderizar los controles de paginación correctamente.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

### Acciones de API externa

Cuando usas [acciones](../actions/overview) en una tabla con una API externa, el proceso es casi idéntico a trabajar con [modelos Eloquent](https://laravel.com/docs/eloquent). La principal diferencia es que el parámetro `$record` en la función callback de la acción será un `array` en lugar de una instancia `Model`.

Filament proporciona una variedad de [acciones incorporadas](../actions/overview#available-actions) que puedes usar en tu aplicación. Sin embargo, no estás limitado a estas. Puedes crear [acciones personalizadas](../actions/overview#introduction) adaptadas a las necesidades de tu aplicación.

Los ejemplos a continuación demuestran cómo crear y usar acciones con una API externa usando [DummyJSON](https://dummyjson.com) como fuente de API simulada.

#### Ejemplo de acción de crear API externa

La acción de crear en este ejemplo proporciona un [formulario modal](../actions/modals#rendering-a-form-in-a-modal) que permite a los usuarios crear un nuevo producto usando una API externa. Cuando el formulario se envía, se envía una petición `POST` a la API para crear el nuevo producto.

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

public function table(Table $table): Table
{
    $baseUrl = 'https://dummyjson.com';

    return $table
        ->records(fn (): array => Http::baseUrl($baseUrl)
            ->get('products')
            ->collect()
            ->get('products', [])
        )
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category'),
        ])
        ->headerActions([
            Action::make('create')
                ->modalHeading('Crear producto')
                ->schema([
                    TextInput::make('title')
                        ->required(),
                    Select::make('category')
                        ->options(fn (): Collection => Http::get("{$baseUrl}/products/categories")
                            ->collect()
                            ->pluck('name', 'slug')
                        )
                        ->required(),
                ])
                ->action(function (array $data) use ($baseUrl) {
                    $response = Http::post("{$baseUrl}/products/add", [
                        'title' => $data['title'],
                        'category' => $data['category'],
                    ]);

                    if ($response->failed()) {
                        Notification::make()
                            ->title('Falló la creación del producto')
                            ->danger()
                            ->send();

                        return;
                    }

                    Notification::make()
                        ->title('Producto creado')
                        ->success()
                        ->send();
                }),
        ]);
}
```

- [`modalHeading()`](../actions/modals#customizing-the-modals-heading-description-and-submit-action-label) establece el título del modal que aparece cuando se activa la acción.
- [`schema()`](../actions/modals#rendering-a-schema-in-a-modal) define los campos de formulario mostrados en el modal.
- `action()` define la lógica que se ejecutará cuando el usuario envíe el formulario.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::warning
La API de [`DummyJSON`](https://dummyjson.com/docs/products#products-update) no lo agregará al servidor. Simulará una petición `POST` y devolverá el nuevo producto creado con un nuevo id.
:::

Si no necesitas un modal, puedes redirigir directamente a los usuarios a una URL especificada cuando hagan clic en el botón de acción de crear. En este caso, puedes definir una URL personalizada que apunte a la página de creación de producto:

```php
use Filament\Actions\Action;

Action::make('create')
    ->url(route('products.create'))
```

#### Ejemplo de acción de editar API externa

La acción de editar en este ejemplo proporciona un [formulario modal](../actions/modals#rendering-a-form-in-a-modal) para editar detalles de producto obtenidos de una API externa. Los usuarios pueden actualizar campos como el título del producto y la categoría, y los cambios se enviarán a la API externa usando una petición `PUT`.

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

public function table(Table $table): Table
{
    $baseUrl = 'https://dummyjson.com';

    return $table
        ->records(fn (): array => Http::baseUrl($baseUrl)
            ->get('products')
            ->collect()
            ->get('products', [])
        )
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category'),
        ])
        ->recordActions([
            Action::make('edit')
                ->icon(Heroicon::PencilSquare)
                ->modalHeading('Editar producto')
                ->fillForm(fn (array $record) => $record)
                ->schema([
                    TextInput::make('title')
                        ->required(),
                    Select::make('category')
                        ->options(fn (): Collection => Http::get("{$baseUrl}/products/categories")
                            ->collect()
                            ->pluck('name', 'slug')
                        )
                        ->required(),
                ])
                ->action(function (array $data, array $record) use ($baseUrl) {
                    $response = Http::put("{$baseUrl}/products/{$record['id']}", [
                        'title' => $data['title'],
                        'category' => $data['category'],
                    ]);

                    if ($response->failed()) {
                        Notification::make()
                            ->title('Falló el guardado del producto')
                            ->danger()
                            ->send();

                        return;
                    }

                    Notification::make()
                        ->title('Producto guardado')
                        ->success()
                        ->send();
                }),
        ]);
}
```

- `icon()` define el ícono mostrado para esta acción en la tabla.
- [`modalHeading()`](../actions/modals#customizing-the-modals-heading-description-and-submit-action-label) establece el título del modal que aparece cuando se activa la acción.
- [`fillForm()`](../actions/modals#filling-the-form-with-existing-data) automáticamente llena los campos del formulario con los valores existentes del registro seleccionado.
- [`schema()`](../actions/modals#rendering-a-schema-in-a-modal) define los campos de formulario mostrados en el modal.
- `action()` define la lógica que se ejecutará cuando el usuario envíe el formulario.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::warning
La API de [`DummyJSON`](https://dummyjson.com/docs/products#products-update) no lo actualizará en el servidor. Simulará una petición `PUT`/`PATCH` y devolverá el producto actualizado con datos modificados.
:::

Si no necesitas un modal, puedes redirigir directamente a los usuarios a una URL especificada cuando hagan clic en el botón de acción. Puedes lograr esto definiendo una URL con una ruta dinámica que incluya el parámetro `record`:

```php
use Filament\Actions\Action;

Action::make('edit')
    ->url(fn (array $record): string => route('products.edit', ['product' => $record['id']]))
```

#### Ejemplo de acción de ver API externa

La acción de ver en este ejemplo abre un [modal](../actions/modals) mostrando información detallada del producto obtenida de una API externa. Esto te permite construir una interfaz de usuario con varios componentes como [entradas de texto](../infolists/text-entry) e [imágenes](../infolists/image-entry).

```php
use Filament\Actions\Action;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Http;

public function table(Table $table): Table
{
    $baseUrl = 'https://dummyjson.com';

    return $table
        ->records(fn (): array => Http::baseUrl($baseUrl)
            ->get('products', [
                'select' => 'id,title,description,brand,category,thumbnail,price',
            ])
            ->collect()
            ->get('products', [])
        )
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category'),
        ])
        ->recordActions([
            Action::make('view')
                ->color('gray')
                ->icon(Heroicon::Eye)
                ->modalHeading('Ver producto')
                ->schema([
                    Section::make()
                        ->schema([
                            Flex::make([
                                Grid::make(2)
                                    ->schema([
                                        TextEntry::make('title'),
                                        TextEntry::make('category'),
                                        TextEntry::make('brand'),
                                        TextEntry::make('price')
                                            ->money(),
                                    ]),
                                ImageEntry::make('thumbnail')
                                    ->hiddenLabel()
                                    ->grow(false),
                            ])->from('md'),
                            TextEntry::make('description')
                                ->prose(),
                        ]),
                ])
                ->modalSubmitAction(false)
                ->modalCancelActionLabel('Cerrar'),
        ]);
}
```

- `color()` establece el color del botón de acción.
- `icon()` define el ícono mostrado para esta acción en la tabla.
- [`modalHeading()`](../actions/modals#customizing-the-modals-heading-description-and-submit-action-label) establece el título del modal que aparece cuando se activa la acción.
- [`schema()`](../actions/modals#rendering-a-schema-in-a-modal) define los campos de formulario mostrados en el modal.
- [`modalSubmitAction(false)`](../actions/modals#modifying-the-default-modal-footer-action-button) deshabilita el botón de envío, haciendo esta una acción de vista de solo lectura.
- [`modalCancelActionLabel()`](../actions/modals#modifying-the-default-modal-footer-action-button) personaliza la etiqueta para el botón de cerrar.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::info
El parámetro [`select`](https://dummyjson.com/docs/products#products-limit_skip) se usa para limitar los campos devueltos por la API. Esto ayuda a reducir el tamaño del payload y mejora el rendimiento al renderizar la tabla.
:::

Si no necesitas un modal, puedes redirigir directamente a los usuarios a una URL especificada cuando hagan clic en el botón de acción. Puedes lograr esto definiendo una URL con una ruta dinámica que incluya el parámetro `record`:

```php
use Filament\Actions\Action;

Action::make('view')
    ->url(fn (array $record): string => route('products.view', ['product' => $record['id']]))
```

#### Ejemplo de acción de eliminar API externa

La acción de eliminar en este ejemplo permite a los usuarios eliminar un producto obtenido de una API externa.

```php
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Http;

public function table(Table $table): Table
{
    $baseUrl = 'https://dummyjson.com';

    return $table
        ->records(fn (): array => Http::baseUrl($baseUrl)
            ->get('products')
            ->collect()
            ->get('products', [])
        )
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('category'),
            TextColumn::make('price')
                ->money(),
        ])
        ->recordActions([
            Action::make('delete')
                ->color('danger')
                ->icon(Heroicon::Trash)
                ->modalIcon(Heroicon::OutlinedTrash)
                ->modalHeading('Eliminar Producto')
                ->requiresConfirmation()
                ->action(function (array $record) use ($baseUrl) {
                    $response = Http::baseUrl($baseUrl)
                        ->delete("products/{$record['id']}");

                    if ($response->failed()) {
                        Notification::make()
                            ->title('Falló la eliminación del producto')
                            ->danger()
                            ->send();

                        return;
                    }

                    Notification::make()
                        ->title('Producto eliminado')
                        ->success()
                        ->send();
                }),
        ]);
}
```

- `color()` establece el color del botón de acción.
- `icon()` define el ícono mostrado para esta acción en la tabla.
- [`modalIcon()`](../actions/modals#adding-an-icon-inside-the-modal) establece el ícono que aparecerá en el modal de confirmación.
- [`modalHeading()`](../actions/modals#customizing-the-modals-heading-description-and-submit-action-label) establece el título del modal que aparece cuando se activa la acción.
- [`requiresConfirmation()`](../actions/modals#confirmation-modals) asegura que el usuario debe confirmar la eliminación antes de que se ejecute.
- `action()` define la lógica que se ejecutará cuando el usuario confirme el envío.

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::warning
La API de [`DummyJSON`](https://dummyjson.com/docs/products#products-update) no lo eliminará del servidor. Simulará una petición `DELETE` y devolverá el producto eliminado con las claves `isDeleted` y `deletedOn`.
:::

### Ejemplo completo de API externa

Este ejemplo demuestra cómo combinar [ordenación](#external-api-sorting), [búsqueda](#external-api-searching), [filtrado de categoría](#external-api-filtering), y [paginación](#external-api-pagination) cuando usas una API externa como fuente de datos. La API usada aquí es [DummyJSON](https://dummyjson.com), que soporta estas características individualmente pero **no permite combinar todas ellas en una sola petición**. Esto es porque cada característica usa un endpoint diferente:

- La [búsqueda](#external-api-searching) se realiza a través del endpoint `/products/search` usando el parámetro `q`.
- El [filtrado de categoría](#external-api-filtering) usa el endpoint `/products/category/{category}`.
- La [ordenación](#external-api-sorting) se maneja enviando parámetros `sortBy` y `order` al endpoint `/products`.

La única característica que puede combinarse con cada una de las anteriores es la [paginación](#external-api-pagination), ya que los parámetros `limit` y `skip` son soportados a través de los tres endpoints.

```php
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

public function table(Table $table): Table
{
    $baseUrl = 'https://dummyjson.com/';

    return $table
        ->records(function (
            ?string $sortColumn,
            ?string $sortDirection,
            ?string $search,
            array $filters,
            int $page,
            int $recordsPerPage
        ) use ($baseUrl): LengthAwarePaginator {
            // Obtener la categoría seleccionada de los filtros (si hay alguna)
            $category = $filters['category']['value'] ?? null;

            // Elegir endpoint dependiendo de búsqueda o filtro
            $endpoint = match (true) {
                filled($search) => 'products/search',
                filled($category) => "products/category/{$category}",
                default => 'products',
            };

            // Determinar offset de skip
            $skip = ($page - 1) * $recordsPerPage;

            // Parámetros de consulta base para todas las peticiones
            $params = [
                'limit' => $recordsPerPage,
                'skip' => $skip,
                'select' => 'id,title,brand,category,thumbnail,price,sku,stock',
            ];

            // Agregar consulta de búsqueda si aplica
            if (filled($search)) {
                $params['q'] = $search;
            }

            // Agregar parámetros de ordenación
            if ($endpoint === 'products' && $sortColumn) {
                $params['sortBy'] = $sortColumn;
                $params['order'] = $sortDirection ?? 'asc';
            }

            $response = Http::baseUrl($baseUrl)
                ->get($endpoint, $params)
                ->collect();

            return new LengthAwarePaginator(
                items: $response['products'],
                total: $response['total'],
                perPage: $recordsPerPage,
                currentPage: $page
            );
        })
        ->columns([
            ImageColumn::make('thumbnail')
                ->label('Imagen'),
            TextColumn::make('title')
                ->sortable(),
            TextColumn::make('brand')
                ->state(fn (array $record): string => Str::title($record['brand'] ?? 'Desconocido')),
            TextColumn::make('category')
                ->formatStateUsing(fn (string $state): string => Str::headline($state)),
            TextColumn::make('price')
                ->money(),
            TextColumn::make('sku')
                ->label('SKU'),
            TextColumn::make('stock')
                ->label('Stock')
                ->sortable(),
        ])
        ->filters([
            SelectFilter::make('category')
                ->label('Categoría')
                ->options(fn (): Collection => Http::baseUrl($baseUrl)
                    ->get('products/categories')
                    ->collect()
                    ->pluck('name', 'slug')
                ),
        ])
        ->searchable();
}
```

:::warning
Este es un ejemplo básico solo para propósitos de demostración. Es responsabilidad del desarrollador implementar autenticación, autorización, validación, manejo de errores, limitación de velocidad y otras mejores prácticas adecuadas cuando se trabaja con APIs.
:::

:::warning
La API de [DummyJSON](https://dummyjson.com) no soporta combinar ordenación, búsqueda y filtrado de categoría en una sola petición.
:::

:::info
El parámetro [`select`](https://dummyjson.com/docs/products#products-limit_skip) se usa para limitar los campos devueltos por la API. Esto ayuda a reducir el tamaño del payload y mejora el rendimiento al renderizar la tabla.
:::
