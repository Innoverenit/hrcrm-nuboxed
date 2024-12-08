import React, { Component,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { Draggable } from "react-beautiful-dnd";
import { elipsize } from "../../../../Helpers/Function/Functions";
const EmployeeGroupCard =lazy(()=>import("../EmployeeCard/EmployeeGroupCard"));


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
    <Suspense fallback={<BundleLoader/>}>
            <EmployeeGroupCard
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
              isDragging={snapshot.isDragging}
            //   opportunityId={opportunity.opportunityId}
              primaryTitle={`${elipsize(employee.onboardingEmpName, 60)}`} 
            
             
            /></Suspense>
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
