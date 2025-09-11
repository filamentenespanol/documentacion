---
title: Búsqueda global
---

## Introducción

La búsqueda global permite buscar entre todos los registros de tus recursos, desde cualquier parte de la aplicación.

## Establecer títulos de resultados en la búsqueda global

Para habilitar la búsqueda global en tu modelo, debes [establecer un atributo de título](overview#record-titles) en tu recurso:

```php
protected static ?string $recordTitleAttribute = 'title';
```

Este atributo se usa para obtener el título del resultado de búsqueda de ese registro.

:::warning
Tu recurso necesita tener una página de **Editar** o **Ver** para que los resultados de búsqueda global se puedan vincular a una URL. De lo contrario, no se devolverán resultados para este recurso.
:::

Puedes personalizar aún más el título sobrescribiendo el método `getGlobalSearchResultTitle()`. Este puede devolver una cadena de texto, o una instancia de `Illuminate\Support\HtmlString` o `Illuminate\Contracts\Support\Htmlable`. Esto permite renderizar HTML o incluso Markdown en el título del resultado:

```php
use Illuminate\Contracts\Support\Htmlable;

public static function getGlobalSearchResultTitle(Model $record): string | Htmlable
{
    return $record->name;
}
```

## Búsqueda global en múltiples columnas

Si deseas buscar en múltiples columnas de tu recurso, puedes sobrescribir el método `getGloballySearchableAttributes()`. La "notación de punto" te permite buscar dentro de relaciones:

```php
public static function getGloballySearchableAttributes(): array
{
    return ['title', 'slug', 'author.name', 'category.name'];
}
```

## Añadir detalles extra a los resultados de búsqueda global

Los resultados de búsqueda pueden mostrar "detalles" debajo de su título, para dar más información al usuario. Para habilitar esta característica, sobrescribe el método `getGlobalSearchResultDetails()`:

```php
public static function getGlobalSearchResultDetails(Model $record): array
{
    return [
        'Autor' => $record->author->name,
        'Categoría' => $record->category->name,
    ];
}
```

En este ejemplo, la categoría y el autor del registro se mostrarán debajo de su título en el resultado de búsqueda. Sin embargo, las relaciones `category` y `author` se cargarán de forma lazy, lo cual puede afectar el rendimiento. Para [cargarlas anticipadamente](https://laravel.com/docs/eloquent-relationships#eager-loading), debemos sobrescribir el método `getGlobalSearchEloquentQuery()`:

```php
public static function getGlobalSearchEloquentQuery(): Builder
{
    return parent::getGlobalSearchEloquentQuery()->with(['author', 'category']);
}
```

## Personalizar URLs de resultados de búsqueda global

Los resultados de búsqueda global enlazarán por defecto a la [página de edición](editing-records) de tu recurso, o a la [página de vista](viewing-page) si el usuario no tiene [permisos de edición](editing-records#authorization). Puedes personalizarlo sobrescribiendo `getGlobalSearchResultUrl()` y devolviendo la ruta que prefieras:

```php
public static function getGlobalSearchResultUrl(Model $record): string
{
    return UserResource::getUrl('edit', ['record' => $record]);
}
```

## Añadir acciones a resultados de búsqueda global

La búsqueda global admite **acciones**, que son botones que aparecen debajo de cada resultado. Estas acciones pueden abrir una URL o despachar un evento de Livewire.

Las acciones se definen de la siguiente manera:

```php
use Filament\Actions\Action;

public static function getGlobalSearchResultActions(Model $record): array
{
    return [
        Action::make('edit')
            ->url(static::getUrl('edit', ['record' => $record])),
    ];
}
```

Más información sobre cómo dar estilo a botones de acciones [aquí](../actions/overview).

### Abrir URLs desde acciones de búsqueda global

Puedes abrir una URL, opcionalmente en una nueva pestaña, al hacer clic en una acción:

```php
use Filament\Actions\Action;

Action::make('view')
    ->url(static::getUrl('view', ['record' => $record]), shouldOpenInNewTab: true)
```

### Despachar eventos de Livewire desde búsquedas globales

En ocasiones quieres ejecutar código adicional cuando se haga clic en una acción de resultado de búsqueda global. Esto puede lograrse configurando un evento de Livewire que se despacha al hacer clic en la acción. Puedes pasar un array de datos que estarán disponibles en el listener del componente Livewire:

```php
use Filament\Actions\Action;

Action::make('quickView')
    ->dispatch('quickView', [$record->id])
```

## Limitar el número de resultados

Por defecto, la búsqueda global devolverá hasta 50 resultados por recurso. Puedes personalizar este valor sobrescribiendo la propiedad `$globalSearchResultsLimit` en el recurso:

```php
protected static int $globalSearchResultsLimit = 20;
```

## Desactivar búsqueda global

Como se [explicó antes](#title), la búsqueda global se habilita automáticamente al establecer un atributo de título en el recurso. A veces, quizás quieras definir el atributo de título sin habilitar la búsqueda global.

Esto se logra desactivando la búsqueda global en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->globalSearch(false);
}
```

## Atajos de teclado

El campo de búsqueda global puede abrirse usando atajos de teclado. Para configurarlos, utiliza el método `globalSearchKeyBindings()` en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->globalSearchKeyBindings(['command+k', 'ctrl+k']);
}
```

## Configurar el debounce de la búsqueda global

La búsqueda global tiene un tiempo de *debounce* por defecto de 500ms, para limitar las solicitudes mientras el usuario escribe. Puedes ajustarlo usando `globalSearchDebounce()` en la [configuración](../panel-configuration):

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->globalSearchDebounce('750ms');
}
```

## Configurar el sufijo del campo de búsqueda global

Por defecto el campo de búsqueda global no incluye ningún sufijo. Puedes personalizarlo usando `globalSearchFieldSuffix()` en la [configuración](../panel-configuration).

Si quieres mostrar los atajos de teclado configurados como sufijo del campo, puedes usar `globalSearchFieldKeyBindingSuffix()`, que mostrará el primer atajo registrado como sufijo:

```php
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->globalSearchFieldKeyBindingSuffix();
}
```

Para personalizar el sufijo manualmente, puedes pasar una cadena o función a `globalSearchFieldSuffix()`. Por ejemplo, para definir un atajo distinto según la plataforma:

```php
use Filament\Panel;
use Filament\Support\Enums\Platform;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->globalSearchFieldSuffix(fn (): ?string => match (Platform::detect()) {
            Platform::Windows, Platform::Linux => 'CTRL+K',
            Platform::Mac => '⌘K',
            default => null,
        });
}
```

## Desactivar división de términos de búsqueda

Por defecto, la búsqueda global divide la cadena buscada en palabras individuales y busca cada una por separado. Esto permite consultas más flexibles, pero puede degradar el rendimiento en grandes volúmenes de datos. Puedes desactivar este comportamiento poniendo la propiedad `$shouldSplitGlobalSearchTerms` en `false` en el recurso:

```php
protected static ?bool $shouldSplitGlobalSearchTerms = false;
```
