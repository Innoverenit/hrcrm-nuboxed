
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar} from "../../../../Components/UI/Elements";

function DashProcurePayDrawerCard (props) {
 

  return (
    <>
   
   <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className="text-xs font-poppins font-bold md:w-[12rem]">Name</div>
          <div className="text-xs font-poppins font-bold md:w-[10.4rem]">Work#
</div>
          <div className="text-xs font-poppins font-bold md:w-[12.01rem] ">Category</div>
          <div className="text-xs font-poppins font-bold md:w-[8.12rem]">Type</div>
          <div className="text-xs font-poppins font-bold md:w-[4rem]">Payment(Days)
</div>
          <div className="text-xs font-poppins font-bold md:w-[7.1rem]">Tax#
</div>
          {/* <div className="md:w-[37rem]">Billing Address</div> */}


        </div>
        {/* <InfiniteScroll
          dataLength={props.allCompleteOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingAllOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"75vh"}
        > */}
        <div class="h-[80vh] overflow-auto">
         
            <>
              {props.modalData.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");

                const diff = Math.abs(
                  dayjs().diff(dayjs(item.lastRequirementOn), "days")
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
                      <div className="flex rounded-xl justify-between  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3 max-xl:p-1 max-sm:h-[9rem] max-sm:flex-col "                                >
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[11rem] max-xl:w-[11rem] max-lg:w-[8rem]   max-sm:w-auto">
                            <div className="flex max-sm:w-auto">
                              <div>
                                <MultiAvatar
                                  primaryTitle={item.name}
                                  imageId={item.imageId}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </div>
                              <div class="w-[0.25rem]"></div>
                              <div class="max-sm:w-auto flex items-center">
                              {item.name}
                              </div>
                            </div>
                          </div>
                          <div className=" flex font-medium  items-center  w-[6.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">

                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-center max-sm:text-sm ">
                              {item.dialCode} {item.phoneNo}
                            </div>

                          </div>

                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col max-sm:w-auto w-[13.2rem] max-xl:w-[6.2rem] max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {/* {item.url} */}
                              {item.dcategoryName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col max-sm:w-auto w-[7rem] max-xl:w-[6rem] max-lg:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.clientName}

                            </div>
                          </div>

                          <div className=" flex font-medium flex-col max-sm:w-auto w-[12rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.payment}

                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex font-medium flex-col max-sm:w-auto  w-[3.5rem] max-xl:w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.countryValue}
                            </div>

                          </div>
                          {/* <div className=" flex font-medium flex-col max-sm:w-auto  w-[17.1rem] max-xl:w-[9rem] max-lg:w-[8.1rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins max-w-[40ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {dataLoc}
                            </div>

                          </div> */}

                         

                        </div>
                    
                      </div>
                    </div>


                  )
              })}
            </>
            
            </div>
        {/* </InfiniteScroll> */}
      </div>
    </>
  );

}

const mapStateToProps = ({ order, auth,dashboard, distributor }) => ({
orgId: auth.userDetails.organizationId,
timeRangeType:dashboard.timeRangeType,
startDate: dashboard.startDate,
endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashProcurePayDrawerCard);
