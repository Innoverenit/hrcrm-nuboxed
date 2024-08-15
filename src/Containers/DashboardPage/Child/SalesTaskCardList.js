import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs,Tooltip,Button } from 'antd';
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import StageTaskColumns1 from "../../DashboardPage/Child/StageTaskColumns1"
import styled from "styled-components";
import {getRegionTaskList,updateTaskdragstage} from "../RegionalDashAction"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { MultiAvatar, } from "../../../Components/UI/Elements";
import { BundleLoader } from '../../../Components/Placeholder';
import RegionSalesDrag from './RegionSalesDrag';
import TocIcon from '@mui/icons-material/Toc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;
const SalesTaskCardList = (props) => {
  const data = [
    {
      task: "test1",
      endDate: "2024-04-10T09:42:05Z"
    },
    {
      task: "test2",
      endDate: "2024-04-25T09:42:05Z"
    }
  ];
 
  const [showSmileCard, setShowSmileCard] = useState(true);
  const [showHeartCard, setShowHeartCard] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    // props.getRegionTaskList("EMP16818052295222021","Sales Plan","Q1",currentYear)
    props.getRegionTaskList(props.rowdata.employeeId,"Sales Plan",props.tabKey,currentYear)
  }, []);



 
  if (props.fetchingRegionalTaskList) return <BundleLoader/>;

 
  
  // function dragUpdate() {
  //   setIsDragging(false);
  // }


  // const getWeekStartDate = (weekNumber) => {
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const januaryFirst = new Date(currentYear, 0, 1);
  //   const firstDayOfYear = januaryFirst.getDay() || 7; // Adjust for Sunday being 0
  //   const startDate = new Date(currentYear, 0, (weekNumber - 1) * 7 + 1 - firstDayOfYear);
    
  //   return startDate; 
   

  // };
  

 

  const handleHeartClick = () => {
    setShowHeartCard(true);
    setShowSmileCard(false);
  };
  const handleSmileClick = () => {
    setShowSmileCard(true);
    setShowHeartCard(false);
  };

  
  return (
    <>
    <div>
    <CalendarMonthIcon
                  type="environment"
                  style={{                   
                    fontSize: "1.2em",
                    margin: "0px 0.68em 0.42rem",
                    placeSelf: "center",
                  }}
                  onClick={handleHeartClick}
                />
    <TocIcon
                  type="environment"
                  style={{                   
                    fontSize: "1.2em",
                    margin: "0px 0.68em 0.42rem",
                    placeSelf: "center",
                  }}
                  onClick={handleSmileClick}
                />
                  
    </div>
    


{showHeartCard && (
  <RegionSalesDrag
  regionAllTaskList={props.regionAllTaskList}
  rowdata={props.rowdata}
  tabKey={props.tabKey}
  />
)}

{showSmileCard && (
          <div className=' flex justify-end sticky top-28 z-auto'>
          <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[10.5rem]">
          <FormattedMessage
                          id="app.type"
                          defaultMessage="types"
                        />
                        </div>
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
                              <div className="md:w-24"><FormattedMessage
                          id="app.Info"
                          defaultMessage="Info"
                        /></div>
        <div className="md:w-[6.2rem]"><FormattedMessage
                          id="app.assignedto"
                          defaultMessage="assignedto"
                        /></div>
        <div className="md:w-[6.5rem]"><FormattedMessage
                          id="app.owner"
                          defaultMessage="owner"
                        /></div>
  
        <div className="md:w-[3%]"></div>
        <div className="md:w-[5%]"></div>
        <div className="w-12"></div>
        <div className="w-12"></div>
        {/* <div className="w-12"></div> */}
      </div>
      <div class="h-[60vh] overflow-auto">
      {props.regionAllTaskList.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        const incompleteDeviationDate = endDate.diff(currentDate, 'days');
        const completeDeviation = endDate.diff(completionDate, 'days');

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
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs  font-poppins cursor-pointer">                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium justify-center flex-col  md:w-32 max-sm:flex-row w-full ">
                                    {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs  font-semibold  font-poppins">   
                                    <span   
                // onClick={() => {
                //   props.handleTaskopenModal(true);               
                //   handleSetCurrentProcessName(item)
                //   // this.props.setCurrentOpportunityRecruitMentData(item);
                // }}
                className="cursor-pointer text-[#042E8A]"
                          
               >

                 {`${item.taskName} `} &nbsp;


               </span>
                                    </div>
                                </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-24 max-sm:flex-row  w-full ">
                       
                      
                       <div class="text-xs  font-poppins"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                   
                    <div class=" w-[4rem]">
                     
                     <ButtonGroup >
                     {item.complitionStatus === "To Start" && ( 
           <StatusIcon
   type="To Start"
   iconType="fa-hourglass-start"
   tooltip="To Start"
   status={item.taskStatus}
   difference={difference} 
  //  onClick={() =>
  //    linkTaskStatus(item.taskId, {
  //      taskStatus: "To Start",
  //    })
  //  }
 />
          )}
 
 
           {item.complitionStatus === "In Progress" && (
             <StatusIcon
               type="In Progress"
               iconType="fa-hourglass-half"
               tooltip="In Progress"
               status={item.taskStatus}
               difference={difference}
              //  onClick={() =>
              //    linkTaskStatus(item.taskId, {
              //      //  ...item,
              //       taskStatus: "In Progress",
              //    })
              //  }
             />
          )} 
           {item.complitionStatus === "completed" && (
             <StatusIcon
               type="Completed"
               iconType="fa-hourglass"
               tooltip="Completed"
               status={item.taskStatus}
               difference={difference}
              //  onClick={() =>
              //    linkTaskStatus(item.taskId, {
              //      //  ...item,
              //       taskStatus: "Completed",
              //    })
              //  }
             />
          )}
         </ButtonGroup>
         <div></div>
                         </div>
                    <div className="flex font-medium flex-col md:w-[4rem] max-sm:flex-row  w-full ">
                       
                       {/* <div class="text-sm  font-poppins max-sm:hidden">Deviation</div> */}
                       <div class="text-xs  font-poppins"> 
                       {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}
                   </div>
                     
                   </div>

                   <div className="flex font-medium flex-col md:w-[7rem] max-sm:flex-row  w-full ">
                       
                      
                       <div class="text-xs  font-poppins"> 
                        {`${item.customerName} ${item.contact} ${item.opportunityName}`}</div>
                   </div>
                    <div className=" flex font-medium flex-col md:w-[4.2rem] max-sm:flex-row justify-between w-full ">
                                  {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                                  <div class="text-xs  font-poppins mb-2">
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
                        
                    <div class="flex max-sm:mt-4 w-[15rem]">
                                <div className=" flex font-medium flex-col  md:w-24 max-sm:flex-row justify-between w-full ">
                                    
                                    <div class="text-xs  font-poppins mb-2">
                                    <MultiAvatar
                                   
                  primaryTitle={item.submittedBy}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                               
                               
                       
 
                       
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



 
  
                   </div>
               

                            </div>
                        </div>


                    )
                    
                })}
               </div> 
      </div>
</div>
    )}

      {/* AddTaskProjectDrawerModal and AddTaskNotesDrawerModal components go here */}
    </>
  );
};



const mapStateToProps = ({ auth,
    dashboardRegional }) => ({
      fetchingRegionalTaskList:dashboardRegional.fetchingRegionalTaskList,
        regionAllTaskList:dashboardRegional.regionAllTaskList,
  userId:auth.userDetails.userId,

 
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getRegionTaskList,
        updateTaskdragstage
       

    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SalesTaskCardList);

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







const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  border-bottom: 0.06em solid lightgrey;
  // position: absolute;
height:26rem;
  // overflow-x: auto;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;




















