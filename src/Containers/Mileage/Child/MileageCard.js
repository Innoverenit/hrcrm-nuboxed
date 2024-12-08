import dayjs from "dayjs";
import React, { lazy,useEffect,useState } from "react";
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfiniteScroll from "react-infinite-scroll-component";

const StatusMileageDrawer = lazy(() => import("./StatusMileageDrawer"));
const MileageVoucherIdDrawer = lazy(() => import("./MileageVoucherIdDrawer"));


function MileageCard(props){

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [expand,setExpand]=useState(false);
  const [voucherId,setVoucherId]=useState("");
 
 const handleExpand = (vid) => {
    console.log("function called");
    setExpand(!expand)
    setVoucherId(vid);
  };
  useEffect(()=> {
 props.getMileageByUserId(page,props.userId);
 setPage(page + 1);
  },[]);

  const handleLoadMore = () => {
    const pageCountMap = props.MileageDat && props.MileageDat.length &&props.MileageDat[0].pageCount
    setTimeout(() => {
      if  (props.MileageDat)
      {
        if (page < pageCountMap) {
          setPage(page + 1);
          props.getMileageByUserId(page,props.userId);
      }
      if (page === pageCountMap){
        setHasMore(false)
      }
    }
    }, 100);
  };

    const {
      MileageDat,
      fetchingMileageByUserId,
      handleMileageItems,
    } = props;

    return (
      <>
       <div class=" h-[84vh] overflow-auto overflow-x-auto">
       <InfiniteScroll
        dataLength={MileageDat.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={fetchingMileageByUserId?<div class="flex justify-center">Loading...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <div class="flex text-center font-poppins font-bold text-xs text-red-500">You have reach the end. </div>}
      >
       <div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center ">       
              {MileageDat.map((item) => {
                 return (
                  <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[7.5rem] 
                  text-[#444444] m-3 p-1 w-[19vw] flex flex-col max-sm:w-wk scale-[0.99] hover:scale-100 ease-in duration-100  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                     
                   <div >                       
                         </div>
                      <div class="flex items-center justify-between ">
                      <div class="text-sm">Voucher ID</div>
                        <div className="flex text-ellipsis whitespace-nowrap overflow-hidden h-[2em] text-base p-1
                         text-[blue] cursor-pointer max-sm:items-center">
<div class="text-[0.82rem] font-semibold " onClick={() => { handleExpand(item.voucherId) 
                props.handleMileageVoucherIdDrwer(true)}}>
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
props.handleStatusMileageModal(true);
handleExpand(item.voucherId)


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
              title="Do you want to delete?"
              onConfirm={() =>   props.deleteMileageVoucher(item.voucherId)}
            >
              <DeleteOutlineIcon
                type="delete"
                className="!text-[1.2rem] cursor-pointer text-[red]" 
                // onClick={() => {
                // props.deleteMileageVoucher(item.voucherId);
                  
                // }}
              />
              </StyledPopconfirm>
            )}
             {item.status==="Rejected" && (
            <Button type="primary"
            onClick={()=>{
              // props.reapply();
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
              </InfiniteScroll>
              </div> 

        <MileageVoucherIdDrawer 
        voucherId={voucherId}
        mileageVoucherIdDrawer={props.mileageVoucherIdDrawer}
        handleMileageVoucherIdDrwer={props.handleMileageVoucherIdDrwer}
        />
<StatusMileageDrawer 
handleExpand={handleExpand}
         voucherId={voucherId}
        updateStatusMileageModal={props.updateStatusMileageModal}
        handleStatusMileageModal={props.handleStatusMileageModal}
        />
      </>
    );
  
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
