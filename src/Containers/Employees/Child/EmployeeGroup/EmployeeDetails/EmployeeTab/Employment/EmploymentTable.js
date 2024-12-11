import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";

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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { base_url } from "../../../../../../../Config/Auth";
import StoreIcon from '@mui/icons-material/Store';
import HailIcon from '@mui/icons-material/Hail';
import DescriptionIcon from '@mui/icons-material/Description';
import { deleteEmploymentTable } from "../../../../../../Profile/ProfileAction";
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdateEmploymentModal = lazy(() => import("../Employment/UpdateEmploymentModal"));

class EmploymentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
    const { getEmploymentDetails, employeeId } = this.props;
    getEmploymentDetails(this.props.employeeId);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "277",//0"Company Name
        "325",//1Designation
        "176",//2"Start Date"
        "126",//3End Date""
        "981",// Salary"
        "147"//"Description
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
      return <NodataFoundPage />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
          <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent text-lm font-bold font-poppins sticky z-10">
          <div className=" max-md:w-[8.5rem] truncate w-[8.5rem] text-[#00A2E8] text-sm "><StoreIcon className=" !text-icon"/>{this.state.translatedMenuItems[0]}</div>
 
        <div className="max-md:w-[10.1rem] truncate w-[10.1rem]"> <HailIcon className=" !text-icon text-[#699CA2]"/>{this.state.translatedMenuItems[1]}</div>
                 <div className="max-md:w-[10.1rem] truncate w-[10.1rem]"><DateRangeIcon className=" !text-icon text-[#1E213D]"/>{this.state.translatedMenuItems[2]}</div>
                       <div className=" max-md:w-[8.1rem] truncate w-[8.1rem]"> <InsertInvitationIcon className=" !text-icon text-[#006600]"/>{this.state.translatedMenuItems[3]}</div>
                       <div className=" max-md:w-[8.1rem] truncate w-[8.1rem]"><MonetizationOnIcon  className=" !text-icon mr-1  text-[#D64045]"/>{this.state.translatedMenuItems[4]}</div>
                       <div className=" max-md:w-[8.1rem] truncate w-[8.1rem]"><DescriptionIcon className=" !text-icon text-[#4B2206]"/>{this.state.translatedMenuItems[5]}</div>
       
        <div className="w-[10.2rem]"></div>
      </div>      
      {employment.map((item) => {       
                    return (
                        <div>
                            <div className="flex rounded justify-between bg-white mt-[0.5rem] items-center py-ygap"
                                >
                                     
                                     <div className=" flex  md:w-[14rem] h-8 border-l-2 border-green-500 bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md: w-[8rem]">                                         
                                            <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">                                           
                                           {item.companyName}        
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div class="flex">
                                  <div className=" flex  md:w-[8.3rem] h-8 ml-gap bg-[#eef2f9] items-center justify-center    max-sm:flex-row w-full max-sm:justify-between">                            
                                    <div class=" text-xs  font-poppins">
                                     {item.designationType}
                                  </div>
                               </div>

                              <div className=" flex  md:w-[10.3rem] h-8 ml-gap bg-[#eef2f9] items-center justify-center    max-sm:flex-row w-full max-sm:justify-between">                                
                                <div class=" text-xs  font-poppins">
                                <span>{dayjs(item.startDate).format("YYYY-MM-DD")}</span>
                                </div>
                            </div>
                            <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center   md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class=" text-xs  font-poppins">
                 
                     <div className="  text-xs  font-poppins">
                     <span>{dayjs(item.endDate).format("YYYY-MM-DD")}</span>
                     </div>       
                                   </div>
                               </div>

                               <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center   md:w-[9.3rem]  max-sm:flex-row w-full max-sm:justify-between">                              
                                <div class=" text-xs  font-poppins">
                                <span>
             <CurrencySymbol currencyType={item.currency} />
             {`${item.salary} ${item.salaryType}`}
            {/* {`${item.salary} ${item.currency} ${item.salaryType}`} */}
            </span>
                                </div>
                            </div>
                            <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center   md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">                           
                                <div class=" text-xs  font-poppins">                  
                                   {item.description} 
                                </div>
                            </div>
                              </div>
                              <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center   " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >                  
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
                                <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  <div class="  text-xs  font-poppins text-center">
                                    <BorderColorIcon  className=" cursor-pointer !text-icon"
          
            onClick={() => {
              setEditEmployment(item);
              handleUpdateEmploymentModal(true);
            }}
          />
                                    </div>
                                </div>
                                <div className=" flex  h-8 ml-gap bg-[#eef2f9] items-center justify-center    md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between "> 
                                    <div class="  text-xs  font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteEmploymentTable(item.id)}
          >
            <DeleteIcon
              type="delete"
              className=" cursor-pointer !text-icon text-red-600"
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
<Suspense>
        <UpdateEmploymentModal
          updateEmploymentModal={updateEmploymentModal}
          handleUpdateEmploymentModal={handleUpdateEmploymentModal}
        />
        </Suspense>
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
