---
title: Mesas de prueba
---

## Probando que una tabla puede renderizarse

Para garantizar que se represente un componente de tabla, utilice el asistente `assertSuccessful()` Livewire:

```php
use function Pest\Livewire\livewire;

it('can render page', function () {
    livewire(ListPosts::class)
        ->assertSuccessful();
});
```

Para probar qué registros se muestran, puede utilizar `assertCanSeeTableRecords()`, `assertCanNotSeeTableRecords()` y ​​`assertCountTableRecords()`:

```php
use function Pest\Livewire\livewire;

it('cannot display trashed posts by default', function () {
    $posts = Post::factory()->count(4)->create();
    $trashedPosts = Post::factory()->trashed()->count(6)->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->assertCanSeeTableRecords($posts)
        ->assertCanNotSeeTableRecords($trashedPosts)
        ->assertCountTableRecords(4);
});
```

> Si su tabla usa paginación, `assertCanSeeTableRecords()` solo buscará registros en la primera página. Para cambiar de página, llame a `call('gotoPage', 2)`.

> Si tu tabla usa `deferLoading()`, debes llamar a `loadTable()` antes de `assertCanSeeTableRecords()`.

## Columnas de prueba

Para asegurarse de que se represente una determinada columna, pase el nombre de la columna a `assertCanRenderTableColumn()`:

```php
use function Pest\Livewire\livewire;

it('can render post titles', function () {
    Post::factory()->count(10)->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->assertCanRenderTableColumn('title');
});
```

Este asistente obtendrá el HTML para esta columna y comprobará que esté presente en la tabla.

Para probar que una columna no se representa, puede usar `assertCanNotRenderTableColumn()`:

```php
use function Pest\Livewire\livewire;

it('can not render post comments', function () {
    Post::factory()->count(10)->create()

    livewire(PostResource\Pages\ListPosts::class)
        ->assertCanNotRenderTableColumn('comments');
});
```

Este asistente afirmará que el HTML de esta columna no se muestra de forma predeterminada en la tabla actual.

### Probando que se puede buscar en una columna

Para buscar en la tabla, llame al método `searchTable()` con su consulta de búsqueda.

Luego puede usar `assertCanSeeTableRecords()` para verificar los registros de su tabla filtrada y usar `assertCanNotSeeTableRecords()` para afirmar que algunos registros ya no están en la tabla:

```php
use function Pest\Livewire\livewire;

it('can search posts by title', function () {
    $posts = Post::factory()->count(10)->create();

    $title = $posts->first()->title;

    livewire(PostResource\Pages\ListPosts::class)
        ->searchTable($title)
        ->assertCanSeeTableRecords($posts->where('title', $title))
        ->assertCanNotSeeTableRecords($posts->where('title', '!=', $title));
});
```

Para buscar columnas individuales, puede pasar una serie de búsquedas a `searchTableColumns()`:

```php
use function Pest\Livewire\livewire;

it('can search posts by title column', function () {
    $posts = Post::factory()->count(10)->create();

    $title = $posts->first()->title;

    livewire(PostResource\Pages\ListPosts::class)
        ->searchTableColumns(['title' => $title])
        ->assertCanSeeTableRecords($posts->where('title', $title))
        ->assertCanNotSeeTableRecords($posts->where('title', '!=', $title));
});
```

### Probando que una columna se puede ordenar

Para ordenar registros de una tabla, puede llamar a `sortTable()`, pasando el nombre de la columna por la que ordenar. Puede utilizar `'desc'` en el segundo parámetro de `sortTable()` para invertir la dirección de clasificación.

Una vez ordenada la tabla, puede asegurarse de que los registros de la tabla se representen en orden usando `assertCanSeeTableRecords()` con el parámetro `inOrder`:

```php
use function Pest\Livewire\livewire;

it('can sort posts by title', function () {
    $posts = Post::factory()->count(10)->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->sortTable('title')
        ->assertCanSeeTableRecords($posts->sortBy('title'), inOrder: true)
        ->sortTable('title', 'desc')
        ->assertCanSeeTableRecords($posts->sortByDesc('title'), inOrder: true);
});
```

### Probando el estado de una columna

Para afirmar que una determinada columna tiene estado o no tiene estado para un registro puedes usar `assertTableColumnStateSet()` y ​​`assertTableColumnStateNotSet()`:

```php
use function Pest\Livewire\livewire;

it('can get post author names', function () {
    $posts = Post::factory()->count(10)->create();

    $post = $posts->first();

    livewire(PostResource\Pages\ListPosts::class)
        ->assertTableColumnStateSet('author.name', $post->author->name, record: $post)
        ->assertTableColumnStateNotSet('author.name', 'Anonymous', record: $post);
});
```

Para afirmar que una determinada columna tiene un estado formateado o no tiene un estado formateado para un registro puedes usar `assertTableColumnFormattedStateSet()` y ​​`assertTableColumnFormattedStateNotSet()`:

```php
use function Pest\Livewire\livewire;

it('can get post author names', function () {
    $post = Post::factory(['name' => 'John Smith'])->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->assertTableColumnFormattedStateSet('author.name', 'Smith, John', record: $post)
        ->assertTableColumnFormattedStateNotSet('author.name', $post->author->name, record: $post);
});
```

### Probando la existencia de una columna

Para asegurarse de que exista una columna, puede utilizar el método `assertTableColumnExists()`:

```php
use function Pest\Livewire\livewire;

it('has an author column', function () {
    livewire(PostResource\Pages\ListPosts::class)
        ->assertTableColumnExists('author');
});
```

Puede pasar una función como argumento adicional para afirmar que una columna pasa una "prueba de verdad" determinada. Esto es útil para afirmar que una columna tiene una configuración específica. También puede pasar un registro como tercer parámetro, lo cual es útil si su verificación depende de qué fila de la tabla se representa:

```php
use function Pest\Livewire\livewire;
use Filament\Tables\Columns\TextColumn;

it('has an author column', function () {
    $post = Post::factory()->create();
    
    livewire(PostResource\Pages\ListPosts::class)
        ->assertTableColumnExists('author', function (TextColumn $column): bool {
            return $column->getDescriptionBelow() === $post->subtitle;
        }, $post);
});
```

### Probando la visibilidad de una columna

Para asegurarse de que un usuario en particular no pueda ver una columna, puede utilizar los métodos `assertTableColumnVisible()` y ​​`assertTableColumnHidden()`:

```php
use function Pest\Livewire\livewire;

it('shows the correct columns', function () {
    livewire(PostResource\Pages\ListPosts::class)
        ->assertTableColumnVisible('created_at')
        ->assertTableColumnHidden('author');
});
```

### Probando la descripción de una columna

Para asegurarse de que una columna tenga la descripción correcta arriba o abajo, puede utilizar los métodos `assertTableColumnHasDescription()` y ​​`assertTableColumnDoesNotHaveDescription()`:

```php
use function Pest\Livewire\livewire;

it('has the correct descriptions above and below author', function () {
    $post = Post::factory()->create();

    livewire(PostsTable::class)
        ->assertTableColumnHasDescription('author', 'Author! ↓↓↓', $post, 'above')
        ->assertTableColumnHasDescription('author', 'Author! ↑↑↑', $post)
        ->assertTableColumnDoesNotHaveDescription('author', 'Author! ↑↑↑', $post, 'above')
        ->assertTableColumnDoesNotHaveDescription('author', 'Author! ↓↓↓', $post);
});
```

### Probando los atributos adicionales de una columna

Para asegurarse de que una columna tenga los atributos adicionales correctos, puede utilizar los métodos `assertTableColumnHasExtraAttributes()` y ​​`assertTableColumnDoesNotHaveExtraAttributes()`:

```php
use function Pest\Livewire\livewire;

it('displays author in red', function () {
    $post = Post::factory()->create();

    livewire(PostsTable::class)
        ->assertTableColumnHasExtraAttributes('author', ['class' => 'text-danger-500'], $post)
        ->assertTableColumnDoesNotHaveExtraAttributes('author', ['class' => 'text-primary-500'], $post);
});
```

### Probando las opciones en un `SelectColumn`

Si tiene una columna de selección, puede asegurarse de que tenga las opciones correctas con `assertTableSelectColumnHasOptions()` y ​​`assertTableSelectColumnDoesNotHaveOptions()`:

```php
use function Pest\Livewire\livewire;

it('has the correct statuses', function () {
    $post = Post::factory()->create();

    livewire(PostsTable::class)
        ->assertTableSelectColumnHasOptions('status', ['unpublished' => 'Unpublished', 'published' => 'Published'], $post)
        ->assertTableSelectColumnDoesNotHaveOptions('status', ['archived' => 'Archived'], $post);
});
```

## Filtros de prueba

Para filtrar los registros de la tabla, puede utilizar el método `filterTable()`, junto con `assertCanSeeTableRecords()` y ​​`assertCanNotSeeTableRecords()`:

```php
use function Pest\Livewire\livewire;

it('can filter posts by `is_published`', function () {
    $posts = Post::factory()->count(10)->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->assertCanSeeTableRecords($posts)
        ->filterTable('is_published')
        ->assertCanSeeTableRecords($posts->where('is_published', true))
        ->assertCanNotSeeTableRecords($posts->where('is_published', false));
});
```

Para un filtro simple, esto simplemente habilitará el filtro.

Si desea establecer el valor de `SelectFilter` o `TernaryFilter`, pase el valor como segundo argumento:

```php
use function Pest\Livewire\livewire;

it('can filter posts by `author_id`', function () {
    $posts = Post::factory()->count(10)->create();

    $authorId = $posts->first()->author_id;

    livewire(PostResource\Pages\ListPosts::class)
        ->assertCanSeeTableRecords($posts)
        ->filterTable('author_id', $authorId)
        ->assertCanSeeTableRecords($posts->where('author_id', $authorId))
        ->assertCanNotSeeTableRecords($posts->where('author_id', '!=', $authorId));
});
```

### Restablecer filtros en una prueba

Para restablecer todos los filtros a su estado original, llame a `resetTableFilters()`:

```php
use function Pest\Livewire\livewire;

it('can reset table filters', function () {
    $posts = Post::factory()->count(10)->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->resetTableFilters();
});
```

### Eliminación de filtros en una prueba

Para eliminar un solo filtro puedes usar `removeTableFilter()`:

```php
use function Pest\Livewire\livewire;

it('filters list by published', function () {
    $posts = Post::factory()->count(10)->create();

    $unpublishedPosts = $posts->where('is_published', false)->get();

    livewire(PostsTable::class)
        ->filterTable('is_published')
        ->assertCanNotSeeTableRecords($unpublishedPosts)
        ->removeTableFilter('is_published')
        ->assertCanSeeTableRecords($posts);
});
```

Para eliminar todos los filtros puedes usar `removeTableFilters()`:

```php
use function Pest\Livewire\livewire;

it('can remove all table filters', function () {
    $posts = Post::factory()->count(10)->forAuthor()->create();

    $unpublishedPosts = $posts
        ->where('is_published', false)
        ->where('author_id', $posts->first()->author->getKey());

    livewire(PostsTable::class)
        ->filterTable('is_published')
        ->filterTable('author', $author)
        ->assertCanNotSeeTableRecords($unpublishedPosts)
        ->removeTableFilters()
        ->assertCanSeeTableRecords($posts);
});
```

### Probando la visibilidad de un filtro

Para asegurarse de que un usuario en particular no pueda ver un filtro, puede utilizar los métodos `assertTableFilterVisible()` y ​​`assertTableFilterHidden()`:

```php
use function Pest\Livewire\livewire;

it('shows the correct filters', function () {
    livewire(PostsTable::class)
        ->assertTableFilterVisible('created_at')
        ->assertTableFilterHidden('author');
});
```

### Probando la existencia de un filtro

Para asegurarse de que exista un filtro, puede utilizar el método `assertTableFilterExists()`:

```php
use function Pest\Livewire\livewire;

it('has an author filter', function () {
    livewire(PostResource\Pages\ListPosts::class)
        ->assertTableFilterExists('author');
});
```

Puede pasar una función como argumento adicional para afirmar que un filtro pasa una "prueba de verdad" determinada. Esto es útil para afirmar que un filtro tiene una configuración específica:

```php
use function Pest\Livewire\livewire;
use Filament\Tables\Filters\SelectFilter;

it('has an author filter', function () {    
    livewire(PostResource\Pages\ListPosts::class)
        ->assertTableFilterExists('author', function (SelectFilter $column): bool {
            return $column->getLabel() === 'Select author';
        });
});
```

## Resúmenes de pruebas

Para probar que un cálculo resumido está funcionando, puede utilizar el método `assertTableColumnSummarySet()`:

```php
use function Pest\Livewire\livewire;

it('can average values in a column', function () {
    $posts = Post::factory()->count(10)->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->assertCanSeeTableRecords($posts)
        ->assertTableColumnSummarySet('rating', 'average', $posts->avg('rating'));
});
```

El primer argumento es el nombre de la columna, el segundo es el ID del resumidor y el tercero es el valor esperado.

Tenga en cuenta que los valores esperados y reales están normalizados, de modo que `123.12` se considera igual que `"123.12"` y ​​`['Fred', 'Jim']` es igual que `['Jim', 'Fred']`.

Puede establecer un ID de resumen pasándolo al método `make()`:

```php
use Filament\Tables\Columns\Summarizers\Average;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('rating')
    ->summarize(Average::make('average'))
```

El ID debe ser único entre los resumidores de esa columna.

### Resúmenes de prueba en una sola página de paginación

Para calcular el promedio de una sola página de paginación, utilice el argumento `isCurrentPaginationPageOnly`:

```php
use function Pest\Livewire\livewire;

it('can average values in a column', function () {
    $posts = Post::factory()->count(20)->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->assertCanSeeTableRecords($posts->take(10))
        ->assertTableColumnSummarySet('rating', 'average', $posts->take(10)->avg('rating'), isCurrentPaginationPageOnly: true);
});
```

### Probando un resumidor de rango

Para probar un rango, pase el valor mínimo y máximo a una matriz `[$minimum, $maximum]` de estilo tupla:

```php
use function Pest\Livewire\livewire;

it('can average values in a column', function () {
    $posts = Post::factory()->count(10)->create();

    livewire(PostResource\Pages\ListPosts::class)
        ->assertCanSeeTableRecords($posts)
        ->assertTableColumnSummarySet('rating', 'range', [$posts->min('rating'), $posts->max('rating')]);
});
```
