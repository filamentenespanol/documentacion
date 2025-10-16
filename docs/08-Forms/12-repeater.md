---
title: Repeater
---

## Introducción

El componente repeater te permite generar un array JSON de componentes de formulario repetidos.

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;

Repeater::make('members')
    ->schema([
        TextInput::make('name')->required(),
        Select::make('role')
            ->options([
                'member' => 'Member',
                'administrator' => 'Administrator',
                'owner' => 'Owner',
            ])
            ->required(),
    ])
    ->columns(2)
```

Recomendamos que almacenes los datos del repeater con una columna `JSON` en tu base de datos. Además, si estás usando Eloquent, asegúrate de que esa columna tenga un cast `array`.

Como se evidencia en el ejemplo anterior, el esquema del componente puede definirse dentro del método `schema()` del componente:

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;

Repeater::make('members')
    ->schema([
        TextInput::make('name')->required(),
        // ...
    ])
```

Si deseas definir un repeater con múltiples bloques de esquema que puedan repetirse en cualquier orden, por favor usa el [builder](builder).

## Establecer elementos vacíos por defecto

Los repeaters pueden tener un cierto número de elementos vacíos creados por defecto. El valor predeterminado solo se usa cuando se carga un esquema sin datos. En un [recurso de panel](../resources) estándar, los valores predeterminados se usan en la página Create, no en la página Edit. Para usar elementos predeterminados, pasa el número de elementos al método `defaultItems()`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->defaultItems(3)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>defaultItems()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Añadir elementos

Se muestra un botón de acción debajo del repeater para permitir al usuario añadir un nuevo elemento.

## Establecer la etiqueta del botón de acción de añadir

Puedes establecer una etiqueta para personalizar el texto que debe mostrarse en el botón para añadir un elemento del repeater, usando el método `addActionLabel()`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->addActionLabel('Add member')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>addActionLabel()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Alinear el botón de acción de añadir

Por defecto, la acción de añadir está alineada en el centro. Puedes ajustar esto usando el método `addActionAlignment()`, pasando una opción `Alignment` de `Alignment::Start` o `Alignment::End`:

```php
use Filament\Forms\Components\Repeater;
use Filament\Support\Enums\Alignment;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->addActionAlignment(Alignment::Start)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>addActionAlignment()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Evitar que el usuario añada elementos

Puedes evitar que el usuario añada elementos al repeater usando el método `addable(false)`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->addable(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>addable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Eliminar elementos

Se muestra un botón de acción en cada elemento para permitir al usuario eliminarlo.

### Evitar que el usuario elimine elementos

Puedes evitar que el usuario elimine elementos del repeater usando el método `deletable(false)`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->deletable(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>deletable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Reordenar elementos

Se muestra un botón en cada elemento para permitir al usuario arrastrar y soltar para reordenarlo en la lista.

### Evitar que el usuario reordene elementos

Puedes evitar que el usuario reordene elementos del repeater usando el método `reorderable(false)`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->reorderable(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>reorderable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Reordenar elementos con botones

Puedes usar el método `reorderableWithButtons()` para habilitar el reordenamiento de elementos con botones para mover el elemento hacia arriba y hacia abajo:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->reorderableWithButtons()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el repeater debe ordenarse con botones o no:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->reorderableWithButtons(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>reorderableWithButtons()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Evitar el reordenamiento con arrastrar y soltar

Puedes usar el método `reorderableWithDragAndDrop(false)` para evitar que los elementos se ordenen con arrastrar y soltar:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->reorderableWithDragAndDrop(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>reorderableWithDragAndDrop()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Colapsar elementos

El repeater puede ser `collapsible()` para ocultar opcionalmente el contenido en formularios largos:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->schema([
        // ...
    ])
    ->collapsible()
```

También puedes colapsar todos los elementos por defecto:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->schema([
        // ...
    ])
    ->collapsed()
```

Opcionalmente, los métodos `collapsible()` y `collapsed()` aceptan un valor booleano para controlar si el repeater debe ser colapsable y colapsado o no:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->schema([
        // ...
    ])
    ->collapsible(FeatureFlag::active())
    ->collapsed(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>collapsible()</code> y <code>collapsed()</code> también aceptan funciones para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Clonar elementos

Puedes permitir que los elementos del repeater se dupliquen usando el método `cloneable()`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->schema([
        // ...
    ])
    ->cloneable()
```

Opcionalmente, el método `cloneable()` acepta un valor booleano para controlar si el repeater debe ser clonable o no:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->schema([
        // ...
    ])
    ->cloneable(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>cloneable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Integrar con una relación Eloquent

Puedes emplear el método `relationship()` del `Repeater` para configurar una relación `HasMany`. Filament cargará los datos del elemento desde la relación y los guardará de vuelta en la relación cuando se envíe el formulario. Si no se pasa un nombre de relación personalizado a `relationship()`, Filament usará el nombre del campo como nombre de la relación:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->relationship()
    ->schema([
        // ...
    ])
```

:::warning
Al usar `disabled()` con `relationship()`, asegúrate de que `disabled()` se llame antes de `relationship()`. Esto asegura que la llamada a `dehydrated()` desde dentro de `relationship()` no sea anulada por la llamada desde `disabled()`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->disabled()
    ->relationship()
    ->schema([
        // ...
    ])
```
:::

### Reordenar elementos en una relación

Por defecto, el [reordenamiento](#reordering-items) de elementos del repeater de relación está deshabilitado. Esto se debe a que tu modelo relacionado necesita una columna `sort` para almacenar el orden de los registros relacionados. Para habilitar el reordenamiento, puedes usar el método `orderColumn()`, pasando el nombre de la columna en tu modelo relacionado para almacenar el orden:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->relationship()
    ->schema([
        // ...
    ])
    ->orderColumn('sort')
```

Si usas algo como [`spatie/eloquent-sortable`](https://github.com/spatie/eloquent-sortable) con una columna de orden como `order_column`, puedes pasarla a `orderColumn()`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->relationship()
    ->schema([
        // ...
    ])
    ->orderColumn('order_column')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>orderColumn()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Integrar con una relación Eloquent `BelongsToMany`

Existe un concepto erróneo común de que usar una relación `BelongsToMany` con un repeater es tan simple como usar una relación `HasMany`. Este no es el caso, ya que una relación `BelongsToMany` requiere una tabla pivote para almacenar los datos de la relación. El repeater guarda sus datos en el modelo relacionado, no en la tabla pivote. Por lo tanto, si deseas mapear cada elemento del repeater a una fila en la tabla pivote, debes usar una relación `HasMany` con un modelo pivote para usar un repeater con una relación `BelongsToMany`.

Imagina que tienes un formulario para crear un nuevo modelo `Order`. Cada pedido pertenece a muchos modelos `Product`, y cada producto pertenece a muchos pedidos. Tienes una tabla pivote `order_product` para almacenar los datos de la relación. En lugar de usar la relación `products` con el repeater, debes crear una nueva relación llamada `orderProducts` en el modelo `Order`, y usarla con el repeater:

```php
use Illuminate\Database\Eloquent\Relations\HasMany;

public function orderProducts(): HasMany
{
    return $this->hasMany(OrderProduct::class);
}
```

Si aún no tienes un modelo pivote `OrderProduct`, debes crearlo, con relaciones inversas a `Order` y `Product`:

```php
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class OrderProduct extends Pivot
{
    public $incrementing = true;

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
```

:::info
Asegúrate de que tu modelo pivote tenga una columna de clave primaria, como `id`, para permitir que Filament haga un seguimiento de qué elementos del repeater se han creado, actualizado y eliminado. Para asegurarte de que Filament haga un seguimiento de la clave primaria, el modelo pivote necesita tener la propiedad `$incrementing` establecida en `true`.
:::

Ahora puedes usar la relación `orderProducts` con el repeater, y guardará los datos en la tabla pivote `order_product`:

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;

Repeater::make('orderProducts')
    ->relationship()
    ->schema([
        Select::make('product_id')
            ->relationship('product', 'name')
            ->required(),
        // ...
    ])
```

### Mutar datos de elementos relacionados antes de llenar el campo

Puedes mutar los datos de un elemento relacionado antes de que se llene en el campo usando el método `mutateRelationshipDataBeforeFillUsing()`. Este método acepta un closure que recibe los datos del elemento actual en una variable `$data`. Debes devolver el array modificado de datos:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->relationship()
    ->schema([
        // ...
    ])
    ->mutateRelationshipDataBeforeFillUsing(function (array $data): array {
        $data['user_id'] = auth()->id();

        return $data;
    })
```

<details>
  <summary>Inyección de utilidades</summary>
  Puedes inyectar varias utilidades en la función pasada a <code>mutateRelationshipDataBeforeFillUsing()</code> como parámetros.
</details>

### Mutar datos de elementos relacionados antes de crear

Puedes mutar los datos de un nuevo elemento relacionado antes de que se cree en la base de datos usando el método `mutateRelationshipDataBeforeCreateUsing()`. Este método acepta un closure que recibe los datos del elemento actual en una variable `$data`. Puedes elegir devolver el array modificado de datos, o `null` para evitar que se cree el elemento:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->relationship()
    ->schema([
        // ...
    ])
    ->mutateRelationshipDataBeforeCreateUsing(function (array $data): array {
        $data['user_id'] = auth()->id();

        return $data;
    })
```

<details>
  <summary>Inyección de utilidades</summary>
  Puedes inyectar varias utilidades en la función pasada a <code>mutateRelationshipDataBeforeCreateUsing()</code> como parámetros.
</details>

### Mutar datos de elementos relacionados antes de guardar

Puedes mutar los datos de un elemento relacionado existente antes de que se guarde en la base de datos usando el método `mutateRelationshipDataBeforeSaveUsing()`. Este método acepta un closure que recibe los datos del elemento actual en una variable `$data`. Puedes elegir devolver el array modificado de datos, o `null` para evitar que se guarde el elemento:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->relationship()
    ->schema([
        // ...
    ])
    ->mutateRelationshipDataBeforeSaveUsing(function (array $data): array {
        $data['user_id'] = auth()->id();

        return $data;
    })
```

<details>
  <summary>Inyección de utilidades</summary>
  Puedes inyectar varias utilidades en la función pasada a <code>mutateRelationshipDataBeforeSaveUsing()</code> como parámetros.
</details>

## Diseño de cuadrícula

Puedes organizar los elementos del repeater en columnas usando el método `grid()`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('qualifications')
    ->schema([
        // ...
    ])
    ->grid(2)
```

Este método acepta las mismas opciones que el método `columns()` del [grid](../schemas/layouts#grid-system). Esto te permite personalizar de forma responsiva el número de columnas de la cuadrícula en varios puntos de interrupción.

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>grid()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Añadir una etiqueta a los elementos del repeater basada en su contenido

Puedes añadir una etiqueta para los elementos del repeater usando el método `itemLabel()`. Este método acepta un closure que recibe los datos del elemento actual en una variable `$state`. Debes devolver un string para usarse como etiqueta del elemento:

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;

Repeater::make('members')
    ->schema([
        TextInput::make('name')
            ->required()
            ->live(onBlur: true),
        Select::make('role')
            ->options([
                'member' => 'Member',
                'administrator' => 'Administrator',
                'owner' => 'Owner',
            ])
            ->required(),
    ])
    ->columns(2)
    ->itemLabel(fn (array $state): ?string => $state['name'] ?? null),
```

:::tip
Cualquier campo que uses de `$state` debe ser `live()` si deseas ver la etiqueta del elemento actualizarse en vivo mientras usas el formulario.
:::

<details>
  <summary>Inyección de utilidades</summary>
  Puedes inyectar varias utilidades en la función pasada a <code>itemLabel()</code> como parámetros.
</details>

## Repeaters simples con un campo

Puedes usar el método `simple()` para crear un repeater con un solo campo, usando un diseño minimalista:

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;

Repeater::make('invitations')
    ->simple(
        TextInput::make('email')
            ->email()
            ->required(),
    )
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>simple()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

En lugar de usar un array anidado para almacenar datos, los repeaters simples usan un array plano de valores. Esto significa que la estructura de datos para el ejemplo anterior podría verse así:

```php
[
    'invitations' => [
        'dan@filamentphp.com',
        'ryan@filamentphp.com',
    ],
],
```

## Usar `$get()` para acceder a valores de campos padre

Todos los componentes de formulario pueden [usar `$get()` y `$set()`](overview#injecting-the-state-of-another-field) para acceder al valor de otro campo. Sin embargo, puedes experimentar un comportamiento inesperado al usar esto dentro del esquema del repeater.

Esto se debe a que `$get()` y `$set()`, por defecto, están limitados al elemento del repeater actual. Esto significa que puedes interactuar con otro campo dentro de ese elemento del repeater fácilmente sin saber a qué elemento del repeater pertenece el componente de formulario actual.

La consecuencia de esto es que puedes estar confundido cuando no puedas interactuar con un campo fuera del repeater. Usamos la sintaxis `../` para resolver este problema - `$get('../parent_field_name')`.

Considera que tu formulario tiene esta estructura de datos:

```php
[
    'client_id' => 1,

    'repeater' => [
        'item1' => [
            'service_id' => 2,
        ],
    ],
]
```

Estás intentando recuperar el valor de `client_id` desde dentro del elemento del repeater.

`$get()` es relativo al elemento del repeater actual, por lo que `$get('client_id')` está buscando `$get('repeater.item1.client_id')`.

Puedes usar `../` para subir un nivel en la estructura de datos, por lo que `$get('../client_id')` es `$get('repeater.client_id')` y `$get('../../client_id')` es `$get('client_id')`.

El caso especial de `$get()` sin argumentos, o `$get('')` o `$get('./')`, siempre devolverá el array de datos completo para el elemento del repeater actual.

## Repeaters de tabla

Puedes presentar elementos del repeater en formato de tabla usando el método `table()`, que acepta un array de objetos `TableColumn`. Estos objetos representan las columnas de la tabla, que corresponden a cualquier componente en el esquema del repeater:

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Repeater\TableColumn;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;

Repeater::make('members')
    ->table([
        TableColumn::make('Name'),
        TableColumn::make('Role'),
    ])
    ->schema([
        TextInput::make('name')
            ->required(),
        Select::make('role')
            ->options([
                'member' => 'Member',
                'administrator' => 'Administrator',
                'owner' => 'Owner',
            ])
            ->required(),
    ])
```

Las etiquetas mostradas en el encabezado de la tabla se pasan al método `TableColumn::make()`. Si deseas proporcionar una etiqueta accesible para una columna pero no deseas mostrarla, puedes usar el método `hiddenHeaderLabel()`:

```php
use Filament\Forms\Components\Repeater\TableColumn;

TableColumn::make('Name')
    ->hiddenHeaderLabel()
```

Si deseas marcar una columna como "requerida" con un asterisco rojo, puedes usar el método `markAsRequired()`:

```php
use Filament\Forms\Components\Repeater\TableColumn;

TableColumn::make('Name')
    ->markAsRequired()
```

Puedes habilitar el ajuste del encabezado de la columna usando el método `wrapHeader()`:

```php
use Filament\Forms\Components\Repeater\TableColumn;

TableColumn::make('Name')
    ->wrapHeader()
```

También puedes ajustar la alineación del encabezado de la columna usando el método `alignment()`, pasando una opción `Alignment` de `Alignment::Start`, `Alignment::Center`, o `Alignment::End`:

```php
use Filament\Forms\Components\Repeater\TableColumn;
use Filament\Support\Enums\Alignment;

TableColumn::make('Name')
    ->alignment(Alignment::Start)
```

Puedes establecer un ancho de columna fijo usando el método `width()`, pasando un valor de string que representa el ancho de la columna. Este valor se pasa directamente al atributo `style` del encabezado de la columna:

```php
use Filament\Forms\Components\Repeater\TableColumn;

TableColumn::make('Name')
    ->width('200px')
```

## Validación del repeater

Además de todas las reglas listadas en la página de [validación](validation), hay reglas adicionales que son específicas para los repeaters.

### Validación del número de elementos

Puedes validar el número mínimo y máximo de elementos que puedes tener en un repeater estableciendo los métodos `minItems()` y `maxItems()`:

```php
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->minItems(2)
    ->maxItems(5)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>minItems()</code> y <code>maxItems()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Validación de estado distinto

En muchos casos, querrás asegurar algún tipo de unicidad entre los elementos del repeater. Un par de ejemplos comunes podrían ser:

- Asegurar que solo un [checkbox](checkbox) o [toggle](toggle) esté activado a la vez en todos los elementos del repeater.
- Asegurar que una opción solo pueda seleccionarse una vez en campos [select](select), [radio](radio), [checkbox list](checkbox-list), o [toggle buttons](toggle-buttons) en un repeater.

Puedes usar el método `distinct()` para validar que el estado de un campo sea único en todos los elementos del repeater:

```php
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Repeater;

Repeater::make('answers')
    ->schema([
        // ...
        Checkbox::make('is_correct')
            ->distinct(),
    ])
```

El comportamiento de la validación `distinct()` depende del tipo de datos que maneja el campo:

- Si el campo devuelve un booleano, como un [checkbox](checkbox) o [toggle](toggle), la validación asegurará que solo un elemento tenga un valor de `true`. Puede haber muchos campos en el repeater que tengan un valor de `false`.
- De lo contrario, para campos como [select](select), [radio](radio), [checkbox list](checkbox-list), o [toggle buttons](toggle-buttons), la validación asegurará que cada opción solo pueda seleccionarse una vez en todos los elementos del repeater.

Opcionalmente, puedes pasar un valor booleano al método `distinct()` para controlar si el campo debe ser distinto o no:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('is_correct')
    ->distinct(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>distinct()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

#### Corregir automáticamente el estado no distinto

Si deseas corregir automáticamente el estado no distinto, puedes usar el método `fixIndistinctState()`:

```php
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Repeater;

Repeater::make('answers')
    ->schema([
        // ...
        Checkbox::make('is_correct')
            ->fixIndistinctState(),
    ])
```

Este método habilitará automáticamente los métodos `distinct()` y `live()` en el campo.

Dependiendo del tipo de datos que maneja el campo, el comportamiento de `fixIndistinctState()` se adapta:

- Si el campo devuelve un booleano, como un [checkbox](checkbox) o [toggle](toggle), y uno de los campos está habilitado, Filament deshabilitará automáticamente todos los demás campos habilitados en nombre del usuario.
- De lo contrario, para campos como [select](select), [radio](radio), [checkbox list](checkbox-list), o [toggle buttons](toggle-buttons), cuando un usuario selecciona una opción, Filament deseleccionará automáticamente todos los demás usos de esa opción en nombre del usuario.

Opcionalmente, puedes pasar un valor booleano al método `fixIndistinctState()` para controlar si el campo debe corregir el estado no distinto o no:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('is_correct')
    ->fixIndistinctState(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>fixIndistinctState()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

#### Deshabilitar opciones cuando ya están seleccionadas en otro elemento

Si deseas deshabilitar opciones en un [select](select), [radio](radio), [checkbox list](checkbox-list), o [toggle buttons](toggle-buttons) cuando ya están seleccionadas en otro elemento, puedes usar el método `disableOptionsWhenSelectedInSiblingRepeaterItems()`:

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;

Repeater::make('members')
    ->schema([
        Select::make('role')
            ->options([
                // ...
            ])
            ->disableOptionsWhenSelectedInSiblingRepeaterItems(),
    ])
```

Este método habilitará automáticamente los métodos `distinct()` y `live()` en el campo.

:::warning
En caso de que desees añadir otra condición para [deshabilitar opciones](../select#disabling-specific-options), puedes encadenar `disableOptionWhen()` con el argumento `merge: true`:

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;

Repeater::make('members')
    ->schema([
        Select::make('role')
            ->options([
                // ...
            ])
            ->disableOptionsWhenSelectedInSiblingRepeaterItems()
            ->disableOptionWhen(fn (string $value): bool => $value === 'super_admin', merge: true),
    ])
```
:::

## Personalizar las acciones de elementos del repeater

Este campo usa objetos de acción para facilitar la personalización de los botones dentro de él. Puedes personalizar estos botones pasando una función a un método de registro de acción. La función tiene acceso al objeto `$action`, que puedes usar para [personalizarlo](../actions/overview). Los siguientes métodos están disponibles para personalizar las acciones:

- `addAction()`
- `cloneAction()`
- `collapseAction()`
- `collapseAllAction()`
- `deleteAction()`
- `expandAction()`
- `expandAllAction()`
- `moveDownAction()`
- `moveUpAction()`
- `reorderAction()`

Aquí hay un ejemplo de cómo podrías personalizar una acción:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->collapseAllAction(
        fn (Action $action) => $action->label('Collapse all members'),
    )
```

<details>
  <summary>Inyección de utilidades</summary>
  Los métodos de registro de acción pueden inyectar varias utilidades en la función como parámetros.
</details>

### Confirmar acciones del repeater con un modal

Puedes confirmar acciones con un modal usando el método `requiresConfirmation()` en el objeto de acción. Puedes usar cualquier [método de personalización de modal](../actions/modals) para cambiar su contenido y comportamiento:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;

Repeater::make('members')
    ->schema([
        // ...
    ])
    ->deleteAction(
        fn (Action $action) => $action->requiresConfirmation(),
    )
```

:::info
Los métodos `collapseAction()`, `collapseAllAction()`, `expandAction()`, `expandAllAction()` y `reorderAction()` no admiten modales de confirmación, ya que hacer clic en sus botones no realiza la solicitud de red que se requiere para mostrar el modal.
:::

### Añadir acciones de elemento adicionales a un repeater

Puedes añadir nuevos [botones de acción](../actions) al encabezado de cada elemento del repeater pasando objetos `Action` a `extraItemActions()`:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Mail;

Repeater::make('members')
    ->schema([
        TextInput::make('email')
            ->label('Email address')
            ->email(),
        // ...
    ])
    ->extraItemActions([
        Action::make('sendEmail')
            ->icon(Heroicon::Envelope)
            ->action(function (array $arguments, Repeater $component): void {
                $itemData = $component->getItemState($arguments['item']);

                Mail::to($itemData['email'])
                    ->send(
                        // ...
                    );
            }),
    ])
```

En este ejemplo, `$arguments['item']` te da el ID del elemento del repeater actual. Puedes validar los datos en ese elemento del repeater usando el método `getItemState()` en el componente repeater. Este método devuelve los datos validados para el elemento. Si el elemento no es válido, cancelará la acción y mostrará un mensaje de error para ese elemento en el formulario.

Si deseas obtener los datos sin procesar del elemento actual sin validarlos, puedes usar `$component->getRawItemState($arguments['item'])` en su lugar.

Si deseas manipular los datos sin procesar para todo el repeater, por ejemplo, para añadir, eliminar o modificar elementos, puedes usar `$component->getState()` para obtener los datos, y `$component->state($state)` para establecerlos nuevamente:

```php
use Illuminate\Support\Str;

// Obtener los datos sin procesar para todo el repeater
$state = $component->getState();

// Añadir un elemento, con un UUID aleatorio como clave
$state[Str::uuid()] = [
    'email' => auth()->user()->email,
];

// Establecer los nuevos datos para el repeater
$component->state($state);
```
