import React, {  Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, } from "antd";
import { Formik, Form, FastField } from "formik";

import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { updateBankDetails } from "../../../../../CandidateAction";
import { FormattedMessage } from "react-intl";
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateBankForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultBank: false,
    };
  }
  handleDefaultbank = (checked) => {
    this.setState({ defaultBank: checked });
  };
  render() {
    const { updatingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            id: this.props.setEditingBank.id,
            bankName: this.props.setEditingBank.bankName || "",
            branchName: this.props.setEditingBank.branchName || "",
            ifscCode: this.props.setEditingBank.ifscCode || "",
            accountNo: this.props.setEditingBank.accountNo || "",
            bank: this.props.setEditingBank.bank || this.state.defaultBank ? "true" : "false",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateBankDetails(
              values,
              // this.props.userId,
              this.props.candidateId,

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
               <div class=" flex justify-between" >
               <div class=" w-[47%]"
            >
                <FastField
                  name="accountHolderName"
                  //label="Account Number"
                  label={
                    <FormattedMessage
                      id="app.accountHolderName"
                      defaultMessage="Account Holder Name"
                    />
                  }
                  isColumn
                  width={"100%"}
                  
                  component={InputComponent}
                  inlineLabel
                  />
              </div>
              
              <div class=" w-[47%]"
            >
                <FastField
                  name="accountNo"
                  //label="Account Number"
                  label={
                    <FormattedMessage
                      id="app.accountNo"
                      defaultMessage="Account #"
                    />
                  }
                  isColumn
                  width={"100%"}
                  selectType="number"
                  component={InputComponent}
                  inlineLabel
                  />
              </div>
              </div>
              <div class=" flex justify-between mt-4" >
               <div class=" w-[47%]"
            >
                  <FastField
                    name="ifscCode"
                    //label="IFSC CODE"
                    label={
                      <FormattedMessage
                        id="app.swiftCode"
                        defaultMessage="SWIFT Code"
                      />
                    }
                    className="field"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                
                <div class=" w-[47%]"
            >
                  <FastField
                    name="branchName"
                    // label="Branch Name"
                    label={
                      <FormattedMessage
                        id="app.branch"
                        defaultMessage="Branch"
                      />
                    }
                    type="text"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    inlineLabel
                    />
                </div>
              </div>
              <div class=" flex justify-between mt-4" >
               <div class=" w-[47%]"
            >
                <FastField
                  isRequired
                  name="bankName"
                  //label="Bank Name"
                  label={
                    <FormattedMessage
                      id="app.bank"
                      defaultMessage="Bank"
                    />
                  }
                  type="text"
                  width={"100%"}
                  isColumn
                  component={InputComponent}
                  inlineLabel
                  />
              </div>
              
              <div class=" w-[47%] mt-[1.5em]" style={{margin:"6% 0% 0% 0%"}}>
              <div class=" flex justify-between" >
              <div class=" text-xs font-bold font-poppins text-black">Default Bank?</div>
              <Switch
               
                checked={this.state.defaultBank}
                onChange={this.handleDefaultbank}
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
              </div>
            </div>
            </div>

            <div class=" flex justify-end mt-[1.25em]" >
              <Button
                htmlType="submit"
                type="primary"
                Loading={updatingBankDetails}
              >
                Submit
              </Button>
            </div>
            </div>
          </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  candidateId: candidate.candidate.candidateId,
  setEditingBank: candidate.setEditingBank,
  updatingBankDetails: candidate.updatingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateBankDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateBankForm);
