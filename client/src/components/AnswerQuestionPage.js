import React from "react";
import AnswerFormAreas from "./AnswerFormAreas";
export default class AnswerQuestionPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AnswerFormAreas
          updateModel={this.props.updateModel}
          question={this.props.question}
          model={this.props.model}
          postA={this.props.postA}
        />
      </div>
    );
  }
}
