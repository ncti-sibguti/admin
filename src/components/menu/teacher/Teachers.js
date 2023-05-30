import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {getTeachers} from "../../../api/api";
import {observer} from "mobx-react-lite";
import {Button, Container, ListGroup} from "react-bootstrap";
import TeachersItem from "./TeachersItem";
import TeacherModal from "../modal/TeacherModal";

const Teachers = observer(() => {

    const {storage} = useContext(Context);

    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getTeachers().then(data => storage.teachers = data)
    }, [storage])

    return (
        <Container>
            <Button onClick={() => setModalVisible(true)}>Добавить преподавателя</Button>
            <ListGroup as="ul">
                {
                    storage.teachers.length !== 0 && storage.teachers.map(({id, firstname, lastname, surname}) =>
                        <TeachersItem key={"id__" + id} id={id}
                                      firstname={firstname}
                                      lastname={lastname}
                                      surname={surname}/>)
                }
                {
                    storage.teachers.length === 0 && <p>Преподавателей пока нет</p>
                }
            </ListGroup>

            <TeacherModal show={modalVisible} onHide={() => setModalVisible(false)}/>
        </Container>
    );
});

export default Teachers;