function cargarPreguntas() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  questions.forEach((pregunta, index) => {
    const div = document.createElement("div");
    div.className = "question";

    // Pregunta con número y texto
    const preguntaHTML = document.createElement("h3");
    preguntaHTML.textContent = `${index + 1}. ${pregunta.pregunta}`;
    preguntaHTML.id = `pregunta-text-${index}`;
    div.appendChild(preguntaHTML);

    // Botones al lado de la pregunta
    const btnContainer = document.createElement("span");
    btnContainer.className = "btn-container";

    // Botón traducir pregunta
    const btnTraducir = document.createElement("button");
    btnTraducir.textContent = "Traducir";
    btnTraducir.className = "btn-translate";
    btnTraducir.onclick = () => traducirPregunta(index);
    btnContainer.appendChild(btnTraducir);

    // Botón traducir palabra seleccionada
    const btnTraducirPalabra = document.createElement("button");
    btnTraducirPalabra.textContent = "Traducir palabra";
    btnTraducirPalabra.className = "btn-word-translate";
    btnTraducirPalabra.onclick = () => traducirPalabraSeleccionada(index);
    btnContainer.appendChild(btnTraducirPalabra);

    // Botón audio normal
    const btnAudioNormal = document.createElement("button");
    btnAudioNormal.textContent = "Audio";
    btnAudioNormal.className = "btn-audio-normal";
    btnAudioNormal.onclick = () => hablarPregunta(index, false);
    btnContainer.appendChild(btnAudioNormal);

    // Botón audio lento
    const btnAudioLento = document.createElement("button");
    btnAudioLento.textContent = "Audio lento";
    btnAudioLento.className = "btn-audio-slow";
    btnAudioLento.onclick = () => hablarPregunta(index, true);
    btnContainer.appendChild(btnAudioLento);

    // Botón escuchar mi pronunciación
    const btnPronunciar = document.createElement("button");
    btnPronunciar.textContent = "Escuchar mi pronunciación";
    btnPronunciar.className = "btn-pronounce";
    btnPronunciar.onclick = () => escucharPronunciacion(index);
    btnContainer.appendChild(btnPronunciar);

    div.appendChild(btnContainer);

    // Opciones
    let opcionesHTML = "";
    const multiple = Array.isArray(pregunta.respuestas);
    pregunta.opciones.forEach((opcion, i) => {
      const inputType = multiple ? "checkbox" : "radio";
      opcionesHTML += `
        <label>
          <input type="${inputType}" name="pregunta${index}" value="${i}" />
          ${opcion}
        </label>
      `;
    });
    const opcionesDiv = document.createElement("div");
    opcionesDiv.className = "options";
    opcionesDiv.innerHTML = opcionesHTML;
    div.appendChild(opcionesDiv);

    // Explicación oculta
    const explicacionDiv = document.createElement("div");
    explicacionDiv.className = "explicacion";
    explicacionDiv.id = `explicacion${index}`;
    explicacionDiv.textContent = pregunta.explicacion;
    div.appendChild(explicacionDiv);

    quiz.appendChild(div);
  });
}

function traducirPregunta(index) {
  const text = questions[index].pregunta;
  // Traducción simple precargada (por simplicidad, solo aquí)
  const traducciones = {
    "Which file does give an overview of known shells on a Linux system?": "¿Qué archivo da una visión general de las shells conocidas en un sistema Linux?",
    "How to switch from one shell to another in the active terminal?": "¿Cómo cambiar de una shell a otra en el terminal activo?",
    "Select all of user-specific startup files:": "Seleccione todos los archivos de inicio específicos del usuario:"
    // Puedes añadir más traducciones o usar una API externa si quieres.
  };

  const traduccion = traducciones[text] || "Traducción no disponible";
  alert(traduccion);
}

function traducirPalabraSeleccionada(index) {
  const preguntaElem = document.getElementById(`pregunta-text-${index}`);
  const selectedText = window.getSelection().toString().trim();

  if (!selectedText) {
    alert("Por favor selecciona una palabra en la pregunta.");
    return;
  }

  // Traducción simple de ejemplo, en un caso real usarías un diccionario o API
  const diccionario = {
    "overview": "visión general",
    "shells": "shells (intérpretes de comandos)",
    "active": "activo",
    "switch": "cambiar",
    "files": "archivos",
    "select": "seleccionar",
    "user-specific": "específico del usuario",
    "startup": "inicio",
    "known": "conocido"
  };

  const lowerSelected = selectedText.toLowerCase();

  const traduccion = diccionario[lowerSelected] || "Traducción no disponible para esta palabra";

  alert(`"${selectedText}": ${traduccion}`);
}

function hablarPregunta(index, lento = false) {
  const text = questions[index].pregunta;
  const synth = window.speechSynthesis;
  if (!synth) {
    alert("Tu navegador no soporta síntesis de voz.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = lento ? 0.6 : 1;
  synth.speak(utterance);
}

function escucharPronunciacion(index) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Tu navegador no soporta reconocimiento de voz.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    const spokenText = event.results[0][0].transcript.toLowerCase();
    const originalText = questions[index].pregunta.toLowerCase();

    // Comparación simple
    const correcto = originalText.includes(spokenText) || spokenText.includes(originalText);

    if (correcto) {
      alert("¡Muy bien! Tu pronunciación es correcta o muy similar.");
    } else {
      alert(`No coincide del todo.\nDijiste: "${spokenText}"\nPregunta: "${questions[index].pregunta}"`);
    }
  };

  recognition.onerror = function(event) {
    alert('Error en el reconocimiento: ' + event.error);
  };

  recognition.onspeechend = function() {
    recognition.stop();
  };
}

function calificar() {
  let score = 0;
  const total = questions.length;

  questions.forEach((pregunta, index) => {
    const opciones = document.getElementsByName(`pregunta${index}`);
    let respuestasUsuario = [];
    opciones.forEach(input => {
      if (input.checked) respuestasUsuario.push(parseInt(input.value));
    });

    if (Array.isArray(pregunta.respuestas)) {
      // Múltiples respuestas
      const correctas = pregunta.respuestas.sort().toString();
      const seleccionadas = respuestasUsuario.sort().toString();
      if (correctas === seleccionadas) {
        score++;
        marcarOpciones(index, true);
      } else {
        marcarOpciones(index, false);
      }
    } else {
      // Una sola respuesta
      if (respuestasUsuario.length === 1 && respuestasUsuario[0] === pregunta.respuesta) {
        score++;
        marcarOpciones(index, true);
      } else {
        marcarOpciones(index, false);
      }
    }
  });

  document.getElementById("result").textContent = `Score: ${score} / ${total}`;
}

function marcarOpciones(index, correcto) {
  const opciones = document.getElementsByName(`pregunta${index}`);
  opciones.forEach(input => {
    const label = input.parentElement;
    label.classList.remove("correct", "incorrect");

    const esCorrecta = Array.isArray(questions[index].respuestas)
      ? questions[index].respuestas.includes(parseInt(input.value))
      : parseInt(input.value) === questions[index].respuesta;

    if (esCorrecta) {
      label.classList.add("correct");  // Mostrar siempre en verde
    } else if (input.checked) {
      label.classList.add("incorrect"); // Mostrar en rojo lo seleccionado incorrectamente
    }
  });
}


function mostrarExplicaciones() {
  questions.forEach((_, index) => {
    const div = document.getElementById(`explicacion${index}`);
    if (div.style.display === "block") {
      div.style.display = "none";
    } else {
      div.style.display = "block";
    }
  });
}

function resetear() {
  questions.forEach((_, index) => {
    const opciones = document.getElementsByName(`pregunta${index}`);
    opciones.forEach(input => input.checked = false);

    const div = document.getElementById(`explicacion${index}`);
    div.style.display = "none";

    const labels = document.getElementsByName(`pregunta${index}`);
    labels.forEach(input => {
      const label = input.parentElement;
      label.classList.remove("correct", "incorrect");
    });
  });

  document.getElementById("result").textContent = "";
}

document.getElementById("btnGrade").addEventListener("click", calificar);
document.getElementById("btnExplain").addEventListener("click", mostrarExplicaciones);
document.getElementById("btnReset").addEventListener("click", resetear);

window.onload = cargarPreguntas;
function cargarPreguntas() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  questions.forEach((pregunta, index) => {
    const div = document.createElement("div");
    div.className = "question";

    // Pregunta con número y texto
    const preguntaHTML = document.createElement("h3");
    preguntaHTML.textContent = `${index + 1}. ${pregunta.pregunta}`;
    preguntaHTML.id = `pregunta-text-${index}`;
    div.appendChild(preguntaHTML);

    // Botones al lado de la pregunta
    const btnContainer = document.createElement("span");
    btnContainer.className = "btn-container";

    // Botón traducir pregunta
    const btnTraducir = document.createElement("button");
    btnTraducir.textContent = "Traducir";
    btnTraducir.className = "btn-translate";
    btnTraducir.onclick = () => traducirPregunta(index);
    btnContainer.appendChild(btnTraducir);

    // Botón traducir palabra seleccionada
    const btnTraducirPalabra = document.createElement("button");
    btnTraducirPalabra.textContent = "Traducir palabra";
    btnTraducirPalabra.className = "btn-word-translate";
    btnTraducirPalabra.onclick = () => traducirPalabraSeleccionada(index);
    btnContainer.appendChild(btnTraducirPalabra);

    // NUEVO: Botón escuchar palabra seleccionada
    const btnEscucharPalabra = document.createElement("button");
    btnEscucharPalabra.textContent = "Escuchar palabra";
    btnEscucharPalabra.className = "btn-pronounce";
    btnEscucharPalabra.onclick = () => escucharPalabraSeleccionada(index);
    btnContainer.appendChild(btnEscucharPalabra);

    // Botón audio normal
    const btnAudioNormal = document.createElement("button");
    btnAudioNormal.textContent = "Audio";
    btnAudioNormal.className = "btn-audio-normal";
    btnAudioNormal.onclick = () => hablarPregunta(index, false);
    btnContainer.appendChild(btnAudioNormal);

    // Botón audio lento
    const btnAudioLento = document.createElement("button");
    btnAudioLento.textContent = "Audio lento";
    btnAudioLento.className = "btn-audio-slow";
    btnAudioLento.onclick = () => hablarPregunta(index, true);
    btnContainer.appendChild(btnAudioLento);

    // Botón escuchar mi pronunciación (frase completa)
    const btnPronunciar = document.createElement("button");
    btnPronunciar.textContent = "Escuchar mi pronunciación";
    btnPronunciar.className = "btn-pronounce";
    btnPronunciar.onclick = () => escucharPronunciacion(index);
    btnContainer.appendChild(btnPronunciar);

    div.appendChild(btnContainer);

    // Opciones (igual que antes)
    let opcionesHTML = "";
    const multiple = Array.isArray(pregunta.respuestas);
    pregunta.opciones.forEach((opcion, i) => {
      const inputType = multiple ? "checkbox" : "radio";
      opcionesHTML += `
        <label>
          <input type="${inputType}" name="pregunta${index}" value="${i}" />
          ${opcion}
        </label>
      `;
    });
    const opcionesDiv = document.createElement("div");
    opcionesDiv.className = "options";
    opcionesDiv.innerHTML = opcionesHTML;
    div.appendChild(opcionesDiv);

    // Explicación oculta
    const explicacionDiv = document.createElement("div");
    explicacionDiv.className = "explicacion";
    explicacionDiv.id = `explicacion${index}`;
    explicacionDiv.textContent = pregunta.explicacion;
    div.appendChild(explicacionDiv);

    quiz.appendChild(div);
  });
}
function mostrarPopupMovible(id, titulo, contenido) {
  let popup = document.getElementById(id);
  if (!popup) {
    popup = document.createElement("div");
    popup.id = id;
    popup.className = "popup-flotante";
    popup.innerHTML = `
      <div class="popup-flotante-header" id="${id}-header">
        ${titulo} <span class="popup-flotante-close" onclick="document.getElementById('${id}').remove()">×</span>
      </div>
      <div class="popup-flotante-body">${contenido}</div>
    `;
    document.body.appendChild(popup);
    hacerDraggable(popup, document.getElementById(`${id}-header`));
  } else {
    popup.querySelector(".popup-flotante-body").innerHTML = contenido;
    popup.style.display = "block";
  }
}

// Hace que un elemento sea draggable
function hacerDraggable(elemento, manejador) {
  let offsetX = 0, offsetY = 0, startX = 0, startY = 0;

  manejador.onmousedown = function(e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    document.onmousemove = drag;
    document.onmouseup = detenerDrag;
  };

  function drag(e) {
    e.preventDefault();
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;
    elemento.style.top = (elemento.offsetTop + offsetY) + "px";
    elemento.style.left = (elemento.offsetLeft + offsetX) + "px";
  }

  function detenerDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Nueva función para escuchar palabra seleccionada
function escucharPalabraSeleccionada(index) {
  const selectedText = window.getSelection().toString().trim();

  if (!selectedText) {
    alert("Por favor selecciona una palabra para escuchar su pronunciación.");
    return;
  }

  const synth = window.speechSynthesis;
  if (!synth) {
    alert("Tu navegador no soporta síntesis de voz.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(selectedText);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  synth.speak(utterance);
}


