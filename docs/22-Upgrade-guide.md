---
title: Guía de actualización
---

:::info
    Si ve que falta algo en esta guía, no dude en [realizar una solicitud de extracción](https://github.com/filamentphp/filament/edit/4.x/docs/14-upgrade-guide.md) a nuestro repositorio. ¡Se agradece cualquier ayuda!
:::

## Nuevos requisitos

-PHP 8.2+
- Laravel v11.28+
- Tailwind CSS v4.0+, si actualmente estás usando Tailwind CSS v3.0 con Filament. Esto no se aplica si solo estás usando un panel Filament sin un archivo CSS de tema personalizado.
- El filamento ya no requiere `doctrine/dbal`, pero si tu aplicación aún lo requiere y no la tienes instalada directamente, debes agregarla a tu archivo `composer.json`.

## Ejecutando el script de actualización automatizada

:::info
    El script de actualización no reemplaza la guía de actualización. Maneja muchos cambios pequeños que no se mencionan en la guía de actualización, pero no maneja todos los cambios importantes. Aún así debes leer los [pasos de actualización manual](#cambios-importantes-que-deben-manejarse-manualmente) para ver qué cambios necesitas realizar en tu código.
:::

:::info
    Es posible que algunos complementos que estás utilizando no estén disponibles en la versión 4 todavía. Puede eliminarlos temporalmente de su archivo `composer.json` hasta que se hayan actualizado, reemplazarlos con complementos similares que sean compatibles con v4, esperar a que se actualicen los complementos antes de actualizar su aplicación o incluso escribir relaciones públicas para ayudar a los autores a actualizarlos.
:::

El primer paso para actualizar su aplicación Filament es ejecutar el script de actualización automatizada. Este script actualizará automáticamente su aplicación a la última versión de Filament y realizará cambios en su código, que maneja la mayoría de los cambios importantes:

```bash
composer require filament/upgrade:"^4.0" -W --dev

vendor/bin/filament-v4

# Run the commands output by the upgrade script, they are unique to your app
composer require filament/filament:"^4.0" -W --no-update
composer update
```

:::warning
    Cuando utilice Windows PowerShell para instalar Filament, es posible que necesite ejecutar el siguiente comando, ya que ignora `^` caracteres en las restricciones de versión:

```bash
    composer require filament/upgrade:"~4.0" -W --dev

    vendor/bin/filament-v4

    # Run the commands output by the upgrade script, they are unique to your app
    composer require filament/filament:"~4.0" -W --no-update
    composer update
    ```
:::

:::warning
    Si falla la instalación del script de actualización, asegúrese de que su versión de PHPStan sea al menos v2, o su versión de Larastan sea al menos v3. El script utiliza Rector v2, que requiere PHPStan v2 o superior.
:::

Asegúrese de seguir cuidadosamente las instrucciones y revisar los cambios realizados por el script. Es posible que tengas que realizar algunos cambios manuales en tu código posteriormente, pero el script debería encargarse de la mayor parte del trabajo repetitivo por ti.

Filament v4 introduce una nueva estructura de directorios predeterminada para sus recursos y clústeres de Filament. Si está utilizando paneles Filament con recursos y clústeres, puede optar por mantener la estructura de directorios anterior o migrar a la nueva. Si desea migrar a la nueva estructura de directorios, puede ejecutar el siguiente comando:

```bash
php artisan filament:upgrade-directory-structure-to-v4 --dry-run
```

La opción `--dry-run` le mostrará qué haría el comando sin realizar ningún cambio. Si está satisfecho con los cambios, puede ejecutar el comando sin la opción `--dry-run` para aplicar los cambios:

```bash
php artisan filament:upgrade-directory-structure-to-v4
```

:::warning
    Este script de actualización de directorio no puede actualizar perfectamente ninguna referencia a clases en el mismo espacio de nombres que estaban presentes en los archivos de recursos y de clúster, y esas referencias deberán actualizarse manualmente después de que se haya ejecutado el script. Debe utilizar herramientas como [PHPStan](https://phpstan.org) para identificar referencias a clases que no funcionan después de la actualización.
:::

Ahora puedes `composer remove filament/upgrade --dev` ya que ya no lo necesitas.

## Publicar el archivo de configuración

Algunos cambios en Filament v4 se pueden revertir utilizando el archivo de configuración. Si aún no ha publicado el archivo de configuración, puede hacerlo ejecutando el siguiente comando:

```bash
php artisan vendor:publish --tag=filament-config
```

En primer lugar, `default_filesystem_disk` en v4 se establece en la variable `FILESYSTEM_DISK` en lugar de `FILAMENT_FILESYSTEM_DISK`. Para preservar el comportamiento de la v3, asegúrese de utilizar esta configuración:

```php
return [

    // ...

    'default_filesystem_disk' => env('FILAMENT_FILESYSTEM_DISK', 'public'),

    // ...

]
```

v4 introduce algunos cambios en la forma en que Filament genera archivos. Se agregó una nueva sección `file_generation` al archivo de configuración v4, para que pueda volver al estilo v3 si desea mantener el código nuevo consistente con su aspecto antes de la actualización. Si su archivo de configuración aún no tiene una sección `file_generation`, debe agregarla usted mismo o volver a publicar el archivo de configuración y modificarlo a su gusto:

```php
use Filament\Support\Commands\FileGenerators\FileGenerationFlag;

return [

    // ...

    'file_generation' => [
        'flags' => [
            FileGenerationFlag::EMBEDDED_PANEL_RESOURCE_SCHEMAS, // Define new forms and infolists inside the resource class instead of a separate schema class.
            FileGenerationFlag::EMBEDDED_PANEL_RESOURCE_TABLES, // Define new tables inside the resource class instead of a separate table class.
            FileGenerationFlag::PANEL_CLUSTER_CLASSES_OUTSIDE_DIRECTORIES, // Create new cluster classes outside of their directories. Not required if you run `php artisan filament:upgrade-directory-structure-to-v4`.
            FileGenerationFlag::PANEL_RESOURCE_CLASSES_OUTSIDE_DIRECTORIES, // Create new resource classes outside of their directories. Not required if you run `php artisan filament:upgrade-directory-structure-to-v4`.
            FileGenerationFlag::PARTIAL_IMPORTS, // Partially import components such as form fields and table columns instead of importing each component explicitly.
        ],
    ],

    // ...

]
```

:::tip
    El paquete `filament/upgrade` incluye un comando para ayudarle a mover recursos del panel y clústeres a la nueva estructura de directorios, que es la predeterminada en v4:

```bash
    php artisan filament:upgrade-directory-structure-to-v4 --dry-run
    ```

La opción `--dry-run` le mostrará qué haría el comando sin realizar ningún cambio. Si está satisfecho con los cambios, puede ejecutar el comando sin la opción `--dry-run` para aplicar los cambios:

```bash
    php artisan filament:upgrade-directory-structure-to-v4
    ```

Este script de actualización de directorio no puede actualizar perfectamente ninguna referencia a clases en el mismo espacio de nombres que estaban presentes en los archivos de recursos y de clúster, y esas referencias deberán actualizarse manualmente después de que se haya ejecutado el script. Debe utilizar herramientas como [PHPStan](https://phpstan.org) para identificar referencias a clases que no funcionan después de la actualización.

Una vez que haya ejecutado el comando, no necesita mantener los indicadores `FileGenerationFlag::PANEL_CLUSTER_CLASSES_OUTSIDE_DIRECTORIES` o `FileGenerationFlag::PANEL_RESOURCE_CLASSES_OUTSIDE_DIRECTORIES` en su archivo de configuración, ya que la nueva estructura de directorios ahora es la predeterminada. Puede eliminarlos de la matriz `file_generation.flags`.
:::

## Cambios importantes que deben manejarse manualmente

### Cambios de alto impacto

<details open>
<summary>La visibilidad de archivos ahora es privada de forma predeterminada para discos no locales</summary>

Además de [el disco predeterminado se cambió a `local`](#publishing-the-configuration-file), la configuración de visibilidad de archivos para discos no locales (como `s3`, pero no `public` o `local`) en varios componentes se cambió a `private` en lugar de `public` de forma predeterminada. Esto significa que los archivos no son accesibles públicamente de forma predeterminada y es necesario generar una URL firmada temporal para acceder a ellos. Este cambio afecta a los siguientes componentes:

- `FileUpload` campo de formulario, incluido `SpatieMediaLibraryFileUpload`
- `ImageColumn` columna de la tabla, incluyendo `SpatieMediaLibraryImageColumn`
- `ImageEntry` entrada de infolista, incluido `SpatieMediaLibraryImageEntry`

:::tip
    Si usa un disco no local como `s3`, puede conservar el comportamiento predeterminado anterior en toda su aplicación agregando el siguiente código en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
    use Filament\Forms\Components\FileUpload;
    use Filament\Infolists\Components\ImageEntry;
    use Filament\Tables\Columns\ImageColumn;
    
    FileUpload::configureUsing(fn (FileUpload $fileUpload) => $fileUpload
        ->visibility('public'));
    
    ImageColumn::configureUsing(fn (ImageColumn $imageColumn) => $imageColumn
        ->visibility('public'));
    
    ImageEntry::configureUsing(fn (ImageEntry $imageEntry) => $imageEntry
        ->visibility('public'));
    ```
:::

</details>

<details open>
<summary>Los temas personalizados deben actualizarse a Tailwind CSS v4</summary>

Anteriormente, los archivos CSS de temas personalizados contenían lo siguiente:

```css
@import '../../../../vendor/filament/filament/resources/css/theme.css';

@config 'tailwind.config.js';
```

Ahora, deberían contener esto:

```css
@import '../../../../vendor/filament/filament/resources/css/theme.css';

@source '../../../../app/Filament';
@source '../../../../resources/views/filament';
```

Esto cargará Tailwind CSS. Las entradas `@source` le indican a Tailwind dónde encontrar las clases que se utilizan en su aplicación. Debe verificar las rutas `content` en su antiguo archivo `tailwind.config.js` y ​​agregarlas como entradas `@source` como esta. **No** necesita incluir `vendor/filament` como `@source`, pero verifique los complementos que haya instalado para ver si requieren entradas `@source`.

Finalmente, debe usar la [herramienta de actualización de Tailwind] (https://tailwindcss.com/docs/upgrade-guide#using-the-upgrade-tool) para ajustar automáticamente sus archivos de configuración para usar Tailwind v4 e instalar los paquetes de Tailwind v4 para reemplazar los de Tailwind v3:

```bash
npx @tailwindcss/upgrade
```

El archivo `tailwind.config.js` para su tema ya no se usa, ya que Tailwind CSS v4 define [configuración en CSS](https://tailwindcss.com/docs/adding-custom-styles). Cualquier personalización que haya realizado en el archivo `tailwind.config.js` debe agregarse al archivo CSS.

</details>

<details open>
<summary>Los cambios en los filtros de la tabla se posponen de forma predeterminada</summary>

El método `deferFilters()` de Filament v3 es ahora el comportamiento predeterminado en Filament v4, por lo que los usuarios deben hacer clic en un botón antes de que se apliquen los filtros a la tabla. Para deshabilitar este comportamiento, puede utilizar el método `deferFilters(false)`.

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->deferFilters(false);
}
```

:::tip
    Puede conservar el antiguo comportamiento predeterminado en toda su aplicación agregando el siguiente código en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
    use Filament\Tables\Table;

    Table::configureUsing(fn (Table $table) => $table
        ->deferFilters(false));
    ```
:::

</details>

<details open>
<summary>Los componentes de diseño `Grid`, `Section` y `Fieldset` ahora no abarcan todas las columnas de forma predeterminada</summary>

En v3, los componentes de diseño `Grid`, `Section` y ​​`Fieldset` consumieron todo el ancho de su cuadrícula principal de forma predeterminada. Esto era inconsistente con el comportamiento de todos los demás componentes de Filament, que solo consume una columna de la cuadrícula de forma predeterminada. La intención era hacer que estos componentes fueran más fáciles de integrar en el formulario de recursos predeterminado de Filament y en la infolista, que utiliza una cuadrícula de dos columnas lista para usar.

En v4, los componentes de diseño `Grid`, `Section` y ​​`Fieldset` ahora solo consumen una columna de la cuadrícula de forma predeterminada. Si desea que abarquen todas las columnas, puede utilizar el método `columnSpanFull()`:

```php
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;

Fieldset::make()
    ->columnSpanFull()
    
Grid::make()
    ->columnSpanFull()

Section::make()
    ->columnSpanFull()
```

:::tip
    Puede conservar el antiguo comportamiento predeterminado en toda su aplicación agregando el siguiente código en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
    use Filament\Schemas\Components\Fieldset;
    use Filament\Schemas\Components\Grid;
    use Filament\Schemas\Components\Section;

    Fieldset::configureUsing(fn (Fieldset $fieldset) => $fieldset
        ->columnSpanFull());

    Grid::configureUsing(fn (Grid $grid) => $grid
        ->columnSpanFull());

    Section::configureUsing(fn (Section $section) => $section
        ->columnSpanFull());
    ```
:::

</details>

<details open>
<summary>El comportamiento de la regla de validación `unique()` para ignorar registros de Eloquent</summary>

En v3, el método `unique()` no ignoró el registro Eloquent del formulario actual al validar de forma predeterminada. Este comportamiento se habilitó mediante el parámetro `ignoreRecord: true` o pasando un registro `ignorable` personalizado.

En v4, el parámetro `ignoreRecord` del método `unique()` tiene como valor predeterminado `true`.

Si anteriormente estaba usando la regla de validación `unique()` sin los parámetros `ignoreRecord` o `ignorable`, debe usar `ignoreRecord: false` para deshabilitar el nuevo comportamiento.

:::tip
    Puede conservar el antiguo comportamiento predeterminado en toda su aplicación agregando el siguiente código en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
    use Filament\Forms\Components\Field;

    Field::configureUsing(fn (Field $field) => $field
        ->uniqueValidationIgnoresRecordByDefault(false));
    ```
:::

</details>

<details open>
<summary>La opción de página de paginación `all` no está disponible para tablas de forma predeterminada</summary>

El método de página de paginación `all` ahora no está disponible para tablas de forma predeterminada. Si quieres usarlo en una mesa, puedes agregarlo a la configuración:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->paginationPageOptions([5, 10, 25, 50, 'all']);
}
```

Tenga cuidado al utilizar `all` ya que causará problemas de rendimiento al tratar con una gran cantidad de registros.

:::tip
    Puede conservar el antiguo comportamiento predeterminado en toda su aplicación agregando el siguiente código en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
    use Filament\Tables\Table;

    Table::configureUsing(fn (Table $table) => $table
        ->paginationPageOptions([5, 10, 25, 50, 'all']));
    ```
:::

</details>

<details open>
<summary>El complemento traducible oficial de Spatie ahora está obsoleto</summary>

El año pasado, el equipo de Filament decidió entregar el mantenimiento del complemento traducible Spatie al equipo de [Lara Zeus](https://larazeus.com), quienes son desarrolladores confiables de muchos complementos de Filament. Desde entonces han mantenido una bifurcación del complemento.

El complemento traducible oficial de Spatie no recibirá soporte v4 y ahora está obsoleto. Puede utilizar el [Complemento traducible de Lara Zeus] (https://github.com/lara-zeus/spatie-translatable) como reemplazo directo. El complemento es compatible con la misma versión de Spatie Translatable que el complemento oficial y ha sido probado con Filament v4. También corrige algunos errores de larga data en el complemento oficial.

El [script de actualización automatizada](#running-the-automated-upgrade-script) sugiere comandos que desinstalan el complemento oficial e instalan el complemento Lara Zeus, y reemplaza cualquier referencia en su código al complemento oficial con el complemento Lara Zeus.

</details>

### Cambios de impacto medio

<details>
<summary>Estado del campo de enumeración</summary>

En v3, los campos que escribían en un atributo de enumeración en un modelo, como un campo `Select`, `CheckboxList` o `Radio` usando `options(Enum::class)`, devolverían de manera inconsistente el valor del campo como el valor de enumeración o la instancia de enumeración, dependiendo de si el campo fue modificado por última vez por el servidor o por el usuario. Esto no fue útil y había que verificar el tipo de valor devuelto por el campo para determinar si era un valor de enumeración o una instancia de enumeración.

En v4, el estado del campo siempre se devuelve como instancia de enumeración. Esto significa que siempre puedes usar los métodos de enumeración en el estado del campo. Si anteriormente no estaba manejando la posibilidad de que el estado del campo fuera una instancia de enumeración en su código, ahora debe hacerlo.

Los siguientes ejemplos de código ilustran cómo el estado del campo ahora puede devolver una instancia de enumeración:

```php
use App\Enums\Status;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;

Select::make('status')
    ->options(Status::class)
    ->afterStateUpdated(function (?Status $state) {
        // `$state` is now always an instance of `Status`, or `null` if the field is empty.
    });

TextInput::make('...')
    ->afterStateUpdated(function (Get $get) {
        // `$get('status')` is now always an instance of `Status`, or `null` if the field is empty.
    });

$data = $this->form->getState();
// `$data['status']` is now always an instance of `Status`, or `null` if the field is empty.
```

</details>

<details>
<summary>Los nombres de los parámetros de URL han cambiado</summary>

Filament v4 ha cambiado el nombre de algunos de los parámetros de URL que se utilizan en las páginas de recursos, para hacerlos más limpios en la URL y más fáciles de recordar:

- `activeRelationManager` ha cambiado de nombre a `relation` en Editar/Ver páginas de recursos.
- `activeTab` ha cambiado de nombre a `tab` en las páginas de recursos Listar/Administrar relaciones.
- `isTableReordering` ha cambiado de nombre a `reordering` en las páginas de recursos Listar/Administrar relaciones.
- `tableFilters` ha cambiado de nombre a `filters` en las páginas de recursos Listar/Administrar relaciones.
- `tableGrouping` ha cambiado de nombre a `grouping` en las páginas de recursos Listar/Administrar relaciones.
- `tableGroupingDirection` ha cambiado de nombre a `groupingDirection` en las páginas de recursos Listar/Administrar relaciones.
- `tableSearch` ha cambiado de nombre a `search` en las páginas de recursos Listar/Administrar relaciones.
- `tableSort` ha cambiado de nombre a `sort` en las páginas de recursos Listar/Administrar relaciones.

Para saber si está usando este parámetro en su código, intente buscar `'activeRelationManager' => ` (etc.) en su código y busque áreas donde esté usando `::getUrl()` u otro método para generar una URL con un parámetro.

</details>

<details>
<summary>Asociación y alcance global de arrendamiento automático</summary>

Cuando se usa el arrendamiento en v3, Filament solo realiza consultas de recursos al inquilino actual: para representar la tabla de recursos, resolver los parámetros de URL y obtener resultados de búsqueda globales. Hubo muchas situaciones en las que otras consultas en el panel no tenían un alcance predeterminado y el desarrollador tuvo que hacerlo manualmente. Si bien esta era una característica documentada, generó mucho trabajo adicional para los desarrolladores.

En v4, Filament aplica automáticamente el alcance de todas las consultas en un panel al inquilino actual y asocia automáticamente nuevos registros con el inquilino actual mediante eventos modelo. Esto significa que, en la mayoría de los casos, ya no es necesario realizar consultas manualmente ni asociar nuevos registros de Eloquent. Todavía hay algunos puntos importantes a considerar, por lo que la [documentación](users/tenancy#tenancy-security) se actualizó para reflejar esto.

</details>

<details>
<summary>El comportamiento del método `Radio` `inline()`</summary>

En v3, el método `inline()` coloca los botones de opción alineados entre sí y también alineados con la etiqueta al mismo tiempo. Esto es inconsistente con otros componentes.

En v4, el método `inline()` ahora solo coloca los botones de opción en línea entre sí, y no con la etiqueta. Si desea que los botones de opción estén alineados con la etiqueta, también puede utilizar el método `inlineLabel()`.

Si anteriormente usaba `inline()->inlineLabel(false)` para lograr el comportamiento v4, ahora puede simplemente usar `inline()`.

:::tip
    Puede conservar el antiguo comportamiento predeterminado en toda su aplicación agregando el siguiente código en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
    use Filament\Forms\Components\Radio;
    
    Radio::configureUsing(fn (Radio $radio) => $radio
        ->inlineLabel(fn (): bool => $radio->isInline()));
    ```
:::

</details>

<details>
<summary>Reintentos de trabajos de importación y exportación</summary>

En Filament v3, los trabajos de importación y exportación eran reintentos continuos durante 24 horas si fallaban, sin pausas entre intentos de forma predeterminada. Esto causó problemas a algunos usuarios, ya que no había un período de espera y los trabajos podían reintentarse demasiado rápido, lo que provocaba que la cola se inundara con trabajos que fallaban continuamente.

En la versión 4, se reintentan 3 veces con un retraso de 60 segundos entre cada reintento.

Este comportamiento se puede personalizar en las clases [importador](importar#personalizar-los-reintentos-de-trabajo-de-importación) y [exportador](exportar#personalizar-los-reintentos-de-trabajo-de-exportación).

</details>

### Cambios de bajo impacto

<details>
<summary>El parámetro `isSeparate` de `ImageColumn::limitedRemainingText()` y `ImageEntry::limitedRemainingText()` se ha eliminado</summary>

Anteriormente, los usuarios podían mostrar la cantidad de imágenes limitadas por separado en una pila de imágenes usando el parámetro `isSeparate`. Ahora se ha eliminado el parámetro y, si existe una pila, el texto siempre se apilará encima y no se separará. Si las imágenes no están apiladas, el texto estará separado.

</details>

<details>
<summary>El método `disableGrammarly()` del componente `RichEditor` ha sido eliminado</summary>

El método `disableGrammarly()` se eliminó del componente `RichEditor`. Este método se utilizó para deshabilitar la extensión del navegador Grammarly que actúa en el editor. Desde que trasladamos la implementación subyacente del editor de Trix a TipTap, no hemos encontrado una manera de desactivar Grammarly en el editor.

</details>

<details>
<summary>Anulación de los métodos `Field::make()`, `MorphToSelect::make()`, `Placeholder::make()` o `Builder\Block::make()`</summary>

La firma de los métodos `Field::make()`, `MorphToSelect::make()`, `Placeholder::make()` y ​​`Builder\Block::make()` ha cambiado. Cualquier clase que extienda la clase `Field`, `MorphToSelect`, `Placeholder` o `Builder\Block` y ​​anule el método `make()` debe actualizar la firma del método para que coincida con la nueva firma. La nueva firma es la siguiente:

```php
public static function make(?string $name = null): static
```

Esto se debe a la introducción del método `getDefaultName()`, que se puede anular para proporcionar un valor predeterminado `$name` si no se especifica ninguno (`null`). Si anteriormente estaba anulando el método `make()` para proporcionar un valor predeterminado `$name`, se recomienda que ahora anule el método `getDefaultName()`, para evitar una mayor carga de mantenimiento en el futuro:

```php
public static function getDefaultName(): ?string
{
    return 'default';
}
```

Si está anulando el método `make()` para pasar la configuración predeterminada al objeto una vez que se crea una instancia, tenga en cuenta que se recomienda anular el método `setUp()`, que se llama inmediatamente después de que se crea una instancia del objeto:

```php
protected function setUp(): void
{
    parent::setUp();

    $this->label('Default label');
}
```

Idealmente, debería evitar anular el método `make()` por completo, ya que existen alternativas como `setUp()`, y hacerlo hace que su código se vuelva frágil si Filament decide introducir nuevos parámetros de constructor en el futuro.

</details>

<details>
<summary>Anulación del método `Entry::make()`</summary>

La firma del método `Entry::make()` ha cambiado. Cualquier clase que extienda la clase `Entry` y ​​anule el método `make()` debe actualizar la firma del método para que coincida con la nueva firma. La nueva firma es la siguiente:

```php
public static function make(?string $name = null): static
```

Esto se debe a la introducción del método `getDefaultName()`, que se puede anular para proporcionar un valor predeterminado `$name` si no se especifica ninguno (`null`). Si anteriormente estaba anulando el método `make()` para proporcionar un valor predeterminado `$name`, se recomienda que ahora anule el método `getDefaultName()`, para evitar una mayor carga de mantenimiento en el futuro:

```php
public static function getDefaultName(): ?string
{
    return 'default';
}
```

Si está anulando el método `make()` para pasar la configuración predeterminada al objeto una vez que se crea una instancia, tenga en cuenta que se recomienda anular el método `setUp()`, que se llama inmediatamente después de que se crea una instancia del objeto:

```php
protected function setUp(): void
{
    parent::setUp();

    $this->label('Default label');
}
```

Idealmente, debería evitar anular el método `make()` por completo, ya que existen alternativas como `setUp()`, y hacerlo hace que su código se vuelva frágil si Filament decide introducir nuevos parámetros de constructor en el futuro.

</details>

<details>
<summary>Anulación de los métodos `Column::make()` o `Constraint::make()`</summary>

La firma de los métodos `Column::make()` y ​​`Constraint::make()` ha cambiado. Cualquier clase que extienda la clase `Column` o `Constraint` y ​​anule el método `make()` debe actualizar la firma del método para que coincida con la nueva firma. La nueva firma es la siguiente:

```php
public static function make(?string $name = null): static
```

Esto se debe a la introducción del método `getDefaultName()`, que se puede anular para proporcionar un valor predeterminado `$name` si no se especifica ninguno (`null`). Si anteriormente estaba anulando el método `make()` para proporcionar un valor predeterminado `$name`, se recomienda que ahora anule el método `getDefaultName()`, para evitar una mayor carga de mantenimiento en el futuro:

```php
public static function getDefaultName(): ?string
{
    return 'default';
}
```

Si está anulando el método `make()` para pasar la configuración predeterminada al objeto una vez que se crea una instancia, tenga en cuenta que se recomienda anular el método `setUp()`, que se llama inmediatamente después de que se crea una instancia del objeto:

```php
protected function setUp(): void
{
    parent::setUp();

    $this->label('Default label');
}
```

Idealmente, debería evitar anular el método `make()` por completo, ya que existen alternativas como `setUp()`, y hacerlo hace que su código se vuelva frágil si Filament decide introducir nuevos parámetros de constructor en el futuro.

</details>

<details>
<summary>Anulación de los métodos `ExportColumn::make()` o `ImportColumn::make()`</summary>

La firma de los métodos `ExportColumn::make()` y ​​`ImportColumn::make()` ha cambiado. Cualquier clase que extienda la clase `ExportColumn` o `ImportColumn` y ​​anule el método `make()` debe actualizar la firma del método para que coincida con la nueva firma. La nueva firma es la siguiente:

```php
public static function make(?string $name = null): static
```

Esto se debe a la introducción del método `getDefaultName()`, que se puede anular para proporcionar un valor predeterminado `$name` si no se especifica ninguno (`null`). Si anteriormente estaba anulando el método `make()` para proporcionar un valor predeterminado `$name`, se recomienda que ahora anule el método `getDefaultName()`, para evitar una mayor carga de mantenimiento en el futuro:

```php
public static function getDefaultName(): ?string
{
    return 'default';
}
```

Si está anulando el método `make()` para pasar la configuración predeterminada al objeto una vez que se crea una instancia, tenga en cuenta que se recomienda anular el método `setUp()`, que se llama inmediatamente después de que se crea una instancia del objeto:

```php
protected function setUp(): void
{
    parent::setUp();

    $this->label('Default label');
}
```

Idealmente, debería evitar anular el método `make()` por completo, ya que existen alternativas como `setUp()`, y hacerlo hace que su código se vuelva frágil si Filament decide introducir nuevos parámetros de constructor en el futuro.

</details>

<details>
<summary>Autenticar al usuario dentro de los trabajos de importación y exportación</summary>

En v3, el evento `Illuminate\Auth\Events\Login` se disparó desde los trabajos de importación y exportación, para configurar el usuario actual. Este ya no es el caso en la versión 4: el usuario se autentica, pero ese evento no se activa, para evitar ejecutar escuchas que solo deberían ejecutarse para los inicios de sesión de los usuarios reales.

</details>

<details>
<summary>Las tablas ahora tienen clasificación de clave primaria predeterminada</summary>

Filament v4 introduce un nuevo comportamiento predeterminado para las tablas: ahora se les aplicará automáticamente una clasificación de clave principal a sus consultas para garantizar que los registros siempre se devuelvan en un orden coherente.

Si su tabla no tiene una clave principal o desea deshabilitar este comportamiento, puede hacerlo utilizando el método `defaultKeySort(false)`:

```php
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->defaultKeySort(false);
}
```

:::tip
    Puede conservar el antiguo comportamiento predeterminado en toda su aplicación agregando el siguiente código en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
    use Filament\Tables\Table;

    Table::configureUsing(fn (Table $table) => $table
        ->defaultKeySort(false));
    ```
:::

</details>

<details>
<summary>Anulación de los métodos de autorización `can*()` en una clase `Resource`, `RelationManager` o `ManageRelatedRecords`</summary>

Aunque estos métodos, como `canCreate()`, `canViewAny()` y ​​`canDelete()` no estaban documentados, si los anula para proporcionar una lógica de autorización personalizada en v3, debe tener en cuenta que no siempre se llaman en v4. La lógica de autorización se mejoró para admitir adecuadamente [objetos de respuesta de política] (https://laravel.com/docs/authorization#policy-responses), y estos métodos eran demasiado simples ya que solo pueden devolver valores booleanos.

Si puede realizar la personalización de la autorización dentro de la política del modelo, debe hacerlo. Si necesita personalizar la lógica de autorización en la clase de administrador de recursos o relaciones, debe anular los métodos `get*AuthorizationResponse()`, como `getCreateAuthorizationResponse()`, `getViewAnyAuthorizationResponse()` y ​​`getDeleteAuthorizationResponse()`. Estos métodos se llaman cuando se ejecuta la lógica de autorización y devuelven un [objeto de respuesta de política] (https://laravel.com/docs/authorization#policy-responses). Si elimina la anulación de los métodos `can*()`, los métodos `get*AuthorizationResponse()` se utilizarán para determinar la respuesta booleana de autorización, por lo que no tendrá que mantener la lógica dos veces.

</details>

<details>
<summary>Traducciones al portugués europeo</summary>

Las traducciones al portugués europeo se han movido de `pt_PT` a `pt`, que parece ser el código de idioma más utilizado para el idioma dentro de la comunidad Laravel.

</details>

<details>
<summary>traducciones al nepalí</summary>

Las traducciones al nepalí se han movido de `np` a `ne`, que parece ser el código de idioma más utilizado para el idioma dentro de la comunidad Laravel.

</details>

<details>
<summary>traducciones al noruego</summary>

Las traducciones al noruego se han movido de `no` a `nb`, que parece ser el código de idioma más utilizado para el idioma dentro de la comunidad Laravel.

</details>

<details>
<summary>traducciones jemer</summary>

Las traducciones al jemer se han movido de `kh` a `km`, que parece ser el código de idioma más utilizado para el idioma dentro de la comunidad Laravel.

</details>

<details>
<summary>Se han eliminado algunos métodos de configuración de tablas obsoletos</summary>

Antes de Filament v3, las tablas se podían configurar anulando métodos en la clase de componente Livewire, en lugar de modificar el objeto de configuración `$table`. Esto quedó obsoleto en la versión 3 y se eliminó en la versión 4. Si estaba utilizando alguno de los siguientes métodos, debería eliminarlos de su clase de componente Livewire y utilizar sus métodos de configuración `$table` correspondientes en su lugar:

- `getTableRecordUrlUsing()` debe reemplazarse por `$table->recordUrl()`
- `getTableRecordClassesUsing()` debe reemplazarse por `$table->recordClasses()`
- `getTableRecordActionUsing()` debe reemplazarse con `$table->recordAction()`
- `isTableRecordSelectable()` debe reemplazarse con `$table->checkIfRecordIsSelectableUsing()`

</details>

