import React from "react";
import Model from "../models/model.js";
import axios from "axios";
import { QuestionsPage, QuestionPageBanner } from "./QuestionsPage";
import SearchContainer from "./SearchContainer";
import AnswerPage from "./AnswerPage";
import FormAreas from "./FormAreas";
import AnswerQuestionPage from "./AnswerQuestionPage";
import TagPage from "./TagPage";
const model = new Model();

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: model,
      page: "questionPage",
      questionAnswer: null,
      filteredModel: null,
      key: null,
      tagFilter: null,
    };
    this.tagsPage = this.tagsPage.bind(this);
    this.questionPage = this.questionPage.bind(this);
    this.askQuestionPage = this.askQuestionPage.bind(this);
    this.answerPage = this.answerPage.bind(this);
    this.answerQuestionPage = this.answerQuestionPage.bind(this);
  }

  async componentDidMount() {
    var mq,
      mt,
      ma = null;
    let newModel = new Model();
    mq = await axios.get("http://localhost:8000/questions");
    mt = await axios.get("http://localhost:8000/tags");
    ma = await axios.get("http://localhost:8000/answers");
    newModel.data.questions = mq.data;
    newModel.data.tags = mt.data;
    newModel.data.answers = ma.data;
    newModel.sortByDate();
    console.log(newModel);
    this.updateModel(newModel);
  }

  tagsPage() {
    document.getElementById("questionsButton").style.backgroundColor =
      "#e9e9e9";
    document.getElementById("tagsButton").style.backgroundColor = "#0281e8";
    this.setState({ page: "tagsPage" });
  }
  questionPage = () => {
    document.getElementById("questionsButton").style.backgroundColor =
      "#0281e8";
    document.getElementById("tagsButton").style.backgroundColor = "#e9e9e9";
    this.setState({
      page: "questionPage",
      questionAnswer: null,
      filteredModel: null,
      key: null,
    });
  };
  askQuestionPage() {
    document.getElementById("questionsButton").style.backgroundColor =
      "#e9e9e9";
    document.getElementById("tagsButton").style.backgroundColor = "#e9e9e9";
    this.setState({ page: "askQuestionPage" });
  }
  answerPage = (q) => {
    document.getElementById("questionsButton").style.backgroundColor =
      "#e9e9e9";
    document.getElementById("tagsButton").style.backgroundColor = "#e9e9e9";
    this.setState({ page: "answerPage", questionAnswer: q });
  };
  answerQuestionPage = (q) => {
    document.getElementById("questionsButton").style.backgroundColor =
      "#e9e9e9";
    document.getElementById("tagsButton").style.backgroundColor = "#e9e9e9";
    this.setState({ page: "answerQuestionPage", questionAnswer: q });
  };
  updateModel = (newModel) => {
    document.getElementById("questionsButton").style.backgroundColor =
      "#0281e8";
    document.getElementById("tagsButton").style.backgroundColor = "#e9e9e9";
    this.setState({ model: newModel });
  };
  filterModel = (newModel) => {
    this.setState({
      filteredModel: newModel,
      page: "questionPage",
    });
    document.getElementById("questionsButton").style.backgroundColor =
      "#0281e8";
    document.getElementById("tagsButton").style.backgroundColor = "#e9e9e9";
  };
  handleKey = (value) => {
    this.setState({ key: value });
  };
  handleTag = (value) => {
    this.setState({ tagFilter: value });
  };

  generateBanner() {
    return (
      <div id="banner" className="banner">
        <a
          className="bannerButton"
          href="#questions"
          id="questionsButton"
          onClick={this.questionPage}
          style={
            this.state.page == "questionPage"
              ? { backgroundColor: "#0281e8" }
              : { backgroundColor: "#e9e9e9" }
          }
        >
          Questions
        </a>
        <a
          href="#tags"
          className="bannerButton"
          id="tagsButton"
          onClick={this.tagsPage}
        >
          Tags
        </a>
        <h1>Fake Stack Overflow</h1>
        <SearchContainer
          model={this.state.model}
          filterModel={this.filterModel}
          handleKey={this.handleKey}
          handleTag={this.handleTag}
        />
      </div>
    );
  }

  render() {
    this.state.model.sortByDate();
    console.log(this.state.model);
    var newpage = <div></div>;
    {
      (() => {
        switch (this.state.page) {
          case "tagsPage":
            newpage = (
              <div className="TagPage">
                <TagPage
                  model={this.state.model}
                  askQuestion={this.askQuestionPage}
                  post={this.questionPage}
                  updateModel={this.updateModel}
                  filterModel={this.filterModel}
                  handleKey={this.handleKey}
                  handleTag={this.handleTag}
                />
              </div>
            );
            break;
          case "questionPage":
            let newmodel =
              this.state.filteredModel === null
                ? this.state.model
                : this.state.filteredModel;
            newpage = (
              <div className="QuestionPage">
                <QuestionPageBanner
                  model={newmodel}
                  askQuestion={this.askQuestionPage}
                  count={newmodel.data.questions.length}
                  countTitle={"Questions"}
                  heading={
                    this.state.filteredModel === null
                      ? "All Questions"
                      : this.state.tagFilter === null
                      ? "Search Results"
                      : "Questions Tagged " + this.state.tagFilter
                  }
                />
                <QuestionsPage
                  model={newmodel}
                  redirectAnswer={this.answerPage}
                  key={this.state.key}
                />
              </div>
            );
            break;
          case "askQuestionPage":
            newpage = (
              <div className="AskQuestionPage">
                <AskQuestionPage
                  model={this.state.model}
                  post={this.questionPage}
                  updateModel={this.updateModel}
                />
              </div>
            );
            break;
          case "answerPage":
            newpage = (
              <div className="AnswerPage">
                <AnswerPage
                  question={this.state.questionAnswer}
                  model={this.state.model}
                  answer={this.answerQuestionPage}
                  askQuestion={this.askQuestionPage}
                  updateModel={this.updateModel}
                />
              </div>
            );
            break;
          case "answerQuestionPage":
            newpage = (
              <div className="AnswerQuestionPage">
                <AnswerQuestionPage
                  model={this.state.model}
                  updateModel={this.updateModel}
                  question={this.state.questionAnswer}
                  postA={this.answerPage}
                />
              </div>
            );
            break;
          default:
            return null;
        }
      })();
    }
    return (
      <div className="body">
        {this.generateBanner()}
        <div className="page" id="questionPage">
          {newpage}
        </div>
      </div>
    );
  }
}

class AskQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { model: this.props.model };
  }
  questionMaker() {}
  render() {
    return (
      <div>
        <FormAreas
          model={this.state.model}
          post={this.props.post}
          updateModel={this.props.updateModel}
        />
      </div>
    );
  }
}
