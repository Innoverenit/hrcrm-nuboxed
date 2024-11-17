import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextInput } from "../../../../Components/UI/Elements";


class SingleLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      LevelName: "",
      editInd: true,
    };
  }
  render() {
    const {
      sector: { LevelName, sectorId, EditInd },
      handleChange,
      name,
      value,
      linkedSectors,
    //   updatingSectors,
      handleUpdateSector,
      handleDeleteSector,
    } = this.props;
    console.log(linkedSectors);
    console.log("name", name);
    return (
      <LevelWrapper>
        {/* <ViewEditCard> */}
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                <LevelName style={{ flexBasis: "85%" }}>
                  {LevelName}
                </LevelName>
                <div>
                  {this.props.sector.editInd ? (
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
                        onClick={() => handleDeleteSector(sectorId)}
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
               
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    // loading={updatingSectors}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateSector(sectorId, value, toggleViewType())
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
        {/* </ViewEditCard> */}
      </LevelWrapper>
    );
  }
}

export default SingleLevel;

const LevelWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const LevelName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const SectorValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
