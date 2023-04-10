const dictURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"; // + word

const spanishURL = "https://dictionaryapi.com/api/v3/references/spanish/json/" // + word + spanishKey
const spanishKey = "?key=dfcd5490-5ee5-41fb-821f-0979def860be";


async function getDefinition(word) {
    let apiURL = dictURL + word;
    const response = await fetch(apiURL);
    const rawData = await response.json();
    const jsonObj = JSON.parse(rawData);


    return apiCall.definitions; // TODO: fix, replace with proper format
}


async function getSpanish() {
    let word = document.getElementById('dictSearch').value;
    let apiURL = spanishURL + word + spanishKey;
    console.log("url: " + apiURL);
    const response = await fetch(apiURL);
    const jsonObj = await response.json();
    
    document.getElementById("spanishTranslation").value = jsonObj[0].shortdef[0];
    return;
}
