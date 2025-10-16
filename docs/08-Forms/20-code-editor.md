---
title: Code editor
---

## Introducción

El componente de editor de código te permite escribir código en un textarea con números de línea. Por defecto, no se aplica resaltado de sintaxis.

```php
use Filament\Forms\Components\CodeEditor;

CodeEditor::make('code')
```

## Usar resaltado de sintaxis por lenguaje

Puedes cambiar el resaltado de sintaxis del editor usando el método `language()`. El editor soporta los siguientes lenguajes:

- C++
- CSS
- Go
- HTML
- Java
- JavaScript
- JSON
- Markdown
- PHP
- Python
- XML
- YAML

Puedes abrir la clase enum `Filament\\Forms\\Components\\CodeEditor\\Enums\\Language` para ver esta lista. Para cambiar al resaltado de sintaxis de JavaScript, puedes usar el valor del enum `Language::JavaScript`:

```php
use Filament\\Forms\\Components\\CodeEditor;
use Filament\\Forms\\Components\\CodeEditor\\Enums\\Language;

CodeEditor::make('code')
    ->language(Language::JavaScript)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>language()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>
