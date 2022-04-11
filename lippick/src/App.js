import React from "react";
import "./App.css";
import ImageView from "./components/ImageView";
import BootNav from "./components/BootNav";
import { connect } from "react-redux";
import ExpandNav from "./components/ExpandNav";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import {  Route, Switch } from "react-router-dom";
import HomeWrap from "./components/HomeWrap";
import Footer from "./components/Footer.js";
import Auth from "./hoc/auth"

function App(props) {
  return (
    <div className="App">
      {props.login && <LoginPage/>}
      <Route path="/:id">{props.expand ? <ExpandNav /> : <BootNav />}</Route>
      <Route path="/home">
        <HomeWrap />
        
      </Route>
      

      <Switch>
        <Route path="/personal">
          <ImageView />
        </Route>

      

        <Route path="/register">
          <RegisterPage />
        </Route>
      </Switch>
      <Route path="/:id">
        <Footer />
      </Route>
    </div>
  );
}

function stateprops(state) {
  return {
    navTG: state.reducer1,
    expand: state.reducer5,
    login:state.reducer8,
  };
}

export default connect(stateprops)(App);
