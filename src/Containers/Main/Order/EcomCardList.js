import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input ,Popconfirm} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    getEcomList
} from "./OrderAction";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import EcomStatusCardDrawer from "./EcomStatusCardDrawer";
import EcomSearchedData from "./EcomSearchedData";
import EcomInvoiceListDrawer from "../Account/AccountDetailsTab/AccountOrderTab/EcomInvoiceListDrawer";

function EcomCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.ecomList.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.ecomList]);

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
                        <div className=" md:w-[10rem]">{translatedMenuItems[0]} ID</div>
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[1]}</div>
                        <div className=" md:w-[6.4rem] flex justify-end">{translatedMenuItems[2]}</div>
                        {/* Customer */}
                        <div className=" md:w-[8.4rem]">{translatedMenuItems[3]}</div>
                        {/* Shipping */}
                        <div className=" md:w-[8.4rem]">{translatedMenuItems[4]}</div>
                        {/* Billing */}
                        <div className=" md:w-[5.4rem]">{translatedMenuItems[5]}</div>
                        {/* item */}
                        <div className=" md:w-[4.4rem]">{translatedMenuItems[8]}</div>
                        <div className=" md:w-[4.4rem]">{translatedMenuItems[6]}</div>
                        {/* <div className=" md:w-[4.4rem]">{translatedMenuItems[7]}</div>  */}
                     
                        <div className=" md:w-[5.4rem]"> {translatedMenuItems[10]}</div>
                        <div className=" md:w-[7rem]"></div>
                       
                        <div className="md:w-[1rem]"></div>
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.ecomList.length}
          next={handleLoadMore}
          loader={props.fetchingEcomList?<div class="flex justify-center" >Loading...</div>:null}
          height={"79vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {data.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           
           
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex   md:w-[7rem] max-sm:flex-row max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.newOrderNo}
                            </div>
                            {date === currentDate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                 {translatedMenuItems[9]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                      
                        </div>
                        <div className=" flex  items-center md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  items-center font-poppins">
                            {date}
                            </div>
                    
                        </div>

                        <div className=" flex items-center  md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.distributorName}
                            </div>

                        </div>
                        <div className=" flex items-center  md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.loadingAddress?.[0]?.city}
                            </div>

                        </div>
                        <div className=" flex items-center  md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.category}  {item.attribute}
                            </div>

                        </div>


                        <div className=" flex items-center  md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.itemCount}
                            </div>

                        </div>
                        <div className=" flex items-center  md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.status}
                            </div>

                        </div>
                        <div className=" flex items-center  md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.orderSource}
                            </div>

                        </div>

                        <div className=" flex   md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                        <Button type="primary" onClick={()=>{setopenInvoiceModal(true);
                     handleSetParticularOrderData(item);
                  }}>{translatedMenuItems[7]}</Button>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center"> 
                        <div class="w-6">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-red-600"/>
                           </span>
          </div>                                                 
                        <div>                       
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
       <EcomStatusCardDrawer
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
                particularRowData={particularRowData}
                modalVisible={modalVisible}
                closeModal={closeModal} />

{/*<AddProcureNotesDrawerModal
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
        particularRowData={particularRowData}
        addDrawerProcureNotesModal={props.addDrawerProcureNotesModal}
        handleProcureNotesDrawerModal={props.handleProcureNotesDrawerModal}
      /> */}
    </>
       )}
  </div>
  );



}

const mapStateToProps = ({ order,procre,auth }) => ({
  ecomList: order.ecomList,
  fetchingEcomList: order.fetchingEcomList,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  orderSearch:order.orderSearch
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
getEcomList,

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcomCardList);
