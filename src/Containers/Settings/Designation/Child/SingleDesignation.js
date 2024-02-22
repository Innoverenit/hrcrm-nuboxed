import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button,Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleDesignation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      designationType: "",
      editInd: true,
    };
  }
  render() {
    const {
      designation: { designationType, creationDate,designationTypeId },
      handleChange,
      name,
      value,
      linkedDesignations,
      updatingDesignations,
      handleUpdateDesignation,
      handleDeleteDesignation,
    } = this.props;
    console.log(linkedDesignations);
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" font-semibold" >
                  {designationType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                <div>
                  {this.props.designation.editInd ? (
                    <BorderColorIcon
                    
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}
               
                  <Tooltip title="Delete">
                    <DeleteOutlined
    
                      onClick={() => handleDeleteDesignation(designationTypeId)}
                  
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
                        color: "red",
                      }}
                    />
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
                    handleIconClick={() => handleDeleteDesignation(designationTypeId)}
                    size="0.75em"
                    theme="filled"
                    style={{ color: "#666" }}
                  />*/}
                </div>
              </div>
            ) : (
              <div class=" flex">
                <TextInput
                  name={name}
                  // value={value || designationType}
                  defaultValue={designationType}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDesignations}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateDesignation(
                        designationTypeId,
                        value,
                        toggleViewType()
                      )
                    }
                  >
                    {/* Save */}
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default SingleDesignation;

