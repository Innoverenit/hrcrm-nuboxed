import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
 import {deleteRepairStagesData} from "../../../../../Settings/SettingsAction";
import { Button, Tooltip, Popconfirm } from "antd";
import { TextInput, Select } from "../../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const { Option } = Select;

class SingleRepairStages extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      // currentStage: [],
      fields: {},
      responsible:"",
      publish:false,
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

  handleStageType=(value)=>
  this.setState({responsible:value});

  render() {
  

    console.log(this.state.fields);
    const { repairProcessStages } = this.props;
    console.log(repairProcessStages.repairStagesId);
    console.log(repairProcessStages);

    const {
        repairProcessStages: {
        stageName,
        repairStagesId,
      
        responsible,
        probability,
        days,
        publishInd,
        stageSequence,
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
      handleStagePublishClick,
      handleDeleteStage,
      handleStageClick,
      color,
      key,
      deleteRepairStagesData,
      currentStage,
    } = this.props;
    console.log(repairStagesId, "----------", linkedStages);
    console.log(stageName);
    console.log(color);
    console.log(currentStage);

    const disabled = probability === 100 || probability === 0 ? true : false;
    // const disabled = false;
    const disableDelete = linkedStages && linkedStages.includes(repairStagesId);
    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-start items-center"
                // onClick={() => handleStageClick(stageId, stageName)}
                // style={{
                //   backgroundColor:
                //     stageId === currentStage && "rgb(161, 185, 185)",
                // }}
              >
                
                <StageName style={{ flexBasis: "25%", textAlign: "left" }}>
                  {elipsize(stageName, 23)}
                </StageName>
                {/* <StageName style={{ flexBasis: "25%"}}>
                {`${responsible}`}
                </StageName> */}
                <StageValue style={{ flexBasis: "14%", textAlign: "center" }}>
                  {`${probability}%`}
                </StageValue>
                <StageValue style={{ flexBasis: "14%", textAlign: "center" }}>
                  {`${days}D`}
                </StageValue>            
                <div style={{ flexBasis:"no-wrap",justifyContent:"space-between" }}>
                    <>                 
                   <Tooltip title="Edit">
                   {probability !== 0 && probability !== 100 && (
                   <BorderColorIcon
                   style={{fontSize:"1rem"}}
                          tooltipTitle="Edit"
                          onClick={toggleViewType}
                        />
                        )}
                      </Tooltip>
                    </>
                     &nbsp; &nbsp;
                     <>                 
                     <Popconfirm
  title="Do you want to delete?"
  okText="Yes"
  cancelText="No"
  onConfirm={() => deleteRepairStagesData(repairStagesId)}
>
  <DeleteIcon type="delete" style={{ cursor: "pointer", color: "red" }} />
</Popconfirm>

                    </>
                   {/* <Tooltip title="Approval" >
                    <span
                    onClick={(item) => 
                     {
                       this.props.handleApprovalModal(true);  
                       this.props.handleApproveIconClick(opportunityStagesId)                                         
                    }                     
                    }
                     style={{ 
                     marginLeft: "35px",
                      }} 
                     >
                       {probability !== 0 && probability !== 100 && (
                   <i class="far fa-thumbs-up"></i>
                   )}
                   </span>
                   </Tooltip>
                   &nbsp;  */}
                 <span>
                       
                     {repairProcessStages.probability === 0 || repairProcessStages.probability === 100 ? null :
                
                <Button
                     onClick={() =>
                      handleStagePublishClick(
                        this.props.repairStagesId,
                        publishInd
                       
                      )
                    }
                    >
                         {publishInd? "Unpublish" :"Publish"} 
                             
                             </Button> 
                             }
                   </span> 

                  

                  </div>
                     
                   

                 
           </div>
            
            ) : (
              
              <div class=" flex justify-center" >
                <TextInput
                  name={newStageName}
                  // value={stageValue1 || stageName}
                  defaultValue={stageName}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />
                &nbsp;
                {/* <Select 
              defaultValue={responsible}
               style={{width:"40%"}}
               placeholder="Select type"
               onChange={this.handleStageType}
               >
                <Option value="assessment">Assessment</Option>
                <Option value="call">Call</Option>
                <Option value="task">Task</Option>
              <Option value="customer">Customer</Option>
               </Select>
               &nbsp; */}
                <TextInput
                  name={newProbability}
                  defaultValue={probability}
                  disabled={disabled}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                  onChange={this.handleChange}
                  // placeholder="Weightage"
                  // disabled={true}
                  width={"12%"}
                />
                &nbsp;&nbsp;
                <TextInput
                  name={newDays}
                  defaultValue={days}
                  disabled={disabled}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                  onChange={this.handleChange}
                  placeholder="Days"
                  width={"8%"}
                />
                &nbsp;&nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={disabled}
                  loading={updatingStages}                  
                  onClick={() =>
                    handleUpdateStage(
                      this.props.repairStagesId,
                      // this.state.responsible,
                      this.state.fields.stageName,
                      this.state.fields.probability,
                      this.state.fields.days,
                      toggleViewType()
                    )
                  }
                >
                  {/* Save */}
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
                </Button>
                &nbsp;
                <Button     type="cancel" onClick={() => toggleViewType()}>
               {/* Cancel */}
                  <FormattedMessage
                    id="app.cancel"
                    defaultMessage="Cancel"
                  />
                </Button>
              </div>
            )
          }
        </ViewEditCard>  

         

      </StageWrapper>
     
   
     
    );
   
  }

}
const mapStateToProps = ({ settings, auth }) => ({
  addRecruitmentApprovalModal:settings.addRecruitmentApprovalModal,
 


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
        deleteRepairStagesData,
      
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleRepairStages);
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

