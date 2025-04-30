const mainBody = document.querySelector('.body-wrapper');
const inputField = document.getElementById('input-word');

const apiRequest = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.log(`${response.status}: ${response.statusText}`);
        return;
    }
    return await response.json();
}

function getDefinitions(wordMeanings) {
    const wordDefinitions = [];
    Object.keys(wordMeanings).forEach((key) => {
        try {
            const partOfSpeech = wordMeanings[key].partOfSpeech;
            const definition = wordMeanings[key].definitions[0].definition;
            wordDefinitions.push(
                {
                    partOfSpeech: partOfSpeech,
                    definition: definition,
                },
            )
        } catch (e) {
            console.error(`Error getting definitions. ${e}`);
        }
    })

    return wordDefinitions;
}

let wordDetails = [];

const fetchData = async (url) => {
    const data = await apiRequest(url);
    if (data) {
        for (const index in data) {
            const wordDefinition = getDefinitions(data[index].meanings);
            wordDetails.push({
                word: data[index].word,
                ...(data[index].phonetics[index] && {audio: data[index].phonetics[index].audio}),
                definitions: wordDefinition,
            });
        }

    } else {
        console.error(`Function: fetchData,\nError: Cannot fetch data`);
    }
}

inputField.addEventListener('change', async () => {
    const checkWordGrid = document.querySelector('.word-grid');
    if (checkWordGrid) {
        checkWordGrid.remove();
    }

    let word = inputField.value;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    await fetchData(apiUrl);

    const wordGrid = document.createElement('section');
    wordGrid.classList.add('word-grid');

    let wordCounter = 1;

    for (const wordList of wordDetails) {

        const wordCard = document.createElement('div');
        wordCard.classList.add('word-card', 'cards-wrapper');

        const cardCounter = document.createElement('h4');
        cardCounter.classList.add('card-counter');
        cardCounter.textContent = `Meaning: ${wordCounter}`;

        wordCard.appendChild(cardCounter);

        const wordField = document.createElement('p');
        wordField.classList.add('word-title');
        wordField.textContent = `Word Title: ${wordList.word}`;
        wordCard.appendChild(wordField);

        if (wordList.definitions.length > 0) {
            for (const definition of wordList.definitions) {

                const definitionCard = document.createElement('div');
                definitionCard.classList.add('definition-card');

                const partOfSpeech = document.createElement('p');
                partOfSpeech.classList.add('part-of-speech-wrapper');
                partOfSpeech.textContent = `Part of Speech: ${definition.partOfSpeech}`;

                const wordMeaning = document.createElement('p');
                wordMeaning.classList.add('word-definition');
                wordMeaning.textContent = `Definition: ${definition.definition}`;

                definitionCard.appendChild(partOfSpeech);
                definitionCard.appendChild(wordMeaning);
                wordCard.appendChild(definitionCard);
            }
        }

        if (wordList.audio) {
            const audioField = document.createElement('audio');
            audioField.classList.add('audio');
            audioField.src = wordList.audio;
            audioField.setAttribute('controls', 'controls');
            wordCard.appendChild(audioField);
        } else {
            const noAudioMsg = document.createElement('p');
            noAudioMsg.classList.add('no-audio');
            noAudioMsg.textContent = 'Audio: No Audio';
            wordCard.appendChild(noAudioMsg);
        }

        const credit = document.createElement('p');
        credit.classList.add('credit');
        credit.textContent = 'Data from Free Dictionary API';
        wordCard.appendChild(credit);

        wordGrid.appendChild(wordCard);
        wordCounter++;
    }
    mainBody.appendChild(wordGrid);
    wordDetails = [];
})
