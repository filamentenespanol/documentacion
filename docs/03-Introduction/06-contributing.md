---
title: Contribuyendo
contents: false
---

:::info
Partes de esta guía están adaptadas de la [guía de contribución de Laravel](https://laravel.com/docs/contributions), que sirvió como valiosa inspiración.
:::

## Reportando errores

Si descubres un error en Filament, por favor repórtalo abriendo un issue en nuestro [repositorio de GitHub](https://github.com/filamentphp/filament/issues/new/choose).  
Antes de abrir un issue, revisa los [issues existentes](https://github.com/filamentphp/filament/issues?q=is%3Aissue) para comprobar si el bug ya fue reportado.

Incluye la mayor cantidad de información posible, especialmente los números de versión de los paquetes en tu aplicación. Puedes usar este comando Artisan en tu aplicación para abrir un issue con las versiones ya rellenadas automáticamente:

```bash
php artisan make:filament-issue
```

Al crear un issue, requerimos un "repositorio de reproducción". **No enlaces tu proyecto real**. Lo que necesitamos es una reproducción _mínima_ en un proyecto limpio, sin código innecesario. Esto significa que no importa si tu proyecto real es privado/confidencial, ya que queremos un link a un proyecto aparte y aislado. Esto nos permite arreglar el problema mucho más rápido.  
**Los issues serán cerrados automáticamente y no revisados si no incluyen este repositorio, para ahorrar tiempo a los mantenedores y ser justos con quienes sí lo crean.**  

Si crees que un repositorio de reproducción no es adecuado para el issue (lo cual es muy raro), por favor `@danharrin` y explica por qué. Decir "es un problema simple" no es excusa para no crearlo.  
[¿Necesitas ayuda? Tenemos un proyecto Filament de ejemplo para empezar.](https://unitedbycode.com/filament-issue)

Recuerda que los reportes de bugs se crean para que otros con el mismo problema puedan colaborar contigo en resolverlo. No esperes que el reporte reciba atención inmediata. Sirve para ayudar a ti mismo y a otros a iniciar el camino hacia la solución.

## Desarrollo de nuevas funcionalidades

Si quieres proponer una nueva característica o mejora en Filament, puedes usar nuestro [foro de discusiones en GitHub](https://github.com/filamentphp/filament/discussions).  
Si planeas implementar la funcionalidad con un PR, se recomienda mencionar a `@danharrin` (un mantenedor principal de Filament) en la discusión antes de empezar, para confirmar que es adecuada y evitar perder tiempo.

## Desarrollo de plugins

Si quieres desarrollar un plugin para Filament, revisa la [sección de desarrollo de plugins](../plugins) en la documentación.  
Nuestro [Discord](https://filamentphp.com/discord) también es un gran lugar para hacer preguntas y recibir ayuda. Puedes participar en el canal [`#plugin-developers-chat`](https://discord.com/channels/883083792112300104/970354547723730955).

Además, puedes [enviar tu plugin para ser publicado en el sitio web de Filament](https://github.com/filamentphp/filamentphp.com/blob/main/README.md#contributing).

## Contribuyendo con una copia local de Filament

Si deseas contribuir directamente al desarrollo de los paquetes de Filament, puedes probarlos en un proyecto Laravel real:

- Haz fork del [repositorio en GitHub](https://github.com/filamentphp/filament).
- Crea una app Laravel localmente.
- Clona tu fork en el directorio raíz de tu app.
- Dentro del directorio `/filament`, crea una rama para tu fix, por ejemplo: `fix/error-message`.

En tu `composer.json` agrega:

```jsonc
{
    // ...
    "require": {
        "filament/filament": "*"
    },
    "minimum-stability": "dev",
    "repositories": [
        {
            "type": "path",
            "url": "filament/packages/*"
        }
    ]
    // ...
}
```

Luego ejecuta `composer update`.

Cuando termines los cambios, haz commit y genera un PR al [repositorio de GitHub](https://github.com/filamentphp/filament).

## Verificando traducciones desactualizadas

Puedes usar nuestra Translation Tool para verificar traducciones pendientes.  
Clona el repositorio, instala las dependencias y ejecuta el comando:

```bash
# Clonar
git clone git@github.com:filamentphp/filament.git

# Instalar dependencias
composer install

# Ejecutar la herramienta
./bin/translation-tool.php
```

Primero selecciona *List outdated translations* y luego elige el locale a revisar. Se mostrarán las traducciones faltantes, después puedes enviar un PR con ellas al [repositorio de GitHub](https://github.com/filamentphp/filament).

## Vulnerabilidades de seguridad

Si descubres una vulnerabilidad, por favor [repórtala en GitHub](https://github.com/filamentphp/filament/security/advisories).  
Todas serán atendidas de inmediato. Consulta la [política de soporte de versiones](version-support-policy) para saber qué versiones están en mantenimiento.

## Código de conducta

Ten en cuenta que Filament se publica con un [Código de Conducta de Contribuidores](https://github.com/filamentphp/filament/blob/4.x/CODE_OF_CONDUCT.md).  
Al participar en este proyecto, aceptas cumplir sus términos.
