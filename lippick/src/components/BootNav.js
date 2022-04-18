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
import UploadProduct from "./UploadProduct";

function BootNav(props) {
  let [loginCheck, setLoginCheck] = useState(false);
  let [dropTG, setDropTG] = useState(false);
  let [isAuth, setIsAuth] = useState(false);

  axios.get("/api/users/auth").then((response) => {
    setIsAuth(response.data.isAuth);
  });

 

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    maxHeight: "75px",
  };

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      alert("로그아웃 되었습니다.");
      sessionStorage.clear();
      props.history.push("/home");
    });
  };
  let nav = document.getElementById('nav-bar')

  let ctarget = document.getElementsByClassName('ctarget')
  
  let ftarget = document.getElementById("ftarget")

  const onMouseEnterHandler = () =>{


    nav.className ="navON navbar navbar-expand navbar-light bg-light"
  }

  const onMouseLeaveHandler = () =>{

    
    nav.className ="nav-wrap navbar navbar-expand navbar-light bg-light"
  }


  const cb = () =>{

    for(var i = 0; i<ctarget.length; i++){
      ctarget[i].classList.remove('cw')
      ctarget[i].classList.add("cb")
    }
    

  }


  const cw = () =>{
    for(var i = 0; i<ctarget.length; i++){
      ctarget[i].classList.remove('cb')
      ctarget[i].classList.add("cw")
    }
  
  }
  
  const fb = () => {
    ftarget.classList.remove("fw");
    ftarget.classList.add("fb");

  }

  const fw = () => {
    ftarget.classList.remove("fb");
    ftarget.classList.add("fw")

  }
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        className="nav-wrap"
        id="nav-bar"
        onMouseEnter={() => {onMouseEnterHandler(); cb(); fb();}}
        onMouseLeave={() => {onMouseLeaveHandler(); cw(); fw();}}
      >
        <Container className="nav-container">
          <button
            className={`search-btn ctarget`}
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
                <div className="logo-box" id="ftarget">
                  <Lippick  />
                </div>
              </Navbar.Brand>
            </Link>

            <div className={`logo-menu ctarget`}>
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
              <div
                className="balloon"
                onMouseLeave={() => {
                  setDropTG(false);
                }}
              >
                <ul>
                  <li>
                    <span className="balloon-item">위시리스트</span>
                  </li>
                  <li>
                    <span className="balloon-item">장바구니</span>
                  </li>
                  <li>
                    <span className="balloon-item" onClick={onClickHandler}>
                      로그아웃
                    </span>
                  </li>
                </ul>
              </div>
            )}
            <Nav.Link className={`nav-item ctarget`}>
              <Link to="/wishlist" style={linkStyle}>
                <AiOutlineHeart />
              </Link>
            </Nav.Link>
            <Nav.Link className={`nav-item ctarget`}>
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
            <Nav.Link className={`nav-item ctarget`}>
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
    playing: state.reducer3,
    expand: state.reducer5,
    bg: state.reducer6,
    login: state.reducer8,
  };
}

export default withRouter(connect(stateprops)(BootNav));
