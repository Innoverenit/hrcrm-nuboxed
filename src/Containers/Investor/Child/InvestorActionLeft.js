import React, { useEffect, useState,useRef } from "react";
import { FormattedMessage } from "react-intl";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { Tooltip, Badge, Avatar } from "antd";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import PeopleIcon from '@mui/icons-material/People';
import { withRouter } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { getInvestor, ClearReducerDataOfInvestor, getInvestorsbyId, getInvestorTeam, searchInvestorName, getInvestorAll } from "../InvestorAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const InvestorActionLeft = (props) => {
  const [filter, setFilter] = useState("creationdate")
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);
  const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false); 
    const minRecordingTime = 3000; // 3 seconds
    const timerRef = useRef(null);
 
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  console.log(transcript);
  useEffect(() => {
    // props.getCustomerRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
    }, [ transcript]);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter && e.target.value.trim() === "") {
      setPage(pageNo + 1);
      props.getInvestorsbyId(props.userId, pageNo, "creationdate");
      props.ClearReducerDataOfInvestor()
      setSearchOnEnter(false);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      if (props.teamsAccessInd) {
        props.searchInvestorName(currentData, 'team');
      } else {
        if (props.viewType === "list") {
          props.searchInvestorName(currentData, 'user');
        } else if (props.viewType === "teams") {
          props.searchInvestorName(currentData, 'team');
        } else if (props.viewType === "all") {
          props.searchInvestorName(currentData, 'All');
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
  const dummy = ["cloud", "azure", "fgfdg"];
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
      if (props.teamsAccessInd) {
        props.searchInvestorName(transcript, 'team');
      } else {
        if (props.viewType === "list") {
          props.searchInvestorName(transcript, 'user');
        } else if (props.viewType === "teams") {
          props.searchInvestorName(transcript, 'team');
        } else if (props.viewType === "all") {
          props.searchInvestorName(transcript, 'All');
        } else {
          console.error("Invalid viewType. Please provide a valid value.");
        }
      }
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

  function handleFilterChange(data) {
    setFilter(data)
    props.getInvestorsbyId(props.userId, pageNo, data);
    setPage(pageNo + 1);
  }

  useEffect(() => {

    if (props.teamsAccessInd) {
      props.getInvestorTeam(props.userId);
    }
  }, [props.userId, props.teamsAccessInd]);
 
  useEffect(() => {
    if (props.viewType === "list") {
      props.getInvestor(props.userId);
    } else if (props.viewType === "teams") {
      props.getInvestorTeam(props.userId);
    } else if (props.viewType === "all") {
      props.getInvestorAll(props.orgId);
    }

    // if (transcript) {
    //   console.log(">>>>>>>", transcript);
    //   props.setCurrentData(transcript);
    // }
  }, [props.viewType, props.userId, props.orgId]);
  const teamCount = props.teamsAccessInd && props.investorTeamRecord ? props.investorTeamRecord.investorTeam : 0;
  return (
    <div class=" flex items-center">

      <Tooltip title={<FormattedMessage id="app.myInvestors" defaultMessage="My Investors" />}>
        <Badge
          size="small"
          count={(props.viewType === "list" && props.investorRecord.investor) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setInvestorViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#4bc076" }}>
              <TocIcon  className="text-white !text-icon" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>

      {props.user.teamsAccessInd === true && (
        <Tooltip
          title={<FormattedMessage id="app.teamView" defaultMessage="Team View" />}
        >
          <Badge
            size="small"
            count={(teamCount || props.viewType === "teams" && props.investorTeamRecord.investorTeam) || 0}
            overflowCount={999}
          >
            <span
              class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setInvestorViewType("teams")}
              style={{
                color: props.viewType === "teams" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.teamsAccessInd || props.viewType === "teams" ? "#f279ab" : "#4bc076" }}>
                <PeopleIcon  className="text-white !text-icon" />
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
      {(props.user.investorFullListInd === true || props.user.role === "ADMIN") && (
        <Tooltip title={<FormattedMessage id="app.all" defaultMessage="All" />}>
          <Badge
            size="small"
            count={(props.viewType === "all" && props.allinvestorRecord.investor) || 0}
            overflowCount={999}
          >
            <span
              class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setInvestorViewType("all")}
              style={{
                color: props.viewType === "all" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                <FormattedMessage id="app.all" defaultMessage="ALL" class=" text-white !text-icon"/>
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
       <Tooltip title="Delete List">
                {/* <Badge
          size="small"
          count={(props.viewType === "delete" && props.deletedCountSupplier.deletedSupplier) || 0}
          overflowCount={999}
        > */}
                    <span class=" mr-1 !text-icon cursor-pointer"
                        onClick={() => props.setInvestorViewType("delete")}
                        style={{
                            color: props.viewType === "delete" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: props.viewType === "delete" ? "#f279ab" : "#4bc076" }}>
                        <DeleteOutlined className="text-white" /></Avatar>
                    </span>
                    {/* </Badge> */}
                </Tooltip>
      {/* <Tooltip>
        <Badge
          size="small"
          count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setInvestorViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <GridViewIcon />
          </span>
        </Badge>
      </Tooltip> */}


      {/* <Tooltip
        title={<FormattedMessage id="app.mapview" defaultMessage="Map View" />}
      >
        <Badge
          size="small"
          count={(props.viewType === "map" && props.recordData.customer) || 0}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            style={{
              color: props.viewType === "map" && "#1890ff",
            }}
            onClick={() => props.setInvestorViewType("map")}
          >
            <LanguageIcon />
          </span>
        </Badge>
      </Tooltip> */}
      <div class=" flex items-center justify-between"
      >
        <div class=" w-72 md:ml-4 max-sm:w-16 ml-0">
          <Input
            placeholder="Search by Name, Company"
            class="w-96"
            suffix={suffix}
            onPressEnter={handleSearch}
            onChange={handleChange}
            value={currentData}
          />
        </div>
        {/* <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
             props.searchInvestorName(props.currentData);
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
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
        </Button> */}
        <div class=" w-[40%]  ml-2" >
          <StyledSelect placeholder="Sort" onChange={(e) => props.handleFilterChange(e)}>
            <Option value="CreationDate">Creation Date</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ investor, auth, candidate }) => ({
  user: auth.userDetails,
  investorRecord: investor.investorRecord,
  investorTeamRecord: investor.investorTeamRecord,
  Candidatesort: candidate.Candidatesort,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  allinvestorRecord: investor.allinvestorRecord
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestor,
      ClearReducerDataOfInvestor,
      getInvestorsbyId,
      getInvestorTeam,
      searchInvestorName,
      getInvestorAll
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorActionLeft));
