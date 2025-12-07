---
title: Componente modal Blade
---

## Introducción

El componente modal puede abrir una ventana de diálogo o deslizarse con cualquier contenido:

```blade
<x-filament::modal>
    <x-slot name="trigger">
        <x-filament::button>
            Open modal
        </x-filament::button>
    </x-slot>

    {{-- Modal content --}}
</x-filament::modal>
```

## Controlando un modal desde JavaScript

Puede usar la ranura `trigger` para representar un botón que abre el modal. Sin embargo, esto no es necesario. Tienes control total sobre cuándo se abre y cierra el modal a través de JavaScript. Primero, dale al modal un ID para que puedas hacer referencia a él:

```blade
<x-filament::modal id="edit-user">
    {{-- Modal content --}}
</x-filament::modal>
```

Ahora, puede enviar un evento de navegador `open-modal` o `close-modal`, pasando el ID del modal, que abrirá o cerrará el modal. Por ejemplo, desde un componente Livewire:

```php
$this->dispatch('open-modal', id: 'edit-user');
```

O desde Alpine.js:

```php
$dispatch('open-modal', { id: 'edit-user' })
```

## Agregar un encabezado a un modal

Puedes agregar un encabezado a un modal usando el espacio `heading`:

```blade
<x-filament::modal>
    <x-slot name="heading">
        Modal heading
    </x-slot>

    {{-- Modal content --}}
</x-filament::modal>
```

## Agregar una descripción a un modal

Puede agregar una descripción, debajo del encabezado, a un modal usando el espacio `description`:

```blade
<x-filament::modal>
    <x-slot name="heading">
        Modal heading
    </x-slot>

    <x-slot name="description">
        Modal description
    </x-slot>

    {{-- Modal content --}}
</x-filament::modal>
```

## Agregar un ícono a un modal

Puedes agregar un [icono](../styling/icons) a un modal usando el atributo `icon`:

```blade
<x-filament::modal icon="heroicon-o-information-circle">
    <x-slot name="heading">
        Modal heading
    </x-slot>

    {{-- Modal content --}}
</x-filament::modal>
```

De forma predeterminada, el color de un icono es "primario". Puedes cambiarlo para que sea `danger`, `gray`, `info`, `success` o `warning` usando el atributo `icon-color`:

```blade
<x-filament::modal
    icon="heroicon-o-exclamation-triangle"
    icon-color="danger"
>
    <x-slot name="heading">
        Modal heading
    </x-slot>

    {{-- Modal content --}}
</x-filament::modal>
```

## Agregar un pie de página a un modal

Puede agregar un pie de página a un modal usando la ranura `footer`:

```blade
<x-filament::modal>
    {{-- Modal content --}}
    
    <x-slot name="footer">
        {{-- Modal footer content --}}
    </x-slot>
</x-filament::modal>
```

Alternativamente, puede agregar acciones en el pie de página usando la ranura `footerActions`:

```blade
<x-filament::modal>
    {{-- Modal content --}}
    
    <x-slot name="footerActions">
        {{-- Modal footer actions --}}
    </x-slot>
</x-filament::modal>
```

## Cambiando la alineación del modal

De forma predeterminada, el contenido modal se alineará al inicio o se centrará si el modal es `xs` o `sm` en [ancho](#cambiando-el-ancho-modal). Si desea cambiar la alineación del contenido en un modal, puede usar el atributo `alignment` y ​​pasarlo `start` o `center`:

```blade
<x-filament::modal alignment="center">
    {{-- Modal content --}}
</x-filament::modal>
```

## Usando un control deslizante en lugar de un modal

Puede abrir un cuadro de diálogo "deslizable" en lugar de un modal utilizando el atributo `slide-over`:

```blade
<x-filament::modal slide-over>
    {{-- Slide-over content --}}
</x-filament::modal>
```

## Hacer que el encabezado modal sea adhesivo

El encabezado de un modal desaparece de la vista con el contenido modal cuando desborda el tamaño del modal. Sin embargo, las diapositivas tienen un modal adhesivo que siempre está visible. Puedes controlar este comportamiento usando el atributo `sticky-header`:

```blade
<x-filament::modal sticky-header>
    <x-slot name="heading">
        Modal heading
    </x-slot>

    {{-- Modal content --}}
</x-filament::modal>
```

## Hacer que el pie de página modal sea adhesivo

El pie de página de un modal se muestra en línea después del contenido de forma predeterminada. Las diapositivas, sin embargo, tienen un pie de página adhesivo que siempre se muestra al desplazarse por el contenido. También puedes habilitar esto para un modal usando el atributo `sticky-footer`:

```blade
<x-filament::modal sticky-footer>
    {{-- Modal content --}}
    
    <x-slot name="footer">
        {{-- Modal footer content --}}
    </x-slot>
</x-filament::modal>
```

## Cambiando el ancho modal

Puede cambiar el ancho del modal usando el atributo `width`. Las opciones corresponden a [escala de ancho máximo de Tailwind] (https://tailwindcss.com/docs/max-width). Las opciones son `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl` y `screen`:

```blade
<x-filament::modal width="5xl">
    {{-- Modal content --}}
</x-filament::modal>
```

## Cerrando el modal haciendo clic fuera

De forma predeterminada, cuando haces clic fuera de un modal, se cerrará solo. Si deseas deshabilitar este comportamiento para una acción específica, puedes usar el atributo `close-by-clicking-away`:

```blade
<x-filament::modal :close-by-clicking-away="false">
    {{-- Modal content --}}
</x-filament::modal>
```

## Cerrando el modal escapando

De forma predeterminada, cuando presionas escape en un modal, se cerrará solo. Si deseas deshabilitar este comportamiento para una acción específica, puedes usar el atributo `close-by-escaping`:

```blade
<x-filament::modal :close-by-escaping="false">
    {{-- Modal content --}}
</x-filament::modal>
```

## Ocultar el botón de cierre modal

De forma predeterminada, los modales con encabezado tienen un botón de cierre en la esquina superior derecha. Puede eliminar el botón de cerrar del modal usando el atributo `close-button`:

```blade
<x-filament::modal :close-button="false">
    <x-slot name="heading">
        Modal heading
    </x-slot>

    {{-- Modal content --}}
</x-filament::modal>
```

## Evitar que el modal se enfoque automáticamente

De forma predeterminada, los modales se enfocarán automáticamente en el primer elemento enfocable cuando se abran. Si desea desactivar este comportamiento, puede utilizar el atributo `autofocus`:

```blade
<x-filament::modal :autofocus="false">
    {{-- Modal content --}}
</x-filament::modal>
```

## Deshabilitar el botón de activación modal

De forma predeterminada, el botón de activación abrirá el modal incluso si está deshabilitado, ya que el detector de eventos de clic está registrado en un elemento envolvente del propio botón. Si desea evitar que se abra el modal, también debe usar el atributo `disabled` en la ranura del disparador:

```blade
<x-filament::modal>
    <x-slot name="trigger" disabled>
        <x-filament::button :disabled="true">
            Open modal
        </x-filament::button>
    </x-slot>
    {{-- Modal content --}}
</x-filament::modal>
```

