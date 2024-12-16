import React, { Component } from "react";
import { Button, Switch, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Radio, message } from "antd";
import { getlocation } from "../../../Event/Child/Location/LocationAction";
import { getDepartmentwiserUser } from "../../../Settings/SettingsAction"
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { getCurrency } from "../../../Auth/AuthAction"
import { 
  // getTimeZone,
   getCountries } from "../../../Auth/AuthAction"
   import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import { getRoles } from "../../../Settings/Category/Role/RoleAction"
import { updateEmployee, } from "../../EmployeeAction";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import * as Yup from "yup";
import PostImageUpld from "../../../../Components/Forms/Formik/PostImageUpld";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
const { Option } = Select;

const EmployeeSchema = Yup.object().shape({
  departmentId: Yup.string().required("Input needed!"),
  roleType: Yup.string().required("Input needed!"),
  workplace: Yup.string().required("Input needed!"),
  location: Yup.string().required("Input needed!"),
  workplace: Yup.string().required("Input needed!"),
});
class UpdateEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      checked: true,
      typeInd:this.props.userData.typeInd || "",
      role: [],
      reportingManager: this.props.userData.reportingManager || "",
      department: this.props.userData.reportingManagerDeptId || "",
      secondatDepartment:this.props.userData.secondaryReptManagerDept || "",
      secondaryReportingManager:this.props.userData.secondaryReptManager || "",
      selectedRole: "",
      selectedCountry: '',
      selectedDept: "",
      locations: [],
      selectedLocation: "",
      workType:this.props.userData.employee_type || "",
      translatedMenuItems: [],
    };
  }





  componentDidMount() {
    const { getCountries, getEmployeelist, getDepartments,getDesignations,
      //  getTimeZone
        getCurrency, getRoles, getlocation, } = this.props;
    getRoles(this.props.organizationId);
    // getTimeZone();
    getlocation(this.props.orgId);
    getCountries(getCountries);
    getDepartments();
    getCurrency();
    this.props.getDepartmentwiserUser(this.state.department);
    getDesignations();
    this.fetchMenuTranslations();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "295",//0First Name"
        "353",//1Middle Name"
        "354",//2"Last Name"
        "140",//3 Email"
        "241",// Currency4
        "357", // Dial Code"5
        "964",// Personal"6
        "685",// "Work #7
        "967",// "Date of Joining"8
        "968", // Date of Birth"9
        "547", // LinkedIn"10
        "95", // "time Zone"11
        "326",// "Department"12
        "979",// Level13
        "980",// "Role"14
        "981", // "Salary"15
        "325",// Designation"16
        "983",// Workplace"17
        "658", // "Location"18
        "985",// Job Type19
        "986",// Full Time20
        "987", // Part Time21
        "14", // Category"22
        "990", // External23
        "989",// Internal"24
        "991",// Employee Type"25
        "992",// Employee26
        "993", // Contractor27
        "1270", // Intern28
        "995", // Reports To29
        "997", // Reporting Manager30
        "998", // Secondary Department31
        "999", // Secondary Reporting Manager32
        "1246", // Update33
       "1641", // input

      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  handleReset = (resetForm) => {
    resetForm();
  };
  handleJobType = (checked) => {
    this.setState({ active: checked });
  };
  handleType = (checked) => {
    this.setState({ typeInd: checked });
  };
  radioClick = (c) => {
    this.setState({ workType: c });
  };

  handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    this.setState({ selectedLocation });
  };
  handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const filteredLocations = this.props.showLocation.filter((item) => item.country_name === selectedCountry);
    this.setState({ selectedCountry, locations: filteredLocations });
  };
  getLocationNameOption(filterOptionKey, filterOptionValue) {
    const locationOptions = this.props.showLocation
      .filter(option => option.country_id === filterOptionValue && option.probability !== 0)
      .map(option => ({
        label: option.locationName || "",
        value: option.locationDetailsId,
      }));

    return locationOptions;
  }
  handleDepartment = (val) => {
    this.setState({ department: val });
    this.props.getDepartmentwiserUser(val);
  }
 handleSecondaryDepartment = (val) => {
  this.setState({ secondatDepartment: val });
    this.props.getDepartmentwiserUser(val);
  }
 handleSecondaryreportingManager = (val) => {
  this.setState({ secondaryReportingManager: val });
  }
  handlereportingManager = (val) => {
    this.setState({ reportingManager: val });
  }

  handleDeptChange = (event) => {
    const selectedDept = event.target.value;
    const filteredRoles = this.props.roles.filter((item) => item.departmentId === selectedDept);
    this.setState({ selectedDept, role: filteredRoles });
  };
  handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    this.setState({ selectedRole });
  };


  getRoleOptions(filterOptionKey, filterOptionValue) {
    const roleOptions =
      this.props.roles.length &&
      this.props.roles
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
  getLocationOptions(filterOptionKey, filterOptionValue) {
    const LocationOptions =
      this.props.showLocation.length &&
      this.props.showLocation
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
  getEmployeesbyDepartment(filterOptionKey, filterOptionValue) {
    const StagesOptions =
      this.props.employees.length &&
      this.props.employees
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
  componentDidMount () {
    this.setState({active:this.props.userData.job_type==="Full Time"?true : false,
  checked:this.props.userData.job_type==="Part Time"? false  : true
  })
};

  render() {
  
    const { user, reportingManager, department,secondatDepartment,secondaryReportingManager, selectedRow, dueDate } = this.state;
    const timeZoneOption = this.props.timeZone.map((item) => {
      return {
        label: item.zone_name
          || null,
        value: item.timezone_id
        ,
      };
    });

    const dialCodeNameOption = this.props.countries.map((item) => {
      return {
        label: item.country_dial_code || "",
        value: item.country_dial_code,
      };
    });

    const WorkflowOptions = this.props.departments.map((item) => {
      return {
        label: item.departmentName || "",
        value: item.departmentId,
      };
    });


    const sortedCurrency = this.props.currencies.sort((a, b) => {
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
        label: item.currency_name,
        value: item.currency_id,
      };
    });

    const DepartmentOptions = this.props.departments.map((item) => {
      return {
        label: ` ${item.departmentName || ""}`,
        value: item.departmentId,
      };
    });

    const WorkplaceOptions = this.props.countries.map((item) => {
      return {
        label: `${item.country_name || ""}`,
        value: item.country_name,
      };
    });
    const designationNameOption = this.props.designations.map((item) => {
      return {
        label: `${item.designationType}`,
        value: item.designationTypeId,
      };
    });

    const {
      user: { firstName,empName, middleName, fullName, lastName, timeZone },
      userId,
    } = this.props;

    const { clearbit, userData } = this.props;
 

    console.log(userData)
    console.log(this.props.userDetails)
 
    return (
      <>
        <Formik
          initialValues={{
            salutation: userData.salutation || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            emailId: userData.emailId || "",
            salary: userData.salary || "",
            timeZone: userData.timeZone || "",
            // timeZone: timeZone,
            countryDialCode: userData.countryDialCode || "",
            countryDialCode1: userData.countryDialCode1 || "",
            phoneNo: userData.phoneNo || "",
            // location:this.state.selectedLocation,
            // workplace:this.state.selectedCountry,
            dateOfJoining: dayjs(),
            dob: dayjs(),
            mobileNo: userData.mobileNo || "",
            currency:userData.currency || "",
            country: userData.country || "",
            workplace: userData.workplace || "",
            location: userData.location || "",
            designationTypeId: userData.designationTypeId || "",
            departmentId: userData.departmentId,
            roleType: userData.roleType || "",
            roleTypeName: userData.roleTypeName || "",
            linkedinPublicUrl: userData.linkedinPublicUrl || "",
            label: userData.label || "",
            designationType:"",
            job_type: this.state.active ? "Full Time" : "Part Time",
            type: this.state.typeInd ? "true" : "false",
            employee_type: this.state.workType,
          
          }}
          validationSchema={EmployeeSchema}
          onSubmit={(values, { resetForm }) => {
            if (department && reportingManager) {
              this.props.updateEmployee(
                {
                  ...values,
                  timeZone: timeZone,
                  // workplace: userData.country_name ,
                  // location: userData.locationDetailsId ,
                  reportingManagerDeptId: department,
                  secondaryReptManagerDept:secondatDepartment,
                  secondaryReptManager: secondaryReportingManager,
                  reportingManager: reportingManager,
                  job_type: this.state.active ? "Full Time" : "Part Time",
                  type: this.state.typeInd ? "true" : "false",
                  employee_type: this.state.workType,
                  employeeId: userData.employeeId,
                  // assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingCustomer.employeeId,
                },
                userData.employeeId,
                () => this.handleReset(resetForm)
              );
            }
            else {
              message.error("Please Provide Department And Reporting Manager ! ")
            }
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
            <div class=" h-[32rem] max-sm:h-[30rem]">
              <Form className="form-background">
                <div class="flex justify-between  pr-2 max-sm:flex-col">
                  <div class="  w-[47.5%] max-sm:w-wk">

                    <div class=" flex flex-nowrap justify-between mt-3" >
                      {/* <FastField name="imageId" component={Upload} /> */}
                      <FastField name="imageId" component={PostImageUpld} />
                      <div>
                        <div class=" flex justify-between max-sm:flex-col" >
                      
                          <div class=" w-wk max-sm:w-full">
                          <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[0]}</div>
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
                            {" "}  <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[1]}</div>
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
                            {" "}  <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[2]}</div>
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
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[3]}</div>
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
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[4]}</div>
                        <Field
                          name="currency"
                          isColumnWithoutNoCreate
                          placeholder=  {this.state.translatedMenuItems[4]}
                       
                          isColumn
                        
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
                      <div class=" flex  w-w47.5.5 justify-between max-sm:flex-col max-sm:w-wk " >
                        <div class=" w-w47.5.5 max-sm:w-wk ">
                        <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[5]}</div>
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
                        <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[6]}</div>
                          <Field
                            type="text"
                            name="mobileNo"
                            // label="Personal"
                            placeholder= {this.state.translatedMenuItems[34]}
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />

                        </div>

                      </div>
                      <div class=" flex  w-w47.5.5 justify-between max-sm:flex-col max-sm:w-wk" >
                        <div class="w-w47.5.5 max-sm:w-wk">
                        <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[5]}</div>
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
                        <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[7]}</div>
                          <Field
                            type="text"
                            name="phoneNo"
                            // label="Work #"
                            placeholder= {this.state.translatedMenuItems[34]}
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                        </div>
                      </div>
                    </div>

                    <div class=" flex justify-between max-sm:flex-col" >
                      <div class=" w-w48 max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[8]}</div>
                        <Field
                          isRequired
                          name="dateOfJoining"
                          // label= //  "Date of Joining"
                         
                          isColumn
                          component={DatePicker}
                          value={values.dateOfJoining}
                          // defaultValue={dayjs("2020-01-01")}
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                      <div class=" w-w47.5.5 max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[9]}</div>
                        <Field
                          isRequired
                          name="dob"n
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
                      <div class=" w-full">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[10]}</div>
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
                  

                  </div>
                  <div class="  w-[47.5%] max-sm:w-wk ">
                    <div class=" w-full mt-4" >
                    <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[11]}</div>
                    <Field
                    isRequired
                
                    name="timeZone"
                    isColumnWithoutNoCreate
                    placeholder= {this.state.translatedMenuItems[11]}
                    options={
                      Array.isArray(timeZoneOption)
                        ? timeZoneOption
                        : []
                    }
                    isColumn
                    value={values.timeZone}
                    component={SelectComponent}
                    inlineLabel
                  />
                    </div>

                    <div class=" flex justify-between max-sm:flex-col" >
                      <div class=" w-w48 flex flex-col max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[12]}</div>
                        <Field
                          name="departmentId"
                          isColumnWithoutNoCreate
                          component={SelectComponent}
                          options={
                            Array.isArray(DepartmentOptions)
                              ? DepartmentOptions
                              : []
                          }
                         
                          isColumn
                          margintop={"0"}
                          inlineLabel
                        />
                      </div>
                      <div class="w-w47.5.5 max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[13]}</div>
                        <FastField
                          name="label"
                          type="level"
                          options={["L1", "L2", "L3"]}
                          component={SelectComponent}
                          inlineLabel
                          className="field"
                          isColumn
                        />
                      </div>
                    </div>
                    <div class=" flex justify-between mt-2" >
                    <div class=" w-w48 max-sm:w-wk">
                    <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[14]}</div>
                      <Field
                        name="roleType"
                        isColumnWithoutNoCreate
                        component={SelectComponent}
                        options={
                          Array.isArray(
                            this.getRoleOptions(
                              "departmentId",
                              values.departmentId
                            )
                          )
                            ? this.getRoleOptions(
                              "departmentId",
                              values.departmentId
                            )
                            : []
                        }
                        value={values.roleTypeName}
                        filterOption={{
                          filterType: "departmentId",
                          filterValue: values.departmentId,
                        }}
                        disabled={!values.departmentId}
                        isColumn
                        margintop={"0"}
                        inlineLabel
                        // style={{ flexBasis: "80%" }}
                 
                      />
                    </div>
                      <div class=" w-w48 flex  max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[15]}</div>
                      <Field
                        name="salary"
                        type="text"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                    <div class=" max-sm:w-wk">
                    <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[16]}</div>
                      <Field
                        name="designationType"
                        isColumnWithoutNoCreate
                        placeholder= {this.state.translatedMenuItems[16]}
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

                    <div class=" flex justify-between mt-3 max-sm:flex-col" >
                      <div class=" w-w48 flex flex-col max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[17]}</div>
                        <Field
                          name="workplace"
                          isColumnWithoutNoCreate
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

                      <div class="w-w47.5.5 flex flex-col">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[18]}</div>
                        <Field
                          name="location"
                          isColumnWithoutNoCreate
                          component={SelectComponent}
                          options={
                            Array.isArray(
                              this.getLocationOptions(
                                "workplace",
                                values.workplace
                              )
                            )
                              ? this.getLocationOptions(
                                "workplace",
                                values.workplace
                              )
                              : []
                          }
                          // value={values.location}
                          filterOption={{
                            filterType: "workplace",
                            filterValue: values.workplace,
                          }}
                          disabled={!values.workplace}
                          isColumn
                          margintop={"0"}
                          inlineLabel
                          style={{ flexBasis: "80%" }}
                      
                        />
                      </div>
                    </div>

                    <div class=" flex mt-2" >
                      <div>
                        <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                       
                            {/* defaultMessage="Job Type" */}
                          {this.state.translatedMenuItems[19]}
                        </div>
                        <Switch
                          checked={this.state.active}
                          onChange={this.handleJobType}
                          checkedChildren= {this.state.translatedMenuItems[20]}
                          unCheckedChildren= {this.state.translatedMenuItems[21]}
                        />

                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div>
                        <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                         {this.state.translatedMenuItems[22]}
                        </div>
                        <Switch
                          checked={this.state.typeInd}
                          onChange={this.handleType}
                          checkedChildren= {this.state.translatedMenuItems[23]}
                          unCheckedChildren= {this.state.translatedMenuItems[24]}
                        />

                      </div>
                    </div>

                    <div class=" mt-3">
                      <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                       {this.state.translatedMenuItems[25]}
                      </div>

                      <Radio.Group
                        name="radiogroup"
                        defaultValue={this.state.workType}
                      >
                        <Radio
                          value={"Employee"}
                          onChange={() => this.radioClick("employee")}
                        >
                       {this.state.translatedMenuItems[26]}   {/* Employee */}
                        </Radio>
                        &nbsp;&nbsp;
                        <Radio
                          value={"contractor"}
                          onChange={() => this.radioClick("contractor")}
                        >
                        {this.state.translatedMenuItems[27]}  {/* Contractor */}
                        </Radio>
                        &nbsp;&nbsp;
                        <Radio
                          value={"intern"}
                          onChange={() => this.radioClick("intern")}
                        >
                    {this.state.translatedMenuItems[28]}{/* Intern */}
                        </Radio>
                        &nbsp;&nbsp;
                      </Radio.Group>
                    </div>
                    <div class="mt-2"><div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[29]}</div></div>
                    <div class=" flex justify-between  max-sm:flex-col" >
                      <div class=" w-w48 max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[12]}</div>
                        <Select
                          className="w-[250px]"
                          value={department}
                          onChange={(value) => this.handleDepartment(value)}
                        >
                          {this.props.departments.map((a) => {
                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                          })}
                        </Select>
                      </div>

                      <div class="w-w47.5.5 max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[30]}</div>
                        <Select
                          className="w-[250px]"
                          value={reportingManager}
                          onChange={(value) => this.handlereportingManager(value)}
                        >
                          {this.props.departmentwiseUser.map((a) => {
                            return <Option value={a.employeeId}>{a.empName}</Option>;
                          })}
                        </Select>
                      </div>
                    </div>

                    <div class=" flex justify-between  max-sm:flex-col" >
                      <div class=" w-w48 max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[31]}</div>
                        <Select
                          className="w-[250px]"
                          value={secondatDepartment}
                          onChange={(value) => this.handleSecondaryDepartment(value)}
                        >
                          {this.props.departments.map((a) => {
                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                          })}
                        </Select>
                      </div>

                      <div class="w-w47.5.5 max-sm:w-wk">
                      <div className=" text-black font-bold text-xs font-poppins "> {this.state.translatedMenuItems[32]}</div>
                        <Select
                          className="w-[250px]"
                          value={secondaryReportingManager}
                          onChange={(value) => this.handleSecondaryreportingManager(value)}
                        >
                          {this.props.departmentwiseUser.map((a) => {
                            return <Option value={a.employeeId}>{a.empName}</Option>;
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end w-wk bottom-2 mr-2 mt-3 md:absolute ">
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={this.props.updatingEmployee}
                  >
                  {this.state.translatedMenuItems[33]}  {/* Update */}
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ auth, role, settings, location, currency, employee, designations, departments }) => ({
  userDetails: auth.userDetails,
  roles: role.roles,
  timeZone: auth.timeZone,
  user: auth.userDetails,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  countries: auth.countries,
  showLocation: location.showLocation,
  updatingEmployee: employee.updatingEmployee,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
  employees: employee.employees,
  designations:designations.designations,
  departmentwiseUser: settings.departmentwiseUser,
  departments: departments.departments,
  currencies: auth.currencies,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    updateEmployee,
    // getTimeZone,
    getCurrency,
    getDepartments,
    getDepartmentwiserUser,
    getlocation,
    getCountries,
    getRoles,
    getDesignations

  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployeeForm);