import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip,  } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { updateDocumentDetails } from "../../../../ProfileAction";


function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdatePersonalDetailsDocumentForm extends Component {
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

        "Type",
        "Document ID number",
        "Name of Document",
        "Description of Document",
        "Submit"
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  render() {
    const { updatingPersonalDocumentDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingDocument.id,
            idNo: this.props.setEditingDocument.idNo || "",
            idType: this.props.setEditingDocument.idType || "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateDocumentDetails(
              values,
              this.props.employeeId,
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
              <div class=" flex w-full h-full justify-between"
              >
                <div class=" w-[45%]"
                ><div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
                  <FastField
                    name="idType"
                    type="text"
                    //label="Type"
                    // label={
                    //   <FormattedMessage id="app.type" defaultMessage="Type" />
                    // }
                    options={[
                      "Aadhar Card",
                      "Voter-Id Card",
                      "Driving-License",
                      "Pan Card",
                      "Passport",
                    ]}
                    component={SelectComponent}
                    inlineLabel
                    className="field"
                    isColumn
                    style={{
                      flexBasis: "80%",
                      height: "2.0625em",
                      marginTop: "0.25em",
                    }}
                  />
               
                  <div class=" mt-3">
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[1]}</div>
                    <Field
                      isRequired
                      name="idNo"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Document ID number"
                      // label={
                      //   <FormattedMessage
                      //     id="app.idNo"
                      //     defaultMessage="Document ID number"
                      //   />
                      // }
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                </div>

                <div class=" w-[45%]"
                >
                  <Field
                    name="documentId"
                    isRequired
                    component={DragableUpload}
                  />
               
<div class=" mt-3">
<div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[2]}</div>
                  <Field
                    name="documentTitle"
                    //label="Name"
                    // label={
                    //   <FormattedMessage
                    //     id="app.documentTitle"
                    //     defaultMessage="Name of Document"
                    //   />
                    // }
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2.0625em", marginTop: "0.25em" }}
                  />
                  </div>
                  <div class=" mt-3">
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[3]}</div>
                  <Field
                    name="documentDescription"
                    //label="Description"
                    // label={
                    //   <FormattedMessage
                    //     id="app.documentDescription"
                    //     defaultMessage="Description of Document"
                    //   />
                    // }
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    style={{ height: "5em", marginTop: "0.25em" }}
                  />
                    </div>
           
                </div>
              </div>
          
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingPersonalDocumentDetails}
                >
                 {this.state.translatedMenuItems[4]} {/* <FormattedMessage id="app.submit" defaultMessage= /> */}
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
  setEditingDocument: profile.setEditingDocument,
  updatingPersonalDocumentDetails: profile.updatingPersonalDocumentDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateDocumentDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePersonalDetailsDocumentForm);

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
