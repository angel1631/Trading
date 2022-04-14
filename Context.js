import React from "react";
import { Sequelize, Model, DataTypes } from 'sequelize';


const Context = React.createContext();

function ContextProvider(props){
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    });

    
        sequelize.authenticate().then((ok)=>{
            console.log('Coneccion con Base de datos. Ok');
        }).catch((error)=>{
            console.error('Error al conectarse con la DB:', error);
        });

    const Coin = sequelize.define('Coin', {
        name: DataTypes.STRING,
        symbol: DataTypes.STRING,
      });

    let states = {orm:{models:[Coin]}};
    return (
        <Context.Provider value={{
            states
        }}>
          {props.children}
        </Context.Provider>
    );
}

export {Context, ContextProvider}