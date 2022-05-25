export default class Model {
  constructor() {
    this.data = {
      questions: [],
      answers: [],
      tags: [],
    };
  }
  // constructor(q,a,t){

  // }

  addQuestion(newQ) {
    this.data.questions.unshift(newQ);
  }
  addTag(newT) {
    this.data.tags.push(newT);
  }
  addAnswer(newA) {
    this.data.answers.push(newA);
  }
  sortByDate() {
    for (let i = 0; i < this.data.questions.length; i++) {
      for (let j = 0; j < this.data.questions.length - i - 1; j++) {
        let day1 = new Date(Date.parse(this.data.questions[j].asked_date_time));
        let day2 = new Date(
          Date.parse(this.data.questions[j + 1].asked_date_time)
        );

        if (day1 - day2 <= 0) {
          let temp = this.data.questions[j];
          this.data.questions[j] = this.data.questions[j + 1];
          this.data.questions[j + 1] = temp;
        }
      }
    }
  }
}
