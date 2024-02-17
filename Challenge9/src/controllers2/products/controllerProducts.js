import Route from "../../router/class.routes.js"
import {ProductManager} from "../../dao/mongoClassManager/ProductManager.js";
const ProductJSON = new ProductManager();

function logger(req, res, next){
    if (!req.cookies.jwtCookieToken){
        // return res.redirect("/login");
        return res.send("No estas registrado!!");
    }else{
        next();
    }
}

class ProductRouter extends Route{
    init(){
        this.get("/", ['PUBLIC'], logger, async function(req, res){
            try {
                // Copiar y pegar en barra de navegacion --> http://localhost:5500/api/products?page=1&limit=3&sort=asc&stock=1&category=New
                const {category, stock, limit, page, sort} = req.query;
                let numLimit, numPage, filter, numSort, prevSort, nextLink, prevLink;
                let link = req.protocol+"://"+req.get("host")+'/api/products/'; //Obtenemos el link original
                // let linkProducts = req.protocol+"://"+req.get("host")+'/products/'; //Obtenemos el link original
                let linkProducts = '/products/'; //Obtenemos el link original (No hace falta agregar el path completo si el recurso se encuentra dentro del mismo dominio)
        
                if(category == undefined && stock == undefined){
                    filter = {};
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
                    numPage = 1;
                } else {
                    numPage = page;
                }
        
                if (limit === undefined) {
                    numLimit = 10;
                } else {
                    numLimit = limit;
                }
        
                // page == undefined ? numPage = 1 : numPage = page;
                // limit == undefined ? numLimit = 5 : numLimit = limit;
        
                if(sort == "asc"){
                    prevSort = "asc";
                    numSort = 1;
                }else if(sort == "desc"){
                    prevSort = "desc";
                    numSort = -1;
                }else{
                    numSort = undefined;
                }        
        
                let conditionalQuery = {
                    page: numPage,
                    limit: numLimit,
                    numSort: { /* category: numSort,  */price: numSort}
                };
        
                const products = await ProductJSON.getProductsNew(filter, conditionalQuery); // Model.paginate([filter], [options], [callback])
                products.hasPrevPage == false ? prevLink = null : prevLink = req.protocol+"://"+req.get("host")+'/api/products'+ "?"+ `page=${products.prevPage}`+ `&limit=${limit}&sort=${prevSort}`;
                products.hasNextPage == false ? nextLink = null : nextLink = req.protocol+"://"+req.get("host")+'/api/products'+ "?"+ `page=${products.nextPage}`+ `&limit=${limit}&sort=${prevSort}`;
        
                let ans = {
                    status: "success",                 //success/error
                    payload: products.docs,            //Resultado de los productos solicitados
                    totalPages: products.totalPages,   //Total de páginas
                    prevPage: products.prevPage,       //Página anterior
                    nextPage: products.hasNextPage,    //Página siguiente
                    page: products.page,               //Página actual
                    hasPrevPage: products.hasPrevPage, //Indicador para saber si la página previa existe
                    hasNextPage: products.hasNextPage, //Indicador para saber si la página siguiente existe.
                    prevLink: prevLink,                //Link directo a la página previa (null si hasPrevPage=false)   
                    nextLink: nextLink,                //Link directo a la página siguiente (null si hasNextPage=false)
                    link: link,
                    linkProducts: linkProducts
                };
        
                // res.status(200).json(res.payload); 
                res.status(200).render('products',{ans}); 
                // res.sendSuccess(ans)
        
        
            } catch (error) {
                res.status(404).json({ mesagge:"No hay nada!!" });
            } 
        
        });
        
        this.get("/:id", ['PUBLIC'], logger, async function(req, res){
            try {
                const {id} = req.params;
                const getById = await ProductJSON.getProductById(id);
                res.status(200).json({getById, message: "User found"});
            } catch (error) {
                res.status(404).json({message: "User NOT found", error});
            }
            
        });
        
        this.post("/", ['ADMIN'], logger, async function(req, res){
            const {title, description, price, thumbnail, code, stock, status, category} = req.body;
            const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category}
        
            // const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
            const parametersExist = nuevoProducto.hasOwnProperty("title") && nuevoProducto.hasOwnProperty("description") && nuevoProducto.hasOwnProperty("price") && nuevoProducto.hasOwnProperty("thumbnail") && nuevoProducto.hasOwnProperty("code") && nuevoProducto.hasOwnProperty("stock") && nuevoProducto.hasOwnProperty("status") && nuevoProducto.hasOwnProperty("category");
            if (parametersExist) {
                const crearProducto = await ProductJSON.addProduct(nuevoProducto);
                // const allProducts = await Product.addProduct();
        
                if(crearProducto?.error) {
                    res.status(409).json({error: crearProducto.error})
                    return;
                }
                res.status(200).json({message: {crearProducto}});
            
            }else{
                res.status(404).json({message: "Not enough information."});
            }
        });
        
        this.put("/:pid", ['ADMIN'], logger, async function(req, res){
            const {pid} = req.params;
            const {title, description, price, thumbnail, code, stock, status, category} = req.body;
            const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category}
        
            const verificarId = ProductJSON.getProductById(pid);
            if(!verificarId){
                res.status(404).json({message: "Not found id."});
            }else{
                const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
                if (verifyExistenceUndefined == -1) {
                    const actualizarProducto = await ProductJSON.updateProduct(pid, nuevoProducto);
                    res.status(200).json({message: actualizarProducto});
                }else{
                    res.status(404).json({message: "Not enough information."});
                }
            }
        });
        
        this.delete("/:id", ['ADMIN'], logger, async function(req, res){
            try {
                const {id} = req.params;
                const verificarId = await ProductJSON.getProductById(id);
                if(!verificarId){
                    res.status(404).json({message: "Not found id."});
                }else{
                    const eliminarProducto = await ProductJSON.deleteProduct(id);
                    res.status(200).json({message: eliminarProducto});
                }
            } catch (error) {
                res.status(404).json({message: "Not found id.", error});
            }
        });
    }
}

// export default routerProducts;
export default ProductRouter;