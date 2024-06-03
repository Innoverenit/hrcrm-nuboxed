// import React, { useState, useEffect } from 'react';
// import { Tabs,Spin } from 'antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getReportsProductivity,getReportsAttendence} from "../../ReportAction"
// import {getlocation} from "../../../Event/Child/Location/LocationAction"

// const { TabPane } = Tabs;


// const WeekendDates = (props) => {
//   const [dates, setDates] = useState([]);
//   const [activeTab, setActiveTab] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [monday, setMonday] = useState(null);
//   const [sunday, setSunday] = useState(null);
//   const locations = [
//     { location: "Mumbai" },
//     { location: "Delhi" },
//     { location: "Kolkata" },
//     { location: "Madras" }
//   ];
//   const users = [
//     { 
//       id: 1, 
//       name: 'John Doe', 
//       dto: [
//         { date: "2024-05-27T18:30:00Z", totalTimeTaken: 4 },
//         { date: "2024-05-28T18:30:00Z", totalTimeTaken: 3 },
//         { date: "2024-05-29T18:30:00Z", totalTimeTaken: 2 },
//       ],
//     },
//     { 
//       id: 2,
//       name: 'Jane Smith', 
//       dto: [
//         { date: "2024-05-27T18:30:00Z", totalTimeTaken: 9 },
//         { date: "2024-05-28T18:30:00Z", totalTimeTaken: 6 },
//         { date: "2024-05-29T18:30:00Z", totalTimeTaken: 6 },
//       ],
//     },
//   ];

//   const users2 = [
//     { 
//       id: 1, 
//       name: 'John Doe', 
//       dto: [
//         { date: "2024-05-27T18:30:00Z", totalTimeSpend: 5 },
//         { date: "2024-05-28T18:30:00Z", totalTimeSpend: 7 },
//         { date: "2024-05-29T18:30:00Z", totalTimeSpend: 8 },
//       ],
//     },
//     { 
//       id: 2,
//       name: 'Jane Smith', 
//       dto: [
//         { date: "2024-05-27T18:30:00Z", totalTimeSpend: 12 },
//         { date: "2024-05-28T18:30:00Z", totalTimeSpend: 6 },
//         { date: "2024-05-29T18:30:00Z", totalTimeSpend: 4 },
//       ],
//     },
//   ];


//   useEffect(() => {
//    props.getlocation(props.orgId)
  
  
//   }, [props.orgId]);
// //   useEffect(() => {
// //   if (activeTab) {
// //     props.getReportsProductivity(activeTab,monday,sunday)
// //     props.getReportsAttendence(activeTab,monday,sunday)
// //   }
// // }, [activeTab]);

// useEffect(() => {
//     const fetchData = async () => {
//       if (activeTab) {
//         setLoading(true);
//         try {
//           await 
         
//           props.getReportsProductivity(activeTab,monday,sunday)
//           props.getReportsAttendence(activeTab,monday,sunday)
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();
//   }, [activeTab]);

//   useEffect(() => {
//     const calculateWeekend = () => {
//       const today = new Date();
//       const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)

//       const daysToMonday = (dayOfWeek + 6) % 7;
//       const monday = new Date(today);
//       monday.setDate(today.getDate() - daysToMonday);
//       const sunday = new Date(monday);
//       sunday.setDate(monday.getDate() + 6);
//       console.log('Start of the week (Monday):', monday);
//       console.log('End of the week (Sunday):', sunday);

//       setMonday(monday.toISOString().split('T')[0]+'T20:00:00Z');
//       setSunday(sunday.toISOString().split('T')[0]+'T20:00:00Z');

//       const weekDates = [];
//       const dateOptions = { day: 'numeric', month: 'short' };
//       const dayOptions = { weekday: 'short' };

//       for (let i = 0; i < 7; i++) {
//         const date = new Date(monday);
//         date.setDate(monday.getDate() + i);
//         const formattedDate = date.toLocaleDateString('en-US', dateOptions);
//         const isoDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
//         const dayOfWeek = date.toLocaleDateString('en-US', dayOptions).toUpperCase();
//         weekDates.push({ formattedDate, isoDate, dayOfWeek });
//       }

//       setDates(weekDates);
//     };

//     calculateWeekend();
//   }, []);

//   const combinedUsers = users.map(user => {
//     const user2 = users2.find(u => u.id === user.id);
//     const combinedDto = [...user.dto, ...(user2 ? user2.dto : [])];
//     return { ...user, dto: combinedDto };
//   });

//   const handleTabClick = (key) => {
//     console.log("Hello")
//     setActiveTab(key);
//     // props.getReportsProductivity()
//     // props.getReportsAttendence()
//     //props.getMatrixdata(key, props.organizationId);
//   };

//   useEffect(() => {
//     if (props.showLocation.length > 0) {
//       setActiveTab(props.showLocation[0]?.locationDetailsId);
//     }
//   }, [props.showLocation]);

//   return (
//     <Tabs 
//     type='card'
//     activeKey={activeTab}
//     onChange={handleTabClick}
//     // defaultActiveKey="0"
//     >
//     {props.showLocation.map((loc, index) => (
//       <TabPane tab={loc.locationName} 
     
//       key={loc.locationDetailsId}>
//         {loading ? (
//              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//              <Spin />
//            </div>
//           ) : (
//     <div style={styles.container}>
//       <div style={styles.grid}>
//         <div style={styles.emptyCell}></div>
//         {dates.map((date, index) => (
//           <div key={index} style={styles.headerCell}>
//             <div>{date.formattedDate}</div>
//             <div>{date.dayOfWeek}</div>
//           </div>
//         ))}
//         {combinedUsers.map((user) => (
//           <React.Fragment key={user.id}>
//             <div style={styles.headerCell}>{user.name}</div>
//             {dates.map((date, index) => {
//               const userDates = user.dto.filter(d => d.date.startsWith(date.isoDate));
//               const totalTimeTaken = userDates.find(d => d.totalTimeTaken !== undefined);
//               const totalTimeSpend = userDates.find(d => d.totalTimeSpend !== undefined);
//               return (
//                 <div key={index} style={styles.gridCell}>
//                   <div>
//                   {totalTimeTaken ? `Productivity: ${totalTimeTaken.totalTimeTaken}hrs` : ''}
//                   </div>
//                   <div>
//                   {totalTimeSpend ? `Attendance: ${totalTimeSpend.totalTimeSpend}hrs` : ''}
//                   </div>
//                 </div>
//               );
//             })}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//      )}
//     </TabPane>
//         ))}
//       </Tabs>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     padding: '20px',
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(8, 1fr)',
//     gridGap: '10px',
//     width: '100%',
//   },
//   emptyCell: {
//     gridColumn: 'span 1',
//   },
//   headerCell: {
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     padding: '10px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   gridCell: {
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     padding: '10px',
//     textAlign: 'center',
//     whiteSpace: 'pre-wrap', 
//     backgroundColor:"skyblue"
//   },
// };


// const mapStateToProps = ({ auth, role, location,report, currency, settings, employee, designations, departments }) => ({
//     // userDetails: auth.userDetails,
//     // roles: role.roles,
//     // user: auth.userDetails,
//     // currencies: auth.currencies,
//     // timeZone: auth.timeZone,
//     // fullName: auth.userDetails.fullName,
//     // assignedToList: employee.assignedToList,
//     // organizationId: auth.userDetails.organizationId,
//     orgId: auth.userDetails.organizationId,
//     // countries: auth.countries,
//     showLocation: location.showLocation,
//     reportsAttendence:report.reportsAttendence,
//     reportsProductivity:report.reportsProductivity,
//     // addingEmployee: employee.addingEmployee,
   
//   });
//   const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
    
//       getlocation,
//       getReportsProductivity,
//       getReportsAttendence,
    
//     }, dispatch);
//   export default connect(mapStateToProps, mapDispatchToProps)(WeekendDates);





import React, { useState, useEffect } from 'react';
import { Tabs,Spin } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddReportProductivityModal from "../ReportDetails/AddReportProductivityModal"
import {getReportsProductivity,getReportsAttendence,addReportsProductivity} from "../../ReportAction"
import {getlocation} from "../../../Event/Child/Location/LocationAction"

const { TabPane } = Tabs;


const WeekendDates = (props) => {
  const [dates, setDates] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [monday, setMonday] = useState(null);
  const [sunday, setSunday] = useState(null);
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
    const calculateWeekend = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)

      const daysToMonday = (dayOfWeek + 6) % 7;
      const monday = new Date(today);
      monday.setDate(today.getDate() - daysToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      console.log('Start of the week (Monday):', monday);
      console.log('End of the week (Sunday):', sunday);

      setMonday(monday.toISOString().split('T')[0]+'T20:00:00Z');
      setSunday(sunday.toISOString().split('T')[0]+'T20:00:00Z');

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

    calculateWeekend();
  }, []);

  const combinedUsers = props.reportsProductivity.map(user => {
    const user2 = props.reportsAttendence.find(u => u.userId === user.userId);
    const combinedDto = [...user.dto, ...(user2 ? user2.dto : [])];
    return { ...user, dto: combinedDto };
  });

  const handleTabClick = (key) => {
    console.log("Hello")
    setActiveTab(key);
    // props.getReportsProductivity()
    // props.getReportsAttendence()
    //props.getMatrixdata(key, props.organizationId);
  };

  useEffect(() => {
    if (props.showLocation.length > 0) {
      setActiveTab(props.showLocation[0]?.locationDetailsId);
    }
  }, [props.showLocation]);

  return (
    <>
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
              const totalTimeTaken = userDates.find(d => d.totalTimeTaken !== undefined);
              const totalTimeSpend = userDates.find(d => d.totalTimeSpend !== undefined);
              return (
                <div key={index} style={styles.gridCell}>
                  <div 
                   onClick={() => {
                    props.addReportsProductivity(true);
                               
                             
                             
                   }}
                  >
                  {totalTimeTaken ? `Productivity: ${totalTimeTaken.totalTimeTaken}hrs` : ''}
                  </div>
                  <div>
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
      addReportsProductivity={props.addReportsProductivity}
      addReportsProductivityModal={props.addReportsProductivityModal}
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
  },
  emptyCell: {
    gridColumn: 'span 1',
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
    // userDetails: auth.userDetails,
    // roles: role.roles,
    // user: auth.userDetails,
    // currencies: auth.currencies,
    // timeZone: auth.timeZone,
    // fullName: auth.userDetails.fullName,
    // assignedToList: employee.assignedToList,
    // organizationId: auth.userDetails.organizationId,
    orgId: auth.userDetails.organizationId,
    // countries: auth.countries,
    showLocation: location.showLocation,
    reportsAttendence:report.reportsAttendence,
    addReportsProductivityModal:report.addReportsProductivityModal,
    reportsProductivity:report.reportsProductivity,
    // addingEmployee: employee.addingEmployee,
   
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
    
      getlocation,
      getReportsProductivity,
      getReportsAttendence,
      addReportsProductivity
    
    }, dispatch);
  export default connect(mapStateToProps, mapDispatchToProps)(WeekendDates);



