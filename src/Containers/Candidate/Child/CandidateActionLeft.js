import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableViewIcon from '@mui/icons-material/TableView';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CircleIcon from '@mui/icons-material/Circle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LanguageIcon from '@mui/icons-material/Language';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Input, Menu, Button, Tooltip, Radio,  Badge, Avatar } from "antd";
import {
  inputCandidateDataSearch,
  inputCandidateSkillDataSearch,
  getRecords,
  getCandidateCategoryRecords,
  Candidatesorttype,
  ClearReducerDataOfCandidate,
  getCandidateListByUserId,
  getCandidateCountSearch
} from "../CandidateAction";
import GroupsIcon from '@mui/icons-material/Groups';
import { StyledSelect } from "../../../Components/UI/Antd";
import MicIcon from '@mui/icons-material/Mic';
const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;

const CandidateActionLeft = (props) => {
  
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState("");
  const [pageNo, setPage] = useState(0);
  const handleChangeCan = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      setPage(pageNo + 1);
      props.getCandidateListByUserId(props.userId, pageNo);
      props.ClearReducerDataOfCandidate()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.inputCandidateDataSearch(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  function handleChange(data) {
    props.Candidatesorttype(props.userId,data);
    
  }

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    '', // 0Tile
'', // 1Billable Candidate
'228', // 2 All
'', // 3 White
'', // 4Blue
'1003', // 5Map View
'', // 6 Dollar
'', // 7 Search by Name, Skills & Identity ID


 

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
  const suffix = (
    <MicIcon
      onClick={SpeechRecognition.startListening}

      // onClick={() => {
      //   // this.handleContactPopoverVisibleChange();
      //   // handleLinkContactModal(true);
      // }}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}


    />
  );
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  console.log(transcript)




  useEffect(() => {
    // if (props.viewType === "table") {
    //   props.getRecords(props.userId);
      if (props.viewType === "card") {
        props.getRecords(props.userId);
    } else if (props.viewType === "list") {
      props.getCandidateCategoryRecords("White")
    } else if (props.viewType === "dashboard") {
      props.getCandidateCategoryRecords("blue")
    // } else if (props.viewType === "card") {
    //   props.getRecords(props.userId)
    }  
    
    if (transcript) {
      console.log(">>>>>>>", transcript)
      props.setCurrentData(transcript)
    }

    //  props.getAllRecords(props.userId);
    // if (props.type === "All") {
    //   props.getAllRecords()
    // } else {
    //   props.getRecords(props.userId)
    // }
  }, [props.viewType, props.userId, transcript]);
  console.log(props.currentData, props.text)
  console.log(props.recordData.candidateDetails || 0)

  const { 
    activeButton,
    user } = props;

  const menu = (
    <Menu>
      <Menu.Item>
        <Radio.Group

        >

          {/* <Space direction="vertical"> */}
          <Radio value={'Role'}>Role</Radio>
          <Radio value={'Cost'}>Cost</Radio>
          {/* </Space> */}
        </Radio.Group>
      </Menu.Item>
    </Menu>
  )

  return (

    <div class=" flex items-center" 
    // style={{ width: "39rem" }}
    >
      
      {user.userType !== "USER" && user.department == "Vendor" && (
        <div class =" w-[45%]" >
          <Search
            placeholder="Search By Job ID"
            // onSearch={(value) => {
            //   props.inputCandidateSkillDataSearch(value);
            //   props.setCurrentSkillData(value);
            // }}
            allowClear={false}
            enterButton
          />
        </div>
      )}      
      {user.userType !== "USER" && user.department == "Vendor" && (
        <Button
          type={props.currentSkillData ? "primary" : "default"}
        // onClick={props.handleSkillClear}
        >
        Clear
        </Button>
      )}
     <Tooltip title={translatedMenuItems[0]}>
      <Badge size="small" count={ props.viewType === "card" &&props.recordData.candidateDetails || 0} overflowCount={5000}>
     <span class="mr-1 cursor-pointer "
       onClick={() => props.setCandidateViewType("card")}
       style={{
         color: props.viewType === "card" && "tomato",
        //  "#1890ff",
       }}
     >
      <Avatar style={{ background:props.viewType === "card" ? "#f279ab" : "#28a355" ,
               boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"}}>
                    <TableViewIcon className="!text-icon text-white "/>
                    </Avatar>
      
       
       </span>
       </Badge>
 </Tooltip>  




      <Tooltip
        title={translatedMenuItems[1]}
      >
       
       <span class="mr-1 cursor-pointer "
            onClick={() => props.setCandidateViewType("billable")}
            style={{
              color: props.viewType === "billable" && "#1890ff",
            }}
          >
            <Avatar style={{ background:props.viewType === "billable" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "billable" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "billable" ? "scale(1.05)" : "scale(1)" }}>
            <ReceiptIcon className="!text-icon text-white "/>
                    </Avatar>
            
          </span>
       
      </Tooltip>

      <Tooltip
        title={translatedMenuItems[2]}
      >
        <Badge size="small" count={ props.viewType === "table" &&props.recordData.candidateDetails || 0} overflowCount={5000}>
        <span class="mr-1 cursor-pointer "
            onClick={() => props.setCandidateViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",

            }}
          >

<Avatar style={{ background:props.viewType === "table" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "table" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "table" ? "scale(1.05)" : "scale(1)" }}>
             <GroupsIcon className="!text-icon text-white"/>
            </Avatar>
           
            
          </span>
        </Badge>
      </Tooltip>


      <Tooltip
        title={translatedMenuItems[3]}
        >
        <Badge size="small" count={ props.viewType === "list" &&props.recordCandidateCategoryData.candidateDetails || 0} overflowCount={5000}>
        <span class="mr-1 cursor-pointer "
            onClick={() => props.setCandidateViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >

<Avatar style={{ background:props.viewType === "list" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "list" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "list" ? "scale(1.05)" : "scale(1)" }}>
<PermIdentityIcon className="!text-icon text-white" />
            </Avatar>
           
           
          </span>
        </Badge>
      </Tooltip>

      <Tooltip
        title={translatedMenuItems[4]}
      >
        <Badge size="small" count={ props.viewType === "dashboard" &&props.recordCandidateCategoryDataBlue.candidateDetails || 0} overflowCount={5000}>
        <span class="mr-1 cursor-pointer "
            onClick={() => props.setCandidateViewType("dashboard")}
            style={{
              color: props.viewType === "dashboard" && "#1890ff",
            }}
          >
            <Avatar style={{ background:props.viewType === "dashboard" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "dashboard" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "dashboard" ? "scale(1.05)" : "scale(1)" }}>
            <ManageAccountsIcon className="!text-icon text-white"  />
           </Avatar>
          
           
          </span>
        </Badge>
      </Tooltip>

 <Tooltip
        title={translatedMenuItems[5]}
      >
          <Badge size="small"count={ props.viewType === "map" &&props.recordData.candidateDetails || 0}>
          <span class="mr-1 cursor-pointer "
           onClick={() => props.setCandidateViewType("map")}
          style={{
            color: props.viewType === "map" && "#1890ff",
          }}
         
       
        >
          <Avatar style={{ background:props.viewType ===  "map" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "map" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "map" ? "scale(1.05)" : "scale(1)" }}>
          <LanguageIcon className="!text-icon text-white"/>
           </Avatar>
          
         
        </span>
        </Badge>
      </Tooltip>
      <Tooltip>
     
      <span class="mr-1 cursor-pointer "
       onClick={() => props.setCandidateViewType("black")}

     >
      <Avatar style={{ background:props.viewType === "table" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "table" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "table" ? "scale(1.05)" : "scale(1)" }}>
      <CircleIcon className="!text-icon text-white"  />  
           </Avatar>
          
    
       </span>

 </Tooltip>
 <Tooltip
        title={translatedMenuItems[6]}
      >
       
       <span class="mr-1 cursor-pointer "
            onClick={() => props.setCandidateViewType("dollar")}
            style={{
              color: props.viewType === "dollar" && "#1890ff",
            }}
          >
            <Avatar style={{ background:props.viewType === "dollar" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "dollar" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "dollar" ? "scale(1.05)" : "scale(1)" }}>
            <LocalAtmIcon className="!text-icon text-white" />
           </Avatar>
          
           
          </span>
       
      </Tooltip>
      {/* {user.userType !== "USER" && user.department !== "Vendor" && ( 
        // <div style={{ fontSize: "1em", fontWeight: "bold", color: "tomato" }}>
        //   # Records - {props.recordData.candidateDetails || 0}{" "}
        // </div>
        <div>
        {props.viewType === "table" ? (
          <div style={{ fontSize: "15px", fontWeight: "bold", color: "tomato" }}>
            # Records - {props.recordData.candidateDetails || 0}{" "}
          </div>
        ) 
        : props.viewType === "list" ?
        (
          <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
            # Records -{" "}{props.recordCandidateCategoryData.candidateDetails || 0}{" "}
          </div>
        ) 
        :props.viewType ==="dashboard" ?ca
         (
          <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
            # Records -{" "}{props.recordCandidateCategoryData.candidateDetails || 0}{" "}
          </div>
        ) : null}
        </div>
       )} */}
       <div className=" flex flex-nowrap flex-row items-center ">
      {user.userType !== "USER" && user.department !== "Vendor" && (
        <div class=" w-[15rem]" >
          <Input
            placeholder={translatedMenuItems[7]}
        
            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChangeCan}
          />
        </div>
      )}
    <Button
        onClick={() => props.handleCandidateFilterModal(true)}
     
      >
        <FilterAltIcon className="!text-icon"
         />
      </Button>
      
      
       {props.candidateCountSearch.count ?<div class=" w-[50%] text-base text-bold text-[tomato] pl-[0.3rem]" >
          # Search - {props.candidateCountSearch.count || 0} records{" "}
        </div>:
        null}
        
        
      


       <div class="w-[30%] mt-2 ml-2 max-sm:w-[45%]">
               <StyledSelect
  
  placeholder="Sort" 
 onChange={(e) => handleChange(e)}
>

  
<Option value="aToz">A To Z</Option>
   <Option value="zToa">Z To A</Option>
   
  
</StyledSelect> 
            </div>
     
            </div>
    </div>
  );
};

const mapStateToProps = ({ auth, candidate }) => ({
  user: auth.userDetails,
  recordData: candidate.recordData,
  userId: auth.userDetails.userId,
  recordAllData: candidate.recordAllData,
  fetchingCandidateInputSearchData:candidate.fetchingCandidateInputSearchData,
  recordCandidateCategoryData: candidate.recordCandidateCategoryData,
  recordCandidateCategoryDataBlue: candidate.recordCandidateCategoryDataBlue,
  type: candidate.type,
  Candidatesort:candidate.Candidatesort,
  fetchingCandidateCountSearchData:candidate.fetchingCandidateCountSearchData,
  candidateCountSearch:candidate.candidateCountSearch
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputCandidateDataSearch,
      getCandidateCountSearch,
      inputCandidateSkillDataSearch,
      getRecords,
      getCandidateCategoryRecords,
      Candidatesorttype,
      ClearReducerDataOfCandidate,
      getCandidateListByUserId,
      // handleCandidateFilterModal

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateActionLeft);
