---
title: Optimización del desarrollo local
---

Esta sección incluye consejos opcionales para optimizar el rendimiento cuando ejecutes tu aplicación Filament localmente.

Si buscas optimizaciones específicas para producción, revisa [Despliegue en producción](../deployment).

## Activando OPcache

[OPcache](https://www.php.net/manual/es/book.opcache.php) mejora el rendimiento de PHP almacenando el bytecode precompilado en memoria compartida, eliminando la necesidad de que PHP cargue y analice scripts en cada petición. Esto puede acelerar significativamente tu entorno de desarrollo, especialmente en aplicaciones grandes.

### Verificar estado de OPcache

Para verificar si [OPcache](https://www.php.net/manual/es/book.opcache.php) está habilitado, ejecuta:

```bash
php -r "echo 'opcache.enable => ' . ini_get('opcache.enable') . PHP_EOL;"
```

Deberías ver `opcache.enable => 1`. Si no, habilítalo con la siguiente línea en tu `php.ini`:

```ini
opcache.enable=1 # Habilitar OPcache
```

:::tip
Para ubicar tu archivo `php.ini`, ejecuta: `php --ini`
:::

### Configurar parámetros de OPcache

Si notas lentitud o sospechas que OPcache se queda sin memoria, ajusta estos parámetros en `php.ini`:

```ini
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
```

:::tip
Para ubicar tu archivo `php.ini`, ejecuta: `php --ini`
:::

- `opcache.memory_consumption`: define cuánta memoria (MB) usará OPcache para el código PHP precompilado. Prueba con `128` y ajusta según tu proyecto.
- `opcache.max_accelerated_files`: máximo de archivos PHP que puede almacenar OPcache. Empieza con `10000` y aumenta si tu aplicación tiene muchos archivos.

Estos ajustes son opcionales pero útiles si trabajas en aplicaciones Laravel grandes.

## Excluir carpeta del proyecto del antivirus

Problemas de rendimiento en Filament, especialmente en Windows, suelen estar relacionados con [Microsoft Defender](https://www.microsoft.com/es-es/microsoft-365/microsoft-defender-for-individuals).

Los antivirus o herramientas de seguridad escanean archivos en tiempo real, lo que ralentiza la ejecución de PHP y el renderizado de vistas.

Si notas lentitud, considera excluir la carpeta de tu proyecto del escaneo en tiempo real.

:::warning
Solo excluye carpetas si confías plenamente en el proyecto y entiendes los riesgos.
:::

## Deshabilitar herramientas de debugging

Las herramientas de debugging son útiles, pero pueden ralentizar tu aplicación si no las usas activamente. Desactivarlas temporalmente puede mejorar notablemente la experiencia.

### Deshabilitar depuración de vistas en Laravel Herd

[Laravel Herd](https://herd.laravel.com/) incluye una herramienta para depurar vistas en [macOS](https://herd.laravel.com/docs/macos/debugging/dumps#views) y [Windows](https://herd.laravel.com/docs/windows/debugging/dumps#views). 

Esta función muestra qué vistas se renderizan y con qué datos, pero puede ralentizar mucho tu aplicación. Si no la usas, mejor desactívala:

- Abre Herd > Dumps.
- Haz clic en *Settings*.
- Desmarca la opción **Views**.

### Deshabilitar Debugbar

[Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar) recopila y muestra gran cantidad de datos, lo que puede ralentizar aplicaciones complejas.

Para desactivarlo, añade en tu `.env`:

```dotenv
DEBUGBAR_ENABLED=false
```

Si necesitas Debugbar, desactiva colectores específicos. Consulta la [documentación oficial](https://github.com/barryvdh/laravel-debugbar?tab=readme-ov-file#debugbar-for-laravel).

### Deshabilitar Xdebug

[Xdebug](https://xdebug.org) es muy útil, pero también puede causar lentitud.

Si lo tienes instalado, asegúrate de deshabilitarlo en `php.ini`:

```ini
xdebug.mode=off # Desactivar Xdebug
```

:::tip
Para ubicar tu archivo `php.ini`, ejecuta: `php --ini`
:::

## Cachear íconos Blade

Cachear los [Blade icons](https://blade-ui-kit.com/blade-icons) puede mejorar el rendimiento en vistas con muchos íconos.

Ejecuta:

```bash
php artisan icons:cache
```

Cada vez que instales nuevos paquetes de íconos, ejecuta nuevamente el comando para detectarlos.