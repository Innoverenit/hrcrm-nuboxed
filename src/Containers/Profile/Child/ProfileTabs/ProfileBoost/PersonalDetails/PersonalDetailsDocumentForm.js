import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { Button, Switch, Tooltip, Icon } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import ButtonGroup from "antd/lib/button/button-group";
import dayjs from "dayjs";
import { addDocumentDetails } from "../../../../ProfileAction";
import { FormattedMessage } from "react-intl";
function onChange(date) {}

// const documentSchema = Yup.object().shape({
//     documentId: Yup.string().required("Input needed !"),
// });
class PersonalDetailsDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
    };
  }
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  render() {
    const { addingPersonalDocumentDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            documentTypeId: "",
            employeeId: this.props.employeeId,

            idNo: "",
            idType: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addDocumentDetails(
              { ...values },
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
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "45%",
                    }}
                >
                  <FastField
                    name="documentTypeId"
                    // type="text"
                    selectType="documentTypeName"
                    isColumnWithoutNoCreate
                    //label="Type"
                    label={
                      <FormattedMessage id="app.type" defaultMessage="Type" />
                    }
                    // options={[
                    //   "Aadhar Card",
                    //   "Voter-Id Card",
                    //   "Driving-License",
                    //   "Pan Card",
                    //   "Passport",
                    // ]}
                    component={SearchSelect}
                    inlineLabel
                    className="field"
                    isColumn
                     />
                  <Spacer />
                  <div>
                    <Field
                      isRequired
                      name="idNo"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Document ID number"
                      label={
                        <FormattedMessage
                          id="app.idNo"
                          defaultMessage="Document ID number"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                     />
                  </div>
                </div>

                <div
                  style={{
                    width: "45%",
                     }}
                >
                  <Field
                    name="documentId"
                    isRequired
                    component={DragableUpload}
                  />
                  <Spacer />

                  <Field
                    name="documentTitle"
                    //label="Name of Document"
                    label={
                      <FormattedMessage
                        id="app.documentTitle"
                        defaultMessage="Name of Document"
                      />
                    }
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2.0625em", marginTop: "0.25em" }}
                  />
                  <Spacer />
                  <Field
                    name="documentDescription"
                    //label="Description of Document"
                    label={
                      <FormattedMessage
                        id="app.documentDescription"
                        defaultMessage="Description of Document"
                      />
                    }
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    />
                  <Spacer style={{ marginBottom: "0.9375em" }} />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingPersonalDocumentDetails}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
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

const mapStateToProps = ({ employee, profile }) => ({  
  addingPersonalDocumentDetails: profile.addingPersonalDocumentDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addDocumentDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDetailsDocumentForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  // console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
