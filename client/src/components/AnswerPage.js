import axios from "axios";
import React from "react";
import { Left, Right, QuestionPageBanner } from "./QuestionsPage";

export default class AnswerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { model: this.props.model };
  }

  getDate(answer) {
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
    let date = new Date(Date.parse(answer.ans_date_time));
    let askDate =
      Months[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear();
    return askDate;
  }

  getTime(answer) {
    let date = new Date(Date.parse(answer.ans_date_time));
    let askTime = date.getHours() + ":" + date.getMinutes();
    return askTime;
  }

  renderAnswer() {
    for (let i = 0; i < this.state.model.data.questions.length; i++) {
      if (this.props.question._id === this.state.model.data.questions[i]._id) {
        this.props.question.views += 1;
        axios.put("http://localhost:8000/incrementView", this.props.question);
        break;
      }
    }
    let answerList = this.props.question.answers;

    let answerObjList = [];
    for (let i = 0; i < answerList.length; i++) {
      for (let j = 0; j < this.props.model.data.answers.length; j++) {
        if (answerList[i] == this.props.model.data.answers[j]._id) {
          answerObjList.push(this.props.model.data.answers[j]);
          break;
        }
      }
    }
    return answerObjList.map((answer) => {
      return (
        <div className="answerList">
          <div className="answerText">{answer.text}</div>
          <div className="ansDetail">
            <span className="op">
              Answered By {<mark>{answer.ans_by}</mark>}
            </span>
            <span className="date">
              On {<mark>{this.getDate(answer)}</mark>}
            </span>
            <span className="time">
              At {<mark>{this.getTime(answer)}</mark>}
            </span>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <QuestionPageBanner
          count={this.props.question.answers.length}
          countTitle="Answers"
          heading={this.props.question.title}
          askQuestion={this.props.askQuestion}
        />
        <div className="questionList">
          <Left answers={false} question={this.props.question} />
          <div className="text">{this.props.question.text}</div>

          <Right question={this.props.question} />
        </div>
        <div className="answerBox">{this.renderAnswer()}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            id="answerQuestion"
            onClick={(e) => this.props.answer(this.props.question)}
          >
            Answer Question
          </button>
        </div>
      </div>
    );
  }
}
