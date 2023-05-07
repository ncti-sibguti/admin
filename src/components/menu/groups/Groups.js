import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, ListGroup} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {createGroup, getGroups} from "../../../api/api";
import GroupItem from "./GroupItem";
import ScheduleUploadModal from "../modal/ScheduleUploadModal";

const Groups = observer(() => {

    const {storage} = useContext(Context);

    const [name, setName] = useState("")

    useEffect(() => {
        getGroups().then(data => storage.groups = data)
    }, [storage])

    const post = async () => {
        let data = await createGroup(name);
        console.log(data);
    }

    const [show, setShow] = useState(false)

    return (
        <Container>

            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Название группы</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Название группы"
                                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={post}>
                    Сохранить
                </Button>
            </Form>


            <Button onClick={() => setShow(true)} variant={"outline-primary"} className={"mb-3"}>
                Загрузить расписание для групп
            </Button>

            <ScheduleUploadModal show={show} onHide={() => setShow(false)}/>

            <h1 className={"mt-3"}>Расписание</h1>

            <ListGroup as="ul">
                {
                    storage.groups.map(({id, name}) =>
                        <GroupItem key={id} id={id} name={name}/>)
                }
            </ListGroup>
        </Container>
    );
});

export default Groups;