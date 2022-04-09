import React, { useEffect } from "react";
import "./BootNav.scss";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ReactComponent as Lippick } from "../img/lippick4.svg";
import { BiSearchAlt } from "react-icons/bi";
import { connect } from "react-redux";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";

function BootNav(props) {
  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    maxHeight: "75px",
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
                  <Lippick className={`${props.navTG ? "fb" : "fw"}`} />
                </div>
              </Navbar.Brand>
            </Link>

            <div  className={`logo-menu ${props.navTG ? "cb" : "cw"}`} >

              <Link to="/lipstick" style={linkStyle}><span>립스틱</span></Link>
              <Link to="/liquid" style={linkStyle}><span>리퀴드</span></Link>
              <Link to="/gloss" style={linkStyle}><span>립 글로스</span></Link>
              <Link to="/care" style={linkStyle}><span>립 케어</span></Link>

            </div>
          </div>

          <Nav className="nav-menu">
            <Nav.Link className={`nav-item ${props.navTG ? "cb" : "cw"}`}>
              <Link to="/wishlist" style={linkStyle}>
                <AiOutlineHeart />
              </Link>
            </Nav.Link>
            <Nav.Link className={`nav-item ${props.navTG ? "cb" : "cw"}`}>
              <Link to="/my" style={linkStyle} onClick={()=>{props.dispatch({type:"bg-on"}); props.dispatch({type:"my-on"})}}>
                <AiOutlineUser />
              </Link>
            </Nav.Link>
            <Nav.Link className={`nav-item ${props.navTG ? "cb" : "cw"}`}>
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
    expand: state.reducer5,
    myTG:state.reducer8,
  };
}

export default connect(stateprops)(BootNav);
