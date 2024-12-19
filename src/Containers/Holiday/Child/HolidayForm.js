import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button,} from "antd";
import { Formik, Form, Field,  FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class HolidayForm extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      toggle: false,
    };
  }
  handleChange = (checked) => {
    this.setState({
      toggle: checked,
    });
  };
  handleClose = () => {
    this.setState({
      toggle: this.state.toggle ? false : false,
    });
  };
  render() {
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.userId,
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addBankDetails(
              {...values,}, "employee",
              this.props.userId,

              resetForm()
            );
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
                  <FastField
                    name="accountNo"
                    label="Holiday Name"
                    isColumn
                    margintop={"0.25em"}
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                    style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
               
                <div class=" flex mt-3">
                  <div class=" w-[47%]" >
                    <Field
                      name="startDate"
                      label="Start Date"
                      isRequired
                      component={DatePicker}
                      isColumn
                      width={"100%"}
                      value={values.startDate}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.25em",
                        width: "100%",
                      }}
                    />
                  </div>
                
                  <div class=" w-[50%] ml-4" ></div>
                </div>
               
                <div class=" w-full mt-3" >
                  {/* <Switch
                                        style={{ width: "6.25em", marginLeft: "0.625em" }}
                                        onChange={this.handleChange}
                                        checked={this.state.toggle}
                                        checkedChildren="Optional"
                                        unCheckedChildren="Mandatory"
                                    /> */}
                </div>
              </div>

            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  // Loading={adddingDocumentByOpportunityId}
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

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // addBankDetails
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HolidayForm);
