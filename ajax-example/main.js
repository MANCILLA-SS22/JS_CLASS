console.log("--> Bienvenidos a la clase de Ajax & Fetch <--");

let showSearchingUsers = document.getElementById("showSearchingUsers");
let showSearchingPosts = document.getElementById("showSearchingPosts");
//showSearchingUsers.style.display = "block";

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    console.log("--> Respuesta sin formatear", response);
    return response.json();
  })
  .then((json) => {
    console.log("--> Esta es la respuesta del recurso formateado",json);
    showSearchingUsers.style.display = "block";

    renderUsersTableDetails(json);

    showSearchingUsers.style.display = "none";
  });

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    showSearchingPosts.style.display = "block";

    renderCardsPostDetails(json);

    showSearchingPosts.style.display = "none";
  });

fetch("https://jsonplaceholder.typicode.com/photos")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  });

// Realizar una solicitud POST
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "Me encanta la programación con Chaman",
    body: "Un texto que comente la historia de uno  de los desarrolladores que más la peleó aprendiendo.",
    userId: 100,
  }),
  headers: {
    "Content-type": "application/json;charset=UTF-8",
  },
})
  .then((response) => {
    console.log("--> El resultado de la respuesta POST es", response);
    return response.json();
  })
  .then((json) => {
    console.log("--> Respuesta del body de la petición", json);
  });

// Uso de rutas relativas
  fetch("./data.json")
  .then((response) => response.json())
  .then((usuarios) => {
    let bodyList = document.getElementById("bodyUsers");

    usuarios.forEach(element => {
        let listItem = document.createElement("li");
        listItem.innerHTML= `
        <h4>${element.name}</h4>
        `;
        bodyList.append(listItem)
    });
  });

// Uso de async y awaits
async function solicitarPosteos() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let custom = await response.json();
  console.log("---> Respuesta formateada de la consulta", custom);
}

solicitarPosteos();


// Sección para consultar Usuarios
function renderUserDetail(user) {
  let productDetail = document.getElementById("usersTableBody");
  let record = document.createElement("tr");
  record.innerHTML = `<td>${user.name}</td>
      <td><a href="mailto:${user.email}?Subject=Lo%20contactamos%20para%20ofrecerle%20un%20curso">${user.email}</a></td>
      <td>${user.username}</td>
      <td>
      <a href="${user.website}" target="_blank">${user.website}</a>
      </td>`;
  productDetail.appendChild(record);
}

function renderUsersTableDetails(users = []) {
  let usersTableBody = document.getElementById("usersTableBody");
  usersTableBody.innerHTML = "";
  users.forEach((element) => {
    renderUserDetail(element);
  });
}

// Sección para consultar Posteos
function renderPostDetail(post) {
  let postsContainer = document.getElementById("postsContainer");
  let record = document.createElement("div");
  record.innerHTML = `<div class="card-body">
  <img src="https://picsum.photos/200" class="rounded card-img-top" alt="${post.title}">
  <h5 class="card-title">${post.title}</h5>
  <p class="card-text">${post.body}</p>
</div>`;
  record.className = "card mt-2";
  postsContainer.appendChild(record);
}

function renderCardsPostDetails(posts = []) {
  let postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";
  posts.forEach((element) => {
    renderPostDetail(element);
  });
}