import React from "react";
import Main from './main';
import NavBar from './nav/navbar';
import Modal from './modal/modal';

//App
export default () => (
    <div>
        <Modal />
        <NavBar />
        <Main />
    </div>
);
//removed greetingcontainer, use to reference displaying depending on loggedin