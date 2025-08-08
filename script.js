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
    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    // Botón traducir pregunta
    const btnTraducir = document.createElement("button");
    btnTraducir.textContent = "Traducir";
    btnTraducir.onclick = () => traducirPregunta(index);
    btnContainer.appendChild(btnTraducir);

    // Botón escuchar pregunta en inglés
    const btnAudio = document.createElement("button");
    btnAudio.textContent = "Leer";
    btnAudio.onclick = () => hablarPregunta(index, false);
    btnContainer.appendChild(btnAudio);

    // Botón decir en inglés (reconocimiento de voz)
    const btnPronunciar = document.createElement("button");
    btnPronunciar.textContent = "Decir en inglés";
    btnPronunciar.onclick = () => escucharPronunciacion(index);
    btnContainer.appendChild(btnPronunciar);

    div.appendChild(btnContainer);

    // Opciones (checkbox o radio)
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
    explicacionDiv.style.display = "none";
    explicacionDiv.textContent = pregunta.explicacion;
    div.appendChild(explicacionDiv);

    quiz.appendChild(div);
  });
}

function traducirPregunta(index) {
  const text = questions[index].pregunta;
  // Aquí una traducción simple manual
  const traducciones = {
    "Which file does give an overview of known shells on a Linux system?": "¿Qué archivo da una visión general de las shells conocidas en un sistema Linux?",
    "How to switch from one shell to another in the active terminal?": "¿Cómo cambiar de una shell a otra en el terminal activo?",
    "Select all of user-specific startup files:": "Seleccione todos los archivos de inicio específicos del usuario:"
  };
  alert(traducciones[text] || "Traducción no disponible");
}

function hablarPregunta(index, lento = false) {
  const text = questions[index].pregunta;
  if (!window.speechSynthesis) {
    alert("Tu navegador no soporta síntesis de voz.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = lento ? 0.6 : 1;
  window.speechSynthesis.speak(utterance);
}

function escucharPronunciacion(index) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Tu navegador no soporta reconocimiento de voz.");
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript.toLowerCase();
    const originalText = questions[index].pregunta.toLowerCase();
    const correcto = originalText.includes(spokenText) || spokenText.includes(originalText);

    if (correcto) {
      alert("¡Muy bien! Tu pronunciación es correcta o muy similar.");
    } else {
      alert(`No coincide del todo.\nDijiste: "${spokenText}"\nPregunta: "${questions[index].pregunta}"`);
    }
  };

  recognition.onerror = (event) => {
    alert("Error en el reconocimiento: " + event.error);
  };

  recognition.onspeechend = () => {
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
      const correctas = pregunta.respuestas.slice().sort().toString();
      const seleccionadas = respuestasUsuario.slice().sort().toString();
      if (correctas === seleccionadas) {
        score++;
        marcarOpciones(index, true);
      } else {
        marcarOpciones(index, false);
      }
    } else {
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
      label.classList.add("correct");
    } else if (input.checked) {
      label.classList.add("incorrect");
    }
  });

  // Mostrar explicación
  const explicacionDiv = document.getElementById(`explicacion${index}`);
  explicacionDiv.style.display = "block";
}

function mostrarExplicaciones() {
  questions.forEach((_, index) => {
    const div = document.getElementById(`explicacion${index}`);
    div.style.display = div.style.display === "block" ? "none" : "block";
  });
}

function resetear() {
  questions.forEach((_, index) => {
    const opciones = document.getElementsByName(`pregunta${index}`);
    opciones.forEach(input => input.checked = false);

    const div = document.getElementById(`explicacion${index}`);
    div.style.display = "none";

    opciones.forEach(input => {
      const label = input.parentElement;
      label.classList.remove("correct", "incorrect");
    });
  });
  document.getElementById("result").textContent = "";
}

// Listeners botones
document.getElementById("btnGrade").addEventListener("click", calificar);
document.getElementById("btnExplain").addEventListener("click", mostrarExplicaciones);
document.getElementById("btnReset").addEventListener("click", resetear);

window.onload = cargarPreguntas;
