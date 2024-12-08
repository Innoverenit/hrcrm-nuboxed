import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import {  Tooltip } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {getBankDetails, handleUpdateBankModal, setEditBank, deleteBankTable } from "../../../../../CandidateAction";
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

const DefultToggle = lazy(()=>import("../Bank/DefultToggle"));
const UpdateBankModal = lazy(()=>import("./UpdateBankModal"));
class BankTable extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         educationModalVisible: false
  //         // data:this.props.processTask
  //     };
  // }
  // handleEducationModalVisible = () =>
  //     this.setState({ educationModalVisible: !this.state.educationModalVisible });
  componentDidMount() {
    const { getBankDetails, candidateId } = this.props;
    getBankDetails(this.props.candidateId);
  }
  render() {
    const {
      fetchingBankDetails,
      fetchingBankDetailsError,
      bankDetails,
      handleUpdateBankModal,
      updateBankModal,
      setEditBank,
      deleteBankTable,
    } = this.props;
 
   
    if (fetchingBankDetailsError) {
      return <NodataFoundPage />;
    }
    return (
      <>
      <div className=' flex justify-end sticky top-28 z-auto'>
      <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[10.1rem]">Account Holder</div>
        <div className=" md:w-[9.1rem]">Bank Name</div>
        <div className=" md:w-[6.8rem] ">Branch Name</div>
        <div className="md:w-[4.9rem]">Account#</div>
        <div className="md:w-[7.8rem]">SWIFT Code</div>

      </div>

      
      {bankDetails.map((item) => { 

                    return (
                        <div>
                            <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                   <div class="flex">
                                <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:w-full  ">

                                   
                                        <Tooltip>
                                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                            {/* <div class=" text-xs  font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
      {item.accountHolderName}
       
                                            </div>
                                            </div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                                    {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-xs  font-poppins">   
                                    {item.bankName} 
                                    </div>
                                
                                </div> 
                             
                                </div>
                                
                                <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm  font-poppins max-sm:hidden"># Opportunity</div> */}

                                    <div class=" text-xs  font-poppins text-center">
                                    {item.branchName}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-xs  font-poppins text-center">
                                    {item.accountNo}

                                    </div>
                                </div>
                                
                                <div className=" flex font-medium flex-col md:w-[11.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm  font-poppins max-sm:hidden">Weighted Value</div> */}

                                    <div class=" text-xs  font-poppins text-center">
                                    {item.ifscCode}

                                    </div>
                                </div>
                             
                                <div class="flex md:items-center"> 
                                
                                <div className=" flex font-medium flex-col  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                           <div class=" text-xs  font-poppins">   
                           <DefultToggle
              // partnerId={item.partnerId}
               defaultInd={item.defaultInd}
              // assignedIndicator={item.assignedInd}
              id={item.id}
            />
                           </div>
                       
                       </div> 
                   
                       
               
                      </div>

                      <div class="flex flex-col w-[10%] max-sm:flex-row max-sm:w-[10%]">
                
                <div>
                  <Tooltip title="Edit">
                    <BorderColorIcon
                      style={{
                        color: "grey",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                      onClick={() => {
                        setEditBank(item);
                        handleUpdateBankModal(true);
                      }}
                    />
                  </Tooltip>
                </div>
        
            
                <div>
                  <StyledPopconfirm
                    title="Do you want to delete?"
                    onConfirm={() => deleteBankTable(item.id)}
                  >
                    {/* {user.opportunityDeleteInd ===true && ( */}
                    <DeleteIcon
                      type="delete"
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontSize: "1rem",
                      }}
                    />
                    {/* )} */}
                  </StyledPopconfirm>
                </div>
             
              <div></div>
            </div>
                            </div>
                        </div>


                    )
                })}
      </div>
      </div>
        {/* <StyledTable
          columns={columns}
          dataSource={bankDetails}
          Loading={fetchingBankDetails || fetchingBankDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: 460 }}
          pagination={false}
        /> */}

        <UpdateBankModal
          updateBankModal={updateBankModal}
          handleUpdateBankModal={handleUpdateBankModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  bankDetails: candidate.bankDetails,
  fetchingBankDetails: candidate.fetchingBankDetails,
  fetchingBankDetailsError: candidate.fetchingBankDetailsError,
  candidateId: candidate.candidate.candidateId,
  updateBankModal: candidate.updateBankModal,
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
