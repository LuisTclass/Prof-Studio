const keywordInput = document.getElementById('keyword-input');
const responseInput = document.getElementById('response-input');
let recognition;

function startRecognition() {
  recognition = new webkitSpeechRecognition();
  recognition.onstart = function() {
    console.log('reconocimiento iniciado');
  };

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    console.log('Texto recibido: ' + text);
    if (text.toLowerCase().includes(keywordInput.value.toLowerCase())) {
      const msg = new SpeechSynthesisUtterance(responseInput.value);
      window.speechSynthesis.speak(msg);
    }
  };

  recognition.onerror = function(event) {
    console.error(event.error);
  };

  recognition.onend = function() {
    console.log('reconocimiento finalizado');
  };

  recognition.start();
}

function stopRecognition() {
  if (recognition) {
    recognition.stop();
  }
}

// detectar si se está en un dispositivo móvil
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// si se está en un dispositivo móvil, ajustar los botones al ancho de pantalla
if (isMobile) {
  const buttonContainer = document.querySelector('.button-container');
  const buttons = document.querySelectorAll('button');
  const inputContainers = document.querySelectorAll('.input-container');
  
  buttonContainer.style.display = 'center';
  buttonContainer.style.flexDirection = 'center';
  buttonContainer.style.alignItems = 'center';

  buttons.forEach((button) => {
    button.style.width = '80%';
    button.style.marginBottom = '1rem';
  });

  inputContainers.forEach((inputContainer) => {
    inputContainer.style.width = '80%';
  });
}
