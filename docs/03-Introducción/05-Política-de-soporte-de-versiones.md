---
title: Política de soporte de versiones
contents: false
---

## Introducción

| Versión | Nuevas funcionalidades | Corrección de errores | Parches de seguridad |
|----|----|----|----|
| 1.x    | ❌ finalizado 1 ene 2022 | ❌ finalizado 1 ene 2025 | ❌ finalizado 1 jul 2025 |
| 2.x    | ❌ finalizado 1 jul 2023 | ❌ finalizado 1 ene 2025 | ✅ hasta 1 ene 2026 |
| 3.x    | ❌ finalizado 1 ago 2024 | ✅ hasta 1 ago 2026 | ✅ hasta 1 ene 2028 |
| 4.x    | ✅ hasta la versión 5.x estable | ✅ ~1 año después de la versión 5.x estable | ✅ ~2 años después de la versión 5.x estable |

## Nuevas funcionalidades

Los pull requests para nuevas funcionalidades solo se aceptan para la última versión mayor, salvo circunstancias especiales.  
Una vez que se publique una nueva versión mayor, el equipo de Filament dejará de aceptar PRs de nuevas funcionalidades en versiones anteriores.  
Los PR abiertos se redirigirán a la última versión mayor o se cerrarán, según los conflictos con la nueva rama destino.

## Correcciones de errores

Tras el lanzamiento de una versión mayor, el equipo de Filament seguirá aceptando PRs de corrección de errores para la versión anterior **durante un año**. Después de ese plazo, no se aceptarán más PRs para esa versión.

El equipo de Filament procesa los reportes de bugs en versiones soportadas en orden cronológico, aunque puede priorizar los errores críticos.  
Las correcciones normalmente se desarrollan para la última versión mayor, pero los contribuidores pueden hacer *backport* de esos parches a otras versiones soportadas presentando sus PR correspondientes.

## Parches de seguridad

El equipo de Filament planea proporcionar parches de seguridad para cada versión mayor durante **al menos dos años**.

Si descubres una vulnerabilidad de seguridad en Filament, por favor [repórtala en GitHub](https://github.com/filamentphp/filament/security/advisories). Todas las vulnerabilidades se atenderán con la mayor rapidez.

Ten en cuenta que, aunque una versión de Filament reciba parches de seguridad, sus dependencias subyacentes (PHP, Laravel, Livewire) podrían no estar ya soportadas.  
Por ello, las aplicaciones que usen versiones antiguas de Filament podrían seguir siendo vulnerables a problemas de seguridad en esas dependencias.