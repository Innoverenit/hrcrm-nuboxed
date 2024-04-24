import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Draggable } from "react-beautiful-dnd";
import TaskGroupCard from "../../DashboardPage/Child/TaskGroupCard"

import { elipsize } from "../../../Helpers/Function/Functions";


class StageTaskColumns1 extends Component {
  render() {
    const { task, index, history } = this.props;
    console.log(task)
    return (
      <Draggable
      draggableId={task.taskId}
      index={index}
      type="stage"
    >
       {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
  
            <TaskGroupCard
            task={task}
              isDragging={snapshot.isDragging}
            //   opportunityId={opportunity.opportunityId}
              primaryTitle={`${elipsize(task.taskName, 60)}`} 
            // secondaryTitle={`${task.taskName} `}
            //   currencyType={opportunity.currency}
               customerName={task.customer}
               contactName={task.contact}
               opportunityName={task.oppertunity}
            //   contactName={opportunity.contactName}
            //   user={this.props.user}
             
            />
             
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
export default connect(mapStateToProps, mapDispatchToProps)(StageTaskColumns1); ;
