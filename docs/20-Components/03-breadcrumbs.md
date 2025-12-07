---
title: Componente Breadcrumbs Blade
---

## Introducción

El componente de ruta de navegación se utiliza para representar una navegación lineal simple que informa al usuario de su ubicación actual dentro de la aplicación:

```blade
<x-filament::breadcrumbs :breadcrumbs="[
    '/' => 'Home',
    '/dashboard' => 'Dashboard',
    '/dashboard/users' => 'Users',
    '/dashboard/users/create' => 'Create User',
]" />
```

Las claves de la matriz son URL en las que el usuario puede hacer clic para navegar, y los valores son el texto que se mostrará para cada enlace.
