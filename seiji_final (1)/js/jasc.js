// ==============================
// SECCIÓN: BLOQUEO POR PIN
// ==============================

let entrada = '';

function agregarNumero(n) {
  if (entrada.length < 6) {
    entrada += n;
    document.getElementById('entrada').textContent = entrada;
  }
}

function borrarNumero() {
  entrada = entrada.slice(0, -1);
  document.getElementById('entrada').textContent = entrada;
}

function verificarPIN() {
  if (entrada === '0108' || entrada === '108') {
    window.location.href = "home.html";
  } else {
    const pantalla = document.querySelector('.pantalla');
    if (pantalla) {
      pantalla.classList.add('vibrar');
      setTimeout(() => pantalla.classList.remove('vibrar'), 300);
    }
    entrada = '';
    document.getElementById('entrada').textContent = '';
  }
}

// ==============================
// SECCIÓN: COMENTARIOS
// ==============================

const comentarios = [
  { nombre: "yuffie", user: "@piururin", mensaje: "text text text 💖", foto: "img/yuffie.jpg" },
  { nombre: "naeve",  user: "@ninfjal",  mensaje: "text text text ✨", foto: "img/naeve.jpg" },
  { nombre: "zephyr", user: "@necrocize",mensaje: "text text text 🐱", foto: "img/zephyr.jpg" },
  { nombre: "daniel", user: "@cautlver", mensaje: "text text text 🐰", foto: "img/daniel.jpg" },
  { nombre: "candy",  user: "@iglesitar",mensaje: "text text text 🌸", foto: "img/candy.jpg" }
];

let comentarioIndex = 0;

function siguienteComentario() {
  comentarioIndex = (comentarioIndex + 1) % comentarios.length;
  const c = comentarios[comentarioIndex];
  document.querySelector("#comentario .perfil").src = c.foto;
  document.querySelector("#comentario .nombre").textContent = c.nombre;
  document.querySelector("#comentario .user").textContent = c.user;
  document.querySelector("#comentario .mensaje").textContent = c.mensaje;
}

// ==============================
// SECCIÓN: MOSTRAR JUEGOS
// ==============================

function mostrarJuego(nombre) {
  const contenedor = document.getElementById("pantalla-juego");

  if (nombre === "adivina") {
    iniciarQuiz();
  } else if (nombre === "atrapa") {
    contenedor.innerHTML = `
      <div id="atrapa-juego">
        <div class="personaje" id="personaje"></div>
        <div class="controles-touch">
          <button onclick="moverIzquierda()">⬅️</button>
          <button onclick="moverDerecha()">➡️</button>
        </div>
      </div>
      <p style="color:#5a422a; font-weight:bold; margin-top:10px;">Puntos: <span id="puntos">0</span></p>
    `;
    iniciarAtrapa();
  }
}

// ==============================
// SECCIÓN: JUEGO "ADIVINA QUIÉN LO DIJO"
// ==============================

const frases = [
  { texto: "text text text ", autor: "Yuffie" },
  { texto: "text text text ", autor: "Naeve" },
  { texto: "text text text ", autor: "Zephyr" },
  { texto: "text text text ", autor: "Daniel" },
  { texto: "text text text ", autor: "Candy" }
];

let quizIndex = 0;
let pendientes = [];

function iniciarQuiz() {
  quizIndex = 0;
  pendientes = [];
  cargarPregunta(frases[quizIndex]);
}

function cargarPregunta(fraseObj) {
  const contenedor = document.getElementById("pantalla-juego");
  contenedor.innerHTML = `
    <div class="adivina-juego">
      <p class="frase">"${fraseObj.texto}"</p>
      <div class="opciones-corazones">
        <div class="fila">
          <button onclick="evaluarRespuesta('${fraseObj.autor}', 'Yuffie')">Yuffie</button>
          <button onclick="evaluarRespuesta('${fraseObj.autor}', 'Naeve')">Naeve</button>
        </div>
        <div class="fila">
          <button onclick="evaluarRespuesta('${fraseObj.autor}', 'Zephyr')">Zephyr</button>
          <button onclick="evaluarRespuesta('${fraseObj.autor}', 'Candy')">Candy</button>
        </div>
        <div class="fila fila-centrada">
          <button onclick="evaluarRespuesta('${fraseObj.autor}', 'Daniel')">Daniel</button>
        </div>
      </div>
      <p id="resultado" class="respuesta"></p>
    </div>
  `;
}

function evaluarRespuesta(correcto, elegido) {
  const resultado = document.getElementById("resultado");
  const botones = document.querySelectorAll(".opciones-corazones button");

  botones.forEach(b => {
    b.disabled = true;
    const texto = b.textContent.trim();
    if (texto === elegido) {
      if (elegido === correcto) {
        b.classList.add("correcta");
        resultado.textContent = "¡Correcto! ";
      } else {
        b.classList.add("incorrecta");
        resultado.textContent = `No era ${elegido}... la volverás a ver después `;
        pendientes.push({
          texto: resultado.parentElement.querySelector(".frase").textContent.replace(/"/g, ''),
          autor: correcto
        });
      }
    }
  });

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < frases.length) {
      cargarPregunta(frases[quizIndex]);
    } else if (pendientes.length > 0) {
      frases.length = 0;
      frases.push(...pendientes);
      pendientes = [];
      quizIndex = 0;
      cargarPregunta(frases[quizIndex]);
    } else {
      document.getElementById("pantalla-juego").innerHTML = `<p class="frase" style="color:#276442; font-weight:bold;">¡Completaste todas las frases! 🌟</p>`;
    }
  }, 1300);
}

// ==============================
// SECCIÓN: JUEGO "ATRAPA EL SOL"
// ==============================

let puntos = 0;
let intervalos = [];

function iniciarAtrapa() {
  puntos = 0;
  document.getElementById("puntos").textContent = puntos;
  const juego = document.getElementById("atrapa-juego");
  const personaje = document.getElementById("personaje");
  personaje.style.left = "120px";
  personaje.dataset.direccion = "derecha";
  actualizarAvatar(personaje);

  // Evitar múltiples listeners
  document.removeEventListener("keydown", moverConTeclado);
  document.addEventListener("keydown", moverConTeclado);

  clearIntervalos();

  intervalos.push(setInterval(() => {
    const objeto = document.createElement("div");
    const esSol = Math.random() > 0.4;
    objeto.classList.add("objeto", esSol ? "sol" : "nube");
    objeto.style.left = Math.random() * 260 + "px";
    objeto.style.top = "0px";
    juego.appendChild(objeto);

    let caida = setInterval(() => {
      let top = parseInt(window.getComputedStyle(objeto).top);
      if (top >= 140) {
        let pjLeft = parseInt(window.getComputedStyle(personaje).left);
        let objLeft = parseInt(objeto.style.left);
        if (Math.abs(pjLeft - objLeft) < 30) {
          if (esSol) {
            puntos += 10;
            generarParticula(objLeft, 140);
          } else {
            puntos -= 10;
            personaje.classList.add("vibrar");
            setTimeout(() => personaje.classList.remove("vibrar"), 300);
          }

          if (puntos < 0) puntos = 0;
          document.getElementById("puntos").textContent = puntos;

          if (puntos >= 100) {
            clearIntervalos();
            document.removeEventListener("keydown", moverConTeclado);
            const controles = document.querySelector(".controles-touch");
            if (controles) controles.style.display = "none";
            const mensajeFinal = document.createElement("p");
            mensajeFinal.textContent = "Tú eres el solecito ☀️";
            mensajeFinal.style.fontSize = "1.1rem";
            mensajeFinal.style.color = "#276442";
            mensajeFinal.style.marginTop = "1rem";
            document.getElementById("pantalla-juego").appendChild(mensajeFinal);
          }
        }

        objeto.remove();
        clearInterval(caida);
      } else {
        objeto.style.top = (top + 5) + "px";
      }
    }, 100);
  }, 1000));
}

function moverConTeclado(e) {
  const personaje = document.getElementById("personaje");
  if (!personaje) return;
  let left = parseInt(window.getComputedStyle(personaje).left);
  if (e.key === "ArrowLeft") {
    personaje.style.left = Math.max(left - 20, 0) + "px";
    personaje.dataset.direccion = "izquierda";
    actualizarAvatar(personaje);
  }
  if (e.key === "ArrowRight") {
    personaje.style.left = Math.min(left + 20, 260) + "px";
    personaje.dataset.direccion = "derecha";
    actualizarAvatar(personaje);
  }
}

function moverIzquierda() {
  const personaje = document.getElementById("personaje");
  if (!personaje) return;
  let left = parseInt(window.getComputedStyle(personaje).left);
  personaje.style.left = Math.max(left - 20, 0) + "px";
  personaje.dataset.direccion = "izquierda";
  actualizarAvatar(personaje);
}

function moverDerecha() {
  const personaje = document.getElementById("personaje");
  if (!personaje) return;
  let left = parseInt(window.getComputedStyle(personaje).left);
  personaje.style.left = Math.min(left + 20, 260) + "px";
  personaje.dataset.direccion = "derecha";
  actualizarAvatar(personaje);
}

function actualizarAvatar(personaje) {
  if (personaje.dataset.direccion === "izquierda") {
    personaje.style.backgroundImage = "url('img/avatariz.png')";
  } else {
    personaje.style.backgroundImage = "url('img/avatarde.png')";
  }
  personaje.style.backgroundSize = "contain";
  personaje.style.backgroundRepeat = "no-repeat";
  personaje.style.backgroundPosition = "center";
}

function generarParticula(x, y) {
  const juego = document.getElementById("atrapa-juego");
  const part = document.createElement("div");
  part.classList.add("particle");
  part.style.left = x + "px";
  part.style.top = y + "px";
  juego.appendChild(part);
  setTimeout(() => part.remove(), 600);
}

function clearIntervalos() {
  intervalos.forEach(i => clearInterval(i));
  intervalos = [];
}

