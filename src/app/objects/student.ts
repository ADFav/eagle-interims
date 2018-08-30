export interface Student {
    ADMIT_DATE: string;
    CLS: string;
    DBN: string;
    DOB: string;
    GRD: number;
    LVL: number;
    NAME: string;
    NYS_STUDENT_ID: number;
    PHONE_NUM: string;
    ROOM: number;
    SEX: string;
    ST: string;
    STUDENT_ID: string;
    EXAMS: string[];
    GRADES: {};
}

export interface StudentReference{
    path: string;
    data: Student;
}