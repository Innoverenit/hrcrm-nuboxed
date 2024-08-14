import React, { useState,lazy,useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {CloseCircleOutlined} from "@ant-design/icons";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Tooltip,  Button } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";

import {
  getAprrovalTaskTable,
  deleteTask,
  handleProspectConfirmationModal,
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
  handleTaskNotesDrawerModal,
  handleTaskProjectDrawerModal,
} from "../TaskAction";
import { MultiAvatar } from "../../../Components/UI/Elements";
import InfiniteScroll from "react-infinite-scroll-component";
const AddTaskProjectDrawerModal = lazy(() => import("../Child/AddTaskProjectDrawerModal"));
const AddConfirmProspectStatusModal = lazy(() => import("./AddConfirmProspectStatusModal"));
const AddTaskNotesDrawerModal = lazy(() => import("./AddTaskNotesDrawerModal"));
const UpdateTaskModal = lazy(() => import("./UpdateTaskModal"));
const ButtonGroup = Button.Group;

const TaskApproveTable = (props) => {
  const [data, setData] = useState("");
  const [rowdata, setrowData] = useState("");
  const [data1, setData1] = useState("");
  const [currentNameId, setCurrentNameId] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;
  const [currentprocessName, setCurrentprocessName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    setPage(page + 1);
    props.getAprrovalTaskTable(props.employeeId,page);
  }, []);
  const handleRowData = (data) => {
    setrowData(data);
  };
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
    const taskPageMapd = props.approvalTaskTable && props.approvalTaskTable.length && props.approvalTaskTable[0].pageCount
    setTimeout(() => {
      const {
        getAprrovalTaskTable,
        userDetails: { employeeId },
      } = props;

      if  (props.approvalTaskTable)
      {
        if (page < taskPageMapd) {
          setPage(page + 1);
          getAprrovalTaskTable(employeeId,page);
      }
      if (page === taskPageMapd){
        setHasMore(false)
      }
    }
      
    }, 100);
  };

  function handleSetTaskNameId(item) {
    setCurrentNameId(item);
  }
  function handleSetCurrentProcessName(item) {
    setCurrentprocessName(item);
     console.log(item);
   }
  

  const {
    fetchingApproveTaskTable,
    fetchingApproveTaskTableError,
    approvalTaskTable,
    deleteTask,
    approveTaskByTaskId,
    rejectTaskByTaskId,
    handleUpdateTaskModal,
    handleTaskProjectDrawerModal,
    updateTaskModal,
    addDrawerTaskNotesModal,
    handleTaskNotesDrawerModal,
    setEditTask,
    userDetails: { employeeId },
  } = props;

 

  return (
    <>
      
          <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
          <div className=" w-[11.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] max-lg:w-[16.1rem]"><FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        /></div>
        <div className=" w-[14.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.2rem] max-lg:w-[8.2rem]"><FormattedMessage
                          id="app.name"
                          defaultMessage="name"
                        /></div>
             <div className=" w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.2rem] max-lg:w-[6.2rem] "><FormattedMessage
                          id="app.submittedby"
                          defaultMessage="submittedby"
                        /></div>
        <div className="w-[14.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.2rem] max-lg:w-[9.2rem]"><FormattedMessage
                          id="app.ageing"
                          defaultMessage="Ageing"
                        /></div>
                         <div className="w-[6.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.51rem] max-lg:w-[6.51rem]">Info</div>
        <div className="w-[10.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.23rem]"><FormattedMessage
                          id="app.assignedOn"
                          defaultMessage="Assigned On"
                        /></div>
        <div className="w-[8.52rem]"></div>
       
</div>
<InfiniteScroll
        dataLength={approvalTaskTable.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingApproveTaskTable?<div class="flex justify-center" >Loading...</div>:null}
        height={"80vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex  text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
          {approvalTaskTable.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        const incompleteDeviationDate = currentDate.diff(endDate, 'days');
        const completeDeviation = completionDate.diff(endDate, 'days');
         console.log("difference",difference)
         console.log("deviationDate",incompleteDeviationDate)
                    return (
                        <div>
                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex  w-[13.3rem] max-xl:w-[10.3rem] max-lg:w-[10.3rem] max-sm:w-auto max-sm:flex-row justify-between ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
                      <div
                      class="rounded-[50%] h-6 w-6 bg-[red]"
                      ></div>
                    )}
                    {item.priority === "Medium" && (
                      <div
                      class="rounded-[50%] h-6 w-6 bg-[orange]"
                      ></div>
                    )}
                    {item.priority === "Low" && (
                      <div
                      class="rounded-[50%] h-6 w-6 bg-[teal]"
                      ></div>
                    )}
                    <div class=" w-1"></div>
          <div class=" flex w-[7.1rem] items-center max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">                                       
                                            {item.taskType.substring(0, 20)}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex   items-center  w-[15.3rem] max-xl:w-[8.3rem] max-lg:w-[6.3rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm   font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                className="cursor-pointer text-[#042E8A]"        
               >
                 {`${item.taskName.substring(0, 20)} `} 


               </span>
                                    </div>
                                </div>
                                </div>
               
                   
                        
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex  w-[5.35rem] max-xl:w-[4.35rem] max-lg:w-[3.35rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-poppins max-sm:hidden">Submitted By</div> */}
                                    <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                    <MultiAvatar
                                    // style={{marginBottom:"0.25rem"}}
                  primaryTitle={item.ownerName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                                <div className="flex w-[4.23rem] max-xl:w-[4.23rem] max-lg:w-[3.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       
                     <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
                   </div>
                             </div>  
                       <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                     <div className="flex  justify-between w-[16.6rem] max-xl:w-[10.23rem] max-lg:w-[6.23rem]  max-sm:flex-row  max-sm:w-auto ">
                                  {item.customerName ? (
                                      <>{item.customerName}</>
                                    ) : null} 
                                    {item.contact ? (
                                      <>{item.contact}</>
                                    ) : null}        

                   </div>


        
     
  
                   
                   
                                <div className=" flex  w-[5.9rem] ml-3 max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-poppins max-sm:hidden">Assigned On</div> */}
                                    <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                    <span>{` ${dayjs(item.assignedOn).format("ll")}`}</span>
                                    </div>
                                </div>
                      
                         </div>

  
                         <div class="flex  max-sm:justify-end max-sm:w-wk items-center">  
                  
                   <div class="flex flex-col w-[10.2rem] max-xl:w-[7.2rem] max-lg:w-[6.2rem] justify-center  max-sm:flex-row max-sm:w-auto">
                   <div class="w-36 max-sm:w-auto">
  {item.taskType === "Prospect To Customer" ? (
    <>
       <Tooltip title="Qualify? Prospect will move to Customer section!">
        <ConnectWithoutContactIcon
          onClick={() => {
            handleRowData(item)
            props.handleProspectConfirmationModal(true);
          }}
          className="!text-lg cursor-pointer text-[blue]"
        />
      </Tooltip>
    </>
  ) : (
    <>
      {item.filterTaskInd === true && item.approvedInd === "Pending" ? (
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
          {item.filterTaskInd === true && item.approvedInd === "Approved" ? (
            <CheckCircleIcon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#52c41a"
              size={140}
              className="!text-2xl cursor-pointer text-[green]"
             
            />
          ) : item.filterTaskInd === true && item.approvedInd === "Rejected" ? (
            <CloseCircleOutlined
              type="close-circle"
              theme="twoTone"
              twoToneColor="red"
              size={140}
              className="!text-2xl cursor-pointer text-[red]"
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  )}
</div>

</div>

                          
                    
<div class="flex flex-col w-[1.2rem] justify-center  max-sm:flex-row max-sm:w-auto">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  handleSetTaskNameId(item);
                }}
                className="!text-icon cursor-pointer text-green-600 "
              />
           </Tooltip>
  
            </div>
                   
                   </div>  

                            </div>
                        </div>


                    )
                })}
                    </InfiniteScroll>
      </div>
      <Suspense fallback={<BundleLoader />}>
      <UpdateTaskModal
          updateTaskModal={updateTaskModal}
          handleUpdateTaskModal={handleUpdateTaskModal}
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
<AddConfirmProspectStatusModal
handleRowData={handleRowData}
handleProspectConfirmationModal={props.handleProspectConfirmationModal}
addProspectConfirmationModal={props.addProspectConfirmationModal}
rowdata={rowdata}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/>
</Suspense>

</>
);
   

};
  const mapStateToProps = ({ auth, task, opportunity }) => ({
    userDetails: auth.userDetails,
    addDrawerTaskNotesModal: task.addDrawerTaskNotesModal,
    userId: auth.userDetails.userId,
    addProspectConfirmationModal:task.addProspectConfirmationModal,
    approvalTaskTable:task.approvalTaskTable,
    employeeId: auth.userDetails.employeeId,
    addDrawerTaskProjectModal: task.addDrawerTaskProjectModal,
    updateTaskModal: task.updateTaskModal,
    pageCount: task.approvalTaskTable.length && task.approvalTaskTable[0].pageCount || "",
    fetchingApproveTaskTable: task.fetchingApproveTaskTable,
    fetchingApproveTaskTableError: task.fetchingApproveTaskTableError,
noOfPages:task.approvalTaskTable.length && task.approvalTaskTable[0].noOfPages
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getAprrovalTaskTable,
        handleProspectConfirmationModal,
        handleTaskProjectDrawerModal,
        deleteTask,
        handleTaskNotesDrawerModal,
        approveTaskByTaskId,
        rejectTaskByTaskId,
        setEditTask,
        handleUpdateTaskModal,
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(TaskApproveTable);
   
    function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
          size = "1.875em";
        } else {
          size = "1em";
        }
        return (
          <Tooltip title={tooltip}>
            <Button
              ghost={status !== type}
              style={{
                padding: "0.375em",
                borderColor: "transparent",
                color: type === "Completed" ? "green" : "orange",
              }}
              onClick={onClick}
            >
              <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
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

