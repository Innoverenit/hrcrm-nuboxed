import React, { Component } from "react";
import { Button ,Popconfirm,Tooltip} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeTalentRole} from "../Role/RoleAction"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DeleteOutlined } from "@ant-design/icons";
import { TextInput } from "../../../../Components/UI/Elements";
import dayjs from "dayjs";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
const { Option } = Select;

class SingleRoleTalent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      roleType: "",
      departmentName: "",
      departmentId:"",
      editInd:true,
    };
  }
  render() {
    const {
        talentRole: { roleType,creationDate, roleTypeExternalId,departmentName,departmentId },
      handleChange,
      name,
      value,
      handleDepartment,
    linkedRoles,
    updatingTalentRoles,
      handleDeleteTalentRole,
      handleUpdateTalentRole,
    //   handleDeleteDepartment,
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
                  <div class=" font-semibold" >
                  {roleType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
             
                <div>
                  {this.props.talentRole.editInd ? (
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
                          onConfirm={() => this.props.removeTalentRole(roleTypeExternalId )}
                        >
                    <DeleteOutlined
                  
                        // onClick={() => handleDeleteTalentRole(roleTypeExternalId)}
                    
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
                        color: "red",
                      }}
                    />
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
                    style={{ width: "100%" }}
                  />
             
             
                 
                  <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingTalentRoles}
                    disabled={!value}
                  onClick={() => handleUpdateTalentRole(roleTypeExternalId, value, toggleViewType())}
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
      removeTalentRole
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleRoleTalent);



