import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInventory,  } from "../Inventory/InventoryAction";
import { Tooltip,Button,Input ,Popconfirm} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    getEcomList,
    handleItemViewDrawer
} from "./OrderAction";
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import EcomStatusCardDrawer from "./EcomStatusCardDrawer";
import EcomSearchedData from "./EcomSearchedData";
import EcomInvoiceListDrawer from "../Account/AccountDetailsTab/AccountOrderTab/EcomInvoiceListDrawer";
import ProcureItemViewDrawer from "./ProcureItemViewDrawer";
import CBMdrawer from "./CBMdrawer";
import { MultiAvatar } from "../../../Components/UI/Elements";

function EcomCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [cbmDrawer, setcbmDrawer] = useState(false)
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.ecomList.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.ecomList]);


  useEffect(() => {
    props.getInventory(props.orgId);
  }, [props.orgId]);

  useEffect(() => {
    props.getEcomList(props.orgId, page);
    setPage(page + 1);
  }, []);
  const [openInvoiceModal,setopenInvoiceModal] = useState(false);
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
       "679", //  'Created', 1
       "248",  // 'Customer',//2
       "1209",// 'Shipping Address',3
        "710",  // 'Billing Address',//4
       "253", // 'Items',//5
        "142",// 'Status',6    
      "1210",  // 'Invoices',7
       "1377",  // 'Ship',8
     "100", //  New 9
     "71" //Type


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
    const callPageMapd = props.ecomList && props.ecomList.length &&props.ecomList[0].pageCount
    setTimeout(() => {
      const {
        getEcomList,
       // userDetails: { employeeId },
      } = props;
      if  (props.ecomList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getEcomList(props.orgId, page, );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const openCBM = () => {
    setcbmDrawer(true)
  };

  dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now); // e.g., "2 days ago"
    }
};

  const closeModal = () => {
    setModalVisible(false);
  };

  const exportPDFAnnexure = async () => {
    var doc = new jsPDF();
    // const {
    //   userDetails:
    //   {address},
    //     imageId
    // }=props
   
    // let cityd=`${address.city}`
    // let countryd=`${address.country}`
    // let addressde=`${address.state}`
    // let cityde=`${address.street}`
    // var imageUrl = `${base_url}/image/${imageId || ""}`;
    var name1 = `East Repair Inc `
    var name2 =`1912 Harvest Lane New York ,NY 12210`
    var name3 =`BILL TO`
    var name4 = `SHIP TO`
   var name5 = ` ORDER #`
  var name6 = `ORDER DATE`
    var name7 = `P.O.#`
    var name8 = `Order Total`
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
  
    doc.save("Orders.pdf")
  
  }

const {handleProcureNotesDrawerModal,
  addDrawerProcureNotesModal
} = props;
  return (
    <div>
    {props.orderSearch.length > 0 ? (
      <EcomSearchedData
      orderSearch={props.orderSearch}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
    translatedMenuItems={props.translatedMenuItems}
      />
    ) : (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] max-sm:hidden">
        <div className=" flex justify-between w-[96%]  p-1 bg-transparent font-poppins text-xs font-bold sticky  z-10">
        <div className=" md:w-[0.5rem]"></div>
                        <div className="w-[10rem] md:w-[10.02rem] text-[#00A2E8] text-base">{translatedMenuItems[0]} ID</div>
                        <div className="w-[5.4rem] md:w-[5.04rem]">{translatedMenuItems[1]}</div>
                        <div className="w-[13.4rem] md:w-[13.04rem] flex justify-end">{translatedMenuItems[2]}</div>
                        {/* Customer */}
                        <div className="w-[8.4rem] md:w-[10.14rem]">{translatedMenuItems[3]}</div>
                        {/* Shipping */}
                        <div className="w-[8.4rem] md:w-[8.13rem]">{translatedMenuItems[4]}</div>
                        {/* Billing */}
                        <div className="w-[5.4rem] md:w-[5.12rem]">{translatedMenuItems[5]}</div>
                        {/* item */}
                        <div className="w-[4.4rem] md:w-[4.2rem]">{translatedMenuItems[8]}</div>
                        <div className="w-[4.4rem] md:w-[4.3rem]">{translatedMenuItems[6]}</div>
                        {/* <div className=" md:w-[4.4rem]">{translatedMenuItems[7]}</div>  */}
                     
                        <div className="w-[4.4rem] md:w-[5.4rem]"> 
                          {translatedMenuItems[10]}
                          
                          </div>
                          <div className=" md:w-[5.4rem]"> 
                        Inventory
                          
                          </div>
                        <div className=" md:w-[7rem]"></div>
                       
                      
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.ecomList.length}
          next={handleLoadMore}
          loader={props.fetchingEcomList?<div class="flex justify-center" >Loading...</div>:null}
          height={"83vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {data.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           
           
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 h-8 items-center   max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center border-l-2 border-green-500 bg-[#eef2f9]">
                        <div className=" flex   md:w-[9.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row max-sm:justify-between  ">
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
                        <div className=" flex  items-center md:w-[3.9rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
                          
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

                        <div className=" flex items-center items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[8.12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.distributorName}
                            </div>

                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[9.3rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.loadingAddress?.[0]?.city}
                            </div>

                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[10.5rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.category}  {item.attribute}
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

                        <div className=" flex  items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[9.5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <Button type="primary" onClick={()=>{setopenInvoiceModal(true);
                     handleSetParticularOrderData(item);
                  }}>{translatedMenuItems[7]}</Button>
                        </div>
                        <div class="flex text-xs  items-center font-poppins items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                            {/* {date} */}
                            <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span>
                            </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center"> 
                        <div class="w-6 items-center justify-center h-8   bg-[#eef2f9] flex">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-red-600"/>
                           </span>
          </div>                                                 
                        <div class=" items-center justify-center h-8   bg-[#eef2f9] flex">                       
                        <Tooltip title={translatedMenuItems[6]}
                        // "Status"
                                                                
                                                            >
                                                                <EventRepeatIcon

                                                                    className="!text-base cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                       openModal();
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                        </div>
                        <div class=" items-center justify-center h-8   bg-[#eef2f9] flex">   
                        <Tooltip title="CBM">
                        <StackedBarChartIcon
                         onClick={() => {
                          openCBM();
                           handleSetParticularOrderData(item);
                       }}
                        />
                        </Tooltip>
                        </div>
                    </div>

                </div>
            </div>
            );
          })}
        </InfiniteScroll>
      </div>
      <EcomInvoiceListDrawer
                    particularRowData={particularRowData}
         openInvoiceModal={openInvoiceModal}
         setopenInvoiceModal={setopenInvoiceModal}
         translatedMenuItems={translatedMenuItems}
         />
          <ProcureItemViewDrawer       
           particularRowData={particularRowData}
           viewItemDrwr={props.viewItemDrwr}
           handleItemViewDrawer={props.handleItemViewDrawer}                    
           />
           <CBMdrawer
           particularRowData={particularRowData}
           cbmDrawer={cbmDrawer}
           setcbmDrawer={setcbmDrawer}
           />
       <EcomStatusCardDrawer
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
                particularRowData={particularRowData}
                modalVisible={modalVisible}
                closeModal={closeModal} />

    </>
       )}
  </div>
  );



}

const mapStateToProps = ({ order,procre,inventory,auth }) => ({
  ecomList: order.ecomList,
  viewItemDrwr: order.viewItemDrwr,
  fetchingEcomList: order.fetchingEcomList,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  orderSearch:order.orderSearch,
  inventory: inventory.inventory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
getEcomList,
handleItemViewDrawer,
getInventory

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcomCardList);
