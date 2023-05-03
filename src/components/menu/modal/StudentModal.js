import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createStudent, createStudentWithFile} from "../../../api/api";

const StudentModal = ({show, onHide}) => {

    const [isFile, setIsFile] = useState(false);

    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [group, setGroup] = useState("")

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleCheckboxChange = (event) => {
        setIsFile(event.target.checked);
    }

    const save = async () => {
        if (isFile)
            await createStudentWithFile(selectedFile);
        else
            await createStudent(firstname, lastname, surname, email, password, group);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить студента
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {
                        isFile &&
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} multiple/>
                        </Form.Group>
                    }

                    {
                        !isFile &&
                        (
                            <>
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
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder="Пароль" value={password}
                                                  onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Группа</Form.Label>
                                    <Form.Control type="email" value={group} placeholder="Группа"
                                                  onChange={(e) => setGroup(e.target.value)}/>
                                </Form.Group>
                            </>
                        )
                    }

                    <Form.Check
                        type="checkbox"
                        checked={isFile}
                        label="Добавить студентов через файл .csv"
                        onChange={handleCheckboxChange}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={save}>Добавить</Button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudentModal;