export class User {
    private _username : string
    private _email : string
    private _password : string

    constructor(email : string, password : string, username : string = ''){
        this._email = email;
        this._password = password;
        this._username = username;
    }

    get username() : string{
        return this._username;
    }
    get email() : string{
        return this._email;
    }
    get password() : string{
        return this._password;
    }

}
