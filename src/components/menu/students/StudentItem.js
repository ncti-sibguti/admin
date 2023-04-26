import React from 'react';
import {ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {STUDENT_URL} from "../../../api/url";

const StudentItem = ({id, firstname, lastname, surname}) => {

    let string = `${lastname} ${firstname} ${surname}`;

    const navigate = useNavigate();

    return (
        <ListGroup.Item as="li" style={{cursor: "pointer"}} onClick={() => navigate(STUDENT_URL + "/" + id)}>
            {string}
        </ListGroup.Item>
    );
};

export default StudentItem;