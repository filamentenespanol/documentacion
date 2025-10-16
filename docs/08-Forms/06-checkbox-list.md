---
title: Checkbox list
---

## Introducción

El componente de lista de checkboxes te permite seleccionar múltiples valores de una lista de opciones predefinidas:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un array estático, el método <code>options()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Estas opciones se devuelven en formato JSON. Si las estás guardando usando Eloquent, debes asegurarte de agregar un `array` [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) a la propiedad del modelo:

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

## Establecer descripciones de opciones

Opcionalmente puedes proporcionar descripciones para cada opción usando el método `descriptions()`. Este método acepta un array de strings de texto plano, o instancias de `Illuminate\Support\HtmlString` o `Illuminate\Contracts\Support\Htmlable`. Esto te permite renderizar HTML, o incluso markdown, en las descripciones:

```php
use Filament\Forms\Components\CheckboxList;
use Illuminate\Support\HtmlString;

CheckboxList::make('technologies')
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
    ->descriptions([
        'tailwind' => 'A utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.',
        'alpine' => new HtmlString('A rugged, minimal tool for composing behavior <strong>directly in your markup</strong>.'),
        'laravel' => str('A **web application** framework with expressive, elegant syntax.')->inlineMarkdown()->toHtmlString(),
        'livewire' => 'A full-stack framework for Laravel building dynamic interfaces simple, without leaving the comfort of Laravel.',
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un array estático, el método <code>descriptions()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::info
Asegúrate de usar la misma `key` en el array de descripciones que la `key` en el array de opciones para que la descripción correcta coincida con la opción correcta.
:::

## Dividir opciones en columnas

Puedes dividir opciones en columnas usando el método `columns()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->columns(2)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>columns()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Este método acepta las mismas opciones que el método `columns()` del [grid](../schemas/layouts#grid-system). Esto te permite personalizar de forma responsiva el número de columnas en varios breakpoints.

### Establecer la dirección del grid

Por defecto, cuando organizas checkboxes en columnas, se listarán en orden vertical. Si prefieres listarlos horizontalmente, puedes usar el método `gridDirection(GridDirection::Row)`:

```php
use Filament\Forms\Components\CheckboxList;
use Filament\Support\Enums\GridDirection;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->columns(2)
    ->gridDirection(GridDirection::Row)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>gridDirection()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Buscar opciones

Puedes habilitar un campo de búsqueda para permitir un acceso más fácil a muchas opciones, usando el método `searchable()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->searchable()
```

Opcionalmente, puedes pasar un valor booleano para controlar si las opciones deben ser buscables o no:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->searchable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>searchable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Alternar checkboxes en bloque

Puedes permitir que los usuarios alternen todos los checkboxes a la vez usando el método `bulkToggleable()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->bulkToggleable()
```

Opcionalmente, puedes pasar un valor booleano para controlar si los checkboxes deben poder alternarse en bloque o no:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->bulkToggleable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>bulkToggleable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Deshabilitar opciones específicas

Puedes deshabilitar opciones específicas usando el método `disableOptionWhen()`. Acepta un closure, en el cual puedes comprobar si la opción con un `$value` específico debe estar deshabilitada:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
    ->disableOptionWhen(fn (string $value): bool => $value === 'livewire')
```

<details>
<summary>Inyección de utilidades</summary>

Puedes inyectar varias utilidades en la función como parámetros.

<strong>Parámetros adicionales disponibles:</strong>

- <strong>Valor de opción</strong> (<code>mixed</code> <code>$value</code>) - El valor de la opción a deshabilitar.
- <strong>Etiqueta de opción</strong> (<code>string | Illuminate\Contracts\Support\Htmlable</code> <code>$label</code>) - La etiqueta de la opción a deshabilitar.

</details>

Si quieres recuperar las opciones que no han sido deshabilitadas, por ejemplo con fines de validación, puedes hacerlo usando `getEnabledOptions()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
        'heroicons' => 'SVG icons',
    ])
    ->disableOptionWhen(fn (string $value): bool => $value === 'heroicons')
    ->in(fn (CheckboxList $component): array => array_keys($component->getEnabledOptions()))
```

Para más información sobre la función `in()`, consulta la [documentación de Validación](validation#in).

## Permitir HTML en las etiquetas de las opciones

Por defecto, Filament escapará cualquier HTML en las etiquetas de las opciones. Si quieres permitir HTML, puedes usar el método `allowHtml()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technology')
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

Opcionalmente, puedes pasar un valor booleano para controlar si las opciones deben permitir HTML o no:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technology')
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

## Integración con una relación Eloquent

> Si estás construyendo un formulario dentro de tu componente Livewire, asegúrate de haber configurado el [modelo del formulario](../components/form#setting-a-form-model). De lo contrario, Filament no sabrá qué modelo usar para recuperar la relación.

Puedes usar el método `relationship()` de `CheckboxList` para apuntar a una relación `BelongsToMany`. Filament cargará las opciones desde la relación, y las guardará de vuelta en la tabla pivot cuando se envíe el formulario. El `titleAttribute` es el nombre de una columna que se usará para generar una etiqueta para cada opción:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->relationship(titleAttribute: 'name')
```

:::warning
Al usar `disabled()` con `relationship()`, asegúrate de que `disabled()` se llame antes de `relationship()`. Esto asegura que la llamada a `dehydrated()` desde dentro de `relationship()` no sea sobrescrita por la llamada desde `disabled()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->disabled()
    ->relationship(titleAttribute: 'name')
```
:::

### Personalizar la consulta de la relación

Puedes personalizar la consulta de base de datos que recupera opciones usando el parámetro `modifyOptionsQueryUsing` del método `relationship()`:

```php
use Filament\Forms\Components\CheckboxList;
use Illuminate\Database\Eloquent\Builder;

CheckboxList::make('technologies')
    ->relationship(
        titleAttribute: 'name',
        modifyQueryUsing: fn (Builder $query) => $query->withTrashed(),
    )
```

<details>
<summary>Inyección de utilidades</summary>

El argumento <code>modifyQueryUsing</code> puede inyectar varias utilidades en la función como parámetros.

<strong>Parámetros adicionales disponibles:</strong>

- <strong>Query</strong> (<code>Illuminate\Database\Eloquent\Builder</code> <code>$query</code>) - El query builder de Eloquent a modificar.

</details>

### Personalizar las etiquetas de opciones de la relación

Si quieres personalizar la etiqueta de cada opción, tal vez para ser más descriptivo, o para concatenar nombre y apellido, podrías usar una columna virtual en tu migración de base de datos:

```php
$table->string('full_name')->virtualAs('concat(first_name, \' \' , last_name)');
```

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('authors')
    ->relationship(titleAttribute: 'full_name')
```

Alternativamente, puedes usar el método `getOptionLabelFromRecordUsing()` para transformar el modelo Eloquent de una opción en una etiqueta:

```php
use Filament\Forms\Components\CheckboxList;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

CheckboxList::make('authors')
    ->relationship(
        modifyQueryUsing: fn (Builder $query) => $query->orderBy('first_name')->orderBy('last_name'),
    )
    ->getOptionLabelFromRecordUsing(fn (Model $record) => "{$record->first_name} {$record->last_name}")
```

<details>
<summary>Inyección de utilidades</summary>

El método <code>getOptionLabelFromRecordUsing()</code> puede inyectar varias utilidades en la función como parámetros.

<strong>Parámetros adicionales disponibles:</strong>

- <strong>Registro Eloquent</strong> (<code>Illuminate\Database\Eloquent\Model</code> <code>$record</code>) - El registro Eloquent para obtener la etiqueta de la opción.

</details>

### Guardar datos pivot en la relación

Si tu tabla pivot tiene columnas adicionales, puedes usar el método `pivotData()` para especificar los datos que deben guardarse en ellas:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('primaryTechnologies')
    ->relationship(name: 'technologies', titleAttribute: 'name')
    ->pivotData([
        'is_primary' => true,
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>pivotData()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Establecer un mensaje personalizado cuando no hay resultados de búsqueda

Cuando usas una lista de checkboxes buscable, puede que quieras mostrar un mensaje personalizado cuando no se encuentren resultados de búsqueda. Puedes hacerlo usando el método `noSearchResultsMessage()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->searchable()
    ->noSearchResultsMessage('No technologies found.')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>noSearchResultsMessage()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Establecer un prompt de búsqueda personalizado

Cuando usas una lista de checkboxes buscable, puedes ajustar el placeholder del campo de búsqueda cuando el usuario aún no ha introducido un término. Puedes hacerlo usando el método `searchPrompt()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->searchable()
    ->searchPrompt('Search for a technology')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>searchPrompt()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Ajustar el debounce de búsqueda

Por defecto, Filament esperará 1000 milisegundos (1 segundo) antes de buscar opciones cuando el usuario escribe en una lista de checkboxes buscable. También esperará 1000 milisegundos entre búsquedas si el usuario está escribiendo continuamente en el campo de búsqueda. Puedes cambiar esto usando el método `searchDebounce()`:

```php
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->searchable()
    ->searchDebounce(500)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>searchDebounce()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar los objetos de acción de la lista de checkboxes

Este campo usa objetos de acción para una fácil personalización de los botones dentro de él. Puedes personalizar estos botones pasando una función a un método de registro de acciones. La función tiene acceso al objeto `$action`, que puedes usar para [personalizarlo](../actions/overview). Los siguientes métodos están disponibles para personalizar las acciones:

- `selectAllAction()`
- `deselectAllAction()`

Aquí hay un ejemplo de cómo podrías personalizar una acción:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\CheckboxList;

CheckboxList::make('technologies')
    ->options([
        // ...
    ])
    ->selectAllAction(
        fn (Action $action) => $action->label('Select all technologies'),
    )
```

<details>
<summary>Inyección de utilidades</summary>

Los métodos de registro de acciones pueden inyectar varias utilidades en la función como parámetros.

<strong>Parámetros adicionales disponibles:</strong>

- <strong>Action</strong> (<code>Filament\\Actions\\Action</code> <code>$action</code>) - El objeto action a personalizar.

</details>
