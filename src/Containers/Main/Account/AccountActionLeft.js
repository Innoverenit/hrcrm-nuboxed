import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge, Avatar, Input } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { inputDataSearch,ClearSearchedDataOfAccount, getRecords,getCustomerByUser, getAccountRecords, getAllRecords, getDistributorCount ,} from "./AccountAction";
import { DeleteOutlined, AudioOutlined } from "@ant-design/icons";

const AccountActionLeft = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
    const [pageNo, setPage] = useState(0);
    const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); 
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
  const dummy = ["cloud", "azure", "fgfdg"];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

    const { user, } = props;
    useEffect(() => {
        if (props.viewType === "list") {
            props.getRecords(props.userId);
        } else if (props.viewType === "card") {
            props.getDistributorCount(props.userId);
        }
        else if (props.viewType === "all") {
            props.getAccountRecords();
        }
    }, [props.viewType, props.userId]);

   
    useEffect(() => {
        // props.getCustomerRecords();
        if (transcript) {
            console.log(">>>>>>>", transcript);
            setCurrentData(transcript);
        }
    }, [transcript]);
    const handleChange = (e) => {
        setCurrentData(e.target.value);

        if (searchOnEnter && e.target.value.trim() === "") {  //Code for Search
            // setPage(pageNo + 1);
            props.getCustomerByUser(props.userId, pageNo);
           props.ClearSearchedDataOfAccount()
            setSearchOnEnter(false);
        }
    };
    const handleSearch = () => {
        if (currentData.trim() !== "") {
            // Perform the search
            props.inputDataSearch(currentData);
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
          props.inputDataSearch(transcript);
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
  
      console.log(currentData)
      const teamCount = props.teamsAccessInd && props.leadsTeamCountData ? props.leadsTeamCountData.leadsTeam : 0;
    

    return (
        <div class="flex items-center" >
            <div class=" ">
                {user.functionName !== "Customer Care" && (

                    <Tooltip title="My Customer View">
                        <Badge size="small"
                            count={props.recordData.distributor || 0}
                        >
                            <span class=" mr-1 text-sm cursor-pointer"
                                onClick={() => props.setDistributorViewType("list")}
                                style={{
                                    color: props.viewType === "list" && "#1890ff",
                                }}
                            >
                                <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#4bc076" }}>
                                    <TocIcon className="text-white !text-icon" /></Avatar>

                            </span>
                        </Badge>
                    </Tooltip>

                )}
            </div>

            {user.accountFullListInd === true && user.erpInd === true && (
                <div class=" ">
                    <Tooltip title="All">
                        <Badge size="small"
                            count={props.accountRecordData.distributor || 0}
                        >
                            <span class=" mr-1 !text-icon cursor-pointer"
                                onClick={() => props.setDistributorViewType("all")}
                                style={{
                                    color: props.viewType === "all" && "#1890ff",
                                }}
                            >
                                <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                                    <div class="text-white ">ALL</div></Avatar>

                            </span>
                        </Badge>
                    </Tooltip>
                </div>
            )}
            <Tooltip title="My Deleted-Customer">
                <Badge size="small"
                // count={props.accountRecordData.distributor || 0}
                >
                    <span class=" mr-1 text-sm cursor-pointer"
                        onClick={() => props.setDistributorViewType("dashboard")}
                        style={{
                            color: props.viewType === "dashboard" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: props.viewType === "dashboard" ? "#f279ab" : "#4bc076" }}>
                            <DeleteOutlined className="text-white " /></Avatar>

                    </span>
                </Badge>
            </Tooltip>

            <div class=" w-64 max-sm:w-24">
                <Input
                    placeholder="Search by Name or Sector"
                    width={"100%"}
                    suffix={suffix}
                    onPressEnter={handleSearch}
                    onChange={handleChange}
                    value={currentData}
                /></div>
            {/* &nbsp; &nbsp;
            {props.viewType === "table" ?
                (
                    <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
                        # Records -{" "}{props.recordData.distributor || 0}{" "}
                    </div>
                )
                : props.viewType === "all" ?
                    (
                        <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
                            # Records -{" "}{props.recordAllData.distributor || 0}{" "}
                        </div>
                    ) : null} */}

            {/* &nbsp;&nbsp;
            {props.viewType === "table" ?
                (
                    <div>
                        <>
                            <b> {dayjs().format("ll")}  </b>
                            &nbsp;&nbsp;
                            <b>||&nbsp;&nbsp;Balance : ₹ {`${cost}`}  </b>
                            &nbsp;&nbsp;
                            <b>||&nbsp;&nbsp;Outstanding : ₹ {`${costA}`}</b>
                            &nbsp;&nbsp;
                        </>
                    </div>
                )
                : props.viewType === "all" ?
                    (

                        <div>
                            <>
                                <b> {dayjs().format("ll")}  </b>
                                &nbsp;&nbsp;
                                <b>||&nbsp;&nbsp;Balance : ₹ {`${cost1}`}  </b>
                                &nbsp;&nbsp;
                                <b>||&nbsp;&nbsp;Outstanding : ₹ {`${costB}`}</b>
                                &nbsp;&nbsp;
                            </>
                        </div>
                    ) : null} */}
        </div>
    );
};

const mapStateToProps = ({ auth, distributor }) => ({
    user: auth.userDetails,
    customerListByUser: distributor.customerListByUser,
    allDistributorCount: distributor.allDistributorCount,
    accountRecordData: distributor.accountRecordData,
    recordData: distributor.recordData,
    recordAllData: distributor.recordAllData,
    userId: auth.userDetails.userId,
    distributorsByUserId: distributor.distributorsByUserId,
    allDistributors: distributor.allDistributors,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCustomerByUser,
            inputDataSearch,
            getRecords,
            getAccountRecords,
            getAllRecords,
            getDistributorCount,
            ClearSearchedDataOfAccount,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountActionLeft);
