import React, { useEffect, useState,useRef } from "react";
import { FormattedMessage } from "react-intl";
import TocIcon from '@mui/icons-material/Toc';
import PeopleIcon from '@mui/icons-material/People';
import { getCustomerListByUserId } from "../CustomerAction"
import { StyledSelect } from "../../../Components/UI/Antd";
import { Tooltip, Badge, Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  inputCustomerDataSearch,
  getRecords,
  ClearReducerDataOfCustomer,
  getCustomerTeamRecords,
  getCustomerAllRecords,
  getCategoryRecords,
  getTeamCustomer
} from "../CustomerAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const CustomerActionLeft = (props) => {
  const [filter, setFilter] = useState("creationdate")
  const [page, setPage] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

  const [searchOnEnter, setSearchOnEnter] = useState(false);
  const [currentData, setCurrentData] = useState("");
  const dummy = ["cloud", "azure", "fgfdg"];
  console.log(searchOnEnter)
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter && e.target.value.trim() === "") {
      // setPage(page + 1);
      props.getTeamCustomer(props.userId, page);
      props.getCustomerListByUserId(props.userId, page, "creationdate");
      props.ClearReducerDataOfCustomer();
      setSearchOnEnter(false);
    }
  };
  // const handleSearch = () => {
  //   if (currentData.trim() !== "") {
  //     // Perform the search
  //     props.inputCustomerDataSearch(currentData);
  //     setSearchOnEnter(true);  //Code for Search
  //   } else {
  //     console.error("Input is empty. Please provide a value.");
  //   }
  // };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      if (props.teamsAccessInd) {
        props.inputCustomerDataSearch(currentData, 'team');
      } else {
        if (props.viewType === "table") {
          props.inputCustomerDataSearch(currentData, 'user');
        } else if (props.viewType === "teams") {
          props.inputCustomerDataSearch(currentData, 'team');
        } else if (props.viewType === "all") {
          props.inputCustomerDataSearch(currentData, 'All');
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
    <AudioOutlined
      onClick={handleStartListening}
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    // props.getCustomerRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript);
     
      setCurrentData(transcript);
    }
  }, [transcript]);
  console.log(transcript);

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    if (transcript.trim() !== "") {
      setCurrentData(transcript);
      if (props.teamsAccessInd) {
        props.inputCustomerDataSearch(transcript, 'team');
      } else {
        if (props.viewType === "table") {
          props.inputCustomerDataSearch(transcript, 'user');
        } else if (props.viewType === "teams") {
          props.inputCustomerDataSearch(transcript, 'team');
        } else if (props.viewType === "all") {
          props.inputCustomerDataSearch(transcript, 'All');
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
  function handleFilterChange(data) {
    setFilter(data)
    props.getCustomerListByUserId(props.userId, page, data);
    setPage(page + 1);
  }

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
  
  useEffect(() => {
    if (props.teamsAccessInd) {
      props.getCustomerTeamRecords(props.userId);
    }
  }, [props.userId, props.teamsAccessInd]);

  useEffect(() => {
    if (props.viewType === "card") {
      props.getRecords(props.userId);
    } else if (props.viewType === "teams") {
      props.getCustomerTeamRecords(props.userId);
      // props.getCustomerListByUserId("teams", page, "creationdate");
    }
    else if (props.viewType === "all") {
      props.getCustomerAllRecords(props.orgId);
      //props.getCustomerListByUserId("all", page, "creationdate");
    }

    else if (props.viewType === "table") {
      props.getRecords(props.userId);
      //props.getCustomerListByUserId(props.userId, page, "creationdate");
    } else if (props.viewType === "dashboard") {
      props.getCategoryRecords("blue");
    }

    if (transcript) {
      console.log(">>>>>>>", transcript);
      props.setCurrentData(transcript);
    }
  }, [props.viewType, props.userId, transcript]);
  // useEffect(() => {
  //   if (props.viewType === "table") {
  //     props.getCustomerListByUserId(props.userId, page, "creationdate");
  //   } else if (props.viewType === "teams") {
  //     props.getCustomerListByUserId("teams", page, "creationdate");
  //   } 
  //   else if (props.viewType === "all") {
  //     props.getCustomerListByUserId("all", page, "creationdate");
  //   } 

  // }, [])

  const { user } = props;
  const teamCount = props.teamsAccessInd && props.customerTeamRecordData ? props.customerTeamRecordData.prospectTeam : 0;
  return (
    <div class=" flex items-center"
    >
      <Tooltip title={<FormattedMessage id="app.myprospects" defaultMessage="My Prospects" />}>
        <Badge
          size="small"
          count={(props.viewType === "table" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
              <TocIcon className="text-white !text-icon" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      {/* <Tooltip title={<FormattedMessage id="app.card" defaultMessage="Card" />}>
        <Badge
          size="small"
          count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
            <GridViewIcon className="text-white"/>
            </Avatar>
          </span>
        </Badge>
      </Tooltip> */}
      {user.teamsAccessInd === true && (
        <Tooltip title="Team View">
          <Badge
            size="small"
            count={(teamCount||props.viewType === "teams" && props.customerTeamRecordData.prospectTeam || 0)}
            overflowCount={999}
          >
            <span
              class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setCustomerViewType("teams")}
              style={{
                color: props.viewType === "teams" && "#1890ff",
              }}
            >
              <Avatar style={{ background:props.teamsAccessInd|| props.viewType === "teams" ? "#f279ab" : "#4bc076" }}>
                <PeopleIcon className="text-white !text-icon" />
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
      {(user.crmInd === true && user.customerFullListInd === true || user.role === "ADMIN") && (
        <Tooltip title="All">
          <Badge
            size="All"
            count={(props.viewType === "all" && props.customerAllRecordData.customer) || 0}
            overflowCount={999}
          >
            <span
              class=" mr-1 text-sm cursor-pointer !text-icon"
              onClick={() => props.setCustomerViewType("all")}
              style={{
                color: props.viewType === "all" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                <FormattedMessage
                  id="app.all"
                  defaultMessage="ALL"
                />
              </Avatar>

            </span>
          </Badge>
        </Tooltip>
      )}

      {/* <Tooltip
        title={<FormattedMessage id="app.mapview" defaultMessage="Map View" />}
      >
        <Badge
          size="small"
          // count={(props.viewType === "mapView" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("mapView")}
            style={{
              color: props.viewType === "mapView" && "#1890ff",
            }}
          >
           <LanguageIcon />
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
            class=" mr-1 text-sm cursor-pointer"
            style={{
              color: props.viewType === "map" && "#1890ff",
            }}
            onClick={() => props.setCustomerViewType("map")}
          >
            <LanguageIcon />
          </span>
        </Badge>
      </Tooltip> */}
      <div class=" flex items-center justify-between"
      >
        <div class=" w-72 max-sm:w-24">
          <Input
            placeholder="Search by Name or Sector"

            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}
            onChange={handleChange}
            value={currentData}
          />
        </div>
        <div class="w-[40%]  ml-2 max-sm:w-[45%]">
          <StyledSelect placeholder={
            <span>
              Sort by Creation Date
            </span>
          } onChange={(e) => props.handleFilterChange(e)}>
            <Option value="CreationDate">Creation Date</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ customer, auth, candidate }) => ({
  user: auth.userDetails,
  recordData: customer.recordData,
  customerAllRecordData: customer.customerAllRecordData,
  customerTeamRecordData: customer.customerTeamRecordData,
  recordCategoryData: customer.recordCategoryData,
  recordCategoryDataBlue: customer.recordCategoryDataBlue,
  Candidatesort: candidate.Candidatesort,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputCustomerDataSearch,
      getRecords,
      ClearReducerDataOfCustomer,
      getCustomerTeamRecords,
      getCustomerAllRecords,
      getCategoryRecords,
      getCustomerListByUserId,
      getTeamCustomer
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerActionLeft)
);
