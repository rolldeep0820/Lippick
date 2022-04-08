import React from "react";
import "./App.css";
import ImageView from "./components/ImageView";
import BootNav from "./components/BootNav";
import HomeMain from "./components/HomeMain";
import { connect } from "react-redux";
import ExpandNav from "./components/ExpandNav";
import { Transition } from "react-transition-group";
import Test from "./components/Test.js";
import LoginPage from './components/LoginPage';
import RegisterPage from "./components/RegisterPage";

import { Link, Route, Switch } from "react-router-dom";
import HomeContent1 from "./components/HomeContent1";
import HomeWrap from "./components/HomeWrap";
import Footer from "./components/Footer.js";
import My from "./components/My";

function App(props) {
  return (
    <div className="App">
      <Route path="/:id">{props.expand ? <ExpandNav /> : <BootNav />}</Route>
      <Route path="/home">
          <HomeWrap/>
        </Route>
      <Route path="/homemy">
        <My/>
      </Route>

      
      <Switch>


        


        <Route path="/personal">
          <ImageView/>
        </Route>

        <Route path="/login">
          <LoginPage/>
        </Route>

        <Route path="/register">
          <RegisterPage/>
        </Route>
      </Switch>
      <Route path="/:id"><Footer/></Route>
      
    </div>
  );
}

function stateprops(state) {
  return {
    navTG: state.reducer1,
    expand: state.reducer5,
  };
}

export default connect(stateprops)(App);
