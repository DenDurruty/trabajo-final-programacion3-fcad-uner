# Trabajo Final Integrador de Programación III: API Rest - Gestión de reclamos 

Este repositorio contiene mi Trabajo Final Integrador de la cátedra "Programación lll" del ciclo lectivo 2024 de la Tecnicatura Universitaria en Desarrollo Web perteneciente a la FCAD - UNER.


## Introducción 📋
Este proyecto responde a la consigna de crear una API Rest para la gestión de reclamos de la concesionaria de automóviles "PROG III". La lógica de esta aplicación está pensada para que cualquier persona usuaria pueda registrarse desde la interfaz de usuario en el navegador, pero que la cuenta allí creada sea por defecto una cuenta de tipo usuario cliente, siendo potestad única de los administradores crear cuentas del tipo usuario empleado o usuario administrador. Cada uno de estos tipos de usuarios tiene sus correspondientes validaciones de acceso para realizar las tareas que abarca su implicancia.


## Tecnologías utilizadas ⚙️

- **Node.Js**
- **Express**
- **Express validator**
- **mysql12**
- **dotenv** para levantar variables de entorno
- **bcryptjs** hasheo encriptacion
- **jasonwebtoken** para token autenticacion
- **handlebars** para crear la interfaz de las notificaciones de los reclamos y el infirme pdf
- **cors**
- **morgan**
- **csv-writer** para generar csv
- **puppeteer** para descargar pdf
- **multer** para subir imagenes
- **swagger-jsdoc** para documentar
- **swagger-ui-express**
- **yaml swagger**


## Instalación 🔧

**1-** Clonar el repositorio:
```bash
   git clone https://github.com/usuario/repositorio.git
   cd repositorio
```

**2-** Instalar las dependencias:
```bash
   npm install
```

**3-** Configurar variables de entorno:
```bash
   PORT=3000
   DATABASE_=
   JWT_SECRET=
   PORT=3000
   DATABASE_=
   JWT_SECRET=
```

**4-** Iniciar el servidor:
```bash
   npm run dev
```


## ¿Cómo lo probamos? 🚀
> [!IMPORTANT]
> ROLES DE LOS USUARIOS:
> **Administrador**= idUsuarioTipo:**1**
> **Empleado**= idUsuarioTipo:**2**
> **Cliente**= idUsuarioTipo:**3**
>
LOS USUARIOS PUEDEN:
**Administrador**: 
**-** Iniciar sesión, visualizar y modificar su perfil
**-** Visualizar, crear, modificar y eliminar cualquier tipo de reclamo
**-** Visualizar, crear, modificar (sólo el idUsuarioTipo e idOficina) y eliminar cualquier tipo de usuario
**-** Visualizar, crear, modificar y eliminar cualquier oficina y tipo de reclamo
**-** Visualizar información estadística sobre los reclamos
**-** Descargar reclamos en formato PDF/CSV
