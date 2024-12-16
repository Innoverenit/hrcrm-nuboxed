import React, { useEffect,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import {getTopicsByCandidateId,addExperienceByCandidateId,updateExperienceByCandidateId} from "../../../../../CandidateAction";
import * as Yup from "yup";
const ExperienceTable = lazy(()=>import("../Experience/ExperienceTable"));

const expRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const experienceSchema = Yup.object().shape({
  experience: Yup.string().required("Input needed!"),
});
function ExperienceForm(props) {
  useEffect(() => {
    props.getTopicsByCandidateId("candidate",props.candidate.candidateId);
  }, []);

  const skillNameOption = props.topicsByCandidateId.map((item) => {
    return {
      label: `${item.skillName || ""}`,
      value: item.skillSetDetailsId,
    };
  });  
 console.log("cak", props.topicsByCandidateId.length && props.topicsByCandidateId[0].skillSetDetailsId) 
  return (
    <>
      <Formik
        initialValues={{
          candidateId: props.candidateId,
          skillSetDetailsId:"",
          experience: "",
          // skillSetDetailsId: props.skillSetDetailsId,
         
        }}
        validationSchema={experienceSchema}
        onSubmit={(values, { resetForm }) => {
          props.updateExperienceByCandidateId(
            {
              ...values,
              // skillSetDetailsId: props.skillSetDetailsId,
      
              
            },
            values.skillSetDetailsId
            
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
          <div class="mr-5 ml-5">
              <div class=" flex justify-evenly h-full w-full items-center"
              >            
                <div class=" w-[15%]"
                >
                  <Field
                    name="skillSetDetailsId"
                    label="Skill"
                    type="text"
                    isColumn
                   // width={"100%"}
                    component={SelectComponent}
                    options={
                      Array.isArray(skillNameOption) ? skillNameOption : []
                    }  
                    // onSelect={(e) => {
                    //   console.log(e);
                    //   handleSkillInCandidate(e, setFieldValue);
                    // }}                 
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
                   loading={props.updatingSkillExperince}
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
                <ExperienceTable/>
              </Suspense>
    </>   
  
  );
}


const mapStateToProps = ({ candidate, auth, suppliers }) => ({
  topicsByCandidateId: candidate.topicsByCandidateId,
  userId: auth.userDetails.userId,
  candidate: candidate.candidate,
  addingSkillExperince: candidate.addingSkillExperince,
  addingSkillExperinceError: candidate.addingSkillExperinceError,
  updatingSkillExperince: candidate.updatingSkillExperince,
  updatingSkillExperinceError: candidate.updatingSkillExperinceError,
  // skillSetDetailsId:candidate.topicsByCandidateId.skillSetDetailsId,
  // skillSetDetailsId:candidate.skillExperince && candidate.skillExperince.skillSetDetailsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByCandidateId,
      addExperienceByCandidateId,
      updateExperienceByCandidateId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceForm);