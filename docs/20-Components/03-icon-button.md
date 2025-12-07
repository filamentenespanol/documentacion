---
title: Botón de icono Componente de hoja
---

## Introducción

El componente de botón se utiliza para representar un botón en el que se puede hacer clic y que puede realizar una acción:

```blade
<x-filament::icon-button
    icon="heroicon-m-plus"
    wire:click="openNewUserModal"
    label="New label"
/>
```

## Usar un botón de icono como enlace de anclaje

De forma predeterminada, la etiqueta HTML subyacente de un botón de icono es `<button>`. Puedes cambiarlo para que sea una etiqueta `<a>` usando el atributo `tag`:

```blade
<x-filament::icon-button
    icon="heroicon-m-arrow-top-right-on-square"
    href="https://filamentphp.com"
    tag="a"
    label="Filament"
/>
```

## Configurar el tamaño de un botón de icono

De forma predeterminada, el tamaño de un botón de icono es "medio". Puedes hacerlo "extra pequeño", "pequeño", "grande" o "extra grande" usando el atributo `size`:

```blade
<x-filament::icon-button
    icon="heroicon-m-plus"
    size="xs"
    label="New label"
/>

<x-filament::icon-button
    icon="heroicon-m-plus"
    size="sm"
    label="New label"
/>

<x-filament::icon-button
    icon="heroicon-s-plus"
    size="lg"
    label="New label"
/>

<x-filament::icon-button
    icon="heroicon-s-plus"
    size="xl"
    label="New label"
/>
```

## Cambiar el color de un botón de icono

De forma predeterminada, el color de un botón de icono es "primario". Puedes cambiarlo para que sea `danger`, `gray`, `info`, `success` o `warning` usando el atributo `color`:

```blade
<x-filament::icon-button
    icon="heroicon-m-plus"
    color="danger"
    label="New label"
/>

<x-filament::icon-button
    icon="heroicon-m-plus"
    color="gray"
    label="New label"
/>

<x-filament::icon-button
    icon="heroicon-m-plus"
    color="info"
    label="New label"
/>

<x-filament::icon-button
    icon="heroicon-m-plus"
    color="success"
    label="New label"
/>

<x-filament::icon-button
    icon="heroicon-m-plus"
    color="warning"
    label="New label"
/>
```

## Agregar información sobre herramientas a un botón de icono

Puede agregar información sobre herramientas a un botón de icono utilizando el atributo `tooltip`:

```blade
<x-filament::icon-button
    icon="heroicon-m-plus"
    tooltip="Register a user"
    label="New label"
/>
```

## Agregar una insignia a un botón de icono

Puede representar una [insignia](insignia) encima de un botón de icono usando la ranura `badge`:

```blade
<x-filament::icon-button
    icon="heroicon-m-x-mark"
    label="Mark notifications as read"
>
    <x-slot name="badge">
        3
    </x-slot>
</x-filament::icon-button>
```

Puedes [cambiar el color](badge#cambiando-el-color-de-la-badge) de la insignia usando el atributo `badge-color`:

```blade
<x-filament::icon-button
    icon="heroicon-m-x-mark"
    label="Mark notifications as read"
    badge-color="danger"
>
    <x-slot name="badge">
        3
    </x-slot>
</x-filament::icon-button>
```
