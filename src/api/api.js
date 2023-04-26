import {$auth, $http} from "./http";
import jwtDecode from "jwt-decode";

const login = async (username, password) => {
    const {data} = await $http.post("/auth/login", {username, password})
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)
    let token = data.accessToken
    return getInfo(token);
}

const getInfo = async (token) => {
    let userInfo = jwtDecode(token);
    const {data} = await $auth.get(`/admin/${userInfo.user_id}`);
    return data;
}

const check = async () => {
    let token = localStorage.getItem("refreshToken");
    const {data} = await $http.post(`/auth/refresh`, {}, {headers: {'Authorization': `Bearer ${token}`}});
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)
    return getInfo(data.accessToken);
}

const getStudents = async (id) => {
    const {data} = await $auth.get("/admin/students", {params: {group: id}});
    return data;
}

const getGroups = async () => {
    const {data} = await $auth.get("/admin/groups");
    return data;
}

const getTeachers = async () => {
    const {data} = await $auth.get("/admin/teachers");
    return data;
}

const getTeacherById = async (id) => {
    const {data} = await $auth.get("/admin/teacher/" + id);
    return data;
}

const getStudentById = async (id) => {
    const {data} = await $auth.get("/admin/student/" + id);
    return data;
}

const deleteStudentById = async (id) => {
    const {data} = await $auth.delete("/admin/student/" + id);
    return data;
}

const deleteTeacherById = async (id) => {
    const {data} = await $auth.delete("/admin/teacher/" + id);
    return data;
}

const createGroup = async (name) => {
    const {data} = await $auth.post("/admin/group", {name})
    return data;
}

const getGroupById = async (id) => {
    const {data} = await $auth.get("/admin/group/" + id);
    return data;
}

const deleteGroupById = async (id) => {
    const {data} = await $auth.delete("/admin/group/" + id)
    return data;
}

const getSubjects = async () => {
    const {data} = await $auth.get("/admin/subjects");
    return data;
}

const addSubject = async (name) => {
    await $auth.post("/admin/subject", {name: name})
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
    check,
    getStudents,
    getGroups,
    getTeachers,
    getTeacherById,
    getStudentById,
    deleteStudentById,
    deleteTeacherById,
    createGroup,
    getGroupById,
    deleteGroupById,
    addSubject,
    getSubjects,
    createSchedule
}