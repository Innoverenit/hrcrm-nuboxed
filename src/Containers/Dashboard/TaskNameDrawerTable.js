import React, { useState,useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tooltip,Button} from "antd";
import {getTaskNameDetails} from "./DashboardAction";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { OnlyWrapCard } from '../../Components/UI/Layout';
import {
  MultiAvatar,
} from "../../Components/UI/Elements";

const ButtonGroup = Button.Group;

function TaskNameDrawerTable (props) {
   
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(()=>{
        props.getTaskNameDetails(props.userId,props.particularTaskName.name,);
    }, [props.userId,props.particularTaskName.name]);

    const handleLoadMore = () => {
      setPage(page + 1);
      props.getTaskNameDetails(props.userId,props.particularTaskName.name)
  };
    return (
      <>
        
        <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
        <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[5.1rem]">Priority</div>
        <div className=" md:w-[6rem]">Task Name</div>
        <div className="md:w-24">Assigned To</div>
        <div className=" md:w-[6.8rem] ">Status</div>
        <div className="md:w-[5.9rem]">End Date</div>
        <div className="md:w-36">Deviation</div>
      </div>
        <InfiniteScroll
        dataLength={props.taskInameDrwr.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingTaskNamedrwr?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
      {props.taskInameDrwr.map((item) => { 
        const currentDate = moment();
        const completionDate = moment(item.completionDate);
        const endDate = moment(item.endDate);
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
                  <div class="rounded-full h-11 w-11 bg-red-500">
                      </div>
                    )}
                    {item.priority === "Medium" && (
                                    <div class="rounded-full h-11 w-11 bg-orange-500">
                    </div>
                    )}
                    {item.priority === "Low" && (
                                         <div class="rounded-full h-11 w-11 bg-teal-500">
                                         </div>
                
                    )}
                    <div class=" w-1"></div>
          <div class=" w-[10rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs text-cardBody font-poppins cursor-pointer">                                       
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
                                            {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </h4> */}
                                            <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
        {item.taskName}
       
                                            </h4>
                                            </div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row justify-between w-full ">
                                  <div class="text-xs text-cardBody font-poppins mb-2">
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
                                 

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {`${moment(item.endDate).format("ll")}`}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-0 max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}

                                    </div>
                                </div>
                            </div>
                        </div>


                    )
                })}
                </InfiniteScroll>
      </OnlyWrapCard>
      </div>
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        taskInameDrwr:dashboard.taskInameDrwr,
        userId: auth.userDetails.userId,
        fetchingTaskNamedrwr:dashboard.fetchingTaskNamedrwr,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getTaskNameDetails,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(TaskNameDrawerTable);
    function StatusIcon(props) {
      const { type, iconType, tooltip, status, onClick, difference } = props;
    
      let iconColor = status === type ? "rgb(251, 133, 0)" : "grey";
      let size = status === type ? "1.875em" : "1em";
    
      // Display the difference as a label next to the icon
      const daysLabel = difference > 0 ? `+${difference} days` : `${difference} days`;
    
      return (
        <Tooltip title={`${tooltip} (${daysLabel})`}>
          <Button
            ghost={status !== type}
            style={{
              padding: "0.375em",
              borderColor: "transparent",
              color: iconColor,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={onClick}
          >
            <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }} />

            {status === type && <span style={{ fontSize: "0.82rem",display:"flex" }}>{daysLabel}</span>}
         
          </Button>
        </Tooltip>
      );
    }
    