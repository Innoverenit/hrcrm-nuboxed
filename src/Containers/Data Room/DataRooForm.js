import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field,  FastField,setFieldValue  } from "formik";
import * as Yup from "yup";
//   addLeads,  
//   setClearbitData,
//   emptyClearbit,
//   getCrm
// } from "../../Leads/LeadsAction";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";

const { Option } = Select; 

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const LeadsSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber:Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function DataRooForm (props) {
  
 const handleReset = (resetForm) => {
    resetForm();
  };
 
//   useEffect(()=> {
// props. getCrm();
// props.emptyClearbit();
//   },[]);

    const {
      accounts,
      user,
      userId,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingLeads,
      addLeads,
      clearbit,
      setClearbitData,
    } = props;
    const [lob, setLob] = useState([]);
    const [selectedLob, setSelectedLob] = useState(null);
    const [touchedLob, setTouchedLob] = useState(false);
    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.crmAllData.find((item) => item.empName === selected);
    const [isLoadingLob, setIsLoadingLob] = useState(false);
    const [source, setSource] = useState([]);
    const [sector, setSector] = useState([]);
    const [touched, setTouched] = useState(false);
  const [touchedSector, setTouchedSector] = useState(false);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const [isLoadingSector, setIsLoadingSector] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            partnerName: "",
            source: selectedSource,
            url: "",
            sectorId: selectedSector,
            email: "",
            phoneNumber: "",
            fullName:"",
            userId: props.userId,
            notes: "",
            businessRegistration: "",
            assignedTo: selectedOption ? selectedOption.employeeId:userId,
            department: "",
            salutation:"",
            firstName:"",
            middleName:"",
            lastName:"",
            proposalValue:"",
            opportunityName:"",
            countryDialCode:"",
            bedrooms:"",
        
            propertyType:"",
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
              },
            ],
          }}
          validationSchema={LeadsSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addLeads(
              {
                ...values,
                companyName: "",
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
                source: selectedSource,
                lob:selectedLob,
                price:values.price,
               
                sectorId: selectedSector,
              },
              props.userId,
            );
            resetForm()
       
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
           
             <div class="flex justify-between  pr-2 max-sm:flex-col" >
                   
                <div class=" h-full w-w47.5 max-sm:w-wk"   >
                  <div class=" flex  flex-nowrap">

                   
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                       
                        <div class=" w-wk max-sm:w-full ">
                          <FastField
                            isRequired
                            name="firstName"
                            label="Room name"
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>                  
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
                          <FastField
                            name="middleName"
                            label="Room member list"
                           
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                          {/* <Field
      name="type"
      label="Room member list"
      isColumn
      width={"100%"}
     component={SelectComponent}
      options={
        Array.isArray(typeOption)
          ? typeOption
          : []
      }
      inlineLabel
    /> */}
                        </div>
                        <div class=" w-1/2 max-sm:w-full">
                          <FastField
                            name="lastName"
                            label="List of user"
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

                  <Field
                    isRequired
                    name="email"
                    type="text"
                    label="List of contact"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  /> 
                               
                 
              
                 
                
                         
                 
                
                  
                   
               
                 
                   
             

                  
                </div>
              
              </div>
            
              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
               type="primary"
               htmlType="submit"
                  loading={addingLeads}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
}

const mapStateToProps = ({ auth, leads,lob }) => ({
  addingLeads: leads.addingLeads,
  crmAllData:leads.crmAllData,
  addingLeadsError: leads.addingLeadsError,
   clearbit: leads.clearbit,
   orgType:auth.userDetails.orgType,
  user: auth.userDetails,
  lobListData: lob.lobListData,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  fullName: auth.userDetails.fullName,
  token: auth.token,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //    addLeads,
    //    getCrm,
    //   setClearbitData,
    //   emptyClearbit

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DataRooForm);
