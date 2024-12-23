import React, { useEffect,useRef,useState } from "react";

import { Tooltip, Badge ,Avatar,Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  inputOpportunityDataSearch,
  getRecords,
  getOpportunityTeamRecords,
  getDeleteRecords,
  getcloseRecords,
  getlostRecords,
  getWonRecords,
  getAllRecords,
  ClearSearchedDataOfOpportunity,
  getOpportunityListByUserId,
  getTeamOpportunity,
  getFullOpportunity

} from "../OpportunityAction";
import PeopleIcon from '@mui/icons-material/People';
import GridOnIcon from '@mui/icons-material/GridOn';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
const { Search } = Input;

const OpportunityActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const [pageNo, setPage] = useState(0);
  const [page, setpage] = useState(0);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
  const dummy = ["cloud", "azure", "fgfdg"];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (props.teamsAccessInd) {
      props.getOpportunityTeamRecords(props.userId);
    }
  }, [props.userId, props.teamsAccessInd]);
  useEffect(() => {
    if (props.viewType === "table") {
      props.getRecords(props.userId);
    } else if (props.viewType === "dashboard") {
      props.getDeleteRecords(props.userId);
    } else if (props.viewType === "close") {
      props.getcloseRecords(props.userId);
    } else if (props.viewType === "lost") {
      props.getlostRecords(props.userId);
    } else if (props.viewType === "won") {
      props.getWonRecords(props.userId);
     
      
    } else if (props.viewType === "teams") {
      props.getOpportunityTeamRecords(props.userId);
    }
    else if (props.viewType === "stage") {
      props.getRecords(props.userId);
    }
    else if (props.viewType === "all") {
      props.getAllRecords(props.orgId);
    }
  }, [props.viewType, props.userId]);

  useEffect(() => {
    // props.getCustomerRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
    }, [ transcript]);

    const handleChange = (e) => {
      setCurrentData(e.target.value);
  
      if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
        if (props.viewType === "table") {
          getOpportunityListByUserId(props.userId,page); 
        } else if (props.viewType === "teams") {
          props. getTeamOpportunity(props.userId,pageNo);
        } else if (props.viewType === "all") {
          props. getFullOpportunity(page);
        }
        props.ClearSearchedDataOfOpportunity()
        setSearchOnEnter(false);
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        if (props.teamsAccessInd) {
          props.inputOpportunityDataSearch(currentData, 'team');
        } else {
          if (props.viewType === "table") {
            props.inputOpportunityDataSearch(currentData, 'user');
          } else if (props.viewType === "teams") {
            props.inputOpportunityDataSearch(currentData, 'team');
          } else if (props.viewType === "all") {
            props.inputOpportunityDataSearch(currentData, 'All');
          } else {
            console.error("Invalid viewType. Please provide a valid value.");
          }
        }
        setSearchOnEnter(true);  // Code for Search
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

    const handleStartListening = () => {
      setStartTime(Date.now());
      setIsRecording(true);
      SpeechRecognition.startListening();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        SpeechRecognition.stopListening();
        setIsRecording(false);
      }, minRecordingTime);
    };

    const suffix = (
      <MicIcon
        onClick={handleStartListening}
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
  
      />
    );

    const handleStopListening = () => {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      if (transcript.trim() !== "") {
        setCurrentData(transcript);
        if (props.teamsAccessInd) {
          props.inputOpportunityDataSearch(transcript, 'team');
        } else {
          if (props.viewType === "table") {
            props.inputOpportunityDataSearch(transcript, 'user');
          } else if (props.viewType === "teams") {
            props.inputOpportunityDataSearch(transcript, 'team');
          } else if (props.viewType === "all") {
            props.inputOpportunityDataSearch(transcript, 'All');
          } else {
            console.error("Invalid viewType. Please provide a valid value.");
          }
        }
       // props.inputOpportunityDataSearch(transcript);
        setSearchOnEnter(true);
      }
    };
    useEffect(() => {
      if (!listening && isRecording) {
        handleStopListening();
      }
    }, [listening]);
    useEffect(() => {
      if (isRecording && !listening) {
        // If recording was stopped but less than 5 seconds have passed, restart listening
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minRecordingTime) {
          SpeechRecognition.startListening();
        } else {
          setIsRecording(false);
        }
      }
    }, [listening, isRecording, startTime]);

  const {
    viewType,
    setAccountViewType,
    recorddeleteOpportunityData,
    user,
    opportunityTeamRecordData,
    lostOpportunityData,
    wonOpportunityData,
    closeOpportunityData,
    recordData,
  } = props;
  const teamCount = props.teamsAccessInd && props.opportunityTeamRecordData ? props.opportunityTeamRecordData.OpportunityTeam : 0;
  return (
    <div class=" flex items-center">
  
      <Badge
        size="small"
        count={(viewType === "table" && recordData.opportunty) || 0}
        overflowCount={999}
      >
        <Tooltip
          title="My Quotations"
           
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff"
            }}
          >
            
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "table" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "table" ? "scale(1.05)" : "scale(1)" }}>
            <LightbulbIcon className="text-white !text-icon"/>
            </Avatar>
          </span>
        </Tooltip>
      </Badge>
      <Tooltip
          title="My Quotations-Stage View" 
  
        >
             <Badge
        size="small"
        count={(viewType === "stage" && recordData.opportunityDetails) || 0}
        overflowCount={999}
      >
          {/*<GridOnIcon*/}
          <span
            style={{
              fontSize: "1.56em",
              marginRight: "0.3rem",
              cursor:"pointer",
              color: props.viewType === "stage" && "#1890ff",
            }}
            // iconType="table"
            // tooltipTitle="Stage View"
            onClick={() => props.setOpportunityViewType("stage")}
          >
             <Avatar style={{ background: props.viewType === "stage" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "stage" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "stage" ? "scale(1.05)" : "scale(1)" }}>
           <GridOnIcon className="text-white !text-icon"/>
           </Avatar>
          </span>
          </Badge>
        </Tooltip>
      <Tooltip title={"My Quotations-Won"}>
      <Badge
          size="small"
          count={
            (viewType === "won" &&
            wonOpportunityData.OpportunityDetailsbyWonInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("won")}
            style={{
              cursor:"pointer",
              color: props.viewType === "won" && "#1890ff",
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "won" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "won" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "won" ? "scale(1.05)" : "scale(1)" }}>
            <CheckCircleOutlineIcon type="check-circle" theme="twoTone" twoToneColor="#24D8A7" className="text-white !text-icon"/>
            </Avatar>
          </span>
          </Badge>
      </Tooltip>
      {user.recruitProInd === true && (
      <Tooltip title={"My Quotations-Close"}>
        {" "}
        <Badge
          size="small"
          count={
            (viewType === "close" &&
              closeOpportunityData.OpportunityDetailsByCloseInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("all")}
            style={{
             color: props.viewType === "all" && "#1890ff",
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "close" ? "#f279ab" : "#28a355" ,
               boxShadow: props.viewType === "close" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "close" ? "scale(1.05)" : "scale(1)"}}>
            <LockOpenIcon className="text-white !text-icon" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      )}
      <Tooltip title={"My Quotations-Lost"}>
        <Badge
          size="small"
          count={
            (viewType === "lost" &&
              lostOpportunityData.OpportunityDetailsbyLostInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("lost")}
            style={{
              color: props.viewType === "lost" && "#1890ff",
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "lost" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "lost" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "lost" ? "scale(1.05)" : "scale(1)" }}>
            <DoDisturbIcon type="stop" theme="twoTone" twoToneColor="red" className="text-white !text-icon" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
    
  {/* <div class="ml-2"> */}
  {user.teamsAccessInd === true && (
  <Tooltip
          title="Team View"
        >
                 <Badge
        size="small"
        count={(teamCount||viewType=== "teams" ?opportunityTeamRecordData.OpportunityTeam : 0)}
        // count={(viewType === "teams" && opportunityTeamRecordData.OpportunityTeam) || 0}
        overflowCount={999}
      >
          <span
            class=" mr-1 text-sm "
            onClick={() => props.setOpportunityViewType("teams")}
            style={{
              color: props.viewType === "teams" && "#1890ff",cursor:"pointer"
            }}
          >
            {" "}
            <Avatar style={{ background:props.teamsAccessInd || props.viewType === "teams" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "teams" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "teams" ? "scale(1.05)" : "scale(1)" }}>
            <PeopleIcon className="text-white !text-icon"/>
            </Avatar>
          </span>
          </Badge>
        </Tooltip>
          )}
 
 
    {user.crmInd=== true && user.opportunityFullListInd===true && ( 
  <Tooltip
          title="All"
        >
                       <Badge
        size="small"
         count={(viewType === "all" && props.allOpportunityRecords.opportunity) || 0}
        overflowCount={999}
      >
          <span
            class=" mr-1 text-sm !text-icon "
            onClick={() => props.setOpportunityViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",cursor:"pointer"
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "all" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "all" ? "scale(1.05)" : "scale(1)" }}>
           ALL
           </Avatar>
          </span>
          </Badge>
        </Tooltip>
    )}
  {/* </div> */}
     

      <Tooltip
        title=" My Deleted Quotations"
      >
        {" "}
        <Badge
          size="small"
          count={
            (viewType === "dashboard" &&
              recorddeleteOpportunityData.opportunityDetails) ||0}overflowCount={999}>
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("dashboard")}
            style={{
              cursor:"pointer",
              color: props.viewType === "dashboard" && "#1890ff",
            }}
          >
             <Avatar style={{ background: props.viewType === "dashboard" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "dashboard" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "dashboard" ? "scale(1.05)" : "scale(1)" }}>
            <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      <div class=" w-64 max-sm:w-24">
        <Input
          placeholder="Search by Name "
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
        </div>
    </div>
  );
};
const mapStateToProps = ({ account, auth, opportunity }) => ({
  user: auth.userDetails,
  recordData: opportunity.recordData,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  opportunityTeamRecordData:opportunity.opportunityTeamRecordData,
  recorddeleteOpportunityData: opportunity.recorddeleteOpportunityData,
  closeOpportunityData: opportunity.closeOpportunityData,
  lostOpportunityData: opportunity.lostOpportunityData,
  wonOpportunityData: opportunity.wonOpportunityData,
  allOpportunityRecords:opportunity.allOpportunityRecords,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputOpportunityDataSearch,
      getDeleteRecords,
      getcloseRecords,
      getlostRecords,
      getWonRecords,
      getAllRecords,
      getRecords,
      getOpportunityTeamRecords,
      ClearSearchedDataOfOpportunity,
      getOpportunityListByUserId,
      getTeamOpportunity,
      getFullOpportunity
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpportunityActionLeft)
);
