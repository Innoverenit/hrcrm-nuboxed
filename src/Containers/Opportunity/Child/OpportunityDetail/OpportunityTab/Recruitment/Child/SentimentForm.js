import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ReactSpeech from "../../../../../../../Components/ReactSpeech/ReactSpeech";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button ,Tooltip} from "antd";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";

import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { addSentiment } from "../../../../../OpportunityAction";
import * as Yup from "yup";
/**
 * yup validation scheme for creating a opportunity
 */
// const ProfileSchema = Yup.object().shape({
//   // note: Yup.string().required("Input needed!"),

//   stageId: Yup.string().required("Input needed!"),
// });
function SentimentForm(props) {
 

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
    const startListening = () => SpeechRecognition.startListening({ continuous: true });
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  return (
    <>
      <Formik
        initialValues={{
        //   stageId: undefined,
        //   reviewer: "",
        //   userId:props.userId,
          // note: "",
          feedback:transcript?transcript:text,
        //   profileId: props.profileId,
        }}
        //validationSchema={ProfileSchema}
        onSubmit={(values, { resetForm }) => {
          props.addSentiment({...values,
            feedback:transcript?transcript:text}, props.profileId);
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
                 
                  <div class=" mt-3" />
                  
                

               
                  
                    <div>
      {/* <p>Microphone:  {listening ? 'on' : 'off'} 
        </p> */}
      <div>
      <span
      onClick={startListening}
      > 
      <Tooltip title="Start">
         <span style={{ fontSize: "1.5em",
    color: "red" }}>
        <PlayCircleFilledIcon  />
        </span>
        </Tooltip>
      </span>
     
      <span
     
      onClick={SpeechRecognition.stopListening}
      >
         <Tooltip title="Stop">
         <span style={{ fontSize: "1.5em",color:"green",marginLeft:"3px" }}>
         
        <StopCircleIcon  />
       
        </span>
        </Tooltip>
      </span>
    
     
      <span
       onClick={resetTranscript}
      >
          <Tooltip title="Clear">
             <span style={{ fontSize: "1.5em",marginLeft:"3px" }}>
        <RotateRightIcon/>
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
      
      
     
    </div>
  
    
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
                  //onClick={props.handleRemarksModal}
                  Loading={props.addingSentiment}
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
    addingSentiment:opportunity.addingSentiment,
    sentiment:opportunity.sentiment
//   addingRemark: opportunity.addingRemark,
//   userId:auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addSentiment
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SentimentForm);
