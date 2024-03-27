


import { Button, DatePicker, } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCountries} from "../../Auth/AuthAction"
import {getCountry } from "../../../Containers/Settings/Category/Country/CountryAction"
import { addAttendence, getAttendanceList,addLocationDetails } from "../../Customer/CustomerAction";
import { BundleLoader } from "../../../Components/Placeholder";

function StartStop(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [startInd, setStartInd] = useState(false); 
const[drop1,setDrop1]=useState(props.attendanceByList.location); 
const[mandatorCountry,setmandatoryCountry]=useState(props.attendanceByList.country); 
const[country,setAllCountry]=useState(""); 
  console.log("Initial startInd:", startInd);
  console.log(drop1)


  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {

    if (date) {
      setSelectedDate(date.format("YYYY-MM-DD"))
      console.log("Selected date:", date.format("YYYY-MM-DD"));
    } else {
      console.log("No date selected");
    }
    // setSelectedDate(date);
  };

  // const handleLogDate = () => {
  //   if (selectedDate) {
  //     setSelectedDate(selectedDate.format("YYYY-MM-DD"))
  //     console.log("Selected date:", selectedDate.format("YYYY-MM-DD"));
  //   } else {
  //     console.log("No date selected");
  //   }
  // };



  const returnDate=`${selectedDate}T20:00:00Z`
  console.log(returnDate)

  // const handleClick = () => {
  //   if (startInd) {
  //     let data = {
  //       userId: props.userId,
  //       startInd: false,
  //     };
  //     props.addAttendence(data, props.userId);
  //   } else {
  //     let data = {
  //       userId: props.userId,
  //       startInd: true,
  //     };
  //     props.addAttendence(data, props.userId);
  //   }
  // };

  const handleClick = () => {
    const data = {
      userId: props.userId,
      startInd: !startInd, 
      attendanceId:props.attendanceByList.attendanceId,
      country:mandatorCountry?mandatorCountry:null,
      location:drop1?drop1:null,
      other:country?country:null,
      returnDate:returnDate,
    };
    props.addAttendence(data, props.userId);
  };

  const handleDrop1=(event)=>{
    setDrop1(
    event.target.value
    )
  
  }

  const handleMandatoryCountry=(event)=>{
    setmandatoryCountry(
    event.target.value
    )
 
  }
  console.log(mandatorCountry)

  const handleAllCountry=(event)=>{
    setAllCountry(
    event.target.value
    )
  
  }


  const handleSubmit=()=>{
    let data={
      attendanceId:props.attendanceByList.attendanceId,
      country:mandatorCountry?mandatorCountry:null,
      location:drop1?drop1:null,
      other:country?country:null,
      returnDate:returnDate,
    }
    props.addLocationDetails(data)
  }


  



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

// ...
useEffect(()=>{
  props.getCountries()
  props.getCountry()
},[])


  useEffect(() => {
    
    if (props.attendanceByList.startInd !== undefined&&props.attendanceByList.location !== undefined&&props.attendanceByList.country !== undefined) {
      setStartInd(props.attendanceByList.startInd);
      setDrop1(props.attendanceByList.location);
      setmandatoryCountry(props.attendanceByList.country)
      // setDrop1(props.attendanceByList.location)
    }
  }, [props.attendanceByList.startInd]);

  if (isLoading) {
    return <BundleLoader />;
  }

  return (
    <div class=" flex" >
        {/* <Popconfirm
        title="Are you sure you want to start/stop?"
       onConfirm={handleClick}
        onCancel={handleClick} // Add onCancel handler to handle the cancel action
       okText="Yes"
     cancelText="No"
     >

      <button >
       {startInd ? 'Stop' : 'Start'}
      </button>
     </Popconfirm> */}
      {/* <Popconfirm
        title="Are you sure you want to start/stop?"
       onConfirm={handleClick}
        onCancel={handleClick} // Add onCancel handler to handle the cancel action
       okText="Yes"
     cancelText="No"
     > */}
     
      {/* </Popconfirm> */}
      <div class="ml-[22px] mt-[0.2rem] max-sm:ml-1">
      <select
      value={drop1}
      onChange={handleDrop1}
      disabled={!startInd}
      style={{border:"0.5px solid lightgray ",height:"1.4rem", boxShadow: "0 0.15em 0.3em #aaa"
      }}
      >
         {/* <option value="">Select</option> */}
        <option value="In Office">In Office</option>
        <option value="On Travel">On Travel</option>
        <option value="Remote">Remote</option>
      </select>
      
      </div>

      {drop1==="On Travel" ?  
     <div class="mt-[0.2rem] ml-3" >
     <DatePicker onChange={handleDateChange}/>
      </div>:null
     }
     {drop1==="On Travel" ?  
     <div class="mt-[0.2rem] ml-3" >
      <select className="customize-select"
       
        value={mandatorCountry}
onChange={handleMandatoryCountry}
      >
         <option value="">Select Country</option>
         <option value="Others">Others</option>
        {props.countries.map((item)=>{
          return(
           
 <option value={item.country_name}>{item.country_name}</option>
          )
        })}
       
       
      </select>
      </div>:null
     }
    
{mandatorCountry==="Others"? 
<div class=" ml-3">
      <select className="customize-select"
    
     
       onChange={handleAllCountry}
      >
          <option
         
           value="">Select other country</option>
        {props.country.map((item)=>{
          return(
          <option  value={item.country_name}>{item.country_name}</option>
          )
        })}
        
        
      </select>
      </div>:null
}
<div>
       <Button 
        type="primary"
       style={{backgroundColor:!startInd?"#77dd77" : "#ff7158bf"}} onClick={handleClick}>
        {!startInd ? "Start" : "Stop"}
      </Button>
      </div>

{/* <div class="ml-2">
  <Button onClick={handleSubmit}>Submit</Button>
</div> */}
     
    </div>
   
  );
}

const mapStateToProps = ({ customer, auth,countrys }) => ({
  userId: auth.userDetails.userId,
  attendanceByList: customer.attendanceByList,
  countries:auth.countries,
  country: countrys.country,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addAttendence,
      getAttendanceList,
      getCountries,
      getCountry,
      addLocationDetails
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StartStop);
