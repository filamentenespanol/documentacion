---
title: Componente Blade desplegable
---

## Introducción

El componente desplegable le permite representar un menú desplegable con un botón que lo activa:

```blade
<x-filament::dropdown>
    <x-slot name="trigger">
        <x-filament::button>
            More actions
        </x-filament::button>
    </x-slot>
    
    <x-filament::dropdown.list>
        <x-filament::dropdown.list.item wire:click="openViewModal">
            View
        </x-filament::dropdown.list.item>
        
        <x-filament::dropdown.list.item wire:click="openEditModal">
            Edit
        </x-filament::dropdown.list.item>
        
        <x-filament::dropdown.list.item wire:click="openDeleteModal">
            Delete
        </x-filament::dropdown.list.item>
    </x-filament::dropdown.list>
</x-filament::dropdown>
```

## Usar un elemento desplegable como enlace de anclaje

De forma predeterminada, la etiqueta HTML subyacente de un elemento desplegable es `<button>`. Puede cambiarlo para que sea una etiqueta `<a>` utilizando el atributo `tag`:

```blade
<x-filament::dropdown.list.item
    href="https://filamentphp.com"
    tag="a"
>
    Filament
</x-filament::dropdown.list.item>
```

## Cambiar el color de un elemento desplegable

De forma predeterminada, el color de un elemento desplegable es "gris". Puedes cambiarlo para que sea `danger`, `info`, `primary`, `success` o `warning` usando el atributo `color`:

```blade
<x-filament::dropdown.list.item color="danger">
    Edit
</x-filament::dropdown.list.item>

<x-filament::dropdown.list.item color="info">
    Edit
</x-filament::dropdown.list.item>

<x-filament::dropdown.list.item color="primary">
    Edit
</x-filament::dropdown.list.item>

<x-filament::dropdown.list.item color="success">
    Edit
</x-filament::dropdown.list.item>

<x-filament::dropdown.list.item color="warning">
    Edit
</x-filament::dropdown.list.item>
```

## Agregar un ícono a un elemento desplegable

Puede agregar un [icono](../styling/icons) a un elemento desplegable usando el atributo `icon`:

```blade
<x-filament::dropdown.list.item icon="heroicon-m-pencil">
    Edit
</x-filament::dropdown.list.item>
```

### Cambiar el color del icono de un elemento desplegable

De forma predeterminada, el color del icono utiliza el [mismo color que el elemento en sí] (#cambiar-el-color-de-un-elemento-desplegable). Puede anularlo para que sea `danger`, `info`, `primary`, `success` o `warning` usando el atributo `icon-color`:

```blade
<x-filament::dropdown.list.item icon="heroicon-m-pencil" icon-color="danger">
    Edit
</x-filament::dropdown.list.item>

<x-filament::dropdown.list.item icon="heroicon-m-pencil" icon-color="info">
    Edit
</x-filament::dropdown.list.item>

<x-filament::dropdown.list.item icon="heroicon-m-pencil" icon-color="primary">
    Edit
</x-filament::dropdown.list.item>

<x-filament::dropdown.list.item icon="heroicon-m-pencil" icon-color="success">
    Edit
</x-filament::dropdown.list.item>

<x-filament::dropdown.list.item icon="heroicon-m-pencil" icon-color="warning">
    Edit
</x-filament::dropdown.list.item>
```

## Agregar una imagen a un elemento desplegable

Puede agregar una imagen circular a un elemento desplegable utilizando el atributo `image`:

```blade
<x-filament::dropdown.list.item image="https://filamentphp.com/dan.jpg">
    Dan Harrin
</x-filament::dropdown.list.item>
```

## Agregar una insignia a un elemento desplegable

Puede representar una [insignia](insignia) encima de un elemento desplegable utilizando la ranura `badge`:

```blade
<x-filament::dropdown.list.item>
    Mark notifications as read
    
    <x-slot name="badge">
        3
    </x-slot>
</x-filament::dropdown.list.item>
```

Puedes [cambiar el color](badge#cambiando-el-color-de-la-badge) de la insignia usando el atributo `badge-color`:

```blade
<x-filament::dropdown.list.item badge-color="danger">
    Mark notifications as read
    
    <x-slot name="badge">
        3
    </x-slot>
</x-filament::dropdown.list.item>
```

## Establecer la ubicación de un menú desplegable

El menú desplegable se puede colocar en relación con el botón de activación utilizando el atributo `placement`:

```blade
<x-filament::dropdown placement="top-start">
    {{-- Dropdown items --}}
</x-filament::dropdown>
```

## Establecer el ancho de un menú desplegable

El menú desplegable se puede establecer en un ancho utilizando el atributo `width`. Las opciones corresponden a [escala de ancho máximo de Tailwind] (https://tailwindcss.com/docs/max-width). Las opciones son `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl` y `7xl`:

```blade
<x-filament::dropdown width="xs">
    {{-- Dropdown items --}}
</x-filament::dropdown>
```

## Controlar la altura máxima de un menú desplegable

El contenido del desplegable puede tener una altura máxima usando el atributo `max-height`, para que se desplace. Puede pasar una [longitud CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/length):

```blade
<x-filament::dropdown max-height="400px">
    {{-- Dropdown items --}}
</x-filament::dropdown>
```
