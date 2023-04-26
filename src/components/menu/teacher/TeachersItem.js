import React from 'react';
import {ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {TEACHER_URL} from "../../../api/url";

const TeachersItem = ({id, firstname, lastname, surname}) => {
    let string = `${lastname} ${firstname} ${surname}`;
    const navigate = useNavigate();
    return (
        <ListGroup.Item as="li" style={{cursor: "pointer"}} onClick={() => navigate(TEACHER_URL + "/" + id)}>
            {string}
        </ListGroup.Item>
    );
};

export default TeachersItem;