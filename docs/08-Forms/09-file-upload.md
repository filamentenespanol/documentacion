---
title: File upload
---

## Introducción

El campo de subida de archivos se basa en [Filepond](https://pqina.nl/filepond).

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
```

:::tip
Filament también soporta [`spatie/laravel-medialibrary`](https://github.com/spatie/laravel-medialibrary). Consulta nuestra [documentación del plugin](/plugins/filament-spatie-media-library) para más información.
:::

## Configurar el disco y directorio de almacenamiento

Por defecto, los archivos se subirán al disco de almacenamiento definido en el [archivo de configuración](../introduction/installation#publishing-configuration). También puedes establecer la variable de entorno `FILESYSTEM_DISK` para cambiar esto.

:::tip
Para previsualizar correctamente imágenes y otros archivos, FilePond requiere que los archivos se sirvan desde el mismo dominio que la app, o que estén presentes los encabezados CORS apropiados. Asegúrate de que la variable de entorno `APP_URL` sea correcta, o modifica el driver del [filesystem](https://laravel.com/docs/filesystem) para establecer la URL correcta. Si estás alojando archivos en un dominio separado como S3, asegúrate de configurar los encabezados CORS.
:::

Para cambiar el disco y directorio de un campo específico, y la visibilidad de los archivos, usa los métodos `disk()`, `directory()` y `visibility()`. Por defecto, los archivos se suben con visibilidad `private` a tu disco de almacenamiento, a menos que el disco esté configurado como `public`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->disk('s3')
    ->directory('form-attachments')
    ->visibility('public')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>disk()</code>, <code>directory()</code> y <code>visibility()</code> aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

:::info
Es responsabilidad del desarrollador eliminar estos archivos del disco si se eliminan, ya que Filament no sabe si se usan en otro lugar. Una forma de hacer esto automáticamente es observando un [evento de modelo](https://laravel.com/docs/eloquent#events).
:::

## Subida de múltiples archivos

También puedes subir múltiples archivos. Esto almacena URLs en JSON:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
```

Opcionalmente, puedes pasar un valor booleano para controlar si se pueden subir múltiples archivos a la vez:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>multiple()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

Si estás guardando las URLs de archivos usando Eloquent, debes asegurarte de agregar un `array` [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) a la propiedad del modelo:

```php
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    { 
        return [
            'attachments' => 'array',
        ];
    }

    // ...
}
```

### Controlar el máximo de subidas paralelas

Puedes controlar el número máximo de subidas paralelas usando el método `maxParallelUploads()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->maxParallelUploads(1)
```

Esto limitará el número de subidas paralelas a `1`. Si no se establece, usaremos el [valor por defecto de FilePond](https://pqina.nl/filepond/docs/api/instance/properties/#core-properties) que es `2`.

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>maxParallelUploads()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Controlar nombres de archivos

Por defecto, se generará un nombre de archivo aleatorio para los archivos recién subidos. Esto es para asegurar que nunca haya conflictos con archivos existentes.

### Implicaciones de seguridad al controlar nombres de archivos

Antes de usar los métodos `preserveFilenames()` o `getUploadedFileNameForStorageUsing()`, ten en cuenta las implicaciones de seguridad. Si permites que los usuarios suban archivos con sus propios nombres, existen formas de explotar esto para subir archivos maliciosos. Esto **aplica incluso si usas el método [`acceptedFileTypes()`](#file-type-validation)** para restringir los tipos de archivos que se pueden subir, ya que usa la regla `mimetypes` de Laravel que no valida la extensión del archivo, solo su tipo MIME, que podría manipularse.

Esto es específicamente un problema con el método `getClientOriginalName()` en el objeto `TemporaryUploadedFile`, que usa el método `preserveFilenames()`. Por defecto, Livewire genera un nombre aleatorio para cada archivo subido y usa el tipo MIME del archivo para determinar la extensión.

Usar estos métodos **con los discos de filesystem `local` o `public`** hará tu app vulnerable a ejecución remota de código si el atacante sube un archivo PHP con un tipo MIME engañoso. **Usar un disco S3 te protege de este vector de ataque específico**, ya que S3 no ejecutará archivos PHP de la misma manera que podría hacerlo tu servidor al servir archivos desde el almacenamiento local.

Si usas el disco `local` o `public`, deberías considerar usar el método [`storeFileNamesIn()`](#storing-original-file-names-independently) para almacenar los nombres de archivo originales en una columna separada en tu base de datos, y mantener los nombres aleatorios en el sistema de archivos. De esta manera, aún puedes mostrar a los usuarios los nombres originales, manteniendo seguro el sistema de archivos.

Además de este problema de seguridad, también debes tener en cuenta que permitir a los usuarios subir archivos con sus propios nombres puede provocar conflictos con archivos existentes y dificultar la gestión del almacenamiento. Los usuarios podrían subir archivos con el mismo nombre y sobrescribir el contenido de otros si no los limitas a un directorio específico, por lo que estas funciones, en todos los casos, solo deberían estar accesibles para usuarios de confianza.

### Conservar nombres de archivo originales

:::danger
Antes de usar esta funcionalidad, asegúrate de haber leído las [implicaciones de seguridad](#implications-of-controlling-file-names) — en inglés en el original: security implications.
:::

Para conservar los nombres originales de los archivos subidos, usa el método `preserveFilenames()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->preserveFilenames()
```

Opcionalmente, puedes pasar un valor booleano para controlar si los nombres originales deben conservarse:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->preserveFilenames(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>preserveFilenames()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Generar nombres de archivo personalizados

:::danger
Antes de usar esta funcionalidad, asegúrate de haber leído las [implicaciones de seguridad](#implications-of-controlling-file-names).
:::

Puedes personalizar completamente cómo se generan los nombres de archivo usando el método `getUploadedFileNameForStorageUsing()`, devolviendo un string desde el closure basado en el `$file` subido:

```php
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

FileUpload::make('attachment')
    ->getUploadedFileNameForStorageUsing(
        fn (TemporaryUploadedFile $file): string => (string) str($file->getClientOriginalName())
            ->prepend('custom-prefix-'),
    )
```

<details>
<summary>Inyección de utilidades</summary>

Puedes inyectar varias utilidades en la función pasada a <code>getUploadedFileNameForStorageUsing()</code> como parámetros.

<strong>Parámetros adicionales disponibles:</strong>

- <strong>File</strong> (<code>Livewire\\Features\\SupportFileUploads\\TemporaryUploadedFile</code> <code>$file</code>) - El objeto de archivo temporal que se está subiendo.

</details>

### Almacenar nombres de archivo originales de forma independiente

Puedes mantener los nombres de archivo generados aleatoriamente y, al mismo tiempo, almacenar el nombre de archivo original, usando el método `storeFileNamesIn()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->storeFileNamesIn('attachment_file_names')
```

Ahora `attachment_file_names` almacenará los nombres originales de tus archivos subidos, para que puedas guardarlos en la base de datos cuando se envíe el formulario. Si estás subiendo archivos con `multiple()`, asegúrate de agregar también un `array` [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) a esta propiedad del modelo Eloquent.

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>storeFileNamesIn()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Modo avatar

Puedes habilitar el modo avatar para tu campo de subida de archivos usando el método `avatar()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('avatar')
    ->avatar()
```

Esto solo permitirá subir imágenes y, cuando se suban, las mostrará en un diseño circular compacto perfecto para avatares.

Esta funcionalidad combina bien con el [recortador circular](#allowing-users-to-crop-images-as-a-circle).

## Editor de imágenes

Puedes habilitar un editor de imágenes para tu campo de subida usando el método `imageEditor()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->imageEditor()
```

Puedes abrir el editor una vez subas una imagen haciendo clic en el ícono de lápiz. También puedes abrir el editor haciendo clic en el ícono de lápiz en una imagen existente, lo cual la eliminará y volverá a subirla al guardar.

Opcionalmente, puedes pasar un valor booleano para controlar si el editor de imágenes está habilitado:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->imageEditor(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>imageEditor()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Permitir a los usuarios recortar imágenes a relaciones de aspecto

Puedes permitir a los usuarios recortar imágenes a un conjunto específico de relaciones de aspecto usando el método `imageEditorAspectRatios()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->imageEditor()
    ->imageEditorAspectRatios([
        '16:9',
        '4:3',
        '1:1',
    ])
```

También puedes permitir que los usuarios elijan sin relación de aspecto, "recorte libre", pasando `null` como opción:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->imageEditor()
    ->imageEditorAspectRatios([
        null,
        '16:9',
        '4:3',
        '1:1',
    ])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>imageEditorAspectRatios()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Establecer el modo del editor de imágenes

Puedes cambiar el modo del editor de imágenes usando el método `imageEditorMode()`, que acepta `1`, `2` o `3`. Estas opciones se explican en la [documentación de Cropper.js](https://github.com/fengyuanchen/cropperjs#viewmode):

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->imageEditor()
    ->imageEditorMode(2)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>imageEditorMode()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Personalizar el color de relleno vacío del editor

Por defecto, el editor de imágenes hará transparente el espacio vacío alrededor de la imagen. Puedes personalizar esto usando el método `imageEditorEmptyFillColor()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->imageEditor()
    ->imageEditorEmptyFillColor('#000000')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>imageEditorEmptyFillColor()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Establecer el tamaño del viewport del editor

Puedes cambiar el tamaño del viewport del editor usando los métodos `imageEditorViewportWidth()` y `imageEditorViewportHeight()`, que generan una relación de aspecto para usar en diferentes tamaños de dispositivo:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->imageEditor()
    ->imageEditorViewportWidth('1920')
    ->imageEditorViewportHeight('1080')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>imageEditorViewportWidth()</code> y <code>imageEditorViewportHeight()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

### Permitir recortar imágenes como círculo

Puedes permitir que los usuarios recorten imágenes como un círculo usando el método `circleCropper()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->avatar()
    ->imageEditor()
    ->circleCropper()
```

Esto está perfectamente acompañado por el [`método avatar()`](#avatar-mode), que renderiza las imágenes en un diseño circular compacto.

Opcionalmente, puedes pasar un valor booleano para controlar si el recortador circular está habilitado:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->avatar()
    ->imageEditor()
    ->circleCropper(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>circleCropper()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Recortar y redimensionar imágenes sin el editor

Filepond te permite recortar y redimensionar imágenes antes de subirlas, sin necesidad de un editor separado. Puedes personalizar este comportamiento usando los métodos `imageCropAspectRatio()`, `imageResizeTargetHeight()` y `imageResizeTargetWidth()`. Debe establecerse `imageResizeMode()` para que estos métodos tengan efecto — ya sea [`force`, `cover` o `contain`](https://pqina.nl/filepond/docs/api/plugins/image-resize).

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
    ->imageResizeMode('cover')
    ->imageCropAspectRatio('16:9')
    ->imageResizeTargetWidth('1920')
    ->imageResizeTargetHeight('1080')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>imageResizeMode()</code>, <code>imageCropAspectRatio()</code>, <code>imageResizeTargetHeight()</code> y <code>imageResizeTargetWidth()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

## Modificar la apariencia del área de subida

También puedes modificar la apariencia general del componente Filepond. Las opciones disponibles para estos métodos están en el [sitio web de Filepond](https://pqina.nl/filepond/docs/api/instance/properties/#styles).

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->imagePreviewHeight('250')
    ->loadingIndicatorPosition('left')
    ->panelAspectRatio('2:1')
    ->panelLayout('integrated')
    ->removeUploadedFileButtonPosition('right')
    ->uploadButtonPosition('left')
    ->uploadProgressIndicatorPosition('left')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, estos métodos también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

### Mostrar archivos en una cuadrícula

Puedes usar el [layout `grid` de Filepond](https://pqina.nl/filepond/docs/api/style/#grid-layout) estableciendo `panelLayout()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->panelLayout('grid')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>panelLayout()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Reordenar archivos

También puedes permitir que los usuarios reordenen los archivos subidos usando el método `reorderable()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->reorderable()
```

Al usar este método, FilePond puede añadir archivos recién subidos al principio de la lista, en lugar del final. Para solucionar esto, usa el método `appendFiles()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->reorderable()
    ->appendFiles()
```

Opcionalmente, los métodos `reorderable()` y `appendFiles()` aceptan un valor booleano para controlar si los archivos pueden reordenarse y si los nuevos archivos deben anexarse al final de la lista:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->reorderable(FeatureFlag::active())
    ->appendFiles(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, los métodos <code>reorderable()</code> y <code>appendFiles()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

## Abrir archivos en una pestaña nueva

Puedes añadir un botón para abrir cada archivo en una pestaña nueva con el método `openable()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->openable()
```

Opcionalmente, puedes pasar un valor booleano para controlar si los archivos pueden abrirse en una pestaña nueva:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->openable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>openable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Descargar archivos

Si deseas añadir un botón de descarga a cada archivo, puedes usar el método `downloadable()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->downloadable()
```

Opcionalmente, puedes pasar un valor booleano para controlar si los archivos pueden descargarse:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->downloadable(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>downloadable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Previsualizar archivos

Por defecto, algunos tipos de archivo pueden previsualizarse en FilePond. Si deseas deshabilitar la previsualización para todos los archivos, puedes usar el método `previewable(false)`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->previewable(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>previewable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Mover archivos en lugar de copiarlos al enviar el formulario

Por defecto, los archivos se suben inicialmente al directorio temporal de Livewire, y luego se copian al directorio de destino cuando se envía el formulario. Si deseas mover los archivos en su lugar, siempre que las subidas temporales se almacenen en el mismo disco que los archivos permanentes, puedes usar el método `moveFiles()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->moveFiles()
```

Opcionalmente, puedes pasar un valor booleano para controlar si los archivos deben moverse:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->moveFiles(FeatureFlag::active())
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>moveFiles()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Evitar que los archivos se almacenen permanentemente

Si deseas evitar que los archivos se almacenen permanentemente cuando se envíe el formulario, puedes usar el método `storeFiles(false)`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->storeFiles(false)
```

Cuando se envía el formulario, se devolverá un objeto temporal de subida de archivo en lugar de una ruta de archivo almacenada permanentemente. Esto es perfecto para archivos temporales como CSVs importados.

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>storeFiles()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

:::warning
Las imágenes, vídeos y archivos de audio no mostrarán el nombre de archivo almacenado en la previsualización del formulario, a menos que uses [`previewable(false)`](#previewing-files). Esto se debe a una limitación del plugin de previsualización de FilePond.
:::

## Orientar imágenes desde sus datos EXIF

Por defecto, FilePond orientará automáticamente las imágenes basándose en sus datos EXIF. Si deseas deshabilitar este comportamiento, puedes usar el método `orientImagesFromExif(false)`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->orientImagesFromExif(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>orientImagesFromExif()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Ocultar el botón de eliminar archivo

También es posible ocultar el botón de eliminar archivo subido usando `deletable(false)`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->deletable(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>deletable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Evitar pegar archivos

Puedes deshabilitar la capacidad de pegar archivos vía portapapeles usando el método `pasteable(false)`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->pasteable(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>pasteable()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Evitar la obtención de información de archivos

Mientras el formulario se carga, detectará automáticamente si los archivos existen, qué tamaño tienen y qué tipo de archivos son. Todo esto se realiza en el backend. Al usar almacenamiento remoto con muchos archivos, esto puede ser costoso en tiempo. Puedes usar el método `fetchFileInformation(false)` para deshabilitar esta funcionalidad:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->fetchFileInformation(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>fetchFileInformation()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Personalizar el mensaje de subida

Puedes personalizar el mensaje de subida que se muestra en el botón de envío del formulario usando el método `uploadingMessage()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->uploadingMessage('Uploading attachment...')
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método <code>uploadingMessage()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Validación de subida de archivos

Además de todas las reglas listadas en la página de [validación](validation), hay reglas adicionales específicas para las subidas de archivos.

Dado que Filament funciona con Livewire y usa su sistema de subida de archivos, también querrás consultar las reglas de validación por defecto de Livewire en el archivo `config/livewire.php`. Esto también controla el tamaño máximo de archivo de 12MB.

### Validación de tipo de archivo

Puedes restringir los tipos de archivos que pueden subirse usando el método `acceptedFileTypes()`, pasando un array de tipos MIME.

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('document')
    ->acceptedFileTypes(['application/pdf'])
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el método <code>acceptedFileTypes()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

También puedes usar el método `image()` como atajo para permitir todos los tipos MIME de imagen.

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('image')
    ->image()
```

#### Mapeo personalizado de tipos MIME

Algunos formatos de archivo pueden no ser reconocidos correctamente por el navegador al subir. Filament te permite definir manualmente tipos MIME para extensiones específicas usando el método `mimeTypeMap()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('designs')
    ->acceptedFileTypes([
        'x-world/x-3dmf',
        'application/vnd.sketchup.skp',
    ])
    ->mimeTypeMap([
        '3dm' => 'x-world/x-3dmf',
        'skp' => 'application/vnd.sketchup.skp',
    ]);
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, el método <code>mimeTypeMap()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

### Validación de tamaño de archivo

También puedes restringir el tamaño de los archivos subidos en kilobytes:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachment')
    ->minSize(512)
    ->maxSize(1024)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>minSize()</code> y <code>maxSize()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>

#### Subir archivos grandes

Si experimentas problemas al subir archivos grandes, como solicitudes HTTP fallando con estado 422 en la consola del navegador, puede que necesites ajustar tu configuración.

En el archivo `php.ini` de tu servidor, aumentar el tamaño máximo de archivo puede solucionar el problema:

```ini
post_max_size = 120M
upload_max_filesize = 120M
```

Livewire también valida el tamaño de archivo antes de subir. Para publicar el archivo de configuración de Livewire, ejecuta:

```bash
php artisan livewire:publish --config
```

[El tamaño máximo de subida puede ajustarse en la clave `rules` de `temporary_file_upload`](https://livewire.laravel.com/docs/uploads#global-validation). En este caso, se usan KB en la regla, y 120MB son 122880KB:

```php
'temporary_file_upload' => [
    // ...
    'rules' => ['required', 'file', 'max:122880'],
    // ...
],
```

### Validación del número de archivos

Puedes personalizar el número de archivos que pueden subirse usando los métodos `minFiles()` y `maxFiles()`:

```php
use Filament\Forms\Components\FileUpload;

FileUpload::make('attachments')
    ->multiple()
    ->minFiles(2)
    ->maxFiles(5)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir valores estáticos, los métodos <code>minFiles()</code> y <code>maxFiles()</code> también aceptan funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.

</details>
