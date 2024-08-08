import React, { useState, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import  { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";

import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { addRemark } from "../../../../../OpportunityAction";
import * as Yup from "yup";
/**
 * yup validation scheme for creating a opportunity
 */
const ProfileSchema = Yup.object().shape({
  // note: Yup.string().required("Input needed!"),

  stageId: Yup.string().required("Input needed!"),
});
function RemarkForm(props) {
  console.log("stageList", props.stageList);
  console.log("sent",props.sentiment.score)
  const stageList = props.stageList
    .filter((item) => {
      if (item.probability !== 0 && item.probability !== 100) {
        return item;
      }
    })
    .map((item) => {
      return {
        label: item.stageName || "",
        value: item.stageId,
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
           //note:transcript?transcript:text,
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
                    // label="Stage"
                    label={<FormattedMessage
                      id="app.stageId"
                      defaultMessage="Stage"
                    />}
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
                    //  label="Reviewer"
                    label={<FormattedMessage
                      id="app.reviewer"
                      defaultMessage="Reviewer"
                    />}
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
                  {/* <Field
                    name="note"
                    isRequired
                    // label="Comments"
                    label={<FormattedMessage
                      id="app.note"
                      defaultMessage="Note"
                    />}
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    style={{
                      flexBasis: "80%",
                      height: "5em",
                      // marginLeft: "2.5em",
                      marginTop: "0.25em",
                    }}
                    
                  /> */}

               
                  
                    {/* <div>
      <p>Microphone:  {listening ? 'on' : 'off'} 
        </p>
      <div>
      <span
      onClick={SpeechRecognition.startListening}
      > 
      <Tooltip title="Start">
         <span style={{ fontSize: "1.5em",
    color: "red" }}>
        <FontAwesomeIcon icon={solid("record-vinyl")} />
        </span>
        </Tooltip>
      </span>
     
      <span
     
      onClick={SpeechRecognition.stopListening}
      >
         <Tooltip title="Stop">
         <span style={{ fontSize: "1.5em",color:"green",marginLeft:"3px" }}>
         
        <FontAwesomeIcon icon={solid("stop")} />
       
        </span>
        </Tooltip>
      </span>
    
     
      <span
       onClick={resetTranscript}
      >
          <Tooltip title="Clear">
             <span style={{ fontSize: "1.5em",marginLeft:"3px" }}>
        <FontAwesomeIcon icon={solid("rotate-right")} />
        </span>
        </Tooltip>
        </span>
        </div>
        <div>
        <textarea
        name="note"
        className="textarea"
        type="text"
         value={transcript?transcript:text}
         onChange={handletext}
        >
        
        </textarea>
    
      
      </div>
      
      
     
    </div> */}
  
    
                </div>
                <div
                  style={{
                    height: "100%",
                  }}
                ></div>
              </div>
              <div class=" mt-3" />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.addingRemark}
                >
                  <FormattedMessage
                    id="app.submit"
                    defaultMessage="Submit"
                  />
                  {/* Remark */}
                </Button>
               
              </FlexContainer>
           
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
