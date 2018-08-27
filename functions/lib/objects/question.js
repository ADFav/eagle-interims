"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Question {
    constructor(exam) {
        this.exam = exam;
        this.isMC = true;
        this.isIMG = false;
        this.standards = [];
        // SA-text-based question
        this.modelResponses = [];
        // MC-image-based question
        this.boundingBoxA = [];
        this.boundingBoxB = [];
        this.boundingBoxC = [];
        this.boundingBoxD = [];
    }
}
exports.Question = Question;
//# sourceMappingURL=question.js.map