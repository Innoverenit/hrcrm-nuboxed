import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip } from "antd"
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {getUserSalary,} from "../../EmployeeAction"

import { FormattedMessage } from "react-intl";
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function SalaryForm(props) {


    const [inputValue, setInputValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    props.getUserSalary(props.employeeName.employeeId)
  }, []);


  const handleChange = (userKpiLinkId, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [userKpiLinkId]: {
        ...prevFields[userKpiLinkId],
        [fieldName]: value,
      },
    }));
  };

  const handleEditClick = (userKpiLinkId) => {
    setEditContactId(userKpiLinkId);
  };
  const handleCancelClick = (userKpiLinkId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
    setEditContactId(null);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };


  return (
    <>
  
  <div class="rounded-lg m-5 p-2 w-[97%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[17.5rem]">
       Basic
                </div>
 
        <div className="md:w-[21.1rem]">
            Housing
                </div>

                <div className="md:w-[10.1rem]">
            Transportation
                </div>

                <div className="md:w-[10.1rem]">
            Total salary
                </div>
                <div className="md:w-[10.1rem]">
            Others
                </div>
               
       
        
        {/* <div className="w-[10.2rem]"></div> */}

      </div>
   
        
      
                        <div>
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                >
                                     
                                     <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
      {props.usersalary.basic} {props.usersalary.currency}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm text-cardBody font-poppins">
                               {props.usersalary.housing} {props.usersalary.currency}
                                  </div>
                              </div>


                              <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-sm text-cardBody font-poppins">
                             {props.usersalary.transportation} {props.usersalary.currency}
                                </div>
                            </div>
                            <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                            <div class="text-sm text-cardBody font-poppins">
                             {props.usersalary.totalSalary} {props.usersalary.currency}
                                </div>
                                </div>


                                <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                            <div class="text-sm text-cardBody font-poppins">
                             {props.usersalary.others} {props.usersalary.currency}
                                </div>
                                </div>
                            

                            
                          
                              </div>
                 

                              
                             
                            </div>
                        </div>


               
                    
      </div>
     

   
   
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  kpi,
  employee
}) => ({
    usersalary:employee.usersalary
//     userKpiList:employee.userKpiList,
//     kpiListData: kpi.kpiListData,
//   userId:auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getKpis,
    getUserSalary
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SalaryForm);

