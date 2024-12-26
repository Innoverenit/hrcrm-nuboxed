import React, { useEffect, useState, lazy,useRef  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRepairOrderByUser, handleRepairPhone,
     repairInspectionButton,
      getOrderIdForCatalogueItem ,
      inputProcessDataSearch,ClearSearchedDataOfProcess,handleProductionNotesModal
    } from "./RefurbishAction"
    import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Button, Badge,Input, Tooltip } from "antd";
import dayjs from "dayjs";
import ContactsIcon from '@mui/icons-material/Contacts';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import UpdateIcon from '@mui/icons-material/Update';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfiniteScroll from "react-infinite-scroll-component";
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import RefurbishNoteAll from "./RefurbishNoteAll";
import { BundleLoader } from "../../../Components/Placeholder";

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
             "1315",  // Start Repair7
             "1316",  // "Pause repair"8
             "1317",  // "Resume repair"9
              "78", // Completed10
             
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
    useEffect(() => {
        setPage(page + 1);
        props.getRepairOrderByUser(props.userId)
        props.ClearSearchedDataOfProcess()
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
          props.inputProcessDataSearch(props.userId,currentData);
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
          props.inputProcessDataSearch(props.userId,transcript);
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
                    <div className=" flex max-sm:hidden w-[100%] p-1 bg-transparent font-bold font-poppins !text-lm sticky  z-10">
                        <div className="w-[3.5rem] max-md:w-[3.5rem] "></div>
                        <div className=" w-[18.92rem] max-md:w-[18.92rem] ">
                        <DynamicFeedIcon className='!text-base mr-1  text-[#3F37C9]'/>  {translatedMenuItems[0]} ID {/* Order ID */}
                          </div>
                        <div className=" w-[16.12rem] max-md:w-[16.12rem] ">
                        <DateRangeIcon className='!text-icon text-[#92dce5] '  /> {translatedMenuItems[1]} 
                         {/* Due Date/> */}
                        </div>
                        <div className=" w-[14.1rem] max-md:w-[14.1rem]">
                        <ContactsIcon className='!text-base mr-1  text-[#e4eb2f]'/>{translatedMenuItems[2]}  {/*"Lead" /> */}
                        </div>
                        <div className="w-[10.8rem] max-md:w-[10.8rem]">
                        <UpdateIcon className='!text-icon text-[#ff66b3]' />   {translatedMenuItems[3]} {/* Status */}
                          </div>
                        <div className="w-[10.1rem] max-md:w-[10.1rem]"></div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.repairOrder.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingRepairorderById ? <div><BundleLoader/></div> : null}
                            height={"75vh"}
                            style={{ scrollbarWidth:"thin"}}
                        >
                            {props.repairOrder.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div>
                                        <div className="flex rounded justify-between mt-1 bg-white items-center py-ygap max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"   >
                                            <div class="flex  max-sm:w-wk items-center">
                                            <div className=" flex border-l-2 h-8 border-green-500 bg-[#eef2f9] md:w-[2.26rem]">
                                                {item.priority === "High" && (
                      <div class="rounded-[50%] h-6 w-6 bg-[red]"></div>
                    )}
                  
                    {item.priority === "Low" && (
                      <div class="rounded-[50%] h-6 w-6 bg-[teal]" ></div>
                    )}
                    </div>
                                            <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[15.01rem] max-xl:w-[17.8rem] max-lg:w-[14rem] max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.repairCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class="underline text-xs text-[#1890ff] font-bold cursor-pointer w-[7rem] flex  max-sm:text-xs"
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleRepairPhone(true)
                                                            }}>
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>
                                                    &nbsp;&nbsp;
                                                    {date === currentdate ? (
                                                        <span class="text-[tomato] font-bold text-xs">
                                                          {translatedMenuItems[5]}  {/* New */}
                                                        </span>
                                                    ) : null}
                                                </div>
                        

                                                {/* <div className=" flex font-medium  md:w-[37.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins">
                                                    {item.repairCompletePhoneCount}/{item.totalPhone}
                                                </div>
                                            </div> */}
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                              
                                            <div className=" flex w-[14rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[15rem] max-lg:w-[9rem]  max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins  max-sm:text-xs">
                                                        {item.repairDueDate === null ? "" : dayjs(item.repairDueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                                
                                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[18.6rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins  max-sm:text-xs">
                                                        {item.repairInProgressPhoneCount} {item.repairStatus}
                                                    </div>

                                                </div>
                                           
                                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[10.2rem] max-xl:w-[19rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center  max-sm:text-xs">
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
                                                            >
                                                             {translatedMenuItems[7]} {/* Start Repair */}
                                                              </Button> :
                                                            item.repairInspectionInd === 1 ?
                                                                <Button style={{ width: "8rem" }}
                                                                    onClick={handlePauseResume}>
                                                                    {hide ?  translatedMenuItems[8] :  translatedMenuItems[9]}</Button> : <div class="flex items-center justify-center text-white w-[10.2rem] h-8 bg-[#7dcfb6]"> {translatedMenuItems[10]}</div>}

                                                    </div>
                                                </div>

                                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[10.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins  max-sm:text-xs">
                                                        {item.reason}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" flex  items-center w-wk h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row max-sm:w-auto max-sm:justify-between justify-end ">
                                                <div class="  text-green-600 font-poppins text-center  max-sm:text-2xl">
                                                    <Tooltip title={translatedMenuItems[6]}>
                                                        <NoteAltIcon
                                                            className="!text-icon cursor-pointer  max-sm:!text-2xl"
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
                <OrderPhoneRepairModal
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
                    showRepairPhoneList={props.showRepairPhoneList}
                    handleRepairPhone={props.handleRepairPhone}
                    rowData={rowData}
                    inspectionRequiredInd={props.inspectionRequiredInd}
                />
                 <RefurbishNoteAll
                 translateText={props.translateText} 
                 selectedLanguage={props.selectedLanguage}
                     rowData={rowData}
                     productioNoteModal={props.productioNoteModal}
                    handleProductionNotesModal={props.handleProductionNotesModal}
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
    productioNoteModal: refurbish.productioNoteModal,
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
            ClearSearchedDataOfProcess,
            handleProductionNotesModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionRepairOrder);



