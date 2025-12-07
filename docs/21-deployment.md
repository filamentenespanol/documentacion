---
title: Implementación en producción
---

## Introducción

Implementar una aplicación Laravel usando Filament en producción es similar a implementar cualquier otra aplicación Laravel. Sin embargo, hay algunos pasos adicionales que debe seguir para asegurarse de que su panel Filament esté optimizado para el rendimiento y la seguridad.

Para obtener consejos centrados en el desempeño del desarrollo local, consulte [Optimizar el desarrollo local](introducción/optimizar-el-desarrollo-local).

## Asegúrese de que los usuarios estén autorizados a acceder a los paneles

Cuando Filament detecta que el `APP_ENV` de su aplicación no es `local`, le pedirá que configure la autorización para sus usuarios. Esto es para garantizar que solo los usuarios autorizados puedan acceder a su panel Filament en producción, manteniendo al mismo tiempo el entorno local fácil para comenzar.

Para autorizar a los usuarios a acceder a un panel, debe seguir la [guía en la sección de usuarios](usuarios/descripción general#autorizar-el-acceso-al-panel).

:::warning
    Si no sigue estos pasos y su modelo de usuario no implementa la interfaz `FilamentUser`, ningún usuario podrá iniciar sesión en su panel en producción.
:::

## Mejora del rendimiento del panel de filamentos

### Optimización del filamento para la producción

Para optimizar Filament para producción, debe ejecutar el siguiente comando en su script de implementación:

```bash
php artisan filament:optimize
```

Este comando [almacenará en caché los componentes de Filament](#caching-filament-components) y, además, los [íconos de Blade](#caching-blade-icons), lo que puede mejorar significativamente el rendimiento de sus paneles de Filament. Este comando es una abreviatura de los comandos `php artisan filament:cache-components` y ​​`php artisan icons:cache`.

Para borrar los cachés de una vez, puedes ejecutar:

```bash
php artisan filament:optimize-clear
```

#### Almacenamiento en caché de componentes de filamento

Si no está utilizando el [comando`filament:optimize`](#optimizing-filament-for-production), es posible que desee considerar ejecutar `php artisan filament:cache-components` en su secuencia de comandos de implementación, especialmente si tiene una gran cantidad de componentes (recursos, páginas, widgets, administradores de relaciones, componentes Livewire personalizados, etc.). Esto creará archivos de caché en el directorio `bootstrap/cache/filament` de su aplicación, que contienen índices para cada tipo de componente. Esto puede mejorar significativamente el rendimiento de Filament en algunas aplicaciones, ya que reduce la cantidad de archivos que deben escanearse y descubrirse automáticamente en busca de componentes.

Sin embargo, si está desarrollando activamente su aplicación localmente, debe evitar usar este comando, ya que evitará que se descubran componentes nuevos hasta que se borre o reconstruya el caché.

Puede borrar el caché en cualquier momento sin reconstruirlo ejecutando `php artisan filament:clear-cached-components`.

#### Iconos de Blade de almacenamiento en caché

Si no está utilizando el [comando`filament:optimize`](#optimizing-filament-for-production), puede considerar ejecutar `php artisan icons:cache` localmente y también en su script de implementación. Esto se debe a que Filament utiliza el paquete [Blade Icons](https://blade-ui-kit.com/blade-icons), que puede tener mucho más rendimiento cuando se almacena en caché.

### Habilitando OPcache en su servidor

Para comprobar si [OPcache](https://www.php.net/manual/en/book.opcache.php) está habilitado, ejecute:

```bash
php -r "echo 'opcache.enable => ' . ini_get('opcache.enable') . PHP_EOL;"
```

Deberías ver `opcache.enable => 1`. Si no, habilítelo agregando la siguiente línea a su `php.ini`:

```ini
opcache.enable=1 # Enable OPcache
```

De la [documentación de Laravel Forge] (https://forge.laravel.com/docs/servers/php.html#opcache):

:::tip
    La optimización de PHP OPcache para producción configurará OPcache para almacenar su código PHP compilado en la memoria para mejorar enormemente el rendimiento.
:::

Utilice un motor de búsqueda para encontrar las instrucciones de configuración de OPcache relevantes para su entorno.

### Optimizando tu aplicación Laravel

También deberías considerar optimizar tu aplicación Laravel para producción ejecutando `php artisan optimize` en tu script de implementación. Esto almacenará en caché los archivos de configuración y las rutas.

## Garantizar que los activos estén actualizados

Durante el proceso de instalación de Filament, Filament agrega el comando `php artisan filament:upgrade` al archivo `composer.json`, en el script `post-autoload-dump`. Este comando garantizará que sus activos estén actualizados cada vez que descargue el paquete.

Le recomendamos encarecidamente que este script permanezca en su archivo `composer.json`; de lo contrario, puede tener problemas con activos faltantes o desactualizados en su entorno de producción. Sin embargo, si debe eliminarlo, asegúrese de que el comando se ejecute manualmente en su proceso de implementación.
