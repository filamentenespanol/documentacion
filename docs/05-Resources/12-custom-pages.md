---
title: Páginas personalizadas de recursos
---

## Introducción

Filament te permite crear páginas completamente personalizadas para los recursos. Para crear una nueva página, puedes usar:

```bash
php artisan make:filament-page SortUsers --resource=UserResource --type=custom
```

Este comando creará dos archivos: una clase de página en el directorio `/Pages` de tu recurso y una vista en el directorio `/pages` de las vistas del recurso.

Debes registrar las páginas personalizadas en una ruta dentro del método estático `getPages()` de tu recurso:

```php
public static function getPages(): array
{
    return [
        // ...
        'sort' => Pages\SortUsers::route('/sort'),
    ];
}
```

:::warning
El orden de las páginas registradas en este método es importante: cualquier segmento comodín definido antes que rutas codificadas se corresponderá primero en el enrutador de Laravel.
:::

Cualquier [parámetro](https://laravel.com/docs/routing#route-parameters) definido en la ruta estará disponible en la clase de la página, de manera idéntica a como funciona en [Livewire](https://livewire.laravel.com/docs/components#accessing-route-parameters).

## Usar un registro de recurso

Si deseas crear una página que use un registro, similar a las páginas de [Editar](editing-records) o [Ver](viewing-records), puedes usar el trait `InteractsWithRecord`:

```php
use Filament\Resources\Pages\Page;
use Filament\Resources\Pages\Concerns\InteractsWithRecord;

class ManageUser extends Page
{
    use InteractsWithRecord;

    public function mount(int | string $record): void
    {
        $this->record = $this->resolveRecord($record);
    }

    // ...
}
```

El método `mount()` debe resolver el registro desde la URL y almacenarlo en `$this->record`. Puedes acceder al registro en cualquier momento usando `$this->getRecord()` en la clase o en la vista.

Para añadir el registro como parámetro en la ruta, debes definir `{record}` en `getPages()`:

```php
public static function getPages(): array
{
    return [
        // ...
        'manage' => Pages\ManageUser::route('/{record}/manage'),
    ];
}
```
