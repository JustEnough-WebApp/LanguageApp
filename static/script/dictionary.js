const dictURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"; // + word + dictKey
const dictKey = "?key=e7da4733-26a2-4b45-b02b-e1ee552f6a84"; 

const spanishURL = "https://dictionaryapi.com/api/v3/references/spanish/json/" // + word + spanishKey
const spanishKey = "?key=23e33a70-d854-46ff-9d3f-27667aef8cd6";

const serverURL = "https://just-enough-server.azurewebsites.net/"; // for deepl API
const germanExtension = "/api/getGerman";
const germanKey = "2b2f1cdb-c324-a0da-7107-dbecc04e19f1:fx";

// TODO: add functions for future langauges as project progresses
function fillFields() {
    getDefinition();
    getSpanish();
    getGerman();
}

async function getDefinition() {
    let word = document.getElementById('dictSearch').value;
    let apiURL = dictURL + word + dictKey;
    const response = await fetch(apiURL);
    const jsonObj = await response.json();
    try {
        let definition = jsonObj[0].shortdef[0];
        document.getElementById("englishDefn").innerHTML = definition;
    } catch (e) {
        document.getElementById("englishDefn").innerHTML = 
        "ERROR: cannot find word";
    }
    return
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

async function getGerman() {
    let word = document.getElementById('dictSearch').value;
    let apiURL = serverURL + germanExtension;
    const translation = await fetch(apiURL);
    document.getElementById("germanTranslation").innerHTML = translation;
    console.log(translation);
    return;
}
