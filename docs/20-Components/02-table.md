---
title: Representar una tabla en una vista Blade
---

:::warning
    Antes de continuar, asegúrese de que `filament/tables` esté instalado en su proyecto. Puedes comprobarlo ejecutando:

```bash
    composer show filament/tables
    ```
    Si no está instalado, consulte la [guía de instalación](../introduction/installation#installing-the-individual-components) y configure los **componentes individuales** según las instrucciones.
:::

## Configurando el componente Livewire

Primero, genere un nuevo componente Livewire:

```bash
php artisan make:livewire ListProducts
```

Luego, renderice su componente Livewire en la página:

```blade
@livewire('list-products')
```

Alternativamente, puede utilizar un componente Livewire de página completa:

```php
use App\Livewire\ListProducts;
use Illuminate\Support\Facades\Route;

Route::get('products', ListProducts::class);
```

## Agregar la tabla

Hay 3 tareas al agregar una tabla a una clase de componente Livewire:

1) Implemente las interfaces `HasTable` y ​​`HasSchemas`, y use los rasgos `InteractsWithTable` y ​​`InteractsWithSchemas`.
2) Agrega un método `table()`, que es donde configuras la tabla. [Agregue las columnas, los filtros y las acciones de la tabla](primeros pasos#columnas).
3) Asegúrese de definir la consulta base que se utilizará para recuperar filas en la tabla. Por ejemplo, si publicas productos de tu modelo `Product`, querrás devolver `Product::query()`.

```php
<?php

namespace App\Livewire;

use App\Models\Shop\Product;
use Filament\Actions\Concerns\InteractsWithActions;  
use Filament\Actions\Contracts\HasActions;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class ListProducts extends Component implements HasActions, HasSchemas, HasTable
{
    use InteractsWithActions;
    use InteractsWithSchemas;
    use InteractsWithTable;
    
    public function table(Table $table): Table
    {
        return $table
            ->query(Product::query())
            ->columns([
                TextColumn::make('name'),
            ])
            ->filters([
                // ...
            ])
            ->recordActions([
                // ...
            ])
            ->toolbarActions([
                // ...
            ]);
    }
    
    public function render(): View
    {
        return view('livewire.list-products');
    }
}
```

Finalmente, en la vista de tu componente Livewire, renderiza la tabla:

```blade
<div>
    {{ $this->table }}
</div>
```

Visite su componente Livewire en el navegador y debería ver la tabla.

:::info

`filament/tables` también incluye los siguientes paquetes:
    
- `filament/actions`
    - `filament/forms`
    - `filament/support`
    
Estos paquetes le permiten utilizar sus componentes dentro de los componentes de Livewire.
    Por ejemplo, si su tabla usa [Acciones](acción#configuración-del-componente-livewire), recuerde implementar la interfaz `HasActions` e incluir el rasgo `InteractsWithActions`.
    
Si está utilizando otros [componentes de filamento] (descripción general#componentes del paquete) en su tabla, asegúrese de instalar e integrar también el paquete correspondiente.
:::

## Construyendo una tabla para una relación Elocuente

Si desea crear una tabla para una relación Eloquent, puede usar los métodos `relationship()` y ​​`inverseRelationship()` en `$table` en lugar de pasar un `query()`. Las relaciones `HasMany`, `HasManyThrough`, `BelongsToMany`, `MorphMany` y ​​`MorphToMany` son compatibles:

```php
use App\Models\Category;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

public Category $category;

public function table(Table $table): Table
{
    return $table
        ->relationship(fn (): BelongsToMany => $this->category->products())
        ->inverseRelationship('categories')
        ->columns([
            TextColumn::make('name'),
        ]);
}
```

En este ejemplo, tenemos una propiedad `$category` que contiene una instancia del modelo `Category`. La categoría tiene una relación denominada `products`. Usamos una función para devolver la instancia de relación. Esta es una relación de muchos a muchos, por lo que la relación inversa se llama `categories` y ​​se define en el modelo `Product`. Sólo necesitamos pasar el nombre de esta relación al método `inverseRelationship()`, no la instancia completa.

Ahora que la tabla utiliza una relación en lugar de una simple consulta Eloquent, todas las acciones se realizarán en la relación en lugar de en la consulta. Por ejemplo, si usas un [`CreateAction`](../actions/create), el nuevo producto se adjuntará automáticamente a la categoría.

Si su relación usa una tabla dinámica, puede usar todas las columnas dinámicas como si fueran columnas normales en su tabla, siempre y cuando estén enumeradas en el método `withPivot()` de la relación *y* la definición de relación inversa.

Las tablas de relaciones se utilizan en el Generador de paneles como ["administradores de relaciones"](../panels/resources/managing-relationships#creating-a-relation-manager). La mayoría de las funciones documentadas para administradores de relaciones también están disponibles para tablas de relaciones. Por ejemplo, acciones de [adjuntar y separar](../panels/resources/managing-relationships#attaching-and-detaching-records) y [asociar y disociar](../panels/resources/relation-managers#associating-and-disociating-records).

## Generando componentes de tabla Livewire con la CLI

Se recomienda que aprenda cómo configurar un componente Livewire con Table Builder manualmente, pero una vez que esté seguro, puede usar la CLI para generar una tabla para usted.

```bash
php artisan make:livewire-table Products/ListProducts
```

Esto le pedirá el nombre de un modelo prediseñado, por ejemplo `Product`. Finalmente, generará un nuevo componente `app/Livewire/Products/ListProducts.php`, que podrás personalizar.

### Generar columnas de tabla automáticamente

Filament también puede adivinar qué columnas de la tabla desea en la tabla, según las columnas de la base de datos del modelo. Puede utilizar el indicador `--generate` al generar su tabla:

```bash
php artisan make:livewire-table Products/ListProducts --generate
```
