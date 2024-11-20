import React, { useState,useEffect } from "react";
import { Button,Select, Input,Popconfirm } from "antd";
import {addProcessStageForDeals,

  updateStageForDeals,
  deleteDealsStagesData,
  LinkDealsStagePublish,
        updateStageForDeals
   
     } from "../../../SettingsAction"
    


     import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";




import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
//   const initialStages = []; // Can be empty or pre-filled
  const [stages, setStages] = useState(props.dealsProcessStages);
  const [showAddButton, setShowAddButton] = useState(true);

//   const addNewStage = () => {
//     setStages([
//       ...stages,
//       { stagesId: Date.now(), stageName: "", probability: "", days: "", 
//         isEditing: true 
//     },
    
//     ]);
//     setShowAddButton(false);
//   };


useEffect(() => {
    if (props.dealsProcessStages) {
        setStages(props.dealsProcessStages);
    }
  }, [props.dealsProcessStages]);


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

//   const handleSave = (stagesId) => {
//     setStages(stages.map((stage) => (stage.stagesId === stagesId ? { ...stage, 
//         isEditing: false } : stage)));
//     setShowAddButton(true);
//     setEditingStageId(null);
//   };

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

//   const handleCancel = (stagesId) => {
//     setStages(stages.filter((stage) => stage.stagesId !== stagesId));
//     setShowAddButton(true);
//   };

const handleCancel = (stagesId) => {
   // setStages(stages.filter((stage) => stage.stagesId !== stagesId));
    //setEditingStageId(null);
    setShowAddButton(true);
  };


  const handleStagePublishClick = (stagesId, publishInd) => {
    const data = {
      stagesId,
      publishInd: publishInd ? false : true,
    };
  props.LinkDealsStagePublish(data, );
   };


//   const handleInputChange = (stagesId, field, value) => {
//     setStages(
//       stages.map((stage) =>
//         stage.stagesId === stagesId ? { ...stage, [field]: value } : stage
//       )
//     );
//   };



const handleInputChange = (stagesId, field, value) => {
    setStages(
      stages.map((stage) =>
        stage.stagesId === stagesId ? { ...stage, [field]: value } : stage
      )
    );
  };

  const handleEdit = (stagesId) => {
    // const stageToEdit = stages.find((stage) => stage.stagesId === stagesId);
    // console.log("Editing Stage:", stageToEdit); // Log the stage being edited
    // let result={
    //   stageName:savedStage1.stageName,
    //   stagesId:savedStage1.stagesId,
    // }
    // props.updateStageForDeals(result,savedStage1.stagesId)
    setEditingStageId(stagesId);
    setShowAddButton(false);
  };


  const toggleAction = (id, action) => {
    if (action === "Yes") {
      setYesState((prev) => ({
        ...prev,
        [id]: !prev[id], // Toggle the state visibility
      }));
    } else if (action === "No") {
      setNoState((prev) => ({
        ...prev,
        [id]: !prev[id], // Toggle the state visibility
      }));
    } else if (action === "No Action") {
      setNoActionState((prev) => ({
        ...prev,
        [id]: !prev[id], // Toggle the state visibility
      }));
    }
  };
  console.log(stages)
  return (
    <div style={{ padding: "20px" }}>
      {/* {showAddButton && ( */}
        <Button type="primary" onClick={addNewStage} style={{ marginBottom: "20px" }}>
          Add Stage
        </Button>
      {/* )} */}
      <div
        style={{
          maxHeight: "300px", // Set a fixed height for the container
          overflowY: "auto", // Enable vertical scrolling
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "5px",
        }}
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
              <BorderColorIcon
               onClick={() => handleEdit(stage.stagesId)}
              />
                                 <Popconfirm
  title="Do you want to delete?"
  okText="Yes"
  cancelText="No"
  onConfirm={() => props.deleteDealsStagesData(stage.stagesId)}
>
  <DeleteIcon type="delete" style={{ cursor: "pointer", color: "red" }} />
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
                      onClick={() => toggleAction(stage.stagesId, "Yes")}
                      style={{ marginRight: "5px" }}
                    >
                      Next
                    </Button>
                    <Button
                      type="default"
                      onClick={() => toggleAction(stage.stagesId, "No")}
                      style={{ marginRight: "5px" }}
                    >
                      Else
                    </Button>
                    <Button
                      type="default"
                      onClick={() => toggleAction(stage.stagesId, "No Action")}
                    >
                      No Action
                    </Button>
                  </div>
          
            </div>
            
           
          )}
         
        </div>
        {yesState[stage.stagesId] && (
            
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
                  onChange={(value) => console.log("Yes Selected:", value)}
                >
                   <Option value=">Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                </Select>
              </div>
            )}
              {noState[stage.stagesId] && (
              
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
                  style={{ width: "100%" }}
                  onChange={(value) => console.log("No Selected:", value)}
                >
                 <Option value=">Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                </Select>
              </div>
            )}
            {noActionState[stage.stagesId] && (
              // <div
              //   style={{
              //     // position: "absolute",
              //     top: "0",
              //     left: "105%",
              //     width: "200px",
              //   }}
              // >
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
                  onChange={(value) =>
                    console.log("No Action Selected:", value)
                  }
                >
                   <Option value=">Next Step">Next Step</Option>
                      <Option value="Jump to">Jump to</Option>
                      <Option value="Stop">Stop</Option>
                      <Option value="Repeat">Repeat</Option>
                </Select>
              </div>
            )}
        </div>
          {index < stages.length - 1 && (
            <div
              style={{
                width: "3px",
                height: "38px",
                backgroundColor: "#1890ff",
                // margin: "8px auto",
                marginLeft:"48px"
              }}
            ></div>
          )}
          </>
      ))}
      </div>
    </div>
  );
};


const mapStateToProps = ({ settings, auth }) => ({
    token: auth.token,
      dealsProcessStages: settings.dealsProcessStages,
      primaryOrgType:auth.userDetails.primaryOrgType,
     orgId: auth.userDetails && auth.userDetails.organizationId,
    });
    
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {
         
        addProcessStageForDeals,
        updateStageForDeals,
        deleteDealsStagesData,
        LinkDealsStagePublish
         
       
        },
        dispatch
      );
    
    export default connect(mapStateToProps, mapDispatchToProps)(AddStageComponent);




