---
title: Componente Link Blade
---

## Introducción

El componente de enlace se utiliza para representar un enlace en el que se puede hacer clic y que puede realizar una acción:

```blade
<x-filament::link :href="route('users.create')">
    New user
</x-filament::link>
```

## Usar un enlace como botón

De forma predeterminada, la etiqueta HTML subyacente de un enlace es `<a>`. Puedes cambiarlo para que sea una etiqueta `<button>` usando el atributo `tag`:

```blade
<x-filament::link
    wire:click="openNewUserModal"
    tag="button"
>
    New user
</x-filament::link>
```

## Establecer el tamaño de un enlace

De forma predeterminada, el tamaño de un enlace es "medio". Puedes hacerlo "pequeño", "grande", "extra grande" o "extra extra grande" usando el atributo `size`:

```blade
<x-filament::link size="sm">
    New user
</x-filament::link>

<x-filament::link size="lg">
    New user
</x-filament::link>

<x-filament::link size="xl">
    New user
</x-filament::link>

<x-filament::link size="2xl">
    New user
</x-filament::link>
```

## Establecer el peso de fuente de un enlace

De forma predeterminada, el peso de fuente de los enlaces es `semibold`. Puedes hacerlo `thin`, `extralight`, `light`, `normal`, `medium`, `bold`, `extrabold` o `black` usando el atributo `weight`:

```blade
<x-filament::link weight="thin">
    New user
</x-filament::link>

<x-filament::link weight="extralight">
    New user
</x-filament::link>

<x-filament::link weight="light">
    New user
</x-filament::link>

<x-filament::link weight="normal">
    New user
</x-filament::link>

<x-filament::link weight="medium">
    New user
</x-filament::link>

<x-filament::link weight="semibold">
    New user
</x-filament::link>
   
<x-filament::link weight="bold">
    New user
</x-filament::link>

<x-filament::link weight="black">
    New user
</x-filament::link> 
```

Alternativamente, puedes pasar una clase CSS personalizada para definir el peso:

```blade
<x-filament::link weight="md:font-[650]">
    New user
</x-filament::link>
```

## Cambiar el color de un enlace

De forma predeterminada, el color de un enlace es "primario". Puedes cambiarlo para que sea `danger`, `gray`, `info`, `success` o `warning` usando el atributo `color`:

```blade
<x-filament::link color="danger">
    New user
</x-filament::link>

<x-filament::link color="gray">
    New user
</x-filament::link>

<x-filament::link color="info">
    New user
</x-filament::link>

<x-filament::link color="success">
    New user
</x-filament::link>

<x-filament::link color="warning">
    New user
</x-filament::link>
```

## Agregar un ícono a un enlace

Puede agregar un [icono](../styling/icons) a un enlace usando el atributo `icon`:

```blade
<x-filament::link icon="heroicon-m-sparkles">
    New user
</x-filament::link>
```

También puedes cambiar la posición del ícono para que esté después del texto en lugar de antes, usando el atributo `icon-position`:

```blade
<x-filament::link
    icon="heroicon-m-sparkles"
    icon-position="after"
>
    New user
</x-filament::link>
```

## Agregar información sobre herramientas a un enlace

Puede agregar información sobre herramientas a un enlace utilizando el atributo `tooltip`:

```blade
<x-filament::link tooltip="Register a user">
    New user
</x-filament::link>
```

## Agregar una insignia a un enlace

Puede representar una [insignia](insignia) encima de un enlace utilizando la ranura `badge`:

```blade
<x-filament::link>
    Mark notifications as read

    <x-slot name="badge">
        3
    </x-slot>
</x-filament::link>
```

Puedes [cambiar el color](badge#cambiando-el-color-de-la-badge) de la insignia usando el atributo `badge-color`:

```blade
<x-filament::link badge-color="danger">
    Mark notifications as read

    <x-slot name="badge">
        3
    </x-slot>
</x-filament::link>
```
