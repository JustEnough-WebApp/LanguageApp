const url = "https://just-enough-server.azurewebsites.net/api/getQuestions"
//const url = "http://localhost:3000/api/getQuestions";

var quizData
var language
var type

var currQuestion 
var quizScore 

const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const answers = document.querySelectorAll('.answer')
const a_text = document.getElementById('a-text')
const b_text = document.getElementById('b-text')
const c_text = document.getElementById('c-text')
const d_text = document.getElementById('d-text')

const boxA = document.getElementById('boxA')
const boxB = document.getElementById('boxB')
const boxC = document.getElementById('boxC')
const boxD = document.getElementById('boxD')
const checkboxes = {boxA, boxB, boxC, boxD}

const btnSubmit = document.getElementById('btnSubmit')
const btnNext = document.getElementById('btnNext')
const btnCont = document.getElementById('btnSaveCont')
const btnStart = document.getElementById('btnStartQuiz')


document.getElementById("btnSubmit").addEventListener("click", submitAnswer);
document.getElementById("btnNext").addEventListener("click", getNextQuestion);

document.getElementById("btnTakeQuiz").addEventListener("click", disableContBtn);
document.getElementById("btnSaveCont").addEventListener("click", disableStartBtn);
document.getElementById("btnStartQuiz").addEventListener("click", initiateQuiz);

boxA.addEventListener("click", enableBtnSubmit)
boxB.addEventListener("click", enableBtnSubmit)
boxC.addEventListener("click", enableBtnSubmit)
boxD.addEventListener("click", enableBtnSubmit)


async function initiateQuiz() {
    const response  = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"language": language, "type": type})
    }); 

    quizData = await response.json()
    currQuestion = 0
    quizScore = 0
    generateQuiz()
}

function resetSelection() {
    answers.forEach(answer => answer.checked = false)
}

function resetResult() {
    result.innerHTML = `<h2></h2>`
}

function getAnswer() {
    var selectedAnswer
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.value
        } 
    })
    return selectedAnswer
}

function generateQuiz() {
    resetSelection()
    resetResult()
    enableHandler()

    disableBtnSubmit()
    disableBtnNext()

    questionNum.innerHTML = `<h4>Question ${currQuestion + 1} / ${quizData.length}</h4>`

    const currData = quizData[currQuestion]
    question.innerHTML = currData.question
    a_text.innerHTML = currData.answer_a
    b_text.innerHTML = currData.answer_b
    c_text.innerHTML = currData.answer_c
    d_text.innerHTML = currData.answer_d
   
}

function submitAnswer() {
    const answer = getAnswer()
    var correctText

    if (quizData[currQuestion].correct_answer === 'a'){
        correctText = quizData[currQuestion].answer_a
    } else if (quizData[currQuestion].correct_answer === 'b'){
        correctText = quizData[currQuestion].answer_b
    } else if (quizData[currQuestion].correct_answer === 'c'){
        correctText = quizData[currQuestion].answer_c
    } else if (quizData[currQuestion].correct_answer === 'd'){
        correctText = quizData[currQuestion].answer_d
    }

    if (answer === quizData[currQuestion].correct_answer) {
        result.innerHTML = `<h2>Correct!</h2>`
    
    } else {
       result.innerHTML = `<h2>Incorrect! The correct answer is "${correctText}". </h2>`
    }

    disableHandler()
    disableBtnSubmit()
    enableBtnNext()
}

function getNextQuestion() {
    const answer = getAnswer() 
        if (answer === quizData[currQuestion].correct_answer) {
            quizScore++
        }
        currQuestion++
    
        if (currQuestion < quizData.length) {
            generateQuiz()
        } else {
            quiz.innerHTML = `
            <h2> You answered ${quizScore} out of ${quizData.length} questions correctly.</h2>
            <button type="button class="btn btn-primary btn-sm onclick="location.reload()">Reload</button>
            `
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

function enableHandler() {
    answers.forEach(answer => answer.removeAttribute("disabled"))
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
