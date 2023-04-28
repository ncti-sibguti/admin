import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom"
import {Context} from "./index";
import {authRouters, publicRouters} from "./routes";
import {LOGIN_URL, MENU_URL} from "./api/url";
import Menu from "./components/Menu";

const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Routes>

            <Route
                path={MENU_URL}
                element={!user.isAuth ? <Navigate to={LOGIN_URL}/> : <Menu/>}
            />

            {user.isAuth && authRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>)}
            {publicRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>)}

        </Routes>
    );
};

export default AppRouter;