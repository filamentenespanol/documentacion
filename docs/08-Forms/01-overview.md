---
title: Resumen
---

## Introducción

El paquete de formularios de Filament te permite construir fácilmente formularios dinámicos en tu aplicación. Se utiliza dentro de otros paquetes de Filament para renderizar formularios dentro de [recursos de panel](../panels/resources), [modales de acciones](../actions/modals), [filtros de tabla](../tables/filters), y más. Aprender cómo construir formularios es esencial para aprender a usar estos paquetes de Filament.

Esta guía te guiará a través de lo básico de la construcción de formularios con el paquete de formularios de Filament. Si planeas agregar un nuevo formulario a tu propio componente Livewire, deberías [hacer eso primero](../components/form) y luego volver. Si estás agregando un formulario a un [recurso de panel](../panels/resources), u otro paquete de Filament, ¡estás listo para empezar!

## Campos de formulario

Las clases de campos de formulario se pueden encontrar en el namespace `Filament\Form\Components`. Residen dentro del array de esquema de componentes. Filament incluye muchos tipos de campos, adecuados para editar diferentes tipos de datos:

- [Entrada de texto](text-input)
- [Select](select)
- [Checkbox](checkbox)
- [Toggle](toggle)
- [Lista de checkboxes](checkbox-list)
- [Radio](radio)
- [Selector de fecha y hora](date-time-picker)
- [Subida de archivos](file-upload)
- [Editor enriquecido](rich-editor)
- [Editor Markdown](markdown-editor)
- [Repeater](repeater)
- [Builder](builder)
- [Entrada de etiquetas](tags-input)
- [Área de texto](textarea)
- [Clave-valor](key-value)
- [Selector de color](color-picker)
- [Botones toggle](toggle-buttons)
- [Slider](slider)
- [Editor de código](code-editor)
- [Oculto](hidden)

También puedes [crear tus propios campos personalizados](custom-fields) para editar datos como desees.

Los campos pueden crearse usando el método estático `make()`, pasando su nombre único. Usualmente, el nombre de un campo corresponde al nombre de un atributo en un modelo Eloquent:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
```

Puedes usar la "notación de puntos" para enlazar campos a claves en arrays:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('socials.github_url')
```

## Validación de campos

En Laravel, las reglas de validación suelen definirse en arrays como `['required', 'max:255']` o en un string combinado como `required|max:255`. Esto está bien si trabajas exclusivamente en el backend con solicitudes de formulario simples. Pero Filament también es capaz de dar a tus usuarios validación en el frontend, para que puedan corregir sus errores antes de que se realicen solicitudes al backend.

En Filament, puedes agregar reglas de validación a tus campos usando métodos como `required()` y `maxLength()`. Esto también es ventajoso sobre la sintaxis de validación de Laravel, ya que tu IDE puede autocompletar estos métodos:

```php
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;

TextInput::make('name')
    ->required()
    ->maxLength(255)
```

En este ejemplo, el campo es `required()` y tiene un `maxLength()`. Tenemos [métodos para la mayoría de las reglas de validación de Laravel](validation#available-rules), e incluso puedes agregar tus propias [reglas personalizadas](validation#custom-rules).

## Configuración de la etiqueta de un campo

Por defecto, la etiqueta del campo se determinará automáticamente según su nombre. Para sobrescribir la etiqueta de un campo, puedes usar el método `label()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->label('Full name')
```

<details>
<summary>Además de permitir un valor estático</summary>

El método `label()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Personalizar la etiqueta de esta manera es útil si deseas usar una [cadena de traducción para localización](https://laravel.com/docs/localization#retrieving-translation-strings):

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->label(__('fields.name'))
```

:::tip
También puedes [usar una expresión JavaScript](#using-javascript-to-determine-text-content) para determinar el contenido de la etiqueta, que puede leer los valores actuales de los campos en el formulario.
:::

### Ocultar la etiqueta de un campo

Puede ser tentador establecer la etiqueta en una cadena vacía para ocultarla, pero esto no se recomienda. Establecer la etiqueta en cadena vacía no comunicará el propósito del campo a los lectores de pantalla, incluso si el propósito es claro visualmente. En su lugar, deberías usar el método `hiddenLabel()`, para que se oculte visualmente pero siga siendo accesible para los lectores de pantalla:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->hiddenLabel()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la etiqueta debe ocultarse o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->hiddenLabel(FeatureFlag::active())
```

<details>
<summary>Además de permitir un valor estático</summary>

El método `hiddenLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Configuración del valor por defecto de un campo

Los campos pueden tener un valor por defecto. Este valor por defecto solo se usa cuando un esquema se carga sin datos. En un [recurso de panel](../resources) estándar, los valores por defecto se usan en la página Crear, no en la de Editar. Para definir un valor por defecto, usa el método `default()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->default('John')
```

<details>
<summary>Además de permitir un valor estático</summary>

El método `default()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Deshabilitar un campo

Puedes deshabilitar un campo para evitar que sea editado por el usuario:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->disabled()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe estar deshabilitado o no:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->disabled(! FeatureFlag::active())
```

<details>
<summary>Además de permitir un valor estático</summary>

El método `disabled()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Deshabilitar un campo impedirá que sea guardado. Si deseas que sea guardado pero sin ser editable, usa el método `dehydrated()`:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->disabled()
    ->dehydrated()
```

:::danger
Si eliges deshidratar el campo, un usuario con conocimientos aún podría editar el valor del campo manipulando el JavaScript de Livewire.
:::

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe deshidratarse o no:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->disabled()
    ->dehydrated(FeatureFlag::active())
```

<details>
<summary>Además de permitir un valor estático</summary>

El método `dehydrated()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Deshabilitar un campo basado en la operación actual

La "operación" de un esquema es la acción que se está realizando sobre él. Usualmente, esto es `create`, `edit` o `view`, si estás usando el [recurso de panel](../resources).

Puedes deshabilitar un campo basado en la operación actual pasando una operación al método `disabledOn()`:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->disabledOn('edit')

// es lo mismo que

Toggle::make('is_admin')
    ->disabled(fn (string $operation): bool => $operation === 'edit')
```

También puedes pasar un array de operaciones al método `disabledOn()`, y el campo se deshabilitará si la operación actual es cualquiera de ellas:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->disabledOn(['edit', 'view'])

// es lo mismo que

Toggle::make('is_admin')
    ->disabled(fn (string $operation): bool => in_array($operation, ['edit', 'view']))
```

:::warning
El método `disabledOn()` sobrescribirá cualquier llamada previa a `disabled()`, y viceversa.
:::

## Ocultar un campo

Puedes ocultar un campo:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->hidden()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el campo debe estar oculto o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->hidden(! FeatureFlag::active())
```

<details>
<summary>Además de un valor estático</summary>

El método `hidden()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Alternativamente, puedes usar el método `visible()` para controlar si el campo debe estar oculto o no. En algunas situaciones, esto puede ayudarte a que tu código sea más legible:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->visible(FeatureFlag::active())
```

<details>
<summary>Además de un valor estático</summary>

El método `visible()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::info
Si usas tanto `hidden()` como `visible()`, ambos deben indicar que el campo debe mostrarse para que sea visible.
:::

### Ocultar un campo usando JavaScript

Si necesitas ocultar un campo dependiendo de la interacción del usuario, puedes usar los métodos `hidden()` o `visible()`, pasando una función que utilice utilidades inyectadas para determinar si el campo debe ocultarse o no:

```php
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;

Select::make('role')
    ->options([
        'user' => 'User',
        'staff' => 'Staff',
    ])
    ->live()

Toggle::make('is_admin')
    ->hidden(fn (Get $get): bool => $get('role') !== 'staff')
```

En este ejemplo, el campo `role` está configurado como `live()`, lo cual significa que el esquema se recargará cada vez que cambie. Esto causará que la función pasada al método `hidden()` se reevalúe, y ocultará el campo `is_admin` si el campo `role` no está configurado como `staff`.

Sin embargo, recargar el esquema cada vez provoca solicitudes de red, ya que no hay forma de reejecutar la función PHP desde el lado del cliente. Esto no es ideal para el rendimiento.

Alternativamente, puedes escribir JavaScript para ocultar el campo basado en el valor de otro. Esto se hace pasando una expresión JS al método `hiddenJs()`:

```php
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;

Select::make('role')
    ->options([
        'user' => 'User',
        'staff' => 'Staff',
    ])

Toggle::make('is_admin')
    ->hiddenJs(<<<'JS'
        $get('role') !== 'staff'
        JS)
```

Aunque el código pasado a `hiddenJs()` se parece mucho a PHP, realmente es JavaScript. Filament ofrece la función utilitaria `$get()` en JavaScript, que se comporta parecido a su equivalente en PHP, pero sin requerir que el campo dependiente sea `live()`.

:::danger
Cualquier string JS pasado al método `hiddenJs()` se ejecutará en el navegador, así que nunca deberías añadir entrada de usuario directamente en ese string, ya que podría dar lugar a vulnerabilidades XSS. La entrada de usuario desde `$state` o `$get()` nunca debe evaluarse como código JS, pero sí es segura al usarla como valor string, como en el ejemplo.
:::

El método `visibleJs()` también está disponible, funciona igual que `hiddenJs()`, pero controla si el campo debe mostrarse o no:

```php
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;

Select::make('role')
    ->options([
        'user' => 'User',
        'staff' => 'Staff',
    ])

Toggle::make('is_admin')
    ->visibleJs(<<<'JS'
        $get('role') === 'staff'
        JS)
```

:::danger
Cualquier string JS pasado al método `visibleJs()` se ejecutará en el navegador, así que nunca deberías añadir entrada de usuario directamente en ese string, ya que podría dar lugar a vulnerabilidades XSS. La entrada de usuario desde `$state` o `$get()` nunca debe evaluarse como código JS, pero sí es segura al usarla como valor string, como en el ejemplo.
:::

:::info
Si usas tanto `hiddenJs()` como `visibleJs()`, ambos deben indicar que el campo debe mostrarse para que sea visible.
:::

### Ocultar un campo según la operación actual

La "operación" de un esquema es la acción que se está realizando sobre él. Usualmente, esto es `create`, `edit` o `view`, si estás usando el [recurso de panel](../resources).

Puedes ocultar un campo según la operación actual pasando una operación al método `hiddenOn()`:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->hiddenOn('edit')

// es lo mismo que

Toggle::make('is_admin')
    ->hidden(fn (string $operation): bool => $operation === 'edit')
```

También puedes pasar un array de operaciones al método `hiddenOn()`, y el campo se ocultará si la actual es cualquiera de las operaciones:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->hiddenOn(['edit', 'view'])

// es lo mismo que

Toggle::make('is_admin')
    ->hidden(fn (string $operation): bool => in_array($operation, ['edit', 'view']))
```

:::warning
El método `hiddenOn()` sobrescribirá cualquier llamada previa a `hidden()`, y viceversa.
:::

Alternativamente, puedes usar el método `visibleOn()` para controlar si el campo debe ocultarse o no. En algunas situaciones, esto puede ayudar a mejorar la legibilidad del código:

```php
use Filament\Forms\Components\Toggle;

Toggle::make('is_admin')
    ->visibleOn('create')

Toggle::make('is_admin')
    ->visibleOn(['create', 'edit'])
```

:::info
El método `visibleOn()` sobrescribirá cualquier llamada previa a `visible()`, y viceversa.
:::

## Etiquetas en línea

Los campos pueden mostrar sus etiquetas en línea con el campo, en lugar de encima de él. Esto es útil en formularios con muchos campos, donde el espacio vertical es limitado. Para mostrar la etiqueta en línea, usa el método `inlineLabel()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->inlineLabel()
```

Opcionalmente, puedes pasar un valor booleano para controlar si la etiqueta debe mostrarse en línea o no:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->inlineLabel(FeatureFlag::active())
```

<details>
<summary>Además de un valor estático</summary>

El método `inlineLabel()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Usar etiquetas en línea en múltiples lugares a la vez

Si deseas mostrar todas las etiquetas en línea en un [componente de layout](../schemas/layouts) como una [sección](../schemas/sections) o [pestaña](../schemas/tabs), puedes usar `inlineLabel()` en el componente mismo, y todos los campos dentro tendrán sus etiquetas en línea:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;

Section::make('Details')
    ->inlineLabel()
    ->schema([
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

public function form(Schema $schema): Schema
{
    return $schema
        ->inlineLabel()
        ->components([
            // ...
        ]);
}
```

Cuando usas `inlineLabel()` en un componente de layout o esquema, aún puedes excluir un campo individual usando `inlineLabel(false)`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;

Section::make('Details')
    ->inlineLabel()
    ->schema([
        TextInput::make('name'),
        TextInput::make('email')
            ->label('Email address'),
        TextInput::make('phone')
            ->label('Phone number')
            ->inlineLabel(false),
    ])
```

## Autofoco de un campo al cargar el esquema

La mayoría de los campos permiten autofoco. Generalmente, deberías intentar que el primer campo significativo de tu esquema tenga autofoco para mejor experiencia de usuario. Puedes asignar autofoco a un campo usando `autofocus()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->autofocus()
```

Opcionalmente, pasa un booleano para controlar el autofoco:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->autofocus(FeatureFlag::active())
```

<details>
<summary>Además de un valor estático</summary>

El método `autofocus()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Configurar el placeholder de un campo

Muchos campos pueden mostrar un placeholder cuando no tienen valor. Este se muestra en la interfaz pero nunca se guarda al enviar el formulario. Personalízalo con `placeholder()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->placeholder('John Doe')
```

<details>
<summary>Además de un valor estático</summary>

El método `placeholder()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Fusionar campos en un grupo

Un componente `FusedGroup` se usa para "fusionar" múltiples campos. Los mejores campos para fusionar son:

- [Entrada de texto](text-input)
- [Select](select)
- [Selector de fecha y hora](date-time-picker)
- [Selector de color](color-picker)

Los campos que deban fusionarse se pasan a `make()` del componente `FusedGroup`:

```php
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\FusedGroup;

FusedGroup::make([
    TextInput::make('city')
        ->placeholder('City'),
    Select::make('country')
        ->placeholder('Country')
        ->options([
            // ...
        ]),
])
```

Puedes agregar una etiqueta sobre el grupo usando `label()`:

```php
use Filament\Schemas\Components\FusedGroup;

FusedGroup::make([
    // ...
])
    ->label('Location')
```

Por defecto, cada campo tiene su propia fila. En móvil esto es lo óptimo, pero en escritorio puedes usar `columns()` (igual que en [componentes de layout](../schemas/layouts#grid-system)) para mostrar los campos en horizontal:

```php
use Filament\Schemas\Components\FusedGroup;

FusedGroup::make([
    // ...
])
    ->label('Location')
    ->columns(2)
```

Puedes ajustar el ancho de cada campo en la cuadrícula usando `columnSpan()` en cada uno:

```php
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\FusedGroup;

FusedGroup::make([
    TextInput::make('city')
        ->placeholder('City')
        ->columnSpan(2),
    Select::make('country')
        ->placeholder('Country')
        ->options([
            // ...
        ]),
])
    ->label('Location')
    ->columns(3)
```

## Añadir contenido extra a un campo

Los campos contienen muchos "slots" donde se puede insertar contenido en un esquema hijo. Los slots pueden aceptar texto, [cualquier componente de esquema](../schemas), [acciones](../actions) y [grupos de acciones](../actions/grouping-actions). Usualmente se usan [componentes prime](../schemas/primes) para el contenido.

Los siguientes slots están disponibles para todos los campos:

- `aboveLabel()`
- `beforeLabel()`
- `afterLabel()`
- `belowLabel()`
- `aboveContent()`
- `beforeContent()`
- `afterContent()`
- `belowContent()`
- `aboveErrorMessage()`
- `belowErrorMessage()`

<details>
<summary>Además de valores estáticos</summary>

Los métodos de slots también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

Para insertar texto plano, pasa un string:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->belowContent('Este es el nombre completo del usuario.')
```

Para insertar un componente de esquema, frecuentemente un [componente prime](../schemas/primes):

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Text;
use Filament\Support\Enums\FontWeight;

TextInput::make('name')
    ->belowContent(Text::make('Este es el nombre completo del usuario.')->weight(FontWeight::Bold))
```

Para insertar una [acción](../actions) o [grupo de acciones](../actions/grouping-actions):

```php
use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->belowContent(Action::make('generate'))
```

Puedes insertar cualquier combinación de contenido pasando un array:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->belowContent([
        Icon::make(Heroicon::InformationCircle),
        'Este es el nombre completo del usuario.',
        Action::make('generate'),
    ])
```

También puedes alinear el contenido en los slots pasando el array a `Schema::start()` (por defecto), `Schema::end()` o `Schema::between()`:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Icon;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->belowContent(Schema::end([
        Icon::make(Heroicon::InformationCircle),
        'Este es el nombre completo del usuario.',
        Action::make('generate'),
    ]))
```

:::tip
Como se muestra en el ejemplo de `Schema::between()`, se usa un [componente Flex](../schemas/layouts#flex-component) para agrupar el icono y el texto, de forma que no tengan espacio entre ellos. El icono utiliza `grow(false)` para evitar ocupar la mitad del espacio horizontal, permitiendo que el texto use el espacio restante.
:::

### Añadir contenido extra encima de la etiqueta

Puedes insertar contenido encima de la etiqueta de un campo usando `aboveLabel()`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->aboveLabel([
        Icon::make(Heroicon::Star),
        'Este es el contenido encima de la etiqueta'
    ])
```

### Añadir contenido extra antes de la etiqueta

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->beforeLabel(Icon::make(Heroicon::Star))
```

### Añadir contenido extra después de la etiqueta

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->afterLabel([
        Icon::make(Heroicon::Star),
        'Este es el contenido después de la etiqueta'
    ])
```

Por defecto, el contenido en `afterLabel()` se alinea al final del contenedor. Si deseas alinearlo al inicio, usa `Schema::start()`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->afterLabel(Schema::start([
        Icon::make(Heroicon::Star),
        'Este es el contenido después de la etiqueta'
    ]))
```

### Añadir contenido extra debajo de la etiqueta

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->belowLabel([
        Icon::make(Heroicon::Star),
        'Este es el contenido debajo de la etiqueta'
    ])
```

:::info
Esto puede parecer igual que [`aboveContent()`](#adding-extra-content-above-a-fields-content). Sin embargo, al usar [etiquetas en línea](#inline-labels), `aboveContent()` coloca el contenido arriba del campo, no debajo de la etiqueta, ya que la etiqueta está en otra columna diferente.
:::

### Añadir contenido extra encima del contenido del campo

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->aboveContent([
        Icon::make(Heroicon::Star),
        'Este es el contenido encima del contenido'
    ])
```

:::info
Esto puede parecer igual que [`belowLabel()`](#adding-extra-content-below-a-fields-label). Sin embargo, al usar [etiquetas en línea](#inline-labels), `belowLabel()` coloca el contenido debajo de la etiqueta, no encima del campo.
:::

### Añadir contenido extra antes del contenido

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->beforeContent(Icon::make(Heroicon::Star))
```

:::tip
Algunos campos como [entrada de texto](text-input#adding-affix-text-aside-the-field), [select](select#adding-affix-text-aside-the-field), y [selector de fecha y hora](date-time-picker#adding-affix-text-aside-the-field) tienen un método `prefix()` para insertar contenido antes del campo adosado al mismo. Generalmente es mejor opción que `beforeContent()`.
:::

### Añadir contenido extra después del contenido

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->afterContent(Icon::make(Heroicon::Star))
```

:::tip
Algunos campos como [entrada de texto](text-input#adding-affix-text-aside-the-field), [select](select#adding-affix-text-aside-the-field), y [selector de fecha y hora](date-time-picker#adding-affix-text-aside-the-field) tienen un método `suffix()` que inserta contenido después del contenido del campo, junto a él. Es mejor opción que `afterContent()`.
:::

### Añadir contenido extra sobre el mensaje de error

Puedes insertar contenido sobre un [mensaje de error](validation) usando `aboveErrorMessage()`. Solo se visualizará si existe error:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->required()
    ->aboveErrorMessage([
        Icon::make(Heroicon::Star),
        'Este es el contenido sobre el mensaje de error'
    ])
```

### Añadir contenido extra debajo del mensaje de error

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Icon;
use Filament\Support\Icons\Heroicon;

TextInput::make('name')
    ->required()
    ->belowErrorMessage([
        Icon::make(Heroicon::Star),
        'Este es el contenido debajo del mensaje de error'
    ])
```

## Añadir atributos HTML extra a un campo

Puedes pasar atributos HTML extra al campo mediante `extraAttributes()`, que se fusionarán en su elemento HTML exterior. Los atributos deben representarse en un array clave/valor:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->extraAttributes(['title' => 'Text input'])
```

:::tip
Por defecto, al llamar varias veces a `extraAttributes()` se sobrescriben. Si prefieres fusionarlos, puedes pasar `merge: true`.
:::

### Añadir atributos extra al input del campo

Algunos campos usan un elemento `<input>` o `<select>` interno, que no siempre es el elemento exterior. Para ellos, puedes usar `extraInputAttributes()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('categories')
    ->extraInputAttributes(['width' => 200])
```

:::tip
Por defecto, al llamar varias veces a `extraInputAttributes()` se sobrescriben. Si prefieres fusionarlos, usa `merge: true`.
:::

### Añadir atributos extra al "wrapper" del campo

También puedes añadir atributos al elemento exterior total del "wrapper" que rodea la etiqueta y contenido del campo. Útil para aplicar estilos:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('categories')
    ->extraFieldWrapperAttributes(['class' => 'components-locked'])
```

:::tip
Por defecto, al llamar varias veces a `extraFieldWrapperAttributes()` se sobrescriben. Si prefieres fusionarlos, usa `merge: true`.
:::

## Inyección de utilidades en campos

La gran mayoría de métodos usados para configurar campos aceptan funciones como parámetros en lugar de valores fijos:

```php
use App\Models\User;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;

DatePicker::make('date_of_birth')
    ->displayFormat(function (): string {
        if (auth()->user()->country_id === 'us') {
            return 'm/d/Y';
        }

        return 'd/m/Y';
    })

Select::make('user_id')
    ->options(function (): array {
        return User::query()->pluck('name', 'id')->all();
    })

TextInput::make('middle_name')
    ->required(fn (): bool => auth()->user()->hasMiddleName())
```

Esto por sí solo habilita muchas posibilidades de personalización.

El paquete también puede inyectar muchas utilidades dentro de estas funciones como parámetros. Todos los métodos de personalización que aceptan funciones pueden inyectar utilidades.

Es importante que los parámetros tengan nombres específicos, de lo contrario Filament no sabrá qué inyectar.

### Inyectar el estado actual de un campo

Si deseas acceder al valor actual (estado) del campo, define el parámetro `$state`:

```php
function ($state) {
    // ...
}
```

#### Inyectar el estado crudo del campo

Si un campo transforma su estado automáticamente a un formato más útil, es posible que desees acceder al estado crudo. Para ello, define el parámetro `$rawState`:

```php
function ($rawState) {
    // ...
}
```

### Inyectar el estado de otro campo

Puedes recuperar el estado (valor) de otro campo dentro de un callback usando el parámetro `$get`:

```php
use Filament\Schemas\Components\Utilities\Get;

function (Get $get) {
    $email = $get('email'); // Guarda el valor del campo `email` en la variable `$email`.
    //...
}
```

:::tip
A menos que un campo sea [reactivo](#the-basics-of-reactivity), el esquema no se refrescará cuando cambie su valor, solo en la próxima interacción del usuario que haga una petición al servidor. Si necesitas reaccionar a los cambios en el valor, el campo debe ser `live()`.
:::

### Inyectar el registro Eloquent actual

Puedes recuperar el registro Eloquent del esquema actual usando el parámetro `$record`:

```php
use Illuminate\Database\Eloquent\Model;

function (?Model $record) {
    // ...
}
```

### Inyectar la operación actual

Si estás escribiendo un esquema para un recurso de panel o un relation manager y quieres comprobar si la operación es `create`, `edit` o `view`, puedes usar el parámetro `$operation`:

```php
function (string $operation) {
    // ...
}
```

:::info
Puedes establecer manualmente la operación de un esquema con el método `$schema->operation()`.
:::

### Inyectar la instancia Livewire actual

Si deseas acceder a la instancia actual de Livewire, define el parámetro `$livewire`:

```php
use Livewire\Component;

function (Component $livewire) {
    // ...
}
```

### Inyectar la instancia del campo actual

Si deseas acceder a la instancia del componente Field actual, define el parámetro `$component`:

```php
use Filament\Forms\Components\Field;

function (Field $component) {
    // ...
}
```

### Inyectar múltiples utilidades

Los parámetros se inyectan dinámicamente usando reflection, por lo que puedes combinarlos en cualquier orden:

```php
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Livewire\Component as Livewire;

function (Livewire $livewire, Get $get, Set $set) {
    // ...
}
```

### Inyectar dependencias desde el contenedor de Laravel

También puedes inyectar cualquier dependencia del contenedor de Laravel como normalmente, junto a las utilidades:

```php
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Http\Request;

function (Request $request, Set $set) {
    // ...
}
```

### Usar JavaScript para determinar el contenido de texto

Los métodos que permiten renderizar HTML, como [`label()`](#setting-a-fields-label) y [`Text::make()` pasado a un `belowContent()`](#adding-extra-content-to-a-field), pueden usar JavaScript para calcular su contenido. Esto se logra pasando un objeto `JsContent`, que es `Htmlable`:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\JsContent;

TextInput::make('greetingResponse')
    ->label(JsContent::make(<<<'JS'
        ($get('name') === 'John Doe') ? 'Hello, John!' : 'Hello, stranger!'
        JS
    ))
```

Las utilidades [`$state`](#injecting-the-current-state-of-the-field) y [`$get`](#injecting-the-state-of-another-field) están disponibles en este contexto de JavaScript, por lo que puedes usarlas para acceder al estado del campo y de otros campos en el esquema.

## Fundamentos de la reactividad

[Livewire](https://livewire.laravel.com) es una herramienta que permite que el HTML renderizado con Blade se vuelva a renderizar dinámicamente sin recargar completamente la página. Los esquemas de Filament están construidos sobre Livewire, por lo que pueden re-renderizarse dinámicamente, permitiendo que su contenido se adapte tras ser cargado inicialmente.

Por defecto, cuando un usuario utiliza un campo, el esquema no se re-renderiza. Como el renderizado requiere un viaje de ida y vuelta al servidor, esto es una optimización de rendimiento. Sin embargo, si deseas que el esquema se re-renderice después de que el usuario interactúe con un campo, puedes usar el método `live()`:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->live()
```

En este ejemplo, al cambiar el valor del campo `status`, el esquema se volverá a renderizar. Esto te permite después modificar otros campos del esquema basándote en el nuevo valor. También puedes [engancharte al ciclo de vida del campo](#field-updates) para ejecutar lógica personalizada.

### Campos reactivos en blur

Por defecto, cuando un campo está configurado como `live()`, el esquema se re-renderiza cada vez que se interactúa con él. Esto no siempre es adecuado para campos como inputs de texto, ya que hacer peticiones de red mientras el usuario escribe degrada el rendimiento. Para re-renderizar el esquema solo después de que se pierda el foco del campo, usa `live(onBlur: true)`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('username')
    ->live(onBlur: true)
```

### Debounce en campos reactivos

Un punto intermedio entre `live()` y `live(onBlur: true)` es el "debounce". Este evita que se envíe una petición hasta que el usuario deje de escribir por cierto tiempo. Se logra con `live(debounce: 500)`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('username')
    ->live(debounce: 500) // Espera 500ms antes de re-renderizar.
```

Aquí `500` es el número de milisegundos que esperar antes de enviar la petición. Puede ser otro número o incluso un string como `'1s'`.

## Ciclo de vida de los campos

Cada campo en un esquema tiene un ciclo de vida: procesos al cargarse, al usarse por el usuario y al enviarse. Puedes personalizar lo que ocurre en cada etapa usando funciones.

### Hidratación de campos

La hidratación llena campos con datos. Corre cuando llamas al método `fill()` del esquema. Puedes personalizar qué ocurre tras hidratar un campo con `afterStateHydrated()`:

```php
use Closure;
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->required()
    ->afterStateHydrated(function (TextInput $component, string $state) {
        $component->state(ucwords($state));
    })
```

Como atajo, puedes usar `formatStateUsing()`:

```php
use Closure;
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->formatStateUsing(fn (string $state): string => ucwords($state))
```

### Actualización de campos

Puedes personalizar lo que ocurre cuando un usuario actualiza un campo con `afterStateUpdated()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->afterStateUpdated(function (?string $state, ?string $old) {
        // ...
    })
```

:::tip
Al usar `afterStateUpdated()` en un campo reactivo, las interacciones no son instantáneas ya que implican una petición. Hay formas de [optimizar y evitar renderizados](#field-rendering) para mejorar la experiencia.
:::

#### Establecer el estado de otro campo

De forma similar a `$get`, puedes cambiar otro campo usando `$set`:

```php
use Filament\Schemas\Components\Utilities\Set;

function (Set $set) {
    $set('title', 'Blog Post'); 
}
```

Esto actualiza el campo `title` y re-renderiza el esquema.  
Para llamar también al hook `afterStateUpdated()` del campo afectado, pasa `shouldCallUpdatedHooks: true`:

```php
use Filament\Schemas\Components\Utilities\Set;

function (Set $set) {
    $set('title', 'Blog Post', shouldCallUpdatedHooks: true);
}
```

### Deshidratación de campos

La deshidratación obtiene datos de los campos, opcionalmente los transforma y los devuelve. Corre cuando se llama `getState()`, por ejemplo al enviar un formulario. Puedes personalizarlo con `dehydrateStateUsing()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->required()
    ->dehydrateStateUsing(fn (string $state): string => ucwords($state))
```

#### Evitar que un campo se deshidrate

Para evitarlo totalmente, usa `dehydrated(false)`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password_confirmation')
    ->password()
    ->dehydrated(false)
```

Esto es útil para evitar guardar valores de campos meramente presentacionales.  

:::info
Incluso cuando un campo no se deshidrata, sigue siendo validado. Más detalles en [validación](validation#disabling-validation-when-fields-are-not-dehydrated).
:::

### Renderizado de campos

Cada vez que se actualiza un campo reactivo, el HTML del componente Livewire completo se re-genera y se envía. Esto puede ser excesivo si el esquema es grande.

#### Renderizado parcial de campos

Ejemplo en el que un campo depende del valor de otro:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;

TextInput::make('name')
    ->live()

TextInput::make('email')
    ->label(fn (Get $get): string => filled($get('name')) ? "Email address for {$get('name')}" : 'Email address')
```

Aquí, todo el esquema se re-renderiza. Para optimizarlo, usa `partiallyRenderComponentsAfterStateUpdated(['email'])`:

```php
TextInput::make('name')
    ->live()
    ->partiallyRenderComponentsAfterStateUpdated(['email'])
```

O `partiallyRenderAfterStateUpdated()` si solo depende de su propio estado:

```php
TextInput::make('name')
    ->live()
    ->partiallyRenderAfterStateUpdated()
    ->belowContent(fn (Get $get): ?string => filled($get('name')) ? "Hi, {$get('name')}!" : null)
```

#### Evitar re-render del componente Livewire

Si deseas impedir que se re-renderice al actualizar un campo, usa `skipRenderAfterStateUpdated()`:

```php
TextInput::make('name')
    ->live()
    ->skipRenderAfterStateUpdated()
    ->afterStateUpdated(function (string $state) {
        // Haz algo con $state, sin re-renderizar.
    })
```

Alternativa: usar `afterStateUpdatedJs()` para lógica en el navegador, sin petición extra:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Set;

// input antiguo que re-renderiza en cada actualización
TextInput::make('name')
    ->live()
    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('email', ((string) str($state)->replace(' ', '.')->lower()) . '@example.com'))

// input nuevo usando JS directamente
TextInput::make('name')
    ->afterStateUpdatedJs(<<<'JS'
        $set('email', ($state ?? '').replaceAll(' ', '.').toLowerCase() + '@example.com')
        JS)

TextInput::make('email')
    ->label('Email address')
```

:::danger
Cualquier cadena JS pasada a `afterStateUpdatedJs()` se ejecuta en el navegador, así que no debes interpolar entrada de usuario directamente, ya que puede causar XSS. Valores de `$state` y `$get()` son seguros como string, pero nunca deben evaluarse como código JS.
:::

## Recetario de formularios reactivos

Esta sección contiene una colección de recetas para tareas comunes al construir formularios avanzados.

### Ocultar un campo condicionalmente

Para ocultar o mostrar un campo condicionalmente, puedes pasar una función a `hidden()` que retorne `true` o `false`. La función puede [inyectar utilidades](#field-utility-injection) como parámetros, permitiendo comprobar otro campo:

```php
use Filament\Schemas\Components\Utilities\Get;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\TextInput;

Checkbox::make('is_company')
    ->live()

TextInput::make('company_name')
    ->hidden(fn (Get $get): bool => ! $get('is_company'))
```

En este ejemplo, el checkbox `is_company` es [`live()`](#the-basics-of-reactivity). Esto permite que el esquema se recargue cuando cambia. El valor se accede usando [`$get()`](#injecting-the-state-of-another-field). Se niega con `!` para que `company_name` se oculte cuando `is_company` es `false`.

Alternativamente, usa `visible()`:

```php
Checkbox::make('is_company')
    ->live()

TextInput::make('company_name')
    ->visible(fn (Get $get): bool => $get('is_company'))
```

:::tip
Usar `live()` significa que hay una petición cada vez que cambia. Alternativamente, puedes usar [JavaScript para ocultar campos](#hiding-a-field-using-javascript).
:::

### Hacer un campo requerido condicionalmente

```php
use Filament\Schemas\Components\Utilities\Get;
use Filament\Forms\Components\TextInput;

TextInput::make('company_name')
    ->live(onBlur: true)

TextInput::make('vat_number')
    ->required(fn (Get $get): bool => filled($get('company_name')))
```

Aquí, `company_name` es [`live(onBlur: true)`](#reactive-fields-on-blur). Esto permite que el esquema se recargue tras perder foco. Se verifica con `filled()` para hacer obligatorio `vat_number` si `company_name` tiene valor.

### Generar un slug desde un título

```php
use Filament\Schemas\Components\Utilities\Set;
use Filament\Forms\Components\TextInput;
use Illuminate\Support\Str;

TextInput::make('title')
    ->live(onBlur: true)
    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))

TextInput::make('slug')
```

El campo `title` es [`live(onBlur: true)`](#reactive-fields-on-blur). Cuando cambia, se ejecuta `afterStateUpdated()`, que inyecta `$set` y establece el slug usando `Str::slug()`.

Para no sobrescribir manualmente un slug editado, usa `$old` y `$get`:

```php
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Forms\Components\TextInput;
use Illuminate\Support\Str;

TextInput::make('title')
    ->live(onBlur: true)
    ->afterStateUpdated(function (Get $get, Set $set, ?string $old, ?string $state) {
        if (($get('slug') ?? '') !== Str::slug($old)) {
            return;
        }

        $set('slug', Str::slug($state));
    })

TextInput::make('slug')
```

### Select dependiente de otro

```php
use Filament\Schemas\Components\Utilities\Get;
use Filament\Forms\Components\Select;

Select::make('category')
    ->options([
        'web' => 'Web development',
        'mobile' => 'Mobile development',
        'design' => 'Design',
    ])
    ->live()

Select::make('sub_category')
    ->options(fn (Get $get): array => match ($get('category')) {
        'web' => [
            'frontend_web' => 'Frontend development',
            'backend_web' => 'Backend development',
        ],
        'mobile' => [
            'ios_mobile' => 'iOS development',
            'android_mobile' => 'Android development',
        ],
        'design' => [
            'app_design' => 'Panel design',
            'marketing_website_design' => 'Marketing website design',
        ],
        default => [],
    })
```

También se puede adaptar para cargar desde modelos Eloquent:

```php
Select::make('category')
    ->options(Category::query()->pluck('name', 'id'))
    ->live()

Select::make('sub_category')
    ->options(fn (Get $get): Collection => SubCategory::query()
        ->where('category', $get('category'))
        ->pluck('name', 'id'))
```

### Campos dinámicos según un select

```php
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Utilities\Get;

Select::make('type')
    ->options([
        'employee' => 'Employee',
        'freelancer' => 'Freelancer',
    ])
    ->live()
    ->afterStateUpdated(fn (Select $component) => $component
        ->getContainer()
        ->getComponent('dynamicTypeFields')
        ->getChildSchema()
        ->fill())

Grid::make(2)
    ->schema(fn (Get $get): array => match ($get('type')) {
        'employee' => [
            TextInput::make('employee_number')
                ->required(),
            FileUpload::make('badge')
                ->image()
                ->required(),
        ],
        'freelancer' => [
            TextInput::make('hourly_rate')
                ->numeric()
                ->required()
                ->prefix('€'),
            FileUpload::make('contract')
                ->required(),
        ],
        default => [],
    })
    ->key('dynamicTypeFields')
```

### Hash automático en campo de contraseña

Campo inicial:

```php
TextInput::make('password')
    ->password()
```

Hash al deshidratar:

```php
use Illuminate\Support\Facades\Hash;

TextInput::make('password')
    ->password()
    ->dehydrateStateUsing(fn (string $state): string => Hash::make($state))
```

Evitar deshidratar si está vacío:

```php
TextInput::make('password')
    ->password()
    ->dehydrateStateUsing(fn (string $state): string => Hash::make($state))
    ->dehydrated(fn (?string $state): bool => filled($state))
```

Requerir en `create`:

```php
TextInput::make('password')
    ->password()
    ->dehydrateStateUsing(fn (string $state): string => Hash::make($state))
    ->dehydrated(fn (?string $state): bool => filled($state))
    ->required(fn (string $operation): bool => $operation === 'create')
```

:::info
Si tu modelo usa `'password' => 'hashed'` en sus [casts de atributos](https://laravel.com/docs/eloquent-mutators#attribute-casting), no necesitas definir `Hash::make()`, Laravel lo hará automáticamente.
:::

## Guardar datos en relaciones

Además de dar estructura a los campos, los [componentes de layout](../schemas/layouts) pueden "teletransportar" sus campos anidados a una relación. Filament maneja la carga de datos desde una relación Eloquent `HasOne`, `BelongsTo` o `MorphOne`, y luego guarda los datos de vuelta a la misma relación. Para configurar esto, usa el método `relationship()` en cualquier componente de layout:

```php
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Fieldset;

Fieldset::make('Metadata')
    ->relationship('metadata')
    ->schema([
        TextInput::make('title'),
        Textarea::make('description'),
        FileUpload::make('image'),
    ])
```

En este ejemplo, `title`, `description` e `image` se cargan automáticamente desde la relación `metadata`, y se guardan de nuevo al enviar el formulario. Si el registro `metadata` no existe, se crea automáticamente.

Esta funcionalidad no se limita a fieldsets - puedes usarla con cualquier componente de layout. Por ejemplo, con un componente `Group` sin estilos asociados:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Group;

Group::make()
    ->relationship('customer')
    ->schema([
        TextInput::make('name')
            ->label('Customer')
            ->required(),
        TextInput::make('email')
            ->label('Email address')
            ->email()
            ->required(),
    ])
```

### Guardar datos en una relación `BelongsTo` o `MorphTo`

Ten en cuenta que si guardas datos en una relación `BelongsTo` o `MorphTo`, la columna de clave foránea en tu base de datos debe ser `nullable()`. Esto es porque Filament guarda primero el esquema, antes de guardar la relación. Como el esquema se guarda primero, el ID foráneo aún no existe, por lo que debe ser nullable. Inmediatamente después de guardar el esquema, Filament guarda la relación, que luego llena el ID foráneo y lo guarda nuevamente.

Vale la pena notar que si tienes un observer en tu modelo de esquema, puede que necesites adaptarlo para asegurar que no dependa de que la relación exista cuando se crea. Por ejemplo, si tienes un observer que envía un email a un registro relacionado cuando se crea un esquema, puede que necesites cambiar a usar un hook diferente que se ejecute después de que la relación se adjunte, como `updated()`.

#### Especificar el modelo relacionado para una relación `MorphTo`

Si usas una relación `MorphTo` y quieres que Filament pueda crear registros `MorphTo` en lugar de solo actualizarlos, necesitas especificar el modelo relacionado usando el parámetro `relatedModel` del método `relationship()`:

```php
use App\Models\Organization;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Group;

Group::make()
    ->relationship('customer', relatedModel: Organization::class)
    ->schema([
        // ...
    ])
```

En este ejemplo, `customer` es una relación `MorphTo`, y podría ser un `Individual` u `Organization`. Al especificar el parámetro `relatedModel`, Filament podrá crear registros `Organization` cuando se envíe el formulario. Si no especificas este parámetro, Filament solo podrá actualizar registros existentes.

<details>
<summary>Además de un valor estático</summary>

El parámetro `relatedModel` también acepta una función que retorna el nombre de clase del modelo relacionado. Esto es útil si quieres determinar dinámicamente el modelo relacionado basándote en el estado actual del formulario. Puedes inyectar varias utilidades en esta función.

</details>

### Guardar datos en una relación condicionalmente

A veces, guardar el registro relacionado puede ser opcional. Si el usuario llena los campos del cliente, entonces el cliente se creará / actualizará. De lo contrario, el cliente no se creará, o se eliminará si ya existe. Para hacer esto, puedes pasar una función `condition` como argumento a `relationship()`, que puede usar el `$state` del formulario relacionado para determinar si la relación debe guardarse o no:

```php
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Group;

Group::make()
    ->relationship(
        'customer',
        condition: fn (?array $state): bool => filled($state['name']),
    )
    ->schema([
        TextInput::make('name')
            ->label('Customer'),
        TextInput::make('email')
            ->label('Email address')
            ->email()
            ->requiredWith('name'),
    ])
```

En este ejemplo, el nombre del cliente no es `required()`, y la dirección de email solo es requerida cuando el `name` está lleno. La función `condition` se usa para verificar si el campo `name` está lleno, y si lo está, entonces el cliente se creará / actualizará. De lo contrario, el cliente no se creará, o se eliminará si ya existe.

## Configuración global

Si deseas cambiar el comportamiento predeterminado de un campo globalmente, puedes llamar al método estático `configureUsing()` dentro del método `boot()` de un service provider o un middleware. Pasa un closure que pueda modificar el componente. Por ejemplo, si deseas hacer que todos los [checkboxes sean `inline(false)`](checkbox#positioning-the-label-above), puedes hacerlo así:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::configureUsing(function (Checkbox $checkbox): void {
    $checkbox->inline(false);
});
```

Por supuesto, aún puedes sobrescribir este comportamiento en cada campo individualmente:

```php
use Filament\Forms\Components\Checkbox;

Checkbox::make('is_admin')
    ->inline()
```
