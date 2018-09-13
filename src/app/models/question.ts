export interface Question {
    isMC: boolean;
    isIMG: boolean;
    directions?: string;

    // metadata
    unit?: string;
    bloom?: string;
    standards?: string[];
    difficulty?: string;
    regents?: string;

    // text-based question
    questionText?: string;
    questionImg?: string;

    // MC-text-based question
    answerA?: string;
    answerB?: string;
    answerC?: string;
    answerD?: string;

    answerAImg?: string;
    answerBImg?: string;
    answerCImg?: string;
    answerDImg?: string;

    // SA-text-based question
    modelResponses?: string[];

    correctAnswer?: string;

    // image-based question
    image?: string;

    // MC-image-based question
    boundingBoxA?: number[];
    boundingBoxB?: number[] ;
    boundingBoxC?: number[] ;
    boundingBoxD?: number[] ;


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
