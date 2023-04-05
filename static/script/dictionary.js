const dictURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"; // + word

const spanishURL = "https://dictionaryapi.com/api/v3/references/spanish/json/" // + word + api key
const spanishKey = "?key=dfcd5490-5ee5-41fb-821f-0979def860be";


function getDefinition(word) {
    let apiCall = dictURL + word;
    return apiCall.definitions; // TODO: fix, replace with proper format
}

function getSpanish(word) {
    let apiCall = spanishURL + word + spanishKey;
    return apiCall; // TODO: check API documentation, return Spanish translation
}