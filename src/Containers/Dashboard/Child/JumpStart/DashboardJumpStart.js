import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { getleaveLeftSideDetails } from "../../../Leave/LeavesAction";
import { JumpStartBox } from "../../../../Components/UI/Elements";
import { getDateWiseList, getSalesDateWiseList, getTasklist, getavgHour } from "../../DashboardAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import axios from 'axios';
import {base_url} from "../../../../Config/Auth";

const DashboardJumpStart = (props) => {
  const [state, setState] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    startDate: dayjs().startOf("month"),
    endDate: dayjs(),
    translatedMenuItems: [],
    loading: true
  });
  const [error, setError] = useState(null);
  
  const { 
    role, 
    user, 
    getDateWiseList, 
    getSalesDateWiseList, 
    getTasklist, 
    getavgHour, 
    getleaveLeftSideDetails, 
    userId, 
    recruiterId, 
    orgId, 
    dateOfJoining, 
    fetchingDatewiseReport, 
    fetchingSalesDatewiseReport, 
    fetchingAvgHour, 
    fetchingTaskper, 
    taskperCount, 
    avgHour, 
    leaveFetching 
  } = props;

  useEffect(() => {
    const startDate = `${state.startDate.format("YYYY-MM-DD")}T20:00:00Z`;
    const endDate = `${state.endDate.format("YYYY-MM-DD")}T20:00:00Z`;

    if (role === "USER" && user.department === "Recruiter") {
      getDateWiseList(recruiterId, startDate, endDate);
    } else {
      getSalesDateWiseList(orgId, startDate, endDate);
    }

    getTasklist(userId);
    getavgHour(userId, startDate, endDate);
    getleaveLeftSideDetails(userId);

    console.log(`Start Date: ${state.startDate.format("ll")}`);
    console.log(`End Date: ${state.endDate.format("ll")}`);
  }, [role, user, recruiterId, orgId, userId, getDateWiseList, getSalesDateWiseList, getTasklist, getavgHour, getleaveLeftSideDetails, state.startDate, state.endDate]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const itemsToTranslate = [
          "Leave Balance",
          "Average work hours",
          "Open Tasks",
          "Joining Date"
        ];
        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setState((prevState) => ({
          ...prevState,
          translatedMenuItems: translations,
          loading: false
        }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false }));
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.translateText, props.selectedLanguage]);

  const formattedDate = dayjs(dateOfJoining).format('DD-MM-YYYY');
  const { loading, translatedMenuItems } = state;

  const [data1, setData1] = useState({});
  const [loading1, setLoading1] = useState(false);
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`${base_url}/call/record/count/List/user/${props.userId}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setData1(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };
    const [data2, setData2] = useState({});
    const [loading2, setLoading2] = useState(false);
      const fetchData2 = async () => {
        try {
          const response = await axios.get(`${base_url}/call/record/count/today/user/${userId}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData2(response.data);
          setLoading2(false);
        } catch (error) {
          setError(error);
          setLoading2(false);
        }
      };
      const [data3, setData3] = useState({});
      const [loading3, setLoading3] = useState(false);
        const fetchData3 = async () => {
          try {
            const response = await axios.get(`${base_url}/call/record/count/List/${orgId}`,{
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            });
            setData3(response.data);
            setLoading3(false);
          } catch (error) {
            setError(error);
            setLoading3(false);
          }
        };
        const [data4, setData4] = useState({});
        const [loading4, setLoading4] = useState(false);
          const fetchData4 = async () => {
            try {
              const response = await axios.get(`${base_url}/call/record/count/today/${orgId}`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              });
              setData4(response.data);
              setLoading4(false);
            } catch (error) {
              setError(error);
              setLoading4(false);
            }
          };
          const [data5, setData5] = useState({});
          const [loading5, setLoading5] = useState(false);
            const fetchData5 = async () => {
              try {
                const response = await axios.get(`${base_url}/event/record/count/today/user/${userId}`,{
                  headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                  },
                });
                setData5(response.data);
                setLoading5(false);
              } catch (error) {
                setError(error);
                setLoading5(false);
              }
            };
            const [data6, setData6] = useState({});
            const [loading6, setLoading6] = useState(false);
              const fetchData6 = async () => {
                try {
                  const response = await axios.get(`${base_url}/event/record/count/today/${orgId}`,{
                    headers: {
                      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                    },
                  });
                  setData6(response.data);
                  setLoading6(false);
                } catch (error) {
                  setError(error);
                  setLoading6(false);
                }
              };

    useEffect(()=>{
      if (props.timeRangeType === "today") {
        fetchData2();
        fetchData4();
        fetchData5();
        fetchData6();
    }
    else {
      fetchData1();
      fetchData3();
    }
    },[props.userId,props.startDate,props.endDate]);


  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <div className="flex flex-row w-full">
      <div className="flex w-full max-sm:flex-col">
      
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
            noProgress
            title="Calls"
            bgColor="linear-gradient(270deg,#F15753,orange)"
            value={`${data2.TodayCompletedCall}`}
            isLoading={loading2 || loading4}
          />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
            title={<FormattedMessage id="app.avHoursThisMonth" defaultMessage="Average work hours" />}
            value={`${avgHour.hours} avg hours / day`} 
            isLoading={fetchingAvgHour}
            
          />
                           </div>
                       </div>
                    
                   </div>  
         
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            noProgress
            title={<FormattedMessage id="app.openTasks" defaultMessage="Open Tasks" />}
            bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
            value={taskperCount.totalTask}
            isLoading={fetchingTaskper}
          />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
            noProgress
            title="Events"
            bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            value={`${data5.TodayCompletedEvent}`}
            isLoading={loading5}
          />
                          </div>
                      </div>
                     
                  </div>
       
      </div>
    </div>
  );
};

const mapStateToProps = ({ dashboard, auth, leave }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  leaveFetching: leave.leaveFetching,
  showDatelist: dashboard.showDatelist,
  orgId: auth.userDetails.organizationId,
  showSalesDatelist: dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport: dashboard.fetchingSalesDatewiseReport,
  fetchingDatewiseReport: dashboard.fetchingDatewiseReport,
  recruiterId: auth.userDetails.userId,
  fetchingTaskper: dashboard.fetchingTaskper,
  userId: auth.userDetails.employeeId,
  dateOfJoining: auth.userDetails && auth.userDetails.dateOfJoining,
  taskperCount: dashboard.taskperCount,
  avgHour: dashboard.avgHour,
  fetchingAvgHour: dashboard.fetchingAvgHour,
  timeRangeType:dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getDateWiseList,
  getSalesDateWiseList,
  getTasklist,
  getavgHour,
  getleaveLeftSideDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardJumpStart);



// import React, { } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import dayjs from "dayjs";
// import { getleaveLeftSideDetails } from "../../../Leave/LeavesAction"
// import { JumpStartBox, } from "../../../../Components/UI/Elements";
// import { getDateWiseList, getSalesDateWiseList, getTasklist, getavgHour, } from "../../DashboardAction";
// import { BundleLoader } from "../../../../Components/Placeholder";

// class DashboardJumpStart extends React.Component {
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

//   async fetchMenuTranslations() {
//     try {
//       this.setState({ loading: true });
//       const itemsToTranslate = [
//       "Leave Balance", // 0
// "Average work hours", // 1
// "Open Tasks", // 2
// "Joining Date", // 3

//       ];
//       const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
//       this.setState({ translatedMenuItems: translations ,loading: false});
     
//     } catch (error) {
//       this.setState({ loading: false });
//       console.error('Error translating menu items:', error);
//     }
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
//     this.props.getTasklist(this.props.userId)
//     this.props.getavgHour(this.props.userId, startDate, endDate);
//     this.props.getleaveLeftSideDetails(this.props.userId);
//     console.log(`Start Date: ${this.state.startDate.format("ll")}`);
//     console.log(`End Date: ${this.state.endDate.format("ll")}`);
//   }
//   //   useEffect(() => { 
//   //    props.getDateWiseList(props.recruiterId,props.startDate, props.endDate);
//   // }, [props.startDate, props.endDate, props.type]);

//   render() {
//     const formattedDate = dayjs(this.props.dateOfJoining).format('DD-MM-YYYY'); // Format the date as per your requirement
//     const { showDatelist, fetchingDatewiseReport } = this.props;
//     console.log(this.props.taskperCount)
//     const startDate = `${this.state.startDate.format('DD-MM-YYYY')}T20:00:00Z`
//     //   const endDate = new Date(this.state.endDate);

//     console.log(startDate)
//     console.log(this.state.endDate.format('DD-MM-YYYY'))

//     const {loading,translatedMenuItems } = this.state;
//     // if (loading) {
//     //   return <div><BundleLoader/></div>;
//     // } 
//     return (
//       <div class=" flex flex-row w-full" >
//         <div class="flex w-full max-sm:flex-col" >
//           <div class="flex w-1/2">
//             <JumpStartBox
//               noProgress
//               title= {translatedMenuItems[0]}
                        
//               // {
//               //   <FormattedMessage
//               //     id="app.leavebalance"
//               //     defaultMessage="Leave Balance"
//               //   />
//               // }
//               bgColor="linear-gradient(270deg,#F15753,orange)"

//               value={this.props.leaveFetching.leaveBalance}
//               // value={
//               //   this.props.user.department === "Recruiter"
//               //     ? this.props.showDatelist.openRequirement
//               //     : this.props.showSalesDatelist.openRequirement
//               // }
//               isLoading={
//                 this.props.user.department === "Recruiter"
//                   ? this.props.fetchingDatewiseReport
//                   : this.props.fetchingSalesDatewiseReport
//               }
//             />


//             <JumpStartBox
//               noProgress
//               bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"

//               title={
//                 <FormattedMessage
//                   id="app.avHoursThisMonth"
//                   defaultMessage="Average work hours"
//                 />
//               }
//               // title="AV hours this month  "
//               value={
//                 // this.props.user.department === "Recruiter"
//                 // ?this.props.showDatelist.openPosition
//                 // :this.props.showSalesDatelist.openPosition
//                 this.props.avgHour.hours
//               }
//               isLoading={this.props.fetchingAvgHour}
//             // isLoading={
//             //   this.props.user.department === "Recruiter"
//             //   ?this.props.fetchingDatewiseReport
//             //   :this.props.fetchingSalesDatewiseReport
//             // }
//             //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
//             />
//           </div>
//           {/* <JumpStartBox
//             noProgress
//             title="Profiles Submitted"
//             bgColor="linear-gradient(270.23deg, #00A843 0.19%, #1FD071 99.8%)"
//             value={this.props.showDatelist.taggedProfile}
//             isLoading={this.props.fetchingDatewiseReport}
//           /> */}
//           <div class="flex w-1/2">
//             <JumpStartBox
//               noProgress
//               // title="Open Tasks"
//               title={
//                 <FormattedMessage
//                   id="app.openTasks"
//                   defaultMessage="Open Tasks"
//                 />
//               }
//               bgColor="linear-gradient(270deg,#3db8b5,#41e196)"

//               //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
//               // value={this.props.showDatelist.selectted}
//               value={
//                 // this.props.user.department === "Recruiter"
//                 // ?this.props.showDatelist.selectted
//                 // :this.props.showSalesDatelist.selectted
//                 this.props.taskperCount.totalTask
//               }
//               isLoading={this.props.fetchingTaskper}
//             // isLoading={
//             //   this.props.user.department === "Recruiter"
//             //   ?this.props.fetchingDatewiseReport
//             //   :this.props.fetchingSalesDatewiseReport
//             // }

//             />
//             <JumpStartBox
//               noProgress
//               title={
//                 <FormattedMessage
//                   id="app.joiningDate"
//                   defaultMessage="Joining Date"
//                 />
//               }
//               bgColor="linear-gradient(270deg,#5786ea,#20dbde)"

//               // title="Joining Date"
//               // bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
//               value={formattedDate}
//               // value={this.props.showDatelist.onboarded}
//               // value={
//               //   this.props.dateOfJoining

//               //   // this.props.user.department === "Recruiter"
//               //   // ?this.props.showDatelist.onboarded
//               //   // :this.props.showSalesDatelist.onboarded
//               // }

//               // isLoading={this.props.fetchingDatewiseReport}
//               isLoading={
//                 this.props.user.department === "Recruiter"
//                   ? this.props.fetchingDatewiseReport
//                   : this.props.fetchingSalesDatewiseReport
//               }

//             />
//           </div>
//           {/* <JumpStartBox
//             noProgress
//             title="DashBoard6"
//             bgColor="linear-gradient(269.97deg, #FFFFFF 0.02%, #000000 0.03%)"
//           /> */}
//           {/* <JumpStartBox
//                     // jumpstartClick={
//                     //   subscriptionType === "PROFESSIONALPLUS"
//                     //     ? () => this.props.handleLifetimeModal(true)
//                     //     : null
//                     // }
//                     // cursorData={
//                     //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
//                     // }
//                     noProgress
//                     currencyType={currencyType}
//                     title="Won"
//                     bgColor="#4cc9f0"
//                 />
//                 <JumpStartBox
//                     // jumpstartClick={
//                     //   subscriptionType === "PROFESSIONALPLUS"
//                     //     ? () => this.props.handleLifetimeModal(true)
//                     //     : null
//                     // }
//                     // cursorData={
//                     //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
//                     // }
//                     noProgress
//                     currencyType={currencyType}
//                     title="Customers Added"
//                     bgColor="#92defe"
//                 /> */}
//         </div>

//         {/* <FlexContainer>
//           <JumpStartBox noProgress title="All Products" bgColor="#8791a1" />
//           <JumpStartBox noProgress title="Quantity On Hand" bgColor="#8791a1" />
//           <JumpStartBox
//             noProgress
//             title="Out of Stock Products"
//             bgColor="#8791a1"
//           />
//           <JumpStartBox noProgress title="Total Visitors" bgColor="#8791a1" />
//         </FlexContainer> */}
//       </div>

//     );
//   }
// }
// const mapStateToProps = ({ dashboard, auth, leave }) => ({
//   user: auth.userDetails,
//   role: auth.userDetails.role,
//   leaveFetching: leave.leaveFetching,
//   showDatelist: dashboard.showDatelist,
//   orgId: auth.userDetails.organizationId,
//   showSalesDatelist: dashboard.showSalesDatelist,
//   fetchingSalesDatewiseReport: dashboard.fetchingSalesDatewiseReport,
//   fetchingSalesDatewiseReportError: dashboard.fetchingSalesDatewiseReportError,
//   fetchingDatewiseReport: dashboard.fetchingDatewiseReport,
//   fetchingDatewiseReportError: dashboard.fetchingDatewiseReportError,
//   recruiterId: auth.userDetails.userId,
//   fetchingTaskper: dashboard.fetchingTaskper,
//   userId: auth.userDetails.employeeId,
//   dateOfJoining: auth.userDetails && auth.userDetails.dateOfJoining,
//   taskperCount: dashboard.taskperCount,
//   avgHour: dashboard.avgHour,
//   fetchingAvgHour: dashboard.fetchingAvgHour
// });

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   getDateWiseList,
//   getSalesDateWiseList,
//   getTasklist,
//   getavgHour,
//   getleaveLeftSideDetails
// }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(DashboardJumpStart);
