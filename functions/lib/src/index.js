"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const question_1 = require("../objects/question");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.computeScore = functions.firestore.document('exams/{examID}/questions/{questionID}/response/{studentID}').onWrite(function (change, context) {
    const oldResponse = change.before.data();
    const newResponse = change.after.data();
    if (oldResponse !== newResponse) {
        const studentRef = change.after.ref.firestore.doc(`students/${context.params.studentID}`);
        const questionRef = change.after.ref.firestore.doc(`exams/${context.params.examID}/questions/${context.params.questionID}`);
        let studentData;
        let questionData = new question_1.Question();
        studentRef.get().then(snapshot => studentData = snapshot.data()).then(() => questionRef.get().then(snapshot => questionData = snapshot.data())).then(() => {
            if (!studentData.GRADES[context.params.examID]) {
                studentData.GRADES[context.params.examID] = 0;
            }
            if (oldResponse.answerChoice === questionData.correctAnswer) {
                studentData.GRADES[context.params.examID] -= 1;
            }
            if (newResponse.answerChoice === questionData.correctAnswer) {
                studentData.GRADES[context.params.examID] += 1;
            }
            studentRef.set(Object.assign({}, studentData)).catch(reason => console.log(reason));
        }).catch(reason => console.log(reason));
    }
});
//# sourceMappingURL=index.js.map