import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { InterimsAFSService } from "../interims-afs.service";
import { Inject, Component } from "@angular/core";
import { Exam } from "src/app/models/exam";

interface ExamDialogData {
    year: number;
    subject: string;
    interimNumber: number;
}

@Component({
    selector: 'new-exam-dialog',
    templateUrl: 'new-exam-dialog.html',
})
export class NewExamComponent {
    exam: Exam;
    warning: string;
    constructor(
        public dialogRef: MatDialogRef<NewExamComponent>,
        private afs: InterimsAFSService,
        @Inject(MAT_DIALOG_DATA) public examsList: ExamDialogData[]
    ) {
        this.exam = new Exam();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    validate() {
        this.afs.addExam(this.exam).then(result => console.log(result));
        this.dialogRef.close();

    }
}