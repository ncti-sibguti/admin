import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const ScheduleEditModal = ({show, onHide, subject}) => {
    const save = async () => {
        console.log(subject)
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
                    Изменить пару
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    subject.length !== 0 && (
                        <Form>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Предмет</Form.Label>
                                <Form.Control value={subject.subject} type="text" placeholder="Предмет"/>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Преподаватель</Form.Label>
                                <Form.Control
                                    value={`${subject.teacher?.lastname} ${subject.teacher?.firstname} ${subject.teacher?.surname}`}
                                    type="text" placeholder="Преподаватель"/>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Кабинет</Form.Label>
                                <Form.Control value={subject.classroom} type="text" placeholder="Кабинет"/>
                            </Form.Group>
                        </Form>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={save}>Сохранить</Button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ScheduleEditModal;