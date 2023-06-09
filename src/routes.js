import {
    GROUP_URL,
    GROUPS_URL,
    LOGIN_URL,
    MENU_URL,
    STUDENT_URL,
    SUBJECT_URL,
    TEACHER_URL,
    TEACHERS_URL
} from "./api/url";
import Auth from "./components/auth/Auth";
import Menu from "./components/Menu";
import Group from "./components/menu/groups/Group";
import Teachers from "./components/menu/teacher/Teachers";
import Teacher from "./components/menu/teacher/Teacher";
import Student from "./components/menu/students/Student";
import Groups from "./components/menu/groups/Groups";
import Subjects from "./components/menu/subject/Subjects";

const publicRouters = [
    {
        path: LOGIN_URL,
        Component: Auth
    }
]

const authRouters = [
    {
        path: MENU_URL,
        Component: Menu
    },
    {
        path: GROUPS_URL,
        Component: Groups
    },
    {
        path: TEACHERS_URL,
        Component: Teachers
    },
    {
        path: TEACHER_URL + "/:id",
        Component: Teacher
    },
    {
        path: STUDENT_URL + "/:id",
        Component: Student
    },
    {
        path: GROUP_URL + "/:id",
        Component: Group
    },
    {
        path: SUBJECT_URL,
        Component: Subjects
    }
]


export {
    publicRouters,
    authRouters
}