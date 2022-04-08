import React, { useEffect } from "react";
import { connect } from "react-redux";


function Test(props){

    useEffect(()=>{

        props.dispatch({type:"nav-on"})

    },[props.navTG])

    return(
        <div style={{backgroundColor:"red", width:"100%",height:"3000px"}}>

        </div>
    )
}

function stateprops(state) {
    return {
      navTG:state.reducer1
    };
  }
  
  export default connect(stateprops)(Test);
  