// ✓ Generar un módulo de Mocking para el servidor, con el fin de que, al inicializarse pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo. Ésto solo debe 
//   ocurrir en un endpoint determinado (‘/mockingproducts’)
// ✓ Además, generar un customizador de errores y crear un diccionario para tus errores más comunes al crear un producto, agregarlo al carrito, etc.

import { PORT } from "./config/dotenvMain/env.config.js";
import {app, httpServer, express} from "./socket/socketServer.js";
import program from "./process.js";
import routerMain from "./router/classMain.routes.js";  
import mongoConfig from "./config/mongodb/mongodb.config.js";
import handlebarsConfig from "./config/handlebars/handlebars.config.js";
import passportConfig from "./config/passport/passport.config.js";
import middlewares from "./config/middlewares/middlewares.config.js";

mongoConfig();
passportConfig(app);
middlewares(app, express);
routerMain(app);
handlebarsConfig(app);

httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));