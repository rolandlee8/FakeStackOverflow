import React from "react";
import PostAnswer from "./PostAnswer";

export default class AnswerFormAreas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: "",
      userName: "",
      errors: [],
    };
  }

  handleTextChange = (event) => {
    this.setState({ questionText: event.target.value });
  };
  handleUserChange = (event) => {
    this.setState({ userName: event.target.value });
  };
  handleErrors = (errormsg) => {
    this.setState({
      errors: errormsg,
      questionText: "",
      userName: "",
    });
  };
  returnErrors = (errors) => {
    if (errors !== []) {
      return errors.map((error) => <div className="error">{error}</div>);
    }
  };

  render() {
    return (
      <div>
        <div id="errorMessage">{this.returnErrors(this.state.errors)}</div>

        <div class="questionText" id="heading">
          Answer Text
          <div class="subheading" id="textInstr">
            Add details
          </div>
          <textarea
            class="fillBox"
            id="textbox"
            name="textBox"
            rows="7"
            onChange={this.handleTextChange}
            value={this.state.questionText}
          ></textarea>
        </div>

        <div class="username" id="heading">
          Username
          <div class="subheading" id="userInstr">
            Should not be more than 15 characters
          </div>
          <textarea
            class="fillBox"
            id="namebox"
            name="nameBox"
            rows="3"
            onChange={this.handleUserChange}
            value={this.state.userName}
          ></textarea>
        </div>
        <PostAnswer
          model={this.props.model}
          question={this.props.question}
          name="Answer"
          postA={this.props.postA}
          questionText={this.state.questionText}
          userName={this.state.userName}
          errors={this.handleErrors}
          updateModel={this.props.updateModel}
        />
      </div>
    );
  }
}
