import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import StopIcon from '@mui/icons-material/Stop';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { Button ,Tooltip} from "antd";
import { Formik, Form, Field } from "formik";

import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import {updateRemark}  from "../../../../../OpportunityAction";
import * as Yup from "yup";

const ProfileSchema = Yup.object().shape({
  // note: Yup.string().required("Input needed!"),

  stageId: Yup.string().required("Input needed!"),
});
function UpdateRemarkForm(props) {
  console.log("stageList", props.stageList);
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

    const [text, setText] = useState(props.setEditingRemark.note);
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
          stageId: props.setEditingRemark.stageId,
          reviewer: props.setEditingRemark.reviewer,
          userId:props.userId,
          //  note: props.setEditingRemark.note,
            note:transcript?transcript:text,
          profileId: props.profileId,
        }}
        // validationSchema={ProfileSchema}
        onSubmit={(values, { resetForm }) => {
          props.updateRemark({
            ...values,
           note:transcript?transcript:text
        }, 
        props.recruitment_stage_note_id
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
                                                
                   <div>
      <p>Microphone:  {listening ? 'on' : 'off'} 
        </p>
      <div>
      <span
      onClick={SpeechRecognition.startListening}
      > 
      <Tooltip title="Start">
         <span style={{ fontSize: "1.5em",
    color: "red" }}>
        <RecordVoiceOverIcon />
        </span>
        </Tooltip>
      </span>
     
      <span
     
      onClick={SpeechRecognition.stopListening}
      >
         <Tooltip title="Stop">
         <span style={{ fontSize: "1.5em",color:"green",marginLeft:"3px" }}>
         
        <StopIcon  />
       
        </span>
        </Tooltip>
      </span>
    
     
      <span
       onClick={resetTranscript}
      >
          <Tooltip title="Clear">
             <span style={{ fontSize: "1.5em",marginLeft:"3px" }}>
        <RotateRightIcon  />
        </span>
        </Tooltip>
        </span>
        </div>
        <div>
        <textarea
        name="note"
        className="textarea"
        type="text"
        //  defaultValue={props.setEditingRemark.transcript?props.setEditingRemark.transcript:props.setEditingRemark.text}
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
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updateRemark}
                >
                  <FormattedMessage
                    id="app.update"
                    defaultMessage="Update"
                  />
                  {/* Remark */}
                </Button>
               
              </div>
           
            </Form>
            
          )}
         
      </Formik>
     

    </>
  );
}

const mapStateToProps = ({ opportunity,auth }) => ({
    setEditingRemark: opportunity.setEditingRemark,
    updateRemark:opportunity.updateRemark
//   addingRemark: opportunity.addingRemark,
//   userId:auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    updateRemark
    //  addRemark
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRemarkForm);
