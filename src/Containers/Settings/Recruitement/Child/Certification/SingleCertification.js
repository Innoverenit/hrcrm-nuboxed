import React, { Component } from "react";

import { Button,Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../../Components/UI/Elements";
import ViewEditCard from "../../../../../Components/UI/Elements/ViewEditCard";
import dayjs from "dayjs";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";

class SingleCertification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      editInd: true,
    };
  }
  render() {
    const {
      certification: { name,creationDate, certificationId },
      handleChange,
      value,
      data,
      linkedCertification,
      handleUpdateCertification,
      handleDeleteCertification,
      updatingCertifications,
      
    } = this.props;
    console.log();
    const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div className="font-semibold" >{name} &nbsp;&nbsp;{date === currentdate ? <span className="blink">New</span> : null}</div>
                <div>
                  {this.props.certification.editInd ? (
       <BorderColorIcon className="!text-icon  text-red-600"
       tooltipTitle="Edit"
       iconType="edit"
       onClick={toggleViewType}
       
     />
                  ) : null}
                  &nbsp;
                  <Tooltip title="Delete">
                  <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => handleDeleteCertification(certificationId)}
            >
                    <DeleteOutlined className="items-center ml-1 text-red-600 !text-icon"                 
                    />
                     </StyledPopconfirm>
                  </Tooltip>
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
                   Loading={updatingCertifications}
                    //disabled={!value}
                    onClick={() =>
                     handleUpdateCertification(certificationId, value, toggleViewType())
                    }
                  >
                    Save
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
      </div>
    );
  }
}

export default SingleCertification;

const AppIcon1 = (props) => (
  
  <BorderColorIcon
  />
);


