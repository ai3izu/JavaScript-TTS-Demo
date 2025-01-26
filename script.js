let currentLine = 0;
let lines = [];

function hilightLine(index) {
    const textDiv = document.getElementById('text');
    const text = textDiv.innerText; 
    const splitLines = text.split('\n');

    textDiv.innerHTML = splitLines.map(
        (line, i) => i === index ? `<span class="highlight" id="current-line">${line}</span>` : line
    ).join('<br>');

    const currentLine = document.getElementById('current-line');
    if (currentLine) {
        currentLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function readLine(index) {
    if (index >= lines.length) {
        alert('Koniec tekstu.');
        const textDiv = document.getElementById('text');
        textDiv.innerHTML = textDiv.innerText; 
        return;
    }

    hilightLine(index);

    const speech = new SpeechSynthesisUtterance(lines[index]);
    speech.lang = 'pl-PL';
    speech.rate = 1;
    speech.pitch = 1;

    speech.onend = () => {
        currentLine++;
        readLine(currentLine);
    };
    window.speechSynthesis.speak(speech);
}

function speak() {
    const textDiv = document.getElementById('text');
    const text = textDiv.innerText.trim(); 

    if (text.length === 0) {
        alert('Wprowadź tekst.');
        return;
    }

    if ('speechSynthesis' in window) {
        lines = text.split('\n');
        currentLine = 0;
        hilightLine(currentLine);
        readLine(currentLine);
    } else {
        alert('Twoja przeglądarka nie wspiera Web Speech API.');
    }
}

function stop() {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            const textDiv = document.getElementById('text');
            textDiv.innerHTML = textDiv.innerText; 
        } else {
            alert("Nic nie jest obecnie odtwarzane.");
        }
    } else {
        alert("Twoja przeglądarka nie wspiera Web Speech API.");
    }
}