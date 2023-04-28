import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import {Context} from "../index";

const Profile = () => {

    const {user} = useContext(Context)

    const [lastname, setLastname] = useState(user.user.lastname)
    const [firstname, setFirstname] = useState(user.user.firstname)
    const [surname, setSurname] = useState(user.user.surname)
    const [email, setEmail] = useState(user.user.email)

    return (<Container>
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
        </Form>
    </Container>);
};

export default Profile;