En breve descripción, el proyecto es una aplicación de libros en la que los usuarios inscritos como administradores gestionan un listado “fijo” (esto es, a modo de inventario solo actualizable por el administrador). Los usuarios que accedan como usuarios logueados pueden añadir textos breves con imágenes y el resto de usuarios puedan ver el contenido en calidad de invitados.

A continuación un listado completo de componentes empezando con el backend.

Entidades. Mi modelo de datos consta de usuarios, libros y publicaciones. Los usuarios de tipo administrador podrán cada uno gestionar una cantidad indefinida de libros. Del mismo modo, los usuarios de tipo usuario podrán gestionar sus propias publicaciones de cantidad indefinida. Los usuarios de tipo invitado podrán visualizar el contenido.
Esquemas. Los esquemas de Joi sirven para la validación. Determinan el tipo de datos que se espera recibir en el input y si este es requerido u opcional.
Repositorios. Manejan las operaciones de base de datos mediante el uso de Prisma. Definen un objeto “select” que especifica los campos a consumir de la base de datos. Será necesario definir primero un repositorio genérico y después uno específico por cada entidad para poner en práctica la inversión de dependencias. Definen los métodos del CRUD.
Controladores. Al igual que con los repos, convendrá definir primero un controlador genérico y posteriormente los específicos a cada recurso para manejar la operaciones del CRUD. Aquí se implementará la validación descrita en el esquema.
Servicio de autentificación. Necesitaremos definir otro servicio para las tareas de autenticación que definirá el contenido válido del “payload”, hasheará contraseñas, comparará contraseñas y retornará tokens de autenticación.
Interceptor de autorización. Crearemos un middleware para manejar las labores de autorización y autenticación como verificar que la cabecera de autorización comienza con el convencional ‘Bearer’ y contiene el token, comprobar si el usuario es administrador.
Interceptor de errores. También vamos a definir una clase que extienda el interfaz de errores de typescript a fin de personalizar nuestra propia tirada de errores.
Interceptor de archivos. Necesitaremos un middleware para interceptar la subida de archivos y manjearla de manera acorde mediante Multer y Cloudinary.
Routers. Necesitaremos enrutadores para libros y artículos así como el de usuarios con los métodos para registro y logueado.
