import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getDepartments } from "../../../Department/DepartmentAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addApprove, getApproveData } from "../../../SettingsAction";
import { getRoles } from "../../../../Settings/Category/Role/RoleAction";
import { Field } from "formik";
const { Option } = Select;

function PhonesPairLevelApproveForm(props) {
  useEffect(() => {
    props.getDepartments();
    props.getRoles(props.organizationId);
  }, []);

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.approvalData.level) {
      setRows(
        props.approvalData.level.map((level, index) => ({
          ...level,
          roleType: props.approvalData.roleType ? props.approvalData.roleType[index] : "",
        }))
      );
      setIsLoading(false);
    }
  }, [props.approvalData.level, props.approvalData.roleType]);

  function buttonOnClick() {
    const data = {
      levelCount: rows.length,
      level: rows.map((row) => ({
        level: row.level,
        threshold: row.threshold,
        roleType: row.roleTypeId,
      })),
      approvalIndicator: props.approvalIndicator,
      approvalType: "Standard",
      subProcessName: "PhonePair",
    };

    console.log(data);
    props.addApprove(data);
  }

  function handleChangeValue(value, index, field) {
    setRows((prevRows) =>
      prevRows.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      })
    );
  }

  function handleAddRowClick() {
    if (rows.length < 3) {
      const newRow = { level: "", threshold: "", roleTypeId: "" };
      setRows((prevRows) => [...prevRows, newRow]);
    }
  }

  function handleDelete(index) {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  }

  function getRoleOptions(departmentId) {
    return props.roles
      .filter((role) => role.departmentId === departmentId)
      .map((option) => ({
        label: option.roleType,
        value: option.roleTypeId,
      }));
  }

  return (
    <div>
      <div className="MainBox">
        <div className="InputBox">
          {rows.map((row, index) => (
            <div key={index}>
              <div className="w-full flex font-bold mt-4 items-center">
                <div className="w-wk">
                  <p>{`Level ${index + 1}`}</p>
                </div>

                <div className="w-[83rem]">
                  <Select
                    name={`level_${index}`}
                    value={row.level}
                    onChange={(value) => handleChangeValue(value, index, "level")}
                  >
                    <Option value={"ReportingManager"}>{"Reporting Manager"}</Option>
                    <Option value={"ReportingManager+1"}>{"Reporting Manager +1"}</Option>

                    {props.departments.map((a) => (
                      <Option key={a.departmentId} value={a.departmentId}>
                        {a.departmentName}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="w-full flex font-bold">
                  <div style={{ width: "5rem" }}></div>
                  {props.departments.some((dept) => dept.departmentId === row.level) && (
                    <div style={{ width: "100%" }}>
                      <Select
                        name={`roleTypeId_${index}`}
                        placeholder="Role"
                        value={row.roleTypeId}
                        onChange={(value) => handleChangeValue(value, index, "roleTypeId")}
                        style={{ width: "100%" }}
                      >
                        {getRoleOptions(row.level).map((option) => (
                          <Option key={option.value} value={option.value}>
                              {option.label} 
                          </Option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  {rows.length > 1 ? (
                    <CloseOutlined onClick={() => handleDelete(index)} />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <div className="button">
              <Button type="primary" onClick={handleAddRowClick}>
                Add Level
              </Button>
            </div>
            <div className="button">
              <Button type="primary" onClick={() => buttonOnClick()}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ settings, role, auth, departments }) => ({
  departments: departments.departments,
  roles: role.roles,
  approvalData: settings.approvalData,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDepartments,
      addApprove,
      getApproveData,
      getRoles,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PhonesPairLevelApproveForm);












// import React, { useEffect, useState } from "react";
// import { Button, Select } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import { getDepartments } from "../../../Department/DepartmentAction";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   addApprove,
//   getApproveData,
// } from "../../../SettingsAction";
// import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
// import { Field } from "formik";
// const { Option } = Select;

// function PhonesPairLevelApproveForm(props) {
//   useEffect(() => {
//     props.getDepartments();
//   }, []);

//   const selectedDepartment = props.departments;
//   const [rows, setRows] = useState(props.approvalData.level || []);
//    const [isLoading, setIsLoading] = useState(true)

//    useEffect(() => {
//     // Once approvalData.level is available, set rows and update isLoading
//     if (props.approvalData.level) {
//       setRows(props.approvalData.level);
//       setIsLoading(false);
//     }
//   }, [props.approvalData.level]);

//   function buttonOnClick() {
//     const data = {
//       levelCount: rows.length,
//       level: rows.map((row) => ({
//         level: row.level,
//         threshold: row.threshold,
//         roleTypeId: row.roleTypeId,
//       })),
//       approvalIndicator: props.approvalIndicator,
//       approvalType: props.approvalType,
//       subProcessName: "PhonePair",
//     };

//     console.log(data);
//     props.addApprove(data);
//   }

//   function handleChangeValue(value, index) {
//     console.log(value)
//     setRows((prevRows) =>
//       prevRows.map((row, i) => {
//         if (i === index) {
//           return { ...row, level: value };
//         }
//         return row;
//       })
//     );
//   }
//   function handleChangeRoleValue(value, index) {
//     console.log(value)
//     setRows((prevRows) =>
//       prevRows.map((row, i) => {
//         if (i === index) {
//           return { ...row, roleTypeId: value };
//         }
//         return row;
//       })
//     );
//   }

//   function handleChangeValue1(value, index) {
//     setRows((prevRows) =>
//       prevRows.map((row, i) => {
//         if (i === index) {
//           return { ...row, threshold: value };
//         }
//         return row;
//       })
//     );
//   }
//   // function handleChangeRoleValue(value, index) {
//   //   setRows((prevRows) =>
//   //     prevRows.map((row, i) => {
//   //       if (i === index) {
//   //         return { ...row, threshold: value };
//   //       }
//   //       return row;
//   //     })
//   //   );
//   // }
//   function handleAddRowClick() {

//     if (rows.length < 3) {
//       const newRow = { level: "", threshold: "" };
//       setRows((prevRows) => [...prevRows, newRow]);
//     }
//   }
//   // function handleAddRowClick() {
//   //   const newRow = { level: "", threshold: "" };
//   //   setRows((prevRows) => [...prevRows, newRow]);
//   // }

//   function handleDelete(index) {
//     setRows((prevRows) =>
//       prevRows.filter((_, i) => i !== index)
//     );
//   }

//   // if (!props.approvalData.level) {
//   //   return <BundleLoader />;
//   // }
//   if (isLoading) {
//     // return <BundleLoader />;
//   }
//   function getRoleOptions(selectedDepartment) {
//     const filteredRoles = props.roles
//       .filter((role) => role.departmentName === selectedDepartment)
//       .filter((option) => option.probability !== 0)
//       .map((option) => ({
//         label: option.roleType,
//         value: option.roleTypeId,
//       }));

//     return filteredRoles;
//   }
//   const roleNameOption = props.roles.map((item) => {
//     return {
//         label: `${item.roleType || ""}`,
//         value: item.roleTypeId,
//     };
// });

//   return (
    
//     <div>
//       <div className="MainBox">
//         <div className="InputBox">
//           {rows.map((row, index) => (
//             <div key={index}>
//               <div className="w-full flex font-bold mt-4 items-center">
//                 <div className="w-wk">
//                   <p>{`Level ${index + 1}`}</p>
//                 </div>
                
//                 <div class="w-[83rem]">
//                   <Select
//                     name={`level_${index}`}
//                     value={row.level}
//                     onChange={(value) => handleChangeValue(value, index)}
//                   >
//                     <option value="ReportingManager">Reporting Manager</option>
//                     <option value="ReportingManager+1">Reporting Manager +1</option>
//                     <option value="Management">Management</option>
//                   </Select>
//                 </div>
//                 <div className="w-full flex font-bold ">
//                 <div style={{ width:"5rem"}}>
                
//                 </div>
//                 { row.level === "Management" ?
//                 <div class=" w-full" >
//                 <Field
//                       name="roleTypeId"
//                       isRequired
//                       placeholder="Role"
//                       value={row.roleTypeId}
//                       isColumnWithoutNoCreate
//                       // label="Role"
//                       onChange={(value) => handleChangeRoleValue(value, index)}
//                       component={SelectComponent}
//                       options={getRoleOptions(row.level)} 
                   
//                       isColumn
//                       inlineLabel
//                       style={{ flexBasis: "80%", marginTop: "0px", width: "100%" }}
//                     /> 
//                                                         </div>
//                                                         :null}
//                                                         </div>
                                                      
//                 {/* <div className="w-24 ml-4 mr-4">
//                   <p>Threshold</p>
//                 </div>
//                 <div style={{ width: "47%" }}>
//                   <input
//                     style={{ border: "2px solid black" }}
//                     type="number"
//                     value={row.threshold}
//                     onChange={(e) =>
//                       handleChangeValue1(e.target.value, index)
//                     }
//                   />
//                 </div> */}
//  <div class=" ml-4">
//                 {rows.length > 1 ? (
//                   <CloseOutlined onClick={() => handleDelete(index)} />
//                 ) : null}
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div class=" flex justify-end mt-4">
                  
//                   <div className="button">
//                       <Button type="primary" onClick={handleAddRowClick}>
//                           Add Level
//                       </Button>
                  
//               </div>
            
//               <div className="button">
//                   <Button
//                       type="primary"
                   
//                       onClick={() => buttonOnClick()}
//                   >
//                       Submit
//                   </Button>
//                   </div>
           
//               </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = ({ settings,role, auth, departments }) => ({
//   departments: departments.departments,
//   roles:role.roles,
//   approvalData: settings.approvalData,
//   userId: auth.userDetails.userId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getDepartments,
//       addApprove,
//       getApproveData,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(PhonesPairLevelApproveForm);




