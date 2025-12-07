---
title: Componente Avatar Blade
---

## Introducción

El componente avatar se utiliza para representar una imagen circular o cuadrada, a menudo utilizada para representar a un usuario o entidad como su "imagen de perfil":

```blade
<x-filament::avatar
    src="https://filamentphp.com/dan.jpg"
    alt="Dan Harrin"
/>
```

## Configurar el redondeo de un avatar

Los avatares están completamente redondeados de forma predeterminada, pero puedes hacerlos cuadrados configurando el atributo `circular` en `false`:

```blade
<x-filament::avatar
    src="https://filamentphp.com/dan.jpg"
    alt="Dan Harrin"
    :circular="false"
/>
```

## Configurar el tamaño de un avatar

Por defecto, el avatar será de tamaño "mediano". Puede establecer el tamaño en `sm`, `md` o `lg` usando el atributo `size`:

```blade
<x-filament::avatar
    src="https://filamentphp.com/dan.jpg"
    alt="Dan Harrin"
    size="lg"
/>
```

También puede pasar sus propias clases de tamaño personalizadas al atributo `size`:

```cuchilla
<filamento x::avatar
    src="https://filamentphp.com/dan.jpg"
    alt="Dan Harrin"
    tamaño = "w-12 h-12"
/>
