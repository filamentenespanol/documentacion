---
title: Componente de la hoja de sección
---

## Introducción

Se puede utilizar una sección para agrupar contenido, con un título opcional:

```blade
<x-filament::section>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

## Agregar una descripción a la sección

Puede agregar una descripción debajo del encabezado de la sección usando el espacio `description`:

```blade
<x-filament::section>
    <x-slot name="heading">
        User details
    </x-slot>

    <x-slot name="description">
        This is all the information we hold about the user.
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

## Agregar un ícono al encabezado de la sección

Puede agregar un [icono](../styling/icons) a una sección usando el atributo `icon`:

```blade
<x-filament::section icon="heroicon-o-user">
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

### Cambiando el color del icono de la sección

De forma predeterminada, el color del icono de la sección es "gris". Puedes cambiarlo para que sea `danger`, `info`, `primary`, `success` o `warning` usando el atributo `icon-color`:

```blade
<x-filament::section
    icon="heroicon-o-user"
    icon-color="info"
>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

### Cambiar el tamaño del icono de la sección

De forma predeterminada, el tamaño del icono de la sección es "grande". Puedes cambiarlo para que sea "pequeño" o "mediano" usando el atributo `icon-size`:

```blade
<x-filament::section
    icon="heroicon-m-user"
    icon-size="sm"
>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>

<x-filament::section
    icon="heroicon-m-user"
    icon-size="md"
>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

## Agregar contenido al final del encabezado

Puede mostrar contenido adicional al final del encabezado, junto al encabezado y la descripción, utilizando el espacio `afterHeader`:

```blade
<x-filament::section>
    <x-slot name="heading">
        User details
    </x-slot>

    <x-slot name="afterHeader">
        {{-- Input to select the user's ID --}}
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

## Hacer que una sección sea plegable

Puedes hacer que el contenido de una sección sea plegable usando el atributo `collapsible`:

```blade
<x-filament::section collapsible>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

### Hacer que una sección se contraiga de forma predeterminada

Puede contraer una sección de forma predeterminada utilizando el atributo `collapsed`:

```blade
<x-filament::section
    collapsible
    collapsed
>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

### Secciones colapsadas persistentes

Puede persistir si una sección está contraída en el almacenamiento local utilizando el atributo `persist-collapsed`, por lo que permanecerá contraída cuando el usuario actualice la página. También necesitará un atributo único `id` para identificar la sección de otras, de modo que cada sección pueda conservar su propio estado de colapso:

```blade
<x-filament::section
    collapsible
    collapsed
    persist-collapsed
    id="user-details"
>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

## Agregar el encabezado de la sección a un lado del contenido en lugar de encima

Puede cambiar la posición del encabezado de la sección para que esté al lado del contenido en lugar de encima de él usando el atributo `aside`:

```blade
<x-filament::section aside>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```

### Colocar el contenido antes del encabezado

Puede cambiar la posición del contenido para que esté antes del encabezado en lugar de después usando el atributo `content-before`:

```blade
<x-filament::section
    aside
    content-before
>
    <x-slot name="heading">
        User details
    </x-slot>

    {{-- Content --}}
</x-filament::section>
```
