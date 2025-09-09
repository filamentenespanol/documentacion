---
title: Recursos anidados
---

## Visión general

Los [relation managers](managing-relationships#creating-a-relation-manager) y [relation pages](managing-relationships#relation-pages) te ofrecen una forma sencilla de renderizar una tabla de registros relacionados dentro de un recurso.

Por ejemplo, en un `CourseResource`, puedes tener un relation manager o una página para las `lessons` que pertenecen a ese curso. Puedes crear y editar lecciones desde la tabla, lo que abre diálogos en modales.

Sin embargo, las lecciones pueden ser demasiado complejas para crearlas y editarlas en un modal. Puede que prefieras que las lecciones tengan su propio recurso, de modo que crearlas y editarlas sea una experiencia de página completa. Esto es un **recurso anidado**.

## Crear un recurso anidado

Para crear un recurso anidado, puedes usar el comando `make:filament-resource` con la opción `--nested`:

```bash
php artisan make:filament-resource Lesson --nested
```

Para acceder al recurso anidado, también necesitarás un [relation manager](managing-relationships#creating-a-relation-manager) o una [relation page](managing-relationships#relation-pages). Aquí es donde el usuario podrá ver la lista de registros relacionados y hacer clic en los enlaces para las páginas de "crear" y "editar".

Para crear un relation manager o una relation page, puedes usar los comandos `make:filament-relation-manager` o `make:filament-page`:

```bash
php artisan make:filament-relation-manager CourseResource lessons title

php artisan make:filament-page ManageCourseLessons --resource=CourseResource --type=ManageRelatedRecords
```

Al crear un relation manager o una página, Filament te preguntará si quieres que cada fila de la tabla enlace a un recurso en lugar de abrir un modal. Debes responder "sí" y seleccionar el recurso anidado que acabas de crear.

Después de generar el relation manager o la página, este tendrá una propiedad que apunta hacia el recurso anidado:

```php
use App\Filament\Resources\Courses\Resources\Lessons\LessonResource;

protected static ?string $relatedResource = LessonResource::class;
```

La clase del recurso anidado tendrá una propiedad que apunta al recurso principal:

```php
use App\Filament\Resources\Courses\CourseResource;

protected static ?string $parentResource = CourseResource::class;
```

## Personalizar los nombres de relación

De la misma manera que los relation managers y las páginas predicen el nombre de las relaciones basándose en los modelos, los recursos anidados hacen lo mismo. A veces, puedes tener una relación que no siga la convención de nombres tradicional, y necesitarás indicarle a Filament los nombres correctos de las relaciones para el recurso anidado.

Para personalizar los nombres de relación, primero elimina la propiedad `$parentResource` de la clase del recurso anidado. Luego, define un método `getParentResourceRegistration()`:

```php
use App\Filament\Resources\Courses\CourseResource;
use Filament\Resources\ParentResourceRegistration;

public static function getParentResourceRegistration(): ?ParentResourceRegistration
{
    return CourseResource::asParent()
        ->relationship('lessons')
        ->inverseRelationship('course');
}
```

Puedes omitir las llamadas a `relationship()` y `inverseRelationship()` si quieres usar los nombres predeterminados.

## Registrar un relation manager con la URL correcta

Cuando trabajas con un recurso anidado listado por un relation manager, y este está en medio de otros en esa misma página, puede que notes que la URL hacia él no es correcta al redirigir desde el recurso anidado de regreso. Esto se debe a que cada relation manager registrado en un recurso se le asigna un número entero, que se usa en la URL al alternar entre múltiples relation managers. Por ejemplo, `?relation=0` puede representar un relation manager en la URL y `?relation=1` otro diferente.

Al redirigir desde un recurso anidado a un relation manager, Filament asumirá que se usa el nombre de la relación para identificar ese relation manager en la URL. Por ejemplo, si tienes un `LessonResource` anidado y un `LessonsRelationManager`, el nombre de la relación es `lessons`, y debe usarse como la [clave del parámetro de URL](managing-relationships#customizing-the-relation-managers-url-parameter) para ese relation manager cuando se registre:

```php
public static function getRelations(): array
{
    return [
        'lessons' => LessonsRelationManager::class,
    ];
}
```
