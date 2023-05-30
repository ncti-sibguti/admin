import {$auth, $http} from "./http";
import jwtDecode from "jwt-decode";

const login = async (username, password) => {
    const {data} = await $http.post("/auth/login", {username, password})
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)
    let token = data.accessToken
    return getInfo(token);
}

const check = async () => {
    let token = localStorage.getItem("refreshToken");
    const {data} = await $http.post("/auth/refresh", {}, {headers: {'Authorization': `Bearer ${token}`}});
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)
    return getInfo(data.accessToken);
}

const getInfo = async (token) => {
    let userInfo = jwtDecode(token);
    const {data} = await $auth.get(`/admin/profile`);
    return data;
}

const createStudent = async (firstname, lastname, surname, email, password, group) => {
    await $auth.post("/admin/create-student", {firstname, lastname, surname, email, password, group})
}

const createStudentWithFile = async (file) => {
    await $auth.post("/admin/upload-students", {file: file}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const createTeacher = async (firstname, lastname, surname, email, password) => {
    await $auth.post("/admin/create-teacher", {firstname, lastname, surname, email, password})
}

const createTeachersWithFile = async (file) => {
    await $auth.post("/admin/upload-teachers", {file: file}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
const uploadSchedule = async (file) => {
    await $auth.post("/admin/upload-schedule", {file: file}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
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
    const {data} = await $auth.get("/admin/teachers/" + id);
    return data;
}

const getStudentById = async (id) => {
    const {data} = await $auth.get("/admin/students/" + id);
    return data;
}

const deleteStudentById = async (id) => {
    const {data} = await $auth.delete("/admin/students/" + id);
    return data;
}

const deleteTeacherById = async (id) => {
    const {data} = await $auth.delete("/admin/teachers/" + id);
    return data;
}

const createGroup = async (name, speciality, course) => {
    const {data} = await $auth.post("/admin/create-group", {name, speciality, course})
    return data;
}

const getGroupById = async (id) => {
    const {data} = await $auth.get("/admin/groups/" + id);
    return data;
}

const deleteGroupById = async (id) => {
    const {data} = await $auth.delete("/admin/groups/" + id)
    return data;
}

const getSubjects = async () => {
    const {data} = await $auth.get("/admin/subjects");
    return data;
}

const addSubject = async (name) => {
    await $auth.post("/admin/create-subject", {name})
}


const resetPassword = async (id) => {
    let password = process.env.RESET_PASSWORD
    await $auth.put("/admin/reset", {id, password})
}

const createSchedule = async (day, id, numberPair, teacherId, subject, classroom, weekType) => {
    const {data} = await $auth.post("/admin/schedule", {
        day: day,
        group: id,
        numberPair: numberPair,
        teacher: teacherId,
        subject: subject,
        classroom: classroom,
        parity: weekType
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
    resetPassword,
    getGroupById,
    deleteGroupById,
    createSchedule,
    createStudentWithFile,
    createStudent,
    createTeachersWithFile,
    createTeacher,
    uploadSchedule,
    addSubject,
    getSubjects
}