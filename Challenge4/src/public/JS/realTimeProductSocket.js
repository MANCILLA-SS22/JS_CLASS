const socket = io();

const button = document.querySelector("#button");
button.addEventListener("click", function(e){
    e.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");
    const thumbnail = document.querySelector("#thumbnail");
    const code = document.querySelector("#code");
    const stock = document.querySelector("#stock");

    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value
    };

    socket.emit("product_form", product);
});

socket.on("product_list", function(data){
    const div = document.querySelector("#newProducts");
    div.innerHTML = data.map(function(e){
            return `
                <h2>title${e.title}</h2>
                <p>description${e.description}</p>
                <p>price${e.price}</p>
                <p>thumbnail${e.thumbnail}</p>
                <p>code${e.code}</p>
                <p>stock${e.stock}</p>`
        }
    );
});

// const newProducts = document.getElementById("newProducts");
// const currentProduct = document.getElementById("currentProduct");

// socket.on("productList", function(data){
//     currentProduct.innerHTML = "";
//     let render = data.map(function(event){
//         let ans = (
//             `<div class="product-render">
//                 <span>
//                     <h2>${event.title}</h2>
//                     <p>description: ${event.description}</p>
//                     <p>price: ${event.price}</p>
//                     <p>thumbnail: ${event.thumbnail}</p>
//                     <p>code: ${event.code}</p>
//                     <p>stock: ${event.stock}</p>
//                     <p>status: ${event.status}</p>
//                     <p>id: ${event.id}</p>
//                 </span>
//             </div>`
//         );

//         return ans;
//     });

//     newProducts.innerHTML = render;
// }); 


