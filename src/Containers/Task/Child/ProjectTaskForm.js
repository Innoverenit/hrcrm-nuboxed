import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addProjectTask}from "../TaskAction"
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";

class ProjectTaskForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };

  render() {
 
console.log("Item2",this.props.item.hourId)


    const {
      user: { userId },
      candidateDate,
      onboardDate,
      actualEndDate,
      value
     
    } = this.props;
  
    return (
      <>
        <Formik
          initialValues={{
            approveInd:true,
            approveUnit:"",
            hourId:this.props.item.hourId
                                                  
          }}
          
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);

            this.props.addProjectTask(
              {
                ...values,
                                       
              },
       
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
            <div class="mt-3" />
         <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div style={{width:"47%"}}>              
                    <Field
                      isRequired
                      name="approveUnit"              
                      label="Approve Unit"
                      component={InputComponent}
                     
                      inlineLabel
                      isColumn
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>                                                        
                 </div>                         
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
              Loading={this.props.projectTask}
                >
                Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, task,contact, customer }) => ({
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    projectTask:task.projectTask
   
    
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

        addProjectTask
     
        // addCandidateDate

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTaskForm);
