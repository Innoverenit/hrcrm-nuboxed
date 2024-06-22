import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import TaskStatusToggle from "../Child/TaskStatusToggle";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { OnlyWrapCard } from '../../../Components/UI/Layout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddTaskProjectDrawerModal from "../Child/AddTaskProjectDrawerModal";
import { Tooltip, Input, Button, Avatar,FloatButton } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledPopconfirm, StyledTable } from "../../../Components/UI/Antd";
import { withRouter } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
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
import Highlighter from "react-highlight-words";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { MultiAvatar } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import AddConfirmProspectStatusModal from "./AddConfirmProspectStatusModal";

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
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
          {approvalTaskTable.map((item) => { 
        const currentDate = moment();
        const completionDate = moment(item.completionDate);
        const endDate = moment(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        const incompleteDeviationDate = currentDate.diff(endDate, 'days');
        const completeDeviation = completionDate.diff(endDate, 'days');
         console.log("difference",difference)
         console.log("deviationDate",incompleteDeviationDate)
                    return (
                        <div>
                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[13.3rem] max-xl:w-[10.3rem] max-lg:w-[10.3rem] max-sm:w-auto max-sm:flex-row justify-between ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
                      <div
                      class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[red]"
                      ></div>
                    )}
                    {item.priority === "Medium" && (
                      <div
                      class="rounded-[50%] h-[2rem] w-[2rem] bg-[orange]"
                      ></div>
                    )}
                    {item.priority === "Low" && (
                      <div
                      class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[teal]"
                      ></div>
                    )}
                    <div class=" w-1"></div>
          <div class=" flex w-[7.1rem] items-center max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs text-cardBody font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">                                       
                                            {item.taskType.substring(0, 20)}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium  items-center  w-[15.3rem] max-xl:w-[8.3rem] max-lg:w-[6.3rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm text-cardBody  font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                className="cursor-pointer text-[#042E8A]"        
               >
                 {`${item.taskName.substring(0, 20)} `} &nbsp;


               </span>
                                    </div>
                                </div>
                                </div>
               
                   
                        
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col  w-[5.35rem] max-xl:w-[4.35rem] max-lg:w-[3.35rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Submitted By</div> */}
                                    <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                    <MultiAvatar
                                    // style={{marginBottom:"0.25rem"}}
                  primaryTitle={item.ownerName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                                <div className="flex font-medium flex-col w-[4.23rem] max-xl:w-[4.23rem] max-lg:w-[3.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       
                     <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
  {item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-red-900 font-semibold">{completeDeviation} Days</span>) :
   (incompleteDeviationDate > 0 && <span className=" text-red-900 font-semibold">{incompleteDeviationDate} Days</span>)}
</div>
                     
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
                       <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                     <div className="flex font-medium  justify-between w-[16.6rem] max-xl:w-[10.23rem] max-lg:w-[6.23rem]  max-sm:flex-row  max-sm:w-auto ">
                     {item.customerName ? (
  <>{item.customerName}</>
) : null}
&nbsp;&nbsp;
{item.contact ? (
  <>{item.contact}</>
) : null}        

                   </div>


        
     
  
                   
                   
                                <div className=" flex font-medium flex-col  w-[5.9rem] ml-3 max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Assigned On</div> */}
                                    <div class="text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                    <span>{` ${moment(item.assignedOn).format("ll")}`}</span>
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
                className="!text-icon cursor-pointer text-[#green]"
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


//       <div class="flex flex-col md:w-40 justify-center  max-sm:flex-row w-full">
//       <div class=" w-36">
//       {item.filterTaskInd === true && item.approvedInd === "Pending"  ? (
// <>
// <div>
// <Button
// onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
// style={{ backgroundColor: "teal", color: "white" }}
// >
// <FormattedMessage id="app.approve" defaultMessage="Approve" />
// </Button>
// <Button
// style={{
// backgroundColor: "rgb(233, 79, 79)",
// color: "white",
// }}
// onClick={() => rejectTaskByTaskId(item.taskId)}
// >
// <FormattedMessage id="app.reject" defaultMessage="Reject" />
// </Button>
// </div>
// </>
// ) : (
// <>
// {  item.filterTaskInd === true && item.approvedInd === "Approved" ? (
// <CheckCircleOutlined
// type="check-circle"
// theme="twoTone"
// twoToneColor="#52c41a"
// size={140}
// style={{ fontSize: "1rem" }}
// />
// ) : item.filterTaskInd === true && item.approvedInd === "Rejected" ? (
// <CloseCircleOutlined
// type="close-circle"
// theme="twoTone"
// twoToneColor="red"
// size={140}
// style={{ fontSize: "1rem" }}
// />
// ) : (
// <></>
// )}
// </>
// )}
// </div>
// </div>



    //   {approvalTaskTable.map((item) => { 
        
    //     console.log("item",item.taskId)
    //                return (
    //                    <div>
    //                        <div className="flex justify-between mt-4 max-sm:flex-col"
    //                            style={{
    //                                borderBottom: "3px dotted #515050"
    //                            }}>
    //                                 <div class="flex">
    //                            <div className=" flex font-medium flex-col md:w-52 max-sm:flex-row w-full justify-between  ">
    // <div className="flex max-sm:w-full"> 
    // {item.priority === "High" && (
    //                  <div
    //                    style={{
    //                      borderRadius: "50%",
    //                      height: "2.1875em",
    //                      width: "2.1875em",
    //                      backgroundColor: "red",
    //                    }}
    //                  ></div>
    //                )}
    //                {item.priority === "Medium" && (
    //                  <div
    //                    style={{
    //                      borderRadius: "50%",
    //                      height: "2.1875em",
    //                      width: "2.1875em",
    //                      backgroundColor: "orange",
    //                    }}
    //                  ></div>
    //                )}
    //                {item.priority === "Low" && (
    //                  <div
    //                    style={{
    //                      borderRadius: "50%",
    //                      height: "2.1875em",
    //                      width: "2.1875em",
    //                      backgroundColor: "teal",
    //                    }}
    //                  ></div>
    //                )}
    //                <div class=" w-1"></div>
    //      <div class="max-sm:w-full">
    //                                    <Tooltip>
    //                                    <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
    //                                        <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
    //                                        Type
    //                                        </div>
    //                                        <div class="text-[sm] text-cardBody font-poppins cursor-pointer">                                       
    //                                        {item.taskType}
      
    //                                        </div>
    //                                    </div>
    //                                    </Tooltip>
    //                                    </div>
    //                                    </div>
    //                            </div>
    
    //                            <div className=" flex font-medium flex-col  md:w-36 max-sm:flex-row w-full justify-between ">
    //                                <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins max-sm:hidden"> Name </div>
    //                                <div class=" text-[sm] text-cardBody font-poppins">   
    //                                <span   
    //            onClick={() => {
    //              // props.handleTaskopenModal(true);               
    //              handleSetCurrentProcessName(item)
    //              // this.props.setCurrentOpportunityRecruitMentData(item);
    //            }}
    //            style={{
    //              cursor: "pointer",
    //              color: "#042E8A",
    //            }}          
    //           >
    
    //             {`${item.taskName} `} &nbsp;
    
    
    //           </span>
    //                                </div>
    //                            </div>
    //                            {/* <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
    //                                <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Customer</div>
    //                                <div class="text-[sm] text-cardBody font-poppins">
    //                                {item.customerName === null ? (
    //          ""
    //        ) : (
    //                                <MultiAvatar
    //              primaryTitle={item.customerName}
    //              imgWidth={"1.8rem"}
    //              imgHeight={"1.8rem"}
    //            />
    //            )}
    //                                </div>
    //                            </div> */}
    //                            </div>
    //                            <div class="flex">
    //                            <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
    //                                <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Submitted By</div>
    //                                <div class="text-[sm] text-cardBody font-poppins">
    //                                <MultiAvatar
    //              primaryTitle={item.submittedBy}
    //              imgWidth={"1.8rem"}
    //              imgHeight={"1.8rem"}
    //            />
    //                                </div>
    //                            </div>
    //                            {/* <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
    //                              <div class="text-[0.875rem] text-cardBody font-poppins">Assigned</div>
    //                              <div class="text-[sm] text-cardBody font-poppins">
    //                              {item.assignedToName === null ? (
    //          ""
    //        ) : (
    //          <MultiAvatar
    //            primaryTitle={item.assignedToName}
    //            imgWidth={"1.8em"}
    //            imgHeight={"1.8em"}
    //          />
    //        )}
    //                              </div>
    //                          </div> */}
    //                          <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
    //                              <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned On</div>
    //                              <div class="text-[sm] text-cardBody font-poppins">
    //                              <span>{` ${moment(item.assignedOn).format("ll")}`}</span>
    //                              </div>
    //                          </div>
    //                          </div>
    //                          <div class="flex">
    //                          <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                             
    //                              <div class="text-[sm] text-cardBody font-poppins">
    //                              <span>
    //        {item.filterTaskInd === true && item.approvedInd === "Pending"  ? (
    //          <>
    //            <div>
    //              <Button
    //                onClick={() => approveTaskByTaskId(item.taskId)}
    //                style={{ backgroundColor: "teal", color: "white" }}
    //              >
    //                {/* Approve */}
    //                <FormattedMessage
    //                  id="app.approve"
    //                  defaultMessage="Approve"
    //                />
    //              </Button>
    //              <Button
    //                style={{
    //                  backgroundColor: "rgb(233, 79, 79)",
    //                  color: "white",
    //                }}
    //                onClick={() => rejectTaskByTaskId(item.taskId)}
    //              >
    //                {/* Reject */}
    //                <FormattedMessage
    //                  id="app.reject"
    //                  defaultMessage="Reject"
    //                />
    //              </Button>
    //            </div>
    //          </>
    //        ) :  (
    //          <>
    //            {  item.filterTaskInd === true && item.approvedInd === "Approved" ? (
    //              <CheckCircleOutlined
    //                type="check-circle"
    //                theme="twoTone"
    //                twoToneColor="#52c41a"
    //                size={140}
    //                style={{ fontSize: "1rem" }}
    //              />
    //            ) : item.filterTaskInd === true && item.approvedInd === "Rejected" ? (
    //              <CloseCircleOutlined
    //                type="close-circle"
    //                theme="twoTone"
    //                twoToneColor="red"
    //                size={140}
    //                style={{ fontSize: "1rem" }}
    //              />
    //            ) : (
    //              <></>
    //            )}
    //          </>
    //        )}
    //      </span>
    //                              </div>
    //                          </div>
    
    
              
    //                <div class="flex flex-col w-[2%]">
    //   <div>
    //   <NoteAltIcon
    //            onClick={() => {
    //              handleTaskNotesDrawerModal(true);
    //              handleSetTaskNameId(item);
    //            }}
    //            style={{ color: "green", cursor: "pointer", fontSize: "0.8rem" }}
    //          />
    //   </div>
      
         
       
    //                  </div>    
    //                  </div>
    //                        </div>
    //                    </div>
    
    
    //                )
    //            })}