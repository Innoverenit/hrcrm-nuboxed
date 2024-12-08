
import React, { useState, useEffect } from 'react';
import { Input, Button, Select } from 'antd';
import { connect } from "react-redux";
import { base_url } from "../../../../../Config/Auth";
import { bindActionCreators } from "redux";

import MoveToggleTaskStage from "../../Child/RecruitmentTab/MoveToggleTaskStage";
import { addProcessTaskStage, getProcessTaskStage, deleteTaskStageData,updateProcessTaskStage } from "../../../SettingsAction";
import { StyledPopconfirm } from '../../../../../Components/UI/Antd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const { Option } = Select;

const MyForm = (props) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoadingRole, setIsLoadingRole] = useState(false);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [touchedDepartment, setTouchedDepartment] = useState(false);
  const [isLoadingDepartment, setIsLoadingDepartment] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);

  useEffect(() => {
    props.getProcessTaskStage(props.orgId, props.currentItem.stagesId);  
  }, [props.currentItem.stagesId, props.orgId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      stageTaskName: name,
      departmentId: selectedDepartment,
      stageId: props.currentItem.stagesId,
    };
    console.log(data);
    props.addProcessTaskStage(data);
  };

  const fetchDepartment = async () => {
    setIsLoadingDepartment(true);
    try {
      const apiEndpoint = `${base_url}/department/accesss/${props.orgId}`;
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setDepartment(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingDepartment(false);
    }
  };

  const handleSelectDepartmentFocus = () => {
    if (!touchedDepartment) {
      fetchDepartment();
      setTouchedDepartment(true);
    }
  };

  const handleSelectDepartment = (departmentId) => {
    setSelectedDepartment(departmentId);
    fetchRole(departmentId);
    //console.log('Selected department:', value);
  };

  const handleRoleChange=(value)=>{
    setSelectedRole(value);
  }

  const startEditing = (item) => {
    setEditingRow(item.stagesTaskId);
    setEditingName(item.stageTaskName);
    setEditingDepartment(item.departmentId);
  };

  const saveEditing = (item) => {
    const data = {
      // stagesTaskId: item.stagesTaskId,
      stageTaskName: editingName,
      departmentId: editingDepartment,
    };
    console.log(editingName)
    console.log(editingDepartment)
    // Call your update function here
     props.updateProcessTaskStage(
      data,item.stagesTaskId); // Uncomment and define this function in mapDispatchToProps
    setEditingRow(null);
  };

  const cancelEditing = () => {
    setEditingRow(null);
  };


  const fetchRole = async (departmentId) => {
    setIsLoadingRole(true);
    try {
     
      const apiEndpoint = `${base_url}/roleType/department/${departmentId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setRole(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoadingRole(false);
    }
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'block', marginBottom: '8px' }}>Name</div>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            required 
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'block', marginBottom: '8px' }}>Department</div>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select department"
            optionFilterProp="children"
            loading={isLoadingDepartment}
            onFocus={handleSelectDepartmentFocus}
            onChange={handleSelectDepartment}
          >
            {department.map(dept => (
              <Option key={dept.departmentId} value={dept.departmentId}>
                {dept.departmentName}
              </Option>
            ))}
          </Select>
          <div style={{ display: 'block', marginBottom: '8px' }}>Role</div>
          <Select
        placeholder="Select Role"
        loading={isLoadingRole}
        onChange={handleRoleChange}
        disabled={!selectedDepartment} // Disable Contact dropdown if no customer is selected
      >
        {role.map(contact => (
          <Option key={contact.roleTypeId} value={contact.roleTypeId}>
            {contact.roleType}
          </Option>
        ))}
      </Select> 
        </div>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className='flex sticky z-auto' style={{ width: "62em" }}>
        <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className="flex w-[100%]  p-1 bg-transparent font-bold sticky z-10">
            <div className=""></div>
            <div className="md:w-[22.12rem]">Name
            </div>
            <div className=""></div>
            <div className="md:w-[15.5rem]">Department</div>
          </div>
          {props.processTaskedStage.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]">
                  {editingRow === item.stagesTaskId ? (
                    <>
                      <Input 
                        value={editingName} 
                        onChange={(e) => setEditingName(e.target.value)} 
                        style={{ width: '30%' }}
                      />
                      <Select
                       showSearch
                       style={{ width: 200 }}
                       placeholder="Select department"
                       optionFilterProp="children"
                       loading={isLoadingDepartment}
                       onFocus={handleSelectDepartmentFocus}
                       //onChange={handleSelectDepartment}
                        value={editingDepartment}
                        // style={{ width: '30%' }}
                      onChange={(value) => setEditingDepartment(value)}
                      >
                        {department.map(dept => (
                          <Option key={dept.departmentId} value={dept.departmentId}>
                            {dept.departmentName}
                          </Option>
                        ))}
                      </Select>
                      <Button onClick={() => saveEditing(item)} type="link">Save</Button>
                      <Button onClick={cancelEditing} type="link">Cancel</Button>
                    </>
                  ) : (
                    <>
                      <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                        <div className="flex justify-between text-sm font-semibold font-poppins">
                          {item.stageTaskName}
                        </div>
                      </div>
                      <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                        <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                          {item.department} 
                        </div>
                      </div>
                      <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                        <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                          <StyledPopconfirm
                            title="Do you want to delete?"
                            onConfirm={() => props.deleteTaskStageData(item.stagesTaskId, false)}
                          >
                            <DeleteOutlineIcon className="!text-icon cursor-pointer text-[red]" />
                          </StyledPopconfirm>
                        </div>
                      </div>
                      <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                        <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                          <MoveToggleTaskStage item={item} />
                        </div>
                      </div>
                      <Button onClick={() => startEditing(item)} type="link">Edit</Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, customer, settings, employee, catgCustomer, sector, leads }) => ({
  token: auth.token,
  orgId: auth.userDetails.organizationId,
  processTaskedStage: settings.processTaskedStage,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProcessTaskStage,
      getProcessTaskStage,
      deleteTaskStageData,
      updateProcessTaskStage,
      // Add your updateProcessTaskStage action here
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyForm);



