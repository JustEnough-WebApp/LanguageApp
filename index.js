const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/ping', (request, response) => {
	console.log('Calling "/ping" on the Node.js server.')
	response.type('text/plain')
	response.send('Pong!')
})

app.get('/', function(req, res) {
  res.render('/index.html');
});

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})

// Connect to MongoDB database

const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

const mongooseUri = "mongodb+srv://vykle:0yldDEoOzkWQpKo0@languagequizdb.joo5uwx.mongodb.net/test"
mongoose.connect(mongooseUri, {useNewUrlParser: true}, {useUnifiedTopology: true})

const quizSchema = {
	type: String, 
	language: String,
	question: String,
	answer_a: String,
	answer_b: String,
	answer_c: String,
	answer_d: String,
	correct_answer: String
}

const Question = mongoose.model("question", quizSchema);
const client = new MongoClient(mongooseUri).db("test");
const collection = client.collection("questions");


app.get('/quiz', function(request, response) {
	Question.find({}).then((questions) => {
      response.type('application/json');
	    response.send(JSON.stringify(questions))
    })
  })


