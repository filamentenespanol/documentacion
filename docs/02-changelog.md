# 📦 Changelog en Español - Filament v4

Este archivo contiene la **traducción no oficial** de los cambios publicados en el repositorio oficial de [FilamentPHP](https://github.com/filamentphp/filament/releases).  

> ⚠️ **Aviso importante**: Esta traducción es realizada de forma comunitaria y no tiene carácter oficial.  
> La fuente de verdad siempre será el repositorio oficial de Filament.  
> Consulta siempre el changelog original para confirmar detalles técnicos.

---

## [v4.5.2] - 07 Ene 2026

### 🐛 Correcciones

* [4.x] Corrección: gestión del estado `Htmlable` en `TextEntry` y `TextColumn`.
* Correcciones en `MorphToSelect`, limpieza de selección, tooltips RawJs y configuración de importaciones.
* Corrección: generación incorrecta de colores acromáticos en `generatePalette`.

**Contribuidores nuevos:** @SimonBroekaert, @arthurpar06

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.5.2)

---

## [v4.5.1] - 05 Ene 2026

### 🐛 Correcciones

* Corrección: mensaje "sin opciones" en `Select` cuando se usan opciones dinámicas iniciales.

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.5.1)

---

## [v4.5.0] - 03 Ene 2026

### ✨ Cambios

* Corrección: la URL de acción `create` ya no se apunta incorrectamente cuando el modelo no coincide.
* Actualización de traducciones al español para v4.4.
* Soporte de datos de arrays en `RepeatableEntry`.
* Correcciones múltiples en selects dinámicos, subida de archivos, acciones de tablas, relaciones y rendimiento.
* Habilitado redimensionado de imágenes en el editor enriquecido.
* Funcionalidad: selección de columnas al exportar en acciones masivas.
* Arquitectura modular documentada.
* Nueva funcionalidad: acciones JS en esquemas.
* Soporte de PHP 8.5 en integración continua.
* Forzar recorte y validación de relación de aspecto en subida de imágenes.
* Introducción de pruebas de navegador con Pest.
* [4.x] Soporte de `UnitEnum` en helpers de autenticación.
* Callbacks para reordenamiento de tablas.
* Correcciones de comportamiento en búsquedas globales, filtros, widgets y estados vacíos.
* [4.x] Soporte para componentes `EmptyState` no contenidos.
* [4.x] Helper `helperText()` para `FusedGroup`.
* [4.x] Soporte de flags JSON personalizados en `CodeEntry`.
* [4.x] Traits para implementación simplificada de 2FA.
* Corrección: relaciones dentro de `Repeater` guardaban registros vacíos.

**Contribuidores nuevos:** @mjauvin, @a7medKhalid, @jeremylongshore, @chosten, @AlexanderPoellmann

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.5.0)

---

## [v4.4.0] - 19 Dic 2025

### ✨ Cambios

* Mostrar barras de herramientas flotantes para párrafos solo cuando hay texto seleccionado.
* Aclaración de mensajes y resultados del CLI.
* Corrección: `getParentRepeaterItem` ahora puede devolver `null`.
* Funcionalidad de cancelar subida de archivos en el componente File Upload.
* Corrección: gestión de recuperación de orden desde sesión para evitar errores de asignación.
* Soporte de idioma hebreo en el selector de fecha y hora.
* Corrección: desactivar reordenamiento en el gestor de relaciones cuando `isReadonly=true`.
* Actualización de traducciones faltantes al español.
* Editor enriquecido: eliminar margen superior entre imágenes adyacentes.
* Corrección de márgenes no deseados en RichEditor y RichContentRenderer.
* RichContentRenderer ahora prioriza extensiones PHP de plugins personalizados.
* Corrección: permitir HTML en tooltips de encabezados.
* Añadidas traducciones faltantes al luxemburgués (lus).
* Nuevo campo de contraseña actual con mensaje de validación.
* Añadidas traducciones faltantes al polaco.
* Corrección: nombre de método incorrecto en la documentación.
* Actualización de traducción danesa para la etiqueta "Attach".
* Corrección: modales anidados en componentes de esquema.
* Funcionalidad: eliminar separador en títulos cuando `brandName` está vacío.
* Corrección: actualización de `cachedData` al actualizar datos de gráficos.
* Corrección: tipos de retorno en documentación de `HasLabel`, `HasIcon` y `HasDescription`.
* Corrección: aislar filtros persistentes por tenant en sesión.
* [4.x] Nueva API `summaries()` para controlar visibilidad de resúmenes en tablas.
* [4.x] Corrección de compatibilidad de la clase `Block` con `CanBeRepeated`.
* Múltiples correcciones relacionadas con acciones, filtros, relaciones, formularios, editores enriquecidos, tablas, temas oscuros, selección masiva y comportamiento visual.
* Nuevo icono de acción para notificaciones en base de datos.
* Funcionalidad: ordenación en relaciones `HasOneThrough`.
* Soporte de traducciones zh_TW.
* Nueva funcionalidad: columnas de listas desordenadas.
* Funcionalidad: control `saved()` para componentes de esquema.
* Soporte de menciones en el editor enriquecido.
* Nuevos traits para facilitar implementación de 2FA.

**Contribuidores nuevos:** @csh-tech, @0xxb, @bilogic, @SimonJnsson, @rtraselbd, @dieterwarson, @halaibrahim867, @samuelwei, @martynaskre, @chrizgx

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.4.0)

---

## [v4.3.1] - 10 Dic 2025

### ✨ Cambios

* Soporte de acciones para registros con herencia de tabla única (Single Table Inheritance).
* Corrección: errores gramaticales en los archivos README del plugin Spatie.
* Corrección: eliminar columna duplicada en consultas SQL durante la ordenación manual.
* Mejora de experiencia de usuario del comando `make:theme`.
* Añadidas traducciones faltantes en eslovaco (sk) y checo (cz).
* El comando `MakeUserCommand` ahora reconoce el panel actual.
* Corrección: reutilización indebida de códigos de recuperación de autenticación multifactor.

**Contribuidores nuevos:** @theofanisv, @iamgurjitsingh

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.3.1)

---

## [v4.3.0] - 05 Dic 2025

### ✨ Cambios
- Corrección: Permitir que `getOptionDescriptionFromRecord` devuelva `null`.
- Restricciones relativas de fecha y fecha-hora para el query builder.
- Corrección: La opción `shouldRegisterNavigation` ahora se respeta correctamente en los clusters.
- Editor enriquecido: herramienta para alternar la celda de encabezado de tabla y su icono.
- Funcionalidad: inyectar `$repeaterIndex` en closures evaluadas.
- Posibilidad de usar `TableSelect` en acciones de adjuntar (`attach action`).
- Editor enriquecido: modificador `hiddenLabel()` para mostrar etiquetas de herramientas.
- Mejora: ajuste de líneas (wrapping) en el editor de código.
- Posibilidad de definir una lista de protocolos de enlace permitidos.
- Nueva experiencia de usuario para la navegación con pestañas horizontales.
- Posición configurable del botón de reseteo para filtros de tabla y gestor de columnas.
- [4.x] Evaluación de closures en `TimezoneManager`.
- [v4] Nueva API `headerTooltip()` para columnas de tabla.
- [4.x] Soporte de alineación vertical en `Repeater\TableColumn`.
- Traducciones completas al persa (fa).
- Nueva API `persistColumnsInSession()` para persistir columnas en sesión.
- Exponer el recuento de registros de la tabla.
- Corrección: teletransporte de grupos en la topbar.
- Reañadida la posibilidad de desactivar notificaciones.
- Funcionalidad: componente `Select` ahora soporta ordenación (sortable).
- Corrección: salto de maquetación del logo de la topbar cuando la sidebar es colapsable.

**Contribuidores nuevos:** @felipeArnold, @pochocho, @nnivxix, @freshleafmedia, @MeghdadFadaee, @Zamion101, @danielh-official

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.3.0)

---

## [v4.2.4] - 28 Nov 2025

### ✨ Cambios
- Corrección: Permitir que `getOptionDescriptionFromRecord` devuelva `null`.
- Restricciones relativas de fecha y fecha-hora para el query builder.
- Corrección: La opción `shouldRegisterNavigation` ahora se respeta correctamente en los clusters.
- Editor enriquecido: herramienta para alternar la celda de encabezado de tabla y su icono.
- Funcionalidad: inyectar `$repeaterIndex` en closures evaluadas.
- Posibilidad de usar `TableSelect` en acciones de adjuntar (`attach action`).
- Editor enriquecido: modificador `hiddenLabel()` para mostrar etiquetas de herramientas.
- Mejora: ajuste de líneas (wrapping) en el editor de código.
- Posibilidad de definir una lista de protocolos de enlace permitidos.
- Nueva experiencia de usuario para la navegación con pestañas horizontales.
- Posición configurable del botón de reseteo para filtros de tabla y gestor de columnas.
- [4.x] Evaluación de closures en `TimezoneManager`.
- [v4] Nueva API `headerTooltip()` para columnas de tabla.
- [4.x] Soporte de alineación vertical en `Repeater\TableColumn`.
- Traducciones completas al persa (fa).
- Nueva API `persistColumnsInSession()` para persistir columnas en sesión.
- Exponer el recuento de registros de la tabla.
- Corrección: teletransporte de grupos en la topbar.
- Reañadida la posibilidad de desactivar notificaciones.
- Funcionalidad: componente `Select` ahora soporta ordenación (sortable).
- Corrección: salto de maquetación del logo de la topbar cuando la sidebar es colapsable.

**Contribuidores nuevos:** @johankrijt, @HichemTab-tech, @lucacastelnuovo, @hans-thomas, @giacomomasseron, @thomasLecler, @osbre, @nathanheffley

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.2.4)

---

## [v4.2.3] - 20 Nov 2025

### ✨ Cambios
- Corrección: Traducciones en jemer (Khmer).
- Corrección: Colores de gráficos al cambiar de tema.
- Actualización: Dependencia `js-yaml` a `4.1.1` en assets de screenshots de la documentación.
- [4.x] Soporte para `hiddenOn` y `visibleOn` en resúmenes de tabla (summarizers).
- Asegurar que el tipo MIME real se envíe como cabecera por defecto.
- Documentación: corregido el ejemplo de `$isLazy` en la sección de carga diferida de widgets.
- Corrección: soporte de iconos `Htmlable`.
- Corrección: se elimina `toLowerCase` en la query de `handleSearch` en `select.js`.
- Documentación: varios typos corregidos.
- Documentación: añadido apartado "Publishing configuration" al manual de instalación.
- Actualización de la dependencia `pragmarx/google2fa` a `^9.0`.
- [v4] Corrección: acción de exportación fuera del contexto de tabla.

**Contribuidores nuevos:** @angkosal, @dxnter, @pddevins, @mechelon

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.2.3)

---

## [v4.2.2] - 14 Nov 2025

### ✨ Cambios
- Actualización: variable de entorno para el disco por defecto en la documentación / ejemplo.
- Corrección: evitar que el checkbox se "aplaste" cuando la etiqueta ocupa varias líneas.
- Corrección: `QueryBuilder` sin cláusula `from`.
- Corrección: al mover el `builder` hacia atrás se descolocaba el botón central de añadir.
- Se vuelve a añadir soporte para iconos `Htmlable`.
- Corrección: el menú de usuario se puede desplegar con teclado.
- Corrección: búsqueda y ordenación sobre la misma relación en tablas.
- Mejora: uso de CPU al desactivar botones de la toolbar.

**Contribuidores nuevos:** @chaseconey, @jobara

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.2.2)

---

## [v4.2.1] - 11 Nov 2025

### ✨ Cambios
- No mostrar el gestor de columnas cuando no hay columnas ni grupos de columnas.
- Permitir `pragmarx/google2fa` ^9.0.
- Corrección: deprecación en `ExportCsv`.
- Añadidas traducciones SK/CZ faltantes.
- Añadidas traducciones japonesas faltantes.
- Corrección: `Repeater::persistCollapsed()`.
- Manejo seguro de notificaciones `null` (failsafe) al obtener notificaciones.
- i18n: actualización de traducciones al serbio.
- Actualización de traducciones vietnamitas en `packages/forms`.
- Implementar scroll hasta la etiqueta seleccionada en sugerencias de merge tags.
- Corrección: relación de aspecto de altura de gráficos fijada en 1.5 en todos los tipos de gráfico.
- Corrección de typo en callback de `createAnotherAction`.
- Corrección: polling y reordenación en el gestor de columnas.
- [4.x] Mejora de utilidad `$get`.
- [4.x] Nuevo método `extraRecordLinkAttributes()` para personalizar enlaces a registros.
- Funcionalidad: permitir incluir sólo las columnas visibles de la tabla en exportaciones.
- Soporte de enums en exportaciones.
- [4.x] Soporte de casos de enum en parámetros de reglas de validación.
- Añadida traducción ucraniana faltante.
- [v4 Docs] Actualizado el namespace en el primer ejemplo de la página de overview de esquemas.
- [4.x] Añadidas Boost Guidelines.
- Actualización de la etiqueta de paginación en las traducciones japonesas.
- Optimización: early returns en métodos con `ExposedLivewireMethod` en `BaseFileUpload`.
- Corrección: altura de widgets de estadísticas.

**Contribuidores nuevos:** @ukeloop, @vasi-rus, @hoangnamitc, @nijholt, @leek, @jovialcore

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.2.1)

---

## [v4.2.0] - 02 Nov 2025

### ✨ Cambios
- Nuevo paquete: `filament/query-builder`.
- Traducciones al holandés para herramientas de grid.
- Ocultar el botón de adjuntar archivos en la toolbar cuando los adjuntos están deshabilitados.
- Evitar errores de referencia `null` cuando los atajos de teclado se disparan tras eliminar un elemento.
- Soporte para enum `TextSize` según la documentación.
- Añadida propiedad CSS `scrollbar-gutter` a la clase `fi`.
- Mejora de traducciones `lus`.
- Documentación: aclarar uso de Tailwind CSS en la documentación de plugins.
- Corrección de estilos de ítems en dropdown.
- Incluir locale `lus` en `file-upload.js`.
- Corrección: deprecación en `CreateXlsxFile`.
- Corrección: deprecación en `Writer::createFromFileObject`.
- Documentación: añadir `viewData()` para componentes personalizados.
- Corrección: error `Could not find Livewire component in DOM tree` en rich editor añadiendo método `destroy()`.
- Documentación: tipo de componente en documentación de tests de esquema.
- Corrección: bucle infinito cuando varios `$get()` leen estado de componentes inexistentes al calcular esquemas hijos dinámicos.
- Mejora: reenfoque de campos de formulario.
- [4.x] Mejora: separadores de miles en los números de paginación.
- Documentación: enlace corregido a la página de pruebas de esquemas.
- Mejora visual: orden de fusión de herramientas en el editor.
- Corrección: fondo inconsistente en grupos fusionados.
- [v4] Documentación: enlaces a interfaces de color e icono en enums corregidos.
- Refactor: manejo del esquema de widgets en `Page.php`.
- [4.x] Eliminado `wire:ignore` de la subnavegación de la sidebar.
- Añadida clase CSS para notificaciones leídas.
- Corrección: estado activo en herramientas de encabezado del rich editor por defecto.
- Mejora: mayor separación visual para cabeceras de grupos en selects.
- Corrección: claves heredables en `Repeater`.
- Corrección: valores duplicados `int` al seleccionar todos los elementos de una `CheckboxList`.

**Contribuidores nuevos:** @aqjw, @rohanAdhikari1

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.2.0)

---

## [v4.1.10] - 21 Oct 2025

### ✨ Cambios
- Corrección de problema RTL en el código de un solo uso (one time code).
- Posibilidad de renderizar `ActionGroup::buttonGroup` con acciones/grupos combinados.
- Añadidas traducciones eslovenas para el paquete de soporte.
- Corrección: tipos incompatibles para el logo de marca.
- Actualizar `defaultSortKey` para ordenar en la misma dirección que la columna principal.
- Refactor: actualizar archivos de idioma bengalí para mayor consistencia.
- Pruebas: importar la fachada `Event` usada en el test "can save".
- Actualización de traducciones en `fa/infolist.php`.
- Funcionalidad: ocultar título en el encabezado (`header hide title`).
- Corrección: espaciado y visibilidad de acciones intermedias en `Builder`.
- Corrección: rellenar el estado por defecto en formularios de bloques personalizados del rich editor.
- Actualización de traducciones al español.
- Documentación: corregida la documentación de `$get()` en repetidores.
- Corrección: alinear badges de texto con alineación media para un mejor layout.
- Añadida traducción holandesa para `uploading_file_message`.
- Permitir activar/desactivar subida de archivos en `RichEditor` y `MarkdownEditor` mediante `->fileAttachments(...)`.
- Corrección: evaluación de `hint`.
- Documentación: enlaces rotos y desactualizados corregidos.
- Dependencias: actualización de `vite` de 6.3.6 a 6.4.1 en `docs-assets/app`.
- Añadidas traducciones holandesas faltantes para validaciones de subida de archivos.
- Añadido tipo de retorno booleano en traducciones persas.
- Soporte para arrays de patrones de rutas en ítems de navegación.
- Corrección: acciones de sección de relaciones.

**Contribuidores nuevos:** @derpoho, @natecarlson, @imhayatunnabi, @matt-h, @pankajXdev

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.10)

---

## [v4.1.9] - 15 Oct 2025

### ✨ Cambios
- Documentación: Opciones de diseño gap y dense.

### 🐛 Correcciones
- Corrección: Elementos del menú no se ordenan correctamente por su valor de orden.
- Corrección: Visibilidad de filtros AboveContent.
- Corrección: Notificación en reenvío de MFA por email.
- Corrección: Componente code-editor ahora soporta live onBlur y debounce.

**Contribuidores nuevos:** @helturkey

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.9)

---

## [v4.1.8] - 14 Oct 2025

### ✨ Cambios
- Traducciones al polaco faltantes.
- Mejoras en traducciones al indonesio.
- Añadido locale esloveno (sl) al componente date-time-picker.
- Funcionalidad: Filtros antes/después del contenido de la tabla.

### 🐛 Correcciones
- Corrección: isSticky indefinido.
- Corrección: getSelectedTableRecordsQuery().
- Corrección: Limpieza de bloques if redundantes.
- Corrección: Problemas de fusión para extensiones Placeholder.
- Corrección: Fondo de notificaciones en modo oscuro.
- Corrección: Elementos de navegación hijos en sub-navegación no se muestran correctamente cuando la navegación principal está colapsada.
- Corrección: Zoom predeterminado en rich editor en iOS Safari.
- Corrección: Helpers de prueba para modales de acciones montadas.
- Corrección: Campos JSON anidados se rompen con métodos helper/accessor del mismo nombre en el modelo.
- Corrección: Relación anidada en componente de esquema no se guarda durante la creación.

**Contribuidores nuevos:** @kvnyhns, @thijskuilman, @c0dehunter, @caseydwyer, @MarkKremer

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.8)

---

## [v4.1.7] - 12 Oct 2025

### ✨ Cambios
- Traducciones faltantes en italiano para widgets.
- Permitir cambiar la alineación de acciones en un componente Page.
- Añadida colocación automática de dropdown.
- Pasar archivo subido a propiedades personalizadas.
- Añadida propiedad globalSearchSort para controlar el orden de recursos en búsqueda global.
- Mejora en acciones de esquema sticky combinadas con acciones alineadas al final.

### 🐛 Correcciones
- Corrección: Codificar URL del parámetro background en UiAvatarsProvider.
- Corrección: Manejo de verificación de tipo de estado para permitir array en SpatieTagsColumn.
- Corrección: Traducción italiana en actions/delete.php.
- Corrección: Cambiar tipo de $activeNavigationIcon en la documentación para incluir BackedEnum.
- Corrección: Permitir HTML en tooltip si el usuario usa explícitamente la interfaz Htmlable.
- Corrección: Mejorar manejo de enteros en OptionsArrayStateCast y OptionStateCast.
- Corrección: Convertir estado de CodeEntry a array para colecciones.
- Corrección: Toggle-button requiere doble clic cuando el modal está inicialmente enfocado.
- Corrección: Ajustar lógica de eliminación para registros específicos de grupo en repeater.
- Corrección: Deshabilitar adjuntos de archivos en rich editor.
- Corrección: Pruebas de repeater anidado.
- Corrección: Función de opciones de filtro Select.
- Corrección: Select relationship() createOptionForm() withAttributes().
- Corrección: Resúmenes de tabla con datos personalizados.

**Contribuidores nuevos:** @claudiocenghialta, @alnahian2003, @priithansen, @alancolant, @fblaser

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.7)

---

## [v4.1.6] - 08 Oct 2025

### 🐛 Correcciones
- Correcciones menores en el diseño de tablas.

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.6)

---

## [v4.1.5] - 08 Oct 2025

### ✨ Cambios
- Traducciones faltantes en CZ/SK.
- Añadido lenguaje SQL faltante para code-editor.

### 🐛 Correcciones
- Corrección: Problemas de posicionamiento y z-index en Dropdown y Select.
- Corrección: Gráficos con altura máxima establecida no deben tener relación de aspecto.
- Corrección: Problemas de desbordamiento en filtros select sobre la tabla.

**Contribuidores nuevos:** @ahmedfawky

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.5)

---

## [v4.1.4] - 07 Oct 2025

### ✨ Cambios
- Traducciones al holandés para componentes relacionados con grid en formularios.
- Despachar eventos durante el ciclo de vida del registro (Created, Creating, Saved, Saving) y añadir pruebas relacionadas.
- Mejorar la responsividad del query builder usando container queries.
- Ocultar icono de hamburguesa cuando no es necesario.

### 🐛 Correcciones
- Corrección: Error parseHTML en DetailsContentExtension.php.
- Corrección: Límite de opciones precargadas en MorphToSelect.
- Corrección: Mejorar aún más la UI del query builder.
- Corrección: Altura máxima del widget de gráfico.
- Corrección: Ordenamiento y agrupación de relaciones con valores null.

**Contribuidores nuevos:** @ruud-sibi, @ropi-bc

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.4)

---

## [v4.1.3] - 06 Oct 2025

### ✨ Cambios
- Añadidas traducciones restantes en pt_BR.
- Añadidas traducciones faltantes en holandés para el menú de búsqueda de tenant.

### 🐛 Correcciones
- Corrección: Tipo de parámetro para método livewireComponents.
- Corrección: Entrada de traductores PT_BR para Saade.

**Contribuidores nuevos:** @zerossB, @Saracaen

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.3)

---

## [v4.1.2] - 06 Oct 2025

### ✨ Cambios
- Permitir que select sea buscado sin abrir el dropdown manualmente.
- Permitir que el menú de tenant sea buscable.
- Añadir toggle all columns para pruebas.
- Posición personalizable de búsqueda global, notificaciones de base de datos y menú de usuario.
- Añadidas traducciones árabes faltantes para componentes de formulario.
- Añadido método onlyAllowGroupSelection() para selección masiva solo de grupos.
- Definir acciones de esquema en closure.
- Deshabilitar encabezados de elementos de builder repeater.
- Mejor UX del query builder.
- Ajustar el CSS de entrada para tamaños de texto responsivos en dispositivos móviles.

### 🐛 Correcciones
- Corrección: Fuga de fondo de badge de acción.
- Corrección: Ordenamiento de relación anidada.
- Corrección: Resaltado doble de navegación en sidebar.
- Corrección: Actualización de estado JS en vivo.
- Corrección: Manejo de enum en aserciones de estado de columna de tabla.
- Corrección: Rutas de estado de validación relativas.
- Corrección: Grid responsivo de prose.
- Corrección: Pasar registro a vista de columna de tabla.
- Corrección: Convertir estado después de cargar desde relaciones.
- Mejorar rendimiento de esquema, especialmente en repeaters/builders.
- Corrección: Renderizar actualizaciones rápidas de estado de select.
- Corrección: Registro de acción de entrada repetible.
- Corrección: Comportamiento de modal al cerrar.
- Corrección: Fusión de plugins de rich editor.
- Corrección: Atajos de teclado de wire navigate.
- Corrección: Animaciones de filas ordenables de tabla.
- Corrección: Columna de tabla copiable sin contenido.
- Corrección: Parpadeo de estilo deshabilitado del botón de toolbar de tabla.
- Corrección: Proteger EmailVerificationPrompt para invitados (redirigir o 403).
- Corrección: Dropdown de tenant ahora se muestra correctamente en Safari.
- Corrección: Acciones dentro de componentes sin claves heredables.
- Corrección: Clic en columna de checkbox.
- Corrección: Rich editor causa desbordamiento de página.

**Contribuidores nuevos:** @clarkewing, @Luk4veck1, @jonerickson, @kerimala, @Fludem, @vinkla

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.2)

---

## [v4.1.1] - 03 Oct 2025

### ✨ Cambios
- Añadidas clases helper de animación de Filament.
- Actualización de traducciones al español para Filament 4.1.
- Añadidas traducciones faltantes en armenio.
- Añadidas traducciones faltantes en japonés para página de perfil.

### 🐛 Correcciones
- Corrección: Enlace roto eliminando .html de la URL de instalación de Laravel Spark.
- Corrección: Typo en documentación de resources overview.
- Corrección: Realizar comparación antes de invocar afterStateUpdatedJs.
- Corrección: Manejo de formato de DateTimePicker nativo para date-time sin segundos.
- Corrección: Cmd click de SPA para abrir en nueva ventana.
- Corrección: Altura responsiva de gráfico.
- Corrección: Permitir relaciones personalizadas con tenant.
- Corrección: Métodos de modelo que chocan con nombres de atributos.

**Contribuidores nuevos:** @krudi, @GoodM4ven, @maru0914

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.1)

---

## [v4.1.0] - 01 Oct 2025

### 🎉 Nueva versión menor de Filament v4.1

> 📖 Lee el [post de anuncio en el blog](https://filamentphp.com/blog) para conocer las nuevas funcionalidades favoritas del equipo.

### ✨ Cambios y nuevas funcionalidades

#### Tablas y Columnas
- Soporte para HTML en etiquetas de filtros de tabla.
- Añadido render hook para celdas de encabezado de tabla.
- Soporte para agrupación colapsada por defecto en registros de tabla.
- Formateo de números de paginación para coincidir con resultados totales.
- Corrección: Exportación CSV para Postgres cuando la tabla está ordenada por columna relacionada.
- Corrección: Alineación de tooltip en columnas/entradas de texto.
- Corrección: Propagación de eventos en columnas de tabla interactivas y clics anidados con wire:navigate.
- Corrección: Exportación con límite en query.

#### Formularios y Componentes
- Funcionalidad: Estado vacío (empty state).
- Funcionalidad: Añadido diseño de tabla para RepeatableEntry y componente TableColumn.
- Corrección: Excepción al usar hasBlockPreviews en componente Builder.
- Corrección: Visibilidad de Flex JS.
- Corrección: Ajustar contenedor de campo select para alineación adecuada de etiqueta inline.
- Corrección: Ajustar estilos del contenedor de imagen del editor de carga de archivos para mejorar diseño y espaciado.
- Restaurar funcionalidad de color de icono de hint.

#### Recursos y Páginas
- Funcionalidad: Genéricos de página de recursos.
- Corrección: Configuración de ancho máximo de página simple.
- Corrección: Error cuando solo los recursos están configurados para multi-tenancy y el usuario autenticado no tiene tenant.

#### Navegación y UI
- Menú de usuario y búsqueda en sidebar cuando topbar está deshabilitado.
- Mover carga de navegación dentro del condicional para navegación superior.
- Corrección: Problemas de throttling de navegación del navegador.
- Corrección: Estado de historial.

#### Traducciones
- Actualización de traducciones en lus.
- Actualización de traducciones en griego (el) para tablas.
- Añadidas traducciones faltantes en francés.
- Añadidas traducciones de Filament Forms para zh-CN, zh-TW, zh-HK.
- Actualización de request-password-reset.php.

#### Documentación
- Actualización de documentación de pruebas de acciones de formulario con nueva clave form-actions.
- Corrección: Typo en documentación.
- Corrección: Namespace de ColorColumn en documentación.
- Actualización de 02-listing-records.md.

#### Mejoras técnicas
- Laravel Eloquent: La clase Builder no tiene método getLimit(), ahora usa getQuery()->limit.
- Corrección: No obtener etiquetas de opciones para estado en blanco.

**Contribuidores nuevos:** @mpas97, @venkat201-cpu, @GeminiDev1, @Christos-Papoulas, @bifo90, @bstanley-pec

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.1.0)

---

## [v4.0.20] - 30 Sep 2025

### 🐛 Correcciones
- Corrección: Permitir que el menú de búsqueda de tenant sea buscable
- Corrección: Problemas de navegación SPA

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.20)

---

## [v4.0.19] - 26 Sep 2025

### ✨ Cambios
- Añadir traducciones faltantes en alemán
- Añadir traducciones faltantes en holandés

### 🐛 Correcciones
- Corrección: Problemas de renderizado de tabla con agrupación
- Corrección: Problemas de estado de filtros de tabla
- Corrección: Problemas de validación en campos condicionales

**Contribuidores:** @steffjenl

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.19)

---

## [v4.0.18] - 18 Sep 2025

### ✨ Cambios
- [4.x] Característica: Añadir opción compacta a table repeater 
- Añadir render hooks de acción
- característica(tablas): añadir scrollToTop() para auto-scroll después de paginación
- [4.x] característica: Añadidas tres nuevas funciones a SpatieMediaLibraryFileAttachmentProvider para personalizar media y sus atributos
- [4.x] Característica: Añadir RawHtmlMergeTagExtension para renderizar merge tags HTML sin escapar en rich editor
- característica(auth): añadir atributos de autocompletado a inputs de formulario

### 🐛 Correcciones
- Actualizar traducciones faltantes en español
- Corrección: Convertir estado de select a int
- Corrección: Usar getAuthPasswordName() y getRememberTokenName() en lugar de nombres de campo hardcodeados
- Corrección: desactivar propiedad contain para modales con editor de carga de archivos

**Contribuidores nuevos:** @saschaende, @nguyentranchung

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.18)

---

## [v4.0.17] - 17 Sep 2025

### ✨ Cambios
- Permitir html en etiqueta y título de agrupación de tabla
- Hacer visible TextInput tipo range
- Validación de tipo mime y tamaño de archivo

### 🐛 Correcciones
- Corrección: Atributos de rich editor de relación de tabla
- Corrección: Query builder diferido
- Corrección: Renderizar parcialmente formulario de filtros diferidos después de usar acción
- Corrección: Fusionar argumentos de acción sin sobrescribir
- Corrección: manejar alias 'as' en orderBy correctamente en componente Select
- docs: Corrige error de sintaxis

**Contribuidores nuevos:** @f-liva

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.17)

---

## [v4.0.16] - 16 Sep 2025

### ✨ Cambios
- [4.x] Añadir números de ítem en repeater

### 🐛 Correcciones
- Corrección: transición de ocultación de notificación para usar visibility en lugar de opacity
- Corrección: Invertir desplegables de grupo de acciones
- Corrección: Compatibilidad de enum en conversión de estado de cadena
- Corrección: Atributos de contenido enriquecido en blanco y de relación

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.16)

---

## [v4.0.15] - 15 Sep 2025

### 🐛 Correcciones
- Corrección: Problemas de conversión de estado

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.15)

---

## [v4.0.14] - 15 Sep 2025

### 🐛 Correcciones
- Corrección: Argumentos de acciones en pruebas
- Corrección: Grupo fusionado con columnas predeterminadas
- Corrección: Posición predeterminada del desplegable del grupo de acciones antes de las columnas de la tabla
- Corrección: Convertir de forma consistente los valores de select a cadenas
- Corrección: Clave de registro faltante
- Corrección: Tab `hiddenJs()`
- Corrección: Divisores de filas de contenido de la tabla
- Corrección: Enlaces de dominio de tenant
- Corrección: añadir claves de traducción rusas faltantes
- Corrección: añadir clave de traducción ucraniana faltante

**Contribuidores nuevos:** @toxageek

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.14)

---

## [v4.0.13] - 14 Sep 2025

### ✨ Cambios
- Traducción al español actualizada - `form.components.php`.
- Usar `state snapshot` para repetidores y constructores.
- Renderizar html en administrador de columna.
- Mas detalles añadidos a la sección de orden de registros.
- No invierta los menús desplegables del administrador de filtros y columnas.
- Agregar clase de formulario faltante a un ejemplo de recursos singulares.

### 🐛 Correcciones
- Corrección: Agrupando cuando `getTitleFromRecordUsing` contiene HtmlString.
- Corrección: Representación parcial de componentes de esquema ocultos.
- Corrección: Actualización infinita del selector de fecha y hora reactivo no nativo.
- Corrección: Eliminar la lógica de rotación del botón de colapso de la barra lateral.
- Corrección: Acción resolver registro cuando el componente tiene relación.
- Corrección: Acción de registro en encabezado de tabla.
- Corrección: Permitir a `RichEditor` trabajar sin registrar atributos ricos en contenido.
- Corrección: Relaciones de esquema anidados.
- Corrección: Inyección de registros en columnas de tablas.
- Corrección: Convertir estado de cadena vacía a nulo antes.
- Corrección: Ocultar columnas de tabla de forma responsiva.

**Contribuidores nuevos:** @ahsanmahmood09 @tedstein @ace-of-aces

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.13)

---

## [v4.0.12] - 12 Sep 2025

### 🐛 Correcciones
- Revertir: "Corrección: orden alfabético por defecto en grupo de navegación".

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.12)

---

## [v4.0.11] - 12 Sep 2025

### ✨ Cambios
- Permite enlaces relativos en `RichEditor` `LinkAction`.
- Traducción al ucraniano en Componentes Formulario.
- Documentación: Renombrar fileAttachmentsProvider para contenido rico en la documentación.

### 🐛 Correcciones
- Corrección: Compartiendo filtros de tabla aplazados a widgets.
- Corrección: Nombre de esquema de prueba por defecto en páginas con formularios.
- Corrección: Prueba de editor rico con HTML.
- Corrección: Prueba de recurso anidado.
- Corrección: Orden alfabético por defecto en grupo de navegación.
- Corrección: Componente `TextEntry` no muestra información relacionada en la edición.
- Corrección: `defaultKeySort` no trabaja como se esperaba.

**Contribuidores nuevos:** @alwayshopeless @salamwaddah

[Ver changelog completo en GitHub](https://github.com/filamentphp/filament/releases/tag/v4.0.11)

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
