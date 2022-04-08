import React from "react";
import { connect } from "react-redux";
import "./HomeContent2.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Lippick } from "../img/lippick4.svg";

function HomeContent2(props) {
  return (
    <div className="content2-wrap">
      <div className="content2-box">
        <div className="content2-title">
          <h2>립픽 추천 제품</h2>
        </div>
        <div className="content2-tap-wrap">
          <ul className="content2-tap">
            <li className={`${props.tap[0] && "tap-on"}`} onClick={()=>{props.dispatch({type:"on-1"})}}>립스틱</li>
            <li className={`${props.tap[1] && "tap-on"}`} onClick={()=>{props.dispatch({type:"on-2"})}}>리퀴드</li>
            <li className={`${props.tap[2] && "tap-on"}`} onClick={()=>{props.dispatch({type:"on-3"})}}>립 글로스</li>
            <li className={`${props.tap[3] && "tap-on"}`} onClick={()=>{props.dispatch({type:"on-4"})}}>립 케어</li>
          </ul>
        </div>

        <div className="content2-contents">

          <div className="content2-contents-left-wrap">
            <div className="content2-contents-left-top"></div>
            <div className="content2-contents-left-bottom"></div>

          </div>

          <div className="content2-contents-right-wrap">

            <div className="content2-contents-right-1"></div>
            <div className="content2-contents-right-2"></div>
            <div className="content2-contents-right-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function stateprops(state) {
  return {
    bg: state.reducer6,
    tap:state.reducer9,
  };
}

export default connect(stateprops)(HomeContent2);
