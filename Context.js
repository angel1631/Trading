import React from "react";
import { Sequelize, Model, DataTypes } from 'sequelize';

const Context = React.createContext();

function ContextProvider(props){
    
    let states = {};
    return (
        <Context.Provider value={{
            states
        }}>
          {props.children}
        </Context.Provider>
    );
}

export {Context, ContextProvider}