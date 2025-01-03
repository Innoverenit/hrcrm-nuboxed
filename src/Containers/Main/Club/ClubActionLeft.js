import React,{useEffect,useState,useRef,Suspense} from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect, StyledTabs } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { connect } from "react-redux";
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, Input, Tooltip,Badge } from "antd";
import MicIcon from '@mui/icons-material/Mic';
import ClubTableAll from "./ClubTableAll";
import { TabsWrapper } from "../../../Components/UI/Layout";

const Option = StyledSelect.Option;
const TabPane = StyledTabs.TabPane;

function ClubActionLeft (props) {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
    const [pageNo, setPage] = useState(0);
    const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
  const [departmentData, setDepartmentData] = useState({});

  const handleOnClick = (data) => {
    console.log(data);
    debugger;
    setDepartmentData(data);
  };


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
            setClubViewType,
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
//               // Perform the search
//               props.inputTradeSearch(currentData);
//               setSearchOnEnter(true);  //Code for Search
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
//             <MicIcon
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
//               // If recording was stopped but less than 5 seconds have passed, restart listening
//               const elapsedTime = Date.now() - startTime;
//               if (elapsedTime < minRecordingTime) {
//                 SpeechRecognition.startListening();
//               } else {
//                 setIsRecording(false);
//               }
//             }
//           }, [listening, isRecording, startTime]);
console.log(departmentData.clubName)
        return (
            <div class="flex items-center">
  {/* <StyledTabs type="card">
        {props.clubShareData.map((member, i) => (
          <TabPane key={i} tab={
            <span onClick={() => handleOnClick(member)}>
              {member.clubName}
            </span>
          }>
            {departmentData.clubId && (
              <Suspense fallback={"Loading..."}>
                <div>
                <ClubTableAll clubId={departmentData.clubId} />
                </div>
              </Suspense>
            )}
          </TabPane>
        ))}
      </StyledTabs> */}
                <Tooltip
                    title="ALL" >

                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => setClubViewType("table")}
                        style={{
                            color: viewType === "table" && "#1890ff",
                        }}
                    >

<Avatar style={{ background: viewType === "table" ? "#f279ab" : "#28a355" }}>
             ALL
              </Avatar>
                    </span>
                  
                </Tooltip>

             
                <div class=" ml-6 h-6 w-60 max-sm:w-[11rem]">
                <Input
          placeholder="Search by Name"
          width={"100%"}
         // suffix={suffix}
         // onPressEnter={handleSearch}
          //onChange={handleChange}
        value={currentData}
        />
             
      
     

                </div>
              
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
        //   inputTradeSearch,
        //   ClearReducerDataOfTrade,
        //   getInventoryAlllist
            // setSuppliersDashboardType,
            // setSelectedTimeInterval,
            // setTimeRange,
            // getSupplierCount,
            // getSupplierAllCount,
            // getSupplierDeletedCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ClubActionLeft);
