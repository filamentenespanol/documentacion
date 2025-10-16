---
title: Markdown editor
---

## Introducción

El editor de Markdown te permite editar y previsualizar contenido Markdown, así como subir imágenes mediante arrastrar y soltar.

```php
use Filament\Forms\Components\MarkdownEditor;

MarkdownEditor::make('content')
```

## Seguridad

Por defecto, el editor genera Markdown y HTML sin procesar, y lo envía al backend. Los atacantes pueden interceptar el valor del componente y enviar una cadena de HTML sin procesar diferente al backend. Por lo tanto, es importante que, al mostrar el HTML desde un editor Markdown, este se sanee; de lo contrario, tu sitio puede estar expuesto a vulnerabilidades de Cross-Site Scripting (XSS).

Cuando Filament muestra HTML sin procesar desde la base de datos en componentes como `TextColumn` y `TextEntry`, lo sanea para eliminar cualquier JavaScript peligroso. Sin embargo, si estás mostrando el HTML desde un editor Markdown en tu propia vista Blade, esto es tu responsabilidad. Una opción es usar el helper `sanitizeHtml()` de Filament para hacerlo, que es la misma herramienta que usamos para sanear HTML en los componentes mencionados anteriormente:

```blade
{!! str($record->content)->markdown()->sanitizeHtml() !!}
```

## Personalizar los botones de la barra de herramientas

Puedes establecer los botones de la barra de herramientas del editor usando el método `toolbarButtons()`. Las opciones mostradas aquí son las predeterminadas:

```php
use Filament\Forms\Components\MarkdownEditor;

MarkdownEditor::make('content')
    ->toolbarButtons([
        ['bold', 'italic', 'strike', 'link'],
        ['heading'],
        ['blockquote', 'codeBlock', 'bulletList', 'orderedList'],
        ['table', 'attachFiles'],
        ['undo', 'redo'],
    ])
```

Cada array anidado en el array principal representa un grupo de botones en la barra de herramientas.

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>toolbarButtons()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Subir imágenes al editor

Se pueden subir imágenes al editor. Siempre se subirán a una URL públicamente disponible con permisos de almacenamiento público, ya que no se admite la generación de URLs temporales para subidas de archivos en contenido estático. Puedes personalizar dónde se suben las imágenes usando métodos de configuración:

```php
use Filament\Forms\Components\MarkdownEditor;

MarkdownEditor::make('content')
    ->fileAttachmentsDisk('s3')
    ->fileAttachmentsDirectory('attachments')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, los métodos <code>fileAttachmentsDisk()</code> y <code>fileAttachmentsDirectory()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>
