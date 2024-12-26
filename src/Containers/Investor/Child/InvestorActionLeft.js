import React, { useEffect, useState,useRef } from "react";

import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { Tooltip, Badge, Avatar,Button,Select } from "antd";
import { connect } from "react-redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { bindActionCreators } from "redux";
import PeopleIcon from '@mui/icons-material/People';

import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, {  useSpeechRecognition,} from "react-speech-recognition";
import { getInvestor, ClearReducerDataOfInvestor, getInvestorsbyId, getInvestorTeam, searchInvestorName, getInvestorAll } from "../InvestorAction";
import { Input } from "antd";
import { base_url } from "../../../Config/Auth";
import MoveUpIcon from '@mui/icons-material/MoveUp';
const Option = StyledSelect.Option;
const { Search } = Input;

const InvestorActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [touchedUser, setTouchedUser] = useState(false);
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

  const handleSelectUserFocus = () => {
    if (!touchedUser) {
      fetchUser();
      // fetchSector();

      setTouchedUser(true);
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

  }, [props.viewType, props.userId, props.orgId]);
  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
   

      const apiEndpoint = `${base_url}/employee/active/user/drop-down/${props.orgId}`;
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
  const teamCount = props.teamsAccessInd && props.investorTeamRecord ? props.investorTeamRecord.investorTeam : 0;
  return (
    <div class=" flex items-center">

      <Tooltip title="My Investors">
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
            <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "list" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "list" ? "scale(1.05)" : "scale(1)" }}>
              <TocIcon  className="text-white !text-icon" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>

      {props.user.teamsAccessInd === true && (
        <Tooltip
          title="Team View"
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
              <Avatar style={{ background: props.teamsAccessInd || props.viewType === "teams" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "teams" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "teams" ? "scale(1.05)" : "scale(1)" }}>
                <PeopleIcon  className="text-white !text-icon" />
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
      {(props.user.investorFullListInd === true || props.user.role === "ADMIN") && (
        <Tooltip title="All" >
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
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "all" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "all" ? "scale(1.05)" : "scale(1)" }}>
              All
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
       <Tooltip title="Delete List">           
                    <span class=" mr-1 !text-icon cursor-pointer"
                        onClick={() => props.setInvestorViewType("delete")}
                        style={{
                            color: props.viewType === "delete" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: props.viewType === "delete" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "delete" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "delete" ? "scale(1.05)" : "scale(1)" }}>
                  <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  /></Avatar>
                    </span>
                    {/* </Badge> */}
                </Tooltip>

      <div class=" flex items-center justify-between"
      >
        <div class=" w-[26rem] md:ml-4 max-sm:w-16 ml-0">
          <Input
            placeholder="Search by Name or Company"
            class="w-96"
            suffix={suffix}
            onPressEnter={handleSearch}
            onChange={handleChange}
            value={currentData}
          />
        </div>
   
        <div class=" w-[40%]  ml-2" >
          <StyledSelect placeholder="Sort" defaultValue="Creation Date" value={props.filter} onChange={(e) => props.handleFilterChange(e)}>
            <Option value="Creation Date">Creation Date</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>

        <div class="w-[40%]  ml-2 max-sm:w-[45%]">
       {/* {!props.showCheckboxes && (  */}
        <Button type="primary" 
        onClick={props.handleTransferClick}
        ><MoveUpIcon className="!text-icon"/>
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
    </div>
  );
};
const mapStateToProps = ({ investor, auth, candidate }) => ({
  user: auth.userDetails,
  investorRecord: investor.investorRecord,
  investorTeamRecord: investor.investorTeamRecord,
  Candidatesort: candidate.Candidatesort,
  userId: auth.userDetails.userId,
  token: auth.token,
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

export default connect(mapStateToProps, mapDispatchToProps)(InvestorActionLeft);
