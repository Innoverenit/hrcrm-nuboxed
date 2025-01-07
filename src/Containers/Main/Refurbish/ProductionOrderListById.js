import React, { useState, lazy, Suspense, useEffect,useRef } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOrderByUser, handleOrderPhoneModal, qcInspectionButton,
    inputQcDataSearch,ClearSearchedDataOfQc,handleProductionNotesModal } from "./RefurbishAction"
import { Button, Badge ,Input, Tooltip} from "antd";
import dayjs from "dayjs";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import MicIcon from '@mui/icons-material/Mic';import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { BundleLoader } from '../../../Components/Placeholder';
import InfiniteScroll from 'react-infinite-scroll-component';
import RefurbishNoteAll from './RefurbishNoteAll';
import ContactsIcon from '@mui/icons-material/Contacts';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import UpdateIcon from '@mui/icons-material/Update';
import DateRangeIcon from '@mui/icons-material/DateRange';
const OrderPhoneModal = lazy(() => import('./OrderPhoneModal'));

function ProductionOrderListById(props) {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
    useEffect(() => {
        setPageNo(pageNo + 1);
        props.getOrderByUser(props.userId,pageNo)
        props.ClearSearchedDataOfQc()
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
          props.getOrderByUser(props.userId,pageNo)
          //props.ClearReducerDataOfLead()
          props.ClearSearchedDataOfQc()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.inputQcDataSearch(props.userId,currentData);
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
          props.inputQcDataSearch(props.userId,transcript);
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
      const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
          const fetchMenuTranslations = async () => {
            try {
              setLoading(true); 
              const itemsToTranslate = [
         
               "660", // "order",//0
                "760",  // "duedate",//1
                 "677", //   "Lead"2
                  "142",   // "Status"3
                  "1280",// ""Search by OrderID 4
                "100",  // New5
                 "316",  // "Notes"6
                 "1279",  // Start Inspection7
                 "1312",  // "Pause Inspection"8
                 "1313",  // "Resume Inspection"9
                  "1314", // Inspection Completed10
                 "144",  // In Progress11
              ];
      
              const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
              setTranslatedMenuItems(translations);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              console.error('Error translating menu items:', error);
            }
          };
      
          fetchMenuTranslations();
        }, [props.selectedLanguage]);

    const handleLoadMore = () => {
        const callPageMapd = props.orderByUser && props.orderByUser.length &&props.orderByUser[0].pageCount
        setTimeout(() => {
          const {
            getOrderByUser,
           // userDetails: { employeeId },
          } = props;
          if  (props.orderByUser)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getOrderByUser(props.userId,pageNo); 
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
    console.log(props.orderByUser)

    const [hide, sethide] = useState(true)
    const handlePauseResume = () => {
        sethide(!hide)
    }
    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div class=" w-64 max-sm:w-40">
        <Input
          placeholder={translatedMenuItems[4]}
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
      </div>

                    <div className=" flex max-sm:hidden  w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky  z-10">
                        <div className='w-[3.2rem] truncate max-md:w-[3.5rem] '></div>
                        <div className=" w-[18.92rem] truncate text-[#00A2E8] text-sm max-md:w-[18.92rem] "> 
                          <DynamicFeedIcon className='!text-icon mr-1'/>{translatedMenuItems[0]} ID</div>
                        <div className=" w-[11.121rem] truncate max-md:w-[16.12rem]">
                        <DateRangeIcon className="!text-icon  text-[#92dce5]"/> {translatedMenuItems[1]}
                        </div>
                        <div className=" w-[12.1rem] max-md:w-[14.1rem] ">
                        <ContactsIcon className='!text-icon  text-[#e4eb2f]'/> {translatedMenuItems[2]}
                        </div>

                        <div className="w-[10.8rem] truncate max-md:w-[10.8rem]">
                        <UpdateIcon className='!text-icon text-[#ff66b3]' /> {translatedMenuItems[3]}
                        </div>
                        <div className=" w-[10.1rem] truncate max-md:w-[10.1rem]"></div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.orderByUser.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingOrderByUser ? <div><BundleLoader/></div> : null}
                            height={"75vh"}
                            style={{ scrollbarWidth:"thin"}}
                            endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
                        >
                            {props.orderByUser.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div >
                                        <div className="flex rounded  mt-1 bg-white  items-center py-ygap max-sm:h-24 max-sm:justify-between max-sm:flex-col max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                          <div class="flex  max-sm:w-wk items-center">
                                            <div className=" flex border-l-2 h-8  border-green-500 bg-[#eef2f9] items-center md:w-[2.26rem] ">
                                              <div class="ml-gap flex items-center">
                                                    {item.priority === "High" && (
                                                        <div class="rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                    )}
                                                   
                                                    {item.priority === "Low" && (
                                                        <div class="rounded-[50%] h-6 w-6 bg-[teal]" ></div>
                                                    )}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[15.01rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.qcCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class="underline font-bold ml-gap text-xs text-[#1890ff] cursor-pointer w-[7rem] flex  max-sm:text-xs"

                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleOrderPhoneModal(true)
                                                            }}>
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>
                                                  
                                                    {date === currentdate ? (
                                                        <span
                                                           className=" text-[0.65rem] text-[tomato] font-bold"
                                                        >
                                                          {translatedMenuItems[5]}  {/* New */}
                                                        </span>
                                                    ) : null}
                                                </div>
                                              </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[14rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem]  max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins  max-sm:text-xs">
                                                        {item.dueDate === null ? "" : dayjs(item.dueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[5.61rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem]  max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs ml-gap font-poppins  max-sm:text-xs">
                                                        {item.lead}
                                                    </div>

                                                </div>

                                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[18.6rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem]  max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs ml-gap font-poppins  max-sm:text-xs">
                                                        {item.qcInProgressPhoneCount} {translatedMenuItems[11]}
                                                        {/* In Progress */}
                                                    </div>

                                                </div>
                                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[10.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs ml-gap font-poppins text-center  max-sm:text-xs">
                                                        {item.qcInspectionInd === 0 ?
                                                            <Button
                                                                className="w-32"
                                                                type="primary"
                                                                loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingQcInspectionButton}
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.qcInspectionButton({
                                                                        productionDispatchId: item.productionDispatchId,
                                                                        orderPhoneId: item.orderPhoneId,
                                                                        qcInspectionInd: 1
                                                                    }, item.orderPhoneId, props.userId)
                                                                }}
                                                            >
                                                              {translatedMenuItems[7]}  {/* Start Inspection */}

                                                            </Button> : item.qcInspectionInd === 1 ?
                                                                <Button className="w-32" onClick={handlePauseResume}>{hide ? translatedMenuItems[8] : translatedMenuItems[9]}</Button> : <div class="flex items-center justify-center text-white w-[10.2rem] h-8 bg-[#7dcfb6]">{translatedMenuItems[10]}</div>}

                                                    </div>
                                                </div>
                                                </div>
                                        
                                                <div className=" flex  w-wk items-center  h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row max-sm:w-auto max-sm:justify-between  justify-end">
                                                <div class="   text-green-600 font-poppins text-center  max-sm:text-2xl">
                                                    <Tooltip title={translatedMenuItems[6]}>
                                                        <NoteAltIcon
                                                            className="!text-icon cursor-pointer max-sm:!text-2xl"
                                                            // style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleProductionNotesModal(true);
                                                            }}
                                                        />

                                                    </Tooltip>
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
                    <OrderPhoneModal
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                        showPhoneList={props.showPhoneList}
                        handleOrderPhoneModal={props.handleOrderPhoneModal}
                        rowData={rowData}
                    />
                    <RefurbishNoteAll
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                     rowData={rowData}
                     productioNoteModal={props.productioNoteModal}
                    handleProductionNotesModal={props.handleProductionNotesModal}
                    />
                </Suspense>

            </div>
        </>
    )
}

const mapStateToProps = ({ refurbish, auth }) => ({
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    orderByUser: refurbish.orderByUser,
    updatingQcInspectionButton: refurbish.updatingQcInspectionButton,
    showPhoneList: refurbish.showPhoneList,
    fetchingOrderByUser: refurbish.fetchingOrderByUser,
    productioNoteModal: refurbish.productioNoteModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOrderByUser,
            handleOrderPhoneModal,
            qcInspectionButton,
            inputQcDataSearch,
            ClearSearchedDataOfQc,
            handleProductionNotesModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionOrderListById);




