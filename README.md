# carbon
Hugo Template

### Cómo instalar?
Primero debo crear un sitio de Hugo
```sh
hugo new site my-hugo-site
```
Dentro de la carpeta del nuevo sitio, inicio git e instalo el tema como un submódulo dentro de la carpeta "themes"
```sh
cd my-hugo-site
git init
git submodule add https://github.com/Revenatium/aluminium.git themes/aluminium
```
Y finalmente modifico el config.toml para que use el nuevo tema
```sh
echo 'theme = "aluminium"' >> config.toml
```
Para ver en el navegador
```sh
hugo server -D
```
## Si haces checkout del sitio y este ya contiene el submodulo del tema.
```sh
git submodule update --init --recursive
```
**A partir de ahora ya puedo comenzar a agregar contenido al sitio**

### Home
Para crear una página principal o home debo ejecutar el siguiente comando
```sh
hugo new _index.es.md
```
El cual generará un archivo _index.es.md en el que ya puedo comenzar a agregar contenido, por ejemplo:

```md
--
title: My Hotel
description: Vacaciones de lujo en Puerto Aventuras
date: 2017-08-03T13:32:23-05:00
draft: true
---
<div class="row mb-4">
   <div class="col-sm-12 text-center">
   <h4>Comodidades</h4>
   <p>Nuestros condominios constan de una a dos recamaras, todos se encentran totalmente equipados con cocineta y funcionales sercivios, servicio de limpuieza, caja de seguridad y personal multilingue.<p>
   </div>
</div>
```
### Secciones / Páginas
Para agregar una nueva página al sitio simplemente debo crearlas al igual que la home:
```sh
hugo new condominios.es.md
```

### Habitaciones
Utiliza el shortcode {{< roomList >}} para mostrar la lista de habitaciones.

### Ofertas
Utiliza el shortcode {{< dealList >}} para mostrar la lista de promociones.

## Menús
### Menú principal
Todas las páginas aparecen por default en el menú principal del sitio ubicado en la parte superior de cada página.

#### Orden
Las páginas se ordenan en el menú de acuerdo al valor ubicado en el parámetro "weight":
```md
---
title: "Habitaciones"
date: 2017-08-19T12:35:17-05:00
draft: false
weight: 2
---
```

#### Omitir páginas
Para omitir una página del menú principal hay que especificar un "weight" negativo:
```md
---
title: "Políticas de privacidad"
date: 2017-08-19T12:35:17-05:00
draft: false
weight: -1
---
```

### Menú del _footer_
En el footer se mostrará un menú que incluye automática mente todas las páginas que tengan el parámetro "menu: footer":
```md
---
title: "Políticas de privacidad"
date: 2017-08-20T12:40:54-05:00
weight: -1
menu: footer
---
```

## Shortcodes
En el ejemplo de un nuevo room agregamos un "pseudo-elemento" llamado "photoGallery", este es un "atajo" que solo necesitan mínima información para crear una sección completa, en este caso una galería.
Al igual que esta tenemos otros shortcuts, a continuación se enlistan:

**photoGallery (base, pics)**

Genera una galería de imágenes. Recibe como parámetros la base de la URL (base) y la ruta de varías imagenes separadas por coma (se recomienda usar al menos tres), el layout se ajustará atuomáticamente basado en el número de fotos.

```md
{{< photoGallery 
base="https://res.cloudinary.com/itermotus/" 
pics="assets/coralmaya/img/rooms/one-bedroom-cocineta.jpg,assets/coralmaya/img/rooms/one-bedroom2.jpg,assets/coralmaya/img/rooms/one-bedroom.jpg" 
>}}
```

**circleAmenity (base, path, title, [inner])**

Elemento que incluye una imagen recorada en círculo, un título y una descripción (inner)

```md
{{< circleAmenity title="Cenotes" base="https://res.cloudinary.com/itermotus/" path="/assets/coralmaya/img/activities/cenotes.jpg" >}}
Enjoy a day in the different cenotes of the Riviera Maya.
{{< /circleAmenity >}}
```

**location (lat, lng, zoom, [inner])**

Agrega la sección completa de ubicación con título predefinido, descripción (inner) y un mapa de google con un marcador en el lat, lng dado con el zoom especificado.

```md
{{< location lat="20.504572" lng="-87.217174" zoom="16">}}
La ubicación le permite la práctica de actividades acuáticas, playa privada y marina.
{{< /location >}}
```

**homeAmenity (title, url, base, path, [inner])**

Genera un link con una imagen de fondo, un titulo y una descripción. 

```md
{{< homeAmenity title="Condominiums" url="/en/condominios/" base="https://res.cloudinary.com/itermotus/" path="/assets/coralmaya/img/rooms/2-bedroom.jpg" >}}
20 fully equipped Condos for family vacations. 
{{< /homeAmenity >}}
```

**dealList (items, isFluid)**

Muestra la lista de promociones. Se puede especificar el número de items a mostrar para, por ejemplo, mostrar solo la promoción más reciente en el home:

```md
{{< dealList items="1" isFluid="true" >}}
```

**pageSection (title, imgBase, imgPath, btnText, btnUrl, bgColor, [inner])**

Muestra un componente de dos columnas, una columna con una imagen y otra con el titulo, texto y botón especificado.

Por default la imagen aparecerá del lado derecho, para mostrarla a la izquierda se usa el parámetro `imgPosition="left"`. 

Por default el texto se mostrará sobre un fondo transparente, para controlar el color de este se usa el parámetro `bgColor`.

El botón es opcional, se mostrará solo si `btnText` y `btnUrl` tienen algún valor. Por default el botón tiene la clase "btn-outline-primary", para cambiarla se puede usar el parámetro `btnClass`.


```md
{{< pageSection 
title="Instalaciones"
btnText="Conoce nuestras instalaciones" 
btnUrl="/servicios"
btnClass="btn-primary" 
bgColor="#f3f3f3" 
imgBase="//res.cloudinary.com/itermotus/" 
imgPath="/assets/hotelflamingos/hotel1.jpg" >}}
    <p>Contamos con todo lo necesario para hacer de tus vacaciones una experiencia única.</p>
    <p>Relájate en nuestra alberca o diviertete en el área de juegos.</p>
{{< /pageSection >}}
```

**interstitial (title, bgImgBase, bgImgPath, bgTheme, roundCorners, btnText, btnURL, [inner])**

Muestra un elemento que incluye un título, descripción y un botón. 

También se puede configurar para que tenga una imagen de fondo usando los parámetros `bgImgBase` y `bgImgPath`. 

Para que tenga esquinas redondeadas se especifica `roundCorners` como `true`.  

El parámetro `bgTheme` puede tener los valores `light` o `dark`, que se usan para mejorar la legibilidad del texto sobre la imagen de fondo:
- Con `light` se agregará un degradado blanco sobre la imagen de fondo y el texto será negro.
- Con `dark` se agregará un degradado oscuro sobre la imagen de fondo y el texto será blanco. 

```md
{{< interstitial 
title="¿Listo para reservar?" 
bgImgBase="//res.cloudinary.com/itermotus/" 
bgImgPath="assets/hotelflamingos/hotel2.jpg" 
bgTheme="dark"
roundCorners="true"
btnText="Reservar hoy mismo" 
btnURL="/rooms/">}}
    Haz tu reservación hoy mismo y disfruta del paraíso en Hotel Demo.
{{< /interstitial >}}
```

## Parámetros del sitio
En el sitio se utilizan varios parámetros para su correcto funcionamiento y mostrar cierta información del hotel.
```toml
[params]
  bookerURL = "https://assets.revenatium.com/hotelsoulbeach/es-mx/1.0.17/bundle.js"
  bookingEngineURL = "https://hotelsoulbeach.revenatium.com/"
  maps_api_key = "AIzaSyAEPUa9BewKC1YXZp0l1-kNtUK223IAKGM"
  logoURL = "https://res.cloudinary.com/itermotus/q_auto:low,f_auto/assets/hotelsoulbeach/logo.png"
  hotelPhone = "+52 9841475888"
  hotelEmail = "reservaciones@hotelsoulbeach.com"
  hotelAddress = "Calle 28 número 132 entre 5ta Avenida y Avenida 10, Playa del Carmen"
  [params.social]
    [params.social.facebook]
      icon = "facebook-square"
      url = "https://www.facebook.com/HotelSoulBeach"
    [params.social.twitter]
      icon = "twitter-square"
      url = "https://www.twitter.com/HotelSoulBeach"
    [params.social.instagram]
      icon = "instagram"
      url = "https://www.instagram.com/HotelSoulBeach"
```

## Parámetros para las páginas

### Widget
Por default el widget se muestra siempre en el encabezado de cada página. Para ocultarlo se usa el parámetro `hideBooker`.
```md
hideBooker: true
```

### Encabezado

Para mostrar una imagen o video en el encabezado de la página se puede utilizar alguno de los siguientes parámetros:

* Imagen:
```md
featured_image: {base: "https://res.cloudinary.com/itermotus/", path: "assets/jonathonhotel/img/common/jonathon-hotel-general-terraza-bar.jpg"}
```

* Slider:
```md
slider: {base: "https://res.cloudinary.com/itermotus/", pics: "assets/jonathonhotel/img/common/jonathon-hotel-general-fachada.jpg,assets/jonathonhotel/img/common/jonathon-hotel-general-exterior.jpg,assets/jonathonhotel/img/common/jonathon-hotel-general-terraza-vista-teatro.jpg"}
```

* Video (se coloca el ID de un video de YouTube):
```md
featured_video: "-xAXYDfoDEU"
```

* Slider con los banners creados en la Extranet:
```md
showBanners: true
```
**Modo _full screen_**

Para mostrar la imagen, slider o video en pantalla completa:
```md
bannerFullScreen: true
```

Además, se pueden controlar otras características:
- `topbarTransparent` para mostrar el barra superior con fondo transparente
- `navbarTransparent` para mostrar el menú con fondo transparente
- `bannerFullscreenTheme` con valores 'dark' o 'light' agrega un degradado sobre la imagen para mejorar la legibilidad del texto
- `showScrollButton` muestra un botón en la parte inferior para saltar al contenido de la página (solo funciona con `featured_image` y `featured_video`)

```md
topbarTransparent: true
navbarTransparent: false
bannerFullscreenTheme: 'dark'
showScrollButton: true
```

## Idiomas
El idioma principal del sitio se define en el archivo config.toml
```toml
DefaultContentLanguage = "es"
```
Para cáda nueva página, dependiendo del idioma de la publicación debe ser el sufijo del archivo:
 - .es -> español
 - .en -> inglés

Para darle un título a mi página diferente por idioma se debe modificar el archivo config.toml
```toml
[Languages]
   [Languages.en]
      title = "Hotel Flamingos EN"
   [Languages.en]
      title = "Hotel Flamingos EN"
```

También es posible definir otros parámetros con valores distintos por idioma. Por ejemplo, aquí definimos la URL default del widget y una específica para el idioma inglés:
```toml
[params]
  bookerURL = "https://assets.revenatium.com/coralmaya/es-mx/1.0.17/bundle.js"
  bookingEngineURL = "https://coralmaya.revenatium.com/"
[Languages]
   [Languages.en]
    bookerURL = "https://assets.revenatium.com/coralmaya/en-us/1.0.17/bundle.js"
    bookingEngineURL = "https://coralmaya-en.revenatium.com/"
```

**Recursos**
El tema ya contiene algunos recursos en la carpeta i18n, si se desean agregar mas o sobreescribirlos se debe hacer en una carpeta i18n que se encuentre en la raiz de mi nuevo sitio.
### FAQ
**Por qué las urls de las imágenes se dividen en *base* y *path*?**
Por que el tamaño final de la imagen lo decide el template por lo que necesita transformarla y para esto agregará ciertos componentes a la url.

 **El mapa no se muestra**
 Google maps requiere una api key que debe proporcionarse en el archivo config.toml, en la seccion [params]:
 ```toml
 [params]
   maps_api_key = "miVERRYlongKEY"
 ```
 **No se muestra el widget**
 La url del widget es personalizada y por lo tanto debe agregarse integra al archivo config.toml en la sección de params:
  ```toml
 [params]
   bookerURL = "https://assets.revenatium.com/my-site/es-mx/my.version/bundle.js"
 ```
