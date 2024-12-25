import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Switch, Select, message } from "antd";
import { getDepartmentwiserUser } from "../../Settings/SettingsAction"
import { getCurrency } from "../../Auth/AuthAction"
import { getlocation } from "../../Event/Child/Location/LocationAction";
import { getCountries, 
  // getTimeZone
 } from "../../Auth/AuthAction"
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { Radio } from "antd";
import * as Yup from "yup";
import { addEmployee, getAssignedToList } from "../EmployeeAction";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { getRoles } from "../../Settings/Category/Role/RoleAction"
import { getDesignations } from "../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../Settings/Department/DepartmentAction";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";

const { Option } = Select;

const EmployeeSchema = Yup.object().shape({
  departmentId: Yup.string().required("Input needed!"),
  roleType: Yup.string().required("Input needed!"),
  workplace: Yup.string().required("Input needed!"),
  location: Yup.string().required("Input needed!"),
  workplace: Yup.string().required("Input needed!"),
});

function EmployeeForm(props) {

  const [active, setActive] = useState(false);
  const [department, setDepartment] = useState("");
  const [secondatDepartment, setSecondaryDepartment] = useState("");
  const [reportingManager, setreportingManager] = useState("")
  const [secondaryReportingManager, setSecondaryreportingManager] = useState("")
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [bundleLoading, setLoading] = useState(true);
  const [checked, setChecked] = useState(true);
  const [typeInd, setTypeInd] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [workType, setWorkType] = useState("employee");

  const radioClick = (c) => {
    setWorkType(c);
  };

  const handleJobType = (checked) => {
    setActive(checked);
  };

  const handleType = (checked) => {
    setTypeInd(checked);
  };
  const timeZoneOption = props.timeZone.map((item) => {
    return {
      label: item.zone_name
        || null,
      value: item.timezone_id
      ,
    };
  });

  const handleDepartment = (val) => {
    setDepartment(val)
    props.getDepartmentwiserUser(val);
  }
  const handleSecondaryDepartment = (val) => {
    setSecondaryDepartment(val)
    props.getDepartmentwiserUser(val);
  }
 

  const handlereportingManager = (val) => {
    setreportingManager(val)
  }
  const handleSecondaryreportingManager = (val) => {
    setSecondaryreportingManager(val)
  }
  const handleDeptChange = (event) => {
    const selectedDept = event.target.value;
    const filteredRoles = props.roles.filter((item) => item.departmentId === selectedDept);
    setSelectedDept(selectedDept);
    setSelectedRole(filteredRoles);
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedRole(selectedRole);
  };
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const filteredLocations = props.showLocation.filter((item) => item.country_name === selectedCountry);
    setSelectedCountry(selectedCountry);
    setLocations(filteredLocations);
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocations(selectedLocation);
  };

  const getRoleOptions = (filterOptionKey, filterOptionValue) => {
    const roleOptions =
      props.roles.length &&
      props.roles
        .filter((option) => {
          if (
            option.departmentId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.roleType || "",
          value: option.roleTypeId,
        }));

    return roleOptions;
  }
  const getLocationOptions = (filterOptionKey, filterOptionValue) => {
    const LocationOptions =
      props.showLocation.length &&
      props.showLocation
        .filter((option) => {
          if (
            option.country_name === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.locationName || "",
          value: option.locationDetailsId,
        }));

    return LocationOptions;
  }
  const getLocationNameOption = (filterOptionKey, filterOptionValue) => {
    const locationOptions = props.showLocation
      .filter(option => option.country_id === filterOptionValue && option.probability !== 0)
      .map(option => ({
        label: option.locationName || "",
        value: option.locationDetailsId,
      }));

    return locationOptions;
  }

  const WorkplaceOptions = props.countries.map((item) => {
    return {
      label: `${item.country_name || ""}`,
      value: item.country_name,
    };
  });

  const sortedCurrency = props.currencies.sort((a, b) => {
    const nameA = a.currency_name.toLowerCase();
    const nameB = b.currency_name.toLowerCase();
    // Compare department names
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const currencyNameOption = sortedCurrency.map((item) => {
    return {
      label: `${item.currency_name}`,
      value: item.currency_id,
    };
  });
  const designationNameOption = props.designations.map((item) => {
    return {
      label: `${item.designationType}`,
      value: item.designationTypeId,
    };
  });
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
        "294", // "Upload",//0
         "295",  // "First Name",//1
          "353", // "Middle Name",//2
         "354",  // "Last Name",//3
          "140", // "Email",//4
         "241",  // "Currency",//5
          "357", // "Dial Code",//6
          "964", // "Personal",//7
         "357",  // "Dial Code",//8
         "685",  // "Work #",//9
         "967",  // "Date Of Joining",//10
          "968", // "Date Of Birth",//11
          "547", // "Linkedln",//12
         "185",  // "Address",//13
          "186", // "Street",//14
          "187", // "Zip code",//15
          "188", // "City",//16
         "314",  // "State/Provinence",//17
        "1109",// "Country",//18
        "95",   // "Time Zone",//19
        "326",   // "Department",//20
          "979", // "Level",//21
         "980",  // "Role",//22
         "981",  // "Salary",//23
          "325", // "Designation",//24
         "983",  // "Workplace",//25
         "658",  // "Location",//26
          "985", // "Job Type",//27
         "14",  // "Category",//28
         "991",  // "Employee Type",//29
         "992",  // "Employee",//30
       "1270",   // "Intern",//31
       "1271", //  "",   // "Reports To Department",//32
         "997",  // "Reporting Manager",//33
        "998",   // "Secondary Department",//34
         "999",  // "Secondary Reporting Manager",//35
         "154",  // "Submit",//36
         "969",  // "Address for  Corresponedence",//37
          
         
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    const { getCountries, getDepartments,
      //  getTimeZone,
        getCurrency, getAssignedToList, getRoles, getlocation,getDesignations } = props;
    getRoles(props.organizationId);
    getCountries(getCountries);
    getlocation(props.orgId);
    getCurrency();
    getDepartments();
    getAssignedToList(props.orgId)
    getDesignations()
    // getTimeZone();
  }, []);

  const WorkflowOptions = props.departments.map((item) => {
    return {
      label: `${item.departmentName || ""}`,
      value: item.departmentId,
    };
  });

  const getEmployeesbyDepartment = (filterOptionKey, filterOptionValue) => {
    const StagesOptions =
      props.employees.length &&
      props.employees
        .filter((option) => {
          if (
            option.departmentId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .sort((a, b) => {
          const stageDealA = a.name && a.name.toLowerCase();
          const stageDealB = b.name && b.name.toLowerCase();
          if (stageDealA < stageDealB) {
            return -1;
          }
          if (stageDealA > stageDealB) {
            return 1;
          }
          return 0;
        })

        .map((option) => ({
          label: option.fullName || "",
          value: option.employeeId,
        }));

    return StagesOptions;
  }
  const {
    user: { firstName,empName, middleName, fullName, lastName, timeZone },
    userId,
  } = props;


  const dialCodeNameOption = props.countries.map((item) => {
    return {
      label: `${item.country_dial_code || ""}`,
      value: item.country_dial_code,
    };
  });

  const DepartmentOptions = props.departments.map((item) => {
    return {
      label: `${item.departmentName || ""}`,
      value: item.departmentId,
    };
  });
  const countryNameOption = props.countries.map((item) => {
    return {
      label: `${item.country_name || ""}`,
      value: item.country_name,
    };
  });
  // if (bundleLoading) {
  //   return <div><BundleLoader/></div>;
  // }
  const { addEmployee, addingEmployee } = props;
  const selectedOption = props.assignedToList.find((item) => item.empName === selected);
 
  return (
    <>
      <Formik
        initialValues={{
          salutation: "",
          firstName: "",
          lastName: "",
          emailId: "",
          salary:"",
          countryDialCode: props.userDetails.countryDialCode || "",
          countryDialCode1: props.userDetails.countryDialCode1 || "",
          phoneNo: "",
          dateOfJoining: dayjs(),
          dob: dayjs(),
          mobileNo: "",
          timeZone: timeZone,
          country: "",
          location: "",
          designationTypeId: "",
          departmentId: "",
          roleType: "",
          linkedinPublicUrl: "",
          label: "",
          workplace: "",
          designationTypeId:"",
          assignedTo: selectedOption ? selectedOption.employeeId : userId,
          job_type: active ? "Full Time" : "Part Time",
          type: typeInd ? "true" : "false",
          employee_type: workType,
          // job_type: active,

          // reportingManager: props.userDetails.userId
          //   ? props.userDetails.userId
          //   : "",
          address: [
            {
              addressType: "",
              address1: "",
              address2: "",
              town: "",
              street: "",
              city: "",
              postalCode: "",
              country: "",
              latitude: "",
              longitude: "",
            },
          ],
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(values, { resetForm }) => {
          if (department && reportingManager) {
            props.addEmployee({
              ...values,
              reportingManagerDeptId: department,
              reportingManager: reportingManager,
              secondaryReptManagerDept:secondatDepartment,
              secondaryReptManager:secondaryReportingManager,
              job_type: active ? "Full Time" : "Part Time",
              type: typeInd ? "true" : "false",
              assignedTo: selectedOption ? selectedOption.employeeId : userId,
              employee_type: workType,
            }, "cretiondate");
          }
          else {
            message.error("Please Provide Department And Reporting Manager ! ")
          }
          resetForm();
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <div class=" h-[32rem]  max-sm:h-[30rem]">
            <Form className="form-background h-[84vh]">
              <div class="flex justify-between  pr-2 max-sm:flex-col">
                <div class=" w-[47.5%] max-sm:w-wk">

                  <div class=" flex flex-nowrap justify-between mt-3" >
                    {/* <FastField name="imageId" component={Upload} /> */}
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col" >
                      
                        <div class=" w-wk max-sm:w-full">
                        <div class=" text-xs font-bold font-poppins">{translatedMenuItems[1]}</div>
                          <Field
                            isRequired
                            name="firstName"
                            type="text"
                            isColumn
                            width={"100%"}
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                      <div class=" flex justify-between max-sm:flex-col" >
                        <div class=" w-2/5 max-sm:w-full">
                        <div class=" text-xs font-bold font-poppins">{translatedMenuItems[2]}</div>
                          {" "}
                          <Field

                            name="middleName"
                            type="text"
                            isColumn
                            width={"100%"}
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-3/6 max-sm:w-full"> 
                        <div class=" text-xs font-bold font-poppins">{translatedMenuItems[3]}</div>
                          {" "}
                          <Field
                            name="lastName"
                            type="text"
                            isColumn
                            width={"100%"}
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class=" flex justify-between" >
                    <div class=" w-[70%] flex flex-col max-sm:w-wk">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[4]}</div>
                      <Field
                        isRequired
                        name="emailId"
                        type="text"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                    <div class=" max-sm:w-wk">
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[5]}</div>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Currency"
                        isColumn
                        // selectType="currencyName"
                        isRequired
                        component={SelectComponent}
                        options={
                          Array.isArray(currencyNameOption)
                            ? currencyNameOption
                            : []
                        }

                      />
                    </div>
                  </div>
                  <div class="flex justify-between max-sm:flex-col">
                    <div class=" flex  w-w47.5.5 justify-between mt-4 max-sm:flex-col max-sm:w-wk " >
                      <div class=" w-w47.5.5 max-sm:w-wk ">
                      <div class=" text-xs font-bold font-poppins">{translatedMenuItems[6]}</div>
                        <FastField
                          name="countryDialCode"
                          isColumnWithoutNoCreate
                          isColumn
                          // width={"100%"}
                          selectType="dialCode"
                          component={SearchSelect}
                          inlineLabel
                        />
                      </div>
                      <div class=" w-w47.5.5 max-sm:w-wk">
                       <div class=" text-xs font-bold font-poppins">{translatedMenuItems[7]}</div>
                        <Field
                          type="text"
                          name="mobileNo"
                          placeholder="Input"
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                          isColumn
                        />

                      </div>

                    </div>
                    <div class=" flex  w-w47.5.5 justify-between mt-4 max-sm:flex-col max-sm:w-wk" >
                      <div class="w-w47.5.5 max-sm:w-wk">
                      <div class=" text-xs font-bold font-poppins">{translatedMenuItems[6]}</div>
                        <FastField
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                         
                          isColumn
                          // width={"100%"}
                          selectType="dialCode"
                          component={SearchSelect}
                          inlineLabel
                        />
                      </div>
                      <div class="w-w47.5.5 max-sm:w-wk">
                      <div class=" text-xs font-bold font-poppins">{translatedMenuItems[9]}</div>
                        <Field
                          type="text"
                          name="phoneNo"
                          // label="Work #"
                          placeholder="Input"
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                          isColumn
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between max-sm:flex-col" >
                    <div class="mt-2 w-w48 max-sm:w-wk">
                  
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[10]}</div>
                      <Field
                        isRequired
                        name="dateOfJoining"
                        
                        isColumn
                        component={DatePicker}
                        value={values.dateOfJoining}
                        // defaultValue={dayjs("2020-01-01")}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    <div class="mt-2 w-w47.5.5 max-sm:w-wk">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[11]}</div>
                  
                      <Field
                        isRequired
                        name="dob"
                     
                        isColumn
                        component={DatePicker}
                        value={values.dob}
                        // defaultValue={dayjs("2020-01-01")}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>

                  <div class=" flex justify-between" >
                    <div class="mt-2 w-full">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[12]}</div>
                      <Field
                        name="linkedinPublicUrl"
                        type="text"
                        isColumn
                        width={"100%"}
                    
                        component={InputComponent}
                        inlineLabel
                      />

                    </div>

                  </div>
                  <div style={{ width: "100%", backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)", marginTop: "0.5rem" }}>
                    <div>
                      <div class=" text-[white] text-xs font-bold font-poppins" >
                      {translatedMenuItems[37]} {/* Address for  Corresponedenc */}
                        </div>
                    </div>
                  </div>

                  <div class=" text-xs font-bold font-poppins">{translatedMenuItems[13]}</div>
                  <FieldArray
                    name="address"
                    // label="Address"
                   
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                      {...props}
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />




                </div>


                <div class=" w-[47.5%] max-sm:w-wk ">
                <div class=" text-xs font-bold font-poppins">{translatedMenuItems[19]}</div>
                  <div class=" w-full mt-2">
                    <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    name="timeZone"
                    isColumnWithoutNoCreate
                    //label="TimeZone "
                    
                    // label={translatedMenuItems[19]}
                    selectType="timeZone"
                    isColumn
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                  />
                  </div>
          
                  <div class=" flex justify-between max-sm:flex-col mt-4" >
                    <div class=" w-w48 flex flex-col max-sm:w-wk">
                      {/*
                      <select  className="customize-select"
               */}
        <div class=" text-xs font-bold font-poppins">{translatedMenuItems[20]}</div>
                      <Field
                        name="departmentId"
                        isColumnWithoutNoCreate
                  
                        //     defaultMessage="Department"
               
                        component={SelectComponent}
                        options={
                          Array.isArray(DepartmentOptions)
                            ? DepartmentOptions
                            : []
                        }
                        value={values.departmentId}
                        isColumn
                        margintop={"0"}
                        inlineLabel
                      />

                    </div>
                    <div class="w-w47.5.5 max-sm:w-wk">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[21]}</div>
                      <FastField
                        name="label"
                        type="level"
                        placeholder="Select"
                        
                        // label={translatedMenuItems[21]}
                        options={["L1", "L2", "L3"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field"
                        isColumn
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between max-sm:flex-col" >
                  <div class=" w-w48 max-sm:w-wk mt-3">
                  <div class=" text-xs font-bold font-poppins">{translatedMenuItems[22]}</div>
                    <Field
                      name="roleType"
                  
                      isColumnWithoutNoCreate
                      component={SelectComponent}
                      options={
                        Array.isArray(
                          getRoleOptions(
                            "departmentId",
                            values.departmentId
                          )
                        )
                          ? getRoleOptions(
                            "departmentId",
                            values.departmentId
                          )
                          : []
                      }
                      value={values.roleType}
                      filterOption={{
                        filterType: "departmentId",
                        filterValue: values.departmentId,
                      }}
                      disabled={!values.departmentId}
                      isColumn
                      margintop={"0"}
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    // value={values.roleTypeId}
                    // width={"100%"}
                    // isColumn
                    // selectType="roleType"
                    />
                  </div>
                    <div class="mt-3 w-w48 flex flex-col max-sm:w-wk">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[23]}</div>
                    <Field
                    
                        name="salary"
                        type="text"
                        isColumn
                        width={"100%"}
                  //Salary" />}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                 

                
                  </div>
                  <div class=" max-sm:w-wk">
                  <div class=" text-xs font-bold font-poppins">{translatedMenuItems[24]}</div>
                      <Field
                        name="designationTypeId"
                        isColumnWithoutNoCreate
                        placeholder="Designation"
                        // label={translatedMenuItems[24]} 
                        // label="Designation"
                        isColumn
                        // selectType="currencyName"
                        isRequired
                        component={SelectComponent}
                        options={
                          Array.isArray(designationNameOption)
                            ? designationNameOption
                            : []
                        }

                      />
                      </div>
                  <div class=" flex justify-between max-sm:flex-col" >
                    <div class="mt-3 w-w48 flex flex-col max-sm:w-wk">
             
             <div class=" text-xs font-bold font-poppins">{translatedMenuItems[25]}</div>
                      <Field
                        name="workplace"
                        isColumnWithoutNoCreate
                      
                        //     defaultMessage="Workplace"
                       
                        component={SelectComponent}
                        options={
                          Array.isArray(WorkplaceOptions)
                            ? WorkplaceOptions
                            : []
                        }
                        value={values.workplace}
                        isColumn
                        margintop={"0"}
                        inlineLabel
                      />
                    </div>

                    <div class="mt-3 w-w47.5.5 flex flex-col max-sm:w-wk">
                     {/* locationName */}
                      <div class=" text-xs font-bold font-poppins">{translatedMenuItems[26]}</div>
                      <Field
                        name="location"
                     
                        //   defaultMessage="Location"
                        // />}
                        isColumnWithoutNoCreate
                        component={SelectComponent}
                        options={
                          Array.isArray(
                            getLocationOptions(
                              "workplace",
                              values.workplace
                            )
                          )
                            ? getLocationOptions(
                              "workplace",
                              values.workplace
                            )
                            : []
                        }
                        value={values.location}
                        filterOption={{
                          filterType: "workplace",
                          filterValue: values.workplace,
                        }}
                        disabled={!values.workplace}
                        isColumn
                        margintop={"0"}
                        inlineLabel

                      />


                      
                    </div>
                  </div>

               
                  <div class=" flex mt-2 " >
                    <div>
                      <div class="font-bold font-poppins m-[0.1rem-0-0.02rem-0.2rem] mt-3 text-xs flex flex-col">
                     {translatedMenuItems[27]}  {/* Job Type */}
                      </div>
                      <Switch
                        checked={active}
                        onChange={handleJobType}
                        checkedChildren="Part Time"
                        unCheckedChildren="Full Time"
                      />
                  
                    </div>

                    <div class=" ml-4 mt-3">
                      <div class="font-bold font-poppins m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                        {/* Category"
                        /> */} 
                        {translatedMenuItems[28]}
                      </div>
                      <Switch
                        checked={typeInd}
                        onChange={handleType}
                        checkedChildren="External"
                        unCheckedChildren="Internal"
                      />

                    </div>
                  </div>

                  <div class=" mt-3">
                    <div class="font-bold font-poppins m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      {/* Employee Type"
                    /> */} {translatedMenuItems[29]}
                    </div>

                    <Radio.Group
                      name="radiogroup"
                      defaultValue={workType}
                    >
                      <Radio
                        style={{ marginLeft: "0.5rem" }}
                        value={"Employee"}
                        onChange={() => radioClick("employee")}
                      >
                        {translatedMenuItems[30]} {/* Employee */}
                      </Radio>
                      {typeInd === true && (
                        <Radio
                          style={{ marginLeft: "0.5rem" }}
                          value={"contractor"}
                          onChange={() => radioClick("contractor")}
                        >
                          Contractor
                        </Radio>
                      )}
                      <Radio
                        style={{ marginLeft: "0.5rem" }}
                        value={"intern"}
                        onChange={() => radioClick("intern")}
                      >
                        Intern
                      </Radio>

                    </Radio.Group>
                  </div>
                  <div class="mt-2">
                  <div class=" text-xs font-bold font-poppins">{translatedMenuItems[32]}</div>
                 
                      {/* Reports To */} 
                  </div>


                  <div class=" flex justify-between  max-sm:flex-col" >
                    <div class=" w-w48 max-sm:w-wk mt-2">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[20]}</div>
                     {/* Department */}
                        
                      <Select
                        className="w-[250px]"
                        value={department}
                        onChange={(value) => handleDepartment(value)}
                      >
                        {props.departments.map((a) => {
                          return <Option value={a.departmentId}>{a.departmentName}</Option>;
                        })}
                      </Select>
                    </div>

                    <div class="w-w48  max-sm:w-wk">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[33]}</div>
                      {/* Reporting Manager */}
                       
                      <Select
                        className="w-[250px]"
                        value={reportingManager}
                        onChange={(value) => handlereportingManager(value)}
                      >
                        {props.departmentwiseUser.map((a) => {
                          return <Option value={a.employeeId}>{a.empName}</Option>;
                        })}
                      </Select>

                    </div>
                  </div>
                  <div class=" flex justify-between  max-sm:flex-col" >
                    <div class=" w-w48 max-sm:w-wk mt-3">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[34]}</div>
                    {/* Secondary Department */}
                      
                      <Select
                        className="w-[250px]"
                        value={secondatDepartment}
                        onChange={(value) => handleSecondaryDepartment(value)}
                      >
                        {props.departments.map((a) => {
                          return <Option value={a.departmentId}>{a.departmentName}</Option>;
                        })}
                      </Select>
                    </div>

                    <div class="w-w48  max-sm:w-wk mt-3">
                    <div class=" text-xs font-bold font-poppins">{translatedMenuItems[35]}</div>
                     {/* Secondary Reporting Manager */}
                     
                      <Select
                        className="w-[250px]"
                        value={secondaryReportingManager}
                        onChange={(value) => handleSecondaryreportingManager(value)}
                      >
                        {props.departmentwiseUser.map((a) => {
                          return <Option value={a.employeeId}>{a.empName}</Option>;
                        })}
                      </Select>

                    </div>
                  </div>
                  
                </div>
              </div>

              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={addingEmployee}
                >
                  {translatedMenuItems[36]} {/* Submit */}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );

}
const mapStateToProps = ({ auth, role, location, currency, settings, employee, designations, departments }) => ({
  userDetails: auth.userDetails,
  roles: role.roles,
  user: auth.userDetails,
  currencies: auth.currencies,
  timeZone: auth.timeZone,
  fullName: auth.userDetails.fullName,
  assignedToList: employee.assignedToList,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  countries: auth.countries,
  showLocation: location.showLocation,
  addingEmployee: employee.addingEmployee,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
  employees: employee.employees,
  designations:designations.designations,
  departments: departments.departments,
  departmentwiseUser: settings.departmentwiseUser,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addEmployee,
    getCountries,
    getDesignations,
    getDepartments,
    getDepartmentwiserUser,
    getRoles,
    getlocation,
    getCurrency,
    // getTimeZone,
    getAssignedToList,
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
