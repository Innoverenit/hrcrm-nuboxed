import React, { Component } from "react";
import styled from "styled-components";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, Tooltip,Popconfirm } from "antd";
import { TextInput,  Select } from "../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import {handleApprovalModal,} from "../../../SettingsAction";
import { connect } from "react-redux";
import {deleteHiringStagesData} from "../../../../Settings/SettingsAction";
import { bindActionCreators } from "redux";
import DeleteIcon from '@mui/icons-material/Delete';
const { Option } = Select;

class SingleRecruitStages extends Component {
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
    const { recruitProcessStages } = this.props;
    console.log(recruitProcessStages);

    const {
      recruitProcessStages: {
        stageName,
        stageId,
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
      deleteHiringStagesData,
      stageValue1,
      handleChange,
      updatingStages,
      handleUpdateStage,
      handleStagePublishClick,
      handleDeleteStage,
      handleStageClick,
      color,
      key,
      currentStage,
    } = this.props;
    console.log(stageId, "----------", linkedStages);
    console.log(stageName);
    console.log(color);
    console.log(probability);
    console.log(currentStage);

    const disabled = probability === 100 || probability === 0 ? true : false;
   
    // const disabled = false;
    const disableDelete = linkedStages && linkedStages.includes(stageId);
    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto "  
                // onClick={() => handleStageClick(stageId, stageName)}
                style={{
                  backgroundColor:
                    stageId === currentStage && "rgb(161, 185, 185)",
                }}
              >
                
                <StageName style={{ flexBasis: "25%", textAlign: "left" }}>
                  {elipsize(stageName, 23)}
                </StageName>
                <StageName style={{ flexBasis: "25%"}}>
                {`${responsible}`}
                </StageName>
                <StageValue style={{ flexBasis: "14%", textAlign: "center" }}>
                  {`${probability}%`}
                </StageValue>
                <StageValue style={{ flexBasis: "14%", textAlign: "center" }}>
                  {`${days}D`}
                </StageValue>            

                <div class=" flex justify-between">
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
                  
                     <>                 
                     <Popconfirm
              title="Do you want to delete?"
              okText="Yes"
              cancelText="No"
               onConfirm={() => deleteHiringStagesData(stageId)}
            >
               {/* {user.opportunityDeleteInd ===true && ( */}
               {probability !== 0 && probability !== 100 && (
              <DeleteIcon
              type="delete" style={{ cursor: "pointer", color: "red" }} />
               )}
               {/* )} */}
            </Popconfirm>
                    </>
                   <Tooltip title="Approval" >
                    <span
                    onClick={(item) => 
                     {
                       this.props.handleApprovalModal(true);  
                       this.props.handleApproveIconClick(stageId)                                         
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
                 
                   <span>
                       
                     {recruitProcessStages.probability === 0 || recruitProcessStages.probability === 100 ? null :
                
                <Button
                     onClick={() =>
                      handleStagePublishClick(
                        this.props.stageId,
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
              
              <div class=" flex flex-row flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto ">
                <TextInput
                  name={newStageName}
                  // value={stageValue1 || stageName}
                  defaultValue={stageName}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />
               
                <Select 
              defaultValue={responsible}
               style={{width:"20%"}}
               placeholder="Select Action"
               onChange={this.handleStageType}
               >
                <Option value="Assessment">Assessment</Option>
                <Option value="Call">Call</Option>
                <Option value="Task">Task</Option>
              <Option value="Customer">Customer</Option>
               </Select>
           
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
               
                <TextInput
                  name={newDays}
                  defaultValue={days}
                  disabled={disabled}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                  onChange={this.handleChange}
                  placeholder="Days"
                  width={"8%"}
                />
                
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={disabled}
                  loading={updatingStages}                  
                  onClick={() =>
                    handleUpdateStage(
                      this.props.stageId,
                      this.state.responsible,
                      this.state.fields.stageName,
                      this.state.fields.probability,
                      this.state.fields.days,
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
            )
          }

            {/* <AddApprovalModal
        handleApprovalModal={this.props.handleApprovalModal}
        addRecruitmentApprovalModal={this.props.addRecruitmentApprovalModal}
        /> */}
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
      handleApprovalModal,
      deleteHiringStagesData
      
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecruitStages);
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

