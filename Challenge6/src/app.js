import {app, express, httpServer} from "./socket/socketConfig.js";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";

mongoConfig(app);
routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
httpServer.listen(5500, () => console.log(`Server listening on 5500 ${5500}`));

// AQUI SE ENCUENTRAN LOS OBJETOS PARA REALIZAR PRUEBAS EN POSTMAN  --> http://localhost:5500/api/products
/* [
    {
        "title": "Saiga-12", 
        "description": "Shotgun", 
        "price": 800, 
        "thumbnail": "http://dissidentarms.com/wp-content/uploads/2016/12/20210201_181025-scaled.jpg",
        "code": "SS2000",
        "stock": 1,
        "status": true,
        "category": "New"
    }
    {   
        "title": "RPG", 
        "description": "Launchers", 
        "price": 1000, 
        "thumbnail": "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
        "code": "SS2001",
        "stock": 5,
        "status": true,
        "category": "Old"
    }
    {   
        "title": "AA-12", 
        "description": "Shotgun", 
        "price": 3000, 
        "thumbnail": "https://static.wikia.nocookie.net/squad_gamepedia/images/9/9a/RPG-7_real_life.jpg/revision/latest?cb=20170116205104",
        "code": "SS2002",
        "stock": 8,
        "status": true,
        "category": "Medium"
    }
    {
        "title": "Barret .50 cal", 
        "description": "Sniper", 
        "price": 5000, 
        "thumbnail": "https://www.militarytimes.com/resizer/uM3S85PI9oSYKigYiohxkx3Si7w=/1024x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/archetype/    4FP5BTDFBNDWPOBKJPROA3ZDOE.png",
        "code": "SS2003",
        "stock": 3,
        "status": true,
        "category": "Medium"
    }
    {   
        "title": "AK-12", 
        "description": "Assault riffle", 
        "price": 900, 
        "thumbnail": "https://files.cults3d.com/uploaders/14777289/illustration-file/422a8f9d-fe09-467d-9aa0-7c6976561d36/1.png",
        "code": "SS2004",
        "stock": 8,
        "status": true
        "category": "New"
    }
    {
        "title": "MP7", 
        "description": "Sub machine gun", 
        "price": 650, 
        "thumbnail": "https://www.airsoftatlanta.com/cdn/shop/products/DSC07015.JPG?v=1558658466",
        "code": "SS2005",
        "stock": 10,
        "status": true
        "category": "Medium"
    }
    {
        "title": "G36C", 
        "description": "Launchers", 
        "price": 700, 
        "thumbnail": "https://cdn11.bigcommerce.com/s-9mcepdq780/images/stencil/1280x1280/products/511/1738/1__81892.1553886372.jpg?c=2",
        "code": "SS2006",
        "stock": 9,
        "status": true
        "category": "Old"
    }
    {
        "title": "VEPR-12", 
        "description": "Shotgun", 
        "price": 1500, 
        "thumbnail": "https://gundigest.com/wp-content/uploads/Molot-Vepr-12-f2.jpg",
        "code": "SS2007",
        "stock": 2,
        "status": true
        "category": "New"
    }
] */







/* import express from "express";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";

const app = express();
mongoConfig(app);
routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
app.listen(5500, () => console.log(`Server listening on port ${5500}`)); */
