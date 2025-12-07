---
title: Representación de notificaciones fuera de un panel
---

:::warning
    Antes de continuar, asegúrese de que `filament/notifications` esté instalado en su proyecto. Puedes comprobarlo ejecutando:

```bash
    composer show filament/notifications
    ```
    Si no está instalado, consulte la [guía de instalación](../introduction/installation#installing-the-individual-components) y configure los **componentes individuales** según las instrucciones.
:::
## Introducción

Para representar notificaciones en su aplicación, asegúrese de que el componente `notifications` Livewire esté representado en su diseño:

```blade
<div>
    @livewire('notifications')
</div>
```

Ahora, al [enviar una notificación](../notificaciones) desde una solicitud de Livewire, aparecerá para el usuario.
