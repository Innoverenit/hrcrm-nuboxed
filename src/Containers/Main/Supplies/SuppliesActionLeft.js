import React, { useEffect, useState,useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Badge, Avatar,Input } from "antd";
import { AudioOutlined } from '@ant-design/icons';
import {materialCategorySearch,getMaterialCategory, getSuppliesCount,getSuppliesDeletedCount,getSuppliesList,ClearReducerDataOfMaterial,inputSuppliesDataSearch } from "./SuppliesAction";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import CategoryIcon from '@mui/icons-material/Category';

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
    const minRecordingTime = 3000; // 3 seconds
    const timerRef = useRef(null);
    const dummy = ["cloud", "azure", "fgfdg"];

    const [currentCatData, setCurrentCatData] = useState("");

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
          setCurrentCatData(transcript);
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
        
            if (searchOnEnter&& e.target.value.trim() === "") {  //Code for Search
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

          const handleCatChange = (e) => {
            setCurrentCatData(e.target.value);
        
            if (searchOnEnter && e.target.value.trim() === "") {  //Code for Search
               
              props.getMaterialCategory();
              setSearchOnEnter(false);
            }
          };
          const handleCatSearch = () => {
            if (currentCatData.trim() !== "") {
              // Perform the search
              props.materialCategorySearch(currentCatData);
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
              setCurrentCatData(transcript);
              props.materialCategorySearch(transcript);
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
                            onClick={() => setSuppliesViewType("all")}text-sm
                            style={{

                                color: viewType === "all" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                                <div className="text-white ">ALL</div></Avatar>

                        </span>
                    </Badge>
                </Tooltip>
                <Tooltip title="Category">
        <div
          class=" ml-2 text-sm cursor-pointer"
          style={{

            color: viewType === "category" && "red",
          }}
          onClick={() => setSuppliesViewType("category")}
        >
          <Avatar style={{ background: viewType === "category" ? "#f279ab" : "#4bc076" }}>
            <CategoryIcon className="text-white cursor-pointer !text-icon" />
          </Avatar>

        </div>
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
                {viewType === "all" &&         
        <Input
          placeholder="Search by Name "
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />}
{viewType === "category" &&
<Input
          placeholder="Search by Category Name "
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleCatSearch}
          onChange={handleCatChange}
        value={currentCatData}
        />}
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
            getSuppliesList,
            getMaterialCategory,
            materialCategorySearch
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesActionLeft);
