const url = "https://just-enough-server.azurewebsites.net/api/getQuestions"

var quizData

const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const answers = document.querySelectorAll('.answer')
const a_text = document.getElementById('a-text')
const b_text = document.getElementById('b-text')
const c_text = document.getElementById('c-text')
const d_text = document.getElementById('d-text')

var currQuestion
var quizScore 

async function initiateQuiz() {
    const response = await fetch(url)
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
        if (answer === quizData[currQuestion].correct_answer) {
            result.innerHTML = `<h2>Correct!</h2>`
        } else {
            result.innerHTML = `<h2>Incorrect! The correct answer is ${quizData[currQuestion].correct_answer}. </h2>`
        }
}

function getNextQuestion() {
    const answer = getAnswer() 
        if (answer === quizData[currQuestion].correct_answer) {
            quizScore++
        }
        currQuestion++
    
        if(currQuestion < quizData.length) {
            generateQuiz()
        } else {
            quiz.innerHTML = `
            <h2> You answered ${quizScore} out of ${quizData.length} questions correctly.</h2>
            <button type="button class="btn btn-primary btn-sm onclick="location.reload()">Reload</button>
            `
        }
}