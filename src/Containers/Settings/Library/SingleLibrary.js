import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button,Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import dayjs from "dayjs";
import { StyledPopconfirm } from "../../../Components/UI/Antd";

class SingleLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
    };
  }
  render() {
    const {
      library: { name,creationDate, definationId },
      handleChange,
      data,
      value,
      linkedLibrarys,

      updatingLibrarys,
      handleUpdateLibrary,
      handleDeleteSkill,
    } = this.props;
    console.log(linkedLibrarys);
    console.log("name", data);
    const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <LibraryWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <LibraryName style={{ flexBasis: "85%" }}>{name} &nbsp;&nbsp;
            {date === currentdate ? <span className="blink">New</span> : null}</LibraryName>
                <div>
                  {this.props.library.editInd ? (
        <span
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                  
                   >
                     <BorderColorIcon     style={{fontSize:"1rem"}}/>
                   </span>
                  ) : null}
                  &nbsp;
                  &nbsp;
                  <Tooltip title="Delete">
                  <StyledPopconfirm
              // title="Do you want to delete?"
              title={<FormattedMessage id="app.doyouwanttodelete" defaultMessage="Do you want to delete" />}
              onConfirm={() => handleDeleteSkill(definationId)}
            >
                    <DeleteOutlined
                        // onClick={() => handleDeleteSkill(definationId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                     </StyledPopconfirm>
                  </Tooltip>
                  {/* {disableDelete && <ActionIcon
                                        tooltipTitle='Delete'
                                        iconType='delete'
                                        handleIconClick={() => handleDeleteSource(documentTypeId)}
                                        size='0.75em'
                                        theme='filled'
                                        style={{ color: '#666' }}
                                    />} */}
                  {/* <ActionIcon
                    tooltipTitle="Delete"
                    iconType="delete"
                    handleIconClick={() => handleDeleteLibrary(definationId)}
                    size="0.75em"
                    theme="filled"
                    style={{ color: "#666" }}
                  />*/}
                </div>
              </div>
            ) : (
              <div class=" flex">
                <TextInput
                  name={data}
                  // value={value || libraryType}
                  defaultValue={name}
                  onChange={handleChange}
                  style={{ width: "61%" }}
                />
                <br />
             
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingLibrarys}
                    // disabled={!value}
                    onClick={() =>
                      handleUpdateLibrary(definationId, value, toggleViewType())
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
      </LibraryWrapper>
    );
  }
}

export default SingleLibrary;

const LibraryWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const LibraryName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const LibraryValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;


const AppIcon1 = (props) => (
  
  <BorderColorIcon

  />


);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
