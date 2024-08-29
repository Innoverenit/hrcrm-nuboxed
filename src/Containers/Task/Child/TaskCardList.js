import React, { useState,lazy,Suspense,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  
} from "@ant-design/icons";
import EscalatorIcon from '@mui/icons-material/Escalator';
import UploadIcon from '@mui/icons-material/Upload';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Tooltip, Button,  } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm, } from "../../../Components/UI/Antd";
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
import { MultiAvatar, MultiAvatar2, } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../Components/Placeholder";

const AddTaskDocumentDrawerModal = lazy(() => import("../Child/AddTaskDocumentDrawerModal"));
const AddTaskStepperDrawerModal = lazy(() => import("./TaskStepper/AddTaskStepperDrawerModal"));
const AddTaskProjectDrawerModal = lazy(() => import("../Child/AddTaskProjectDrawerModal"));
const AddTaskNotesDrawerModal = lazy(() => import("./AddTaskNotesDrawerModal"));
const OpenTaskModal = lazy(() => import("./OpenTaskModal"));
const DownloadTaskModal = lazy(() => import("./DownloadTaskModal"));
const UpdateTaskModal = lazy(() => import("./UpdateTaskModal"));
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
  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <>
    
          <div className=' flex sticky  z-auto'>
          <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[4.54rem] bg-red-600 text-white">
          {translatedMenuItems[7]}</div>
        <div className=" w-[6.5rem] ml-1 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]">
        {translatedMenuItems[0]} 
                        </div>
        <div className=" w-[10.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8rem] max-lg:w-[9rem]">
                        {translatedMenuItems[1]}
                        </div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.01rem] max-lg:w-[7.01rem] ">
             {translatedMenuItems[2]}
                        </div>
             <div className=" w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[6.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">
                  {translatedMenuItems[3]} 
                        </div>
                        <div className="w-[10.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.51rem] max-lg:w-[6.51rem]">
                        {translatedMenuItems[4]}
                         
                          </div>
        <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]">
        {translatedMenuItems[5]} 
                        </div>
        <div className="w-[30.92rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.5rem] max-lg:w-[13.5rem]">
        {translatedMenuItems[6]}
                        </div>
        
      </div>
      <InfiniteScroll
        dataLength={highTaskList.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingHighTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        style={{ scrollbarWidth:"thin"}}
        endMessage={ <p class="flex  text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
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
                          <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center  ">
                                <div className=" flex w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
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
                    <div class=" w-9"></div>
          <div class=" flex w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs truncate max-w-[4rem] flex items-center  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs" title={item.taskType}>                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex justify-center flex-col  w-[9.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
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
                                <div className="flex w-[5.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex  w-[7.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
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
                   
                    <div className="flex w-[4.23rem] max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                  
                     <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
                   </div>
                   <div className="flex justify-between w-[11.2rem] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row   max-sm:w-auto ">
                   {item.customerName ? (
  <>{item.customerName}</>
) : null}

{item.contact ? (
  <>{item.contact}</>
) : null}        

                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center w-[20rem]">
                    <div className=" flex w-[4.33rem] max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                  {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                                  <div class="text-xs  font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                        
                    
                                <div className=" flex   w-[5.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    
                                    <div class="text-xs  font-poppins ">
                                    <MultiAvatar
                                   
                                  primaryTitle={item.ownerName}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                                    </div>
                                </div>
                               
                             
                       
<div className="w-[5.23rem]">
{item.taskStatus==="Completed"&&(
                   <div className="flex  w-[5.23rem] max-sm:flex-row  max-sm:w-auto  ">
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
                                        
                   <div class="flex  w-[8.21rem] max-xl:w-[6.2rem] max-lg:w-[4.6rem] justify-center  max-sm:flex-row max-sm:w-auto">
                    <div class=" w-36">
  {item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
    <>
      <div>
        <Button className=""
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
</div>
                          
<div class="flex  max-sm:justify-end w-wk items-center justify-end">    
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
            </div>
          
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
          <div class="rounded m-1 max-sm:m-1  p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] ">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[4.54rem] bg-orange-600 text-white">
          {translatedMenuItems[8]}</div>
        <div className=" w-[6.5rem] ml-1 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]">
        {translatedMenuItems[0]} 
                        </div>
        <div className=" w-[10.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8rem] max-lg:w-[9rem]">
                        {translatedMenuItems[1]}
                        </div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.01rem] max-lg:w-[7.01rem] ">
             {translatedMenuItems[2]}
                        </div>
             <div className=" w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[6.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">
                  {translatedMenuItems[3]} 
                        </div>
                        <div className="w-[10.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.51rem] max-lg:w-[6.51rem]">
                        {translatedMenuItems[4]}
                         
                          </div>
        <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]">
        {translatedMenuItems[5]} 
                        </div>
        <div className="w-[30.92rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.5rem] max-lg:w-[13.5rem]">
        {translatedMenuItems[6]}
                        </div>
        
      </div>
      <InfiniteScroll
        dataLength={mediumTaskList.length}
        next={handleLoadMoreMedium}
      hasMore={hasMore}
        loader={fetchingMediumTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        style={{ scrollbarWidth:"thin"}}
        endMessage={ <p class="flex  text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
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
                           <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center  ">
                                <div className=" flex w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
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
                    <div class=" w-9"></div>
          <div class=" flex w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                             <div class="text-xs truncate max-w-[4rem] flex items-center  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs" title={item.taskType}>                                                                             
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex justify-center flex-col  w-[9.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
   
                }}
                className="cursor-pointer text-[#042E8A]"                         
               >
                 {`${item.taskName} `} 
               </span>
                                    </div>
                                </div>
                               </div>
                               <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className="flex w-[5.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex  w-[7.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
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
                   
                    <div className="flex w-[4.23rem] max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
                                          
                     <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
                   </div>
                   <div className="flex justify-between w-[11.2rem] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row   max-sm:w-auto ">
                   {item.customerName ? (
  <>{item.customerName}</>
) : null}

{item.contact ? (
  <>{item.contact}</>
) : null}        

                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center w-[20rem]">
                    <div className=" flex w-[4.33rem] max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                  {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                                  <div class="text-xs  font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                />
                )}
                </>
              )}
            </span>
                                  </div>
                              </div>
                        
                    
                                <div className=" flex   w-[5.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    
                                    <div class="text-xs  font-poppins ">
                                    <MultiAvatar
                                   
                                  primaryTitle={item.ownerName}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                                    </div>
                                </div>
                               
                             
                       
<div className="w-[5.23rem]">
{item.taskStatus==="Completed"&&(
                   <div className="flex  w-[5.23rem] max-sm:flex-row  max-sm:w-auto  ">
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
                   <div class="flex  w-[8.21rem] max-xl:w-[6.2rem] max-lg:w-[4.6rem] justify-center  max-sm:flex-row max-sm:w-auto">
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
                          
<div class="flex  max-sm:justify-end w-wk items-center justify-end ">    
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
            </div>
          
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
                      )
                })}
                 </InfiniteScroll>
      </div>
</div>

<div className=' flex sticky  z-auto'>
          <div class="rounded  m-1 max-sm:m-1  p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] ">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[4.54rem] bg-teal-600 text-white">
          {translatedMenuItems[9]}</div>
        <div className=" w-[6.5rem] ml-1 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]">
        {translatedMenuItems[0]} 
                        </div>
        <div className=" w-[10.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8rem] max-lg:w-[9rem]">
                        {translatedMenuItems[1]}
                        </div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.01rem] max-lg:w-[7.01rem] ">
             {translatedMenuItems[2]}
                        </div>
             <div className=" w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[6.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">
                  {translatedMenuItems[3]} 
                        </div>
                        <div className="w-[10.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.51rem] max-lg:w-[6.51rem]">
                        {translatedMenuItems[4]}
                         
                          </div>
        <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]">
        {translatedMenuItems[5]} 
                        </div>
        <div className="w-[30.92rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.5rem] max-lg:w-[13.5rem]">
        {translatedMenuItems[6]}
                        </div>
        
      </div>
      <InfiniteScroll
        dataLength={lowTaskList.length}
        next={handleLoadMoreLow}
        style={{ scrollbarWidth:"thin"}}
      hasMore={hasMore}
        loader={fetchingLowTaskList?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
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
                           <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center  ">
                                <div className=" flex w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[5.6rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="border rounded-[50%] h-6 w-6 bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="border rounded-[50%] h-6 w-6 bg-[#0f0f0f]" ></div>
                    )}
                    <div class=" w-9"></div>
          <div class=" flex w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs truncate max-w-[4rem] flex items-center  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs" title={item.taskType}>                                                                    
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex justify-center flex-col  w-[9.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
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
                                <div className="flex w-[5.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex  w-[7.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
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
                   
                    <div className="flex w-[4.23rem] max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
                                         
                     <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
                   </div>
                   <div className="flex justify-between w-[11.2rem] max-xl:w-[10.23rem] max-lg:w-[7.23rem]  max-sm:flex-row   max-sm:w-auto ">
                   {item.customerName ? (
  <>{item.customerName}</>
) : null}

{item.contact ? (
  <>{item.contact}</>
) : null}        

                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center w-[20rem]">
                    <div className=" flex w-[4.33rem] max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                  {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                                  <div class="text-xs  font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                />
                )}
                </>
              )}
            </span>
                                  </div>
                              </div>
                        
                    
                                <div className=" flex   w-[5.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    
                                    <div class="text-xs  font-poppins ">
                                    <MultiAvatar
                                   
                                  primaryTitle={item.ownerName}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                                    </div>
                                </div>
                               
                             
                       
<div className="w-[5.23rem]">
{item.taskStatus==="Completed"&&(
                   <div className="flex  w-[5.23rem] max-sm:flex-row  max-sm:w-auto  ">
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
                          
<div class="flex  max-sm:justify-end w-wk items-center justify-end">    
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
            </div>
          
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
                    )
                })}
                 </InfiniteScroll>
      </div>
</div>
<Suspense fallback={<BundleLoader />}>
   <UpdateTaskModal
          updateTaskModal={updateTaskModal}
          handleUpdateTaskModal={handleUpdateTaskModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
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