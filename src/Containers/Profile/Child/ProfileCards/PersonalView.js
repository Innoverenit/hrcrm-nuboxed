import React, { useEffect, useState } from "react";
import { StyledCollapse } from "../../../../Components/UI/Antd";
import dayjs from "dayjs";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { updateUserById } from "../../../Auth/AuthAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DatePicker,message } from "antd";

const Panel = StyledCollapse.Panel;

function PersonalView (props) {
  
  const [bloodEdit, setbloodEdit] = useState();
      const [editingbloodId, setEditingbloodId] = useState(null);
       const [isEditingDate, setIsEditingDate] = useState(false); // Controls editing mode
              const [selectedDate, setSelectedDate] = useState();

       const handleUpdateBlood = () => {
          const updatedName = {
            bloodGroup:bloodEdit,
          };
          props.updateUserById(updatedName);
          setEditingbloodId(null)
        };
        const handleDateChange = (dateString) => {
          if (dateString) {
              // Convert the date string to ISO format with timezone
              const date = new Date(dateString);
              const isoDate = date.toISOString(); // Converts to ISO 8601 format in UTC
      
              setSelectedDate(isoDate); // Update the local state with the ISO format
              const updatedPayload = {
                dob: isoDate, // Include the ISO date in the payload
              };
              props.updateUserById(updatedPayload); // Send the updated payload
              setIsEditingDate(null); // Exit edit mode
          } else {
              message.error("Invalid date selected"); // Notify the user of invalid input
          }
      };
        const item= props.user
          const date = dayjs(item.dob).format("DD/MM/YYYY"); 
  return (
    <>
      <div className="flex justify-end"></div>
      <StyledCollapse
        bordered={false}
        defaultActiveKey={["0"]}
        expandIcon={({ isActive }) => (
          <ArrowDropDownCircleIcon type="caret-right" rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header={"Personal"} key="1">
        <div className="flex items-center justify-between">
   <div>Blood Group</div> 
   {editingbloodId  ? (
                                            <input
                                            type="text"
                                            className=""
                                            value={bloodEdit}
                                            onChange={(e) => setbloodEdit(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateBlood()}
                                            onBlur={() => handleUpdateBlood()}
                                            autoFocus // Focus the input automatically when editing
                                            />
                                        ) : (
                                            <div onClick={() => {
                                              setEditingbloodId(true); // Enable editing mode
                                              setbloodEdit(item.bloodGroup); // Set the initial value from the batchNo of the item
                                            }} className="cursor-pointer  text-xs  font-poppins">
                                                {item.bloodGroup || "Enter Email"}
                                                
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
                                                setSelectedDate(item.dob); // Set the initial value from the batchNo of the item
                                            }} 
                                            className="cursor-pointer text-xs  font-poppins"
                                        >
                                            {date || "Select Date"} {/* Show selected date or prompt */}
                                        </div>
                                    )}
                                    </div> 
          {/* <ProfileItemRow
            label="Date Of Birth"
            value={dob ? dayjs(dob).format("YYYY-MM-DD") : ""}
          /> */}
        </Panel>
      </StyledCollapse>
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
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView);
