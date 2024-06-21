import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import AddTaskDocumentDrawerModal from "../Child/AddTaskDocumentDrawerModal"
import styled from "styled-components";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Tooltip, Button,  } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm, } from "../../../Components/UI/Antd";
import StairsIcon from '@mui/icons-material/Stairs';
 import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import {
  // getTaskListRangeByUserId,
  getHighTaskListRange,
  getMediumTaskListRange,
  
  getLowTaskListRange,
  deleteTask,
  handleUpdateDocumentDrawerModal,
  linkTaskStatus,
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
  handleDownloadTaskModal,
  handleTaskNotesDrawerModal,
  handleTaskStepperDrawerModal,
  handleTaskFeedbackDrawerModal,
  handleTaskProjectDrawerModal,
  handleTaskopenModal,
  handleTaskDocumentDrawerModal
} from "../TaskAction";
import UpdateDocumentDrawerModal from "../Child/UpdateDocumentDrawerModal"
import { MultiAvatar, MultiAvatar2, } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddTaskStepperDrawerModal from "./TaskStepper/AddTaskStepperDrawerModal";
const AddTaskProjectDrawerModal = lazy(() => import("../Child/AddTaskProjectDrawerModal"));
const AddTaskNotesDrawerModal = lazy(() => import("./AddTaskNotesDrawerModal"));
const OpenTaskModal = lazy(() => import("./OpenTaskModal"));
const DownloadTaskModal = lazy(() => import("./DownloadTaskModal"));
const UpdateTaskModal = lazy(() => import("./UpdateTaskModal"));
const AddTaskFeedbackDrawerModal = lazy(() => import("./AddTaskFeedbackDrawerModal"));
const ButtonGroup = Button.Group;

const TaskCardList = (props) => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");

  const [currentNameId, setCurrentNameId] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [currentprocessName, setCurrentprocessName] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    
    props.getHighTaskListRange(props.employeeId,"High",page);
    props.getMediumTaskListRange(props.employeeId,"Medium",page);
    props.getLowTaskListRange(props.employeeId,"Low",page);
    // props.getTaskListRangeByUserId(props.employeeId,page);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleLoadMore = () => {
    const callPageMapd = props.highTaskList && props.highTaskList.length &&props.highTaskList[0].pageCount
    setTimeout(() => {
      const {
        getHighTaskListRange,
        userDetails: { employeeId },
      } = props;
      if  (props.highTaskList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getHighTaskListRange(employeeId,"High",page);
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const handleLoadMoreMedium = () => {
    const callPageMapd = props.mediumTaskList && props.mediumTaskList.length &&props.mediumTaskList[0].pageCount
    setTimeout(() => {
      const {
        getMediumTaskListRange,
        userDetails: { employeeId },
      } = props;
      if  (props.mediumTaskList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getMediumTaskListRange(employeeId,"Medium",page);
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  const handleLoadMoreLow = () => {
    const callPageMapd = props.lowTaskList && props.lowTaskList.length &&props.lowTaskList[0].pageCount
    setTimeout(() => {
      const {
        getLowTaskListRange,
        userDetails: { employeeId },
      } = props;
      if  (props.lowTaskList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getLowTaskListRange(employeeId,"Low",page);
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  // const handleLoadMore = () => {
  //     setPage(page + 1);
  //     props.getTaskListRangeByUserId(props.employeeId,page);
  // };
  function handleSetCurrentProcessName(item) {
    setCurrentprocessName(item);
     console.log(item);
   }
  
  function handleSetTaskNameId(item) {
    setCurrentNameId(item);
  }
  
  const {
    mediumTaskList,
    fetchingMediumTaskList,
    fetchingHighTaskList,
    fetchingLowTaskList,
    lowTaskList,
    fetchingTaskListRangeByUserIdError,
    highTaskList,
    deleteTask,
    linkTaskStatus,
    difference,
    approveTaskByTaskId,
    rejectTaskByTaskId,
    handleUpdateTaskModal,
    handleDownloadTaskModal,
    handleTaskProjectDrawerModal,
    updateTaskModal,
    downloadTaskModal,
    addDrawerTaskNotesModal,
    addDrawerTaskFeedbackModal,
    handleTaskNotesDrawerModal,
    handleTaskStepperDrawerModal,
    handleTaskFeedbackDrawerModal,
    setEditTask,
   
    userDetails: { employeeId },
  } = props;

  // if (fetchingHighTaskList) 
  // {
  //  return <BundleLoader/>
  // }

  return (
    <>
    
          <div className=' flex sticky  z-auto'>
          <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[4.54rem] text-white bg-red-600">Urgent </div>
        <div className=" w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]"><FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        /></div>
        <div className=" w-[8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8rem] max-lg:w-[9rem]"><FormattedMessage
                          id="app.name"
                          defaultMessage="name"
                        /></div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.01rem] max-lg:w-[7.01rem] "><FormattedMessage
                          id="app.end"
                          defaultMessage="end"
                        /></div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]"><FormattedMessage
                          id="app.ageing"
                          defaultMessage="Ageing"
                        /></div>
                        <div className="w-[18.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.51rem] max-lg:w-[6.51rem]">Info</div>
        <div className="w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]"><FormattedMessage
                          id="app.assignedto"
                          defaultMessage="assignedto"
                        /></div>
        <div className="w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.5rem] max-lg:w-[13.5rem]"><FormattedMessage
                          id="app.owner"
                          defaultMessage="owner"
                        /></div>
        <div className="w-[6.01rem]"></div>
        <div className="w-[3%]"></div>
        <div className="w-[5%]"></div>
        <div className="w-[3.1rem]"></div>
        <div className="w-12"></div>
        {/* <div className="w-12"></div> */}
      </div>
      <InfiniteScroll
        dataLength={highTaskList.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={fetchingHighTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      {highTaskList.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        // const incompleteDeviationDate = endDate.diff(currentDate, 'days');
        // const completeDeviation = endDate.diff(completionDate, 'days');
        const incompleteDeviationDate = currentDate.diff(endDate, 'days');
        const completeDeviation = completionDate.diff(endDate, 'days');
                    return (
                        <div>
                           <div className="flex rounded-lg  mt-1 bg-white h-9 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow-2xl  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]" ></div>
                    )}
                    <div class=" w-2"></div>
          <div class=" flex w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                            {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs flex items-center text-cardBody font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium justify-center flex-col  w-[5.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm text-cardBody font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                className="cursor-pointer text-[#042E8A]"
                          
               >

                 {`${item.taskName} `} &nbsp;


               </span>
                                    </div>
                                </div>
                               </div>
                               <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className="flex font-medium flex-col w-[5.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex flex-col w-[7.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
                    <div class="">
                      {/* <Tooltip title={`To Start - ${difference}`}>
                      <StatusIcon   type="To Start"
  status={item.taskStatus}
  difference={difference} 
  onClick={() =>
    linkTaskStatus(item.taskId, {
      taskStatus: "To Start",
    })
  }/>
  </Tooltip> */}
                     
                   
                    <ButtonGroup >
         
          <StatusIcon
  type="To Start"
  iconType={<HourglassEmptyIcon />} 
 // iconType="fa-hourglass-start"
  tooltip="To Start"
  status={item.taskStatus}
  difference={difference} 
  onClick={() =>
    linkTaskStatus(item.taskId, {
      taskStatus: "To Start",
    })
  }
/>
        
            <StatusIcon
              type="In Progress"
             iconType={<HourglassTopIcon/>}
              tooltip="In Progress"
              status={item.taskStatus}
              difference={difference}
              onClick={() =>
                linkTaskStatus(item.taskId, {
                  //  ...item,
                   taskStatus: "In Progress",
                })
              }
            />
         
            <StatusIcon
              type="Completed"
            iconType={<HourglassBottomIcon/>}
              tooltip="Completed"
              status={item.taskStatus}
              difference={difference}
              onClick={() =>
                linkTaskStatus(item.taskId, {
                  //  ...item,
                   taskStatus: "Completed",
                })
              }
            />
          
        </ButtonGroup>
        <div></div>
                        </div>
                        {/* <div>
                       
                        {item.complitionStatus === "completed" && (
              <TaskStatusToggle
                completionInd={item.completionInd}
                taskId={item.taskId}
              />
            )}
                    </div> */}
                    </div>
                   
                    <div className="flex font-medium flex-col w-[6.23rem] max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">Deviation</div> */}
                       {/* <div class="text-xs text-cardBody font-poppins"> 
                       {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}
                   </div> */}
                     <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
                   </div>
                   <div className="flex font-medium  justify-between w-[16.6rem] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row  max-sm:w-auto ">
                   {item.customerName ? (
  <>{item.customerName}</>
) : null}
&nbsp;&nbsp;&nbsp;
{item.contact ? (
  <>{item.contact}</>
) : null}        

                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium flex-col w-[6.23rem] max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                  {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">Assigned To</div> */}
                                  <div class="text-xs text-cardBody font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                  <span>
              {item.assignedToName === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedToName === item.submittedBy ? (
                  
                  null
                ) : (
                  <MultiAvatar2
                  primaryTitle={item.assignedToName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                  // className="!bg-[#94b3e4]"
                  // // style={{ backgroundColor: "#94b3e4" }}
                />
                )}
                </>
              )}
            </span>
                                  </div>
                              </div>
                        
                    
                                <div className=" flex font-medium flex-col  w-[5.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    
                                    <div class="text-xs text-cardBody font-poppins ">
                                    <MultiAvatar
                                   
                  primaryTitle={item.ownerName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                               
                               
                                {/* <div className=" flex font-medium flex-col w-32 ">
                                    <div class=" text-sm text-cardBody font-poppins">Team</div>

                                    <div class=" text-sm text-cardBody font-poppins">
                                    <Avatar.Group
  maxCount={2}
  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
>
  {item.owner &&
    item.owner.map((candidate, i) => {
      if (candidate && candidate.fullName) {
        const data1 = candidate.fullName.slice(0, 2);
        console.log("datas", data1);
        return (
          <Tooltip title={candidate.fullName} key={i}>
            <Avatar style={{ backgroundColor: "#94b3e4" }}>
              {data1}
            </Avatar>
          </Tooltip>
        );
      } else {
        return null; 
      }
    })}
</Avatar.Group>
                                    </div>
                                </div> */}
                                {/* <div className="flex font-medium flex-col md:w-32 max-sm:flex-row justify-between w-full ">
                                    <div class="text-sm text-cardBody font-poppins">Start</div>

                                    <div class="text-sm text-cardBody font-poppins">
                                     {`${dayjs(item.startDate).format("YYYY/MM/DD")}`}
                                    </div>
                                </div> */}
                       
<div>
{item.taskStatus==="Completed"&&(
                   <div className="flex font-medium flex-col w-[5.23rem] max-sm:flex-row  max-sm:w-auto justify-center ">
             {item.assignedToName !== item.submittedBy ? 
             <span>
             <Tooltip overlayStyle={{ maxWidth: "400px" }} title={`Review :${item.feedbackReview}`}>
            {item.feedbackRating === 0 ? (<StarBorderIcon
            className=" !text-2xl text-[#eeeedd]"/>)
              : (
                <span>
                  {item.feedbackRating}
                 
                  {<StarBorderIcon
                  className=" !text-2xl text-[#FFD700]"
                    />}
                
                </span>)}
             
                </Tooltip>
                </span>
              
                :null}

     
     </div> 
     )}
     </div>
     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem]  max-sm:flex-row  max-sm:w-auto  justify-center ">
             {item.assignedToName !== item.submittedBy ? 
                         <Tooltip title="Feedback">
                         <FeedbackIcon
                                  onClick={() => {
                                    handleTaskFeedbackDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-icon cursor-pointer"
                                 
                                />
                             </Tooltip>
              
                :null}

     
     </div> 


     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
          <UploadOutlined
              onClick={() => {
                props.handleUpdateDocumentDrawerModal(true);
                handleSetTaskNameId(item);
              }}
          />    
              

     
     </div> 
     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
     <StairsIcon  className="!text-icon cursor-pointer text-[green]"
         onClick={() => {
          handleTaskStepperDrawerModal(true);
          handleSetTaskNameId(item);
        }}
     />
               
 
      
      </div> 
  
                  
                   
                   <div class="flex flex-col w-[8.21rem] max-xl:w-[6.2rem] max-lg:w-[4.6rem] justify-center  max-sm:flex-row max-sm:w-auto">
                    <div class=" w-36">
  {item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
    <>
      <div>
        <Button
        onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
          style={{ backgroundColor: "teal", color: "white" }}
        >
          <FormattedMessage id="app.approve" defaultMessage="Approve" />
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(233, 79, 79)",
            color: "white",
          }}
          onClick={() => rejectTaskByTaskId(item.taskId)}
        >
          <FormattedMessage id="app.reject" defaultMessage="Reject" />
        </Button>
      </div>
    </>
  ) : (
    <>
      {item.approvedInd === "Approved" ? (
        <CheckCircleOutlined
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : item.approvedInd === "Rejected" ? (
        <CloseCircleOutlined
          type="close-circle"
          theme="twoTone"
          twoToneColor="red"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : (
        <></>
      )}
    </>
  )}
  </div>
</div>
</div>
                          
<div class="flex  max-sm:justify-end max-sm:w-wk items-center">    
                    <div class="flex max-sm:flex-row  max-sm:w-auto justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  handleSetTaskNameId(item);
                }}
                className="!text-icon cursor-pointer text-[green]"
              />
           </Tooltip>
  
   
          {/* {props.userId === item.userId && ( */}
                      {/* <DownloadForOfflineIcon
                        // type="edit"
                        className="!text-xl cursor-pointer"
                        onClick={() => {
                          handleSetCurrentProcessName(item)
                          handleDownloadTaskModal(true);
                        }}
                      /> */}
                         <Tooltip title="Document">
                         <DownloadForOfflineIcon
                                  onClick={() => {
                                    props.handleTaskDocumentDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-icon cursor-pointer"
                                 
                                />
                             </Tooltip>
                    {/* )} */}
        
            </div>
                    {/*<div class="flex flex-row w-6 max-sm:flex-row max-sm:w-auto justify-evenly ">*/}
   
   
          <Tooltip title="Edit">
          {props.userId === item.userId && (
                      <BorderColorIcon
                        type="edit"
                        className="!text-icon cursor-pointer"                   
                        onClick={() => {
                          props.setEditTask(item);
                          handleUpdateTaskModal(true);
                        }}
                      />
                    )}
            </Tooltip>
          
            <div>
           
            {item.complitionStatus !== "completed" && (
                          <StyledPopconfirm
                            // title="Do you want to delete?"
                            title={
                              <FormattedMessage
                                id="app.doyouwishtodelete?"
                                defaultMessage="Do you wish to delete?"
                              />
                            }
                            onConfirm={() => deleteTask(item.taskId, employeeId)}
                          >
                                <Tooltip title="Delete">
                            <DeleteOutlined
                              type="delete"
                              className="!text-icon cursor-pointer text-[red]"
                              
                            />
                            </Tooltip>
                          </StyledPopconfirm>
                        )}
      
            </div>

          
                      </div>   
                     </div>

                            </div>
                      //  { </div>}


                    )
                })}
                 </InfiniteScroll>
      </div>
</div>

<div className=' flex sticky  z-auto'>
          <div class="rounded m-1 max-sm:m-1  p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE] ">
          <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[4.54rem] bg-orange-600 text-white">High </div>
        <div className=" w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]"><FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        /></div>
        <div className=" w-[8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8rem] max-lg:w-[9rem]"><FormattedMessage
                          id="app.name"
                          defaultMessage="name"
                        /></div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.01rem] max-lg:w-[7.01rem] "><FormattedMessage
                          id="app.end"
                          defaultMessage="end"
                        /></div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]"><FormattedMessage
                          id="app.ageing"
                          defaultMessage="Ageing"
                        /></div>
                        <div className="w-[18.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.51rem] max-lg:w-[6.51rem]">Info</div>
        <div className="w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]"><FormattedMessage
                          id="app.assignedto"
                          defaultMessage="assignedto"
                        /></div>
        <div className="w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.5rem] max-lg:w-[13.5rem]"><FormattedMessage
                          id="app.owner"
                          defaultMessage="owner"
                        /></div>
        <div className="w-[6.01rem]"></div>
        <div className="w-[3%]"></div>
        <div className="w-[5%]"></div>
        <div className="w-[3.1rem]"></div>
        <div className="w-12"></div>
        {/* <div className="w-12"></div> */}
      </div>
      <InfiniteScroll
        dataLength={mediumTaskList.length}
        next={handleLoadMoreMedium}
      hasMore={hasMore}
        loader={fetchingMediumTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      {mediumTaskList.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        // const incompleteDeviationDate = endDate.diff(currentDate, 'days');
        // const completeDeviation = endDate.diff(completionDate, 'days');
        const incompleteDeviationDate = currentDate.diff(endDate, 'days');
        const completeDeviation = completionDate.diff(endDate, 'days');
                    return (
                        <div>
                           <div className="flex rounded  mt-1 bg-white h-8 items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow-2xl  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]" ></div>
                    )}
                    <div class=" w-2"></div>
          <div class=" flex w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                            {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs flex items-center text-cardBody font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium justify-center flex-col  w-[5.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm text-cardBody font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                className="cursor-pointer text-[#042E8A]"
                          
               >

                 {`${item.taskName} `} &nbsp;


               </span>
                                    </div>
                                </div>
                               </div>
                               <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className="flex font-medium flex-col w-[5.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex flex-col w-[7.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
                    <div class="">
                      {/* <Tooltip title={`To Start - ${difference}`}>
                      <StatusIcon   type="To Start"
  status={item.taskStatus}
  difference={difference} 
  onClick={() =>
    linkTaskStatus(item.taskId, {
      taskStatus: "To Start",
    })
  }/>
  </Tooltip> */}
                     
                   
                    <ButtonGroup >
         
          <StatusIcon
  type="To Start"
  iconType={<HourglassEmptyIcon />} 
 // iconType="fa-hourglass-start"
  tooltip="To Start"
  status={item.taskStatus}
  difference={difference} 
  onClick={() =>
    linkTaskStatus(item.taskId, {
      taskStatus: "To Start",
    })
  }
/>
        
            <StatusIcon
              type="In Progress"
             iconType={<HourglassTopIcon/>}
              tooltip="In Progress"
              status={item.taskStatus}
              difference={difference}
              onClick={() =>
                linkTaskStatus(item.taskId, {
                  //  ...item,
                   taskStatus: "In Progress",
                })
              }
            />
         
            <StatusIcon
              type="Completed"
            iconType={<HourglassBottomIcon/>}
              tooltip="Completed"
              status={item.taskStatus}
              difference={difference}
              onClick={() =>
                linkTaskStatus(item.taskId, {
                  //  ...item,
                   taskStatus: "Completed",
                })
              }
            />
          
        </ButtonGroup>
        <div></div>
                        </div>
                        {/* <div>
                       
                        {item.complitionStatus === "completed" && (
              <TaskStatusToggle
                completionInd={item.completionInd}
                taskId={item.taskId}
              />
            )}
                    </div> */}
                    </div>
                   
                    <div className="flex font-medium flex-col w-[6.23rem] max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">Deviation</div> */}
                       {/* <div class="text-xs text-cardBody font-poppins"> 
                       {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}
                   </div> */}
                     <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
                   </div>
                   <div className="flex font-medium  justify-between w-[16.6rem] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row  max-sm:w-auto ">
                   {item.customerName ? (
  <>{item.customerName}</>
) : null}
&nbsp;&nbsp;&nbsp;
{item.contact ? (
  <>{item.contact}</>
) : null}        

                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium flex-col w-[6.23rem] max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                  {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">Assigned To</div> */}
                                  <div class="text-xs text-cardBody font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                  <span>
              {item.assignedToName === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedToName === item.submittedBy ? (
                  
                  null
                ) : (
                  <MultiAvatar2
                  primaryTitle={item.assignedToName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                  // className="!bg-[#94b3e4]"
                  // // style={{ backgroundColor: "#94b3e4" }}
                />
                )}
                </>
              )}
            </span>
                                  </div>
                              </div>
                        
                    
                                <div className=" flex font-medium flex-col  w-[5.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    
                                    <div class="text-xs text-cardBody font-poppins ">
                                    <MultiAvatar
                                   
                  primaryTitle={item.ownerName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                               
                               
                                {/* <div className=" flex font-medium flex-col w-32 ">
                                    <div class=" text-sm text-cardBody font-poppins">Team</div>

                                    <div class=" text-sm text-cardBody font-poppins">
                                    <Avatar.Group
  maxCount={2}
  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
>
  {item.owner &&
    item.owner.map((candidate, i) => {
      if (candidate && candidate.fullName) {
        const data1 = candidate.fullName.slice(0, 2);
        console.log("datas", data1);
        return (
          <Tooltip title={candidate.fullName} key={i}>
            <Avatar style={{ backgroundColor: "#94b3e4" }}>
              {data1}
            </Avatar>
          </Tooltip>
        );
      } else {
        return null; 
      }
    })}
</Avatar.Group>
                                    </div>
                                </div> */}
                                {/* <div className="flex font-medium flex-col md:w-32 max-sm:flex-row justify-between w-full ">
                                    <div class="text-sm text-cardBody font-poppins">Start</div>

                                    <div class="text-sm text-cardBody font-poppins">
                                     {`${dayjs(item.startDate).format("YYYY/MM/DD")}`}
                                    </div>
                                </div> */}
                       
<div>
{item.taskStatus==="Completed"&&(
                   <div className="flex font-medium flex-col w-[5.23rem] max-sm:flex-row  max-sm:w-auto justify-center ">
             {item.assignedToName !== item.submittedBy ? 
             <span>
             <Tooltip overlayStyle={{ maxWidth: "400px" }} title={`Review :${item.feedbackReview}`}>
            {item.feedbackRating === 0 ? (<StarBorderIcon
            className=" !text-2xl text-[#eeeedd]"/>)
              : (
                <span>
                  {item.feedbackRating}
                 
                  {<StarBorderIcon
                  className=" !text-2xl text-[#FFD700]"
                    />}
                
                </span>)}
             
                </Tooltip>
                </span>
              
                :null}

     
     </div> 
     )}
     </div>
     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem]  max-sm:flex-row  max-sm:w-auto  justify-center ">
             {item.assignedToName !== item.submittedBy ? 
                         <Tooltip title="Feedback">
                         <FeedbackIcon
                                  onClick={() => {
                                    handleTaskFeedbackDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-icon cursor-pointer"
                                 
                                />
                             </Tooltip>
              
                :null}

     
     </div> 


     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
          <UploadOutlined
              onClick={() => {
                props.handleUpdateDocumentDrawerModal(true);
                handleSetTaskNameId(item);
              }}
          />    
              

     
     </div> 
     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
     <StairsIcon  className="!text-icon cursor-pointer text-[green]"
         onClick={() => {
          handleTaskStepperDrawerModal(true);
          handleSetTaskNameId(item);
        }}
     />
               
 
      
      </div> 
  
                  
                   
                   <div class="flex flex-col w-[8.21rem] max-xl:w-[6.2rem] max-lg:w-[4.6rem] justify-center  max-sm:flex-row max-sm:w-auto">
                    <div class=" w-36">
  {item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
    <>
      <div>
        <Button
        onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
          style={{ backgroundColor: "teal", color: "white" }}
        >
          <FormattedMessage id="app.approve" defaultMessage="Approve" />
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(233, 79, 79)",
            color: "white",
          }}
          onClick={() => rejectTaskByTaskId(item.taskId)}
        >
          <FormattedMessage id="app.reject" defaultMessage="Reject" />
        </Button>
      </div>
    </>
  ) : (
    <>
      {item.approvedInd === "Approved" ? (
        <CheckCircleOutlined
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : item.approvedInd === "Rejected" ? (
        <CloseCircleOutlined
          type="close-circle"
          theme="twoTone"
          twoToneColor="red"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : (
        <></>
      )}
    </>
  )}
  </div>
</div>
</div>
                          
<div class="flex  max-sm:justify-end max-sm:w-wk items-center">    
                    <div class="flex   max-sm:flex-row  max-sm:w-auto justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  handleSetTaskNameId(item);
                }}
                className="!text-icon cursor-pointer text-[green]"
              />
           </Tooltip>
  
   
          {/* {props.userId === item.userId && ( */}
                      {/* <DownloadForOfflineIcon
                        // type="edit"
                        className="!text-xl cursor-pointer"
                        onClick={() => {
                          handleSetCurrentProcessName(item)
                          handleDownloadTaskModal(true);
                        }}
                      /> */}
                         <Tooltip title="Document">
                         <DownloadForOfflineIcon
                                  onClick={() => {
                                    props.handleTaskDocumentDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-icon cursor-pointer"
                                 
                                />
                             </Tooltip>
                    {/* )} */}
        
            </div>
                    <div class="flex  max-sm:flex-row max-sm:w-auto justify-evenly ">
   
   
          <Tooltip title="Edit">
          {props.userId === item.userId && (
                      <BorderColorIcon
                        type="edit"
                        className="!text-icon cursor-pointer"                   
                        onClick={() => {
                          props.setEditTask(item);
                          handleUpdateTaskModal(true);
                        }}
                      />
                    )}
            </Tooltip>
          
            <div>
           
            {item.complitionStatus !== "completed" && (
                          <StyledPopconfirm
                            // title="Do you want to delete?"
                            title={
                              <FormattedMessage
                                id="app.doyouwishtodelete?"
                                defaultMessage="Do you wish to delete?"
                              />
                            }
                            onConfirm={() => deleteTask(item.taskId, employeeId)}
                          >
                                <Tooltip title="Delete">
                            <DeleteOutlined
                              type="delete"
                              className="!text-icon cursor-pointer text-[red]"
                              
                            />
                            </Tooltip>
                          </StyledPopconfirm>
                        )}
      
            </div>

          
                      </div>   
                     </div>

                            </div>
                        </div>


                    )
                })}
                 </InfiniteScroll>
      </div>
</div>

<div className=' flex sticky  z-auto'>
          <div class="rounded  m-1 max-sm:m-1  p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE] ">
          <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[4.54rem] bg-teal-600 text-white">Normal </div>
        <div className=" w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]"><FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        /></div>
        <div className=" w-[8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8rem] max-lg:w-[9rem]"><FormattedMessage
                          id="app.name"
                          defaultMessage="name"
                        /></div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.01rem] max-lg:w-[7.01rem] "><FormattedMessage
                          id="app.end"
                          defaultMessage="end"
                        /></div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]"><FormattedMessage
                          id="app.ageing"
                          defaultMessage="Ageing"
                        /></div>
                        <div className="w-[18.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.51rem] max-lg:w-[6.51rem]">Info</div>
        <div className="w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]"><FormattedMessage
                          id="app.assignedto"
                          defaultMessage="assignedto"
                        /></div>
        <div className="w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.5rem] max-lg:w-[13.5rem]"><FormattedMessage
                          id="app.owner"
                          defaultMessage="owner"
                        /></div>
        <div className="w-[6.01rem]"></div>
        <div className="w-[3%]"></div>
        <div className="w-[5%]"></div>
        <div className="w-[3.1rem]"></div>
        <div className="w-12"></div>
        {/* <div className="w-12"></div> */}
      </div>
      <InfiniteScroll
        dataLength={lowTaskList.length}
        next={handleLoadMoreLow}
      hasMore={hasMore}
        loader={fetchingLowTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      {lowTaskList.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        // const incompleteDeviationDate = endDate.diff(currentDate, 'days');
        // const completeDeviation = endDate.diff(completionDate, 'days');
        const incompleteDeviationDate = currentDate.diff(endDate, 'days');
        const completeDeviation = completionDate.diff(endDate, 'days');
                    return (
                        <div>
                           <div className="flex rounded-lg  mt-1 bg-white h-9 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow-2xl  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center  ">
                                <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]" ></div>
                    )}
                    <div class=" w-2"></div>
          <div class=" flex w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                            {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs flex items-center text-cardBody font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium justify-center flex-col  w-[5.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm text-cardBody font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                className="cursor-pointer text-[#042E8A]"
                          
               >

                 {`${item.taskName} `} &nbsp;


               </span>
                                    </div>
                                </div>
                               </div>
                               <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className="flex font-medium flex-col w-[5.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex flex-col w-[7.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
                    <div class="">
                      {/* <Tooltip title={`To Start - ${difference}`}>
                      <StatusIcon   type="To Start"
  status={item.taskStatus}
  difference={difference} 
  onClick={() =>
    linkTaskStatus(item.taskId, {
      taskStatus: "To Start",
    })
  }/>
  </Tooltip> */}
                     
                   
                    <ButtonGroup >
         
          <StatusIcon class=" !text-icon"
  type="To Start"
  iconType={<HourglassEmptyIcon />} 
 // iconType="fa-hourglass-start"
  tooltip="To Start"
  status={item.taskStatus}
  difference={difference} 
  onClick={() =>
    linkTaskStatus(item.taskId, {
      taskStatus: "To Start",
    })
  }
/>
        
            <StatusIcon class=" !text-icon"
              type="In Progress"
             iconType={<HourglassTopIcon/>}
              tooltip="In Progress"
              status={item.taskStatus}
              difference={difference}
              onClick={() =>
                linkTaskStatus(item.taskId, {
                  //  ...item,
                   taskStatus: "In Progress",
                })
              }
            />
         
            <StatusIcon class=" !text-icon"
              type="Completed"
            iconType={<HourglassBottomIcon/>}
              tooltip="Completed"
              status={item.taskStatus}
              difference={difference}
              onClick={() =>
                linkTaskStatus(item.taskId, {
                  //  ...item,
                   taskStatus: "Completed",
                })
              }
            />
          
        </ButtonGroup>
        <div></div>
                        </div>
                        {/* <div>
                       
                        {item.complitionStatus === "completed" && (
              <TaskStatusToggle
                completionInd={item.completionInd}
                taskId={item.taskId}
              />
            )}
                    </div> */}
                    </div>
                   
                    <div className="flex font-medium flex-col w-[6.23rem] max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">Deviation</div> */}
                       {/* <div class="text-xs text-cardBody font-poppins"> 
                       {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}
                   </div> */}
                     <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
                   </div>
                   <div className="flex font-medium  justify-between w-[16.6rem] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row   max-sm:w-auto ">
                   {item.customerName ? (
  <>{item.customerName}</>
) : null}
&nbsp;&nbsp;&nbsp;
{item.contact ? (
  <>{item.contact}</>
) : null}        

                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium flex-col w-[6.23rem] max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                  {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">Assigned To</div> */}
                                  <div class="text-xs text-cardBody font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                  <span>
              {item.assignedToName === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedToName === item.submittedBy ? (
                  
                  null
                ) : (
                  <MultiAvatar2
                  primaryTitle={item.assignedToName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                  // className="!bg-[#94b3e4]"
                  // // style={{ backgroundColor: "#94b3e4" }}
                />
                )}
                </>
              )}
            </span>
                                  </div>
                              </div>
                        
                    
                                <div className=" flex font-medium flex-col  w-[5.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    
                                    <div class="text-xs text-cardBody font-poppins ">
                                    <MultiAvatar
                                   
                  primaryTitle={item.ownerName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                               
                               
                                {/* <div className=" flex font-medium flex-col w-32 ">
                                    <div class=" text-sm text-cardBody font-poppins">Team</div>

                                    <div class=" text-sm text-cardBody font-poppins">
                                    <Avatar.Group
  maxCount={2}
  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
>
  {item.owner &&
    item.owner.map((candidate, i) => {
      if (candidate && candidate.fullName) {
        const data1 = candidate.fullName.slice(0, 2);
        console.log("datas", data1);
        return (
          <Tooltip title={candidate.fullName} key={i}>
            <Avatar style={{ backgroundColor: "#94b3e4" }}>
              {data1}
            </Avatar>
          </Tooltip>
        );
      } else {
        return null; 
      }
    })}
</Avatar.Group>
                                    </div>
                                </div> */}
                                {/* <div className="flex font-medium flex-col md:w-32 max-sm:flex-row justify-between w-full ">
                                    <div class="text-sm text-cardBody font-poppins">Start</div>

                                    <div class="text-sm text-cardBody font-poppins">
                                     {`${dayjs(item.startDate).format("YYYY/MM/DD")}`}
                                    </div>
                                </div> */}
                       
<div>
{item.taskStatus==="Completed"&&(
                   <div className="flex font-medium flex-col w-[5.23rem] max-sm:flex-row  max-sm:w-auto justify-center ">
             {item.assignedToName !== item.submittedBy ? 
             <span>
             <Tooltip overlayStyle={{ maxWidth: "400px" }} title={`Review :${item.feedbackReview}`}>
            {item.feedbackRating === 0 ? (<StarBorderIcon
            className=" !text-2xl text-[#eeeedd]"/>)
              : (
                <span>
                  {item.feedbackRating}
                 
                  {<StarBorderIcon
                  className=" !text-2xl text-[#FFD700]"
                    />}
                
                </span>)}
             
                </Tooltip>
                </span>
              
                :null}

     
     </div> 
     )}
     </div>
     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem]  max-sm:flex-row  max-sm:w-auto  justify-center ">
             {item.assignedToName !== item.submittedBy ? 
                         <Tooltip title="Feedback">
                         <FeedbackIcon
                                  onClick={() => {
                                    handleTaskFeedbackDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-icon cursor-pointer"
                                 
                                />
                             </Tooltip>
              
                :null}

     
     </div> 


     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
          <UploadOutlined
              onClick={() => {
                props.handleUpdateDocumentDrawerModal(true);
                handleSetTaskNameId(item);
              }}
          />    
              

     
     </div> 
     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
     <StairsIcon  className="!text-icon cursor-pointer text-[green]"
         onClick={() => {
          handleTaskStepperDrawerModal(true);
          handleSetTaskNameId(item);
        }}
     />
               
 
      
      </div> 
  
                  
                   
                   <div class="flex flex-col w-[8.21rem] max-xl:w-[6.2rem] max-lg:w-[4.6rem] justify-center  max-sm:flex-row max-sm:w-auto">
                    <div class=" w-36">
  {item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
    <>
      <div>
        <Button
        onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
          style={{ backgroundColor: "teal", color: "white" }}
        >
          <FormattedMessage id="app.approve" defaultMessage="Approve" />
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(233, 79, 79)",
            color: "white",
          }}
          onClick={() => rejectTaskByTaskId(item.taskId)}
        >
          <FormattedMessage id="app.reject" defaultMessage="Reject" />
        </Button>
      </div>
    </>
  ) : (
    <>
      {item.approvedInd === "Approved" ? (
        <CheckCircleOutlined
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : item.approvedInd === "Rejected" ? (
        <CloseCircleOutlined
          type="close-circle"
          theme="twoTone"
          twoToneColor="red"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : (
        <></>
      )}
    </>
  )}
  </div>
</div>
</div>
                          
<div class="flex  max-sm:justify-end max-sm:w-wk items-center">    
                    <div class="flex  max-sm:flex-row  max-sm:w-auto justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  handleSetTaskNameId(item);
                }}
                className="!text-icon cursor-pointer text-[green]"
              />
           </Tooltip>
  
   
          {/* {props.userId === item.userId && ( */}
                      {/* <DownloadForOfflineIcon
                        // type="edit"
                        className="!text-xl cursor-pointer"
                        onClick={() => {
                          handleSetCurrentProcessName(item)
                          handleDownloadTaskModal(true);
                        }}
                      /> */}
                         <Tooltip title="Document">
                         <DownloadForOfflineIcon
                                  onClick={() => {
                                    props.handleTaskDocumentDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-icon cursor-pointer"
                                 
                                />
                             </Tooltip>
                    {/* )} */}
        
            </div>
                    <div class="flex max-sm:flex-row max-sm:w-auto justify-evenly ">
   
   
          <Tooltip title="Edit">
          {props.userId === item.userId && (
                      <BorderColorIcon
                        type="edit"
                        className="!text-icon cursor-pointer"                   
                        onClick={() => {
                          props.setEditTask(item);
                          handleUpdateTaskModal(true);
                        }}
                      />
                    )}
            </Tooltip>
          
            <div>
           
            {item.complitionStatus !== "completed" && (
                          <StyledPopconfirm
                            // title="Do you want to delete?"
                            title={
                              <FormattedMessage
                                id="app.doyouwishtodelete?"
                                defaultMessage="Do you wish to delete?"
                              />
                            }
                            onConfirm={() => deleteTask(item.taskId, employeeId)}
                          >
                                <Tooltip title="Delete">
                            <DeleteOutlined
                              type="delete"
                              className="!text-icon cursor-pointer text-[red]"
                              
                            />
                            </Tooltip>
                          </StyledPopconfirm>
                        )}
      
            </div>

          
                      </div>   
                     </div>

                            </div>
                        </div>


                    )
                })}
                 </InfiniteScroll>
      </div>
</div>
<UpdateTaskModal
          updateTaskModal={updateTaskModal}
          handleUpdateTaskModal={handleUpdateTaskModal}
        />
        <DownloadTaskModal
          item={currentprocessName}
          downloadTaskModal={downloadTaskModal}
          handleDownloadTaskModal={handleDownloadTaskModal}
        />
        
        <OpenTaskModal
          addTaskDetailModal={props.addTaskDetailModal}
          handleTaskopenModal={props.handleTaskopenModal}
          item={currentprocessName}
        />

        <AddTaskProjectDrawerModal
          handleTaskProjectDrawerModal={props.handleTaskProjectDrawerModal}
          addDrawerTaskProjectModal={props.addDrawerTaskProjectModal}
          data={data}
        />
<AddTaskNotesDrawerModal
handleSetTaskNameId={handleSetTaskNameId}
  handleTaskNotesDrawerModal={props.handleTaskNotesDrawerModal}
  addDrawerTaskNotesModal={props.addDrawerTaskNotesModal}
  currentNameId={currentNameId}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/>
<AddTaskStepperDrawerModal
handleSetTaskNameId={handleSetTaskNameId}
handleTaskStepperDrawerModal={handleTaskStepperDrawerModal}
addDrawerTaskStepperModal={props.addDrawerTaskStepperModal}
  currentNameId={currentNameId}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/>

<AddTaskFeedbackDrawerModal
handleSetTaskNameId={handleSetTaskNameId}
handleTaskFeedbackDrawerModal={props.handleTaskFeedbackDrawerModal}
addDrawerTaskFeedbackModal={props.addDrawerTaskFeedbackModal}
  currentNameId={currentNameId}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/>
<AddTaskDocumentDrawerModal
 currentNameId={currentNameId}
handleTaskDocumentDrawerModal={props.handleTaskDocumentDrawerModal}
addDocumentTaskDrawerModal={props.addDocumentTaskDrawerModal}
/>

<UpdateDocumentDrawerModal
 currentNameId={currentNameId}
 handleUpdateDocumentDrawerModal={props.handleUpdateDocumentDrawerModal}
 addUpdatedocumentTaskModal={props.addUpdatedocumentTaskModal}
/>


      {/* AddTaskProjectDrawerModal and AddTaskNotesDrawerModal components go here */}
    </>
  );
};
  const mapStateToProps = ({ auth, task, opportunity }) => ({
    userDetails: auth.userDetails,
    highTaskList:task.highTaskList,
    fetchingHighTaskList:task.fetchingHighTaskList,
    mediumTaskList:task.mediumTaskList,
    fetchingMediumTaskList:task.fetchingMediumTaskList,
    lowTaskList:task.lowTaskList,
    fetchingLowTaskList:task.fetchingLowTaskList,
    addTaskDetailModal:task.addTaskDetailModal,
    addDrawerTaskNotesModal: task.addDrawerTaskNotesModal,
    addDrawerTaskFeedbackModal:task.addDrawerTaskFeedbackModal,
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    addDrawerTaskProjectModal: task.addDrawerTaskProjectModal,
    updateTaskModal: task.updateTaskModal,
    downloadTaskModal:task.downloadTaskModal,
    addUpdatedocumentTaskModal:task.addUpdatedocumentTaskModal,
    addDocumentTaskDrawerModal:task.addDocumentTaskDrawerModal,
    noOfPages: task.taskListRangeByUserId.length && task.taskListRangeByUserId[0].noOfPages || "",
      fetchingTaskListRangeByUserId: task.fetchingTaskListRangeByUserId,
  fetchingTaskListRangeByUserIdError:task.fetchingTaskListRangeByUserIdError,
  taskListRangeByUserId: task.taskListRangeByUserId,
  addDocumentTaskDrawerModal:task.addDocumentTaskDrawerModal,
  addDrawerTaskStepperModal:task.addDrawerTaskStepperModal,

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getHighTaskListRange,
        getMediumTaskListRange,
        getLowTaskListRange,
        // getTaskListRangeByUserId,
        handleTaskProjectDrawerModal,
        deleteTask,
        linkTaskStatus,
        handleUpdateDocumentDrawerModal,
        handleTaskFeedbackDrawerModal,
        handleTaskNotesDrawerModal,
        handleTaskStepperDrawerModal,
        handleTaskDocumentDrawerModal,
        approveTaskByTaskId,
        rejectTaskByTaskId,
        setEditTask,
        handleUpdateTaskModal,
        handleDownloadTaskModal,
        handleTaskopenModal
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(TaskCardList);
   
    // function StatusIcon(props) {
    //   const { type, iconType, tooltip, status, onClick, difference } = props; // Receive the difference prop
    //   const start = type;
    //   let size;
    
    //   if (status === type) {
    //     size = "1.875em";
    //   } else {
    //     size = "1em";
    //   }
    
    //   return (
    //     <Tooltip title={`${tooltip} (${difference} days)`}> {/* Use difference prop in the tooltip */}
    //       <Button
    //         ghost={status !== type}
    //         style={{
    //           padding: "0.375em",
    //           borderColor: "transparent",
    //           color: status === type ? "rgb(251, 133, 0)" : "grey",
    //         }}
    //         onClick={onClick}
    //       >
    //         <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
    //       </Button>
    //     </Tooltip>
    //   );
    // }
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
            {/* <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }} /> */}
            {iconType}
            {/* <HourglassEmptyIcon/> */}
{/* 
            {status === type && <span style={{ fontSize: "0.82rem",display:"flex" }}>{daysLabel}</span>} */}
         
          </Button>
        </Tooltip>
      );
    }
    
    
      function overdue(pendingDays) {
        //debugger;
        if (pendingDays === -1) {
          //debugger;
          return <span style={{ color: "red", fontStyle: "italic" }}>1 Day</span>;
        }
        if (pendingDays < 0) {
          //debugger;
          return (
            <span style={{ color: "red", fontStyle: "italic" }}>{`${Math.abs(
              pendingDays
            )} Days`}</span>
          );
        }
        if (pendingDays === 1) {
          //debugger;
          return (
            <span
              style={{ color: "#21ce21", fontStyle: "italic" }}
            >{`${pendingDays} Day`}</span>
          );
        }
        if (pendingDays > 0) {
          //debugger;
          return (
            <span
              style={{ color: "#21ce21", fontStyle: "italic" }}
            >{`${pendingDays} Days`}</span>
          );
        }
      }
      
      const AppIcon = (props) => (
        <i
          className={`fas fa-heartbeat ${props.className}`}
          style={{ fontSize: "123%" }}
        ></i>
      );
      const PulseIcon = styled(AppIcon)`
        color: #df9697;
        &:hover {
          // background: yellow;
          color: blue;
        }
      `;