import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {deleteStudentById, getStudentById, resetPassword} from "../../../api/api";
import {observer} from "mobx-react-lite";
import {MENU_URL} from "../../../api/url";

const Student = observer(() => {

    const params = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({});

    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        getStudentById(params.id).then(data => setStudent(data));
        setLastname(student.lastname)
        setFirstname(student.firstname)
        setSurname(student.surname)
        setEmail(student.email)
    }, [params.id, student.email, student.firstname, student.lastname, student.surname])

    const view = (e) => {
        e.preventDefault()
        console.log(student)
    }

    const deleteStudent = async (e) => {
        e.preventDefault()
        await deleteStudentById(params.id);
        navigate(MENU_URL)
    }

    const rsPasswd = async () => {
        await resetPassword(params.id)
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
                    Сохранить
                </Button>

                <Button variant="primary" type="submit" onClick={rsPasswd}>
                    Сбросить пароль
                </Button>

                <Button variant="danger" type="submit" onClick={(e) => deleteStudent(e)}>
                    Удалить
                </Button>
            </Form>
        </Container>
    );
});

export default Student;