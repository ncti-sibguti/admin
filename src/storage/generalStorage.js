import {makeAutoObservable} from "mobx";

export class GeneralStorage {

    constructor() {
        this._groups = [{}]
        this._students = [{}]
        this._teachers = [{}]
        this._subjects = [{}]
        makeAutoObservable(this)
    }


    get students() {
        return this._students;
    }

    set students(value) {
        this._students = value;
    }


    get groups() {
        return this._groups;
    }

    set groups(value) {
        this._groups = value;
    }


    get teachers() {
        return this._teachers;
    }

    set teachers(value) {
        this._teachers = value;
    }


    get subjects() {
        return this._subjects;
    }

    set subjects(value) {
        this._subjects = value;
    }
}