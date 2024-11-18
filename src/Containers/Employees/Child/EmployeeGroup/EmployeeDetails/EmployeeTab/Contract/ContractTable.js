import React, { Component,lazy } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import {
  getContractDetails,
  handleUpdateContractModal,
  setEditContract,
} from "../../../../../../Profile/ProfileAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import EmptyPage from "../../../../../../Main/EmptyPage";
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
         <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
          <div className=" md:w-[12.5rem]">
       Start Date</div>
 
        <div className="md:w-[10.1rem]">
           End Date</div>
                 <div className="md:w-[10.1rem]">
                Contract Type</div>
                       <div className=" md:w-[8.1rem]">
                   Note</div>

                     
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {contractDetails == "" ? <EmptyPage/>:contractDetails.map((item) => { 
        
        
        return (
            <div>
                <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1"
                    >
                         
                         <div className=" flex md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

<div class="max-sm:w-full">
                            <Tooltip>
                              <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                              
                                <div class="text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                    
                                <span>{dayjs(item.previous_start_date).format("DD/MM/YYYY")}</span>


                                </div>
                                </div>
                            </Tooltip>
                            </div>
                            </div>
                    </div>
                    <div class="flex">

                 
                  
                    <div className=" flex md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                    
                      <div class="text-xs  font-poppins">
                      <span>{dayjs(item.previous_end_date).format("DD/MM/YYYY")}</span>
                      </div>
                  </div>

                  <div className=" flex md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                    
                    <div class="text-xs  font-poppins">
                    {item.contract_Type}
                    </div>
                </div>
                <div className=" flex md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                       
                       <div class="text-xs  font-poppins">
     
         <div className=" text-xs  font-poppins">
           <span>{item.notes}</span>
         </div>
     
                       </div>
                   </div>

              
                  </div>
    
                    <div className=" flex ml-2 md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                        

                        <div class=" text-xs  font-poppins text-center">
                        <BorderColorIcon className=" cursor-pointer !text-icon "

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
