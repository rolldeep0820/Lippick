import React, { useState, useEffect } from "react";
import "./BootNav.scss";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ReactComponent as Lippick } from "../img/lippick4.svg";
import { BiSearchAlt } from "react-icons/bi";
import { connect } from "react-redux";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../cookies";
import { withRouter } from "react-router-dom";

function BootNav(props) {
    let [loginCheck, setLoginCheck] = useState(false);
    let [dropTG, setDropTG] = useState(false);
    let [isAuth, setIsAuth] = useState(false);

    axios.get("/api/users/auth").then((response) => {
        console.log(response.data.isAuth);
        setIsAuth(response.data.isAuth);
        console.log(isAuth);
    });

    useEffect(() => {
        console.log(isAuth);
    }, [isAuth]);

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        maxHeight: "75px",
    };

    const onClickHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            props.history.push("/home");
        });
    };

    return (
        <>
            <Navbar
                bg="light"
                variant="light"
                className={`${props.navTG ? "navON" : "nav-wrap"}`}
                onMouseEnter={() => {
                    props.dispatch({ type: "nav-on" });
                }}
                onMouseLeave={() => {
                    props.dispatch({ type: "nav-off" });
                }}
            >
                <Container className="nav-container">
                    <button
                        className={`search-btn ${props.navTG ? "cb" : "cw"}`}
                        onClick={() => {
                            props.dispatch({ type: "expand-on" });
                            props.dispatch({ type: "bg-on" });
                        }}
                    >
                        <BiSearchAlt />
                        <span>검색</span>
                    </button>
                    <div className="logo-wrap">
                        <Link
                            to="/home"
                            style={linkStyle}
                            onClick={() => {
                                props.dispatch({ type: "nav-off" });
                            }}
                        >
                            <Navbar.Brand>
                                <div className="logo-box">
                                    <Lippick
                                        className={`${
                                            props.navTG ? "fb" : "fw"
                                        }`}
                                    />
                                </div>
                            </Navbar.Brand>
                        </Link>

                        <div
                            className={`logo-menu ${props.navTG ? "cb" : "cw"}`}
                        >
                            <Link to="/lipstick" style={linkStyle}>
                                <span>립스틱</span>
                            </Link>
                            <Link to="/liquid" style={linkStyle}>
                                <span>리퀴드</span>
                            </Link>
                            <Link to="/gloss" style={linkStyle}>
                                <span>립 글로스</span>
                            </Link>
                            <Link to="/care" style={linkStyle}>
                                <span>립 케어</span>
                            </Link>
                        </div>
                    </div>

                    <Nav className="nav-menu">
                        {isAuth && dropTG && (
                            <div className="balloon">
                                <ul>
                                    <li>
                                        <span className="balloon-item">
                                            위시리스트
                                        </span>
                                    </li>
                                    <li>
                                        <span className="balloon-item">
                                            장바구니
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            className="balloon-item"
                                            onClick={onClickHandler}
                                        >
                                            로그아웃
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <Nav.Link
                            className={`nav-item ${props.navTG ? "cb" : "cw"}`}
                        >
                            <Link to="/wishlist" style={linkStyle}>
                                <AiOutlineHeart />
                            </Link>
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-item ${props.navTG ? "cb" : "cw"}`}
                        >
                            {isAuth ? (
                                <Link
                                    to="#"
                                    style={linkStyle}
                                    onClick={() => {
                                        setDropTG(!dropTG);
                                        console.log(dropTG);
                                    }}
                                >
                                    <AiOutlineUser />
                                </Link>
                            ) : (
                                <Link
                                    to="#"
                                    style={linkStyle}
                                    onClick={() => {
                                        props.dispatch({ type: "bg-on" });
                                        props.dispatch({ type: "login-on" });
                                        props.dispatch({ type: "nav-off" });
                                        props.dispatch({ type: "pause" });
                                    }}
                                >
                                    <AiOutlineUser />
                                </Link>
                            )}
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-item ${props.navTG ? "cb" : "cw"}`}
                        >
                            <Link to="/bag" style={linkStyle}>
                                <BsHandbag />
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

function stateprops(state) {
    return {
        navTG: state.reducer1,
        playing: state.reducer3,
        expand: state.reducer5,
        bg: state.reducer6,
        login: state.reducer8,
    };
}

export default withRouter(connect(stateprops)(BootNav));
