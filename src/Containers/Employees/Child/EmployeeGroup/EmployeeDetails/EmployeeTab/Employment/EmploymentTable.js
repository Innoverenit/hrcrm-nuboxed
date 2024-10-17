import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { handleUpdateEmploymentModal } from "../../../../../../Profile/ProfileAction";
import {
  getEmploymentDetails,
  setEditEmployment,
} from "../../../../../../Profile/ProfileAction";
import { CurrencySymbol } from "../../../../../../../Components/Common";
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";
import { deleteEmploymentTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
const UpdateEmploymentModal = lazy(() => import("../Employment/UpdateEmploymentModal"));

class EmploymentTable extends Component {

  componentDidMount() {
    const { getEmploymentDetails, employeeId } = this.props;
    getEmploymentDetails(this.props.employeeId);
  }

  render() {
    const {
      fetchingEmploymentDetails,
      fetchingEmploymentDetailsError,
      employment,
      user,
      handleUpdateEmploymentModal,
      updateEmploymentModal,
      setEditEmployment,
      deleteEmploymentTable,
    } = this.props;

 

    if (fetchingEmploymentDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
          <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
          <div className=" md:w-[8.5rem]">
        <FormattedMessage
                  id="app.companyname"
                  defaultMessage="Company Name"
                /></div>
 
        <div className="md:w-[10.1rem]">  <FormattedMessage id="app.designation" defaultMessage="Designation" /></div>
                 <div className="md:w-[10.1rem]">
                 <FormattedMessage
          id="app.startDate"
          defaultMessage="Start Date"
        /></div>
                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.endDate" defaultMessage="End Date" /></div>

                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.Salary" defaultMessage="Salary" /></div>

                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.description" defaultMessage="Description" /></div>
       
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {employment.map((item) => { 
        
        
                    return (
                        <div>
                            <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1"
                                >
                                     
                                     <div className=" flex  md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
      {item.companyName}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex  md:w-[8.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class=" text-xs  font-poppins">
                                  {item.designationType}
                                  </div>
                              </div>

                              <div className=" flex  md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class=" text-xs  font-poppins">
                                <span>{dayjs(item.startDate).format("YYYY-MM-DD")}</span>
                                </div>
                            </div>
                            <div className=" flex  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class=" text-xs  font-poppins">
                 
                     <div className="  text-xs  font-poppins">
                     <span>{dayjs(item.endDate).format("YYYY-MM-DD")}</span>
                     </div>
                 
                                   </div>
                               </div>

                               <div className=" flex  md:w-[9.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class=" text-xs  font-poppins">
                                <span>
             <CurrencySymbol currencyType={item.currency} />
             {`${item.salary} ${item.salaryType}`}
            {/* {`${item.salary} ${item.currency} ${item.salaryType}`} */}
            </span>
                                </div>
                            </div>
                            <div className=" flex  md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class=" text-xs  font-poppins">
                          
            {item.description}
         
                                </div>
                            </div>
                              </div>
                              <div className=" flex " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                   
                              <>
                              {item.documentId ? (
              <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
                {user.userAccessInd === true ? (
                <DownloadIcon
                  type="download"
                  // onClick={() => startDownload()}
                  style={{ cursor: "pointer" }}
                />
                ):null}
              </a>
            ) : null}
          </>
                 
                  </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class="  text-xs  font-poppins text-center">
                                    <BorderColorIcon 
            style={{ cursor: "pointer", fontSize: "1rem" }}
            onClick={() => {
              setEditEmployment(item);
              handleUpdateEmploymentModal(true);
            }}
          />

                                    </div>
                                </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class="  text-xs  font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteEmploymentTable(item.id)}
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
          dataSource={employment}
          Loading={fetchingEmploymentDetails || fetchingEmploymentDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        /> */}

        <UpdateEmploymentModal
          updateEmploymentModal={updateEmploymentModal}
          handleUpdateEmploymentModal={handleUpdateEmploymentModal}
        />
        {/* )} */}
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee,auth }) => ({
  employment: profile.employmentDetails,
  user:auth.userDetails,
  fetchingEmploymentDetails: profile.fetchingEmploymentDetails,
  fetchingEmploymentDetailsError: profile.fetchingEmploymentDetailsError,
  updateEmploymentModal: profile.updateEmploymentModal,
  employeeId: employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmploymentDetails,
      setEditEmployment,
      handleUpdateEmploymentModal,
      deleteEmploymentTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentTable);
