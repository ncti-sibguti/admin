import {makeAutoObservable} from "mobx";

export class User {
    constructor() {
        this._isAuth = false;
        this._user = [{}]
        makeAutoObservable(this)
    }


    get isAuth() {
        return this._isAuth;
    }

    set isAuth(value) {
        this._isAuth = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }
}