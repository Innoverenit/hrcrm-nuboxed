import React from "react";
import { TextInput, ViewEditCard } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import styled from "styled-components";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button } from "antd";

class SingleProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      fields: {},
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

  render() {
    console.log(this.state.fields.recruitmentProcessName);
    return (
      <div>
        <StageWrapper>
          <ViewEditCard>
            {({ viewType }, toggleViewType) =>
              viewType === "view" ? (
                <FlexContainer
                  justifyContent="center"
                  alignItems="center"
                  onClick={() =>
                    this.props.handleworkflowClick(this.props.workflow)
                  }
                  style={{
                    backgroundColor:
                      this.props.current &&
                      this.props.current.recruitmentProcessId ===
                      this.props.workflow.recruitmentProcessId &&
                      "rgb(161, 185, 185)",
                  }}
                >
                  <StageName>
                    {this.props.workflow.recruitmentProcessName}
                  </StageName>
                  <BorderColorIcon
                    tooltipTitle="Edit"
                    iconType="edit"
                    handleIconClick={toggleViewType}
                     className=" !text-red-600 cursor-pointer !text-icon "
                  />
                </FlexContainer>
              ) : (
                  <FlexContainer alignItems="center">
                    <br />
                    <TextInput
                      placeholder="Process Name"
                      name="recruitmentProcessName"
                      defaultValue={this.props.workflow.recruitmentProcessName}
                      onChange={this.handleChange}
                      width={"100%"}
                    />

                    <FlexContainer justifyContent="flex-end" marginTop="0.3125em">
                      <Button
                        style={{
                          border: "0.0625em solid #1890ff",
                          color: "#1890ff",
                        }}
                        htmlType="submit"
                        onClick={() =>
                          this.props.handleUpdateProcess(
                            this.props.workflow.recruitmentProcessId,
                            this.state.fields.recruitmentProcessName,
                            toggleViewType()
                          )
                        }
                      >
                        {/* Save */}
                        Save
                    </Button>
                    &nbsp;
                    <Button
                        style={{
                          border: "0.0625em solid #1890ff",
                          color: "#1890ff",
                        }}
                        onClick={() => toggleViewType()}
                      >
                     
                       Save                       
                    </Button>
                    </FlexContainer>
                  </FlexContainer>
                )
            }
          </ViewEditCard>
        </StageWrapper>
      </div>
    );
  }
}

export default SingleProfileView;
const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  flex-basis: 80%;
  // margin-bottom: 0;
  margin: 0;
`;
