import { Field, Form, Formik } from 'formik'
import React, {useEffect,useState,lazy} from 'react'
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {updateInvoiceData} from "../../../Invoice/InvoiceAction"
import { Button} from 'antd';
import {getCandidatesTotalBillingsForInvoice} from "../../../Invoice/InvoiceAction"
import {getProjectsData} from "../../ProjectsAction"
import {getCustomerTask} from "../../../Task/TaskAction"
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from '../../../../Components/Forms/Formik/InputComponent'

const InvoiceListProjectTable =lazy(()=>import("./InvoiceListProjectTable"));
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const InvoiceSchema = Yup.object().shape({
  customerId: Yup.string().required("Input needed!"),
  projectId: Yup.string().required("Input needed!"),
  month: Yup.string().required("Input needed!"),
  year: Yup.string().required("Input needed!"),
 
});


function FirstInvoiceProjectPage(props) {
  useEffect(()=>{
    props.getCustomerTask(props.orgId);
    // props.getProjectsData(props.orgId);
  },[]);
  const[customers,setCustomers]=useState("")
  const [chooseCandidate, setChooseCandidate] = useState({})
  const[projects,setProjects]=useState("")
  function handleChangeCustomer(value) {
    setCustomers(value)
  }

  console.log(customers)
  function handleChangeProject(value) {
    setProjects(value)
  }
  console.log(projects)
  function handleReset  (resetForm) {
    resetForm();
  };

  function getAreaOptions(filterOptionKey, filterOptionValue) {
    const contactOptions =
      props.projectsData.length &&
      props.projectsData
        .filter((option) => {
          if (
            option.customerId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.projectName || "",
          value: option.projectId,
        }));

    return contactOptions;
  }

  const handleSubmitCheckedItem = () => {
    let data = {
      candidateName: chooseCandidate.candidateName,
      projectName: props.projectName,
    }
    props.updateInvoiceData(data)
  }
 
  const customerData = props.customerTaskList
  .sort((a, b) => {
    const customerNameA = a.name && a.name.toLowerCase();
    const customerNameB = b.name && b.name.toLowerCase();
    if (customerNameA < customerNameB) {
      return -1;
    }
    if (customerNameA > customerNameB) {
      return 1;
    }

    // names must be equal
    return 0;
  })
  .map((item) => {
    return {
      label: `${item.name}`,
      value: item.customerId,
    };
  });

  console.log("cfg",props.customerId)
    return (
        <>
            <Formik

initialValues={{
  month:"",
  customerId: "",
  projectId:"",
  year:"",
}}
validationSchema={InvoiceSchema}
onSubmit={(values, { resetForm }) => {
  console.log(values.customerId);
  props.getCandidatesTotalBillingsForInvoice(values.customerId,values.projectId,values.month,values.year);
  
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
          <div class="mr-5 ml-5">
                <Form style={{minHeight: "30vh"}}>
                <div class=" flex justify-between ">
              <div class=" h-full w-1/2">
              <div class=" flex justify-between">
              <div class=" w-1/2">
              <Field
                          isRequired
                           name="customerId"
                          label="Customer"
                           component={SelectComponent}
                           value={values.customerId}
                          options={
                            Array.isArray(customerData) ? customerData : []
                          }
                          onChange={handleChangeCustomer}
                          style={{
                            width: "100%",
                          }}
                        />
             </div>
             <div class=" mt-3" />
                    <div class=" w-2/5">
                    <Field
                        isRequired
                    name="projectId"
                    label="Project"
                    component={SelectComponent}
                    //onChange={handleChangeProject}
                    options={
                      Array.isArray(
                        getAreaOptions("customerId", values.customerId)
                      )
                        ? getAreaOptions("customerId", values.customerId)
                        : []
                    }
                    value={values.projectId}
                    filterOption={{
                      filterType: "customerId",
                      filterValue: values.customerId,
                    }}
                    // disabled={!values.customerId}
                    isColumn
                    inlineLabel
                  />
                  </div>
                </div>
                <div class=" flex justify-between">
              <div class=" w-1/2">
              <Field
                        isRequired
                        name="month"
                        //label="Start "
                        label="Month"                        
                        isColumn
                        options={["Jan", "Feb", "Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]}
                        component={SelectComponent}
                        // value={values.startDate}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    <div class=" mt-3" />
                    <div class=" w-2/5">
                    <Field
                        isRequired
                        name="year"
                        //label="Start "
                        label="Year"                        
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
              </div>
    
           
           </div>
           <div class=" flex justify-end">
          <Button type="primary" 
             htmlType="submit"
           loading={props.fetchingCandidateTotalBillingForInvoice}
          >Submit</Button>
        </div>
        <InvoiceListProjectTable
        handleSubmitCheckedItem={handleSubmitCheckedItem}
        candidateTotalBillingForInvoice={props.candidateTotalBillingForInvoice}
        />
                </Form>
                </div>
                 )}
            </Formik>
        </>
    )
}
const mapStateToProps = ({
  auth,task,projects,invoice
}) => ({
  orgId: auth.userDetails.organizationId,
  customerTaskList: task.customerTaskList,
  projectsData:projects.projectsData,
  candidateTotalBillingForInvoice:invoice.candidateTotalBillingForInvoice,
  fetchingCandidateTotalBillingForInvoice:invoice.fetchingCandidateTotalBillingForInvoice

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerTask,
      getProjectsData,
      updateInvoiceData,
      getCandidatesTotalBillingsForInvoice
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FirstInvoiceProjectPage);