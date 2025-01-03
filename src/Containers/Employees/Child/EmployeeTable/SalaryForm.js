import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip } from "antd"
import {getUserSalary,} from "../../EmployeeAction"

const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function SalaryForm(props) {


    const [inputValue, setInputValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "",//0  Basic
          "",//1   Housing
           "",//2  Transportation
        "" , //  Total salary"3
        "103" ,//    Others4
       
                 
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
  
  <div class="rounded m-1 p-1 w-[100%]   overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
          <div className=" md:w-[17.5rem]">
          {translatedMenuItems[0]}  {/* Basic */}
                </div>
 
        <div className="md:w-[21.1rem]">
        {translatedMenuItems[1]}   {/* Housing */}
                </div>

                <div className="md:w-[10.1rem]">
                {translatedMenuItems[2]}  {/* Transportation */}
                </div>

                <div className="md:w-[10.1rem]">
                {translatedMenuItems[3]}   {/* Total salary */}
                </div>
                <div className="md:w-[10.1rem]">
          {translatedMenuItems[4]}  {/* Others */}
                </div>
               
       
        
        {/* <div className="w-[10.2rem]"></div> */}

      </div>
   
        
      
                        <div>
                            <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1"
                                >
                                     
                                     <div className=" flex  md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
      {props.usersalary.basic} {props.usersalary.currency}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-xs  font-poppins">
                               {props.usersalary.housing} {props.usersalary.currency}
                                  </div>
                              </div>


                              <div className=" flex  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-xs  font-poppins">
                             {props.usersalary.transportation} {props.usersalary.currency}
                                </div>
                            </div>
                            <div className=" flex  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                            <div class="text-xs  font-poppins">
                             {props.usersalary.totalSalary} {props.usersalary.currency}
                                </div>
                                </div>


                                <div className=" flex  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                            <div class="text-xs  font-poppins">
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

