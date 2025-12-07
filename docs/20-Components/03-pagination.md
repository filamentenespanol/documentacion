---
title: Componente de paginación Blade
---

## Introducción

El componente de paginación solo se puede utilizar en una vista Livewire Blade. Puede representar una lista de enlaces paginados:

```php
use App\Models\User;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class ListUsers extends Component
{
    // ...
    
    public function render(): View
    {
        return view('livewire.list-users', [
            'users' => User::query()->paginate(10),
        ]);
    }
}
```

```blade
<x-filament::pagination :paginator="$users" />
```

Alternativamente, puede usar paginación simple o paginación con cursor, que simplemente mostrará un botón "anterior" y "siguiente":

```php
use App\Models\User;

User::query()->simplePaginate(10)
User::query()->cursorPaginate(10)
```

## Permitir al usuario personalizar la cantidad de elementos por página

Puede permitir que el usuario personalice la cantidad de elementos por página pasando una serie de opciones al atributo `page-options`. También debes definir una propiedad Livewire donde se almacenará la selección del usuario:

```php
use App\Models\User;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class ListUsers extends Component
{
    public int | string $perPage = 10;
    
    // ...
    
    public function render(): View
    {
        return view('livewire.list-users', [
            'users' => User::query()->paginate($this->perPage),
        ]);
    }
}
```

```blade
<x-filament::pagination
    :paginator="$users"
    :page-options="[5, 10, 20, 50, 100, 'all']"
    :current-page-option-property="perPage"
/>
```

## Mostrando enlaces a la primera y última página

Los enlaces extremos son los enlaces de la primera y la última página. Puedes agregarlos pasando el atributo `extreme-links` al componente:

```blade
<x-filament::pagination
    :paginator="$users"
    extreme-links
/>
```
