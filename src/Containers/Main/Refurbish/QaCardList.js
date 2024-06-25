import React, { useState, lazy, Suspense, useEffect,useRef } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getQAorderlist,updateQAinspection
     } from "./RefurbishAction"
import { Button, Badge ,Input} from "antd";
import dayjs from "dayjs";
import {handlePickupDateModal,updateDispatchInspectionButton} from "../../../Containers/Main/Inventory/InventoryAction"
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { BundleLoader } from '../../../Components/Placeholder';
import InfiniteScroll from 'react-infinite-scroll-component';
import DispatchPhoneListModal from '../Inventory/Child/InventoryDetails/Dispatch/DispatchPhoneListModal';
import RefurbishToggle from './RefurbishToggle';



function QaCardList(props) {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
    useEffect(() => {
        // setPageNo(pageNo + 1);
        props.getQAorderlist(props.locationId,pageNo)
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
          props.getQAorderlist(props.locationId,pageNo)
          //props.ClearReducerDataOfLead()
          props.ClearSearchedDataOfQc()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.inputQcDataSearch(currentData);
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
          props.inputQcDataSearch(transcript);
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
        const callPageMapd = props.QAorderList && props.QAorderList.length &&props.QAorderList[0].pageCount
        setTimeout(() => {
          const {
            getQAorderlist,
           // userDetails: { employeeId },
          } = props;
          if  (props.QAorderList)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getQAorderlist(props.locationId,pageNo); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };

    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }

    const [hide, sethide] = useState(true)
    const handlePauseResume = () => {
        sethide(!hide)
    }
    return (
        <>
            <div className=' flex sticky  z-auto'>
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

                    <div className=" flex max-sm:hidden  w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                        <div className='w-[7.2rem]'></div>
                        <div className=" w-[9.92rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Order ID</div>
                        <div className="w-[7.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.001rem]"><FormattedMessage id="app.inspection" defaultMessage="Inspection" /></div>
                        <div className=" w-[36.121rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.duedate"
                            defaultMessage="duedate"
                        /></div>
                        {/* <div className=" w-[34.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.lead"
                            defaultMessage="Lead"
                        /></div> */}

                        {/* <div className="w-[10.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.status"
                            defaultMessage="status"
                        /></div> */}
                        <div className=" w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Move to Dispatch</div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.QAorderList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingQAorderlist ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                            endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
                        >
                            {props.QAorderList.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div >
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium w-[4.7rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
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
                                                <div className=" flex font-medium w-[12.01rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.dispatchPhoneCount} / ${item.phoneReceiveCount}`} overflowCount={5000}>
                                                        <span class="underline text-sm text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"

                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handlePickupDateModal(true)
                                                            }}>
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>
                                                    &nbsp;&nbsp;
                                                    {date === currentdate ? (
                                                        <span
                                                            class="text-[tomato] font-bold ml-4 text-sm"
                                                        >
                                                            New
                                                        </span>
                                                    ) : null}
                                                </div>
                                                
<div className=" flex font-medium flex-col w-[6.5rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchInspectionInd === 0 ?
                                <Button
                                  loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingDispatchInspectionButton}
                                  onClick={() => {
                                    handleRowData(item);
                                   // props.updateQAinspection
                                   props.updateDispatchInspectionButton({ dispatchInspectionInd: 1 }, item.orderPhoneId, props.locationDetailsId)
                                  }}
                                  style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
                                  Start
                                </Button>
                                : item.dispatchInspectionInd === 2 ||
                                  item.dispatchInspectionInd === 3 ||
                                  item.dispatchInspectionInd === 4 ?
                                  <div class=" text-[green]">Completed</div>
                                  : item.dispatchInspectionInd === 1 ?
                                    <div class=" text-[tomato]">
                                  In Progress
                                    </div> :
                                    null}
                            </div>
                          </div>
                                                <div className=" flex font-medium   w-[34rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.dueDate === null ? "" : dayjs(item.dueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium   w-[5.61rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.lead}
                                                    </div>

                                                </div>

                                                {/* <div className=" flex font-medium   w-[18.6rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.qcInProgressPhoneCount} In Progress
                                                    </div>

                                                </div> */}
                                                {/* <div className=" flex font-medium  w-[10.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.qcInspectionInd === 0 ?
                                                            <Button
                                                                className="w-32"
                                                                type="primary"
                                                                loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingQAinspection}
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.qcInspectionButton({
                                                                        productionDispatchId: item.productionDispatchId,
                                                                        orderPhoneId: item.orderPhoneId,
                                                                        qcInspectionInd: 1
                                                                    }, item.orderPhoneId, props.userId)
                                                                }}
                                                            >
                                                                Start Inspection

                                                            </Button> : item.qcInspectionInd === 1 ?
                                                                <Button className="w-32" onClick={handlePauseResume}>{hide ? "Pause Inspection" : "Resume Inspection"}</Button> : <div class="text-green-600">Inspection Completed</div>}

                                                    </div>
                                                </div> */}
                                                 <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <RefurbishToggle        
                                  orderPhoneId={item.orderPhoneId}
                                  newDispatchInd={item.newDispatchInd}
                                />
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
                <Suspense fallback={<BundleLoader />}>
                    {/* <OrderPhoneModal
                        showPhoneList={props.showPhoneList}
                        handleOrderPhoneModal={props.handleOrderPhoneModal}
                        rowData={rowData}
                    /> */}
                    <DispatchPhoneListModal
        rowData={rowData}
        handlePickupDateModal={props.handlePickupDateModal}
        openPickupDateModal={props.openPickupDateModal}
      />
                </Suspense>

            </div>
        </>
    )
}

const mapStateToProps = ({ refurbish, auth ,inventory}) => ({
    locationId: auth.userDetails.locationId,
    // userId: auth.userDetails.userId,
    openPickupDateModal: inventory.openPickupDateModal,
    QAorderList: refurbish.QAorderList,
    updatingQAinspection: refurbish.updatingQAinspection,
    // showPhoneList: refurbish.showPhoneList,
    fetchingQAorderlist: refurbish.fetchingQAorderlist
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getQAorderlist,
            updateQAinspection,
            handlePickupDateModal,
            updateDispatchInspectionButton
            // qcInspectionButton,
            // inputQcDataSearch,
            // ClearSearchedDataOfQc
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(QaCardList);




