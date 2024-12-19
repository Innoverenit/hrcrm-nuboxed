import React, { Component, Suspense, lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRecruitByOpportunityId } from "../Opportunity/OpportunityAction";
import { setRequirementViewType,handleNwRecruitModal } from "./RequirementAction";
import AddNwRecruitModal from "./AddNwRecruitModal";
import RequirementTable from "./RequirementTable";
const RequirementHeader = lazy(() => import("./RequirementHeader"));
const AllRequirementTable = lazy(() => import("../Requirement/AllRequirementTable"));
const AddRecruitModal = lazy(() => import("../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/AddRecruitModal"));
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
            handleNwRecruitModal,
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
        handleNwRecruitModal={handleNwRecruitModal}
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}
        />
        <AddNwRecruitModal
        addNwRecruitModal={this.props.addNwRecruitModal}
        handleNwRecruitModal={this.props.handleNwRecruitModal}
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}
        />
          <Suspense fallback={"Loading..."}>
        {viewType === 'card' &&  <RequirementTable 
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
        />}
        {viewType === 'All' &&  <AllRequirementTable
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
        />}
        </Suspense>
        </>
    ); 
 }
}
const mapStateToProps = ({ requirement,opportunity }) => ({
  viewType:requirement.viewType,
  opportunityId: opportunity.opportunity.opportunityId,
  addNwRecruitModal: requirement.addNwRecruitModal,
   
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getRecruitByOpportunityId,
        setRequirementViewType,
        handleNwRecruitModal,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(Requirement);