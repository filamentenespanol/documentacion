---
title: Builder
---

## Introducción

Similar a un [repeater](repeater), el componente builder te permite generar un array JSON de componentes de formulario repetidos. A diferencia del repeater, que solo define un esquema de formulario para repetir, el builder te permite definir diferentes "bloques" de esquema, que puedes repetir en cualquier orden. Esto lo hace útil para crear estructuras de arrays más avanzadas.

El uso principal del componente builder es construir contenido de páginas web utilizando bloques predefinidos. Esto podría ser contenido para un sitio web de marketing, o incluso campos en un formulario en línea. El siguiente ejemplo define múltiples bloques para diferentes elementos en el contenido de la página. En el frontend de tu sitio web, podrías iterar a través de cada bloque en el JSON y formatearlo como desees.

```php
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;

Builder::make('content')
    ->blocks([
        Block::make('heading')
            ->schema([
                TextInput::make('content')
                    ->label('Heading')
                    ->required(),
                Select::make('level')
                    ->options([
                        'h1' => 'Heading 1',
                        'h2' => 'Heading 2',
                        'h3' => 'Heading 3',
                        'h4' => 'Heading 4',
                        'h5' => 'Heading 5',
                        'h6' => 'Heading 6',
                    ])
                    ->required(),
            ])
            ->columns(2),
        Block::make('paragraph')
            ->schema([
                Textarea::make('content')
                    ->label('Paragraph')
                    ->required(),
            ]),
        Block::make('image')
            ->schema([
                FileUpload::make('url')
                    ->label('Image')
                    ->image()
                    ->required(),
                TextInput::make('alt')
                    ->label('Alt text')
                    ->required(),
            ]),
    ])
```

Recomendamos que almacenes los datos del builder con una columna `JSON` en tu base de datos. Además, si estás usando Eloquent, asegúrate de que esa columna tenga un cast `array`.

Como se evidencia en el ejemplo anterior, los bloques pueden definirse dentro del método `blocks()` del componente. Los bloques son objetos `Builder\Block`, y requieren un nombre único y un esquema de componentes:

```php
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;

Builder::make('content')
    ->blocks([
        Block::make('heading')
            ->schema([
                TextInput::make('content')->required(),
                // ...
            ]),
        // ...
    ])
```

## Establecer la etiqueta de un bloque

Por defecto, la etiqueta del bloque se determinará automáticamente según su nombre. Para sobrescribir la etiqueta del bloque, puedes usar el método `label()`. Personalizar la etiqueta de esta manera es útil si deseas usar una [cadena de traducción para localización](https://laravel.com/docs/localization#retrieving-translation-strings):

```php
use Filament\Forms\Components\Builder\Block;

Block::make('heading')
    ->label(__('blocks.heading'))
```

### Etiquetar elementos del builder según su contenido

Puedes añadir una etiqueta para un elemento del builder usando el mismo método `label()`. Este método acepta un closure que recibe los datos del elemento en una variable `$state`. Si `$state` es null, debes devolver la etiqueta del bloque que se debe mostrar en el selector de bloques. De lo contrario, debes devolver un string para usar como etiqueta del elemento:

```php
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;

Block::make('heading')
    ->schema([
        TextInput::make('content')
            ->live(onBlur: true)
            ->required(),
        // ...
    ])
    ->label(function (?array $state): string {
        if ($state === null) {
            return 'Heading';
        }

        return $state['content'] ?? 'Untitled heading';
    })
```

Cualquier campo que uses de `$state` debe ser `live()` si deseas ver la etiqueta del elemento actualizarse en vivo mientras usas el formulario.

<details>
  <summary>Inyección de utilidades</summary>
  Puedes inyectar varias utilidades en la función pasada a <code>label()</code> como parámetros.
</details>

### Numerar elementos del builder

Por defecto, los elementos en el builder tienen un número junto a su etiqueta. Puedes deshabilitar esto usando el método `blockNumbers(false)`:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->blockNumbers(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>blockNumbers()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Establecer el ícono de un bloque

Los bloques también pueden tener un [ícono](../styling/icons), que se muestra junto a la etiqueta. Puedes añadir un ícono pasando su nombre al método `icon()`:

```php
use Filament\Forms\Components\Builder\Block;
use Filament\Support\Icons\Heroicon;

Block::make('paragraph')
    ->icon(Heroicon::Bars3BottomLeft)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>icon()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Añadir íconos al encabezado de los bloques

Por defecto, los bloques en el builder no tienen un ícono junto a la etiqueta del encabezado, solo en el desplegable para añadir nuevos bloques. Puedes habilitar esto usando el método `blockIcons()`:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->blockIcons()
```

Opcionalmente, puedes pasar un valor booleano al método `blockIcons()` para controlar si los íconos se muestran en los encabezados de los bloques:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->blockIcons(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>blockIcons()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Previsualizar bloques

Si prefieres renderizar vistas previas de solo lectura en el builder en lugar de los formularios de los bloques, puedes usar el método `blockPreviews()`. Esto renderizará el `preview()` de cada bloque en lugar del formulario. Los datos del bloque se pasarán a la vista Blade de la previsualización en una variable con el mismo nombre:

```php
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;

Builder::make('content')
    ->blockPreviews()
    ->blocks([
        Block::make('heading')
            ->schema([
                TextInput::make('text')
                    ->placeholder('Default heading'),
            ])
            ->preview('filament.content.block-previews.heading'),
    ])
```

En `/resources/views/filament/content/block-previews/heading.blade.php`, puedes acceder a los datos del bloque así:

```blade
<h1>
    {{ $text ?? 'Default heading' }}
</h1>
```

Opcionalmente, el método `blockPreviews()` acepta un valor booleano para controlar si el builder debe renderizar previsualizaciones de bloques o no:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->blockPreviews(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>blockPreviews()</code> y <code>preview()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Previsualizaciones de bloques interactivas

Por defecto, el contenido de la previsualización no es interactivo, y al hacer clic se abrirá el modal de edición de ese bloque para gestionar su configuración. Si tienes enlaces y botones que deseas que sigan siendo interactivos en las previsualizaciones, puedes usar el argumento `areInteractive: true` del método `blockPreviews()`:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blockPreviews(areInteractive: true)
    ->blocks([
        //
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el argumento <code>areInteractive</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Añadir elementos

Se muestra un botón de acción debajo del builder para permitir al usuario añadir un nuevo elemento.

## Establecer la etiqueta del botón de añadir

Puedes establecer una etiqueta para personalizar el texto que debe mostrarse en el botón para añadir un elemento del builder, usando el método `addActionLabel()`:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->addActionLabel('Add a new block')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>addActionLabel()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Alinear el botón de añadir

Por defecto, la acción de añadir está alineada en el centro. Puedes ajustarlo usando el método `addActionAlignment()`, pasando una opción `Alignment` de `Alignment::Start` o `Alignment::End`:

```php
use Filament\Forms\Components\Builder;
use Filament\Support\Enums\Alignment;

Builder::make('content')
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

Puedes evitar que el usuario añada elementos al builder usando el método `addable(false)`:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
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

### Evitar que el usuario reordene elementos

Puedes evitar que el usuario reordene elementos del builder usando el método `reorderable(false)`:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
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
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->reorderableWithButtons()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el builder debe ordenarse con botones o no:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
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
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->reorderableWithDragAndDrop(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>reorderableWithDragAndDrop()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Colapsar elementos

El builder puede ser `collapsible()` para ocultar opcionalmente el contenido en formularios largos:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->collapsible()
```

También puedes colapsar todos los elementos por defecto:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->collapsed()
```

Opcionalmente, los métodos `collapsible()` y `collapsed()` aceptan un valor booleano para controlar si el builder debe ser colapsable y colapsado o no:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
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

Puedes permitir que los elementos del builder se dupliquen usando el método `cloneable()`:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->cloneable()
```

## Personalizar el selector de bloques

### Cambiar el número de columnas en el selector de bloques

El selector de bloques tiene solo 1 columna. Puedes personalizarlo pasando un número de columnas a `blockPickerColumns()`:

```php
use Filament\Forms\Components\Builder;

Builder::make()
    ->blockPickerColumns(2)
    ->blocks([
        // ...
    ])
```

Este método puede utilizarse de un par de maneras diferentes:

- Puedes pasar un entero como `blockPickerColumns(2)`. Este entero es el número de columnas usado en el breakpoint `lg` y superiores. Todos los dispositivos más pequeños tendrán solo 1 columna.
- Puedes pasar un array, donde la clave es el breakpoint y el valor es el número de columnas. Por ejemplo, `blockPickerColumns(['md' => 2, 'xl' => 4])` creará un diseño de 2 columnas en dispositivos medianos y de 4 columnas en dispositivos extra grandes. El breakpoint predeterminado para dispositivos más pequeños usa 1 columna, a menos que uses una clave de array `default`.

Los breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`) están definidos por Tailwind y pueden encontrarse en la [documentación de Tailwind](https://tailwindcss.com/docs/responsive-design#overview).

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>blockPickerColumns()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Aumentar el ancho del selector de bloques

Cuando [aumentas el número de columnas](#changing-the-number-of-columns-in-the-block-picker), el ancho del desplegable debe aumentar de forma incremental para manejar las columnas adicionales. Si deseas más control, puedes establecer manualmente un ancho máximo para el desplegable usando el método `blockPickerWidth()`. Las opciones corresponden a la [escala de max-width de Tailwind](https://tailwindcss.com/docs/max-width). Las opciones son `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`:

```php
use Filament\Forms\Components\Builder;

Builder::make()
    ->blockPickerColumns(3)
    ->blockPickerWidth('2xl')
    ->blocks([
        // ...
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>blockPickerWidth()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Limitar el número de veces que puede usarse un bloque

Por defecto, cada bloque puede usarse en el builder un número ilimitado de veces. Puedes limitar esto usando el método `maxItems()` en un bloque:

```php
use Filament\Forms\Components\Builder\Block;

Block::make('heading')
    ->schema([
        // ...
    ])
    ->maxItems(1)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>maxItems()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Usar `$get()` para acceder a valores de campos padre

Todos los componentes de formulario pueden [usar `$get()` y `$set()`](overview#injecting-the-state-of-another-field) para acceder al valor de otro campo. Sin embargo, puedes experimentar un comportamiento inesperado al usar esto dentro del esquema del builder.

Esto se debe a que `$get()` y `$set()`, por defecto, están limitados al elemento del builder actual. Esto significa que puedes interactuar con otro campo dentro de ese elemento del builder fácilmente sin saber a qué elemento del builder pertenece el componente de formulario actual.

La consecuencia de esto es que puedes estar confundido cuando no puedas interactuar con un campo fuera del builder. Usamos la sintaxis `../` para resolver este problema - `$get('../parent_field_name')`.

Considera que tu formulario tiene esta estructura de datos:

```php
[
    'client_id' => 1,

    'builder' => [
        'item1' => [
            'service_id' => 2,
        ],
    ],
]
```

Estás intentando recuperar el valor de `client_id` desde dentro del elemento del builder.

`$get()` es relativo al elemento del builder actual, por lo que `$get('client_id')` está buscando `$get('builder.item1.client_id')`.

Puedes usar `../` para subir un nivel en la estructura de datos, por lo que `$get('../client_id')` es `$get('builder.client_id')` y `$get('../../client_id')` es `$get('client_id')`.

El caso especial de `$get()` sin argumentos, o `$get('')` o `$get('./')`, siempre devolverá el array de datos completo para el elemento del builder actual.

## Validación del builder

Además de todas las reglas listadas en la página de [validación](validation), hay reglas adicionales que son específicas para los builders.

### Validación del número de elementos

Puedes validar el número mínimo y máximo de elementos que puedes tener en un builder estableciendo los métodos `minItems()` y `maxItems()`:

```php
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->minItems(1)
    ->maxItems(5)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>minItems()</code> y <code>maxItems()</code> también aceptan una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Personalizar las acciones de elementos del builder

Este campo usa objetos de acción para facilitar la personalización de los botones dentro de él. Puedes personalizar estos botones pasando una función a un método de registro de acción. La función tiene acceso al objeto `$action`, que puedes usar para [personalizarlo](../actions/overview). Los siguientes métodos están disponibles para personalizar las acciones:

- `addAction()`
- `addBetweenAction()`
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
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->collapseAllAction(
        fn (Action $action) => $action->label('Collapse all content'),
    )
```

<details>
  <summary>Inyección de utilidades</summary>
  Los métodos de registro de acción pueden inyectar varias utilidades en la función como parámetros.
</details>

### Confirmar acciones del builder con un modal

Puedes confirmar acciones con un modal usando el método `requiresConfirmation()` en el objeto de acción. Puedes usar cualquier [método de personalización de modal](../actions/modals) para cambiar su contenido y comportamiento:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Builder;

Builder::make('content')
    ->blocks([
        // ...
    ])
    ->deleteAction(
        fn (Action $action) => $action->requiresConfirmation(),
    )
```

:::info
Los métodos `addAction()`, `addBetweenAction()`, `collapseAction()`, `collapseAllAction()`, `expandAction()`, `expandAllAction()` y `reorderAction()` no admiten modales de confirmación, ya que hacer clic en sus botones no realiza la solicitud de red que se requiere para mostrar el modal.
:::

### Añadir acciones de elemento adicionales a un builder

Puedes añadir nuevos [botones de acción](../actions) al encabezado de cada elemento del builder pasando objetos `Action` a `extraItemActions()`:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Mail;

Builder::make('content')
    ->blocks([
        Block::make('contactDetails')
            ->schema([
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                // ...
            ]),
        // ...
    ])
    ->extraItemActions([
        Action::make('sendEmail')
            ->icon(Heroicon::Square2Stack)
            ->action(function (array $arguments, Builder $component): void {
                $itemData = $component->getItemState($arguments['item']);

                Mail::to($itemData['email'])
                    ->send(
                        // ...
                    );
            }),
    ])
```

En este ejemplo, `$arguments['item']` te da el ID del elemento del builder actual. Puedes validar los datos en ese elemento del builder usando el método `getItemState()` en el componente builder. Este método devuelve los datos validados para el elemento. Si el elemento no es válido, cancelará la acción y mostrará un mensaje de error para ese elemento en el formulario.

Si deseas obtener los datos sin procesar del elemento actual sin validarlos, puedes usar `$component->getRawItemState($arguments['item'])` en su lugar.

Si deseas manipular los datos sin procesar para todo el builder, por ejemplo, para añadir, eliminar o modificar elementos, puedes usar `$component->getState()` para obtener los datos, y `$component->state($state)` para establecerlos nuevamente:

```php
use Illuminate\Support\Str;

// Obtener los datos sin procesar para todo el builder
$state = $component->getState();

// Añadir un elemento, con un UUID aleatorio como clave
$state[Str::uuid()] = [
    'type' => 'contactDetails',
    'data' => [
        'email' => auth()->user()->email,
    ],
];

// Establecer los nuevos datos para el builder
$component->state($state);
```
