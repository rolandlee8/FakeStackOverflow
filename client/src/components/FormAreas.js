import React from "react";
import PostButton from "./PostButton";

export default class FormAreas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: "",
      questionText: "",
      questionTags: "",
      userName: "",
      errors: [],
    };
  }
  handleTitleChange = (event) => {
    this.setState({ questionTitle: event.target.value });
  };
  handleTextChange = (event) => {
    this.setState({ questionText: event.target.value });
  };
  handleTagChange = (event) => {
    this.setState({ questionTags: event.target.value });
  };
  handleUserChange = (event) => {
    this.setState({ userName: event.target.value });
  };
  handleErrors = (errormsg) => {
    this.setState({
      errors: errormsg,
      questionTitle: "",
      questionText: "",
      questionTags: "",
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
        <div class="questionTitle" id="heading">
          Question Title
          <div class="subheading" id="titleLimit">
            Title should not be more than 100 characters.
          </div>
          <textarea
            class="fillBox"
            id="title"
            name="title"
            rows="5"
            onChange={this.handleTitleChange}
            value={this.state.questionTitle}
          ></textarea>
        </div>

        <div class="questionText" id="heading">
          Question Text
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

        <div class="includedTags" id="heading">
          Tags
          <div class="subheading" id="tagInstr">
            Add keywords separated by whitespace
          </div>
          <textarea
            class="fillBox"
            id="tagbox"
            name="tagBox"
            rows="5"
            onChange={this.handleTagChange}
            value={this.state.questionTags}
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
        <PostButton
          model={this.props.model}
          name="Question"
          post={this.props.post}
          questionTitle={this.state.questionTitle}
          questionText={this.state.questionText}
          questionTags={this.state.questionTags}
          userName={this.state.userName}
          errors={this.handleErrors}
          updateModel={this.props.updateModel}
        />
      </div>
    );
  }
}
