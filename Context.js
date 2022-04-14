import React from "react";
import mysql from "mysql2";

const Context = React.createContext();

function ContextProvider(props){
    let connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
      
        console.log('Connected to the MySQL server.');
      });
    let states = {orm:{models:[Coin]}};
    //let states = {};
    return (
        <Context.Provider value={{
            states
        }}>
          {props.children}
        </Context.Provider>
    );
}

export {Context, ContextProvider}