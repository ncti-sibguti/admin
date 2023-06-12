import React from 'react';
import {ListGroup} from "react-bootstrap";
import {SUBJECT_URL} from "../../../api/url";
import {useNavigate} from "react-router-dom";

const SubjectItem = ({id, name}) => {

    const navigate = useNavigate();

    return (
        <ListGroup.Item as="li" style={{cursor: "pointer"}} onClick={() => navigate(SUBJECT_URL + "/" + id)}>
            {id} {name}
        </ListGroup.Item>
    );
};

export default SubjectItem;