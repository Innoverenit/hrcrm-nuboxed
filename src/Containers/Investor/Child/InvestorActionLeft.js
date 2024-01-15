import React, { useEffect,useState } from "react";
import { FormattedMessage } from "react-intl";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { Tooltip, Badge } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PeopleIcon from '@mui/icons-material/People';
import { withRouter } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {getInvestor,ClearReducerDataOfInvestor,getInvestorsbyId,getInvestorTeam,searchInvestorName} from "../InvestorAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const InvestorActionLeft = (props) => {
  const[filter,setFilter]=useState("creationdate")
  const [currentData, setCurrentData] = useState("");
  const [pageNo, setPage] = useState(0);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      setPage(pageNo + 1);
      props.getInvestorsbyId(props.userId, pageNo,"creationdate");
      props.ClearReducerDataOfInvestor()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.searchInvestorName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  const dummy = ["cloud", "azure", "fgfdg"];
  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
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
  console.log(transcript);
  function  handleFilterChange(data){
    setFilter(data)
    props.getInvestorsbyId(props.userId, pageNo,data);
    setPage(pageNo + 1);
  }

// useEffect(() => {
//   props.getInvestor(props.userId)
//   }, [props.userId]);

  useEffect(() => {
    if (props.viewType === "list") {
      props.getInvestor(props.userId);
    } else if (props.viewType === "teams") {
      props.getInvestorTeam(props.userId);
    } 
   
    if (transcript) {
      console.log(">>>>>>>", transcript);
      props.setCurrentData(transcript);
    }
  }, [props.viewType, props.userId, transcript]);

  return (
    <div class=" flex items-center"
    >
      <Tooltip title={<FormattedMessage id="app.all" defaultMessage="All" />}>
        <Badge
          size="small"
        count={(props.viewType === "list" && props.investorRecord.investor) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setInvestorViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >
            <TocIcon />
          </span>
        </Badge>
      </Tooltip>

      
      <Tooltip 
      title={<FormattedMessage id="app.teams" defaultMessage="Teams" />}
>
        <Badge
          size="small"
        count={(props.viewType === "teams" && props.investorTeamRecord.InvestorTeam) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setInvestorViewType("teams")}
            style={{
              color: props.viewType === "teams" && "#1890ff",
            }}
          >
          <PeopleIcon/>
          </span>
        </Badge>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="app.all" defaultMessage="All" />}>
        <Badge
          size="small"
        count={(props.viewType === "all" && props.investorRecord.investor) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setInvestorViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
         <FormattedMessage id="app.all" defaultMessage="ALL" />
          </span>
        </Badge>
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
            // value={currentData}
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
        <div style={{ width: "25%",marginTop:"0.5rem" }}>
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
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
  investorRecord:investor.investorRecord,
  investorTeamRecord:investor.investorTeamRecord,
  Candidatesort: candidate.Candidatesort,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestor,
      ClearReducerDataOfInvestor,
      getInvestorsbyId,
      getInvestorTeam,
      searchInvestorName
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorActionLeft));
