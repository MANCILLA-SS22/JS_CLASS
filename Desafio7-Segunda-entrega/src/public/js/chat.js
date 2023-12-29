const socket = io();

const swal = async () => {
  const chatBox = document.getElementById("chatBox")
  const result = await Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa el usuario para identificarte en el chat",
    inputValidator: value => {
      return !value && "Necesitas escribir un nombre de usuario para continuar!"
    },
    allowOutsideClick: false
  })
  const user = result.value
  socket.emit('newUser', user)

  chatBox.addEventListener('keyup', e => {
    if (e.key === "Enter") {
      if (chatBox.value.trim().length > 0) {
        const message = {
          user: user,
          message: chatBox.value
        }
        socket.emit("message", message)
      }
    }
  })
}
swal()

socket.on("bienvenida", data => {
    const bienvenida = document.getElementById("bienvenida");
    const instructions = document.getElementById("instructions");
    let bienvenidaDOM = `Bienvenido al chat ${data}</br>`;
    let instructionsDOM = `<h4>Instrucciones para usar el chat</h4>
    <p>Escribir mensaje en el recuadro blanco y preionar enter para enviar mensaje</p>`;
    bienvenida.innerHTML = bienvenidaDOM;
    instructions.innerHTML = instructionsDOM;
  })
  
socket.on("messageLogs", data => {
  const log = document.getElementById("messageLogs")
  let messages = ""
  data.forEach(message => {
    messages += `${message.user} dice: ${message.message}</br>`
  })
  log.innerHTML = messages
})