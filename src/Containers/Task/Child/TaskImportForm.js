import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {addTaskImportForm} from "../TaskAction"

import { Button, Switch, Tooltip, Icon,Select } from "antd";

// import { RightSquareOutlined, ToTopOutlined } from '@ant-design/icons';
import { Formik, Form, Field, FieldArray,FastField } from "formik";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";




import * as Yup from "yup";

// import { getOppoStages, getLevels } from "../../Settings/SettingsAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import DragableUpload from "../../../Components/Forms/Formik/DragableUpload";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";

import { FormattedMessage } from "react-intl";
import { RightSquareOutlined, ToTopOutlined } from "@ant-design/icons";
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
                        // component={DocumentUpload}
                      />
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <Spacer />
                 
                  <Spacer />
                
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                  
                      <Spacer />
                   


                      <Spacer style={{ marginBottom: "0.9375em" }} />

                
      

                     
                    </div>
                  </div>

                  <Spacer />
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      htmlType="submit"
                      type="primary"
                     Loading={this.props.addingTaskImportForm}
                    >
                      Submit
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
