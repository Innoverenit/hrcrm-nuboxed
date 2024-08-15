import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
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
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { Tooltip } from "antd";
const DefultToggle = lazy(() => import("./DefultToggle"));
const UpdateBankModal = lazy(() => import("../../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Bank/UpdateBankModal"));


class BankTable extends Component {
 
  componentDidMount() {
    const { getBankDetails, employeeId } = this.props;
    getBankDetails(this.props.employeeId);
  }
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
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
             <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
          <div className=" md:w-[6.5rem]">
        <FormattedMessage
                  id="app.bankName"
                  defaultMessage="Account Holder"
                /></div>
 
        <div className="md:w-[6.1rem]">  <FormattedMessage id="app.bankName" defaultMessage="Bank Name" /></div>
                 <div className="md:w-[10.1rem]">
                 <FormattedMessage
          id="app.branchName"
          defaultMessage="Branch Name"
        /></div>
                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.accountNo" defaultMessage="Account#" /></div>

                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.ifscCode" defaultMessage="SWIFT Code" /></div>
       
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {bank =="" ? "None":bank.map((item) => { 
        
        
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
                              <DefultToggle
              // partnerId={item.partnerId}
               defaultInd={item.defaultInd}
              // assignedIndicator={item.assignedInd}
              id={item.id}
            />
          </>
                 
                  </div>
                                <div className=" flex  ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class="  text-xs  font-poppins text-center">
                                    <BorderColorIcon 
            style={{ cursor: "pointer", fontSize: "1rem" }}
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
            title="Do you want to delete?"
            onConfirm={() => deleteBankTable(item.id)}
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
          columns={columns}
          dataSource={bank}
          Loading={fetchingBankDetails || fetchingBankDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        /> */}

        <UpdateBankModal
          updateBankModal={updateBankModal}
          handleUpdateBankModal={handleUpdateBankModal}
        />

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

const mapStateToProps = ({ profile, employee }) => ({
  bank: profile.bankDetails,
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
