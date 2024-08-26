import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getAccountInvoiveList,
    handlenvoiceOrderModal,
    getGeneratedInvoiveList,
    upadtePayment,
    handleInvoiceModal,
    searchInoice,
    ClearSearchedInvoice
} from "../AccountAction";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {  Select,Popconfirm, Tooltip,Input,Button } from 'antd';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import InvoiceOrderModal from "./InvoiceOrderModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import InvoiceModal from "./InvoiceModal";
import Invoicesearch from "./Invoicesearch";
import PaidUnpaidAccountInvoiceToggle from "./PaidUnpaidAccountInvoiceToggle";
const { Option } = Select;

function AccountInvoiceTable(props) {
    const [pageNo, setPageNo] = useState(0);
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 
    const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false); //Code for Search
    const minRecordingTime = 3000; // 3 seconds
    const timerRef = useRef(null);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [particularRowData, setParticularRowData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    'Invoice ', // 0
    'Order', // 1
    'Value', // 2
    'Type', // 3
    'Status', // 4
   


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
        //setPageNo(pageNo + 1);
        props.getAccountInvoiveList(props.distributorId)
        props.getGeneratedInvoiveList(props.distributorId)
    }, []);

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
        const handleChanges = (e) => {
            setCurrentData(e.target.value);
        
            if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search  
                props.getAccountInvoiveList(props.distributorId)
                props.getGeneratedInvoiveList(props.distributorId)       
              props.ClearSearchedInvoice()
              setSearchOnEnter(false);
            }
          };
          const handleSearch = () => {
            if (currentData.trim() !== "") {
                props.searchInoice(currentData);
              setSearchOnEnter(true);  // Code for Search
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
             
              props.searchInoice(transcript);
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


    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [currency, setCurrency] = useState("")
    const [showIcon, setShowIcon] = useState(false)
    const handleCurrencyField = () => {
        setShowIcon(!showIcon)

    }
    const handleChangeCurrency = (val) => {
        setCurrency(val)
    }
    const handleCallback = () => {
        setShowIcon(false)
        setCurrency("")
    }
    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }
    const [visible, setVisible] = useState(false)
    const handleUpdateRevisePrice = () => {
        setVisible(!visible)
    }
    const [price, setPrice] = useState(particularRowData.invoiceId)
    const handleChange = (val) => {
          setPrice(val)
        // if (!isNaN(val) && val > 0 && val < 101) {
        //   setPrice(val);
        // } else {
        //   setPrice(''); // Reset the input if the value is not valid
        // }
    
    }
    const handleSubmitPrice = () => {
        props.upadtePayment(
            {
                invoiceId: price,
                
            },
            particularRowData.paymentId,props.distributorId
  
        );
        setVisible(false)
    }
    const [hasMore, setHasMore] = useState(true);
    
    const handleLoadMore = () => {
        const callPageMapd = props.accountInvoice && props.accountInvoice.length &&props.accountInvoice[0].pageCount
        setTimeout(() => {
          const {
            getAccountInvoiveList,
           // userDetails: { employeeId },
          } = props;
          if  (props.accountInvoice)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getAccountInvoiveList(props.orgId,pageNo); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };
      if (loading) {
        return <div><BundleLoader/></div>;
      }
    return (
        <>
         <div class=" w-64 max-sm:w-24">
        <Input
          placeholder="Search by ID"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChanges}
        value={currentData}
        />
        </div>
        {props.invoiceSearch.length > 0 ? (
    <Invoicesearch
    invoiceSearch={props.invoiceSearch}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                    <div className=" md:w-[7rem] text-[white] flex justify-center bg-[red]">
                  Not Generated
                         </div>
                    <div class=" w-[8.5rem]">Payment ID</div>
                        <div className=" md:w-[7.4rem]"> Date</div>
                        <div className=" md:w-[7.4rem]">Value </div>
                        <div className=" md:w-[7.1rem]">Mode</div>
                        <div className="md:w-[3.8rem]">{translatedMenuItems[1]} ID</div>
                        <div className="md:w-[3.81rem]">{translatedMenuItems[0]} ID</div>
                      
                    </div>
                    <div class="h-[33vh]">
                        {/* <InfiniteScroll
                            dataLength={props.accountInvoice.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingAccountInvoice ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"33vh"}
                            style={{scrollbarWidth:"thin"}}
                        > */}
                            {props.accountInvoice.length ? <>
                                {props.accountInvoice.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.paymentDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                           {item.paymentId}
                                                           

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                    <div className=" flex  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {/* <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleRowData(item);
                                                                        props.handlenvoiceOrderModal(true);
                                                                    }}
                                                                > {item.date}</span> */}
                                                                 {date}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.orderType}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.paymentModeName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.newOrderNo}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  max-sm:w-auto w-[11rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">       
                              {visible && (item.paymentId === particularRowData.paymentId) ?(
                                                                <Input
                                                                    type='text'
                                                                    value={price}
                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                />
                                                            ) : item.invoiceId === "null" || item.invoiceId === null ? (
                                                                "No Data"
                                                            ) : (
                                                              item.invoiceId
                                                            )}                                                          
                                                            
                            </div>
                           
                          </div>
                          <div className=" flex    md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">

                                                        {visible && (item.paymentId === particularRowData.paymentId) ? (
                                                            <>
                                                                <div className=" flex justify-between flex-col">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >
                                                                        <FormattedMessage
                                                                            id="app.save"
                                                                            defaultMessage="Save"
                                                                        />
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}><FormattedMessage
                                                                        id="app.cancel"
                                                                        defaultMessage="Cancel"
                                                                    /></Button>
                                                                </div>
                                                            </>
                                                        ) : <Tooltip title="Update Invoice">
                                                            <PublishedWithChangesIcon
                                                                onClick={() => {
                                                                    handleUpdateRevisePrice()
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-icon cursor-pointer text-[tomato]"
                                                            />
                                                        </Tooltip> }

                                                    </div>

                                                </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.accountInvoice.length
                                    && !props.fetchingAccountInvoice ? <NodataFoundPage /> : null}
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>

            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                    <div className=" md:w-[6.54rem] text-[white] flex justify-center bg-[Green]">
                   Generated
                         </div>
                    <div class=" w-[8.5rem]">{translatedMenuItems[0]} ID</div>
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} ID</div>
                        {/* <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} </div> */}
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[2]}</div>
                        {/* <div className="md:w-[3.8rem]">{translatedMenuItems[3]}</div> */}
                        <div className=" md:w-[8.8rem] ">{translatedMenuItems[4]}</div>
                      
                    </div>
                    <div class="h-[33vh]">
                        {/* <InfiniteScroll
                            dataLength={props.accountInvoice.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingAccountInvoice ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"33vh"}
                            style={{scrollbarWidth:"thin"}}
                        > */}
                            {props.generatedInvoice.length ? <>
                                {props.generatedInvoice.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                          
                                                           <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleRowData(item);
                                                                        props.handleInvoiceModal(true);
                                                                    }}
                                                                > {item.invoiceId} </span>

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                    <div className=" flex  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        
                                                                {item.newOrderNo}
                                                        </div>
                                                    </div>
                                                    {/* <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.orderPaymentType}
                                                        </div>
                                                    </div> */}
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.totalValue}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                      
                            <PaidUnpaidAccountInvoiceToggle item={item} paymentInd={item.paymentInd}/>
                          </div>
                                                   
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.generatedInvoice.length
                                    && !props.fetchingGeneratedInvoice ? <NodataFoundPage /> : null}
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>
            </>
              )}
            <InvoiceOrderModal
                    rowData={rowData}
                    handlenvoiceOrderModal={props.handlenvoiceOrderModal}
                    invoiceOrders={props.invoiceOrders}
                    selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                />  
                 <InvoiceModal
                    rowData={rowData}
                    handleInvoiceModal={props.handleInvoiceModal}
                    invoiceO={props.invoiceO}
                    selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                /> 
        </>
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingAccountInvoice:distributor.fetchingAccountInvoice,
    accountInvoice:distributor.accountInvoice,
    invoiceOrders:distributor.invoiceOrders,
    fetchingGeneratedInvoice: distributor.fetchingGeneratedInvoice,
    generatedInvoice: distributor.generatedInvoice,
    invoiceO: distributor.invoiceO,
    invoiceSearch: distributor.invoiceSearch
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAccountInvoiveList,
            getGeneratedInvoiveList,
            handlenvoiceOrderModal,
            upadtePayment,
            handleInvoiceModal,
            searchInoice,
            ClearSearchedInvoice
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountInvoiceTable);