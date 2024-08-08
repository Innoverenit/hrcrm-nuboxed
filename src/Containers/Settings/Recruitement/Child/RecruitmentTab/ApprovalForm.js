import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {
  addApproval,
  // linkExceptionTypePayment,
  getApprovalData,
} from "../../../../Settings/SettingsAction";
import StandardApprovalForm from "./StandardApprovalForm";

class ApprovalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approve: false,
      type: true,
    };
  }
  handleApproveToggle = (checked) => {
    console.log(checked);
    this.setState({
      approve: checked,
    });
  };

  handleApproveType = (checked) => {
    console.log(checked);
    this.setState({
      type: checked,
    });
  };

   componentDidMount=() => {

       this.props.getApprovalData(this.props.stageId);
   }

  render() {
    console.log("approved",this.props.aaprovalprocessData)
   
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            reportingTo: "",
            threshold: "",
            departmentId: this.props.aaprovalprocessData.departmentId||"",
            designationId: this.props.aaprovalprocessData.designationId||"",
            jobLevel: "",
            recruitmentProcessId: this.props.recruitmentProcessId,
            stageId: this.props.stageId,
            approvalType: "Standard" ? true : false,
            //  approvalIndicator:  true : false,
          }}
          onSubmit={(values) => {
            console.log(values);
            // if (this.state.approveType) {
            this.props.addApproval({
              ...values,
              approvalType: values.approvalType ? "Standard" : "Exception",
              approvalIndicator: values.approvalIndicator ? true : false,
              recruitmentProcessId: this.props.recruitmentProcessId,
              stageId: this.props.stageId,
            });
         
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
                  height: "28vh",
                  width: "100%",
                }}
              >
                <div>
                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div
                      style={{
                        // marginTop: "35px",
                        width: "12%",
                        display: "flex",
                      }}
                    >
                      <div class=" text-xs font-bold font-poppins text-black">Needed</div>
                    
                    </div>

                    <div class=" flex flex-row flex-wrap items-start self-start justify-between w-[30%] grow shrink h-auto mr-auto ">
                      <div style={{ width: "30%" }}>
                        <Field
                          name="approvalIndicator"
                          component={SwitchComponent}
                          data={values.approvalIndicator}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"5em"}
                        />
                       
                      </div>
                    </div>
                  </div>
                </div>
                {values.approvalIndicator ? (
                  <div>
                    <mt-3 style={{ marginTop: "1%" }} />

                    <div>
                    <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                        <div
                          style={{
                            // marginTop: "35px",
                            width: "12%",
                            display: "flex",
                          }}
                        >
                          <div class=" text-xs font-bold font-poppins text-black">Type</div>
                        </div>

                        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[30%] ">
                          <div style={{ width: "30%" }}>
                            <Field
                              name="approvalType"
                              component={SwitchComponent}
                              data={values.approvalType}
                              checkedChildren={"Standard"}
                              unCheckedChildren={"Exception"}
                              width={"6em"}
                            />
                      
                          </div>
                        </div>
                      </div>
                    </div>
                    <mt-3 />
                   
                    <div style={{ marginTop: "2%" }}>
                      {values.approvalType ? (
                        <div>
                          <StandardApprovalForm
                            approvalIndicator={values.approvalIndicator ? true : false}
                            approvalType={values.approvalType ? "Standard" : "Exception"}
                            stageId= {this.props.stageId}
                          />
                           
                        </div>
                      ) : (
                        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                          <div style={{ width: "32%" }}>
                            <Field
                               name="departmentId"
                              isColumnWithoutNoCreate
                               selectType="departmentListFilter"
                              label="Department"
                              isColumn
                               component={SearchSelect}
                              
                              placeholder
                           
                              inlineLabel
                              width={"100%"}
                            />
                          </div>

                          <div style={{ width: "32%" }}>
                            <Field
                              name="designationId"
                              label="Designation"
                              isColumnWithoutNoCreate
                              selectType="designationType"
                            
                              component={SearchSelect}
                              value={values.designationTypeId}
                              // placeholder
                              isColumn
                              inlineLabel
                              width={"100%"}
                            />
                          </div>
                          <div style={{ width: "32%" }}>
                            <Field
                              name="jobLevel"
                              label="Job Level"
                              options={[
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "7",
                                "8",
                                "9",
                                "10",
                                "11",
                                "12",
                                "13",
                                "14",
                              ]}
                              component={SelectComponent}
                              // placeholder
                              isColumn
                              inlineLabel
                              width={"100%"}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    
                    <mt-3 style={{marginTop:"1.25em"}} />
                    {!values.approvalType ?
               <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                      <Button
                        type="primary"
                        htmlType="submit"
                        // style={{ marginRight: "40%" }}
                        loading={this.props.addingApproval}
                      >
                        Submit
                      </Button>
                    </div>
                     : null}
                  </div>
                ) : null}
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ settings, user, functions }) => ({
  addingApproval: settings.addingApproval,
 
  functions: functions.functions,

  aaprovalprocessData: settings.aaprovalprocessData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addApproval,
      
      getApprovalData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalForm);