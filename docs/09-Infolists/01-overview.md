---
title: Descripción general
---

## Introducción

El paquete de infolists de Filament te permite mostrar una lista de solo lectura de datos para una entidad específica. Está integrado en otros paquetes de Filament, como dentro de [recursos de panel](../panels/resources), [gestores de relaciones](../panels/resources/managing-relationships) y [modales de acciones](../actions). Comprender cómo usar el constructor de infolist te ahorrará tiempo al crear aplicaciones Livewire personalizadas o al trabajar con otras características de Filament.

Esta guía cubre los fundamentos de la construcción de infolists con Filament. Si deseas agregar un infolist a tu propio componente Livewire, [comienza aquí](../components/infolist) antes de continuar. Si estás agregando un infolist a un [recurso de panel](../panels/resources), o usando otro paquete de Filament, ¡estás listo para comenzar!

## Definiendo entradas

Las clases de entrada se pueden encontrar en el namespace `Filament\Infolists\Components`. Residen dentro del array de esquema de componentes. Filament incluye una serie de entradas integradas:

- [Entrada de texto](text-entry)
- [Entrada de icono](icon-entry)
- [Entrada de imagen](image-entry)
- [Entrada de color](color-entry)
- [Entrada de código](code-entry)
- [Entrada de clave-valor](key-value-entry)
- [Entrada repetible](repeatable-entry)

También puedes [crear tus propias entradas personalizadas](custom-entries) para mostrar datos como desees.

Las entradas se pueden crear usando el método estático `make()`, pasando su nombre único. Usualmente, el nombre de una entrada corresponde al nombre de un atributo en un modelo Eloquent. Puedes usar "notación de punto" para acceder a atributos dentro de relaciones:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')

TextEntry::make('author.name')
```

## Contenido de entrada (estado)

Las entradas pueden parecer un poco mágicas al principio, pero están diseñadas para ser simples de usar y optimizadas para mostrar datos de un registro Eloquent. A pesar de esto, son flexibles y puedes mostrar datos de cualquier fuente, no solo de un atributo de registro Eloquent.

Los datos que muestra una entrada se llaman su "estado". Cuando usas un [recurso de panel](../resources), el infolist es consciente del registro que está mostrando. Esto significa que el estado de la entrada se establece en función del valor del atributo en el registro. Por ejemplo, si la entrada se usa en el infolist de un `PostResource`, entonces se mostrará el valor del atributo `title` de la publicación actual.

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
```

Si deseas acceder al valor almacenado en una relación, puedes usar "notación de punto". El nombre de la relación de la que deseas acceder a los datos viene primero, seguido de un punto, y luego el nombre del atributo:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('author.name')
```

También puedes usar "notación de punto" para acceder a valores dentro de una columna JSON / array en un modelo Eloquent. El nombre del atributo viene primero, seguido de un punto, y luego la clave del objeto JSON del que deseas leer:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('meta.title')
```

### Estableciendo el estado de una entrada

Puedes pasar tu propio estado a una entrada usando el método `state()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->state('Hello, world!')
```

<details>
<summary>Inyección de utilidades</summary>

El método `state()` también acepta una función para calcular dinámicamente el estado. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Estableciendo el estado predeterminado de una entrada

Cuando una entrada está vacía (su estado es `null`), puedes usar el método `default()` para definir un estado alternativo para usar en su lugar. Este método tratará el estado predeterminado como si fuera real, por lo que entradas como [imagen](image-entry) o [color](color-entry) mostrarán la imagen o color predeterminados.

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->default('Untitled')
```

#### Agregando texto de marcador de posición si una entrada está vacía

A veces es posible que desees mostrar texto de marcador de posición para entradas con un estado vacío, que se muestra como un texto gris más claro. Esto difiere del [valor predeterminado](#estableciendo-el-estado-predeterminado-de-una-entrada), ya que el marcador de posición siempre es texto y no se trata como si fuera un estado real.

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->placeholder('Untitled')
```

## Estableciendo la etiqueta de una entrada

Por defecto, la etiqueta de la entrada, que se muestra en el encabezado del infolist, se genera a partir del nombre de la entrada. Puedes personalizar esto usando el método `label()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('name')
    ->label('Full name')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `label()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Personalizar la etiqueta de esta manera es útil si deseas usar una [cadena de traducción para localización](https://laravel.com/docs/localization#retrieving-translation-strings):

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('name')
    ->label(__('entries.name'))
```

### Ocultando la etiqueta de una entrada

:::tip
Si estás buscando ocultar la etiqueta de una entrada, podría ser el caso de que estés tratando de usar una entrada para texto o UI arbitrarios. Las entradas están diseñadas específicamente para mostrar datos de manera estructurada, pero los [componentes Prime](../schemas/primes) son componentes simples que se usan para renderizar contenido estático básico independiente, como texto, imágenes y botones (acciones). Es posible que desees considerar usar un componente Prime en su lugar.
:::

Puede ser tentador establecer la etiqueta en una cadena vacía para ocultarla, pero esto no se recomienda. Establecer la etiqueta en una cadena vacía no comunicará el propósito de la entrada a los lectores de pantalla, incluso si el propósito es claro visualmente. En su lugar, debes usar el método `hiddenLabel()`, para que se oculte visualmente pero siga siendo accesible para los lectores de pantalla:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('name')
    ->hiddenLabel()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la etiqueta debe ocultarse o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('name')
    ->hiddenLabel(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `hiddenLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Abrir una URL cuando se hace clic en una entrada

Cuando se hace clic en una entrada, puedes abrir una URL. Para hacer esto, pasa una URL al método `url()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->url('/about/titles')
```

Puedes pasar una función al método `url()` para calcular dinámicamente la URL. Por ejemplo, es posible que desees acceder al registro Eloquent actual para el infolist inyectando `$record` como argumento:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->url(fn (Post $record): string => route('posts.edit', ['post' => $record]))
```

Si estás usando un [recurso de panel](../resources), puedes generar un enlace a una página para el registro usando el método `getUrl()`:

```php
use App\Filament\Posts\PostResource;
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->url(fn (Post $record): string => PostResource::getUrl('edit', ['record' => $record]))
```

<details>
<summary>Inyección de utilidades</summary>

La función pasada a `url()` puede inyectar varias utilidades como parámetros.

</details>

También puedes elegir abrir la URL en una nueva pestaña:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->url(fn (Post $record): string => PostResource::getUrl('edit', ['record' => $record]))
    ->openUrlInNewTab()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la URL debe abrirse en una nueva pestaña o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->url(fn (Post $record): string => PostResource::getUrl('edit', ['record' => $record]))
    ->openUrlInNewTab(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `openUrlInNewTab()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Ocultando una entrada

Puedes ocultar una entrada:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('role')
    ->hidden()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la entrada debe ocultarse o no:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('role')
    ->hidden(! FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `hidden()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Alternativamente, puedes usar el método `visible()` para controlar si la entrada debe ocultarse o no. En algunas situaciones, esto puede ayudar a hacer tu código más legible:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('role')
    ->visible(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `visible()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::note
Si se usan tanto `hidden()` como `visible()`, ambos deben indicar que la entrada debe ser visible para que se muestre.
:::

### Ocultando una entrada usando JavaScript

Si necesitas ocultar una entrada basándote en una interacción del usuario, puedes usar los métodos `hidden()` o `visible()`, pasando una función que use utilidades inyectadas para determinar si la entrada debe ocultarse o no:

```php
use Filament\Forms\Components\Select;
use Filament\Infolists\Components\IconEntry;

Select::make('role')
    ->options([
        'user' => 'User',
        'staff' => 'Staff',
    ])
    ->live()

IconEntry::make('is_admin')
    ->boolean()
    ->hidden(fn (Get $get): bool => $get('role') !== 'staff')
```

En este ejemplo, el campo `role` está configurado como `live()`, lo que significa que el esquema recargará el esquema cada vez que el campo `role` cambie. Esto causará que la función que se pasa al método `hidden()` se reevalúe, lo que ocultará la entrada `is_admin` si el campo `role` no está configurado como `staff`.

Sin embargo, recargar el esquema cada vez que una entrada causa que se haga una solicitud de red, ya que no hay forma de volver a ejecutar la función PHP desde el lado del cliente. Esto no es ideal para el rendimiento.

Alternativamente, puedes escribir JavaScript para ocultar la entrada basándote en el valor de un campo. Esto se hace pasando una expresión JavaScript al método `hiddenJs()`:

```php
use Filament\Forms\Components\Select;
use Filament\Infolists\Components\IconEntry;

Select::make('role')
    ->options([
        'user' => 'User',
        'staff' => 'Staff',
    ])

IconEntry::make('is_admin')
    ->boolean()
    ->hiddenJs(<<<'JS'
        $get('role') !== 'staff'
        JS)
```

Aunque el código pasado a `hiddenJs()` se ve muy similar a PHP, en realidad es JavaScript. Filament proporciona la función de utilidad `$get()` a JavaScript que se comporta de manera muy similar a su equivalente PHP, pero sin requerir que la entrada dependiente sea `live()`.

El método `visibleJs()` también está disponible, que funciona de la misma manera que `hiddenJs()`, pero controla si la entrada debe ser visible o no:

```php
use Filament\Forms\Components\Select;
use Filament\Infolists\Components\IconEntry;

Select::make('role')
    ->options([
        'user' => 'User',
        'staff' => 'Staff',
    ])
    
IconEntry::make('is_admin')
    ->boolean()
    ->visibleJs(<<<'JS'
        $get('role') === 'staff'
        JS)
```

:::note
Si se usan tanto `hiddenJs()` como `visibleJs()`, ambos deben indicar que la entrada debe ser visible para que se muestre.
:::

### Ocultando una entrada basándose en la operación actual

La "operación" de un esquema es la acción actual que se está realizando en él. Usualmente, esto es `create`, `edit` o `view`, si estás usando el [recurso de panel](../resources).

Puedes ocultar una entrada basándote en la operación actual pasando una operación al método `hiddenOn()`:

```php
use Filament\Infolists\Components\IconEntry;

IconEntry::make('is_admin')
    ->boolean()
    ->hiddenOn('edit')
    
// es lo mismo que

IconEntry::make('is_admin')
    ->boolean()
    ->hidden(fn (string $operation): bool => $operation === 'edit')
```

También puedes pasar un array de operaciones al método `hiddenOn()`, y la entrada se ocultará si la operación actual es cualquiera de las operaciones en el array:

```php
use Filament\Infolists\Components\IconEntry;

IconEntry::make('is_admin')
    ->boolean()
    ->hiddenOn(['edit', 'view'])
    
// es lo mismo que

IconEntry::make('is_admin')
    ->boolean()
    ->hidden(fn (string $operation): bool => in_array($operation, ['edit', 'view']))
```

:::warning
El método `hiddenOn()` sobrescribirá cualquier llamada previa al método `hidden()`, y viceversa.
:::

Alternativamente, puedes usar el método `visibleOn()` para controlar si la entrada debe ocultarse o no. En algunas situaciones, esto puede ayudar a hacer tu código más legible:

```php
use Filament\Infolists\Components\IconEntry;

IconEntry::make('is_admin')
    ->boolean()
    ->visibleOn('create')

IconEntry::make('is_admin')
    ->boolean()
    ->visibleOn(['create', 'edit'])
```

:::note
El método `visibleOn()` sobrescribirá cualquier llamada previa al método `visible()`, y viceversa.
:::

## Etiquetas en línea

Las entradas pueden tener sus etiquetas mostradas en línea con la entrada, en lugar de encima de ella. Esto es útil para infolists con muchas entradas, donde el espacio vertical es escaso. Para mostrar la etiqueta de una entrada en línea, usa el método `inlineLabel()`:

```php
use Filament\Infolists\Components\TextEntry;

TextInput::make('name')
    ->inlineLabel()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la etiqueta debe mostrarse en línea o no:

```php
use Filament\Infolists\Components\TextInput;

TextInput::make('name')
    ->inlineLabel(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `inlineLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Usando etiquetas en línea en múltiples lugares a la vez

Si deseas mostrar todas las etiquetas en línea en un [componente de diseño](../schemas/layouts) como una [sección](../schemas/section) o [pestaña](../schemas/tabs), puedes usar el `inlineLabel()` en el componente mismo, y todas las entradas dentro de él tendrán sus etiquetas mostradas en línea:

```php
use Filament\Infolists\Components\TextInput;
use Filament\Schemas\Components\Section;

Section::make('Details')
    ->inlineLabel()
    ->entries([
        TextInput::make('name'),
        TextInput::make('email')
            ->label('Email address'),
        TextInput::make('phone')
            ->label('Phone number'),
    ])
```

También puedes usar `inlineLabel()` en todo el esquema para mostrar todas las etiquetas en línea:

```php
use Filament\Schemas\Schema;

public function infolist(Schema $schema): Schema
{
    return $schema
        ->inlineLabel()
        ->components([
            // ...
        ]);
}
```

Cuando uses `inlineLabel()` en un componente de diseño o esquema, aún puedes optar por no usar etiquetas en línea para entradas individuales usando el método `inlineLabel(false)` en la entrada:

```php
use Filament\Infolists\Components\TextInput;
use Filament\Schemas\Components\Section;

Section::make('Details')
    ->inlineLabel()
    ->entries([
        TextInput::make('name'),
        TextInput::make('email')
            ->label('Email address'),
        TextInput::make('phone')
            ->label('Phone number')
            ->inlineLabel(false),
    ])
```

## Agregando un tooltip a una entrada

Puedes especificar un tooltip para mostrar cuando pasas el cursor sobre una entrada:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->tooltip('Shown at the top of the page')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `tooltip()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Alineando el contenido de la entrada

Puedes alinear el contenido de una entrada al inicio (izquierda en interfaces de izquierda a derecha, derecha en interfaces de derecha a izquierda), centro o final (derecha en interfaces de izquierda a derecha, izquierda en interfaces de derecha a izquierda) usando los métodos `alignStart()`, `alignCenter()` o `alignEnd()`:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('title')
    ->alignStart() // Esta es la alineación predeterminada.

TextEntry::make('title')
    ->alignCenter()

TextEntry::make('title')
    ->alignEnd()
```

Alternativamente, puedes pasar un enum `Alignment` al método `alignment()`:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\Alignment;

TextEntry::make('title')
    ->alignment(Alignment::Center)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `alignment()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregando contenido adicional a una entrada

Las entradas contienen muchos "slots" donde se puede insertar contenido en un esquema hijo. Los slots pueden aceptar texto, [cualquier componente de esquema](../schemas), [acciones](../actions) y [grupos de acciones](../actions/grouping-actions). Usualmente, se usan [componentes prime](../schemas/primes) para el contenido.

Los siguientes slots están disponibles para todas las entradas:

- `aboveLabel()`
- `beforeLabel()`
- `afterLabel()`
- `belowLabel()`
- `aboveContent()`
- `beforeContent()`
- `afterContent()`
- `belowContent()`

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos de slot también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

Para insertar texto plano, puedes pasar una cadena a estos métodos:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('name')
    ->belowContent('This is the user\'s full name.')
```

Para insertar un componente de esquema, a menudo un [componente prime](../schemas/primes), puedes pasar el componente al método:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Text;
use Filament\Support\Enums\FontWeight;

TextEntry::make('name')
    ->belowContent(Text::make('This is the user\'s full name.')->weight(FontWeight::Bold))
```

Para insertar una [acción](../actions) o [grupo de acciones](../actions/grouping-actions), puedes pasar la acción o el grupo de acciones al método:

```php
use Filament\Actions\Action;
use Filament\Infolists\Components\TextEntry;

TextEntry::make('name')
    ->belowContent(Action::make('generate'))
```

Puedes insertar cualquier combinación de contenido en los slots pasando un array de contenido al método:

```php
use Filament\Actions\Action;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->belowContent([
        Icon::make(Heroicon::InformationCircle),
        'This is the user\'s full name.',
        Action::make('generate'),
    ])
```

También puedes alinear el contenido en los slots pasando el array de contenido a `Schema::start()` (predeterminado), `Schema::end()` o `Schema::between()`:

```php
use Filament\Actions\Action;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Icon;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->belowContent(Schema::end([
        Icon::make(Heroicon::InformationCircle),
        'This is the user\'s full name.',
        Action::make('generate'),
    ]))

TextEntry::make('name')
    ->belowContent(Schema::between([
        Icon::make(Heroicon::InformationCircle),
        'This is the user\'s full name.',
        Action::make('generate'),
    ]))

TextEntry::make('name')
    ->belowContent(Schema::between([
        Flex::make([
            Icon::make(Heroicon::InformationCircle)
                ->grow(false),
            'This is the user\'s full name.',
        ]),
        Action::make('generate'),
    ]))
```

:::tip
Como puedes ver en el ejemplo anterior para `Schema::between()`, se usa un [componente `Flex`](../schemas/layouts#flex-component) para agrupar el icono y el texto juntos para que no tengan espacio entre ellos. El icono usa `grow(false)` para evitar que ocupe la mitad del espacio horizontal, permitiendo que el texto consuma el espacio restante.
:::

### Agregando contenido adicional encima de la etiqueta de una entrada

Puedes insertar contenido adicional encima de la etiqueta de una entrada usando el método `aboveLabel()`. Puedes [pasar cualquier contenido](#agregando-contenido-adicional-a-una-entrada) a este método, como texto, un componente de esquema, una acción o un grupo de acciones:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->aboveLabel([
        Icon::make(Heroicon::Star),
        'This is the content above the entry\'s label'
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `aboveLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Agregando contenido adicional antes de la etiqueta de una entrada

Puedes insertar contenido adicional antes de la etiqueta de una entrada usando el método `beforeLabel()`. Puedes [pasar cualquier contenido](#agregando-contenido-adicional-a-una-entrada) a este método, como texto, un componente de esquema, una acción o un grupo de acciones:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->beforeLabel(Icon::make(Heroicon::Star))
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `beforeLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Agregando contenido adicional después de la etiqueta de una entrada

Puedes insertar contenido adicional después de la etiqueta de una entrada usando el método `afterLabel()`. Puedes [pasar cualquier contenido](#agregando-contenido-adicional-a-una-entrada) a este método, como texto, un componente de esquema, una acción o un grupo de acciones:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->afterLabel([
        Icon::make(Heroicon::Star),
        'This is the content after the entry\'s label'
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `afterLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, el contenido en el esquema `afterLabel()` está alineado al final del contenedor. Si deseas alinearlo al inicio del contenedor, debes pasar un objeto `Schema::start()` que contenga el contenido:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->afterLabel(Schema::start([
        Icon::make(Heroicon::Star),
        'This is the content after the entry\'s label'
    ]))
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `afterLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Agregando contenido adicional debajo de la etiqueta de una entrada

Puedes insertar contenido adicional debajo de la etiqueta de una entrada usando el método `belowLabel()`. Puedes [pasar cualquier contenido](#agregando-contenido-adicional-a-una-entrada) a este método, como texto, un componente de esquema, una acción o un grupo de acciones:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->belowLabel([
        Icon::make(Heroicon::Star),
        'This is the content below the entry\'s label'
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `belowLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::note
Esto puede parecer lo mismo que el [método `aboveContent()`](#agregando-contenido-adicional-encima-del-contenido-de-una-entrada). Sin embargo, cuando se usan [etiquetas en línea](#etiquetas-en-línea), el método `aboveContent()` colocará el contenido encima de la entrada, no debajo de la etiqueta, ya que la etiqueta se muestra en una columna separada al contenido de la entrada.
:::

### Agregando contenido adicional encima del contenido de una entrada

Puedes insertar contenido adicional encima del contenido de una entrada usando el método `aboveContent()`. Puedes [pasar cualquier contenido](#agregando-contenido-adicional-a-una-entrada) a este método, como texto, un componente de esquema, una acción o un grupo de acciones:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->aboveContent([
        Icon::make(Heroicon::Star),
        'This is the content above the entry\'s content'
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `aboveContent()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::note
Esto puede parecer lo mismo que el [método `belowLabel()`](#agregando-contenido-adicional-debajo-de-la-etiqueta-de-una-entrada). Sin embargo, cuando se usan [etiquetas en línea](#etiquetas-en-línea), el método `belowLabel()` colocará el contenido debajo de la etiqueta, no encima del contenido de la entrada, ya que la etiqueta se muestra en una columna separada al contenido de la entrada.
:::

### Agregando contenido adicional antes del contenido de una entrada

Puedes insertar contenido adicional antes del contenido de una entrada usando el método `beforeContent()`. Puedes [pasar cualquier contenido](#agregando-contenido-adicional-a-una-entrada) a este método, como texto, un componente de esquema, una acción o un grupo de acciones:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->beforeContent(Icon::make(Heroicon::Star))
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `beforeContent()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Agregando contenido adicional después del contenido de una entrada

Puedes insertar contenido adicional después del contenido de una entrada usando el método `afterContent()`. Puedes [pasar cualquier contenido](#agregando-contenido-adicional-a-una-entrada) a este método, como texto, un componente de esquema, una acción o un grupo de acciones:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextEntry::make('name')
    ->afterContent(Icon::make(Heroicon::Star))
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `afterContent()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Agregando atributos HTML adicionales a una entrada

Puedes pasar atributos HTML adicionales a la entrada a través del método `extraAttributes()`, que se fusionarán en su elemento HTML externo. Los atributos deben representarse mediante un array, donde la clave es el nombre del atributo y el valor es el valor del atributo:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('slug')
    ->extraAttributes(['class' => 'bg-gray-200'])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `extraAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, llamar a `extraAttributes()` múltiples veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.

### Agregando atributos HTML adicionales al wrapper de la entrada

También puedes pasar atributos HTML adicionales al elemento exterior del "wrapper de la entrada" que rodea la etiqueta y el contenido de la entrada. Esto es útil si deseas estilizar la etiqueta o el espaciado de la entrada a través de CSS, ya que podrías apuntar a elementos como hijos del wrapper:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('slug')
    ->extraEntryWrapperAttributes(['class' => 'components-locked'])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `extraEntryWrapperAttributes()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Por defecto, llamar a `extraEntryWrapperAttributes()` múltiples veces sobrescribirá los atributos anteriores. Si deseas fusionar los atributos en su lugar, puedes pasar `merge: true` al método.

## Inyección de utilidades de entrada

La gran mayoría de los métodos utilizados para configurar entradas aceptan funciones como parámetros en lugar de valores codificados:

```php
use App\Models\User;
use Filament\Infolists\Components\TextEntry;

TextEntry::make('name')
    ->label(fn (string $state): string => str_contains($state, ' ') ? 'Full name' : 'Name')

TextEntry::make('currentUserEmail')
    ->state(fn (): string => auth()->user()->email)

TextEntry::make('role')
    ->hidden(fn (User $record): bool => $record->role === 'admin')
```

Esto por sí solo desbloquea muchas posibilidades de personalización.

El paquete también puede inyectar muchas utilidades para usar dentro de estas funciones, como parámetros. Todos los métodos de personalización que aceptan funciones como argumentos pueden inyectar utilidades.

Estas utilidades inyectadas requieren que se usen nombres de parámetros específicos. De lo contrario, Filament no sabe qué inyectar.

### Inyectando el estado actual de la entrada

Si deseas acceder al [valor (estado)](#contenido-de-entrada-estado) actual de la entrada, define un parámetro `$state`:

```php
function ($state) {
    // ...
}
```

### Inyectando el estado de otra entrada o campo de formulario

También puedes recuperar el estado (valor) de otra entrada o campo de formulario desde dentro de una callback, usando un parámetro `$get`:

```php
use Filament\Schemas\Components\Utilities\Get;

function (Get $get) {
    $email = $get('email'); // Almacena el valor de la entrada `email` en la variable `$email`.
    //...
}
```

:::tip
A menos que un campo de formulario sea [reactivo](../forms/overview#the-basics-of-reactivity), el esquema no se actualizará cuando cambie el valor del campo, solo cuando ocurra la siguiente interacción del usuario que haga una solicitud al servidor. Si necesitas reaccionar a los cambios en el valor de un campo, debe ser `live()`.
:::

### Inyectando el registro Eloquent actual

Puedes recuperar el registro Eloquent para el esquema actual usando un parámetro `$record`:

```php
use Illuminate\Database\Eloquent\Model;

function (?Model $record) {
    // ...
}
```

### Inyectando la operación actual

Si estás escribiendo un esquema para un recurso de panel o gestor de relaciones, y deseas verificar si un esquema es `create`, `edit` o `view`, usa el parámetro `$operation`:

```php
function (string $operation) {
    // ...
}
```

:::note
Puedes establecer manualmente la operación de un esquema usando el método `$schema->operation()`.
:::

### Inyectando la instancia del componente Livewire actual

Si deseas acceder a la instancia del componente Livewire actual, define un parámetro `$livewire`:

```php
use Livewire\Component;

function (Component $livewire) {
    // ...
}
```

### Inyectando la instancia de entrada actual

Si deseas acceder a la instancia del componente actual, define un parámetro `$component`:

```php
use Filament\Infolists\Components\Entry;

function (Entry $component) {
    // ...
}
```

### Inyectando múltiples utilidades

Los parámetros se inyectan dinámicamente usando reflexión, por lo que puedes combinar múltiples parámetros en cualquier orden:

```php
use App\Models\User;
use Filament\Schemas\Components\Utilities\Get;
use Livewire\Component as Livewire;

function (Livewire $livewire, Get $get, User $record) {
    // ...
}
```

### Inyectando dependencias del contenedor de Laravel

Puedes inyectar cualquier cosa del contenedor de Laravel como normal, junto con las utilidades:

```php
use App\Models\User;
use Illuminate\Http\Request;

function (Request $request, User $record) {
    // ...
}
```

## Configuración global

Si deseas cambiar el comportamiento predeterminado de todas las entradas globalmente, entonces puedes llamar al método estático `configureUsing()` dentro del método `boot()` de un proveedor de servicios, al que pasas un Closure para modificar las entradas. Por ejemplo, si deseas hacer que todos los componentes `TextEntry` sean [`words(10)`](text-entry#limiting-word-count), puedes hacerlo así:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::configureUsing(function (TextEntry $entry): void {
    $entry->words(10);
});
```

Por supuesto, aún puedes sobrescribir esto en cada entrada individualmente:

```php
use Filament\Infolists\Components\TextEntry;

TextEntry::make('name')
    ->words(null)
```
