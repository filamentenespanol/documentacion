---
title: Crear un complemento independiente
---

## Prefacio

Lea los documentos sobre [desarrollo de complementos de panel] (../panels/plugins/) y la [guía de introducción] (introducción) antes de continuar.

## Introducción

En este tutorial, crearemos un complemento simple que agrega un nuevo componente de formulario que se puede usar en formularios. Esto también significa que estará disponible para los usuarios en sus paneles.

Puede encontrar el código final de este complemento en [https://github.com/awcodes/headings](https://github.com/awcodes/headings).

## Paso 1: crear el complemento

Primero, crearemos el complemento siguiendo los pasos descritos en la [guía de introducción] (primeros pasos#creación-de-un-complemento).

## Paso 2: Limpiar

A continuación, limpiaremos el complemento para eliminar el código repetitivo que no necesitamos. Esto parecerá mucho, pero como se trata de un complemento simple, podemos eliminar gran parte del código repetitivo.

Elimine los siguientes directorios y archivos:
1. `bin`
2. `config`
3. `database`
4. `src/Commands`
5. `src/Facades`
6. `stubs`

Ahora podemos limpiar nuestro archivo `composer.json` para eliminar opciones innecesarias.

```json
"autoload": {
    "psr-4": {
        // We can remove the database factories
        "Awcodes\\Headings\\Database\\Factories\\": "database/factories/"
    }
},
"extra": {
    "laravel": {
        // We can remove the facade
        "aliases": {
            "Headings": "Awcodes\\Headings\\Facades\\ClockWidget"
        }
    }
},
```

Normalmente, Filament recomienda que los usuarios diseñen sus complementos con un tema de filamento personalizado, pero a modo de ejemplo, proporcionemos nuestra propia hoja de estilo que se puede cargar de forma asincrónica usando las nuevas funciones `x-load` en Filament v3. Entonces, actualicemos nuestro archivo `package.json` para incluir `cssnano`, `postcss`, `postcss-cli` y ​​`postcss-nesting` para construir nuestra hoja de estilo.

```json
{
    "private": true,
    "scripts": {
        "build": "postcss resources/css/index.css -o resources/dist/headings.css"
    },
    "devDependencies": {
        "cssnano": "^6.0.1",
        "postcss": "^8.4.27",
        "postcss-cli": "^10.1.0",
        "postcss-nesting": "^13.0.0"
    }
}
```

Luego necesitamos instalar nuestras dependencias.

```bash
npm install
```

También necesitaremos actualizar nuestro archivo `postcss.config.js` para configurar postcss.

```js
module.exports = {
    plugins: [
        require('postcss-nesting')(),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
```

También puede eliminar los directorios y archivos de prueba, pero los dejaremos ahí por ahora, aunque no los usaremos para este ejemplo, y le recomendamos encarecidamente que escriba pruebas para sus complementos.

## Paso 3: Configurar el proveedor

Ahora que hemos limpiado nuestro complemento, podemos comenzar a agregar nuestro código. El texto estándar en el archivo `src/HeadingsServiceProvider.php` tiene muchas cosas que hacer, así que eliminemos todo y comencemos desde cero.

Necesitamos poder registrar nuestra hoja de estilo con Filament Asset Manager para que podamos cargarla a pedido en nuestra vista de hoja. Para hacer esto, necesitaremos agregar lo siguiente al método `packageBooted` en nuestro proveedor de servicios.

***Tenga en cuenta el método `loadedOnRequest()`. Esto es importante porque le dice a Filament que cargue la hoja de estilo solo cuando sea necesario.***

```php
namespace Awcodes\Headings;

use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class HeadingsServiceProvider extends PackageServiceProvider
{
    public static string $name = 'headings';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasViews();
    }

    public function packageBooted(): void
    {
        FilamentAsset::register([
            Css::make('headings', __DIR__ . '/../resources/dist/headings.css')->loadedOnRequest(),
        ], 'awcodes/headings');
    }
}
```

## Paso 4: Creando nuestro componente

A continuación, necesitaremos crear nuestro componente. Cree un nuevo archivo en `src/Heading.php` y ​​agregue el siguiente código.

```php
namespace Awcodes\Headings;

use Closure;
use Filament\Schemas\Components\Component;
use Filament\Support\Colors\Color;
use Filament\Support\Concerns\HasColor;

class Heading extends Component
{
    use HasColor;

    protected string | int $level = 2;

    protected string | Closure $content = '';

    protected string $view = 'headings::heading';

    final public function __construct(string | int $level)
    {
        $this->level($level);
    }

    public static function make(string | int $level): static
    {
        return app(static::class, ['level' => $level]);
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->dehydrated(false);
    }

    public function content(string | Closure $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function level(string | int $level): static
    {
        $this->level = $level;

        return $this;
    }

    public function getColor(): array
    {
        return $this->evaluate($this->color) ?? Color::Amber;
    }

    public function getContent(): string
    {
        return $this->evaluate($this->content);
    }

    public function getLevel(): string
    {
        return is_int($this->level) ? 'h' . $this->level : $this->level;
    }
}
```

## Paso 5: renderizar nuestro componente

A continuación, necesitaremos crear la vista para nuestro componente. Cree un nuevo archivo en `resources/views/heading.blade.php` y ​​agregue el siguiente código.

Estamos usando x-load para cargar la hoja de estilo de forma asincrónica, por lo que solo se carga cuando es necesario. Puede obtener más información sobre esto en la sección [Conceptos básicos](../advanced/assets#lazy-loading-css) de los documentos.

```blade
@php
    $level = $getLevel();
    $color = $getColor();
@endphp

<{{ $level }}
    x-data
    x-load-css="[@js(\Filament\Support\Facades\FilamentAsset::getStyleHref('headings', package: 'awcodes/headings'))]"
    {{
        $attributes
            ->class([
                'headings-component',
                match ($color) {
                    'gray' => 'text-gray-600 dark:text-gray-400',
                    default => 'text-custom-500',
                },
            ])
            ->style([
                \Filament\Support\get_color_css_variables($color, [500]) => $color !== 'gray',
            ])
    }}
>
    {{ $getContent() }}
</{{ $level }}>
```

## Paso 6: Agregar algunos estilos

A continuación, proporcionemos un estilo personalizado para nuestro campo. Agregaremos lo siguiente a `resources/css/index.css`. Y ejecute `npm run build` para compilar nuestro CSS.

```css
.headings-component {
    &:is(h1, h2, h3, h4, h5, h6) {
         font-weight: 700;
         letter-spacing: -.025em;
         line-height: 1.1;
     }

    &h1 {
         font-size: 2rem;
     }

    &h2 {
         font-size: 1.75rem;
     }

    &h3 {
         font-size: 1.5rem;
     }

    &h4 {
         font-size: 1.25rem;
     }

    &h5,
    &h6 {
         font-size: 1rem;
     }
}
```

Luego necesitamos construir nuestra hoja de estilo.

```bash
npm run build
```

## Paso 7: Actualice su archivo LÉAME

Querrá actualizar su archivo `README.md` para incluir instrucciones sobre cómo instalar su complemento y cualquier otra información que desee compartir con los usuarios, como cómo usarlo en sus proyectos. Por ejemplo:

```php
use Awcodes\Headings\Heading;

Heading::make(2)
    ->content('Product Information')
    ->color(Color::Lime),
```

Y eso es todo, nuestros usuarios ahora pueden instalar nuestro complemento y usarlo en sus proyectos.
