import axios from "axios";
import React from "react";

export default class PostAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { model: this.props.model, question: this.props.question };
  }
  async modelAddition(model) {
    let answerText = this.props.questionText;
    let username = this.props.userName;
    const now = new Date();
    var Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let ansDate =
      Months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
    let ansTime = now.getHours() + ":" + now.getMinutes();

    let userinputValid = true;
    let textValid = true;
    let userValid = true;
    if (answerText.trim().length == 0) {
      userinputValid = false;
      textValid = false;
    }
    if (username.length > 15 || username.length == 0) {
      userinputValid = false;
      userValid = false;
    }

    if (userinputValid) {
      let newA = {
        text: answerText,
        ans_by: username,
        ans_date_time: now,
      };

      let a = await axios.post("http://localhost:8000/addanswer", newA);
      console.log(a.data);
      this.state.model.addAnswer(a.data);
      let x = this.state.question._id;
      for (let i = 0; i < this.state.model.data.questions.length; i++) {
        if (x == this.state.model.data.questions[i]._id) {
          this.state.model.data.questions[i].answers.unshift(a.data._id);
          break;
        }
      }

      axios.put(
        "http://localhost:8000/addAnswerToQuestion",
        this.props.question
      );

      for (let i = 0; i < this.state.model.data.questions; i++) {
        if (
          (this.state.question.qid = this.state.model.data.questions[i].qid)
        ) {
          this.state.model.data.questions[i] = this.state.question;
          break;
        }
      }
      this.props.updateModel(this.state.model);
      this.props.postA(this.state.question);
    } else {
      let errors = [];
      if (textValid == false) {
        errors.push("Text should not be empty!");
      }
      if (userValid == false) {
        errors.push("Username is invalid");
      }

      this.props.errors(errors);
    }
  }
  render() {
    return (
      <button
        className="Post"
        onClick={(e) => this.modelAddition(this.state.question)}
      >
        Post {this.props.name}
      </button>
    );
  }
}
