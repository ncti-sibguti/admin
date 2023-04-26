import React, {useContext, useEffect} from 'react';
import {Context} from "../../../index";
import {getTeachers} from "../../../api/api";
import {observer} from "mobx-react-lite";
import {Container, ListGroup} from "react-bootstrap";
import TeachersItem from "./TeachersItem";

const Teachers = observer(() => {

    const {storage} = useContext(Context);

    useEffect(() => {
        getTeachers().then(data => storage.teachers = data)
    }, [storage])

    return (
        <Container>
            <ListGroup as="ul">
                {
                    storage.teachers.map(({id, firstname, lastname, surname}) =>
                        <TeachersItem key={id} id={id}
                                      firstname={firstname}
                                      lastname={lastname}
                                      surname={surname}/>)
                }
            </ListGroup>
        </Container>
    );
});

export default Teachers;