import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    getQuotationEcomList,
} from "./OrderAction";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { MultiAvatar } from "../../../Components/UI/Elements";

function QuotationCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getQuotationEcomList(props.userId, page,"procure");
    setPage(page + 1);
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
    const callPageMapd = props.ecomQuotation && props.ecomQuotation.length &&props.ecomQuotation[0].pageCount
    setTimeout(() => {
      const {
        getQuotationEcomList,
       // userDetails: { employeeId },
      } = props;
      if  (props.ecomQuotation)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getQuotationEcomList(props.userId, page,"procure" );
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
                        <div className="w-[10rem] md:w-[4.02rem] text-[#00A2E8] text-base">{translatedMenuItems[0]} ID</div>
                        <div className="w-[5.4rem] md:w-[5.04rem]">{translatedMenuItems[1]}</div>
                        <div className="w-[13.4rem] md:w-[8.04rem] flex">{translatedMenuItems[2]}</div>
                        {/* Customer */}
                        <div className="w-[8.4rem] md:w-[12.14rem]">{translatedMenuItems[3]}</div>
                        {/* Shipping */}
                        <div className="w-[8.4rem] md:w-[8.13rem]">{translatedMenuItems[4]}</div>
                        {/* Billing */}
                        <div className="w-[5.4rem] md:w-[5.12rem]">{translatedMenuItems[5]}</div>
                        {/* item */}
                       
                        <div className="w-[4.4rem] md:w-[4.3rem]">{translatedMenuItems[6]}</div>
            
                     
                        <div className="w-[4.4rem] md:w-[5.4rem]"> 
                          {translatedMenuItems[10]}
                          
                          </div>
                          {/* <div className=" md:w-[5.4rem]"> 
                          {translatedMenuItems[11]}
                          
                          </div> */}
                    
                       
                      
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.ecomQuotation.length}
          next={handleLoadMore}
          loader={props.fetchingecomQuotation?<div class="flex justify-center" >Loading...</div>:null}
          height={"83vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {props.ecomQuotation.map((item) => {
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
                                {item.newOrderNo}
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
                            <MultiAvatar
                  primaryTitle={item.contactPersonName}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                            </div>
                    
                        </div>

                        <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9]  md:w-[8.12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                                {item.distributorName}
                            </div>

                        </div>
                        <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9]  md:w-[13.3rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                               
                            </div>

                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[13.5rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                             
                            </div>

                        </div>


                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[3.1rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs cursor-pointer text-blue-500 font-poppins"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleItemViewDrawer(true);                               
                            }}>
                                {item.itemCount}
                            </div>

                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[7.8rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.status}
                            </div>

                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[6.6rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.orderSource}
                            </div>

                        </div>

                     

                </div>
            </div>
            );
          })}
        </InfiniteScroll>
      </div>
     
    </>

  </div>
  );



}

const mapStateToProps = ({ order,procre,inventory,auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  ecomQuotation:order.ecomQuotation
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
        getQuotationEcomList

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotationCardList);