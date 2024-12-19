import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { addBankDetails } from "../../../../../../Profile/ProfileAction";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
  accountHolderName: Yup.string().required("Input needed !"),
});
class BankDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        "1688",//0"Account Holder Name"
        "1687",//1Account Number"
        "1190",//2SWIFT Code"
        "1188",//3Branch Name"
      "1187",  //"Bank Name"4
      "154",  // Submit5
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const { addingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            bankName: "",
            branchName: "",
            ifscCode: "",
            accountNo: "",
            orgId:this.props.orgId,
            userId:this.props.userId,
            id: "",
            defaultInd: true,
            accountHolderName:""


          
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addBankDetails(values,"employee", this.props.employeeId);

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
              <div class=" w-full"
              >
                <div class=" w-full">
                <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[0]}</div>
                  <FastField
                    isRequired
                    name="accountHolderName"
                    
                    isColumn
                    
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                    style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
            
                <div class=" w-full mt-3" >
                <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[1]}</div>
                  <FastField
                    name="accountNo"
                    
                    isColumn
                   
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                    style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
               
                <div class=" flex mt-3"
              >
                 <div class=" w-[47%]"
              ><div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[2]}</div>
                    <FastField
                      name="ifscCode"
                    
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                 
                  <div class=" w-[50%] ml-4"
              ><div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[3]}</div>
                    <FastField
                      // isRequired
                      name="branchName"
                      
                      type="text"
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                </div>
             
                <div class=" w-full mt-3" >
                <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[4]}</div>
                  <FastField
                    isRequired
                    name="bankName"
                   
                    type="text"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    inlineLabel
                    />
                </div>
              </div>

              
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingBankDetails}
                >
                  {this.state.translatedMenuItems[5]} {/* Submit */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee, profile, auth }) => ({
  userId: auth.userDetails.userId,
  employeeId: employee.singleEmployee.employeeId,
  addingBankDetails: profile.addingBankDetails,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addBankDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BankDocumentForm);
