
import ReactDOM from "react-dom";
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from "./nav";
import Welcome from "./welcome";
import UserInfo from "./userInfo";
import Chat from "./chat";
import Login from "./login";

function App() {

    return (
    <>
        <Router>
            <Nav/>
                <Switch>
                    <Route path="/" exact component={Welcome}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/userInfo" component={UserInfo}/>
                    <Route path="/chat" component={Chat}/>
                </Switch>

        </Router>

    </>
    )
}


ReactDOM.render(<App/>, document.getElementById("root"))