import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { getMileageByUserId,deleteMileageVoucher,handleMileageVoucherIdDrwer } from "../MileageAction";
import { DeleteOutlined } from "@ant-design/icons";
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
const MileageVoucherIdDrawer=lazy(()=>import("./MileageVoucherIdDrawer"));

class MileageCard2 extends React.Component {
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
      fetchingMileageByUserIdError,
    } = this.props;
    if (fetchingMileageByUserId) return <BundleLoader/>;
    return (
      <>
         <div class=" h-[86vh] overflow-hidden overflow-x-hidden max-sm:h-h86">
         <div class="rounded m-1 p-1 w-[99%] overflow-auto h-[37rem] shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE] 
         max-sm:w-wk max-sm:overflow-auto max-sm:h-[32rem]">
      {MileageDat.map((item) => { 
                    return (
                        <div>
                            <div className="flex justify-between mt-4 max-sm:flex-col"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-72 max-sm:w-full ">

                                   
                                        <Tooltip >
                                          <div class="flex max-sm:justify-between w-full flex-row md:flex-col">
                                            <div class=" text-sm text-cardBody font-poppins">
                                            Voucher ID
                                            </div>
                                            <div class=" text-xs text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
                                            <div onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}>
         {item.voucherId}
         </div>
                                            </div>
                                            </div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col   md:w-52  max-sm:justify-between w-full max-sm:flex-row  ">
                           
                                    <div class=" text-sm text-cardBody font-poppins"> Voucher Date </div>
                                    <div class=" text-xs text-cardBody font-poppins">
                                        
                                    
                                    {dayjs(item.voucherDate).format("MMM Do YY")}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:justify-between w-full max-sm:flex-row ">
                                  

                                    <div class=" text-sm text-cardBody font-poppins">Amount</div>
                                    <div class=" text-xs text-cardBody font-poppins">
                                        € {item.amount}
                                    </div>
                                </div>
                                {/* <div className=" flex font-medium flex-col w-20 ">
                       
                                    <div class=" text-xs text-cardBody font-poppins">Approve</div>

                                    <div class=" text-xs text-cardBody font-poppins"
                                      onClick={() => {
                        props.handleLoadCarModal(true)
                         props.setRequirementsData(item);
                          }}
                          style={{
                            cursor: "pointer",
                            color: "#5986FB",
                          }}
                      
                                    >
                                        <u>Nixa</u>
                                    </div>
                                </div> */}
                                <div className=" flex font-medium flex-col md:w-32 max-sm:justify-between w-full max-sm:flex-row ">
                                    {/* <div class=" text-sm text-cardBody font-poppins">Status</div> */}

                                    <div class=" text-xs text-cardBody font-poppins">
                                    {item.status === "Approved" && (
                 <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-green-500 p-[0px_0.62em]"  >
                <div className="text-[green]">{item.status}</div>
               </div>
              )}
            
              {item.status === "Rejected" && (
                <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-red-500 p-[0px_0.62em]">
               <div className="text-[red]">{item.status}</div></div>
              )}
              {item.status === "Pending" && (
                 <div className=" w-[12rem] rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-[#e1d16c] p-[0px_0.62em]">
                  <div className="text-[#e1d16c]">Waiting for approval</div></div>
              )}
                                    </div>
                                </div>


                                <div class="flex flex-col w-[4%]">
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
                        <div >
                        <div >
                           {item.status === "Pending" ? (
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
                className="!text-base cursor-pointer text-[red]" 
                // onClick={() => {
                // this.props.deleteMileageVoucher(item.voucherId);
                  
                // }}
              />
             </StyledPopconfirm>
            ):null}
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
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageCard2);