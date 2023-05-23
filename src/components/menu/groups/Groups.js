import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {createGroup, getGroups} from "../../../api/api";
import ScheduleUploadModal from "../modal/ScheduleUploadModal";
import {GROUP_URL} from "../../../api/url";
import {useNavigate} from "react-router-dom";

const Groups = observer(() => {

    const {storage} = useContext(Context);

    const [name, setName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getGroups().then(data => storage.groups = data)
    }, [storage])

    const post = async () => {
        let data = await createGroup(name);
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

            <Table>
                <thead>
                <tr>
                    <th>Группа</th>
                    <th>Курс</th>
                    <th>Специальность</th>
                </tr>
                </thead>
                <tbody>
                {
                    storage.groups &&
                    storage.groups.map(({id, name, course, speciality}) => (
                        <tr style={{cursor: "pointer"}} onClick={() => navigate(GROUP_URL + "/" + id)}>
                            <td>{name}</td>
                            <td>{course}</td>
                            <td>{speciality && speciality.id} {speciality && speciality.name}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Container>
    );
});

export default Groups;