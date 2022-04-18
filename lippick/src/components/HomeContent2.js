import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./HomeContent2.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Lippick } from "../img/lippick4.svg";
import { reverse } from "@tensorflow/tfjs";

function HomeContent2(props) {


  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    setSearchTerm("립스틱");
    props.refreshFunction("립스틱");
  },[])
  const searchClickHandler = (e) => {
    if (e === null) {
      setSearchTerm("");
      props.refreshFunction("");
      console.log(e.target.innerText);
    } else {
      setSearchTerm(e.target.innerText);
      props.refreshFunction(e.target.innerText);
      console.log(e.target.innerText);
    }
  };

  const products2 = props.Products.slice(0,3);

  return (
    <div className="content2-wrap">
      <div className="content2-box">
        <div className="content2-title">
          <h2>립픽 추천 제품</h2>
        </div>
        <div className="content2-tap-wrap">
          <ul className="content2-tap">
            <li
              className={`${props.tap[0] && "tap-on"}`}
              onClick={() => {
                props.dispatch({ type: "on-1" });
                searchClickHandler(null);
              }}
            >
              립스틱
            </li>
            <li
              className={`${props.tap[1] && "tap-on"}`}
              onClick={(e) => {
                props.dispatch({ type: "on-2" });
                searchClickHandler(e);
              }}
            >
              리퀴드
            </li>
            <li
              className={`${props.tap[2] && "tap-on"}`}
              onClick={(e) => {
                props.dispatch({ type: "on-3" });
                searchClickHandler(e);
              }}
            >
              립글로스
            </li>
            <li
              className={`${props.tap[3] && "tap-on"}`}
              onClick={(e) => {
                props.dispatch({ type: "on-4" });
                searchClickHandler(e);
              }}
            >
              립케어
            </li>
          </ul>
        </div>

        <div className="content2-contents">
          <div className="content2-contents-left-wrap">
            <div className="content2-contents-left-top"></div>
            <div className="content2-contents-left-bottom"></div>
          </div>

          <div className="content2-contents-right-wrap">
            {products2.map((product) => {
              return (
                <div className="content2-contents-right-img">
                  <img
                    src={`http://localhost:5000/${product.images[0]}`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function stateprops(state) {
  return {
    bg: state.reducer6,
    tap: state.reducer9,
  };
}

export default connect(stateprops)(HomeContent2);
