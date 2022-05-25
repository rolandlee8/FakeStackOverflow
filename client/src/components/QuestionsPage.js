import React from "react";

export class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: this.props.key };
  }

  render() {
    return (
      <div className="questionBox">
        {this.props.model.data.questions.map((question) => (
          <div className="questionList">
            <Left question={question} answers={true} />
            <Middle
              question={question}
              model={this.props.model}
              redirectAnswer={this.props.redirectAnswer}
            />
            <Right question={question} />
          </div>
        ))}
      </div>
    );
  }
}
export class QuestionPageBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="questionPageBanner">
        <div className="number_of_questions" id="question_count">
          {this.props.count} {this.props.countTitle}
        </div>
        <div className="indicator">
          <strong>
            {this.props.count == 0 ? "No Questions Found" : this.props.heading}
          </strong>
        </div>
        <div className="addquestion">
          <button
            id="askQuestion"
            type="button"
            onClick={this.props.askQuestion}
          >
            Ask a Question
          </button>
        </div>
      </div>
    );
  }
}
export class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
    };
  }
  render() {
    return (
      <div className="column1">
        <span className="views">{this.state.question.views} Views</span>

        {this.props.answers && (
          <span className="answers">
            {this.state.question.answers.length} Answers
          </span>
        )}
      </div>
    );
  }
}
class Middle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      model: this.props.model,
    };
  }

  createTag(tag) {
    var newTag = null;
    for (let i = 0; i < this.state.model.data.tags.length; i++) {
      if (tag == this.state.model.data.tags[i]._id) {
        newTag = this.state.model.data.tags[i].name;
        break;
      }
    }

    return newTag;
  }
  render() {
    var set = new Set(this.state.question.tags);

    return (
      <div className="column2">
        <div className="questionTitle">
          <a
            className="titleLink"
            href="#"
            onClick={(e) => this.props.redirectAnswer(this.state.question)}
          >
            {this.state.question.title}
          </a>
        </div>
        <span className="tags">
          {Array.from(set).map((tag) => (
            <div className="singleTag">{this.createTag(tag)}</div>
          ))}
        </span>
      </div>
    );
  }
}
export class Right extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
    };
  }
  render() {
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
    let date = new Date(Date.parse(this.state.question.asked_date_time));
    let askDate =
      Months[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear();
    let askTime = date.getHours() + ":" + date.getMinutes();
    return (
      <div className="column3">
        <span className="op">
          Asked by: <mark>{this.state.question.asked_by}</mark>
        </span>
        <span className="date">
          Asked on: <mark>{askDate}</mark>
        </span>
        <span className="time">
          Asked at: <mark>{askTime}</mark>
        </span>
      </div>
    );
  }
}
