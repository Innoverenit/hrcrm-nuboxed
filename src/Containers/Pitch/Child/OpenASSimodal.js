import React, {Suspense,lazy,useEffect } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import {handlePitchActivityModal,
  // getPitchActivityRecords
} from "../PitchAction"
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Tooltip,Badge } from "antd";
import PitchCETTab from "./PitchDetails/PitchCETTab";
const PitchTimeline =lazy(()=>import("../../Pitch/Child/PitchTimeline"));
const AddPitchActivityModal =lazy(()=>import("./PtchActivity/AddPitchActivityModal"));

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


