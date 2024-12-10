import React, { Component } from "react";

import { Button,Popconfirm,Tooltip } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from "dayjs";
import { connect } from "react-redux";
import {removeDesignations} from "../DesignationAction"
import { bindActionCreators } from "redux";
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
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.props.removeDesignations(designationTypeId )}
                        >
                    <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                      </Popconfirm>
                  </Tooltip>
                 
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
                    loading={updatingDesignations}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateDesignation(
                        designationTypeId,
                        value,
                        toggleViewType()
                      )
                    }
                  >
                    Save
                  </Button>
                
                  <Button type="cancel"  onClick={() => toggleViewType()}>
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

const mapStateToProps = ({ departments, sector }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeDesignations,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleDesignation);


