import React from 'react';
import {ListGroup} from "react-bootstrap";
import {GROUP_URL} from "../../../api/url";
import {useNavigate} from "react-router-dom";

const SubjectItem = ({id, name}) => {

    const navigate = useNavigate();

    return (
        <ListGroup.Item as="li" style={{cursor: "pointer"}} onClick={() => navigate(GROUP_URL + "/" + id)}>
            {id} {name}
        </ListGroup.Item>
    );
};

export default SubjectItem;