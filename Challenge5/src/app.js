import {app, express, httpServer} from "./socket/socketConfig.js";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";
import {PORT} from "./env.js";

routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
mongoConfig();
httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));