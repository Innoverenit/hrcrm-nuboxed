import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductionGroupCard1 from "../Child/ProductionGroupCard1"
import { Draggable } from "react-beautiful-dnd";
// import OpportunityGroupCard from "../Child/OpportunityGroupCard";
import { elipsize } from "../../../Helpers/Function/Functions";


class StageProductionColumn extends Component {
  render() {
    const { employee, index, history } = this.props;
    return (
      
      <Draggable
      draggableId={employee.productionWorkflowDetailsId}
      index={index}
      type="stage"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
    {employee.manufactureId===null?"":
            <ProductionGroupCard1
              isDragging={snapshot.isDragging}
            //   opportunityId={opportunity.opportunityId}
              primaryTitle={`${elipsize(employee.manufactureId, 60)}`} 
            
             
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
export default connect(mapStateToProps, mapDispatchToProps)(StageProductionColumn); ;
