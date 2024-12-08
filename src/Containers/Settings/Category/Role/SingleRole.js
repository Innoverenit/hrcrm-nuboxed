import React, { Component } from "react";
import { Button,Tooltip,Popconfirm } from "antd";
import {removeRole} from "../Role/RoleAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
import dayjs from "dayjs";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const { Option } = Select;

class SingleRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      roleType: "",
      departmentName: "",
      // departmentId: "",
      editInd: true,
    };
  }
  // handleDepartment = (value) =>
  // this.setState({ departmentId: value });
  render() {
    const {
      role: { roleType,creationDate, roleTypeId, departmentName, departmentId },
      handleChange,
      name,
      value,
      handleDepartment,
      
      linkedRoles,
      updatingRoles,
      handleUpdateRole,
     handleDeleteRole,
    } = this.props;
    console.log(linkedRoles);
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" flex  flex-col ml-4">
                 <div class=" font-semibold w-[8rem]" >{roleType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}</div>
                                  </div>
                 <div class=" flex  flex-col justify-between">
                 <div class=" font-semibold w-[8rem]" >
                  {departmentName}
                </div>
                </div>
                <div>
                  {this.props.role.editInd ? (
                       <BorderColorIcon  
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      // size="0.75em"
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}
                  
                  <Tooltip title="Delete">
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.props.removeRole(roleTypeId )}
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
                  // value={value || departmentName}
                  defaultValue={roleType}
                  onChange={handleChange}
                  style={{ width: "40%" }}
                />
                <Select
                  defaultValue={departmentName}
                  style={{ width: "30%" }}
                  placeholder="Select Department"
                  onChange={handleDepartment}
                >
                  {this.props.departments.map((item) => {
                    return (
                      <Option value={item.departmentId}>
                        {item.departmentName}{" "}
                      </Option>
                    );
                  })}
                </Select>
             
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingRoles}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateRole(
                        roleTypeId,
                        value,
                        this.props.departmentId,
                        departmentName,
                        toggleViewType()
                      )
                    }
                  >
                    Update
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
      removeRole,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleRole);




