import React, { useEffect, useState,useRef } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Badge, Tooltip,Avatar, Input } from "antd";
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, {  useSpeechRecognition,} from "react-speech-recognition";
import {getLocationRecords,getLocationDeletedCount,searchLocationName,clearReducerOfLocationSearch} from "./LocationAction";

const LocationActionLeft = (props) => {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
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

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
        "228",  // All
          "1003",  // Map View
          "1004", // "Inactive
         
       
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    if (props.viewType === "card") {
      props.getLocationRecords(props.orgId);
    }
    else if (props.viewType === "delete") {
      props.getLocationDeletedCount(props.orgId);
    }
  }, [props.viewType]);
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


      props.clearReducerOfLocationSearch()
      setSearchOnEnter(false);
    }
  };


  const handleSearch = () => {
    if (currentData.trim() !== "") {
     props.searchLocationName(currentData)
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
      props.searchLocationName(transcript)
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

    return (
        <div class=" flex  items-center" >
          <Tooltip
        title={translatedMenuItems[0]}
      >
         <Badge
          size="small"
           count={(props.viewType === "card" && props.recordData.locCount) || 0}
          overflowCount={999}
        >
          <span class=" mr-1 !text-icon cursor-pointer"
            onClick={() => props.setLocationViewType("card")}
            style={{
          
              color: props.viewType === "card" && "#1890ff",            
            }}
          >
             <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#28a355" }}>
  
            <div className="text-white ">{translatedMenuItems[0]}</div>
            </Avatar>
          </span>
          </Badge>
      </Tooltip>

      <Tooltip
        title={translatedMenuItems[1]}
      
      >
           <Badge
          size="small"
          // count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span class=" mr-1 cursor-pointer text-[1rem]"
            onClick={() => props.setLocationViewType("map")}
            style={{
              color: props.viewType === "map" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "map" ? "#f279ab" : "#28a355" }}>
            <LanguageIcon  className="text-white !text-icon"
            // icon={solid('users')}
             />
             </Avatar>
          </span>
          </Badge>
      </Tooltip>

      <Tooltip title={translatedMenuItems[2]}>
      {/* "Inactive"> */}
                <Badge size="small"
                        count={(props.viewType === "delete" && props.locationDeletedCount.locCount) || 0}
                        overflowCount={999}
                    >
                        <span class="  mr-1 md:mr-1 text-sm cursor-pointer"
                            onClick={() => props.setLocationViewType("delete")}
                            style={{
                                color: props.viewType === "delete" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: props.viewType === "delete" ? "#f279ab" : "#28a355" }}>
                            <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  /></Avatar>

                        </span>
                    </Badge>
                </Tooltip>
                <div class=" w-64 max-sm:w-24">
                <Input
            placeholder="Search by Name"
            class="w-96"
            suffix={suffix}
            onPressEnter={handleSearch}
            onChange={handleChange}
            value={currentData}
          /></div>    

        </div>
    )
}
const mapStateToProps = ({ auth,location }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  recordData:location.recordData,
  locationDeletedCount:location.locationDeletedCount,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocationRecords,
      getLocationDeletedCount,
      searchLocationName,
      clearReducerOfLocationSearch
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LocationActionLeft)



