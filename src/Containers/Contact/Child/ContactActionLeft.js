import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MicIcon from '@mui/icons-material/Mic';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PeopleIcon from '@mui/icons-material/People';
import { Input, Tooltip,Avatar } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Badge } from "antd";
import {
  inputContactDataSearch,
  getRecords,
  ClearReducerDataOfContact,
  getContactListByUserId,
  getContactTeamRecord,
  getContactAllRecord,
  getCustomerRecords,
  getContactRecord,
  getAllContact,
  getTeamContact
} from "../ContactAction";
import {getDepartments} from "../../Settings/Department/DepartmentAction";

const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;
const ContactActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [pageNo, setPage] = useState(0);
  const [searchOnEnter, setSearchOnEnter] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dtouched, setDTouched] = useState(false);

  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter&&e.target.value.trim() === "") {
      setPage(pageNo + 1);
      if (props.viewType === "table") {
      props.getContactListByUserId(props.userId, pageNo,"Creation Date");
      }
      else if (props.teamsAccessInd) {
      props.getAllContact("0","Customer");
      }
      else if (props.viewType === "all") {
      props.getTeamContact(props.userId, "0");
      }
      props.ClearReducerDataOfContact()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      if (props.teamsAccessInd) {
      props.inputContactDataSearch(currentData,"team","customer");
      }
      else if (props.viewType === "table") {
        props.inputContactDataSearch(currentData,"user","customer");
        }
        else if (props.viewType === "all") {
          props.inputContactDataSearch(currentData,"All","customer");
          }
      setSearchOnEnter(true);  
    } 
    
    
    else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  const suffix = (
    <MicIcon
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
  useEffect(() => {
    // props.getCustomerRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
    }, [ transcript]);
  console.log(transcript);
  console.log(transcript);
  useEffect(() => {
    if (props.teamsAccessInd) {
      props.getContactTeamRecord(props.userId);
    }
  }, [props.userId, props.teamsAccessInd]);
    useEffect(() => {
      if (props.viewType === "table") {
        props.getContactRecord(props.userId);
      } else if (props.viewType === "teams") {
        props.getContactTeamRecord(props.userId);
      } 
      else if (props.viewType === "all") {
        props.getContactAllRecord(props.orgId,"Customer");
      }
      
     
      if (transcript) {
        console.log(">>>>>>>", transcript);
        props.setCurrentData(transcript);
      }
    }, [props.viewType, props.userId, transcript]);
  console.log(props.customerRecordData);
  const { user } = props;

  const sortedDepartments =props.departments.sort((a, b) => {
      const nameA = a.departmentName.toLowerCase();
      const nameB = b.departmentName.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  
  console.log("srtt",sortedDepartments)

  const countryNameOption = sortedDepartments.map((item)=>{
    return {
      label: `${item.departmentName || ""}`,
      value: item.departmentId,
    };});
    const teamCount = props.teamsAccessInd && props.contactTeamRecord ? props.contactTeamRecord.contactTeam : 0;
    const handleSelectDepartmentFocus = () => {
      if (!dtouched) {
        props.getDepartments()
        setDTouched(true);
      }
    };
  return (
    <div class=" flex  items-center">
      <Tooltip
        title="My Contacts" 
      >
        <Badge
          size="small"
          count={
            (props.viewType === "table" &&
              props.contactRecord.customerContactCount) ||
            0
          }
          overflowCount={5000}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setContactsViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
           <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "table" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "table" ? "scale(1.05)" : "scale(1)" }}>
             <AccountBalanceIcon className="text-white !text-icon" /></Avatar>
          </span>
        </Badge>
      </Tooltip>
      {user.teamsAccessInd === true && (
      <Tooltip
        title="Team View"
      >
        <Badge
          size="small"
          count={
            (teamCount ||props.viewType === "teams" &&
              props.contactTeamRecord.contactTeam ||
            null)
          }
          overflowCount={5000}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setContactsViewType("teams")}
          >
            <Avatar style={{ background:props.teamsAccessInd|| props.viewType === "teams" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "teams" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "teams" ? "scale(1.05)" : "scale(1)" }}>
         <PeopleIcon className="text-white !text-icon"/>
         </Avatar>
          </span>
        </Badge>
      </Tooltip>
      )}
      {(user.crmInd=== true && user.contactFullListInd===true || user.role === "ADMIN") && ( 
      <Tooltip
        title="All"
      >
        <Badge
          size="small"
          count={
            (props.viewType === "all" &&
              props.contactAllRecord.contact) ||
            0
          }
          overflowCount={5000}
        >
          <span
            class=" mr-1 !text-icon cursor-pointer"
            onClick={() => props.setContactsViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
             <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "all" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "all" ? "scale(1.05)" : "scale(1)" }}>
          <div className="text-white "> ALL</div>
           </Avatar>
          </span>
        </Badge>
      </Tooltip>
      )}
      {/* <Tooltip
        title=
      >
        <Badge
          size="small"
          count={(props.viewType === "dashboard" && props.recordData.record) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setContactsViewType("dashboard")}
            style={{
              color: props.viewType === "dashboard" && "#1890ff",
            }}
          >
            <HandshakeIcon />
          </span>
        </Badge>
      </Tooltip> */}
      <div class=" w-72 md:ml-4 max-sm:w-36 ml-0">
      <Input
       placeholder="Search by Name, Company"
       class="w-96"
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
             value={currentData}
          />
        {/* <Input
          placeholder="Search by Name, Company"
          class="w-96"
          suffix={suffix}
          allowClear
          enterButton
          onChange={(e) => props.handleChange(e)}
          value={props.currentData}
        /> */}
      </div>
    
<div class="w-32 md:ml-4 max-sm:hidden">
      <select className="h-8"
         style={{ boxShadow: "0 0.15em 0.3em #aaa"
        }}
       value={props.selectedCountry} 
       onChange={props.handleCountryChange} 
       onFocus={handleSelectDepartmentFocus}
       >
        <option value="" disabled>Department</option>
        <option value="">All</option>
        {countryNameOption.map((countryOption, index) => (
          <option key={index} value={countryOption.value}>
            {countryOption.label}
          </option>
        ))}
      </select>
      </div>

      <div class="w-[22%]  ml-2">
          <StyledSelect placeholder="Sort" defaultValue="Creation Date" value={props.filter}  onChange={(e)  => props.handleFilterChange(e)}>
          <Option value="CreationDate">Creation Date</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
         {/* <Select
  style={{ width: "10rem" }}
  value={editingValue}
  onChange={handleChangeRowSelectItem} 
  onBlur={() => handleEditRowField(null, null, null)}
  onFocus={handleSelectDepartmentFocus}
  autoFocus
>
{props.departments.map((country) => (
   <Option key={country.departmentId} value={country.departmentId}>
  {country.departmentName}
   </Option>
 ))}
</Select> */}
    </div>
  );
};

const mapStateToProps = ({ auth, contact,departments }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  recordData: contact.recordData,
  contactAllRecord:contact.contactAllRecord,
  contactRecord:contact.contactRecord,
  contactTeamRecord:contact.contactTeamRecord,
  customerRecordData: contact.customerRecordData,
  contactByUserId: contact.contactByUserId,
  fetchingContactInputSearchData: contact.fetchingContactInputSearchData,
  departments: departments.departments,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputContactDataSearch,
      getRecords,
      ClearReducerDataOfContact,
      getContactListByUserId,
      getContactTeamRecord,
      getContactAllRecord,
      getCustomerRecords,
      getContactRecord,
      getDepartments,
      getAllContact,
      getTeamContact
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactActionLeft);
