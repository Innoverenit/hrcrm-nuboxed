import React, { useEffect ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, {  } from 'react-speech-recognition';
import PeopleIcon from '@mui/icons-material/People';
import { StyledSelect } from "../../../Components/UI/Antd";
import { Input, Tooltip,Tag,Badge } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import {inputLeadsDataSearch,ClearReducerDataOfLead,getLeads,getLeadsRecords,getLeadsTeamRecords,getJunkedLeadsRecords} from "../LeadsAction";
const { Search } = Input;
const Option = StyledSelect.Option;

const LeadsActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [pageNo, setPage] = useState(0);
  const dummy = ["cloud", "azure", "fgfdg"];
  
  useEffect(() => {
    if (props.viewType === "card") {
      props.getLeadsRecords(props.userId);
    } else if (props.viewType === "list") {
      props.getJunkedLeadsRecords(props.userId);
    }else if (props.viewType === "teams") {
      props.getLeadsTeamRecords(props.userId);
    }
  }, [props.viewType, props.userId]);

  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      setPage(pageNo + 1);
      props.getLeads(props.userId, pageNo,"creationdate");
      props.ClearReducerDataOfLead()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.inputLeadsDataSearch(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}

    />
  );
  const {user}=props;

  return (
    <div class=" flex  items-center">
         <Tooltip
        title= "Card View"
      >
<Badge
        size="small"
        count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        overflowCount={999}
      >

 
        <span   class=" mr-2 text-sm cursor-pointer"
        onClick={() => props.setLeadsViewType("card")}
          style={{
           color: props.viewType === "card" && "#1890ff",
          }}
        >
        <TocIcon />
        </span>
        </Badge>
      </Tooltip>
   
      {user.teamsAccessInd === true && (
      <div class="ml-2">
      
      <Tooltip
        title= "Teams"
      >
   <Badge
        size="small"
        count={(props.viewType === "teams" && props.leadsTeamCountData.LeadsTeam) || 0}
        overflowCount={999}
      >
        <span   class=" mr-2 text-sm cursor-pointer"
        onClick={() => props.setLeadsViewType("teams")}
          style={{
           color: props.viewType === "teams" && "#1890ff",
          }}
        >
       <PeopleIcon/>
        </span>
        </Badge>
      </Tooltip>
   
      </div>
         )}
      <div class="ml-2">
      {user.crmInd === true && user.leadsFullListInd===true && ( 
      <Tooltip
        title= "All"
      >
        <Badge>
        <span   class=" mr-2 text-sm cursor-pointer"
        onClick={() => props.setLeadsViewType("all")}
          style={{
           color: props.viewType === "all" && "#1890ff",
          }}
        >
        ALL
        </span>
        </Badge>
      </Tooltip>
      )}
      </div>
      <div class="ml-2 mr-2">
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
                  fontFamily:"poppins",
                  borderColor: "orange",
                }}
                onClick={() => props.setLeadsViewType("list")}
              >
                Junked
              </Tag>
              </Badge>
              </div>
      <div class=" w-72 max-sm:w-28">
      <Input
      placeholder="Search by Name or Sector"
      width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
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
     
      
        <div class="w-[22%] mt-1">
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
           <Option value="CreationDate">Creation Date</Option> 
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
    </div>
  );
};

const mapStateToProps = ({leads,auth}) => ({
  fetchingLeadsInputSearchData:leads.fetchingLeadsInputSearchData,
  leadsCountData:leads.leadsCountData,
  leadsTeamCountData:leads.leadsTeamCountData,
  leadsCountJunked:leads.leadsCountJunked,
  userId: auth.userDetails.userId,
  user: auth.userDetails,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputLeadsDataSearch,
  getLeadsRecords,
  ClearReducerDataOfLead,
  getLeads,
  getJunkedLeadsRecords,
  getLeadsTeamRecords
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadsActionLeft));
