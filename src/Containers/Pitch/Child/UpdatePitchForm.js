import React, {  useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Switch,Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import {getAllEmployeelist,getDialCode} from "../../Investor/InvestorAction"
import {
     updatePitch,
    setEditPitch,
} from "../PitchAction";
import {getSectors} from "../../Settings/Sectors/SectorsAction"
import {getSources} from "../../Settings/Category/Source/SourceAction"
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { Listbox, } from '@headlessui/react'
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import {getInvestorCurrency} from "../../Auth/AuthAction"

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdatePitchSchema = Yup.object().shape({
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function UpdatePitchForm (props) {
 
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [contract, setContract] = useState(false); 
  const [priority,setpriority]=useState(props.selectedTask
    ? props.selectedTask.priority
    : "hot");

    const handleIconClick = (type) => {
      setpriority(type);
    };
  const handleContract = (checked) => {
    setContract(checked);
  };
  const handleButtonClick = (type) => {
    setpriority(type);
    };
  const handleReset = (resetForm) => {
    resetForm();
  };
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "295",//0 First Name
          "353",//1 Middle Name
          "354",//2 Last Name
          "140",//3 Email
          "357",//4 Dial Code
          "300",//5 Phone No
          "277",//6 Company
          "302",//7 Url
          "454",//8 Share Quantity
          "455",//9 Share Value
          "14",//10 Category
          "74",//11 Date
          "241",//12 Currency
          "76",//13 Assigned
          "185", // 14 "Address",
        //   "186", // "Street",//15
        //  "187",//Zip Code",//16
        //  "188",// "City",17
        //   "314",// "State",//18
        //   "1109",// "Country",//19
          "316",//15 Notes
           "104",//  Update
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

 
  useEffect (()=>{
    props.getAllEmployeelist();
    props.getDialCode();
    props.getSources(props.orgId);
    props.getSectors();
    props.getInvestorCurrency();
  },[])
 
  const sourceOption = props.sources.map((item) => {
    return {
      label: item.name
      || null,
      value: item.sourceId
      ,
    };
  });
  const dialCodeOption = props.dialCodeList.map((item) => {
    return {
      label: `+${item.country_dial_code || ""}`,
      value: item.country_dial_code
      ,
    };
  });

  const sortedCurrency =props.investorCurrencies.sort((a, b) => {
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

  const sectorOption = props.sectors.map((item) => {
    return {
      label: item.sectorName
      || null,
      value: item.sectorId
      ,
    };
  });
    const {
      accounts,
      user,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      updateLeadsById,
      updateLeads,
      setClearbitData,
    } = props;

    const [defaultOption, setDefaultOption] = useState(props.setEditingPitch.assignedTo);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            companyName: props.setEditingPitch.companyName || "",
            url: props.setEditingPitch.url || "",
            sectorId: props.setEditingPitch.sectorId  ,
            type:priority,
            source: props.setEditingPitch.source || "" ,
            pvtAndIntunlInd: contract ? "true" : "false",
            vatNo:props.setEditingPitch.vatNo  ,
            email: props.setEditingPitch.email || "",
            country:props.setEditingPitch.country || "",
            countryDialCode:
              props.setEditingPitch.countryDialCode ||
              props.user.countryDialCode,
              shareCurrency :"",
            phoneNumber: props.setEditingPitch.phoneNumber || "",
            userId: props.userId,
            notes: props.setEditingPitch.notes || "",
            salutation:props.setEditingPitch.salutation || "",
            firstName:props.setEditingPitch.firstName || "",
            middleName:props.setEditingPitch.middleName || "",
            lastName:props.setEditingPitch.lastName || "",
            unitOfShare:props.setEditingPitch.unitOfShare ||"",
            valueOfShare:props.setEditingPitch.valueOfShare ||"",
            businessRegistration:props.setEditingPitch.businessRegistration ||"",
            assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingPitch.employeeId,         
          }}
          // validationSchema={UpdatePitchSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            let timeZoneFirst = "GMT+05:30";
            let mytimeZone = timeZoneFirst.substring(4, 10);
            var a = mytimeZone.split(":");
            var timeZoneminutes = +a[0] * 60 + +a[1];
            
            if (!values.firstMeetingDate) {
              values.firstMeetingDate = values.startDate;
            }
  
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            let newEndDate = dayjs(values.firstMeetingDate).format("YYYY-MM-DD");
  
            let newStartTime = dayjs(values.startTime).format("HH:mm:ss.SSS[Z]");
            let firstStartHours = newStartTime.substring(0, 5);
            let timeEndPart = newStartTime.substring(5, 13);
            var firstStartTimeSplit = firstStartHours.split(":");
            var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1];
            var firstStartTimeminutes = minutes - timeZoneminutes;
            let h = Math.floor(firstStartTimeminutes / 60);
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            let newFormattedStartTime = `${finalStartTime}${timeEndPart}`;


            props.updatePitch(
              {
                ...values,
                type:priority,
                investorleadsId: props.investorleadsId,
                assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingPitch.employeeId,
                pvtAndIntunlInd: contract ? "true" : "false",
              },
              props.investorleadsId,
              () => handleReset(resetForm)
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
            <div class=" flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
                    <div class=" flex  flex-nowrap mt-3">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                     
                        <div class="  font-bold  max-sm:w-full text-xs">
                      {translatedMenuItems[0]} 
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"                        
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>                  
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" font-bold w-2/5 max-sm:w-full text-xs">
                        {translatedMenuItems[1]}  
                          <FastField
                            name="middleName"
                            //label="Middle Name"                        
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class="  font-bold w-1/2 max-sm:w-full text-xs">
                   {translatedMenuItems[2]}  
                          <FastField
                            name="lastName"
                            //label="Last Name"                       
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-1">
                {translatedMenuItems[3]} 
                  <Field
                    name="email"
                    type="text"                                  
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                    </div>
                    <div class=" flex justify-between mt-1">
                    <div class="font-bold text-xs w-3/12 max-sm:w-[32%]">
                    {translatedMenuItems[4]}  
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
                    <div class=" w-8/12 mt-1">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                   {translatedMenuItems[5]} 
                      <FastField
                        //isRequired
                        type="text"
                        name="phoneNumber"
                        isColumn
                        component={InputComponent}                   
                        inlineLabel
                        width={"100%"}
                        />     
                        </div>              
                         </div>
                  </div>

                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">
                 {translatedMenuItems[6]} 
                  <Field
             
                    name="companyName"
                    type="text"
                    //label="Company Name            
                    isColumn
                    width={"100%"}
                    component={InputComponent}                 
                    accounts={accounts}
                    inlineLabel
                    />
                    </div>
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                   {translatedMenuItems[7]} 
                  <Field
                    name="url"
                    type="text"
                    // label="URL"                 
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                    </div>
                  <div class=" flex justify-between max-sm:flex-col">
                  {contract ?
                    <div class=" w-w47.5.5 max-sm:w-wk">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      <Field
                        name="vatNo"
                        type="text" 
                        label="vatNumber"
                          
                        //isRequired
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                        </div>
                    </div>
                      : ( null)}        
                    {contract ?
                    <div class=" w-w47.5.5 max-sm:w-wk">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"
                        label=" businessregistration"
                      
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>   
                      : ( null)}                 
                    </div>

                    <div class=" flex justify-between">
                    <div class=" w-w47.5.5 mt-1">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                  {translatedMenuItems[8]}   
                      <Field
                        name="unitOfShare"
                        type="text"                     
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                    <div class="w-w47.5.5 mt-1">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                    {translatedMenuItems[9]}  
                      <Field
                        name="valueOfShare"
                        type="text"                    
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                  </div>
                     <div class=" flex justify-between">
                     {contract ?
                     <div class=" w-w47.5.5">
                      <Field
                        name="sectorId"
                        isColumnWithoutNoCreate
                        // selectType="sectorName"
                        label="Sector"
                         
                        isColumn
                        component={SelectComponent}
                        options={
                          Array.isArray(sectorOption) ? sectorOption : []
                        }
                      />
                    </div>
                     : ( null)}
                       {contract ?
                    <div class="w-w47.5.5">
                  
                        <FastField
                          name="source"
                          label="source"
                         
                          isColumnWithoutNoCreate
                          defaultValue={{
                            label:props.setEditingPitch.source,
                          }}
                          component={SelectComponent}
                            options={
                              Array.isArray(sourceOption) ? sourceOption : []
                            }
                          isColumn
                          inlineLabel
                        />

           </div>
            : ( null)}
                </div>
                <div class=" flex items-center justify-between">
                <div class=" flex flex-col   mt-4">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs ">
                    {translatedMenuItems[10]}  {/* Category */}
                      </div>
                    <Switch
                      style={{ width: "6.25em", marginLeft: "0.625em" }}
                      onChange={handleContract}
                      checked={contract}
                      checkedChildren="Institutional"
                      unCheckedChildren="Private"
                    />
                  </div>
                  <div class=" w-w47.5.5 max-sm:w-wk">
                  <div className="flex">
      <Tooltip title="Hot">
        <i
          className={`fas fa-mug-hot${priority === "hot" ? " selected" : ""}`}
          onClick={() => handleIconClick("hot")}
          style={{
            color: priority === "hot" ? "white" : "red",
            backgroundColor: priority === "hot" ? "red" : "transparent",
            borderRadius: "50%",
            fontSize: "1rem",
            height:"1.5rem",
            padding: "5px",
            cursor: "pointer"
          }}
        ></i>
      </Tooltip>
      &nbsp;
      <Tooltip title="Warm">
        <i
          className={`fas fa-burn${priority === "warm" ? " selected" : ""}`}
          onClick={() => handleIconClick("warm")}
          style={{
            color: priority === "warm" ? "white" : "orange",
            backgroundColor: priority === "warm" ? "orange" : "transparent",
            borderRadius: "50%",
            fontSize: "1rem",
            height:"1.5rem",
            padding: "5px",
            cursor: "pointer"
          }}
        ></i>
      </Tooltip>
      &nbsp;
      <Tooltip title="Cold">
        <i
          className={`far fa-snowflake${priority === "cold" ? " selected" : ""}`}
          onClick={() => handleIconClick("cold")}
          style={{
            color: priority === "cold" ? "white" : "teal",
            backgroundColor: priority === "cold" ? "teal" : "transparent",
            borderRadius: "50%",
            fontSize: "1rem",
            height:"1.5rem",
            padding: "5px",
            cursor: "pointer"
          }}
        ></i>
      </Tooltip>
    </div>
                      </div>
                      </div>
                      <div class=" flex items-center justify-between mt-2">
<div class=" font-bold text-xs w-w47.5.5 max-sm:w-wk">
{translatedMenuItems[11]} 
{/* Date */}
                    <Field
                      name="firstMeetingDate"                   
                      component={DatePicker}
                      value={values.firstMeetingDate}
                      isColumn
                      inlineLabel
                    />
                  </div>

                  <div class="font-bold  w-w47.5.5 max-sm:w-wk text-xs">
                  <div>{translatedMenuItems[12]} </div>  
                    <Field
                      name="shareCurrency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.currency_id
                      }}
                  //  currency
                      width="100%"
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
                 </div>
                 <div class=" h-3/4 w-w47.5.5 max-sm:w-wk "   >
                   
                   
                    <div class=" font-bold mt-3 text-xs">
                    {translatedMenuItems[13]}
                    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>        
          <div className="relative ">
              <Listbox.Button style={{ boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em" }} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.allEmployeeList.map((item) => (
                    <Listbox.Option
                      key={item.employeeId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.empName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.empName}
                            </span>
                          </div>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                active ? "text-white" : "text-indigo-600"
                              }`}
                            >
                              
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              )}
            </div>
        </>
      )}
    </Listbox>
                    </div>

                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">
             {translatedMenuItems[14]} 
                  <FieldArray
                    name="address"
                    // label="Address"                 
                  />
                  </div>
                 
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">
                 {translatedMenuItems[15]}  
                  <Field
                    name="notes"
                    // label="Notes"
                    
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    /> 
                    </div>                 
                </div>
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-3 ">
                <Button
                  type="primary"
                  htmlType="submit"
                 Loading={props.updatePitchById}
                >
                 <div class="font-bold font-poppins text-xs">{translatedMenuItems[16]} </div>
                  {/* Update */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  
}

const mapStateToProps = ({ auth,investor,countrys,source,sector, leads,employee,pitch }) => ({
    setEditingPitch: leads.setEditingPitch,
    updateLeadsById: leads.updateLeadsById,
    updatePitchById:pitch.updatePitchById,
    updateLeadsByIdError: leads.updateLeadsByIdError,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    organizationId: auth.userDetails.organizationId,
    orgId:auth.userDetails.organizationId,
    employees: employee.employees,
    leadsAllData:leads.leadsAllData,
    dialCodeList:investor.dialCodeList,
    sectors: sector.sectors,
    allEmployeeList:investor.allEmployeeList,
    setEditingPitch:pitch.setEditingPitch,
    sources: source.sources,
    investorCurrencies: auth.investorCurrencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updatePitch,
        getSources,
        getDialCode,
        setEditPitch,
        getAllEmployeelist,
        getSectors,
        getInvestorCurrency
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePitchForm);
