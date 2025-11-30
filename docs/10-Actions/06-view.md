---
title: Action de visualización
---

## Introducción

Filament incluye una action que puede visualizar registros Eloquent. Cuando se hace clic en el botón de activación, se abrirá un modal con información dentro. Filament usa campos de formulario para estructurar esta información. Todos los campos de formulario están deshabilitados, por lo que el usuario no puede editarlos. Puedes usarlo de esta manera:

```php
use Filament\Actions\ViewAction;
use Filament\Forms\Components\TextInput;

ViewAction::make()
    ->schema([
        TextInput::make('title')
            ->required()
            ->maxLength(255),
        // ...
    ])
```

## Personalizar datos antes de llenar el formulario

Es posible que desees modificar los datos de un registro antes de que se llenen en el formulario. Para hacer esto, puedes usar el método `mutateRecordDataUsing()` para modificar el array `$data`, y devolver la versión modificada antes de que se llene en el formulario:

```php
use Filament\Actions\ViewAction;

ViewAction::make()
    ->mutateRecordDataUsing(function (array $data): array {
        $data['user_id'] = auth()->id();

        return $data;
    })
```

<details>
<summary>Información de inyección de utilidades</summary>

Además de `$data`, la función `mutateRecordDataUsing()` puede inyectar varias utilidades como parámetros.

</details>
