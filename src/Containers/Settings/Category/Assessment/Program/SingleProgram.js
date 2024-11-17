import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextInput } from "../../../../../Components/UI/Elements";
import ViewEditCard from "../../../../../Components/UI/Elements/ViewEditCard";
class SingleProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      educationType: "",
      editInd: true,
    };
  }
  render() {
    const {
      program: { educationType, educationTypeId },
      handleChange,
      name,
      value,
      linkedEducations,
      updatingEducations,
      handleUpdateEducation,
      handleDeleteEducation,
    } = this.props;
    console.log(linkedEducations);
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <EducationWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                <EducationName style={{ flexBasis: "85%" }}>
                  {educationType}
                </EducationName>
                <div>
                  {this.props.stream.editInd ? (
                    <EditIcon
                    
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      size="0.75em"
                    />
                  ) : null}
                  &nbsp;
                  <Tooltip title="Delete">
                    <DeleteIcon
                     
                      onClick={() => handleDeleteEducation(educationTypeId)}
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
                  // value={value || educationType}
                  defaultValue={educationType}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingEducations}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateEducation(
                        educationTypeId,
                        value,
                        toggleViewType()
                      )
                    }
                  >
                    {/* Save */}
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
      </EducationWrapper>
    );
  }
}

export default SingleProgram;

const EducationWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const EducationName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const EducationValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
