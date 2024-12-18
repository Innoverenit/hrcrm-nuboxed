import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getCollection} from "../CollectionAction"
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AcUnitIcon from "@mui/icons-material/AcUnit";

function CreditMemoList(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
          "672",  // Order Id 0
          "1169",// Invoice Id 1
          "248" , // "Customer",//2
           "218" ,//   Value,//3
          "1365" , // "Generated",//4       
           "1368", // "Applied"5
        
           
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
    props.getCollection(props.orgId);
  }, []);

  return (
    <>
 

      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%] h-[78vh]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[100%] items-end p-1 bg-transparent font-poppins font-bold !text-lm  sticky  z-10">
            <div className=" w-[6.1rem] max-md:w-[13.1rem] truncate text-sm">
            <DynamicFeedIcon className='!text-base  text-[#e4eb2f]'/> {translatedMenuItems[0]} {/* Order Id */}
               
                </div>
                <div className=" w-[5.12rem] max-md:w-[4.12rem] truncate">
                <ReceiptIcon  className="!text-icon text-[#157a6e] "/>  {translatedMenuItems[1]} ID {/* Invoice Id */}

                </div>
            <div className=" w-[5.2rem] max-md:w-[4.2rem] truncate">
            <AcUnitIcon className="!text-icon text-[#157a6e] "/>{translatedMenuItems[2]} {/* Customer */}
              
                </div>
            <div className=" w-[4.2rem] max-md:w-[4.2rem] truncate">
            <CurrencyExchangeIcon className="!text-icon text-[#b91372]"/> {translatedMenuItems[3]}  {/* Value */}
                </div>
            <div className=" w-[7.32rem] max-md:w-[7.32rem] truncate">
            <DateRangeIcon className='!text-icon '  />  {translatedMenuItems[4]}{/* Generated */}
               
                </div>
            <div className=" w-[6.023rem] max-md:w-[6.023rem] truncate">
            <DateRangeIcon className='!text-icon '  />{translatedMenuItems[5]}{/* Applied */}
             
                </div>
                   
          </div>


          {props.CollectionCreditMemo.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex  border-l-2 h-8 border-green-500 bg-[#eef2f9]  items-center  w-[11.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs ml-gap items-center font-poppins">
                        {item.newOrderNo}
                      </div>

                    </div>

                    <div className=" flex   items-center  h-8 ml-gap bg-[#eef2f9]  w-[14.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs ml-gap items-center font-poppins">
                        {item.invoiceNum}
                      </div>

                    </div>

                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex   items-center  h-8 ml-gap bg-[#eef2f9] w-[14.11rem] max-xl:w-[5.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                      <div class=" text-xs ml-gap items-center font-poppins text-center">
                        {item.distributorName}

                      </div>
                    </div>
                    <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9]  w-[14.02rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs ml-gap items-center font-poppins text-center">
                        {item.creditMemo}

                      </div>
                    </div>
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[14.01rem]  max-xl:w-[6.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                    <div class=" text-xs  font-poppins text-center">
                      {` ${dayjs(item.creationDate).format("DD-MM-YY")}`}

                    </div>
                  </div>
                  </div>
                 

                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
                      <div className=" flex    items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[14.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">

                  

                      </div>

                   

                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ collection, auth }) => ({
  CollectionCreditMemo:collection.CollectionCreditMemo,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCollection
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditMemoList);

