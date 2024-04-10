import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import AddTaskDocumentDrawerModal from "../Child/AddTaskDocumentDrawerModal"
import styled from "styled-components";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
WeiboSquareOutlined,
} from "@ant-design/icons";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Tooltip, Button,  } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledPopconfirm, } from "../../../Components/UI/Antd";
import StairsIcon from '@mui/icons-material/Stairs';
import {
  getTaskListRangeByUserId,
  deleteTask,
  handleUpdateDocumentDrawerModal,
  linkTaskStatus,
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
  handleDownloadTaskModal,
  handleTaskNotesDrawerModal,
  handleTaskFeedbackDrawerModal,
  handleTaskProjectDrawerModal,
  handleTaskopenModal,
  handleTaskDocumentDrawerModal
} from "../TaskAction";
import UpdateDocumentDrawerModal from "../Child/UpdateDocumentDrawerModal"
import { MultiAvatar, } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
    props.getTaskListRangeByUserId(props.employeeId,page);
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
    const callPageMapd = props.taskListRangeByUserId && props.taskListRangeByUserId.length &&props.taskListRangeByUserId[0].pageCount
    setTimeout(() => {
      const {
        getTaskListRangeByUserId,
        userDetails: { employeeId },
      } = props;
      if  (props.taskListRangeByUserId)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getTaskListRangeByUserId(employeeId, page);
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
    fetchingTaskListRangeByUserId,
    fetchingTaskListRangeByUserIdError,
    taskListRangeByUserId,
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
    handleTaskFeedbackDrawerModal,
    setEditTask,
   
    userDetails: { employeeId },
  } = props;

  // if (fetchingTaskListRangeByUserId) 
  // {
  //  return <BundleLoader/>
  // }

  if (isMobile){
    return (
      <>
      
            <div className=' flex justify-end sticky top-28 z-auto'>
            <div class="rounded-lg  p-2 w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            
        <InfiniteScroll
          dataLength={taskListRangeByUserId.length}
          next={handleLoadMore}
        hasMore={hasMore}
          loader={fetchingTaskListRangeByUserId?<div class="flex items-center" >Loading...</div>:null}
          height={"75vh"}
          endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
        {taskListRangeByUserId.map((item) => { 
          const currentDate = dayjs();
          const completionDate = dayjs(item.completionDate);
          const endDate = dayjs(item.endDate);
          const difference = currentDate.diff(endDate, 'days');
          const incompleteDeviationDate = endDate.diff(currentDate, 'days');
          const completeDeviation = endDate.diff(completionDate, 'days');
  
                      return (
                          <div>
                             <div
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem]  p-3"
                >
                                       <div class="flex items-center justify-between">
                                 
  <div className="flex items-center "> 
  {item.priority === "High" && (
    
                        <div class="rounded-[50%] h-[2.1875em] w-[3.1875em] bg-[red]"></div>
                      )}
                      {item.priority === "Medium" && (
                        <div class="rounded-[50%] h-[2rem] w-[3rem] bg-[orange]" ></div>
                      )}
                      {item.priority === "Low" && (
                        <div class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[teal]" ></div>
                      )}
                      <div class=" w-2"></div>
            <div class=" flex w-[10rem] max-sm:w-full">
                                          <Tooltip>
                                          <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                              
                                              <div class="text-xs text-cardBody font-poppins cursor-pointer">                                       
                                              {item.taskType}
         
                                              </div>
                                           </div>
                                          </Tooltip>
                                          </div>
                                          </div>
                                  
  
                                 
                                     
                                      <div class=" text-xs text-cardBody font-semibold  font-poppins">   
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
                                      <div class="text-xs text-cardBody font-poppins"> 
                          {`${moment.utc(item.endDate).format("YYYY/MM/DD")}`}</div>
                                  </div>

                                  <div class="flex items-center justify-between">
                                    
                      <div class="">
                     
                      <ButtonGroup >
           
            <StatusIcon
    type="To Start"
    iconType="fa-hourglass-start"
    tooltip="To Start"
    status={item.taskStatus}
    difference={difference} 
    onClick={() =>
      linkTaskStatus(item.taskId, {
        taskStatus: "To Start",
      })
    }
  />
            {/* )} */}
  
  
            {/* {item.complitionStatus === "In Progress" && ( */}
              <StatusIcon
                type="In Progress"
                iconType="fa-hourglass-half"
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
            {/* )} */}
            {/* {item.complitionStatus === "completed" && ( */}
              <StatusIcon
                type="Completed"
                iconType="fa-hourglass"
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
            {/* )} */}
          </ButtonGroup>
          <div></div>
                          </div>
                          <div class="text-xs text-cardBody font-poppins"> 
                         {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}
                     </div>
              
   
                     <div class="text-xs text-cardBody font-poppins ">
                                    <span>
                {item.assignedToName === null ? (
                  "Not available"
                ) : (
                  <>
                  {item.assignedToName === item.submittedBy ? (
                    
                    null
                  ) : (
                  <MultiAvatar
                    primaryTitle={item.assignedToName}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  />
                  )}
                  </>
                )}
              </span>
                                    </div>
                                    
                                      
                                      <div class="text-xs text-cardBody font-poppins mb-2">
                                      <MultiAvatar
                                     
                    primaryTitle={item.submittedBy}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  />
                                      </div>
                                 
                      </div>

                      <div class="flex items-center justify-between">
                     
               {item.assignedToName !== item.submittedBy ? 
               <span>
               <Tooltip overlayStyle={{ maxWidth: "400px" }} title={`Review :${item.feedbackReview}`}>
              {item.feedbackRating === 0 ? (<StarBorderIcon
              className=" !text-2xl text-[#eeeedd]"/>)
                : (
                  <span>
                    {item.feedbackRating}{<StarBorderIcon
                    className=" !text-2xl text-[#FFD700]"
                      />}
                  </span>)}
               
                  </Tooltip>
                  </span>
                
                  :null}
  
       
      
       
               {item.assignedToName !== item.submittedBy ? 
                           <Tooltip title="Feedback">
                           <FeedbackIcon
                                    onClick={() => {
                                      handleTaskFeedbackDrawerModal(true);
                                      handleSetTaskNameId(item);
                                    }}
                                    className="!text-base cursor-pointer"
                                   
                                  />
                               </Tooltip>
                
                  :null}
  
       
      
                    
                      <div class=" ">
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
 
  
                            
                      
                     
                      <Tooltip title="Notes">
         <NoteAltIcon
                  onClick={() => {
                    handleTaskNotesDrawerModal(true);
                    handleSetTaskNameId(item);
                  }}
                  className="!text-base cursor-pointer text-[green]"
                />
             </Tooltip>
    
     <Tooltip title="Document">
            {/* {props.userId === item.userId && ( */}
                        <DownloadForOfflineIcon
                          // type="edit"
                          className="!text-base cursor-pointer"
                          onClick={() => {
                            handleSetCurrentProcessName(item)
                            handleDownloadTaskModal(true);
                          }}
                        />
                      {/* )} */}
              </Tooltip>
             
                     
     
     
            <Tooltip title="Edit">
            {props.userId === item.userId && (
                        <BorderColorIcon
                          type="edit"
                          className="!text-base cursor-pointer"                   
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
                                className="!text-base cursor-pointer text-[red]"
                                
                              />
                              </Tooltip>
                            </StyledPopconfirm>
                          )}
        
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
  
  <AddTaskFeedbackDrawerModal
  handleSetTaskNameId={handleSetTaskNameId}
  handleTaskFeedbackDrawerModal={props.handleTaskFeedbackDrawerModal}
  addDrawerTaskFeedbackModal={props.addDrawerTaskFeedbackModal}
    currentNameId={currentNameId}
    // taskName={currentprocessName.taskName} // Pass taskName as a prop
  
  />
  
  
      </>
    ); 
  }
  return (
    <>
    
          <div className=' flex justify-end sticky top-28 z-auto'>
          <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[8.5rem]"><FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        /></div>
        <div className=" md:w-[12rem]"><FormattedMessage
                          id="app.name"
                          defaultMessage="name"
                        /></div>
             <div className=" md:w-28 "><FormattedMessage
                          id="app.end"
                          defaultMessage="end"
                        /></div>
             <div className=" md:w-28 "></div>
        <div className="md:w-36"><FormattedMessage
                          id="app.ageing"
                          defaultMessage="Ageing"
                        /></div>
        <div className="md:w-[6.2rem]"><FormattedMessage
                          id="app.assignedto"
                          defaultMessage="assignedto"
                        /></div>
        <div className="md:w-[6.5rem]"><FormattedMessage
                          id="app.owner"
                          defaultMessage="owner"
                        /></div>
        <div className="md:w-24"></div>
        <div className="md:w-[3%]"></div>
        <div className="md:w-[5%]"></div>
        <div className="w-12"></div>
        <div className="w-12"></div>
        {/* <div className="w-12"></div> */}
      </div>
      <InfiniteScroll
        dataLength={taskListRangeByUserId.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={fetchingTaskListRangeByUserId?<div class="flex justify-center" >Loading...</div>:null}
        height={"75vh"}
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      {taskListRangeByUserId.map((item) => { 
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
                            <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3">
                                     <div class="flex">
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row justify-between w-full ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="rounded-[50%] h-[2.1875em] w-[3.1875em] bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="rounded-[50%] h-[2rem] w-[3rem] bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[teal]" ></div>
                    )}
                    <div class=" w-2"></div>
          <div class=" flex w-[10rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
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

                                <div className=" flex font-medium justify-center flex-col  md:w-32 max-sm:flex-row w-full ">
                                    {/* <div class=" text-sm text-cardBody font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">   
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
                                <div className="flex font-medium flex-col md:w-24 max-sm:flex-row  w-full ">
                       
                      
                       <div class="text-xs text-cardBody font-poppins"> 
                        {`${moment.utc(item.endDate).format("YYYY/MM/DD")}`}</div>
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
  onClick={() =>
    linkTaskStatus(item.taskId, {
      taskStatus: "To Start",
    })
  }
/>
          {/* )} */}


          {/* {item.complitionStatus === "In Progress" && ( */}
            <StatusIcon
              type="In Progress"
              iconType="fa-hourglass-half"
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
          {/* )} */}
          {/* {item.complitionStatus === "completed" && ( */}
            <StatusIcon
              type="Completed"
              iconType="fa-hourglass"
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
          {/* )} */}
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
                   
                    <div className="flex font-medium flex-col md:w-24 max-sm:flex-row  w-full ">
                       
                       {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">Deviation</div> */}
                       <div class="text-xs text-cardBody font-poppins"> 
                       {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}
                   </div>
                     
                   </div>
                    <div className=" flex font-medium flex-col md:w-[4.2rem] max-sm:flex-row justify-between w-full ">
                                  {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">Assigned To</div> */}
                                  <div class="text-xs text-cardBody font-poppins mb-2">
                                  <span>
              {item.assignedToName === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedToName === item.submittedBy ? (
                  
                  null
                ) : (
                <MultiAvatar
                  primaryTitle={item.assignedToName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                )}
                </>
              )}
            </span>
                                  </div>
                              </div>
                        
                    <div class="flex max-sm:mt-4 w-[10rem]">
                                <div className=" flex font-medium flex-col  md:w-24 max-sm:flex-row justify-between w-full ">
                                    
                                    <div class="text-xs text-cardBody font-poppins mb-2">
                                    <MultiAvatar
                                   
                  primaryTitle={item.submittedBy}
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
                   <div className="flex font-medium flex-col md:w-20 max-sm:flex-row  w-full justify-center ">
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
     <div className="flex font-medium flex-col md:w-20 max-sm:flex-row  w-full  justify-center ">
             {item.assignedToName !== item.submittedBy ? 
                         <Tooltip title="Feedback">
                         <FeedbackIcon
                                  onClick={() => {
                                    handleTaskFeedbackDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-base cursor-pointer"
                                 
                                />
                             </Tooltip>
              
                :null}

     
     </div> 


     <div className="flex font-medium flex-col md:w-20 max-sm:flex-row  w-full  justify-center ">
           
                      
          <UploadOutlined
              onClick={() => {
                props.handleUpdateDocumentDrawerModal(true);
                handleSetTaskNameId(item);
              }}
          />    
              

     
     </div> 
     <div className="flex font-medium flex-col md:w-20 max-sm:flex-row  w-full  justify-center ">
           
                      
     <StairsIcon  className="!text-xl cursor-pointer text-[green]"/>
               
 
      
      </div> 
  
                   </div>
                   <div class="flex w-44 ">
                   <div class="flex flex-col md:w-[7.2rem] justify-center  max-sm:flex-row w-full">
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

                          
                    <div class=" ml-2"></div>
                    <div class="flex flex-col w-6 justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  handleSetTaskNameId(item);
                }}
                className="!text-xl cursor-pointer text-[green]"
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
                                  className="!text-base cursor-pointer"
                                 
                                />
                             </Tooltip>
                    {/* )} */}
        
            </div>
                    <div class="flex flex-col w-6 justify-evenly ">
   
   
          <Tooltip title="Edit">
          {props.userId === item.userId && (
                      <BorderColorIcon
                        type="edit"
                        className="!text-xl cursor-pointer"                   
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
                              className="!text-xl cursor-pointer text-[red]"
                              
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
  addDocumentTaskDrawerModal:task.addDocumentTaskDrawerModal

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getTaskListRangeByUserId,
        handleTaskProjectDrawerModal,
        deleteTask,
        linkTaskStatus,
        handleUpdateDocumentDrawerModal,
        handleTaskFeedbackDrawerModal,
        handleTaskNotesDrawerModal,
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
            <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }} />
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