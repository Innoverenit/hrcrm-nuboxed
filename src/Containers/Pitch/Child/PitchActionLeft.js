
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import { Input, Tooltip,Badge,Avatar } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import {getPitchRecords,getPitchAllRecords,getPitch,ClearReducerDataOfPitch,getPitchCount,searchPitchName} from "../PitchAction";
import { FormattedMessage } from "react-intl";
const { Search } = Input;
const Option = StyledSelect.Option;

const PitchActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);
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
      // Perform the search
      props.searchPitchName(currentData);
      setSearchOnEnter(true);  //Code for Search
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  const dummy = ["cloud", "azure", "fgfdg"];
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
  useEffect(() => {
    if (props.viewType === "card") {
      props.getPitchCount(props.userId);
    } else if (props.viewType === "all") {
      props.getPitchAllRecords();
    }
  }, [props.viewType, props.userId]);
  // useEffect(() => {
  //   props.getPitchCount(props.userId)
  //   props.getPitchAllRecords
  //   }, [props.userId]);
 
 
  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}

    />
  );
  console.log( props.pitchCount.InvestorLeadsDetails)
  return (
    <div class=" flex  items-center">


    <Tooltip
        title= "Card View"
      >
  <Badge
        size="small"
        count={(props.viewType === "card" && props.pitchCount.InvestorLeadsDetails) || 0}
        
        overflowCount={999}
      >
        <span   class=" mr-1 text-sm cursor-pointer"
        onClick={() => props.setPitchViewType("card")}
          style={{
           color: props.viewType === "card" && "#1890ff",
          }}
        >
          <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
        <TocIcon />
        </Avatar>
        </span>
        </Badge>
      </Tooltip>
    
     

   
      <Tooltip
        title= "Teams"
      >
          <Badge
        size="small"
        // count={(props.viewType === "card" && props.pitchCount.InvestorLeadsDetails) || 0}
        
        overflowCount={999}
      >
        <span   class=" mr-1 text-sm cursor-pointer"
        onClick={() => props.setPitchViewType("teams")}
          style={{
           color: props.viewType === "teams" && "#1890ff",
          }}
        >
          <Avatar style={{ background: props.viewType === "teams" ? "#f279ab" : "#4bc076" }}>
         <PeopleIcon/>
         </Avatar>
        </span>
        </Badge>
      </Tooltip>
      {(props.user.pitchFullListInd===true || props.user.role==="ADMIN") && (

      <Tooltip
        title= "All"
      >
             <Badge
        size="small"
        count={(props.viewType === "all" && props.pitchAllRecord.InvestorLeadsDetails) || 0}
        overflowCount={999}
      >
        <span   class=" mr-1 text-sm cursor-pointer"
        onClick={() => props.setPitchViewType("all")}
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
      {/* <Badge
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
                  fontFamily:"poppins",
                  borderColor: "orange",
                }}
                onClick={() => props.setPitchViewType("list")}
              >
                Junked
              </Tag>
              </Badge> */}

      <div class=" w-72 ml-4 max-sm:w-28">
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
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
      
        </Button> */}
          <div style={{ width: "40%",marginTop:"0.5rem" }}>
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
           <Option value="CreationDate">Creation Date</Option> 
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
    </div>
  );
};

const mapStateToProps = ({pitch,auth}) => ({
  pitchRecord:pitch.pitchRecord,
  pitchCount:pitch.pitchCount,
  userId: auth.userDetails.userId,
  user:auth.userDetails,
  pitchAllRecord:pitch.pitchAllRecord,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPitchRecords,
  ClearReducerDataOfPitch,
  getPitch,
  getPitchCount,
  searchPitchName,
  getPitchAllRecords
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PitchActionLeft));
