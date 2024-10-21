import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import {
    getGeneratedInvoiveList,
} from "../AccountAction";
import { AudioOutlined } from '@ant-design/icons';
import {  Select, Tooltip,Input,Button } from 'antd';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const { Option } = Select;

dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now);
      }
    };

function AccountInvoiceTable(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
 
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cardData, setcardData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [message, setMessage] = useState("");
    const [invoices, setInvoices] = useState('');
    const [creditmemoData,setcreditmemoData]=useState([]);
    const [CreditMemo, setCreditMemo] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const fetchMultipleOrdersData = async () => {
        const type="Procure"
        setLoading(true); 
        try {
            const response = await axios.get(`${base_url2}/phoneOrder/invoiceNotCreated/${props.distributorId}/${type}/${page}`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              }); 
              if (typeof response.data === 'string') {
                setMessage(response.data);
                setcardData([]);
              } else if (Array.isArray(response.data)) {
                setcardData(prevData => [...prevData, ...response.data]);
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

    const handleCreditMemo =  (value) => {
        setCreditMemo(value);
      };

 const fetchCreditMemoData = async () => {
    try {
      const response = await axios.get(`${base_url2}/creditMemo/creditMemoList/${props.distributorId}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
      setcreditmemoData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
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
    "1485",// Search by Invoice ID"5
   "1484", // Outstanding6
 "1357",  // Credit Memo7
  "100",  // New8
  "1089",  // Generate9
   "1483", // Payment link10
  "142",// Status11
  "679", //created 12
"658",//location13
"73",//contact14
"253",//Items15

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
        fetchCreditMemoData();
    }, []);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        const selectedData = creditmemoData.filter(item => CreditMemo.includes(item.creditMemo));
    
        if (invoices.trim() === '') {
          Swal.fire({
            title: 'Validation Error',
            text: 'Invoice field cannot be blank.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
    
        const procureInvoiceList = selectedRows.map(orderId => {
            const selectedRow = cardData.find(item => item.orderId === orderId);
            return {
                orderPhoneId: selectedRow ? selectedRow.orderId : "",
            };
        });

        try {
          const response = await axios.post(`${base_url2}/invoice/procureInvoice`, {
            userId: props.userId,
            distributorId: props.distributorId,
            invoiceId: invoices,
            itemList: null,
            orgId: props.orgId,
            creditMemoList: selectedData,
            processType:"Full",
            procureInvoiceList,
            procureOrderInvoiceId: "",
            procureOrderProductInvoiceId:"",
          }, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          if (Array.isArray(response.data)) {
            setcardData(response.data);
          } else {
            console.error('Expected array but got:', response.data);
            setcardData([]);
          }
          Swal.fire({
            title: 'Success!',
            text: 'Invoice generated successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          props.setmodalMultiple(false);
          props.getGeneratedInvoiveList(props.distributorId);
          // window.location.reload();
          // setTimeout(() => {
          //   props.setactiveKey("11")
          // }, 1000);
     
        } catch (err) {
          setError(err);
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue generating the invoice.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } finally {
          setLoading(false);
        }
        setInvoices("");
        setSelectedRows([]);
      };
    
      const handleRowSelection = (orderId) => {
        setSelectedRows(prevSelected => {
          if (prevSelected.includes(orderId)) {
            return prevSelected.filter(id => id !== orderId);
          } else {
            return [...prevSelected, orderId];
          }
        });
      };

    return (
        <>
        <div className="flex max-sm:flex-row mt-2 justify-end">
                <div className="text-xs  font-poppins shadow-sm">
                   <input
                  //  className=" border-red-600 h-6 shadow-sm "
                   placeholder="invoice"
                   style={{border:"1px solid red",height:"1.5rem", }}
                   type="text"
                   value={invoices}
                   onChange={(e) => setInvoices(e.target.value)}
                 />
                </div>
                <div className="ml-2 ">
                <Select
                     style={{width:"10rem"}}
                     placeholder="Apply Credit"
                      value={CreditMemo}
                      onChange={(value) => handleCreditMemo(value)}
                      mode="multiple" 
                    >
   {creditmemoData.map((critem, crindex) => (
      <option  key={critem.creditMemoId} value={critem.creditMemo}>
       {critem.creditMemo} - {critem.creditMemoId}
      </option>
    ))}

                    </Select>
                    </div>
                    <div className="ml-2 ">
                    
       <Button type="primary" 
       onClick={handleGenerate}
       >
        Generate
       </Button>
       </div>
       </div>

        <>
        

            <div className=' flex sticky  z-auto mt-1'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[86%] p-1 bg-transparent font-bold font-poppins text-xs sticky z-10">
                  <div class="w-3"></div>
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} ID</div>
                        {/* <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} </div> */}
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[12]}</div>
                        {/* <div className="md:w-[3.8rem]">{translatedMenuItems[3]}</div> */}
                        <div className=" md:w-[8rem]">{translatedMenuItems[13]}</div>
                        <div className=" md:w-[8rem]">{translatedMenuItems[14]}</div>
                       
                        <div className=" md:w-[8rem]">{translatedMenuItems[15]}</div>
                       
                    </div>
                    <div class="h-[83vh]" style={{scrollbarWidth:"thin"}}>
           
                    {loading ? (
                <div className="text-center font-semibold text-xs">Loading...</div>
            ) : message ? (
                <NodataFoundPage/>
            ) : Array.isArray(cardData) && cardData.length > 0 ? (
                <>
                    {cardData.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                return (
                    <div key={item.orderId} className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                        <div className="flex flex-row justify-between items-center w-wk max-sm:">
                        <div className="flex w-[1.5rem]">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.orderId)}
                            onChange={() => handleRowSelection(item.orderId)}
                          />
                        </div>
                            
                            <div className="flex w-[6.25rem]  max-sm:justify-between max-sm:flex-row">
                                <div className="max-xl:text-[0.65rem] text-xs font-poppins font-bold flex items-center">
                                    <span className="underline cursor-pointer text-[#1890ff]">
                                        {item.newOrderNo}
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
                            <div className=" flex items-center w-[5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                            <div className="flex w-[8rem] max-sm:justify-between max-sm:flex-row">
                                <div className="max-xl:text-[0.65rem] text-xs font-poppins">
                                    {item.location}
                                </div>
                            </div>
                            <div className="flex w-[8rem]  max-sm:justify-between max-sm:flex-row">
                                <div className="max-xl:text-[0.65rem] text-xs font-poppins">
                                {item.contactPersonName ?
                                <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />:""}
                                </div>
                            </div>
                            <div className="flex w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between max-sm:flex-row">
                                {/* <Tooltip title="">
                                    <Button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            // executePayementLink();
                                            // handleSetParticularOrderData(item);
                                        }}
                                    >
                                        {translatedMenuItems[10]}
                                    </Button>
                                </Tooltip> */}
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