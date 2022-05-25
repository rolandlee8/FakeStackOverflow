// Question Document Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var QuestionSchema = new Schema({
  title: {
    type: String,
    maxLength: 100,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: "Tags",
    required: true,
  },
  answers: {
    type: [Schema.Types.ObjectId],
    ref: "Answers",
  },
  asked_by: {
    type: String,
    default: "Anonymous",
  },
  asked_date_time: {
    type: Date,
    default: new Date(),
  },
  views: {
    type: Number,
    default: 0,
  },
});
QuestionSchema.virtual("url").get(function () {
  return "posts/question/" + this._id;
});
module.exports = mongoose.model("Questions", QuestionSchema);
