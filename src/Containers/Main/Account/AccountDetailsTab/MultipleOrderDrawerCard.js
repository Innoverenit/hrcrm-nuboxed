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
import MultipleOrderDrawer from "./MultipleOrderDrawer";

const { Option } = Select;

function AccountInvoiceTable(props) {
  const dispatch = useDispatch();
    const [pageNo, setPageNo] = useState(0);
 
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
   

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
        // props.getGeneratedInvoiveList(props.distributorId);
    }, []);

    const exportPDFAnnexure = async () => {
      var doc = new jsPDF();
    
      var name1 = `East Repair Inc `
      var name2 =`1912 Harvest Lane New York ,NY 12210 `
      var name3 =`BILL TO`
      var name4 = `SHIP TO`
      var name5 = `INVOICE #`
      var name6 = `INVOICE DATE`
      var name7 = `P.O.#`
      var name8 = `INVOICE Total`
      var name9 = `QTY`
      var name10 = `DESCRIPTION`
      var name11 = `UNIT PRICE`
      var name12 = `AMOUNT`
      var name13= `TERM & CONDITIONS`
      var name14= `Payement id due within 15 days`
      var name15= `Please make checks payble to: East repair Inc. `
    
    
      doc.setFont("Montserrat");
      doc.setFillColor(62, 115, 185);
      doc.rect(0, 0, 230, 13, 'F');
      doc.setFontSize(25);
      doc.setFontSize(14);
      doc.setDrawColor(0, 0, 0)
      // doc.addImage(imageUrl, 'JPEG', 20, 18, 165, 20);
      doc.text(name1, 8, 25);
      doc.setFontSize(10);
      let yPosition = 32;
    //   address.forEach(item => {
    //     doc.text(` ${item.city}  ${item.country}  ${item.state}  ${item.street}`, 8, yPosition);
    //     yPosition += 4
    // });
      // doc.text(name2, 8, 32);
      doc.setFontSize(12);
      doc.text(name3, 8, 50);
      doc.text(name4, 60, 50);
      doc.text(name5, 120, 50);
      doc.text(name6, 120, 58);
      doc.text(name7, 120, 66);
      doc.line(8, 80, 200, 80);
      doc.setFontSize(22);
      doc.text(name8, 8, 90);
      doc.line(8, 100, 200, 100);
      doc.setFontSize(10);
      doc.text(name9, 8, 110);
      doc.text(name10, 30, 110);
      doc.text(name11, 90, 110);
      doc.text(name12, 140, 110);
      doc.setFontSize(12);
      doc.text(name13, 8, 250);
      doc.setFontSize(9);
      doc.text(name14, 8, 260);
      doc.text(name15, 8, 270);
      //footer
      doc.setFillColor(62, 115, 185);
      doc.rect(0, 276, 230, 15, 'F');
    
      doc.save("Invoice.pdf")
    
    }


     
         
          

   
      
     
   
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
                    <div class="h-[69vh]" style={{scrollbarWidth:"thin"}}>
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
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:">
                                                    <div className=" flex w-[6.25rem] max-xl:w-[16.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins  font-bold flex items-center">
                                                          
                                                           <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    // onClick={() => {
                                                                    //     handleSetParticularOrderData(item);
                                                                    //     props.handleInvoiceModal(true);
                                                                    // }}
                                                                > {item.invoiceId} </span>

                                                        </div>
                                                        <div class="ml-1">
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                 {translatedMenuItems[8]}   {/* New */}
                                                                </div>
                                                            ) : null}</div>
                                                    </div>
                                                    <div className=" flex  text-xs w-[8.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        
                                                                {item.newOrderNo}
                                                        </div>
                                                    </div>
                                                    {/* <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.orderPaymentType}
                                                        </div>
                                                    </div> */}
                                                    <div className=" flex text-xs w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.totalValue}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                    {item.remainingTotalValue} 

                          </div> </div>
                                                       <div className=" flex   w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                       
                                                      
                          
                          </div>                  
                                                   
                                                    </div>
                                                    
                                                  

                                                    <div className=" flex   w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <Tooltip title="">
                                                                <Button
                                                                    className="cursor-pointer"
                                                                    onClick={() => {
                                                                        // executePayementLink();
                                                                        // handleSetParticularOrderData(item);
                                                                    }}
                                                                > {translatedMenuItems[10]}</Button>
                                                            </Tooltip>
                                                          </div>   
                                                          
                                                     <div className=" flex  items-center justify-end  w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                       
                                                        {/* <Tooltip title="">
                                                                <PaidIcon
                                                                    className="!text-icon cursor-pointer text-[#e5625e]"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>       */}
                       
                          <div>
                          {/* <Tooltip title={translatedMenuItems[11]}>
                             <EventRepeatIcon
                             className="!text-icon cursor-pointer text-[green]"
                              onClick={()=>{
                                setopenStatus(true);
                                handleSetParticularOrderData(item);
                              }}
                             />
                                  </Tooltip> */}
                              </div>
                              <div class="w-6">
        {/* <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon"/>
                           </span> */}
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