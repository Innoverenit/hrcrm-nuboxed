import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";
import { Formik, Form, Field } from "formik";
import {addCustomerImportForm} from "../CustomerAction"
import ImportTaskUpload from "../../../Components/Forms/Formik/ImportTaskUpload";


const { Option } = Select;
class CustomerImportForm extends Component {
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
                this.props.addCustomerImportForm(
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
                      <mt-3 />
                  
                  <mt-3 />
                   
                    </div>
                    
                  </div>

                  <mt-3 />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                    <Button
                      htmlType="submit"
                      type="primary"
                Loading={this.props.addingCustomerImportForm}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
        
       
      </>
    );
  }
}

const mapStateToProps = ({ document, settings,leads,customer, departments,auth }) => ({
    addingLeadsImportForm:leads.addingLeadsImportForm,
    addingCustomerImportForm:customer.addingCustomerImportForm,
    userId:auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addCustomerImportForm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerImportForm);
