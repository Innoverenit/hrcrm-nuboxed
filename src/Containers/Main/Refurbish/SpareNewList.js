import React, { useEffect, useState, lazy,useRef  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTabSpareList, handleRepairPhone,
     repairInspectionButton,
      getOrderIdForCatalogueItem ,
      searchSpareimeiName,ClearReducerSpare,handleProductionNotesModal
    } from "./RefurbishAction"
    import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Button, Badge,Input, Tooltip } from "antd";
import dayjs from "dayjs";
import BuildIcon from '@mui/icons-material/Build';
import ContactsIcon from '@mui/icons-material/Contacts';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import UpdateIcon from '@mui/icons-material/Update';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfiniteScroll from "react-infinite-scroll-component";
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import RefurbishNoteAll from "./RefurbishNoteAll";
import SpareDrawerOpen from "./SpareDrawerOpen";
import { BundleLoader } from "../../../Components/Placeholder";



function SpareNewList(props) {

    const [page, setPage] = useState(0);
    const [spareOpen , setSpareOpen]= useState(false)
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
        props.getTabSpareList(page)
        props.ClearReducerSpare()
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
          props.getTabSpareList(page)
          //props.ClearReducerDataOfLead()
          props.ClearReducerSpare()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchSpareimeiName(currentData);
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
          props.searchSpareimeiName(transcript);
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
        const callPageMapd = props.tabSpareList && props.tabSpareList.length &&props.tabSpareList[0].pageCount
        setTimeout(() => {
          const {
            getTabSpareList, 
          } = props;
          if  (props.tabSpareList)
          {
            if (page < callPageMapd) { 
              setPage(page + 1);
              getTabSpareList( page);
          }
          if (page === callPageMapd){
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
            <div className=' flex  sticky  z-auto'>
                <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div class=" w-64 max-sm:w-40">
        <Input
          placeholder="Search By Imei & OrderId"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
      </div>
                    <div className=" flex max-sm:hidden w-[100%] p-1 bg-transparent font-bold font-poppins !text-lm sticky  z-10">
                        <div className="w-[3.5rem] max-md:w-[3.5rem]"></div>
                        <div className=" w-[18.92rem]  text-sm max-md:w-[18.92rem]">
                        Imei
                          </div>
                          <div className="w-[10.12rem] max-md:w-[16.12rem]"> <DynamicFeedIcon className='!text-icon mr-1  text-[#3F37C9]'/> OrderID</div>
                       
                        <div className=" w-[16.12rem] max-md:w-[14.1rem]">
                        <DateRangeIcon className='!text-icon   text-[#92dce5]'  /> Submitted
                         {/* Due Date/> */}
                        </div>               
                        <div className=" w-[14.1rem] max-md:w-[14.1rem]">
                        <ContactsIcon className='!text-icon mr-1  text-[#e4eb2f]'/>Approved
                        {/* (Date&Multiavtar) */}
                        </div>
                        <div className="w-[10.8rem] max-md:w-[10.8rem]">
                        <UpdateIcon className='!text-icon text-[#ff66b3]' />  Spares
                          </div>
                        <div className="w-[10.1rem] max-md:w-[10.8rem]"></div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.tabSpareList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingTabSpareList ? <div><BundleLoader/></div> : null}
                            height={"75vh"}
                            style={{ scrollbarWidth:"thin"}}
                        >
                            {props.tabSpareList.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div>
                                        <div className="flex rounded justify-between mt-1 bg-white items-center py-ygap-1  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
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
                                                   
                                                        <span class="underline text-xs text-[#1890ff] font-bold cursor-pointer w-[7rem] flex  max-sm:text-xs"
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleRepairPhone(true)
                                                            }}>
                                                            {item.imei}
                                                        </span>
                                                  
                                                    &nbsp;&nbsp;
                                                    {date === currentdate ? (
                                                        <span class="text-[tomato] font-bold text-xs">
                                                          {translatedMenuItems[5]}  {/* New */}
                                                        </span>
                                                    ) : null}
                                                </div>
                        

                                              
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
                                           
                                                

                                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[10.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins  max-sm:text-xs">
                                                        {item.reason}
                                                    </div>
                                                </div>
                                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[10.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins  max-sm:text-xs">
                                                       < BuildIcon     className="!text-icon cursor-pointer  max-sm:!text-2xl" onClick={() => {
                              setSpareOpen(true);
                              handleRowData(item);
                            }}/>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                            <div className=" flex  items-center w-wk h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row max-sm:w-auto max-sm:justify-between justify-end ">
                                                <div class="  text-green-600 font-poppins text-center  max-sm:text-2xl">
                                                    <Tooltip title={translatedMenuItems[6]}>
                                                        <NoteAltIcon
                                                            className="!text-icon cursor-pointer  max-sm:!text-2xl"
                                                          
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
            
                 <RefurbishNoteAll
                 translateText={props.translateText} 
                 selectedLanguage={props.selectedLanguage}
                     rowData={rowData}
                     productioNoteModal={props.productioNoteModal}
                    handleProductionNotesModal={props.handleProductionNotesModal}
                    />
                     <SpareDrawerOpen
                 translateText={props.translateText} 
                 selectedLanguage={props.selectedLanguage}
                     rowData={rowData}
                     spareOpen={spareOpen}
                     setSpareOpen={setSpareOpen}
                    />
            </div>
        </>
    )



}


const mapStateToProps = ({ refurbish, auth }) => ({
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    choosenOrderCatalogue: refurbish.choosenOrderCatalogue,
    tabSpareList: refurbish.tabSpareList,
    fetchingTabSpareList: refurbish.fetchingTabSpareList,
    showRepairPhoneList: refurbish.showRepairPhoneList,
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
    productioNoteModal: refurbish.productioNoteModal,
    updatingRepairInspectionButton: refurbish.updatingRepairInspectionButton
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTabSpareList,
            handleRepairPhone,
            repairInspectionButton,
            getOrderIdForCatalogueItem,
            searchSpareimeiName,
            ClearReducerSpare,
            handleProductionNotesModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SpareNewList);



