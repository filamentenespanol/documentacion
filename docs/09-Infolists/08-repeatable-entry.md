---
title: Entrada repetible
---

## Introducción

La entrada repetible te permite repetir un conjunto de entradas y componentes de diseño para elementos en un array o relación.

```php
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;

RepeatableEntry::make('comments')
    ->schema([
        TextEntry::make('author.name'),
        TextEntry::make('title'),
        TextEntry::make('content')
            ->columnSpan(2),
    ])
    ->columns(2)
```

Como puedes ver, la entrada repetible tiene un `schema()` embebido que se repite para cada elemento.

Por ejemplo, el estado de esta entrada podría representarse como:

```php
[
    [
        'author' => ['name' => 'Jane Doe'],
        'title' => 'Wow!',
        'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl.',
    ],
    [
        'author' => ['name' => 'John Doe'],
        'title' => 'This isn\'t working. Help!',
        'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl.',
    ],
]
```

Alternativamente, `comments` y `author` podrían ser relaciones Eloquent, `title` y `content` podrían ser atributos en el modelo de comentario, y `name` podría ser un atributo en el modelo de autor. Filament manejará automáticamente la carga de relaciones y mostrará los datos de la misma manera.

## Diseño de cuadrícula

Puedes organizar elementos repetibles en columnas usando el método `grid()`:

```php
use Filament\Infolists\Components\RepeatableEntry;

RepeatableEntry::make('comments')
    ->schema([
        // ...
    ])
    ->grid(2)
```

Este método acepta las mismas opciones que el método `columns()` de la [cuadrícula](../schemas/layouts#grid-system). Esto te permite personalizar de manera responsiva el número de columnas de cuadrícula en varios puntos de interrupción.

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `grid()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>

## Eliminando el contenedor estilizado

Por defecto, cada elemento en una entrada repetible está envuelto en un contenedor estilizado como una tarjeta. Puedes eliminar el contenedor estilizado usando `contained()`:

```php
use Filament\Infolists\Components\RepeatableEntry;

RepeatableEntry::make('comments')
    ->schema([
        // ...
    ])
    ->contained(false)
```

<details>
<summary>Inyección de utilidades</summary>

Además de permitir un valor estático, el método `contained()` también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.

</details>
