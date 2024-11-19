import React, { useState,useEffect } from "react";
import { Button, Input } from "antd";
import {addProcessStageForDeals,
  updateStageForDeals
   
     } from "../../../SettingsAction"


     import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { EditOutlined } from "@ant-design/icons";

const AddStageComponent = (props) => {

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

    props.addProcessStageForDeals(savedStage)
  };

//   const handleCancel = (stagesId) => {
//     setStages(stages.filter((stage) => stage.stagesId !== stagesId));
//     setShowAddButton(true);
//   };

const handleCancel = (stagesId) => {
    setStages(stages.filter((stage) => stage.stagesId !== stagesId));
    setEditingStageId(null);
    setShowAddButton(true);
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
    const savedStage1 = stages.find((stage) => stage.stagesId === stagesId);
    console.log("Saved Stage:", savedStage1); // Log the saved stage values
    let result={
      stageName:savedStage1.stageName,
      stagesId:savedStage1.stagesId,
    }
    props.updateStageForDeals(result,savedStage1.stagesId)
    setEditingStageId(stagesId);
    setShowAddButton(false);
  };
  console.log(stages)
  return (
    <div style={{ padding: "20px" }}>
      {/* {showAddButton && ( */}
        <Button type="primary" onClick={addNewStage} style={{ marginBottom: "20px" }}>
          Add Stage
        </Button>
      {/* )} */}

      {stages.map((stage) => (
        <div
          key={stage.stagesId}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px",
            width:"19em"
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
              <EditOutlined
               onClick={() => handleEdit(stage.stagesId)}
              />
            </div>
           
          )}
        </div>
      ))}
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
        updateStageForDeals
         
       
        },
        dispatch
      );
    
    export default connect(mapStateToProps, mapDispatchToProps)(AddStageComponent);




