import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {GROUPS_URL, SUBJECTS_URL, TEACHERS_URL} from "../api/url";
import StudentModal from "./menu/modal/StudentModal";

const Menu = () => {

    const [show, setShow] = useState(false)

    return (
        <Container className={"d-flex flex-column"}>
            <Button href={GROUPS_URL} variant={"outline-primary"} className={"mb-3"}>
                Группы
            </Button>
            <Button href={TEACHERS_URL} variant={"outline-primary"} className={"mb-3"}>
                Преподаватели
            </Button>
            <Button href={SUBJECTS_URL} variant={"outline-primary"} className={"mb-3"}>
                Предметы
            </Button>
            <Button onClick={() => setShow(true)} variant={"outline-primary"} className={"mb-3"}>
                Добавить студента
            </Button>

            <StudentModal show={show} onHide={() => setShow(false)}/>
        </Container>
    );
};

export default Menu;