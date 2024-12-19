import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import dayjs from "dayjs";
import axios from 'axios';
import {base_url2} from "../../../../../Config/Auth";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DateRangeIcon from '@mui/icons-material/DateRange';

function AccountCreditMemos(props) {

   
    const [data1, setData1] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [error, setError] = useState(null);

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [

            "248",  // Customer 0
             "660" ,// Order # 1
             "1169" ,// Invoice 2
             "926" ,  // Transaction 3
             "71" ,  // Type 4
             "74" ,   // Date 5
             "929" ,  // Amount
             "86" ,  // "Mode
             "1085" , // Received
             "679" , // Created

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

      const fetchData1 = async () => {
        try {
          const response = await axios.get(`${base_url2}/creditMemo/creditMemoList/${props.distributorId}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData1(response.data);
          setLoading1(false);
        } catch (error) {
          setError(error);
          setLoading1(false);
        }
      };
  useEffect(() => {
  fetchData1();
  }, []);

  const viewAnDownloadPdf= async (item) => {  
    try {
      const response = await axios.get(`${base_url2}/quotation/customer/pdf/${`creditMemo`}/${item.creditMemoId}`, {
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

// Creditmemo
  return (
    <>
      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-y-auto  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[95%]  p-1 bg-transparent font-bold !text-lm font-poppins sticky items-end  z-10">
            <div className="text-[#00A2E8] text-sm  w-[14.1rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <DynamicFeedIcon className='!text-icon  text-[#e4eb2f]'/>{translatedMenuItems[1]} </div>
            <div className=" w-[16.4rem] truncate  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <ReceiptIcon className="!text-icon text-[#b91372]"/>{translatedMenuItems[2]}</div>         
            <div className="w-[18.8rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {/* Date */}
            <DateRangeIcon className='!text-icon'  /> {translatedMenuItems[5]}</div>
            <div className="w-[19.9rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {/* Amount */}
            <CurrencyExchangeIcon className="!text-icon text-[#b91372]"/> {translatedMenuItems[6]}</div>         
            <div className="w-[9.01rem] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <DateRangeIcon className='!text-icon '  />  {translatedMenuItems[9]}</div>   {/* Created */}
          </div>
          <div className=" overflow-scroll h-[73vh]">
            {data1.map((item) => {
              return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white py-ygap items-center  max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex items-center border-l-2 border-green-500 bg-[#eef2f9]   h-8 w-[14.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs ml-gap font-poppins">
                        {item.newOrderNo}
                      </div>
                    </div>
                    <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]   w-[16.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.invoiceNum}
                      </div>
                    </div>
                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex  items-center justify-center h-8 ml-gap  bg-[#eef2f9]  w-[19.11rem] max-xl:w-[5.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                      {` ${dayjs(item.creationDate).format("DD-MM-YY")}`}

                      </div>
                    </div>
                    <div className=" flex  items-center justify-center h-8 ml-gap  bg-[#eef2f9]  w-[20.02rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs  font-poppins text-center">
                        {item.creditMemo}
                      </div>
                    </div>              
                  </div>               
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                 
                      <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]   w-[9.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
        <div class=" text-xs  font-poppins">
                          <span>
                            <MultiAvatar
                              primaryTitle={item.salesExecutive}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </span>
                        </div>
                        </div> 
                        <div class=" flex items-center justify-end h-8 ml-gap  bg-[#eef2f9] w-[4rem]">
                        <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>
                                      
                  </div>
                </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ distributor, leads, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
//   distributor
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreditMemos);
