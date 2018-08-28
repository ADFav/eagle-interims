export class Question {
    public isMC = true;
    public isIMG = false;
    public directions?: string;

    // metadata
    public unit?: string;
    public bloom?: string;
    public standards?: string[] = [];
    public difficulty?: string;
    public regents?: string;

    // text-based question
    public questionText?: string;
    public questionImg?: string;

    // MC-text-based question
    public answerA?: string;
    public answerB?: string;
    public answerC?: string;
    public answerD?: string;

    public answerAImg?: string;
    public answerBImg?: string;
    public answerCImg?: string;
    public answerDImg?: string;

    // SA-text-based question
    public modelResponses?: string[] = [];

    public correctAnswer?: string;

    // image-based question
    public image?: string;

    // MC-image-based question
    public boundingBoxA?: number[] = [];
    public boundingBoxB?: number[] = [];
    public boundingBoxC?: number[] = [];
    public boundingBoxD?: number[] = [];
    constructor(
        public exam?: string
    ) {    }

    // setImage(event, key) {
    //     this.getBase64(event.target.files[0], this, key);
    // }

    // getBase64(file, obj, key) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => { obj[key] = reader.result || ''; };
    //     reader.onerror = () => obj[key] = '';
    // }
}


export interface QuestionReference {
    path?: string;
    edit?: boolean;
    data: Question;
  }
