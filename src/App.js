import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import AppRouter from "./AppRouter";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from "./api/api";

function App() {

    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem("refreshToken"))
            check().then(data => {
                user.user = data
                user.isAuth = true
            }).finally(() => setLoading(false))
        else setLoading(false);
    }, [user])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }


    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
