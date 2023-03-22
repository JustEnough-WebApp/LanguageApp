// .js file that handles api calls to server

const url = "https://just-enough-server.azurewebsites.net/";
//const url = "http://localhost:3000";             // for testing purposes


async function ping() {
    const response = await fetch(url + "api/ping");       
    const data = await response.text();
    console.log(data);
}

ping();


// Start Demo Quiz 

// Sample Questions for Testing
const quizData = [
    {
        question: "Tallest is the opposite of ________",
        a: "longest",
        b: "widest",
        c: "shortest",
        d: "biggest",
        correct: "c"
    },
    {
        question: "Happy is the ________ of sad",
        a: "opposed",
        b: "opposite",
        c: "oppose",
        d: "oppositive",
        correct: "b"
    },
    {
        question: "________ down",
        a: "Sit",
        b: "Open",
        c: "Close",
        d: "Stand",
        correct: "a"
    },
];

const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const answers = document.querySelectorAll('.answer')
const a_text = document.getElementById('a-text')
const b_text = document.getElementById('b-text')
const c_text = document.getElementById('c-text')
const d_text = document.getElementById('d-text')

//const submitBtn = document.getElementById('submitBtn')
//const nextBtn = document.getElementById('nextBtn')


let currQuestion = 0
let quizScore = 0

document.getElementById("loadBtn").addEventListener("click", quizGenerator)
//enableButton();

function quizGenerator() {

    resetSelection()
    resetResult()

    const currData = quizData[currQuestion]

    question.innerHTML = currData.question
    a_text.innerHTML = currData.a
    b_text.innerHTML = currData.b
    c_text.innerHTML = currData.c
    d_text.innerHTML = currData.d

    //submitBtn.disabled = true
    //nextBtn.disabled = true
}

// Reset selection after each question 
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

submitBtn.addEventListener('click', () => {
    const answer = getAnswer() 
    if (answer === quizData[currQuestion].correct) {
        result.innerHTML = `<h2>Correct!</h2>`
    } else {
        result.innerHTML = `<h2>Incorrect! The correct answer is ${quizData[currQuestion].correct}. </h2>`
    }
    //nextBtn.disabled = false
})

nextBtn.addEventListener('click', () => {
    const answer = getAnswer() 
    if (answer === quizData[currQuestion].correct) {
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
// End Quiz