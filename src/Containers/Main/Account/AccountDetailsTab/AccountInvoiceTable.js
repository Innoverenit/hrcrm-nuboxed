import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import {
    handlenvoiceOrderModal,
    getGeneratedInvoiveList,
    upadtePayment,
    handleInvoiceModal,
    searchInoice,
    ClearSearchedInvoice,
    handlePaidModal,
    getInvoiceCount
} from "../AccountAction";
import MicIcon from '@mui/icons-material/Mic';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import {  Select, Tooltip,Input,Button } from 'antd';
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import InvoiceOrderModal from "./InvoiceOrderModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import InvoiceModal from "./InvoiceModal";
import Invoicesearch from "./Invoicesearch";
import PaidIcon from '@mui/icons-material/Paid';
import InvoicePaidModal from "./InvoicePaidModal";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2';
import InvoiceStatusDrawer from "./InvoiceStatusDrawer";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MultipleOrderDrawer from "./MultipleOrderDrawer";
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import UpdateIcon from '@mui/icons-material/Update';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import InvoiceMultipleDrawer from "./InvoiceMultipleDrawer";

const { Option } = Select;

function AccountInvoiceTable(props) {
  const dispatch = useDispatch();
    const [pageNo, setPageNo] = useState(0);
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 
    const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false); //Code for Search
    const minRecordingTime = 3000; // 3 seconds
    const timerRef = useRef(null);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [openStatus,setopenStatus] = useState(false);
const[openMultipleDrawer,setopenMultipleDrawer]=useState(false);


    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    '1169', // 0
    '660', // 1
    '218', // 2
    '71', // 3
    '142', // 4
    "1485",//5 Search by Invoice ID"
   "1484", //6 Outstanding
 "1357",  //7 Credit Memo
  "100",  // New
  "1089",  // Generate
   "1483", // Payment link
  "142",// Status


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
      props.getInvoiceCount(props.distributorId)
        // props.getAccountInvoiveList(props.distributorId)
        props.getGeneratedInvoiveList(props.distributorId);
    }, []);

    const viewAnDownloadPdf= async (item) => {  
      try {
        const response = await axios.get(`${base_url2}/quotation/customer/pdf/${`procureOrderInvoice`}/${item.procureOrderInvoiceId}`, {
          responseType: 'blob',
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
    
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const filename = 'custom-pdf-name.pdf';
    
        window.open(url, '_blank');
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename; 
        downloadLink.click(); 
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }  
    
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
        const handleChanges = (e) => {
            setCurrentData(e.target.value);
        
            if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search  
                props.getGeneratedInvoiveList(props.distributorId)       
              props.ClearSearchedInvoice()
              setSearchOnEnter(false);
            }
          };
          const handleSearch = () => {
            if (currentData.trim() !== "") {
                props.searchInoice(props.distributorId,currentData);
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
             
              props.searchInoice(props.distributorId,transcript);
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
    const [particularRowData, setParticularRowData] = useState({});
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
    
   const [modalMultiple,setmodalMultiple]=useState(false);

      const sendCreditMemo= async (item) => {
       
        setLoading(true);
        setError(null);
        try {
          const response = await axios.post(`${base_url2}/creditMemo/creditInd`,{
          userId: props.userId,
          distributorId:item.distributorId,
          orgId: props.orgId,
          invoiceId:item.procureOrderInvoiceId,
          creditInd:true,
          orderId:item.orderPhoneId,
          },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            }  
          );
          dispatch(getGeneratedInvoiveList(props.distributorId));
          setData(response.data);
          Swal.fire({
            title: 'Success!',
            text: 'Generated successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            showConfirmButton: false,
            timer: 1500,
        });
        } 
        
        catch (err) {
          setError(err);
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue generating the invoice.',
            icon: 'error',
            confirmButtonText: 'OK',
            showConfirmButton: false,
            timer: 1500,
        });
        } finally {
          setLoading(false);
        }
      }; 
      
      const executePayementLink= async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.post(`${base_url2}/invoice/paylinkDummy `,{
          userId: props.userId,
          distributorId:props.distributorId,
            paylink: "",
            orgId: props.orgId,
          },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            }  
          );
          setData(response.data);
          Swal.fire({
            title: 'Success!',
            text: 'Payment successfull',
            icon: 'success',
            confirmButtonText: 'OK',
            showConfirmButton: false,
            timer: 1500,
        });
        } 
        
        catch (err) {
          setError(err);
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue generating the invoice.',
            icon: 'error',
            confirmButtonText: 'OK',
            showConfirmButton: false,
            timer: 1500,
        });
        } finally {
          setLoading(false);
        }
      };

      if (loading) {
        return <div><BundleLoader/></div>;
      }
    return (
        <>
         <div class=" w-[35vw] flex justify-end max-sm:w-24 ml-2">
     
        <Input 
          placeholder={translatedMenuItems[5]}
       
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChanges}
        value={currentData}
        />

<Button type="primary" onClick={()=> setmodalMultiple(true)} style={{ marginLeft:"2rem", fontSize:"0.65rem", width:"15rem"}}>
<DataSaverOnIcon className="!text-icon text-white"/> Include multipule orders 
    </Button>
        </div>

        {props.invoiceSearch.length > 0 ? (
    <Invoicesearch
    distributorId={props.distributorId}
    invoiceSearch={props.invoiceSearch}
    fetchingInputInvoiceData={props.fetchingInputInvoiceData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
    />
    
  ) : (
        <>
        

            <div className=' flex sticky  z-auto mt-3'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[86%] items-end p-1 bg-transparent font-bold !text-lm font-poppins text-xs sticky z-10">
                  
                    <div class="text-[#00A2E8] text-sm max-md:w-[8.5rem] w-[7.1rem]">
                    <ReceiptIcon className="!text-icon text-[#b91372]"/> {translatedMenuItems[0]} ID</div>
                        <div className=" w-[14.4rem] max-md:w-[7.4rem]">
                        <DynamicFeedIcon className="!text-icon text-[#157a6e] cursor-pointer"/>{translatedMenuItems[1]} ID</div>
           
                        <div className="w-[5.4rem] max-md:w-[7.1rem]">
                        <CurrencyExchangeIcon className='!text-icon mr-1 text-[#e4eb2f]' />{translatedMenuItems[2]}</div>
               
                        <div className="w-[11.09rem] max-md:w-[8rem]">{translatedMenuItems[6]}</div>
                        <div className="w-[11.3rem] max-md:w-[8rem]">
                        <CreditCardIcon className="!text-icon text-[#edd382] mr-1"/>{translatedMenuItems[7]}</div>
                        {/* Credit Memo */}
                        <div className="w-[10.23rem] max-md:w-[8rem]"></div>
                        <div className="w-[11.1rem] max-md:w-[8rem]">
                        <UpdateIcon className='!text-icon mr-1 text-[#ff66b3]' /> {translatedMenuItems[4]}</div>
                    </div>
                    <div class="h-[69vh]" style={{scrollbarWidth:"thin"}}>
                      
                            {props.generatedInvoice.length ? <>
                                {props.generatedInvoice.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white  items-center py-ygap  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:">
                                                    <div className=" flex w-[9.25rem] h-8  border-l-2 border-green-500 bg-[#eef2f9]  max-xl:w-[16.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins ml-gap font-bold flex items-center">
                                                        
                                                           <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                      handleSetParticularOrderData(item);
                                                                        props.handleInvoiceModal(true);
                                                                        
                                                                    }}
                                                                > 
                                                                {item.invoiceId} 
                                                                
                                                                </span>

                                                        </div>
                                                        <div class="ml-1">
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                 {translatedMenuItems[8]}   {/* New */}
                                                                </div>
                                                            ) : null}</div>
                                                    </div>
                                                    <div className=" flex  text-xs w-[20.1rem] max-xl:w-[10.1rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs underline cursor-pointer text-[#1890ff] font-poppins"
                                                        onClick={() => {
                                                          handleSetParticularOrderData(item);
                                                              setopenMultipleDrawer(true)
                                                            
                                                        }}
                                                        >
                                                        
                                                                {item.newOrderNo ? item.newOrderNo :"Multiple"}
                                                        </div>
                                                    </div>
                                                 
                                                    <div className=" flex text-xs w-[7.2rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.totalValue}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[15rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                    {item.remainingTotalValue} 

                          </div> </div>
                                                       <div className=" flex   w-[15.01rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {item.creditInd  ? "" :(
                                                        <Tooltip title="">
                                                                <Button 
                                                                type="primary"
                                                                    className="cursor-pointer"
                                                                    onClick={() => {
                                                                        sendCreditMemo(item);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                >{translatedMenuItems[9]}</Button>
                                                            </Tooltip>)}

                          </div>                  
        </div>           
                                                    <div className=" flex   w-[15.02rem] max-xl:w-[20.1rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between  max-sm:flex-row ">
                                                        <Tooltip title="">
                                                                <Button
                                                                 type="primary"
                                                                    className="cursor-pointer"
                                                                    onClick={() => {
                                                                        // executePayementLink();
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                > {translatedMenuItems[10]}</Button>
                                                            </Tooltip>
                                                          </div>   
                                                          <div className=" flex   w-[15.03rem] max-xl:w-[20.1rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                   {item.paidInd=== true ? "Paid":"Unpaid"}

                                               </div> </div>   
                                                     <div className=" flex ml-1 items-center bg-[#eef2f9] h-8 justify-end  w-[15.04rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                       <div class="items-center justify-center  ">
                                                        <Tooltip title="">
                                                                <PaidIcon
                                                                    className="!text-icon cursor-pointer text-[#e5625e]"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>      
                       </div>
                       <div class="items-center justify-center  ">
                          <Tooltip title={translatedMenuItems[11]}>
                             <EventRepeatIcon
                             className="!text-icon cursor-pointer text-[green]"
                              onClick={()=>{
                                setopenStatus(true);
                                handleSetParticularOrderData(item);
                              }}
                             />
                                  </Tooltip>
                              </div>
                              <div class="w-6 items-center justify-center  ">
                              <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
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
                    particularRowData={particularRowData}
                    handlenvoiceOrderModal={props.handlenvoiceOrderModal}
                    invoiceOrders={props.invoiceOrders}
                    selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                />  
                 <InvoiceModal
                    particularRowData={particularRowData}
                    handleInvoiceModal={props.handleInvoiceModal}
                    invoiceO={props.invoiceO}
                    selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                /> 
                 <InvoicePaidModal
                  particularRowData={particularRowData}
                distributorId={props.distributorId}
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    type={props.type}
                    addPaidButtonModal={props.addPaidButtonModal}
                    handlePaidModal={props.handlePaidModal} 
                    activeTab={props.activeTab}
                  
                />
                <InvoiceStatusDrawer
                   selectedLanguage={props.selectedLanguage}
                   translateText={props.translateText} 
                                  particularRowData={particularRowData}
                 openStatus={openStatus}
                 setopenStatus={setopenStatus}
                />

                <MultipleOrderDrawer
                       particularRowData={particularRowData}
                modalMultiple={modalMultiple}
                setmodalMultiple={setmodalMultiple}
                distributorId={props.distributorId}
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                />
                <InvoiceMultipleDrawer 
                particularRowData={particularRowData}
               openMultipleDrawer={openMultipleDrawer}
                setopenMultipleDrawer={setopenMultipleDrawer}
                distributorId={props.distributorId}
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
    invoiceSearch: distributor.invoiceSearch,
    addPaidButtonModal: distributor.addPaidButtonModal,
    fetchingInputInvoiceData:distributor.fetchingInputInvoiceData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
       
            getGeneratedInvoiveList,
            handlenvoiceOrderModal,
            upadtePayment,
            handleInvoiceModal,
            searchInoice,
            ClearSearchedInvoice,
            handlePaidModal,
            getInvoiceCount
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountInvoiceTable);