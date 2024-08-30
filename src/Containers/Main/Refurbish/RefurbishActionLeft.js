import React,{useEffect,useState,useRef} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Avatar, Tooltip,Badge,Input } from "antd";
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import {
  getRefurbishAllCount,
  inputAllDataSearch,
  ClearSearchedDataOfAll

} from "../Refurbish/RefurbishAction"
import { FlexContainer } from "../../../Components/UI/Layout";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

function RefurbishActionLeft (props) {
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  useEffect(() => {
      if (props.viewType === "card") {
        props.getSupplierCount(props.userId);
      } else if (props.viewType === "all") {
        props.getRefurbishAllCount(props.userId);
      } 
   
    }, [props.viewType, props.userId, props.orgId]);
  
      const {
          user,
          viewType,
          setProductionViewType,
      } = props;

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
          //setPage(pageNo + 1);
        //  props.getLeads(props.userId, pageNo, "creationdate");
          //props.ClearReducerDataOfLead()
          props.ClearSearchedDataOfAll()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.inputAllDataSearch(currentData);
          setSearchOnEnter(true);  //Code for Search
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
        <AudioOutlined
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
          props.inputAllDataSearch(transcript);
          setSearchOnEnter(true);
        }
      };
      useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
             "663",//0 My Repair Orders
              "228",//1 ALL
             "1280",    //  "Search by OrderID"
           
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
          <>
            <FlexContainer alignItems="center">
    
              {/* {user.designation === "Executive" && */}
    
    
              <Tooltip title={translatedMenuItems[0]}>
                <span class=" text-sm cursor-pointer"
                  onClick={() => setProductionViewType("list")}
                  style={{
                    color: viewType === "list" && "#1890ff",
                  }}
                >
                  <Avatar style={{ background: viewType === "list" ? "#f279ab" : "#4bc076" }}>
                    <HomeRepairServiceIcon className="text-white cursor-pointer !text-icon" /></Avatar>
    
                </span>
              </Tooltip>
              <Tooltip title="All">
              <Badge
          size="small"
          count={(viewType === "all" && props.allCountRefurbish.allRefurbish) || 0}
          overflowCount={999}
        >
              <span class=" ml-2 text-sm cursor-pointer"
                onClick={() => setProductionViewType("all")}
                style={{
                  color: viewType === "all" && "#1890ff",
                }}
              >
                <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                  <div className="text-white">{translatedMenuItems[1]}</div></Avatar>  
                  {/* ALL */}
    
              </span>
              </Badge>
              </Tooltip>
{viewType === "all"?
              <div class=" w-64 max-sm:w-24 ml-2">
        <Input
          placeholder={translatedMenuItems[2]}
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
      </div>
      :null}


            </FlexContainer>
    
          </>
        );
}
const mapStateToProps = ({ auth, refurbish }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  allCountRefurbish:refurbish.allCountRefurbish,
  searchRefurbish: refurbish.searchRefurbish
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getRefurbishAllCount,
  inputAllDataSearch,
  ClearSearchedDataOfAll
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishActionLeft);
