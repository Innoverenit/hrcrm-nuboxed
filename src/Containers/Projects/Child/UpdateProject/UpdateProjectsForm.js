import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import dayjs from "dayjs";
import {updateProjects} from "../../ProjectsAction"
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";

import { Formik, Form, Field} from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";

const expRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const courseSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});
function UpdateProjectsForm(props) {
  useEffect(() => {}, []);
  function handleReset(resetForm) {
    resetForm();
  }
   const { updatingProjects, updateProjects } = props;
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          projectName:props.setEditingProject.projectName || "",
          description: "",
        }}
        //  validationSchema={courseSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          updateProjects(
            {
              ...values,
              projectId: props.projectId,
            },
            // props.userId,
            () => handleReset(resetForm)
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
            <div class=" flex justify-between overflow-scroll ">
              <div class=" h-full w-1/2">
                <Field
                  isRequired
                  name="projectName"
                  type="text"
                  
                  label="Name" 
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  inlineLabel
                />
             
                <div class=" flex justify-between">
                  <div class=" w-6/12">
                  <Field
                          isRequired
                          name="startDate"
                         
                          label="Start Date"
                          
                          isColumn
                          component={DatePicker}
                          value={values.startDate}
                          inlineLabel
                          style={{
                            width: "100%",
                          }}
                        />
                  </div>
                  <div class="  w-2/5">
                  <Field
                        isRequired
                        name="endDate"
                        
                        label="End Date"
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        defaultValue={dayjs("2015-01-01")}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.startDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                      />
                  </div>
                </div>
              </div>
              <div class=" h-3/4 w-5/12 ">
                <Field
                  name="description"
                  label="Description"
                  isColumn
                  width={"100%"}
                  component={TextareaComponent}
                  inlineLabel
                />
              </div>
            </div>

            
            <div class=" flex justify-end mt-4">
              <Button type="primary" htmlType="submit" 
               loading={updatingProjects}
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

const mapStateToProps = ({ projects }) => ({
    setEditingProject:projects.setEditingProject,
    updatingProjects:projects.updatingProjects,
    projectsData: projects.projectsData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updateProjects
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectsForm);
