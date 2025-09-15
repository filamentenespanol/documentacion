---
title: Filtros personalizados
---

## Esquemas de filtros personalizados

Puedes usar [componentes de esquema](../../schemas) para crear filtros personalizados. Los datos del esquema del filtro personalizado están disponibles en el array `$data` del callback `query()`:

```php
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

Filter::make('created_at')
    ->schema([
        DatePicker::make('created_from'),
        DatePicker::make('created_until'),
    ])
    ->query(function (Builder $query, array $data): Builder {
        return $query
            ->when(
                $data['created_from'],
                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
            )
            ->when(
                $data['created_until'],
                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
            );
    })
```

<details>
<summary>💡 Utility Injection</summary>

La función `query()` puede inyectar varias utilidades en la función como parámetros.

</details>

### Establecer valores por defecto para campos de filtros personalizados

Para personalizar el valor por defecto de un campo en un esquema de filtro personalizado, puedes usar el método `default()`:

```php
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Filters\Filter;

Filter::make('created_at')
    ->schema([
        DatePicker::make('created_from'),
        DatePicker::make('created_until')
            ->default(now()),
    ])
```

## Indicadores activos

Cuando un filtro está activo, se muestra un indicador encima del contenido de la tabla para señalar que la consulta de la tabla ha sido delimitada.

Por defecto, la etiqueta del filtro se usa como indicador. Puedes sobrescribir esto usando el método `indicator()`:

```php
use Filament\Tables\Filters\Filter;

Filter::make('is_admin')
    ->label('¿Solo administradores?')
    ->indicator('Administradores')
```

Si estás usando un [esquema de filtro personalizado](#esquemas-de-filtros-personalizados), debes usar [`indicateUsing()`](#indicadores-activos-personalizados) para mostrar un indicador activo.

Nota importante: si no tienes un indicador para tu filtro, entonces el contador de insignias de cuántos filtros están activos en la tabla no incluirá ese filtro.

### Indicadores activos personalizados

No todos los indicadores son simples, por lo que puede que necesites usar `indicateUsing()` para personalizar qué indicadores deben mostrarse en cualquier momento.

Por ejemplo, si tienes un filtro de fecha personalizado, puedes crear un indicador personalizado que formatee la fecha seleccionada:

```php
use Carbon\Carbon;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Filters\Filter;

Filter::make('created_at')
    ->schema([DatePicker::make('date')])
    // ...
    ->indicateUsing(function (array $data): ?string {
        if (! $data['date']) {
            return null;
        }

        return 'Creado el ' . Carbon::parse($data['date'])->toFormattedDateString();
    })
```

### Múltiples indicadores activos

Incluso puedes renderizar múltiples indicadores a la vez, devolviendo un array de objetos `Indicator`. Si tienes diferentes campos asociados con diferentes indicadores, debes establecer el campo usando el método `removeField()` en el objeto `Indicator` para asegurar que el campo correcto se reinicie cuando se elimine el filtro:

```php
use Carbon\Carbon;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\Indicator;

Filter::make('created_at')
    ->schema([
        DatePicker::make('from'),
        DatePicker::make('until'),
    ])
    // ...
    ->indicateUsing(function (array $data): array {
        $indicators = [];

        if ($data['from'] ?? null) {
            $indicators[] = Indicator::make('Creado desde ' . Carbon::parse($data['from'])->toFormattedDateString())
                ->removeField('from');
        }

        if ($data['until'] ?? null) {
            $indicators[] = Indicator::make('Creado hasta ' . Carbon::parse($data['until'])->toFormattedDateString())
                ->removeField('until');
        }

        return $indicators;
    })
```

### Prevenir que los indicadores sean eliminados

Puedes prevenir que los usuarios eliminen un indicador usando `removable(false)` en un objeto `Indicator`:

```php
use Carbon\Carbon;
use Filament\Tables\Filters\Indicator;

Indicator::make('Creado desde ' . Carbon::parse($data['from'])->toFormattedDateString())
    ->removable(false)
```
