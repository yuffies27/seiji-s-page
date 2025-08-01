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
// Datos fijos
// -----------------------------

const comentarios = [
  { nombre: "yuffie", user: "@onlineusagirl", mensaje: "Feliz cumpleañitos amor de mi vida, gracias por todo lo que haces por mi, te amo mas que a nada en el mundo y espero estar en muchos cumleañitos mas contigo <3, disfruta mucho tu dia y que tengas un mui bonito añio a pesar de los buenos i malos momentos. Eres una persona muy hermosa y me hace felis que me permitas ser parte de tu vida, te amo te amo y estoi mega enamorada de ti meu bizcochito (❤️ ω ❤️)", foto: "img/yuffie.jpg" },
  { nombre: "zephyr",  user: "@necrocize",  mensaje: "feliz cumple gordo d mi corazon, gracias por ser un amigo mas y apoyarme en casi todo. Te adoro muchísimo boludito, te convertiste en una persona muy importante para mí en tan poco tiempo, espero la pases re bien y disfrutes mucho este día pq merecés todo lo mejor. Gracias por todo mi gordo, gracias x tambien ser mi amante 🫶🏻", foto: "img/zephyr.jpg" },
  { nombre: "naeve",  user: "@cinefliar",  mensaje: "Feliz cumple, gordito. Gracias por ser mi mejor amigo, por estar siempre conmigo, incluso en mis peores momentos. No sabés lo que valoro tener a alguien como vos en mi vida, alguien que me banca, que me escucha, que me hace reír y que me acompaña sin juzgarme. Sos una de las personas más importantes que tengo, y espero que hoy la pases rodeado de todo eso que te hace bien y de la gente que te quiere, porque te lo re merecés. Te adoro muchísimo 💗💗💗", foto: "img/naeve.jpg" },
  { nombre: "daniel", user: "@cautlver", mensaje: "Hola goldito jeje felis cumpleaños, t keria decir que hoi no solo se celebra tu vida sino también la suerte d tenerte kmo amigo pk eres una persona muuy linda en todos los aspectos, siempre autentico i unico yy con una vibra que siempre contagia. Espero k todas tus metas se cumplan y k tu vida siempre esté llena d momentos felices. Te kiero demasiado y espero k en este día tan especial para ti la pases suuupeer bienn 🫶🏻", foto: "img/daniel.jpg" },
  { nombre: "isa",  user: "@blbicr",mensaje: "FELIZ CUMPLE GORDO 👉🏼❤️ Espero que hoy la pases re bien, q disfrutes como se debe y bueno, que pases a tdo q ver lo que queda d este año, perdóname si alguna vez tiré un chiste malo o un comentario fuera d lugar, sabes q te amo y q no lo hago cn mala intención. sos r buen amigo y me alegra mucho eso, a pesar de q entre r tarde al grupo realmente apareció tu amistad y la de todos en especial. Tu escencia y tus opiniones hacen q el ambiente se vuelva mejor y cómodo para todos. realmente admiro tu forma d pensar y con la tranquilidad que afrontas las cosas (o al menos sho veo eso ;) anyways bebé felisitasiones Estás son las mañanitas que cantaba el Rey David 👉🏼❤️", foto: "img/candy.jpg" }
];

const frasesJ = [
  { texto: "la guadalupana la guadalupana...", autor: "yuffie" },
  { texto: "facundo kere coca", autor: "naeve" },
  { texto: "SOPLAME LA VELAAAA", autor: "zephyr" },
  { texto: "ya 19 añitos de fluir... 💆🏻‍♂️🙌🏻 UEE😭🥺💧Eu💧💧E E😭
🥺😭UUUUE😭🥺💧🥺", autor: "daniel" },
  { texto: "a ver malparida primero que todo mi cabello es real mira  como puedo verlo no es un pintando ahí de mona grilla ew", autor: "isa" }
];

const playlistData = {
  "Yuffie": [
    { 
      title: "Rainy Tapestry", 
      embed: "https://open.spotify.com/embed/track/3INsIMe6Ap6EJ2xXgt9NB8",
      img: "https://i.scdn.co/image/ab67616d0000b273ca07c4307a1a176742d7b0e0"
    },
    { 
      title: "Keep on Loving you", 
      embed: "https://open.spotify.com/embed/track/3GUSidbQwd7xuvU6AQorRh",
      img: "https://i.scdn.co/image/ab67616d0000b273a2a104e06f11ce7e1bf9816a"
    },
    { 
      title: "You", 
      embed: "https://open.spotify.com/embed/track/5KZ0qobWEFl892YjIC02SE",
      img: "https://i.scdn.co/image/ab67616d0000b273de1e48c40b13d74c18b4db02"
    },
    { 
      title: "Endlessly", 
      embed: "https://open.spotify.com/embed/track/0wzCQjc8JRa39ej1TFkAFt",
      img: "https://i.scdn.co/image/ab67616d0000b2734f1fbd420261df84b3a1e6e2"
    },
  ],
  "Naeve": [
    { 
      title: "Packing it Up", 
      embed: "https://open.spotify.com/embed/track/0D89q3d3eclowHBcDQZ4qn?si=6981ce08cb9e48e8",
      img: "https://i.scdn.co/image/ab67616d0000b273c9e4d361f2d2dd5372e2e5aa"
    },
    { 
      title: "Nunca quise ", 
      embed: "https://open.spotify.com/embed/track/0ZAJ660VP57lLK4U7NlGOy?si=6880b9c5c1324f16",
      img: "https://i.scdn.co/image/ab67616d0000b2737e7a1f93f4227cc57ffca57d"
    },
    { 
      title: "Too Close", 
      embed: "https://open.spotify.com/embed/track/6gezrIScVLEnV1szuZxhvA?si=57e148bb0cb84c33",
      img: "https://i.scdn.co/image/ab67616d0000b2736ae11e3b5a295092ac50e670"
    },
    { 
      title: "You & I", 
      embed: "https://open.spotify.com/embed/track/2afCBiru10AFckfOa49wIa?si=dd3e77d293374429",
      img: "https://i.scdn.co/image/ab67616d0000b273fe08f4dfdfb7442c15bfc8e9"
    },
  ],
  "Isa": [
    { 
      title: "PENDEJO ATREVIDO", 
      embed: "https://open.spotify.com/embed/track/0tCRhTNMLX2EYJeVqZiC2n?si=56c747b71ad84061",
      img: "https://i.scdn.co/image/ab67616d0000b273fd99e6ae3137c5a424956f6f"
    },
    { 
      title: "Bunda", 
      embed: "https://open.spotify.com/embed/track/3UEIObvIQMJzF09RWRcqcP?si=d3ae14ae6d9846ce",
      img: "https://i.scdn.co/image/ab67616d0000b273661ca28d1337cae98dced1a3"
    },
    { 
      title: "PONTE LOKITA", 
      embed: "https://open.spotify.com/embed/track/0Lahr7sUDdtYnX3n3KobR6?si=e2e9cd2738dc4905",
      img: "https://i.scdn.co/image/ab67616d0000b273a8e6e73ab83c45a68286aab6"
    },
    { 
      title: "Bing Bong", 
      embed: "https://open.spotify.com/embed/track/6s9PpYbExKlHuJ8JMyep21?si=47250c667ae140b6",
      img: "https://i.scdn.co/image/ab67616d0000b27336b34b8b7c0e26a7be7e9bfc"
    },
  ],
  "Zephyr": [
    { 
      title: "Stranger in Moscow", 
      embed: "https://open.spotify.com/embed/track/64KrFHj9p5AyCX2yZQr4YJ",
      img: "https://i.scdn.co/image/ab67616d0000b273a0e87a62a5d7cbb2f12242ab"
    },
    { 
      title: "Outside", 
      embed: "https://open.spotify.com/embed/track/0IXWLMBZeK33mOb044Sxu6",
      img: "https://i.scdn.co/image/ab67616d0000b2732a23b6f5a8a1c9c7a5d9bcfa"
    },
    { 
      title: "2000 Watts", 
      embed: "https://open.spotify.com/embed/track/4aTYZL8uyGXAdmWOQy4Wgx",
      img: "https://i.scdn.co/image/ab67616d0000b273c5279b1f19367810e4e59427"
    },
    { 
      title: "Jam", 
      embed: "https://open.spotify.com/embed/track/2EI8uljBPaI23VUr2tv4eS",
      img: "https://i.scdn.co/image/ab67616d0000b2735c34e4e6a7debb3fcae94243"
    },
  ],
  "Daniel": [
    { 
      title: "Song 1", 
      embed: "https://open.spotify.com/embed/track/...", 
      img: "https://via.placeholder.com/80" 
    },
    { 
      title: "Song 2", 
      embed: "https://open.spotify.com/embed/track/...", 
      img: "https://via.placeholder.com/80" 
    },
    { 
      title: "Song 3", 
      embed: "https://open.spotify.com/embed/track/...", 
      img: "https://via.placeholder.com/80" 
    },
    { 
      title: "Song 4", 
      embed: "https://open.spotify.com/embed/track/...", 
      img: "https://via.placeholder.com/80" 
    },
  ],
};


const frases = [
  "Frase 1: Siempre estás en mis pensamientos ♡",
  "Frase 2: Este rincón es solo tuyo",
  "Frase 3: Eres una luz en mi vida",
  "Frase 4: Aquí se guarda todo lo bonito de ti"
];

// -----------------------------
// Funciones
// -----------------------------

// PIN
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

// Comentarios
function siguienteComentario() {
  comentarioIndex = (comentarioIndex + 1) % comentarios.length;
  const c = comentarios[comentarioIndex];
  document.querySelector("#comentario .perfil").src = c.foto;
  document.querySelector("#comentario .nombre").textContent = c.nombre;
  document.querySelector("#comentario .user").textContent = c.user;
  document.querySelector("#comentario .mensaje").textContent = c.mensaje;
}

// Juegos
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

// Juego Adivina quién lo dijo
function iniciarQuiz() {
  quizIndex = 0;
  pendientes = [];
  cargarPregunta(frasesJ[quizIndex]);
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
          <button onclick="evaluarRespuesta('${fraseObj.autor}', 'Isa')">Candy</button>
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
    if (quizIndex < frasesJ.length) {
      cargarPregunta(frasesJ[quizIndex]);
    } else if (pendientes.length > 0) {
      frasesJ.length = 0;
      frasesJ.push(...pendientes);
      pendientes = [];
      quizIndex = 0;
      cargarPregunta(frasesJ[quizIndex]);
    } else {
      document.getElementById("pantalla-juego").innerHTML = `<p class="frase">¡Completaste todas las frases! 🌟</p>`;
    }
  }, 1300);
}

// Juego Atrapa el Sol
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

// Menú hamburguesa
function setupMenuHamburguesa() {
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
}

// Playlist
function setupPlaylist() {
  const friends = document.querySelectorAll('.friend');
  const playlistSection = document.querySelector('#playlistBox');

  if (!friends.length || !playlistSection) return;

  // Mostrar playlist al hacer clic
  friends.forEach(friend => {
    friend.addEventListener('click', () => {
      const name = friend.dataset.name;
      const songs = playlistData[name];
      renderPlaylist(name, songs);

      // Marca el amigo activo para estilos
      friends.forEach(f => f.classList.remove('activo'));
      friend.classList.add('activo');
    });
  });

  function renderPlaylist(name, songs) {
    playlistSection.innerHTML = ""; // limpiar anterior

    if (!songs || songs.length === 0) {
      playlistSection.innerHTML = `<p>No hay canciones disponibles para ${name}.</p>`;
      return;
    }

    songs.forEach(song => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${song.title}</h3>
        <iframe src="${song.embed}" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"></iframe>
        <a class="spotify-link" href="${song.embed.replace('/embed/', '/')}" target="_blank" rel="noopener noreferrer">
          Abrir en Spotify
        </a>
      `;
      playlistSection.appendChild(card);
    });
  }

  // Hover táctil para móviles
  friends.forEach(friend => {
    friend.addEventListener('touchstart', () => friend.classList.add('hovered'));
    friend.addEventListener('touchend', () => friend.classList.remove('hovered'));
  });

  // Scroll táctil y drag para carrusel
  const carousel = document.querySelector('.carousel');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (carousel) {
    // Mouse
    carousel.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => { isDown = false; });
    carousel.addEventListener('mouseup', () => { isDown = false; });
    carousel.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch
    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('touchmove', e => {
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
}

// Frases emergentes
function setupFrasesEmergentes() {
  const fotos = document.querySelectorAll('.foto-container');
  const ventana = document.querySelector('.ventana-frase');
  const contenido = document.querySelector('.contenido-frase');
  const cerrar = document.querySelector('.cerrar');

  if (!ventana || !contenido || !cerrar) return;

  fotos.forEach((foto, index) => {
    foto.addEventListener('click', () => {
      contenido.textContent = frases[index];
      ventana.classList.add('activa');
    });
  });

  cerrar.addEventListener('click', () => {
    ventana.classList.remove('activa');
  });
}

// -----------------------------
// Código principal que se ejecuta cuando el DOM está listo
// -----------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Setup menú hamburguesa
  setupMenuHamburguesa();

  // Setup playlist y carrusel
  setupPlaylist();

  // Setup frases emergentes
  setupFrasesEmergentes();

  // Botón siguiente comentario
  const btnSiguiente = document.getElementById('btn-siguiente');
  if (btnSiguiente) {
    btnSiguiente.addEventListener('click', siguienteComentario);
  }

  // Botones A y B juegos
  const botonA = document.getElementById('boton-a');
  const botonB = document.getElementById('boton-b');

  if (botonA) {
    botonA.addEventListener('click', () => mostrarJuego('adivina'));
  }
  if (botonB) {
    botonB.addEventListener('click', () => mostrarJuego('atrapa'));
  }

  // Inicializa con el primer comentario
  if (comentarios.length) siguienteComentario();
});
