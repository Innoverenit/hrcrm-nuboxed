import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from "@ant-design/icons";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PeopleIcon from '@mui/icons-material/People';
import { Input,Tooltip, } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Badge,Avatar } from "antd";
import {
  getContactInvest,
  getTeamContactInvest,
  searchInvestorContactName,
  getContactInvestAllRecord,
  getContactInvestByUserId,
  ClearReducerDataOfContactInvest
} from "../ContactInvestAction";

const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;
const ContactInvestActionLeft = (props) => {
  const[filter,setFilter]=useState("creationdate")
  const [page, setPage] = useState(0);
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [currentData, setCurrentData] = useState("");
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter&&e.target.value.trim() === "") {
      setPage(page + 1);
      props.getContactInvestByUserId(props.userId,page,"creationdate");
      props.ClearReducerDataOfContactInvest()
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.searchInvestorContactName(currentData);
      setSearchOnEnter(true);  //Code for Search
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

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
  useEffect(() => {

    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
    }, [ transcript]);
  function  handleFilterChange(data){
    setFilter(data)
    props.getContactInvestByUserId(props.userId, page,data);
    setPage(page + 1);
  }

  useEffect(() => {
    if (props.teamsAccessInd) {
      props.getTeamContactInvest(props.userId);
    }
  }, [props.userId, props.teamsAccessInd]);

  useEffect(() => {
    if (props.viewType === "card") {
      props.getContactInvest(props.userId);
    } else if (props.viewType === "teams") {
      props.getTeamContactInvest(props.userId);
    } 
    else if (props.viewType === "all") {
      props.getContactInvestAllRecord(props.orgId,"Investor");
    } 
  }, [props.viewType, props.userId]);
   
 
  const { user } = props;
  const teamCount = props.teamsAccessInd && props.teamContactInvest ? props.teamContactInvest.investorContactTeam : 0;
  return (
    <div class=" flex  items-center">
      <Tooltip
        title={<FormattedMessage id="app.myinvestorcontacts" defaultMessage="My Investor Contacts" />}
      >
        <Badge
          size="small"
          count={
            (props.viewType === "card" &&
              props.contactInvest.contactDetails) ||
            0
          }
          overflowCount={5000}
        >
          <div
            class=" mr-1"
            onClick={() => props.setContactInvetViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
            <AccountBalanceIcon className=" !text-icon cursor-pointer "  />
            </Avatar>
          </div>
        </Badge>
      </Tooltip>
      {user.teamsAccessInd === true && (
      <Tooltip
       title={<FormattedMessage id="app.teamview" defaultMessage="Team View" />}
      >
      <Badge
          size="small"
          count={
            (teamCount||props.viewType === "teams" &&
              props.teamContactInvest.investorContactTeam
              ) ||
            0
          }
          overflowCount={5000}
        >
          <div
            class=" mr-1 "
            onClick={() => props.setContactInvetViewType("teams")}
            style={{
              color: props.viewType === "teams" && "#1890ff",
            }}
          >
             <Avatar style={{ background:props.teamsAccessInd|| props.viewType === "teams" ? "#f279ab" : "#4bc076" }}>
           <PeopleIcon className=" !sr-onlytext-icon cursor-pointer"/>
           </Avatar>
          </div>
        </Badge>
      </Tooltip> 
      )}
      <Tooltip
       title={<FormattedMessage id="app.all" defaultMessage="All" />}
      >
        <Badge
          size="small"
          count={
            (props.viewType === "all" &&
              props.contactInvestAllRecord.contact) ||
            0
          }
          overflowCount={5000}
        >
          <div
            class=" mr-1 !text-icon cursor-pointer"
            onClick={() => props.setContactInvetViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
   <FormattedMessage id="app.all" defaultMessage="All" class="!text-icon " />
   </Avatar>
          </div>
        </Badge>
      </Tooltip>
    
   
      <div class=" w-[19rem] md:ml-4 max-sm:w-16 ml-3">
   
          <Input
       placeholder="Search by Name or Company"
       class="w-96"
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
             value={currentData}
          />
      </div>  
      <div class="w-[40%]  ml-2">
          <StyledSelect placeholder="Sort" defaultValue="Creation Date" value={props.filter}  onChange={(e)  => props.handleFilterChange(e)}>
          <Option value="CreationDate">Creation Date</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
    </div>
  );
};

const mapStateToProps = ({ auth, contactinvest }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
  contactInvest:contactinvest.contactInvest,
  teamContactInvest:contactinvest.teamContactInvest,
  contactInvestAllRecord:contactinvest.contactInvestAllRecord,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactInvest,
      getContactInvestByUserId,
      getContactInvestAllRecord,
      ClearReducerDataOfContactInvest,
      getTeamContactInvest,
      searchInvestorContactName
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestActionLeft);
