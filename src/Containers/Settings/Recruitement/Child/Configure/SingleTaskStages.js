import React, { Component } from "react";
import styled from "styled-components";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Tooltip, Popconfirm, } from "antd";
import {
  TextInput,
  Select,
} from "../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { deleteTaskStagesData } from "../../../../Settings/SettingsAction";
import { bindActionCreators } from "redux";
import DeleteIcon from "@mui/icons-material/Delete";
const { Option } = Select;

class SingleTaskStages extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      // currentStage: [],
      fields: {},
      responsible: "",
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

  handleStageType = (value) => this.setState({ responsible: value });

  render() {
    console.log(this.state.fields);
    const { recruitTaskStages } = this.props;
    console.log(recruitTaskStages.taskChecklistStagelinkId);

    const {
      recruitTaskStages:
       { taskChecklistStageName,
         taskChecklistStagelinkId,
         probability,
         days,
         startDate,
         endDate
        },
      linkedStages,
      organization,
      newStageName,
      newDays,
      newProbability,
      deleteTaskStagesData,
      stageValue1,
      handleChange,
      updatingStages,
      handleUpdateStage,
      color,
      key,
      currentStage,
    } = this.props;
    console.log(taskChecklistStagelinkId, "----------", linkedStages);
    console.log(taskChecklistStageName);
    console.log(color);
    console.log(currentStage);

    // const disabled = false;
    const disableDelete =
      linkedStages && linkedStages.includes(taskChecklistStagelinkId);
    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-start items-center"
                // onClick={() => handleStageClick(taskChecklistStagelinkId, taskChecklistStageName)}
                style={{
                  backgroundColor:
                    taskChecklistStagelinkId === currentStage &&
                    "rgb(161, 185, 185)",
                }}
              >
                <StageName style={{ flexBasis: "25%", }}>
                  {elipsize(taskChecklistStageName, 23)}
                </StageName>
                <StageName style={{ flexBasis: "20%", }}>
  {probability > 0 && probability < 100 ? `${probability}%` : 'Invalid Probability'}
</StageName>
           
                <StageName  >
                  {days}D
                </StageName>
                {/* <StageName>
                  {`${ dayjs(startDate).format("DD/MM/YYYY")}`}
                </StageName>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <StageName>
                {`${ dayjs(endDate).format("DD/MM/YYYY")}`}
                </StageName> */}
                <div class=" flex justify-between ml-[5rem] w-4">
                  <>
                    <Tooltip title="Edit">
                      <BorderColorIcon
                        style={{ fontSize: "0.8rem" }}
                        tooltipTitle="Edit"
                        onClick={toggleViewType}
                      />
                    </Tooltip>
                  </>

                  <>
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        deleteTaskStagesData(taskChecklistStagelinkId)
                      }
                    >
                      <DeleteIcon
                        type="delete"
                        style={{ cursor: "pointer", color: "red" ,fontSize: "0.8rem"}}
                      />
                    </Popconfirm>
                  </>
                </div>
              </div>
            ) : (
              <div class=" flex justify-center" >
                <TextInput
                  name={newStageName}
                  // value={stageValue1 || taskChecklistStageName}
                  defaultValue={taskChecklistStageName}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />
                    <TextInput
                  name={newProbability}
                  // value={stageValue1 || taskChecklistStageName}
                  defaultValue={probability}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />
                    <TextInput
                  name={newDays}
                  // value={stageValue1 || taskChecklistStageName}
                  defaultValue={days}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />

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
                      this.state.fields.probability,
                      this.state.fields.days,
                      toggleViewType()
                    )
                  }
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>

                <Button      type="cancel" onClick={() => toggleViewType()}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            )
          }
        </ViewEditCard>
      </StageWrapper>
    );
  }
}
const mapStateToProps = ({ settings, auth }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteTaskStagesData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleTaskStages);
// export default SingleRecruitStages;

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
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;
