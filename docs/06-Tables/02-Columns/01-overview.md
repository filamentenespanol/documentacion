---
title: Visión general
---

## Introducción

Las clases de columnas se pueden encontrar en el namespace `Filament\Tables\Columns`. Residen dentro del método `$table->columns()`. Filament incluye varias columnas integradas:

- [Columna de texto](text)
- [Columna de icono](icon)
- [Columna de imagen](image)
- [Columna de color](color)

Las columnas editables permiten al usuario actualizar datos en la base de datos sin salir de la tabla:

- [Columna select](select)
- [Columna toggle](toggle)
- [Columna de entrada de texto](text-input)
- [Columna checkbox](checkbox)

También puedes [crear tus propias columnas personalizadas](custom-columns) para mostrar datos como desees.

Las columnas pueden crearse usando el método estático `make()`, pasando su nombre único. Usualmente, el nombre de una columna corresponde al nombre de un atributo en un modelo Eloquent. Puedes usar "notación de punto" para acceder a atributos dentro de relaciones:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')

TextColumn::make('author.name')
```

## Contenido de columna (estado)

Las columnas pueden parecer un poco mágicas al principio, pero están diseñadas para ser simples de usar y optimizadas para mostrar datos de un registro Eloquent. A pesar de esto, son flexibles y puedes mostrar datos de cualquier fuente, no solo un atributo de registro Eloquent.

Los datos que muestra una columna se llaman su "estado". Cuando usas un [recurso de panel](../resources), la tabla es consciente de los registros que está mostrando. Esto significa que el estado de la columna se establece basado en el valor del atributo en el registro. Por ejemplo, si la columna se usa en la tabla de un `PostResource`, entonces se mostrará el valor del atributo `title` del post actual.

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
```

Si quieres acceder al valor almacenado en una relación, puedes usar "notación de punto". El nombre de la relación de la que quieres acceder datos viene primero, seguido de un punto, y luego el nombre del atributo:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('author.name')
```

También puedes usar "notación de punto" para acceder a valores dentro de una columna JSON / array en un modelo Eloquent. El nombre del atributo viene primero, seguido de un punto, y luego la clave del objeto JSON que quieres leer:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('meta.title')
```

### Establecer el estado de una columna

Puedes pasar tu propio estado a una columna usando el método `state()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->state('¡Hola, mundo!')
```

El método `state()` también acepta una función para calcular dinámicamente el estado. Puedes inyectar varias utilidades en la función como parámetros.

### Establecer el estado por defecto de una columna

Cuando una columna está vacía (su estado es `null`), puedes usar el método `default()` para definir un estado alternativo a usar en su lugar. Este método tratará el estado por defecto como si fuera real, por lo que columnas como [imagen](image) o [color](color) mostrarán la imagen o color por defecto.

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->default('Sin título')
```

#### Añadir texto de marcador de posición si una columna está vacía

A veces puedes querer mostrar texto de marcador de posición para columnas con un estado vacío, que se estiliza como texto gris más claro. Esto difiere del [valor por defecto](#establecer-el-estado-por-defecto-de-una-columna), ya que el marcador de posición siempre es texto y no se trata como si fuera estado real.

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->placeholder('Sin título')
```

### Mostrar datos de relaciones

Puedes usar "notación de punto" para acceder a columnas dentro de relaciones. El nombre de la relación viene primero, seguido de un punto, seguido del nombre de la columna a mostrar:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('author.name')
```

#### Contar relaciones

Si deseas contar el número de registros relacionados en una columna, puedes usar el método `counts()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('users_count')->counts('users')
```

En este ejemplo, `users` es el nombre de la relación a contar. El nombre de la columna debe ser `users_count`, ya que esta es la convención que [Laravel usa](https://laravel.com/docs/eloquent-relationships#counting-related-models) para almacenar el resultado.

Si quieres delimitar la relación antes de contar, puedes pasar un array al método, donde la clave es el nombre de la relación y el valor es la función para delimitar la consulta Eloquent:

```php
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

TextColumn::make('users_count')->counts([
    'users' => fn (Builder $query) => $query->where('is_active', true),
])
```

#### Determinar existencia de relación

Si simplemente deseas indicar si existen registros relacionados en una columna, puedes usar el método `exists()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('users_exists')->exists('users')
```

En este ejemplo, `users` es el nombre de la relación para verificar existencia. El nombre de la columna debe ser `users_exists`, ya que esta es la convención que [Laravel usa](https://laravel.com/docs/eloquent-relationships#other-aggregate-functions) para almacenar el resultado.

Si quieres delimitar la relación antes de verificar existencia, puedes pasar un array al método, donde la clave es el nombre de la relación y el valor es la función para delimitar la consulta Eloquent:

```php
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

TextColumn::make('users_exists')->exists([
    'users' => fn (Builder $query) => $query->where('is_active', true),
])
```

#### Agregar relaciones

Filament proporciona varios métodos para agregar un campo de relación, incluyendo `avg()`, `max()`, `min()` y `sum()`. Por ejemplo, si deseas mostrar el promedio de un campo en todos los registros relacionados en una columna, puedes usar el método `avg()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('users_avg_age')->avg('users', 'age')
```

En este ejemplo, `users` es el nombre de la relación, mientras que `age` es el campo que se está promediando. El nombre de la columna debe ser `users_avg_age`, ya que esta es la convención que [Laravel usa](https://laravel.com/docs/eloquent-relationships#other-aggregate-functions) para almacenar el resultado.

Si quieres delimitar la relación antes de agregar, puedes pasar un array al método, donde la clave es el nombre de la relación y el valor es la función para delimitar la consulta Eloquent:

```php
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

TextColumn::make('users_avg_age')->avg([
    'users' => fn (Builder $query) => $query->where('is_active', true),
], 'age')
```

## Establecer la etiqueta de una columna

Por defecto, la etiqueta de la columna, que se muestra en el encabezado de la tabla, se genera a partir del nombre de la columna. Puedes personalizar esto usando el método `label()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->label('Nombre completo')
```

Además de permitir un valor estático, el método `label()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

Personalizar la etiqueta de esta manera es útil si deseas usar una [cadena de traducción para localización](https://laravel.com/docs/localization#retrieving-translation-strings):

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->label(__('columns.name'))
```

## Ordenación

Las columnas pueden ser ordenables, haciendo clic en la etiqueta de la columna. Para hacer una columna ordenable, debes usar el método `sortable()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->sortable()
```

Usando el nombre de la columna, Filament aplicará una cláusula `orderBy()` a la consulta Eloquent. Esto es útil para casos simples donde el nombre de la columna coincide con el nombre de la columna de la base de datos. También puede manejar [relaciones](#mostrar-datos-de-relaciones).

Sin embargo, muchas columnas no son tan simples. El [estado](#contenido-de-columna-estado) de la columna podría estar personalizado, o usar un [accessor de Eloquent](https://laravel.com/docs/eloquent-mutators#accessors-and-mutators). En este caso, puedes necesitar personalizar el comportamiento de ordenación.

Puedes pasar un array de columnas reales de la base de datos en la tabla para ordenar la columna:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('full_name')
    ->sortable(['first_name', 'last_name'])
```

En esta instancia, la columna `full_name` no es una columna real en la base de datos, pero las columnas `first_name` y `last_name` sí lo son. Cuando se ordena la columna `full_name`, Filament ordenará la tabla por las columnas `first_name` y `last_name`. La razón por la que se pasan dos columnas es que si dos registros tienen el mismo `first_name`, se usará el `last_name` para ordenarlos. Si tu caso de uso no requiere esto, puedes pasar solo una columna en el array si lo deseas.

También puedes interactuar directamente con la consulta Eloquent para personalizar cómo se aplica la ordenación para esa columna:

```php
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

TextColumn::make('full_name')
    ->sortable(query: function (Builder $query, string $direction): Builder {
        return $query
            ->orderBy('last_name', $direction)
            ->orderBy('first_name', $direction);
    })
```

La función del parámetro `query` puede inyectar varias utilidades como parámetros.

### Ordenar por defecto

Puedes elegir ordenar una tabla por defecto si no se aplica ninguna otra ordenación. Puedes usar el método `defaultSort()` para esto:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->defaultSort('stock', direction: 'desc');
}
```

El segundo parámetro es opcional y por defecto es `'asc'`.

Si pasas el nombre de una columna de tabla como primer parámetro, Filament usará el comportamiento de ordenación de esa columna (columnas de ordenación personalizadas o función de consulta). Sin embargo, si necesitas ordenar por una columna que no existe en la tabla o en la base de datos, debes pasar una función de consulta en su lugar:

```php
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->defaultSort(function (Builder $query): Builder {
            return $query->orderBy('stock');
        });
}
```

### Persistir la ordenación en la sesión del usuario

Para persistir la ordenación en la sesión del usuario, usa el método `persistSortInSession()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->persistSortInSession();
}
```

### Establecer una etiqueta de opción de ordenación por defecto

Para establecer una etiqueta de opción de ordenación por defecto, usa el método `defaultSortOptionLabel()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->defaultSortOptionLabel('Fecha');
}
```

## Deshabilitar ordenación por clave primaria por defecto

Por defecto, Filament añadirá automáticamente una ordenación por clave primaria a la consulta de la tabla para asegurar que el orden de los registros sea consistente. Si tu tabla no tiene una clave primaria, o deseas deshabilitar este comportamiento, puedes usar el método `defaultKeySort(false)`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->defaultKeySort(false);
}
```

## Búsqueda

Las columnas pueden ser buscables usando el campo de entrada de texto en la parte superior derecha de la tabla. Para hacer una columna buscable, debes usar el método `searchable()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->searchable()
```

Por defecto, Filament aplicará una cláusula `where` a la consulta Eloquent, buscando el nombre de la columna. Esto es útil para casos simples donde el nombre de la columna coincide con el nombre de la columna de la base de datos. También puede manejar [relaciones](#mostrar-datos-de-relaciones).

Sin embargo, muchas columnas no son tan simples. El [estado](#contenido-de-columna-estado) de la columna podría estar personalizado, o usar un [accessor de Eloquent](https://laravel.com/docs/eloquent-mutators#accessors-and-mutators). En este caso, puedes necesitar personalizar el comportamiento de búsqueda.

Puedes pasar un array de columnas reales de la base de datos en la tabla para buscar la columna:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('full_name')
    ->searchable(['first_name', 'last_name'])
```

En esta instancia, la columna `full_name` no es una columna real en la base de datos, pero las columnas `first_name` y `last_name` sí lo son. Cuando se busca la columna `full_name`, Filament buscará en la tabla por las columnas `first_name` y `last_name`.

También puedes interactuar directamente con la consulta Eloquent para personalizar cómo se aplica la búsqueda para esa columna:

```php
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

TextColumn::make('full_name')
    ->searchable(query: function (Builder $query, string $search): Builder {
        return $query
            ->where('first_name', 'like', "%{$search}%")
            ->orWhere('last_name', 'like', "%{$search}%");
    })
```

La función del parámetro `query` puede inyectar varias utilidades como parámetros.

### Añadir columnas buscables adicionales a la tabla

Puedes permitir que la tabla busque con columnas adicionales que no están presentes en la tabla pasando un array de nombres de columnas al método `searchable()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->searchable(['id']);
}
```

Puedes usar notación de punto para buscar dentro de relaciones:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->searchable(['id', 'author.id']);
}
```

También puedes pasar funciones personalizadas para buscar usando:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->searchable([
            'id',
            'author.id',
            function (Builder $query, string $search): Builder {
                if (! is_numeric($search)) {
                    return $query;
                }

                return $query->whereYear('published_at', $search);
            },
        ]);
}
```

### Personalizar el marcador de posición del campo de búsqueda de tabla

Puedes personalizar el marcador de posición en el campo de búsqueda usando el método `searchPlaceholder()` en la `$table`:

```php
use Filament\Tables\Table;

public static function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->searchPlaceholder('Buscar (ID, Nombre)');
}
```

### Búsqueda individual

Puedes elegir habilitar un campo de entrada de búsqueda por columna usando el parámetro `isIndividual`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->searchable(isIndividual: true)
```

Si usas el parámetro `isIndividual`, aún puedes buscar esa columna usando el campo de entrada de búsqueda "global" principal para toda la tabla.

Para deshabilitar esa funcionalidad mientras preservas la funcionalidad de búsqueda individual, necesitas el parámetro `isGlobal`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->searchable(isIndividual: true, isGlobal: false)
```

### Personalizar el debounce de búsqueda de tabla

Puedes personalizar el tiempo de debounce en todos los campos de búsqueda de tabla usando el método `searchDebounce()` en la `$table`. Por defecto, está establecido en `500ms`:

```php
use Filament\Tables\Table;

public static function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->searchDebounce('750ms');
}
```

### Buscar cuando la entrada pierde el foco

En lugar de recargar automáticamente el contenido de la tabla mientras el usuario está escribiendo su búsqueda, que se ve afectado por el [debounce](#personalizar-el-debounce-de-busqueda-de-tabla) del campo de búsqueda, puedes cambiar el comportamiento para que la tabla solo se busque cuando el usuario desenfoque la entrada (tabulador o clic fuera de ella), usando el método `searchOnBlur()`:

```php
use Filament\Tables\Table;

public static function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->searchOnBlur();
}
```

### Persistir la búsqueda en la sesión del usuario

Para persistir la búsqueda de tabla o columna individual en la sesión del usuario, usa el método `persistSearchInSession()` o `persistColumnSearchInSession()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->persistSearchInSession()
        ->persistColumnSearchesInSession();
}
```

### Deshabilitar división de términos de búsqueda

Por defecto, la búsqueda de tabla dividirá el término de búsqueda en palabras individuales y buscará cada palabra por separado. Esto permite consultas de búsqueda más flexibles. Sin embargo, puede tener un impacto negativo en el rendimiento cuando se involucran grandes conjuntos de datos. Puedes deshabilitar este comportamiento usando el método `splitSearchTerms(false)` en la tabla:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->splitSearchTerms(false);
}
```

## Contenido de celda clicable

Cuando se hace clic en una celda, puedes abrir una URL o activar una "acción".

### Abrir URLs

Para abrir una URL, puedes usar el método `url()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->url(fn (Post $record): string => route('posts.edit', ['post' => $record]))
```

El método `url()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

:::tip
También puedes elegir una URL para que toda la fila se abra, no solo una columna singular. Por favor ve la [sección de URLs de Registro](../overview#record-urls-clickable-rows).

Cuando uses una URL de registro y una URL de columna, la URL de columna anulará la URL de registro solo para esas celdas.
:::

También puedes elegir abrir la URL en una nueva pestaña:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->url(fn (Post $record): string => route('posts.edit', ['post' => $record]))
    ->openUrlInNewTab()
```

### Activar acciones

Para ejecutar una función cuando se hace clic en una celda, puedes usar el método `action()`. Cada método acepta un parámetro `$record` que puedes usar para personalizar el comportamiento de la acción:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->action(function (Post $record): void {
        $this->dispatch('open-post-edit-modal', post: $record->getKey());
    })
```

#### Modales de acción

Puedes abrir [modales de acción](../../actions#modals) pasando un objeto `Action` al método `action()`:

```php
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->action(
        Action::make('select')
            ->requiresConfirmation()
            ->action(function (Post $record): void {
                $this->dispatch('select-post', post: $record->getKey());
            }),
    )
```

Los objetos de acción pasados al método `action()` deben tener un nombre único para distinguirlo de otras acciones dentro de la tabla.

#### Prevenir que las celdas sean clicables

Puedes prevenir que una celda sea clicable usando el método `disabledClick()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->disabledClick()
```

Si las [URLs de fila](../overview#record-urls-clickable-rows) están habilitadas, la celda no será clicable.

## Añadir un tooltip a una columna

Puedes especificar un tooltip para mostrar cuando pasas el cursor sobre una celda:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('title')
    ->tooltip('Título')
```

Además de permitir un valor estático, el método `tooltip()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

## Alinear contenido de columna

### Alinear horizontalmente el contenido de columna

Puedes alinear el contenido de una columna al inicio (izquierda en interfaces de izquierda a derecha, derecha en interfaces de derecha a izquierda), centro, o final (derecha en interfaces de izquierda a derecha, izquierda en interfaces de derecha a izquierda) usando los métodos `alignStart()`, `alignCenter()` o `alignEnd()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('email')
    ->alignStart() // Esta es la alineación por defecto.

TextColumn::make('email')
    ->alignCenter()

TextColumn::make('email')
    ->alignEnd()
```

Alternativamente, puedes pasar un enum `Alignment` al método `alignment()`:

```php
use Filament\Support\Enums\Alignment;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('email')
    ->label('Dirección de email')
    ->alignment(Alignment::End)
```

Además de permitir un valor estático, el método `alignment()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

### Alinear verticalmente el contenido de columna

Puedes alinear el contenido de una columna al inicio, centro, o final usando los métodos `verticallyAlignStart()`, `verticallyAlignCenter()` o `verticallyAlignEnd()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->verticallyAlignStart()

TextColumn::make('name')
    ->verticallyAlignCenter() // Esta es la alineación por defecto.

TextColumn::make('name')
    ->verticallyAlignEnd()
```

Alternativamente, puedes pasar un enum `VerticalAlignment` al método `verticalAlignment()`:

```php
use Filament\Support\Enums\VerticalAlignment;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->verticalAlignment(VerticalAlignment::Start)
```

Además de permitir un valor estático, el método `verticalAlignment()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

## Permitir que los encabezados de columna se ajusten

Por defecto, los encabezados de columna no se ajustarán a múltiples líneas si necesitan más espacio. Puedes permitir que se ajusten usando el método `wrapHeader()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->wrapHeader()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el encabezado debe ajustarse:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->wrapHeader(FeatureFlag::active())
```

El método `wrapHeader()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

## Controlar el ancho de las columnas

Por defecto, las columnas tomarán tanto espacio como necesiten. Puedes permitir que algunas columnas consuman más espacio que otras usando el método `grow()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->grow()
```

Alternativamente, puedes definir un ancho para la columna, que se pasa a la celda del encabezado usando el atributo `style`, por lo que puedes usar cualquier valor CSS válido:

```php
use Filament\Tables\Columns\IconColumn;

IconColumn::make('is_paid')
    ->label('Pagado')
    ->boolean()
    ->width('1%')
```

El método `width()` también acepta una función para calcular dinámicamente el valor. Puedes inyectar varias utilidades en la función como parámetros.

## Agrupar columnas

Puedes agrupar múltiples columnas juntas bajo un solo encabezado usando un objeto `ColumnGroup`:

```php
use Filament\Tables\Columns\ColumnGroup;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('title'),
            TextColumn::make('slug'),
            ColumnGroup::make('Visibilidad', [
                TextColumn::make('status'),
                IconColumn::make('is_featured'),
            ]),
            TextColumn::make('author.name'),
        ]);
}
```

El primer argumento es la etiqueta del grupo, y el segundo es un array de objetos de columna que pertenecen a ese grupo.

También puedes controlar la [alineación](#alinear-horizontalmente-el-contenido-de-columna) y [ajuste](#permitir-que-los-encabezados-de-columna-se-ajusten) del encabezado del grupo en el objeto `ColumnGroup`. Para mejorar la fluidez multilínea de la API, puedes encadenar el `columns()` al objeto en lugar de pasarlo como segundo argumento:

```php
use Filament\Support\Enums\Alignment;
use Filament\Tables\Columns\ColumnGroup;

ColumnGroup::make('Visibilidad del sitio web')
    ->columns([
        // ...
    ])
    ->alignCenter()
    ->wrapHeader()
```

## Ocultar columnas

Puedes ocultar una columna usando el método `hidden()` o `visible()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('email')
    ->hidden()

TextColumn::make('email')
    ->visible()
```

Para ocultar una columna condicionalmente, puedes pasar un valor booleano a cualquier método:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('role')
    ->hidden(FeatureFlag::active())

TextColumn::make('role')
    ->visible(FeatureFlag::active())
```

### Permitir a los usuarios gestionar columnas

#### Alternar visibilidad de columna

Los usuarios pueden ocultar o mostrar columnas ellos mismos en la tabla. Para hacer una columna alternativa, usa el método `toggleable()`:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('email')
    ->toggleable()
```

##### Hacer columnas alternativas ocultas por defecto

Por defecto, las columnas alternativas son visibles. Para hacerlas ocultas en su lugar:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('id')
    ->toggleable(isToggledHiddenByDefault: true)
```

#### Reordenar columnas

Puedes permitir que las columnas se reordenen en la tabla usando el método `reorderableColumns()`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->reorderableColumns();
}
```

#### Gestor de columnas en vivo

Por defecto, los cambios del gestor de columnas (alternar y reordenar columnas) se difieren y no afectan la tabla, hasta que el usuario hace clic en un botón "Aplicar". Para deshabilitar esto y hacer los filtros "en vivo" en su lugar, usa el método `deferColumnManager(false)`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->reorderableColumns()
        ->deferColumnManager(false);
}
```

#### Personalizar la acción de activación del dropdown del gestor de columnas

Para personalizar el botón de activación del dropdown del gestor de columnas, puedes usar el método `columnManagerTriggerAction()`, pasando un closure que devuelve una acción. Todos los métodos que están disponibles para [personalizar botones de activación de acciones](../actions/overview) pueden usarse:

```php
use Filament\Actions\Action;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->filters([
            // ...
        ])
        ->columnManagerTriggerAction(
            fn (Action $action) => $action
                ->button()
                ->label('Gestor de Columnas'),
        );
}
```

## Añadir atributos HTML adicionales al contenido de una columna

Puedes pasar atributos HTML adicionales al contenido de la columna a través del método `extraAttributes()`, que se fusionarán en su elemento HTML externo. Los atributos deben representarse por un array, donde la clave es el nombre del atributo y el valor es el valor del atributo:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('slug')
    ->extraAttributes(['class' => 'slug-column'])
```

Además de permitir un valor estático, el método `extraAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

Por defecto, llamar `extraAttributes()` múltiples veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.

### Añadir atributos HTML adicionales a la celda

También puedes pasar atributos HTML adicionales a la celda de la tabla que rodea el contenido de la columna:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('slug')
    ->extraCellAttributes(['class' => 'slug-cell'])
```

Además de permitir un valor estático, el método `extraCellAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

Por defecto, llamar `extraCellAttributes()` múltiples veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.

### Añadir atributos adicionales a la celda del encabezado

Puedes pasar atributos HTML adicionales a la celda del encabezado de la tabla que rodea el contenido de la columna:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('slug')
    ->extraHeaderAttributes(['class' => 'slug-header-cell'])
```

Además de permitir un valor estático, el método `extraHeaderAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

Por defecto, llamar `extraHeaderAttributes()` múltiples veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.

## Inyección de utilidades de columna

La gran mayoría de métodos usados para configurar columnas aceptan funciones como parámetros en lugar de valores codificados:

```php
use App\Models\User;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('email')
    ->placeholder(fn (User $record): string => "Sin email para {$record->name}")

TextColumn::make('role')
    ->hidden(fn (User $record): bool => $record->role === 'admin')

TextColumn::make('name')
    ->extraAttributes(fn (User $record): array => ['class' => "{$record->getKey()}-name-column"])
```

Esto solo desbloquea muchas posibilidades de personalización.

El paquete también es capaz de inyectar muchas utilidades para usar dentro de estas funciones, como parámetros. Todos los métodos de personalización que aceptan funciones como argumentos pueden inyectar utilidades.

Estas utilidades inyectadas requieren nombres de parámetros específicos para ser usados. De lo contrario, Filament no sabe qué inyectar.

### Inyectar el estado actual de la columna

Si deseas acceder al [valor (estado)](#contenido-de-columna-estado) actual de la columna, define un parámetro `$state`:

```php
function ($state) {
    // ...
}
```

### Inyectar el registro Eloquent actual

Puedes recuperar el registro Eloquent para el esquema actual usando un parámetro `$record`:

```php
use Illuminate\Database\Eloquent\Model;

function (?Model $record) {
    // ...
}
```

### Inyectar el bucle de fila

Para acceder al objeto [bucle de fila](https://laravel.com/docs/blade#the-loop-variable) para la fila actual de la tabla, define un parámetro `$rowLoop`:

```php
function (stdClass $rowLoop) {
    // ...
}
```

### Inyectar la instancia actual del componente Livewire

Si deseas acceder a la instancia actual del componente Livewire, define un parámetro `$livewire`:

```php
use Livewire\Component;

function (Component $livewire) {
    // ...
}
```

### Inyectar la instancia actual de la columna

Si deseas acceder a la instancia actual del componente, define un parámetro `$component`:

```php
use Filament\Tables\Columns\Column;

function (Column $component) {
    // ...
}
```

### Inyectar la instancia actual de la tabla

Si deseas acceder a la instancia actual de la tabla, define un parámetro `$table`:

```php
use Filament\Tables\Table;

function (Table $table) {
    // ...
}
```

### Inyectar múltiples utilidades

Los parámetros se inyectan dinámicamente usando reflexión, por lo que puedes combinar múltiples parámetros en cualquier orden:

```php
use App\Models\User;
use Livewire\Component as Livewire;

function (Livewire $livewire, mixed $state, User $record) {
    // ...
}
```

### Inyectar dependencias del contenedor de Laravel

Puedes inyectar cualquier cosa del contenedor de Laravel como normal, junto con utilidades:

```php
use App\Models\User;
use Illuminate\Http\Request;

function (Request $request, User $record) {
    // ...
}
```

## Configuraciones globales

Si deseas cambiar el comportamiento por defecto de todas las columnas globalmente, entonces puedes llamar al método estático `configureUsing()` dentro del método `boot()` de un proveedor de servicios, al cual pasas un Closure para modificar las columnas usando. Por ejemplo, si deseas hacer todas las columnas `TextColumn` [`toggleable()`](#alternar-visibilidad-de-columna), puedes hacerlo así:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::configureUsing(function (TextColumn $column): void {
    $column->toggleable();
});
```

Por supuesto, aún puedes sobrescribir esto en cada columna individualmente:

```php
use Filament\Tables\Columns\TextColumn;

TextColumn::make('name')
    ->toggleable(false)
```
