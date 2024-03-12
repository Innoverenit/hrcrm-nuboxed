import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Draggable } from "react-beautiful-dnd";
import {deleteDealsData} from "../DealAction";
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
              handleDelete={() => this.props.deleteDealsData(dealDetailsbyID.invOpportunityId)}
            />
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
    
      deleteDealsData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DealStageColumn);
