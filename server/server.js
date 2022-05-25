// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

const express = require("express");
const mongoose = require("mongoose");
const questions = require("./models/questions");
var cors = require("cors");

var fs = require("fs");
const path = require("path");
const Question = require("./models/questions");
const Tag = require("./models/tags");
const Answer = require("./models/answers");
const port = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, "localhost", () => {
  console.log("listening for requests on port ${port}");
  mongoose.connect("mongodb://127.0.0.1:27017/fake_so");
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("connected", function () {
    // process requests
  });
  process.on("SIGINT", () => {
    if (db) {
      db.close()
        .then((result) => console.log("DB connection closed"))
        .catch((err) => console.log(err));
    }
    console.log("Server closed. Database instance disconnected");
  });
});

app.get("/questions", (req, res) => {
  Question.find().then((result) => {
    JSON.stringify(result);

    res.send(result);
  });
});

app.get("/tags", (req, res) => {
  Tag.find().then((result) => {
    JSON.stringify(result);

    res.send(result);
  });
});

app.get("/answers", (req, res) => {
  Answer.find().then((result) => {
    JSON.stringify(result);

    res.send(result);
  });
});

function questionCreate(question) {
  qstndetail = {
    title: question.title,
    text: question.text,
    tags: question.tags,
    asked_by: question.asked_by,
  };
  if (question.answers != false) qstndetail.answers = question.answers;
  if (question.ask_date_time != false)
    qstndetail.ask_date_time = question.ask_date_time;
  if (question.views != false) qstndetail.views = question.views;

  let qstn = new Question(qstndetail);
  return qstn;
}

app.post("/addquestion", (req, res) => {
  let newQuestion = req.body;
  questionCreate(newQuestion).save();
  res.send(questionCreate(newQuestion));
});

app.post("/addtag", (req, res) => {
  let tag = new Tag({ name: req.body.name });
  tag.save();
  res.send(tag);
});

app.post("/addanswer", (req, res) => {
  let newAnswer = req.body;
  let answer = new Answer({
    text: newAnswer.text,
    ans_by: newAnswer.ans_by,
    ans_date_time: newAnswer.ans_date_time,
  });
  answer.save();
  res.send(answer);
});

app.put("/incrementView", (req, res) => {
  Question.findOne({ _id: req.body._id }).then((result) => {
    result.views += 1;
    result.save();
  });
});

app.put("/addAnswerToQuestion", (req, res) => {
  let r = req.body;
  Question.findOne({ _id: r._id }).then((result) => {
    result.answers.push(r.answers[0]);
    result.save();
  });
});
