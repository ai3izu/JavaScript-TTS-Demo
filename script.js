function speak() {
    const text = document.getElementById('text').value;
    if (text.length === 0) {
        alert('Wprowadz tekst.');
        return;
    }

    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = 'pl-PL';
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    }
    else alert('failed to load speech API');
}

function stop() {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        else alert("Nic nie jest obecnie odtwarzane.");
    }
    else alert("failed to load speech API");
}