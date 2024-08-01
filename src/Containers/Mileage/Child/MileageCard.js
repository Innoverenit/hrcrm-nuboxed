import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getMileageByUserId,
  deleteMileageVoucher,
  handleStatusMileageModal,
  handleMileageVoucherIdDrwer,
 } from "../MileageAction";

import { StyledPopconfirm } from "../../../Components/UI/Antd";
import AssistantIcon from '@mui/icons-material/Assistant';
import { DeleteOutlined, } from "@ant-design/icons";
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
const StatusMileageDrawer = lazy(() => import("./StatusMileageDrawer"));
const MileageVoucherIdDrawer = lazy(() => import("./MileageVoucherIdDrawer"));


class MileageCard extends React.Component {
  state = {
    expand: false,
    voucherId: "",
  };
  handleExpand = (vid) => {
    console.log("function called");
    this.setState({
      expand: !this.state.expand,
      voucherId: vid,
    });
  };
  componentDidMount() {
    this.props.getMileageByUserId(this.props.userId);
  }

  render() {
    const {
      MileageDat,
      fetchingMileageByUserId,
      handleMileageItems,
      
    } = this.props;
    if (fetchingMileageByUserId) return <BundleLoader/>;
    return (
      <>
       <div class=" h-[84vh] overflow-auto overflow-x-auto">
       <div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center ">       
              {MileageDat.map((item) => {
                 return (
                  <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[7.5rem] 
                  text-[#444444] m-3 p-1 w-[19vw] flex flex-col max-sm:w-wk scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                     
                   <div >                       
                         </div>
                      <div class="flex items-center justify-between ">
                      <div class="text-sm">Voucher ID</div>
                        <div className="flex text-ellipsis whitespace-nowrap overflow-hidden h-[2em] text-base p-1
                         text-[blue] cursor-pointer max-sm:items-center">
<div class="text-[0.82rem] font-semibold " onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}>
         {item.voucherId}
         </div>
           </div>                                                
          </div>                                                       
                        <div class="flex  justify-between">
                            <h3 class="text-sm">Voucher Date</h3>
                            <div class="text-[0.82rem]">{dayjs(item.voucherDate).format("MMM Do YY")}</div>
                        </div>
                        <div class="flex justify-between mb-[0.4rem]">
                    <div class="text-sm">Amount</div> 
                    <h5 class="text-[0.82rem]">{item.amount}</h5>
                    </div>

                    <div class="flex  justify-between" >
                    {item.status === "Approved" && (
                 <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-green-500 p-[0px_0.62em]" >
                 <div className="text-[green]">{item.status}</div>
               </div>
              )}
            
              {item.status === "Rejected" && (
                <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-red-500 p-[0px_0.62em]">
                <div className="text-[red]">{item.status}</div>
                </div>
              )}
              {item.status === "Pending" && (
                  <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-[#e1d16c] p-[0px_0.62em]">
                  
                  <div className="text-[#e1d16c]" > Waiting for approval</div>
                  </div>
              )}

<div class="flex justify-end items-center">
<div  className=" cursor-pointer "

onClick={() => {
this.props.handleStatusMileageModal(true);
this.handleExpand(item.voucherId)


}}
>
                 <Tooltip  title={"Status"}>
                 <AssistantIcon  className="!text-icon  cursor-pointer text-[grey] "/>
   </Tooltip> 

   </div>
          {/* <div style={{filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))"}} class="rounded-full bg-white w-5 h-5 cursor-pointer">
                      <EditIcon
                         style={{ color: "blue" ,display:"flex",justifyItems:"center",justifyContent:"center",fontSize:"0.75rem",marginTop:"0.25rem",marginLeft:"0.25rem"}}
          //               onClick={() => {
          //               props.handleDeleteModal(true);
          //               props.setRequirementsData(item);
          //               handleSetCurrentOrderId(item.orderId)
          // }} 
                        />
                        </div> */}
                        
                           {item.status === "Pending" && (
              <StyledPopconfirm
              // title="Do you want to delete?"
              title={
                <FormattedMessage
                  id="app.doyouwanttodelete?"
                  defaultMessage="Do you want to delete?"
                />
              }
              onConfirm={() =>   this.props.deleteMileageVoucher(item.voucherId)}
            >
              <DeleteOutlined
                type="delete"
                className="!text-[1.2rem] cursor-pointer text-[red]" 
                // onClick={() => {
                // this.props.deleteMileageVoucher(item.voucherId);
                  
                // }}
              />
              </StyledPopconfirm>
            )}
             {item.status==="Rejected" && (
            <Button type="primary"
            onClick={()=>{
              // this.props.reapply();
            }}>
            Reapply
            </Button>
          )}
          </div>
              </div>                                                             
                    </div>
                 )  
            })}
              </div>
              </div> 

        <MileageVoucherIdDrawer 
        voucherId={this.state.voucherId}
        mileageVoucherIdDrawer={this.props.mileageVoucherIdDrawer}
        handleMileageVoucherIdDrwer={this.props.handleMileageVoucherIdDrwer}
        />
<StatusMileageDrawer 
handleExpand={this.handleExpand}
         voucherId={this.state.voucherId}
        updateStatusMileageModal={this.props.updateStatusMileageModal}
        handleStatusMileageModal={this.props.handleStatusMileageModal}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,
  MileageDat: mileage.MileageDat,
  updateStatusMileageModal:mileage.updateStatusMileageModal,
  fetchingMileageByUserId: mileage.fetchingMileageByUserId,
  fetchingMileageByUserIdError: mileage.fetchingMileageByUserIdError,
  mileageVoucherIdDrawer:mileage.mileageVoucherIdDrawer,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer,
      handleStatusMileageModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageCard);
