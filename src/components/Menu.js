import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {GROUPS_URL, SUBJECTS_URL, TEACHERS_URL} from "../api/url";

const Menu = () => {
    return (
        <Container>
            <Row>
                <Col md={1}>
                    <Button href={GROUPS_URL} className={"mb-3"}>
                        Группы
                    </Button>
                    <Button href={TEACHERS_URL} className={"mb-3"}>
                        Преподаватели
                    </Button>
                    <Button href={SUBJECTS_URL} className={"mb-3"}>
                        Предметы
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Menu;