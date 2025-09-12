# 📦 Changelog en Español - Filament v4

Este archivo contiene la **traducción no oficial** de los cambios publicados en el repositorio oficial de [FilamentPHP](https://github.com/filamentphp/filament/releases).  

> ⚠️ **Aviso importante**: Esta traducción es realizada de forma comunitaria y no tiene carácter oficial.  
> La fuente de verdad siempre será el repositorio oficial de Filament.  
> Consulta siempre el changelog original para confirmar detalles técnicos.

---

## [v4.0.10] - 11 Sep 2025

### ✨ Cambios
- Corrección de redacción en la documentación de columnas personalizadas.  
- Se habilitó el idioma **zh_HK** en `file-upload.js`.  
- Soporte para `Htmlable` en `TableColumn`.  
- Nuevo método `processNodesUsing`.  
- Traducciones en hebreo para tablas.  
- Varias correcciones en documentación y scripts de actualización.  
- Se completaron las traducciones al portugués.  
- Se corrigió un bug en *Builders Actions* y notificaciones duplicadas.  

**Contribuidor nuevo:** @lucavicidomini  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.10)

---

## [v4.0.9] - 09 Sep 2025

### 🐛 Correcciones
- Precisión en el formato de valores del componente `slider`.  
- Corrección en advertencias de compilación de Vite.  
- Posibilidad de abrir un `modal` dentro de otro.  
- Arreglo en `Select` sin opciones.  
- Prevención de errores de relación cuando el modelo es multi-tenant.  
- Corrección de rutas en documentación (`resources/overview`).  
- Fix en generación de QR MFA cuando se usa **bacon QR** sin **imagick**.  

**Contribuidores nuevos:** @timwrb, @f-baghli, @timo-de-winter  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.9)

---

## [v4.0.8] - 07 Sep 2025

### ✨ Cambios
- Nuevas traducciones: sueco, eslovaco/checo, mejoras turcas y árabes.  
- Soporte para `BackedEnum` en parámetros de `money` (moneda y locale).  
- `RichEditor` ahora soporta `toArray()`.  
- Generación de columnas de texto y enumeraciones como *badges*.  
- Se añadió ID a secciones para permitir *collapse* persistente.  

### 🐛 Correcciones
- Arreglos en carga de filesystem por defecto.  
- Mejoras en comandos de generación (`infolist` & `relation manager`).  
- Correcciones de estilo en tabs y dropdowns.  
- Fix en subida de imágenes locales en `RichEditor`.  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.8)

---

## [v4.0.7] - 04 Sep 2025

### 🐛 Correcciones
- Error en consola con `sidebar.blade.php`.  
- Arreglo en placeholder y alineación de texto.  
- Mejoras en traducciones (hebreo, alemán, tailandés, holandés, cantonés).  
- Fix en `draggable index` en *sortable components*.  
- Solución para problemas pegando contenido desde Word en `RichEditor`.  
- Corrección en botón logout y acciones de menú.  

**Contribuidores nuevos:** @juukie, @ismailalterweb, @SamaelHeaven, @steffjenl  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.7)

---

## [v4.0.6] - 02 Sep 2025

### ✨ Cambios
- Mejora del menú de usuario/tenant en panel de invitados.  
- Soporte para `null` en títulos.  
- Nuevo renderer `toText()` para `RichEditor`.  
- Mejor manejo de componentes repetidores (`Repeater` y `Sortable`).  
- Arreglo en validación de `SelectColumn`.  
- Posibilidad de sobrepasar chequeos de plugins incompatibles en upgrade script.  
- Solución en notificaciones de base de datos post-upgrade v4.  

**Contribuidor nuevo:** @moory-se  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.6)

---

## [v4.0.5] - 01 Sep 2025

### ✨ Cambios y mejoras
- Nuevas traducciones al portugués (pt_BR): auth, acciones y páginas.
- Soporte para instancias de `Model` en `getRecords`.
- Excepciones más específicas (`LogicException` en lugar de `Exception`).
- Mejoras de estilo en bloques de código de `RichEditor`.

### 🐛 Correcciones
- Fix en referencias ambiguas en `SelectFilter`.
- Corrección de género en traducciones francesas ("empty").
- Solución para visibilidad de ficheros en disco configurado.
- Correcciones en validación de `RichEditor` y middleware de caché de rutas.
- Fix en tipos de retorno de `Pagination`.
- Correcciones de CSS en secciones `aside` y atributos extra en `RichEditor`.

**Contribuidores nuevos:** @rginnow, @Skythrew, @jaulz, @adelf, @mathieutu  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.5)

---

## [v4.0.4] - 27 Ago 2025

### ✨ Cambios y mejoras
- `observeTenancyModelCreation()` movido a `ServiceProvider::boot()`.
- Soporte para `Schema` en `Table repeater`.
- Añadido soporte HTML en títulos de grupos.
- Implementado `HasRenderHookScopes` en `RelationManager`.
- Soporte en `RichEditor` para guardar múltiples archivos con **spatie media library**.
- Nuevas traducciones: sueco, cantonés, tailandés.
- Mejor documentación en despliegue y uso de `defaultSort()`.

### 🐛 Correcciones
- Fix en links quebrados en docs (`authorization`, `modals`, otros).
- Correcciones en atributos extra de `ToggleColumn`.
- Bugfix en manejo de `Repeater` al arrastrar.
- Fix en `SelectColumn` con valores `object`.
- Bug en toolbar de `RichEditor`.
- Corrección en `User/TenantMenu`.

**Contribuidores nuevos:** Odion-DS, robinmiau, alexhawke, Doriiaan, Baspa, Copilot, igorbabko, harman-codes, chrillep, rajatpatelz, Lapinskas, People-Sea, janiseglitis.  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.4)

---

## [v4.0.3] - 19 Ago 2025

### 🐛 Correcciones
- Añadidas traducciones faltantes de idioma **lus**.
- Fix en método `replaceEnd` (orden de reemplazo corregido).

**Contribuidores nuevos:** @wotta  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.3)

---

## [v4.0.2] - 18 Ago 2025

### ✨ Cambios y mejoras
- Soporte para modificadores de binding en `TableSelect`.
- Soporte para etiquetas HTML en `ActionGroup`.
- Mejoras en `ManageRelatedRecords CreateAction`.
- Configuración avanzada en columnas de `Repeater` (`TableColumn`).
- Soporte para binding con `value object constants`.
- Refactor en modales y estructura CSS.
- Nuevas traducciones: turco, noruego (nb), árabe, farsi, coreano, chino (zh_TW, zh_CN).
- Mejor documentación: `vite.config.js`, formularios y contribución.

### 🐛 Correcciones
- Fix en errores de notificación en páginas.
- Fix en generación de URL de tenant.
- Fix en `RelationManager getIcon` con `BackedEnum`.
- Arrays reducidos (`array_reduce()`) en `InteractsWithToolbarButtons`.
- Fix en compatibilidad de plugins al migrar a v4.

**Contribuidores nuevos:** MikeDevs, afbora, cainydev, macaws, zvizvi, nexxai, eddierusinskas, WillieOng-HK.  

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.2)

---

## [v4.0.1] - 14 Ago 2025

### 🐛 Correcciones iniciales
- Fix en validación de formularios tras migración a v4.
- Correcciones en soporte multi-idioma.
- Fix en compatibilidad de componentes front-end con Vite.  
- Mejoras en documentación inicial de migración.

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.1)

---

## [v4.0.0] - 14 Ago 2025

### 🎉 Release inicial de Filament v4
- Rediseño completo del **Panel de administración**.
- Migración de front-end a **Vite + Vue** (anteriormente Mix).
- Formularios, Tablas, Widgets y Recursos con nuevas APIs modernizadas.
- Integración mejorada para **Multi-tenancy**.
- Mejoras importantes en `RichEditor`, `RelationManagers`, `Repeater`.
- Soporte oficial para PHP 8.3.
- Documentación totalmente reestructurada para v4.

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.0)

---
## Contribuidores de la traducción

👥 Traducción mantenida por la comunidad de **Filament en Español**.  
Si quieres colaborar:  
- GitHub: [filamentenespanol/documentacion](https://github.com/filamentenespanol/documentacion)  
- Blog: [filamentenespanol.com](https://filamentenespanol.com)  
- Documentación traducida: [docs.filamentenespanol.com](https://docs.filamentenespanol.com)