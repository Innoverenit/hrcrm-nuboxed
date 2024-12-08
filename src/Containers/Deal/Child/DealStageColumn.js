import React, { Component,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { Draggable } from "react-beautiful-dnd";
import {deleteDealsData,sendToWon,lostRecruit} from "../DealAction";
const DealGroupCard =lazy(()=>import("./DealGroupCard"));

class DealStageColumn extends Component {
  render() {
    const { dealDetailsbyID, index, history } = this.props;
  
    return (
      <Draggable
      draggableId={dealDetailsbyID.invOpportunityId}
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
            <DealGroupCard
              isDragging={snapshot.isDragging}
              primaryTitle={`${dealDetailsbyID.opportunityName || ""}`}
              secondaryTitle={`${dealDetailsbyID.proposalAmount} `}
              currencyType={dealDetailsbyID.currency}
              user={this.props.user}
              investorName={dealDetailsbyID.investor}
              invOpportunityId={dealDetailsbyID.invOpportunityId}
            //   subtitle2={opportunity.phoneNo || "-"}
              // handlePreview={() => this.props.handleContactDrawer(opportunity, true)}
              handleClick={() =>
                history.push({
                  pathname: `dealDetails/${dealDetailsbyID.invOpportunityId}`,
                  state: { dealDetail: dealDetailsbyID },
                })
              }
              handleWon={() => {
                this.props.sendToWon(dealDetailsbyID.invOpportunityId, {
                  wonInd:true
                },this.props.userId)
              }}
              handleConfirm ={() => {
                this.props.lostRecruit(dealDetailsbyID.invOpportunityId, {
                  lostInd: true
                },this.props.userId)
                
              }}
              handleDelete={() => this.props.deleteDealsData(dealDetailsbyID.invOpportunityId)}
            /></Suspense>
            </div>
            )}
                 </Draggable>
         
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      deleteDealsData,
      sendToWon,
      lostRecruit
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DealStageColumn);
