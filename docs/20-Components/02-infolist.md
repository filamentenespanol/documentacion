---
title: Representación de una infolista en una vista Blade
---

:::warning
    Antes de continuar, asegúrese de que `filament/infolists` esté instalado en su proyecto. Puedes comprobarlo ejecutando:

```bash
    composer show filament/infolists
    ```
    Si no está instalado, consulte la [guía de instalación](../introduction/installation#installing-the-individual-components) y configure los **componentes individuales** según las instrucciones.
:::

## Configurando el componente Livewire

Primero, genere un nuevo componente Livewire:

```bash
php artisan make:livewire ViewProduct
```

Luego, renderice su componente Livewire en la página:

```blade
@livewire('view-product')
```

Alternativamente, puede utilizar un componente Livewire de página completa:

```php
use App\Livewire\ViewProduct;
use Illuminate\Support\Facades\Route;

Route::get('products/{product}', ViewProduct::class);
```

Debe utilizar el rasgo `InteractsWithSchemas` e implementar la interfaz `HasSchemas` en su clase de componente Livewire:

```php
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Livewire\Component;

class ViewProduct extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    // ...
}
```

## Agregar la infolista

A continuación, agregue un método al componente Livewire que acepte un objeto `$infolist`, lo modifique y lo devuelva:

```php
use Filament\Schemas\Schema;

public function productInfolist(Schema $schema): Schema
{
    return $schema
        ->record($this->product)
        ->components([
            // ...
        ]);
}
```

Finalmente, renderice la infolista en la vista del componente Livewire:

```blade
{{ $this->productInfolist }}
```

:::info
    `filament/infolists` también incluye los siguientes paquetes:

- `filament/actions`
    - `filament/schemas`
    - `filament/support`
    
Estos paquetes le permiten utilizar sus componentes dentro de los componentes de Livewire.
    Por ejemplo, si su infolista usa [Acciones](../acciones), recuerde implementar la interfaz `HasActions` y ​​usar el rasgo `InteractsWithActions` en su clase de componente Livewire.
    
Si está utilizando otros [componentes de filamento] (descripción general#componentes del paquete) en su infolista, asegúrese de instalar e integrar también el paquete correspondiente.

:::

## Pasando datos a la infolista

Puede pasar datos a la infolista de dos maneras:

Pase una instancia del modelo Eloquent al método `record()` de la infolista, para asignar automáticamente todos los atributos y relaciones del modelo a las entradas en el esquema de la infolista:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

public function productInfolist(Schema $schema): Schema
{
    return $schema
        ->record($this->product)
        ->components([
            TextEntry::make('name'),
            TextEntry::make('category.name'),
            // ...
        ]);
}
```

Alternativamente, puede pasar una matriz de datos al método `state()` de la infolista, para asignar manualmente los datos a las entradas en el esquema de la infolista:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

public function productInfolist(Schema $schema): Schema
{
    return $schema
        ->constantState([
            'name' => 'MacBook Pro',
            'category' => [
                'name' => 'Laptops',
            ],
            // ...
        ])
        ->components([
            TextEntry::make('name'),
            TextEntry::make('category.name'),
            // ...
        ]);
}
```
