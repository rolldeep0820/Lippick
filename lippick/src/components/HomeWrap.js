import React from "react";
import { Container } from "react-bootstrap";
import HomeContent1 from "./HomeContent1";
import HomeMain from "./HomeMain";
import "./HomeWrap.scss";

function HomeWrap() {
  return (
    <Container className="home-wrap">
      <HomeMain />
      <HomeContent1 />
    </Container>
  );
}

export default HomeWrap;
