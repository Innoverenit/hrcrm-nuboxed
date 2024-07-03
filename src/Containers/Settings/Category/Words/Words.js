import React, {lazy } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const WordsCard = lazy(()=>import("./WordsCard"));

function Words (props) {

    return (
        <>
<WordsCard/>
        </>
    )
}

const mapStateToProps = ({}) => ({
   
  });
  const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(Words);