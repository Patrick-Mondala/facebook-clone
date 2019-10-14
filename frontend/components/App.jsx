import React from "react";
import Main from './main';
import NavBar from './nav/navbar';

//App
export default () => (
    <div>
        <NavBar />
        <Main />
    </div>
);
//removed greetingcontainer, use to reference displaying depending on loggedin