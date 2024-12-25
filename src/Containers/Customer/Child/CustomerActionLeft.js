import React, { useEffect, useState,useRef } from "react";
import MoveUpIcon from '@mui/icons-material/MoveUp';
import TocIcon from '@mui/icons-material/Toc';
import PeopleIcon from '@mui/icons-material/People';
import { getCustomerListByUserId } from "../CustomerAction"
import { StyledSelect } from "../../../Components/UI/Antd";
import { Tooltip, Badge, Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MicIcon from '@mui/icons-material/Mic';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
import { Input ,Button,Select} from "antd";
import { base_url } from "../../../Config/Auth";

const Option = StyledSelect.Option;
const { Search } = Input;


const userList = [
  { id: 1, name: 'User A' },
  { id: 2, name: 'User B' },
  { id: 3, name: 'User C' },
];

const CustomerActionLeft = (props) => {
  const [filter, setFilter] = useState("creationdate")
  const [page, setPage] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

  const [searchOnEnter, setSearchOnEnter] = useState(false);
  const [currentData, setCurrentData] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [touchedUser, setTouchedUser] = useState(false);
  const dummy = ["cloud", "azure", "fgfdg"];
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

   "374", // "My Prospects" // 0
   "227",// "Team View", // 1
   "228",// '"All', // 2
   "228",// '"ALL"', // 3
   "288",// 'Search by Name or Sector" // 4
   "396",// ' Sort by Creation Date', // 5
   "289",// 'Creation Date', // 6
  //  "",//Transfer
   "1079",//Cancel7
  
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  
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


  const handleSelectUserFocus = () => {
    if (!touchedUser) {
      fetchUser();
      // fetchSector();

      setTouchedUser(true);
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

  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
   

      const apiEndpoint = `${base_url}/employee/active/user/type/drop-down/${props.orgId}/${"employee"}`;
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

  const { user } = props;
  console.log(props.viewType)
  const teamCount = props.teamsAccessInd && props.customerTeamRecordData ? props.customerTeamRecordData.prospectTeam : 0;
  return (
    <div class=" flex items-center"
    >
      <Tooltip title= {translatedMenuItems[0]}>
   
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
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#28a355" ,
               boxShadow: props.viewType === "table" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "table" ? "scale(1.05)" : "scale(1)"}}>
              <TocIcon className="text-white !text-icon" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      
      {user.teamsAccessInd === true && (
        <Tooltip title= {translatedMenuItems[1]}>
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
              <Avatar style={{ background:props.teamsAccessInd|| props.viewType === "teams" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "teams" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "teams" ? "scale(1.05)" : "scale(1)" }}>
                <PeopleIcon className="text-white !text-icon" />
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
      {(user.crmInd === true && user.customerFullListInd === true || user.role === "ADMIN") && (
        <Tooltip title= {translatedMenuItems[2]}>
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
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "all" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "all" ? "scale(1.05)" : "scale(1)" }}>
              {translatedMenuItems[3]} 
              </Avatar>

            </span>
          </Badge>
        </Tooltip>
      )}

      
         {user.teamsAccessInd === true && (
       <Tooltip title="My Deleted-Prospect">
                <Badge size="small"
                // count={props.accountRecordData.distributor || 0}
                >
                    <span class=" mr-1 text-sm cursor-pointer"
                        onClick={() => props.setCustomerViewType("dashboard1")}
                        style={{
                            color: props.viewType === "dashboard1" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: props.viewType === "dashboard1" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "dashboard1" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "dashboard1" ? "scale(1.05)" : "scale(1)" }}>
                            <DeleteOutlineIcon className="text-white !text-icon " /></Avatar>

                    </span>
                </Badge>
            </Tooltip>
             )}
      <div class=" flex items-center justify-between"
      >
        <div class=" w-[24rem] max-sm:w-24">
          <Input
            placeholder= {translatedMenuItems[4]}
            // "Search by Name or Sector"

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
               {translatedMenuItems[5]}{/* Sort by Creation Date */}
            </span>
          } value={props.filter} onChange={(e) => props.handleFilterChange(e)}>
            <Option value="CreationDate"> {translatedMenuItems[6]}</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>




        <div class="w-[40%]  ml-2 max-sm:w-[45%]">
       {/* {!props.showCheckboxes && (  */}
        <Button type="primary" 
        onClick={props.handleTransferClick}
        >
         <MoveUpIcon className=" !text-icon  text-white"/> {props.isTransferMode ? 'Transfer' : translatedMenuItems[7]}

        </Button>
        {/* Cancel */}
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
const mapStateToProps = ({ customer, auth, candidate }) => ({
  user: auth.userDetails,
  recordData: customer.recordData,
  customerAllRecordData: customer.customerAllRecordData,
  customerTeamRecordData: customer.customerTeamRecordData,
  recordCategoryData: customer.recordCategoryData,
  recordCategoryDataBlue: customer.recordCategoryDataBlue,
  Candidatesort: candidate.Candidatesort,
  userId: auth.userDetails.userId,
  token: auth.token,
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActionLeft)

