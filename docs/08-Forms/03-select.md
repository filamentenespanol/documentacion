---
title: Select
---

## Introducción

El componente select te permite seleccionar de una lista de opciones predefinidas:

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

Además de permitir un array estático, el método `options()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<AutoScreenshot name="forms/fields/select/simple" alt="Select" version="4.x" />

## Habilitar el select JavaScript

Por defecto, Filament usa el select HTML5 nativo. Puedes habilitar un select JavaScript más personalizable usando el método `native(false)`:

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

Además de permitir un valor estático, el método `native()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<AutoScreenshot name="forms/fields/select/javascript" alt="Select JavaScript" version="4.x" />

## Buscar opciones

Puedes habilitar un campo de búsqueda para permitir un acceso más fácil a muchas opciones, usando el método `searchable()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->label('Author')
    ->options(User::query()->pluck('name', 'id'))
    ->searchable()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe ser buscable o no:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->label('Author')
    ->options(User::query()->pluck('name', 'id'))
    ->searchable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `searchable()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<AutoScreenshot name="forms/fields/select/searchable" alt="Select buscable" version="4.x" />

### Retornar resultados de búsqueda personalizados

Si tienes muchas opciones y deseas poblarlas basándote en una búsqueda en base de datos u otra fuente de datos externa, puedes usar los métodos `getSearchResultsUsing()` y `getOptionLabelUsing()` en lugar de `options()`.

El método `getSearchResultsUsing()` acepta un callback que retorna resultados de búsqueda en formato `$key => $value`. La búsqueda actual del usuario está disponible como `$search`, y debes usarla para filtrar tus resultados.

El método `getOptionLabelUsing()` acepta un callback que transforma el `$value` de la opción seleccionada en una etiqueta. Esto se usa cuando el formulario se carga por primera vez cuando el usuario aún no ha realizado una búsqueda. De lo contrario, la etiqueta usada para mostrar la opción actualmente seleccionada no estaría disponible.

Tanto `getSearchResultsUsing()` como `getOptionLabelUsing()` deben usarse en el select si deseas proporcionar resultados de búsqueda personalizados:

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

`getOptionLabelUsing()` es crucial, ya que proporciona a Filament la etiqueta de la opción seleccionada, por lo que no necesita ejecutar una búsqueda completa para encontrarla. Si una opción no es válida, debe retornar `null`.

<details>
<summary>Inyección de utilidades</summary>

Puedes inyectar varias utilidades en estas funciones como parámetros.

**Parámetros adicionales disponibles:**

- **Valor de opción** (`mixed` `$value`) - [Solo `getOptionLabelUsing()`] El valor de la opción para recuperar la etiqueta.
- **Valores de opciones** (`array<mixed>` `$values`) - [Solo `getOptionLabelsUsing()`] Los valores de las opciones para recuperar las etiquetas.
- **Búsqueda** (`?string` `$search`) - [Solo `getSearchResultsUsing()`] El valor actual de entrada de búsqueda, si el campo es buscable.

</details>

### Establecer un mensaje de carga personalizado

Cuando usas un select o multi-select buscable, puede que quieras mostrar un mensaje personalizado mientras las opciones se cargan. Puedes hacerlo usando el método `loadingMessage()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->loadingMessage('Loading authors...')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `loadingMessage()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Establecer un mensaje personalizado cuando no hay resultados de búsqueda

Cuando usas un select o multi-select buscable, puede que quieras mostrar un mensaje personalizado cuando no se encuentran resultados de búsqueda. Puedes hacerlo usando el método `noSearchResultsMessage()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->noSearchResultsMessage('No authors found.')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `noSearchResultsMessage()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Establecer un prompt de búsqueda personalizado

Cuando usas un select o multi-select buscable, puede que quieras mostrar un mensaje personalizado cuando el usuario aún no ha ingresado un término de búsqueda. Puedes hacerlo usando el método `searchPrompt()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable(['name', 'email'])
    ->searchPrompt('Search authors by their name or email address')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `searchPrompt()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Establecer un mensaje personalizado durante la búsqueda

Cuando usas un select o multi-select buscable, puede que quieras mostrar un mensaje personalizado mientras se cargan los resultados de búsqueda. Puedes hacerlo usando el método `searchingMessage()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->searchingMessage('Searching authors...')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `searchingMessage()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Ajustar el debounce de búsqueda

Por defecto, Filament esperará 1000 milisegundos (1 segundo) antes de buscar opciones cuando el usuario escribe en un select o multi-select buscable. También esperará 1000 milisegundos entre búsquedas, si el usuario está escribiendo continuamente en el campo de búsqueda. Puedes cambiar esto usando el método `searchDebounce()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->searchDebounce(500)
```

Asegúrate de no reducir demasiado el debounce, ya que esto puede hacer que el select se vuelva lento y no responda debido a un alto número de peticiones de red para recuperar opciones del servidor.

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `searchDebounce()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

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

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe ser múltiple o no:

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

Además de permitir un valor estático, el método `multiple()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<AutoScreenshot name="forms/fields/select/multiple" alt="Multi-select" version="4.x" />

Estas opciones se retornan en formato JSON. Si las estás guardando usando Eloquent, debes asegurarte de agregar un [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) `array` a la propiedad del modelo:

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

Si estás [retornando resultados de búsqueda personalizados](#returning-custom-search-results), debes definir `getOptionLabelsUsing()` en lugar de `getOptionLabelUsing()`. `$values` se pasará al callback en lugar de `$value`, y debes retornar un array `$key => $value` de etiquetas y sus valores correspondientes:

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

`getOptionLabelsUsing()` es crucial, ya que proporciona a Filament las etiquetas de las opciones ya seleccionadas, por lo que no necesita ejecutar una búsqueda completa para encontrarlas. También se usa para [validar](#valid-options-validation-in-rule) que las opciones que el usuario ha seleccionado son válidas. Si una opción no es válida, no debe estar presente en el array retornado por `getOptionLabelsUsing()`.

<details>
<summary>Inyección de utilidades</summary>

El método `getOptionLabelsUsing()` puede inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Valores de opciones** (`array<mixed>` `$values`) - [Solo `getOptionLabelsUsing()`] Los valores de las opciones para recuperar las etiquetas.

</details>

## Agrupar opciones

Puedes agrupar opciones bajo una etiqueta, para organizarlas mejor. Para hacer esto, puedes pasar un array de grupos a `options()` o donde normalmente pasarías un array de opciones. Las claves del array se usan como etiquetas de grupo, y los valores son arrays de opciones en ese grupo:

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

<AutoScreenshot name="forms/fields/select/grouped" alt="Select agrupado" version="4.x" />

## Integración con una relación Eloquent

Puedes emplear el método `relationship()` del `Select` para configurar una relación `BelongsTo` para recuperar opciones automáticamente. El `titleAttribute` es el nombre de una columna que se usará para generar una etiqueta para cada opción:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
```

El método `multiple()` puede usarse en combinación con `relationship()` para usar una relación `BelongsToMany`. Filament cargará las opciones de la relación, y las guardará de vuelta en la tabla pivot de la relación cuando se envíe el formulario. Si no se proporciona un `name`, Filament usará el nombre del campo como el nombre de la relación:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->relationship(titleAttribute: 'name')
```

:::warning
    Al usar `disabled()` con `multiple()` y `relationship()`, asegúrate de que `disabled()` se llame antes de `relationship()`. Esto asegura que la llamada a `dehydrated()` desde dentro de `relationship()` no sea sobrescrita por la llamada desde `disabled()`:

    ```php
    use Filament\Forms\Components\Select;

    Select::make('technologies')
        ->multiple()
        ->disabled()
        ->relationship(titleAttribute: 'name')
    ```
:::

### Buscar opciones de relación en múltiples columnas

Por defecto, si el select también es buscable, Filament retornará resultados de búsqueda para la relación basándose en la columna de título de la relación. Si deseas buscar en múltiples columnas, puedes pasar un array de columnas al método `searchable()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable(['name', 'email'])
```

### Precargar opciones de relación

Si deseas poblar las opciones buscables desde la base de datos cuando se carga la página, en lugar de cuando el usuario busca, puedes usar el método `preload()`:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->preload()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe precargarse o no:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->preload(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `preload()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Excluir el registro actual

Al trabajar con relaciones recursivas, probablemente querrás eliminar el registro actual del conjunto de resultados.

Esto se puede hacer fácilmente usando el argumento `ignoreRecord`:

```php
use Filament\Forms\Components\Select;

Select::make('parent_id')
    ->relationship(name: 'parent', titleAttribute: 'name', ignoreRecord: true)
```

### Personalizar la consulta de relación

Puedes personalizar la consulta de base de datos que recupera opciones usando el tercer parámetro del método `relationship()`:

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

El argumento `modifyQueryUsing` puede inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Query** (`Illuminate\Database\Eloquent\Builder` `$query`) - El query builder de Eloquent a modificar.
- **Búsqueda** (`?string` `$search`) - El valor actual de entrada de búsqueda, si el campo es buscable.

</details>

### Personalizar las etiquetas de opciones de relación

Si deseas personalizar la etiqueta de cada opción, tal vez para ser más descriptivo, o para concatenar un nombre y apellido, podrías usar una columna virtual en tu migración de base de datos:

```php
$table->string('full_name')->virtualAs('concat(first_name, \' \', last_name)');
```

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'full_name')
```

Alternativamente, puedes usar el método `getOptionLabelFromRecordUsing()` para transformar el modelo Eloquent de una opción en una etiqueta:

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

El método `getOptionLabelFromRecordUsing()` puede inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Registro Eloquent** (`Illuminate\Database\Eloquent\Model` `$record`) - El registro Eloquent para obtener la etiqueta de la opción.

</details>

### Guardar datos pivot en la relación

Si estás usando una relación `multiple()` y tu tabla pivot tiene columnas adicionales, puedes usar el método `pivotData()` para especificar los datos que deben guardarse en ellas:

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

Además de permitir un valor estático, el método `pivotData()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Crear una nueva opción en un modal

Puedes definir un formulario personalizado que se puede usar para crear un nuevo registro y adjuntarlo a la relación `BelongsTo`:

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

Además de permitir un valor estático, el método `createOptionForm()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Schema** (`Filament\Schemas\Schema` `$schema`) - El objeto schema para el formulario en el modal.

</details>

<AutoScreenshot name="forms/fields/select/create-option" alt="Select con botón de crear opción" version="4.x" />

El formulario se abre en un modal, donde el usuario puede llenarlo con datos. Al enviar el formulario, el nuevo registro es seleccionado por el campo.

<AutoScreenshot name="forms/fields/select/create-option-modal" alt="Select con modal de crear opción" version="4.x" />

#### Personalizar la creación de nueva opción

Puedes personalizar el proceso de creación de la nueva opción definida en el formulario usando el método `createOptionUsing()`, que debe retornar la clave primaria del registro recién creado:

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

El método `createOptionUsing()` puede inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Data** (`array<string, mixed>` `$data`) - Los datos del formulario en el modal.
- **Schema** (`Filament\Schemas\Schema` `$schema`) - El objeto schema para el formulario en el modal.

</details>

### Editar la opción seleccionada en un modal

Puedes definir un formulario personalizado que se puede usar para editar el registro seleccionado y guardarlo de vuelta en la relación `BelongsTo`:

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

Además de permitir un valor estático, el método `editOptionForm()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Schema** (`Filament\Schemas\Schema` `$schema`) - El objeto schema para el formulario en el modal.

</details>

<AutoScreenshot name="forms/fields/select/edit-option" alt="Select con botón de editar opción" version="4.x" />

El formulario se abre en un modal, donde el usuario puede llenarlo con datos. Al enviar el formulario, los datos del formulario se guardan de vuelta en el registro.

<AutoScreenshot name="forms/fields/select/edit-option-modal" alt="Select con modal de editar opción" version="4.x" />

#### Personalizar actualizaciones de opciones

Puedes personalizar el proceso de actualización de la opción seleccionada definida en el formulario usando el método `updateOptionUsing()`. El registro Eloquent actual que se está editando se puede recuperar usando el método `getRecord()` en el schema:

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

El método `updateOptionUsing()` puede inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Data** (`array<string, mixed>` `$data`) - Los datos del formulario en el modal.
- **Schema** (`Filament\Schemas\Schema` `$schema`) - El objeto schema para el formulario en el modal.

</details>

### Manejar relaciones `MorphTo`

Las relaciones `MorphTo` son especiales, ya que le dan al usuario la capacidad de seleccionar registros de un rango de diferentes modelos. Debido a esto, tenemos un componente dedicado `MorphToSelect` que no es realmente un campo select, sino 2 campos select dentro de un fieldset. El primer campo select te permite seleccionar el tipo, y el segundo te permite seleccionar el registro de ese tipo.

Para usar el `MorphToSelect`, debes pasar `types()` al componente, que le indica cómo renderizar opciones para diferentes tipos:

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

El método `types()` puede inyectar varias utilidades en la función como parámetros.

</details>

#### Personalizar las etiquetas de opciones para cada tipo morfado

El `titleAttribute()` se usa para extraer los títulos de cada producto o post. Si deseas personalizar la etiqueta de cada opción, puedes usar el método `getOptionLabelFromRecordUsing()` para transformar el modelo Eloquent en una etiqueta:

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

#### Personalizar la consulta de relación para cada tipo morfado

Puedes personalizar la consulta de base de datos que recupera opciones usando el método `modifyOptionsQueryUsing()`:

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

El método `modifyOptionsQueryUsing()` puede inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Query builder de Eloquent** (`Illuminate\Database\Eloquent\Builder` `$query`) - El query builder a modificar.

</details>

:::tip
Muchas de las mismas opciones en el campo select están disponibles para `MorphToSelect`, incluyendo `searchable()`, `preload()`, `native()`, `allowHtml()`, y `optionsLimit()`.
:::

#### Personalizar los campos select morph

Puedes personalizar aún más el campo select "key" para un tipo morph específico usando el método `modifyKeySelectUsing()`:

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

Esto es útil si deseas personalizar el campo select "key" para cada tipo morfado individualmente. Si deseas personalizar el select key para todos los tipos, puedes usar el método `modifyKeySelectUsing()` en el componente `MorphToSelect` mismo:

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

También puedes modificar el campo select "type" usando el método `modifyTypeSelectUsing()`:

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

## Permitir HTML en las etiquetas de opciones

Por defecto, Filament escapará cualquier HTML en las etiquetas de opciones. Si deseas permitir HTML, puedes usar el método `allowHtml()`:

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
    Ten en cuenta que deberás asegurarte de que el HTML sea seguro para renderizar, de lo contrario tu aplicación será vulnerable a ataques XSS.
:::

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe permitir HTML o no:

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

Además de permitir un valor estático, el método `allowHtml()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Envolver o truncar etiquetas de opciones

Cuando usas el select JavaScript, las etiquetas que exceden el ancho del elemento select se envolverán en múltiples líneas por defecto. Alternativamente, puedes elegir truncar las etiquetas desbordantes.

```php
use Filament\Forms\Components\Select;

Select::make('truncate')
    ->wrapOptionLabels(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `wrapOptionLabels()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Deshabilitar la selección del placeholder

Puedes evitar que el placeholder (opción null) sea seleccionado usando el método `selectablePlaceholder(false)`:

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

Además de permitir un valor estático, el método `selectablePlaceholder()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Deshabilitar opciones específicas

Puedes deshabilitar opciones específicas usando el método `disableOptionWhen()`. Acepta un closure, en el cual puedes verificar si la opción con un `$value` específico debe estar deshabilitada:

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

**Parámetros adicionales disponibles:**

- **Valor de opción** (`mixed` `$value`) - El valor de la opción a deshabilitar.
- **Etiqueta de opción** (`string | Illuminate\Contracts\Support\Htmlable` `$label`) - La etiqueta de la opción a deshabilitar.

</details>

## Añadir texto como prefijo o sufijo

Puedes colocar texto antes y después del campo usando los métodos `prefix()` y `suffix()`:

```php
use Filament\Forms\Components\Select;

Select::make('domain')
    ->prefix('https://')
    ->suffix('.com')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `prefix()` y `suffix()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<AutoScreenshot name="forms/fields/select/affix" alt="Select con prefijos y sufijos" version="4.x" />

### Usar iconos como prefijos o sufijos

Puedes colocar un [icono](../styling/icons) antes y después del campo usando los métodos `prefixIcon()` y `suffixIcon()`:

```php
use Filament\Forms\Components\Select;
use Filament\Support\Icons\Heroicon;

Select::make('domain')
    ->suffixIcon(Heroicon::GlobeAlt)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `prefixIcon()` y `suffixIcon()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

<AutoScreenshot name="forms/fields/select/suffix-icon" alt="Select con icono como sufijo" version="4.x" />

#### Establecer el color del icono de prefijo/sufijo

Los iconos de prefijo y sufijo son grises por defecto, pero puedes establecer un color diferente usando los métodos `prefixIconColor()` y `suffixIconColor()`:

```php
use Filament\Forms\Components\Select;
use Filament\Support\Icons\Heroicon;

Select::make('domain')
    ->suffixIcon(Heroicon::CheckCircle)
    ->suffixIconColor('success')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `prefixIconColor()` y `suffixIconColor()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Limitar el número de opciones

Puedes limitar el número de opciones que se muestran en un select o multi-select buscable usando el método `optionsLimit()`. El valor predeterminado es 50:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->optionsLimit(20)
```

Asegúrate de no aumentar demasiado el límite, ya que esto puede hacer que el select se vuelva lento y no responda debido al alto uso de memoria en el navegador.

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `optionsLimit()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Opciones booleanas

Si deseas un select booleano simple, con opciones "Yes" y "No", puedes usar el método `boolean()`:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean()
```

Para personalizar la etiqueta "Yes", puedes usar el argumento `trueLabel` en el método `boolean()`:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(trueLabel: 'Absolutely!')
```

Para personalizar la etiqueta "No", puedes usar el argumento `falseLabel` en el método `boolean()`:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(falseLabel: 'Not at all!')
```

Para personalizar el placeholder que se muestra cuando aún no se ha seleccionado una opción, puedes usar el argumento `placeholder` en el método `boolean()`:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(placeholder: 'Make your mind up...')
```

## Seleccionar opciones de una tabla en un modal

Puedes usar el componente `ModalTableSelect` para abrir una [tabla](../tables) de Filament en un modal, permitiendo a los usuarios seleccionar registros de ella. Esto es útil cuando tienes una [relación](#integrating-with-an-eloquent-relationship) que tiene muchos registros, y deseas que los usuarios puedan realizar filtrado y búsqueda avanzados a través de ellos.

Para usar el `ModalTableSelect`, debes tener una clase de configuración de tabla para el modelo. Puedes generar una de estas clases usando el comando `make:filament-table`:

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

La clase debe tener un método `configure()` que acepte el objeto `Table` y lo retorne. El nombre de la clase debe pasarse al método `tableConfiguration()` del componente `ModalTableSelect`:

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

El método `tableConfiguration()` puede inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar las acciones del modal table select

Puedes personalizar el botón "Select" y el modal usando los métodos de configuración del objeto [action](../actions). Pasar una función al método `selectAction()` te permite modificar el objeto `$action`, por ejemplo, para cambiar la etiqueta del botón y el encabezado del modal:

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

El método `selectAction()` puede inyectar varias utilidades en la función como parámetros.

**Parámetros adicionales disponibles:**

- **Action** (`Filament\Actions\Action` `$action`) - El objeto action a personalizar.

</details>

### Personalizar las etiquetas de opciones en el modal table select

El método `getOptionLabelFromRecordUsing()` se puede usar para personalizar la etiqueta de cada opción seleccionada. Esto es útil si deseas mostrar una etiqueta más descriptiva o concatenar dos columnas juntas:

```php
use Filament\Forms\Components\ModalTableSelect;

ModalTableSelect::make('category_id')
    ->relationship('category', 'name')
    ->tableConfiguration(CategoriesTable::class)
    ->getOptionLabelFromRecordUsing(fn (Category $record): string => "{$record->name} ({$record->slug})")
```

### Pasar argumentos adicionales a la tabla en un modal select

Puedes pasar argumentos desde tu formulario a la clase de configuración de tabla usando el método `tableArguments()`. Por ejemplo, esto se puede usar para modificar la consulta de la tabla basándose en campos de formulario previamente llenados:

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

El método `tableArguments()` puede inyectar varias utilidades en la función como parámetros.

</details>

En tu clase de configuración de tabla, puedes acceder a estos argumentos usando el método `$table->getArguments()`:

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

## Validación en Select

Además de todas las reglas listadas en la página de [validación](validation), existen reglas adicionales específicas para selects.

### Validación de opciones válidas (regla `in()`)

La regla [`in()`](validation#in) asegura que los usuarios no puedan seleccionar una opción que no esté en la lista de opciones. Esta es una regla importante para propósitos de integridad de datos, por lo que Filament la aplica por defecto a todos los campos select.

:::warning
    La validación de opciones seleccionadas es crucial, por lo que sugerimos fuertemente que [escribas pruebas automatizadas](../testing/testing-schemas#testing-form-validation) para tus formularios para asegurar que la validación funcione como se espera.
:::

Dado que hay muchas formas para que un campo select poblar sus opciones, y en muchos casos las opciones no se cargan todas en el select por defecto y requieren búsqueda para recuperarlas, Filament usa la presencia de una "etiqueta de opción" válida para determinar si el valor seleccionado existe. También verifica si esa opción está [deshabilitada](#disabling-specific-options) o no.

Si estás usando una consulta de búsqueda personalizada para recuperar opciones, debes asegurarte de que el método `getOptionLabelUsing()` esté definido, para que Filament pueda validar el valor seleccionado contra las opciones disponibles:

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

El método `getOptionLabelUsing()` debe retornar `null` si la opción no es válida, para permitir que Filament determine que el valor seleccionado no está en la lista de opciones. Si la opción es válida, debe retornar la etiqueta de la opción.

Si estás usando un select `multiple()` o multi-select, debes definir `getOptionLabelsUsing()` en lugar de `getOptionLabelUsing()`. `$values` se pasará al callback en lugar de `$value`, y debes retornar un array `$key => $value` de etiquetas y sus valores correspondientes:

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

Si estás usando el método `relationship()`, los métodos `getOptionLabelUsing()` o `getOptionLabelsUsing()` se definirán automáticamente para ti, por lo que no necesitas preocuparte por ellos.

### Validación del número de elementos seleccionados

Puedes validar el número mínimo y máximo de elementos que puedes seleccionar en un [multi-select](#multi-select) estableciendo los métodos `minItems()` y `maxItems()`:

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

Además de permitir valores estáticos, los métodos `minItems()` y `maxItems()` también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar los objetos action del select

Este campo usa objetos action para una fácil personalización de los botones dentro de él. Puedes personalizar estos botones pasando una función a un método de registro de action. La función tiene acceso al objeto `$action`, que puedes usar para [personalizarlo](../actions/overview) o [personalizar su modal](../actions/modals). Los siguientes métodos están disponibles para personalizar las acciones:

- `createOptionAction()`
- `editOptionAction()`
- `manageOptionActions()` (para personalizar tanto la acción de crear como la de editar opción a la vez)

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

**Parámetros adicionales disponibles:**

- **Action** (`Filament\Actions\Action` `$action`) - El objeto action a personalizar.

</details>
