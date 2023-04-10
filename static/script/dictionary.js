const dictURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"; // + word

const spanishURL = "https://dictionaryapi.com/api/v3/references/spanish/json/" // + word + spanishKey
const spanishKey = "?key=dfcd5490-5ee5-41fb-821f-0979def860be";

// TODO: add functions for future langauges as project progresses
function fillFields() {
    getDefinition();
    getSpanish();
}

async function getDefinition() {
    let apiURL = dictURL + word;
    const response = await fetch(apiURL);
    const jsonObj = await response.json();

    try {
        let definition = jsonObj[0];

        document.getElementById("englishDefn").innerHTML = definition;
    } catch (e) {
        document.getElementById("englishDefn").innerHTML = 
        "ERROR: cannot find word";
    }

    return jsonObj.definitions; // TODO: fix, replace with proper format
}


async function getSpanish() {
    let word = document.getElementById('dictSearch').value;
    let apiURL = spanishURL + word + spanishKey;
    const response = await fetch(apiURL);
    const jsonObj = await response.json();
    try {
        var translation = jsonObj[0].shortdef[0];
        if (translation.includes(":")) {
            translation = translation.split(": ").pop();
        }

        document.getElementById("spanishTranslation").innerHTML = translation;
    } catch (e) {
        document.getElementById("spanishTranslation").innerHTML = 
        "ERROR: cannot find word";
    }
    
    return;
}
