import React,{useEffect,useState,useRef} from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    inputDataSearch, setSuppliersDashboardType, setSelectedTimeInterval,
    setTimeRange,getSupplierCount,getSupplierAllCount,getSupplierCountNot,
    getSupplierDeletedCount,
    ClearSearchedDataOfSupplier,
    getSuppliersList
} from "./SuppliersAction";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { connect } from "react-redux";
import { Avatar, Input, Tooltip,Badge } from "antd";
import MicIcon from '@mui/icons-material/Mic';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Shop2Icon from '@mui/icons-material/Shop2'; 

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
        else if (props.viewType === "not approved") {
          props.getSupplierCountNot(props.userId);
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
         // props.getSuppliersList(props.userId, page);
          props.ClearSearchedDataOfSupplier()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          //props.inputDataSearch(currentData);
          if (props.viewType === "table") {
            props.inputDataSearch(currentData,'user');
          }
          else if (props.viewType === "card") {
            props.inputDataSearch(currentData,'Card');
          } else if (props.viewType === "all") {
            props.inputDataSearch(currentData,'All');
          } 
          else if (props.viewType === "not approved") {
            props.inputDataSearch(currentData,'not approved');
          } else if (props.viewType === "delete") {
            props.inputDataSearch(currentData,'delete');
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
          if (props.viewType === "table") {
            props.inputDataSearch(transcript,'table');
          } else if (props.viewType === "card") {
            props.inputDataSearch(transcript,'card');
          } else if (props.viewType === "all") {
            props.inputDataSearch(transcript,'all');
          } 
          else if (props.viewType === "not approved") {
            props.inputDataSearch(transcript,'not approved');
          } else if (props.viewType === "delete") {
            props.inputDataSearch(transcript,'delete');
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
                    title={props.translatedMenuItems[42]}>
<Badge
          size="small"
          count={(props.viewType === "table" && props.countSupplier.supplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" mr-1 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("table")}
                        style={{
                            color: viewType === "table" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "table" ? "#f279ab" : "#28a355" ,
               boxShadow: props.viewType === "table" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "table" ? "scale(1.05)" : "scale(1)"}}>
                            < Shop2Icon className="text-white !text-icon" /></Avatar>

                    </span></Badge>
                </Tooltip>

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
                        <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#28a355" ,
               boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"}}>
                            < ChecklistIcon className="text-white !text-icon" /></Avatar>

                    </span></Badge>
                </Tooltip>

                <Tooltip title={`${props.translatedMenuItems[4]}-${props.translatedMenuItems[5]}`}>
                <Badge
          size="small"
          count={(props.viewType === "not approved" && props.countSupplierNot.supplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" mr-1 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("not approved")}
                        style={{
                            color: viewType === "not approved" && "#1890ff",
                        }}
                    >
                       <Avatar style={{ background: viewType === "not approved" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "not approved" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "not approved" ? "scale(1.05)" : "scale(1)" }}>
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
                        <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "all" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "all" ? "scale(1.05)" : "scale(1)" }}>
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
                        <Avatar style={{ background: viewType === "delete" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "delete" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "delete" ? "scale(1.05)" : "scale(1)" }}>
                      <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  /></Avatar>
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
    countSupplierNot:suppliers.countSupplierNot
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            inputDataSearch,
            setSuppliersDashboardType,
            setSelectedTimeInterval,
            setTimeRange,
            getSupplierCount,
            getSupplierCountNot,
            getSupplierAllCount,
            getSupplierDeletedCount,
            ClearSearchedDataOfSupplier,
            getSuppliersList
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliersActionLeft);
