
import React, {  useEffect,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge } from "antd";
import moment from "moment";
import PaidIcon from '@mui/icons-material/Paid';
import {getContactAddedList} from "../../DashboardAction"
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";


function ContactAddedList(props) {
 
//   useEffect(() => {
//     props.getAllOrderList(props.orgId, page);
//     setPage(page + 1);
//   }, []);
useEffect(()=>{
    if (props.timeRangeType === "today") {
    props.getContactAddedList(props.orgId,props.startDate,props.endDate)
    }else {
        props.getContactAddedList(props.orgId,props.startDate,props.endDate)
      }
   }, [props.orgId,props.startDate,props.endDate]);




  return (
    <>
   
   <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[12rem]">Name</div>
          <div className=" md:w-[10.4rem]">Email</div>
          <div className=" md:w-[12.01rem] ">Mobile No
</div>
          <div className="md:w-[8.12rem]">Designation</div>
          <div className="md:w-[8rem]">Department</div>
         


        </div>
        {/* <InfiniteScroll
          dataLength={props.allCompleteOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingAllOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"75vh"}
        > */}
        <div class="h-[65vh] overflow-auto">
          {props.contactAddedList.length ?
            <>
              {props.contactAddedList.map((item) => {
                const currentdate = moment().format("DD/MM/YYYY");
                const date = moment(item.creationDate).format("DD/MM/YYYY");

                const diff = Math.abs(
                  moment().diff(moment(item.lastRequirementOn), "days")
                );
                const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
                  } 
                   Street : ${item.address && item.address.length && item.address[0].street
                  }   
                  State : ${item.address && item.address.length && item.address[0].state
                  }
                 Country : ${(item.address &&
                    item.address.length &&
                    item.address[0].country) ||
                  ""
                  } 
                   PostalCode : ${item.address &&
                  item.address.length &&
                  item.address[0].postalCode
                  } `;
                return (
                  <div>
                    <div
                      className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3"
                    // style={{
                    //   borderBottom: "3px dotted #515050",
                    // }}
                    >
                      <div class="flex">
                        <div className=" flex font-medium flex-col w-wk   max-sm:w-full">
                          <div className="flex max-sm:w-full">
                            <div class="w-[16.1rem]">
                              {item.name}
                            </div>
                           

                            <div class="max-sm:w-full md:w-[16.12rem]">
                              <Tooltip>
                                <div class="max-sm:w-full justify-between flex md:flex-col">
                                  {item.emailId}

                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>

                        <div class="flex flex-row items-center md:w-[5.51rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div>
                           {item.mobileNo}

                          </div>



                        </div>
                      </div>
                      <div class="flex">
                        <div className=" flex font-medium flex-col  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">

                          <h4 class=" text-xs text-cardBody font-poppins">
                            {item.designationName}
                          </h4>
                        </div>
                        <div className=" flex font-medium flex-col  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <h4 class=" text-xs text-cardBody font-poppins">
                          {item.departmentId}
                          </h4>
                        </div>
                       
               
                      </div>
                     

                    </div>
                  </div>
                  // </div>
                );
              })}
            </> :
            !props.contactAddedList.length && !props.fetchingContactAddedList ? <NodataFoundPage /> 
            : null}
            </div>
        {/* </InfiniteScroll> */}
      </div>
    </>
  );

}

const mapStateToProps = ({ order, auth,dashboard, distributor }) => ({
contactAddedList:dashboard.contactAddedList,
fetchingContactAddedList:dashboard.fetchingContactAddedList,
orgId: auth.userDetails.organizationId,
timeRangeType:dashboard.timeRangeType,
startDate: dashboard.startDate,
endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getContactAddedList
    //   getAllOrderList,
    //   handleNotesModalInOrder,
    //   handleStatusOfOrder,
    //   handlePaidModal,
    //   emptyOrders,
    //   handleOrderDetailsModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactAddedList);
