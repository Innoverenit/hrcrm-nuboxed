import React, { useEffect, useState,lazy, Suspense,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DatePicker } from "antd";
import {
    getPurchaseSuppliersList,
    handlePoLocationModal,
    handlePoListModal,
    handleTermsnConditionModal,
    addCurrencyInPo,
    updatePOContact,
    getSupplierContactList,getSearchPo,ClearPoData
} from "../../../SuppliersAction"
import { Button, Select, Tooltip,Input } from 'antd';
import dayjs from "dayjs";
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { TerminalSharp } from "@mui/icons-material";
import { getCurrency } from "../../../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Shop2Icon from '@mui/icons-material/Shop2'; 

const EmptyPage  = lazy(() => import("../../../../EmptyPage"));
const PoLocationModal  = lazy(() => import("./PoLocationModal"));
const POSupplierDetailsModal  = lazy(() => import("./POSupplierDetailsModal"));
const TermsnConditionModal  = lazy(() => import("./TermsnConditionModal"));
const { Option } = Select;

function PurchaseOrderTable(props) {

  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [contact, setContact] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
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
   
          // "PO", //0
          "77",   // "Owner",//0
          "658",  // "Location",//1
           "772", // "Delivery",//2
           "73", // "Contact",//3
            "241",// "Currency ",//4
           "218", // "Value",//5
           "1246" ,//update 6
            "1438",//Move To Inventory 7
            "1439",//Terms and consdtions 
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
        props.getCurrency()
        props.getSupplierContactList(props.supplier.supplierId);
        props.getPurchaseSuppliersList(props.supplier.supplierId);
    }, []);
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [currency, setCurrency] = useState("")
    const [showIcon, setShowIcon] = useState(false)
    const handleCurrencyField = () => {
        setShowIcon(!showIcon)

    }

    const handleUpdate = (poSupplierDetailsId) => {
        const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') + 'T00:00:00Z' : null;
        const data = {
            expectDeliveryDate:formattedDate,
          poContactPersonId:contact,
          poCurrency: currency
          
        };
        props.updatePOContact(data, poSupplierDetailsId);
    
        setEditedFields((prevFields) => ({ ...prevFields, [poSupplierDetailsId]: undefined }));
        setEditContactId(null);
      };
    const handleEditClick = (poSupplierDetailsId, itemContact,expectDeliveryDate,poCurrency) => {
       
        setEditContactId(poSupplierDetailsId);
        setContact(itemContact)
        setSelectedDate(expectDeliveryDate);
        setCurrency(poCurrency)
      };

      const handleCancelClick = (poSupplierDetailsId) => {
        setEditedFields((prevFields) => ({ ...prevFields, [poSupplierDetailsId]: undefined }));
        setEditContactId(null);
      };
    const handleChangeCurrency = (value) => {
        setCurrency(value)
    }
    const handleCallback = () => {
        setShowIcon(false)
        setCurrency("")
    }

    const handleContactChange = async (value) => {
        setContact(value);
       
      };

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };

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
        props.getPurchaseSuppliersList(props.supplier.supplierId);
        props.ClearPoData()
        setSearchOnEnter(false);
      }
    };
    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.getSearchPo(props.supplier.supplierId,currentData);
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
        props.getSearchPo(props.supplier.supplierId,transcript);
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




    return (
        <>
            <div className=' flex  sticky z-auto flex-col'>
            <div class=" w-64 max-sm:w-40 mt-2">
        <Input
          placeholder="Search By PO ID"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
      </div>
                <div class="rounded m-1 p-1 w-[99%] mt-3  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[99%]  p-1 bg-transparent  font-bold font-poppins !text-lm items-end sticky z-10">
                        <div className=" w-[11.1rem] text-[#00A2E8] text-sm truncate  max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                        <Shop2Icon className="mr-1 !text-icon"/>PO ID
                            </div>
                        <div className=" w-[4.1rem]  truncate max-md:w-[10.1rem]  max-xl:text-[0.65rem] max-xl:w-[9.1rem]">
                      <AccountCircleIcon className=" !text-icon text-[#b2452a]"/>  {translatedMenuItems[0]}    {/* Created" /> */}
                        </div>
                        <div className=" w-[12.7rem]  truncate  max-md:w-[13.12rem] max-xl:text-[0.65rem] max-xl:w-[9.1rem]">
                        <LocationOnIcon className=" !text-icon text-[#e63946]"/> {translatedMenuItems[1]} {/* Location" /> */}
                        </div>
                        <div className=" w-[12.8rem]  truncate  max-md:w-[13.12rem]  max-xl:text-[0.65rem] max-xl:w-[9.12rem]">
                        <LocationOnIcon className=" !text-icon text-[#e63946]"/> {translatedMenuItems[2]}  {/* Delivery */}
                        </div>
                        <div className=" w-[13.11rem]  truncate   max-md:w-[17.11rem] max-xl:text-[0.65rem] max-xl:w-[9.12rem]">
                        <ContactPageIcon className=" !text-icon text-[#1d3557]"/>  {translatedMenuItems[3]} {/* Contact */}
                        </div>
                                           
                        <div className=" w-[31.14rem]  truncate  max-md:w-[23.14rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                        <CurrencyExchangeIcon className=" !text-icon text-[#ffd60a]"/> {translatedMenuItems[5]} 
                         {/* Value" */}
                        </div>
                                  
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.purchaseList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingPurchaseSupplierList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"77vh"}
                            style={{scrollbarWidth:"thin"}}
                        >
                           
                           { !props.fetchingPurchaseSupplierList && props.purchaseList.length === 0 ?<EmptyPage />:props.purchaseList.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between py-ygap  mt-1 bg-white scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] " >
                                                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                    <div className=" flex border-l-2 h-8 border-green-500 bg-[#eef2f9]  w-[14.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="ml-gap underline font-bold max-xl:text-[0.65rem] text-xs  font-poppins flex items-center">
                                                            <span
                                                                class=" text-sky-700 cursor-pointer"
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.handlePoListModal(true)
                                                                }}>
                                                                {item.newPoNumber}
                                                            </span>
                                                            {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato]">
                                                                    New
                                                                </div>
                                                            ) : null}

                                                        </div>
                                                    </div>
                                                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[5.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs h-8  font-poppins flex items-center">
                                                            <MultiAvatar
                                                                primaryTitle={item.userName}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[16.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" max-xl:text-[0.65rem] ml-gap text-xs  font-poppins">

                                                            {item.locationName}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[16rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs ml-gap font-poppins">
                  {editContactId === item.poSupplierDetailsId ? (
                                         <DatePicker
                                         style={{marginLeft:"0.5rem"}}
                                       // defaultValue={dayjs(item.borrowDate)}
               value={selectedDate ? dayjs(selectedDate) : null} 
               onChange={(date, dateString) => setSelectedDate(dateString)}
               picker="date" 
             />
                  ) : (
                    <div className="font-normal text-xs  font-poppins">
 
                        {item.expectDeliveryDate ? dayjs(item.expectDeliveryDate).format("DD/MM/YYYY") : ""}
                        </div>
                  )}
                </div>
              </div>

                                                    <div className="flex items-center justify-start h-8 ml-gap bg-[#eef2f9] md:w-[17rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs ml-gap font-poppins">
                  {editContactId === item.poSupplierDetailsId ? (
               <select
               className="customize-select"
               style={{ width: "70%" }}
               value={contact}
               onChange={(e) => handleContactChange(e.target.value)}
             >
               <option value="" >Select a contact</option>
               {props.contactSupplier.map((contactItem, contactIndex) => (
                 <option key={contactIndex} value={contactItem.contactPersonId}>
                   {contactItem.firstName} {contactItem.lastName}
                 </option>
               ))}
             </select>
                  ) : (
                    <div className=" text-xs font-poppins">{item.poContactPersonName}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[17rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.poSupplierDetailsId ? (
               <select
               className="customize-select"
               style={{ width: "70%" }}
               value={currency}
                                                                

               onChange={(e) => handleChangeCurrency(e.target.value)}
             >
               <option value="" >Select Currency</option>
               {props.currencies.map((currencyItem, currencyIndex) => (
                 <option key={currencyIndex} value={currencyItem.currency_name}>
                   {currencyItem.currency_name} 
                 </option>
               ))}
             </select>
                  ) : (
                    <div className=" text-xs  font-poppins">{item.poCurrency}  {item.poValue}</div>
                  )}
                </div>
              </div>
                                                       
                                                    <div className="flex w-[6rem] max-sm:flex-row max-sm:w-auto items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                <div className="flex">
                  {editContactId === item.poSupplierDetailsId ? (
                    <>
                      <Button onClick={() => handleUpdate(item.poSupplierDetailsId)}>
                        Save
                      </Button>
                      <Button onClick={() => handleCancelClick(item.poSupplierDetailsId)} style={{ marginLeft: '0.5rem' }}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Tooltip title= {translatedMenuItems[7]}  >
                    <BorderColorIcon
                      tooltipTitle="Edit"
                    
                      onClick={() => handleEditClick(item.poSupplierDetailsId, item.contact,item.expectDeliveryDate,item.poCurrency )}
                      className="!text-icon cursor-pointer flex items-center justify-center text-[tomato]"
                    />
                        </Tooltip>
                  )}
                </div>
               
              </div>
                                                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[15.01rem] max-xl:w-[18.01rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs items-center font-poppins">
                                                            {item.locationName === null ? <Button
                                                                type="primary"
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.handlePoLocationModal(true)
                                                                }}
                                                            >
                                                              <ShoppingCartCheckoutIcon className="!text-icon"/>
                                                              {translatedMenuItems[7]} 
                                                            </Button> : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[1.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-xl text-xs items-center font-poppins">
                                                            <Tooltip title="Terms and conditions">
                                                                <TerminalSharp className="!text-icon text-[#c3b20b]"
                                                                    onClick={() => {
                                                                        handleRowData(item)
                                                                        props.handleTermsnConditionModal(true)
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                           
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <Suspense fallback={<BundleLoader />}>
            <PoLocationModal
                supplierId={props.supplier.supplierId}
                rowData={rowData}
                addlocationInPo={props.addlocationInPo}
                handlePoLocationModal={props.handlePoLocationModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
            <POSupplierDetailsModal
                supplierId={props.supplier.supplierId}
                rowData={rowData}
                addPoListmModal={props.addPoListmModal}
                handlePoListModal={props.handlePoListModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
                
            />
            <TermsnConditionModal
                rowData={rowData}
                addTermsnCondition={props.addTermsnCondition}
                handleTermsnConditionModal={props.handleTermsnConditionModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
            </Suspense>
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    purchaseList: suppliers.purchaseList,
    contactSupplier: suppliers.contactSupplier,
    userId: auth.userDetails.userId,
    addlocationInPo: suppliers.addlocationInPo,
    addPoListmModal: suppliers.addPoListmModal,
    addTermsnCondition: suppliers.addTermsnCondition,
    currencies: auth.currencies,
    fetchingPurchaseSupplierList: suppliers.fetchingPurchaseSupplierList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPurchaseSuppliersList,
            handlePoLocationModal,
            handlePoListModal,
            handleTermsnConditionModal,
            getCurrency,
            addCurrencyInPo,
            updatePOContact,
            getSupplierContactList,
            getSearchPo,
            ClearPoData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderTable);