# 📦 Changelog en Español - Filament v4

Este archivo contiene la **traducción no oficial** de los cambios publicados en el repositorio oficial de [FilamentPHP](https://github.com/filamentphp/filament/releases).  

> ⚠️ **Aviso importante**: Esta traducción es realizada de forma comunitaria y no tiene carácter oficial.  
> La fuente de verdad siempre será el repositorio oficial de Filament.  
> Consulta siempre el changelog original para confirmar detalles técnicos.

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
