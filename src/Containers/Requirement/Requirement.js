import React, { Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RequirementHeader from "./RequirementHeader";
import AllRequirementTable from "../Requirement/AllRequirementTable"

import {
    getRecruitByOpportunityId,
  } from "../Opportunity/OpportunityAction";

  import { setRequirementViewType } from "./RequirementAction";
import AddRecruitModal from "../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/AddRecruitModal";
class Requirement extends Component  {
    state = { currentData: undefined,responseData:null,text:undefined,currentSkillData: "" };
    handleClear = () => {
        this.setState({ currentData: undefined });
        this.props.getRecruitByOpportunityId(this.props.opportunityId);
      };
      setCurrentData = (value) => {
        this.setState({ currentData: value });
        console.log(value)
      };
   handleChange = (e) => {
    this.setState({ currentData: e.target.value })
  };
      render() {
        const {
            viewType,
            setRequirementViewType,
          } = this.props;
    return (
        <>
        <RequirementHeader
        viewType={viewType}
        setRequirementViewType={setRequirementViewType}
        handleClear={this.handleClear}
        handleChange={this.handleChange}
        currentData={this.state.currentData}
        text={this.state.text}
        setCurrentData={this.setCurrentData}
        />
        <AddRecruitModal
         viewType={viewType}/>
        <AllRequirementTable/>
        </>
    ); 
 }
}
const mapStateToProps = ({ requirement,opportunity }) => ({
  viewType:requirement.viewType,
  opportunityId: opportunity.opportunity.opportunityId,
   
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getRecruitByOpportunityId,
        setRequirementViewType,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(Requirement);