import React, { Component } from "react";

import { Button,Tooltip } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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

    return (
      <div className="w-[100%] cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div className="font-semibold text-[teal]" >{name} &nbsp;&nbsp;
            {date === currentdate ? <span className="blink">New</span> : null}</div>
      
                <div>
                  {this.props.library.editInd ? (
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
              onConfirm={() => handleDeleteSkill(definationId)}
            >
                    <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
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
                    Loading={updatingLibrarys}
                    // disabled={!value}
                    onClick={() =>
                      handleUpdateLibrary(definationId, value, toggleViewType())
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

export default SingleLibrary;





