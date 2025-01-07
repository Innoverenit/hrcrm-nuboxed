import React, { useEffect, useState } from "react";
import { Tooltip,message,DatePicker,Select } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUserById,  getAllDialCodeList,getTimeZone } from "../../../Auth/AuthAction";
const { Option } = Select;

function ProfileStatsView (props) {
const [emailEdit, setEmailEdit] = useState();
    const [editingRowId, setEditingRowId] = useState(null);
     const [isEditingDate, setIsEditingDate] = useState(false); // Controls editing mode
        const [selectedDate, setSelectedDate] = useState();
         const [isCountryDropdownVisible, setIsCountryDropdownVisible] = useState(null);
            const [selectedCountry, setSelectedCountry] = useState("Select Country");
             const [touched, setTouched] = useState(false);
const [mobileEdit, setMobileEdit] = useState(null);
const [isEditingMobile, setIsEditingMobile] = useState();
const [linkedEdit, setLinkedEdit] = useState();
    const [islinked,setIslikned ] = useState(null);
const [twitterEdit, setTwitterEdit] = useState();
const [isTwitter,setIsTwitter ] = useState(null);
const [selectedTimeZone, setSelectedTimeZone] = useState("Select Time Zone");
const [timeZoneDropdownVisible, setTimeZoneDropdownVisible] = useState(null);
const [timeTouch, setTimeTouch] = useState(false);

  const handleUpdateEmail = () => {
    const updatedName = {
      emailId:emailEdit,
    };
    props.updateUserById(updatedName);
   setEditingRowId(null)
  };
  const handleUpdateLinked = () => {
    const updatedName = {
      linkedinPublicUrl:linkedEdit,
    };
    props.updateUserById(updatedName);
    setIslikned(null)
  };
 const handleUpdateTwitter = () => {
const updatedName = {
  twitter:twitterEdit,
    };
    props.updateUserById(updatedName);
    setIsTwitter(null)
 }

  const handleUpdateMobile = () => {
    const updatedName = {
      phoneNo:isEditingMobile,
    };
    props.updateUserById(updatedName);
    setMobileEdit(null)
  };
  const handleDateChange = (dateString) => {
    if (dateString) {
        // Convert the date string to ISO format with timezone
        const date = new Date(dateString);
        const isoDate = date.toISOString(); // Converts to ISO 8601 format in UTC

        setSelectedDate(isoDate); // Update the local state with the ISO format
        const updatedPayload = {
          dateOfJoining: isoDate, // Include the ISO date in the payload
        };
        props.updateUserById(updatedPayload); // Send the updated payload
        setIsEditingDate(null); // Exit edit mode
    } else {
        message.error("Invalid date selected"); // Notify the user of invalid input
    }
};
const handleCountryChange = (countryId) => {
  const updatedPayload = {
    countryDialCode:countryId // Use the selected country ID
  };

  props.updateUserById(updatedPayload);
  setIsCountryDropdownVisible(null); // Hide the dropdown after the request
};
const handleTimeZoneChange = (timeZone) => {
const updatedPayload = { timeZone };
props.updateUserById(updatedPayload);
setTimeZoneDropdownVisible(false); // Hide the dropdown after the request
}
 const handleTimeSelectFocus = () => {
  if (!timeTouch) {
    props.getTimeZone();
    setTimeTouch(true);
  }
 }

  const handleSelectFocus = () => {
    if (!touched) {
      props.getAllDialCodeList();
      setTouched(true);
    }
  };
 const item= props.user
  const date = dayjs(item.dateOfJoining).format("DD/MM/YYYY"); 
  return (
    <>
     <div class="rounded border-[#0000001f]  border-2  shadow-[#a3abb980] border-solid text-black  p-1 w-full font-poppins overflow-auto" Height={props.Height}>
    <div className="flex items-center justify-between">
   <div>Email</div> 
   {editingRowId  ? (
                                            <input
                                            type="text"
                                            className=""
                                            value={emailEdit}
                                            onChange={(e) => setEmailEdit(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateEmail()}
                                            onBlur={() => handleUpdateEmail()}
                                            autoFocus // Focus the input automatically when editing
                                            />
                                        ) : (
                                            <div onClick={() => {
                                              setEditingRowId(true); // Enable editing mode
                                                setEmailEdit(item.emailId); // Set the initial value from the batchNo of the item
                                            }} className="cursor-pointer  text-xs  font-poppins">
                                                {item.emailId || "Enter Email"}
                                                
                                                </div> // Click to enter edit mode
                                        )}
   </div>
   <div className="flex items-center justify-between">
    <div>Joining Date</div>
   {isEditingDate  ? (
                                        <DatePicker
                                            className="h-7 text-xs font-poppins"
                                            value={selectedDate ? dayjs(selectedDate) : null} // Convert `selectedDate` to dayjs format
                                            onChange={(date, dateString) => handleDateChange(dateString)} // Correctly handle date selection
                                            autoFocus // Focus the picker when editing
                                        />
                                    ) : (
                                        <div 
                                            onClick={() => {
                                              setIsEditingDate(true); // Enable editing mode
                                                setSelectedDate(item.dateOfJoining); // Set the initial value from the batchNo of the item
                                            }} 
                                            className="cursor-pointer text-xs  font-poppins"
                                        >
                                            {date || "Select Date"} {/* Show selected date or prompt */}
                                        </div>
                                    )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                    <div>Mobile</div>
                                    {isCountryDropdownVisible  ? (
                                        <Select
                                        style={{ width: "8rem" }}
                                        value={selectedCountry}
                                        onChange={(value) => {
                                            setSelectedCountry(value); // Update the local state with the selected country
                                            handleCountryChange(value); // Send the payload when the country is selected
                                        }}
                                        onBlur={() => setIsCountryDropdownVisible(false)} // Optionally hide dropdown on blur
                                        onFocus={handleSelectFocus}
                                        >
                                        {props.dialcodeList.map((country) => (
                                            <Option key={country.country_dial_code} value={country.country_dial_code}>
                                            {country.country_dial_code}
                                            </Option>
                                        ))}
                                        </Select>
                                    ):(
                                        <div 
                                        onClick={() => {
                                            setIsCountryDropdownVisible(true); // Enable editing mode
                                            setSelectedCountry(item.countryDialCode); // Set the initial value from the batchNo of the item
                                        }}  
                                        className="cursor-pointer text-xs  font-poppins"
                                    >
                                        {item.countryDialCode || "Select"}

                                    </div>  
                                                            )}

{mobileEdit  ? (
                                            <input
                                            type="text"
                                            className=""
                                            value={isEditingMobile}
                                            onChange={(e) => setIsEditingMobile(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateMobile()}
                                            onBlur={() => handleUpdateMobile()}
                                            autoFocus // Focus the input automatically when editing
                                            />
                                        ) : (
                                            <div onClick={() => {
                                              setMobileEdit(true); // Enable editing mode
                                              setIsEditingMobile(item.phoneNo); // Set the initial value from the batchNo of the item
                                            }} className="cursor-pointer  text-xs  font-poppins">
                                                {item.phoneNo || "Enter Email"}
                                                
                                                </div> // Click to enter edit mode
                                        )}
                                                            </div>

                                                            <div className="flex items-center justify-between">
   <div>Linkedin</div> 
   {islinked  ? (
                                            <input
                                            type="text"
                                            className=""
                                            value={linkedEdit}
                                            onChange={(e) => setLinkedEdit(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateLinked()}
                                            onBlur={() => handleUpdateLinked()}
                                            autoFocus // Focus the input automatically when editing
                                            />
                                        ) : (
                                            <div onClick={() => {
                                              setIslikned(true); // Enable editing mode
                                              setLinkedEdit(item.linkedinPublicUrl); // Set the initial value from the batchNo of the item
                                            }} className="cursor-pointer  text-xs  font-poppins">
                                                {item.linkedinPublicUrl || "Enter Linkedin"}
                                                
                                                </div> // Click to enter edit mode
                                        )}
   </div>            

    <div className="flex items-center justify-between">
   <div>Twitter</div> 
   {isTwitter  ? (
                                            <input
                                            type="text"
                                            className=""
                                            value={twitterEdit}
                                            onChange={(e) => setTwitterEdit(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateTwitter()}
                                            onBlur={() => handleUpdateTwitter()}
                                            autoFocus // Focus the input automatically when editing
                                            />
                                        ) : (
                                            <div onClick={() => {
                                              setIsTwitter(true); // Enable editing mode
                                              setTwitterEdit(item.twitter); // Set the initial value from the batchNo of the item
                                            }} className="cursor-pointer  text-xs  font-poppins">
                                                {item.twitter || "Enter Twitter"}
                                                
                                                </div> // Click to enter edit mode
                                        )}
   </div>           
   <div className="flex items-center justify-between">
   <div>Time Zone</div> 
   {timeZoneDropdownVisible  ? (
                                        <Select
                                        style={{ width: "8rem" }}
                                        value={selectedTimeZone}
                                        onChange={(value) => {
                                          setSelectedTimeZone(value); // Update the local state with the selected country
                                            handleTimeZoneChange(value); // Send the payload when the country is selected
                                        }}
                                        onBlur={() => setTimeZoneDropdownVisible(false)} // Optionally hide dropdown on blur
                                        onFocus={handleTimeSelectFocus}
                                        >
                                        {props.timeZone.map((country) => (
                                            <Option key={country.timezoneId} value={country.timezoneId}>
                                            {country.zoneName}
                                            </Option>
                                        ))}
                                        </Select>
                                    ):(
                                        <div 
                                        onClick={() => {
                                          setTimeZoneDropdownVisible(true); // Enable editing mode
                                          setSelectedTimeZone(item.timeZone); // Set the initial value from the batchNo of the item
                                        }}  
                                        className="cursor-pointer text-xs  font-poppins"
                                    >
                                        {item.timeZone || "Select"}

                                    </div>  
                                                            )}

</div>
</div>
    </>
  );
};


const mapStateToProps = ({ auth }) => ({
  updatingUserById: auth.updatingUserById,
  updatingUserByIdError: auth.updatingUserByIdError,
  dialcodeList: auth.dialcodeList,
  timeZone: auth.timeZone,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserById,
      getAllDialCodeList,
      getTimeZone
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStatsView);