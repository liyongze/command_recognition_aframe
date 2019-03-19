let recognizer;
function predictWord() {
    // Array of words that the recognizer is trained to recognize.
    const words = recognizer.wordLabels();
    recognizer.listen(({scores}) => {
        // Turn scores into a list of (score,word) pairs.
        scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
        // Find the most probable word.
        scores.sort((s1, s2) => s2.score - s1.score);
        if (scores[0].word == 'left'){
            var objet = document.getElementById('sphere');
            var position = objet.getAttribute('position')
            position.x = position.x - 2;
            objet.setAttribute('position', position);
            console.log('left');
        }
        if (scores[0].word == 'right'){
            var objet = document.getElementById('sphere');
            var position = objet.getAttribute('position')
            position.x = position.x + 2;
            objet.setAttribute('position', position);
            console.log('right');
        }
        if (scores[0].word == 'up'){
            var objet = document.getElementById('sphere');
            var position = objet.getAttribute('position')
            position.y = position.y + 2;
            objet.setAttribute('position', position);
            console.log('up');
        }
        if (scores[0].word == 'down'){
            var objet = document.getElementById('sphere');
            var position = objet.getAttribute('position')
            position.y = position.y - 2;
            objet.setAttribute('position', position);
            console.log('down');
        }
        if (scores[0].word == 'go') {
            var objet = document.getElementById('box');
            var animation = objet.getAttribute('animation');
            console.log('go');
            animation.enabled = true;
            objet.setAttribute('animation', animation);
        }
        if (scores[0].word == 'stop'){
            console.log('stop');
            var objet = document.getElementById('box');
            var animation = objet.getAttribute('animation');
            console.log('go');
            animation.enabled = false;
            objet.setAttribute('animation', animation);
        }
    }, {probabilityThreshold: 0.95});
}

async function app() {
    recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    predictWord();
}

app();