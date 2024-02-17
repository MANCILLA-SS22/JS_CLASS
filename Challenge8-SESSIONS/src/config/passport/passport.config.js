import passport from "passport";
import { initialPassport } from "../initialize.config.js";

function passportConfig(app){
    initialPassport();
    app.use(passport.initialize());
    app.use(passport.session()); //Descomentar linea si se trabaja con "sessions". Comentar si se trabaja con JWT
};

export default passportConfig;