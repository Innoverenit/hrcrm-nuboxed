import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import PeopleIcon from '@mui/icons-material/People';
import { StyledSelect } from "../../../Components/UI/Antd";
import { Input, Tooltip, Tag, Badge, Avatar } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import { inputLeadsDataSearch, ClearSearchedDataOfLead,ClearReducerDataOfLead, getLeads, getLeadsRecords,getLeadsAllRecords, getLeadsTeamRecords, getJunkedLeadsRecords } from "../LeadsAction";
const { Search } = Input;
const Option = StyledSelect.Option;

const LeadsActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const [pageNo, setPage] = useState(0);
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
        props.getLeadsTeamRecords(props.userId);
      }
    }, [props.userId, props.teamsAccessInd]);

  useEffect(() => {
    if (props.viewType === "card") {
      props.getLeadsRecords(props.userId);
    } else if (props.viewType === "list") {
      props.getJunkedLeadsRecords(props.userId);
    } else if (props.viewType === "teams") {
      props.getLeadsTeamRecords(props.userId);
    }
    else if (props.viewType === "all") {
      props.getLeadsAllRecords(props.orgId);
    }
    if (transcript) {
      console.log(">>>>>>>", transcript);
      props.setCurrentData(transcript);
    }
  }, [props.viewType, props.userId,transcript]);

  
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
      //setPage(pageNo + 1);
      props.getLeads(props.userId, pageNo, "creationdate");
      //props.ClearReducerDataOfLead()
      props.ClearSearchedDataOfLead()
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.inputLeadsDataSearch(currentData);
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
    <AudioOutlined
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
      props.inputLeadsDataSearch(transcript);
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
  const { user } = props;
  console.log(currentData)
  const teamCount = props.teamsAccessInd && props.leadsTeamCountData ? props.leadsTeamCountData.leadsTeam : 0;

  
  return (
    <div class=" flex  items-center">
      <Tooltip
        title="My Leads"
      >
        <Badge
          size="small"
          count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
          overflowCount={999}
        >


          <span class=" md:mr-1 text-sm cursor-pointer"
            onClick={() => props.setLeadsViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
              <TocIcon className="text-white !text-icon" /></Avatar>

          </span>
        </Badge>
      </Tooltip>

      {user.teamsAccessInd === true && (
        <div class="md:">

          <Tooltip
            title="Team View"
          >
            <Badge
              size="small"
              count={(teamCount||props.viewType === "teams" ?props.leadsTeamCountData.leadsTeam : 0)}
              overflowCount={999}
            >
              <span class=" md:mr-1 text-sm cursor-pointer"
                onClick={() => props.setLeadsViewType("teams")}
                // style={{
                //   color: props.viewType === "teams" && "#1890ff",
                // }}
              >
                <Avatar style={{ background: props.teamsAccessInd||props.viewType === "teams" ? "#f279ab" : "#4bc076" }}>
                  <PeopleIcon className="text-white !text-icon" /></Avatar>

              </span>
            </Badge>
          </Tooltip>

        </div>
      )}
      <div class="md:">
        {user.crmInd === true && user.leadsFullListInd === true && (
          <Tooltip
            title="All"
          >
            <Badge
               size="small"
               count={(props.viewType === "all" && props.leadsAllCountData.leadsDetails) || 0}
               overflowCount={999}>
              <span class=" md:mr-1 text-sm cursor-pointer"
                onClick={() => props.setLeadsViewType("all")}
                style={{
                  color: props.viewType === "all" && "#1890ff",
                }}
              >
                <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                  <div class="text-white !text-icon">ALL</div></Avatar>

              </span>
            </Badge>
          </Tooltip>
        )}
      </div>
      <div class="md:mr-1 ml-2 max-sm:ml-1">
        <Badge
          size="small"
          count={(props.viewType === "list" && props.leadsCountJunked.junkedList) || 0}
          overflowCount={999}
        >
          <Tag
            color={props.viewType === "list" ? "#FFA500" : "orange"}
            style={{
              cursor: "pointer",
              fontWeight: props.viewType === "list" ? "bold" : null,
              textAlign: "center",
              fontFamily: "poppins",
              borderColor: "orange",
            }}
            onClick={() => props.setLeadsViewType("list")}
          >
            Junked
          </Tag>
        </Badge>
      </div>
      <div class=" w-64 max-sm:w-24">
        <Input
          placeholder="Search by Name or Sector"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
        {/* <Input
            placeholder="Search by Name or Sector"
            width={"100%"}
             suffix={suffix}
            onSearch={(value) => {
              props.inputLeadsDataSearch(value);
              props.setCurrentData(value);

            }}
            onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          /> */}
      </div>


      <div class="w-[35%] mt-2 ml-2">
        <StyledSelect placeholder="Sort" defaultValue="CreationDate" onChange={(e) => props.handleFilterChange(e)}>
        <Option value="" disabled hidden>
        Sort by :
    </Option>
          <Option value="CreationDate"> Creation Date</Option>
          <Option value="ascending">A To Z</Option>
          <Option value="descending">Z To A</Option>
        </StyledSelect>
      </div>
    </div>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
  fetchingLeadsInputSearchData: leads.fetchingLeadsInputSearchData,
  leadsCountData: leads.leadsCountData,
  leadsTeamCountData: leads.leadsTeamCountData,
  leadsCountJunked: leads.leadsCountJunked,
  userId: auth.userDetails.userId,
  leadsAllCountData:leads.leadsAllCountData,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputLeadsDataSearch,
  getLeadsRecords,
  ClearReducerDataOfLead,
  getLeads,
  getJunkedLeadsRecords,
  ClearSearchedDataOfLead,
  getLeadsTeamRecords,
  getLeadsAllRecords
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadsActionLeft));
