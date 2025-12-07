---
title: Representar un widget en una vista Blade
---

:::warning
    Antes de continuar, asegúrese de que `filament/widgets` esté instalado en su proyecto. Puedes comprobarlo ejecutando:

```bash
    composer show filament/widgets
    ```
    Si no está instalado, consulte la [guía de instalación](../introduction/installation#installing-the-individual-components) y configure los **componentes individuales** según las instrucciones.
:::

## Creando un widget

Utilice el comando `make:filament-widget` para generar un nuevo widget. Para obtener detalles sobre la personalización y el uso, consulte la [sección de widgets](../widgets).

## Agregar el widget

Dado que los widgets son componentes Livewire, puedes renderizar fácilmente un widget en cualquier vista Blade usando la directiva `@livewire`:

```blade
<div>
    @livewire(\App\Livewire\Dashboard\PostsChart::class)
</div>
```

:::info
    Si está utilizando un [widget de tabla] (../widgets/overview#table-widgets), asegúrese de instalar `filament/tables` también.  
    Consulte la [guía de instalación](../introduction/installation#installing-the-individual-components) y siga los pasos para configurar los **componentes individuales** correctamente.
:::
