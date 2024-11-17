import React, { Component } from "react";
import styled from "styled-components";

import { Button,Tooltip } from "antd";
import { TextInput } from "../../../../../Components/UI/Elements";
import ViewEditCard from "../../../../../Components/UI/Elements/ViewEditCard";
import WorkflowDocumentToggle from "./WorkflowDocumentToggle";
class WorkflowSingleDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentTypeName: "",
    };
  }
  render() {
    const {
      document: { documentTypeName, mandatoryInd,processId, documentTypeId },
      handleChange,
      name,
      value,
      linkedDocuments,
      updatingDocuments,
      handleUpdateDocument,
      handleDeleteDocument,
    } = this.props;
    console.log(linkedDocuments);
    return (
      <DocumentWrapper>
        
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div>
              
              <div class=" flex flex-row flex-wrap items-start self-start justify-evenly grow shrink h-auto mr-auto ">
               
                  <div style={{width:"55%"}}>
                  {/* <Checkbox> */}
                  <DocumentName style={{ flexBasis: "90%" }}>
                    {documentTypeName}
                  </DocumentName>
                  {/* </Checkbox> */}
                  </div>
                 
                  <div style={{width:"35%"}}>
                    <WorkflowDocumentToggle
                      mandatoryInd={mandatoryInd}
                      documentTypeName={documentTypeName}
                      documentTypeId={documentTypeId}
                      processId={processId}
                    />  
                    </div>
                    <div style={{width:"5%"}}>               
                 
                    </div>
                    <div style={{width:"5%"}}> 
                     <Tooltip title="Delete">
              
                  </Tooltip>                
                  </div>
                </div>
         
              </div>
            ) : (
              <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                <TextInput
                  name={name}
                  // value={value || documentTypeName}
                  defaultValue={documentTypeName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDocuments}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateDocument(
                        documentTypeId,
                        processId,
                        value,
                        toggleViewType()
                      )
                    }
                  >
                  
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                  
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
       
      </DocumentWrapper>
      
    );
  }
}

export default WorkflowSingleDocument;

const DocumentWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const DocumentName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DocumentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
