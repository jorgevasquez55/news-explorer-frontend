# NewsExplorer

**NewsExplorer** es una aplicación web que desarrollé para permitir a los usuarios buscar noticias sobre cualquier tema y guardar los artículos de su interés en su cuenta personal. Construí un diseño responsivo, adaptado a distintos tamaños de pantalla mediante **unidades de medida relativas** y **media queries**, ajustando el diseño según los puntos de quiebre para mantener una apariencia consistente.

Desarrollé el proyecto con **React**, estructurado en componentes **JSX (JavaScript XML)**, con una **API** propia en el backend (Node.js + Express + MongoDB) que gestiona la autenticación de usuarios y persiste los artículos guardados, y un proxy hacia **NewsAPI** para obtener las noticias.

**Puedes ver el proyecto en funcionamiento haciendo clic [aquí](https://news-jorge.abrdns.com/).**

> _Capturas de pantalla pendientes de actualizar con la versión desplegada._

## Tecnologías y metodologías

- HTML5 semántico
- Metodología BEM
- Flexbox
- Grid
- Text-overflow
- Hover
- Pseudo-clases
- Unidades de medida relativas
- Media queries
- React JS
- API REST

## Descripción de las tecnologías y técnicas utilizadas

### HTML semántico

Utilicé **HTML semántico** para que el código fuera más legible y accesible, facilitando la comprensión y estructuración del contenido.

### Metodología BEM

Adopté la **metodología BEM** para facilitar el mantenimiento y la escalabilidad del código, dejando la estructura de clases más clara.

### Flexbox

Apliqué `flexbox` junto con **unidades de medida relativas** para organizar el diseño y optimizar la responsividad, logrando una buena experiencia en distintos dispositivos.

### Grid y Text-overflow

Usé `grid` para estructurar las tarjetas de noticias, y apliqué `text-overflow: ellipsis`, `overflow: hidden`, `line-clamp` y `white-space: nowrap` para truncar títulos y descripciones que superaban el espacio disponible.

### Pseudo-clases

Implementé las **pseudo-clases** `:hover` y `:active` para mejorar la interactividad, cambiando el estilo de los elementos según el estado de interacción.

### Media queries

Configuré **media queries** para ajustar el diseño en distintas resoluciones de pantalla, definiendo puntos de quiebre específicos:

- 320-768px (540px)
- 768-1280px (1024px)
- 1280px o superior

Incluí un botón de menú hamburguesa en la barra de navegación para pantallas más pequeñas.

### React JS

Utilicé **React** con **JSX**, separando el código en componentes para una mejor organización y reutilización.

- **Popups de inicio de sesión y registro** – Implementé `onClick()` para manejar el estado de las ventanas emergentes con `useState()`. Usé `useEffect()` para agregar un listener del evento `keydown` y permitir cerrar la ventana con la tecla "Esc", eliminándolo con `removeEventListener()` al desmontar el componente. Con `onChange()` y `onSubmit()`, los datos se guardan en la base de datos al registrarse, y se autentican al iniciar sesión a través de la **API**.

- **Validación de formularios** – Instancié una clase dentro de `useEffect()` para validar los formularios, usando `useState()` para mejorar la **UX**. La clase deshabilita el botón de **submit** cuando hay campos inválidos, resaltando el campo y mostrando un mensaje de error. El botón solo se habilita con los datos correctos.

- **Formulario de búsqueda** – Creé un formulario que, con `onChange()` y `onSubmit()`, guarda la palabra clave para buscar artículos a través de la **API**, devolviendo una lista de noticias relevantes que se almacena en un estado para renderizarse, y también en **localStorage** para que, si el usuario sale de la página, los resultados sigan ahí al volver.

- **Preloader** – Implementé una animación de carga controlada por `useState()`, que se muestra durante la búsqueda y se reemplaza por los resultados al finalizar.

- **Secciones news y saved-news** – Utilicé los componentes `<Routes>` y `<Route />` de **React Router**, junto con un **HOC (Higher-Order Component)** propio para proteger rutas, separando la ruta principal (que contiene la sección **news**) de la ruta **saved-news**, accesible solo para usuarios autenticados.<br><br>
Para renderizar las tarjetas en la sección **news** usé el método `map()` dentro del componente, iterando sobre los datos recibidos y armando las tarjetas mediante `props`. Incluí botones para guardar artículos y para cargar más noticias de a poco (3 por vez), usando `.slice()` para limitar la lista según un estado controlado por `useState()`, que se incrementa con cada clic en el botón. El mismo componente se reutiliza para renderizar los artículos guardados en la sección **saved-news**.

- **Tarjetas de error y "no encontrado"** – Implementé lógica para mostrar mensajes alternativos cuando no se encuentran artículos o cuando ocurre un error del servidor.

### API

#### NewsAPI (vía proxy propio)

Desarrollé un módulo que consume mi propio backend, el cual a su vez hace de proxy hacia **NewsAPI** y devuelve artículos según una palabra clave. Uso el método `fetch()` para hacer solicitudes **GET**, recibiendo un **array** con los artículos más relevantes. El proxy evita exponer la API key en el navegador y evita la restricción de NewsAPI que solo permite llamadas directas desde localhost en el plan gratuito.

#### MainApi

Desarrollé una clase para consumir mi propia **API**, usando `fetch()` para realizar solicitudes **GET**, **POST** y **DELETE**. La clase permite registrar y autenticar usuarios, además de agregar y eliminar artículos guardados.

**Para más información sobre el desarrollo del backend, entra [aquí](https://github.com/jorgevasquez55/news-explorer-backend#readme).**
