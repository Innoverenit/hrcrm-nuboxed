import React, { } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../../Components/UI/Layout";

function OpportunityDetailActionRight(props) {
  // useEffect(() => {
  //   props.dropOpportunity(props.opportunity.opportunityId);
  // }, []);
  const { opportunity, fetchingOpportunityById } = props;
  console.log(opportunity);
 
  return (
    <FlexContainer alignItems="center">
     
    </FlexContainer>
  );
}
const mapStateToProps = ({ opportunity }) => ({
  deleteOpportunity: opportunity.deleteOpportunity,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // dropOpportunity,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpportunityDetailActionRight)
);
