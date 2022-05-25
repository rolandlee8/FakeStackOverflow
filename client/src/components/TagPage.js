import React from "react";
import Model from "../models/model.js";
import { QuestionPageBanner } from "./QuestionsPage";
export default class TagPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { model: this.props.model };
  }
  questionCount(tag) {
    let qCount = 0;

    for (let j = 0; j < this.state.model.data.questions.length; j++) {
      if (this.state.model.data.questions[j].tags.includes(tag._id)) {
        qCount += 1;
      }
    }

    return qCount;
  }

  filterTag(name) {
    let filterQ = [];
    for (let i = 0; i < this.state.model.data.tags.length; i++) {
      if (name === this.state.model.data.tags[i].name) {
        var tagid = this.state.model.data.tags[i]._id;
      }
    }
    for (let i = 0; i < this.state.model.data.questions.length; i++) {
      if (this.state.model.data.questions[i].tags.includes(tagid)) {
        filterQ.push(this.state.model.data.questions[i]);
      }
    }
    const filteredModel = new Model();
    filteredModel.data.tags = this.props.model.data.tags;
    for (let i = 0; i <= filteredModel.data.questions.length; i++) {
      filteredModel.data.questions.pop();
    }
    for (let i = 0; i < filterQ.length; i++) {
      filteredModel.data.questions.push(filterQ[i]);
    }
    filteredModel.sortByDate();
    this.props.filterModel(filteredModel);
    this.props.handleKey(name);
    this.props.handleTag(name);
  }

  loadTags() {
    let tagList = this.state.model.data.tags;
    return tagList.map((tag) => (
      <div className="divTag">
        <a
          className="tagLink"
          href="#"
          onClick={() => this.filterTag(tag.name)}
        >
          {tag.name}
        </a>
        <div className="subDivTag">
          {this.questionCount(tag) + " "}
          questions
        </div>
      </div>
    ));
  }
  render() {
    return (
      <div>
        <QuestionPageBanner
          count={this.state.model.data.tags.length}
          countTitle="Tags"
          heading="All Tags"
          askQuestion={this.props.askQuestion}
        />

        <div className="tagsBox">{this.loadTags()}</div>
      </div>
    );
  }
}
