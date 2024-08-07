import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {updateTaskImportForm} from "../TaskAction"
import { Button,Select } from "antd";
import { Formik, Form, Field,  } from "formik";
import DragableUpload from "../../../Components/Forms/Formik/DragableUpload";
import { FormattedMessage } from "react-intl";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
const ButtonGroup = Button.Group;

const { Option } = Select;

class UpdateImportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      showUserList: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
    };
  }
 render() {  
   return (
      <>
             
            <Formik
       
              initialValues={{                                     
                taskId:this.props.currentNameId.taskId,
                documentId:"",
                documentTitle:"",
               
              }}       
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.updateTaskImportForm(
                  // values.documentId,
                  {
                    ...values,
                    // shareInd:this.state.showUserList,
                  },
                  this.props.orgId,
                  this.callback
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
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                      <Field
                        name="documentId"
                        isRequired
                        component={DragableUpload}
                        // component={DocumentUpload}
                      />
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <mt-3 />
                 
                  <mt-3 />
                
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >                 
                      <mt-3 />
                      <mt-3 style={{ marginBottom: "0.9375em" }} />

                      <Field
                        name="documentTitle"
                        //label="Name"
                        label={
                          <FormattedMessage
                            id="app.title"
                            defaultMessage="Title"
                          />
                        }
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        style={{ height: "2em",  }}
                      />
                        
                    </div>
                  </div>

                  <mt-3 />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                    <Button
                      htmlType="submit"
                      type="primary"
                     Loading={this.props.updatingTaskImportForm}
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

const mapStateToProps = ({ document, settings,employee, task,departments,auth }) => ({
    updatingTaskImportForm:task.updatingTaskImportForm,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updateTaskImportForm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateImportForm);
