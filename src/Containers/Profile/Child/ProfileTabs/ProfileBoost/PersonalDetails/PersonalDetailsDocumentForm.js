import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { Button,  Tooltip,  } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import { addDocumentDetails } from "../../../../ProfileAction";

function onChange(date) {}

// const documentSchema = Yup.object().shape({
//     documentId: Yup.string().required("Input needed !"),
// });
class PersonalDetailsDocumentForm extends Component {
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
              <div class=" flex w-full h-full justify-between"
              >
                <div class=" w-[45%]">
                <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
                  <FastField
                    name="documentTypeId"
                    // type="text"
                    selectType="documentTypeName"
                    isColumnWithoutNoCreate
                    //label="Type"
                    // label={
                    //   <FormattedMessage id="app.type" defaultMessage="Type" />
                    // }
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
                    //label="Name of Document"
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
                    //label="Description of Document"
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
                    />
                     </div>
            
                </div>
              </div>
           
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingPersonalDocumentDetails}
                >
                  {this.state.translatedMenuItems[4]}{/* <FormattedMessage id="app.submit" defaultMessage="Submit" /> */}
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
