import React, { Component ,lazy, Suspense} from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  handleUpdateBankModal,
  setEditBank,
} from "../../../../../../Profile/ProfileAction";
import { getBankDetails } from "../../../../../../Profile/ProfileAction";
import { deleteBankTable } from "../../../../../../Profile/ProfileAction";
import { Tooltip } from "antd";
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
const EmptyPage = lazy(() => import("../../../../../../Main/EmptyPage"));
const DefultToggle = lazy(() => import("./DefultToggle"));
const UpdateBankModal = lazy(() => import("../../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Bank/UpdateBankModal"));


class BankTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    const { getBankDetails, employeeId } = this.props;
    getBankDetails(this.props.userType,this.props.uniqueId);
    this.fetchMenuTranslations();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "1186",//0 Account Holder
        "1187",//1 Bank Name
        "1188",//2  Branch Name
        "1189",//3Account#
        "1190",// SWIFT Code
        "1259"// Do you want to delete?"
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

  render() {
    const {
      fetchingBankDetails,
      fetchingBankDetailsError,
      bank,
      handleUpdateBankModal,
      updateBankModal,
      setEditBank,
      deleteBankTable,
    } = this.props;
   

    if (fetchingBankDetailsError) {
      return <NodataFoundPage />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
             <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins text-lm sticky z-10">
          <div className=" max-md:w-[6.5rem] text-sm w-[7.5rem] text-[#00A2E8]"><AccountCircleIcon className=" !text-icon"/>{this.state.translatedMenuItems[0]}</div>
 
        <div className="max-md:w-[6.1rem] w-[6.1rem]"> <AccountBalanceIcon className=" !text-icon text-[#1E213D]"/>  {this.state.translatedMenuItems[1]}</div>
                 <div className="max-md:w-[10.1rem] w-[10.5rem]"> <AccountTreeIcon className=" !text-icon text-[#006600]"/> {this.state.translatedMenuItems[2]}</div>
                       <div className=" max-md:w-[8.1rem] w-[8.1rem]"> <AssignmentIndIcon className=" !text-icon text-[#4B2206] "/> {this.state.translatedMenuItems[3]}</div>

                       <div className=" max-md:w-[8.1rem] w-[8.1rem]"><PasswordIcon className=" !text-icon text-[#D64045]"/>  {this.state.translatedMenuItems[4]}</div>
       
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {bank =="" ? <Suspense><EmptyPage/></Suspense>:bank.map((item) => { 
        
        
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
                                                
      {item.accountHolderName}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex  md:w-[9.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class=" text-xs  font-poppins">
                                  {item.bankName}
                                  </div>
                              </div>

                              <div className=" flex  md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class=" text-xs  font-poppins">
                                {item.branchName}
                                </div>
                            </div>
                            <div className=" flex  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class=" text-xs  font-poppins">
                 
                     <div className="font-normal  text-xs  font-poppins">
                       <span>{item.accountNo}</span>
                     </div>
                 
                                   </div>
                               </div>

                               <div className=" flex  md:w-[16.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class=" text-xs  font-poppins">
                                <span>
              {item.ifscCode} 
            </span>
                                </div>
                            </div>
                              </div>
                              <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                   
                              <>
                              <Suspense>
                              <DefultToggle
              // partnerId={item.partnerId}
               defaultInd={item.defaultInd}
              // assignedIndicator={item.assignedInd}
              id={item.id}
            /></Suspense>
          </>
                 
                  </div>
                                <div className=" flex  ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class="  text-xs  font-poppins text-center">
                                    <BorderColorIcon  className=" text-red-600 !text-icon cursor-pointer "

            onClick={() => {
              setEditBank(item);
              handleUpdateBankModal(true);
            }}
          />

                                    </div>
                                </div>
                                <div className=" flex  ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class="  text-xs  font-poppins text-center">
                                    <StyledPopconfirm
            title={this.state.translatedMenuItems[5]}
            onConfirm={() => deleteBankTable(item.id)}
          >
            <DeleteIcon
              type="delete"
             className=" text-red-600 !text-icon cursor-pointer "
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
          columns={columns}
          dataSource={bank}
          Loading={fetchingBankDetails || fetchingBankDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        /> */}
<Suspense>
        <UpdateBankModal
          updateBankModal={updateBankModal}
          handleUpdateBankModal={handleUpdateBankModal}
        />
</Suspense>
        {/* )} */}
        {/* <StyledModal
                    title={"Configure"}
                    width="36%"
                    // height="50%"
                    visible={this.state.emailModalVisible}
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={this.handleEmailModalVisible}
                    footer={null}
                >
                    <EditEmailForm handleEmailModalVisible={this.handleEmailModalVisible} />
                </StyledModal> */}
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee, auth }) => ({
  user: auth.userDetails,
  bank: profile.bankDetails,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
  fetchingBankDetails: profile.fetchingBankDetails,
  fetchingBankDetailsError: profile.fetchingBankDetailsError,
  employeeId: employee.singleEmployee.employeeId,
  updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBankDetails,
      handleUpdateBankModal,
      setEditBank,
      deleteBankTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BankTable);
