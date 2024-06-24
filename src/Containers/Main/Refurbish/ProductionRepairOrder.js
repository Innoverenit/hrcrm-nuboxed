import React, { useEffect, useState, lazy,useRef  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRepairOrderByUser, handleRepairPhone,
     repairInspectionButton,
      getOrderIdForCatalogueItem ,
      inputProcessDataSearch,ClearSearchedDataOfProcess
    } from "./RefurbishAction"
import { Button, Badge,Input } from "antd";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../Components/Placeholder";
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';

const OrderPhoneRepairModal = lazy(() => import('./OrderPhoneRepairModal'));

function ProductionRepairOrder(props) {

    const [page, setPage] = useState(0);
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

    useEffect(() => {
        setPage(page + 1);
        props.getRepairOrderByUser(props.userId)
    }, [])
    const [hasMore, setHasMore] = useState(true);


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
          props.getRepairOrderByUser(props.userId)
          //props.ClearReducerDataOfLead()
          props.ClearSearchedDataOfProcess()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.inputProcessDataSearch(currentData);
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
          props.inputProcessDataSearch(transcript);
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



    const handleLoadMore = () => {
        setPage(page + 1);
        props.getRepairOrderByUser(props.userId)
    };

    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    console.log(props.orderByUser)

    const [hide, sethide] = useState(true)
    const handlePauseResume = () => {
        sethide(!hide)
    }
    return (
        <>
            <div className=' flex  sticky  z-auto'>
                <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div class=" w-64 max-sm:w-24">
        <Input
          placeholder="Search by OrderNo "
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
      </div>
                    <div className=" flex max-sm:hidden w-[100%] p-1 bg-transparent font-bold sticky  z-10">
                        <div className="w-[10.5rem]"></div>
                        <div className=" w-[21.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Order ID</div>
                        <div className=" w-[27.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.duedate"
                            defaultMessage="duedate"
                        />
                        </div>
                        <div className=" md:w-[18.8rem] ">
                            <FormattedMessage
                                id="app.lead"
                                defaultMessage="Lead"
                            />
                        </div>
                        <div className="w-[20.6rem]">Status</div>
                        <div className="w-[0.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.repairOrder.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingRepairorderById ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.repairOrder.map((item) => {
                                const currentdate = moment().format("DD/MM/YYYY");
                                const date = moment(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div>
                                        <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"   >
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium w-[7.2rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                                {item.priority === "High" && (
                      <div class="rounded-[50%] h-[2rem] w-[2rem] bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="rounded-[50%] h-[2rem] w-[2rem] bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="rounded-[50%] h-[2rem] w-[2rem] bg-[teal]" ></div>
                    )}
                    </div>
                                                <div className=" flex font-medium  w-[17.4rem] max-xl:w-[17.8rem] max-lg:w-[14rem] max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.repairCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class="underline text-sm text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleRepairPhone(true)
                                                            }}>
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>
                                                    &nbsp;&nbsp;
                                                    {date === currentdate ? (
                                                        <span class="text-[tomato] font-bold text-sm">
                                                            New
                                                        </span>
                                                    ) : null}
                                                </div>
                        

                                                <div className=" flex font-medium   w-[21rem] max-xl:w-[15rem] max-lg:w-[9rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.repairDueDate === null ? "" : moment(item.repairDueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                                {/* <div className=" flex font-medium  md:w-[37.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins">
                                                    {item.repairCompletePhoneCount}/{item.totalPhone}
                                                </div>
                                            </div> */}
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium  md:w-[15.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-sm  font-poppins">

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   w-[8.6rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.repairInProgressPhoneCount} {item.repairStatus}
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium justify-center w-[8rem] max-xl:w-[19rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                                    <div class=" text-sm  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.repairInspectionInd === 0 ?
                                                            <Button
                                                                style={{ width: "8rem" }}
                                                                type="primary"
                                                                loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingRepairInspectionButton}
                                                                onClick={() => {
                                                                    handleRowData(item);
                                                                    props.repairInspectionButton({
                                                                        repairInspectionInd: 1,
                                                                        orderPhoneId: item.orderPhoneId,
                                                                        productionRepairDispatchId: item.productionRepairDispatchId
                                                                    },
                                                                        item.orderPhoneId,

                                                                        props.userId)
                                                                }}
                                                            >Start Repair</Button> :
                                                            item.repairInspectionInd === 1 ?
                                                                <Button style={{ width: "8rem" }}
                                                                    onClick={handlePauseResume}>
                                                                    {hide ? "Pause Repair" : "Resume Repair"}</Button> : <div class="text-green-600">Completed</div>}

                                                    </div>
                                                </div>

                                                <div className=" flex font-medium  w-[.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.reason}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
                <OrderPhoneRepairModal
                    showRepairPhoneList={props.showRepairPhoneList}
                    handleRepairPhone={props.handleRepairPhone}
                    rowData={rowData}
                    inspectionRequiredInd={props.inspectionRequiredInd}
                />
            </div>
        </>
    )



}

const mapStateToProps = ({ refurbish, auth }) => ({
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    choosenOrderCatalogue: refurbish.choosenOrderCatalogue,
    repairOrder: refurbish.repairOrder,
    fetchingRepairorderById: refurbish.fetchingRepairorderById,
    showRepairPhoneList: refurbish.showRepairPhoneList,
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
    updatingRepairInspectionButton: refurbish.updatingRepairInspectionButton
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRepairOrderByUser,
            handleRepairPhone,
            repairInspectionButton,
            getOrderIdForCatalogueItem,
            inputProcessDataSearch,
            ClearSearchedDataOfProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionRepairOrder);



