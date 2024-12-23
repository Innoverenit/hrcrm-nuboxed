import React, { useState, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import  { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { addRemark } from "../../../../../OpportunityAction";
import * as Yup from "yup";


const ProfileSchema = Yup.object().shape({
  // note: Yup.string().required("Input needed!"),

  stageId: Yup.string().required("Input needed!"),
});
function RemarkForm(props) {
  // console.log("stageList", props.stageList);
  console.log("sent",props.sentiment.score)
  console.log("sent",props.sentiment)
  const stageList = props.stageList
    .filter((item) => {
      if (item.probability !== 0 && item.probability !== 100) {
        return item;
      }
    })
    .map((item) => {
      return {
        label: item.stageName || "",
        value: item.stagesId,
      };
    });

    const [text, setText] = useState("");
    function handletext(e){
      setText(e.target.value)
    }
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  return (
    <>
      <Formik
        initialValues={{
          stageId: undefined,
          reviewer: "",
          score:props.sentiment.score,
          userId:props.userId,
          note: props.sentiment.feedback,
          candidateId:props.candidateId,
          //  note:transcript?transcript:text,
          profileId: props.profileId,
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values, { resetForm }) => {
          props.addRemark({...values,
            //note:transcript?transcript:text
          }, 
             props.profileId,
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {" "}
                  <Field
                    name="stageId"
                    label="Stage"
                    isRequired
                    isColumn
                    style={{
                      flexBasis: "80%",

                      marginTop: "0.25em",
                    }}
                    component={SelectComponent}
                    options={Array.isArray(stageList) ? stageList : []}
                  />{" "}
                  <div class=" mt-3" />
                  <Field
                    name="reviewer"
                     label="Reviewer"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{
                      flexBasis: "80%",
                      height: "2em",
                      marginTop: "0.25em",
                    }}
                  />
                  <div class=" mt-3" />                                          
                </div>
                <div
                  style={{
                    height: "100%",
                  }}
                ></div>
              </div>
              <div class=" mt-3" />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.addingRemark}
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

const mapStateToProps = ({ opportunity,auth }) => ({
  addingRemark: opportunity.addingRemark,
  userId:auth.userDetails.userId,
  sentiment:opportunity.sentiment
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
     addRemark
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RemarkForm);
