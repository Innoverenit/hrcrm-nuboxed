import React, { useState, lazy, Suspense, useEffect,useRef } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getQAorderlist,updateQAinspection, ClearSearchedDataOfQa,
  updateDispatchInspectionButton,handleProductionNotesModal
     } from "./RefurbishAction"
import { Button, Badge ,Input, Tooltip} from "antd";
import dayjs from "dayjs";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import {handlePickupDateModal} from "../../../Containers/Main/Inventory/InventoryAction"
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { BundleLoader } from '../../../Components/Placeholder';
import InfiniteScroll from 'react-infinite-scroll-component';
import DispatchPhoneListModal from '../Inventory/Child/InventoryDetails/Dispatch/DispatchPhoneListModal';
import RefurbishToggle from './RefurbishToggle';
import RefurbishNoteAll from './RefurbishNoteAll';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LightbulbIcon from '@mui/icons-material/Lightbulb';




function QaCardList(props) {
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
        "660",  // "Order",//0
        "780", // "Inspection",//1
        "760", // "Due Date",//2
        "781",  // "Move To Dispatch",//3     
         "1280",   // Search by OrderNo  
         "100",  // New
         "158",  // Start
         "78",  // Completed
         "144", // In Progress
         "316", // "Notes"
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
        // setPageNo(pageNo + 1);
        props.getQAorderlist(props.locationId,pageNo)
        props.ClearSearchedDataOfQa()
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
          props.ClearSearchedDataOfQa()
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
    if (loading) {
      return <div><BundleLoader/></div>;
    }

    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div class=" w-64 max-sm:w-24">
        <Input
          placeholder={translatedMenuItems[4]}
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
      </div>

                    <div className=" flex max-sm:hidden  w-[100%]  p-1 bg-transparent font-bold sticky text-xs font-poppins  z-10">
                        <div className='w-[6rem]'></div>
                        <DynamicFeedIcon className='!text-base  text-[#e4eb2f]'
                        /> 
                        <div className=" w-[10.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[0]}  
                         
                          {/* Order ID */}
                          </div>
                        <LightbulbIcon className="!text-icon text-[#84a59d]"/>
                        <div className="w-[17.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.001rem]">
                        {translatedMenuItems[1]}
                        {/* Inspection */}
                          </div>
                        <div className=" w-[28.121rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {translatedMenuItems[2]} 
                        {/* Due Date */}
                        </div>                                        
                        <div className=" w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {translatedMenuItems[3]} 
                          {/* Move to Dispatch */}
                          </div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.QAorderList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingQAorderlist ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"81vh"}
                            style={{ scrollbarWidth:"thin"}}
                            endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                        >
                            {props.QAorderList.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div >
                                        <div className="flex justify-between rounded  mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex border-l-2 h-8 border-green-500 bg-[#eef2f9] w-[4.7rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                                    {item.priority === "High" && (
                                                        <div class="rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                    )}
                                                    {item.priority === "Medium" && (
                                                        <div class="rounded-[50%] h-6 w-6 bg-[orange]" ></div>
                                                    )}
                                                    {item.priority === "Low" && (
                                                        <div class="rounded-[50%] h-6 w-6 bg-[teal]" ></div>
                                                    )}
                                                </div>
                                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[12.01rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.dispatchPhoneCount} / ${item.phoneReceiveCount}`} overflowCount={5000}>
                                                        <span class="underline font-bold text-xs text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"

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
                                                            class="text-[tomato] font-bold ml-4 text-[0.65rem]"
                                                        >
                                                           {translatedMenuItems[5]} 
                                                             {/* New */}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                
                        <div className=" flex w-[6.5rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.dispatchInspectionInd === 0 ?
                                <Button
                                  loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingDispatchInspectionButton}
                                  onClick={() => {
                                    handleRowData(item);
                                   // props.updateQAinspection
                                   props.updateDispatchInspectionButton({ dispatchInspectionInd: 1 }, item.orderPhoneId, props.locationDetailsId)
                                  }}
                                  style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
                                 {translatedMenuItems[6]}   {/* Start */}
                                </Button>
                                : item.dispatchInspectionInd === 2 ||
                                  item.dispatchInspectionInd === 3 ||
                                  item.dispatchInspectionInd === 4 ?
                                  <div class=" text-[green]">  {translatedMenuItems[7]}</div>
                                  : item.dispatchInspectionInd === 1 ?
                                    <div class=" text-[tomato]">
                                 {translatedMenuItems[8]}   {/* In Progress */}
                                    </div> :
                                    null}
                            </div>
                          </div>
                                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[27rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.dueDate === null ? "" : dayjs(item.dueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[25.61rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.lead}
                                                    </div>
                                                    </div>
                                                   
                                                 <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                               
                                <RefurbishToggle        
                                  orderPhoneId={item.orderPhoneId}
                                  newDispatchInd={item.newDispatchInd}
                                  item={item}
                                />
                              </div>
                            </div>
                            <div class="   flex w-wk items-center h-8 ml-gap bg-[#eef2f9] justify-end text-green-600 font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title=  {translatedMenuItems[9]}>
                                                        <NoteAltIcon
                                                            className="!text-icon cursor-pointer"
                                                           
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
                    {/* <OrderPhoneModal
                        showPhoneList={props.showPhoneList}
                        handleOrderPhoneModal={props.handleOrderPhoneModal}
                        rowData={rowData}
                    /> */}
                      <RefurbishNoteAll
                     rowData={rowData}
                     productioNoteModal={props.productioNoteModal}
                    handleProductionNotesModal={props.handleProductionNotesModal}
                    />
                    <DispatchPhoneListModal
                      translateText={props.translateText}
                      selectedLanguage={props.selectedLanguage}
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
    fetchingQAorderlist: refurbish.fetchingQAorderlist,
    productioNoteModal: refurbish.productioNoteModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getQAorderlist,
            updateQAinspection,
            handlePickupDateModal,
            updateDispatchInspectionButton,
            // qcInspectionButton,
            // inputQcDataSearch,
            ClearSearchedDataOfQa,
            handleProductionNotesModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(QaCardList);




