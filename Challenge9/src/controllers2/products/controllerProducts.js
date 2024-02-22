import Route from "../../router/class.routes.js"
import {ProductManager} from "../../dao/mongoClassManager/ProductManager.js";
import passport from "passport";
const ProductJSON = new ProductManager();

class ProductRouter extends Route{
    init(){
        this.get("/", ['PUBLIC'], passport.authenticate('jwt', { session: false }), async function(req, res){
            try {
                // Copiar y pegar en barra de navegacion --> http://localhost:5500/api/products?page=1&limit=3&sort=asc&stock=8&category=New
                let {category, stock, limit, page, sort} = req.query;
                let numLimit, numPage, filter, numSort, prevSort, nextLink, prevLink;

                let link = req.protocol+"://"+req.get("host")+'/api/products'; //Obtenemos el link original
        
                if(category == undefined && stock == undefined){
                    filter = {
                        category: {$regex: "Old"},
                        stock: {$gte: 1}                        
                    }
                    //filter = {};
                }else if(category == undefined && stock != undefined){
                    filter = { stock: {$gte: stock} };
                }else if(category != undefined && stock == undefined){
                    filter = { category: {$regex: category} };
                }else{
                    filter = { 
                        category: {$regex: category},  //$regex --> Selects documents where values match a specified regular expression.
                        stock: {$gte: stock}           //$gte --> Matches values that are greater than or equal to a specified value.
                    };
                }
        
                if (page === undefined) {
                    numPage = 1
                } else {
                    numPage = page
                }

                if (limit === undefined) {
                    numLimit = 10
                } else {
                    numLimit = limit;
                }

                if(sort == "asc"){
                    prevSort = "asc";
                    numSort = 1;
                }else if(sort == "desc"){
                    prevSort = "desc";
                    numSort = -1;
                }else if(sort == undefined){
                    prevSort = "asc";
                    numSort = 1;
                }        
        
                let conditionalQuery = {
                    page: numPage,
                    limit: numLimit,
                    numSort: {price: numSort}
                };
        
                const products = await ProductJSON.getProductsNew(filter, conditionalQuery); // Model.paginate([filter], [options], [callback])
                products.hasPrevPage === false ? prevLink = null : prevLink = link + "?"+ `page=${products.prevPage}`+ `&limit=${numLimit}&sort=${prevSort}$`;
                products.hasNextPage === false ? nextLink = null : nextLink = link + "?"+ `page=${products.nextPage}`+ `&limit=${numLimit}&sort=${prevSort}$`;

        
                const respuestaInfo = {
                    status: "success",                 //success/error
                    payload: products.docs,            //Resultado de los productos solicitados
                    numItems: products.docs.length,    //Resultado de la cantidad de productos solicitados
                    totalPages: products.totalPages,   //Total de páginas
                    prevPage: products.prevPage,       //Página anterior
                    nextPage: products.hasNextPage,    //Página siguiente
                    page: products.page,               //Página actual
                    hasPrevPage: products.hasPrevPage, //Indicador para saber si la página previa existe
                    hasNextPage: products.hasNextPage, //Indicador para saber si la página siguiente existe.
                    prevLink: prevLink,                //Link directo a la página previa (null si hasPrevPage=false)   
                    nextLink: nextLink,                //Link directo a la página siguiente (null si hasNextPage=false)
                    link: link,                        //http://localhost:5500/products?page=1&limit=3&sort=asc&stock=8&category=New
                    user: req.user
                };

                console.log("products --> ", respuestaInfo)

                // res.status(200).render('products',{respuestaInfo}); 
                res.sendSuccess(respuestaInfo);
        
            } catch (error) {
                res.status(404).json({ mesagge:"No hay nada!!" });
            } 
        
        });
        
        this.get("/:pid", ['PUBLIC'], async function(req, res){
            try {
                const {pid} = req.params;
                const getById = await ProductJSON.getProductById(pid);
                getById ? res.sendSuccess(getById) : res.sendClientError({message: "Not product found by ID"})
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
            
        });
        
        this.post("/", ['ADMIN'], async function(req, res){
            try {
                const {title, description, price, thumbnail, code, stock, status, category} = req.body;
                const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category}
            
                // const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
                const parametersExist = nuevoProducto.hasOwnProperty("title") && nuevoProducto.hasOwnProperty("description") && nuevoProducto.hasOwnProperty("price") && nuevoProducto.hasOwnProperty("thumbnail") && nuevoProducto.hasOwnProperty("code") && nuevoProducto.hasOwnProperty("stock") && nuevoProducto.hasOwnProperty("status") && nuevoProducto.hasOwnProperty("category");
                if (parametersExist) {
                    const crearProducto = await ProductJSON.addProduct(nuevoProducto);

                    if(crearProducto?.error) {
                        res.status(409).json({error: crearProducto.error})
                        return;
                    }
                    res.sendSuccess(crearProducto);
                
                }else{
                    res.sendClientError({message: "Not enough information."});
                }
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
        
        this.put("/:pid", ['ADMIN'], async function(req, res){
            try {
                const {pid} = req.params;
                const {title, description, price, thumbnail, code, stock, status, category} = req.body;
                const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category}
            
                const verificarId = ProductJSON.getProductById(pid);
                if(!verificarId){
                    res.sendClientError({message: "Not found id."});
                }else{
                    const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
                    if (verifyExistenceUndefined == -1) {
                        const actualizarProducto = await ProductJSON.updateProduct(pid, nuevoProducto);
                        res.sendSuccess(actualizarProducto);
                    }else{
                        res.sendClientError({message: "Not enough information."});
                    }
                }
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        });
        
        this.delete("/:id", ['ADMIN'], async function(req, res){
            try {
                const {id} = req.params;
                const verificarId = await ProductJSON.getProductById(id);
                if(!verificarId){
                    res.sendClientError({message: "Not found id."});
                }else{
                    const eliminarProducto = await ProductJSON.deleteProduct(id);
                    res.sendSuccess(eliminarProducto);
                }
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
    }
}

export default ProductRouter;