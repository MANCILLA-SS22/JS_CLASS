const socket = io();

const liveProducts = document.getElementById("liveProducts");

socket.on('statusProductsList', (data) => {
  document.getElementById("notliveProducts").innerHTML = "";
  
  console.log(data);
  let html = data.map( (data) => {
    let respon =  
    `<div class="product-info">
      <span>
      <h2>${data.title}</h2>
      <p>description: ${data.description}</p>
      <p>price: ${data.price}</p>
      <p>thumbnail: ${data.thumbnail}</p>
      <p>code: ${data.code}</p>
      <p>stock: ${data.stock}</p>
      <p>status: ${data.status}</p>
      <p>category: ${data.category}</p>
      <p>id: ${data.id}</p>
      </span>
    </div>`;
    return respon;

  })
  liveProducts.innerHTML = html
});

socket.on('error', (error) => {
  console.error(error);
});