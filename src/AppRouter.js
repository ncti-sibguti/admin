import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom"
import {Context} from "./index";
import {authRouters, publicRouters} from "./routes";

const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && authRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>)}
            {publicRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>)}
        </Routes>
    );
};

export default AppRouter;