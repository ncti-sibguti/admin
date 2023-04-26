import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {deleteTeacherById, getTeacherById} from "../../../api/api";
import {observer} from "mobx-react-lite";
import {MENU_URL} from "../../../api/url";

const Teacher = observer(() => {

    const params = useParams();
    const navigate = useNavigate();

    const [teacher, setTeacher] = useState({});

    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        getTeacherById(params.id).then(data => setTeacher(data));
        setLastname(teacher.lastname)
        setFirstname(teacher.firstname)
        setSurname(teacher.surname)
        setEmail(teacher.email)
    }, [params.id, teacher.email, teacher.firstname, teacher.lastname, teacher.surname])


    const view = (e) => {
        e.preventDefault()
        console.log(teacher)
    }

    const deleteTeacher = async () => {
        await deleteTeacherById(params.id);
        navigate(MENU_URL)
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control value={lastname} type="text" placeholder="Фамилия"
                                  onChange={(e) => setLastname(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={firstname} type="text" placeholder="Имя"
                                  onChange={(e) => setFirstname(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Отчество</Form.Label>
                    <Form.Control value={surname} type="text" placeholder="Отчество"
                                  onChange={(e) => setSurname(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Email"
                                  onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => view(e)}>
                    Обновить
                </Button>
                <Button variant="danger" type="submit" onClick={deleteTeacher}>
                    Удалить
                </Button>
            </Form>
        </Container>
    );
});

export default Teacher;