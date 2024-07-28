import React, { useEffect } from "react";
import { Gantt} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OnlyWrapCard1 from "../../../../Components/UI/Layout/OnlyWrapCard1";


function LeaveGranttChart(props){
    useEffect(()=>{
        // props.getTasksListByOpportunityId(
        //     props.opportunity.opportunityId
        //   );
    },[])
    // let tasks=props.tasksListByOpportunityId.length && props.tasksListByOpportunityId.map((item)=>{
    //   const startYear=moment(item.creationDate).format("YYYY")
    //   const startMonth=moment(item.creationDate).format("MM")
    //   const startDate=moment(item.creationDate).format("DD")
    //   const endYear=moment(item.creationDate).format("YYYY")
    //   const endMonth=moment(item.creationDate).format("MM")
    //   const endDate=moment(item.creationDate).format("DD")
    //   let startYearInt=Number(startYear);
    // let startMonthInt=Number(startMonth)
    // let startDateInt=Number(startDate)
    // let endYearInt=Number(endYear)
    // let endMonthInt=Number(endMonth)
    // let endDateInt=Number(endDate)


    // if(item.taskHistory.assignedDate){
    //   const startYear=moment(item.taskHistory.assignedDate).format("YYYY")
    //   const startMonth=moment(item.taskHistory.assignedDate).format("MM")
    //   const startDate=moment(item.taskHistory.assignedDate).format("DD")

    //   startYearInt=Number(startYear)
    //   startMonthInt=Number(startMonth)
    //   startDateInt=Number(startDate)


    //   const addDate=moment(item.taskHistory.assignedDate).add(item.unit,'days')
    //   const endYear=moment(addDate).format("YYYY")
    //   const endMonth=moment(addDate).format("MM")
    //   const endDate=moment(addDate).format("DD")
    //    endYearInt=Number(endYear)
    //    endMonthInt=Number(endMonth)
    //    endDateInt=Number(endDate)

    // }else if(item.taskHistory.inProgressDate){
    //   const startYear=moment(item.taskHistory.inProgressDate).format("YYYY")
    //   const startMonth=moment(item.taskHistory.inProgressDate).format("MM")
    //   const startDate=moment(item.taskHistory.inProgressDate).format("DD")

    //   startYearInt=Number(startYear)
    //   startMonthInt=Number(startMonth)
    //   startDateInt=Number(startDate)


    //   const addDate=moment(item.taskHistory.inProgressDate).add(item.unit,'days')
    //   const endYear=moment(addDate).format("YYYY")
    //   const endMonth=moment(addDate).format("MM")
    //   const endDate=moment(addDate).format("DD")
    //    endYearInt=Number(endYear)
    //    endMonthInt=Number(endMonth)
    //    endDateInt=Number(endDate)


    // }else{
    //   const startYear=moment(item.creationDate).format("YYYY")
    //   const startMonth=moment(item.creationDate).format("MM")
    //   const startDate=moment(item.creationDate).format("DD")
    //    startYearInt=Number(startYear)
    //    startMonthInt=Number(startMonth)
    //    startDateInt=Number(startDate)

    //    const endYear=moment(item.creationDate).format("YYYY")
    //   const endMonth=moment(item.creationDate).format("MM")
    //   const endDate=moment(item.creationDate).format("DD")
    //    endYearInt=Number(endYear)
    //    endMonthInt=Number(endMonth)
    //    endDateInt=Number(endDate)
    // }
      
      
      
    //    console.log(startYearInt,startMonthInt,startDateInt)
    //     return  {  
    //        start: new Date(startYearInt,startMonthInt,startDateInt),
    //         end: new Date(endYearInt,endMonthInt,endDateInt),
    //             name: item.taskSubject,
    //             id: item.taskId,
    //             type:'task',
    //             // progress: 45,
    //             isDisabled: true,
    //             styles: { progressColor: '#0093d7', progressSelectedColor: '#0093d7' }
    //             }          
    //     })
    let tasks= [
        {
          start: new Date(2020, 1, 1),
          end: new Date(2020, 1, 2),
          name: 'Idea',
          id: 'Task 0',
          type:'task',
          progress: 45,
          isDisabled: true,
          styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        },
        {
            start: new Date(2020, 3, 2),
            end: new Date(2020, 3, 3),
            name: 'Comics',
            id: 'Task 1',
            type:'task',
            progress: 35,
            isDisabled: true,
            styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
          },
          {
            start: new Date(2020, 2, 8),
            end: new Date(2020, 2, 12),
            name: 'Webinar',
            id: 'Task 2',
            type:'task',
            progress: 73,
            isDisabled: true,
            styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
          },
    ];

    return(
    
        <OnlyWrapCard1><Gantt tasks={tasks}/></OnlyWrapCard1> 
    )
}
const mapStateToProps = ({ auth }) => ({
  

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        // getTasksListByOpportunityId,
       
      },
      dispatch
    ); 
  export default connect(mapStateToProps, mapDispatchToProps)(LeaveGranttChart);
