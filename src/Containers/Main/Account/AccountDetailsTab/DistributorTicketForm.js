import React, { useState, useEffect,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Tooltip, Button,Select } from "antd";
import ReactDescription from "../../../../Components/ReactSpeech/ReactDescription"


import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";

import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";


import { Listbox } from '@headlessui/react';

import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../../Components/Forms/Autocomplete/ClearbitImage";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';
import { BundleLoader } from "../../../../Components/Placeholder";
import {base_url} from "../../../../Config/Auth";
import {addTicket} from "../AccountAction"
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  
});

const { Option } = Select;  

function DistributorTicketForm(props) {
  const [loading, setLoading] = useState(true);
 ;

 const[stage,setStage]=useState([])
 const [isLoadingStage, setIsLoadingStage] = useState(false);
const [selectedStage, setSelectedStage] = useState(null);
 const [workflow, setWorkflow] = useState([]);
 const [selectedWorkflow, setSelectedWorkflow] = useState(null);
 const [selectedWorkFlowType, setSelectedWorkFlowType] = useState(null);
 const [isLoadingWorkflowType, setIsLoadingWorkflowType] = useState(false);
 const [touchedWorkFlowType, setTouchedWorkFlowType] = useState(false);
 const [selectedCustomer, setSelectedCustomer] = useState(null);
 const [customers, setCustomers] = useState([]);
 const [touchedCustomer, setTouchedCustomer] = useState(false);
 const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);


 const [text, setText] = useState("");

 
 

 const handleSelectCustomerFocus = () => {
    if (!touchedCustomer) {
      fetchCustomers();
      // fetchSector();

      setTouchedCustomer(true);
    }
  };


  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);
    //fetchContacts(customerId);
  };


  const handleStageChange=(value)=>{
    setSelectedStage(value);
  }



  const handleSelectWorkflowTypeFocus = () => {
    if (!touchedWorkFlowType) {
      fetchWorkFlowType();
      // fetchSector();
  
      setTouchedWorkFlowType(true);
    }
  };



  const handleWorkflowChange=(workflowDetailsId)=>{
    setSelectedWorkflow(workflowDetailsId);
    fetchStage(workflowDetailsId)
  }







  const fetchStage= async (workflowId) => {
    setIsLoadingStage(true);
    try {
      // const response = await axios.get(`https://develop.tekorero.com/employeePortal/api/v1/customer/contact/drop/${customerId}`);
      // setContacts(response.data);
      const apiEndpoint = `${base_url}/workflow/stages/for_dropdown/${props.orgId}/${workflowId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setStage(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoadingStage(false);
    }
  };







  const fetchWorkFlowType = async () => {
    setIsLoadingWorkflowType(true);
    try {
      // const response = await axios.get('https://develop.tekorero.com/employeePortal/api/v1/customer/user/${props.userId}');
      // setCustomers(response.data);
      const apiEndpoint = `${base_url}/workflow/publish/for_dropdown/${props.organizationId}/Quotation`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setWorkflow(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoadingWorkflowType(false);
    }
  };



  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
   

      const apiEndpoint = `${base_url}/customer/user/${props.userId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoadingCustomers(false);
    }
  };
 




  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          // currencyId:"",
          startOn:"",
          endOn:"",
       
     title:"",

         
          //category: whiteblue ? "White" : "Blue" || "Both",
        }}
       // validationSchema={CustomerSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
       props.addTicket(
            {
              ...values,
              assignFrom:props.distributorData.distributorId,
              description:text,
              stageId:selectedStage,
              workFlowId:selectedWorkflow,
             
              
             
            },
        //     props.userId,
        //     resetForm()
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
          <div class="max-sm:h-[30rem] overflow-y-auto">
            <Form className="form-background">
              <div class="flex justify-between  pr-2 max-sm:flex-col">
                <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
               
                  <div class=" mt-3">
                  <Field
                    name="title"
                    type="text"
                label="Title"                       
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />           
                 
  
                  </div>
                  <div class=" flex justify-between mt-2">
                    <div class=" w-3/12 max-sm:w-[30%]">
                    <div className="font-bold text-xs">
Assign Form
  {/* Customer */}
  </div>
                    {/* <Field
                    name="url"
                    type="text"
                label="Assign Form"                       
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />  */}

<Select
       
       placeholder="Select Customer"
       loading={isLoadingCustomers}
       value={props.distributorData.name}
       disabled={props.distributorData.name}
       onFocus={handleSelectCustomerFocus}
       onChange={handleCustomerChange}
     >
       {customers.map(customer => (
         <Option key={customer.customerId} value={customer.customerId}>
           {customer.name}
         </Option>
       ))}
     </Select>

                    </div>
                   
                  </div>
                  <div class=" flex justify-between mt-[0.2rem] max-sm:flex-col ">
                  <div class="w-w47.5.5">
                 
                      {/* <Field
                        name="vatNo"
                        type="text"
                    label="VAT Number"
                                                                               
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      /> */}
                      <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Workflow</label>
      <Select
       
        placeholder="Select Workflow"
      loading={isLoadingWorkflowType}
        onChange={handleWorkflowChange}
        onFocus={handleSelectWorkflowTypeFocus}
        // disabled={!selectedWorkFlowType}
      >
        {workflow.map(work => (
          <Option key={work.workflowDetailsId} value={work.workflowDetailsId}>
            {work.workflowName}
          </Option>
        ))}
      </Select>

                    </div>
                    <div class="w-w47.5.5">
                   
                    <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Stage</label>
                    <Select
       
       placeholder="Select Stage"
       loading={isLoadingStage}
       onChange={handleStageChange}
     disabled={!selectedWorkflow}
     >
       {stage.map(stage => (
         <Option key={stage.stagesId} value={stage.stagesId}>
           {stage.stageName}
         </Option>
       ))}
     </Select>

                    </div>
                  </div>
                  <div class="font-bold text-xs"> 
                    {/* {translatedMenuItems[1]}   */}
                    </div>
                    <ReactDescription
                setText={setText}
                text={text}
                />          
                 

                  
                  <div class="flex justify-between mt-2">
 

  
</div>


                </div>
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk "
                >


                  <div class=" flex justify-between mt-[0.2rem] max-sm:flex-col ">
                  <div class="w-w47.5.5">
                 
                      {/* <Field
                        name="vatNo"
                        type="text"
                    label="VAT Number"
                                                                               
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      /> */}
                        <Field
                                            name="startOn"
                                            label="Start On"
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            disable={!values.startOn}
                                            component={DatePicker}
                                            disabledDate={(currentDate) => {
                                                if (values.startOn) {
                                                    if (
                                                        dayjs(currentDate).isBefore(
                                                            dayjs(values.startOn)
                                                        )
                                                    ) {
                                                        return true;
                                                    } else {
                                                        return false;
                                                    }
                                                }
                                            }}
                                            value={values.startOn}

                                        />

                    </div>
                    <div class="w-w47.5.5">
                   
                    <Field
                                            name="endOn"
                                            label="End On"
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            disable={!values.endOn}
                                            component={DatePicker}
                                            disabledDate={(currentDate) => {
                                                if (values.endOn) {
                                                    if (
                                                        dayjs(currentDate).isBefore(
                                                            dayjs(values.endOn)
                                                        )
                                                    ) {
                                                        return true;
                                                    } else {
                                                        return false;
                                                    }
                                                }
                                            }}
                                            value={values.endOn}

                                        />

                    </div>
                  </div>

            
                </div>
              </div>

              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  //loading={addingCustomer}
                >
                 <div className="text-xs font-bold font-poppins">
                    {/* {translatedMenuItems[11]}  */}
                    </div>
                                      
                    Create
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}


const mapStateToProps = ({ auth, customer,settings,employee ,catgCustomer,sector,leads}) => ({
  
  token: auth.token,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addTicket
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorTicketForm);
