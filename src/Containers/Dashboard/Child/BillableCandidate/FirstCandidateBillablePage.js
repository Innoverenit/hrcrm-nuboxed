import { Field, Form, Formik } from 'formik'
import React, {useEffect,useState} from 'react'
import moment from "moment";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
 import {getCandidatesBillableAmount} from "../../DashboardAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Button, Checkbox, Divider, Select } from 'antd';
import { MainWrapper } from "../../../../Components/UI/Elements";
// import { SelectComponent } from "../../../../AddressFieldArrayComponents/Forms/Formik/SelectComponent";
import { Spacer } from "../../../../Components/UI/Elements";
import { InputComponent } from '../../../../Components/Forms/Formik/InputComponent'
import { dashboardReducer } from '../../DashboardReducer';
import BillableCandidateListTable from './BillableCandidateListTable';

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const InvoiceSchema = Yup.object().shape({
  customerId: Yup.string().required("Input needed!"),
  projectId: Yup.string().required("Input needed!"),
  month: Yup.string().required("Input needed!"),
  year: Yup.string().required("Input needed!"),
 
});
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Packing", "Insurance", "Assembly", "Freight", "GST"];
const defaultCheckedList = []

function FirstCandidateBillablePage(props) {
  useEffect(()=>{
  
  },[]);
  const[customers,setCustomers]=useState("")
  const [pageNo, setPageNo] = useState(0);
  const [chooseCandidate, setChooseCandidate] = useState({})
  const[projects,setProjects]=useState("")
  function handleChangeCustomer(value) {
    setCustomers(value)
  }

  
  // const handleSelectCandidate = (data) => {
  //   var theobj = JSON.parse(data);
  //   console.log(theobj);
  //   setChooseCandidate(theobj)
  //    props.getItemsSelectedForSupplier(theobj.analysisId)
  // }
  console.log(customers)
  function handleChangeProject(value) {
    setProjects(value)
  }
  console.log(projects)
  function handleReset  (resetForm) {
    resetForm();
  };

  const handleSubmitCheckedItem = () => {
    let data = {
      candidateName: chooseCandidate.candidateName,
      projectName: props.projectName,
    }
    // props.updateInvoiceData(data)
  }
 


  console.log("cfg",props.customerId)
    return (
        <>
            <Formik

initialValues={{
  month:"",
  userId: "",
  pageNo:"",
  year:"",
}}
// validationSchema={InvoiceSchema}
onSubmit={(values, { resetForm }) => {
//   console.log(values.customerId);
  props.getCandidatesBillableAmount(props.userId,pageNo,values.month,values.year);
  setPageNo(pageNo + 1);
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
          <MainWrapper  >
                <Form style={{minHeight: "30vh"}}>
                <div class=" flex justify-between ">
              <div class=" h-full w-1/2">
            
                <div class=" flex justify-between">
              <div class=" w-1/2">
              <Field
                        isRequired
                        name="month"
                        //label="Start "
                        label={
                          <FormattedMessage
                            id="app.month"
                            defaultMessage="Month"
                          />
                        }
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
                    <Spacer />
                    <div class=" w-2/5">
                    <Field
                        isRequired
                        name="year"
                        //label="Start "
                        label={
                          <FormattedMessage
                            id="app.year"
                            defaultMessage="Year"
                          />
                        }
                        isColumn
                        // options={["Jan", "Feb", "Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]}
                        component={InputComponent}
                        // value={values.startDate}
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
            loading={props.fetchingCandidateTotalBillableAmount}
          >Submit</Button>
        </div>
        <BillableCandidateListTable
        handleSubmitCheckedItem={handleSubmitCheckedItem}
        candidatesBillableAmount={props.candidatesBillableAmount}
        />
                </Form>
                </MainWrapper>
                 )}
            </Formik>
        </>
    )
}
const mapStateToProps = ({
  auth,task,dashboard,invoice
}) => ({
    userId: auth.userDetails.userId,
    candidatesBillableAmount:dashboard.candidatesBillableAmount,
    fetchingCandidateTotalBillableAmount:dashboard.fetchingCandidateTotalBillableAmount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     getCandidatesBillableAmount    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FirstCandidateBillablePage);