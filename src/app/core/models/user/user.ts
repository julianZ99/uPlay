export class User {
    id?: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    utncoin: number | undefined;

    constructor(name: string, lastname: string, email: string, password: string) {
        this.name = name;
        this.lastname = lastname;
        this.username = email;
        this.password = password;
    }
}

export class UserFullData {
    id?: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    phonenumber: string;
    utncoin: number | undefined;

    constructor(name: string, lastname: string, username: string, email: string, phonenumber: string) {
        this.name = name;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.phonenumber = phonenumber;
    }
}