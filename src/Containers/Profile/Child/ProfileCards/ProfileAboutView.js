import React, { useState } from "react";
import { updateUserById,
  getCurrency

 } from "../../../Auth/AuthAction";
 import { Tooltip,message,DatePicker,Select } from "antd";
 import {getDesignations} from "../../../Settings/Designation/DesignationAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getDepartments} from "../../../Settings/Department/DepartmentAction";
import {getDepartmentwiserUser} from "../../../Settings/SettingsAction";
const { Option } = Select;
function ProfileAboutView (props) {

  const [currency, setCurrency] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [label, setLabel] = useState();
  const [manager, setManager] = useState();
  const [isCurrencyEdit, setIsCurrencyEdit] = useState(null);
  const [isDesignationEdit, setIsDesignationEdit] = useState(null);
  const [isDepartmentEdit, setIsDepartmentEdit] = useState(null);
  const [isLabelEdit, setIsLabelEdit] = useState(null);
  const [isManagerEdit, setIsManagerEdit] = useState(null);
  const [currencyTouch , setCurrencyTouch] = useState(false);
  const [designationTouch , setDesignationTouch] = useState(false);
  const [departmentTouch , setDepartmentTouch] = useState(false);
  const [managerTouch , setManagerTouch] = useState(false);

  const handleUpdateCurrency = (currencyId) => {
    const updatedCurrency = {
      currency: currencyId,
    };
    props.updateUserById(updatedCurrency);
    setIsCurrencyEdit(null);
  }
  const handleUpdateDesignation = (designationId) => {
    const updatedDesignation = {
      designation: designationId,
    };
    props.updateUserById(updatedDesignation);
    setIsDesignationEdit(null);
  }
  const handleUpdateDepartment = (departmentId) => {
    const updatedDepartment = {
      department:departmentId,
    };
    props.updateUserById(updatedDepartment);
    setIsDepartmentEdit(null);
  }
  const handleUpdateLabel = (labelId) => {
    const updatedLabel = {
      label:labelId,
    };
    props.updateUserById(updatedLabel);
    setIsLabelEdit(null);
  }
  const handleUpdateManager = (managerId) => {
    const updatedManager = {
      manager:managerId,
    };
    props.updateUserById(updatedManager);
    setIsManagerEdit(null);
  }
const handleCurrencyFocous = () => {
   if (!currencyTouch) {
      props.getCurrency();
      setCurrencyTouch(true);
    }
}
const handleDesignationFocous = () => {
    if (!designationTouch) {
        props.getDesignations();
        setDesignationTouch(true);
      }
}
const handleDepartmentFocous = () => {
    if (!departmentTouch) {
        props.getDepartments();
        setDepartmentTouch(true);
      }
}
const handleManagerFocous = () => {
    if (!managerTouch) {
        props.getDepartmentwiserUser(props.departmentId);
        setManagerTouch(true);
      }
}
const item= props.user
  return (
    <>
      <div className="flex justify-end"></div>
      <div className="flex items-center justify-between">
      <div>Currency</div> 
      {isCurrencyEdit  ? (
                                        <Select
                                        style={{ width: "8rem" }}
                                        value={currency}
                                        onChange={(value) => {
                                          setCurrency(value); // Update the local state with the selected country
                                          handleUpdateCurrency(value); // Send the payload when the country is selected
                                        }}
                                        onBlur={() => setIsCurrencyEdit(false)} // Optionally hide dropdown on blur
                                        onFocus={handleCurrencyFocous}
                                        >
                                        {props.currencies.map((country) => (
                                            <Option key={country.currency_id} value={country.currency_id}>
                                            {country.currency_name}
                                            </Option>
                                        ))}
                                        </Select>
                                    ):(
                                        <div 
                                        onClick={() => {
                                          setIsCurrencyEdit(true); // Enable editing mode
                                          setCurrency(item.currency); // Set the initial value from the batchNo of the item
                                        }}  
                                        className="cursor-pointer text-xs  font-poppins"
                                    >
                                        {item.currency || "Select"}

                                    </div>  
                                                            )}
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                            <div>Designation</div>                                                
      {isDesignationEdit ? (
                                        <Select
                                        style={{ width: "8rem" }}
                                        value={designation}
                                        onChange={(value) => {
                                          setDesignation(value); // Update the local state with the selected country
                                          handleUpdateDesignation(value); // Send the payload when the country is selected
                                        }}
                                        onBlur={() => setIsDesignationEdit(false)} // Optionally hide dropdown on blur
                                        onFocus={handleDesignationFocous}
                                        >
                                        {props.designations.map((country) => (
                                            <Option key={country.designationTypeId} value={country.designationTypeId}>
                                            {country.designationType}
                                            </Option>
                                        ))}
                                        </Select>
                                    ):(
                                        <div 
                                        onClick={() => {
                                          setIsDesignationEdit(true); // Enable editing mode
                                          setDesignation(item.designation); // Set the initial value from the batchNo of the item
                                        }}  
                                        className="cursor-pointer text-xs  font-poppins"
                                    >
                                        {item.designation || "Select"}

                                    </div>  
                                                            )}
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                            <div>Department</div>  
      {isDepartmentEdit ? (
                                        <Select
                                        style={{ width: "8rem" }}
                                        value={department}
                                        onChange={(value) => {
                                          setDepartment(value); // Update the local state with the selected country
                                          handleUpdateDepartment(value); // Send the payload when the country is selected
                                        }}
                                        onBlur={() => setIsDepartmentEdit(false)} // Optionally hide dropdown on blur
                                        onFocus={handleDepartmentFocous}
                                         >
                                        {props.departments.map((country) => (
                                            <Option key={country.departmentId} value={country.departmentId}>
                                            {country.departmentName}
                                            </Option>
                                        ))}
                                        </Select>
                                    ):(
                                        <div 
                                        onClick={() => {
                                          setIsDepartmentEdit(true); // Enable editing mode
                                          setDepartment(item.department); // Set the initial value from the batchNo of the item
                                        }}  
                                        className="cursor-pointer text-xs  font-poppins"
                                    >
                                        {item.department || "Select"}

                                    </div>  
                                                            )}
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                            <div>Level</div>  
      {isLabelEdit ? (
                                        <Select
                                        style={{ width: "8rem" }}
                                        value={label}
                                        onChange={(value) => {
                                          setLabel(value); // Update the local state with the selected country
                                          handleUpdateLabel(value); // Send the payload when the country is selected
                                        }}
                                        onBlur={() => setIsLabelEdit(false)} // Optionally hide dropdown on blur
                                        >
                                       
                                       <Option value="L1">L1</Option>
                                        <Option value="L2">L2</Option>
                                        <Option value="L3">L3</Option>
                                        <Option value="L4">L4</Option>
                                        <Option value="L5">L5</Option>
                                        <Option value="L6">L6</Option>

                                      
                                        </Select>
                                    ):(
                                        <div 
                                        onClick={() => {
                                          setIsLabelEdit(true); // Enable editing mode
                                          setLabel(item.label); // Set the initial value from the batchNo of the item
                                        }}  
                                        className="cursor-pointer text-xs  font-poppins"
                                    >
                                        {item.label || "Select"}

                                    </div>  
                                                            )}
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                            <div>Manager</div>  
      {isManagerEdit ? (
                                        <Select
                                        style={{ width: "8rem" }}
                                        value={manager}
                                        onChange={(value) => {
                                          setManager(value); // Update the local state with the selected country
                                          handleUpdateManager(value); // Send the payload when the country is selected
                                        }}
                                        onBlur={() => setIsManagerEdit(false)} // Optionally hide dropdown on blur
                                        onFocus={handleManagerFocous}
                                        >
                                        {props.departmentwiserUser.map((country) => (
                                            <Option key={country.user_id} value={country.user_id}>
                                            {country.user_name}
                                            </Option>
                                        ))}
                                        </Select>
                                    ):(
                                        <div 
                                        onClick={() => {
                                          setIsManagerEdit(true); // Enable editing mode
                                          setManager(item.manager); // Set the initial value from the batchNo of the item
                                        }}  
                                        className="cursor-pointer text-xs  font-poppins"
                                    >
                                        {item.manager || "Select"}

                                    </div>  
                                                            )}
                                                            </div>
     
    </>
  );
};



const mapStateToProps = ({ auth,departments,designations }) => ({
  updatingUserById: auth.updatingUserById,
  updatingUserByIdError: auth.updatingUserByIdError,
  dialcodeList: auth.dialcodeList,
  timeZone: auth.timeZone,
  departments: departments.departments,
  currencies: auth.currencies,
  designations: designations.designations,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserById,
      getCurrency,
      getDesignations,
      getDepartments,
      getDepartmentwiserUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAboutView);

