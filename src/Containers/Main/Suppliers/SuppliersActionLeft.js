import React,{useEffect,useState,useRef} from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import {
    inputDataSearch, setSuppliersDashboardType, setSelectedTimeInterval,
    setTimeRange,getSupplierCount,getSupplierAllCount,
    getSupplierDeletedCount,
    ClearSearchedDataOfSupplier,
    getSuppliersList
} from "./SuppliersAction";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { connect } from "react-redux";
import { Avatar, Input, Tooltip,Badge } from "antd";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from "@ant-design/icons"
import ChecklistIcon from '@mui/icons-material/Checklist';

const Option = StyledSelect.Option;

function SuppliersActionLeft (props) {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
    const [page, setPage] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false); //Code for Search
    const minRecordingTime = 3000; // 3 seconds
    const timerRef = useRef(null);

    useEffect(() => {
        if (props.viewType === "card") {
          props.getSupplierCount(props.userId);
        } else if (props.viewType === "all") {
          props.getSupplierAllCount(props.orgId);
        } 
        else if (props.viewType === "delete") {
          props.getSupplierDeletedCount(props.orgId);
        } 
      }, [props.viewType, props.userId, props.orgId]);
    
        const {
            user,
            viewType,
            setSuppliersViewType,
        } = props;
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
    
      const handleChange = (e) => {
        setCurrentData(e.target.value);
    
        if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
          //setPage(pageNo + 1);
          props.getSuppliersList(props.userId, page);
          props.ClearSearchedDataOfSupplier()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          //props.inputDataSearch(currentData);
          if (props.viewType === "card") {
            props.inputDataSearch(currentData,'card');
          } else if (props.viewType === "all") {
            props.inputDataSearch(currentData,'all');
          } 
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
          if (props.viewType === "card") {
            props.inputDataSearch(transcript,'card');
          } else if (props.viewType === "all") {
            props.inputDataSearch(transcript,'all');
          } 
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
            <div class="flex items-center">

                <Tooltip
                    title={props.translatedMenuItems[4]}>
<Badge
          size="small"
          count={(props.viewType === "card" && props.countSupplier.supplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" mr-1 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("card")}
                        style={{
                            color: viewType === "card" && "#1890ff",
                        }}
                    >

                        <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#4bc076" }}>
                            < ChecklistIcon className="text-white !text-icon" /></Avatar>

                    </span></Badge>
                </Tooltip>


                <Tooltip title={`${props.translatedMenuItems[4]}-${props.translatedMenuItems[5]}`}>
                <Badge
          size="small"
          //count={(props.viewType === "not approved" && props.allCountSupplier.AllSupplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" mr-1 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("not approved")}
                        style={{
                            color: viewType === "not approved" && "#1890ff",
                        }}
                    >
                       <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                       <TocIcon className="text-white !text-icon" />
                            </Avatar> 

                    </span>
                    </Badge>
                </Tooltip>

                <Tooltip title={props.translatedMenuItems[6]}>
                <Badge
          size="small"
          count={(props.viewType === "all" && props.allCountSupplier.AllSupplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" mr-1 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("all")}
                        style={{
                            color: viewType === "all" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                            <div className="text-white">
                              {/* ALL */}{props.translatedMenuItems[6]}
                              </div></Avatar>

                    </span>
                    </Badge>
                </Tooltip>
                <Tooltip title={`${props.translatedMenuItems[4]}-${props.translatedMenuItems[7]}`}>
                <Badge
          size="small"
          count={(props.viewType === "delete" && props.deletedCountSupplier.deletedSupplier) || 0}
          overflowCount={999}
        >
                    <span class=" mr-1 !text-icon cursor-pointer"
                        onClick={() => setSuppliersViewType("delete")}
                        style={{
                            color: viewType === "delete" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "delete" ? "#f279ab" : "#4bc076" }}>
                        <DeleteOutlined className="text-white" /></Avatar>

                    </span>
                    </Badge>
                </Tooltip>

                &nbsp;&nbsp;
                <div class=" ml-6 h-6 w-60 max-sm:w-[11rem]">
                <Input
          placeholder={props.translatedMenuItems[8]}
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
                  

                </div>

            </div>
        );
}

const mapStateToProps = ({ auth, suppliers }) => ({
    user: auth.userDetails,
    dateRangeList: suppliers.dateRangeList,
    startDate: suppliers.startDate,
    endDate: suppliers.endDate,
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    countSupplier:suppliers.countSupplier,
    allCountSupplier:suppliers.allCountSupplier,
    deletedCountSupplier:suppliers.deletedCountSupplier,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            inputDataSearch,
            setSuppliersDashboardType,
            setSelectedTimeInterval,
            setTimeRange,
            getSupplierCount,
            getSupplierAllCount,
            getSupplierDeletedCount,
            ClearSearchedDataOfSupplier,
            getSuppliersList
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliersActionLeft);
