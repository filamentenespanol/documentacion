---
title: Descripción general
---

## Introducción

Todos los ejemplos de esta guía se escribirán utilizando [Pest](https://pestphp.com). Para utilizar el complemento Livewire de Pest para realizar pruebas, puede seguir las instrucciones de instalación en la documentación de complementos de Pest: [Complemento Livewire para Pest] (https://pestphp.com/docs/plugins#livewire). Sin embargo, puedes adaptar esto fácilmente a PHPUnit, principalmente cambiando la función `livewire()` de Pest con el método `Livewire::test()`.

Dado que todos los componentes de Filament están montados en un componente Livewire, simplemente utilizamos ayudas de prueba de Livewire en todas partes. Si nunca antes ha probado los componentes de Livewire, lea [esta guía] (https://livewire.laravel.com/docs/testing) de los documentos de Livewire.

## Guías de prueba

¿Busca un ejemplo completo sobre cómo probar un recurso de panel? Consulte la sección [Recursos de prueba](recursos de prueba).

Si desea conocer los diferentes métodos disponibles para probar tablas, consulte la sección [Tablas de prueba](../tables/testing).

Si necesita probar un esquema, que abarca tanto formularios como infolistas, consulte la sección [Probar esquemas](../schemas/testing).

Si desea probar una acción, incluidas acciones que existen en tablas o esquemas, consulte la sección [Probar acciones](../actions/testing).

Si desea probar una notificación que ha enviado, consulte la sección [Probar notificaciones] (../notificaciones/pruebas).

Si desea probar una página personalizada en un panel, estos son componentes de Livewire sin comportamiento especial, por lo que debe visitar la sección [pruebas](https://livewire.laravel.com/docs/testing) de la documentación de Livewire.

## ¿Qué es un componente Livewire cuando se utiliza Filament?

Al probar Filament, es útil comprender qué componentes son componentes Livewire y cuáles no. Con esta información, sabes qué clases pasar a la función `livewire()` en Pest o al método `Livewire::test()` en PHPUnit.

Algunos ejemplos de componentes Livewire son:

- Páginas en un panel, incluidas clases de páginas en el directorio `Pages` de un recurso
- Responsables de relaciones en un recurso.
-Aparatos

Algunos ejemplos de clases que no son componentes de Livewire son:

- Clases de recursos
- Componentes del esquema
- Acciones

Todas estas clases interactúan con Livewire, pero no son componentes de Livewire en sí. Aún puedes probarlos, por ejemplo, llamando a varios métodos y usando la [API de expectativas de plagas](https://pestphp.com/docs/expectations) para afirmar el comportamiento esperado. Sin embargo, las pruebas más útiles involucrarán componentes Livewire, ya que brindan la mejor cobertura de prueba de extremo a extremo de la experiencia de sus usuarios.
