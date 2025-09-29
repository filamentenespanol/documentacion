---
title: Descripción general
---

## Introducción

Los *schemas* forman la base del enfoque de UI dirigida por el servidor (*Server-Driven UI*) de Filament. Te permiten construir interfaces de usuario de forma declarativa usando objetos de configuración en PHP. Estos objetos representan componentes que definen la estructura y el comportamiento de tu UI, como formularios, tablas o listas. En lugar de escribir HTML o JavaScript manualmente, creas estos *schemas* para controlar qué se renderiza en el servidor, simplificando el desarrollo y garantizando consistencia en toda tu aplicación.

Los *schemas* se utilizan ampliamente en Filament para renderizar elementos dinámicos de la UI. Ya sea que estés definiendo un campo de formulario, el layout de tu página o un botón de acción, el objeto schema define tanto la configuración del componente como su interacción con tus datos. En esencia, los *schemas* son los bloques constructivos de las UIs de Filament.

Los paquetes de Filament te proporcionan varios componentes. Puedes ver la lista completa en la sección de [componentes disponibles](#componentes-disponibles):

- [Campos de formulario](../forms) aceptan entrada del usuario, por ejemplo: texto, select o checkbox. Vienen con validación integrada.
- [Entradas de infolist](../infolists) son componentes para renderizar listas de descripciones. Muestran pares clave-valor, ya sea texto, íconos o imágenes. Los datos generalmente provienen de un registro Eloquent.
- [Componentes de layout](layouts) estructuran otros componentes, por ejemplo: `grid`, `tabs` o asistentes (*wizards*).
- [Componentes prime](primes) son básicos para mostrar contenido estático: texto, imágenes o botones (acciones).

Un schema actúa como contenedor de muchos componentes, y puede anidar infinitamente otros schemas.

Un schema está representado por un objeto `Filament\Schemas\Schema` al que puedes pasarle los componentes usando el método `components()`.

## Componentes disponibles

**Formularios**:

- [Text input](../forms/text-input)  
- [Select](../forms/select)  
- [Checkbox](../forms/checkbox)  
- [Toggle](../forms/toggle)  
- [Checkbox list](../forms/checkbox-list)  
- [Radio](../forms/radio)  
- [Date-time picker](../forms/date-time-picker)  
- [File upload](../forms/file-upload)  
- [Rich editor](../forms/rich-editor)  
- [Markdown editor](../forms/markdown-editor)  
- [Repeater](../forms/repeater)  
- [Builder](../forms/builder)  
- [Tags input](../forms/tags-input)  
- [Textarea](../forms/textarea)  
- [Key-value](../forms/key-value)  
- [Color picker](../forms/color-picker)  
- [Toggle buttons](../forms/toggle-buttons)  
- [Slider](../forms/slider)  
- [Code editor](../forms/code-editor)  
- [Hidden](../forms/hidden)  
- O crea tu propio [campo de formulario personalizado](../forms/custom-fields).  

**Infolists**:

- [Text entry](../infolists/text-entry)  
- [Icon entry](../infolists/icon-entry)  
- [Image entry](../infolists/image-entry)  
- [Color entry](../infolists/color-entry)  
- [Code entry](../infolists/code-entry)  
- [Key-value entry](../infolists/key-value-entry)  
- [Repeatable entry](../infolists/repeatable-entry)  
- O tu propia [entrada personalizada](../infolists/custom-entries).  

**Layouts**:

- [Grid](layouts#grid-component)  
- [Flex](layouts#flex-component)  
- [Fieldset](layouts#fieldset-component)  
- [Section](sections)  
- [Tabs](tabs)  
- [Wizard](wizards)  
- O tu [componente de layout personalizado](custom-components#custom-layout-components).  

**Primes**:

- [Text](primes#text-component)  
- [Icon](primes#icon-component)  
- [Image](primes#image-component)  
- [Unordered list](primes#unordered-list-component)  

También se pueden insertar botones de acción (*actions*) para ejecutar funciones de PHP o abrir modales. Más información en la [documentación de acciones](../actions).

## Ejemplo de schema

```php
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;

$schema
    ->components([
        Grid::make(2)
            ->schema([
                Section::make('Detalles')
                    ->schema([
                        TextInput::make('name'),
                        Select::make('position')
                            ->options([
                                'developer' => 'Desarrollador',
                                'designer' => 'Diseñador',
                            ]),
                        Checkbox::make('is_admin'),
                    ]),
                Section::make('Auditoría')
                    ->schema([
                        TextEntry::make('created_at')->dateTime(),
                        TextEntry::make('updated_at')->dateTime(),
                    ]),
            ]),
    ])
```

[Grid](layouts#grid-component) renderiza varios componentes en columnas responsivas.  
[Section](sections) agrupa componentes en una tarjeta con encabezado.  
[TextInput](../forms/text-input), [Select](../forms/select) y [Checkbox](../forms/checkbox) aceptan input del usuario.  
[TextEntry](../infolists/text-entry) muestra valores de solo lectura como timestamps.

## Inyección de utilidades en componentes

Los métodos de configuración aceptan funciones, lo que permite gran flexibilidad. Además, Filament puede inyectar *utilities* como parámetros en estas funciones.

### Inyectar el estado de otro componente

```php
use Filament\Schemas\Components\Utilities\Get;

function (Get $get) {
    $email = $get('email');
}
```

:::tip
A menos que un campo sea [reactivo](../forms/overview#the-basics-of-reactivity), el schema no se refrescará al cambiar valor, solo con la siguiente interacción que haga request al servidor. Si necesitas escuchar cambios inmediatos, usa `live()`.
:::

### Inyectar el registro Eloquent actual

```php
use Illuminate\Database\Eloquent\Model;

function (?Model $record) {
    // ...
}
```

### Inyectar la operación actual

```php
function (string $operation) {
    // ...
}
```

:::info
Puedes establecer la operación manualmente usando `$schema->operation()`.
:::

### Inyectar instancia de Livewire

```php
use Livewire\Component;

function (Component $livewire) {
    // ...
}
```

### Inyectar instancia de componente

```php
use Filament\Schemas\Components\Component;

function (Component $component) {
    // ...
}
```

### Inyectar múltiples utilidades

```php
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Livewire\Component as Livewire;

function (Livewire $livewire, Get $get, Set $set) {
    // ...
}
```

### Inyectar dependencias del container de Laravel

```php
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Http\Request;

function (Request $request, Set $set) {
    // ...
}
```

## Configuración global

Puedes modificar el comportamiento global de un componente usando `configureUsing()` dentro del método `boot()` de un service provider. Por ejemplo, hacer que todas las secciones tengan 2 columnas por defecto:

```php
use Filament\Schemas\Components\Section;

Section::configureUsing(function (Section $section): void {
    $section->columns(2);
});
```

Esto puede sobrescribirse individualmente en cada componente:

```php
Section::make()->columns(1)
```
