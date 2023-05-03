import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {Button, Container, Form} from 'react-bootstrap';
import {LOGIN_URL, MENU_URL, REGISTER_URL} from "../../api/url";
import {login, register} from "../../api/api";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signup = async (e) => {
        e.preventDefault()
        try {
            let data;
            if (location.pathname === "/login") {
                data = await login(username, password);
                user.isAuth = true;
                user.user = data;
                navigate(MENU_URL)
            } else {
                const data = await register(username, password)
                console.log(data)
                navigate(LOGIN_URL)
            }
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
                                <Form.Label>Логин или Email</Form.Label>
                                <Form.Control placeholder="Enter email" value={username}
                                              onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>

                            <Link to={REGISTER_URL}>Регистрация</Link>

                            <Button variant="primary" type="submit" onClick={(e) => signup(e)}>
                                Войти
                            </Button>
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Логин</Form.Label>
                                <Form.Control placeholder="Login" value={username}
                                              onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>

                            <Link to={LOGIN_URL}>Авторизация</Link>

                            <Button variant="primary" type="submit" onClick={(e) => signup(e)}>
                                Регистрация
                            </Button>
                        </Form>
                    )
            }
        </Container>

    );
});

export default Auth;