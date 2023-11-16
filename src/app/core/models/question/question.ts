export class Question {
    id: number;
    questionDescription: string;

    constructor(id: number, questionDescription: string){
        this.id = id;
        this.questionDescription = questionDescription;
    }
}
