const url = "https://just-enough-server.azurewebsites.net/api/getList"
//const url = "http://localhost:3000/api/getList";   // for testing



var languages = [];
var types = [];

function testChecks() {
    languages = [];
    types = [];

    let languageCheckboxes = new Array(
    document.getElementById('french'), 
    document.getElementById('german'), 
    document.getElementById('norwegian'), 
    document.getElementById('spanish')
    );

    let typeCheckboxes = new Array(
        document.getElementById('color'), 
        document.getElementById('commonPhrase'), 
        document.getElementById('day'), 
        document.getElementById('emotion'),
        document.getElementById('food'), 
        document.getElementById('greeting'), 
        document.getElementById('number'), 
        document.getElementById('person'),
        document.getElementById('place'), 
        document.getElementById('thing'), 
        document.getElementById('verb')
    )

    for (i = 0; i < languageCheckboxes.length; i++) {
        if (languageCheckboxes[i].checked) {
            languages.push(languageCheckboxes[i].value);
        }
    } 

    for (i = 0; i < typeCheckboxes.length; i++) {
        if (typeCheckboxes[i].checked) {
            types.push(typeCheckboxes[i].value);
        }
    }
}


async function initiateLearning() {
    const response  = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"languages": languages, "types": types})
    }); 

    learnData = await response.json()

    currCard = 0
    //generateTable()
}