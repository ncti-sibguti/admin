import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Tab, Tabs} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {deleteGroupById, getGroupById, getTeachers} from "../../../api/api";
import {MENU_URL} from "../../../api/url";
import {Context} from "../../../index";
import Schedule from "./Schedule";
import Students from "../students/Students";

const Group = () => {
    const params = useParams();
    const navigate = useNavigate();

    const {storage} = useContext(Context)

    const [name, setName] = useState("")

    const [group, setGroup] = useState({
        name: "",
        schedule: []
    });

    useEffect(() => {
        getGroupById(params.id).then(data => setGroup(data));
        getTeachers().then(data => storage.teachers = data)
        setName(group.name)
    }, [params.id, group.name, storage])

    const view = (e) => {
        e.preventDefault()
    }

    const deleteGroup = async () => {
        await deleteGroupById(params.id);
        navigate(MENU_URL)
    }


    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Название группы</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Название группы"
                                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={view}>
                    Сохранить
                </Button>
                <Button variant="danger" type="submit" onClick={(e) => deleteGroup(e)}>
                    Удалить
                </Button>
            </Form>

            <Tabs
                defaultActiveKey="schedule"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="students" title="Студенты">
                    <Students group={params.id}/>
                </Tab>
                <Tab eventKey="schedule" title="Расписания">
                    <Schedule id={params.id} schedule={group.schedule} storage={storage}/>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Group;