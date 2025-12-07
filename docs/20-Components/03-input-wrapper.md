---
title: Componente Blade contenedor de entrada
---

## Introducción

El componente contenedor de entrada debe usarse como contenedor alrededor de los componentes [input](entrada) o [select](select). Proporciona un borde y otros elementos como un prefijo o sufijo.

```blade
<x-filament::input.wrapper>
    <x-filament::input
        type="text"
        wire:model="name"
    />
</x-filament::input.wrapper>

<x-filament::input.wrapper>
    <x-filament::input.select wire:model="status">
        <option value="draft">Draft</option>
        <option value="reviewing">Reviewing</option>
        <option value="published">Published</option>
    </x-filament::input.select>
</x-filament::input.wrapper>
```

## Activar el estado de error de la entrada

El componente tiene un estilo especial que puede utilizar si no es válido. Para activar este estilo, puede utilizar Blade o Alpine.js.

Para activar el estado de error usando Blade, puede pasar el atributo `valid` al componente, que contiene verdadero o falso según si la entrada es válida o no:

```blade
<x-filament::input.wrapper :valid="! $errors->has('name')">
    <x-filament::input
        type="text"
        wire:model="name"
    />
</x-filament::input.wrapper>
```

Alternativamente, puede usar una expresión Alpine.js para activar el estado de error, según si se evalúa como `true` o `false`:

```blade
### Usar iconos como afijos

Puede colocar un [icono](../styling/icons) antes y después de la entrada usando los atributos `prefix-icon` y ​​`suffix-icon`:

```blade
<x-filament::input.wrapper suffix-icon="heroicon-m-globe-alt">
    <x-filament::input
        type="url"
        wire:model="domain"
    />
</x-filament::input.wrapper>
```

#### Configurar el color del icono del afijo

Los iconos de afijos son grises de forma predeterminada, pero puede establecer un color diferente usando los atributos `prefix-icon-color` y ​​`affix-icon-color`:

```blade
<x-filament::input.wrapper
    suffix-icon="heroicon-m-check-circle"
    suffix-icon-color="success"
>
    <x-filament::input
        type="url"
        wire:model="domain"
    />
</x-filament::input.wrapper>
```
