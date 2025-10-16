---
title: Slider
---

## Introducción

El componente slider te permite arrastrar un asa a lo largo de una pista para seleccionar uno o más valores numéricos:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
```

El paquete [noUiSlider](https://refreshless.com/nouislider) se utiliza para este componente, y gran parte de su API se basa en esa librería.

:::warning
Debido a su naturaleza, los campos slider nunca pueden estar vacíos. El valor del campo nunca puede ser `null` ni un array vacío. Si un slider está vacío, el usuario no tendrá un asa que arrastrar por la pista.

Por ello, los sliders tienen un valor por defecto configurado desde el principio, que se establece en el valor mínimo permitido en el [rango](#controlar-el-rango-del-slider) del slider. El valor por defecto se usa cuando un formulario está vacío, por ejemplo en la página de creación de un recurso. Para saber más sobre valores por defecto, consulta la documentación de [`default()`](overview#setting-the-default-value-of-a-field).
:::

## Controlar el rango del slider

Los valores mínimo y máximo que puede seleccionar el slider son 0 y 100 por defecto. Filament aplicará automáticamente reglas de validación para asegurarse de que los usuarios no superen estos valores. Puedes ajustarlos con el método `range()`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 40, maxValue: 80)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, el método <code>range()</code> también acepta funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en las funciones como parámetros.
</details>

### Controlar el tamaño del paso

Por defecto, los usuarios pueden seleccionar cualquier valor decimal entre el mínimo y el máximo. Puedes restringir los valores a un tamaño de paso específico usando el método `step()`. Filament aplicará automáticamente reglas de validación para asegurar que los usuarios no se desvíen de este tamaño de paso:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->step(10)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>step()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Limitar el número de decimales

Si prefieres permitir que el usuario seleccione cualquier valor decimal entre el mínimo y el máximo en lugar de restringirlo a un tamaño de paso, puedes definir un número de decimales al que se redondearán los valores seleccionados usando el método `decimalPlaces()`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->decimalPlaces(2)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>decimalPlaces()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Controlar el padding de la pista

Por defecto, los usuarios pueden seleccionar cualquier valor a lo largo de toda la pista. Puedes añadir padding de comportamiento a la pista usando el método `rangePadding()`. Esto asegurará que el valor seleccionado esté siempre al menos a cierta distancia de los extremos de la pista. La validación de valores mínimo y máximo que Filament aplica por defecto tendrá en cuenta el padding para asegurar que los usuarios no excedan el rango acolchado:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->rangePadding(10)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>rangePadding()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

En este ejemplo, aunque el valor mínimo es 0 y el máximo es 100, el usuario solo podrá seleccionar valores entre 10 y 90. El padding se aplicará a ambos extremos de la pista, por lo que el valor seleccionado estará siempre al menos a 10 unidades de los bordes.

Si deseas controlar el padding en cada lado de la pista por separado, puedes pasar un array de dos valores al método `rangePadding()`. El primer valor se aplicará al inicio de la pista y el segundo al final:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->rangePadding([10, 20])
```

### Pistas de derecha a izquierda

Por defecto, una pista opera de izquierda a derecha. Si el usuario usa una configuración regional de derecha a izquierda (p. ej., árabe), la pista se mostrará de derecha a izquierda automáticamente. También puedes forzarlo usando el método `rtl()`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->rtl()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el slider debe ser RTL o no:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->rtl(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>rtl()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

## Añadir múltiples valores a un slider

Si el slider está configurado a un array de valores, el usuario podrá arrastrar múltiples asas a lo largo de la pista dentro del rango permitido. Asegúrate de que el slider tenga un valor [`default()`](overview#setting-the-default-value-of-a-field) establecido a un array de valores para usar cuando un formulario esté vacío:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->default([20, 70])
```

Si estás guardando múltiples valores del slider usando Eloquent, debes asegurarte de añadir un [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) `array` a la propiedad del modelo:

```php
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'slider' => 'array',
        ];
    }

    // ...
}
```

## Usar una pista vertical

Puedes mostrar el slider como una pista vertical en lugar de horizontal usando el método `vertical()`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->vertical()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el slider debe ser vertical o no:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->vertical(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>vertical()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Pistas de arriba hacia abajo

Por defecto, una pista vertical opera de abajo hacia arriba. En [noUiSlider](https://refreshless.com/nouislider), esto es el [comportamiento RTL](#pistas-de-derecha-a-izquierda). Para asignar el valor mínimo a la parte superior de la pista, puedes usar el método `rtl(false)`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->vertical()
    ->rtl(false)
```

## Añadir tooltips a las asas

Puedes añadir tooltips a las asas del slider usando el método `tooltips()`. El tooltip mostrará el valor actual del asa:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->tooltips()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el slider debe tener tooltips o no:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->tooltips(FeatureFlag::active())
```

Al usar múltiples asas, se mostrarán múltiples tooltips, uno por asa. Los tooltips también funcionan con [pistas verticales](#usar-una-pista-vertical).

### Formateo personalizado del tooltip

Puedes usar JavaScript para personalizar el formateo de un tooltip. Pasa un objeto `RawJs` al método `tooltips()`, que contenga una expresión de cadena JavaScript a usar. El valor actual a formatear estará disponible en la variable `$value`:

```php
use Filament\Forms\Components\Slider;
use Filament\Support\RawJs;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->tooltips(RawJs::make(<<<'JS'
        `$${$value.toFixed(2)}`
        JS))
```

### Controlar tooltips para múltiples asas individualmente

Si el slider está configurado a un array de valores, puedes controlar los tooltips de cada asa por separado pasando un array de valores al método `tooltips()`. El primer valor se aplicará a la primera asa, el segundo a la segunda, y así sucesivamente:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->tooltips([true, false])
```

## Rellenar una pista con color

Por defecto, el color de la pista no se ve afectado por la posición de sus asas. Cuando usas una sola asa, puedes rellenar con color la parte de la pista anterior al asa usando el método `fillTrack()`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->fillTrack()
```

Opcionalmente, puedes pasar un valor booleano para controlar si el slider debe estar rellenado o no:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->fillTrack(FeatureFlag::active())
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>fillTrack()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

Cuando uses múltiples asas, debes especificar manualmente qué partes de la pista deben rellenarse pasando un array de valores `true` y `false`, uno por sección. El número total de valores debe ser uno más que el número de asas. El primer valor se aplicará a la sección antes de la primera asa, el segundo a la sección entre la primera y la segunda, y así sucesivamente:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->fillTrack([false, true, false])
```

El relleno también funciona en [pistas verticales](#usar-una-pista-vertical).

## Añadir pips a las pistas

Puedes añadir pips a las pistas, que son pequeñas marcas que indican la posición de las asas. Puedes añadir pips usando el método `pips()`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->pips()
```

Los pips también funcionan cuando hay múltiples asas, y también puedes añadir pips a [pistas verticales](#usar-una-pista-vertical).

### Ajustar la densidad de los pips

Por defecto, los pips se muestran con una densidad de `10`. Esto significa que por cada 10 unidades de la pista, se mostrará un pip. Puedes ajustar esta densidad usando el parámetro `density` del método `pips()`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->pips(density: 5)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el parámetro <code>density</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Formateo personalizado de etiquetas de pips

Puedes usar JavaScript para personalizar el formateo de una etiqueta de pip. Pasa un objeto `RawJs` al método `pipsFormatter()`, que contenga una expresión de cadena JavaScript a usar. El valor actual a formatear estará disponible en la variable `$value`:

```php
use Filament\Forms\Components\Slider;
use Filament\Support\RawJs;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->pips()
    ->pipsFormatter(RawJs::make(<<<'JS'
        `$${$value.toFixed(2)}`
        JS))
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>pipsFormatter()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

### Añadir etiquetas de pips a los pasos de la pista

Si estás usando [pasos](#controlar-el-tamaño-del-paso) para restringir el movimiento de la pista, puedes añadir una etiqueta de pip a cada paso. Para ello, pasa un objeto `PipsMode::Steps` al método `pips()`:

```php
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\Slider\Enums\PipsMode;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->step(10)
    ->pips(PipsMode::Steps)
```

Si quieres añadir pips adicionales sin etiquetas, también puedes [ajustar la densidad](#ajustar-la-densidad-de-los-pips) de los pips:

```php
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\Slider\Enums\PipsMode;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->step(10)
    ->pips(PipsMode::Steps, density: 5)
```

### Añadir etiquetas de pips a posiciones percentuales de la pista

Si quieres añadir etiquetas de pips a posiciones porcentuales específicas, puedes pasar un objeto `PipsMode::Positions` al método `pips()`. Las posiciones porcentuales deben definirse en el método `pipsValues()` en un array de números:

```php
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\Slider\Enums\PipsMode;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->pips(PipsMode::Positions)
    ->pipsValues([0, 25, 50, 75, 100])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, el método <code>pipsValues()</code> también acepta una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

La [densidad](#ajustar-la-densidad-de-los-pips) sigue controlando el espaciado de los pips sin etiquetas.

### Añadir un número fijo de etiquetas de pips a la pista

Si quieres añadir un número fijo de etiquetas de pips a la pista, puedes pasar un objeto `PipsMode::Count` al método `pips()`. El número de pips debe definirse en el método `pipsValues()`:

```php
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\Slider\Enums\PipsMode;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->pips(PipsMode::Count)
    ->pipsValues(5)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, el método <code>pipsValues()</code> también acepta una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

La [densidad](#ajustar-la-densidad-de-los-pips) sigue controlando el espaciado de los pips sin etiquetas.

### Añadir etiquetas de pips a valores fijos de la pista

En lugar de definir [posiciones porcentuales](#añadir-etiquetas-de-pips-a-posiciones-percentuales-de-la-pista) o un [número fijo](#añadir-un-número-fijo-de-etiquetas-de-pips-a-la-pista) de etiquetas, también puedes definir un conjunto de valores a usar para las etiquetas. Para ello, pasa un objeto `PipsMode::Values` al método `pips()`. Los valores deben definirse en el método `pipsValues()` en un array de números:

```php
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\Slider\Enums\PipsMode;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->pips(PipsMode::Values)
    ->pipsValues([5, 15, 25, 35, 45, 55, 65, 75, 85, 95])
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, el método <code>pipsValues()</code> también acepta una función para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

La [densidad](#ajustar-la-densidad-de-los-pips) sigue controlando el espaciado de los pips sin etiquetas:

```php
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\Slider\Enums\PipsMode;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->pips(PipsMode::Values, density: 5)
    ->pipsValues([5, 15, 25, 35, 45, 55, 65, 75, 85, 95])
```

### Filtrar pips manualmente

Para aún más control sobre cómo se muestran los pips en una pista, puedes usar una expresión JavaScript. La expresión debe devolver números diferentes según la apariencia del pip:

- Debe devolver `1` si se debe mostrar una etiqueta de pip grande.
- Debe devolver `2` si se debe mostrar una etiqueta de pip pequeña.
- Debe devolver `0` si se debe mostrar un pip sin etiqueta.
- Debe devolver `-1` si no se debe mostrar el pip.

La [densidad](#ajustar-la-densidad-de-los-pips) de los pips controlará qué valores se pasan a la expresión. La expresión debe usar la variable `$value` para acceder al valor actual del pip. La expresión debe definirse en un objeto `RawJs` y pasarse al método `pipsFilter()`:

```php
use Filament\Forms\Components\Slider;
use Filament\Support\RawJs;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->pips(density: 5)
    ->pipsFilter(RawJs::make(<<<'JS'
        ($value % 50) === 0
            ? 1
            : ($value % 10) === 0
                ? 2
                : ($value % 25) === 0
                    ? 0
                    : -1
        JS))
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, el método <code>pipsFilter()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

En este ejemplo, se usa el operador `%` para determinar la divisibilidad del valor del pip. La expresión devolverá `1` cada 50 unidades, `2` cada 10 unidades, `0` cada 25 unidades y `-1` para todos los demás valores.

## Establecer una diferencia mínima entre asas

Para establecer una distancia mínima entre asas, puedes usar el método `minDifference()`, pasándole un número. Esto representa la diferencia real entre los valores de ambas asas, no su distancia visual:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->minDifference(10)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>minDifference()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

:::warning
El método `minDifference()` no afecta la validación del slider. Un usuario experto podría manipular el valor del slider usando JavaScript para seleccionar un valor que no cumpla con la diferencia mínima. Aun así, se evitará que seleccione un valor fuera del rango del slider.
:::

## Establecer una diferencia máxima entre asas

Para establecer una distancia máxima entre asas, puedes usar el método `maxDifference()`, pasándole un número. Esto representa la diferencia real entre los valores de ambas asas, no su distancia visual:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->maxDifference(40)
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir un valor estático, el método <code>maxDifference()</code> también acepta una función para calcularlo dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

:::warning
El método `maxDifference()` no afecta la validación del slider. Un usuario experto podría manipular el valor del slider usando JavaScript para seleccionar un valor que no cumpla con la diferencia máxima. Aun así, se evitará que seleccione un valor fuera del rango del slider.
:::

## Controlar el comportamiento general del slider

El método `behavior()` del slider te permite pasar uno o más objetos `Behavior` para controlar el comportamiento del slider. Las opciones disponibles son:

- `Behavior::Tap` - El slider se moverá suavemente a la posición del clic cuando el usuario haga clic en la pista. Este es un comportamiento por defecto, por lo que al aplicar otro comportamiento, también debes incluir este en el array si quieres conservarlo.
- `Behavior::Drag` - Cuando hay dos asas en la pista, el usuario puede arrastrar la pista para mover ambas asas al mismo tiempo. Se debe usar el método [`fillTrack([false, true, false])`](#rellenar-una-pista-con-color) para asegurar que el usuario tenga algo que arrastrar.
- `Behavior::Drag` y `Behavior::Fixed` - Cuando hay dos asas, el usuario puede arrastrar la pista para mover ambas a la vez, pero no puede cambiar la distancia entre ellas. Se debe usar el método [`fillTrack([false, true, false])`](#rellenar-una-pista-con-color). Ten en cuenta que la distancia entre las asas no se valida automáticamente en el backend, por lo que un usuario experto podría manipular el valor del slider con JavaScript para seleccionar un valor con una distancia diferente. Aun así, se evitará que seleccione valores fuera del rango del slider.
- `Behavior::Unconstrained` - Cuando hay múltiples asas, pueden arrastrarse una sobre otra. Los métodos [`minDifference()`](#establecer-una-diferencia-mínima-entre-asas) y [`maxDifference()`](#establecer-una-diferencia-máxima-entre-asas) no funcionarán con este comportamiento.
- `Behavior::SmoothSteps` - Mientras se arrastran las asas, no se ajustarán a los [pasos](#controlar-el-tamaño-del-paso) de la pista. Una vez que el usuario suelte el asa, se ajustará al paso más cercano.

Por ejemplo, para usar `Behavior::Tap`, `Behavior::Drag` y `Behavior::SmoothSteps` a la vez:

```php
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\Slider\Enums\Behavior;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->behavior([Behavior::Tap, Behavior::Drag, Behavior::SmoothSteps])
```

Para deshabilitar todo el comportamiento, incluido el `Behavior::Tap` por defecto, puedes usar el método `behavior(null)`:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->behavior(null)
```

## Pistas no lineales

Puedes crear pistas no lineales, donde ciertas partes de la pista estén comprimidas o expandidas, definiendo un array de puntos porcentuales en el método `nonLinearPoints()` del slider. Cada clave de porcentaje del array debe tener un valor real correspondiente, que se usará para calcular la posición del asa en la pista. El ejemplo siguiente incluye [pips](#añadir-pips-a-las-pistas) para demostrar el comportamiento no lineal:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->nonLinearPoints(['20%' => 50, '50%' => 75])
    ->pips()
```

<details>
  <summary>Inyección de utilidades</summary>
  Además de permitir valores estáticos, el método <code>nonLinearPoints()</code> también acepta funciones para calcularlos dinámicamente. Puedes inyectar varias utilidades en la función como parámetros.
</details>

Al usar una pista no lineal, también puedes controlar el stepping de cada sección. Definiendo un array de dos números para cada punto porcentual, el primer número se usará como valor real para la posición porcentual, y el segundo como tamaño de paso para esa sección, activo hasta el siguiente punto porcentual:

```php
use Filament\Forms\Components\Slider;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 100)
    ->nonLinearPoints(['20%' => [50, 5], '50%' => [75, 1]])
    ->pips()
```

:::warning
Al usar una pista no lineal, los valores de paso de ciertas secciones de la pista no afectan a la validación del slider. Un usuario experto podría manipular el valor del slider usando JavaScript para seleccionar un valor que no cumpla con un valor de paso en la pista. Aun así, se evitará que seleccione un valor fuera del rango del slider.
:::

Al usar [pips](#añadir-pips-a-las-pistas) con una pista no lineal, puedes asegurarte de que las etiquetas de pips se redondeen y solo se muestren en posiciones seleccionables de la pista. De lo contrario, el stepping de una parte no lineal podría añadir etiquetas en posiciones no seleccionables. Para ello, usa el método `steppedPips()`:

```php
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\Slider\Enums\PipsMode;

Slider::make('slider')
    ->range(minValue: 0, maxValue: 10000)
    ->nonLinearPoints(['10%' => [500, 500], '50%' => [4000, 1000]])
    ->pips(PipsMode::Positions, density: 4)
    ->pipsValues([0, 25, 50, 75, 100])
    ->steppedPips()
```
