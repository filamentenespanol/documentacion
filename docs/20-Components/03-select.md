---
title: Seleccionar componente Blade
---

## Introducción

El componente de selección es un contenedor alrededor del elemento nativo `<select>`. Proporciona una interfaz sencilla para seleccionar un valor único de una lista de opciones:

```blade
<x-filament::input.wrapper>
    <x-filament::input.select wire:model="status">
        <option value="draft">Draft</option>
        <option value="reviewing">Reviewing</option>
        <option value="published">Published</option>
    </x-filament::input.select>
</x-filament::input.wrapper>
```

Para utilizar el componente de selección, debe envolverlo en un componente "contenedor de entrada", que proporciona un borde y otros elementos como un prefijo o sufijo. Puede obtener más información sobre cómo personalizar el componente contenedor de entrada [aquí] (input-wrapper).
