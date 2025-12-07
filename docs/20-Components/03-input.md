---
title: Componente Blade de entrada
---

## Introducción

El componente de entrada es un contenedor alrededor del elemento nativo `<input>`. Proporciona una interfaz sencilla para ingresar una sola línea de texto.

```blade
<x-filament::input.wrapper>
    <x-filament::input
        type="text"
        wire:model="name"
    />
</x-filament::input.wrapper>
```

Para utilizar el componente de entrada, debe envolverlo en un componente "contenedor de entrada", que proporciona un borde y otros elementos como un prefijo o sufijo. Puede obtener más información sobre cómo personalizar el componente contenedor de entrada [aquí] (input-wrapper).
