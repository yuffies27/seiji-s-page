// -----------------------------
// Variables globales
// -----------------------------

let entrada = '';
let comentarioIndex = 0;
let quizIndex = 0;
let pendientes = [];
let puntos = 0;
let intervalos = [];

// -----------------------------
// Bloqueo por PIN
// -----------------------------

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

// -----------------------------
// Comentarios (ejemplo básico)
// -----------------------------

const comentarios = [
  { nombre: "yuffie", user: "@piururin", mensaje: "text text text ", foto: "img/yuffie.jpg" },
  { nombre: "zephyr",  user: "@necrocize",  mensaje: "text text text ", foto: "img/zephyr.jpg" },
  { nombre: "naeve",  user: "@ninfjal",  mensaje: "text text text ", foto: "img/naeve.jpg" },
  { nombre: "daniel", user: "@cautlver", mensaje: "text text text ", foto: "img/daniel.jpg" },
  { nombre: "isa",  user: "@iglesitar",mensaje: "text text text ", foto: "img/candy.jpg" }
];

function siguienteComentario() {
  comentarioIndex = (comentarioIndex + 1) % comentarios.length;
  const c = comentarios[comentarioIndex];
  document.querySelector("#comentario .perfil").src = c.foto;
  document.querySelector("#comentario .nombre").textContent = c.nombre;
  document.querySelector("#comentario .user").textContent = c.user;
  document.querySelector("#comentario .mensaje").textContent = c.mensaje;
}

const btnSiguiente = document.getElementById('btn-siguiente');
if (btnSiguiente) {
  btnSiguiente.addEventListener('click', siguienteComentario);
}

// -----------------------------
// Juegos: mostrar juegos y control botones A y B
// -----------------------------

const frasesJ = [
  { texto: "text text text ", autor: "Yuffie" },
  { texto: "text text text ", autor: "Naeve" },
  { texto: "text text text ", autor: "Zephyr" },
  { texto: "text text text ", autor: "Daniel" },
  { texto: "text text text ", autor: "Isa" }
];

function mostrarJuego(nombre) {
  const contenedor = document.getElementById("pantalla-juego");

  if (nombre === "adivina") {
    iniciarQuiz();
  } else if (nombre === "atrapa") {
    contenedor.innerHTML = `
      <div id="atrapa-juego" style="position: relative; width: 300px; height: 160px; background: #fff; border-radius: 10px; overflow: hidden; margin-top: 0.5rem;">
        <div class="personaje" id="personaje"></div>
        <div class="controles-touch" style="margin-top: 0.5rem;">
          <button id="btn-izquierda">⬅️</button>
          <button id="btn-derecha">➡️</button>
        </div>
      </div>
      <p>Puntos: <span id="puntos">0</span></p>
    `;
    iniciarAtrapa();

    document.getElementById('btn-izquierda').addEventListener('click', moverIzquierda);
    document.getElementById('btn-derecha').addEventListener('click', moverDerecha);
  }
}

// --- Juego Adivina quién lo dijo ---

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
    if (b.textContent.trim() === elegido) {
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
      document.getElementById("pantalla-juego").innerHTML = `<p class="frase">¡Completaste todas las frases! 🌟</p>`;
    }
  }, 1300);
}

// --- Juego Atrapa el Sol ---

function iniciarAtrapa() {
  puntos = 0;
  document.getElementById("puntos").textContent = puntos;
  const juego = document.getElementById("atrapa-juego");
  const personaje = document.getElementById("personaje");

  personaje.style.backgroundImage = "url('img/avatarde.png')";
  personaje.classList.remove("izquierda");
  personaje.style.left = "0px";

  document.addEventListener("keydown", moverConTeclado);
  clearIntervalos();

  intervalos.push(setInterval(() => {
    const objeto = document.createElement("div");
    const esSol = Math.random() > 0.4;
    objeto.classList.add("objeto", esSol ? "sol" : "nube");
    objeto.style.left = Math.random() * 260 + "px";
    objeto.style.top = "0px";
    objeto.style.position = "absolute";
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
            mensajeFinal.style.color = "#d94f7a";
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
  let left = parseInt(window.getComputedStyle(personaje).left);

  if (e.key === "ArrowLeft") {
    personaje.style.left = Math.max(left - 20, 0) + "px";
    personaje.style.backgroundImage = "url('img/avatariz.png')";
    personaje.classList.add("izquierda");
  }
  if (e.key === "ArrowRight") {
    personaje.style.left = Math.min(left + 20, 260) + "px";
    personaje.style.backgroundImage = "url('img/avatarde.png')";
    personaje.classList.remove("izquierda");
  }
}

function moverIzquierda() {
  const personaje = document.getElementById("personaje");
  let left = parseInt(window.getComputedStyle(personaje).left);
  personaje.style.left = Math.max(left - 20, 0) + "px";
  personaje.style.backgroundImage = "url('img/avatariz.png')";
  personaje.classList.add("izquierda");
}

function moverDerecha() {
  const personaje = document.getElementById("personaje");
  let left = parseInt(window.getComputedStyle(personaje).left);
  personaje.style.left = Math.min(left + 20, 260) + "px";
  personaje.style.backgroundImage = "url('img/avatarde.png')";
  personaje.classList.remove("izquierda");
}

function generarParticula(x, y) {
  const juego = document.getElementById("atrapa-juego");
  const part = document.createElement("div");
  part.classList.add("particle");
  part.style.left = x + "px";
  part.style.top = y + "px";
  part.style.position = "absolute";
  juego.appendChild(part);
  setTimeout(() => part.remove(), 600);
}

function clearIntervalos() {
  intervalos.forEach(i => clearInterval(i));
  intervalos = [];
}

// -----------------------------
// Menú hamburguesa
// -----------------------------

document.addEventListener('DOMContentLoaded', () => {
  const btnMenu = document.getElementById('btn-menu');
  const navMenu = document.getElementById('nav-menu');

  if (btnMenu && navMenu) {
    btnMenu.addEventListener('click', (e) => {
      if (navMenu.classList.contains('visible')) {
        navMenu.classList.remove('visible');
        setTimeout(() => {
          navMenu.classList.add('oculto');
        }, 300); // Espera que termine la animación
      } else {
        navMenu.classList.remove('oculto');
        // Forzar reflow para que la transición funcione
        void navMenu.offsetWidth;
        navMenu.classList.add('visible');
      }
      e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('visible') &&
        !navMenu.contains(e.target) &&
        e.target !== btnMenu
      ) {
        navMenu.classList.remove('visible');
        setTimeout(() => {
          navMenu.classList.add('oculto');
        }, 300);
      }
    });

    navMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});

// -----------------------------
// Eventos para botones A y B
// -----------------------------

const botonA = document.getElementById('boton-a');
const botonB = document.getElementById('boton-b');

if (botonA) {
  botonA.addEventListener('click', () => mostrarJuego('adivina'));
}

if (botonB) {
  botonB.addEventListener('click', () => mostrarJuego('atrapa'));
}

// ------------------------------
// Datos de canciones por amigo
// ------------------------------

const playlistData = {
  "Yuffie": [
    { title: "Song 1", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song 2", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song 3", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song 4", embed: "https://open.spotify.com/embed/track/..." },
  ],
  "Naeve": [
    { title: "Song A", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song B", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song C", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song D", embed: "https://open.spotify.com/embed/track/..." },
  ],
  "Daniel": [
    { title: "Song 1", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song 2", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song 3", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song 4", embed: "https://open.spotify.com/embed/track/..." },
  ],
  "Isa": [
    { title: "Song A", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song B", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song C", embed: "https://open.spotify.com/embed/track/..." },
    { title: "Song D", embed: "https://open.spotify.com/embed/track/..." },
  ],
  "Zephyr": [
    { titulo: "Canción 1", url: "https://open.spotify.com/embed/track/..." },
    { titulo: "Canción 2", url: "https://open.spotify.com/embed/track/..." },
    { titulo: "Canción 3", url: "https://open.spotify.com/embed/track/..." },
    { titulo: "Canción 4", url: "https://open.spotify.com/embed/track/..." }
  ],
};

// Mostrar canciones al hacer clic
const friends = document.querySelectorAll('.friend');
const playlistSection = document.querySelector('.playlist-section');

friends.forEach(friend => {
  friend.addEventListener('click', () => {
    const name = friend.dataset.name;
    const songs = playlistData[name];
    renderPlaylist(name, songs);
  });
});

function renderPlaylist(name, songs) {
  playlistSection.innerHTML = ""; // Limpiar anterior
  if (!songs || songs.length === 0) {
    playlistSection.innerHTML = `<p>No hay canciones disponibles para ${name}.</p>`;
    return;
  }

  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${song.title}</h3>
      <iframe src="${song.embed}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      <a class="spotify-link" href="${song.embed.replace('/embed/', '/')}" target="_blank" rel="noopener noreferrer">Abrir en Spotify</a>
    `;

    playlistSection.appendChild(card);
  });
}

// Efecto hover táctil en móviles para escala
document.querySelectorAll('.friend').forEach(friend => {
  friend.addEventListener('touchstart', () => friend.classList.add('hovered'));
  friend.addEventListener('touchend', () => friend.classList.remove('hovered'));
});

// Scroll táctil con arrastre (drag) para escritorio y móvil
const carouselWrapper = document.querySelector('.carousel-wrapper');

let isDown = false;
let startX;
let scrollLeft;

if(carouselWrapper){
  carouselWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carouselWrapper.offsetLeft;
    scrollLeft = carouselWrapper.scrollLeft;
  });
  carouselWrapper.addEventListener('mouseleave', () => {
    isDown = false;
  });
  carouselWrapper.addEventListener('mouseup', () => {
    isDown = false;
  });
  carouselWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    carouselWrapper.scrollLeft = scrollLeft - walk;
  });

  carouselWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - carouselWrapper.offsetLeft;
    scrollLeft = carouselWrapper.scrollLeft;
  });
  carouselWrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - carouselWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    carouselWrapper.scrollLeft = scrollLeft - walk;
  });
}

// Selecciona todos los contenedores de fotos
const fotos = document.querySelectorAll('.foto-container');
// Selecciona la ventana emergente
const ventana = document.querySelector('.ventana-frase');
// Selecciona el contenido de la frase
const contenido = document.querySelector('.contenido-frase');
// Selecciona el botón de cerrar
const cerrar = document.querySelector('.cerrar');

// Frases asociadas (puedes personalizar estos textos según el orden de las fotos)
const frases = [
  "Frase 1: Siempre estás en mis pensamientos ♡",
  "Frase 2: Este rincón es solo tuyo",
  "Frase 3: Eres una luz en mi vida",
  "Frase 4: Aquí se guarda todo lo bonito de ti"
];

// Asociar cada foto a su frase
fotos.forEach((foto, index) => {
  foto.addEventListener('click', () => {
    contenido.textContent = frases[index];
    ventana.classList.add('activa');
  });
});

// Cerrar la ventana
cerrar.addEventListener('click', () => {
  ventana.classList.remove('activa');
});
