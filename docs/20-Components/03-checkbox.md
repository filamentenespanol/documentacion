---
title: Componente Blade de casilla de verificación
---

## Introducción

Puede usar el componente de casilla de verificación para representar una entrada de casilla de verificación que se puede usar para alternar un valor booleano:

```blade
<label>
    <x-filament::input.checkbox wire:model="isAdmin" />

    <span>
        Is Admin
    </span>
</label>
```

## Activando el estado de error de la casilla de verificación

La casilla de verificación tiene un estilo especial que puede usar si no es válida. Para activar este estilo, puede utilizar Blade o Alpine.js.

Para activar el estado de error usando Blade, puede pasar el atributo `valid` al componente, que contiene verdadero o falso según si la casilla de verificación es válida o no:

```blade
<x-filament::input.checkbox
    wire:model="isAdmin"
    :valid="! $errors->has('isAdmin')"
/>
```

Alternativamente, puede usar una expresión Alpine.js para activar el estado de error, según si se evalúa como `true` o `false`:

```blade

