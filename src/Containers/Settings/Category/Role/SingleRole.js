import React, { Component } from "react";
import { Button,Tooltip } from "antd";
import {  TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DeleteOutlined } from "@ant-design/icons";
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
      role: { roleType, roleTypeId, departmentName, departmentId },
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
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                 <div class=" font-semibold" >{roleType}</div>
                 <div class=" font-semibold" >
                  {departmentName}
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
                    <DeleteOutlined
                  
                        onClick={() => handleDeleteRole(roleTypeId)}
                    
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
                        color: "red",
                      }}
                    />
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
                    Loading={updatingRoles}
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

export default SingleRole;



