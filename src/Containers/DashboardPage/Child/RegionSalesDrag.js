import React,{useEffect,useRef,useState} from 'react'
import dayjs from "dayjs";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Tabs,Tooltip,Button } from 'antd';
import {updateTaskdragstage} from "../RegionalDashAction"
import StageTaskColumns1 from "../../DashboardPage/Child/StageTaskColumns1"
const ButtonGroup = Button.Group;
function RegionSalesDrag(props) {
  // const data = [
  //   {
  //     id: 1,
  //     taskName: "test1",
  //     taskId:"3",
  //     endDate: "2024-04-18T20:42:05Z"
  //   },
  //   {
  //     id: 1,
  //     taskId:"2",
  //     taskName: "test9",
  //     endDate: "2024-04-17T20:42:05Z"
  //   },
  //   {
  //     id: 2,
  //     taskName: "test2",
  //     taskId:"1",
  //     endDate: "2024-04-25T09:42:05Z"
  //   }
  // ];

    // const tasks=props.regionAllTaskList
    //const tasks=data
    const[tasks,setTasks]=useState(props.regionAllTaskList)
    console.log("tasks",tasks)
    const numberOfWeeks=4
    const [weeks, setWeeks] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    useEffect(() => {
      if (
        props.regionAllTaskList !== undefined 
        
      ) {
        setTasks(props.regionAllTaskList);
       
        
        // Perform a null check before accessing substring
       
      }
    }, [props.regionAllTaskList ]);
    useEffect(() => {
        const getCurrentWeekNumber = () => {
          const currentDate = new Date();
          const currentWeekNumber = Math.ceil(
            (currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 604800000
          );
          return currentWeekNumber;
        };
    
        const generateWeekNumbers = () => {
          const currentWeekNumber = getCurrentWeekNumber();
          const weekNumbers = [];
    
          for (let i = 0; i < numberOfWeeks; i++) {
            weekNumbers.push(currentWeekNumber + i);
          }
    
          setWeeks(weekNumbers);
        };
    
        generateWeekNumbers();
      }, [numberOfWeeks]);
    function onDragEnd(result) {
        console.log(result);
        setIsDragging(false);
    
        if (!navigator.onLine) {
          return;
        }
    
        if (!result.destination) {
          return;
        }
    
        const { draggableId, destination, source } = result;
    
        if (
          source.droppableId === destination.droppableId &&
          source.index === destination.index
        ) {
          return;
        }
    
        const {
          updateTaskdragstage,
    
        } = props;
        let data={
          presentWeakStartDate:source.droppableId,
          targetWeakStartDate:destination.droppableId,
          taskId:draggableId,
          userId:props.userId,
          // opportunityStagesId:destination.droppableId,
          // opportunityId:result.draggableId,
        }
        const currentYear = new Date().getFullYear();
        updateTaskdragstage(data,props.rowdata.employeeId,"Sales Plan",props.tabKey,currentYear);
      }
      function dragStart() {
        setIsDragging(true);
      }
    const getWeekStartDate = (weekNumber) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const januaryFirst = new Date(currentYear, 0, 1);
        const firstDayOfYear = januaryFirst.getDay();
        const startDate = new Date(currentYear, 0, (weekNumber - 1) * 7 + 1 - (firstDayOfYear === 0 ? 6 : firstDayOfYear - 1));
        return startDate;
    };
    const getWeekEndDate = (weekNumber) => {
        const startDate = getWeekStartDate(weekNumber);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6); // 6 days later to get the end of the week
        return endDate;
      };
    const filterTasksForWeek = (weekNumber) => {
        const startDate = getWeekStartDate(weekNumber);
        const endDate = getWeekEndDate(weekNumber);
        return tasks.filter(task => {
          const taskEndDate = new Date(task.endDate);
          return taskEndDate >= startDate && taskEndDate <= endDate;
        });
      };
  return (
    <DragDropContext
    onDragEnd={onDragEnd}
   type="stages"
    onDragStart={dragStart}
 >
       <div>
         {/* <h2>Week Numbers</h2> */}
         <div style={{display:"flex"}}>
           {weeks.map((week, index) => {
             const startDate = getWeekStartDate(week);
             //const dayjs = require('dayjs-timezone');
             const originalDateString =startDate;
             const convertedDateString = dayjs(originalDateString).format('YYYY-MM-DD');
             const endDate = getWeekEndDate(week);
             const filteredTasks = filterTasksForWeek(week);
             //const formattedStartDate = startDate.toISOString().split('T')[0];
             const droppableId = `${convertedDateString+"T20:00:00Z"}`
             console.log("filter",filteredTasks)
             return (
               <div key={index} >
                 {/* <div style={{ textAlign: 'center' ,border:"1px solid black",  padding: '5px',
         margin: '5px',}}>
                   Week {week}
                 </div> */}
                   <Droppable
                           key={index}
                         //   droppableId={
                         // week
                         //   }
                         droppableId={droppableId}
                           // others={startDate}
                           type="stage"
                          
               //             data-start-date={startDate.toISOString()} // Convert to string for serialization
               // data-end-date={endDate.toISOString()}
                         
                         >
                           {(provided, snapshot) => (
                             <>
                 
                 
                  <StageHeader 
                 //  style={{ position: "absolute" }}
                  >
                                     <div>Week{week}</div>
                                     {/* <button>OverView</button> */}
                                     <div>
                                     </div>
                                   </StageHeader>
                                   <StageColumn
                                       ref={provided.innerRef}
                                       isDraggingOver={snapshot.isDraggingOver}
                                       {...provided.droppableProps}
                                       droppableProps={{ hello: "world" }}
                                       className="scrollbar"
                                       id="style-3"
 
                                     >
                 {filteredTasks.map((task, taskIndex) => (
                   
                     
                   // <div key={taskIndex} 
                   //   style={{ border: '1px solid gray', padding: '5px', margin: '5px' }}
                   //   >
                   //     {task.taskType} 
                   //     {/* - 
                   //     End Date: {task.endDate} */}
                   //   </div>
                       <StageTaskColumns1
                                               key={taskIndex}
                                               task={task}
                                               index={taskIndex}
                                               // history={props.history}
                                             />
 
                     
                     
                    
                     ))}
                     </StageColumn>
                     </>
                       )}
                       </Droppable>
                   
                 {/* <div style={{ marginLeft: '20px' }}> */}
                   {/* <div>
                     <strong>Start Date:</strong> {startDate.toLocaleDateString()}
                   </div>
                   <div>
                     <strong>End Date:</strong> {endDate.toLocaleDateString()}
                   </div> */}
                 {/* </div> */}
                 <div>
                
                 </div>
               </div>
             );
           })}
         </div>
       </div>
       
     </DragDropContext>
  )
}

const mapStateToProps = ({ auth,
  dashboardRegional }) => ({
    // fetchingRegionalTaskList:dashboardRegional.fetchingRegionalTaskList,
    //   regionAllTaskList:dashboardRegional.regionAllTaskList,
userId:auth.userDetails.userId,


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
      
      updateTaskdragstage
     

  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RegionSalesDrag);

// export default RegionSalesDrag


const StageHeader = styled.div`
  background-color: rgb(14, 149, 144);
  color: white;
  font-size: 0.93em;
  width: 250px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0.06em solid ${(props) => props.theme.backgroundColor};
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  /* position:fixed; */
`;



const StageColumn = styled.div`
  background-color: whitesmoke;
  color: ${(props) => props.theme.color};
  float: left;
  overflow-x: scroll;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 9rem;
  width: 250px;
  margin-top: 3.75em;
  overflow-y: auto;
  border-right: 0.06em solid #d2cfcf;
  /* background-color: ${(props) => props.theme.applicationBackground}; */
  /* color: ${(props) => props.theme.color}; */
  /* min-height: 43.12em; */
`;