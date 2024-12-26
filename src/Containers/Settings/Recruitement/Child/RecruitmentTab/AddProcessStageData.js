import React, { useState,useEffect } from "react";
import { Button,Select, Input,Popconfirm } from "antd";
import {addProcessStageForDeals,

  updateStageForDeals,
  deleteDealsStagesData,
  LinkDealsStagePublish,
  addSequenceFlow,
  getSequence,
  deleteSequencedatalist
   
     } from "../../../SettingsAction";
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { DeleteOutlined } from "@mui/icons-material";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
const { Option } = Select;

const AddStageComponent = (props) => {

  const [yesDropdown, setYesDropdown] = useState({});
  const [noDropdown, setNoDropdown] = useState({});

  const [yesState, setYesState] = useState({});
  const [noState, setNoState] = useState({});
  const [noActionState, setNoActionState] = useState({});
  const [noActionDropdown, setNoActionDropdown] = useState({});
  const [selectedAction, setSelectedAction] = useState({});
    const [editingStageId, setEditingStageId] = useState(null);

  const [stages, setStages] = useState(props.dealsProcessStages);
  const [showAddButton, setShowAddButton] = useState(true);




useEffect(() => {
    if (props.dealsProcessStages) {
        setStages(props.dealsProcessStages);
    }
  }, [props.dealsProcessStages]);
  useEffect(() => {
    props.getSequence(props.organizationId);
    // props.getAllSalesList();
  }, []);


  const addNewStage = () => {
    const newStage = { 
        // stagesId: Date.now(), 
        stageName: "", 
        probability: "", 
        days: "", 
        responsible:'',
        orgId: props.orgId,
        workflowDetailsId: props.currentProcess.workflowDetailsId,
        // isEditing: true 
    };
    setStages([...stages, newStage]);
    setEditingStageId(newStage.stagesId);
    setShowAddButton(false);
  };



const handleSave = (stagesId) => {
    const savedStage = stages.find((stage) => stage.stagesId === stagesId);
    console.log("Saved Stage:", savedStage);
    setEditingStageId(null);
    setShowAddButton(true);

    //props.addProcessStageForDeals(savedStage)


    if (!savedStage.stagesId) {
      // If there's no ID, assume it's a new stage and call the add API
      props.addProcessStageForDeals(savedStage);
      console.log("Calling Add API");
    } else {
      // If an ID exists, assume it's an update and call the update API
      props.updateStageForDeals(savedStage,savedStage.stagesId);
      console.log("Calling Update API");
    }


  };



const handleCancel = (stagesId) => {
 
    setShowAddButton(true);
  };


  const handleStagePublishClick = (stagesId, publishInd) => {
    const data = {
      stagesId,
      publishInd: publishInd ? false : true,
    };
  props.LinkDealsStagePublish(data, );
   };






const handleInputChange = (stagesId, field, value) => {
    setStages(
      stages.map((stage) =>
        stage.stagesId === stagesId ? { ...stage, [field]: value } : stage
      )
    );
  };

  const handleEdit = (stagesId) => {
    
    setEditingStageId(stagesId);
    setShowAddButton(false);
  };



  console.log(stages)
  const toggleIndicator = (stageId, ruleType) => {
    setStages((prevData) =>
      prevData.map((stage) =>
        stage.stagesId === stageId
          ? {
              ...stage,
              stageSequence: {
                ...stage.stageSequence,
                [`${ruleType}`]: !stage.stageSequence[
                  `${ruleType}`
                ],
              },
            }
          : stage
      )
    );
  };
  const handleSequenceChange = (stagesId, ruleType, value) => {
    console.log(`${ruleType} selected value:`, value);

   
    // Update the selected value for the specific rule (trueStageSequenceRule, falseStageSequenceRule, noInputStageSequenceRule)
    // setStages((prevStages) =>
    //   prevStages.map((stage) =>
    //     stage.stagesId === stagesId
    //       ? {
    //           ...stage,
    //           stageSequence: {
    //             ...stage.stageSequence,
    //             [ruleType]: value,  // Update the ruleType field with the new value
    //           },
    //         }
    //       : stage
    //   )
    // );

    setStages((prevStages) => {
      // Find and update the specific row in one step
      return prevStages.map((stage) => {
        if (stage.stagesId === stagesId) {
          const updatedRow = {
            ...stage,
            stageSequence: {
              ...stage.stageSequence,
              [ruleType]: value, // Update the ruleType field with the new value
            },
          };
          console.log('Updated Row:', updatedRow); // Log the updated row

          let result={
            falseStageId: updatedRow.stageSequence.falseStageId,
            falseStageSequenceRule:updatedRow.stageSequence.falseStageSequenceRule,

            noInputStageId:updatedRow.stageSequence.noInputStageId,
            noInputStageSequenceRule:updatedRow.stageSequence.noInputStageSequenceRule, 
            trueStageId: updatedRow.stageSequence.trueStageId,
            stageId:updatedRow.stagesId,
            trueStageSequenceRule:updatedRow.stageSequence.trueStageSequenceRule
          }
          props.addSequenceFlow(result)
          return updatedRow; // Return the updated row
        }
        return stage; // Keep other rows unchanged
      });
    });
   
  };
  return (
    <div className=" p-2 " >
      {/* {showAddButton && ( */}
        <Button type="primary" onClick={addNewStage} style={{ marginBottom: "20px" }}>
          Add Stage
        </Button>
      {/* )} */}
      <div className=" flex flex-wrap max-h-[60vh] overflow-y-auto  border-solid border-[#ddd] rounded  "
        // style={{
        //   maxHeight: "300px", // Set a fixed height for the container
        //   overflowY: "auto", // Enable vertical scrolling
        //   border: "1px solid #ddd",
        //   padding: "10px",
        //   borderRadius: "5px",
        // }}
      >

      {stages.map((stage,index) => (
        <>
        <div style={{display:"flex"}}>
        <div
          key={stage.stagesId}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px",
            width:"19em",
            // marginLeft:"20em"
          }}
        >
          {editingStageId === stage.stagesId? (
            <div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  placeholder="Enter stage"
                  value={stage.stageName}
                  onChange={(e) => handleInputChange(stage.stagesId, "stageName", e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  type="number"
                  placeholder="Enter weightage"
                  value={stage.probability}
                  onChange={(e) => handleInputChange(stage.stagesId, "probability", e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  type="number"
                  placeholder="Enter days"
                  value={stage.days}
                  onChange={(e) => handleInputChange(stage.stagesId, "days", e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <Button
                type="primary"
                onClick={() => handleSave(stage.stagesId)}
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Button type="default" onClick={() => handleCancel(stage.stagesId)}>
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <p><strong>Stage:</strong> {stage.stageName}</p>
              <p><strong>Weightage:</strong> {stage.probability}%</p>
              <p><strong>Days:</strong> {stage.days}</p>
              <BorderColorIcon className=" cursor-pointer !text-icon"
               onClick={() => handleEdit(stage.stagesId)}
              />
                                 <Popconfirm
  title="Do you want to delete?"
  okText="Yes"
  cancelText="No"
  onConfirm={() => props.deleteDealsStagesData(stage.stagesId)}
>
<DeleteIcon className=" cursor-pointer !text-icon  ml-4 text-red-600"
                      type="delete"  />
</Popconfirm>

{stage.probability === 0 || stage.probability === 100 ? null :
                
                <Button
                     onClick={() =>
                      handleStagePublishClick(
                        stage.stagesId,
                        stage.publishInd
                       
                      )
                    }
                    >
                         {stage.publishInd? "Unpublish" :"Publish"} 
                             
                             </Button> 
                             }
                               <div style={{ marginTop: "10px" }}>
                    <Button
                      type="default"
                      onClick={() =>
                        toggleIndicator(stage.stagesId, "trueStageSequenceRule")
                      }
                      style={{ marginRight: "5px" }}
                    >
                      Next
                    </Button>
                    <Button
                      type="default"
                      onClick={() =>
                        toggleIndicator(stage.stagesId, "falseStageSequenceRule")
                      }
                     // onClick={() => toggleAction(stage.stagesId, "No")}
                      style={{ marginRight: "5px" }}
                    >
                      Else
                    </Button>
                    <Button
                      type="default"
                      onClick={() =>
                        toggleIndicator(stage.stagesId, "noInputStageSequenceRule")
                      }
                      //onClick={() => toggleAction(stage.stagesId, "No Action")}
                    >
                      No Action
                    </Button>
                  </div>
          
            </div>
            
           
          )}
         
        </div>
      
        {stage && stage.stageSequence && stage.stageSequence.trueStageSequenceRule != null && (
              <div
          key={stage.stagesId}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px",
            width:"19em",
            marginLeft:"1em"
          }}
        >
          <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Next</label>
                <Select
                  placeholder="Select Yes Option"
                  style={{ width: "100%" }}
                  value={stage && stage.stageSequence && stage.stageSequence.trueStageSequenceRule}
                  onChange={(value) =>
                    handleSequenceChange(stage.stagesId, "trueStageSequenceRule", value)
                  }
                >
                   <Option value="Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                </Select>
                {stage && stage.stageSequence && stage.stageSequence.trueStageSequenceRule === "Jump to" && (
                  <>
                    <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Sequence</label>
                <Select
                  placeholder="Select Yes Option"
                  style={{ width: "100%" }}
                  value={stage && stage.stageSequence && stage.stageSequence.trueStageId}
                  onChange={(value) =>
                    handleSequenceChange(stage.stagesId, "trueStageId", value)
                  }
                >
                {props.sequence.map((item) => (
  <Option key={item.sequenceId} value={item.sequenceId}>
    {item.name}
  </Option>
))}
                  
                
                 
                </Select>
                <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => props.deleteSequencedatalist(stage.stagesId,"true",)}
          >
                <DeleteOutlined
                style={{color:"tomato"}}
                />
                </StyledPopconfirm>
                </>
                )}
              </div>
        )}
            
              {stage&&stage.stageSequence&&stage.stageSequence.falseStageSequenceRule!=null && (
              <div
              key={stage.stagesId}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "5px",
                width:"19em",
                marginLeft:"1em"
              }}
            >
                <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Else</label>
                <Select
                  placeholder="Select No Option"
                  value={stage&&stage.stageSequence&&stage.stageSequence.falseStageSequenceRule}
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleSequenceChange(stage.stagesId, "falseStageSequenceRule", value)
                  }
                >
                 <Option value="Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                </Select>
                {stage&&stage.stageSequence&&stage.stageSequence.falseStageSequenceRule === "Jump to" && (
                  <>
                  <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Sequence</label>
                <Select
                  placeholder="Select Yes Option"
                  style={{ width: "100%" }}
                  value={stage && stage.stageSequence && stage.stageSequence.falseStageId}
                  onChange={(value) =>
                    handleSequenceChange(stage.stagesId, "falseStageId", value)
                  }
                >
                {props.sequence.map((item) => (
  <Option key={item.sequenceId} value={item.sequenceId}>
    {item.name}
  </Option>
))}
                  
                
                 
                </Select>
                <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => props.deleteSequencedatalist(stage.stagesId,"False")}
          >
                <DeleteOutlined
                 style={{color:"tomato"}}
                />
                </StyledPopconfirm>
                </>
                )}
              </div>
              )}
           
            {stage&&stage.stageSequence&&stage.stageSequence.noInputStageSequenceRule!=null && (
              <div
              key={stage.stagesId}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "5px",
                width:"19em",
                marginLeft:"1em"
              }}
            >
                <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>No action</label>
                <Select
                  placeholder="Select No Action Option"
                  style={{ width: "100%" }}
                  value={stage&&stage.stageSequence&&stage.stageSequence.noInputStageSequenceRule}
                  onChange={(value) =>
                    handleSequenceChange(stage.stagesId, "noInputStageSequenceRule", value)
                  }
                >
                   <Option value="Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                </Select>
                {stage&&stage.stageSequence&&stage.stageSequence.noInputStageSequenceRule ==="Jump to" && (
                  <>
                       <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Sequence</label>
                <Select
                  placeholder="Select Yes Option"
                  style={{ width: "100%" }}
                  value={stage && stage.stageSequence && stage.stageSequence.noInputStageId}
                  onChange={(value) =>
                    handleSequenceChange(stage.stagesId, "noInputStageId", value)
                  }
                >
                {props.sequence.map((item) => (
  <Option key={item.sequenceId} value={item.sequenceId}>
    {item.name}
  </Option>
))}
                  
                
                 
                </Select>


                <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => props.deleteSequencedatalist(stage.stagesId,"NoAction")}
          >
                <DeleteOutlined
                 style={{color:"tomato"}}
                />
                </StyledPopconfirm>
                  </>
               
                )}
              </div>
            )}
            {/* )} */}
        </div>
          {/* {index < stages.length - 1 && (
            <div
              style={{
                width: "3px",
                height: "38px",
                backgroundColor: "#1890ff",
                // margin: "8px auto",
                marginLeft:"48px"
              }}
            ></div>
          )} */}
          </>
      ))}
      </div>
    </div>
  );
};


const mapStateToProps = ({ settings, auth }) => ({
    token: auth.token,
    sequence: settings.sequence,
    organizationId: auth.userDetails.organizationId,
      dealsProcessStages: settings.dealsProcessStages,
      primaryOrgType:auth.userDetails.primaryOrgType,
     orgId: auth.userDetails && auth.userDetails.organizationId,
    });
    
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {
         
        addProcessStageForDeals,
        addSequenceFlow,
        updateStageForDeals,
        deleteDealsStagesData,
        LinkDealsStagePublish,
        getSequence,
        deleteSequencedatalist
         
       
        },
        dispatch
      );
    
    export default connect(mapStateToProps, mapDispatchToProps)(AddStageComponent);




