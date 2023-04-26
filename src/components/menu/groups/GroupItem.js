import React from 'react';
import {ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {GROUP_URL} from "../../../api/url";

const GroupItem = ({id, name}) => {

    const navigate = useNavigate();

    return (
        <ListGroup.Item as="li" style={{cursor: "pointer"}} onClick={() => navigate(GROUP_URL + "/" + id)}>
            {name}
        </ListGroup.Item>
    );
};

export default GroupItem;