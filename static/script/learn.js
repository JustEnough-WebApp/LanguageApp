const url = "https://just-enough-server.azurewebsites.net/api/getLearn"
//const url = "http://localhost:3000/api/getList";   // for testing

var languages = [];
var types = [];

function getSelections() {
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
    getSelections();
    var table = document.getElementById("learnTable");
    table.innerHTML = "";

    const response  = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"languages": languages, "types": types})
    }); 
    learnData = await response.json()  
    
    prevLanguage = "";

    if (learnData.length > 0) {
        initializeTable();
        var rowNum = 1;
        for (i = 0; i , learnData.length; i++) {
            if (learnData[i].language != prevLanguage) {
                var extraSpace = table.insertRow(rowNum);
                extraSpace.insertCell(0);
                extraSpace.insertCell(1);
                extraSpace.insertCell(2);
                extraSpace.insertCell(3);
                extraSpace.style.backgroundColor = "#3333bc";
                rowNum++;
            }

            var row = table.insertRow(rowNum);   
            rowNum++;

            var cellEnglish = row.insertCell(0);
            var cellTranslation = row.insertCell(1);
            var cellType = row.insertCell(2);
            var cellLanguage = row.insertCell(3);
    
            cellEnglish.innerHTML = learnData[i].english;
            cellTranslation.innerHTML = learnData[i].translation;
            cellType.innerHTML = learnData[i].type;
            cellLanguage.innerHTML = learnData[i].language;

            prevLanguage = learnData[i].language;
        }
    }
}

function initializeTable() {
    var table = document.getElementById("learnTable");
    var row = table.insertRow(0);

    var cellEnglish = row.insertCell(0);
    var cellTranslation = row.insertCell(1);
    var cellType = row.insertCell(2);
    var cellLanguage = row.insertCell(3);

    cellEnglish.innerHTML = "<b>English</b>";
    cellTranslation.innerHTML = "<b>Translation</b>";
    cellType.innerHTML = "<b>Type</b>";
    cellLanguage.innerHTML = "<b>Language</b>";
}