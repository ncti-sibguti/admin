import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {Button, Container, Form} from 'react-bootstrap';
import {MENU_URL} from "../../api/url";
import {login} from "../../api/api";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const signup = async (e) => {
        e.preventDefault()
        try {
            let data = await login(username, password);
            user.isAuth = true;
            user.user = data;
            navigate(MENU_URL)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <Container>
            {

                location.pathname === "/login" ?
                    (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Имя пользователя или Email</Form.Label>
                                <Form.Control placeholder="Enter email" value={username}
                                              onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e) => signup(e)}>
                                Войти
                            </Button>
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Имя пользователя или Email</Form.Label>
                                <Form.Control placeholder="Enter email" value={username}
                                              onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Имя пользователя или Email</Form.Label>
                                <Form.Control placeholder="Enter email" value={username}
                                              onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Имя пользователя или Email</Form.Label>
                                <Form.Control placeholder="Enter email" value={username}
                                              onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e) => signup(e)}>
                                Войти
                            </Button>
                        </Form>
                    )
            }
        </Container>

    );
});

export default Auth;