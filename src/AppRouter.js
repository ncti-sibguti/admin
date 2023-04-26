import React, {useContext} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom"
import {Context} from "./index";
import {authRouters, publicRouters} from "./routes";
import Auth from "./components/auth/Auth";
import {LOGIN_URL} from "./api/url";

const AppRouter = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    return (
        <Routes>

            {
                user.isAuth ?
                    <>

                        {user.isAuth && authRouters.map(({path, Component}) => <Route key={path} path={path}
                                                                                      element={<Component/>}/>)}
                    </> :
                    <>
                        {publicRouters.map(({path, Component}) => <Route key={path} path={path}
                                                                         element={<Component/>}/>)}
                        {
                            navigate(LOGIN_URL)
                        }
                    </>
            }

            <Route path={"*"} element={<Auth/>}/>
        </Routes>
    );
};

export default AppRouter;