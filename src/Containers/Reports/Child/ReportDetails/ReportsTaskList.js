import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Tooltip, Button,  } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm, } from "../../../../Components/UI/Antd";
import StairsIcon from '@mui/icons-material/Stairs';
import { MultiAvatar, } from "../../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmptyPage from "../../../Main/EmptyPage";
import { BundleLoader } from "../../../../Components/Placeholder";

const ButtonGroup = Button.Group;

const ReportTaskList = (props) => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");

  const [currentNameId, setCurrentNameId] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [currentprocessName, setCurrentprocessName] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
//   useEffect(() => {
//     setPage(page + 1);
//     //props.getTaskListRangeByUserId(props.employeeId,page);
//   }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  const {
  
   
    userDetails: { employeeId },
  } = props;

  if (props.gettingReportTask) 
  {
   return <BundleLoader/>
  }

  return (
    <>
    
          <div className=' flex  sticky  z-auto h-[88vh]'>
          <div class="rounded max-sm:m-1 m-1 p-1 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent text-xs font-poppins font-bold sticky  z-10">
        <div className=" w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]"><FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        /></div>
        <div className=" w-[8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7rem] max-lg:w-[9rem]"><FormattedMessage
                          id="app.name"
                          defaultMessage="name"
                        /></div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] "><FormattedMessage
                          id="app.end"
                          defaultMessage="end"
                        /></div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]"><FormattedMessage
                          id="app.ageing"
                          defaultMessage="Ageing"
                        /></div>
                        <div className="w-[12.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.51rem] max-lg:w-[6.51rem]">Info</div>
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
     
      {!props.gettingReportTask &&  props.reportTask.length=== 0 ? <EmptyPage/> :props.reportTask.map((item) => { 
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
                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[8rem] max-sm:">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex   w-[9.1rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="rounded-[50%] h-6 w-6 bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="rounded-[50%] h-6 w-6 bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="rounded-[50%] h-6 w-6 bg-[teal]" ></div>
                    )}
                    <div class=" w-2"></div>
          <div class=" flex w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md: ">
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs flex items-center  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex  justify-center   w-[5.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <span   
                // onClick={() => {
                //   props.handleTaskopenModal(true);               
                //   handleSetCurrentProcessName(item)
                 
                // }}
                className="cursor-pointer text-[#042E8A]"
                          
               >

                 {`${item.taskName} `} &nbsp;


               </span>
                                    </div>
                                </div>
                               </div>
                               <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className="flex   w-[5.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex  w-[5.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
                    <div class="">
                   
                    <ButtonGroup >
         
          <StatusIcon
  type="To Start"
  iconType="fa-hourglass-start"
  tooltip="To Start"
  status={item.taskStatus}
  difference={difference} 
//   onClick={() =>
//     linkTaskStatus(item.taskId, {
//       taskStatus: "To Start",
//     })
//   }
/>
          {/* )} */}


          {/* {item.complitionStatus === "In Progress" && ( */}
            <StatusIcon
              type="In Progress"
              iconType="fa-hourglass-half"
              tooltip="In Progress"
              status={item.taskStatus}
              difference={difference}
            //   onClick={() =>
            //     linkTaskStatus(item.taskId, {
                 
            //        taskStatus: "In Progress",
            //     })
            //   }
            />
          {/* )} */}
          {/* {item.complitionStatus === "completed" && ( */}
            <StatusIcon
              type="Completed"
              iconType="fa-hourglass"
              tooltip="Completed"
              status={item.taskStatus}
              difference={difference}
            //   onClick={() =>
            //     linkTaskStatus(item.taskId, {
                 
            //        taskStatus: "Completed",
            //     })
            //   }
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
                   
                    <div className="flex   w-[3.23rem] max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       {/* <div class="text-sm  font-poppins max-sm:hidden">Deviation</div> */}
                       {/* <div class="text-xs  font-poppins"> 
                       {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}
                   </div> */}
                     <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
                   </div>
                   <div className="flex   justify-between w-[16.6rem] max-xl:w-[10.23rem] max-lg:w-[6.23rem]  max-sm:flex-row  max-sm:w-auto ">
                   <MultiAvatar
                              primaryTitle={item.name}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                  <MultiAvatar
                  primaryTitle={item.name}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />

                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex   w-[6.23rem] max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                  {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                                  <div class="text-xs  font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                        
                    
                                <div className=" flex    w-[5.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    
                                    <div class="text-xs  font-poppins ">
                                    <MultiAvatar
                                   
                  primaryTitle={item.submittedBy}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                               
                               
                                {/* <div className=" flex   w-32 ">
                                    <div class=" text-sm  font-poppins">Team</div>

                                    <div class=" text-sm  font-poppins">
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
                                {/* <div className="flex   md:w-32 max-sm:flex-row justify-between w-full ">
                                    <div class="text-sm  font-poppins">Start</div>

                                    <div class="text-sm  font-poppins">
                                     {`${dayjs(item.startDate).format("YYYY/MM/DD")}`}
                                    </div>
                                </div> */}
                       
<div>
{item.taskStatus==="Completed"&&(
                   <div className="flex   w-[5.23rem] max-sm:flex-row  max-sm:w-auto justify-center ">
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
     <div className="flex   w-[1.9rem] max-xl:w-[1.25rem] max-lg:w-[1.2rem]  max-sm:flex-row  max-sm:w-auto  justify-center ">
             {item.assignedToName !== item.submittedBy ? 
                         <Tooltip title="Feedback">
                         <FeedbackIcon
                                //   onClick={() => {
                                //     handleTaskFeedbackDrawerModal(true);
                                //     handleSetTaskNameId(item);
                                //   }}
                                  className="!text-base cursor-pointer"
                                 
                                />
                             </Tooltip>
              
                :null}

     
     </div> 


     <div className="flex   w-[1.7rem] max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
          <UploadOutlined
            //   onClick={() => {
            //     props.handleUpdateDocumentDrawerModal(true);
            //     handleSetTaskNameId(item);
            //   }}
          />    
              

     
     </div> 
     <div className="flex   w-[2.6rem] max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
                      
     <StairsIcon  className="!text-icon cursor-pointer text-[green]"
        //  onClick={() => {
        //   handleTaskStepperDrawerModal(true);
        //   handleSetTaskNameId(item);
        // }}
     />
               
 
      
      </div> 
  
                  
                   
                   <div class="flex  w-[8.21rem] max-xl:w-[6.2rem] max-lg:w-[5.1rem] justify-center  max-sm:flex-row max-sm:w-auto">
                    <div class=" w-36">
  {item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
    <>
      <div>
        <Button
        //onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
          style={{ backgroundColor: "teal", color: "white" }}
        >
          <FormattedMessage id="app.approve" defaultMessage="Approve" />
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(233, 79, 79)",
            color: "white",
          }}
          //onClick={() => rejectTaskByTaskId(item.taskId)}
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
                    <div class="flex  w-6 max-sm:flex-row  max-sm:w-auto justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                // onClick={() => {
                //   handleTaskNotesDrawerModal(true);
                //   handleSetTaskNameId(item);
                // }}
                className="!text-icon cursor-pointer text-[green]"
              />
           </Tooltip>
  
   
          {/* {props.userId === item.userId && ( */}
                      {/* <DownloadForOfflineIcon
                        // type="edit"
                        className="!text-icon cursor-pointer"
                        onClick={() => {
                          handleSetCurrentProcessName(item)
                          handleDownloadTaskModal(true);
                        }}
                      /> */}
                         <Tooltip title="Document">
                         <DownloadForOfflineIcon
                                //   onClick={() => {
                                //     props.handleTaskDocumentDrawerModal(true);
                                //     handleSetTaskNameId(item);
                                //   }}
                                  className="!text-icon cursor-pointer"
                                 
                                />
                             </Tooltip>
                    {/* )} */}
        
            </div>
                    <div class="flex  w-6 max-sm:flex-row max-sm:w-auto justify-evenly ">
   
   
          <Tooltip title="Edit">
          {props.userId === item.userId && (
                      <BorderColorIcon
                        type="edit"
                        className="!text-icon cursor-pointer"                   
                        // onClick={() => {
                        //   props.setEditTask(item);
                        //   handleUpdateTaskModal(true);
                        // }}
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
                            //onConfirm={() => deleteTask(item.taskId, employeeId)}
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
               
      </div>
</div>



      {/* AddTaskProjectDrawerModal and AddTaskNotesDrawerModal components go here */}
    </>
  );
};
  const mapStateToProps = ({ auth, task, opportunity }) => ({
    userDetails: auth.userDetails,
   
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    
    noOfPages: task.taskListRangeByUserId.length && task.taskListRangeByUserId[0].noOfPages || "",
     

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
       
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(ReportTaskList);
   
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
      