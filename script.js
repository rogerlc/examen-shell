const container = document.getElementById("question-container");
const gradeBtn = document.getElementById("grade");
const restartBtn = document.getElementById("restart");
const speakBtn = document.getElementById("speak-btn");
const translateBtn = document.getElementById("translate-btn");
const voiceBtn = document.getElementById("voice-btn");
const modal = document.getElementById("translation-modal");
const translatedText = document.getElementById("translated-text");
const closeModal = document.querySelector(".close");

let currentQuestionIndex = 0;
let selectedAnswers = [];

function renderQuestions() {
  container.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";

    const p = document.createElement("p");
    p.innerText = `Q${i + 1}: ${q.pregunta}`;
    div.appendChild(p);

    const options = document.createElement("div");
    q.opciones.forEach((opcion, j) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      if (Array.isArray(q.respuestas)) {
        input.type = "checkbox";
        input.name = `q${i}`;
      } else {
        input.type = "radio";
        input.name = `q${i}`;
      }

      input.value = j;

      label.appendChild(input);
      label.appendChild(document.createTextNode(opcion));
      options.appendChild(label);
      options.appendChild(document.createElement("br"));
    });

    div.appendChild(options);
    container.appendChild(div);
  });
}

gradeBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.disabled = true));

  questions.forEach((q, i) => {
    const inputs = document.getElementsByName(`q${i}`);
    const div = container.children[i];

    if (Array.isArray(q.respuestas)) {
      q.opciones.forEach((_, j) => {
        const input = [...inputs][j];
        if (q.respuestas.includes(j)) {
          input.parentElement.classList.add("correct");
        } else if (input.checked) {
          input.parentElement.classList.add("incorrect");
        }
      });
    } else {
      inputs.forEach((input, j) => {
        if (parseInt(q.respuesta) === j) {
          input.parentElement.classList.add("correct");
        } else if (input.checked && j !== q.respuesta) {
          input.parentElement.classList.add("incorrect");
        }
      });
    }

    const exp = document.createElement("p");
    exp.innerText = "Explanation: " + q.explicacion;
    div.appendChild(exp);
  });
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

speakBtn.addEventListener("click", () => {
  const questionText = questions[currentQuestionIndex].pregunta;
  const utterance = new SpeechSynthesisUtterance(questionText);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
});

translateBtn.addEventListener("click", async () => {
  const text = questions[currentQuestionIndex].pregunta;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(
    text
  )}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    translatedText.innerText = data[0][0][0];
    modal.style.display = "block";
  } catch (e) {
    alert("Translation error");
  }
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

voiceBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const result = event.results[0][0].transcript;
    alert("You said: " + result);
  };

  recognition.onerror = function (event) {
    alert("Error in voice recognition: " + event.error);
  };
});

renderQuestions();
