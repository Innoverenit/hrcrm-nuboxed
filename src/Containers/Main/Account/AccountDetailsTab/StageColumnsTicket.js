import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Draggable } from "react-beautiful-dnd";
import TicketGroupCard from "./TicketGroupCard"
import { elipsize } from "../../../../Helpers/Function/Functions";
//import {  StatusRecruit, lostStatusRecruit,deleteOpportunityData,setEditOpportunity,handleUpdateOpportunityModal} from "../OpportunityAction";
//import UpdateOpportunityModal from "./UpdateOpportunity/UpdateOpportunityModal";

class StageColumnsTicket extends Component {
  render() {
    const { opportunity, index, history } = this.props;
    return (
      <>
      <Draggable
      draggableId={opportunity.tckId}
      index={index}
      type="stage"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
  
            <TicketGroupCard
              isDragging={snapshot.isDragging}
              opportunityId={opportunity.tckId}
              primaryTitle={`${elipsize(opportunity.title, 60)}`} 
            //   secondaryTitle={`${opportunity.proposalAmount} `}
            //   currencyType={opportunity.currency}
            //   customerName={opportunity.customer}
            //   contactName={opportunity.contactName}
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
            //   handleEdit={()=>{
            //     this.props.setEditOpportunity(opportunity);
            //     this.props.handleUpdateOpportunityModal(true)
            //   }}
            />
             
            </div>
            )}
                 </Draggable>

                 {/* <UpdateOpportunityModal
        updateOpportunityModal={this.props.updateOpportunityModal}
        opportunityData={opportunity}
        handleUpdateOpportunityModal={this.props.handleUpdateOpportunityModal}
        //handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      /> */}
                 </>
    );
  }
}
const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  updateOpportunityModal: opportunity.updateOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
        //  StatusRecruit,
        //  lostStatusRecruit,
        //  deleteOpportunityData,
        //  setEditOpportunity,
        //  handleUpdateOpportunityModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(StageColumnsTicket); ;
