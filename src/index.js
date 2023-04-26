import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {User} from "./storage/userStoreage";
import {GeneralStorage} from "./storage/generalStorage";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new User(),
            storage: new GeneralStorage()
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>
);
