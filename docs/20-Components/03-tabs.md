---
title: Componente Tabs Blade
---

## Introducción

El componente de pestañas le permite representar un conjunto de pestañas, que se pueden usar para alternar entre varias secciones de contenido:

```blade
<x-filament::tabs label="Content tabs">
    <x-filament::tabs.item>
        Tab 1
    </x-filament::tabs.item>

    <x-filament::tabs.item>
        Tab 2
    </x-filament::tabs.item>

    <x-filament::tabs.item>
        Tab 3
    </x-filament::tabs.item>
</x-filament::tabs>
```

## Activar el estado activo de la pestaña

De forma predeterminada, las pestañas no aparecen "activas". Para que una pestaña aparezca activa, puedes utilizar el atributo `active`:

```blade
<x-filament::tabs>
    <x-filament::tabs.item active>
        Tab 1
    </x-filament::tabs.item>

    {{-- Other tabs --}}
</x-filament::tabs>
```

También puedes usar el atributo `active` para hacer que una pestaña aparezca activa condicionalmente:

```blade
<x-filament::tabs>
    <x-filament::tabs.item
        :active="$activeTab === 'tab1'"
        wire:click="$set('activeTab', 'tab1')"
    >
        Tab 1
    </x-filament::tabs.item>

    {{-- Other tabs --}}
</x-filament::tabs>
```

O puede usar el atributo `alpine-active` para hacer que una pestaña aparezca activa condicionalmente usando Alpine.js:

```blade
<x-filament::tabs>
    <x-filament::tabs.item
        alpine-active="activeTab === 'tab1'"
        x-on:click="activeTab = 'tab1'"
    >
        Tab 1
    </x-filament::tabs.item>

    {{-- Other tabs --}}
</x-filament::tabs>
```

## Configurar un icono de pestaña

Las pestañas pueden tener un [icono](../styling/icons), que puedes configurar usando el atributo `icon`:

```blade
<x-filament::tabs>
    <x-filament::tabs.item icon="heroicon-m-bell">
        Notifications
    </x-filament::tabs.item>

    {{-- Other tabs --}}
</x-filament::tabs>
```

### Configuración de la posición del icono de pestaña

El icono de la pestaña se puede posicionar antes o después de la etiqueta usando el atributo `icon-position`:

```blade
<x-filament::tabs>
    <x-filament::tabs.item
        icon="heroicon-m-bell"
        icon-position="after"
    >
        Notifications
    </x-filament::tabs.item>

    {{-- Other tabs --}}
</x-filament::tabs>
```

## Establecer una insignia de pestaña

Las pestañas pueden tener una [insignia](insignia), que puedes configurar usando la ranura `badge`:

```blade
<x-filament::tabs>
    <x-filament::tabs.item>
        Notifications

        <x-slot name="badge">
            5
        </x-slot>
    </x-filament::tabs.item>

    {{-- Other tabs --}}
</x-filament::tabs>
```

## Usar una pestaña como enlace de anclaje

De forma predeterminada, la etiqueta HTML subyacente de una pestaña es `<button>`. Puede cambiarlo para que sea una etiqueta `<a>` usando el atributo `tag`:

```blade
<x-filament::tabs>
    <x-filament::tabs.item
        :href="route('notifications')"
        tag="a"
    >
        Notifications
    </x-filament::tabs.item>

    {{-- Other tabs --}}
</x-filament::tabs>
```

## Usando pestañas verticales

Puedes renderizar las pestañas verticalmente usando el atributo `vertical`:

```blade
<x-filament::tabs vertical>
    <x-filament::tabs.item>
        Tab 1
    </x-filament::tabs.item>

    <x-filament::tabs.item>
        Tab 2
    </x-filament::tabs.item>

    <x-filament::tabs.item>
        Tab 3
    </x-filament::tabs.item>
</x-filament::tabs>
```
