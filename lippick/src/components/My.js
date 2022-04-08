import React from "react";
import { connect } from "react-redux";
import BG from "./BG";
import "./My.scss"

function My(props){

    return(

        <div className="my-wrap">
            {props.bg && <BG/>}

            <div className="my-box">

                
            </div>

        </div>
    )
}



function stateprops(state) {
    return {
      bg:state.reducer6
    };
  }
  
  export default connect(stateprops)(My);
  