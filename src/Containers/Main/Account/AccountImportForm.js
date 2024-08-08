import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Select } from "antd";
import { Formik, Form, Field, } from "formik";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import {addAccountImportForm} from "./AccountAction"
import { FlexContainer } from "../../../Components/UI/Layout";
import DragableUpload from "../../../Components/Forms/Formik/DragableUpload";
//import { leadsReducer } from "../LeadsReducer";
import ImportTaskUpload from "../../../Components/Forms/Formik/ImportTaskUpload";
import { distributorReducer } from "./AccountReducer";


const { Option } = Select;
// const documentSchema = Yup.object().shape({
// documentName: Yup.string().required("This field is required !"),
// documentId: Yup.string().required("Input needed !"),
// documentDescription: Yup.string().required("This field is required !"),
// stageId: Yup.string().required("This field is required !")
// });
// const documentSchema = Yup.object().shape({

// documentId: Yup.string().required("Input needed!"),
// });
class AccountImportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      showUserList: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
    };
  }
 

 

  render() {
   
   
   const catagory=[
    {
      id:1,
      name:"Document"  
    },
    {
        id:2,
        name:"Spreadsheet"  
      },
      {
        id:3,
        name:"Presentation"  
      },
      {
        id:4,
        name:"Image"  
      },
   ]


  

 
 
    return (
      <>
       
         
            <Formik
              // enableReinitialize
              initialValues={{
              
               
                excelId:"",
               
                // shareInd:"",
                //opportunityId:this.props.opportunity.opportunityId,
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.addAccountImportForm(
                  // values.documentId,
                  {
                    ...values,
                    //shareInd:this.state.showUserList,
                  },
                  this.props.userId,
                  this.callback
                );
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
                <Form className="form-background">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                      <Field
                        name="excelId"
                        isRequired
                        component={ImportTaskUpload}
                        // component={DocumentUpload}
                      />
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <div class=" mt-3" />
                  
                  <div class=" mt-3" />
                   
                    </div>
                    
                  </div>

                  <div class=" mt-3" />
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      htmlType="submit"
                      type="primary"
            loading={this.props.addingAccountImportForm}
                    >
                      Submit
                    </Button>
                  </FlexContainer>
                </Form>
              )}
            </Formik>
        
       
      </>
    );
  }
}
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ document, settings,distributor,leads,employee, departments,auth }) => ({
    addingLeadsImportForm:leads.addingLeadsImportForm,
    userId:auth.userDetails.userId,
    addingAccountImportForm:distributor.addingAccountImportForm

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addAccountImportForm
        //addLeadsImportForm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AccountImportForm);
