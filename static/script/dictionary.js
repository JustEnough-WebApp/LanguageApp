const dictURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"; // + word + dictKey
const dictKey = DICT_KEY;

const serverURL = "https://just-enough-server.azurewebsites.net/"; // for deepl API
// const serverURL = "http://localhost:3000/"       for testing

const englishExtension = "api/getEnglish"
const spanishExtension = "api/getSpanish";
const frenchExtension = "api/getFrench";
const germanExtension = "api/getGerman";
const norwegianExtension = "api/getNorwegian";

const inputDictSearch = document.getElementById("inputDictSearch");


inputDictSearch.addEventListener("click", clearSearchBar);
document.getElementById("btnSearch").addEventListener("click", fillFields);


document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        fillFields();
        event.preventDefault();
    }
});



// TODO: add functions for future langauges as project progresses
function fillFields() {
    getDefinition();
    getSpanish();
    getFrench();
    getGerman();
    getNorwegian();
}

function clearSearchBar() {
    inputDictSearch.value = "";
}

async function ping() {
    pingURL = serverURL + "/api/ping";
    const response = await fetch(currURL);       
    const data = await response.text();
    console.log(data);
}

async function getEnglish() {
    let word = inputDictSearch.value;
    let apiURL = serverURL + englishExtension;
    const result = await fetch(apiURL, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"word": word})
    }); 
    
    const translation = (await result.text()).valueOf(Promise)
    console.log(translation);
    document.getElementById("englishTranslation").innerHTML = translation;
    return;
}

async function getDefinition() {
    let word = inputDictSearch.value;
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
    let word = inputDictSearch.value;
    let apiURL = serverURL + spanishExtension;
    const result = await fetch(apiURL, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"word": word})
    }); 
    
    const translation = (await result.text()).valueOf(Promise)
    console.log(translation);
    document.getElementById("spanishTranslation").innerHTML = translation;
    return;
}

// TODO: getFrench(), same as getGerman()
async function getFrench() {
    let word = inputDictSearch.value;
    let apiURL = serverURL + frenchExtension;
    const result = await fetch(apiURL, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"word": word})
    }); 
    
    const translation = (await result.text()).valueOf(Promise)
    console.log(translation);
    document.getElementById("frenchTranslation").innerHTML = translation;
    return;
}

async function getGerman() {
    let word = inputDictSearch.value;
    let apiURL = serverURL + germanExtension;
    const result = await fetch(apiURL, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"word": word})
    }); 
    
    const translation = (await result.text()).valueOf(Promise)
    console.log(translation);
    document.getElementById("germanTranslation").innerHTML = translation;
    return;
}

async function getNorwegian() {
    let word = inputDictSearch.value;
    let apiURL = serverURL + norwegianExtension;
    const result = await fetch(apiURL, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"word": word})
    }); 
    
    const translation = (await result.text()).valueOf(Promise)
    console.log(translation);
    document.getElementById("norwegianTranslation").innerHTML = translation;
    return;
}