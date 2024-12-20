import React, { useState,lazy,useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Tooltip,  Button } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CategoryIcon from '@mui/icons-material/Category'
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
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setPage(page + 1);
    props.getAprrovalTaskTable(props.employeeId,page);
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
         "71", //  "Type",//0
          "110",  // "Name",//1
          "794" , // "Submitted By",//2
           "112" ,// "Ageing",//3
          "113" , // "Info",//5
           "76", // "Assigned On",//5
        

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
    addDrawerTaskNotesModal,
    handleTaskNotesDrawerModal,
    setEditTask,
    userDetails: { employeeId },
  } = props;

  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <>
      
          <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[85%]  p-1 bg-transparent font-bold sticky items-end text-xs font-poppins z-10">
                <div className="flex w-[2.5rem] truncate"></div>
          <div className="flex w-[13.7rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] max-lg:w-[16.1rem]">
             < MergeTypeIcon className='!text-icon text-[#c42847] '  />{translatedMenuItems[0]} 
           {/* type */}
                    </div>
        <div className="flex w-[15.2rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.2rem] max-lg:w-[8.2rem]">
        <CategoryIcon className='!text-base mr-1 text-[#e4eb2f]'/>{translatedMenuItems[1]} 
                        {/* name" */}
                      </div>
             <div className="flex  w-[11.2rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.2rem] max-lg:w-[6.2rem] ">{translatedMenuItems[2]} 
              {/* submittedby */}
                        </div>
        {/* <div className="flex justify-center w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.2rem] max-lg:w-[9.2rem]">{translatedMenuItems[3]} 
       Ageing
                        </div> */}
                         <div className="flex  w-[14.5rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.51rem] max-lg:w-[6.51rem]">{translatedMenuItems[4]} 
                          {/* Info */}
                          </div>
        <div className="flex  w-[13.23rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.23rem]">
        <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>  {translatedMenuItems[5]} On
          {/* Assigned On */}
                        </div>
       
       
</div>
<InfiniteScroll
        dataLength={approvalTaskTable.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingApproveTaskTable?<div class="flex justify-center" >Loading...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex  text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
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
                            <div className="flex rounded justify-between mt-1 bg-white  items-center py-ygap max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex  border-l-2 border-green-500 h-8 bg-[#eef2f9] w-[2.3rem] max-xl:w-[10.3rem] max-lg:w-[10.3rem] max-sm:w-auto max-sm:flex-row justify-between ">
<div className="flex max-sm:w-full ml-gap items-center"> 
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
                      </div>
                      </div>
          <div class=" flex w-[14.1rem]   justify-start h-8 ml-gap bg-[#eef2f9] items-center max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row  md:flex-col">
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs ml-gap font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">                                       
                                            {item.taskType.substring(0, 20)}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                     
                          

                                <div className=" flex   items-center h-8 ml-gap bg-[#eef2f9]  w-[15.3rem] max-xl:w-[8.3rem] max-lg:w-[6.3rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm   font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs ml-gap font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
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
                                <div className=" flex  w-[10.35rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.35rem] max-lg:w-[3.35rem] max-sm:flex-row  max-sm:w-auto ">
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
                                <div className="flex  text-xs w-[14.6rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[10.23rem] max-lg:w-[6.23rem]  max-sm:flex-row  max-sm:w-auto ">
                                  {item.customerName ? (
                                      <>{item.customerName}</>
                                    ) : null} 
                                    {item.contact ? (
                                      <>{item.contact}</>
                                    ) : null}        
                   </div>   
                               
                             </div>  
                       
                                                             
                                <div className=" flex  w-[7.9rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-poppins max-sm:hidden">Assigned On</div> */}
                                    <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                    <span>{` ${dayjs(item.assignedOn).format("YYYY-MM-DD")}`}</span>
                                    </div>
                                </div>
                                
                      
                       

  
                         <div class="flex  max-sm:justify-end max-sm:w-wk ">  
                  
                   <div class="flex flex-col w-[10.3rem]  items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.2rem] max-lg:w-[6.2rem] justify-center  max-sm:flex-row max-sm:w-auto">
                   <div class="w-[10rem] max-sm:w-auto">
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
             Approve
            </Button>
            <Button
              style={{
                backgroundColor: "rgb(233, 79, 79)",
                color: "white",
              }}
              onClick={() => rejectTaskByTaskId(item.taskId)}
            >
             Reject
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
            <HighlightOffIcon
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
<div className="flex w-[7.23rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.23rem] max-lg:w-[3.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
                       
                       <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                       <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{item.taskStatus === "Completed" ? (completeDeviation > 0 &&  <span className=" text-blue-900 font-semibold">{completeDeviation} Days</span>) :
                       (incompleteDeviationDate > 0 && <span className=" text-blue-900 font-semibold">
                        {incompleteDeviationDate} Days
                        
                        </span>)}
</span>
    
  </div>
                       
                     </div>                 
<div class="flex h-8 ml-gap bg-[#eef2f9] items-center justify-end   max-sm:flex-row max-sm:w-auto">
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

