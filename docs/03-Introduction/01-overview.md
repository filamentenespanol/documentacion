---
title: ¿Qué es Filament?
contents: false
---

## Introducción

**Filament es un framework de Server-Driven UI (SDUI) para Laravel.** Te permite definir interfaces de usuario completamente en PHP usando objetos de configuración estructurados, en lugar de plantillas tradicionales. Construido sobre Livewire, Alpine.js y Tailwind CSS, Filament te permite crear interfaces completas como paneles de administración, dashboards y aplicaciones basadas en formularios, todo sin escribir JavaScript personalizado ni código de frontend.

### ¿Qué es Server-Driven UI?

SDUI es una arquitectura probada utilizada por empresas como Meta, Airbnb y Shopify. Traslada el control de la UI al servidor, permitiendo iteraciones más rápidas, mayor consistencia y lógica centralizada. Filament adopta este patrón para el desarrollo web, permitiéndote definir interfaces declarativamente usando clases PHP que son renderizadas en HTML por el servidor.

Una distinción importante es la diferencia entre Server-Driven UI (SDUI) y Server-Rendered UI. Aunque ambos enfoques implican renderizar contenido en el servidor, Server-Rendered UI se basa en plantillas estáticas (como las vistas Blade tradicionales), donde la estructura y el comportamiento de la UI se definen por adelantado en archivos HTML o PHP. En cambio, SDUI otorga al servidor la capacidad de generar dinámicamente la UI en base a configuraciones en tiempo real y lógica de negocio, ofreciendo mayor flexibilidad y reactividad sin necesidad de modificar plantillas de frontend directamente.

Miles de desarrolladores usan Filament para añadir paneles de administración a sus aplicaciones Laravel, pero va mucho más allá. Puedes utilizar Filament para construir dashboards personalizados, portales de usuarios, CRMs, o incluso aplicaciones completas con múltiples paneles. Se integra sin problemas con cualquier stack frontend y funciona especialmente bien junto a herramientas como Inertia.js, Livewire y Blade.

Si ya estás utilizando vistas Blade en tu aplicación Laravel, también puedes mejorar esas vistas con componentes de Filament. Puedes insertar componentes Livewire impulsados por Filament en cualquier vista Blade o ruta, y usar los mismos generadores basados en esquemas para formularios, tablas y más, todo sin cambiar tu stack completo.

## Paquetes

El núcleo de Filament está compuesto por varios paquetes:

- `filament/filament` - El paquete principal para construir paneles (ej. paneles de administración). Requiere todos los demás paquetes, ya que los paneles suelen usar muchas de sus características.
- `filament/tables` - Un generador de tablas de datos que permite renderizar tablas interactivas con filtrado, ordenamiento, paginación y más.
- `filament/schemas` - Un paquete que permite construir interfaces usando un arreglo de objetos PHP "componentes" como configuración. Este es usado por muchas características de Filament para renderizar UI. Incluye un conjunto base de componentes para mostrar contenido.
- `filament/forms` - Un conjunto de componentes de `filament/schemas` para una gran variedad de entradas de formularios (campos), con validación integrada.
- `filament/infolists` - Componentes de `filament/schemas` para renderizar "listas de descripción". Una infolist consiste en "entradas", que son elementos UI clave-valor para mostrar información de solo lectura como texto, íconos e imágenes.
- `filament/actions` - Objetos de acción que encapsulan la UI de un botón, una ventana modal interactiva que se abre con el botón y la lógica que se ejecuta al enviar el formulario de esa modal. Se pueden usar en cualquier parte de la UI.
- `filament/notifications` - Una forma sencilla de enviar notificaciones a los usuarios en la interfaz. Pueden ser notificaciones flash, de base de datos o en tiempo real mediante websockets.
- `filament/widgets` - Conjunto de widgets de dashboard que pueden renderizar cualquier cosa: gráficos, cifras, tablas, o widgets totalmente personalizados.
- `filament/support` - Contiene utilidades y componentes UI compartidos, usados por todos los demás paquetes.

## Plugins

Filament está diseñado para ser altamente extensible, permitiéndote añadir tus propios componentes y funciones a su framework. Estas extensiones pueden vivir en tu propio código si son específicas de tu aplicación, o distribuirse como paquetes Composer si son de propósito general. En el ecosistema de Filament, estos paquetes Composer se llaman "plugins". La comunidad ha creado cientos de ellos, y el equipo oficial de Filament también mantiene varios que integran paquetes populares del ecosistema Laravel.

La gran mayoría de plugins en el ecosistema son open source y gratuitos. Algunos plugins premium están disponibles de pago, ofreciendo soporte o características avanzadas.

:::warning
Los plugins que no son mantenidos por el equipo de Filament son creados por autores independientes. Aunque pueden mejorar tu experiencia, Filament no puede garantizar su calidad, seguridad, compatibilidad o mantenimiento. Recomendamos revisar el código, la documentación y el feedback de la comunidad antes de instalarlos.
:::

Puedes navegar la lista completa de plugins oficiales y de la comunidad en la [web de Filament](/plugins).

## Personalización de apariencia

Tailwind CSS es un framework de utilidades CSS que Filament usa como sistema de diseño basado en tokens. Aunque Filament no usa utilidades Tailwind directamente en el HTML renderizado, compila esas utilidades en clases semánticas. Así, los usuarios de Filament pueden sobrescribir o extender la apariencia con sus propios estilos CSS.

Ejemplo simple: cambiar el radio de borde de los botones. Por defecto, en Filament:

```css
.fi-btn {
    @apply rounded-lg px-3 py-2 text-sm font-medium outline-none;
}
```

Para reducir el radio de borde puedes agregar en tu CSS:

```css
.fi-btn {
    @apply rounded-sm;
}
```

Esto sobrescribe la clase `rounded-lg` por `rounded-sm` en todos los botones, manteniendo el resto de estilos. De este modo puedes personalizar sin necesidad de reescribir plantillas ni HTML.

Más información en la [documentación de personalización de estilos](../styling).

## Tests

Los paquetes principales de Filament tienen tests unitarios para asegurar estabilidad en cada versión. Como usuario de Filament, puedes escribir tus propios tests para aplicaciones creadas con el framework. Filament proporciona utilidades para testear funcionalidad y componentes de UI, compatibles con Pest o PHPUnit.

Más detalles en la [documentación de testing](../testing).

## Alternativas a Filament

Si estás leyendo esto y concluyes que Filament no es lo que necesitas, ¡no pasa nada! Hay muchos otros proyectos excelentes en el ecosistema Laravel que podrían ser mejor opción:

### Filament parece demasiado complejo

[Laravel Nova](https://nova.laravel.com) es una manera sencilla de crear un panel administrativo para aplicaciones Laravel. Es un proyecto oficial mantenido por el equipo de Laravel y al comprarlo, apoyas el desarrollo del framework.

### No quiero usar Livewire para personalizar nada

Muchas partes de Filament no requieren tocar Livewire, pero construir componentes personalizados sí.

[Laravel Nova](https://nova.laravel.com) está hecho con Vue.js e Inertia.js. Quizás sea más adecuado si necesitas extensas personalizaciones y ya conoces estas herramientas.

### Necesito un CMS listo para usar

[Statamic](https://statamic.com) es un CMS construido sobre Laravel. Es una gran opción si buscas algo fácil de configurar y no necesitas crear un panel administrativo a medida.

### Quiero escribir Blade views y controlar todo el backend

[Flux](https://fluxui.dev) es el kit de UI oficial de Livewire. Incluye componentes Blade preconstruidos y estilizados. Está mantenido por el mismo equipo de Livewire y Alpine.js, y al comprarlo, apoyas el desarrollo de estos proyectos.