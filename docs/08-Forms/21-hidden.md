---
title: Hidden
---

## Introducción

El componente hidden te permite crear un campo oculto en tu formulario que contiene un valor.

```php
use Filament\Forms\Components\Hidden;

Hidden::make('token')
```

Ten en cuenta que el valor de este campo sigue siendo editable por el usuario si decide usar las herramientas de desarrollo del navegador. No debes usar este componente para almacenar información sensible o de solo lectura.
