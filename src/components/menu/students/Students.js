import React, {useContext, useEffect} from 'react';
import {Container, ListGroup} from 'react-bootstrap';
import {Context} from "../../../index";
import {getStudents} from "../../../api/api";
import {observer} from "mobx-react-lite";
import Student from "./StudentItem";

const Students = observer(({group}) => {

    const {storage} = useContext(Context);

    useEffect(() => {
        getStudents(group).then(data => storage.students = data)
    }, [group, storage])

    return (
        <Container>
            <ListGroup as="ul">
                {
                    storage.students && storage.students.map(({id, firstname, lastname, surname}) =>
                        <Student key={"id__" + id} id={id} firstname={firstname} lastname={lastname} surname={surname}/>)
                }
            </ListGroup>
        </Container>
    );
});

export default Students;