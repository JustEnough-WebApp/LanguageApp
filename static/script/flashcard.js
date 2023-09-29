const url = "https://just-enough-server.azurewebsites.net/api/getFlashcards"
//const url = "http://localhost:3000/api/getQuestions";   // for testing

var cardData

const cardFront = document.getElementById('cardFront')
const cardBack = document.getElementById('cardBack')

const btnCont = document.getElementById('contBtn')
const btnStart = document.getElementById('startBtn')

var language
var type
        
var currCard

document.getElementById("btnPrevCard").addEventListener("click", getPrevCard);
document.getElementById("btnNextCard").addEventListener("click", getNextCard);
document.getElementById("btnStudy").addEventListener("click", disableContBtn);

document.getElementById("btnShuffle").addEventListener("click", shuffle);

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

function generateCard() {
	cardNum.innerHTML = `<h4>Word ${currCard + 1} / ${cardData.length}</h4>`

    const currData = cardData[currCard]
    cardFront.innerHTML = currData.translation
    cardBack.innerHTML = currData.english
};

function getNextCard() {
    currCard++
    if (currCard < cardData.length) {
        generateCard()
    } else {
        currCard = 0;
        generateCard()
    }
}

function getPrevCard() {
    currCard -= 1
    if (currCard >= 0) {
        generateCard()
    } else {
        currCard = cardData.length - 1
        generateCard()
    }
}

function disableContBtn() {
    if (document.getElementById('cardLanguage').value === '') {
        btnCont.setAttribute("disabled", "disabled")
    } else {
        btnCont.removeAttribute("disabled")
        language = document.getElementById('cardLanguage').value
    }
}

function disableStartBtn() {
    if (document.getElementById('cardCategory').value === '') {
        btnStart.setAttribute("disabled", "disabled")
    } else {
        btnStart.removeAttribute("disabled")
        type = document.getElementById('cardCategory').value
    }
}

// Fisher-Yates shuffle algorithm
function shuffle() {
    currentIndex = cardData.length
    randomIndex = 0
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--
  
        temp = cardData[currentIndex]
        cardData[currentIndex] = cardData[randomIndex]
        cardData[randomIndex] = temp
     
    }

    currCard = 0
    generateCard()
  }



