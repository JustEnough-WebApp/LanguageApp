const url = "https://just-enough-server.azurewebsites.net/api/getFlashcards"
//const url = "http://localhost:3000/api/getQuestions";

var cardData

const word = document.getElementById('word')
const definition = document.getElementById('definition')
        
var currCard

async function initiateCard() {
    let language = document.getElementById('cardLanguage').value
    let type = document.getElementById('cardCategory').value

    const response  = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"language": language, "type": type})
    }); 

    cardData = await response.json()

    currCard = 0
    generateCard()
}

function generateCard() {

	cardNum.innerHTML = `<h4>Word ${currCard + 1}</h4>`

    const currData = cardData[currCard]
    word.innerHTML = currData.english
    definition.innerHTML = currData.translation
    console.log("reached end of generate")
};

function getNextCard() {

        currCard++
    
        if (currCard < cardData.length) {
            generateCard()
        } else {`
            <button type="button class="btn btn-primary btn-sm onclick="location.reload()">Reload</button>
            `
        }
	}

/*var words = ["Word 1", "Word 2", "Word 3"];
var definitions = ["Definition 1", "Definition 2", "Definition 3"];
var index = 0;



function toggleDefinition() {
	var definition = document.getElementById("definition");
	if (definition.style.display === "none") {
		definition.style.display = "block";
		document.getElementById("show-def-button").innerHTML = "Hide Definition";
	} else {
		definition.style.display = "none";
	    document.getElementById("show-def-button").innerHTML = "Show Definition";
	}	
}

function nextCard() {
	index++;
	if (index >= words.length) {
		index = 0;
    }
	document.getElementById("word").innerHTML = words[index];
	document.getElementById("definition").innerHTML = definitions[index];
	document.getElementById("definition").style.display = "none";
	document.getElementById("show-def-button").innerHTML = "Show Definition";
}

document.getElementById("flashcard").addEventListener("click", function(event) {
	if (event.target !== this) {
		return;
	}
		toggleDefinition();
});*/