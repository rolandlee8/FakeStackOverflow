import axios from "axios";
import React from "react";

export default class PostButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { model: this.props.model };
  }
  update;
  async modelAddition(model) {
    let title = this.props.questionTitle;
    let textB = this.props.questionText;
    let tagss = this.props.questionTags;
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
    let askDate =
      Months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
    let askTime = now.getHours() + ":" + now.getMinutes();
    let tagIdArray = [];

    let userinputValid = true;

    let titleValid = true;

    let textValid = true;
    let userValid = true;

    let tagValid = true;

    if (title.length > 100 || title.length == 0) {
      userinputValid = false;
      titleValid = false;
    }
    if (textB.trim() == "") {
      userinputValid = false;
      textValid = false;
    }
    if (tagss.trim().length == 0) {
      userinputValid = false;
      tagValid = false;
    }
    if (username.length > 15 || username.length == 0) {
      userinputValid = false;
      userValid = false;
    }
    if (this.props.name === "Question" && userinputValid) {
      if (tagss !== null) {
        const tagArray = tagss.toString().split(" ");

        for (let i = 0; i < tagArray.length; i++) {
          tagArray[i] = tagArray[i].toLowerCase().trim();
          let x = false;
          for (let j = 0; j < this.state.model.data.tags.length; j++) {
            if (tagArray[i] == this.state.model.data.tags[j].name.trim()) {
              x = true;
              tagIdArray.push(this.state.model.data.tags[j]._id);
            }
          }
          if (x == false) {
            let newT = {
              name: tagArray[i],
            };
            let t = await axios.post("http://localhost:8000/addtag", newT);
            this.state.model.addTag(t.data);

            tagIdArray.push(t.data._id);
          }
        }
      }
      let newQ = {
        title: title,
        text: textB,
        tags: tagIdArray,
        asked_by: username,
        asked_date_time: new Date(),
        answers: [],
        views: 0,
      };

      let q = await axios.post("http://localhost:8000/addquestion", newQ);
      console.log(q.data);
      this.state.model.addQuestion(q.data);
      this.state.model.sortByDate();
      this.props.updateModel(model);
      await this.props.post();
    } else {
      let errors = [];
      if (title !== null && titleValid == false) {
        errors.push("Title is invalid");
      }
      if (textValid == false) {
        errors.push("Text should not be empty");
      }
      if (tagss !== null && tagValid == false) {
        errors.push("Tags cannot be empty");
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
        onClick={(e) => this.modelAddition(this.state.model)}
      >
        Post {this.props.name}
      </button>
    );
  }
}
