import {$auth, $http} from "./http";
import jwtDecode from "jwt-decode";

const AUTH_URL = "/auth";
const TEACHERS_URL = "/teachers"
const STUDENTS_URL = "/students"
const GROUPS_URL = "/groups"
const SUBJECTS_URL = "/subjects"

const login = async (username, password) => {
    const {data} = await $http.post(AUTH_URL + "/login", {username, password})
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)
    let token = data.accessToken
    return getInfo(token);
}

const register = async (username, password) => {
    const {data} = await $http.post(AUTH_URL + "/register", {
        username, password
    })
    return data
}

const check = async () => {
    let token = localStorage.getItem("refreshToken");
    const {data} = await $http.post(AUTH_URL + `/refresh`, {}, {headers: {'Authorization': `Bearer ${token}`}});
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)
    return getInfo(data.accessToken);
}

const getInfo = async (token) => {
    let userInfo = jwtDecode(token);
    const {data} = await $auth.get(`/admin/${userInfo.user_id}`);
    return data;
}

const createStudent = async (firstname, lastname, surname, email, password, group) => {
    await $auth.post("/admin" + STUDENTS_URL, {firstname, lastname, surname, email, password, group})
}

const createStudentWithFile = async (file) => {
    await $auth.post("/admin/upload-students", {file: file}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const createTeacher = async (firstname, lastname, surname, email, password) => {
    await $auth.post("/admin" + TEACHERS_URL, {firstname, lastname, surname, email, password})
}

const createTeachersWithFile = async (file) => {
    await $auth.post("/admin/upload-teachers", {file: file}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const getStudents = async (id) => {
    const {data} = await $auth.get("/admin" + STUDENTS_URL, {params: {group: id}});
    return data;
}

const getGroups = async () => {
    const {data} = await $auth.get("/admin" + GROUPS_URL);
    return data;
}

const getTeachers = async () => {
    const {data} = await $auth.get("/admin" + TEACHERS_URL);
    return data;
}

const getTeacherById = async (id) => {
    const {data} = await $auth.get("/admin" + TEACHERS_URL + "/" + id);
    return data;
}

const getStudentById = async (id) => {
    const {data} = await $auth.get("/admin" + STUDENTS_URL + "/" + id);
    return data;
}

const deleteStudentById = async (id) => {
    const {data} = await $auth.delete("/admin" + STUDENTS_URL + "/" + id);
    return data;
}

const deleteTeacherById = async (id) => {
    const {data} = await $auth.delete("/admin" + TEACHERS_URL + "/" + id);
    return data;
}

const createGroup = async (name) => {
    const {data} = await $auth.post("/admin" + GROUPS_URL, {name})
    return data;
}

const getGroupById = async (id) => {
    const {data} = await $auth.get("/admin" + GROUPS_URL + "/" + id);
    return data;
}

const deleteGroupById = async (id) => {
    const {data} = await $auth.delete("/admin" + GROUPS_URL + "/" + id)
    return data;
}

const getSubjects = async () => {
    const {data} = await $auth.get("/admin" + SUBJECTS_URL);
    return data;
}

const addSubject = async (name) => {
    await $auth.post("/admin" + SUBJECTS_URL, {name: name})
}

const resetPassword = async (id) => {
    let password = process.env.RESET_PASSWORD
    await $auth.put("/admin/reset", {id, password})
}

const createSchedule = async (day, id, numberPair, teacherId, subjectId, classroom) => {
    const {data} = await $auth.post("/admin/schedule", {
        day: day,
        group: id,
        numberPair: numberPair,
        teacher: teacherId,
        subject: subjectId,
        classroom: classroom
    })
    return data
}

export {
    login,
    register,
    check,
    getStudents,
    getGroups,
    getTeachers,
    getTeacherById,
    getStudentById,
    deleteStudentById,
    deleteTeacherById,
    createGroup,
    resetPassword,
    getGroupById,
    deleteGroupById,
    addSubject,
    getSubjects,
    createSchedule,
    createStudentWithFile,
    createStudent,
    createTeachersWithFile,
    createTeacher
}