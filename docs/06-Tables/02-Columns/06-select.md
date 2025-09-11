---
title: Columna de selección
---

## Introducción

La columna de selección te permite renderizar un campo select dentro de la tabla, que puede usarse para actualizar ese registro de la base de datos sin necesidad de abrir una nueva página o modal.

Debes pasar opciones a la columna:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
```

## Habilitar el select de JavaScript

Por defecto, Filament usa el select HTML5 nativo. Puedes habilitar un select de JavaScript más personalizable usando el método `native(false)`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->native(false)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `native()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Buscar opciones

Puedes habilitar un campo de búsqueda para permitir acceso más fácil a muchas opciones, usando el método `searchableOptions()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->label('Author')
    ->options(User::query()->pluck('name', 'id'))
    ->searchableOptions()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe ser buscable o no:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->label('Author')
    ->options(User::query()->pluck('name', 'id'))
    ->searchableOptions(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `searchableOptions()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Devolver resultados de búsqueda personalizados

Si tienes muchas opciones y quieres poblarlas basándote en una búsqueda de base de datos u otra fuente de datos externa, puedes usar los métodos `getOptionsSearchResultsUsing()` y `getOptionLabelUsing()` en lugar de `options()`.

El método `getOptionsSearchResultsUsing()` acepta un callback que devuelve resultados de búsqueda en formato `$key => $value`. La búsqueda actual del usuario está disponible como `$search`, y debes usarla para filtrar tus resultados.

El método `getOptionLabelUsing()` acepta un callback que transforma el `$value` de la opción seleccionada en una etiqueta. Esto se usa cuando el formulario se carga por primera vez cuando el usuario aún no ha hecho una búsqueda. De lo contrario, la etiqueta usada para mostrar la opción actualmente seleccionada no estaría disponible.

Tanto `getOptionsSearchResultsUsing()` como `getOptionLabelUsing()` deben usarse en el select si quieres proporcionar resultados de búsqueda personalizados:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->searchableOptions()
    ->getOptionsSearchResultsUsing(fn (string $search): array => User::query()
        ->where('name', 'like', "%{$search}%")
        ->limit(50)
        ->pluck('name', 'id')
        ->all())
    ->getOptionLabelUsing(fn ($value): ?string => User::find($value)?->name),
```

`getOptionLabelUsing()` es crucial, ya que proporciona a Filament la etiqueta de la opción seleccionada, por lo que no necesita ejecutar una búsqueda completa para encontrarla. Si una opción no es válida, debe devolver `null`.

<details>
<summary>💡 Utility Injection</summary>

Puedes inyectar varias utilidades en estas funciones como parámetros.

</details>

### Establecer un mensaje de carga personalizado

Cuando uses un select o multi-select buscable, puedes querer mostrar un mensaje personalizado mientras las opciones se están cargando. Puedes hacer esto usando el método `optionsLoadingMessage()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions()
    ->optionsLoadingMessage('Cargando autores...')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `optionsLoadingMessage()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Establecer un mensaje personalizado para sin resultados de búsqueda

Cuando uses un select o multi-select buscable, puedes querer mostrar un mensaje personalizado cuando no se encuentren resultados de búsqueda. Puedes hacer esto usando el método `noOptionsSearchResultsMessage()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions()
    ->noOptionsSearchResultsMessage('No se encontraron autores.')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `noOptionsSearchResultsMessage()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Establecer un prompt de búsqueda personalizado

Cuando uses un select o multi-select buscable, puedes querer mostrar un mensaje personalizado cuando el usuario aún no ha introducido un término de búsqueda. Puedes hacer esto usando el método `optionsSearchPrompt()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions(['name', 'email'])
    ->optionsSearchPrompt('Buscar autores por su nombre o dirección de email')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `optionsSearchPrompt()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Establecer un mensaje de búsqueda personalizado

Cuando uses un select o multi-select buscable, puedes querer mostrar un mensaje personalizado mientras los resultados de búsqueda se están cargando. Puedes hacer esto usando el método `optionsSearchingMessage()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions()
    ->optionsSearchingMessage('Buscando autores...')
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `optionsSearchingMessage()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Ajustar el debounce de búsqueda

Por defecto, Filament esperará 1000 milisegundos (1 segundo) antes de buscar opciones cuando el usuario escriba en un select o multi-select buscable. También esperará 1000 milisegundos entre búsquedas, si el usuario está escribiendo continuamente en el campo de búsqueda. Puedes cambiar esto usando el método `optionsSearchDebounce()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions()
    ->optionsSearchDebounce(500)
```

Asegúrate de no reducir demasiado el debounce, ya que esto puede hacer que el select se vuelva lento y no responda debido a un alto número de peticiones de red para recuperar opciones del servidor.

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `optionsSearchDebounce()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Integrar con una relación Eloquent

Puedes emplear el método `optionsRelationship()` del `SelectColumn` para configurar una relación `BelongsTo` para recuperar automáticamente opciones. El `titleAttribute` es el nombre de una columna que se usará para generar una etiqueta para cada opción:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
```

### Buscar opciones de relación en múltiples columnas

Por defecto, si el select también es buscable, Filament devolverá resultados de búsqueda para la relación basados en la columna título de la relación. Si quieres buscar en múltiples columnas, puedes pasar un array de columnas al método `searchableOptions()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions(['name', 'email'])
```

### Precargar opciones de relación

Si quieres poblar las opciones buscables desde la base de datos cuando se carga la página, en lugar de cuando el usuario busca, puedes usar el método `preloadOptions()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions()
    ->preloadOptions()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe precargarse o no:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions()
    ->preload(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `preload()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Excluir el registro actual

Cuando trabajas con relaciones recursivas, probablemente querrás remover el registro actual del conjunto de resultados.

Esto se puede hacer fácilmente usando el argumento `ignoreRecord`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('parent_id')
    ->optionsRelationship(name: 'parent', titleAttribute: 'name', ignoreRecord: true)
```

### Personalizar la consulta de relación

Puedes personalizar la consulta de base de datos que recupera opciones usando el tercer parámetro del método `optionsRelationship()`:

```php
use Filament\Tables\Columns\SelectColumn;
use Illuminate\Database\Eloquent\Builder;

SelectColumn::make('author_id')
    ->optionsRelationship(
        name: 'author',
        titleAttribute: 'name',
        modifyQueryUsing: fn (Builder $query) => $query->withTrashed(),
    )
```

<details>
<summary>💡 Utility Injection</summary>

El argumento `modifyQueryUsing` puede inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar las etiquetas de opciones de relación

Si quieres personalizar la etiqueta de cada opción, tal vez para ser más descriptiva, o para concatenar un nombre y apellido, podrías usar una columna virtual en tu migración de base de datos:

```php
$table->string('full_name')->virtualAs('concat(first_name, \' \', last_name)');
```

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'full_name')
```

Alternativamente, puedes usar el método `getOptionLabelFromRecordUsing()` para transformar el modelo Eloquent de una opción en una etiqueta:

```php
use Filament\Tables\Columns\SelectColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

SelectColumn::make('author_id')
    ->optionsRelationship(
        name: 'author',
        modifyQueryUsing: fn (Builder $query) => $query->orderBy('first_name')->orderBy('last_name'),
    )
    ->getOptionLabelFromRecordUsing(fn (Model $record) => "{$record->first_name} {$record->last_name}")
    ->searchableOptions(['first_name', 'last_name'])
```

<details>
<summary>💡 Utility Injection</summary>

El método `getOptionLabelFromRecordUsing()` puede inyectar varias utilidades en la función como parámetros.

</details>

### Recordar opciones

Por defecto, cuando usas `optionsRelationship()`, Filament recordará las opciones durante la duración de la página de tabla para mejorar el rendimiento. Esto significa que la función de opciones solo se ejecutará una vez por página de tabla en lugar de una vez por celda. Puedes desactivar este comportamiento usando el método `rememberOptions(false)`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->rememberOptions(false)
```

:::warning
Cuando las opciones se recuerdan, cualquier opción específica del registro u opciones deshabilitadas no funcionarán correctamente, ya que se usarán las mismas opciones para todos los registros en la tabla. Si necesitas opciones específicas del registro u opciones deshabilitadas, debes desactivar el recordar opciones.
:::

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `rememberOptions()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Permitir HTML en las etiquetas de opciones

Por defecto, Filament escapará cualquier HTML en las etiquetas de opciones. Si quieres permitir HTML, puedes usar el método `allowOptionsHtml()`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('technology')
    ->options([
        'tailwind' => '<span class="text-blue-500">Tailwind</span>',
        'alpine' => '<span class="text-green-500">Alpine</span>',
        'laravel' => '<span class="text-red-500">Laravel</span>',
        'livewire' => '<span class="text-pink-500">Livewire</span>',
    ])
    ->searchableOptions()
    ->allowOptionsHtml()
```

:::danger
Ten en cuenta que necesitarás asegurar que el HTML sea seguro para renderizar, de lo contrario tu aplicación será vulnerable a ataques XSS.
:::

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe permitir HTML o no:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('technology')
    ->options([
        'tailwind' => '<span class="text-blue-500">Tailwind</span>',
        'alpine' => '<span class="text-green-500">Alpine</span>',
        'laravel' => '<span class="text-red-500">Laravel</span>',
        'livewire' => '<span class="text-pink-500">Livewire</span>',
    ])
    ->searchableOptions()
    ->allowOptionsHtml(FeatureFlag::active())
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `allowOptionsHtml()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Ajustar o truncar etiquetas de opciones

Cuando uses el select de JavaScript, las etiquetas que excedan el ancho del elemento select se ajustarán a múltiples líneas por defecto. Alternativamente, puedes elegir truncar las etiquetas que se desborden.

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('truncate')
    ->wrapOptionLabels(false)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `wrapOptionLabels()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Desactivar la selección de placeholder

Puedes prevenir que el placeholder (opción null) sea seleccionado usando el método `selectablePlaceholder(false)`:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->selectablePlaceholder(false)
```

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `selectablePlaceholder()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Desactivar opciones específicas

Puedes desactivar opciones específicas usando el método `disableOptionWhen()`. Acepta un closure, en el cual puedes verificar si la opción con un `$value` específico debe desactivarse:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->default('draft')
    ->disableOptionWhen(fn (string $value): bool => $value === 'published')
```

<details>
<summary>💡 Utility Injection</summary>

Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Limitar el número de opciones

Puedes limitar el número de opciones que se muestran en un select o multi-select buscable usando el método `optionsLimit()`. El valor por defecto es 50:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->optionsRelationship(name: 'author', titleAttribute: 'name')
    ->searchableOptions()
    ->optionsLimit(20)
```

Asegúrate de no elevar demasiado el límite, ya que esto puede hacer que el select se vuelva lento y no responda debido al alto uso de memoria en el navegador.

<details>
<summary>💡 Utility Injection</summary>

Además de permitir un valor estático, el método `optionsLimit()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Validación

Puedes validar la entrada pasando cualquier [regla de validación de Laravel](https://laravel.com/docs/validation#available-validation-rules) en un array:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->rules(['required'])
```

### Validación de opciones válidas (regla `in`)

La regla `in` asegura que los usuarios no puedan seleccionar una opción que no esté en la lista de opciones. Esta es una regla importante para propósitos de integridad de datos, por lo que Filament la aplica por defecto a todos los campos select.

Dado que hay muchas formas para que un campo select pueble sus opciones, y en muchos casos las opciones no se cargan todas en el select por defecto y requieren búsqueda para recuperarlas, Filament usa la presencia de una "etiqueta de opción" válida para determinar si el valor seleccionado existe. También verifica si esa opción está [desactivada](#desactivar-opciones-específicas) o no.

Si estás usando una consulta de búsqueda personalizada para recuperar opciones, debes asegurar que el método `getOptionLabelUsing()` esté definido, para que Filament pueda validar el valor seleccionado contra las opciones disponibles:

```php
use Filament\Tables\Columns\SelectColumn;

SelectColumn::make('author_id')
    ->searchableOptions()
    ->getOptionsSearchResultsUsing(fn (string $search): array => Author::query()
        ->where('name', 'like', "%{$search}%")
        ->limit(50)
        ->pluck('name', 'id')
        ->all())
    ->getOptionLabelUsing(fn (string $value): ?string => Author::find($value)?->name),
```

El método `getOptionLabelUsing()` debe devolver `null` si la opción no es válida, para permitir que Filament determine que el valor seleccionado no está en la lista de opciones. Si la opción es válida, debe devolver la etiqueta de la opción.

Si estás usando el método `optionsRelationship()`, el método `getOptionLabelUsing()` se definirá automáticamente para ti, por lo que no necesitas preocuparte por ello.

## Hooks del ciclo de vida

Los hooks pueden usarse para ejecutar código en varios puntos dentro del ciclo de vida del select:

```php
SelectColumn::make()
    ->beforeStateUpdated(function ($record, $state) {
        // Se ejecuta antes de que el estado se guarde en la base de datos.
    })
    ->afterStateUpdated(function ($record, $state) {
        // Se ejecuta después de que el estado se guarde en la base de datos.
    })
```
