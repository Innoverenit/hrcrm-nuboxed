import React, { useState, useEffect } from 'react';
import { Tabs,Spin,Button } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddReportAttendenceModal from "../ReportDetails/AddReportAttendenceModal"
import AddReportProductivityModal from "../ReportDetails/AddReportProductivityModal"
import {getReportsProductivity,getReportsAttendence,addReportsProductivity,addReportsAttendenceModal} from "../../ReportAction"
import {getlocation} from "../../../Event/Child/Location/LocationAction"

const { TabPane } = Tabs;


const WeekendDates = (props) => {
  const [dates, setDates] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [monday, setMonday] = useState(null);
  const [sunday, setSunday] = useState(null);
  const [userId, setUserId] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [startDateData, setStartDateData] = useState(null);
  console.log(startDateData)
  const locations = [
    { location: "Mumbai" },
    { location: "Delhi" },
    { location: "Kolkata" },
    { location: "Madras" }
  ];
  const users = [
    { 
      id: 1, 
      name: 'John Doe', 
      dto: [
        { date: "2024-05-27T18:30:00Z", totalTimeTaken: 4 },
        { date: "2024-05-28T18:30:00Z", totalTimeTaken: 3 },
        { date: "2024-05-29T18:30:00Z", totalTimeTaken: 2 },
      ],
    },
    { 
      id: 2,
      name: 'Jane Smith', 
      dto: [
        { date: "2024-05-27T18:30:00Z", totalTimeTaken: 9 },
        { date: "2024-05-28T18:30:00Z", totalTimeTaken: 6 },
        { date: "2024-05-29T18:30:00Z", totalTimeTaken: 6 },
      ],
    },
  ];

  const users2 = [
    { 
      id: 1, 
      name: 'John Doe', 
      dto: [
        { date: "2024-05-27T18:30:00Z", totalTimeSpend: 5 },
        { date: "2024-05-28T18:30:00Z", totalTimeSpend: 7 },
        { date: "2024-05-29T18:30:00Z", totalTimeSpend: 8 },
      ],
    },
    { 
      id: 2,
      name: 'Jane Smith', 
      dto: [
        { date: "2024-05-27T18:30:00Z", totalTimeSpend: 12 },
        { date: "2024-05-28T18:30:00Z", totalTimeSpend: 6 },
        { date: "2024-05-29T18:30:00Z", totalTimeSpend: 4 },
      ],
    },
  ];


  useEffect(() => {
   props.getlocation(props.orgId)
  
  
  }, [props.orgId]);
//   useEffect(() => {
//   if (activeTab) {
//     props.getReportsProductivity(activeTab,monday,sunday)
//     props.getReportsAttendence(activeTab,monday,sunday)
//   }
// }, [activeTab]);

useEffect(() => {
    const fetchData = async () => {
      if (activeTab) {
        setLoading(true);
        try {
          await 
         
          props.getReportsProductivity(activeTab,monday,sunday)
          props.getReportsAttendence(activeTab,monday,sunday)
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [activeTab]);


  useEffect(() => {
    calculateWeekend();
  }, [weekOffset]);

  const calculateWeekend = () => {
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7); // Adjust for week offset
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)

    const daysToMonday = (dayOfWeek + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    setMonday(monday.toISOString().split('T')[0] + 'T20:00:00Z');
    setSunday(sunday.toISOString().split('T')[0] + 'T20:00:00Z');

    console.log('Monday:', monday.toISOString().split('T')[0]);
    console.log('Sunday:', sunday.toISOString().split('T')[0]);

    const weekDates = [];
    const dateOptions = { day: 'numeric', month: 'short' };
    const dayOptions = { weekday: 'short' };

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const formattedDate = date.toLocaleDateString('en-US', dateOptions);
      const isoDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const dayOfWeek = date.toLocaleDateString('en-US', dayOptions).toUpperCase();
      weekDates.push({ formattedDate, isoDate, dayOfWeek });
    }

    setDates(weekDates);
  };
const combinedUsers = props.reportsProductivity.map(user => {
    const user2 = props.reportsAttendence.find(u => u.userId === user.userId);
    const combinedDto = [...user.dto, ...(user2 ? user2.dto : [])];
    return { ...user, dto: combinedDto };
  });

  const handleTabClick = (key) => {
    console.log("Hello")
    setActiveTab(key);
    setWeekOffset(0);
    calculateWeekend();
    // props.getReportsProductivity()
    // props.getReportsAttendence()
    //props.getMatrixdata(key, props.organizationId);
  };
  const handleProductivityClick = (date,userId) => {
    setStartDateData(`${(date)}T20:00:00Z`)
    setUserId(userId)
    console.log('Productivity date clicked:', userId);
  };

  useEffect(() => {
    if (props.showLocation.length > 0) {
      setActiveTab(props.showLocation[0]?.locationDetailsId);
    }
  }, [props.showLocation]);




  const handleNextWeek = () => {
    if (weekOffset < 0) { // Restrict to current week or past weeks
      setLoading(true);
      setTimeout(() => {
        const newOffset = weekOffset + 1;
        setWeekOffset(newOffset);
        const newMonday = getMondayDate(newOffset);
        const newSunday = getSundayDate(newOffset);
        console.log('Next Week - Monday:', newMonday);
        console.log('Next Week - Sunday:', newSunday);
       

         const nextMonday=`${newMonday+ 'T20:00:00Z'}`
         const nextSunday=`${newSunday+ 'T20:00:00Z'}`

         const nextAttMonday=`${newMonday+ 'T20:00:00Z'}`
         const nextAttSunday=`${newSunday+ 'T20:00:00Z'}`
        props.getReportsProductivity(activeTab,nextMonday,nextSunday)
      props.getReportsAttendence(activeTab,nextAttMonday,nextAttSunday)
        setLoading(false);
      }, 1000);
    }
  };

  const handlePreviousWeek = () => {
    setLoading(true);
    setTimeout(() => {
      const newOffset = weekOffset - 1;
      setWeekOffset(newOffset);
      const newMonday = getMondayDate(newOffset);
      const newSunday = getSundayDate(newOffset);
      console.log('Previous Week - Monday:', newMonday);
      console.log('Previous Week - Sunday:', newSunday);
       const nextMonday=`${newMonday+ 'T20:00:00Z'}`
         const nextSunday=`${newSunday+ 'T20:00:00Z'}`

         const nextAttMonday=`${newMonday+ 'T20:00:00Z'}`
         const nextAttSunday=`${newSunday+ 'T20:00:00Z'}`
      props.getReportsProductivity(activeTab,nextMonday,nextSunday)
      props.getReportsAttendence(activeTab,nextAttMonday,nextAttSunday)
      setLoading(false);
    }, 1000);
  };



  const getMondayDate = (offset) => {
    const today = new Date();
    today.setDate(today.getDate() + offset * 7);
    const dayOfWeek = today.getDay();
    const daysToMonday = (dayOfWeek + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToMonday);
    return monday.toISOString().split('T')[0];
  };

  const getSundayDate = (offset) => {
    const mondayDate = getMondayDate(offset);
    const monday = new Date(mondayDate);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return sunday.toISOString().split('T')[0];
  };

  return (
    <>
     <div 
    //  style={styles.navigation}
     >
         <Button onClick={handlePreviousWeek} disabled={loading}>Previous Week</Button>
         <Button onClick={handleNextWeek} disabled={loading}>Next Week</Button>
      </div>
    <Tabs 
    type='card'
    activeKey={activeTab}
    onChange={handleTabClick}
    // defaultActiveKey="0"
    >
    {props.showLocation.map((loc, index) => (
      <TabPane tab={loc.locationName} 
     
      key={loc.locationDetailsId}>
        {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
             <Spin />
           </div>
          ) : (
    <div style={styles.container}>
      <div style={styles.grid}>
        <div style={styles.emptyCell}></div>
        {dates.map((date, index) => (
          <div key={index} style={styles.headerCell}>
            <div>{date.formattedDate}</div>
            <div>{date.dayOfWeek}</div>
          </div>
        ))}
        
        {combinedUsers.map((user) => (
          <React.Fragment key={user.userId}>
            <div style={styles.headerCell}>{user.userName}</div>
            {dates.map((date, index) => {
              const userDates = user.dto.filter(d => d.date.startsWith(date.isoDate));
              //console.log(user)
              const totalTimeTaken = userDates.find(d => d.totalTimeTaken !== undefined);
              const totalTimeSpend = userDates.find(d => d.totalTimeSpend !== undefined);
              return (
                <div key={index} style={styles.gridCell}>
                  <div 
                   onClick={() => {
                    props.addReportsProductivity(true);
                    //handleRowData(item);
                    handleProductivityClick(date.isoDate,user.userId)
                               
                             
                             
                   }}
                  >
                  {totalTimeTaken ? `Productivity: ${totalTimeTaken.totalTimeTaken}hrs` : ''}
                  </div>
                  <div 
                  
                  onClick={() => {
                    props.addReportsAttendenceModal(true);
                    //handleRowData(item);
                    handleProductivityClick(date.isoDate,user.userId)
                               
                             
                             
                   }}
                  >
                  
                  {totalTimeSpend ? `Attendance: ${totalTimeSpend.totalTimeSpend}hrs` : ''}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
       
      </div>
    </div>
     )}
    </TabPane>
        ))}
      </Tabs>
      <AddReportProductivityModal
      userId={userId}
      startDateData={startDateData}
      addReportsProductivity={props.addReportsProductivity}
      addReportsProductivityModal={props.addReportsProductivityModal}
      />
      <AddReportAttendenceModal
      userId={userId}
      startDateData={startDateData}
      addReportsAttendenceModalList={props.addReportsAttendenceModalList}
      addReportsAttendenceModal={props.addReportsAttendenceModal}
      />
      </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridGap: '10px',
    width: '100%',
    maxHeight: '500px',  // Set the maximum height
    maxWidth: '100%',
    overflow: 'auto',
  },
  // grid: {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  //   gridGap: '10px',
  //   maxHeight: '500px',  // Set the maximum height
  //   maxWidth: '100%',    // Set the maximum width
  //   overflow: 'auto',    // Enable scrolling
  // },
  emptyCell: {
    gridColumn: 'span 1',
    width: '100px',
    height: '40px',
  },
  headerCell: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gridCell: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap', 
    backgroundColor:"skyblue"
  },
};


const mapStateToProps = ({ auth, role, location,report, currency, settings, employee, designations, departments }) => ({
    orgId: auth.userDetails.organizationId,
    // countries: auth.countries,
    showLocation: location.showLocation,
    reportsAttendence:report.reportsAttendence,
    addReportsProductivityModal:report.addReportsProductivityModal,
    reportsProductivity:report.reportsProductivity,
    addReportsAttendenceModalList:report.addReportsAttendenceModalList,
    // addingEmployee: employee.addingEmployee,
   
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
    
      getlocation,
      getReportsProductivity,
      getReportsAttendence,
      addReportsProductivity,
      addReportsAttendenceModal
    
    }, dispatch);
  export default connect(mapStateToProps, mapDispatchToProps)(WeekendDates);