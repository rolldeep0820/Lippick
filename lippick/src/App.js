import React from "react";
import "./App.css";
import ImageView from "./components/ImageView";
import BootNav from "./components/BootNav";
import { connect } from "react-redux";
import ExpandNav from "./components/ExpandNav";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import LandingPage from "./components/LandingPage";
import LandingLipstick from "./components/LandingLipstick";
import LandingLiquid from "./components/LandingLiquid";
import LandingGloss from "./components/LandingGloss";
import LandingCare from "./components/LandingCare";

import { Route, Switch } from "react-router-dom";
import HomeWrap from "./components/HomeWrap";
import Footer from "./components/Footer.js";
import Auth from "./hoc/auth";
import UploadProduct from "./components/UploadProduct";

function App(props) {
    return (
        <div className="App">
            {props.login && <LoginPage />}
            <Route path="/:id">
                {props.expand ? <ExpandNav /> : <BootNav />}
            </Route>
            <Route path="/home">
                <HomeWrap />
            </Route>

            <Switch>
                <Route path="/personal" component={Auth(ImageView, true)}>
                    {/* <ImageView /> */}
                </Route>
                <Route path="/personal1">
                    <ImageView />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="/product/upload">
                    <UploadProduct />
                </Route>
                <Route path="/all">
                    <LandingPage />
                </Route>
                <Route path="/lipstick">
                    <LandingLipstick />
                </Route>
                <Route path="/liquid">
                    <LandingLiquid />
                </Route>
                <Route path="/gloss">
                    <LandingGloss />
                </Route>
                <Route path="/care">
                    <LandingCare />
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
        login: state.reducer8,
    };
}

export default connect(stateprops)(App);
