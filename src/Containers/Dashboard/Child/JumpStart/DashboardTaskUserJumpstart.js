import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import {
  getDateWiseList, getSalesDateWiseList, getJumpBulblist, getJumpBulblist2,
  getJumpBulblist3, getavgHour, getJumpTasklist, getTasklist, getJumpTask2list
} from "../../DashboardAction";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import axios from 'axios'; 
import {base_url} from "../../../../Config/Auth"; 

const DashboardTaskUserJumpstart = (props) => {
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
    // fetchingDatewiseReport, 
    fetchingSalesDatewiseReport, 
    fetchingAvgHour, 
    // fetchingTaskper, 
    // taskperCount, 
    avgHour, 
    leaveFetching 
  } = props;
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
          '70', // 'calls', // 2
          '35', // 3
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

  const formattedDate = dayjs(dateOfJoining).format('DD-MM-YYYY');
  

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

  useEffect(() => {
    if (
      props.startDate !== startDate ||
      props.endDate !== endDate
    ) {
      const start = `${startDate.format('YYYY-MM-DD')}T20:00:00Z`;
      const end = `${endDate.format('YYYY-MM-DD')}T20:00:00Z`;

      if (props.role === 'USER' && props.user.department === 'Recruiter') {
        props.getDateWiseList(props.recruiterId, start, end);
      } 
      // else {
      //   props.getSalesDateWiseList(props.orgId, start, end);
      // }
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
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-green-600">< FactCheckIcon className=" text-white"/></div>
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
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600">< FactCheckIcon className=" text-white"/></div>
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
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><VolumeUpIcon className="text-white"/></div>
                               </div>
                               <JumpStartBox
            noProgress
            title={translatedMenuItems[2]}
            bgColor="linear-gradient(270deg,#F15753,orange)"
            value={`${data2.TodayCompletedCall}`}
            isLoading={loading2 || loading4}
          />
                           </div>
                       </div>
                   
                   </div> 
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-blue-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-blue-600"><EventAvailableIcon className="text-white"/></div>
                               </div>
                               <JumpStartBox
            noProgress
            title={translatedMenuItems[3]}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskUserJumpstart);
