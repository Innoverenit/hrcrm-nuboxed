import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import Upload from "../../../../../../Components/Forms/Formik/Upload";
import { addBankDetails } from "../../../../ProfileAction";


const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class BankDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
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
      
       "Account Holder Name",
       "Account Number",
      "SWIFT/IFSC Code",
        "Branch Name",
        "Bank Name",
        "Submit",
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
            accountName:"",
            bankName: "",
            branchName: "",
            ifscCode: "",
            accountNo: "",
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
                  <FastField name="imageId" component={Upload} />
                  <div class=" w-full"
              ><div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
                  <FastField
                    name="accountName"
                    isColumn
                    margintop={"0.25em"}
                    component={InputComponent}
                    inlineLabel
                    //style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
               
                <div class=" w-full mt-3"
              ><div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[1]}</div>
                  <FastField
                    name="accountNo"
                    isColumn
                    margintop={"0.25em"}
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                   // style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
                <div class=" flex mt-3">
                  <div class=" w-[47%]" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[2]}</div>
                    <FastField
                      name="ifscCode"
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  
                  <div class=" w-[50%] ml-2" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[3]}</div>
                    <FastField
                      name="branchName"
                      type="text"
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                </div>
                
                <div class=" mt-3 w-full" >
                <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[4]}</div>
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
                {this.state.translatedMenuItems[5]}  {/* Submit */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee, profile }) => ({
  addingBankDetails: profile.addingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addBankDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BankDocumentForm);
