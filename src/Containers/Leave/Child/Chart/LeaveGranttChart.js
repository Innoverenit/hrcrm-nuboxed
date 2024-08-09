import React, { useEffect } from "react";
import { Gantt} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";



function LeaveGranttChart(props){
    useEffect(()=>{
        // props.getTasksListByOpportunityId(
        //     props.opportunity.opportunityId
        //   );
    },[])
    // let tasks=props.tasksListByOpportunityId.length && props.tasksListByOpportunityId.map((item)=>{
    //   const startYear=dayjs(item.creationDate).format("YYYY")
    //   const startMonth=dayjs(item.creationDate).format("MM")
    //   const startDate=dayjs(item.creationDate).format("DD")
    //   const endYear=dayjs(item.creationDate).format("YYYY")
    //   const endMonth=dayjs(item.creationDate).format("MM")
    //   const endDate=dayjs(item.creationDate).format("DD")
    //   let startYearInt=Number(startYear);
    // let startMonthInt=Number(startMonth)
    // let startDateInt=Number(startDate)
    // let endYearInt=Number(endYear)
    // let endMonthInt=Number(endMonth)
    // let endDateInt=Number(endDate)


    // if(item.taskHistory.assignedDate){
    //   const startYear=dayjs(item.taskHistory.assignedDate).format("YYYY")
    //   const startMonth=dayjs(item.taskHistory.assignedDate).format("MM")
    //   const startDate=dayjs(item.taskHistory.assignedDate).format("DD")

    //   startYearInt=Number(startYear)
    //   startMonthInt=Number(startMonth)
    //   startDateInt=Number(startDate)


    //   const addDate=dayjs(item.taskHistory.assignedDate).add(item.unit,'days')
    //   const endYear=dayjs(addDate).format("YYYY")
    //   const endMonth=dayjs(addDate).format("MM")
    //   const endDate=dayjs(addDate).format("DD")
    //    endYearInt=Number(endYear)
    //    endMonthInt=Number(endMonth)
    //    endDateInt=Number(endDate)

    // }else if(item.taskHistory.inProgressDate){
    //   const startYear=dayjs(item.taskHistory.inProgressDate).format("YYYY")
    //   const startMonth=dayjs(item.taskHistory.inProgressDate).format("MM")
    //   const startDate=dayjs(item.taskHistory.inProgressDate).format("DD")

    //   startYearInt=Number(startYear)
    //   startMonthInt=Number(startMonth)
    //   startDateInt=Number(startDate)


    //   const addDate=dayjs(item.taskHistory.inProgressDate).add(item.unit,'days')
    //   const endYear=dayjs(addDate).format("YYYY")
    //   const endMonth=dayjs(addDate).format("MM")
    //   const endDate=dayjs(addDate).format("DD")
    //    endYearInt=Number(endYear)
    //    endMonthInt=Number(endMonth)
    //    endDateInt=Number(endDate)


    // }else{
    //   const startYear=dayjs(item.creationDate).format("YYYY")
    //   const startMonth=dayjs(item.creationDate).format("MM")
    //   const startDate=dayjs(item.creationDate).format("DD")
    //    startYearInt=Number(startYear)
    //    startMonthInt=Number(startMonth)
    //    startDateInt=Number(startDate)

    //    const endYear=dayjs(item.creationDate).format("YYYY")
    //   const endMonth=dayjs(item.creationDate).format("MM")
    //   const endDate=dayjs(item.creationDate).format("DD")
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
    
      <div class="rounded bg-white m-4 p-2 w-full overflow-auto  boxShadow: '4px 0px 9px 3px rgba(163, 171, 185, 0.5)'  ">
        <Gantt tasks={tasks}/>
        </div> 
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
