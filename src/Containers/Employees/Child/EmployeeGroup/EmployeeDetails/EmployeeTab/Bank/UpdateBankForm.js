import React, {  Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button} from "antd";
import { Formik, Form,  FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { updateBankDetails } from "../../../../../../Profile/ProfileAction";
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateBankForm extends Component {
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
                <div
                  style={{
                    width: "100%",
                      }}
                >
                  <div style={{ width: "100%" }}>
                    <FastField
                      name="accountNo"
                      label="Account Number"
                      isColumn
                      margintop={"0.25em"}
                      selectType="number"
                      component={InputComponent}
                      inlineLabel
                      style={{ flexBasis: "80%", width: "100%" }}
                    />
                  </div>
                  <mt-3 />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="ifscCode"
                        label="IFSC CODE"
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                       />
                    </div>
                  &nbsp;&nbsp;
                  <div style={{ width: "50%" }}>
                      <FastField
                        isRequired
                        name="branchName"
                        label="Branch Name"
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                  </div>
                  <mt-3 />
                  <div style={{ width: "100%" }}>
                    <FastField
                      isRequired
                      name="bankName"
                      label="Bank Name"
                      type="text"
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                </div>

                <mt-3 style={{ marginTop: "1.25em" }} />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    htmlType="submit"
                    type="primary"
                    Loading={updatingBankDetails}
                  >
                    
                    Update
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
  bindActionCreators({ updateBankDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateBankForm);
