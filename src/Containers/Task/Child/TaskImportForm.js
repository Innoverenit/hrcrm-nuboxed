import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addTaskImportForm} from "../TaskAction"
import { Button, Select } from "antd";
import { Formik, Form, Field } from "formik";
import ImportTaskUpload from "../../../Components/Forms/Formik/ImportTaskUpload";
const ButtonGroup = Button.Group;

const { Option } = Select;

class TaskImportForm extends Component {
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
              // enableReinitialize
              initialValues={{
                          
                excelId:"",
                type:"investorCategory"
               
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.addTaskImportForm(
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
                        name="excelId"
                        isRequired
                        component={ImportTaskUpload}                    
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
                    </div>
                  </div>

                  <mt-3 />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                    <Button
                      htmlType="submit"
                      type="primary"
                     Loading={this.props.addingTaskImportForm}
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
  addingTaskImportForm:task.addingTaskImportForm,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskImportForm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskImportForm);
