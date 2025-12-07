---
title: Componente Fieldset Blade
---

## Introducción

Puede utilizar un conjunto de campos para agrupar varios campos de formulario, opcionalmente con una etiqueta:

```blade
<x-filament::fieldset>
    <x-slot name="label">
        Address
    </x-slot>
    
    {{-- Form fields --}}
</x-filament::fieldset>
```
