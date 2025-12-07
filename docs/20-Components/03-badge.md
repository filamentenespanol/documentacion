---
title: Componente Badge Blade
---

## Introducción

El componente de insignia se utiliza para representar un pequeño cuadro con algo de texto dentro:

```blade
<x-filament::badge>
    New
</x-filament::badge>
```

## Establecer el tamaño de una insignia

De forma predeterminada, el tamaño de una insignia es "mediano". Puedes hacerlo "extra pequeño" o "pequeño" usando el atributo `size`:

```blade
<x-filament::badge size="xs">
    New
</x-filament::badge>

<x-filament::badge size="sm">
    New
</x-filament::badge>
```

## Cambiando el color de la insignia

De forma predeterminada, el color de una insignia es "primario". Puedes cambiarlo para que sea `danger`, `gray`, `info`, `success` o `warning` usando el atributo `color`:

```blade
<x-filament::badge color="danger">
    New
</x-filament::badge>

<x-filament::badge color="gray">
    New
</x-filament::badge>

<x-filament::badge color="info">
    New
</x-filament::badge>

<x-filament::badge color="success">
    New
</x-filament::badge>

<x-filament::badge color="warning">
    New
</x-filament::badge>
```

## Agregar un ícono a una insignia

Puede agregar un [icono](../estilo/iconos) a una insignia usando el atributo `icon`:

```blade
<x-filament::badge icon="heroicon-m-sparkles">
    New
</x-filament::badge>
```

También puedes cambiar la posición del ícono para que esté después del texto en lugar de antes, usando el atributo `icon-position`:

```blade
<x-filament::badge
    icon="heroicon-m-sparkles"
    icon-position="after"
>
    New
</x-filament::badge>
```
