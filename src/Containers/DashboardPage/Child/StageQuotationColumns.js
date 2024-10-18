import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Draggable } from "react-beautiful-dnd";
import { BundleLoader } from "../../../Components/Placeholder";
import { elipsize } from "../../../Helpers/Function/Functions";
const QuotationGroupCard =lazy(() =>import("../Child/QuotationGroupCard"));

class StageColumns1 extends Component {
  render() {
    const { opportunity, index, history } = this.props;
    return (
      <Draggable
      draggableId={opportunity.opportunityId}
      index={index}
      type="stage"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
  <Suspense fallback={<BundleLoader />}>
            <QuotationGroupCard
              isDragging={snapshot.isDragging}
              opportunityId={opportunity.opportunityId}
              primaryTitle={`${elipsize(opportunity.opportunityName, 60)}`} 
              secondaryTitle={`${opportunity.proposalAmount} `}
              currencyType={opportunity.currency}
              customerName={opportunity.customer}
              contactName={opportunity.contactName}
              user={this.props.user}
            //   handleClick={() =>
            //     history.push({
            //       pathname: `opportunity/${opportunity.opportunityId}`,
            //       state: { opportunityDetail: opportunity },
            //     })
            //   }
            //    handleWon={() => {
            //     this.props.StatusRecruit(opportunity.opportunityId, {
            //       wonInd:true
            //     })
            //   }}
            //   handleConfirm ={() => {
            //     this.props.lostStatusRecruit(opportunity.opportunityId, {
            //       lostInd: true
            //     })
            //   }}
            //   handleDelete={()=>{
            //     this.props.deleteOpportunityData(opportunity.opportunityId)
            //   }}
            />
             </Suspense>
            </div>
            )}
                 </Draggable>
         
    );
  }
}
const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
        //  StatusRecruit,
        //  lostStatusRecruit,
        //  deleteOpportunityData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(StageColumns1); ;
