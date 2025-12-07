---
title: Trucos de enumeración
---

## Introducción

Las enumeraciones son clases especiales de PHP que representan un conjunto fijo de constantes. Son útiles para modelar conceptos que tienen un número limitado de valores posibles, como los días de la semana, los meses del año o los palos de una baraja de cartas.

Dado que los "casos" de enumeración son instancias de la clase enum, agregar interfaces a las enumeraciones resulta muy útil. Filament proporciona una colección de interfaces que puede agregar a enumeraciones, lo que mejora su experiencia al trabajar con ellas.

:::warning
    Cuando utilice una enumeración con un atributo en su modelo de Eloquent, [asegúrese de que se emita correctamente] (https://laravel.com/docs/eloquent-mutators#enum-casting).
:::

## Etiquetas de enumeración

La interfaz `HasLabel` transforma una instancia de enumeración en una etiqueta textual. Esto es útil para mostrar valores de enumeración legibles por humanos en su interfaz de usuario.

```php
use Filament\Support\Contracts\HasLabel;

enum Status: string implements HasLabel
{
    case Draft = 'draft';
    case Reviewing = 'reviewing';
    case Published = 'published';
    case Rejected = 'rejected';
    
    public function getLabel(): ?string
    {
        return $this->name;
        
        // or
    
        return match ($this) {
            self::Draft => 'Draft',
            self::Reviewing => 'Reviewing',
            self::Published => 'Published',
            self::Rejected => 'Rejected',
        };
    }
}
```

### Usando la etiqueta de enumeración con opciones de campo de formulario

La interfaz `HasLabel` se puede utilizar para generar una serie de opciones a partir de una enumeración, donde el valor de la enumeración es la clave y la etiqueta de la enumeración es el valor. Esto se aplica a campos de formulario como [`Select`](../forms/select) y [`CheckboxList`](../forms/checkbox-list), así como a [`SelectColumn`](../tables/columns/select) y [`SelectFilter`](../tables/filters/select) del Generador de tablas:

```php
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Filters\SelectFilter;

Select::make('status')
    ->options(Status::class)

CheckboxList::make('status')
    ->options(Status::class)

Radio::make('status')
    ->options(Status::class)

SelectColumn::make('status')
    ->options(Status::class)

SelectFilter::make('status')
    ->options(Status::class)
```

En estos ejemplos, `Status::class` es la clase de enumeración que implementa `HasLabel`, y las opciones se generan a partir de eso:

```php
[
    'draft' => 'Draft',
    'reviewing' => 'Reviewing',
    'published' => 'Published',
    'rejected' => 'Rejected',
]
```

### Usando la etiqueta enum con una columna de texto en su tabla

Si usa un [`TextColumn`](../tables/columns/text) con Table Builder y se convierte en una enumeración en su modelo Eloquent, Filament usará automáticamente la interfaz `HasLabel` para mostrar la etiqueta de la enumeración en lugar de su valor sin formato.

### Usando la etiqueta enum como título de grupo en su tabla

Si usa una [agrupación](../tables/grouping) con Table Builder y se convierte en una enumeración en su modelo Eloquent, Filament usará automáticamente la interfaz `HasLabel` para mostrar la etiqueta de la enumeración en lugar de su valor sin procesar. La etiqueta se mostrará como el [título de cada grupo](../tables/grouping#setting-a-group-title).

### Usando la etiqueta enum con una entrada de texto en tu infolista

Si usa un [`TextEntry`](../infolists/text-entry) en una infolista y se convierte en una enumeración en su modelo Eloquent, Filament usará automáticamente la interfaz `HasLabel` para mostrar la etiqueta de la enumeración en lugar de su valor sin procesar.

## Colores de enumeración

La interfaz `HasColor` transforma una instancia de enumeración en un [color](colores). Esto es útil para mostrar valores de enumeración coloreados en su interfaz de usuario.

```php
use Filament\Support\Contracts\HasColor;

enum Status: string implements HasColor
{
    case Draft = 'draft';
    case Reviewing = 'reviewing';
    case Published = 'published';
    case Rejected = 'rejected';
    
    public function getColor(): string | array | null
    {
        return match ($this) {
            self::Draft => 'gray',
            self::Reviewing => 'warning',
            self::Published => 'success',
            self::Rejected => 'danger',
        };
    }
}
```

### Usando el color de enumeración con una columna de texto en su tabla

Si usa un [`TextColumn`](../tables/columns/text) con Table Builder y se convierte en una enumeración en su modelo Eloquent, Filament usará automáticamente la interfaz `HasColor` para mostrar la etiqueta de enumeración en su color. Esto funciona mejor si usa el método [`badge()`](../tables/columns/text#displaying-as-a-badge) en la columna.

### Usando el color de enumeración con una entrada de texto en tu infolista

Si usa un [`TextEntry`](../infolists/text-entry) en una infolista y se convierte en una enumeración en su modelo Eloquent, Filament usará automáticamente la interfaz `HasColor` para mostrar la etiqueta de enumeración en su color. Esto funciona mejor si utiliza el método [`badge()`](../infolists/text#displaying-as-a-badge) en la entrada.

### Usando el color de enumeración con un campo de botones de alternancia en su formulario

Si usa un campo de formulario [`ToggleButtons`](../forms/toggle-buttons) y está configurado para usar una enumeración para sus opciones, Filament usará automáticamente la interfaz `HasColor` para mostrar la etiqueta de enumeración en su color.

## Iconos de enumeración

La interfaz `HasIcon` transforma una instancia de enumeración en un [icono](iconos). Esto es útil para mostrar íconos junto con valores de enumeración en su interfaz de usuario.

```php
use Filament\Support\Contracts\HasIcon;

enum Status: string implements HasIcon
{
    case Draft = 'draft';
    case Reviewing = 'reviewing';
    case Published = 'published';
    case Rejected = 'rejected';
    
    public function getIcon(): ?string
    {
        return match ($this) {
            self::Draft => 'heroicon-m-pencil',
            self::Reviewing => 'heroicon-m-eye',
            self::Published => 'heroicon-m-check',
            self::Rejected => 'heroicon-m-x-mark',
        };
    }
}
```

### Usando el icono de enumeración con una columna de texto en su tabla

Si usa un [`TextColumn`](../tables/columns/text) con Table Builder y se convierte en una enumeración en su modelo Eloquent, Filament usará automáticamente la interfaz `HasIcon` para mostrar el icono de la enumeración junto a su etiqueta. Esto funciona mejor si usa el método [`badge()`](../tables/columns/text#displaying-as-a-badge) en la columna.

### Usando el icono de enumeración con una entrada de texto en su infolista

Si usa un [`TextEntry`](../infolists/text-entry) en una infolista y se convierte en una enumeración en su modelo Eloquent, Filament usará automáticamente la interfaz `HasIcon` para mostrar el icono de la enumeración junto a su etiqueta. Esto funciona mejor si utiliza el método [`badge()`](../infolists/text#displaying-as-a-badge) en la entrada.

### Usando el ícono de enumeración con un campo de botones de alternancia en su formulario

Si usa un campo de formulario [`ToggleButtons`](../forms/toggle-buttons) y está configurado para usar una enumeración para sus opciones, Filament usará automáticamente la interfaz `HasIcon` para mostrar el icono de la enumeración junto a su etiqueta.

## Descripciones de enumeración

La interfaz `HasDescription` transforma una instancia de enumeración en una descripción textual, que a menudo se muestra debajo de su [etiqueta](#enum-labels). Esto es útil para mostrar descripciones amigables para los humanos en su interfaz de usuario.

```php
use Filament\Support\Contracts\HasDescription;
use Filament\Support\Contracts\HasLabel;

enum Status: string implements HasLabel, HasDescription
{
    case Draft = 'draft';
    case Reviewing = 'reviewing';
    case Published = 'published';
    case Rejected = 'rejected';
    
    public function getLabel(): ?string
    {
        return $this->name;
    }
    
    public function getDescription(): ?string
    {
        return match ($this) {
            self::Draft => 'This has not finished being written yet.',
            self::Reviewing => 'This is ready for a staff member to read.',
            self::Published => 'This has been approved by a staff member and is public on the website.',
            self::Rejected => 'A staff member has decided this is not appropriate for the website.',
        };
    }
}
```

### Uso de la descripción de enumeración con descripciones de campos de formulario

La interfaz `HasDescription` se puede utilizar para generar una matriz de descripciones a partir de una enumeración, donde el valor de la enumeración es la clave y la descripción de la enumeración es el valor. Esto se aplica a campos de formulario como [`Radio`](../forms/radio#setting-option-descriptions) y [`CheckboxList`](../forms/checkbox-list#setting-option-descriptions):

```php
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\Radio;

Radio::make('status')
    ->options(Status::class)

CheckboxList::make('status')
    ->options(Status::class)
```
