import React from "react";
import { connect } from "react-redux";

function BG(props) {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: "500",
      }}
      onClick={() => {
        props.dispatch({ type: "bg-off" });

        props.dispatch({ type: "nav-off" });

        setTimeout(props.dispatch({type:"expand-off"}),3000)
      }}
    ></div>
  );
}

function stateprops(state) {
  return {
    bg: state.reducer6,
    expand: state.reducer5,
  };
}

export default connect(stateprops)(BG);
