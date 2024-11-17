import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, } from "antd";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { addBankDetails } from "../../../../../CandidateAction";


const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class BankDocumentForm extends Component {
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
    const { addingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            bankName: "",
            branchName: "",
            ifscCode: "",
            accountNo: "",
            bank: this.state.defaultBank ? "true" : "false",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addBankDetails(
              { ...values,
                bank: this.state.defaultBank ? "true" : "false",
              },
              this.props.candidateId,
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
                    label="Account Holder Name"
                     
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
                    label="Account #"
                     
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
                      label="SWIFT Code"
                        
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
                      label="Branch"
                        
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
                    label="Bank"
                    
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
                  Loading={addingBankDetails}
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

const mapStateToProps = ({ auth, candidate }) => ({
  userId: auth.userDetails.userId,
  candidateId: candidate.candidate.candidateId,
  addingBankDetails: candidate.addingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addBankDetails
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BankDocumentForm);
