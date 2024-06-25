import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  getContractDetails,
  handleUpdateContractModal,
  setEditContract,
} from "../../../../../../Profile/ProfileAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import { Tooltip } from "antd";
const UpdateContractModal = lazy(() => import("./UpdateContractModal"));

class ContractTable extends Component {
  componentDidMount() {
    const { getContractDetails, employeeId } = this.props;
    getContractDetails(this.props.employeeId);
  }
  render() {
    const {
      fetchingContractDetails,
      fetchingContractDetailsError,
      contractDetails,
      handleUpdateContractModal,
      updateContractModal,
      setEditContract,
    } = this.props;




    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
         <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[12.5rem]">
        <FormattedMessage
                  id="app.startDate"
                  defaultMessage="Start Date"
                /></div>
 
        <div className="md:w-[10.1rem]">
            <FormattedMessage id="app.endDate" defaultMessage="End Date" /></div>
                 <div className="md:w-[10.1rem]">
                 <FormattedMessage
          id="app.contracttype"
          defaultMessage="Contract Type"
        /></div>
                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.notes" defaultMessage="Note" /></div>

                     
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {contractDetails == "" ? "No data":contractDetails.map((item) => { 
        
        
        return (
            <div>
                <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                    >
                         
                         <div className=" flex font-medium flex-col md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

<div class="max-sm:w-full">
                            <Tooltip>
                              <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                              
                                <div class="text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                                    
                                <span>{dayjs(item.previous_start_date).format("DD/MM/YYYY")}</span>


                                </div>
                                </div>
                            </Tooltip>
                            </div>
                            </div>
                    </div>
                    <div class="flex">

                 
                  
                    <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                    
                      <div class="text-sm  font-poppins">
                      <span>{dayjs(item.previous_end_date).format("DD/MM/YYYY")}</span>
                      </div>
                  </div>

                  <div className=" flex font-medium flex-col md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                    
                    <div class="text-sm  font-poppins">
                    {item.contract_Type}
                    </div>
                </div>
                <div className=" flex font-medium flex-col md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                       
                       <div class="text-sm  font-poppins">
     
         <div className="font-normal text-sm  font-poppins">
           <span>{item.notes}</span>
         </div>
     
                       </div>
                   </div>

              
                  </div>
    
                    <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                        

                        <div class=" text-sm  font-poppins text-center">
                        <BorderColorIcon 
style={{ cursor: "pointer", fontSize: "1rem" }}
onClick={() => {
  setEditContract(item);
  handleUpdateContractModal(true);
}}
/>

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
          dataSource={contractDetails}
          Loading={fetchingContractDetails || fetchingContractDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        /> */}
        <UpdateContractModal
          handleUpdateContractModal={handleUpdateContractModal}
          updateContractModal={updateContractModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  contractDetails: profile.contractDetails,
  fetchingContractDetails: profile.fetchingContractDetails,
  fetchingContractDetailsError: profile.fetchingContractDetailsError,
  updateContractModal: profile.updateContractModal,

  employeeId: employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContractDetails,
      handleUpdateContractModal,
      setEditContract,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContractTable);
