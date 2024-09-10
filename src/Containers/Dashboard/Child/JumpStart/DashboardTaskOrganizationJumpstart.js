
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import {
  getDateWiseList, getSalesDateWiseList, getJumpBulblist, getJumpBulblist2,
  getJumpBulblist3, getavgHour, getJumpTasklist, getTasklist, getJumpTask2list
} from "../../DashboardAction";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";

// class DashboardTaskOrganizationJumpstart extends React.Component {
//   constructor() {
//     super();
//     const startDate = dayjs().startOf("month");
//     const endDate = dayjs();
//     var today = new Date(),
//       date =
//         today.getFullYear() +
//         "-" +
//         (today.getMonth() + 1) +
//         "-" +
//         today.getDate();

//     this.state = {
//       date: date,
//       startDate,
//       endDate,
//       translatedMenuItems: [],
//       loading: true
//     };
//   }

//   componentDidMount() {

//     if (this.props.role === "USER" && this.props.user.department === "Recruiter") {
//       const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
//       const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
//       const { getDateWiseList, recruiterId, } = this.props;
//       getDateWiseList(recruiterId, startDate, endDate);
//     } else {
//       const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
//       const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
//       const { getSalesDateWiseList, orgId } = this.props;
//       getSalesDateWiseList(orgId, startDate, endDate);
//     }

//   }
//   async fetchMenuTranslations() {
//     try {
//       this.setState({ loading: true });
//       const itemsToTranslate = [
//         '31',//'Open Tasks', // 0
//          '1477',//'Deadline', // 1
//          '1476',//'High Priority Tasks', // 2
//          '142', // 3


//       ];
//       const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
//       this.setState({ translatedMenuItems: translations ,loading: false});
     
//     } catch (error) {
//       this.setState({ loading: false });
//       console.error('Error translating menu items:', error);
//     }
//   }
//   componentWillReceiveProps(nextProps) {
//     if (
//       this.props.startDate !== nextProps.startDate ||
//       this.props.endDate !== nextProps.endDate
//     ) {
//       if (this.props.role === "USER" && this.props.user.department === "Recruiter") {
//         const { getDateWiseList, recruiterId, startDate, endDate } = nextProps;
//         getDateWiseList(recruiterId, startDate, endDate);
//       } else {
//         const { getSalesDateWiseList, orgId, startDate, endDate } = nextProps;
//         getSalesDateWiseList(orgId, startDate, endDate);
//       }

//     }
//   }
//   componentDidMount() {
//     const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
//     const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
//     // this.props.getJumpBulblist(this.props.userId,startDate, endDate);
//     // this.props.getJumpBulblist2(this.props.userId,startDate,endDate);
//     this.props.getTasklist(this.props.userId);
//     this.props.getJumpTasklist(this.props.userId, startDate, endDate);
//     this.props.getJumpTask2list(this.props.userId, startDate, endDate);
//   }

//   render() {
//     const { showDatelist, fetchingDatewiseReport } = this.props;
//     const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
//     const { activeKey, loading, translatedMenuItems } = this.state;

//     // if (loading) {
//     //   return <div><BundleLoader/></div>;
//     // } 
//     return (
//       <div class=" flex flex-row w-full" >
//         <div class=" flex w-full max-sm:flex-col" >
//           <div class="flex w-1/2">
//             <JumpStartBox
//               bgColor="linear-gradient(270deg,#F15753,orange)"
//               noProgress
//                  title= {translatedMenuItems[0]}
//               // {<FormattedMessage
//               // //   id="app.openTasks"
//               // //   defaultMessage="Open Tasks"
//               // // />}


//               value={this.props.taskperCount.totalTask}
//               isLoading={this.props.fetchingTaskper}
//             />

//             <JumpStartBox
//               bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
//               noProgress
//               title={translatedMenuItems[1]}
//               // {<FormattedMessage
//               //   id="app.tasksDeadline"
//               //   defaultMessage="Tasks > Deadline"
//               // />}
//               // title="Tasks > Deadline"
//               value={this.props.jumpstartTask2listCount.no}
//               isLoading={this.props.fetchingJumpstartTask2list}


//             />
//           </div>
//           <div class="flex w-1/2">
//             <JumpStartBox
//               bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
//               noProgress
//               title={translatedMenuItems[2]}
//               // {<FormattedMessage
//               //   id="app.highPriorityTasks"
//               //   defaultMessage="High Priority Tasks"
//               // />}
//               // title="High Priority Tasks"
//               value={this.props.jumpstartTasklistCount.no}
//               isLoading={this.props.fetchingJumpstartTasklist}
//             />
//             <JumpStartBox
//               bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
//               noProgress
//               title={translatedMenuItems[3]}
//               // {<FormattedMessage
//               //   id="app.status"
//               //   defaultMessage="Status"
//               // />}
//             // title="Status"
//             // value={this.props.jumpstartBulb3Count.junkedLeadsList}

//             // isLoading={this.props.fetchingJumpstartBulb3}
//             />
//           </div>
//         </div>


//       </div>

//     );
//   }
// }

const DashboardTaskOrganizationJumpstart = (props) => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  });

  const [startDate, setStartDate] = useState(dayjs().startOf('month'));
  const [endDate, setEndDate] = useState(dayjs());
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = `${startDate.format('YYYY-MM-DD')}T20:00:00Z`;
    const end = `${endDate.format('YYYY-MM-DD')}T20:00:00Z`;

    if (props.role === 'USER' && props.user.department === 'Recruiter') {
      props.getDateWiseList(props.recruiterId, start, end);
    } else {
      props.getSalesDateWiseList(props.orgId, start, end);
    }

    // Fetch initial task lists
    props.getTasklist(props.userId);
    props.getJumpTasklist(props.userId, start, end);
    props.getJumpTask2list(props.userId, start, end);

  }, [props.userId, startDate, endDate]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true);
        const itemsToTranslate = [
          '31', // 'Open Tasks', // 0
          '1477', // 'Deadline', // 1
          '1476', // 'High Priority Tasks', // 2
          '142', // 3
        ];
        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuTranslations();
  }, [props.translateText, props.selectedLanguage]);

  useEffect(() => {
    if (
      props.startDate !== startDate ||
      props.endDate !== endDate
    ) {
      const start = `${startDate.format('YYYY-MM-DD')}T20:00:00Z`;
      const end = `${endDate.format('YYYY-MM-DD')}T20:00:00Z`;

      if (props.role === 'USER' && props.user.department === 'Recruiter') {
        props.getDateWiseList(props.recruiterId, start, end);
      } else {
        props.getSalesDateWiseList(props.orgId, start, end);
      }
    }
  }, [props.orgId, startDate, endDate]);

  const { showDatelist, fetchingDatewiseReport, taskperCount, fetchingTaskper, jumpstartTask2listCount, fetchingJumpstartTask2list, jumpstartTasklistCount, fetchingJumpstartTasklist } = props;

  // if (loading) {
  //   return <div><BundleLoader/></div>;
  // }

  return (
    <div  class="flex flex-col" >
    <div class="flex  w-full" >
        
         
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={translatedMenuItems[0]}
              value={taskperCount.totalTask}
              isLoading={fetchingTaskper}
            />
                           </div>
                       </div>
                   
                   </div> 
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-pink-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
              bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={translatedMenuItems[1]}
              value={jumpstartTask2listCount.no}
            isLoading={fetchingJumpstartTask2list}
            />
                           </div>
                       </div>
                   
                   </div> 
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
              bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={translatedMenuItems[2]}
              value={jumpstartTasklistCount.no}
              isLoading={fetchingJumpstartTasklist}
            />
                           </div>
                       </div>
                   
                   </div> 
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-blue-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-blue-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
              bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={translatedMenuItems[3]}

            />
                           </div>
                       </div>
                   
                   </div>
        </div>
          </div>
   
  );
};

const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  showDatelist: dashboard.showDatelist,
  orgId: auth.userDetails.organizationId,
  showSalesDatelist: dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport: dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError: dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport: dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError: dashboard.fetchingDatewiseReportError,
  recruiterId: auth.userDetails.userId,
  fetchingTaskper: dashboard.fetchingTaskper,
  userId: auth.userDetails.employeeId,
  jumpstartBulbCount: dashboard.jumpstartBulbCount,
  jumpstartBulb2Count: dashboard.jumpstartBulb2Count,
  jumpstartBulb3Count: dashboard.jumpstartBulb3Count,
  fetchingJumpstartBulb: dashboard.fetchingJumpstartBulb,
  fetchingJumpstartBulb2: dashboard.fetchingJumpstartBulb2,
  fetchingJumpstartBulb3: dashboard.fetchingJumpstartBulb3,
  fetchingJumpstartTasklist: dashboard.fetchingJumpstartTasklist,
  jumpstartTasklistCount: dashboard.jumpstartTasklistCount,
  taskperCount: dashboard.taskperCount,
  fetchingJumpstartTask2list: dashboard.fetchingJumpstartTask2list,
  jumpstartTask2listCount: dashboard.jumpstartTask2listCount,

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getDateWiseList,
  getSalesDateWiseList,
  getJumpBulblist,
  getavgHour,
  getJumpBulblist2,
  getJumpBulblist3,
  getJumpTasklist,
  getTasklist,
  getJumpTask2list
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskOrganizationJumpstart);
