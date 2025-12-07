---
title: Action de exportación
---

## Introducción

Filament incluye una acción que puede exportar filas a un archivo CSV o XLSX. Cuando se hace clic en el botón de activación, un modal pregunta por las columnas que desean exportar, y cómo deberían etiquetarse. Esta función utiliza [job batches](https://laravel.com/docs/queues#job-batching) y [notificaciones de base de datos](../../notifications/database-notifications), por lo que necesita publicar esas migraciones desde Laravel. Además, necesita publicar las migraciones para las tablas que Filament usa para almacenar información sobre las exportaciones:

```bash
# Laravel 11 y superior
php artisan make:queue-batches-table
php artisan make:notifications-table

# Laravel 10
php artisan queue:batches-table
php artisan notifications:table
```

```bash
# Todas las aplicaciones
php artisan vendor:publish --tag=filament-actions-migrations
php artisan migrate
```

:::info
Si está usando PostgreSQL, asegúrese de que la columna `data` en la migración de notificaciones esté usando `json()`: `$table->json('data')`.
:::

:::info
Si está usando UUIDs para su modelo `User`, asegúrese de que su columna `notifiable` en la migración de notificaciones esté usando `uuidMorphs()`: `$table->uuidMorphs('notifiable')`.
:::

Puede usar el `ExportAction` de la siguiente manera:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;

ExportAction::make()
    ->exporter(ProductExporter::class)
```

Si desea agregar esta acción al encabezado de una tabla, puede hacerlo de la siguiente manera:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->headerActions([
            ExportAction::make()
                ->exporter(ProductExporter::class),
        ]);
}
```

O si desea agregarla como una acción masiva de tabla, para que el usuario pueda elegir qué filas exportar, pueden usar `Filament\Actions\ExportBulkAction`:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportBulkAction;
use Filament\Tables\Table;

public function table(Table $table): Table
{
    return $table
        ->toolbarActions([
            ExportBulkAction::make()
                ->exporter(ProductExporter::class),
        ]);
}
```

La [clase "exporter" debe ser creada](#crear-un-exportador) para indicarle a Filament cómo exportar cada fila.

## Crear un exportador

Para crear una clase exportadora para un modelo, puede usar el comando `make:filament-exporter`, pasando el nombre de un modelo:

```bash
php artisan make:filament-exporter Product
```

Esto creará una nueva clase en el directorio `app/Filament/Exports`. Ahora necesita definir las [columnas](#definir-columnas-del-exportador) que se pueden exportar.

### Generar automáticamente columnas del exportador

Si desea ahorrar tiempo, Filament puede generar automáticamente las [columnas](#definir-columnas-del-exportador) para usted, basándose en las columnas de la base de datos de su modelo, usando `--generate`:

```bash
php artisan make:filament-exporter Product --generate
```

## Definir columnas del exportador

Para definir las columnas que se pueden exportar, necesita sobrescribir el método `getColumns()` en su clase exportadora, devolviendo un array de objetos `ExportColumn`:

```php
use Filament\Actions\Exports\ExportColumn;

public static function getColumns(): array
{
    return [
        ExportColumn::make('name'),
        ExportColumn::make('sku')
            ->label('SKU'),
        ExportColumn::make('price'),
    ];
}
```

### Personalizar la etiqueta de una columna de exportación

La etiqueta para cada columna se generará automáticamente a partir de su nombre, pero puede sobrescribirla llamando al método `label()`:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('sku')
    ->label('SKU')
```

### Configurar la selección de columna predeterminada

Por defecto, todas las columnas se seleccionarán cuando se le pregunte al usuario qué columnas le gustaría exportar. Puede personalizar el estado de selección predeterminado para una columna con el método `enabledByDefault()`:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('description')
    ->enabledByDefault(false)
```

### Configurar el diseño del formulario de selección de columnas

Por defecto, el formulario de selección de columnas usa un diseño de una sola columna. Puede cambiar esto usando el método `columnMappingColumns()`, pasando el número de columnas que desea usar para el diseño en pantallas grandes:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->columnMappingColumns(3)
```

Esto mostrará las casillas de verificación de selección de columnas y los inputs de etiqueta en un diseño de 3 columnas, haciendo un mejor uso del espacio disponible cuando tiene muchas columnas exportables. Tenga en cuenta que aunque habrá tres columnas en el diseño en pantallas grandes, el diseño seguirá siendo responsivo y habrá menos columnas mostradas en pantallas más pequeñas.

### Deshabilitar selección de columnas

Por defecto, se le preguntará al usuario qué columnas le gustaría exportar. Puede deshabilitar esta funcionalidad usando `columnMapping(false)`:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->columnMapping(false)
```

### Estado calculado de columna de exportación

A veces necesita calcular el estado de una columna, en lugar de leerlo directamente de una columna de base de datos.

Al pasar una función callback al método `state()`, puede personalizar el estado devuelto para esa columna basado en el `$record`:

```php
use App\Models\Order;
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('amount_including_vat')
    ->state(function (Order $record): float {
        return $record->amount * (1 + $record->vat_rate);
    })
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de `$record`, la función `state()` puede inyectar varias utilidades como parámetros.

</details>

### Formatear el valor de una columna de exportación

Puede pasar un callback de formateo personalizado a `formatStateUsing()`, que acepta el `$state` de la celda, y opcionalmente el `$record` Eloquent:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('status')
    ->formatStateUsing(fn (string $state): string => __("statuses.{$state}"))
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de `$state`, la función `formatStateUsing()` puede inyectar varias utilidades como parámetros.

</details>

Si hay [múltiples valores](#exportar-múltiples-valores-en-una-celda) en la columna, la función se llamará para cada valor.

#### Limitar longitud de texto

Puede limitar (`limit()`) la longitud del valor de la celda:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('description')
    ->limit(50)
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `limit()` también acepta una función para calcularlo dinámicamente. Puede inyectar varias utilidades en la función como parámetros.

</details>

#### Limitar recuento de palabras

Puede limitar el número de palabras (`words()`) mostradas en la celda:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('description')
    ->words(10)
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `words()` también acepta una función para calcularlo dinámicamente. Puede inyectar varias utilidades en la función como parámetros.

</details>

#### Agregar un prefijo o sufijo

Puede agregar un prefijo (`prefix()`) o sufijo (`suffix()`) al valor de la celda:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('domain')
    ->prefix('https://')
    ->suffix('.com')
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos `prefix()` y `suffix()` también aceptan funciones para calcularlos dinámicamente. Puede inyectar varias utilidades en las funciones como parámetros.

</details>

### Exportar múltiples valores en una celda

Por defecto, si hay múltiples valores en la columna, se separarán por comas. Puede usar el método `listAsJson()` para listarlos como un array JSON en su lugar:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('tags')
    ->listAsJson()
```

### Mostrar datos de relaciones

Puede usar "notación de punto" para acceder a columnas dentro de relaciones. El nombre de la relación va primero, seguido de un punto, seguido del nombre de la columna a mostrar:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('author.name')
```

### Contar relaciones

Si desea contar el número de registros relacionados en una columna, puede usar el método `counts()`:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('users_count')
    ->counts('users')
```

En este ejemplo, `users` es el nombre de la relación a contar. El nombre de la columna debe ser `users_count`, ya que esta es la convención que [Laravel usa](https://laravel.com/docs/eloquent-relationships#counting-related-models) para almacenar el resultado.

Si desea definir el alcance de la relación antes de contar, puede pasar un array al método, donde la clave es el nombre de la relación y el valor es la función para definir el alcance de la consulta Eloquent con:

```php
use Filament\Actions\Exports\ExportColumn;
use Illuminate\Database\Eloquent\Builder;

ExportColumn::make('users_count')
    ->counts([
        'users' => fn (Builder $query) => $query->where('is_active', true),
    ])
```

### Determinar existencia de relaciones

Si simplemente desea indicar si existen registros relacionados en una columna, puede usar el método `exists()`:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('users_exists')
    ->exists('users')
```

En este ejemplo, `users` es el nombre de la relación para verificar existencia. El nombre de la columna debe ser `users_exists`, ya que esta es la convención que [Laravel usa](https://laravel.com/docs/eloquent-relationships#other-aggregate-functions) para almacenar el resultado.

Si desea definir el alcance de la relación antes de verificar existencia, puede pasar un array al método, donde la clave es el nombre de la relación y el valor es la función para definir el alcance de la consulta Eloquent con:

```php
use Filament\Actions\Exports\ExportColumn;
use Illuminate\Database\Eloquent\Builder;

ExportColumn::make('users_exists')
    ->exists([
        'users' => fn (Builder $query) => $query->where('is_active', true),
    ])
```

### Agregar relaciones

Filament proporciona varios métodos para agregar un campo de relación, incluyendo `avg()`, `max()`, `min()` y `sum()`. Por ejemplo, si desea mostrar el promedio de un campo en todos los registros relacionados en una columna, puede usar el método `avg()`:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('users_avg_age')
    ->avg('users', 'age')
```

En este ejemplo, `users` es el nombre de la relación, mientras que `age` es el campo que se está promediando. El nombre de la columna debe ser `users_avg_age`, ya que esta es la convención que [Laravel usa](https://laravel.com/docs/eloquent-relationships#other-aggregate-functions) para almacenar el resultado.

Si desea definir el alcance de la relación antes de agregar, puede pasar un array al método, donde la clave es el nombre de la relación y el valor es la función para definir el alcance de la consulta Eloquent con:

```php
use Filament\Actions\Exports\ExportColumn;
use Illuminate\Database\Eloquent\Builder;

ExportColumn::make('users_avg_age')
    ->avg([
        'users' => fn (Builder $query) => $query->where('is_active', true),
    ], 'age')
```

## Configurar los formatos de exportación

Por defecto, la acción de exportación permitirá al usuario elegir entre formatos CSV y XLSX. Puede usar el enum `ExportFormat` para personalizar esto, pasando un array de formatos al método `formats()` en la acción:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;
use Filament\Actions\Exports\Enums\ExportFormat;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->formats([
        ExportFormat::Csv,
    ])
    // o
    ->formats([
        ExportFormat::Xlsx,
    ])
    // o
    ->formats([
        ExportFormat::Xlsx,
        ExportFormat::Csv,
    ])
```

Alternativamente, puede sobrescribir el método `getFormats()` en la clase exportadora, que establecerá los formatos predeterminados para todas las acciones que usan ese exportador:

```php
use Filament\Actions\Exports\Enums\ExportFormat;

public function getFormats(): array
{
    return [
        ExportFormat::Csv,
    ];
}
```

## Modificar la consulta de exportación

Por defecto, si está usando el `ExportAction` con una tabla, la acción usará la consulta actualmente filtrada y ordenada de la tabla para exportar los datos. Si no tiene una tabla, usará la consulta predeterminada del modelo. Para modificar el query builder antes de exportar, puede usar el método `modifyQueryUsing()` en la acción:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;
use Illuminate\Database\Eloquent\Builder;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->modifyQueryUsing(fn (Builder $query) => $query->where('is_active', true))
```

Puede inyectar el argumento `$options` en la función, que es un array de [opciones](#usar-opciones-de-exportación) para esa exportación:

```php
use App\Filament\Exports\ProductExporter;
use Illuminate\Database\Eloquent\Builder;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->modifyQueryUsing(fn (Builder $query, array $options) => $query->where('is_active', $options['isActive'] ?? true))
```

Alternativamente, puede sobrescribir el método `modifyQuery()` en la clase exportadora, que modificará la consulta para todas las acciones que usan ese exportador:

```php
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphTo;

public static function modifyQuery(Builder $query): Builder
{
    return $query->with([
        'purchasable' => fn (MorphTo $morphTo) => $morphTo->morphWith([
            ProductPurchase::class => ['product'],
            ServicePurchase::class => ['service'],
            Subscription::class => ['plan'],
        ]),
    ]);
}
```

## Configurar el sistema de archivos de exportación

### Personalizar el disco de almacenamiento

Por defecto, los archivos exportados se subirán al disco de almacenamiento definido en el [archivo de configuración](../../installation#publishing-configuration), que es `public` por defecto. Puede establecer la variable de entorno `FILAMENT_FILESYSTEM_DISK` para cambiar esto.

Aunque usar el disco `public` es un buen predeterminado para muchas partes de Filament, usarlo para exportaciones resultaría en que los archivos exportados se almacenen en una ubicación pública. Como tal, si el disco de sistema de archivos predeterminado es `public` y existe un disco `local` en su `config/filesystems.php`, Filament usará el disco `local` para exportaciones en su lugar. Si sobrescribe el disco para que sea `public` para un `ExportAction` o dentro de una clase exportadora, Filament usará ese.

En producción, debe usar un disco como `s3` con una política de acceso privada, para evitar el acceso no autorizado a los archivos exportados.

Si desea usar un disco diferente para una exportación específica, puede pasar el nombre del disco al método `disk()` en la acción:

```php
use Filament\Actions\ExportAction;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->fileDisk('s3')
```

Puede establecer el disco para todas las acciones de exportación a la vez en el método `boot()` de un proveedor de servicios como `AppServiceProvider`:

```php
use Filament\Actions\ExportAction;

ExportAction::configureUsing(fn (ExportAction $action) => $action->fileDisk('s3'));
```

Alternativamente, puede sobrescribir el método `getFileDisk()` en la clase exportadora, devolviendo el nombre del disco:

```php
public function getFileDisk(): string
{
    return 's3';
}
```

Los archivos de exportación que se crean son responsabilidad del desarrollador de eliminar si lo desean. Filament no elimina estos archivos en caso de que las exportaciones necesiten descargarse nuevamente en una fecha posterior.

### Configurar los nombres de archivo de exportación

Por defecto, los archivos exportados tendrán un nombre generado basado en el ID y tipo de la exportación. También puede usar el método `fileName()` en la acción para personalizar el nombre del archivo:

```php
use Filament\Actions\ExportAction;
use Filament\Actions\Exports\Models\Export;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->fileName(fn (Export $export): string => "products-{$export->getKey()}.csv")
```

Alternativamente, puede sobrescribir el método `getFileName()` en la clase exportadora, devolviendo una cadena:

```php
use Filament\Actions\Exports\Models\Export;

public function getFileName(Export $export): string
{
    return "products-{$export->getKey()}.csv";
}
```

## Usar opciones de exportación

La acción de exportación puede renderizar componentes de formulario adicionales con los que el usuario puede interactuar al exportar un CSV. Esto puede ser útil para permitir que el usuario personalice el comportamiento del exportador. Por ejemplo, es posible que desee que un usuario pueda elegir el formato de columnas específicas al exportar. Para hacer esto, puede devolver componentes de formulario de opciones desde el método `getOptionsFormComponents()` en su clase exportadora:

```php
use Filament\Forms\Components\TextInput;

public static function getOptionsFormComponents(): array
{
    return [
        TextInput::make('descriptionLimit')
            ->label('Limitar la longitud del contenido de la columna de descripción')
            ->integer(),
    ];
}
```

Alternativamente, puede pasar un conjunto de opciones estáticas al exportador a través del método `options()` en la acción:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->options([
        'descriptionLimit' => 250,
    ])
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `options()` también acepta una función para calcularlo dinámicamente. Puede inyectar varias utilidades en la función como parámetros.

</details>

Ahora, puede acceder a los datos de estas opciones dentro de la clase exportadora, inyectando el argumento `$options` en cualquier función closure. Por ejemplo, es posible que desee usarlo dentro de `formatStateUsing()` para [formatear el valor de una columna](#formatear-el-valor-de-una-columna-de-exportación):

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('description')
    ->formatStateUsing(function (string $state, array $options): string {
        return (string) str($state)->limit($options['descriptionLimit'] ?? 100);
    })
```

Alternativamente, dado que el argumento `$options` se pasa a todas las funciones closure, puede acceder a él dentro de `limit()`:

```php
use Filament\Actions\Exports\ExportColumn;

ExportColumn::make('description')
    ->limit(fn (array $options): int => $options['descriptionLimit'] ?? 100)
```

## Usar un modelo de usuario personalizado

Por defecto, la tabla `exports` tiene una columna `user_id`. Esa columna está restringida a la tabla `users`:

```php
$table->foreignId('user_id')->constrained()->cascadeOnDelete();
```

En el modelo `Export`, la relación `user()` se define como una relación `BelongsTo` al modelo `App\Models\User`. Si el modelo `App\Models\User` no existe, o desea usar uno diferente, puede vincular un nuevo modelo `Authenticatable` al contenedor en el método `register()` de un proveedor de servicios:

```php
use App\Models\Admin;
use Illuminate\Contracts\Auth\Authenticatable;

$this->app->bind(Authenticatable::class, Admin::class);
```

Si su modelo autenticable usa una tabla diferente a `users`, debe pasar ese nombre de tabla a `constrained()`:

```php
$table->foreignId('user_id')->constrained('admins')->cascadeOnDelete();
```

### Usar una relación de usuario polimórfica

Si desea asociar exportaciones con múltiples modelos de usuario, puede usar una relación `MorphTo` polimórfica en su lugar. Para hacer esto, necesita reemplazar la columna `user_id` en la tabla `exports`:

```php
$table->morphs('user');
```

Luego, en el método `boot()` de un proveedor de servicios, debe llamar a `Export::polymorphicUserRelationship()` para intercambiar la relación `user()` en el modelo `Export` por una relación `MorphTo`:

```php
use Filament\Actions\Exports\Models\Export;

Export::polymorphicUserRelationship();
```

## Limitar el número máximo de filas que se pueden exportar

Para evitar la sobrecarga del servidor, es posible que desee limitar el número máximo de filas que se pueden exportar desde un archivo CSV. Puede hacer esto llamando al método `maxRows()` en la acción:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->maxRows(100000)
```

## Cambiar el tamaño de fragmento de exportación

Filament fragmentará el CSV y procesará cada fragmento en un trabajo en cola diferente. Por defecto, los fragmentos son de 100 filas a la vez. Puede cambiar esto llamando al método `chunkSize()` en la acción:

```php
use App\Filament\Exports\ProductExporter;
use Filament\Actions\ExportAction;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->chunkSize(250)
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `chunkSize()` también acepta una función para calcularlo dinámicamente. Puede inyectar varias utilidades en la función como parámetros.

</details>

:::tip
Si está encontrando problemas de memoria o tiempo de espera al importar archivos CSV grandes, es posible que desee reducir el tamaño del fragmento.
:::

## Cambiar el delimitador CSV

El delimitador predeterminado para CSVs es la coma (`,`). Si desea exportar usando un delimitador diferente, puede sobrescribir el método `getCsvDelimiter()` en la clase exportadora, devolviendo uno nuevo:

```php
public static function getCsvDelimiter(): string
{
    return ';';
}
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de permitir un valor estático, el método `csvDelimiter()` también acepta una función para calcularlo dinámicamente. Puede inyectar varias utilidades en la función como parámetros.

</details>

Solo puede especificar un solo carácter, de lo contrario se lanzará una excepción.

## Personalizar archivos XLSX

### Estilizar filas XLSX

Si desea estilizar las celdas del archivo XLSX, puede sobrescribir el método `getXlsxCellStyle()` en la clase exportadora, devolviendo un [objeto `Style` de OpenSpout](https://github.com/openspout/openspout/blob/4.x/docs/documentation.md#styling):

```php
use OpenSpout\Common\Entity\Style\Style;

public function getXlsxCellStyle(): ?Style
{
    return (new Style())
        ->setFontSize(12)
        ->setFontName('Consolas');
}
```

Si desea usar un estilo diferente solo para las celdas de encabezado del archivo XLSX, puede sobrescribir el método `getXlsxHeaderCellStyle()` en la clase exportadora, devolviendo un [objeto `Style` de OpenSpout](https://github.com/openspout/openspout/blob/4.x/docs/documentation.md#styling):

```php
use OpenSpout\Common\Entity\Style\CellAlignment;
use OpenSpout\Common\Entity\Style\CellVerticalAlignment;
use OpenSpout\Common\Entity\Style\Color;
use OpenSpout\Common\Entity\Style\Style;

public function getXlsxHeaderCellStyle(): ?Style
{
    return (new Style())
        ->setFontBold()
        ->setFontItalic()
        ->setFontSize(14)
        ->setFontName('Consolas')
        ->setFontColor(Color::rgb(255, 255, 77))
        ->setBackgroundColor(Color::rgb(0, 0, 0))
        ->setCellAlignment(CellAlignment::CENTER)
        ->setCellVerticalAlignment(CellVerticalAlignment::CENTER);
}
```

### Estilizar columnas XLSX

Los métodos `makeXlsxRow()` y `makeXlsxHeaderRow()` en la clase exportadora le permiten personalizar el estilo de celdas individuales dentro de una fila. Por defecto, los métodos se implementan así:

```php
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\Style;

/**
 * @param array<mixed> $values
 */
public function makeXlsxRow(array $values, ?Style $style = null): Row
{
    return Row::fromValues($values, $style);
}
```

Cuando un usuario exporta, puede elegir qué columnas exportar. Como tal, la propiedad `$this->columnMap` se puede usar para determinar qué columnas se están exportando y en qué orden. Puede reemplazar `Row::fromValues()` con un array de objetos `Cell`, que le permiten estilizarlos individualmente usando [objetos `Style` de OpenSpout](https://github.com/openspout/openspout/blob/4.x/docs/documentation.md#styling). Se puede usar un `StyleMerger` para fusionar el estilo predeterminado con el estilo personalizado para una celda, lo que le permite aplicar estilos adicionales encima de los predeterminados:

```php
use OpenSpout\Common\Entity\Cell;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Writer\Common\Manager\Style\StyleMerger;

/**
 * @param array<mixed> $values
 */
public function makeXlsxRow(array $values, ?Style $style = null): Row
{
    $styleMerger = new StyleMerger();

    $cells = [];
    
    foreach (array_keys($this->columnMap) as $columnIndex => $column) {
        $cells[] = match ($column) {
            'name' => Cell::fromValue(
                $values[$columnIndex],
                $styleMerger->merge(
                    (new Style())->setFontUnderline(),
                    $style,
                ),
            ),
            'price' => Cell::fromValue(
                $values[$columnIndex],
                (new Style())->setFontSize(12),
            ),
            default => Cell::fromValue($values[$columnIndex]),
        },
    }
    
    return new Row($cells, $style);
}
```

### Personalizar el escritor XLSX

Si desea pasar "opciones" al [XLSX `Writer` de OpenSpout](https://github.com/openspout/openspout/blob/4.x/docs/documentation.md#column-widths), puede devolver una instancia `OpenSpout\Writer\XLSX\Options` desde el método `getXlsxWriterOptions()` de la clase exportadora:

```php
use OpenSpout\Writer\XLSX\Options;

public function getXlsxWriterOptions(): ?Options
{
    $options = new Options();
    $options->setColumnWidth(10, 1);
    $options->setColumnWidthForRange(12, 2, 3);
    
    return $options;
}
```

Si desea personalizar el escritor XLSX antes de que se cierre, puede sobrescribir el método `configureXlsxWriterBeforeClosing()` en la clase exportadora. Este método recibe la instancia `Writer` como parámetro, y puede modificarla antes de que se cierre:

```php
use OpenSpout\Writer\XLSX\Entity\SheetView;
use OpenSpout\Writer\XLSX\Writer;

public function configureXlsxWriterBeforeClose(Writer $writer): Writer
{
    $sheetView = new SheetView();
    $sheetView->setFreezeRow(2);
    $sheetView->setFreezeColumn('B');
    
    $sheet = $writer->getCurrentSheet();
    $sheet->setSheetView($sheetView);
    $sheet->setName('export');
    
    return $writer;
}
```

## Personalizar el trabajo de exportación

El trabajo predeterminado para procesar exportaciones es `Filament\Actions\Exports\Jobs\PrepareCsvExport`. Si desea extender esta clase y sobrescribir cualquiera de sus métodos, puede reemplazar la clase original en el método `register()` de un proveedor de servicios:

```php
use App\Jobs\PrepareCsvExport;
use Filament\Actions\Exports\Jobs\PrepareCsvExport as BasePrepareCsvExport;

$this->app->bind(BasePrepareCsvExport::class, PrepareCsvExport::class);
```

O, puede pasar la nueva clase de trabajo al método `job()` en la acción, para personalizar el trabajo para una exportación específica:

```php
use App\Filament\Exports\ProductExporter;
use App\Jobs\PrepareCsvExport;
use Filament\Actions\ExportAction;

ExportAction::make()
    ->exporter(ProductExporter::class)
    ->job(PrepareCsvExport::class)
```

### Personalizar la cola y conexión de exportación

Por defecto, el sistema de exportación usará la cola y conexión predeterminadas. Si desea personalizar la cola utilizada para trabajos de un exportador específico, puede sobrescribir el método `getJobQueue()` en su clase exportadora:

```php
public function getJobQueue(): ?string
{
    return 'exports';
}
```

También puede personalizar la conexión utilizada para trabajos de un exportador específico, sobrescribiendo el método `getJobConnection()` en su clase exportadora:

```php
public function getJobConnection(): ?string
{
    return 'sqs';
}
```

### Personalizar el middleware del trabajo de exportación

Por defecto, el sistema de exportación solo procesará un trabajo a la vez de cada exportación. Esto es para evitar que el servidor se sobrecargue, y que otros trabajos se retrasen por exportaciones grandes. Esa funcionalidad se define en el middleware `WithoutOverlapping` en la clase exportadora:

```php
public function getJobMiddleware(): array
{
    return [
        (new WithoutOverlapping("export{$this->export->getKey()}"))->expireAfter(600),
    ];
}
```

Si desea personalizar el middleware que se aplica a los trabajos de un exportador específico, puede sobrescribir este método en su clase exportadora. Puede leer más sobre el middleware de trabajos en la [documentación de Laravel](https://laravel.com/docs/queues#job-middleware).

### Personalizar los reintentos del trabajo de exportación

Por defecto, el sistema de exportación reintentará un trabajo durante 24 horas, o hasta que falle con 5 excepciones no manejadas, lo que ocurra primero. Esto es para permitir que se resuelvan problemas temporales, como que la base de datos no esté disponible. Puede cambiar el período de tiempo para que el trabajo reintente, que se define en el método `getJobRetryUntil()` en la clase exportadora:

```php
use Carbon\CarbonInterface;

public function getJobRetryUntil(): ?CarbonInterface
{
    return now()->addHours(12);
}
```

Puede leer más sobre los reintentos de trabajos en la [documentación de Laravel](https://laravel.com/docs/queues#max-job-attempts-and-timeout).

#### Personalizar la estrategia de backoff del trabajo de exportación

Por defecto, el sistema de exportación esperará 1 minuto, luego 2 minutos, luego 5 minutos, luego 10 minutos a partir de entonces antes de reintentar un trabajo. Esto es para evitar que el servidor se sobrecargue por un trabajo que está fallando repetidamente. Esa funcionalidad se define en el método `getJobBackoff()` en la clase exportadora:

```php
/**
 * @return int | array<int> | null
 */
public function getJobBackoff(): int | array | null
{
    return [60, 120, 300, 600];
}
```

Puede leer más sobre el backoff de trabajos, incluido cómo configurar backoffs exponenciales, en la [documentación de Laravel](https://laravel.com/docs/queues#dealing-with-failed-jobs).

### Personalizar las etiquetas del trabajo de exportación

Por defecto, el sistema de exportación etiquetará cada trabajo con el ID de la exportación. Esto es para permitirle encontrar fácilmente todos los trabajos relacionados con una exportación específica. Esa funcionalidad se define en el método `getJobTags()` en la clase exportadora:

```php
public function getJobTags(): array
{
    return ["export{$this->export->getKey()}"];
}
```

Si desea personalizar las etiquetas que se aplican a los trabajos de un exportador específico, puede sobrescribir este método en su clase exportadora.

### Personalizar el nombre del lote de trabajo de exportación

Por defecto, el sistema de exportación no define ningún nombre para los lotes de trabajos. Si desea personalizar el nombre que se aplica a los lotes de trabajos de un exportador específico, puede sobrescribir el método `getJobBatchName()` en su clase exportadora:

```php
public function getJobBatchName(): ?string
{
    return 'product-export';
}
```

## Autorización

Por defecto, solo el usuario que inició la exportación puede descargar los archivos que se generan. Si desea personalizar la lógica de autorización, puede crear una clase `ExportPolicy`, y [registrarla en su `AuthServiceProvider`](https://laravel.com/docs/authorization#registering-policies):

```php
use App\Policies\ExportPolicy;
use Filament\Actions\Exports\Models\Export;

protected $policies = [
    Export::class => ExportPolicy::class,
];
```

El método `view()` de la política se usará para autorizar el acceso a las descargas.

Tenga en cuenta que si define una política, la lógica existente de asegurarse de que solo el usuario que inició la exportación pueda acceder a ella se eliminará. Deberá agregar esa lógica a su política si desea mantenerla:

```php
use App\Models\User;
use Filament\Actions\Exports\Models\Export;

public function view(User $user, Export $export): bool
{
    return $export->user()->is($user);
}
```