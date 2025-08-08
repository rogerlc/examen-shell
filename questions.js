// questions.js

const questions = [
  {
    pregunta: "Which file does give an overview of known shells on a Linux system?",
    opciones: ["/etc/shells", "/etc/passwd", "/etc/hosts"],
    respuesta: 0,
    explicacion: "The file /etc/shells lists available shells."
  },
  {
    pregunta: "How to switch from one shell to another in the active terminal?",
    opciones: ["Use the 'chsh' command", "Type the name of the shell", "Restart the terminal"],
    respuesta: 1,
    explicacion: "Simply typing the shell name switches to it."
  },
  {
    pregunta: "Select all of user-specific startup files:",
    opciones: [".bashrc", "/etc/profile", ".profile", "/etc/bash.bashrc"],
    respuestas: [0, 2],
    explicacion: "User-specific startup files are .bashrc and .profile."
  }
];

// Renderizado

const container = document.getElementById("quiz-container");

function renderQuiz() {
  container.innerHTML = ""; // limpiar

  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.classList.add("question-block");

    // Pregunta + botones
    div.innerHTML = `
      <p><strong>${idx + 1}.</strong> <span class="question-text">${q.pregunta}</span></p>
      ${q.opciones.map((op, i) => `
        <label class="opcion">
          <input type="${Array.isArray(q.respuestas) ? "checkbox" : "radio"}" name="q${idx}" value="${i}">
          ${op}
        </label>
      `).join('')}
      <div class="botones-pregunta">
        <button onclick="leerPregunta(${idx})">📢 Leer</button>
        <button onclick="traducirPregunta(${idx})">🌍 Traducir</button>
        <button onclick="hablarPregunta(${idx})">🎤 Decir en inglés</button>
        <button onclick="escucharPalabraSeleccionada(${idx})">🔊 Escuchar palabra</button>
        <button onclick="escucharPronunciacion(${idx})">🎧 Escuchar mi pronunciación</button>
      </div>
      <p class="explicacion" style="display:none"><em>${q.explicacion}</em></p>
    `;

    container.appendChild(div);
  });
}

// Funciones de los botones (ejemplos simplificados)

function leerPregunta(idx) {
  const text = questions[idx].pregunta;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function traducirPregunta(idx) {
  const text = questions[idx].pregunta;
  // Aquí puedes usar API o un diccionario estático
  alert(`Traducción de: "${text}"`);
}

function hablarPregunta(idx) {
  const text = questions[idx].pregunta;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function escucharPalabraSeleccionada(idx) {
  const selected = window.getSelection().toString().trim();
  if (!selected) return alert("Selecciona una palabra primero");
  const utterance = new SpeechSynthesisUtterance(selected);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function escucharPronunciacion(idx) {
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    return alert("Tu navegador no soporta reconocimiento de voz.");
  }
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (e) => {
    const spoken = e.results[0][0].transcript;
    alert(`Dijiste: ${spoken}`);
  };

  recognition.onerror = (e) => alert(`Error: ${e.error}`);
}

// Funciones Grade y Reset

function gradeQuiz() {
  const blocks = document.querySelectorAll(".question-block");
  blocks.forEach((block, idx) => {
    const inputs = block.querySelectorAll("input");
    const isMultiple = Array.isArray(questions[idx].respuestas);
    const correct = isMultiple ? questions[idx].respuestas : [questions[idx].respuesta];

    inputs.forEach(input => {
      const val = parseInt(input.value);
      input.parentElement.classList.remove("correct", "incorrect");
      if (correct.includes(val)) {
        input.parentElement.classList.add("correct");
      } else if (input.checked) {
        input.parentElement.classList.add("incorrect");
      }
    });

    block.querySelector(".explicacion").style.display = "block";
  });
}

function resetQuiz() {
  container.innerHTML = "";
  renderQuiz();
}

renderQuiz();
