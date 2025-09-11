---
title: Consejos de calidad de código
---

## Usar clases de esquema y tabla

Dado que muchos métodos de Filament definen tanto la interfaz de usuario como la funcionalidad de la aplicación en un solo método, es fácil terminar con métodos y archivos gigantes. Estos pueden ser difíciles de leer, incluso si tu código tiene un estilo limpio y consistente.

Filament trata de mitigar esto proporcionando clases dedicadas de esquema y tabla cuando generas un recurso. Estas clases tienen un método `configure()` que acepta un `$schema` o `$table`. Luego puedes llamar al método `configure()` desde cualquier lugar donde quieras definir un esquema o tabla.

Por ejemplo, si tienes el siguiente archivo `app/Filament/Resources/Customers/Schemas/CustomerForm.php`:

```php
namespace App\Filament\Resources\Customers\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CustomerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name'),
                // ...
            ]);
    }
}
```

Puedes usarlo en el método `form()` del recurso:

```php
use App\Filament\Resources\Customers\Schemas\CustomerForm;
use Filament\Schemas\Schema;

public static function form(Schema $schema): Schema
{
    return CustomerForm::configure($schema);
}
```

Podrías hacer lo mismo para `table()`:

```php
use App\Filament\Resources\Customers\Schemas\CustomersTable;
use Filament\Tables\Table;

public static function table(Table $table): Table
{
    return CustomersTable::configure($table);
}
```

O para `infolist()`:

```php
use App\Filament\Resources\Customers\Schemas\CustomerInfolist;
use Filament\Schemas\Schema;

public static function infolist(Schema $schema): Schema
{
    return CustomerInfolist::configure($schema);
}
```

Estas clases de esquema y tabla deliberadamente no tienen una clase padre o interfaz por defecto. Si Filament forzara una firma de método para `configure()`, no podrías pasar tus propias variables de configuración al método, lo cual podría ser útil si quisieras reutilizar la misma clase en múltiples lugares con pequeños ajustes.

## Usar clases de componentes

Incluso si estás usando [clases de esquema y tabla](#using-schema-and-table-classes) para mantener las definiciones de esquema y tabla en sus propios archivos, aún puedes terminar con un método `configure()` muy largo. Esto es especialmente cierto si estás usando muchos componentes en tu esquema o tabla, o si los componentes requieren mucha configuración.

Puedes mitigar esto creando clases dedicadas para cada componente. Por ejemplo, si tienes un componente `TextInput` que requiere mucha configuración, puedes crear una clase dedicada para él:

```php
namespace App\Filament\Resources\Customers\Schemas\Components;

use Filament\Forms\Components\TextInput;

class CustomerNameInput
{
    public static function make(): TextInput
    {
        return TextInput::make('name')
            ->label('Nombre completo')
            ->required()
            ->maxLength(255)
            ->placeholder('Ingresa tu nombre completo')
            ->belowContent('Este es el nombre que se mostrará en tu perfil.');
    }
}
```

Luego puedes usar esta clase en tu esquema o tabla:

```php
use App\Filament\Resources\Customers\Schemas\Components\CustomerNameInput;
use Filament\Schemas\Schema;

public static function configure(Schema $schema): Schema
{
    return $schema
        ->components([
            CustomerNameInput::make(),
            // ...
        ]);
}
```

Podrías hacer esto con varios tipos diferentes de componentes. No hay reglas forzadas sobre cómo estos componentes deberían nombrarse o dónde deberían almacenarse. Sin embargo, aquí tienes algunas ideas:

- **Componentes de esquema**: Estos podrían vivir en el directorio `Schemas/Components` del recurso. Podrían nombrarse según el componente que están envolviendo, por ejemplo `CustomerNameInput` o `CustomerCountrySelect`.
- **Columnas de tabla**: Estas podrían vivir en el directorio `Tables/Columns` del recurso. Podrían nombrarse según la columna seguida de `Column`, por ejemplo `CustomerNameColumn` o `CustomerCountryColumn`.
- **Filtros de tabla**: Estos podrían vivir en el directorio `Tables/Filters` del recurso. Podrían nombrarse según el filtro seguido de `Filter`, por ejemplo `CustomerCountryFilter` o `CustomerStatusFilter`.
- **Acciones**: Estas podrían vivir en el directorio `Actions` del recurso. Podrían nombrarse según la acción seguida de `Action` o `BulkAction`, por ejemplo `EmailCustomerAction` o `UpdateCustomerCountryBulkAction`.

Como ejemplo adicional, aquí tienes una posible clase `EmailCustomerAction`:

```php
namespace App\Filament\Resources\Customers\Actions;

use App\Models\Customer;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Support\Icons\Heroicon;

class EmailCustomerAction
{
    public static function make(): Action
    {
        return Action::make('email')
            ->label('Enviar email')
            ->icon(Heroicon::Envelope)
            ->schema([
                TextInput::make('subject')
                    ->required()
                    ->maxLength(255),
                Textarea::make('body')
                    ->autosize()
                    ->required(),
            ])
            ->action(function (Customer $customer, array $data) {
                // ...
            });
    }
}
```

Y podrías usarla en `getHeaderActions()` de una página:

```php
use App\Filament\Resources\Customers\Actions\EmailCustomerAction;

protected function getHeaderActions(): array
{
    return [
        EmailCustomerAction::make(),
    ];
}
```

O podrías usarla en una fila de tabla:

```php
use App\Filament\Resources\Customers\Actions\EmailCustomerAction;
use Filament\Tables\Table;

public static function configure(Table $table): Table
{
    return $table
        ->columns([
            // ...
        ])
        ->recordActions([
            EmailCustomerAction::make(),
        ]);
}
```
