import React,{useEffect,useState,useRef} from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../Components/UI/Antd";
import { bindActionCreators } from "redux";
// import {
//     inputTradeSearch,ClearReducerDataOfTrade,getInventoryAlllist
// } from "./TradeAction";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { connect } from "react-redux";
import { Avatar, Input, Tooltip,Badge, Button } from "antd";

import { AudioOutlined } from "@ant-design/icons"

const Option = StyledSelect.Option;

function QulityActionLeft (props) {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
    const [pageNo, setPage] = useState(0);
    const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

    // useEffect(() => {
    //     if (props.viewType === "card") {
    //       props.getSupplierCount(props.userId);
    //     } else if (props.viewType === "all") {
    //       props.getSupplierAllCount(props.orgId);
    //     } 
    //     else if (props.viewType === "delete") {
    //       props.getSupplierDeletedCount(props.orgId);
    //     } 
    //   }, [props.viewType, props.userId, props.orgId]);
    
        const {
            user,
            viewType,
            handleViewChange,
        } = props;
// const {
//         transcript,
//         listening,
//         resetTranscript,
//         browserSupportsSpeechRecognition
//       } = useSpeechRecognition();
//       useEffect(() => {
//         if (transcript) {
//           console.log(">>>>>>>", transcript);
//           setCurrentData(transcript);
//         }
//         }, [ transcript]);
//         const handleChange = (e) => {
//             setCurrentData(e.target.value);
        
//             if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
//               //setPage(pageNo + 1);
//                props.getInventoryAlllist(props.orgId, pageNo)
//                props.ClearReducerDataOfTrade()
//               setSearchOnEnter(false);
//             }
//           };
//           const handleSearch = () => {
//             if (currentData.trim() !== "") {
             
//               props.inputTradeSearch(currentData);
//               setSearchOnEnter(true);  
//             } else {
//               console.error("Input is empty. Please provide a value.");
//             }
//           };
//           const handleStartListening = () => {
//             setStartTime(Date.now());
//             setIsRecording(true);
//             SpeechRecognition.startListening();
//             if (timerRef.current) {
//               clearTimeout(timerRef.current);
//             }
//             timerRef.current = setTimeout(() => {
//               SpeechRecognition.stopListening();
//               setIsRecording(false);
//             }, minRecordingTime);
//           };
//           const suffix = (
//             <AudioOutlined
//             onClick={handleStartListening}
//               style={{
//                 fontSize: 16,
//                 color: '#1890ff',
//               }}
        
//             />
//           );
//           const handleStopListening = () => {
//             SpeechRecognition.stopListening();
//             setIsRecording(false);
//             if (transcript.trim() !== "") {
//               setCurrentData(transcript);
//               props.inputTradeSearch(transcript);
//               setSearchOnEnter(true);
//             }
//           };
//           useEffect(() => {
//             if (!listening && isRecording) {
//               handleStopListening();
//             }
//           }, [listening]);
//           useEffect(() => {
//             if (isRecording && !listening) {
             
//               const elapsedTime = Date.now() - startTime;
//               if (elapsedTime < minRecordingTime) {
//                 SpeechRecognition.startListening();
//               } else {
//                 setIsRecording(false);
//               }
//             }
//           }, [listening, isRecording, startTime]);

        return (
            <div class="flex items-center">
 {props.user.moduleMapper.productionInd === true && (
                <Tooltip
                    title="Production">
{/* <Badge
          size="small"
          count={(props.viewType === "table" && props.countSupplier.supplierCount) || 0}
          overflowCount={999}
        > */}
                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => handleViewChange("production")}
                        style={{
                            color: viewType === "production" && "#1890ff",
                        }}
                    >

<Button type={viewType === "production" ? "primary" : ""} style={{ backgroundColor: viewType === "production" ? "" : "tomato" }}>
<div class="text-white">Production</div></Button>

                    </span>
                    {/* </Badge> */}
                </Tooltip>
)}
{props.user.qualityAccessInd === true && (
                <Tooltip
                    title="Reapir">
{/* <Badge
          size="small"
          count={(props.viewType === "table" && props.countSupplier.supplierCount) || 0}
          overflowCount={999}
        > */}
                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => handleViewChange("repair")}
                        style={{
                            color: viewType === "repair" && "#1890ff",
                        }}
                    >

<Button type={viewType === "repair" ? "primary" : ""} style={{ backgroundColor: viewType === "repair" ? "" : "tomato" }}>
<div class="text-white">Repair</div></Button>

                    </span>
                    {/* </Badge> */}
                </Tooltip>
)}
                &nbsp;&nbsp;
                {/* <div class=" ml-6 h-6 w-60 max-sm:w-[11rem]">
                <Input
          placeholder="Search by Brand or Model"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
                  

                </div> */}

            </div>
        );
}

const mapStateToProps = ({ auth, suppliers }) => ({
    user: auth.userDetails,
    orgId: auth.userDetails.organizationId,
    
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
         
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(QulityActionLeft);
