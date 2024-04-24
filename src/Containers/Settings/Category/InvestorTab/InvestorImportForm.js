import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addInvestorImportForm} from "../InvestorTab/InvestorListAction"
import { Button,Select } from "antd";
import { Formik, Form, Field, FieldArray,FastField } from "formik";
import { Spacer,  } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import ImportTaskUpload from "../../../../Components/Forms/Formik/ImportTaskUpload";
import CategoryImportUpload from "../../../../Components/Forms/Formik/CategoryImportUpload";
const ButtonGroup = Button.Group;

const { Option } = Select;

class InvestorImportForm extends Component {
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
   
    

  

 

    return (
      <>
       
         
            <Formik
              // enableReinitialize
              initialValues={{
              
              
                excelId:"",
                type:"investorCategory"
               
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.addInvestorImportForm(
                  // values.documentId,
                  {
                    ...values,
                    // shareInd:this.state.showUserList,
                  },
                  this.props.orgId,
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
                      {/* <Field
                        name="excelId"
                        isRequired
                        component={}
                        // component={DocumentUpload}
                      /> */}
                      <CategoryImportUpload type="investorCategory"/>
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <Spacer />
                 
                  <Spacer />
                
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                  
                      <Spacer />
                   


                      <Spacer style={{ marginBottom: "0.9375em" }} />

                
      

                     
                    </div>
                  </div>

                  <Spacer />
                  <FlexContainer justifyContent="flex-end">
                    {/* <Button
                      htmlType="submit"
                      type="primary"
                     Loading={this.props.addingInvestorImportForm}
                    >
                      Submit
                    </Button> */}
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

const mapStateToProps = ({ document, settings,employee, investorList,departments,auth }) => ({
    addingInvestorImportForm:investorList.addingInvestorImportForm,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addInvestorImportForm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorImportForm);
