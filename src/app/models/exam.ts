export class Exam {
    constructor(
        public year: number,
        public subject: string,
        public interimNumber: number
    ){    }
}

export interface ExamReference{
    path?: string
    data: Exam
}