const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const answers = document.querySelectorAll('.answer')
const a_text = document.getElementById('a-text')
const b_text = document.getElementById('b-text')
const c_text = document.getElementById('c-text')
const d_text = document.getElementById('d-text')

let currQuestion = 0
let quizScore = 0

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

async function quizGenerator() {
    //const url = "http://localhost:3000/api/getQuestions"   // for testing
    const url = "https://just-enough-server.azurewebsites.net/api/getQuestions"
    const response = await fetch(url)
    const quizData = await response.json()

    resetSelection()
    resetResult()

    const currData = quizData[currQuestion]

    question.innerHTML = currData.question
    a_text.innerHTML = currData.answer_a
    b_text.innerHTML = currData.answer_b
    c_text.innerHTML = currData.answer_c
    d_text.innerHTML = currData.answer_d

    submitBtn.addEventListener('click', () => {
        const answer = getAnswer() 
        if (answer === quizData[currQuestion].correct_answer) {
            result.innerHTML = `<h2>Correct!</h2>`
        } else {
            result.innerHTML = `<h2>Incorrect! The correct answer is ${quizData[currQuestion].correct_answer}. </h2>`
        }
    })
    
    nextBtn.addEventListener('click', () => {
        const answer = getAnswer() 
        if (answer === quizData[currQuestion].correct_answer) {
            quizScore++
        }
        currQuestion++
    
        if(currQuestion < quizData.length) {
            quizGenerator()
        } else {
            quiz.innerHTML = `
            <h2> You answered ${quizScore} out of ${quizData.length} questions correctly.</h2>
            <button type="button class="btn btn-primary btn-sm onclick="location.reload()">Reload</button>
            `
        }
    })
}

document.getElementById("loadBtn").addEventListener("click", quizGenerator)