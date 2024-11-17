import React, { useState,useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getCompletedTaskTypeDetails} from "./DashboardAction";
import { OnlyWrapCard } from '../../Components/UI/Layout';
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "antd";


const ButtonGroup = Button.Group;

function CompletedTaskTypeDrawerTable (props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
    useEffect(()=>{
        props.getCompletedTaskTypeDetails(props.particularTaskName.name,props.userId);
    }, [props.particularTaskName.name,props.userId]);
    
    const handleLoadMore = () => {
      setPage(page + 1);
      props.getCompletedTaskTypeDetails(props.particularTaskName.name,props.userId)
  };
  
    return (
      <>
         <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{backgroundColor:"#eaedf1"}}>
        <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[5.1rem]">    <FormattedMessage
                id="app.priority"
                defaultMessage="Priority"
              /></div>
        <div className=" md:w-[6rem]">     <FormattedMessage
                id="app.taskName"
                defaultMessage="Task Name"
              /></div>
        <div className="md:w-24"> <FormattedMessage
                id="app.assignedTo"
                defaultMessage="Assigned"
              /></div>
        <div className=" md:w-[6.8rem] ">       <FormattedMessage
                id="app.status"
                defaultMessage="Status"
              /></div>
        <div className="md:w-[5.9rem]"> <FormattedMessage
                id="app.endDate"
                defaultMessage="End Date"
              /></div>
        <div className="md:w-36">   <FormattedMessage
                id="app.deviation"
                defaultMessage="Deviation"
              /></div>
      </div>
        <InfiniteScroll
        dataLength={props.completedtypeTasks.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingCompletedTaskTypes?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
      {/* {props.completedtypeTasks.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        const incompleteDeviationDate = endDate.diff(currentDate, 'days');
        const completeDeviation = endDate.diff(completionDate, 'days');
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                   <div class="flex">
                                   <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row justify-between w-full ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "red",
                        }}
                      ></div>
                    )}
                    {item.priority === "Medium" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "orange",
                        }}
                      ></div>
                    )}
                    {item.priority === "Low" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "teal",
                        }}
                      ></div>
                    )}
                    <div class=" w-1"></div>
          <div class=" w-[10rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            
                                            <div class="text-xs  font-poppins cursor-pointer">                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-40 max-sm:w-full  ">

                                   
                                        <Tooltip>
                                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                           
                                            <h4 class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
        {item.taskName}
       
                                            </h4>
                                            </div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row justify-between w-full ">
                                  <div class="text-xs  font-poppins mb-2">
                                  {item.assignedToName === null ? (
              ""
            ) : (
              <MultiAvatar
                primaryTitle={item.assignedToName}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            )}
                                  </div>
                              </div>
                              <div class="flex flex-col w-20">
                    <div class="">
                   
                    <ButtonGroup >

          <StatusIcon
  type="To Start"
  iconType="fa-hourglass-start"
  tooltip="To Start"
  status={item.taskStatus}
  difference={difference} 
/>
     

            <StatusIcon
              type="In Progress"
              iconType="fa-hourglass-half"
              tooltip="In Progress"
              status={item.taskStatus}
              difference={difference} 
            />

            <StatusIcon
              type="Completed"
              iconType="fa-hourglass"
              tooltip="Completed"
              status={item.taskStatus}
              difference={difference}
            />

        </ButtonGroup>
        <div></div>
                        </div>
                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-full max-sm:flex-row w-full max-sm:justify-between ">
                                 

                                    <div class=" text-xs  font-poppins text-center">
                                    {`${dayjs(item.endDate).format("ll")}`}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-0 max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    <div class=" text-xs  font-poppins text-center">
                                    {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}

                                    </div>
                                </div>
                            </div>
                        </div>


                    )
                })} */}
                </InfiniteScroll>
      </OnlyWrapCard>
      </div>
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        completedtypeTasks:dashboard.completedtypeTasks,
        userId: auth.userDetails.userId,
        fetchingCompletedTaskTypes:dashboard.fetchingCompletedTaskTypes,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getCompletedTaskTypeDetails,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(CompletedTaskTypeDrawerTable);