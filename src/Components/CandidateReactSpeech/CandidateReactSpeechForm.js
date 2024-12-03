import { Button, Tooltip } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { bindActionCreators } from "redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { addNote,getNotesListByCandidateId } from "../../Containers/Candidate/CandidateAction";

const Dictaphone = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function callback(){
    props.getNotesListByCandidateId(props.candidate.candidateId)
  }

  function handleReactSpeech(){
    let data={
      notes:transcript,
      candidateId: props.candidate.candidateId,
      type: "candidate",
    }
    props.addNote(data,callback)
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div>
      <span
      onClick={SpeechRecognition.startListening}
      > 
      <Tooltip title="Start">
         <span style={{ fontSize: "1.5em",
    color: "red" }}>
         <PlayCircleFilledIcon />
        </span>
        </Tooltip>
      </span>
     
      <span
      // onClick={()=>{
      // SpeechRecognition.stopListening
      // }}
      onClick={SpeechRecognition.stopListening}
      >
         <Tooltip title="Stop">
         <span style={{ fontSize: "1.5em",color:"green",marginLeft:"3px" }}>
         
        <StopCircleIcon/>
       
        </span>
        </Tooltip>
      </span>
    
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
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
        className="textarea"
        type="text"
        value={transcript}
        >
        
        </textarea>
      {/* <p>{transcript}</p> */}
      </div>
      <div class=" flex justify-end" >
      <Button 
      type='primary'
      htmlType='submit'
      onClick={handleReactSpeech}
      >
        Submit
      </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, team, opportunity }) => ({
  user: auth.userDetails,
  //fetchingNotesListByOpportunityId: opportunity.fetchingNotesListByOpportunityId,

  //   team: team.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNote,
      getNotesListByCandidateId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dictaphone);


const textarea = styled.div`
width: 100%;
min-height: 11.5em;
// border-radius: 0.1875em;
border: 0.0625em solid gainsboro;
background-color: #fff;
color: #444;
display: block;
margin: 0.3rem 0;
// border-radius: 0.3rem;
outline: none;
box-shadow: 0em 0.25em 0.625em -0.25em #aaa;
padding: 0.3rem 1rem;
`
