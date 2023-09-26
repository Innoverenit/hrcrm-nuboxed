import React, { Component } from "react";
import { connect } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, message, Popconfirm } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  MainWrapper,
  Spacer,
  TextInput,
} from "../../../Components/UI/Elements";
import {
  getTaskForRecruit,
  getTaskWorkflowStagesForRecruit,
} from "../../Settings/SettingsAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledTabs } from "../../../Components/UI/Antd";
import { Select } from "../../../Components/UI/Elements";
import { elipsize } from "../../../Helpers/Function/Functions";
// import AddRecruitmentDrawerModal from "../RecruitmentTab/AddRecruitmentDrawerModal";

import SingleTaskWorkflowList from "./SingleTaskWorkflowList";
const { Option } = Select;

const TabPane = StyledTabs.TabPane;
class TaskWorkflowList extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      fields: {},
      activeKey: "0",
      // viewAll:false,
      // setIsViewAll:false,
      change: true,
      isTextInputOpen: false,
      addingStage: false,
      taskChecklistStageName: "",
      probability: null,
      days: null,
      rowData: "",
      startDate:"",
      endDate:"",
      // probability: null,
      setCurrentRowData: "",
      visible: false,
      isViewAll: false,
      currentProcess: [],
      currentStageId: "",
      currentStage: [],
      currentStageName: "",
      exist: false,
      responsible: null,
      isProcessTextInputOpen: false,
      taskChecklistName: "",
      publish: false,
    };
  }

  componentDidMount() {
    this.props.getTaskForRecruit();
    this.props.getTaskWorkflowStagesForRecruit(this.props.item.taskId)
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  onChangeDatePicker = (startDate, dateString) => {
    console.log(startDate, dateString);
    this.setState({ startDate: dayjs(dateString) });
  };
  onChangeEndDatePicker = (endDate, dateString) => {
    console.log(endDate, dateString);
    this.setState({ endDate: dayjs(dateString) });
  };

  handleEdit = () => {
    this.setState((prevState) => ({
      isProcessTextInputOpen: !prevState.isProcessTextInputOpen,
    }));
  };
  handleCancel = () => {
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleProcessClick = (item, i) => {
    this.setState({
      currentProcess: item,
    });
    this.props.getTaskStagesForRecruit(item.taskChecklistId);
  };

  //   handleModalClick = () => {
  //     const { currentProcess, publish } = this.state;
  //     console.log(currentProcess);

  //     const Id = currentProcess.recruitmentProcessId;
  // let data = {
  //   recruitmentProcessId: Id,
  //   publishInd: currentProcess.publishInd ? false : true,
  // };

  //     this.props.getAllDocumentsType(Id, );
  //   };

  handleApproveIconClick = (item) => {
    this.setState({
      currentStageId: item,
    });
  };
  handleRowClick = (item) => {
    this.setState({
      rowData: item,
    });
  };

  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleCallBack1 = (status, data) => {
    if (status === "Success") {
       this.props.getTaskForRecruit();
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };
    handleEditProcessName = () => {
      const { updateTaskNameForRecruit } = this.props;

      const {
        taskChecklistName,

        currentProcess,
      } = this.state;
      const Id = currentProcess.taskChecklistId;
      let process = { taskChecklistName, taskChecklistId: Id };
      updateTaskNameForRecruit(process, this.handleCallBack1);
      this.setState({
        isProcessTextInputOpen: false,
      });
    };


  //   handleStagePublishClick = (taskChecklistStagelinkId, publishInd) => {
  //     const { recruitTaskStages } = this.props;
  //     const data = {
  //       taskChecklistStagelinkId,
  //       publishInd: publishInd ? false : true,
  //     };
  //     console.log(publishInd);
  //     this.props.LinkStagePublish(data, this.handleCallBack);
  //   };
  handleCallBack = (status) => {
    if (status === "Success") {
      const {
        currentProcess: { taskChecklistId },
      } = this.state;

      this.props.getTaskStagesForRecruit(taskChecklistId);
    } else {
      alert("error");
    }
  };

  handleStageType = (value) => this.setState({ responsible: value });

 
  render() {
    console.log("process", this.state.currentProcess.taskChecklistName);
    return (
      <>
        <StageWrapper>
          <MainWrapper>
            <h1>
              {/* Workflow */}
              <FormattedMessage id="app.workFlow" defaultMessage="WorkFlow" />
            </h1>

            <FlexContainer>
              <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.recruitTask.map((item, i) => {
                  return (
                    <TabPane
                      key={i}
                      tab={
                        <span onClick={() => this.handleProcessClick(item)}>
                          {elipsize(item.taskType, 15)}
                        </span>
                      }
                    ></TabPane>
                  );
                })}
              </StyledTabs>

            
            </FlexContainer>

            {this.props.recruitTaskWorkflowStages.map((recruitTaskWorkflowStages, i) => (
              <SingleTaskWorkflowList
                key={i}
                stageValue1={this.state.taskChecklistStageName}
                newStageName="taskChecklistStageName"
                newDays="days"
                newProbability="probability"
               newStartDate="startDate"
               newEndDate="endDate"
                //newResponsible="responsible"
                handleUpdateStage={this.handleUpdateStage}
                handleStageType={this.handleStageType}
                // taskChecklistId={this.state.currentProcess.taskChecklistId}
                recruitTaskWorkflowStages={recruitTaskWorkflowStages}
                organization={this.props.organization}
               
                className="scrollbar"
                id="style-3"
              />
            ))}

          
          </MainWrapper>
        </StageWrapper>


      </>
    );
  }
}

const mapStateToProps = ({ settings, auth, document }) => ({
  recruitTask: settings.recruitTask,
  recruitTaskWorkflowStages: settings.recruitTaskWorkflowStages,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      getTaskForRecruit,
      getTaskWorkflowStagesForRecruit
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskWorkflowList);
const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;

const AppIcon1 = (props) => (
  <BorderColorIcon className={`pen-to-square ${props.className}`} />
);

const EditIcon1 = styled(AppIcon1)`
  color: white;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
