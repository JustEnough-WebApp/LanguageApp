const dictURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"; // + word

const spanishURL = "https://dictionaryapi.com/api/v3/references/spanish/json/" // + word + spanishKey
const spanishKey = "?key=dfcd5490-5ee5-41fb-821f-0979def860be";


async function getDefinition(word) {
    let apiURL = dictURL + word;
    const response = await fetch(apiURL);
    const jsonObj = await response.json();

    return jsonObj.definitions; // TODO: fix, replace with proper format
}


async function getSpanish() {
    let word = document.getElementById('dictSearch').value;
    let apiURL = spanishURL + word + spanishKey;
    const response = await fetch(apiURL);
    const jsonObj = await response.json();
    try {
        document.getElementById("spanishTranslation").innerHTML = jsonObj[0].shortdef[0];
    } catch (e) {
        document.getElementById("spanishTranslation").innerHTML = 
        "ERROR: cannot find word";
    }
    
    return;
}
