import { PORT } from "./config/dotenvMain/env.config.js";
import {app, httpServer, express} from "./socket/socketServer.js";
import routerMain from "./router/classMain.routes.js";  // import routerMain from "./router/main.routes.js";
import mongoConfig from "./config/mongodb/mongodb.config.js";
import handlebarsConfig from "./config/handlebars/handlebars.config.js";
import passportConfig from "./config/passport/passport.config.js";
import middlewares from "./config/middlewares/middlewares.config.js";

mongoConfig(app);
passportConfig(app);
middlewares(app, express);
routerMain(app);
handlebarsConfig(app);

httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));


/* import express from "express";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";

const app = express();
mongoConfig(app);
routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
app.listen(5500, () => console.log(`Server listening on port ${5500}`)); */
