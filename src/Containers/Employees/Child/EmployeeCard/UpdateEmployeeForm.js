import React, { Component } from "react";
import { Button, Switch, Select } from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Radio } from "antd";
import { getDepartmentwiserUser } from "../../../Settings/SettingsAction"
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import Upload from "../../../../Components/Forms/Formik/Upload";
import { getCurrencyList } from "../../../Settings/Category/Currency/CurrencyAction"
import { getTimeZone } from "../../../Auth/AuthAction"
import { getRoles } from "../../../Settings/Category/Role/RoleAction"
import { updateEmployee, } from "../../EmployeeAction";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import PostImageUpld from "../../../../Components/Forms/Formik/PostImageUpld";
const { Option } = Select;

class UpdateEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      checked: true,
      typeInd: false,
      role: [],
      reportingManager: "",
      department: "",
      selectedRole: "",
      selectedCountry: '',
      selectedDept: "",
      locations: [],
      selectedLocation: "",
      workType: "employee",
    };
  }





  componentDidMount() {
    const { getCountries, getEmployeelist, getDepartments, getTimeZone, getCurrencyList, getRoles, getlocation, } = this.props;
    getRoles(this.props.organizationId);
    getTimeZone();
    // getEmployeelist("cretiondate");
    getDepartments();
    getCurrencyList();

  }
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
          label: option.roleTypeName || "",
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

  render() {
    const { user, reportingManager, department, selectedRow, dueDate } = this.state;
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


    const sortedCurrency = this.props.currencyList.sort((a, b) => {
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









    const { clearbit, currentEmployeeId } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            salutation: currentEmployeeId.salutation || "",
            departmentId: currentEmployeeId.departmentName,
            firstName: currentEmployeeId.firstName || "",
            lastName: currentEmployeeId.lastName || "",
            emailId: currentEmployeeId.emailId || "",
            timeZone: currentEmployeeId.timeZone || "",
            countryDialCode: currentEmployeeId.countryDialCode || "",
            countryDialCode1: currentEmployeeId.countryDialCode1 || "",
            phoneNo: currentEmployeeId.phoneNo || "",
            // location:this.state.selectedLocation,
            // workplace:this.state.selectedCountry,
            dateOfJoining: dayjs(),
            dob: dayjs(),
            mobileNo: currentEmployeeId.mobileNo || "",
            country: currentEmployeeId.country || "",
            workplace: currentEmployeeId.workplace || "",
            location: currentEmployeeId.location || "",
            designationTypeId: currentEmployeeId.designationTypeId || "",
            departmentId: currentEmployeeId.department,
            reportingManagerDeptId: currentEmployeeId.reportingManagerDept || "",
            roleTypeName: currentEmployeeId.roleTypeName || "",
            // roleType:this.state.selectedRole,
            linkedinPublicUrl: currentEmployeeId.linkedinPublicUrl || "",
            label: currentEmployeeId.label || "",

            job_type: this.state.active ? "Full Time" : "Part Time",
            type: this.state.typeInd ? "true" : "false",
            employee_type: this.state.workType,
            // job_type: this.state.active,

            reportingManager: currentEmployeeId.reportingManagerName || "",

            address: [
              {
                addressId: currentEmployeeId.address.length ? currentEmployeeId.address[0].addressId : "",
                address1: currentEmployeeId.address.length ? currentEmployeeId.address[0].address1 : "",
                address2: currentEmployeeId.address.length ? currentEmployeeId.address[0].address2 : "",
                street: currentEmployeeId.address.length ? currentEmployeeId.address[0].street : "",
                city: currentEmployeeId.address.length ? currentEmployeeId.address[0].city : "",
                state: currentEmployeeId.address.length ? currentEmployeeId.address[0].state : "",
                postalCode: currentEmployeeId.address.length ? currentEmployeeId.address[0].postalCode : "",
              },
            ],

          }}
          //   validationSchema={documentSchema}

          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateEmployee(
              {
                ...values,
                // workplace: currentEmployeeId.country_name ,
                // location: currentEmployeeId.locationDetailsId ,
                reportingManagerDeptId: department,
                reportingManager: reportingManager,
                // roleType: currentEmployeeId.departmentId,
                // departmentId:currentEmployeeId.roleTypeId,



                job_type: this.state.active ? "Full Time" : "Part Time",
                type: this.state.typeInd ? "true" : "false",
                employee_type: this.state.workType,
                employeeId: currentEmployeeId.employeeId,
                // assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingCustomer.employeeId,
              },
              currentEmployeeId.employeeId,
              () => this.handleReset(resetForm)
            );
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
                          {/* <div class=" w-1/3 max-sm:w-full">
                      <FastField
                        name="salutation"
                        placeholder="Select"
                        component={SelectComponent}
                        options={["Mr", "Mrs", "Miss","None"]}
                        
                        label={<FormattedMessage
                          id="app.salutation"
                          defaultMessage="Salutation"
                        />}
                        isColumn
                        />
                    </div> */}
                          <div class=" w-wk max-sm:w-full">
                            <Field
                              isRequired
                              name="firstName"
                              type="text"
                              isColumn
                              width={"100%"}
                              label={<FormattedMessage
                                id="app.firstName"
                                defaultMessage="First Name"
                              />}
                              component={InputComponent}
                              inlineLabel
                            />
                          </div>
                        </div>
                        <div class=" flex justify-between max-sm:flex-col" >
                          <div class=" w-2/5 max-sm:w-full">
                            {" "}
                            <Field

                              name="middleName"
                              type="text"
                              isColumn
                              width={"100%"}
                              label={<FormattedMessage
                                id="app.middleName"
                                defaultMessage="Middle Name"
                              />}
                              component={InputComponent}
                              inlineLabel
                            />
                          </div>
                          <div class=" w-3/6 max-sm:w-full">
                            {" "}
                            <Field
                              name="lastName"
                              type="text"
                              isColumn
                              width={"100%"}
                              label={<FormattedMessage
                                id="app.lastName"
                                defaultMessage="Last Name"
                              />}
                              component={InputComponent}
                              inlineLabel
                            />
                          </div>
                        </div>

                      </div>
                    </div>



                    <div class=" flex justify-between" >
                      <div class=" w-[70%] flex flex-col max-sm:w-wk">
                        <Field
                          isRequired
                          name="emailId"
                          type="text"
                          isColumn
                          width={"100%"}
                          label={<FormattedMessage
                            id="app.emailId"
                            defaultMessage="Email" />}
                          component={InputComponent}
                          inlineLabel
                        />
                      </div>
                      <div class=" max-sm:w-wk">
                        <Field
                          name="currency"
                          isColumnWithoutNoCreate
                          placeholder="Currency"
                          label={<FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />}
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
                      <div class=" flex  w-w47.5 justify-between max-sm:flex-col max-sm:w-wk " >
                        <div class=" w-w47.5 max-sm:w-wk ">
                          <Field
                            name="countryDialCode"
                            isColumnWithoutNoCreate
                            //label="Mobile #"
                            label={<FormattedMessage
                              id="app.dialCode"
                              defaultMessage="Dial Code"
                            />}
                            isColumn
                            options={
                              Array.isArray(dialCodeNameOption)
                                ? dialCodeNameOption
                                : []
                            }
                            component={SelectComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-w47.5 max-sm:w-wk">
                          <Field
                            type="text"
                            name="mobileNo"
                            label="Personal"
                            placeholder="Input"
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />

                        </div>

                      </div>
                      <div class=" flex  w-w47.5 justify-between max-sm:flex-col max-sm:w-wk" >
                        <div class="w-w47.5 max-sm:w-wk">
                          <Field
                            name="countryDialCode1"
                            isColumnWithoutNoCreate
                            label={<FormattedMessage
                              id="app.countryDialCode1"
                              defaultMessage="Dial Code"
                            />}
                            isColumn
                            options={
                              Array.isArray(dialCodeNameOption)
                                ? dialCodeNameOption
                                : []
                            }
                            component={SelectComponent}
                            inlineLabel
                          />
                        </div>
                        <div class="w-w47.5 max-sm:w-wk">
                          <Field
                            type="text"
                            name="phoneNo"
                            label="Work #"
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
                      <div class=" w-w48 max-sm:w-wk">
                        {/*<div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"><FormattedMessage
                      id="app.dateofjoining"
                      defaultMessage=" Date Of Joining"
                    />
                  </div> */}
                        <Field
                          isRequired
                          name="dateOfJoining"
                          label={<FormattedMessage
                            id="app.dateOfJoining"
                            defaultMessage="Date of Joining"
                          />}
                          isColumn
                          component={DatePicker}
                          value={values.dateOfJoining}
                          // defaultValue={dayjs("2020-01-01")}
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                      <div class=" w-w47.5 max-sm:w-wk">
                        {/*<div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"><FormattedMessage
                      id="app.dateofbirth"
                      defaultMessage=" Date Of Birth"
                    />
                  </div> */}
                        <Field
                          isRequired
                          name="dob"
                          label={<FormattedMessage
                            id="app.dateOfBirth"
                            defaultMessage="Date of Birth"
                          />}
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
                      <div class=" w-full">
                        <Field
                          name="linkedinPublicUrl"
                          type="text"
                          isColumn
                          width={"100%"}
                          label={<FormattedMessage
                            id="app.linkedIn"
                            defaultMessage="LinkedIn"
                          />}
                          component={InputComponent}
                          inlineLabel
                        />

                      </div>

                    </div>
                    <div style={{ width: "100%", backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)", marginTop: "0.5rem" }}>
                      <div>
                        <div class=" text-[white] text-xs" >
                          Address for  Correspondence</div>
                      </div>
                    </div>

                    <FieldArray
                      name="address"
                      label="Address"
                      render={(arrayHelpers) => (
                        <AddressFieldArray
                          arrayHelpers={arrayHelpers}
                          values={values}
                        />
                      )}
                    />

                  </div>
                  <div class="  w-[47.5%] max-sm:w-wk ">
                    <div class=" w-full mt-4" >
                      <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Time Zone</div>
                      <Field
                        name="timeZone"
                        type="text"
                        placeholder="Select Time Zone"
                        noLabel
                        // disabled={!values.productionInd && !values.inventoryInd}
                        isRequired
                        component={SelectComponent}
                        options={
                          Array.isArray(timeZoneOption) ? timeZoneOption : []
                        }
                      />
                    </div>

                    <div class=" flex justify-between max-sm:flex-col" >
                      <div class=" w-w48 flex flex-col max-sm:w-wk">
                        {/* <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Department</label>
<select className="customize-select"
name="departmentId"
                       
                      onChange={this.handleDeptChange}>
          <option value="">Select </option>
          {this.props.departments.map((item, index) => (
            <option key={index} value={item.departmentId}>
              {item.departmentName}
            </option>
          ))}
        </select> */}
                        <Field
                          name="departmentId"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                              id="app.Department"
                              defaultMessage="Department"
                            />
                          }
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
                      <div class="w-w47.5 max-sm:w-wk">
                        <FastField
                          name="label"
                          type="level"
                          label={<FormattedMessage
                            id="app.level"
                            defaultMessage="Level"
                          />}
                          options={["L1", "L2", "L3"]}
                          component={SelectComponent}
                          inlineLabel
                          className="field"
                          isColumn
                        />
                      </div>
                    </div>
                    <div class=" flex justify-between mt-2" >
                      <div class=" w-w48 flex flex-col max-sm:w-wk">
                        {/* <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Role</label>
       
                  <select className="customize-select"
                 
                      onChange={this.handleRoleChange}
                    >
          <option value="">Select </option>
          {this.state.role.map((item, index) => (
            <option key={index}
            // disabled={!values.country_name}
             value={item.roleTypeId}>
              {item.roleType}
            </option>
          ))}
        </select> */}
                      </div>
                    </div>
                    <div class=" w-w48 max-sm:w-wk">
                      <Field
                        name="roleTypeName"
                        label={<FormattedMessage
                          id="app.role"
                          defaultMessage="Role"
                        />}
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
                        style={{ flexBasis: "80%" }}
                      // value={values.roleTypeId}
                      // width={"100%"}
                      // isColumn
                      // selectType="roleType"
                      />
                    </div>

                    <div class=" flex justify-between mt-3 max-sm:flex-col" >
                      <div class=" w-w48 flex flex-col max-sm:w-wk">
                        <Field
                          name="workplace"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                              id="app.Workplace"
                              defaultMessage="Workplace"
                            />
                          }
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
                        {/* <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>WorkPlace</label>
                    <select className="customize-select"
                      
                      onChange={this.handleCountryChange}>
          <option value="">Select </option>
          {this.props.countries.map((item, index) => (
            <option key={index} value={item.country_name}>
              {item.country_name}
            </option>
          ))}
        </select> */}
                      </div>

                      <div class="w-w47.5 flex flex-col">

                        <Field
                          name="location"
                          label={<FormattedMessage
                            id="app.location"
                            defaultMessage="Location"
                          />}
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
                          value={values.location}
                          filterOption={{
                            filterType: "workplace",
                            filterValue: values.workplace,
                          }}
                          disabled={!values.workplace}
                          isColumn
                          margintop={"0"}
                          inlineLabel
                          style={{ flexBasis: "80%" }}
                        // value={values.roleTypeId}
                        // width={"100%"}
                        // isColumn
                        // selectType="roleType"
                        />
                        {/* <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Location</label>
                    <select className="customize-select"
             
                      onChange={this.handleLocationChange}
                    >
          <option value="">Select </option>
          {this.state.locations.map((item, index) => (
            <option key={index}
            // disabled={!values.country_name}
             value={item.locationDetailsId}>
              {item.locationName}
            </option>
          ))}
        </select>  */}





                      </div>
                    </div>

                    <div class=" flex " >
                      <div>
                        <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                          <FormattedMessage
                            id="app.jobtype"
                            defaultMessage="Job Type"
                          />
                        </div>
                        <Switch
                          checked={this.state.active}
                          onChange={this.handleJobType}
                          checkedChildren="Full Time"
                          unCheckedChildren="Part Time"
                        />

                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div>
                        <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                          <FormattedMessage
                            id="app.category"
                            defaultMessage="Category"
                          />
                        </div>
                        <Switch
                          checked={this.state.typeInd}
                          onChange={this.handleType}
                          checkedChildren="External"
                          unCheckedChildren="Internal"
                        />

                      </div>
                    </div>

                    <div class=" mt-3">
                      <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"><FormattedMessage
                        id="app.employeetype"
                        defaultMessage="Employee Type"
                      />
                      </div>

                      <Radio.Group
                        name="radiogroup"
                        defaultValue={this.state.workType}
                      >
                        <Radio
                          value={"Employee"}
                          onChange={() => this.radioClick("employee")}
                        >
                          Employee
                        </Radio>
                        &nbsp;&nbsp;
                        <Radio
                          value={"contractor"}
                          onChange={() => this.radioClick("contractor")}
                        >
                          Contractor
                        </Radio>
                        &nbsp;&nbsp;
                        <Radio
                          value={"intern"}
                          onChange={() => this.radioClick("intern")}
                        >
                          Intern
                        </Radio>
                        &nbsp;&nbsp;
                      </Radio.Group>
                    </div>
                    <div class="mt-2"><label style={{ color: "#444", fontWeight: "bold", fontSize: " 0.75rem" }}>Reports To</label></div>
                    <div class=" flex justify-between  max-sm:flex-col" >
                      <div class=" w-w48 max-sm:w-wk">
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

                      <div class="w-w47.5 max-sm:w-wk">
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
                  </div>
                </div>
                <div class="flex justify-end w-wk bottom-2 mr-2 mt-3 md:absolute ">
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={this.props.updatingEmployee}
                  >
                    Update
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
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  countries: auth.countries,
  showLocation: location.showLocation,
  updatingEmployee: employee.updatingEmployee,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
  employees: employee.employees,
  departmentwiseUser: settings.departmentwiseUser,
  departments: departments.departments,
  currencyList: currency.currencyList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    updateEmployee,
    getTimeZone,
    getCurrencyList,
    getDepartments,
    getDepartmentwiserUser,
    // getEmployeelist,
    //    getCountries,
    //    getDesignations,
    // getDepartments,
    getRoles,

  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployeeForm);