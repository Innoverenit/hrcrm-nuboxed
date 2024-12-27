
import React, { useEffect,useState,useRef  } from "react";
import { connect } from "react-redux";
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";

import PeopleIcon from '@mui/icons-material/People';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import { Input, Tooltip,Badge,Avatar,Button,Select } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import {getPitchRecords,getPitchAllRecords,getPitch,ClearReducerDataOfPitch,getPitchCount, getTeamsPitchCount,searchPitchName} from "../PitchAction";

import { base_url } from "../../../Config/Auth";
const { Search } = Input;
const Option = StyledSelect.Option;

const PitchActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [userData, setUserData] = useState([]);
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);
  const [touchedUser, setTouchedUser] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  useEffect(() => {
    // props.getCustomerRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
    }, [ transcript]);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter&&e.target.value.trim() === "") {
      setPage(pageNo + 1);
      props.getPitch(props.userId,pageNo,"creationdate");
      props.ClearReducerDataOfPitch()
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      if (props.teamsAccessInd) {
        props.searchPitchName(currentData, 'team');
      } else {
        if (props.viewType === "card") {
          props.searchPitchName(currentData, 'user');
        } else if (props.viewType === "teams") {
          props.searchPitchName(currentData, 'team');
        } else if (props.viewType === "all") {
          props.searchPitchName(currentData, 'All');
        } else {
          console.error("Invalid viewType. Please provide a valid value.");
        }
      }
     
      setSearchOnEnter(true);  //Code for Search
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
        props.searchPitchName(transcript, 'team');
      } else {
        if (props.viewType === "card") {
          props.searchPitchName(transcript, 'user');
        } else if (props.viewType === "teams") {
          props.searchPitchName(transcript, 'team');
        } else if (props.viewType === "all") {
          props.searchPitchName(transcript, 'All');
        } else {
          console.error("Invalid viewType. Please provide a valid value.");
        }
      }
     // props.inputLeadsDataSearch(transcript);
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
  const dummy = ["cloud", "azure", "fgfdg"];

    useEffect(() => {
      if (props.teamsAccessInd) {
        props.getTeamsPitchCount(props.userId);
      }
    }, [props.userId, props.teamsAccessInd]);
  useEffect(() => {
    if (props.viewType === "card") {
      props.getPitchCount(props.userId);
    } else if (props.viewType === "all") {
      props.getPitchAllRecords(props.orgId);
    } else if (props.viewType === "teams") {
      props.getTeamsPitchCount(props.userId);
    }
  }, [props.viewType, props.userId,props.orgId]);
  // useEffect(() => {
  //   props.getPitchCount(props.userId)
  //   props.getPitchAllRecords
  //   }, [props.userId]);
 
  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
   

      const apiEndpoint = `${base_url}/employee/active/user/type/drop-down/${props.orgId}/${"employee"}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };
  const handleSelectUserFocus = () => {
    if (!touchedUser) {
      fetchUser();
      // fetchSector();

      setTouchedUser(true);
    }
  };

  const { user } = props;

  console.log( props.pitchCount.InvestorLeadsDetails)
  const teamCount = props.teamsAccessInd && props.teamsPitchCount ? props.teamsPitchCount.pitchTeam : 0;
  return (
    <div class=" flex  items-center">


    <Tooltip
        title= "My Pitches"
      >
  <Badge
        size="small"
        count={(props.viewType === "card" && props.pitchCount.InvestorLeadsDetails) || 0}
        
        overflowCount={999}
      >
        <span   class=" mr-1 !text-icon cursor-pointer"
        onClick={() => props.setPitchViewType("card")}
          style={{
           color: props.viewType === "card" && "#1890ff",
          }}
        >
          <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#28a355" }}>
        <TocIcon className="text-white !text-icon" />
        </Avatar>
        </span>
        </Badge>
      </Tooltip>
    
     

      {user.teamsAccessInd === true && (
      <Tooltip
        title= "Team View"
      >
          <Badge
        size="small"
         count={(teamCount||props.viewType === "teams" && props.teamsPitchCount.InvestorLeadsDetails) || 0}
        
        overflowCount={999}
      >
        <span   class=" mr-1  cursor-pointer"
        onClick={() => props.setPitchViewType("teams")}
          style={{
           color: props.viewType === "teams" && "#1890ff",
          }}
        >
          <Avatar style={{ background:props.teamsAccessInd|| props.viewType === "teams" ? "#f279ab" : "#28a355" }}>
         <PeopleIcon className="text-white !text-icon"/>
         </Avatar>
        </span>
        </Badge>
      </Tooltip>
       )}
      {(props.user.pitchFullListInd===true || props.user.role==="ADMIN") && (

      <Tooltip
        title= "All"
      >
             <Badge
        size="small"
        count={(props.viewType === "all" && props.pitchAllRecord.investorLeadsDetails) || 0}
        overflowCount={999}
      >
        <span   class=" mr-1 cursor-pointer"
        onClick={() => props.setPitchViewType("all")}
          style={{
           color: props.viewType === "all" && "#1890ff",
          }}
        >
           <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355" }}>
          ALL
        </Avatar>
        </span>
        </Badge>
      </Tooltip>
           )}
      {/* <Badge
        size="small"
        count={(props.viewType === "list" && props.leadsCountJunked.junkedList) || 0}
        overflowCount={999}
      > */}
      <div
                color={props.viewType === "list" ? "#FFA500" : "orange"}
                style={{
                  cursor: "pointer",                  
                  fontWeight: props.viewType === "list" ? "bold" : null,
                  textAlign: "center",
                  fontFamily:"poppins",
                  borderColor: "orange",
                }}
                onClick={() => props.setPitchViewType("list")}
              >
                Junked
              </div>
              {/* </Badge> */}

      <div class=" w-[28rem] max-sm:w-28 ml-4 ">
          <Input
            placeholder="Search by Name or Company"
            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
             value={currentData}
        
          />
        </div>
      {/* <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.searchPitchName(props.currentData);

          }}
        >
          Submit
        </Button>
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.handleClear();
          }}
        >
      >
      
        </Button> */}
          <div class=" w-2/5  ml-2">
          <StyledSelect placeholder="Sort" defaultValue="Creation Date" value={props.filter} onChange={(e)  => props.handleFilterChange(e)}>
           <Option value="CreationDate">Creation Date</Option> 
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>

        <div class="w-[40%]  ml-2 max-sm:w-[45%]">
       {/* {!props.showCheckboxes && (  */}
        <Button type="primary" 
        onClick={props.handleTransferClick}
        >
          {props.isTransferMode ? 'Transfer' : 'Cancel'}
        </Button>
       {/* )} */}
        </div>

        <div class="w-[40%]  ml-2 max-sm:w-[45%]">
       {props.showCheckboxes && props.selectedDeals.length > 0 && ( 
        <Select
       
       placeholder="Select User"
       loading={isLoadingUser}
       onFocus={handleSelectUserFocus}
       onChange={props.handleUserSelect}
     >
       {userData.map(customer => (
         <Option key={customer.employeeId} value={customer.employeeId}>
           {customer.empName}
         </Option>
       ))}
     </Select>
     )}
        </div>
    </div>
  );
};

const mapStateToProps = ({pitch,auth}) => ({
  pitchRecord:pitch.pitchRecord,
  pitchCount:pitch.pitchCount,
  teamsPitchCount:pitch.teamsPitchCount,
  userId: auth.userDetails.userId,
  user:auth.userDetails,
  orgId: auth.userDetails.organizationId,
  pitchAllRecord:pitch.pitchAllRecord,
  token: auth.token,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPitchRecords,
  ClearReducerDataOfPitch,
  getPitch,
  getPitchCount,
  searchPitchName,
  getPitchAllRecords,
  getTeamsPitchCount
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PitchActionLeft);
