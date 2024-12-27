import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PlannerSharedForm from "./PlannerSharedForm";
import { StyledSelect } from "../../../Components/UI/Antd";


const Option = StyledSelect.Option;

const PlannerActionRight = (props) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
        {props.user.dashboardFullListInd === true &&(
       <PlannerSharedForm
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
       />
       )} 
      &nbsp;
      
      &nbsp;
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.userDetails,
  // userType: auth.userDetails && auth.userDetails.userType,
  userType: auth.userDetails,


});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PlannerActionRight);
