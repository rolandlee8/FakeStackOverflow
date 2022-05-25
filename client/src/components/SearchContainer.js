import React from "react";
import Model from "../models/model.js";

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: this.props.model,
      searchValue: "",
    };
  }

  handleSearch = (event) => {
    this.setState({ searchValue: event.target.value });
  };
  search = (event) => {
    if (event.key === "Enter") {
      console.log(this.props.model);
      let value = this.state.searchValue;
      value = value.toLowerCase();
      let searchArray = value.split(" ");
      let filterQ = [];
      for (let i = 0; i < this.props.model.data.questions.length; i++) {
        for (let j = 0; j < searchArray.length; j++) {
          if (
            searchArray[j].charAt(0) != "[" &&
            searchArray[j].charAt(searchArray[j].length - 1) != "]"
          ) {
            if (
              this.props.model.data.questions[i].text
                .toLowerCase()
                .search(searchArray[j]) > -1 ||
              this.props.model.data.questions[i].title
                .toLowerCase()
                .search(searchArray[j]) > -1
            ) {
              filterQ.push(this.props.model.data.questions[i]);
            }
          } else if (
            searchArray[j].charAt(0) == "[" &&
            searchArray[j].charAt(searchArray[j].length - 1) == "]"
          ) {
            let tidArray = [];
            for (let i = 0; i < this.props.model.data.tags.length; i++) {
              if (
                searchArray[j].substring(1, searchArray[j].length - 1) ==
                this.props.model.data.tags[i].name
              ) {
                tidArray.push(this.props.model.data.tags[i]._id);
                break;
              }
            }

            if (this.props.model.data.questions[i].tags.includes(tidArray[0])) {
              filterQ.push(this.props.model.data.questions[i]);
            }
          }
        }
        let newSet = new Set(filterQ);
        filterQ = Array.from(newSet);
        const filteredModel = new Model();
        for (let i = 0; i <= filteredModel.data.questions.length; i++) {
          filteredModel.data.questions.pop();
        }
        for (let i = 0; i < filterQ.length; i++) {
          filteredModel.data.questions.push(filterQ[i]);
        }
        filteredModel.data.tags = this.props.model.data.tags;
        filteredModel.sortByDate();
        this.props.handleKey(value);
        this.props.handleTag(null);
        this.props.filterModel(filteredModel);
        this.setState({ searchValue: "" });
      }
    }
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search.."
          name="search"
          id="search"
          value={this.state.searchValue}
          onChange={this.handleSearch}
          onKeyPress={this.search}
        />
      </div>
    );
  }
}
