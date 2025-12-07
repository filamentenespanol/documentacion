---
title: ganchos CSS
---

## Introducción

Filament utiliza clases de "gancho" de CSS para permitir que varios elementos HTML se personalicen mediante CSS.

## Descubriendo clases de ganchos

Podríamos documentar todas las clases de ganchos en toda la interfaz de usuario de Filament, pero eso supondría mucho trabajo y probablemente no sería muy útil para usted. En su lugar, recomendamos utilizar las herramientas de desarrollo de su navegador para inspeccionar los elementos que desea personalizar y luego utilizar las clases de enlace para apuntar a esos elementos.

Todas las clases de gancho tienen el prefijo `fi-`, lo cual es una excelente manera de identificarlas. Generalmente están justo al comienzo de la lista de clases, por lo que son fáciles de encontrar, pero a veces pueden caer más abajo en la lista si tenemos que aplicarlos condicionalmente con JavaScript o Blade.

Si no encuentra la clase de gancho que está buscando, intente no piratearla, ya que podría exponer sus personalizaciones de estilo a cambios importantes en futuras versiones. En su lugar, abra una solicitud de extracción para agregar la clase de enlace que necesita. Podemos ayudarle a mantener la coherencia en los nombres. Probablemente ni siquiera necesites abrir el repositorio de Filament localmente para estas solicitudes de extracción, ya que puedes editar los archivos Blade directamente en GitHub.

## Aplicar estilos a clases de gancho

Por ejemplo, si desea personalizar el color de la barra lateral, puede inspeccionar el elemento de la barra lateral en las herramientas de desarrollo de su navegador, ver que usa `fi-sidebar` y ​​luego agregar CSS a su aplicación de esta manera:

```css
.fi-sidebar {
    background-color: #fafafa;
}
```

Alternativamente, dado que Filament se basa en Tailwind CSS, puede usar su directiva `@apply` para aplicar clases de Tailwind a elementos de Filament:

```css
.fi-sidebar {
    @apply bg-gray-50 dark:bg-gray-950;
}
```

Ocasionalmente, es posible que necesites usar el modificador `!important` para anular los estilos existentes, pero úsalo con moderación, ya que puede dificultar el mantenimiento de tus estilos:

```css
.fi-sidebar {
    @apply bg-gray-50 dark:bg-gray-950 !important;
}
```

Incluso puedes aplicar `!important` solo a clases específicas de Tailwind, lo cual es un poco menos intrusivo, anteponiendo el nombre de la clase con `!`:

```css
.fi-sidebar {
    @apply !bg-gray-50 dark:!bg-gray-950;
}
```

## Abreviaturas comunes de clases de ganchos

Usamos algunas abreviaturas comunes en nuestras clases de ganchos para que sean breves y legibles:

- `fi` es la abreviatura de "Filamento"
- `fi-ac` se usa para representar las clases utilizadas en el paquete Acciones
- `fi-fo` se usa para representar las clases utilizadas en el paquete Formularios
- `fi-in` se usa para representar las clases utilizadas en el paquete Infolists
- `fi-no` se usa para representar las clases utilizadas en el paquete de Notificaciones
- `fi-sc` se usa para representar las clases utilizadas en el paquete Schema
- `fi-ta` se usa para representar las clases utilizadas en el paquete Tablas
- `fi-wi` se usa para representar las clases utilizadas en el paquete de Widgets
- `btn` es la abreviatura de "botón"
- `col` es la abreviatura de "columna"
- `ctn` es la abreviatura de "contenedor"
- `wrp` es la abreviatura de "envoltorio"

## Vistas de Publishing Blade

Es posible que tenga la tentación de publicar las vistas internas de Blade en su aplicación para poder personalizarlas. No recomendamos esto, ya que introducirá cambios importantes en su aplicación en futuras actualizaciones. Utilice las [clases de enlace CSS](#applying-styles-to-hook-classes) siempre que sea posible.

Si decide publicar las vistas de Blade, bloquee todos los paquetes de Filament en una versión específica en su archivo `composer.json` y ​​luego actualice Filament manualmente aumentando este número, probando toda su aplicación después de cada actualización. Esto le ayudará a identificar los cambios importantes de forma segura.
