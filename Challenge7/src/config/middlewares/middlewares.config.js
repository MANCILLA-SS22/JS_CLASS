import { __dirname } from "../../utils.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

function middlewares(app, express){
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
    app.use(cookieParser(false));
}

export default middlewares;