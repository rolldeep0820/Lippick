import React from "react";
import "./ExpandNav.scss";
import { AiOutlineSearch } from "react-icons/ai";
import BG from "./BG";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";

function ExpandNav(props) {
  return (
    <div>
      {props.bg ? <BG /> : ""}

      <Transition in={props.expand} appear={props.expand} timeout={50}>
        {(status) => (
          <div className={`expand-nav-wrap expand-${status}`}>
            <div className="expand-top">
              <form className="expand-form">
                <AiOutlineSearch />
                <input type="text" placeholder="상품명을 입력해주세요." />
              </form>
            </div>

            <div className="expand-bottom"></div>
          </div>
        )}
      </Transition>
    </div>
  );
}

function stateprops(state) {
  return {
    bg: state.reducer6,
    expand: state.reducer5,
  };
}

export default connect(stateprops)(ExpandNav);
