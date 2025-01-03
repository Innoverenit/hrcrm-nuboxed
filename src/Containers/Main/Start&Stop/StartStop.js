import { DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { getCountries } from "../../Auth/AuthAction";
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
    const [touchedCountry, setTouchedCountry] = useState(false);
  const [isLoadingCountry, setIsLoadingCountry] = useState(false);
  const [otherInclude, setOtherInclude] = useState([]);
  const [touched, setTouched] = useState(false);
  const [startInd, setStartInd] = useState(false);
  const [drop1, setDrop1] = useState(props.attendanceByList?.location || "");
  const [mandatoryCountry, setMandatoryCountry] = useState(props.attendanceByList?.country || "");
  const [country, setAllCountry] = useState("");

  const [countryData, setCountryData] = useState([]);
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

  // useEffect(() => {
  //   props.getCountries();
  // }, []);

  useEffect(() => {
   
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

  const handleSelectCountryFocus = () => {
    if (!touchedCountry) {
      fetchCountry();
      // fetchSector();

      setTouchedCountry(true);
    }
  };

    const fetchCountry = async () => {
      setIsLoadingCountry(true);
      try {
     
  
        const apiEndpoint = `${base_url}/countries`;
        const response = await fetch(apiEndpoint,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${props.token}`,
            'Content-Type': 'application/json',
            // Add any other headers if needed
          },
        });
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoadingCountry(false);
      }
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
     <div className="relative max-w-xs mx-auto mt-1">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2">
        <span className="text-[0.65rem] font-poppins font-bold"> Attendance</span>
      </div>
      <div className="border-2 border-grey rounded-md p-[0.40rem] flex">
      <div className="mr-4 w-[6rem]">
        <Select
        className=" w-[9rem]  max-sm:w-24"
          value={drop1}
          onChange={handleDrop1}
          disabled={startInd === true}
         
          placeholder="Select"
        >
          <Option value="">Select</Option>
          <Option value="Office">Office</Option>
          <Option value="Travel">Travel</Option>
          <Option value="Remote">Remote</Option>
        </Select>
      </div>
      {drop1 === "Travel" && (
        <div className="mt-[0.2rem]">
          <DatePicker 
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
        </div>
      )}

      {drop1 === "Travel" && (
        <div className="h-[3vh]">
          <Select
            className="customize-select  w-40"
            value={mandatoryCountry}
            onChange={handleMandatoryCountry}
            loading={isLoadingCountry}
            disabled={startInd === true}
            onFocus={handleSelectCountryFocus}
            
            placeholder="Select Country"
          >
            <Option value="">Select Country</Option>
            <Option value="Others">Others</Option>
            {countryData.map((item) => (
              <Option key={item.country_name} value={item.country_name}>
                {item.country_name}
              </Option>
            ))}
          </Select>
        </div>
      )}

      {mandatoryCountry === "Others" && (
        <div>
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

      <div >
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
    </div>
     

     
    </div>
  );
}

const mapStateToProps = ({ customer, auth, countrys }) => ({
  userId: auth.userDetails.userId,
  attendanceByList: customer.attendanceByList,
  // countries: auth.countries,
  country: countrys.country,
  token: auth.token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addAttendence,
      getAttendanceList,
      // getCountries,
      addLocationDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StartStop);


