---
title: Primeros pasos
---

Una vez que hayas [instalado Filament](introduction/installation#installing-the-panel-builder), podrás comenzar a construir tu aplicación.

:::info
Esta guía es para el **generador de paneles de Filament**.  
Si deseas usar los componentes UI de Filament fuera de un panel, visita la documentación de [Componentes](components).
:::

Para comenzar, visita `/admin` e inicia sesión con un usuario. Serás redirigido al dashboard por defecto del panel.

## Recursos

Los **Resources** son el núcleo de tu aplicación Filament. Son interfaces CRUD para los modelos que quieras administrar en el panel.

De forma predeterminada, Filament genera tres páginas en cada recurso:
- **Listar**: Una tabla paginada con todos los registros del modelo Eloquent.
- **Crear**: Un formulario para crear un nuevo registro.
- **Editar**: Un formulario para modificar un registro existente.

También puedes generar una página de **Vista** para mostrar un registro en modo solo lectura.

Cada recurso suele tener un ítem en la barra lateral, que se registra automáticamente al crearlo.

Para comenzar creando un recurso, visita la documentación de [Resources](resources).

## Widgets

Los **Widgets** son componentes usados frecuentemente para construir dashboards, normalmente para mostrar datos estadísticos. Se admiten gráficos, números, tablas y widgets totalmente personalizados.

Cada widget tiene una clase PHP y una vista Blade. La clase PHP es técnicamente un [componente Livewire](https://livewire.laravel.com/docs/components). Por lo tanto, cada widget tiene acceso al poder completo de Livewire para construir interfaces interactivas renderizadas en el servidor.

El dashboard por defecto de Filament incluye algunos widgets: uno que saluda al usuario y permite cerrar sesión, y otro que muestra información sobre Filament.

Para comenzar añadiendo tu propio widget al dashboard, visita la documentación de [Widgets](widgets).

## Páginas personalizadas

Las **Custom pages** son un lienzo en blanco para construir lo que desees en un panel.  
Suelen usarse para páginas de configuración, documentación u otros casos personalizados.

Cada página personalizada tiene una clase PHP y una vista Blade. La clase PHP es técnicamente un [componente Livewire de página completa](https://livewire.laravel.com/docs/components) (de hecho, todas las páginas en un panel Filament son componentes Livewire).  
Esto permite que cada página tenga acceso a todas las capacidades de Livewire para construir una interfaz interactiva renderizada en el servidor.

Para comenzar creando una página personalizada, visita la documentación de [Custom pages](navigation/custom-pages).