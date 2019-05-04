"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionModelSchema = new mongoose_1.Schema({
    categoryId: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    affectedAxes: { type: [String], required: true }
});
////// Create Model /////
exports.QuestionModel = mongoose_1.model("Question", questionModelSchema);
////// Functions ////////
function getQuestions() {
    return exports.QuestionModel.find();
}
exports.getQuestions = getQuestions;
function addQuestion(input) {
    const rec = new exports.QuestionModel(input);
    rec.save();
    return rec;
}
exports.addQuestion = addQuestion;
//# sourceMappingURL=Question.model.js.map