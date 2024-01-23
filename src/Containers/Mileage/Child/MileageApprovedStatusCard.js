import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, } from "antd";
import { getMileageByUserId,deleteMileageVoucher,handleMileageVoucherIdDrwer,getApprovedMileage } from "../MileageAction";
import { OnlyWrapCard } from '../../../Components/UI/Layout'
const MileageVoucherIdDrawer = lazy(() => import("./MileageVoucherIdDrawer"))



class MileageApprovedStatusCard extends React.Component {
  state = {
    expand: false,
    voucherId: "",
    pageNo:0,
  };
  handleExpand = (vid) => {
    console.log("function called");
    this.setState({
      expand: !this.state.expand,
      voucherId: vid,
    });
  };
  componentDidMount() {
    // this.props.getMileageByUserId(this.props.userId);
    this.setState({pageNo:this.state.pageNo + 1});
    this.props.getApprovedMileage(this.props.userId,this.state.pageNo);
  }
  render() {
    const {
      MileageDat,
      approvedMileages
    } = this.props;

    return (
      <>
        
      <OnlyWrapCard className="h-[32rem]">
      <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span
                className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 "

              ></span>
              <span class="font-semibold text-xs text-cardBody-heading font-poppins"> Approved </span>
            </span>
          </div>   
      {approvedMileages.map((item) => { 
                    return (
                        <div>
                            <div className="flex justify-between mt-4"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-72 mb-1 ">

                                   
                                        <Tooltip >
                                            <h4 class=" text-sm text-cardBody font-poppins">
                                            Voucher ID
                                            </h4>
                                            <h4 class=" text-xs text-blue-500 text-cardBody font-poppins cursor-pointer">
                                                
                                            <div onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}>
         {item.voucherId}
         </div>
                                            </h4>

                                        </Tooltip>
                                        <div className=" flex font-medium flex-col w-max ">
                                    <h4 class=" text-xs text-cardBody font-poppins"></h4>

                                    <div class=" text-xs text-cardBody font-poppins">
         
            
              
                                    <div
                 style={{
                   border: "2px solid green",
                   padding: "0px 0.62em",
                   textAlign: "center",
                   margin: "2px",
                   borderRadius: "0.62em",
                 }}
               >
                 <div className="text-[green]">{item.status}</div>
               </div>
                                    </div>
                                    </div>
                                </div>

                                <div className=" flex font-medium flex-col  w-52 ml-1 ">
                           
                                    <h4 class=" text-sm text-cardBody font-poppins"> Voucher Date </h4>
                                    <h4 class=" text-xs text-cardBody font-poppins">
                                        
                                    
                                    {dayjs(item.voucherDate).format("MMM Do YY")}

                                    </h4>
                                </div>
                                <div className=" flex font-medium flex-col w-36 ">
                                  

                                    <h4 class=" text-sm text-cardBody font-poppins">Amount</h4>
                                    <h4 class=" text-xs text-cardBody font-poppins">
                                        € {item.amount}
                                    </h4>
                                </div>
                     
                               
                              
                            </div>
                        </div>
                    )
                })}
      </OnlyWrapCard>




        <MileageVoucherIdDrawer 
        voucherId={this.state.voucherId}
        mileageVoucherIdDrawer={this.props.mileageVoucherIdDrawer}
        handleMileageVoucherIdDrwer={this.props.handleMileageVoucherIdDrwer}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,
  MileageDat: mileage.MileageDat,
  fetchingMileageByUserId: mileage.fetchingMileageByUserId,
  fetchingMileageByUserIdError: mileage.fetchingMileageByUserIdError,
  mileageVoucherIdDrawer:mileage.mileageVoucherIdDrawer,
  approvedMileages:mileage.approvedMileages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer,
      getApprovedMileage
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageApprovedStatusCard);