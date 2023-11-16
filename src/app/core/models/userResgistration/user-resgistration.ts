export class UserResgistration {
    userName: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    questionId: number;
    answer: string;

    constructor(userName: string,
        email: string,
        password: string,
        name: string,
        lastName: string,
        phoneNumber: string,
        questionId: number,
        answer: string){
            this.userName = userName;
            this.email = email;
            this.password = password;
            this.name = name;
            this.lastName = lastName;
            this.phoneNumber = phoneNumber;
            this.questionId = questionId;
            this.answer = answer;
        }
}
