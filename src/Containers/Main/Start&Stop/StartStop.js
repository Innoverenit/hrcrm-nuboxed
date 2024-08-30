


// import { Button, DatePicker, } from "antd";
// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import dayjs from "dayjs";
// import dayjs from "dayjs";
// import { bindActionCreators } from "redux";
// import {getCountries} from "../../Auth/AuthAction"
// import {getCountry } from "../../../Containers/Settings/Category/Country/CountryAction"
// import { addAttendence, getAttendanceList,addLocationDetails } from "../../Customer/CustomerAction";
// import { BundleLoader } from "../../../Components/Placeholder";

// function StartStop(props) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [startInd, setStartInd] = useState(false); 
// const[drop1,setDrop1]=useState(props.attendanceByList.location); 
// const[mandatorCountry,setmandatoryCountry]=useState(props.attendanceByList.country); 
// const[country,setAllCountry]=useState(""); 
//   console.log("Initial startInd:", startInd);
//   console.log(drop1)


//   const [selectedDate, setSelectedDate] = useState("");

//   const handleDateChange = (event) => {
//     console.log(event.target.value)
//     setSelectedDate(event.target.value);
//     // You can perform any additional actions with the updated date here
//   };

//   // const handleLogDate = () => {
//   //   if (selectedDate) {
//   //     setSelectedDate(selectedDate.format("YYYY-MM-DD"))
//   //     console.log("Selected date:", selectedDate.format("YYYY-MM-DD"));
//   //   } else {
//   //     console.log("No date selected");
//   //   }
//   // };



//   const returnDate=`${selectedDate}T20:00:00Z`
//   console.log(returnDate)

//   // const handleClick = () => {
//   //   if (startInd) {
//   //     let data = {
//   //       userId: props.userId,
//   //       startInd: false,
//   //     };
//   //     props.addAttendence(data, props.userId);
//   //   } else {
//   //     let data = {
//   //       userId: props.userId,
//   //       startInd: true,
//   //     };
//   //     props.addAttendence(data, props.userId);
//   //   }
//   // };

//   const handleClick = () => {
//     const data = {
//       userId: props.userId,
//       startInd: !startInd, 
//       attendanceId:props.attendanceByList.attendanceId,
//       country:mandatorCountry?mandatorCountry:null,
//       location:drop1?drop1:null,
//       other:country?country:null,
//       returnDate:returnDate,
//     };
//     props.addAttendence(data, props.userId);
//   };

//   const handleDrop1=(event)=>{
//     setDrop1(
//     event.target.value
//     )
  
//   }

//   const handleMandatoryCountry=(event)=>{
//     setmandatoryCountry(
//     event.target.value
//     )
 
//   }
//   console.log(mandatorCountry)

//   const handleAllCountry=(event)=>{
//     setAllCountry(
//     event.target.value
//     )
  
//   }


//   const handleSubmit=()=>{
//     let data={
//       attendanceId:props.attendanceByList.attendanceId,
//       country:mandatorCountry?mandatorCountry:null,
//       location:drop1?drop1:null,
//       other:country?country:null,
//       returnDate:returnDate,
//     }
//     props.addLocationDetails(data)
//   }


  



// useEffect(() => {
//   const fetchData = async () => {
//     try {
     
//       await props.getAttendanceList(props.userId);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setIsLoading(false); 
//     }
//   };

//   fetchData(); 
// }, [props.userId]);

// // ...
// useEffect(()=>{
//   props.getCountries()
//   props.getCountry()
// },[])


//   // useEffect(() => {
    
//   //   if (props.attendanceByList.startInd !== undefined&&props.attendanceByList.location !== undefined&&props.attendanceByList.country !== undefined) {
//   //     setStartInd(props.attendanceByList.startInd);
//   //     setDrop1(props.attendanceByList.location);
//   //     setmandatoryCountry(props.attendanceByList.country)
//   //     // setSelectedDate(props.attendanceByList.returnDate.substring(0, 10))
//   //     setSelectedDate(props.attendanceByList.returnDate)
     
//   //   }
//   // }, [props.attendanceByList.startInd]);


//   useEffect(() => {
//     if (
//       props.attendanceByList.startInd !== undefined &&
//       props.attendanceByList.location !== undefined &&
//       props.attendanceByList.country !== undefined &&
//       props.attendanceByList.returnDate !== null // Check if returnDate is not null
//     ) {
//       setStartInd(props.attendanceByList.startInd);
//       setDrop1(props.attendanceByList.location);
//       setmandatoryCountry(props.attendanceByList.country);
      
//       // Perform a null check before accessing substring
//       if (props.attendanceByList.returnDate.length >= 10) {
//         setSelectedDate(props.attendanceByList.returnDate.substring(0, 10));
//       } else {
//         setSelectedDate(props.attendanceByList.returnDate);
//       }
//     }
//   }, [props.attendanceByList.startInd, props.attendanceByList.returnDate]);
  

//   if (isLoading) {
//     return <BundleLoader />;
//   }

//   return (
//     <div class=" flex items-center -mt-4" >
      
//       <div class="ml-[22px] mt-[0.2rem] max-sm:ml-1">
//       <select
//       value={drop1}
//       onChange={handleDrop1}
//       disabled={startInd===true}
//       style={{border:"0.5px solid lightgray ",height:"1.4rem", boxShadow: "0 0.15em 0.3em #aaa"
//       }}
//       >
//          <option value="">Select</option>
//         <option value="In Office">In Office</option>
//         <option value="On Travel">On Travel</option>
//         <option value="Remote">Remote</option>
//       </select>
      
//       </div>

//       {drop1==="On Travel" ?  
//      <div class="mt-[0.2rem] ml-3" >
//      <input 
//      style={{height:"1rem", border: "0px solid #d9d9d9"}}
//         type="date" 
//         value={selectedDate} 
//         onChange={handleDateChange} 
//       />
//       </div>
//       :null
//      }
//      {drop1==="On Travel" ?  
//      <div class="mt-[0.2rem] ml-3" >
//       <select className="customize-select"
       
//         value={mandatorCountry}
// onChange={handleMandatoryCountry}
// disabled={startInd===true}
//       >
//          <option value="">Select Country</option>
//          <option value="Others">Others</option>
//         {props.countries.map((item)=>{
//           return(
           
//  <option value={item.country_name}>{item.country_name}</option>
//           )
//         })}
       
       
//       </select>
//       </div>:null
//      }
    
// {mandatorCountry==="Others"? 
// <div class=" ml-3">
//       <select className="customize-select"
    
     
//        onChange={handleAllCountry}
//       >
//           <option
         
//            value="">Select other country</option>
//         {props.country.map((item)=>{
//           return(
//           <option  value={item.country_name}>{item.country_name}</option>
//           )
//         })}
        
        
//       </select>
//       </div>:null
// }
// <div class="ml-2">
//        <Button 
//         disabled={!drop1}
//         type="primary"
//        style={{backgroundColor:!startInd?"#77dd77" : "#ff7158bf"}} onClick={handleClick}>
//           {/* {!startInd ? "Start" : "Stop"} */}
//         {startInd ? "Start" : "Stop"}
//       </Button>
//       </div>

// {/* <div class="ml-2">
//   <Button onClick={handleSubmit}>Submit</Button>
// </div> */}
     
//     </div>
   
//   );
// }

// const mapStateToProps = ({ customer, auth,countrys }) => ({
//   userId: auth.userDetails.userId,
//   attendanceByList: customer.attendanceByList,
//   countries:auth.countries,
//   country: countrys.country,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addAttendence,
//       getAttendanceList,
//       getCountries,
//       getCountry,
//       addLocationDetails
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(StartStop);



// import { Button, DatePicker, Select, Input } from "antd";
// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getCountries } from "../../Auth/AuthAction";
// //import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
// import { addAttendence, getAttendanceList, addLocationDetails } from "../../Customer/CustomerAction";
// import { BundleLoader } from "../../../Components/Placeholder";
// import dayjs from "dayjs";

// const { Option } = Select;

// function StartStop(props) {
//   const [selectedOtherValues, setSelectedOtherValues] = useState(props.attendanceByList.other);
//   const [isLoading, setIsLoading] = useState(true);

//   const [otherInclude, setOtherInclude] = useState([]);
  
//   const [touched, setTouched] = useState(false);
//   const [startInd, setStartInd] = useState(false);
//   const [drop1, setDrop1] = useState(props.attendanceByList.location);
//   const [mandatoryCountry, setMandatoryCountry] = useState(props.attendanceByList.country);
//   const [country, setAllCountry] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");

//   const returnDate = `${selectedDate}T20:00:00Z`;
//   console.log(startInd)
//   console.log(drop1)
//   console.log(mandatoryCountry)
//   console.log(country)
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await props.getAttendanceList(props.userId);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [props.userId]);

//   useEffect(() => {
//     props.getCountries();
//     // props.getCountry();
//   }, []);

//   useEffect(() => {
//     if (
//       props.attendanceByList.startInd !== undefined &&
//       props.attendanceByList.location !== undefined &&
//       props.attendanceByList.country !== undefined &&
//       props.attendanceByList.other !== undefined &&
//       props.attendanceByList.returnDate !== null
//     ) {
//       setStartInd(props.attendanceByList.startInd);
//       setDrop1(props.attendanceByList.location);
//       setMandatoryCountry(props.attendanceByList.country);
//       setSelectedOtherValues(props.attendanceByList.other)
//       if (props.attendanceByList.returnDate.length >= 10) {
//         setSelectedDate(props.attendanceByList.returnDate.substring(0, 10));
//       } else {
//         setSelectedDate(props.attendanceByList.returnDate);
//       }
//     }
//   }, [props.attendanceByList.startInd, props.attendanceByList.returnDate]);

//   const handleDateChange = (date, dateString) => {
//     setSelectedDate(dateString);
//   };



//   const handleSelectOtherChange = (values) => {
//     setSelectedOtherValues(values); // Update selected values
//   };

//   const handleSelectOtherFocus = () => {
//     if (!touched) {
//       fetchOtherInclude();
//       setTouched(true);
//     }
//   };


//   const fetchOtherInclude = async () => {
//     // setIsLoading(true);
//     try {
//       const apiEndpoint = `https://develop.tekorero.com/employeePortal/api/v1/countries/list`;
//       const response = await fetch(apiEndpoint,{
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${props.token}`,
//           'Content-Type': 'application/json',
//           // Add any other headers if needed
//         },
//       });
//       const data = await response.json();
//       setOtherInclude(data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       // setIsLoading(false);
//     }
//   };

//   const handleClick = () => {
//     const data = {
//       userId: props.userId,
//       startInd: !startInd,
//       attendanceId: props.attendanceByList.attendanceId,
//       country: mandatoryCountry ? mandatoryCountry : null,
//       location: drop1 ? drop1 : null,
//       other: selectedOtherValues ? selectedOtherValues : null,
//       returnDate: returnDate,
//     };
//     props.addAttendence(data, props.userId);
//   };

//   const handleDrop1 = (value) => {
//     setDrop1(value);
//   };

//   const handleMandatoryCountry = (value) => {
//     setMandatoryCountry(value);
//   };

//   const handleAllCountry = (value) => {
//     setAllCountry(value);
//   };

//   const handleSubmit = () => {
//     let data = {
//       attendanceId: props.attendanceByList.attendanceId,
//       country: mandatoryCountry ? mandatoryCountry : null,
//       location: drop1 ? drop1 : null,
//       other: country ? country : null,
//       returnDate: returnDate,
//     };
//     props.addLocationDetails(data);
//   };

//   if (isLoading) {
//     return <BundleLoader />;
//   }

//   return (
//     <div className="flex items-center -mt-4">
//       <div className="ml-[22px] mt-[0.2rem] max-sm:ml-1">
//         <Select
//           value={drop1}
//           onChange={handleDrop1}
//           disabled={startInd === true}
//           style={{ width: 146 }}
//           placeholder="Select"
//         >
//           <Option value="">Select</Option>
//           <Option value="In Office">In Office</Option>
//           <Option value="On Travel">On Travel</Option>
//           <Option value="Remote">Remote</Option>
//         </Select>
//       </div>

//       {drop1 === "On Travel" && (
//         <div className="mt-[0.2rem] ml-3">
//           <DatePicker 
//             value={selectedDate ? dayjs(selectedDate) : null}
//             onChange={handleDateChange}
//             format="YYYY-MM-DD"
//           />
//         </div>
//       )}

//       {drop1 === "On Travel" && (
//         <div className="mt-[0.2rem] ml-3">
//           <Select
//             className="customize-select"
//             value={mandatoryCountry}
//             onChange={handleMandatoryCountry}
//             disabled={startInd === true}
//             style={{ width: 164 }}
//             placeholder="Select Country"
//           >
//             <Option value="">Select Country</Option>
//             <Option value="Others">Others</Option>
//             {props.countries.map((item) => (
//               <Option key={item.country_name} value={item.country_name}>
//                 {item.country_name}
//               </Option>
//             ))}
//           </Select>
//         </div>
//       )}

//       {mandatoryCountry === "Others" && (
//         <div className="ml-3">
//           {/* <Select
//             className="customize-select"
//             onChange={handleAllCountry}
//             style={{ width: 200 }}
//             placeholder="Select other country"
//           >
//             <Option value="">Select other country</Option>
//             {props.country.map((item) => (
//               <Option key={item.country_name} value={item.country_name}>
//                 {item.country_name}
//               </Option>
//             ))}
//           </Select> */}
//                      <Select
//           showSearch

//           placeholder="Search or select include"
//           optionFilterProp="children"
//           loading={isLoading}
//           onFocus={handleSelectOtherFocus}
//           onChange={handleSelectOtherChange}
//           defaultValue={selectedOtherValues} 
//           // mode="multiple" 
//         >
//           {otherInclude.map(includes => (
//             <Option key={includes.country_name} value={includes.country_name}>
//               {includes.country_name}
//             </Option>
//           ))}
//         </Select>
//         </div>
//       )}

//       <div className="ml-2">
//         <Button
//           disabled={!drop1}
//           type="primary"
//           style={{ backgroundColor: !startInd ? "#77dd77" : "#ff7158bf" }}
//           onClick={handleClick}
//         >
//           {startInd ? "Stop" : "Start"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = ({ customer, auth, countrys }) => ({
//   userId: auth.userDetails.userId,
//   attendanceByList: customer.attendanceByList,
//   countries: auth.countries,
//   country: countrys.country,
//   token: auth.token,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addAttendence,
//       getAttendanceList,
//       getCountries,
//       // getCountry,
//       addLocationDetails,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(StartStop);


import { Button, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCountries } from "../../Auth/AuthAction";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { addAttendence, getAttendanceList, addLocationDetails } from "../../Customer/CustomerAction";
import { BundleLoader } from "../../../Components/Placeholder";
import {base_url} from "../../../Config/Auth";
import dayjs from "dayjs";

const { Option } = Select;

function StartStop(props) {
  const [selectedOtherValues, setSelectedOtherValues] = useState(props.attendanceByList?.other ||null);
  const [isLoading, setIsLoading] = useState(true);
  const [otherInclude, setOtherInclude] = useState([]);
  const [touched, setTouched] = useState(false);
  const [startInd, setStartInd] = useState(false);
  const [drop1, setDrop1] = useState(props.attendanceByList?.location || "");
  const [mandatoryCountry, setMandatoryCountry] = useState(props.attendanceByList?.country || "");
  const [country, setAllCountry] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // const returnDate = `${selectedDate}T20:00:00Z`;
  const returnDate = selectedDate ? `${selectedDate}T20:00:00Z` : "";

  console.log("startInd:", startInd);
  console.log("drop1:", drop1);
  console.log("mandatoryCountry:", mandatoryCountry);
  console.log("country:", country);
  console.log(props.attendanceByList)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.getAttendanceList(props.userId);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.userId]);

  useEffect(() => {
    props.getCountries();
  }, []);

  useEffect(() => {
    // if (
    //   props.attendanceByList &&
    //   props.attendanceByList.startInd !== undefined &&
    //   props.attendanceByList.location !== undefined &&
    //   props.attendanceByList.country !== undefined &&
    //   props.attendanceByList.other !== undefined &&
    //   props.attendanceByList.returnDate !== null
    // ) {
      setStartInd(props.attendanceByList.startInd);
      setDrop1(props.attendanceByList.location);
      setMandatoryCountry(props.attendanceByList.country);
      setSelectedOtherValues(props.attendanceByList.other);
      if (props.attendanceByList.returnDate) {
        if (props.attendanceByList.returnDate.length >= 10) {
          setSelectedDate(props.attendanceByList.returnDate.substring(0, 10));
        } else {
          setSelectedDate(props.attendanceByList.returnDate);
        }
      } else {
        // Handle the case when returnDate is undefined or null
        setSelectedDate(''); // Or any default value you prefer
      }
    // }
  }, [props.attendanceByList]);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleSelectOtherChange = (values) => {
    setSelectedOtherValues(values); // Update selected values
  };

  const handleSelectOtherFocus = () => {
    if (!touched) {
      fetchOtherInclude();
      setTouched(true);
    }
  };

  const fetchOtherInclude = async () => {
    try {
      const apiEndpoint = `${base_url}/countries/list`;
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOtherInclude(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleClick = () => {
    const data = {
      userId: props.userId,
      startInd: !startInd,
      attendanceId: props.attendanceByList.attendanceId,
      country: mandatoryCountry ? mandatoryCountry : null,
      location: drop1 ? drop1 : null,
      other: selectedOtherValues ? selectedOtherValues : null,
      returnDate: returnDate?returnDate:"",
    };
    props.addAttendence(data, props.userId);
  };

  const handleDrop1 = (value) => {
    setDrop1(value);
  };

  const handleMandatoryCountry = (value) => {
    setMandatoryCountry(value);
  };

  const handleAllCountry = (value) => {
    setAllCountry(value);
  };

  const handleSubmit = () => {
    let data = {
      attendanceId: props.attendanceByList.attendanceId,
      country: mandatoryCountry ? mandatoryCountry : null,
      location: drop1 ? drop1 : null,
      other: country ? country : null,
      returnDate: returnDate,
    };
    props.addLocationDetails(data);
  };

  if (isLoading) {
    return <BundleLoader />;
  }

  if (!props.attendanceByList) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <div className="flex items-center ">
      <div className="ml-[22px] mt-[0.2rem] max-sm:ml-1">
        <Select
          value={drop1}
          onChange={handleDrop1}
          disabled={startInd === true}
          style={{ width: 146 }}
          placeholder="Select"
        >
          <Option value="">Select</Option>
          <Option value="In Office">In Office</Option>
          <Option value="On Travel">On Travel</Option>
          <Option value="Remote">Remote</Option>
        </Select>
      </div>

      {drop1 === "On Travel" && (
        <div className="mt-[0.2rem] ml-3">
          <DatePicker 
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
        </div>
      )}

      {drop1 === "On Travel" && (
        <div className="mt-[0.2rem] ml-3">
          <Select
            className="customize-select"
            value={mandatoryCountry}
            onChange={handleMandatoryCountry}
            disabled={startInd === true}
            style={{ width: 164 }}
            placeholder="Select Country"
          >
            <Option value="">Select Country</Option>
            <Option value="Others">Others</Option>
            {props.countries.map((item) => (
              <Option key={item.country_name} value={item.country_name}>
                {item.country_name}
              </Option>
            ))}
          </Select>
        </div>
      )}

      {mandatoryCountry === "Others" && (
        <div className="ml-3">
          <Select
            showSearch
            placeholder="Search or select include"
            optionFilterProp="children"
            loading={isLoading}
            onFocus={handleSelectOtherFocus}
            onChange={handleSelectOtherChange}
            defaultValue={selectedOtherValues} 
          >
            {otherInclude.map(includes => (
              <Option key={includes.country_name} value={includes.country_name}>
                {includes.country_name}
              </Option>
            ))}
          </Select>
        </div>
      )}

      <div className="ml-2">
        <div
          disabled={!drop1}
          // type="primary"
          // style={{ backgroundColor: !startInd ? "#77dd77" : "#ff7158bf" }}
          onClick={handleClick}
        >
          {startInd ? <DoDisturbIcon className="!text-red-600 cursor-pointer"/> : <PlayCircleOutlineIcon className="!text-green-500 cursor-pointer"/>}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ customer, auth, countrys }) => ({
  userId: auth.userDetails.userId,
  attendanceByList: customer.attendanceByList,
  countries: auth.countries,
  country: countrys.country,
  token: auth.token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addAttendence,
      getAttendanceList,
      getCountries,
      addLocationDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StartStop);


