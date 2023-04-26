const url = "https://just-enough-server.azurewebsites.net/api/getList"
//const url = "http://localhost:3000/api/getQuestions";   // for testing


let languageCheckboxes = new Array(
    document.getElementById('french'), 
    document.getElementById('german'), 
    document.getElementById('norwegian'), 
    document.getElementById('spanish')
);

var language = [];

function testChecks() {
    console.log(languageCheckboxes.length)
    for (i = 0; i < languageCheckboxes.length; i++) {
        console.log(languageCheckboxes[i].value)
       // if (languageCheckboxes[i].checked) {
       //     console.log(languageCheckboxes[i].value)
       // }
    } 
}


async function initiateCard() {
    


    const response  = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"language": language, "type": type})
    }); 

    cardData = await response.json()

    currCard = 0
    generateCard()
}