import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./MainBottom.scss";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function MainBottom(props) {


  return (
    <div className="high-wrap">
      <Container className="main-bottom-wrap">
        <Link to="/personal">
          <div className="link-box">
            <span>퍼스널 컬러 테스트</span>
          </div>
        </Link>
        <div className="icon-box">
          {props.muted ? (
            <BsFillVolumeMuteFill
              onClick={() => {
                props.dispatch({ type: "vol" });
              }}
            />
          ) : (
            <BsFillVolumeUpFill
              onClick={() => {
                props.dispatch({ type: "mute" });
              }}
            />
          )}
          {props.playing ? (
            <AiFillPauseCircle
              onClick={() => {
                props.dispatch({ type: "pause" });
              }}
            />
          ) : (
            <AiFillPlayCircle
              onClick={() => {
                props.dispatch({ type: "play" });
              }}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

function stateprops(state) {
  return {
    playing: state.reducer3,

    muted: state.reducer4,
  };
}

export default connect(stateprops)(MainBottom);
