import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Tooltip, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { updateDocumentDetails } from "../../../../../../Profile/ProfileAction";


function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdatePersonalDetailsDocumentForm extends Component {
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
            documentName:this.props.setEditingDocument.documentName || "",
            description:this.props.setEditingDocument.description || "",

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
                >
                  <FastField
                    name="idType"
                    type="text"
                    label="Type"
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
                    />
                
                  <div class=" mt-3">
                    <Field
                      isRequired
                      name="idNo"
                      type="text"
                      isColumn
                      width={"100%"}
                      label="Document ID number"
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
                    label="Name"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                     />
                     </div>
                     <div class=" mt-3">
                  <Field
                    name="description"
                    label="Description"
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    style={{ height: "5em" }}
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
