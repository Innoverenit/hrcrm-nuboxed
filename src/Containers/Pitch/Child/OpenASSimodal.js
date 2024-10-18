import React, {Suspense,lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledTabs } from "../../../Components/UI/Antd";
import {handlePitchActivityModal,
} from "../PitchAction"
import PitchCETTab from "./PitchDetails/PitchCETTab";
const TabPane = StyledTabs.TabPane;

function  OpenASSimodal(props)  {
console.log("data",props.rowdata.name)


  return (
    <>
      <StyledDrawer
        title={props.rowdata.firstName}
        width="60%"
        visible={props.openASSImodal}
        onClose={() => {
          props.handleAssimodal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <PitchCETTab rowdata={props.rowdata}/>
         
        </Suspense>
      </StyledDrawer>
    </>
  );



};

const mapStateToProps = ({ pitch }) => ({
  addPitchactivityModal: pitch.addPitchactivityModal,
  pitchActivityCount:pitch.pitchActivityCount

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handlePitchActivityModal,
      // getPitchActivityRecords
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpenASSimodal);


