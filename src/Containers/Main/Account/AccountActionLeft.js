import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge, Avatar, Input } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { inputDataSearch,ClearSearchedDataOfAccount,getAllDistributorsList, getRecords,getCustomerByUser, getAccountRecords, getAllRecords, getDistributorCount ,} from "./AccountAction";
import MicIcon from '@mui/icons-material/Mic';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AccountActionLeft = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
    const [pageNo, setPage] = useState(0);
    const [page, setpage] = useState(0);
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
           if (props.viewType === "list") {
            props.getCustomerByUser(props.userId, pageNo);     
        }
        else if (props.viewType === "all") {
            props.getAllDistributorsList(props.orgId,page);
        }
           props.ClearSearchedDataOfAccount()
            setSearchOnEnter(false);
        }
    };
    const handleSearch = () => {
        if (currentData.trim() !== "") {
            // Perform the search
            // props.inputDataSearch(currentData);
            if (props.viewType === "list") {
                props.inputDataSearch(currentData,'user')
            }
            else if (props.viewType === "all") {
                props.inputDataSearch(currentData,'all')
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
          if (props.viewType === "list") {
            props.inputDataSearch(transcript,'user')
        }
        else if (props.viewType === "all") {
            props.inputDataSearch(transcript,'all')
        }
        //   props.inputDataSearch(transcript);
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
                                <Avatar 
                                style={{ background: props.viewType === "list" ? "#f279ab" : "#28a355",
                                    boxShadow: props.viewType === "list" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                                      transform: props.viewType === "list" ? "scale(1.05)" : "scale(1)"}}
                    
                                >
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
                                <Avatar 
                                style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355",
                                    boxShadow: props.viewType === "all" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                                      transform: props.viewType === "all" ? "scale(1.05)" : "scale(1)"}}>
                    
                               
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
                        <Avatar   style={{ background: props.viewType === "dashboard" ? "#f279ab" : "#28a355",
                                    boxShadow: props.viewType === "dashboard" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                                      transform: props.viewType === "dashboard" ? "scale(1.05)" : "scale(1)"}}>
                            <DeleteOutlineIcon className="text-white !text-icon" /></Avatar>

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
    orgId: auth.userDetails.organizationId,
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
            getAllDistributorsList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountActionLeft);
