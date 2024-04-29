
# Gestión de Productos y Usuarios

Este proyecto es  para la gestión de productos y usuarios. Permite crear, leer, actualizar y eliminar productos y usuarios, desde archivos file y desde la memoria.

## Instalación
Clona este repositorio en tu máquina local:

git clone https://github.com/tu-usuario/tu-repositorio.git

## Instala las dependencias del proyecto:

- npm install

### Para iniciar el servidor, ejecuta el siguiente comando:

- npm run dev

### Una vez iniciado, puedes acceder a la API a través de las siguientes rutas:

- Para acceder a la API de productos: "/api/product"
- Para acceder a la API de usuarios: "/api/user"
### Rutas
- Productos
 - GET "/api/product": Retorna todos los productos almacenados en el sistema.
 - GET "/api/product/":pid": Retorna un producto específico según su ID.
 - POST "/api/product": Crea un nuevo producto con los datos proporcionados en el cuerpo de la solicitud.
 - PUT "/api/product/:pid": Actualiza un producto existente con los nuevos datos proporcionados en el cuerpo de la solicitud.
 - DELETE "/api/product/:pid": Elimina un producto específico según su ID.
- Usuarios
 - GET "/api/user/:uid": Retorna un usuario específico según su ID.
 - GET "/api/user": Retorna todos los usuarios almacenados en el sistema.
 - POST "/api/user": Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud.
 - PUT "/api/user/:uid": Actualiza un usuario existente con los nuevos datos proporcionados en el cuerpo de la solicitud.
 - DELETE "/api/user/:uid": Elimina un usuario específico según su ID.
### Tecnologías Utilizadas
- [Node.js](https://nodejs.org/e)
- [Express](https://expressjs.com/es/)
- [nodemon](https://nodemon.io)
- [fs](https://www.fs.com) (para almacenamiento en archivos en file y en memory)
- [Handlebars](https://handlebarsjs.com)

### Implementacio de enrutamiento externo

hice las vistas con handlebars

desarrolle un frontend con boostrap y implemente un filtrado por categorias colocando las rutas /product/?category=Ropa, /product/?category=Calzado y /product/?category=Accesorios y el boton de "todos" muestra todos los productos

tambien integre formulario con los imputs para subir los productos (todavia con es funcional)

 