import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getMileageByUserId,getRejectdMileage,deleteMileageVoucher,handleMileageVoucherIdDrwer } from "../MileageAction";
const MileageVoucherIdDrawer = lazy(() => import("./MileageVoucherIdDrawer"))

class MileageRejectedStatusCard extends React.Component {
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
    this.props.getRejectdMileage(this.props.userId,this.state.pageNo);
  }
  render() {
    const {
      rejectedMileages,
    } = this.props;

    return (
      <>      
        <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span
                className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 ">
              </span>
              <span class="font-semibold text-xs -heading font-poppins"> Rejected </span>
            </span>
          </div>   
      {rejectedMileages.map((item) => { 
                    return (
                        <div>
                            <div className="flex justify-between mt-4 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-72 mb-1 ">
                              
                                        <Tooltip >
                                            <div class=" text-xs  font-poppins">
                                            Voucher ID
                                            </div>
                                            <div class=" text-xs text-blue-500  font-poppins cursor-pointer">
                                                
                                            <div onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}>
         {item.voucherId}
         </div>
                                            </div>
                                        </Tooltip>
                                        <div className=" flex font-medium flex-col w-max ">
                                    <div class=" text-xs  font-poppins"></div>
                                    <div class=" text-xs  font-poppins">      
                                    <div
                style={{
                  border: "2px solid red",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  borderRadius: "0.62em",
                }}
              >
                <div className="text-[red]">{item.status}</div>
                </div>
                                    </div>   
                        </div>
                                </div>

                                <div className=" flex font-medium flex-col  w-52 ml-1 ">                    
                                    <div class=" text-xs  font-poppins"> Voucher Date </div>
                                    <div class=" text-xs  font-poppins">                                                                       
                                    {dayjs(item.voucherDate).format("MMM Do YY")}
                                    </div>
                                    <div class="flex flex-col w-[4%]">
                
                <div >
                <div >
   
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
                                </div>
                                <div className=" flex font-medium flex-col w-36 ">                               
                                    <div class=" text-xs font-poppins">Amount</div>
                                    <div class=" text-xs  font-poppins">
                                        € {item.amount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
      </div>

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
  rejectedMileages:mileage.rejectedMileages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer,
      getRejectdMileage
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageRejectedStatusCard);