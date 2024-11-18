import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      projectName: "",
      editInd: true,
    };
  }
  render() {
    const {
      project: {
        
        projectName,
         projectId
         },
      handleChange,
      name,
      value,
      linkedTasks,
      updatingProjectsData,
      handleUpdateProject,
      handleDeleteProject,
    } = this.props;

    return (
      <ProjectWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex flex-row flex-wrap items-start self-start justify-between  grow shrink h-auto mr-auto ">
                <ProjectName style={{ flexBasis: "85%" }}>
                  {projectName}
                  </ProjectName>
                <div>
                  {/* {this.props.project.editInd ? ( */}
                    <BorderColorIcon
                   
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                 {/* ) : null}   */}
                  &nbsp;
                  <Tooltip title="Delete">
                    <DeleteIcon
                    
                     onClick={() => handleDeleteProject(projectId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                <TextInput
                   name={name}
                 
                  defaultValue={projectName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                     loading={updatingProjectsData}
                     disabled={!value}
                    onClick={() =>
                      handleUpdateProject(projectId, value, toggleViewType())
                    }
                  >
                  
                  Update
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                 
               Cancel
                  </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
      </ProjectWrapper>
    );
  }
}

export default SingleProject;

const ProjectWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const ProjectName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const ProjectValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
