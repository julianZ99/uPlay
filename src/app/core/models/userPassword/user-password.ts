export class UserPassword {
    email: string;
    questionId: number;
    answer: string;
    newPassword: string;

    constructor(email: string, questionId: number, answer: string, newPassword:string){
        this.email = email;
        this.questionId = questionId;
        this.answer = answer;
        this.newPassword = newPassword;
    }

}
