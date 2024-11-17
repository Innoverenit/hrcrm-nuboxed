import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field, FastField } from "formik";

import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { addDocumentDetails,
  getLinkedUsersDocument } from "../../../../../../Profile/ProfileAction";

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
  
  componentDidMount() {
    const { getLinkedUsersDocument ,orgId} = this.props;
    this.props.getLinkedUsersDocument(this.props.orgId);
    // getLinkedUsersDocument(orgId);
   
}

  render() {
    const { addingPersonalDocumentDetails } = this.props;
    const documentNameOption = this.props.linkedUserDocument.map((item) => {
      return {
          label: `${item.documentTypeName|| ""}`,
          value: item.documentTypeId,
      };
  });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,

            idNo: "",
            documentTypeId: this.props.documentTypeId,
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            
            // values.documentTypeId = values.documentId;
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
                <div class=" w-[45%]"
  
                >
                  <FastField
                    name="documentTypeId"
                    type="text"
                    //label="Type"
                    label={
                      <FormattedMessage id="app.type" defaultMessage="Type" />
                    }
                 
                    options={
                      Array.isArray(documentNameOption)
                        ? documentNameOption
                        : []
                    }
                    component={SelectComponent}
                    inlineLabel
                    className="field"
                    isColumn
                     />
               
                  <div class=" mt-3">
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

                <div class=" w-[45%]"
                >
                  <Field
                    name="documentId"
                    isRequired
                    component={DragableUpload}
                  />
                 <div class=" mt-3">
                  <Field
                    name="documentName"
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
                  />
                  </div>
                  <div class=" mt-3">
                  <Field
                    name="description"
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
                    style={{ height: "5em"}}
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

const mapStateToProps = ({ employee,auth, profile }) => ({
  linkedUserDocument:profile.linkedUserDocument,
  employeeId: employee.singleEmployee.employeeId,
  orgId: auth.userDetails.organizationId,
  addingPersonalDocumentDetails: profile.addingPersonalDocumentDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    addDocumentDetails,
    getLinkedUsersDocument
   }, dispatch);
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
