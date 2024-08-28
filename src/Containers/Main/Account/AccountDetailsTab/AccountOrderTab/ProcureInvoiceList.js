import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getAccountInvoiveList,
} from "../../AccountAction";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {  Select,Popconfirm, Tooltip,Input,Button } from 'antd';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../Components/Placeholder";
import PaidIcon from '@mui/icons-material/Paid';
import { base_url2 } from "../../../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

const { Option } = Select;

function ProcureInvoiceList (props) {
    const [pageNo, setPageNo] = useState(0);
    const [particularRowData, setParticularRowData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [openStatus,setopenStatus] = useState(false);
    const [hasMore, setHasMore] = useState(true);

      const fetchData = async () => {
        try {
          const response = await axios.get(`${base_url2}/invoice/listOfInvoice/${props.particularRowData.orderPhoneId}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
 useEffect(()=> {
    fetchData();
 },[]);


    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }

    return (
        <>

        
    
        

            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                   
                    <div class=" w-[8.5rem]">
                    {props.translatedMenuItems[10]} ID 
                        </div>
                        <div className=" md:w-[7.4rem]">
                            {/* {translatedMenuItems[1]} ID */} AWB
                            </div>
                        <div className=" md:w-[7.1rem]">
                            {/* {translatedMenuItems[2]} */} Shipping
                        </div>
                        <div className=" md:w-[8rem]">
                            {props.translatedMenuItems[7]} 

                        </div>
                    </div>
                    <div class="h-[33vh]">
                            {data ? <>
                                {data.map((item) => {
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
                                                                        handleSetParticularOrderData(item);
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
                                                    {/* <div className=" flex   w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                      
                            <PaidUnpaidAccountInvoiceToggle procureOrderInvoiceId={item.procureOrderInvoiceId} paymentInd={item.paymentInd}/>
                          </div>
                                                   
                                                    </div> */}
                                                       <div className=" flex   w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                       
                                                   
                                                    </div>
                                                     <div className=" flex   w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                       
                                                                                                      </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !data.length
                                    && !data ? <NodataFoundPage /> : null}
                    
                    </div>
                </div>
            </div>
        

           
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
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProcureInvoiceList);