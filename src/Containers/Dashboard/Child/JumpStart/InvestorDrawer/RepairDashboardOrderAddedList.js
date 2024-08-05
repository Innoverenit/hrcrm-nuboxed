import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getRepairDashboardOrderAdded} from "../../../../Dashboard/DashboardAction"
import { bindActionCreators } from "redux";
import Dashboard from "../../../Dashboard";
import { Tooltip, Button, Badge,Select } from "antd";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2 } from "../../../../../Components/UI/Elements";

function RepairDashboardOrderAddedList(props) {
    
      useEffect(()=>{
        if (props.timeRangeType === "today"){
          props.getRepairDashboardOrderAdded(props.userId,props.startDate,props.endDate,0);
        }
        else {
          props.getRepairDashboardOrderAdded(props.userId,props.startDate,props.endDate,0); 
        }
      }, [props.userId,props.startDate,props.endDate]);
  return (
   <>
     <div className=' flex justify-end sticky  z-auto'>
       <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
      <div className=" md:w-[3.25rem] text-[white] flex justify-center bg-[red]">Urgent </div>
          <div className=" md:w-[10.31rem] ml-2">Order ID</div>
          <div className=" md:w-[8.6rem]">Customer</div>
          <div className=" md:w-[4.051rem] ">Contact</div>
          <div className="md:w-[5.01rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="md:w-24"></div>
        </div>
       
        
            <>
              {props.repairDashboardOrderAdded.map((item) => {
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
              <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                  <div class="flex">
                  <div className=" flex items-center md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full ">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                    <div className=" flex  w-wk     max-sm:w-full">
                      <div className="flex max-sm:w-full">
                        <div class="w-[9.43rem]">
                        <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-xs"
                              // onClick={() => {
                              //   handleSetParticularOrderData(item);
                              //   props.handleOrderDetailsModal(true);
                              // }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                          &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                  New
                                </span>
                              ) : null}
                        </div>
                      

                        <div class="max-sm:w-full md:w-[9.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[3.21rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex  md:w-[3.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>


                  </div>
                  <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />

                    </div>



                  </div>
                  <div class=" flex">
                    <div class="flex flex-row items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                    <div class="flex flex-row items-center md:w-[6.023rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                      
                          <MultiAvatar2
                            primaryTitle={item.lead}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />


                        
                      </div>
                    </div>
                     </div>
                  <div className=" flex text-xs md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex">
                    <div className=" flex  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-xs bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                  

                 
                  
                 

                   


                  </div>

                </div>
              </div>
                );
              })}
            </> 
        
           
   
      </div>
      </div>
   </>
  )
}


const mapStateToProps = ({ auth, account, opportunity,dashboard }) => ({
    userId: auth.userDetails.userId,
    user: auth.userDetails,
    startDate: dashboard.startDate,
    endDate:dashboard.endDate,
    timeRangeType:dashboard.timeRangeType,
    repairDashboardOrderAdded:dashboard.repairDashboardOrderAdded
    
  
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getRepairDashboardOrderAdded
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(RepairDashboardOrderAddedList);

