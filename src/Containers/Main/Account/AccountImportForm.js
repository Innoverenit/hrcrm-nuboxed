import React, { Component , lazy, Suspense} from "react";
import { connect } from "react-redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { Formik, Form, Field, } from "formik";
import {addAccountImportForm} from "./AccountAction"
const ImportTaskUpload = lazy(() => import("../../../Components/Forms/Formik/ImportTaskUpload"));

const { Option } = Select;

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
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
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
        "154",//0 Submit
       
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

 

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
                  <div className=" flex justify-between "  >
                    <div className=" w-[45%] h-[100%] "
                     
                    >
                       <Suspense fallback={<BundleLoader />}>
                      <Field
                        name="excelId"
                        isRequired
                        component={ImportTaskUpload}
                        // component={DocumentUpload}
                      /></Suspense>
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
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                    <Button
                      htmlType="submit"
                      type="primary"
            loading={this.props.addingAccountImportForm}
                    >
                     {this.state.translatedMenuItems[0]} {/* Submit */}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
        
       
      </>
    );
  }
}


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
