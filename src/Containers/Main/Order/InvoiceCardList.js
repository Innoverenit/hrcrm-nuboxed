import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getInvoiceEcomList,
} from "./OrderAction";
import "jspdf-autotable";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

function InvoiceCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getInvoiceEcomList(props.userId);
    // setPage(page + 1);
  }, []);
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "660",// 'Order',//0
       "73", //  'Created', 1
       "248",  // 'Customer',//2
       "1209",// 'Shipping Address',3
        "710",  // 'Billing Address',//4
       "253", // 'Items',//5
        "142",// 'Status',6    
      "1210",  // 'Invoices',7
       "1377",  // 'Ship',8
     "100", //  New 9
     "71" ,//Type 10
     "880",//Inventory 11
     "1169",// Invoice 12
     "1486",// Track 13
     "218",// Value 14


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

  const handleLoadMore = () => {
    const callPageMapd = props.ecomInvoiceList && props.ecomInvoiceList.length &&props.ecomInvoiceList[0].pageCount
    setTimeout(() => {
      const {
        getInvoiceEcomList,
       // userDetails: { employeeId },
      } = props;
      if  (props.ecomInvoiceList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getInvoiceEcomList(props.orgId, page, );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  dayjs.extend(relativeTime);

const {handleProcureNotesDrawerModal,
  addDrawerProcureNotesModal
} = props;
  return (
    <div>
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] max-sm:hidden">
        <div className=" flex justify-between w-[79%]  p-1 bg-transparent font-poppins text-xs font-bold sticky  z-10">
        <div className=" md:w-[0.5rem]"></div>
                        <div className="w-[10rem] md:w-[9.02rem] text-[#00A2E8] text-base">Invoice ID</div>
                        <div className="w-[5.4rem] md:w-[5.04rem]">Total Value</div>
                        <div className="w-[13.4rem] md:w-[8.04rem] flex">Total Unit</div>
                        {/* Customer */}
                        <div className="w-[8.4rem] md:w-[12.14rem]">Remaining value</div>                                                                                
        </div>
          {props.ecomInvoiceList.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                   
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 h-8 items-center   max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center border-l-2 border-green-500 bg-[#eef2f9]">
                        <div className=" flex   md:w-[6.4rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.invoiceId}
                            </div>
                            {date === currentDate ? (
                                <span className=" text-[0.65rem] text-[tomato] ml-1 font-bold" >
                                 {translatedMenuItems[9]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                      
                        </div>
                        <div className=" flex  items-center md:w-[3.9rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
                          
                            <div class=" text-xs  items-center font-poppins ">
                          {item.totalValue}
                            </div>
                    
                        </div>

                        <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9]  md:w-[8.12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                                {item.totalUnit}
                            </div>

                        </div>
                        <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9]  md:w-[13.3rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                            {item.remainingTotalValue}
                            </div>

                        </div>            
                </div>
            </div>
            );
          })}
        {/* </InfiniteScroll> */}
      </div>   
    </>
  </div>
  );
}

const mapStateToProps = ({ order,procre,inventory,auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  ecomInvoiceList:order.ecomInvoiceList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
        getInvoiceEcomList

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceCardList);
