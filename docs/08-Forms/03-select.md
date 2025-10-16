---
title: Select
---

## Introducción

El componente select te permite elegir de una lista de opciones predefinidas:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un array estático, el método <code>options()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Habilitar el select en JavaScript

Por defecto, Filament usa el select nativo de HTML5. Puedes habilitar un select en JavaScript más personalizable usando el método `native(false)`:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->native(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>native()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Buscar opciones

Puedes habilitar un input de búsqueda para facilitar el acceso a muchas opciones usando el método `searchable()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->label('Author')
    ->options(User::query()->pluck('name', 'id'))
    ->searchable()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el input debe ser buscable o no:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->label('Author')
    ->options(User::query()->pluck('name', 'id'))
    ->searchable(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>searchable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Devolver resultados de búsqueda personalizados

Si tienes muchas opciones y quieres poblarlas en base a una búsqueda en base de datos u otra fuente externa, puedes usar los métodos `getSearchResultsUsing()` y `getOptionLabelUsing()` en lugar de `options()`.

El método `getSearchResultsUsing()` acepta un callback que devuelve resultados de búsqueda en formato `$key => $value`. La búsqueda del usuario actual está disponible como `$search`, y debes usarla para filtrar tus resultados.

El método `getOptionLabelUsing()` acepta un callback que transforma la opción seleccionada `$value` en una etiqueta. Se usa cuando el formulario se carga por primera vez y el usuario aún no ha buscado. De lo contrario, no estaría disponible la etiqueta para mostrar la opción seleccionada actualmente.

Ambos `getSearchResultsUsing()` y `getOptionLabelUsing()` deben usarse en el select si quieres proporcionar resultados de búsqueda personalizados:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->searchable()
    ->getSearchResultsUsing(fn (string $search): array => User::query()
        ->where('name', 'like', "%{$search}%")
        ->limit(50)
        ->pluck('name', 'id')
        ->all())
    ->getOptionLabelUsing(fn ($value): ?string => User::find($value)?->name),
```

`getOptionLabelUsing()` es crucial, ya que proporciona a Filament la etiqueta de la opción seleccionada, por lo que no necesita ejecutar una búsqueda completa para encontrarla. Si una opción no es válida, debe devolver `null`.

<details>
  <summary>Inyección de utilidades</summary>
  Puedes inyectar varias utilidades en estas funciones como parámetros.
</details>

### Establecer un mensaje de carga personalizado

Cuando usas un select o multi-select con búsqueda, puedes mostrar un mensaje personalizado mientras se cargan las opciones usando `loadingMessage()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->loadingMessage('Loading authors...')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>loadingMessage()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Establecer un mensaje de "sin resultados"

Cuando usas un select o multi-select con búsqueda, puedes mostrar un mensaje personalizado cuando no se encuentran resultados con `noSearchResultsMessage()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->noSearchResultsMessage('No authors found.')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>noSearchResultsMessage()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Establecer un mensaje de sugerencia de búsqueda

Cuando usas un select o multi-select con búsqueda, puedes mostrar un mensaje personalizado cuando el usuario aún no ha introducido un término de búsqueda usando `searchPrompt()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable(['name', 'email'])
    ->searchPrompt('Search authors by their name or email address')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>searchPrompt()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Establecer un mensaje de "buscando"

Cuando usas un select o multi-select con búsqueda, puedes mostrar un mensaje personalizado mientras se cargan los resultados con `searchingMessage()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->searchingMessage('Searching authors...')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>searchingMessage()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Ajustar el debounce de búsqueda

Por defecto, Filament esperará 1000 milisegundos (1 segundo) antes de buscar opciones cuando el usuario teclee en un select o multi-select con búsqueda. También esperará 1000 ms entre búsquedas si el usuario sigue escribiendo. Puedes cambiarlo con `searchDebounce()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->searchDebounce(500)
```

Asegúrate de no bajarlo demasiado, ya que puede volver el select lento e irresponsive por el alto número de solicitudes.

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>searchDebounce()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Multi-select

El método `multiple()` en el componente `Select` te permite seleccionar múltiples valores de la lista de opciones:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
```

Opcionalmente, puedes pasar un booleano para controlar si el input debe permitir múltiples valores o no:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple(FeatureFlag::active())
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>multiple()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

Estas opciones se devuelven en formato JSON. Si las guardas con Eloquent, asegúrate de añadir un cast `array` a la propiedad del modelo:

```php
use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'technologies' => 'array',
        ];
    }

    // ...
}
```

Si estás [devolviendo resultados de búsqueda personalizados](#devolver-resultados-de-búsqueda-personalizados), debes definir `getOptionLabelsUsing()` en lugar de `getOptionLabelUsing()`. Se pasará `$values` al callback en lugar de `$value`, y debes devolver un array `$key => $value` de etiquetas y sus valores correspondientes:

```php
Select::make('technologies')
    ->multiple()
    ->searchable()
    ->getSearchResultsUsing(fn (string $search): array => Technology::query()
        ->where('name', 'like', "%{$search}%")
        ->limit(50)
        ->pluck('name', 'id')
        ->all())
    ->getOptionLabelsUsing(fn (array $values): array => Technology::query()
        ->whereIn('id', $values)
        ->pluck('name', 'id')
        ->all()),
```

`getOptionLabelsUsing()` es crucial, ya que proporciona a Filament las etiquetas de las opciones ya seleccionadas, por lo que no necesita ejecutar una búsqueda completa para encontrarlas. También se usa para [validar](#valid-options-validation-in-rule) que las opciones seleccionadas por el usuario sean válidas. Si una opción no es válida, no debe estar presente en el array devuelto por `getOptionLabelsUsing()`.

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>getOptionLabelsUsing()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

## Agrupar opciones

Puedes agrupar opciones bajo una etiqueta para organizarlas mejor. Para ello, puedes pasar un array de grupos a `options()` o donde normalmente pasarías un array de opciones. Las claves del array se usan como etiquetas de grupo, y los valores son arrays de opciones dentro de ese grupo:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->searchable()
    ->options([
        'In Process' => [
            'draft' => 'Draft',
            'reviewing' => 'Reviewing',
        ],
        'Reviewed' => [
            'published' => 'Published',
            'rejected' => 'Rejected',
        ],
    ])
```

## Integración con una relación de Eloquent

Puedes usar el método `relationship()` de `Select` para configurar una relación `BelongsTo` desde la que recuperar opciones automáticamente. `titleAttribute` es el nombre de la columna que se usará para generar la etiqueta de cada opción:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
```

El método `multiple()` puede usarse junto con `relationship()` para usar una relación `BelongsToMany`. Filament cargará las opciones de la relación y las guardará en la tabla pivote al enviar el formulario. Si no se proporciona `name`, Filament usará el nombre del campo como nombre de la relación:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->relationship(titleAttribute: 'name')
```

:::warning
Al usar `disabled()` con `multiple()` y `relationship()`, asegúrate de llamar a `disabled()` antes que a `relationship()`. Esto garantiza que la llamada a `dehydrated()` desde `relationship()` no sea sobrescrita por la llamada desde `disabled()`:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->disabled()
    ->relationship(titleAttribute: 'name')
```
:::

### Buscar opciones de la relación en múltiples columnas

Por defecto, si el select también es buscable, Filament devolverá resultados de la relación basados en la columna de título. Si deseas buscar en múltiples columnas, puedes pasar un array de columnas a `searchable()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable(['name', 'email'])
```

### Precargar opciones de la relación

Si deseas poblar las opciones buscables desde la base de datos al cargar la página, en lugar de cuando el usuario busque, puedes usar `preload()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->preload()
```

Opcionalmente, puedes pasar un booleano para controlar si el input debe precargarse o no:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->preload(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>preload()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Excluir el registro actual

Al trabajar con relaciones recursivas, probablemente quieras eliminar el registro actual de los resultados.

Esto puede hacerse fácilmente usando el argumento `ignoreRecord`:

```php
use Filament\Forms\Components\Select;

Select::make('parent_id')
    ->relationship(name: 'parent', titleAttribute: 'name', ignoreRecord: true)
```

### Personalizar la consulta de la relación

Puedes personalizar la consulta que recupera opciones usando el tercer parámetro de `relationship()`:

```php
use Filament\Forms\Components\Select;
use Illuminate\Database\Eloquent\Builder;

Select::make('author_id')
    ->relationship(
        name: 'author',
        titleAttribute: 'name',
        modifyQueryUsing: fn (Builder $query) => $query->withTrashed(),
    )
```

<details>
  <summary>Inyección de utilidades</summary>
  El argumento <code>modifyQueryUsing</code> puede inyectar varias utilidades en la función como parámetros.
</details>

### Personalizar las etiquetas de opciones de la relación

Si deseas personalizar la etiqueta de cada opción, por ejemplo para que sea más descriptiva o concatenar nombre y apellido, puedes usar una columna virtual en tu migración:

```php
$table->string('full_name')->virtualAs('concat(first_name, \' \', last_name)');
```

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'full_name')
```

Alternativamente, puedes usar `getOptionLabelFromRecordUsing()` para transformar el modelo Eloquent de una opción en una etiqueta:

```php
use Filament\Forms\Components\Select;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

Select::make('author_id')
    ->relationship(
        name: 'author',
        modifyQueryUsing: fn (Builder $query) => $query->orderBy('first_name')->orderBy('last_name'),
    )
    ->getOptionLabelFromRecordUsing(fn (Model $record) => "{$record->first_name} {$record->last_name}")
    ->searchable(['first_name', 'last_name'])
```

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>getOptionLabelFromRecordUsing()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

### Guardar datos pivote en la relación

Si usas una relación `multiple()` y tu tabla pivote tiene columnas adicionales, puedes usar `pivotData()` para especificar los datos que deben guardarse en ellas:

```php
use Filament\Forms\Components\Select;

Select::make('primaryTechnologies')
    ->relationship(name: 'technologies', titleAttribute: 'name')
    ->multiple()
    ->pivotData([
        'is_primary' => true,
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>pivotData()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Crear una nueva opción en un modal

Puedes definir un formulario personalizado que se usará para crear un nuevo registro y adjuntarlo a la relación `BelongsTo`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->createOptionForm([
        Forms\Components\TextInput::make('name')
            ->required(),
        Forms\Components\TextInput::make('email')
            ->required()
            ->email(),
    ]),
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>createOptionForm()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

El formulario se abre en un modal, donde el usuario puede rellenarlo. Al enviar el formulario, el nuevo registro es seleccionado por el campo.

### Personalizar la creación de nuevas opciones

Puedes personalizar el proceso de creación de la nueva opción definida en el formulario usando `createOptionUsing()`, que debe devolver la clave primaria del nuevo registro:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->createOptionForm([
       // ...
    ])
    ->createOptionUsing(function (array $data): int {
        return auth()->user()->team->members()->create($data)->getKey();
    }),
```

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>createOptionUsing()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

### Editar la opción seleccionada en un modal

Puedes definir un formulario personalizado que se usará para editar el registro seleccionado y guardarlo de nuevo en la relación `BelongsTo`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->editOptionForm([
        Forms\Components\TextInput::make('name')
            ->required(),
        Forms\Components\TextInput::make('email')
            ->required()
            ->email(),
    ]),
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>editOptionForm()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

El formulario se abre en un modal, donde el usuario puede rellenarlo. Al enviar el formulario, los datos del formulario se guardan de nuevo en el registro.

### Personalizar actualizaciones de opciones

Puedes personalizar el proceso de actualización de la opción seleccionada definida en el formulario usando `updateOptionUsing()`. El registro Eloquent actual que se está editando puede obtenerse usando `getRecord()` en el schema:

```php
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->editOptionForm([
       // ...
    ])
    ->updateOptionUsing(function (array $data, Schema $schema) {
        $schema->getRecord()?->update($data);
    }),
```

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>updateOptionUsing()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

### Manejar relaciones `MorphTo`

Las relaciones `MorphTo` son especiales, ya que permiten seleccionar registros de varios modelos diferentes. Por ello, tenemos un componente dedicado `MorphToSelect` que en realidad no es un campo select único, sino 2 selects dentro de un fieldset. El primer select permite elegir el tipo, y el segundo permite seleccionar el registro de ese tipo.

Para usar `MorphToSelect`, debes pasar `types()` al componente, que le indica cómo renderizar opciones para diferentes tipos:

```php
use Filament\Forms\Components\MorphToSelect;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->titleAttribute('name'),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title'),
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>types()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

#### Personalizar las etiquetas de opción para cada tipo morph

`titleAttribute()` se usa para extraer los títulos de cada producto o post. Si deseas personalizar la etiqueta de cada opción, puedes usar `getOptionLabelFromRecordUsing()` para transformar el modelo Eloquent en una etiqueta:

```php
use Filament\Forms\Components\MorphToSelect;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->getOptionLabelFromRecordUsing(fn (Product $record): string => "{$record->name} - {$record->slug}"),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title'),
    ])
```

#### Personalizar la consulta de relación para cada tipo morph

Puedes personalizar la consulta que recupera opciones usando `modifyOptionsQueryUsing()`:

```php
use Filament\Forms\Components\MorphToSelect;
use Illuminate\Database\Eloquent\Builder;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->titleAttribute('name')
            ->modifyOptionsQueryUsing(fn (Builder $query) => $query->whereBelongsTo($this->team)),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title')
            ->modifyOptionsQueryUsing(fn (Builder $query) => $query->whereBelongsTo($this->team)),
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>modifyOptionsQueryUsing()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

:::tip
Muchas de las mismas opciones del campo select están disponibles para `MorphToSelect`, incluyendo `searchable()`, `preload()`, `native()`, `allowHtml()` y `optionsLimit()`.
:::

#### Personalizar los selects del morph

Puedes personalizar aún más el select de "clave" para un tipo morph específico usando `modifyKeySelectUsing()`:

```php
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->titleAttribute('name')
            ->modifyKeySelectUsing(fn (Select $select): Select => $select
                ->createOptionForm([
                    TextInput::make('title')
                        ->required(),
                ])
                ->createOptionUsing(function (array $data): int {
                    return Product::create($data)->getKey();
                })),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title'),
    ])
```

Esto es útil si quieres personalizar el select de "clave" para cada tipo morph individualmente. Si quieres personalizar la clave para todos los tipos, puedes usar `modifyKeySelectUsing()` en el propio componente `MorphToSelect`:

```php
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Select;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->titleAttribute('name'),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title'),
    ])
    ->modifyKeySelectUsing(fn (Select $select): Select => $select->native())
```

También puedes modificar el select de "tipo" usando `modifyTypeSelectUsing()`:

```php
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Select;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->titleAttribute('name'),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title'),
    ])
    ->modifyTypeSelectUsing(fn (Select $select): Select => $select->native())
```

## Permitir HTML en las etiquetas de opción

Por defecto, Filament escapará cualquier HTML en las etiquetas de opción. Si deseas permitir HTML, puedes usar `allowHtml()`:

```php
use Filament\Forms\Components\Select;

Select::make('technology')
    ->options([
        'tailwind' => '<span class="text-blue-500">Tailwind</span>',
        'alpine' => '<span class="text-green-500">Alpine</span>',
        'laravel' => '<span class="text-red-500">Laravel</span>',
        'livewire' => '<span class="text-pink-500">Livewire</span>',
    ])
    ->searchable()
    ->allowHtml()
```

:::danger
Debes asegurarte de que el HTML sea seguro de renderizar; de lo contrario, tu aplicación será vulnerable a ataques XSS.
:::

Opcionalmente, puedes pasar un booleano para controlar si el input debe permitir HTML o no:

```php
use Filament\Forms\Components\Select;

Select::make('technology')
    ->options([
        'tailwind' => '<span class="text-blue-500">Tailwind</span>',
        'alpine' => '<span class="text-green-500">Alpine</span>',
        'laravel' => '<span class="text-red-500">Laravel</span>',
        'livewire' => '<span class="text-pink-500">Livewire</span>',
    ])
    ->searchable()
    ->allowHtml(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>allowHtml()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Ajustar o truncar etiquetas de opción

Cuando usas el select en JavaScript, las etiquetas que exceden el ancho del elemento se ajustan en varias líneas por defecto. Alternativamente, puedes truncar las etiquetas desbordadas.

```php
use Filament\Forms\Components\Select;

Select::make('truncate')
    ->wrapOptionLabels(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>wrapOptionLabels()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Deshabilitar la selección del placeholder

Puedes evitar que el placeholder (opción nula) sea seleccionable usando `selectablePlaceholder(false)`:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->default('draft')
    ->selectablePlaceholder(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>selectablePlaceholder()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Deshabilitar opciones específicas

Puedes deshabilitar opciones específicas usando `disableOptionWhen()`. Acepta un closure en el que puedes comprobar si la opción con un `$value` concreto debe deshabilitarse:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->default('draft')
    ->disableOptionWhen(fn (string $value): bool => $value === 'published')
```

<details>
  <summary>Inyección de utilidades</summary>
  Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Añadir texto de prefijo/sufijo junto al campo

Puedes colocar texto antes y después del input usando `prefix()` y `suffix()`:

```php
use Filament\Forms\Components\Select;

Select::make('domain')
    ->prefix('https://')
    ->suffix('.com')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>prefix()</code> y <code>suffix()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Usar iconos como prefijos/sufijos

Puedes colocar un [icono](../styling/icons) antes y después del input usando `prefixIcon()` y `suffixIcon()`:

```php
use Filament\Forms\Components\Select;
use Filament\Support\Icons\Heroicon;

Select::make('domain')
    ->suffixIcon(Heroicon::GlobeAlt)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>prefixIcon()</code> y <code>suffixIcon()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

#### Establecer el color del icono de prefijo/sufijo

Los iconos de prefijo/sufijo son grises por defecto, pero puedes establecer otro color usando `prefixIconColor()` y `suffixIconColor()`:

```php
use Filament\Forms\Components\Select;
use Filament\Support\Icons\Heroicon;

Select::make('domain')
    ->suffixIcon(Heroicon::CheckCircle)
    ->suffixIconColor('success')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>prefixIconColor()</code> y <code>suffixIconColor()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Limitar el número de opciones

Puedes limitar el número de opciones que se muestran en un select o multi-select con búsqueda usando `optionsLimit()`. El valor por defecto es 50:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->optionsLimit(20)
```

Asegúrate de no subir el límite demasiado, ya que puede volver el select lento y poco responsivo por el alto uso de memoria en el navegador.

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>optionsLimit()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Opciones booleanas

Si quieres un select booleano simple, con opciones "Yes" y "No", puedes usar `boolean()`:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean()
```

Para personalizar la etiqueta de "Yes", puedes usar el argumento `trueLabel` en `boolean()`:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(trueLabel: 'Absolutely!')
```

Para personalizar la etiqueta de "No", puedes usar el argumento `falseLabel` en `boolean()`:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(falseLabel: 'Not at all!')
```

Para personalizar el placeholder que se muestra cuando aún no se ha seleccionado una opción, puedes usar el argumento `placeholder` en `boolean()`:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(placeholder: 'Make your mind up...')
```

## Seleccionar opciones desde una tabla en un modal

Puedes usar el componente `ModalTableSelect` para abrir una [tabla](../tables) de Filament en un modal, permitiendo a los usuarios seleccionar registros de ella. Esto es útil cuando tienes una [relación](#integración-con-una-relación-de-eloquent) con muchos registros y quieres permitir filtrado y búsqueda avanzados.

Para usar `ModalTableSelect`, debes tener una clase de configuración de tabla para el modelo. Puedes generar una usando el comando `make:filament-table`:

```php
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('slug')
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('parent')
                    ->relationship('parent', 'name')
                    ->searchable()
                    ->preload(),
            ]);
    }
}
```

La clase debe tener un método `configure()` que acepte el objeto `Table` y lo devuelva. El nombre de la clase debe pasarse al método `tableConfiguration()` del componente `ModalTableSelect`:

```php
use Filament\Forms\Components\ModalTableSelect;

ModalTableSelect::make('category_id')
    ->relationship('category', 'name')
    ->tableConfiguration(CategoriesTable::class)
```

También puedes usar el método `multiple()` con una relación múltiple como `BelongsToMany`:

```php
use Filament\Forms\Components\ModalTableSelect;

ModalTableSelect::make('categories')
    ->relationship('categories', 'name')
    ->multiple()
    ->tableConfiguration(CategoriesTable::class)
```

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>tableConfiguration()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

### Personalizar las acciones del modal table select

Puedes personalizar el botón "Select" y el modal usando los métodos de configuración de [acciones](../actions). Pasar una función a `selectAction()` te permite modificar el objeto `$action`, por ejemplo, para cambiar la etiqueta del botón y el encabezado del modal:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\ModalTableSelect;

ModalTableSelect::make('category_id')
    ->relationship('category', 'name')
    ->tableConfiguration(CategoriesTable::class)
    ->selectAction(
        fn (Action $action) => $action
            ->label('Select a category')
            ->modalHeading('Search categories')
            ->modalSubmitActionLabel('Confirm selection'),
    )
```

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>selectAction()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

### Personalizar las etiquetas de opción en el modal table select

El método `getOptionLabelFromRecordUsing()` puede usarse para personalizar la etiqueta de cada opción seleccionada. Es útil si quieres mostrar una etiqueta más descriptiva o concatenar dos columnas:

```php
use Filament\Forms\Components\ModalTableSelect;

ModalTableSelect::make('category_id')
    ->relationship('category', 'name')
    ->tableConfiguration(CategoriesTable::class)
    ->getOptionLabelFromRecordUsing(fn (Category $record): string => "{$record->name} ({$record->slug})")
```

### Pasar argumentos adicionales a la tabla del modal select

Puedes pasar argumentos desde tu formulario a la clase de configuración de la tabla usando `tableArguments()`. Por ejemplo, puedes modificar la consulta de la tabla en base a campos llenados previamente:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\ModalTableSelect;
use Filament\Schemas\Components\Utilities\Get;

ModalTableSelect::make('products')
    ->relationship('products', 'name')
    ->multiple()
    ->tableConfiguration(ProductsTable::class)
    ->tableArguments(function (Get $get): array {
        return [
            'category_id' => $get('category_id'),
            'budget_limit' => $get('budget'),
        ];
    })
```

<details>
  <summary>Inyección de utilidades</summary>
  El método <code>tableArguments()</code> puede inyectar varias utilidades en la función como parámetros.
</details>

En tu clase de configuración de tabla, puedes acceder a estos argumentos usando `$table->getArguments()`:

```php
use Filament\Forms\Components\TableSelect\Livewire\TableSelectLivewireComponent;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(function (Builder $query) use ($table): Builder {
                $arguments = $table->getArguments();

                if ($categoryId = $arguments['category_id'] ?? null) {
                    $query->where('category_id', $categoryId);
                }

                if ($budgetLimit = $arguments['budget_limit'] ?? null) {
                    $query->where('price', '<=', $budgetLimit);
                }

                return $query;
            })
            ->columns([
                TextColumn::make('name'),
                TextColumn::make('price')
                    ->money(),
                TextColumn::make('category.name')
                    ->hidden(filled($table->getArguments()['category_id'])),
            ]);
    }
}
```

## Validación del select

Además de todas las reglas listadas en la página de [validación](validation), hay reglas adicionales específicas de los selects.

### Validación de opciones válidas (regla `in()`)

La regla [`in()`](validation#in) asegura que los usuarios no puedan seleccionar una opción que no esté en la lista de opciones. Es una regla importante para la integridad de datos, por lo que Filament la aplica por defecto a todos los campos select.

:::warning
La validación de la opción seleccionada es crucial, por lo que recomendamos encarecidamente que [escribas tests automatizados](../testing/testing-schemas#testing-form-validation) para tus formularios y asegurar que la validación funciona como se espera.
:::

Dado que hay muchas formas para que un select pueble sus opciones, y en muchos casos las opciones no se cargan todas por defecto y requieren búsqueda, Filament usa la presencia de una "etiqueta de opción" válida para determinar si el valor seleccionado existe. También comprueba si esa opción está [deshabilitada](#deshabilitar-opciones-específicas) o no.

Si estás usando una búsqueda personalizada para recuperar opciones, debes asegurarte de definir `getOptionLabelUsing()`, para que Filament pueda validar el valor seleccionado frente a las opciones disponibles:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->searchable()
    ->getSearchResultsUsing(fn (string $search): array => Author::query()
        ->where('name', 'like', "%{$search}%")
        ->limit(50)
        ->pluck('name', 'id')
        ->all())
    ->getOptionLabelUsing(fn (string $value): ?string => Author::find($value)?->name),
```

El método `getOptionLabelUsing()` debe devolver `null` si la opción no es válida, para permitir a Filament determinar que el valor seleccionado no está en la lista de opciones. Si la opción es válida, debe devolver la etiqueta de la opción.

Si usas un select `multiple()` o multi-select, debes definir `getOptionLabelsUsing()` en lugar de `getOptionLabelUsing()`. Se pasará `$values` al callback en lugar de `$value`, y debes devolver un array `$key => $value` de etiquetas y sus valores correspondientes:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->searchable()
    ->getSearchResultsUsing(fn (string $search): array => Technology::query()
        ->where('name', 'like', "%{$search}%")
        ->limit(50)
        ->pluck('name', 'id')
        ->all())
    ->getOptionLabelsUsing(fn (array $values): array => Technology::query()
        ->whereIn('id', $values)
        ->pluck('name', 'id')
        ->all()),
```

Si usas el método `relationship()`, los métodos `getOptionLabelUsing()` o `getOptionLabelsUsing()` se definirán automáticamente por ti, por lo que no necesitas preocuparte por ellos.

### Validación del número de elementos seleccionados

Puedes validar el número mínimo y máximo de elementos seleccionables en un [multi-select](#multi-select) con los métodos `minItems()` y `maxItems()`:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
    ->minItems(1)
    ->maxItems(3)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>minItems()</code> y <code>maxItems()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Personalizar los objetos de acción del select

Este campo usa objetos de acción para facilitar la personalización de los botones dentro de él. Puedes personalizar estos botones pasando una función a un método de registro de acciones. La función tiene acceso al objeto `$action`, que puedes usar para [personalizarlo](../actions/overview) o [personalizar su modal](../actions/modals). Los siguientes métodos están disponibles para personalizar las acciones:

- `createOptionAction()`
- `editOptionAction()`
- `manageOptionActions()` (para personalizar las acciones de crear y editar a la vez)

Aquí hay un ejemplo de cómo podrías personalizar una acción:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->createOptionAction(
        fn (Action $action) => $action->modalWidth('3xl'),
    )
```

<details>
  <summary>Inyección de utilidades</summary>
  Los métodos de registro de acciones pueden inyectar varias utilidades en la función como parámetros.
</details>
