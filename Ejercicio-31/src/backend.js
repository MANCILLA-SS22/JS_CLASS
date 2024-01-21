//Ejemplo 31: CRUD con Mongoose
// Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB Atlas llamada colegio. Utilizar mongoose importándolo en Módulo (import) y gestionar sus acciones a través de promesas.
// ✓ Crear una colección llamada "estudiantes" que incorporará 10 documentos con la siguiente estructura y datos que se detallan a continuación:
//   a) nombre: tipo string
//   b) apellido: tipo string
//   c) edad: tipo number
//   d) dni: tipo string (campo único)
//   e) curso: tipo string
//   f) nota: tipo number
//   Tod0s los campos deben ser requeridos obligatoriamente ({ required: true })
// ✓ Insertar un arreglo de estudiantes a dicha colección
// ✓ Desarrollar los endpoints correspondientes al CRUD pensado para trabajar con esta colección
// ✓ Corroborar los resultados con Postman.