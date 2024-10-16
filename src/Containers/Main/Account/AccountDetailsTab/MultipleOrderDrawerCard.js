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
import { AudioOutlined } from '@ant-design/icons';
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

const { Option } = Select;

function AccountInvoiceTable(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
 
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [message, setMessage] = useState("");

    const fetchMultipleOrdersData = async () => {
        const type="invoice"
        setLoading(true); 
        try {
            const response = await axios.get(`${base_url2}/phoneOrder/invoiceNotCreated/${props.distributorId}/${type}/${page}`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              }); 
             if (typeof response.data === 'string') {
                setMessage(response.data); 
                setData([]); 
            } else if (Array.isArray(response.data)) {
                setData(prevData => [...prevData, ...response.data]); 
                setMessage(""); 
            } else {
                setHasMore(false); 
            }
        } catch (error) {
            setError(error);
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); 
        }
    };


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
    "1485",// Search by Invoice ID"
   "1484", // Outstanding
 "1357",  // Credit Memo
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
        fetchMultipleOrdersData();
    }, []);

  
   
    return (
        <>
       
        
        <>
        

            <div className=' flex sticky  z-auto mt-1'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[86%] p-1 bg-transparent font-bold font-poppins text-xs sticky z-10">
                  
                    <div class=" w-[8.5rem]">{translatedMenuItems[0]} ID</div>
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} ID</div>
                        {/* <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} </div> */}
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[2]}</div>
                        {/* <div className="md:w-[3.8rem]">{translatedMenuItems[3]}</div> */}
                        <div className=" md:w-[8rem]">{translatedMenuItems[6]}</div>
                        <div className=" md:w-[8rem]">{translatedMenuItems[7]}</div>
                       
                        <div className=" md:w-[8rem]"></div>
                        <div className=" md:w-[8rem]">{translatedMenuItems[4]}</div>
                    </div>
                    <div class="h-[83vh]" style={{scrollbarWidth:"thin"}}>
           
                    {loading ? (
                <div className="text-center font-semibold text-xs">Loading...</div>
            ) : message ? (
                <NodataFoundPage/>
            ) : data.length > 0 ? (
                <>
                    {data.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                return (
                    <div key={item.invoiceId} className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                        <div className="flex flex-row justify-between items-center w-wk max-sm:">
                            <div className="flex w-[6.25rem] max-xl:w-[16.25rem] max-sm:justify-between max-sm:flex-row">
                                <div className="max-xl:text-[0.65rem] text-xs font-poppins font-bold flex items-center">
                                    <span className="underline cursor-pointer text-[#1890ff]">
                                        {item.invoiceId}
                                    </span>
                                </div>
                                <div className="ml-1">
                                    {date === currentdate && (
                                        <div className="text-[0.65rem] font-bold text-[tomato] mr-4">
                                            {translatedMenuItems[8]} {/* New */}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex text-xs w-[8.1rem] max-xl:w-[10.1rem] max-sm:justify-between max-sm:flex-row">
                                <div className="max-xl:text-[0.65rem] text-xs font-poppins">
                                    {item.newOrderNo}
                                </div>
                            </div>
                            <div className="flex text-xs w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between max-sm:flex-row">
                                <div className="max-xl:text-[0.65rem] text-xs font-poppins">
                                    {item.totalValue}
                                </div>
                            </div>
                            <div className="flex w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between max-sm:flex-row">
                                <div className="max-xl:text-[0.65rem] text-xs font-poppins">
                                    {item.remainingTotalValue}
                                </div>
                            </div>
                            <div className="flex w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between max-sm:flex-row">
                                <Tooltip title="">
                                    <Button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            // executePayementLink();
                                            // handleSetParticularOrderData(item);
                                        }}
                                    >
                                        {translatedMenuItems[10]}
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    ) : (
        <NodataFoundPage />
    )}
                    </div>
                </div>
            </div>
            </>
             
          
        </>
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingAccountInvoice:distributor.fetchingAccountInvoice,
    fetchingGeneratedInvoice: distributor.fetchingGeneratedInvoice,
    generatedInvoice: distributor.generatedInvoice,
 
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
       
            getGeneratedInvoiveList,
 
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountInvoiceTable);