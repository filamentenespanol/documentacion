---
title: Validation
---

## Introducción

Se pueden añadir reglas de validación a cualquier [campo](overview#available-fields).

En Laravel, las reglas de validación suelen definirse en arrays como `['required', 'max:255']` o en una cadena combinada como `required|max:255`. Esto está bien si trabajas exclusivamente en el backend con solicitudes de formulario simples. Pero Filament también puede ofrecer validación en el frontend, para que tus usuarios corrijan errores antes de que se realicen solicitudes al backend.

Filament incluye muchos [métodos de validación dedicados](#available-rules), pero también puedes usar [otras reglas de validación de Laravel](#other-rules), incluidas [reglas personalizadas](#custom-rules).

:::warning
Algunas reglas de validación predeterminadas de Laravel dependen de nombres de atributos correctos y no funcionarán cuando se pasen mediante `rule()`/`rules()`. Usa los métodos de validación dedicados siempre que puedas.
:::

## Available rules

### Active URL

El campo debe tener un registro A o AAAA válido según la función de PHP `dns_get_record()`. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-active-url)

```php
Field::make('name')->activeUrl()
```

### After (date)

El valor del campo debe ser una fecha posterior a otra dada. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-after)

```php
Field::make('start_date')->after('tomorrow')
```

Alternativamente, puedes pasar el nombre de otro campo para compararlo:

```php
Field::make('start_date')
Field::make('end_date')->after('start_date')
```

### After or equal to (date)

El valor del campo debe ser una fecha posterior o igual a la dada. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-after-or-equal)

```php
Field::make('start_date')->afterOrEqual('tomorrow')
```

Alternativamente, puedes pasar el nombre de otro campo para compararlo:

```php
Field::make('start_date')
Field::make('end_date')->afterOrEqual('start_date')
```

### Alpha

El campo debe contener únicamente caracteres alfabéticos. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-alpha)

```php
Field::make('name')->alpha()
```

### Alpha Dash

El campo puede contener caracteres alfanuméricos, así como guiones y guiones bajos. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-alpha-dash)

```php
Field::make('name')->alphaDash()
```

### Alpha Numeric

El campo debe contener únicamente caracteres alfanuméricos. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-alpha-num)

```php
Field::make('name')->alphaNum()
```

### ASCII

El campo debe contener únicamente caracteres ASCII de 7 bits. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-ascii)

```php
Field::make('name')->ascii()
```

### Before (date)

El valor del campo debe ser una fecha anterior a una dada. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-before)

```php
Field::make('start_date')->before('first day of next month')
```

Alternativamente, puedes pasar el nombre de otro campo para compararlo:

```php
Field::make('start_date')->before('end_date')
Field::make('end_date')
```

### Before or equal to (date)

El valor del campo debe ser una fecha anterior o igual a la dada. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-before-or-equal)

```php
Field::make('start_date')->beforeOrEqual('end of this month')
```

Alternativamente, puedes pasar el nombre de otro campo para compararlo:

```php
Field::make('start_date')->beforeOrEqual('end_date')
Field::make('end_date')
```

### Confirmed

El campo debe tener un campo coincidente `{field}_confirmation`. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-confirmed)

```php
Field::make('password')->confirmed()
Field::make('password_confirmation')
```

### Different

El valor del campo debe ser diferente a otro. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-different)

```php
Field::make('backup_email')->different('email')
```

### Doesn't Start With

El campo no debe comenzar con ninguno de los valores dados. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-doesnt-start-with)

```php
Field::make('name')->doesntStartWith(['admin'])
```

### Doesn't End With

El campo no debe terminar con ninguno de los valores dados. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-doesnt-end-with)

```php
Field::make('name')->doesntEndWith(['admin'])
```

### Ends With

El campo debe terminar con uno de los valores dados. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-ends-with)

```php
Field::make('name')->endsWith(['bot'])
```

### Enum

El campo debe contener un valor enum válido. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-enum)

```php
Field::make('status')->enum(MyStatus::class)
```

### Exists

El valor del campo debe existir en la base de datos. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-exists)

```php
Field::make('invitation')->exists()
```

De forma predeterminada, se buscará en el modelo del formulario, [si está registrado](../components/form#setting-a-form-model). Puedes especificar una tabla o modelo personalizado donde buscar:

```php
use App\Models\Invitation;

Field::make('invitation')->exists(table: Invitation::class)
```

Por defecto, se usará el nombre del campo como columna a buscar. Puedes especificar una columna personalizada:

```php
Field::make('invitation')->exists(column: 'id')
```

Puedes personalizar aún más la regla pasando un [closure](overview#closure-customization) al parámetro `modifyRuleUsing`:

```php
use Illuminate\Validation\Rules\Exists;

Field::make('invitation')
    ->exists(modifyRuleUsing: function (Exists $rule) {
        return $rule->where('is_active', 1);
    })
```

La regla `exists` de Laravel no usa el modelo Eloquent para consultar la base de datos por defecto, por lo que no aplicará ningún scope global definido en el modelo, incluidos los de soft-deletes. Por ello, incluso si existe un registro con soft-delete con el mismo valor, la validación pasará.

Dado que no se aplican scopes globales, la característica de multi-tenant de Filament tampoco delimita la consulta al tenant actual por defecto.

Para ello, debes usar el método `scopedExists()`, que reemplaza la implementación `exists` de Laravel por una que use el modelo para consultar la base de datos, aplicando cualquier scope global definido en el modelo, incluidos soft-deletes y multi-tenant:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('email')
    ->scopedExists()
```

Si deseas modificar la consulta Eloquent usada para comprobar la presencia, incluido eliminar un scope global, puedes pasar una función al parámetro `modifyQueryUsing`:

```php
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

TextInput::make('email')
    ->scopedExists(modifyQueryUsing: function (Builder $query) {
        return $query->withoutGlobalScope(SoftDeletingScope::class);
    })
```

### Filled

El campo no debe estar vacío cuando está presente. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-filled)

```php
Field::make('name')->filled()
```

### Greater than

El valor del campo debe ser mayor que otro. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-gt)

```php
Field::make('newNumber')->gt('oldNumber')
```

### Greater than or equal to

El valor del campo debe ser mayor o igual que otro. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-gte)

```php
Field::make('newNumber')->gte('oldNumber')
```

### Hex color

El valor del campo debe ser un color hexadecimal válido. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-hex-color)

```php
Field::make('color')->hexColor()
```

### In

El campo debe estar incluido en la lista de valores proporcionada. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-in)

```php
Field::make('status')->in(['pending', 'completed'])
```

Los campos [toggle buttons](toggle-buttons), [checkbox list](checkbox-list), [radio](radio) y [select](select#valid-options-validation-in-rule) aplican automáticamente la regla `in()` según sus opciones disponibles, por lo que no necesitas añadirla manualmente.

### Ip Address

El campo debe ser una dirección IP. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-ip)

```php
Field::make('ip_address')->ip()
Field::make('ip_address')->ipv4()
Field::make('ip_address')->ipv6()
```

### JSON

El campo debe ser una cadena JSON válida. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-json)

```php
Field::make('ip_address')->json()
```

### Less than

El valor del campo debe ser menor que otro. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-lt)

```php
Field::make('newNumber')->lt('oldNumber')
```

### Less than or equal to

El valor del campo debe ser menor o igual que otro. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-lte)

```php
Field::make('newNumber')->lte('oldNumber')
```

### Mac Address

El campo debe ser una dirección MAC. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-mac)

```php
Field::make('mac_address')->macAddress()
```

### Multiple Of

El campo debe ser múltiplo de un valor. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#multiple-of)

```php
Field::make('number')->multipleOf(2)
```

### Not In

El campo no debe estar incluido en la lista de valores proporcionada. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-not-in)

```php
Field::make('status')->notIn(['cancelled', 'rejected'])
```

### Not Regex

El campo no debe coincidir con la expresión regular dada. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-not-regex)

```php
Field::make('email')->notRegex('/^.+$/i')
```

### Nullable

El valor del campo puede estar vacío. Esta regla se aplica por defecto si la regla `required` no está presente. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-nullable)

```php
Field::make('name')->nullable()
```

### Prohibited

El valor del campo debe estar vacío. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-prohibited)

```php
Field::make('name')->prohibited()
```

### Prohibited If

El campo debe estar vacío solo si el otro campo especificado tiene alguno de los valores dados. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-prohibited-if)

```php
Field::make('name')->prohibitedIf('field', 'value')
```

### Prohibited Unless

El campo debe estar vacío a menos que el otro campo especificado tenga alguno de los valores dados. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-prohibited-unless)

```php
Field::make('name')->prohibitedUnless('field', 'value')
```

### Prohibits

Si el campo no está vacío, todos los otros campos especificados deben estar vacíos. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-prohibits)

```php
Field::make('name')->prohibits('field')

Field::make('name')->prohibits(['field', 'another_field'])
```

### Required

El valor del campo no debe estar vacío. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-required)

```php
Field::make('name')->required()
```

#### Marcar un campo como requerido

Por defecto, los campos requeridos mostrarán un asterisco `*` junto a su etiqueta. Puedes querer ocultar el asterisco en formularios donde todos los campos son requeridos, o donde tenga sentido añadir un [hint](#adding-a-hint-next-to-the-label) a los campos opcionales en su lugar:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->required() // Añade validación para asegurar que el campo es requerido
    ->markAsRequired(false) // Quita el asterisco
```

Si tu campo no es `required()`, pero aun así deseas mostrar un asterisco `*`, puedes usar también `markAsRequired()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->markAsRequired()
```

### Required If

El valor del campo no debe estar vacío solo si el otro campo especificado tiene alguno de los valores dados. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-required-if)

```php
Field::make('name')->requiredIf('field', 'value')
```

### Required If Accepted

El valor del campo no debe estar vacío solo si el otro campo especificado es igual a "yes", "on", 1, "1", true, o "true". [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-required-if-accepted)

```php
Field::make('name')->requiredIfAccepted('field')
```

### Required Unless

El valor del campo no debe estar vacío a menos que el otro campo especificado tenga alguno de los valores dados. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-required-unless)

```php
Field::make('name')->requiredUnless('field', 'value')
```

### Required With

El valor del campo no debe estar vacío solo si cualquiera de los otros campos especificados no está vacío. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-required-with)

```php
Field::make('name')->requiredWith('field,another_field')
```

### Required With All

El valor del campo no debe estar vacío solo si todos los otros campos especificados no están vacíos. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-required-with-all)

```php
Field::make('name')->requiredWithAll('field,another_field')
```

### Required Without

El valor del campo no debe estar vacío solo cuando cualquiera de los otros campos especificados esté vacío. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-required-without)

```php
Field::make('name')->requiredWithout('field,another_field')
```

### Required Without All

El valor del campo no debe estar vacío solo cuando todos los otros campos especificados estén vacíos. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-required-without-all)

```php
Field::make('name')->requiredWithoutAll('field,another_field')
```

### Regex

El campo debe coincidir con la expresión regular dada. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-regex)

```php
Field::make('email')->regex('/^.+@.+$/i')
```

### Same

El valor del campo debe ser igual a otro. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-same)

```php
Field::make('password')->same('passwordConfirmation')
```

### Starts With

El campo debe comenzar con uno de los valores dados. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-starts-with)

```php
Field::make('name')->startsWith(['a'])
```

### String

El campo debe ser una cadena.
```php
Field::make('name')->string()
```

### Unique

El valor del campo no debe existir en la base de datos. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-unique)

```php
Field::make('email')->unique()
```

Si tu formulario de Filament ya tiene un modelo Eloquent asociado, como en un [recurso de panel](../resources), Filament lo usará. También puedes especificar una tabla o modelo personalizado donde buscar:

```php
use App\Models\User;

Field::make('email')->unique(table: User::class)
```

Por defecto, se usará el nombre del campo como columna a buscar. Puedes especificar una columna personalizada:

```php
Field::make('email')->unique(column: 'email_address')
```

Normalmente, querrás ignorar un modelo dado durante la validación de unicidad. Por ejemplo, en un formulario de "actualizar perfil" que incluye nombre, email y ubicación. Probablemente quieras verificar que el email sea único. Sin embargo, si el usuario solo cambia el nombre y no el email, no quieres un error porque ya es propietario de ese email. Si tu formulario ya tiene un modelo Eloquent asociado, como en un [recurso de panel](../resources), Filament lo ignorará.

Para evitar que Filament ignore el registro Eloquent actual, puedes pasar `false` al parámetro `ignoreRecord`:

```php
Field::make('email')->unique(ignoreRecord: false)
```

Alternativamente, para ignorar un registro Eloquent de tu elección, puedes pasarlo al parámetro `ignorable`:

```php
Field::make('email')->unique(ignorable: $ignoredUser)
```

Puedes personalizar aún más la regla pasando un [closure](overview#closure-customization) al parámetro `modifyRuleUsing`:

```php
use Illuminate\Validation\Rules\Unique;

Field::make('email')
    ->unique(modifyRuleUsing: function (Unique $rule) {
        return $rule->where('is_active', 1);
    })
```

La regla `unique` de Laravel no usa el modelo Eloquent para consultar la base de datos por defecto, por lo que no aplicará ningún scope global definido en el modelo, incluidos los de soft-deletes. Por ello, incluso si existe un registro con soft-delete con el mismo valor, la validación fallará.

Dado que no se aplican scopes globales, la característica de multi-tenant de Filament tampoco delimita la consulta al tenant actual por defecto.

Para ello, debes usar el método `scopedUnique()`, que reemplaza la implementación `unique` de Laravel por una que use el modelo para consultar la base de datos, aplicando cualquier scope global definido en el modelo, incluidos soft-deletes y multi-tenant:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('email')
    ->scopedUnique()
```

Si deseas modificar la consulta Eloquent usada para comprobar la unicidad, incluido eliminar un scope global, puedes pasar una función al parámetro `modifyQueryUsing`:

```php
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

TextInput::make('email')
    ->scopedUnique(modifyQueryUsing: function (Builder $query) {
        return $query->withoutGlobalScope(SoftDeletingScope::class);
    })
```

### ULID

El campo en validación debe ser un [Identificador Universal Único y Lexicográficamente Ordenable](https://github.com/ulid/spec) (ULID) válido. [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-ulid)

```php
Field::make('identifier')->ulid()
```

### UUID

El campo debe ser un identificador universal único (UUID) RFC 4122 válido (versión 1, 3, 4 o 5). [Consulta la documentación de Laravel.](https://laravel.com/docs/validation#rule-uuid)

```php
Field::make('identifier')->uuid()
```

## Other rules

Puedes añadir otras reglas de validación a cualquier campo usando el método `rules()`:

```php
TextInput::make('slug')->rules(['alpha_dash'])
```

Puedes encontrar una lista completa de reglas de validación en la [documentación de Laravel](https://laravel.com/docs/validation#available-validation-rules).

## Custom rules

Puedes usar cualquier regla de validación personalizada como harías en [Laravel](https://laravel.com/docs/validation#custom-validation-rules):

```php
TextInput::make('slug')->rules([new Uppercase()])
```

También puedes usar [closure rules](https://laravel.com/docs/validation#using-closures):

```php
use Closure;

TextInput::make('slug')->rules([
    fn (): Closure => function (string $attribute, $value, Closure $fail) {
        if ($value === 'foo') {
            $fail('The :attribute is invalid.');
        }
    },
])
```

Puedes [inyectar utilidades](overview#field-utility-injection) como [`$get`](overview#injecting-the-state-of-another-field) en tus reglas personalizadas, por ejemplo si necesitas referenciar otros valores del formulario. Para ello, envuelve la regla closure en otra función que la devuelva:

```php
use Filament\Schemas\Components\Utilities\Get;

TextInput::make('slug')->rules([
    fn (Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
        if ($get('other_field') === 'foo' && $value !== 'bar') {
            $fail("The {$attribute} is invalid.");
        }
    },
])
```

## Customizing validation attributes

Cuando los campos fallan la validación, su etiqueta se usa en el mensaje de error. Para personalizar la etiqueta usada en los mensajes de error, usa el método `validationAttribute()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->validationAttribute('full name')
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>validationAttribute()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Validation messages

Por defecto se usa el mensaje de error de validación de Laravel. Para personalizar los mensajes de error, usa el método `validationMessages()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('email')
    ->unique(// ...)
    ->validationMessages([
        'unique' => 'The :attribute has already been registered.',
    ])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un array de valores estáticos, el método <code>validationMessages()</code> también acepta una función por cada mensaje. Puedes inyectar varias utilidades en las funciones como parámetros.
</details>

### Allowing HTML in validation messages

Por defecto, los mensajes de validación se renderizan como texto plano para prevenir XSS. Sin embargo, puede que necesites renderizar HTML en los mensajes, por ejemplo al mostrar listas o enlaces. Para habilitar HTML en los mensajes de validación, usa `allowHtmlValidationMessages()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password')
    ->required()
    ->rules([
        new CustomRule(), // Regla personalizada que devuelve un mensaje de validación con HTML
    ])
    ->allowHtmlValidationMessages()
```

Ten en cuenta que debes asegurar que el HTML de todos los mensajes de validación sea seguro de renderizar, de lo contrario tu aplicación será vulnerable a XSS.

## Disabling validation when fields are not dehydrated

Cuando un campo [no se deshidrata](overview#preventing-a-field-from-being-dehydrated), aún se valida. Para deshabilitar la validación de campos que no se deshidratan, usa `validatedWhenNotDehydrated()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->required()
    ->dehydrated(false)
    ->validatedWhenNotDehydrated(false)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>validatedWhenNotDehydrated()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>
