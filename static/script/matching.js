const url = "https://just-enough-server.azurewebsites.net/api/getMatching"
//const url = "http://localhost:3000/api/getMatching";   // for testing

$.get("nav.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});


var matchingData
var language
var type

let englishTerms = []
let foreignLanguageTerms = []

const eSide = ["e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9"]
const flSide = ["fl0", "fl1", "fl2", "fl3", "fl4", "fl5", "fl6", "fl7", "fl8", "fl9"]

const draggableListItems = document.querySelectorAll('draggable-list li')

let selectedID;
let dropTargetID;
let count = 0;

function addEventListeners() {
    draggableListItems.forEach( item => {
        item.addEventListener('dragStart', dragStart)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragover', dragOver)
        item.addEventListener('dragleave', dragLeave)
    })
}

function dragStart() {
    selectedID = this.id
}

function dragEnter() {
    this.classList.add('over')
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(event) {
    // default behavior prevents drop
    event.preventDefault()
}


function dragDrop() {
    dropTargetID = this.id
    if (checkForMatch(selectedID, dropTargetID)) {
        document.getElementById(selectedID).style.display = 'none'
        document.getElementById(dropTargetID).style.display = 'none'
        count++
    }
    this.class.remove('over')
}

function checkForMatch(selected, dropTarget) {
    switch (selected) {
        case e0:
            return dropTarget.innerHTML === foreignLanguageTerms[0] ? true : false
        
        case e1:
            return dropTarget.innerHTML === foreignLanguageTerms[1] ? true : false

        case e2:
            return dropTarget.innerHTML === foreignLanguageTerms[2] ? true : false

        case e3:
            return dropTarget.innerHTML === foreignLanguageTerms[3] ? true : false
        
        case e4:
            return dropTarget.innerHTML === foreignLanguageTerms[4] ? true : false
        
        case e5:
            return dropTarget.innerHTML === foreignLanguageTerms[5] ? true : false

        case e6:
            return dropTarget.innerHTML === foreignLanguageTerms[6] ? true : false

        case e7:
            return dropTarget.innerHTML === foreignLanguageTerms[7] ? true : false

        case e8:
            return dropTarget.innerHTML === foreignLanguageTerms[8] ? true : false
        
        case e9:
            return dropTarget.innerHTML === foreignLanguageTerms[9] ? true : false
        
        default:
            return false
    }
}

async function initiateGame() {
    // clear arrays from previous games
    englishTerms = []
    foreignLanguageTerms = []
    matchingData = []

    const response  = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"language": language, "type": type})
    }); 
    matchingData = await response.json()  


    if (matchingData.length > 0) {
        for (let i = 0; i < matchingData.length; i++) {
            englishTerms.push(matchingData[i].english)
            foreignLanguageTerms.push(matchingData[i].translation)
        }

        shuffle(foreignLanguageTerms)

        for (let i = 0; i < matchingData.length; i++) {
            document.getElementById(eSide[i]).innerHTML = englishTerms[i]
            document.getElementById(flSide[i]).innerHTML = foreignLanguageTerms[i]
        }
    }
}


// Fisher-Yates shuffle algorithm
function shuffle(arr) {
    let currentIndex = arr.length,  randomIndex
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
  
      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    }
  
    return arr;
  }



function enableBtnSubmit() {
    document.getElementById("btnSubmit").removeAttribute("disabled")
}

function enableBtnNext() {
    btnNext.removeAttribute("disabled")

}

function disableBtnSubmit() {
    btnSubmit.setAttribute("disabled", "disabled")
}

function disableBtnNext() {
    btnNext.setAttribute("disabled", "disabled")
}

function disableHandler () {
    for(let i = 0 ; i< answers.length; i++){
        if(answers[i].checked === false){
            answers[i].disabled = 'true';
        }  
    }
}

function disableContBtn() {
    if (document.getElementById('language').value === '') {
        btnCont.setAttribute("disabled", "disabled")
    } else {
        btnCont.removeAttribute("disabled")
        language = document.getElementById('language').value
    }
}

function disableStartBtn() {
    if (document.getElementById('category').value === '') {
        btnStart.setAttribute("disabled", "disabled")
    } else {
        btnStart.removeAttribute("disabled")
        type = document.getElementById('category').value
    }
}