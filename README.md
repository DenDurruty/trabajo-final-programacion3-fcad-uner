# Trabajo Final Integrador de Programación III: API Rest - Gestión de reclamos 💻⚙️

Este repositorio contiene mi Trabajo Final Integrador de la cátedra "Programación lll" del ciclo lectivo 2024 de la **Tecnicatura Universitaria en Desarrollo Web** perteneciente a la FCAD - UNER.


## 📋 Introducción 
Este proyecto responde a la consigna de crear una **API Rest** para la gestión de reclamos de la concesionaria de automóviles **"PROG III"**. 

**-** 📌 Usuarios Clientes: se registran desde la interfaz de usuario en el navegador.

**-** 🔑 Usuarios Empleados y Administradores: solo pueden ser creados por un administrador.

**-** 🔒 Roles y permisos: cada usuario tiene restricciones y permisos según su rol.


## Tecnologías utilizadas ⚙️

**- Node.Js**                                             =>    Entorno de ejecución para JavaScript
**- Express**                                             =>    Framework para aplicaciones web
**- express-validator**                                   =>    Validación de datos
**- Mysql2**                                              =>    Conexión a base de datos
**- dotenv**                                              =>    Manejo de variables de entorno
**- bcryptjs**                                            =>    Hasheo y encriptación de contraseñas
**- jasonwebtoken**                                       =>    Generación de tokens JWT
**- Handlebars**                                          =>    Generación de vistas y reportes en PDF
**- cors**                                                =>    Seguridad en el acceso a la API
**- morgan**                                              =>    Registro de solicitudes HTTP
**- csv-writer**                                          =>    Generación de reportes en CSV
**- puppeteer**                                           =>    Descarga de reportes en PDF
**- multer**                                              =>    Carga de imágenes
**- swagger-jsdoc y swagger-ui-express**                  =>    Documentación interactiva de la API
**- yamljs**                                              =>    Especificación de documentación


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


## ¿Cómo probamos la API? 🚀
> [!IMPORTANT]
> ROLES DE LOS USUARIOS:
> 
> **Administrador** = idUsuarioTipo: **1**
> 
> **Empleado** = idUsuarioTipo: **2**
> 
> **Cliente** = idUsuarioTipo: **3**
> 




LOS USUARIOS PUEDEN:

**Administrador**: 

**-** Iniciar sesión, visualizar y actualizar su perfil

**-** Crear, listar, modificar y eliminar cualquier tipo de reclamo

**-** Crear, listar, modificar (sólo el idUsuarioTipo e idOficina) y eliminar cualquier tipo de usuario

**-** Crear, listar, modificar y eliminar cualquier oficina y tipo de reclamo

**-** Visualizar información estadística sobre los reclamos

**-** Descargar reclamos en formato PDF/CSV


**Empleado**: 

**-** Iniciar sesión, visualizar y actualizar su perfil

**-** Listar, atender y finalizar todos (y únicamente) los reclamos asignados a su oficina


**Cliente**: 

**-** Iniciar sesión, visualizar y actualizar su perfil

**-** Crear, listar, consultar y cancelar sus reclamos

* Cada vez que un reclamo sufre un cambio de estado (cancelado, atendido o finalizado) se envía un notificación a la casilla de correo del cliente.

### ¡1,2 3... probando-probando!
Si ya descargaste el archivo, lo abriste en tu entorno de desarrollo, instalaste las dependencias y levantaste el servidor. Ahora el siguiente paso es ver lo que puede hacer. ¿Cómo? Abriendo un software de pruebas de desarrollo como puede ser POSTMAN o SWAGGER. 

**POSTMAN**: 
1) Abrir Postman
2) Dentro del proyecto vas a encontrar un archivo .txt llamado "endpoint-finales.txt" donde vas a encontrar todos los endpoints de la aplicación y ejemplos en formato tipo json de los datos que debes ingresar con cada uno de ellos para ejecutar las pruebas.

**SWAGGER**:
1) Esta aplicación fue documentada con Swagger por lo tanto, para realizar las pruebas, lo único que tenés que hacer es abrir tu navegador y entrar a localhost:3000/api/v1/docs-s, allí te encontrarás con la interfaz de Swagger y todos los endpoints de esta aplicación listos para probar.

Recuerda que cada tipo de usuario tiene una serie de tareas que puede y que no puede realizar. Así que por ej:

- **Si quieres crear un reclamo**, debes registrarte primero como *cliente*:
  **a)** Ir al endpoint POST http://localhost...
  **b)** Clic en "try.."
  **c)** Clic en "execute"
  **d)** Cambiar los datos de registro
  **c)** Clic en "execute"
                           y voalá... YA ESTÁS REGISTRADO, ahora podés seguir ejecutando el resto de las pruebas!

  Importante: a la derecha de las pruebas hay un ícono de un candado abierto, allí debes ingresar el token que te dió el registro o el login para poder ejecutar esa tarea.

**Si quieres agregar un empleado**, debes ingresar como *administrador*:
  **a)** Ir al endpoint POST http://localhost...
  **b)** Clic en "try.."
  **c)** Clic en "execute"
  **d)** No cambiar los datos del login (porque este usuario administrador ya está en la base de datos)
  **c)** Clic en "execute"
                           y voalá... YA INICIASTE SESIÓN, ahora copiá el **token** y andá al endpoint para crear usuarios empleados o a cualquier otro con tareas de administrador!

**Si querés atender un reclamo**, debés ingresar como *empleado*:
**a)** Hacer lo mismo que con el adminitrador.

