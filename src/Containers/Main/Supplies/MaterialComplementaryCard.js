import React, { useState, useEffect, Suspense, lazy,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliesList,
  getComplementaryList
} from "./SuppliesAction";
import { Input } from "antd";

import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import ComplementaryToggle from "./ComplementaryToggle";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import PinIcon from '@mui/icons-material/Pin';
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import ContactsIcon from '@mui/icons-material/Contacts';
import WidgetsIcon from '@mui/icons-material/Widgets';

const { Search } = Input;

function MaterialComplementaryCard(props) {

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [openComplementary,setopenComplementary] = useState(false);

  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); 
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const componentRefs = useRef([]);
  const handlePrint = () => {
    window.print();
};
  useEffect(() => {
    setPage(page + 1);
    props.getComplementaryList(page,props.particularDiscountData.suppliesId);

  }, []);

  const handleLoadMore = () => {
    const PageMapd = props.complementaryList && props.complementaryList.length && props.complementaryList[0].pageCount
    setTimeout(() => {
      const {
        getComplementaryList,

        userId
      } = props;
      if (props.complementaryList) {
        if (page < PageMapd) {
          setPage(page + 1);
          getComplementaryList(page,props.particularDiscountData.suppliesId);
        }
        if (page === PageMapd) {
          setHasMore(false)
        }
      }
    }, 100);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "799",//0
          "800",//1
          "110",//2
          "1283",//3"Search by HSN and Name "
       
         "14" , // category
         "1154" , //  Sub category 
         "259" ,//  Attribute 
         "263" ,//  Sub Attribute 
          
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  const { updateSuppliesDrawer,
     handleUpdateSupplieDrawer,
      materialBuildrawer, 
      handleMaterialBuilderDrawer,
      handlePriceModal } = props;

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
          if (searchOnEnter&& e.target.value.trim() === "") {  //Code for Search
             props.getPhonelistByOrderId(props.rowData.orderPhoneId, "0");
             props.ClearReducerData();
            setSearchOnEnter(false);
          }
        };
        const handleSearch = () => {
          if (currentData.trim() !== "") {
            // Perform the search
             props.searchOpenOrdeReceived(currentData);
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
            props.searchOpenOrdeReceived(transcript);
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
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < minRecordingTime) {
              SpeechRecognition.startListening();
            } else {
              setIsRecording(false);
            }
          }
        }, [listening, isRecording, startTime]);

  return (
    <>
     <Input
          placeholder= {translatedMenuItems[3]}
          style={{width:"30%"}}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />


      <div className=" flex sticky z-auto mt-2">
        <div class="rounded m-1 max-sm:m-1 p-1 h-[80vh] w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between  p-1 bg-transparent font-poppins !text-lm font-bold items-end sticky  z-10">
           
            
            
            <div className=" w-[9.1rem] truncate max-md:w-[4rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Hsn*/}
              < PinIcon className=" !text-icon"/>  {translatedMenuItems[0]}
              </div>
              <div className=" w-[14.2rem]  truncate max-md:w-[4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Name */}
              <ContactsIcon className="!text-icon mr-1 "/> {translatedMenuItems[2]}
              </div>
              <div className=" w-[13.3rem] truncate max-md:w-[4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* category*/}
              <WidgetsIcon className='!text-icon    text-[#42858c]' /> {translatedMenuItems[4]}
              </div>        
              <div className=" w-[21.4rem] truncate max-md:w-[4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Attribute */}
              <AttractionsIcon className="  !text-icon" />  {translatedMenuItems[6]}
              </div>
            

          </div>

          <InfiniteScroll
            dataLength={props.complementaryList.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingComplementaryList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"75vh"}
            style={{ scrollbarWidth:"thin" }}
          >
            {props.complementaryList.length ?
              <>
                {props.complementaryList.map((item,index) => {
                  const currentDate = dayjs().format("DD/MM/YYYY");
                  
                  return (
                    <>
                      <div className="flex rounded justify-center bg-white mt-1    py-ygap max-sm:h-[7.5rem] max-sm:flex-col  hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[9rem] items-center border-l-2 border-green-500 max-md:w-[12rem] bg-[#eef2f9] h-8 max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {/* {item.HsnId} */}
                              </div>
                            </div>
                            <div className=" flex  w-[15rem] items-center justify-start h-8 ml-gap bg-[#eef2f9]  max-md:w-[15rem]  max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.suppliesFullName}
                              </div>
                            </div>
                            <div className=" flex  w-[13rem] items-center ml-gap max-md:w-[15rem] h-8 bg-[#eef2f9] max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {/* {item.category} */}
                              </div>
                            </div>
                            <div className=" flex  w-[14rem] items-center ml-gap max-md:w-[15rem] h-8 bg-[#eef2f9] max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {/* {item.Attribute} */}
                              </div>
                            </div>
                          </div>

                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex h-8 ml-gap bg-[#eef2f9] justify-center   items-center  w-[7.1rem]  max-md:w-[7.1rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs truncate max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              <ComplementaryToggle
                                  complementaryInd={item.complementaryInd}
                                  suppliesId={item.suppliesId}
                                  complementaryItem={props.particularDiscountData.suppliesId}
                                />
                              </div>
                            </div>

                           
                          </div>
                         

                        </div>
                      </div>
                    </>
                  );
                })}
              </> :
              !props.complementaryList.length
                && !props.fetchingComplementaryList ? <NodataFoundPage /> : null}
          </InfiniteScroll>
        </div>
      </div>

      <Suspense fallback={<BundleLoader />}>
      
      </Suspense>

    </>
  );
}


const mapStateToProps = ({ supplies, auth }) => ({
  fetchingPurchaseList: supplies.fetchingPurchaseList,
  fetchingComplementaryList: supplies.fetchingComplementaryList,
  purchaseList: supplies.purchaseList,
  updateSuppliesDrawer: supplies.updateSuppliesDrawer,
  addCurrencyValue: supplies.addCurrencyValue,
  addBrandModel: supplies.addBrandModel,
  materialBuildrawer: supplies.materialBuildrawer,
  repairInd: auth.userDetails.repairInd,
  suppliersListDrwr: supplies.suppliersListDrwr,
  materialInveDawer:supplies.materialInveDawer,
  priceOpenModal: supplies.priceOpenModal,
  orgId: auth.userDetails.organizationId,
   complementaryList: supplies.complementaryList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliesList,
      getComplementaryList
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialComplementaryCard);
  