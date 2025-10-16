---
title: Rich editor
---

## Introducción

El editor enriquecido te permite editar y previsualizar contenido HTML, así como subir imágenes. Usa [TipTap](https://tiptap.dev) como editor subyacente.

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
```

## Almacenar contenido como JSON

Por defecto, el editor enriquecido almacena el contenido como HTML. Si prefieres almacenar el contenido como JSON, puedes usar el método `json()`:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->json()
```

El JSON está en formato [TipTap](https://tiptap.dev), que es una representación estructurada del contenido.

Si estás guardando las etiquetas JSON usando Eloquent, debes asegurarte de agregar un `array` [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) a la propiedad del modelo:

```php
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'content' => 'array',
        ];
    }

    // ...
}
```

## Personalizar los botones de la barra de herramientas

Puedes establecer los botones de la barra de herramientas del editor usando el método `toolbarButtons()`. Las opciones mostradas aquí son las predeterminadas:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->toolbarButtons([
        ['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript', 'link'],
        ['h2', 'h3', 'alignStart', 'alignCenter', 'alignEnd'],
        ['blockquote', 'codeBlock', 'bulletList', 'orderedList'],
        ['table', 'attachFiles'], // Las herramientas `customBlocks` y `mergeTags` también se añaden aquí si se usan esas funcionalidades.
        ['undo', 'redo'],
    ])
```

Cada array anidado en el array principal representa un grupo de botones en la barra de herramientas.

Herramientas adicionales disponibles en la barra incluyen:

- `h1` - Aplica la etiqueta "h1" al texto.
- `alignJustify` - Justifica el texto.
- `clearFormatting` - Elimina todo el formato del texto seleccionado.
- `details` - Inserta una etiqueta `<details>`, que permite a los usuarios crear secciones colapsables en su contenido.
- `highlight` - Resalta el texto seleccionado con una etiqueta `<mark>` alrededor.
- `horizontalRule` - Inserta una regla horizontal.
- `lead` - Aplica una clase `lead` alrededor del texto, típicamente usada para el primer párrafo de un artículo.
- `small` - Aplica la etiqueta `<small>` al texto, típicamente usada para letra pequeña o avisos legales.
- `code` - Formatea el texto seleccionado como código en línea.
- `table` - Crea una tabla en el editor con un diseño predeterminado de 3 columnas y 2 filas, con la primera fila configurada como fila de encabezado.
- `tableAddColumnBefore` - Añade una nueva columna antes de la columna actual.
- `tableAddColumnAfter` - Añade una nueva columna después de la columna actual.
- `tableDeleteColumn` - Elimina la columna actual.
- `tableAddRowBefore` - Añade una nueva fila encima de la fila actual.
- `tableAddRowAfter` - Añade una nueva fila debajo de la fila actual.
- `tableDeleteRow` - Elimina la fila actual.
- `tableMergeCells` - Fusiona las celdas seleccionadas en una celda.
- `tableSplitCell` - Divide la celda seleccionada en múltiples celdas.
- `tableToggleHeaderRow` - Alterna la fila de encabezado de la tabla.
- `tableDelete` - Elimina la tabla.

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>toolbarButtons()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar barras de herramientas flotantes

Si tu barra de herramientas está demasiado llena, puedes usar una barra flotante para mostrar ciertas herramientas en una barra debajo del cursor, solo cuando el usuario esté dentro de un tipo de nodo específico. Esto te permite mantener limpia la barra principal mientras proporcionas acceso a herramientas adicionales cuando sea necesario.

Puedes personalizar las barras flotantes que aparecen cuando tu cursor se coloca dentro de un nodo específico usando el método `floatingToolbars()`.

En el ejemplo siguiente, aparece una barra flotante cuando el cursor está dentro de un nodo de párrafo. Muestra botones de negrita, cursiva y similares. Cuando el cursor está en un nodo de encabezado, muestra botones relacionados con encabezados, y cuando está dentro de una tabla, muestra controles específicos de tabla.

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->floatingToolbars([
        'paragraph' => [
            'bold', 'italic', 'underline', 'strike', 'subscript', 'superscript',
        ],
        'heading' => [
            'h1', 'h2', 'h3',
        ],
        'table' => [
            'tableAddColumnBefore', 'tableAddColumnAfter', 'tableDeleteColumn',
            'tableAddRowBefore', 'tableAddRowAfter', 'tableDeleteRow',
            'tableMergeCells', 'tableSplitCell',
            'tableToggleHeaderRow',
            'tableDelete',
        ],
    ])
```

## Renderizar contenido enriquecido

Si estás [almacenando contenido como JSON](#storing-content-as-json) en lugar de HTML, o tu contenido requiere procesamiento para inyectar [URLs de imágenes privadas](#using-private-images-in-the-editor) o similar, necesitarás usar la herramienta `RichContentRenderer` en Filament para generar HTML:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)->toHtml()
```

El método `toHtml()` devuelve un string. Si deseas generar HTML en una vista Blade sin escapar el HTML, puedes hacer echo del objeto `RichContentRender` sin llamar a `toHtml()`:

```blade
{{ \Filament\Forms\Components\RichEditor\RichContentRenderer::make($record->content) }}
```

Si has configurado el [comportamiento de adjuntos de archivos](#uploading-images-to-the-editor) del editor para cambiar el disco o visibilidad de los archivos subidos, también debes pasar estas configuraciones al renderizador para asegurar que se generen las URLs correctas:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->fileAttachmentsDisk('s3')
    ->fileAttachmentsVisibility('private')
    ->toHtml()
```

Si estás usando [bloques personalizados](#using-custom-blocks) en el editor enriquecido, puedes pasar un array de bloques personalizados al renderizador para asegurar que se rendericen correctamente:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->customBlocks([
        HeroBlock::class => [
            'categoryUrl' => $record->category->getUrl(),
        ],
        CallToActionBlock::class,
    ])
    ->toHtml()
```

Si estás usando [etiquetas de fusión](#using-merge-tags), puedes pasar un array de valores para reemplazar las etiquetas:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->mergeTags([
        'name' => $record->user->name,
        'today' => now()->toFormattedDateString(),
    ])
    ->toHtml()
```

## Seguridad

Por defecto, el editor genera HTML sin procesar y lo envía al backend. Los atacantes pueden interceptar el valor del componente y enviar un string HTML diferente al backend. Por lo tanto, es importante que al generar el HTML desde un editor enriquecido, se sanitice; de lo contrario, tu sitio puede estar expuesto a vulnerabilidades de Cross-Site Scripting (XSS).

Cuando Filament genera HTML sin procesar desde la base de datos en componentes como `TextColumn` y `TextEntry`, lo sanitiza para eliminar cualquier JavaScript peligroso. Sin embargo, si estás generando el HTML desde un editor enriquecido en tu propia vista Blade, esto es tu responsabilidad. Una opción es usar el helper `sanitizeHtml()` de Filament para hacer esto, que es la misma herramienta que usamos para sanitizar HTML en los componentes mencionados anteriormente:

```blade
{!! str($record->content)->sanitizeHtml() !!}
```

Si estás [almacenando contenido como JSON](#storing-content-as-json) en lugar de HTML, o tu contenido requiere procesamiento para inyectar [URLs de imágenes privadas](#using-private-images-in-the-editor) o similar, puedes usar el [renderizador de contenido](#rendering-rich-content) para generar HTML. Esto sanitizará automáticamente el HTML por ti, así que no necesitas preocuparte por ello.

## Subir imágenes al editor

Por defecto, las imágenes subidas se almacenan públicamente en tu disco de almacenamiento, para que el contenido enriquecido almacenado en la base de datos pueda generarse fácilmente en cualquier lugar. Puedes personalizar cómo se suben las imágenes usando métodos de configuración:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->fileAttachmentsDisk('s3')
    ->fileAttachmentsDirectory('attachments')
    ->fileAttachmentsVisibility('private')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>fileAttachmentsDisk()</code>, <code>fileAttachmentsDirectory()</code> y <code>fileAttachmentsVisibility()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::tip
Filament también soporta [`spatie/laravel-medialibrary`](https://github.com/spatie/laravel-medialibrary) para almacenar adjuntos de archivos del editor enriquecido. Consulta nuestra [documentación del plugin](/plugins/filament-spatie-media-library#using-media-library-for-rich-editor-file-attachments) para más información.
:::

### Usar imágenes privadas en el editor

Usar imágenes privadas en el editor añade una capa de complejidad al proceso, ya que las imágenes privadas no pueden accederse directamente vía una URL permanente. Cada vez que se carga el editor o se renderiza su contenido, se necesitan generar URLs temporales para cada imagen, que nunca se almacenan en la base de datos. En su lugar, Filament añade un atributo `data-id` a las etiquetas de imagen, que contiene un identificador para la imagen en el disco de almacenamiento, para que se pueda generar una URL temporal bajo demanda.

Al renderizar el contenido usando imágenes privadas, asegúrate de usar la [herramienta `RichContentRenderer`](#rendering-rich-content) en Filament para generar HTML:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->fileAttachmentsDisk('s3')
    ->fileAttachmentsVisibility('private')
    ->toHtml()
```

## Usar bloques personalizados

Los bloques personalizados son elementos que los usuarios pueden arrastrar y soltar en el editor enriquecido. Puedes definir bloques personalizados que el usuario puede insertar en el editor usando el método `customBlocks()`:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->customBlocks([
        HeroBlock::class,
        CallToActionBlock::class,
    ])
```

Para crear un bloque personalizado, puedes usar el siguiente comando:

```bash
php artisan make:filament-rich-content-custom-block HeroBlock
```

Cada bloque necesita una clase correspondiente que extienda la clase `Filament\Forms\Components\RichEditor\RichContentCustomBlock`. El método `getId()` debe devolver un identificador único para el bloque, y el método `getLabel()` debe devolver la etiqueta que se mostrará en el panel lateral del editor:

```php
use Filament\Forms\Components\RichEditor\RichContentCustomBlock;

class HeroBlock extends RichContentCustomBlock
{
    public static function getId(): string
    {
        return 'hero';
    }

    public static function getLabel(): string
    {
        return 'Hero section';
    }
}
```

Cuando un usuario arrastra un bloque personalizado al editor, puedes elegir abrir un modal para recopilar información adicional del usuario antes de insertar el bloque. Para hacer esto, puedes usar el método `configureEditorAction()` para configurar el [modal](../actions/modals) que se abrirá cuando se inserte el bloque:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\RichEditor\RichContentCustomBlock;

class HeroBlock extends RichContentCustomBlock
{
    // ...

    public static function configureEditorAction(Action $action): Action
    {
        return $action
            ->modalDescription('Configure the hero section')
            ->schema([
                TextInput::make('heading')
                    ->required(),
                TextInput::make('subheading'),
            ]);
    }
}
```

El método `schema()` en la acción puede definir campos de formulario que se mostrarán en el modal. Cuando el usuario envíe el formulario, los datos se guardarán como "configuración" para ese bloque.

### Renderizar una vista previa para un bloque personalizado

Una vez que se inserta un bloque en el editor, puedes definir una "vista previa" para él usando el método `toPreviewHtml()`. Este método debe devolver un string de HTML que se mostrará en el editor cuando se inserte el bloque, permitiendo a los usuarios ver cómo se verá el bloque antes de guardarlo. Puedes acceder a la `$config` del bloque en este método, que contiene los datos enviados en el modal cuando se insertó el bloque:

```php
use Filament\Forms\Components\RichEditor\RichContentCustomBlock;

class HeroBlock extends RichContentCustomBlock
{
    // ...

    /**
     * @param  array<string, mixed>  $config
     */
    public static function toPreviewHtml(array $config): string
    {
        return view('filament.forms.components.rich-editor.rich-content-custom-blocks.hero.preview', [
            'heading' => $config['heading'],
            'subheading' => $config['subheading'] ?? 'Default subheading',
        ])->render();
    }
}
```

El método `getPreviewLabel()` puede definirse si deseas personalizar la etiqueta que se muestra encima de la vista previa en el editor. Por defecto, usará la etiqueta definida en el método `getLabel()`, pero `getPreviewLabel()` puede acceder a la `$config` del bloque, permitiéndote mostrar información dinámica en la etiqueta:

```php
use Filament\Forms\Components\RichEditor\RichContentCustomBlock;

class HeroBlock extends RichContentCustomBlock
{
    // ...

    /**
     * @param  array<string, mixed>  $config
     */
    public static function getPreviewLabel(array $config): string
    {
        return "Hero section: {$config['heading']}";
    }
}
```

### Renderizar contenido con bloques personalizados

Al renderizar el contenido enriquecido, puedes pasar el array de bloques personalizados al `RichContentRenderer` para asegurar que los bloques se rendericen correctamente:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->customBlocks([
        HeroBlock::class,
        CallToActionBlock::class,
    ])
    ->toHtml()
```

Cada clase de bloque puede tener un método `toHtml()` que devuelve el HTML que debe renderizarse para ese bloque:

```php
use Filament\Forms\Components\RichEditor\RichContentCustomBlock;

class HeroBlock extends RichContentCustomBlock
{
    // ...

    /**
     * @param  array<string, mixed>  $config
     * @param  array<string, mixed>  $data
     */
    public static function toHtml(array $config, array $data): string
    {
        return view('filament.forms.components.rich-editor.rich-content-custom-blocks.hero.index', [
            'heading' => $config['heading'],
            'subheading' => $config['subheading'],
            'buttonLabel' => 'View category',
            'buttonUrl' => $data['categoryUrl'],
        ])->render();
    }
}
```

Como se ve arriba, el método `toHtml()` recibe dos parámetros: `$config`, que contiene los datos de configuración enviados en el modal cuando se insertó el bloque, y `$data`, que contiene cualquier dato adicional que pueda necesitarse para renderizar el bloque. Esto te permite acceder a los datos de configuración y renderizar el bloque en consecuencia. Los datos pueden pasarse en el método `customBlocks()`:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->customBlocks([
        HeroBlock::class => [
            'categoryUrl' => $record->category->getUrl(),
        ],
        CallToActionBlock::class,
    ])
    ->toHtml()
```

### Abrir el panel de bloques personalizados por defecto

Si deseas que el panel de bloques personalizados esté abierto por defecto cuando se cargue el editor enriquecido, puedes usar el método `activePanel('customBlocks')`:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->customBlocks([
        HeroBlock::class,
        CallToActionBlock::class,
    ])
    ->activePanel('customBlocks')
```

## Usar etiquetas de fusión

Las etiquetas de fusión permiten al usuario insertar "marcadores de posición" en su contenido enriquecido, que pueden reemplazarse con valores dinámicos cuando se renderiza el contenido. Esto es útil para insertar cosas como el nombre del usuario actual o la fecha actual.

Para registrar etiquetas de fusión en un editor, usa el método `mergeTags()`:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->mergeTags([
        'name',
        'today',
    ])
```

Las etiquetas de fusión están rodeadas por llaves dobles, como `{{ name }}`. Cuando se renderiza el contenido, estas etiquetas se reemplazarán con los valores correspondientes.

Para insertar una etiqueta de fusión en el contenido, los usuarios pueden comenzar a escribir `{{` para buscar una etiqueta a insertar. Alternativamente, pueden hacer clic en la herramienta "merge tags" en la barra del editor, que abre un panel con todas las etiquetas de fusión. Luego pueden arrastrar una etiqueta desde el panel lateral del editor al contenido o hacer clic para insertarla.

### Renderizar contenido con etiquetas de fusión

Al renderizar el contenido enriquecido, puedes pasar un array de valores para reemplazar las etiquetas de fusión:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->mergeTags([
        'name' => $record->user->name,
        'today' => now()->toFormattedDateString(),
    ])
    ->toHtml()
```

Si tienes muchas etiquetas de fusión o necesitas ejecutar alguna lógica para determinar los valores, puedes usar una función como valor de cada etiqueta. Esta función se llamará cuando se encuentre por primera vez una etiqueta en el contenido, y su resultado se almacena en caché para etiquetas subsiguientes del mismo nombre:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->mergeTags([
        'name' => fn (): string => $record->user->name,
        'today' => now()->toFormattedDateString(),
    ])
    ->toHtml()
```

### Abrir el panel de etiquetas de fusión por defecto

Si deseas que el panel de etiquetas de fusión esté abierto por defecto cuando se cargue el editor enriquecido, puedes usar el método `activePanel('mergeTags')`:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->mergeTags([
        'name',
        'today',
    ])
    ->activePanel('mergeTags')
```

## Registrar atributos de contenido enriquecido

Hay elementos de la configuración del editor enriquecido que aplican tanto al editor como al renderizador. Por ejemplo, si estás usando [imágenes privadas](#using-private-images-in-the-editor), [bloques personalizados](#using-custom-blocks), [etiquetas de fusión](#using-merge-tags) o [plugins](#extending-the-rich-editor), necesitas asegurar que se use la misma configuración en ambos lugares. Para hacer esto, Filament te proporciona una forma de registrar atributos de contenido enriquecido que pueden usarse tanto en el editor como en el renderizador.

Para registrar atributos de contenido enriquecido en un modelo Eloquent, debes usar el trait `InteractsWithRichContent` e implementar la interfaz `HasRichContent`. Esto te permite registrar los atributos en el método `setUpRichContent()`:

```php
use Filament\Forms\Components\RichEditor\Models\Concerns\InteractsWithRichContent;
use Filament\Forms\Components\RichEditor\Models\Contracts\HasRichContent;
use Illuminate\Database\Eloquent\Model;

class Post extends Model implements HasRichContent
{
    use InteractsWithRichContent;

    public function setUpRichContent(): void
    {
        $this->registerRichContent('content')
            ->fileAttachmentsDisk('s3')
            ->fileAttachmentsVisibility('private')
            ->customBlocks([
                HeroBlock::class => [
                    'categoryUrl' => fn (): string => $this->category->getUrl(),
                ],
                CallToActionBlock::class,
            ])
            ->mergeTags([
                'name' => fn (): string => $this->user->name,
                'today' => now()->toFormattedDateString(),
            ])
            ->plugins([
                HighlightRichContentPlugin::make(),
            ]);
    }
}
```

Siempre que uses el componente `RichEditor`, se usará la configuración registrada para el atributo correspondiente:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
```

Para renderizar fácilmente el HTML del contenido enriquecido desde un modelo con la configuración dada, puedes llamar al método `renderRichContent()` en el modelo, pasando el nombre del atributo:

```blade
{!! $record->renderRichContent('content') !!}
```

Alternativamente, puedes obtener un objeto `Htmlable` para renderizar sin escapar el HTML:

```blade
{{ $record->getRichContentAttribute('content') }}
```

Al usar una [columna de texto](../tables/columns/text) en una tabla o una [entrada de texto](../infolists/text-entry) en un infolist, no necesitas renderizar manualmente el contenido enriquecido. Filament lo hará automáticamente por ti:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('content')

TextEntry::make('content')
```

## Extender el editor enriquecido

Puedes crear plugins para el editor enriquecido, que te permiten añadir extensiones TipTap personalizadas al editor y renderizador, así como botones de barra de herramientas personalizados. Crea una nueva clase que implemente la interfaz `RichContentPlugin`:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\RichEditor\EditorCommand;
use Filament\Forms\Components\RichEditor\Plugins\Contracts\RichContentPlugin;
use Filament\Forms\Components\RichEditor\RichEditorTool;
use Filament\Support\Enums\Width;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Icons\Heroicon;
use Tiptap\Core\Extension;
use Tiptap\Marks\Highlight;

class HighlightRichContentPlugin implements RichContentPlugin
{
    public static function make(): static
    {
        return app(static::class);
    }

    /**
     * @return array<Extension>
     */
    public function getTipTapPhpExtensions(): array
    {
        // Este método debe devolver un array de objetos de extensión PHP TipTap.
        // Ver: https://github.com/ueberdosis/tiptap-php

        return [
            app(Highlight::class, [
                'options' => ['multicolor' => true],
            ]),
        ];
    }

    /**
     * @return array<string>
     */
    public function getTipTapJsExtensions(): array
    {
        // Este método debe devolver un array de URLs a archivos JavaScript que contienen
        // extensiones TipTap que deben cargarse asincrónicamente en el editor
        // cuando se usa el plugin.

        return [
            FilamentAsset::getScriptSrc('rich-content-plugins/highlight'),
        ];
    }

    /**
     * @return array<RichEditorTool>
     */
    public function getEditorTools(): array
    {
        // Este método debe devolver un array de objetos `RichEditorTool`, que luego pueden
        // usarse en el `toolbarButtons()` del editor.

        // El método `jsHandler()` te permite acceder a la instancia del editor TipTap
        // a través de `$getEditor()`, y encadenar (`chain()`) cualquier comando TipTap a él.
        // Ver: https://tiptap.dev/docs/editor/api/commands

        // El método `action()` te permite ejecutar una acción (registrada en el método
        // `getEditorActions()`) cuando se hace clic en el botón de la barra. Esto te permite
        // abrir un modal para recopilar información adicional del usuario antes de ejecutar un comando.

        return [
            RichEditorTool::make('highlight')
                ->jsHandler('$getEditor()?.chain().focus().toggleHighlight().run()')
                ->icon(Heroicon::CursorArrowRays),
            RichEditorTool::make('highlightWithCustomColor')
                ->action(arguments: '{ color: $getEditor().getAttributes(\'highlight\')?.[\'data-color\'] }')
                ->icon(Heroicon::CursorArrowRipple),
        ];
    }

    /**
     * @return array<Action>
     */
    public function getEditorActions(): array
    {
        // Este método debe devolver un array de objetos `Action`, que pueden ser usados por las
        // herramientas registradas en el método `getEditorTools()`. El nombre de la acción debe
        // coincidir con el nombre de la herramienta que la usa.

        // El método `runCommands()` te permite ejecutar comandos TipTap en la instancia del editor.
        // Acepta un array de objetos `EditorCommand` que definen el comando a ejecutar,
        // así como cualquier argumento a pasar al comando. También debes pasar el argumento
        // `editorSelection`, que es la selección actual en el editor a la que aplicar los comandos.

        return [
            Action::make('highlightWithCustomColor')
                ->modalWidth(Width::Large)
                ->fillForm(fn (array $arguments): array => [
                    'color' => $arguments['color'] ?? null,
                ])
                ->schema([
                    ColorPicker::make('color'),
                ])
                ->action(function (array $arguments, array $data, RichEditor $component): void {
                    $component->runCommands(
                        [
                            EditorCommand::make(
                                'toggleHighlight',
                                arguments: [[
                                    'color' => $data['color'],
                                ]],
                            ),
                        ],
                        editorSelection: $arguments['editorSelection'],
                    );
                }),
        ];
    }
}
```

Puedes usar el método `plugins()` para registrar tu plugin con el editor enriquecido y el [renderizador de contenido enriquecido](#rendering-rich-content):

```php
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichEditor::make('content')
    ->toolbarButtons([
        ['bold', 'highlight', 'highlightWithCustomColor'],
        ['h2', 'h3'],
        ['bulletList', 'orderedList'],
    ])
    ->plugins([
        HighlightRichContentPlugin::make(),
    ])

RichContentRenderer::make($record->content)
    ->plugins([
        HighlightRichContentPlugin::make(),
    ])
```

### Configurar una extensión JavaScript de TipTap

Filament puede cargar asincrónicamente extensiones JavaScript para TipTap. Para hacer esto, necesitas crear un archivo JavaScript que contenga la extensión, y registrarlo en el método `getTipTapJsExtensions()` de tu [plugin](#extending-the-rich-editor).

Por ejemplo, si quisieras usar la [extensión highlight de TipTap](https://tiptap.dev/docs/editor/extensions/marks/highlight), asegúrate de instalarla primero:

```bash
npm install @tiptap/extension-highlight --save-dev
```

Luego, crea un archivo JavaScript que importe la extensión. En este ejemplo, crea un archivo llamado `highlight.js` en el directorio `resources/js/filament/rich-content-plugins`, y añade el siguiente código:

```javascript
import Highlight from '@tiptap/extension-highlight'

export default Highlight.configure({
    multicolor: true,
})
```

Una forma de compilar este archivo es usar [esbuild](https://esbuild.github.io). Puedes instalarlo usando `npm`:

```bash
npm install esbuild --save-dev
```

Debes crear un script de [esbuild](https://esbuild.github.io) para compilar el archivo. Puedes ponerlo en cualquier lugar, por ejemplo `bin/build.js`:

```js
import * as esbuild from 'esbuild'

async function compile(options) {
    const context = await esbuild.context(options)

    await context.rebuild()
    await context.dispose()
}

compile({
    define: {
        'process.env.NODE_ENV': `'production'`,
    },
    bundle: true,
    mainFields: ['module', 'main'],
    platform: 'neutral',
    sourcemap: false,
    sourcesContent: false,
    treeShaking: true,
    target: ['es2020'],
    minify: true,
    entryPoints: ['./resources/js/filament/rich-content-plugins/highlight.js'],
    outfile: './resources/js/dist/filament/rich-content-plugins/highlight.js',
})
```

Como puedes ver al final del script, estamos compilando un archivo llamado `resources/js/filament/rich-content-plugins/highlight.js` en `resources/js/dist/filament/rich-content-plugins/highlight.js`. Puedes cambiar estas rutas según tus necesidades. Puedes compilar tantos archivos como desees.

Para ejecutar el script y compilar este archivo en `resources/js/dist/filament/rich-content-plugins/highlight.js`, ejecuta el siguiente comando:

```bash
node bin/build.js
```

Debes registrarlo en el método `boot()` de un service provider, como `AppServiceProvider`, y usar `loadedOnRequest()` para que no se descargue hasta que el editor enriquecido se cargue en una página:

```php
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;

FilamentAsset::register([
    Js::make('rich-content-plugins/highlight', __DIR__ . '/../../resources/js/dist/filament/rich-content-plugins/highlight.js')->loadedOnRequest(),
]);
```

Para publicar este nuevo archivo JavaScript en el directorio `/public` de tu app para que pueda servirse, puedes usar el comando `filament:assets`:

```bash
php artisan filament:assets
```

En el [objeto plugin](#extending-the-rich-editor), el método `getTipTapJsExtensions()` debe devolver la ruta al archivo JavaScript que acabas de crear. Ahora que está registrado con `FilamentAsset`, puedes usar el método `getScriptSrc()` para obtener la URL del archivo:

```php
use Filament\Support\Facades\FilamentAsset;

/**
 * @return array<string>
 */
public function getTipTapJsExtensions(): array
{
    return [
        FilamentAsset::getScriptSrc('rich-content-plugins/highlight'),
    ];
}
```
