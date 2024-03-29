// import React, { useEffect,useMemo, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import { SearchOutlined, 
// } from '@ant-design/icons';
// import { DeleteOutlined } from "@ant-design/icons";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import CellTowerIcon from '@mui/icons-material/CellTower';
// import Highlighter from 'react-highlight-words';
// import {getDepartments} from "../../../Settings/Department/DepartmentAction";
// import { StyledPopconfirm, StyledTable } from "../../../../Components/UI/Antd";
// import { Button, Tooltip,Input } from "antd";
// import {
//   Spacer
// } from "../../../../Components/UI/Elements";
// import {
//   getEmployeelist,
//   handleEmployeeDrawerForAdmin,
//   handleEmployeePulseDrawerModal,
//   getEmployeeTreeMap,
//   getEmployeeDocument,
//   handleNotifyDrawer,
//   deleteEmployeeData
// } from "../../EmployeeAction";
// import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
// import {
//   getRoles,
// } from "../../../Settings/Category/Role/RoleAction";
// import EmployeeDetailsView from "../EmployeeGroup/EmployeeDetails/EmployeeDetailsView";
// import EmployeeDrawerForAdmin from "./EmployeeDrawer/EmployeeDrawerForAdmin";
// import SuspendEmployee from "../SuspendEmployee/SuspendEmployee";
// import moment from "moment";
// import EmployeePulseDrawerModal from "./EmployeePulseDrawerModal";
// import OpenNotifyDrawer from "../EmployeeCard/OpenNotifyDrawer";

// function EmployeeTable(props) {
//   const [page, setPage] = useState(0);
//   const [rowData, setRowData] = useState("");
//   function handleRowData(item) {
//     setRowData(item);

//   }

//   useEffect(() => {
//     window.addEventListener('error', e => {
//       if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
//         const resizeObserverErrDiv = document.getElementById(
//           'webpack-dev-server-client-overlay-div'
//         )
//         const resizeObserverErr = document.getElementById(
//           'webpack-dev-server-client-overlay'
//         )
//         if (resizeObserverErr) {
//           resizeObserverErr.setAttribute('style', 'display: none');
//         }
//         if (resizeObserverErrDiv) {
//           resizeObserverErrDiv.setAttribute('style', 'display: none');
//         }
//       }
//     })
//     props.getEmployeelist("cretiondate");
//     props.getRoles(props.organizationId);
//     props.getDepartments();
//   }, []);

//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");

//   const [currentEmployeeId, setCurrentEmployeeId] = useState("");


//   function handleSetCurrentEmployeeId(employeeId,) {
//     setCurrentEmployeeId(employeeId,);
   
//   }
  

//   function getColumnSearchProps(dataIndex) {
//     return {
//       filterDropdown: ({
//         setSelectedKeys,
//         selectedKeys,
//         confirm,
//         clearFilters,
//       }) => (
//         <div >
//           <Input
//             placeholder={`Search ${dataIndex}`}
//             value={selectedKeys[0]}
//             onChange={(e) =>
//               setSelectedKeys(e.target.value ? [e.target.value] : [])
//             }
//             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             style={{ width: 240, marginBottom: 8, display: "block" }}
//           />
          
//             <Button
//               type="primary"
//               onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                icon={<SearchOutlined />}
//               //icon="search"
//               size="small"
//               style={{ width: 90 }}
//             >
//               Search
//             </Button>
//             <Button
//               onClick={() => handleReset(clearFilters)}
//               size="small"
//               style={{ width: 90 }}
//             >
//               Reset
//             </Button>
//             <Button
//               type="link"
//               size="small"
//               onClick={() => {
//                 confirm({ closeDropdown: false });
//                 setSearchText(selectedKeys[0]);
//                 setSearchedColumn(dataIndex);
//               }}
//             >
//               Filter
//             </Button>
          
//         </div>
//       ),
//       filterIcon: (filtered) => (
//         <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
//       ),
//       onFilter: (value, record) =>
//         record[dataIndex]
//         ? record[dataIndex]
//           .toString()
//           .toLowerCase()
//           .includes(value.toLowerCase()) : "",
//       onFilterDropdownVisibleChange: (visible) => {
//         if (visible) {
//         }
//       },
//       render: (text) =>
//         searchedColumn === dataIndex ? (
//           <Highlighter
//             highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//             searchWords={[searchText]}
//             autoEscape
//             textToHighlight={text ? text.toString(): ""}
//           />
//         ) : (
//           text
//         ),
//     };
//   }

//   function handleSearch(selectedKeys, confirm, dataIndex) {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   }

//   function handleReset(clearFilters) {
//     clearFilters();
//     setSearchText("");
//   }

//   const departmentNameOption = useMemo(() => {
//     if (!props.departments) return [];
//     return (
//       props.departments.length &&
//       props.departments.map((departments) => {
//         return {
//           text: departments.departmentName || "",
//           value: departments.departmentName,
//         };
//       })
//     );
//   }, [props.departments]);

//   const roleTypeOption = useMemo(() => {
//     if (!props.roles) return [];
//     return (
//       props.roles.length &&
//       props.roles.map((roles) => {
//         return {
//           text: roles.roleType || "",
//           value: roles.roleType,
//         };
//       })
//     );
//   }, [props.roles]);

//   const {
//     fetchingEmployee,
//     type,
//     user,
//     fetchingEmployeeError,
//     employees,
//     handleEmployeeDrawerForAdmin,
//     employeeDrawerVisibleForAdmin,
//   } = props;
//   const { imgRadius } = props;
//   const columns = [
//     {
//       title: "",
//       width: "2%",
//     },

//     {
//       //title: "Name",
//       title: <FormattedMessage id="app.name" defaultMessage="Name" />,
//       width: "15%",
//       dataIndex:"fullName",
//      ...getColumnSearchProps('fullName'),
//        render: (employeeId, item, i) => {
//         const currentdate = moment().format("DD/MM/YYYY");
//         const date = moment(item.creationDate).format("DD/MM/YYYY");
//         return (
//           <>
//         <EmployeeDetailsView
//           employeeId={item.employeeId}
//           fullName={item.fullName}
//         />
//         &nbsp;&nbsp;
//         {date === currentdate ? <span className="blink">New</span> : null}
//         </>
//       );
//         },
//     },
//     {
//       //title: "Department",
//       title: (
//         <FormattedMessage id="app.department" defaultMessage="Department" />
//       ),
//       width: "10%",
//       dataIndex: "department",
//       filters:departmentNameOption,
//       onFilter: (value, record) => {
//         return record.department === value;
//       },
//     },

//     {
//       //title: "Designation",
//       title: (
//         <FormattedMessage id="app.role" defaultMessage="Role" />
//       ),
//       dataIndex: "roleTypeName",
//       width: "12%",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.role - b.role,
//       filters:roleTypeOption,
      
//       onFilter: (value, record) => {
//         return record.role === value;
//       },
//     },
   
//     {
//       // title: "Mobile #",
//       title: <FormattedMessage id="app.mobile" defaultMessage="Mobile #" />,
//       dataIndex: "mobileNo",
//       width: "13%",
//       render: (name, item, i) => {
//         return (
//           <span>
//             {item.countryDialCode} {item.mobileNo}
//           </span>
//         );
//       },
//     },
//     {
//       //title: "Email #",
//       title: <FormattedMessage id="app.email" defaultMessage="Email #" />,
//       dataIndex: "emailId",
//       width: "18%",
//     },
//     // {
//     //   title: <FormattedMessage id="app.skills" defaultMessage="Skills" />,
//     //  // dataIndex: "skills",
//     //  width: "15%",
//     //   ...getColumnSearchProps('skill'),       
 
      
//     //   render: (name, item, i) => {
//     //     return (
//     //       <>
//     //         <div class=" flex flex-nowrap w-full"
//     //         >
//     //           {item.skill && item.skill.map((option, i) => {
//     //             return (

//     //               <div key={i} style={{
//     //                 border: "2px solid rgb(125 241 193)",
//     //                 padding: "0px 0.62em",
//     //                 textAlign: "center",
//     //                 margin: "2px",
//     //                 borderRadius: "0.62em",
//     //               }}>
//     //                 {option.keySkillsName}
//     //               </div>

//     //             );
//     //           })}
//     //         </div>
//     //       </>
//     //     );
//     //   }
//     // },
//     // {
//     //   title: "Type",
//     //   width: "7%",
      

//     //   render: (name, item, i) => {
//     //     return (
//     //       <>
        
//     //         <EmployeeType
//     //         type={item.type}
//     //           employeeId={item.employeeId}
//     //         />
//     //       </>
//     //     );
//     //   },
//     // },

//     {
//       title: "Stop Access",
//       width: "5%",
      

//       render: (name, item, i) => {
//         return (
//           <>
//               {props.user.userDeleteInd === true || user.role === "ADMIN" ? (
//             <SuspendEmployee
//               partnerId={item.partnerId}
//               suspendInd={item.suspendInd}
//               assignedIndicator={item.assignedInd}
//               employeeId={item.employeeId}
//             />
//             ):null}
//           </>
//         );
//       },
//     },

    
//     {
//       title: "",
//       render: (name, item, i) => {
//         return (
//           <>
//            {item.suspendInd !== true && ( 
//               <Tooltip  title={item.role}>
//                 {/* <Button
//                   size={"small"}
//                   type="ghost"
//                   style={{            
//                     borderColor: "transparent",
//                     alignSelf: "flex-end",
//                   }}
                
//                 > */}
//                 { item.role === "ADMIN" ?(
// <CellTowerIcon 
//   // onClick={() => {
//   //   handleEmployeeDrawerForAdmin(true);
//   //   handleSetCurrentEmployeeId(item.employeeId)
//   // }}
//  style={{ 
//   // color: item.role === "ADMIN" ?"blue":  "",
//   fontSize: "123%"
//   }}
// />
//                 ):null}

//                 {/* </Button> */}
//               </Tooltip>
//                )}
//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "documentId",
//       width: "2%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <>
//             {/* {user.talentUpdateInd ===true && ( */}
//             <span
//               style={{ cursor: "pointer" }}
//               onClick={() => {
//                 // props.getCandidateById(item.candidateId);
//                  props.getEmployeeDocument(item.employeeId);
//                  props.getEmployeeTreeMap(item.employeeId);
//                 props.handleEmployeePulseDrawerModal(true);
//                 handleSetCurrentEmployeeId(item)
//               }}
//             >
    
//                 <MonitorHeartIcon
//                   style={{ fontSize: "0.8rem", color: "#df9697" }}
//                 />
         
//             </span>

            
//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "documentId",
//       width: "2%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <>
           
//            <Tooltip title="Add as Admin">
//            <CircleNotificationsIcon
//            style={{ cursor: "pointer",fontSize: "1rem" }}
//            onClick={() => {
//             handleSetCurrentEmployeeId(item);
//             props.handleNotifyDrawer(true);
//            }}
//            />
//            </Tooltip>

            
//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "documentId",
//       width: "2%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <>
//                {item.suspendInd === true && (
//                  <StyledPopconfirm
//                  title="Do you want to delete?"
//                  onConfirm={() => props.deleteEmployeeData(item.userId)}>
//            <Tooltip title="Delete">
        
//            <DeleteOutlined
//         style={{
//           cursor: "pointer",
//           color: "red",
//           fontSize: "1rem",
//         }}
//            />
       
//            </Tooltip>
//            </StyledPopconfirm>
//      )}
            
//           </>
//         );
//       },
//     },
//   ];

//    const tab = document.querySelector(".ant-layout-sider-children");
//    const tableHeight = tab && tab.offsetHeight * 0.75;
//   return (
//     <>
//       <StyledTable
//         rowKey="candidateId"
//         // rowSelection={rowSelection}
//         columns={columns}
//         loading={fetchingEmployee || fetchingEmployeeError}
//         scroll={{ y: tableHeight }}
       
//         pagination={false}
//         dataSource={props.filteredData}
//       />
//       <Spacer />
//       <EmployeeDrawerForAdmin
//       employeeId={currentEmployeeId}
//         handleEmployeeDrawerForAdmin={handleEmployeeDrawerForAdmin}
//         employeeDrawerVisibleForAdmin={employeeDrawerVisibleForAdmin}
//       />
//          <EmployeePulseDrawerModal
//          singleEmployee={props.singleEmployee}
//          employeeTreeMap={props.employeeTreeMap}
//         //  currentData={rowData}
//         employeeName={currentEmployeeId}
//         documentsByEmployeeId={props.documentsByEmployeeId}
//         addDrawerEmployeePulseModal={props.addDrawerEmployeePulseModal}
//         handleEmployeePulseDrawerModal={props.handleEmployeePulseDrawerModal}
//         // candidateByUserId={this.props.candidateByUserId}
//       />
//             <OpenNotifyDrawer
//       currentEmployeeId={currentEmployeeId}
//        openNotifydrwr={props.openNotifydrwr} handleNotifyDrawer={props.handleNotifyDrawer}/>

//     </>
//   );
// }
// const mapStateToProps = ({ auth,role, employee,designations,departments }) => ({
//   userId: auth.userDetails.userId,
//   employees: employee.employees,
//   user: auth.userDetails,
//   roles: role.roles,
//   singleEmployee:employee.singleEmployee,
//   employeeTreeMap:employee.employeeTreeMap,
//   addDrawerEmployeePulseModal:employee.addDrawerEmployeePulseModal,
//   organizationId: auth.userDetails.organizationId,
//   fetchingEmployee: employee.fetchingEmployee,
//   designations: designations.designations,
//   departments:departments.departments,
//   documentsByEmployeeId: employee.documentsByEmployeeId,
//   fetchingEmployeeError: employee.fetchingEmployeeError,
//   employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
//   openNotifydrwr:employee.openNotifydrwr,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getEmployeelist,
//       getRoles,
//       handleEmployeeDrawerForAdmin,
//       getDepartments,
//       handleEmployeePulseDrawerModal,
//       getEmployeeTreeMap,
//       getEmployeeDocument,
//       handleNotifyDrawer,
//       deleteEmployeeData
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);


import React, { Suspense, useEffect,useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { SearchOutlined, 
} from '@ant-design/icons';
import { DeleteOutlined } from "@ant-design/icons";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import CellTowerIcon from '@mui/icons-material/CellTower';
import Highlighter from 'react-highlight-words';
import {getDepartments} from "../../../Settings/Department/DepartmentAction";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button, Tooltip,Input } from "antd";
import {
  getEmployeelist,
  handleEmployeeDrawerForAdmin,
  handleEmployeePulseDrawerModal,
  getEmployeeTreeMap,
  getEmployeeDocument,
  handleNotifyDrawer,
  deleteEmployeeData
} from "../../EmployeeAction";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {
  getRoles,
} from "../../../Settings/Category/Role/RoleAction";
import EmployeeDetailsView from "../EmployeeGroup/EmployeeDetails/EmployeeDetailsView";
import EmployeeDrawerForAdmin from "./EmployeeDrawer/EmployeeDrawerForAdmin";
import SuspendEmployee from "../SuspendEmployee/SuspendEmployee";
import moment from "moment";
import EmployeePulseDrawerModal from "./EmployeePulseDrawerModal";
import OpenNotifyDrawer from "../EmployeeCard/OpenNotifyDrawer";
import { BundleLoader } from "../../../../Components/Placeholder";

function EmployeeTable(props) {
  const [page, setPage] = useState(0);
  const [rowData, setRowData] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  function handleRowData(item) {
    setRowData(item);

  }

  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    props.getEmployeelist("cretiondate");
    props.getRoles(props.organizationId);
    props.getDepartments();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [currentEmployeeId, setCurrentEmployeeId] = useState("");


  function handleSetCurrentEmployeeId(employeeId,) {
    setCurrentEmployeeId(employeeId,);
   
  }
  

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div >
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
               icon={<SearchOutlined />}
              //icon="search"
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString(): ""}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const departmentNameOption = useMemo(() => {
    if (!props.departments) return [];
    return (
      props.departments.length &&
      props.departments.map((departments) => {
        return {
          text: departments.departmentName || "",
          value: departments.departmentName,
        };
      })
    );
  }, [props.departments]);

  const roleTypeOption = useMemo(() => {
    if (!props.roles) return [];
    return (
      props.roles.length &&
      props.roles.map((roles) => {
        return {
          text: roles.roleType || "",
          value: roles.roleType,
        };
      })
    );
  }, [props.roles]);

  const {
    fetchingEmployee,
    type,
    user,
    fetchingEmployeeError,
    employees,
    handleEmployeeDrawerForAdmin,
    employeeDrawerVisibleForAdmin,
  } = props;
  const { imgRadius } = props;
 
  if (isMobile){

    return (
      <>
          <div className=' flex justify-end sticky top-28 z-auto'>
          <div class="rounded-lg  p-2 w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                 
                  {props.filteredData.map((item) => {
                      const currentdate = moment().format("DD/MM/YYYY");
                      const date = moment(item.createAt).format("DD/MM/YYYY");
                      return (
                          <div>
                             <div
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
                >
                                  <div class="flex justify-between w-wk items-center ">
                                     <div>
                                      <EmployeeDetailsView
            employeeId={item.employeeId}
            fullName={item.fullName}
          />
                                          &nbsp;&nbsp;
                                          {date === currentdate ? (
                                              <span
                                                  class="text-[tomato] font-bold">
                                                  New
                                              </span>
                                          ) : null}
                                    </div>
  
                                     
                                          <div class=" text-xs text-cardBody font-poppins">
                                              {item.department}
                                          </div>
  
                                     
                                     
                                  </div>
                                  <div class="flex justify-between w-wk items-center ">

  <div class=" text-sm text-cardBody font-poppins">
      
     {item.roleTypeName}
  </div>

                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.countryDialCode} {item.mobileNo}
                                      </div>
                                  
                                  </div>
                                  
                                  <div class="flex justify-between w-wk items-center ">
                                 
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                         {item.emailId}
                                      </div>
                                 
                                  
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {props.user.userDeleteInd === true || user.role === "ADMIN" ? (
              <SuspendEmployee
                partnerId={item.partnerId}
                suspendInd={item.suspendInd}
                assignedIndicator={item.assignedInd}
                employeeId={item.employeeId}
              />
              ):null}
                                      </div>
                                 
                                  </div>
                                  <div class="flex justify-between w-wk items-center ">
                                  <div className=" flex font-medium  md:w-[8.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs cursor-pointer text-cardBody font-poppins text-center">
                                      {item.suspendInd !== true && ( 
                <Tooltip  title={item.role}>
                  {/* <Button
                    size={"small"}
                    type="ghost"
                    style={{            
                      borderColor: "transparent",
                      alignSelf: "flex-end",
                    }}
                  
                  > */}
                  { item.role === "ADMIN" ?(
  <CellTowerIcon 
    // onClick={() => {
    //   handleEmployeeDrawerForAdmin(true);
    //   handleSetCurrentEmployeeId(item.employeeId)
    // }}
   style={{ 
    // color: item.role === "ADMIN" ?"blue":  "",
    fontSize: "123%"
    }}
  />
                  ):null}
  
                  {/* </Button> */}
                </Tooltip>
                 )}
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[10.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // props.getCandidateById(item.candidateId);
                   props.getEmployeeDocument(item.employeeId);
                   props.getEmployeeTreeMap(item.employeeId);
                  props.handleEmployeePulseDrawerModal(true);
                  handleSetCurrentEmployeeId(item)
                }}
              >
      
                  <MonitorHeartIcon
                    style={{ fontSize: "0.8rem", color: "#df9697" }}
                  />
           
              </span>
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[9.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <Tooltip title="Add as Admin">
             <CircleNotificationsIcon
             style={{ cursor: "pointer",fontSize: "1rem" }}
             onClick={() => {
              handleSetCurrentEmployeeId(item);
              props.handleNotifyDrawer(true);
             }}
             />
             </Tooltip>
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-base text-cardBody font-poppins text-center">
                                      {item.suspendInd === true && (
                   <StyledPopconfirm
                   title="Do you want to delete?"
                   onConfirm={() => props.deleteEmployeeData(item.userId)}>
             <Tooltip title="Delete">
          
             <DeleteOutlined
          style={{
            cursor: "pointer",
            color: "red",
            fontSize: "1rem",
          }}
             />
         
             </Tooltip>
             </StyledPopconfirm>
       )}
                                      </div>
                                  </div>
                                  </div>
  
                              </div>
                          </div>
                      )
                  })}
              </div>
              <Suspense fallback={<BundleLoader/>}>
              <EmployeeDrawerForAdmin
        employeeId={currentEmployeeId}
          handleEmployeeDrawerForAdmin={handleEmployeeDrawerForAdmin}
          employeeDrawerVisibleForAdmin={employeeDrawerVisibleForAdmin}
        />
           <EmployeePulseDrawerModal
           singleEmployee={props.singleEmployee}
           employeeTreeMap={props.employeeTreeMap}
          //  currentData={rowData}
          employeeName={currentEmployeeId}
          documentsByEmployeeId={props.documentsByEmployeeId}
          addDrawerEmployeePulseModal={props.addDrawerEmployeePulseModal}
          handleEmployeePulseDrawerModal={props.handleEmployeePulseDrawerModal}
          // candidateByUserId={this.props.candidateByUserId}
        />
              <OpenNotifyDrawer
        currentEmployeeId={currentEmployeeId}
         openNotifydrwr={props.openNotifydrwr} handleNotifyDrawer={props.handleNotifyDrawer}/>
                   </Suspense>
          </div>
      </>
  )   
  }


  return (
    <>
        <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=" md:w-[15.5rem]">Name</div>
                    <div className=" md:w-[9.1rem]">Department</div>
                    <div className=" md:w-[6.8rem] ">Role</div>
                    <div className="md:w-[8.7rem]">Mobile #</div>
                    <div className="md:w-[8.9rem]">Email #</div>
                    <div className="md:w-[7.2rem]">Stop Access</div>
                    <div className="md:w-[10.2rem]"></div>
                </div>
                {props.filteredData.map((item) => {
                    const currentdate = moment().format("DD/MM/YYYY");
                    const date = moment(item.createAt).format("DD/MM/YYYY");
                    return (
                        <div>
                            <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                <div class="flex">
                                    <div className=" flex font-medium  md:w-[15.6rem] max-sm:w-full ">
                                    <EmployeeDetailsView
          employeeId={item.employeeId}
          fullName={item.fullName}
        />
                                        &nbsp;&nbsp;
                                        {date === currentdate ? (
                                            <span
                                                class="text-[tomato] font-bold">
                                                New
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className=" flex font-medium   md:w-[8.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.department}
                                        </div>

                                    </div>
                                    <div className=" flex font-medium  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                        <div class=" text-sm text-cardBody font-poppins">
                                            
                                           {item.roleTypeName}
                                        </div>
                                    </div>
                                </div>

                               
                                <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.countryDialCode} {item.mobileNo}
                                    </div>
                                </div>
                                <div className=" flex font-medium  md:w-[14.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                       {item.emailId}
                                    </div>
                                </div>
                                <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {props.user.userDeleteInd === true || user.role === "ADMIN" ? (
            <SuspendEmployee
              partnerId={item.partnerId}
              suspendInd={item.suspendInd}
              assignedIndicator={item.assignedInd}
              employeeId={item.employeeId}
            />
            ):null}
                                    </div>
                                </div>
                                <div className=" flex font-medium  md:w-[8.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs cursor-pointer text-cardBody font-poppins text-center">
                                    {item.suspendInd !== true && ( 
              <Tooltip  title={item.role}>
                {/* <Button
                  size={"small"}
                  type="ghost"
                  style={{            
                    borderColor: "transparent",
                    alignSelf: "flex-end",
                  }}
                
                > */}
                { item.role === "ADMIN" ?(
<CellTowerIcon 
  // onClick={() => {
  //   handleEmployeeDrawerForAdmin(true);
  //   handleSetCurrentEmployeeId(item.employeeId)
  // }}
 style={{ 
  // color: item.role === "ADMIN" ?"blue":  "",
  fontSize: "123%"
  }}
/>
                ):null}

                {/* </Button> */}
              </Tooltip>
               )}
                                    </div>
                                </div>
                                <div className=" flex font-medium  md:w-[10.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                // props.getCandidateById(item.candidateId);
                 props.getEmployeeDocument(item.employeeId);
                 props.getEmployeeTreeMap(item.employeeId);
                props.handleEmployeePulseDrawerModal(true);
                handleSetCurrentEmployeeId(item)
              }}
            >
    
                <MonitorHeartIcon
                  style={{ fontSize: "0.8rem", color: "#df9697" }}
                />
         
            </span>
                                    </div>
                                </div>
                                <div className=" flex font-medium  md:w-[9.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    <Tooltip title="Add as Admin">
           <CircleNotificationsIcon
           style={{ cursor: "pointer",fontSize: "1rem" }}
           onClick={() => {
            handleSetCurrentEmployeeId(item);
            props.handleNotifyDrawer(true);
           }}
           />
           </Tooltip>
                                    </div>
                                </div>
                                <div className=" flex font-medium  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-base text-cardBody font-poppins text-center">
                                    {item.suspendInd === true && (
                 <StyledPopconfirm
                 title="Do you want to delete?"
                 onConfirm={() => props.deleteEmployeeData(item.userId)}>
           <Tooltip title="Delete">
        
           <DeleteOutlined
        style={{
          cursor: "pointer",
          color: "red",
          fontSize: "1rem",
        }}
           />
       
           </Tooltip>
           </StyledPopconfirm>
     )}
                                    </div>
                                </div>
                                

                            </div>
                        </div>
                    )
                })}
            </div>
            <Suspense fallback={<BundleLoader/>}>
            <EmployeeDrawerForAdmin
      employeeId={currentEmployeeId}
        handleEmployeeDrawerForAdmin={handleEmployeeDrawerForAdmin}
        employeeDrawerVisibleForAdmin={employeeDrawerVisibleForAdmin}
      />
         <EmployeePulseDrawerModal
         singleEmployee={props.singleEmployee}
         employeeTreeMap={props.employeeTreeMap}
        //  currentData={rowData}
        employeeName={currentEmployeeId}
        documentsByEmployeeId={props.documentsByEmployeeId}
        addDrawerEmployeePulseModal={props.addDrawerEmployeePulseModal}
        handleEmployeePulseDrawerModal={props.handleEmployeePulseDrawerModal}
        // candidateByUserId={this.props.candidateByUserId}
      />
            <OpenNotifyDrawer
      currentEmployeeId={currentEmployeeId}
       openNotifydrwr={props.openNotifydrwr} handleNotifyDrawer={props.handleNotifyDrawer}/>
                 </Suspense>
        </div>
    </>
)



}
const mapStateToProps = ({ auth,role, employee,designations,departments }) => ({
  userId: auth.userDetails.userId,
  employees: employee.employees,
  user: auth.userDetails,
  roles: role.roles,
  singleEmployee:employee.singleEmployee,
  employeeTreeMap:employee.employeeTreeMap,
  addDrawerEmployeePulseModal:employee.addDrawerEmployeePulseModal,
  organizationId: auth.userDetails.organizationId,
  fetchingEmployee: employee.fetchingEmployee,
  designations: designations.designations,
  departments:departments.departments,
  documentsByEmployeeId: employee.documentsByEmployeeId,
  fetchingEmployeeError: employee.fetchingEmployeeError,
  employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
  openNotifydrwr:employee.openNotifydrwr,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmployeelist,
      getRoles,
      handleEmployeeDrawerForAdmin,
      getDepartments,
      handleEmployeePulseDrawerModal,
      getEmployeeTreeMap,
      getEmployeeDocument,
      handleNotifyDrawer,
      deleteEmployeeData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);


