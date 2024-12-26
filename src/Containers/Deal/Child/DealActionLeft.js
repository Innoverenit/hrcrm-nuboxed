import React, { useEffect,useRef,useState } from "react";

import { Tooltip, Badge,Avatar,Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import {getdealsRecord,getdealsAllRecord,
  getdealsTeamRecord,getlostRecords,
  getDeleteRecords,inputDealDataSearch,ClearSearchedDataOfDeal,
  getDealListbyUserId,getTeamsDeals,getAllDeals

} from "../DealAction";
import GridOnIcon from '@mui/icons-material/GridOn';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
const { Search } = Input;

const DealActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const [pageNo, setPage] = useState(0);
  const [page, setpage] = useState(0);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (props.teamsAccessInd) {
      props.getdealsTeamRecord(props.userId);
    }
  }, [props.userId, props.teamsAccessInd]);
  useEffect(() => {
    if (props.viewType === "table") {
      props.getdealsRecord(props.userId);
    } else if (props.viewType === "all") {
      props.getdealsAllRecord(props.orgId);
    } else if (props.viewType === "lost") {
      props.getlostRecords(props.userId);
      
    }
    else if (props.viewType === "delete") {
      props.getDeleteRecords(props.userId);
      
    }  else if (props.viewType === "teams") {
      props.getdealsTeamRecord(props.userId);
    } 
  }, [props.viewType, props.userId,props.orgId]);

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
          props.getDealListbyUserId(props.userId, page);
        } else if (props.viewType === "teams") {
          props.getTeamsDeals(props.userId,page);
        } else if (props.viewType === "all") {
          props.getAllDeals("all", page);
        }
        props.ClearSearchedDataOfDeal()
        setSearchOnEnter(false);
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        if (props.teamsAccessInd) {
          props.inputDealDataSearch(currentData, 'team');
        } else {
          if (props.viewType === "table") {
            props.inputDealDataSearch(currentData, 'user');
          } else if (props.viewType === "teams") {
            props.inputDealDataSearch(currentData, 'team');
          } else if (props.viewType === "all") {
            props.inputDealDataSearch(currentData, 'All');
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
          props.inputDealDataSearch(transcript, 'team');
        } else {
          if (props.viewType === "table") {
            props.inputDealDataSearch(transcript, 'user');
          } else if (props.viewType === "teams") {
            props.inputDealDataSearch(transcript, 'team');
          } else if (props.viewType === "all") {
            props.inputDealDataSearch(transcript, 'All');
          } else {
            console.error("Invalid viewType. Please provide a valid value.");
          }
        }
       // props.inputDealDataSearch(transcript);
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
    lostDealData,
   setDealViewType,
   recordDeleteDealData,
    dealsTeamRecord,
    user
  } = props;

  const teamCount = props.teamsAccessInd && props.dealsTeamRecord ? props.dealsTeamRecord.investorOpportunityTeam : 0;

  return (
    <div class=" flex items-center cursor-pointer">
      <Badge
        size="small"
         count={(viewType === "table" &&   props.dealsRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
        <Tooltip
          title=" My Deals"
           
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => setDealViewType("table")}
            style={{
              color: viewType === "table" && "#1890ff",
            }}
          >          
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#28a355" }}>
            <CurrencyExchangeIcon  className="text-white !text-icon"/>
            </Avatar>
          </span>
        </Tooltip>
      </Badge>
      <Tooltip
          title=" My Deals-Stage View" 
        >
        <Badge
        size="small"
        //  count={(viewType === "table" &&   props.dealsRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span
          class="mr-1 text-sm cursor-pointer"
            style={{
              color: viewType === "stage" && "#1890ff",
            }}
          
            onClick={() => props.setDealViewType("stage")}
          >
             <Avatar style={{ background: props.viewType === "stage" ? "#f279ab" : "#28a355" }}>
           <GridOnIcon  className="text-white !text-icon cursor:pointer"/>
           </Avatar>
          </span>
          </Badge>
        </Tooltip>
        <Tooltip 
        title="My Deals-Won"
     
   >
      <Badge
          size="small"     
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setDealViewType("won")}
            style={{        
              color: props.viewType === "won" && "#1890ff",
              // cursor:"pointer"
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "won" ? "#f279ab" : "#28a355" }}>
            <CheckCircleOutlineIcon type="check-circle" theme="twoTone" twoToneColor="#24D8A7"  className=" !text-icon cursor:pointer" />
            </Avatar>
          </span>
          </Badge>
      </Tooltip>
       
      <Tooltip 
        title="My Deals-Lost"
       >
        <Badge
          size="small"
          count={
            (viewType === "lost" &&
            lostDealData.OpportunityDetailsByLostInd
            ) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
             onClick={() => props.setDealViewType("lost")}
            style={{
              color: props.viewType === "lost" && "#1890ff",
            
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "lost" ? "#f279ab" : "#28a355" }}>
            <DoDisturbIcon type="stop" theme="twoTone" twoToneColor="red"  className=" !text-icon cursor:pointer" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
   
      {user.teamsAccessInd === true && (
        <Tooltip
          title="My Deals-Teams"
        
        >
           <Badge
          size="small"
          count={
            (teamCount || viewType === "teams" &&
            dealsTeamRecord.investorOpportunityTeam) ||
            0
          }
          overflowCount={999}
        >
          <span
          class="mr-1 text-sm cursor-pointer"
            style={{
        
              color: viewType === "teams" && "#1890ff",
           
            }}
            onClick={() => props.setDealViewType("teams")}
          >
            <Avatar style={{ background:props.teamsAccessInd|| props.viewType === "teams" ? "#f279ab" : "#28a355" }}>
         <PeopleIcon  className="text-white !text-icon cursor:pointer"/>
         </Avatar>
          </span>
          </Badge>
        </Tooltip>
           )}
        {(props.dealFullListInd===true || props.user.role==="ADMIN") && (
        <Tooltip
          title="ALL"
        >
     <Badge
        size="small"
         count={(viewType === "all" &&   props.dealsAllRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span
          class="mr-1 text-sm cursor-pointer"
            style={{
              color: viewType === "all" && "#1890ff",
              cursor:"pointer"
            }}
            // iconType="table"
            tooltipTitle="All"
            onClick={() => props.setDealViewType("all")}
          >
             <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355" }}>
          ALL
                      </Avatar>
          </span>
          </Badge>
        </Tooltip>
     )}
      <Tooltip
        title=" My Deals-Deleted"
        
      >
        {" "}
        <Badge
          size="small"
          count={
            (viewType === "delete" &&
            recordDeleteDealData.invOpportunity) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
             onClick={() => props.setDealViewType("delete")}
             style={{
              cursor:"pointer",
              color: props.viewType === "delete" && "#1890ff",
            
            }}
          >
             <Avatar style={{ background: props.viewType === "delete" ? "#f279ab" : "#28a355" }}>
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
const mapStateToProps = ({ deal, auth, opportunity }) => ({
  user: auth.userDetails,
  recordData: opportunity.recordData,
  lostDealData:deal.lostDealData,
  orgId: auth.userDetails.organizationId,
  dealsTeamRecord:deal.dealsTeamRecord,
  dealsAllRecord:deal.dealsAllRecord,
  userId: auth.userDetails.userId,
  dealsRecord:deal.dealsRecord,
  recorddeleteOpportunityData: opportunity.recorddeleteOpportunityData,
  closeOpportunityData: opportunity.closeOpportunityData,
  lostOpportunityData: opportunity.lostOpportunityData,
  dealFullListInd:auth.userDetails.dealFullListInd,
  recordDeleteDealData:deal.recordDeleteDealData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getdealsRecord,
      getlostRecords,
      getdealsTeamRecord,
      getdealsAllRecord,
      getDeleteRecords,
      inputDealDataSearch,
      ClearSearchedDataOfDeal,
      getDealListbyUserId,
      getTeamsDeals,
      getAllDeals
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealActionLeft)
