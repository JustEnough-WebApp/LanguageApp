const url = "https://just-enough-server.azurewebsites.net/api/getMatching"
//const url = "http://localhost:3000/api/getMatching";   // for testing

var matchingData
var language
var type

$.get("nav.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});

async function initiateGame() {
    var table = document.getElementById("matchingTable");
    table.innerHTML = "";

    const response  = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"language": language, "type": type})
    }); 
    matchingData = await response.json()  
    

    if (matchingData.length > 0) {
        console.log(matchingData)
        var rowNum = 0;
        
        for (i = 0; i , matchingData.length; i++) {
            var row = table.insertRow(rowNum);   
            rowNum++;
            
            var cellEnglish = row.insertCell(0);
            var cellTranslation = row.insertCell(1);
        
            cellEnglish.innerHTML = matchingData[i].english;
            cellTranslation.innerHTML = matchingData[i].translation;
        }   
    }

    else {
        console.log("oops")
    }
    
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