import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, } from "antd";
import { Formik, Form, Field, } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addContractDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

function onChange(date) { }

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class ContractDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
    };
  }


  render() {
    const { addingContractDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            previous_start_date: "",
            previous_end_date: "",
            contract_Type: "",
            notes: "",
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addContractDetails(
              {
                ...values,
                previous_start_date: dayjs(values.previous_start_date).toISOString(),
                previous_end_date: dayjs(values.previous_end_date).toISOString(),
                // present_start_date: dayjs(values.present_start_date).toISOString(),
                // present_end_date: dayjs(values.present_end_date).toISOString(),
              },
              this.props.employeeId,
              values.documentId,
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
              <div class=" flex w-full h-full justify-between"
              >
                <div class=" w-full"
                >
                  <div class=" flex justify-between" >
                    <div class=" w-[47%]">
                      <Field
                        name="previous_start_date"
                        //label="Start Date"
                        label={
                          <FormattedMessage
                            id="app.startDate"
                            defaultMessage="Start Date"
                          />
                        }
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.previous_start_date}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          width: "100%",
                          
                        }}
                      />
                    </div>
                    <div class=" w-[47%]">
                      <Field
                        name="previous_end_date"
                        // label="End Date "
                        label={
                          <FormattedMessage
                            id="app.endDate"
                            defaultMessage="End Date"
                          />
                        }
                        isRequired
                        isColumn
                        width={"100%"}
                        component={DatePicker}
                        value={values.previous_end_date}
                        disabledDate={(currentDate) => {
                          if (values.previous_start_date) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.previous_start_date)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          width: "100%",
                          
                        }}
                      />
                    </div>
                  </div>
              
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-full" >
                    <Field
                      isRequired
                      name="contract_Type"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Course Name"
                      label={
                        <FormattedMessage
                          id="app.contractType"
                          defaultMessage="Contract Type"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                       
                      }}
                    />
                    </div>
                   
                  </div>
           
                  <div class=" mt-3">
                  <Field
                    name="notes"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    style={{
                      flexBasis: "80%",
                      height: "5em",
                      // marginLeft: "2.5em",
                    
                    }}
                  />
                  </div>
                </div>
              </div>
            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingContractDetails}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
              </div>
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

const mapStateToProps = ({ employee, profile }) => ({
  employeeId: employee.singleEmployee.employeeId,
  addingContractDetails: profile.addingContractDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addContractDetails
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContractDocumentForm);