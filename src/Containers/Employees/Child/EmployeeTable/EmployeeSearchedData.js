import React, { Suspense, useEffect,useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
import dayjs from "dayjs";
import EmployeePulseDrawerModal from "./EmployeePulseDrawerModal";
import OpenNotifyDrawer from "../EmployeeCard/OpenNotifyDrawer";
import { BundleLoader } from "../../../../Components/Placeholder";
import MultiOrgEmployee from "../MultiOrgEmployee";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';

function EmployeeSearchedData(props) {
  const [page, setPage] = useState(0);
  const [rowData, setRowData] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  function handleRowData(item) {
    setRowData(item);

  }
  
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
          "110" ,// "Name",0
          "326",  // "Department",//1
           "980", // "Role",//2
            "299",// "Mobile #",//3
           "140", // "Email #",//4
           "1142", // "Stop Access",//5
           "1143" // "Multi Org"//6
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
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
    // props.getEmployeelist("cretiondate","all");
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
               icon={<SearchIcon />}
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
        <SearchIcon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
 
  


  return (
    <>
 
    <div>
     <div class=" h-h86 overflow-auto overflow-x-auto">
        <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className=" flex  w-[100%] justify-between  p-1 bg-transparent font-bold font-poppins items-end !text-lm sticky  z-10">
                    <div className=" text-[#00A2E8] text-sm w-[15.5rem] max-md:w-[15.5rem]"><LocationCityIcon className='!text-icon  '  />{translatedMenuItems[0]}</div>
                    {/* Name */}
                    <div className=" w-[9.1rem] max-md:w-[9.1rem]" > <ApartmentIcon className='!text-icon text-[#f0386b] '  /> {translatedMenuItems[1]}</div>
                    {/* Department */}
                    <div className=" w-[6.8rem]  max-md:w-[6.8rem] "><i className=" fab fa-artstation mr-1 text-[#b744b8]"></i>{translatedMenuItems[2]}</div>
                    {/* Role */}
                    <div className=" w-[9.7rem] max-md:w-[9.7rem]"><LocalPhoneIcon className='!text-icon mr-1 text-[#ff9f1c] '  />{translatedMenuItems[3]}</div>
                    {/* Mobile # */}
                    <div className="w-[13.9rem] max-md:w-[13.9rem]"><MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '  />{translatedMenuItems[4]}</div>
                    {/* Email # */}
                    <div className=" w-[10.2rem] max-md:w-[10.2rem]"><RadioButtonCheckedIcon className="!text-icon mr-1 text-[#f28482]"/> {translatedMenuItems[5]}</div>
                    {/* Stop Access */}
                    <div className=" w-[11.4rem] max-md:w-[11.4rem]"><BusinessIcon className="!text-icon mr-1 text-[#f28482]"/> {translatedMenuItems[6]}</div>
                    {/* Multi Org */}
                    {/* <div className="md:w-[11.2rem]"></div> */}
                </div>
                {props.employeeSerachedData.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                        <div>
                            <div className="flex rounded  mt-1 bg-white  items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  " >
                                <div class="flex">
                                    <div className=" flex border-l-2 h-8 text-xs border-green-500 bg-[#eef2f9] items-center  w-[15.6rem] max-md:w-[15.6rem] max-sm:w-full ">
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

                                    <div className=" flex justify-start items-center h-8 ml-gap bg-[#eef2f9]   max-md:w-[7.7rem] max-sm:flex-row w-[7.7rem] max-sm:justify-between  ">
                                        <div class=" text-xs items-center ml-gap  font-poppins">
                                            {item.department}
                                        </div>

                                    </div>
                                    <div className=" flex justify-start items-center h-8 ml-gap bg-[#eef2f9]  max-md:w-[6.2rem] max-sm:flex-row w-[6.2rem] max-sm:justify-between ">



                                        <div class=" text-xs items-center ml-gap   font-poppins">
                                            
                                           {item.roleTypeName}
                                        </div>
                                    </div>
                                </div>

                               
                                <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9]  max-md:w-[10.2rem] max-sm:flex-row w-[10.2rem] max-sm:justify-between ">
                                    <div class=" text-xs  font-poppins text-center">
                                    {item.countryDialCode} {item.mobileNo}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9]   max-md:w-[14.2rem] max-sm:flex-row w-[14.2rem] max-sm:justify-between ">
                                    <div class=" text-xs  ml-gap font-poppins text-center">
                                       {item.emailId}
                                    </div>
                                </div>
                                <div className=" flex   items-center justify-start h-8 ml-gap bg-[#eef2f9]  max-md:w-[5.2rem] max-sm:flex-row w-[5.2rem] max-sm:justify-between ">
                                    <div class=" text-xs  font-poppins text-center">
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
                                {props.user.multyOrgLinkInd=== true && (
                                <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] max-md:w-[5.2rem] max-sm:flex-row w-[5.2rem] max-sm:justify-between ">
                                    <div class=" text-xs  font-poppins text-center">
                                  
            <MultiOrgEmployee
              multyOrgAccessInd={item.multyOrgAccessInd}
              employeeId={item.employeeId}
            />

                                    </div>
                                </div>
                                )}
                                <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] max-md:w-[8.21rem] max-sm:flex-row w-[8.21rem] max-sm:justify-between ">
                                    <div class=" text-xs cursor-pointer  font-poppins text-center">
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
                                <div className=" flex  items-center  justify-end h-8 ml-gap bg-[#eef2f9] w-[10.12rem] max-md:w-[10.12rem] max-sm:flex-row  max-sm:justify-between ">
                                    <div class=" text-xs  font-poppins text-center">
                                    <span className=" cursor-pointer"
              onClick={() => {
                // props.getCandidateById(item.candidateId);
                 props.getEmployeeDocument(item.employeeId);
                 props.getEmployeeTreeMap(item.employeeId);
                props.handleEmployeePulseDrawerModal(true);
                handleSetCurrentEmployeeId(item)
              }}
            >
    
                <MonitorHeartIcon className=" cursor-pointer !text-icon text-[#df9697]"
                />
         
            </span>
                                    </div>
                                    <div class=" text-xs  font-poppins text-center">
                                    <Tooltip title="Add as Admin">
           <CircleNotificationsIcon
           className=" cursor-pointer !text-icon"
           onClick={() => {
            handleSetCurrentEmployeeId(item);
            props.handleNotifyDrawer(true);
           }}
           />
           </Tooltip>
                                    </div>
                                    <div class=" text-base  font-poppins text-center">
                                    {item.suspendInd === true && (
                 <StyledPopconfirm
                 title="Do you want to delete?"
                 onConfirm={() => props.deleteEmployeeData(item.userId)}>
           <Tooltip title="Delete">
        
           <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
       
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
        </div>
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
  fetchingEmployeeInputSearchData: employee.fetchingEmployeeInputSearchData

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
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSearchedData);
