
import React, { useState, useEffect } from 'react';
import { Switch, Select, Form, Button, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { addApprove } from "../../../SettingsAction";
import { bindActionCreators } from "redux";
import { getDepartments } from "../../../Department/DepartmentAction";
import { base_url } from '../../../../../Config/Auth';

const { Option } = Select;

const ApprovalSwitchComponent = (props) => {
  const [departmentRoles, setDepartmentRoles] = useState({}); // Store roles per department
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false);
  const [departmentList, setDepartmentList] = useState([{ department: null, role: null, threshold: "" }]);

  useEffect(() => {
    props.getDepartments();
  }, []);

  useEffect(() => {
    const approvalData = props.approvalData || { approvalIndicator: false, level: [] };
    const mappedData = Array.isArray(approvalData.level)
      ? approvalData.level.map(item => ({
          department: item.levelId,
          role: item.roleTypeId,
          threshold: item.threshold
        }))
      : [];

    setDepartmentList(mappedData);
    setIsApprovalNeeded(approvalData.approvalIndicator);

    // Fetch roles for each department in the mappedData
    mappedData.forEach(item => {
      if (item.department) {
        fetchRole(item.department, item.role);
      }
    });
  }, [props.approvalData]);

  const handleSwitchChange = (checked) => {
    setIsApprovalNeeded(checked);
    if (!checked) {
      setDepartmentList([{ department: null, role: null, threshold: "" }]);
      setDepartmentRoles({});
    }
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartmentList = [...departmentList];
    updatedDepartmentList[index].department = value;
    updatedDepartmentList[index].role = null; // Reset role when department changes
    setDepartmentList(updatedDepartmentList);
    fetchRole(value);
  };

  const handleRoleChange = (index, value) => {
    const updatedDepartmentList = [...departmentList];
    updatedDepartmentList[index].role = value;
    setDepartmentList(updatedDepartmentList);
  };

  const handleAdditionalInfoChange = (index, e) => {
    const updatedDepartmentList = [...departmentList];
    updatedDepartmentList[index].threshold = e.target.value;
    setDepartmentList(updatedDepartmentList);
  };

  const addDepartmentField = () => {
    setDepartmentList([...departmentList, { department: null, role: null, threshold: "" }]);
  };

  const handleSubmit = () => {
    const filteredDepartments = departmentList.filter(item => item.department !== null);
    const dataToSubmit = {
      approvalType: "Standard",
      subProcessName: props.activeKey,
      levelCount: filteredDepartments.length,
      approvalIndicator: isApprovalNeeded,
      level: departmentList
        .filter(item => item.department !== null)
        .map(item => ({
          levelId: item.department,
          roleTypeId: item.role,
          threshold: item.threshold ? item.threshold : "",
        }))
    };
    props.addApprove(dataToSubmit);

    console.log(dataToSubmit);
    // Implement submission logic here
  };

  const fetchRole = async (departmentId, currentRole) => {
    if (departmentRoles[departmentId]) return; // Avoid refetching if already fetched
    setDepartmentRoles(prevRoles => ({ ...prevRoles, [departmentId]: [] }));

    try {
      const apiEndpoint = `${base_url}/roleType/department/${departmentId}`;
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setDepartmentRoles(prevRoles => ({ ...prevRoles, [departmentId]: data }));

      // Set role for the existing department if provided
      if (currentRole) {
        const updatedDepartmentList = [...departmentList];
        const departmentIndex = updatedDepartmentList.findIndex(item => item.department === departmentId);
        if (departmentIndex !== -1) {
          updatedDepartmentList[departmentIndex].role = currentRole;
          setDepartmentList(updatedDepartmentList);
        }
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  return (
    <Form class="flex">
      <Form.Item  className='flex flex-row ml-2'>
        <div class="font-bold text-sm font-poppins w-max">Approval Needed</div>
        <Switch 
          checkedChildren="Yes"
          unCheckedChildren="No"
          checked={isApprovalNeeded} 
          onChange={handleSwitchChange} 
        />
      </Form.Item>

      {isApprovalNeeded && (
        <>
          {departmentList.map((item, index) => (
            <div class="flex flex-row justify-center" gutter={16} key={index} >
              <div className="ml-2 text-xs font-bold font-poppins w-[17vw]">
                <Form.Item label={`Level ${index + 1}`}>
                  <Select className='w-[41%]'
                    placeholder="Select Department"
                    onChange={(value) => handleDepartmentChange(index, value)}
                    value={item.department}
                 
                  >
                    <Option value="ReportingManager">Reporting Manager</Option>
                    <Option value="ReportingManager+1">Reporting Manager +1</Option>
                    {props.departments.map((dept) => (
                      <Option key={dept.departmentId} value={dept.id}>
                        {dept.departmentName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="ml-2 text-xs font-bold font-poppins w-12vw]">
                {item.department && item.department !== "ReportingManager" && item.department !== "ReportingManager+1" && (
                  <Form.Item label={""} >
                    <Select className='w-[41%]'
                      placeholder="Select Role"
                      onChange={(value) => handleRoleChange(index, value)}
                      value={item.role}
                     
                    >
                      {departmentRoles[item.department]?.map((r) => (
                        <Option key={r.roleTypeId} value={r.roleTypeId}>
                          {r.roleType}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              </div>

              {["Leave", "Mileage", "Expense"].includes(props.activeKey) && (
                 <div className="ml-2 text-xs font-bold font-poppins w-[12vw]">
                  <Form.Item label="" >
                    <Input  className='w-[41%]'
                      placeholder="Enter threshold"
                      value={item.threshold}                    
                      onChange={(e) => handleAdditionalInfoChange(index, e)}
                    />
                  </Form.Item>
                </div>
              )}
            </div>
          ))}

          <div className=' flex  mt-12 justify-start'>
          <div className="ml-2 text-xs font-bold font-poppins w-[10vw]">
              <Button type="dashed" onClick={addDepartmentField} icon={<PlusOutlined />}  >
                Add Level
              </Button>
            </div>
            <div className=" flex-col text-xs font-bold font-poppins w-[7vw]">
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  );
};

const mapStateToProps = ({ settings, role, auth, departments }) => ({
  departments: departments.departments || [],
  // roles: role.roles || [],
  userId: auth.userDetails.userId,
  token: auth.token,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDepartments,
      addApprove
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalSwitchComponent);





