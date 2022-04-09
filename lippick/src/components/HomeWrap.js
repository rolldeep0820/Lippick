import React from "react";
import { Container } from "react-bootstrap";
import HomeContent1 from "./HomeContent1";
import HomeContent2 from "./HomeContent2.js";
import HomeMain from "./HomeMain";
import "./HomeWrap.scss";

function HomeWrap() {
  return (
    <Container className="home-wrap">
      <HomeMain />
      <HomeContent1 />
      <HomeContent2 />
    </Container>
  );
}

export default HomeWrap;
