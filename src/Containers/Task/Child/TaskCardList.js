import React, { useState,lazy,Suspense,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MergeTypeIcon from '@mui/icons-material/MergeType';
import relativeTime from 'dayjs/plugin/relativeTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EscalatorIcon from '@mui/icons-material/Escalator';
import UploadIcon from '@mui/icons-material/Upload';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Tooltip, Button,  } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { StyledPopconfirm, } from "../../../Components/UI/Antd";
 import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
 import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import { MultiAvatar, MultiAvatar2, } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../Components/Placeholder";
import CategoryIcon from '@mui/icons-material/Category'
import DateRangeIcon from '@mui/icons-material/DateRange';

const AddTaskDocumentDrawerModal = lazy(() => import("../Child/AddTaskDocumentDrawerModal"));
const AddTaskStepperDrawerModal = lazy(() => import("./TaskStepper/AddTaskStepperDrawerModal"));
const AddTaskProjectDrawerModal = lazy(() => import("../Child/AddTaskProjectDrawerModal"));
const AddTaskNotesDrawerModal = lazy(() => import("./AddTaskNotesDrawerModal"));
const OpenTaskModal = lazy(() => import("./OpenTaskModal"));
const DownloadTaskModal = lazy(() => import("./DownloadTaskModal"));
const AddTaskFeedbackDrawerModal = lazy(() => import("./AddTaskFeedbackDrawerModal"));
const UpdateDocumentDrawerModal = lazy(() => import("../Child/UpdateDocumentDrawerModal"));
const ButtonGroup = Button.Group;

const TaskCardList = (props) => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentNameId, setCurrentNameId] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [currentprocessName, setCurrentprocessName] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  dayjs.extend(relativeTime);

  const getRelativeTime = (creationDate) => {
      const now = dayjs();
      const creationDay = dayjs(creationDate);
  
      if (creationDay.isSame(now, 'day')) {
          return 'Today';
      } else {
          return creationDay.from(now); // e.g., "2 days ago"
      }
  };

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
         "71", //  "Type",//0
          "110",  // "Name",//1
          "111" , // "End",//2
           "112" ,// "Ageing",//3
          "113" , // "Info",//5
           "76", // "Assigned ",//5
          "77" , // "Owner",//6
          "106" , // "Urgent",//7
           "107" ,// "High",
           "108", // "Normal"
        ];
        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);


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
  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <>
    
          <div className=' flex sticky  z-auto'>
          <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" font-poppins text-xs flex max-sm:hidden justify-between w-[64%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky  max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
          <div className="flex  w-[3.54] truncate max-md:w-[4.54rem] bg-red-600 text-white">
          {translatedMenuItems[7]}</div>
        <div className=" flex  w-[9.1rem] truncate  ml-1 max-xl:w-[12.5rem] max-lg:w-[11.5rem]">
        < MergeTypeIcon className='!text-icon text-[#c42847] '  />{translatedMenuItems[0]} 
                        </div>
        <div className="flex  w-[12.9rem] truncate  max-xl:w-[8rem] max-lg:w-[9rem]">
        <CategoryIcon className='!text-base mr-1 text-[#e4eb2f]'/>{translatedMenuItems[1]}
                        </div>
             <div className="flex  w-[5.9rem] truncate  max-xl:w-[6.01rem] max-lg:w-[7.01rem] ">
             <DateRangeIcon className="!text-icon mr-1"/>  {translatedMenuItems[2]}
                        </div>
             <div className="flex  w-[7.5rem] truncate  max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
       
                        <div className="flex  w-[10.51rem] truncate  max-xl:w-[8.51rem] max-lg:w-[6.51rem]">
                        {translatedMenuItems[4]}
                         
                          </div>
        <div className="flex  w-[5.5rem] truncate  max-xl:w-[6.2rem] max-lg:w-[6.2rem]">
        <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/> {translatedMenuItems[5]} 
                        </div>
        <div className="flex  w-[4.92rem] truncate  max-xl:w-[8.5rem] max-lg:w-[13.5rem]">
        <AccountCircleIcon className="!text-icon  mr-1 text-[#d64933]"/> {translatedMenuItems[6]}
        {/* <div className=" w-[9.51rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">
                  {translatedMenuItems[3]} 
                        </div> */}
                        </div>
        
      </div>
      <InfiniteScroll
        dataLength={highTaskList.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingHighTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"24vh"}
        style={{ scrollbarWidth:"thin"}}
        endMessage={ <p class="flex  text-center font-bold text-xs font-poppins text-red-500">You have reached the end of page. </p>}
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
                             <div className="flex rounded mt-1 bg-white  items-center py-ygap scale-[0.99]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center  ">
                                <div className=" flex w-[4.01rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full ml-gap items-center"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="border rounded-[50%] h-6 w-6 bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="border rounded-[50%] h-6 w-6 bg-[teal]" ></div>
                    )}
                     </div>
                     </div>
                     <div class=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs ml-gap truncate max-w-[7rem] flex items-center  font-poppins cursor-pointer max-sm:text-xs" title={item.taskType}>                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                      
                              

                                <div className=" flex   w-[11.12rem]  items-center justify-start  h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs ml-gap font-semibold  font-poppins max-sm:text-xs">   
                                    <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                className="cursor-pointer ml-gap text-[#042E8A]"
                          
               >

                 {`${item.taskName} `} 


               </span>
                                    </div>
                                </div>
                               </div>
                               <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className="flex w-[5.22rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs  font-poppins max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex  w-[6.2rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
                    <div class="">
                    <ButtonGroup >
         
          <StatusIcon class=" !text-icon"
  type="To Start"
  iconType={<HourglassEmptyIcon  className=" !text-icon" />} 
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
             iconType={<HourglassTopIcon  className=" !text-icon"/>}
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
            iconType={<HourglassBottomIcon  className=" !text-icon"/>}
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
          
                    </div>
                   
                 
                   <div className="flex text-xs w-[9.2rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row   max-sm:w-auto ">
                   <div class="text-xs  font-poppins ml-gap items-center max-sm:text-xs">
                   {item.customerName ? (
  <>{item.customerName}</>
) : null}

{item.contact ? (
  <>{item.contact}</>
) : null}        
</div>
                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                    <div className=" flex w-[4.33rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row  max-sm:w-auto ">
                                  {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                                  <div class="text-xs ml-gap font-poppins  max-sm:text-xs">
                                  <span>
              {item.assignedToName === null ? (
                null
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
                        
                    
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[4.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row max-sm:w-auto ">
                                    
                                    <div class="text-xs  font-poppins ">
                                    <MultiAvatar
                                   
                                  primaryTitle={item.ownerName}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                                    </div>
                                </div>
                               
                             
                       
<div className="flex w-[3.23rem] items-center  h-8 ml-gap bg-[#eef2f9]">
{item.taskStatus==="Completed"&&(
                   <div className="flex  w-[5.23rem]   max-sm:flex-row  max-sm:w-auto  ">
             {item.assignedToName !== item.submittedBy ? 
             <span>
             <Tooltip overlayStyle={{ maxWidth: "400px" }} title={`Review :${item.feedbackReview}`}>
            {item.feedbackRating === 0 ? (<StarBorderIcon
            className=" !text-icon text-[#eeeedd]"/>)
              : (
                <span>
                  {item.feedbackRating}
                 
                  {<StarBorderIcon
                  className=" !text-icon text-[#FFD700]"
                    />}
                
                </span>)}
             
                </Tooltip>
                </span>
              
                :null}  
     </div> 
     )}
     </div>
                                        
                   <div class="flex  w-[9.21rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.2rem] max-lg:w-[4.6rem] justify-center  max-sm:flex-row max-sm:w-auto">
                    <div class="w-[10rem] items-center">
  {item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
    <>
     <div className=" flex inline-block items-center justify-center">
 <Button className="w-[4rem] bg-[teal] text-[white]  text-xs"
 onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
 >
  Approve
 </Button>
 <Button  className="w-[4rem] text-[white] text-xs"
   style={{
     backgroundColor: "rgb(233, 79, 79)",
   }}
   onClick={() => rejectTaskByTaskId(item.taskId)}
 >
   Reject
 </Button>
</div>
    </>
  ) : (
    <>
      {item.approvedInd === "Approved" ? (
        <CheckCircleOutlineIcon
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : item.approvedInd === "Rejected" ? (
        <HighlightOffIcon
          type="close-circle"
          theme="twoTone"
          twoToneColor="red"
          size={140}
          className="text-base"
        // style={{ fontSize: "1rem" }}
        />
      ) : (
        <></>
      )}
    </>
  )}
  </div>
</div>
<div className="flex w-[7.23rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
<div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-blue-600 font-semibold">{completeDeviation} Days</span>) :
     (incompleteDeviationDate > 0 && <span className=" text-blue-600 font-semibold">{incompleteDeviationDate} Days</span>)}
{/* {getRelativeTime(item.creationDate)} */}
</span></div>  
                  
                      
                       
                     </div>
</div>
                          
<div class="flex  max-sm:justify-end w-wk items-center justify-end  h-8 ml-gap bg-[#eef2f9]">    
<div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem]  max-sm:flex-row  max-sm:w-auto  justify-center ">
             {item.assignedToName !== item.submittedBy ? 
                         <Tooltip title="Feedback">
                         <FeedbackIcon
                                  onClick={() => {
                                    handleTaskFeedbackDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-icon cursor-pointer text-[#10d512]"
                                 
                                />
                             </Tooltip>
              
                :null}

     
     </div> 


     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
          <UploadIcon className="!text-icon cursor-pointer text-[#b3770f]"
              onClick={() => {
                props.handleUpdateDocumentDrawerModal(true);
                handleSetTaskNameId(item);
              }}
          />    
              

     
     </div> 
     <div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
     <EscalatorIcon  className="!text-icon cursor-pointer text-[#358fbb]"
         onClick={() => {
          handleTaskStepperDrawerModal(true);
          handleSetTaskNameId(item);
        }}
     />
               
 
      
      </div> 
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
              </div>
              <div>
                         <Tooltip title="Document">
                         <DownloadForOfflineIcon
                                  onClick={() => {
                                    props.handleTaskDocumentDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  className="!text-icon cursor-pointer"
                                 
                                />
                             </Tooltip>         
        
            </div>
              
          
            <div>
           
            {item.complitionStatus !== "completed" && (
                          <StyledPopconfirm
                            title="Do you want to delete?"
                           
                            onConfirm={() => deleteTask(item.taskId, employeeId)}
                          >
                                <Tooltip title="Delete">
                           <DeleteOutlineIcon 
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
          <div class="rounded m-1 max-sm:m-1  p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] ">
          <div className=" font-poppins text-xs flex max-sm:hidden justify-between w-[64%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
          <div className=" flex justify-center w-[3.54] truncate md:w-[4.54rem] bg-orange-600 text-white">
          {translatedMenuItems[8]}</div>
          <div className=" flex  w-[9.1rem] truncate  ml-1 max-xl:w-[12.5rem] max-lg:w-[11.5rem]">
        < MergeTypeIcon className='!text-icon text-[#c42847] '  />{translatedMenuItems[0]} 
                        </div>
        <div className="flex  w-[12.9rem] truncate  max-xl:w-[8rem] max-lg:w-[9rem]">
        <CategoryIcon className='!text-base mr-1 text-[#e4eb2f]'/>{translatedMenuItems[1]}
                        </div>
             <div className="flex  w-[5.9rem] truncate  max-xl:w-[6.01rem] max-lg:w-[7.01rem] ">
             <DateRangeIcon className="!text-icon mr-1"/>  {translatedMenuItems[2]}
                        </div>
             <div className="flex  w-[7.5rem] truncate  max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
       
                        <div className="flex  w-[10.51rem] truncate  max-xl:w-[8.51rem] max-lg:w-[6.51rem]">
                        {translatedMenuItems[4]}
                         
                          </div>
        <div className="flex  w-[5.5rem] truncate  max-xl:w-[6.2rem] max-lg:w-[6.2rem]">
        <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/> {translatedMenuItems[5]} 
                        </div>
        <div className="flex  w-[4.92rem] truncate  max-xl:w-[8.5rem] max-lg:w-[13.5rem]">
        <AccountCircleIcon className="!text-icon  mr-1 text-[#d64933]"/> {translatedMenuItems[6]}
        {/* <div className=" w-[9.51rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">
                  {translatedMenuItems[3]} 
                        </div> */}
                        </div>
        
      </div>
      <InfiniteScroll
        dataLength={mediumTaskList.length}
        next={handleLoadMoreMedium}
      hasMore={hasMore}
        loader={fetchingMediumTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"24vh"}
        style={{ scrollbarWidth:"thin"}}
        endMessage={ <p class="flex  text-center font-bold text-xs font-poppins text-red-500">You have reached the end of page. </p>}
      >
      {mediumTaskList.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');    
        const incompleteDeviationDate = currentDate.diff(endDate, 'days');
        const completeDeviation = completionDate.diff(endDate, 'days');
                    return (
                      <div>
                      <div className="flex rounded mt-1 bg-white  items-center py-ygap scale-[0.99] max-xl:text-[0.65rem] max-lg:text-[0.45rem] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center  ">
                         <div className=" flex w-[4.01rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
                         <div className="flex max-sm:w-full ml-gap items-center"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="border rounded-[50%] h-6 w-6 bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="border rounded-[50%] h-6 w-6 bg-[teal]" ></div>
                    )}
                     </div>
              </div>
              <div class=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8rem] max-sm:w-full">
                                 <Tooltip>
                                 <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                     {/* <div class="text-sm  font-poppins max-sm:hidden">
                                     Type
                                     </div> */}
                                     <div class="text-xs  ml-gap truncate max-w-[7rem] flex items-center  font-poppins cursor-pointer max-sm:text-xs" title={item.taskType}>                                       
                                     {item.taskType}

                                     </div>
                                  </div>
                                 </Tooltip>
                                 </div>
                               
                       

                         <div className=" flex   w-[11.12rem]  items-center justify-start  h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                             {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                             <div class=" ml-gap text-xs  font-semibold  font-poppins max-sm:text-xs">   
                             <span   
         onClick={() => {
           props.handleTaskopenModal(true);               
           handleSetCurrentProcessName(item)
           // this.props.setCurrentOpportunityRecruitMentData(item);
         }}
         className="cursor-pointer text-[#042E8A]"
                   
        >

          {`${item.taskName} `} 


        </span>
                             </div>
                         </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                         <div className="flex w-[5.22rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                
               
                <div class="text-xs  font-poppins max-sm:text-xs"> 
                 {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
            </div>
                         <div class="flex  w-[6.2rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                           
             <div class="">
             <ButtonGroup >
  
   <StatusIcon class=" !text-icon"
type="To Start"
iconType={<HourglassEmptyIcon  className=" !text-icon" />} 
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
      iconType={<HourglassTopIcon  className=" !text-icon"/>}
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
     iconType={<HourglassBottomIcon  className=" !text-icon"/>}
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
   
             </div>
            
          
            <div className="flex text-xs w-[9.2rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row   max-sm:w-auto ">
            <div class="text-xs  font-poppins ml-gap items-center max-sm:text-xs">
            {item.customerName ? (
<>{item.customerName}</>
) : null}

{item.contact ? (
<>{item.contact}</>
) : null}        
</div>
            </div>
            </div>
            <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
             <div className=" flex w-[4.33rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row  max-sm:w-auto ">
                           {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                           <div class="text-xs  ml-gap font-poppins  max-sm:text-xs">
                           <span>
       {item.assignedToName === null ? (
         null
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
                 
             
                         <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[4.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row max-sm:w-auto ">
                             
                             <div class="text-xs  font-poppins ">
                             <MultiAvatar
                            
                           primaryTitle={item.ownerName}
                           imgWidth={"1.8rem"}
                           imgHeight={"1.8rem"}
                         />
                                             </div>
                         </div>
                        
                      
                
<div className="w-[3.23rem] flex items-center justify-center h-8 ml-gap bg-[#eef2f9]">
{item.taskStatus==="Completed"&&(
            <div className="flex  w-[5.23rem] items-center   max-sm:flex-row  max-sm:w-auto  ">
      {item.assignedToName !== item.submittedBy ? 
      <span>
      <Tooltip overlayStyle={{ maxWidth: "400px" }} title={`Review :${item.feedbackReview}`}>
     {item.feedbackRating === 0 ? (<StarBorderIcon
     className=" !text-icon text-[#eeeedd]"/>)
       : (
         <span>
           {item.feedbackRating}
          
           {<StarBorderIcon
           className=" !text-icon text-[#FFD700]"
             />}
         
         </span>)}
      
         </Tooltip>
         </span>
       
         :null}  
</div> 
)}
</div>
                                 
            <div class="flex  w-[9.21rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.2rem] max-lg:w-[4.6rem] justify-center  max-sm:flex-row max-sm:w-auto">
             <div class=" w-[10rem] items-center">
{item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
<>
<div className=" flex inline-block items-center justify-center">
 <Button className="w-[4rem] bg-[teal] text-[white]  text-xs"
 onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
 >
  Approve
 </Button>
 <Button  className="w-[4rem] text-[white] text-xs"
   style={{
     backgroundColor: "rgb(233, 79, 79)",
   }}
   onClick={() => rejectTaskByTaskId(item.taskId)}
 >
   Reject
 </Button>
</div>
</>
) : (
<>
{item.approvedInd === "Approved" ? (
 <CheckCircleOutlineIcon
   type="check-circle"
   theme="twoTone"
   twoToneColor="#52c41a"
   size={140}
   style={{ fontSize: "1rem" }}
 />
) : item.approvedInd === "Rejected" ? (
 <HighlightOffIcon
   type="close-circle"
   theme="twoTone"
   twoToneColor="red"
   size={140}
   className="text-base"
 // style={{ fontSize: "1rem" }}
 />
) : (
 <></>
)}
</>
)}
</div>
</div>
<div className="flex w-[7.23rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
<div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
               <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-blue-600 font-semibold">{completeDeviation} Days</span>) :
(incompleteDeviationDate > 0 && <span className=" text-blue-600 font-semibold">{incompleteDeviationDate} Days</span>)}
{/* {getRelativeTime(item.creationDate)} */}
</span></div>  
           
               
                
              </div>
</div>
                   
<div class="flex  max-sm:justify-end w-wk items-center justify-end  h-8 ml-gap bg-[#eef2f9]">    
<div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem]  max-sm:flex-row  max-sm:w-auto  justify-center ">
      {item.assignedToName !== item.submittedBy ? 
                  <Tooltip title="Feedback">
                  <FeedbackIcon
                           onClick={() => {
                             handleTaskFeedbackDrawerModal(true);
                             handleSetTaskNameId(item);
                           }}
                           className="!text-icon cursor-pointer text-[#10d512]"
                          
                         />
                      </Tooltip>
       
         :null}


</div> 


<div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
    
               
   <UploadIcon className="!text-icon cursor-pointer text-[#b3770f]"
       onClick={() => {
         props.handleUpdateDocumentDrawerModal(true);
         handleSetTaskNameId(item);
       }}
   />    
       


</div> 
<div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
    
               
<EscalatorIcon  className="!text-icon cursor-pointer text-[#358fbb]"
  onClick={() => {
   handleTaskStepperDrawerModal(true);
   handleSetTaskNameId(item);
 }}
/>
        


</div> 
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
       </div>
       <div>
                  <Tooltip title="Document">
                  <DownloadForOfflineIcon
                           onClick={() => {
                             props.handleTaskDocumentDrawerModal(true);
                             handleSetTaskNameId(item);
                           }}
                           className="!text-icon cursor-pointer"
                          
                         />
                      </Tooltip>         
 
     </div>
   
     <div>
    
     {item.complitionStatus !== "completed" && (
                   <StyledPopconfirm
                   title="Do you want to delete?"
                     
                    
                     onConfirm={() => deleteTask(item.taskId, employeeId)}
                   >
                         <Tooltip title="Delete">
                    <DeleteOutlineIcon 
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
                      )
                })}
                 </InfiniteScroll>
      </div>
</div>

<div className=' flex sticky  z-auto'>
          <div class="rounded max-sm:m-1  py-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] ">
          <div className=" font-poppins text-xs flex max-sm:hidden justify-between w-[64%]  p-1 font-poppins !text-lm bg-transparent font-bold sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
          <div className="flex  w-[3.54] truncate  md:w-[4.54rem] bg-teal-600 text-white">
          {translatedMenuItems[9]}</div>
          <div className=" flex  w-[9.1rem] truncate  ml-1 max-xl:w-[12.5rem] max-lg:w-[11.5rem]">
        < MergeTypeIcon className='!text-icon text-[#c42847] '  />{translatedMenuItems[0]} 
                        </div>
        <div className="flex  w-[12.9rem] truncate  max-xl:w-[8rem] max-lg:w-[9rem]">
        <CategoryIcon className='!text-base mr-1 text-[#e4eb2f]'/>{translatedMenuItems[1]}
                        </div>
             <div className="flex  w-[5.9rem] truncate  max-xl:w-[6.01rem] max-lg:w-[7.01rem] ">
             <DateRangeIcon className="!text-icon mr-1"/>  {translatedMenuItems[2]}
                        </div>
             <div className="flex  w-[7.5rem] truncate  max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
       
                        <div className="flex  w-[10.51rem] truncate  max-xl:w-[8.51rem] max-lg:w-[6.51rem]">
                        {translatedMenuItems[4]}
                         
                          </div>
        <div className="flex  w-[5.5rem] truncate  max-xl:w-[6.2rem] max-lg:w-[6.2rem]">
        <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/> {translatedMenuItems[5]} 
                        </div>
        <div className="flex  w-[4.92rem] truncate  max-xl:w-[8.5rem] max-lg:w-[13.5rem]">
        <AccountCircleIcon className="!text-icon  mr-1 text-[#d64933]"/> {translatedMenuItems[6]}
        {/* <div className=" w-[9.51rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">
                  {translatedMenuItems[3]} 
                        </div> */}
                        </div>
        
      </div>
      <InfiniteScroll
        dataLength={lowTaskList.length}
        next={handleLoadMoreLow}
        style={{ scrollbarWidth:"thin"}}
      hasMore={hasMore}
        loader={fetchingLowTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"24vh"}
        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      {lowTaskList.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        const incompleteDeviationDate = currentDate.diff(endDate, 'days');
        const completeDeviation = completionDate.diff(endDate, 'days');
                    return (
                      <div>
                      <div className="flex rounded mt-1 bg-white  items-center py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem] scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center  ">
                         <div className=" flex w-[4.01rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
                         <div className="flex ml-gap max-sm:w-full"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="border rounded-[50%] h-6 w-6 bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="border rounded-[50%] h-6 w-6 bg-teal-600" ></div>
                    )}
                     </div>
              </div>
              <div class=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8rem] max-sm:w-full">
                                 <Tooltip>
                                 <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                     {/* <div class="text-sm  font-poppins max-sm:hidden">
                                     Type
                                     </div> */}
                                     <div class="text-xs truncate max-w-[7rem] flex items-center  font-poppins cursor-pointer max-sm:text-xs" title={item.taskType}>                                       
                                     {item.taskType}

                                     </div>
                                  </div>
                                 </Tooltip>
                                 </div>
                               
                       

                         <div className=" flex   w-[11.12rem]  items-center justify-start  h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                             {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                             <div class=" text-xs ml-gap font-semibold  font-poppins max-sm:text-xs">   
                             <span   
         onClick={() => {
           props.handleTaskopenModal(true);               
           handleSetCurrentProcessName(item)
           // this.props.setCurrentOpportunityRecruitMentData(item);
         }}
         className="cursor-pointer text-[#042E8A]"
                   
        >

          {`${item.taskName} `} 


        </span>
                             </div>
                         </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                         <div className="flex w-[5.22rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                
               
                <div class="text-xs  font-poppins max-sm:text-xs"> 
                 {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
            </div>
                         <div class="flex  w-[6.2rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                           
             <div class="">
             <ButtonGroup >
  
   <StatusIcon class=" !text-icon"
type="To Start"
iconType={<HourglassEmptyIcon  className=" !text-icon" />} 
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
      iconType={<HourglassTopIcon  className=" !text-icon"/>}
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
     iconType={<HourglassBottomIcon  className=" !text-icon"/>}
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
   
             </div>
            
          
            <div className="flex text-xs w-[9.2rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row   max-sm:w-auto ">
            <div class="text-xs  font-poppins ml-gap items-center max-sm:text-xs">
            {item.customerName ? (
<>{item.customerName}</>
) : null}

{item.contact ? (
<>{item.contact}</>
) : null}        
</div>
            </div>
            </div>
            <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
             <div className=" flex w-[4.33rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row  max-sm:w-auto ">
                           {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                           <div class="text-xs  font-poppins  max-sm:text-xs">
                           <span>
       {item.assignedToName === null ? (
         null
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
                 
             
                         <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[4.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row max-sm:w-auto ">
                             
                             <div class="text-xs  font-poppins ">
                             <MultiAvatar
                            
                           primaryTitle={item.ownerName}
                           imgWidth={"1.8rem"}
                           imgHeight={"1.8rem"}
                         />
                                             </div>
                         </div>
                        
                      
                
<div className="w-[3.23rem] flex items-center justify-center h-8 ml-gap bg-[#eef2f9]">
{item.taskStatus==="Completed"&&(
            <div className="flex items-center  w-[5.23rem]  max-sm:flex-row  max-sm:w-auto  ">
      {item.assignedToName !== item.submittedBy ? 
      <span>
      <Tooltip overlayStyle={{ maxWidth: "400px" }} title={`Review :${item.feedbackReview}`}>
     {item.feedbackRating === 0 ? (<StarBorderIcon
     className=" !text-icon text-[#eeeedd]"/>)
       : (
         <span>
           {item.feedbackRating}
          
           {<StarBorderIcon
           className=" !text-icon text-[#FFD700]"
             />}
         
         </span>)}
      
         </Tooltip>
         </span>
       
         :null}  
</div> 
)}
</div>
                                 
            <div class="flex  w-[9.21rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.2rem] max-lg:w-[4.6rem] justify-center  max-sm:flex-row max-sm:w-auto">
             <div class=" w-[10rem] items-center">
{item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
<>
<div className=" flex inline-block items-center justify-center">
 <Button className="w-[4rem] bg-[teal] text-[white]  text-xs"
 onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
 >
  Approve
 </Button>
 <Button  className="w-[4rem] text-[white] text-xs"
   style={{
     backgroundColor: "rgb(233, 79, 79)",
   }}
   onClick={() => rejectTaskByTaskId(item.taskId)}
 >
   Reject
 </Button>
</div>
</>
) : (
<>
{item.approvedInd === "Approved" ? (
 <CheckCircleOutlineIcon
   type="check-circle"
   theme="twoTone"
   twoToneColor="#52c41a"
   size={140}
   style={{ fontSize: "1rem" }}
 />
) : item.approvedInd === "Rejected" ? (
 <HighlightOffIcon
   type="close-circle"
   theme="twoTone"
   twoToneColor="red"
   size={140}
   className="text-base"
 // style={{ fontSize: "1rem" }}
 />
) : (
 <></>
)}
</>
)}
</div>
</div>
<div className="flex w-[7.23rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
<div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
               <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-blue-600 font-semibold">{completeDeviation} Days</span>) :
(incompleteDeviationDate > 0 && <span className=" text-blue-600 font-semibold">{incompleteDeviationDate} Days</span>)}
{/* {getRelativeTime(item.creationDate)} */}
</span></div>  
           
               
                
              </div>
</div>
                   
<div class="flex  max-sm:justify-end w-wk items-center justify-end  h-8 ml-gap bg-[#eef2f9]">    
<div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem]  max-sm:flex-row  max-sm:w-auto  justify-center ">
      {item.assignedToName !== item.submittedBy ? 
                  <Tooltip title="Feedback">
                  <FeedbackIcon
                           onClick={() => {
                             handleTaskFeedbackDrawerModal(true);
                             handleSetTaskNameId(item);
                           }}
                           className="!text-icon cursor-pointer text-[#10d512]"
                          
                         />
                      </Tooltip>
       
         :null}


</div> 


<div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
    
               
   <UploadIcon className="!text-icon cursor-pointer text-[#b3770f]"
       onClick={() => {
         props.handleUpdateDocumentDrawerModal(true);
         handleSetTaskNameId(item);
       }}
   />    
       


</div> 
<div className="flex  max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
    
               
<EscalatorIcon  className="!text-icon cursor-pointer text-[#358fbb]"
  onClick={() => {
   handleTaskStepperDrawerModal(true);
   handleSetTaskNameId(item);
 }}
/>
        


</div> 
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
       </div>
       <div>
                  <Tooltip title="Document">
                  <DownloadForOfflineIcon
                           onClick={() => {
                             props.handleTaskDocumentDrawerModal(true);
                             handleSetTaskNameId(item);
                           }}
                           className="!text-icon cursor-pointer"
                          
                         />
                      </Tooltip>         
 
     </div>
          
   
     <div>
    
     {item.complitionStatus !== "completed" && (
                   <StyledPopconfirm
                   title="Do you want to delete?"
                    
                     onConfirm={() => deleteTask(item.taskId, employeeId)}
                   >
                         <Tooltip title="Delete">
                    <DeleteOutlineIcon 
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
                    )
                })}
                 </InfiniteScroll>
      </div>
</div>
<Suspense fallback={<BundleLoader />}>
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
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
/>
</Suspense>

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