---
title: Representación de un esquema en una vista Blade
---

:::warning
    Antes de continuar, asegúrese de que `filament/schemas` esté instalado en su proyecto. Puedes comprobarlo ejecutando:

```bash
    composer show filament/schemas
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

## Agregar el esquema

A continuación, agregue un método al componente Livewire que acepte un objeto `$schema`, lo modifique y lo devuelva:

```php
use Filament\Schemas\Schema;

public function productSchema(Schema $schema): Schema
{
    return $schema
        ->components([
            // ...
        ]);
}
```

Finalmente, renderice el esquema en la vista del componente Livewire:

```blade
{{ $this->productSchema }}
```

:::info
    `filament/schemas` también incluye los siguientes paquetes:

- `filament/actions`
    - `filament/support`
    
Estos paquetes le permiten utilizar sus componentes dentro de los componentes de Livewire.
    Por ejemplo, si su esquema usa [Acciones](../acciones), recuerde implementar la interfaz `HasActions` y ​​usar el rasgo `InteractsWithActions` en su clase de componente Livewire.
    
Si está utilizando otros [componentes de filamento] (descripción general#componentes del paquete) en su esquema, asegúrese de instalar e integrar también el paquete correspondiente.
:::
