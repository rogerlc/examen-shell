const container = document.getElementById("quiz-container");

function renderQuiz() {
  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.classList.add("question-block");

    const isMultiple = Array.isArray(q.respuestas);

    div.innerHTML = `
      <p><strong>${idx + 1}.</strong> <span class="question-text">${q.pregunta}</span></p>
      ${q.opciones.map((op, i) => `
        <label class="opcion">
          <input type="${isMultiple ? 'checkbox' : 'radio'}" 
                 name="q${idx}" 
                 value="${i}"> ${op}
        </label>
      `).join('')}
      <div class="botones-pregunta">
        <button onclick="leerPregunta(${idx})">📢 Leer</button>
        <button onclick="traducirPregunta(${idx})">🌍 Traducir</button>
        <button onclick="hablarPregunta(${idx})">🎤 Decir en inglés</button>
      </div>
      <p class="explicacion" style="display:none"><em>${q.explicacion}</em></p>
    `;
    container.appendChild(div);
  });
}

function gradeQuiz() {
  const blocks = document.querySelectorAll(".question-block");
  blocks.forEach((block, idx) => {
    const inputs = block.querySelectorAll("input");
    const isMultiple = Array.isArray(questions[idx].respuestas);
    const correct = isMultiple ? questions[idx].respuestas : [questions[idx].respuesta];

    inputs.forEach(input => {
      const value = parseInt(input.value);
      if (correct.includes(value)) {
        input.parentElement.classList.add("correct");
      } else if (input.checked) {
        input.parentElement.classList.add("incorrect");
      }
    });

    block.querySelector(".explicacion").style.display = "block";
  });
}

function resetQuiz() {
  container.innerHTML = '';
  renderQuiz();
}

function leerPregunta(index) {
  const text = questions[index].pregunta;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function traducirPregunta(index) {
  const questionBlock = document.querySelectorAll(".question-block")[index];
  const p = questionBlock.querySelector(".question-text");

  fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(p.textContent)}&langpair=en|es`)
    .then(res => res.json())
    .then(data => {
      alert("Traducción: " + data.responseData.translatedText);
    });
}

function hablarPregunta(index) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const result = event.results[0][0].transcript;
    alert("Dijiste: " + result);
  };

  recognition.onerror = function(event) {
    alert("Error en el reconocimiento de voz: " + event.error);
  };
}

renderQuiz();
