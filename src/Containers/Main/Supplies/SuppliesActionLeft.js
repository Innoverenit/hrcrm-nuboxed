import React, { useEffect, useState,useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Badge, Avatar,Input } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import { AudioOutlined } from '@ant-design/icons';
import { getSuppliesCount,getSuppliesDeletedCount,getSuppliesList,ClearReducerDataOfMaterial,inputSuppliesDataSearch } from "./SuppliesAction";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';

function SuppliesActionLeft (props) {

  useEffect(() => {
    if (props.viewType === "all") {
      props.getSuppliesCount();
    } else if (props.viewType === "dashboard") {
      props.getSuppliesDeletedCount(props.userId);
    }
  }, [props.viewType, props.userId]);

   
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 
    const [pageNo, setPage] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false); 
    const minRecordingTime = 5000; // 5 seconds
    const timerRef = useRef(null);
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

        const {
            viewType,
            setSuppliesViewType,
            suppliesCount,
            suppliesDeletedCount,
        } = props;

        const handleChange = (e) => {
            setCurrentData(e.target.value);
        
            if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
              setPage(pageNo + 1);
               props.getSuppliesList(pageNo);
              props.ClearReducerDataOfMaterial()
              setSearchOnEnter(false);
            }
          };
          const handleSearch = () => {
            if (currentData.trim() !== "") {
              // Perform the search
               props.inputSuppliesDataSearch(currentData);
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
              props.inputSuppliesDataSearch(transcript);
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
            <>
         
            <div class="flex items-center">

                <Tooltip title="All Materials">
                    <Badge size="small"
                        count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                    >
                        <span class=" md:mr-2 text-sm cursor-pointer"
                            onClick={() => setSuppliesViewType("all")}
                            style={{

                                color: viewType === "all" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                                <div className="text-white">All</div></Avatar>

                        </span>
                    </Badge>
                </Tooltip>


                <Tooltip title="Deleted Materials">
                <Badge size="small"
                        count={(viewType === "dashboard" && suppliesDeletedCount.deleteCount) || 0}
                        overflowCount={999}
                    >
                        <span class=" md:mr-2 text-sm cursor-pointer"
                            onClick={() => setSuppliesViewType("dashboard")}
                            style={{
                                color: viewType === "dashboard" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "dashboard" ? "#f279ab" : "#4bc076" }}>
                                <DeleteOutlined className="text-white" /></Avatar>

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
</>
        );
}
const mapStateToProps = ({ supplies }) => ({
    suppliesCount: supplies.suppliesCount,
    suppliesDeletedCount:supplies.suppliesDeletedCount,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSuppliesCount,
            getSuppliesDeletedCount,
            inputSuppliesDataSearch,
            ClearReducerDataOfMaterial,
            getSuppliesList
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesActionLeft);
