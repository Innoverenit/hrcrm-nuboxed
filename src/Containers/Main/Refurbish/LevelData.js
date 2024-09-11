import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getLevelData} from "./RefurbishAction"
import { refurbishReducer } from "./RefurbishReducer";

function LevelData(props) {
    useEffect(() => {
        props.getLevelData(props.phoneId,props.currentLevel)  
      }, []);
  return (
    <div>LevelData</div>
  )
}

const mapStateToProps = ({ auth, account,refurbish, opportunity }) => ({
    levelData:refurbish.levelData,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getLevelData
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(LevelData);

