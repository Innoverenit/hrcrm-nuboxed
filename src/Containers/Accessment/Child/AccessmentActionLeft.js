import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TableViewIcon from '@mui/icons-material/TableView';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Badge, Input, Tooltip } from "antd";
import {getRecords,inputAssessmentDataSearch} from "../AccessmentAction";

const AccessmentActionLeft = (props) => {
  const suffix = (
    <MicIcon
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}

    />
  );
  const {
    transcript
  } = useSpeechRecognition();
  useEffect(() => {
    props.getRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript)
      props.setCurrentData(transcript)
    }
  },[transcript]);
  return (
    <div class=" flex items-center">

<Tooltip
        title= "Table View"
      >
<Badge size="small" 
 count={ props.viewType === "table" && props.recordData.assessment || 0} overflowCount={999}
>
        <span
          style={{
            marginRight: "0.5rem",
           color: props.viewType === "table" && "#1890ff",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
        <TableViewIcon/>
        </span>
        </Badge>
      </Tooltip>
         
    
      

      <div style={ {width: "15vw"}} >
          <Input
            placeholder="Search by Name"
            enterButton="Search"
            width={"100%"}
            suffix={suffix}
            // onSearch={(value) => {
            //   props.inputAssessmentDataSearch(value);
            //   props.setCurrentData(value);

            // }}
            onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          />
        </div>
      &nbsp; &nbsp;
      {/* <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputAssessmentDataSearch(props.currentData);

          }}
        >
          Submit
        </Button> */}
        {/* &nbsp;
        <Button
          //type={props.currentData ? "primary" : "danger"}
          // onClick={props.handleClear}
          onClick={() => {
            props.handleClear();
            //props.getCandidateCountSearch()
          }}
        >
       

        </Button> */}
    </div>
  );
};

const mapStateToProps = ({assessment}) => ({
  recordData:assessment.recordData,
  assessment:assessment.assessment,
  fetchingAssessmentInputSearchData:assessment.fetchingAssessmentInputSearchData,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
getRecords,
inputAssessmentDataSearch
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AccessmentActionLeft);
