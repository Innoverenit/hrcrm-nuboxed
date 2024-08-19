// import React, { Component,lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button } from "antd";
// import { Formik, Form, Field } from "formik";
// import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";

// import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
//  import { addApprove, getApproveData } from "../../../../Settings/SettingsAction";
// import {getDepartments} from "../../../Department/DepartmentAction"
// import {
//     getRoles,
//   } from "../../../../Settings/Category/Role/RoleAction";
// import { FormattedMessage } from "react-intl";
// const LevelApproveForm = lazy(() => import("./LevelApproveForm"));
// class ApproveForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             approve: false,
//             type: true,
//             amendment: true
//         };
//     }
//     handleApproveToggle = (checked) => {
//         console.log(checked);
//         this.setState({
//             approve: checked,
//         });
//     };

//     handleApproveType = (checked) => {
//         console.log(checked);
//         this.setState({
//             type: checked,
//         });
//     };


// //  componentDidMount() {
// //          this.props.getDepartments();
// //          this.props.getRoles(this.props.organizationId);
// //      this.props.getApproveData(this.props.label);
// //  }
// componentDidMount() {
//     this.fetchHolidayData();
//   }


//  componentDidUpdate(prevProps) {
//     // Check if the country_name prop has changed
//     if (prevProps.label !== this.props.label) {
//       this.fetchHolidayData();
//     }
//   }
//   fetchHolidayData = () => {
//     this.props.getDepartments();
//     this.props.getRoles(this.props.organizationId);
// this.props.getApproveData(this.props.label);
//   }



//  getRoleOptions(filterOptionKey, filterOptionValue) {
//     const roleOptions =
//       this.props.roles.length &&
//       this.props.roles
//         .filter((option) => {
//           if (
//             option.departmentId === filterOptionValue &&
//             option.probability !== 0
//           ) {
//             return option;
//           }
//         })
//         .map((option) => ({
//           label: option.roleType || "",
//           value: option.roleTypeId,
//         }));

//     return roleOptions;
//   };
//     render() {
    
//         const departmentNameOption = this.props.departments.map((item) => {
//             return {
//                 label: `${item.departmentName || ""}`,
//                 value: item.departmentId,
//             };
//         });
//         const roleNameOption = this.props.roles.map((item) => {
//             return {
//                 label: `${item.roleType || ""}`,
//                 value: item.roleTypeId,
//             };
//         });
     

    
//         return (
//             <>
//                 <Formik
//                     enableReinitialize
//                     initialValues={{
//                         // reportingTo: this.props.approvalData.reportingTo || "",
//                         threshold: this.props.approvalData.threshold || "",
//                         departmentId: this.props.approvalData.departmentId || "",
//                         roleTypeId: this.props.approvalData.roleTypeId || "",
//                         jobLevel: this.props.approvalData.jobLevel || 1,
//                         // processName: "BOQ",
//                         subProcessName: this.props.label,
//                         approvalType: this.props.approvalData.approvalType === "Standard" ? true : false,
//                         approvalIndicator: this.props.approvalData.approvalIndicator ? true : false,
                    
//                     }}


//                     onSubmit={(values, { resetForm }) => {
//                         console.log(values);
//                         // if (this.state.approveType) {
//                         this.props.addApprove(
//                             {
//                                 ...values,
//                                 approvalType: values.approvalType ? "Standard" : "Exception",
//                                 approvalIndicator: values.approvalIndicator ? true : false,
                               
//                             },

//                         );
//                         resetForm();
//                     }}
//                 >
//                     {({
//                         errors,
//                         touched,
//                         isSubmitting,
//                         setFieldValue,
//                         setFieldTouched,
//                         values,
//                         ...rest
//                     }) => (
//                         <Form >
//                             <div class=" w-[70%] min-h-{40vh}"
//                              >

//                                 <div>
//                                     <div class=" flex justify-between">
//                                         <div class=" flex w-[20%]"
                                     
//                                         >
//                                             <div class=" text-xs font-bold font-poppins text-black">Approval Needed</div>
//                                             &nbsp;&nbsp;
//                                         </div>

//                                         <div class=" flex justify-between w-[30%]"
                                        
//                                         >
//                                             <div class=" w-[30%]">

//                                                 <Field
//                                                     name="approvalIndicator"
//                                                     component={SwitchComponent}
//                                                      data={values.approvalIndicator}
//                                                     checkedChildren={"Yes"}
//                                                     unCheckedChildren={"No"}
//                                                     width={"5em"}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 {values.approvalIndicator ? (
//                                     <div class=" mt-4">
                                     
                                     
//                                         <div>
//                                         {/* <div class=" flex justify-between "
                                        
//                                         >
//                                                 <div class=" flex w-[20%] mb-[2%]"
                                              
//                                                 >
//                                                     <div class=" text-xs font-bold font-poppins text-black">Type</div>

//                                                 </div>

//                                                 <div class=" flex justify-between w-[30%]"
                                        
//                                         >
//                                                     <div class=" w-[40%]">

//                                                         <Field
//                                                             name="approvalType"
//                                                             component={SwitchComponent}
//                                                              data={values.approvalType}
//                                                             checkedChildren={"Standard"}
//                                                             unCheckedChildren={"Exception"}
//                                                             width={"8em"}
//                                                         />

//                                                     </div>
//                                                 </div>
//                                             </div> */}
//                                         </div>
                          
//                                         <div class=" mt-4" >
                                           
//                                                 <LevelApproveForm
                                                  
//                                                     approvalIndicator={values.approvalIndicator ? true : false}
//                                                     approvalType={values.approvalType ? "Standard" : "Exception"}
//                                                 />
                      
//                                         </div>


//                                         {/* {!values.approvalType ? */}
//                                             {/* <div class=" flex justify-end " 
//                                                 // style={{ marginLeft: "104%", marginTop: "52px" }}
//                                                 >
//                                                 <Button
//                                                     type="primary"
//                                                     htmlType="submit"
//                                                      loading={this.props.addingApprove}
//                                                     style={{
//                                                         marginRight: "-230px",
//                                                         marginTop: "52px",
//                                                         marginBottom: "5px",
//                                                     }}
//                                                 >
//                                                     Update
//                                                 </Button>
//                                             </div> */}
//                                            {/* : null} */}
//                                     </div>
//                                  ) : (null)} 

//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </>
//         );
//     }
// }

// const mapStateToProps = ({ settings, departments,auth,role,designations }) => ({
//      addingApprove: settings.addingApprove,
//     departments:departments.departments,
//     designations: designations.designations,
//     approvalData: settings.approvalData,
//     roles: role.roles,
//     organizationId: auth.userDetails.organizationId,

// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//          addApprove,
//          getDepartments,
//          getRoles,
//         //  getDesignations,
//         getApproveData,
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(ApproveForm);









import React, { useState, useEffect } from 'react';
import { Switch, Select, Form, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { getApproveData,addApprove } from "../../../SettingsAction";
import { bindActionCreators } from "redux";
import { getDepartments } from "../../../Department/DepartmentAction";
import { base_url } from '../../../../../Config/Auth';

const { Option } = Select;

const ApprovalSwitchComponent = (props) => {
  const [role, setRole] = useState([]);
  const [isLoadingRole, setIsLoadingRole] = useState(false);
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false);
  const [departmentList, setDepartmentList] = useState([{ department: null, role: null }]);

  useEffect(() => {
    props.getDepartments();
    fetchHolidayData();
  }, []);

  const fetchHolidayData = () => {
    props.getApproveData(props.label);
  };

  useEffect(() => {
    fetchHolidayData();
  }, [props.label]);

  useEffect(() => {
    // Default to empty array if `approvalData.level` is undefined
    const approvalData = props.approvalData || { approvalIndicator: false, level: [] };
    const mappedData = Array.isArray(approvalData.level) 
      ? approvalData.level.map(item => ({
          department: item.levelId,
          role: item.roleType,
        }))
      : []; // Ensure `mappedData` is always an array
  
    setDepartmentList(mappedData);
    setIsApprovalNeeded(approvalData.approvalIndicator);
  }, [props.approvalData]);

  const handleSwitchChange = (checked) => {
    setIsApprovalNeeded(checked);
    if (!checked) {
      setDepartmentList([{ department: null, role: null }]);
    }
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartmentList = [...departmentList];
    updatedDepartmentList[index].department = value;
    updatedDepartmentList[index].role = null; // Reset role when department changes
    setDepartmentList(updatedDepartmentList);
    console.log("Selected Department:", value);
    fetchRole(value);
  };

  const handleRoleChange = (index, value) => {
    const updatedDepartmentList = [...departmentList];
    updatedDepartmentList[index].role = value;
    setDepartmentList(updatedDepartmentList);
    console.log("Selected Role:", value);
  };

  const addDepartmentField = () => {
    setDepartmentList([...departmentList, { department: null, role: null }]);
  };

  const handleSubmit = () => {
    const dataToSubmit = {
        approvalType: "Standard",
        subProcessName: props.label,
        jobLevel: props.approvalData.jobLevel || 1,
      approvalIndicator: isApprovalNeeded,
      level: departmentList
        .filter(item => item.department !== null)
        .map(item => ({
          level: item.department,
          roleType: item.role
        }))
    };
    props.addApprove(dataToSubmit)

    console.log(dataToSubmit);
    // Implement submission logic here
  };

  const fetchRole = async (value) => {
    setIsLoadingRole(true);
    try {
      const apiEndpoint = `${base_url}/roleType/department/${value}`;
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setRole(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setIsLoadingRole(false);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Approval Needed">
        <Switch checked={isApprovalNeeded} onChange={handleSwitchChange} />
      </Form.Item>

      {isApprovalNeeded && (
        <>
          {departmentList.map((item, index) => (
            <Row gutter={16} key={index} align="middle">
              <Col span={12}>
                <Form.Item label={`Department ${index + 1}`} style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Select Department"
                    onChange={(value) => handleDepartmentChange(index, value)}
                    value={item.department}
                    style={{ width: '100%' }}
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
              </Col>

              <Col span={12}>
                {item.department && item.department !== "ReportingManager" && item.department !== "ReportingManager+1" && (
                  <Form.Item label={`Role ${index + 1}`} style={{ marginBottom: 0 }}>
                    <Select
                      placeholder="Select Role"
                      loading={isLoadingRole}
                      onChange={(value) => handleRoleChange(index, value)}
                      value={item.role}
                      style={{ width: '100%' }}
                    >
                      {role.map((r) => (
                        <Option key={r.roleTypeId} value={r.roleTypeId}>
                          {r.roleType}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              </Col>
            </Row>
          ))}

          <Row justify="start" style={{ marginTop: 16 }}>
            <Col>
              <Button type="dashed" onClick={addDepartmentField} icon={<PlusOutlined />} style={{ marginRight: 8 }}>
                Add Department
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

const mapStateToProps = ({ settings, role, auth, departments }) => ({
  departments: departments.departments || [],
  roles: role.roles || [],
  approvalData: settings.approvalData || { approvalIndicator: false, level: [] },
  userId: auth.userDetails.userId,
  token: auth.token,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDepartments,
      getApproveData,
      addApprove
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalSwitchComponent);




