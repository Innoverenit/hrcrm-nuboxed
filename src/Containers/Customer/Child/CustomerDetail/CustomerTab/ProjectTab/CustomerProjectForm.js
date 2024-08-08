import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";

import * as Yup from "yup";

const expRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const courseSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});
function CustomerProjectForm(props) {
  useEffect(() => {}, []);
  function handleReset(resetForm) {
    resetForm();
  }
  const {
   
  } = props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            taskTypeId:"",
            // currencyName:"",
        
        
  
          }}
          //  validationSchema={courseSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            // addCourse(
            //   {
            //     ...values,
                
            //   },
            //   // props.userId,
            //   () => handleReset(resetForm)
            // );
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
            <div class=" flex justify-between overflow-scroll"
          >
           
                <div class=" w-2/4"
                >
                 <div class=" flex justify-between">
   <div class=" w-2/4">
                  <Field
                     isRequired
                    name="projectName"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage
                        id="app.projectName"
                        defaultMessage="Project Name"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
</div>
<div class=" w-2/4">
<FastField
                              name="taskTypeId"
                              selectType="taskType"
                              //label="Designation"
                              label={
                                <FormattedMessage
                                  id="app.taskList"
                                  defaultMessage="Task List"
                                />
                              }
                              isColumnWithoutNoCreate
                              isColumn
                              component={SearchSelect}
                              inlineLabel
                            />
                          </div>
                          </div>
                          <div class=" flex justify-between">
                          <div class=" w-2/4">
                      {" "}
                      <Field
                        name="avilableDate"
                        //label="Start Date"
                        label={<FormattedMessage
                          id="app.avilableDate"
                          defaultMessage="Start Date"
                        />}
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        // value={values.avilableDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2em",
                          width: "100%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div class=" w-2/4">
                      {" "}
                      <Field
                        name="avilableDate"
                        //label="Start Date"
                        label={<FormattedMessage
                          id="app.avilableDate"
                          defaultMessage="End Date"
                        />}
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        // value={values.avilableDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2em",
                          width: "100%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                          </div>
                  
                         
</div>
<div class=" w-2/4">
              
 </div>
  </div>
               
               
             
          
              <div class=" mt-3" />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                //   loading={addingCourse}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }


const mapStateToProps = ({ course }) => ({


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProjectForm);
