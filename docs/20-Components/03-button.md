---
title: Componente de hoja de botón
---

## Introducción

El componente de botón se utiliza para representar un botón en el que se puede hacer clic y que puede realizar una acción:

```blade
<x-filament::button wire:click="openNewUserModal">
    New user
</x-filament::button>
```

## Usar un botón como enlace de anclaje

De forma predeterminada, la etiqueta HTML subyacente de un botón es `<button>`. Puede cambiarlo para que sea una etiqueta `<a>` utilizando el atributo `tag`:

```blade
<x-filament::button
    href="https://filamentphp.com"
    tag="a"
>
    Filament
</x-filament::button>
```

## Establecer el tamaño de un botón

De forma predeterminada, el tamaño de un botón es "medio". Puedes hacerlo "extra pequeño", "pequeño", "grande" o "extra grande" usando el atributo `size`:

```blade
<x-filament::button size="xs">
    New user
</x-filament::button>

<x-filament::button size="sm">
    New user
</x-filament::button>

<x-filament::button size="lg">
    New user
</x-filament::button>

<x-filament::button size="xl">
    New user
</x-filament::button>
```

## Cambiar el color de un botón

De forma predeterminada, el color de un botón es "primario". Puedes cambiarlo para que sea `danger`, `gray`, `info`, `success` o `warning` usando el atributo `color`:

```blade
<x-filament::button color="danger">
    New user
</x-filament::button>

<x-filament::button color="gray">
    New user
</x-filament::button>

<x-filament::button color="info">
    New user
</x-filament::button>

<x-filament::button color="success">
    New user
</x-filament::button>

<x-filament::button color="warning">
    New user
</x-filament::button>
```

## Agregar un ícono a un botón

Puede agregar un [icono](../styling/icons) a un botón usando el atributo `icon`:

```blade
<x-filament::button icon="heroicon-m-sparkles">
    New user
</x-filament::button>
```

También puedes cambiar la posición del ícono para que esté después del texto en lugar de antes, usando el atributo `icon-position`:

```blade
<x-filament::button
    icon="heroicon-m-sparkles"
    icon-position="after"
>
    New user
</x-filament::button>
```

## Hacer un botón delineado

Puedes hacer que un botón use un diseño "delineado" usando el atributo `outlined`:

```blade
<x-filament::button outlined>
    New user
</x-filament::button>
```

## Agregar información sobre herramientas a un botón

Puede agregar información sobre herramientas a un botón utilizando el atributo `tooltip`:

```blade
<x-filament::button tooltip="Register a user">
    New user
</x-filament::button>
```

## Agregar una insignia a un botón

Puedes renderizar una [insignia](insignia) encima de un botón usando la ranura `badge`:

```blade
<x-filament::button>
    Mark notifications as read
    
    <x-slot name="badge">
        3
    </x-slot>
</x-filament::button>
```

Puedes [cambiar el color](badge#cambiando-el-color-de-la-badge) de la insignia usando el atributo `badge-color`:

```blade
<x-filament::button badge-color="danger">
    Mark notifications as read
    
    <x-slot name="badge">
        3
    </x-slot>
</x-filament::button>
```
