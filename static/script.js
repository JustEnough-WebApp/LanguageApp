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
        question: "morado",
        a: "grey",
        b: "pink",
        c: "purple",
        d: "brown",
        correct: "c"
    },
    {
        question: "viernes",
        a: "the morning",
        b: "Friday",
        c: "yesterday",
        d: "Thursday",
        correct: "b"
    },
    {
        question: "la fresa",
        a: "the the banana",
        b: "the dessert",
        c: "the strawberry",
        d: "the fruit",
        correct: "c"
    },
    {
        question: "catorce",
        a: "thirteen",
        b: "fourteen",
        c: "thirty",
        d: "forty",
        correct: "b"
    },
    {
        question: "primo",
        a: "nephew",
        b: "son",
        c: "cousin (male)",
        d: "grandson",
        correct: "c"
    },
    {
        question: "pensar",
        a: "to think",
        b: "to read",
        c: "to want",
        d: "to understand",
        correct: "a"
    },
    {
        question: "anxious",
        a: "ocupado/a",
        b: "ansioso/a",
        c: "enamorado/a",
        d: "cansado/a",
        correct: "b"
    },
    {
        question: "siempre",
        a: "never",
        b: "always",
        c: "more or less",
        d: "I'm sorry",
        correct: "b"
    },
    {
        question: "el cuaderno",
        a: "the notebook",
        b: "the papers",
        c: "the pencil",
        d: "the movie",
        correct: "a"
    },
    {
        question: "Buenas noches",
        a: "Good evening/night",
        b: "Nice to meet you",
        c: "Good afternoon",
        d: "See you later!",
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