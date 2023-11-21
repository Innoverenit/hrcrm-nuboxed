import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message ,Input, Card} from "antd";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import { TextInput, Title } from "../../Components/UI/Elements";
import moment from "moment";
import {
  getTasks,
} from "../Settings/Task/TaskAction";
import { BundleLoader } from "../../Components/Placeholder";

class TaskOrganizationNew extends Component {

  componentDidMount() {
   
    this.props.getTasks(this.props.userId);

  }

  render() {
    if (this.props.fetchingTasks) {
      return <BundleLoader/>
    }
    return (
      <>
  
          <div className="grid grid-cols-5 gap-4 p-4">
  {this.props.tasks.length &&
    this.props.tasks.map((item) => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      return (
        <div className="col-span-2 sm:col-span-1">
          <div className="flex">
            {item.taskType}
          </div>
          <div class="text-2xl">
            {randomNumber}
                        </div>
        </div>
      );
    })}
</div>
        
      </>
    );
  }
}

const mapStateToProps = ({ tasks,auth }) => ({
 
  tasks: tasks.tasks,
  userId:auth.userDetails.userId,
  
  fetchingTasks:tasks.fetchingTasks,
  fetchingTasksError: tasks.fetchingTasksError,

  
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTasks,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskOrganizationNew);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew
