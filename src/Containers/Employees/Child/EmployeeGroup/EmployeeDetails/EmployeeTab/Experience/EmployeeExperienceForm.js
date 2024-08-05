import React, { useEffect,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import {getTopicsByUserId} from "../../../../../EmployeeAction";
import * as Yup from "yup";
import { updateExperienceByEmployeeId} from "../../../../../EmployeeAction"
const EmployeeExperienceTable=lazy(()=>import("./EmployeeExperienceTable"));

const experienceSchema = Yup.object().shape({
  experience: Yup.string().required("Input needed!"),
});

function EmployeeExperienceForm(props) {
  useEffect(() => {
    props.getTopicsByUserId(props.singleEmployee.employeeId);
  }, []);

  const skillNameOption = props.topicsByUserId.map((item) => {
    return {
      label: `${item.keySkillsName || ""}`,
      value: item.keySkillsId,
    };
  });  
  return (
    <>
      <Formik
        initialValues={{
          employeeId: props.singleEmployee.employeeId,
          keySkillsId:"",
          experience: "",  
        }}
        validationSchema={experienceSchema}
        onSubmit={(values, { resetForm }) => {
          props.updateExperienceByEmployeeId(
            {
              ...values,
            },
            values.keySkillsId
            
          );
        }}
      >
        {({
          
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <Form className="form-background">
            <div>
            <div class=" flex w-full h-full justify-evenly items-center">                                            
                <div class=" w-[15%]"
                >
                  <Field
                    name="keySkillsId"
                    label="Skill"
                    type="text"
                    isColumn              
                    component={SelectComponent}
                    options={
                      Array.isArray(skillNameOption) ? skillNameOption : []
                    }                                 
                    inlineLabel
                  />
                </div>
                <div class=" w-[15%]"
                >
                  <Field
                    name="experience"
                    label="Experience (in Years)"
                    type="number"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                <div class=" w-[8%]"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                   loading={props.updatingEmployeeExperience}
                  >Submit
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
     
      <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeExperienceTable/>
              </Suspense>
    </>   
  
  );
}


const mapStateToProps = ({ candidate, auth,profile, employee }) => ({
  topicsByUserId: employee.topicsByUserId,
  singleEmployee: employee.singleEmployee,
  userId: auth.userDetails.userId,
  updatingEmployeeExperience: employee.updatingEmployeeExperience,
  updatingEmployeeExperienceError: employee.updatingEmployeeExperienceError,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByUserId,
      updateExperienceByEmployeeId
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeExperienceForm);