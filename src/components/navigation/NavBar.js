import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {MENU_URL} from "../../api/url";


const NavBar = observer(() => {

    const {user} = useContext(Context);

    return (
        <Navbar bg="light" expand="lg" style={{marginBottom: "20px"}}>

            <Container>
                <Navbar.Brand>Админ панель</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                {
                    !user.isAuth && (
                        <Navbar.Collapse className="justify-content-end">
                            <Button href={"/login"}>
                                Войти в аккаунт
                            </Button>
                        </Navbar.Collapse>
                    )
                }
                {
                    user.isAuth && (
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                <Nav.Link href={MENU_URL}>Главное меню</Nav.Link>
                            </Nav>
                            <Nav.Item>
                                Signed in as: {user.user.firstname} {user.user.surname}
                            </Nav.Item>
                        </Navbar.Collapse>
                    )
                }
            </Container>
        </Navbar>
    );
});
export default NavBar;