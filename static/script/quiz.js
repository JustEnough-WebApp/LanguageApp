const url = "https://just-enough-server.azurewebsites.net/api/getQuestions"
//const url = "http://localhost:3000/api/getQuestions";

var quizData

const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const answers = document.querySelectorAll('.answer')
const a_text = document.getElementById('a-text')
const b_text = document.getElementById('b-text')
const c_text = document.getElementById('c-text')
const d_text = document.getElementById('d-text')

const btnSubmit = document.getElementById('submitBtn')
const btnNext = document.getElementById('nextBtn')

var currQuestion 
var quizScore 

async function initiateQuiz() {
    let language = document.getElementById('language').value
    let type = document.getElementById('category').value

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
    let selectedAnswer
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.id
        } 
    })

    return selectedAnswer
}

function generateQuiz() {
    resetSelection()
    resetResult()

    disableBtnSubmit()
    disableBtnNext()

    questionNum.innerHTML = `<h4>Question ${currQuestion + 1}</h4>`

    const currData = quizData[currQuestion]
    question.innerHTML = currData.question
    a_text.innerHTML = currData.answer_a
    b_text.innerHTML = currData.answer_b
    c_text.innerHTML = currData.answer_c
    d_text.innerHTML = currData.answer_d
    console.log("reached end of generate")
   
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

function enableBtnSubmit(answer) {
    if (answer.checked == true) {
        btnSubmit.removeAttribute("disabled")
    } 
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