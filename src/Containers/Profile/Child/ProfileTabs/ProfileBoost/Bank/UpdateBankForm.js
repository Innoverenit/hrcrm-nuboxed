import React, {  Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,  } from "antd";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import {updateBankDetails} from "../../../../ProfileAction"
import { FormattedMessage } from "react-intl";
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateBankForm extends Component {
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

       "Account Number",
      "IFSC Code",
        "Branch Name",
        "Bank Name",
        "Update",
        ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const { updatingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingBank.id,
            bankName: this.props.setEditingBank.bankName || "",
            branchName: this.props.setEditingBank.branchName || "",
            ifscCode: this.props.setEditingBank.ifscCode || "",
            accountNo: this.props.setEditingBank.accountNo || "",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateBankDetails(
              values,
              this.props.userId,
              resetForm()
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
              <div class=" w-full"
              >
                 <div class=" w-full" >
                 <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>

                  <FastField
                    name="accountNo"
                    // label="Account Number"
                    // label={
                    //   <FormattedMessage
                    //     id="app.accountNo"
                    //     defaultMessage="Account Number"
                    //   />
                    // }
                    isColumn
                    margintop={"0.25em"}
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                    style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
               
                <div class=" flex mt-3">
                <div class=" w-[47%]"  >
                <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[1]}</div>

                    <FastField
                      name="ifscCode"
                      //label="IFSC CODE"
                      // label={
                      //   <FormattedMessage
                      //     id="app.ifscCode"
                      //     defaultMessage="IFSC CODE"
                      //   />
                      // }
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
              
                  <div class=" w-[50%] ml-2">
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[2]}</div>

                    <FastField
                      isRequired
                      name="branchName"
                      //label="Branch Name"
                      // label={
                      //   <FormattedMessage
                      //     id="app.branchName"
                      //     defaultMessage="Branch Name"
                      //   />
                      // }
                      type="text"
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      inlineLabel
                      style={{
                        height: "2.0625em",
                        flexBasis: "80%",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                </div>
               
                <div class=" w-full mt-3"
              > <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[3]}</div>

                  <FastField
                    isRequired
                    name="bankName"
                    //label="Bank Name"
                    // label={
                    //   <FormattedMessage
                    //     id="app.bankName"
                    //     defaultMessage="Bank Name"
                    //   />
                    // }
                    type="text"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    inlineLabel
                    style={{
                      height: "2.0625em",
                      flexBasis: "80%",
                      marginTop: "0.25em",
                    }}
                  />
                </div>
              </div>

              
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingBankDetails}
                >
                 {this.state.translatedMenuItems[4]} {/* <FormattedMessage id="app.update" defaultMessage="Update" /> */}
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
  employeeId: employee.singleEmployee.employeeId,
  setEditingBank: profile.setEditingBank,
  updatingBankDetails: profile.updatingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    updateBankDetails
   }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateBankForm);
