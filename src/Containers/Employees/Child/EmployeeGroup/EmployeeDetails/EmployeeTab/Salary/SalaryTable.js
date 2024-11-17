import React, { Component,lazy } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import {
  getSalaryDetails,
  setEditSalary,
  handleUpdateSalaryModal,
} from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip } from "antd";
import EmptyPage from "../../../../../../Main/EmptyPage";
const UpdateSalaryModal =lazy(()=>import("./UpdateSalaryModal"));

class SalaryTable extends Component {

  componentDidMount() {
    const { getSalaryDetails, employeeId } = this.props;
    console.log(employeeId);
    if (employeeId) {
      getSalaryDetails(employeeId);
    }
  }

  render() {
    const {
      salaryDetails,
      handleUpdateSalaryModal,
      updateSalaryModal,
      setEditSalary,
      fetchingEmployeeSalaryDetails,
      fetchingEmployeeSalaryDetailsError,
    } = this.props;
  

    if (fetchingEmployeeSalaryDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
          <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[6.5rem]">
        <FormattedMessage
                  id="app.grossMonthlySalary"
                  defaultMessage="Gross Salary"
                /></div>
 
        <div className="md:w-[10.1rem]"> 
         <FormattedMessage id="app.netSalary" defaultMessage="Net Salary" /></div>
                 <div className="md:w-[10.1rem]">
                 <FormattedMessage
          id="app.startingDate"
          defaultMessage="Start Date"
        /></div>
                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.endDate" defaultMessage="End Date" /></div>


       
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {salaryDetails =="" ? <EmptyPage/>:salaryDetails.map((item) => { 
        
        
                    return (
                        <div>
                            <div className="flex rounded justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                >
                                     
                                     <div className=" flex font-medium flex-col md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
      {item.grossMonthlySalary}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex font-medium flex-col md:w-[13.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm  font-poppins">
                                  {item.netSalary}
                                  </div>
                              </div>

                              <div className=" flex font-medium flex-col md:w-[13.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-sm  font-poppins">
                                <span>{dayjs(item.startingDate).format("YYYY/MM/DD")}</span>;
                                </div>
                            </div>
                            <div className=" flex font-medium flex-col md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-sm  font-poppins">
                 
                     <div className="font-normal text-sm  font-poppins">
                     <span>{dayjs(item.endDate).format("YYYY/MM/DD")}</span>;
                     </div>
                 
                                   </div>
                               </div>

                          
                              </div>
                   
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    <BorderColorIcon  
            style={{ cursor: "pointer", fontSize: "1rem" }}
            onClick={() => {
              //debugger
              // this.props.setEmail(item);
              setEditSalary(item);
              handleUpdateSalaryModal(true);
            }}
          />

                                    </div>
                                </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
            // onConfirm={() => deleteSalaryTable(item.id)}
          >
            <DeleteIcon
              type="delete"
              style={{ cursor: "pointer", fontSize: "1rem", color: "red" }}
            />
          </StyledPopconfirm>

                                    </div>
                                </div>

                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
        {/* {emailCredential && ( */}
        {/* <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          Loading={
            fetchingEmployeeSalaryDetails || fetchingEmployeeSalaryDetailsError
          }
          dataSource={salaryDetails}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        /> */}

        <UpdateSalaryModal
          updateSalaryModal={updateSalaryModal}
          handleUpdateSalaryModal={handleUpdateSalaryModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  salaryDetails: profile.salaryDetails,
  fetchingEmployeeSalaryDetails: profile.fetchingSalaryDetails,
  fetchingEmployeeSalaryDetailsError: profile.fetchingSalaryDetailsError,
  updateSalaryModal: profile.updateSalaryModal,
  employeeId: employee.singleEmployee && employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSalaryDetails,
      setEditSalary,
      handleUpdateSalaryModal,
      // deleteSalaryTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SalaryTable);
