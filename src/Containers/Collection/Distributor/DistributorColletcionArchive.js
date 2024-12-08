import React, { lazy, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { DistributorCollectionArchiveToday } from "../CollectionAction";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import DateRangeIcon from "@mui/icons-material/DateRange";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DistributorColletcionArchiveForm = lazy(() => import("./DistributorColletcionArchiveForm"));

function DistributorColletcionArchive(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
        
          "248" , // "Customer",//0
           "660" ,// "Order #,//1
          "1169" , // " Invoice",//2
           "926", // "Transaction ",//3
          "71" , // "Type",//4
          "74" , // Date",//5
           "929" ,// "Amount",6
           "86", // "Mode"7
        
         "1681", //  Paid by"8
         
         "176", //    startDate,//9
         "126",      //  enddate"//10
         "154",  // "Submit",//11
           
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
  return (
    <>
      <Suspense fallback={<BundleLoader />}>
        <DistributorColletcionArchiveForm 
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            translatedMenuItems={translatedMenuItems}
        />
      </Suspense>

      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent sticky  z-10 font-bold font-poppins !text-lm">
            <div className="truncate w-[9.11rem] max-md:w-[9.11rem] text-sm">
           <AcUnitIcon className="!text-icon text-[#157a6e] "/> {translatedMenuItems[0]}   {/* customer" /> */}
              </div>
            <div className="truncate w-[8.2rem] max-md:w-[8.2rem]">  <DynamicFeedIcon className='!text-base  text-[#e4eb2f]'/>  {translatedMenuItems[1]} #
              {/*Order #" /> */}
              </div>
            <div className="truncate w-[8.2rem] max-md:w-[8.2rem]">
            <ReceiptIcon  className="!text-icon text-[#157a6e] "/>{/* Invoice */} {translatedMenuItems[2]}
              </div>
            <div className="truncate w-[7.12rem]  max-md:w-[7.12rem]">  <CurrencyExchangeIcon className='!text-icon mr-1 text-[#e4eb2f]' />  {translatedMenuItems[3]} ID
              {/* Transaction ID" /> */}
              </div>
            <div className="truncate w-[6.12rem] max-md:w-[6.12rem]">
            <MergeTypeIcon className=" !text-icon"/>  {/* Type" /> */} {translatedMenuItems[4]}
              </div>
            <div className="truncate w-[6.1rem] max-md:w-[7.12rem]">
            <DateRangeIcon className='!text-icon  '  />{/* "Date" /> */} {translatedMenuItems[5]}
              </div>
            <div className="truncate w-[7.21rem] max-mdw-[7.12rem]:">
            <CurrencyExchangeIcon className='!text-icon mr-1 text-[#e4eb2f]' /> {/* Amount" /> */} {translatedMenuItems[6]}
              </div>
            <div className="truncate w-[7.01rem] max-md:w-[7.12rem]">
            <CurrencyExchangeIcon className='!text-icon mr-1 text-[#e4eb2f]' /> {/*"Mode" /> */} {translatedMenuItems[7]}
              </div>

            <div className="truncate w-[6.01rem] max-md:w-[6.01rem]">
              <AccountCircleIcon className='!text-icon  '/>{/*"Owner" /> */} {translatedMenuItems[8]}
              </div>
          </div>


          {props.todayDisArchive.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex border-l-2 h-8 border-green-500 bg-[#eef2f9] max-md:w-[12.1rem]  w-[12.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.orderSourceName}
                      </div>

                    </div>

                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-md:w-[12.1rem] w-[12.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.newOrderNo}
                      </div>

                    </div>

                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[10.11rem] max-md:w-[10.1rem] max-xl:w-[5.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                        {item.invoiceId}

                      </div>
                    </div>
                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[9.02rem] max-md:w-[9.1rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs  font-poppins text-center">
                        {item.transactionNumber}

                      </div>
                    </div>
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8.01rem] max-md:w-[8.1rem] max-xl:w-[6.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                    <div class=" text-xs  font-poppins text-center">
                      {` ${dayjs(item.date).format("DD-MM-YY")}`}

                    </div>
                  </div>
                  </div>
                 

                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[10.03rem] max-md:w-[10.1rem] max-xl:w-[4.03rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentAmount} &nbsp; {item.orderCurrencyName}
                        </div>

                      </div>
                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[11.04rem] max-md:w-[11.1rem] max-xl:w-[8.54rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentModeName}
                        </div>

                      </div>
                   

                    
                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-md:w-[7.5rem] w-[7.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">


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
const mapStateToProps = ({ collection, leads }) => ({
  todayDisArchive: collection.todayDisArchive,
  DistributorCollectionArchive: collection.DistributorCollectionArchive,
  allSalesUsers: leads.allSalesUsers,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      DistributorCollectionArchiveToday,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorColletcionArchive);