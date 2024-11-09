import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCustomerOrder,handleStatuShowDrawer} from "../AccountAction"
import { Tooltip} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import ProcureStatusShowDrawer from "./AccountOrderTab/ProcureStatusShowDrawer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { base_url2 } from "../../../../Config/Auth";
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DateRangeIcon from '@mui/icons-material/DateRange';
import UpdateIcon from '@mui/icons-material/Update';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
function OrderTableC(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(props.ecomList.map((item, index) => ({ ...item, key: String(index) })));
//   }, [props.ecomList]);

  useEffect(() => {
    props.getCustomerOrder(props.distributorId, page);
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
        "71",// 'Type',//0
       "660", //  'Order', 1
       "679",  // 'Created',//2
       "73",// 'Contact',3
        "1171",  // 'Payment',//4
       "142", // 'Status',//5
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


  const exportPDFAnnexure = async () => {
    var doc = new jsPDF();

    // Define the static text
    var companyName = `1 Di Inc.`;
    var companyAddress = `21A-81 Northern Heights Drive\nRichmond Hill ON L4B 4C9\n+14162780878\nsales@1di.ca\nGST/HST Registration No.: 71265570`;
    var billTo = `BILL TO\nRobert Cowman\nFG Bradley's Fairview\n1800 Sheppard Ave E. Fairview\nMall, Unit 2045\nToronto Ontario M2J 5A7`;
    var shipTo = `SHIP TO\nRobert Cowman\nFG Bradley's Fairview\n1800 Sheppard Ave E. Fairview\nMall, Unit 2045\nToronto Ontario M2J 5A7`;

    // Invoice details
    var invoiceInfo = `INVOICE #1361\nDATE: 30/08/2024\nDUE DATE: 29/09/2024\nTERMS: Net 30`;

    // Product table headers
    var skuHeader = "SKU";
    var descriptionHeader = "DESCRIPTION";
    var qtyHeader = "QTY";
    var rateHeader = "RATE";
    var amountHeader = "AMOUNT";

    // Product details
    var productDetails = [
        { sku: "KES477", description: "477 | Jumbo Foam D20", qty: 36, rate: "12.50", amount: "450.00" }
    ];

    // Tax summary
    var subtotal = `450.00`;
    var hst = `58.50`;
    var total = `508.50`;

    // Set document font and colors
    doc.setFont("Helvetica");
    doc.setFontSize(10);

    // Draw the header
    doc.setFillColor(62, 115, 185);
    doc.rect(0, 0, 210, 13, 'F');  // Full-width top blue bar

    // Company Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(companyName, 10, 20);
    doc.setFontSize(10);
    doc.text(companyAddress, 10, 25);

    // Invoice Information
    doc.setFontSize(12);
    doc.text("ORDER", 10, 50);
    doc.text(billTo, 10, 60);
    doc.text(shipTo, 70, 60);
    doc.text(invoiceInfo, 140, 60);

    // Table Headers
    doc.setFontSize(10);
    doc.text(skuHeader, 10, 100);
    doc.text(descriptionHeader, 40, 100);
    doc.text(qtyHeader, 100, 100);
    doc.text(rateHeader, 120, 100);
    doc.text(amountHeader, 150, 100);
    
    // Product Details
    let yPosition = 110;
    productDetails.forEach(item => {
        doc.text(item.sku, 10, yPosition);
        doc.text(item.description, 40, yPosition);
        doc.text(item.qty.toString(), 100, yPosition);
        doc.text(item.rate, 120, yPosition);
        doc.text(item.amount, 150, yPosition);
        yPosition += 10;
    });

    // Tax Summary
    doc.line(10, yPosition, 200, yPosition);  // Horizontal line
    yPosition += 10;
    doc.text(`Subtotal: ${subtotal}`, 140, yPosition);
    yPosition += 10;
    doc.text(`HST (ON) @ 13%: ${hst}`, 140, yPosition);
    yPosition += 10;
    doc.text(`TOTAL: CAD ${total}`, 140, yPosition);

    // Footer
    doc.setFillColor(62, 115, 185);
    doc.rect(0, 280, 210, 15, 'F');  // Footer bar
    doc.setTextColor(255, 255, 255);
    doc.text("Thank you for your business!", 10, 285);

    // Save the PDF
    doc.save("Orders.pdf");
};
 
// Orders

  const handleLoadMore = () => {
    const callPageMapd = props.orderCustomerList && props.orderCustomerList.length &&props.orderCustomerList[0].pageCount
    setTimeout(() => {
      const {
        getCustomerOrder,
       // userDetails: { employeeId },
      } = props;
      if  (props.orderCustomerList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getCustomerOrder(props.distributorId, page, );
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

  

const {handleProcureNotesDrawerModal,
  addDrawerProcureNotesModal
} = props;
  return (
    <div>
  
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] max-sm:hidden">
        <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">

                        <div className="font-bold text-[#00A2E8] text-base w-[25rem] font-poppins  md:w-[25rem]">
                        < MergeTypeIcon className='!text-icon text-[#c42847] '  />{translatedMenuItems[0]} </div>
                        <div className="font-bold w-[14.01rem] font-poppins text-xs md:w-[14.4rem]">
                        <DynamicFeedIcon className='!text-base mr-1  text-[#e4eb2f]'/>{translatedMenuItems[1]} ID</div>
                        <div className="font-bold  w-[16rem] font-poppins text-xs md:w-[16.4rem]">
                        <DateRangeIcon className='!text-icon  '  /> {translatedMenuItems[2]}</div>
                        <div className="font-bold  w-[7rem] font-poppins text-xs md:w-[7.4rem]">
                        <ContactPageIcon className='!text-icon  '  /> {translatedMenuItems[3]}</div>
                        <div className="font-bold w-[7.01rem] font-poppins text-xs md:w-[7.4rem]">
                         <CurrencyExchangeIcon className='!text-icon  mr-1  text-[#e4eb2f]' />{translatedMenuItems[4]}</div>
                        <div className="font-bold  w-[6rem] font-poppins text-xs md:w-[6.14rem]">
                        <UpdateIcon className='!text-icon mr-1 text-[#ff66b3]' /> {translatedMenuItems[5]}</div>
                      
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.orderCustomerList.length}
          next={handleLoadMore}
          loader={props.fetchingOrderCustomer?<div class="flex justify-center" >Loading...</div>:null}
          height={"79vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {props.orderCustomerList.length === 0 ? (
    <div className="text-center text-gray-500">Data not available</div>
  ) : props.orderCustomerList.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
             
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 py-ygap items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 border-l-2 border-green-500 bg-[#eef2f9]
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                        <div className=" flex   md:w-[12rem] max-sm:flex-row max-sm:justify-between items-center justify-start bg-[#eef2f9] h-8 ">
                            <div class=" text-xs ml-gap font-poppins">
                                {item.orderType}
                            </div>
                            {date === currentDate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                 {translatedMenuItems[9]} 
                                </span>
                              ) : null}
                        </div>
                      
                        </div>
                        <div className=" flex   md:w-[25.1rem] items-center justify-start ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  items-center font-poppins">
                             {item.newOrderNo}
                            </div>
                    
                        </div>



                        <div className=" flex   md:w-[15.2rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                            {date}
                            </div>

                        </div>


                        <div className=" flex  md:w-[15.3rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                
                                <MultiAvatar2
                    primaryTitle={item.contactPersonName}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
                            </div>

                        </div>
                        <div className=" flex   md:w-[10.4rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.paymentAmount}
                            </div>

                        </div>
                        <div class="items-center justify-center ml-gap bg-[#eef2f9] h-8 flex">
                        <div style={{ filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))" }} class="rounded-full bg-white md:w-5 h-5 cursor-pointer">
                                            <Tooltip title={translatedMenuItems[5]}>
                                             
                                                                <EventRepeatIcon

                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatuShowDrawer(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                            </div> 
                                          

                                            <div class="w-6">
                                            <a
              href={`${base_url2}/customer/pdf/${item.orderId}`}
            target="_blank"
            >
            <PictureAsPdfIcon className="!text-icon text-[red]"/>
                           </a>
          </div>
                       

                </div>
            </div>
            </div>
            );
          })}
        </InfiniteScroll>
      </div>
    
    </>
    <ProcureStatusShowDrawer
selectedLanguage={props.selectedLanguage}
translateText={props.translateText} 
           particularRowData={particularRowData}
           showStatusDrwr={props.showStatusDrwr}
           handleStatuShowDrawer={props.handleStatuShowDrawer}
           />
  </div>
  );



}

const mapStateToProps = ({ distributor,procre,auth }) => ({
  orderCustomerList: distributor.orderCustomerList,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  showStatusDrwr:distributor.showStatusDrwr,
  fetchingOrderCustomer:distributor.fetchingOrderCustomer
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {

      getCustomerOrder,
      handleStatuShowDrawer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTableC);
