import React, { Component } from "react";

import { Button, Tooltip,  DatePicker, Avatar, } from "antd";
import {
  TextInput,
  Select,
} from "../../../Components/UI/Elements";
import { getAssignedToList } from "../../Employees/EmployeeAction";
import {addTaskWorkflow,getTaskTeamList} from "../../Settings/SettingsAction"
import { elipsize } from "../../../Helpers/Function/Functions";
import { ViewEditCard } from "../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
const { Option } = Select;

class SingleTaskWorkflowList extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      // currentStage: [],
      fields: {},
      responsible: "",
      endDate:"",
      startDate:"",
      candidate:[],
      selectedOptions:[],
      publish: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    debugger;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  handleChangeValue =(selectedValue)=>{
    this.setState({selectedOptions:selectedValue})
  }
  handleSave = () => {

    const { addTaskWorkflow } = this.props;
     addTaskWorkflow();
  };
  onChangeDatePicker = (startDate, dateString) => {
    console.log(startDate, dateString);
    this.setState({ startDate: dayjs(dateString) });
  };
  onChangeEndDatePicker = (endDate, dateString) => {
    console.log(endDate, dateString);
    this.setState({ endDate: dayjs(dateString) });
  };

  handleStageType = (value) => this.setState({ responsible: value });
  componentDidMount() {
    const { getTaskTeamList,item } = this.props;
    console.log();
    //  getTaskTeamList(item.taskId);
    this.props.getAssignedToList(this.props.orgId);
  }
  render() {
console.log("candidate",this.state.candidate)
console.log("startDate",this.state.startDate)
    const { recruitTaskWorkflowStage } = this.props;
    console.log("selectedOptions",this.state.selectedOptions);
    console.log(recruitTaskWorkflowStage.taskChecklistStageName);

    const {
      recruitTaskWorkflowStage:
       { name,
        included,
        taskChecklistStageName,
         taskChecklistStagelinkId,
         probability,
         days,
        //  startDate,
        //  endDate
        },
      linkedStages,
      organization,
      newStageName,
      newProbability,
      newDays,

      stageValue1,
      handleChange,
      updatingStages,
      handleUpdateStage,
      color,
      key,
      currentStage,
    } = this.props;
    

    const includeData=included && included.map((item)=>{
      return item.empName;
    })
    console.log("includeData",includeData);
    console.log(taskChecklistStagelinkId, "----------", linkedStages);
    console.log(color);
   

    // const disabled = false;
    const disableDelete =
      linkedStages && linkedStages.includes(taskChecklistStagelinkId);
    return (
      <div class=" w-full h-auto cursor-pointer ">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between items-center"
              
          
              >
                <div class="flex w-full">
                <div class=" text-semibold m-0 w-[8rem]" >
                  {elipsize(taskChecklistStageName, 23)}
                </div>
                <div class=" text-semibold m-0 w-[5rem]" >
                  {probability}%
                </div>
                <div class=" text-semibold m-0 w-[5rem]" >
                  {days}D
                </div>
              
            

  {/* Start Date */}
  <div class="flex w-[11rem] mr-3" >
    <DatePicker
      //  defaultValue={this.state.startDate}
      placeholder="Start Date"
      onChange={this.onChangeDatePicker}
    />
  </div>

  {/* End Date */}
  <div class="flex w-[11rem] mr-3" >
    <DatePicker
    // defaultValue={this.state.endDate}
      placeholder="End Date"
      onChange={this.onChangeEndDatePicker}
    />
  </div>

  {/* Stage */}
  <div class="flex w-[16rem]" >
    <Select
      style={{ border:"0.5px solid lightgray ", boxShadow: "0 0.15em 0.3em #aaa" }}
      mode="multiple"
      value={this.state.selectedOptions}
      options={this.props.assignedToList.map((option) => ({
        value: option.employeeId,
        label: option.empName,
      }))}
      onChange={this.handleChangeValue}
    />
  </div>
  <div class=" text-semibold m-0 w-[8rem]" >
                  <Avatar.Group
  maxCount={2}
  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
>
  {included &&
    included.map((candidate, i) => {
      if (candidate && candidate.empName) {
        const data1 = candidate.empName.slice(0, 2);
        console.log("datas", data1);
        return (
          <Tooltip title={candidate.empName} key={i}>
            <Avatar style={{ backgroundColor: "#94b3e4" }}>
              {data1}
            </Avatar>
          </Tooltip>
        );
      } else {
        return null; 
      }
    })}
</Avatar.Group>
                </div>

  {/* Save Button */}
  <div class=" flex justify-end">
  <Button
    type="primary"
    onClick={() => {
      this.props.addTaskWorkflow(
        this.state.selectedOptions,
        dayjs(this.state.startDate).toISOString(),
        dayjs(this.state.endDate).toISOString(),
        this.props.item.taskId,
        taskChecklistStagelinkId,
      );
    }}
  >
    Save
  </Button>
  </div>
</div>


           
              </div>
            ) : (
              <div class=" flex flex-row flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto ">
                <TextInput
                  name={newStageName}
             
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />
<div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={disabled}
                  loading={updatingStages}
                  onClick={() =>
                    handleUpdateStage(
                      // this.props.taskChecklistStagelinkId,
                      this.props.taskChecklistStagelinkId,
                      this.state.fields.taskChecklistStageName,
                      toggleViewType()
                    )
                  }
                >
                   Save
                </Button>

                <Button type="primary" ghost onClick={() => toggleViewType()}>
                 Cancel
                
                </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}
const mapStateToProps = ({ settings,employee, auth }) => ({
  assignedToList:employee.assignedToList,
  orgId: auth.userDetails.organizationId,
  recruitTaskWorkflowStages: settings.recruitTaskWorkflowStages,
  // taskTeamList:settings.taskTeamList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskWorkflow,
      getAssignedToList
      // getTaskTeamList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleTaskWorkflowList);
// export default SingleRecruitStages;




