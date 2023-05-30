import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, ListGroup} from "react-bootstrap";
import {Context} from "../../../index";
import {addSubject, getSubjects, getTeachers} from "../../../api/api";
import {observer} from "mobx-react-lite";
import SubjectItem from "./SubjectItem";

const Subjects = observer(() => {

    const {storage} = useContext(Context)

    const [name, setName] = useState("")

    useEffect(() => {
        getTeachers().then(data => storage.teachers = data)
        getSubjects().then(data => storage.subjects = data)
    }, [storage])

    const post = async () => {
        await addSubject(name);
    }

    return (
        <Container>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Название предмета</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Название предмета"
                                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={post}>
                    Добавить
                </Button>
            </Form>


            <ListGroup as="ul">
                {
                    storage.subjects.map(({id, name}) => <SubjectItem key={"id__" + id} id={id} name={name}/>)
                }
            </ListGroup>

        </Container>
    );
});

export default Subjects;