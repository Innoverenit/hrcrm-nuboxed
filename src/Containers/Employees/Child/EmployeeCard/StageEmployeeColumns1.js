import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EmployeeGroupCard from "../EmployeeCard/EmployeeGroupCard"
import { Draggable } from "react-beautiful-dnd";
// import OpportunityGroupCard from "../Child/OpportunityGroupCard";
import { elipsize } from "../../../../Helpers/Function/Functions";


class StageEmployeeColumns1 extends Component {
  render() {
    const { employee, index, history } = this.props;
    return (
      
      <Draggable
      draggableId={employee.unboardingWorkflowDetailsId}
      index={index}
      type="stage"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
    {employee.onboardingEmpName===null?"":
            <EmployeeGroupCard
              isDragging={snapshot.isDragging}
            //   opportunityId={opportunity.opportunityId}
              primaryTitle={`${elipsize(employee.onboardingEmpName, 60)}`} 
            
             
            />
      }
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
export default connect(mapStateToProps, mapDispatchToProps)(StageEmployeeColumns1); ;
