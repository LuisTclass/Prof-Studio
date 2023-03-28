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
