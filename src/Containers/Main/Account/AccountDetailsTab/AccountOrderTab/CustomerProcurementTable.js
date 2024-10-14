import React, { useEffect, useState, lazy,useRef,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input,Select } from "antd";
import dayjs from "dayjs";
import {
  // getOrderProcurement,
  getDistributorOrderOfHigh,
  getDistributorOrderOfMedium,
  getDistributorOrderOfLow,
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords,
  handleProcureDetailsModal,
  handleStatuShowDrawer,
  searchCustomerOrderNoData,
  ClearReducerData,

} from "../../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";

import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { AudioOutlined } from '@ant-design/icons';
import { base_url2 } from "../../../../../Config/Auth";
import axios from "axios";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Option } = Select;
const { Search } = Input;
const UpdateProcureModal = lazy(() => import('./UpdateProcureModal'));
const AccountProcureDetailsModal = lazy(() => import('../AccountProcureDetailsModal'));
const ProcureStatusShowDrawer = lazy(() => import('./ProcureStatusShowDrawer'));
const ProcureInvoiceListDrawer = lazy(() => import('./ProcureInvoiceListDrawer'));


function CustomerProcurementTable(props) {
  const [page, setPage] = useState(0);
  const [openInvoiceModal,setopenInvoiceModal] = useState(false);
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); 
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);
    const [date, setDate] = useState('');

  useEffect(() => {
    props.getProcureRecords(props.distributorId,"procure");
    props.getDistributorOrderOfHigh(props.distributorId, page, "procure","High");
    // props.getDistributorOrderOfMedium(props.distributorId, page, "procure","Medium");
    props.getDistributorOrderOfLow(props.distributorId, page, "procure","Low")
    // props.getOrderProcurement(props.distributorId, page,"procure");
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
                "106",//0
                "660", 
                "772",
                "658",//3
               "1170",
                "73",//5
               "1171",
                "142",//7
                "108",
                "679", //9created date
                "1169",//10 invoice
               "100", // New11
               "142", // "Status"12
               "14", //Category

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

  // useEffect(() => {
  //   return () => props.emptyOrders();
  // }, []);
  const [hasMore, setHasMore] = useState(true);

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
const handleLoadMore = () => {
  setPage(page + 1);
  // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
  props.getDistributorOrderOfHigh(props.distributorId, page, "procure","High")
};

// const handleLoadMoreMedium = () => {
//   setPage(page + 1);
//   props.getDistributorOrderOfMedium(props.distributorId, page, "procure","Medium")
// };
const handleLoadMoreLow = () => {
  setPage(page + 1);
  // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
  props.getDistributorOrderOfLow(props.distributorId, page, "procure","Low")
};
  // const handleLoadMore = () => {
  //   setPage(page + 1);
  //   props.getOrderProcurement(props.currentUser ? props.currentUser : props.distributorId, page,"procure"
  //   );
  // }
  //  if (props.fetchingOrderProcurement) {
  //   return <BundleLoader />;
  // }


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    // props.getCustomerRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
    }, [ transcript]);
    const handleChange = (e) => {
      setCurrentData(e.target.value);
      if (searchOnEnter && e.target.value.trim() === "") {  //Code for Search
        props.getDistributorOrderOfHigh(props.distributorId, "0", "procure","High")
        props.getDistributorOrderOfLow(props.distributorId, "0", "procure","Low")
        props.ClearReducerData();
        setSearchOnEnter(false);
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
         props.searchCustomerOrderNoData(currentData);
        setSearchOnEnter(true);  //Code for Search
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };
    const handleStartListening = () => {
      setStartTime(Date.now());
      setIsRecording(true);
      SpeechRecognition.startListening();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        SpeechRecognition.stopListening();
        setIsRecording(false);
      }, minRecordingTime);
    };
    const suffix = (
      <AudioOutlined
        onClick={handleStartListening}
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
  
      />
    );

  const handleStopListening = () => {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      if (transcript.trim() !== "") {
        setCurrentData(transcript);
        props.searchCustomerOrderNoData(transcript);
        setSearchOnEnter(true);
      }
    };
    useEffect(() => {
      if (!listening && isRecording) {
        handleStopListening();
      }
    }, [listening]);
    useEffect(() => {
      if (isRecording && !listening) {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minRecordingTime) {
          SpeechRecognition.startListening();
        } else {
          setIsRecording(false);
        }
      }
    }, [listening, isRecording, startTime]);

    useEffect(() => {
      setData(props.highDistributorOrder);
  }, [props.highDistributorOrder]);

//   useEffect(() => {
//     setData(props.highDistributorOrder);
// }, [props.highDistributorOrder]);


    const handleInputChange = (value, key, dataIndex) => {
      const updatedData = data.map((item) =>
          item.orderId === key ? { ...item, [dataIndex]: value } : item
      );
      setData(updatedData);
  //     const updatedTrackId = updatedData.find(item => item.orderId === key)?.trackId;
  // settrackId(updatedTrackId);
  };
  
    const handleDateChange = (e, item) => {
      const selectedDate = new Date(e.target.value);
      const deliveryDate = new Date(item.deliveryDate);
  setDate(e.target.value);

      // if (selectedDate >= deliveryDate) {
      //     setDate(e.target.value);
      // } else {   
      //     alert('Shipping date cannot be earlier than delivery date');
      // }
  };
  
  
    const handleEditClick = (orderId) => {
      setEditsuppliesId(orderId);
    };
    const handleCancelClick = (orderId) => {
      setEditedFields((prevFields) => ({ ...prevFields, [orderId]: undefined }));
      setEditsuppliesId(null);
    };
  
 
  

  const handlePostChange =  async (item) => {
      let updatedItem={
          packingDate: new Date(date).toISOString(),
        // trackId:trackId?trackId:item.trackId,
        orderId:item.orderId,
      }
      // props.updateOrdrSuplrItems(data);
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${props.token}`  // Replace with your actual token if required
        };

          const response = await axios.put(`${base_url2}/phoneOrder/procureDispatch`, updatedItem, { headers });
          console.log("API Response:", response.data);
      setData(prevData => 
            prevData.map(cat =>
              cat.orderId === item.orderId ? response.data : cat
            )
          );
          setEditsuppliesId(null);
        } catch (error) {
          console.error("Error updating item:", error);
          setEditsuppliesId(null);
        }
    };


    const exportPDFAnnexure = async () => {
      var doc = new jsPDF();
  
      // Define the static text
      var companyName = `1 Di Inc.`;
      var companyAddress = `21A-81 Northern Heights Drive\nRichmond Hill ON L4B 4C9\n+14162780878\nsales@1di.ca\nGST/HST Registration No.: 71265570`;
      var billTo = `BILL TO\nRobert Cowman\nFG Bradley's Fairview\n1800 Sheppard Ave E. Fairview Mall\nUnit 2045\nToronto Ontario M2J 5A7`;
      var shipTo = `SHIP TO\nRobert Cowman\nFG Bradley's Fairview\n1800 Sheppard Ave E. Fairview Mall\nUnit 2045\nToronto Ontario M2J 5A7`;
  
      // Invoice details
      var invoiceDetails = `INVOICE # 1361\nDATE: 30/08/2024\nDUE DATE: 29/09/2024\nTERMS: Net 30`;
      var purchaseOrder = `PURCHASE ORDER #: BO-TM9456525`;
  
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
  
      // Header background color (light blue)
      doc.setFillColor(62, 115, 185);
      doc.rect(0, 0, 210, 13, 'F');  // Full-width top blue bar
  
      // Company Info
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(companyName, 10, 20);
      doc.setFontSize(10);
      doc.text(companyAddress, 10, 25);
  
      // Order Information
      doc.setFontSize(12);
      doc.text("ORDER", 10, 50);
      doc.setFontSize(10);
      doc.text(billTo, 10, 60);
      doc.text(shipTo, 80, 60);
  
      // Invoice Details (right-hand side)
      doc.text(invoiceDetails, 140, 50);
      doc.text(purchaseOrder, 140, 80);
  
      // Table Headers
      doc.setFontSize(10);
      doc.text(skuHeader, 10, 100);
      doc.text(descriptionHeader, 40, 100);
      doc.text(qtyHeader, 100, 100);
      doc.text(rateHeader, 120, 100);
      doc.text(amountHeader, 150, 100);
  
      // Draw product details inside the table
      let yPosition = 110;
      productDetails.forEach(item => {
          doc.text(item.sku, 10, yPosition);
          doc.text(item.description, 40, yPosition);
          doc.text(item.qty.toString(), 100, yPosition);
          doc.text(item.rate, 120, yPosition);
          doc.text(item.amount, 150, yPosition);
          yPosition += 10;
      });
  
      // Horizontal line below the product details
      doc.line(10, yPosition, 200, yPosition);
      yPosition += 10;
  
      // Subtotal, Tax, and Total
      doc.text(`Subtotal: ${subtotal}`, 140, yPosition);
      yPosition += 10;
      doc.text(`HST (ON) @ 13%: ${hst}`, 140, yPosition);
      yPosition += 10;
      doc.text(`TOTAL: CAD ${total}`, 140, yPosition);
  
      // Footer Section
      yPosition += 20;
      doc.setFontSize(12);
      doc.text("TAX SUMMARY", 10, yPosition);
      yPosition += 10;
      doc.setFontSize(10);
      doc.text(`HST (ON) @ 13%: ${hst}`, 10, yPosition);
      doc.text(`TOTAL: CAD ${total}`, 140, yPosition);
  
      // Terms and Conditions
      yPosition += 40;
      doc.setFontSize(12);
      doc.text("TERM & CONDITIONS", 10, yPosition);
      yPosition += 10;
      doc.setFontSize(9);
      doc.text("Payment is due within 30 days.", 10, yPosition);
      doc.text("Please make checks payable to: 1 Di Inc.", 10, yPosition + 10);
  
      // Footer background color (blue)
      doc.setFillColor(62, 115, 185);
      doc.rect(0, 276, 210, 15, 'F');  // Footer bar
      doc.setTextColor(255, 255, 255);
      doc.text("Thank you for your business!", 10, 285);
  
      // Save the PDF
      doc.save("Commerce.pdf");
  };
  
  // Commerce
  return (
    <>
 <div class=" flex justify-between">
        <div class="w-48 mb-3">
          <div>
            <div>
            <Input
          placeholder="Search by Name "
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />

            </div>
          </div>
        </div>
        
      </div>

    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[92%%] p-1 bg-transparent font-bold sticky text-xs font-poppins  z-10">
        <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">
        {translatedMenuItems[0]} {/* Urgent */}
           </div>
                        <div className=" md:w-[5.4rem] ml-2">
                        {translatedMenuItems[1]} ID{/* <FormattedMessage id="app.orderid" defaultMessage="Order ID"/> */}
                          </div>
                          <div className=" md:w-[2rem]">  
                          {translatedMenuItems[9]}
                          </div>
                        <div className=" md:w-[4.1rem]">
                        {translatedMenuItems[2]} {/* <FormattedMessage id="app.delivery" defaultMessage="Delivery"/> */}
                          </div>
                        <div className=" md:w-[11.8rem] ">
                        {translatedMenuItems[3]} {/* <FormattedMessage id="app.location" defaultMessage="Location"/> */}
                          </div>
                          <div className=" md:w-[4.1rem]">
                        {/* {translatedMenuItems[2]}  */} Items
                          </div>
                        <div className="md:w-[1.8rem]">
                        {translatedMenuItems[5]} {/* <FormattedMessage id="app.contact" defaultMessage="Contact"/> */}
                          </div>
                        <div className="md:w-[1.8rem]">
                        {translatedMenuItems[6]}{/* <FormattedMessage id="app.payment" defaultMessage="Payment"/> */}
                          </div>
                        <div className="md:w-[1.8rem]">
                        {translatedMenuItems[7]} {/* <FormattedMessage id="app.Status" defaultMessage="Status"/> */}
                          </div>
                      
                        


                    </div>
    
                    <InfiniteScroll
                        dataLength={data.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfHigh ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"33vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {data.length ?
                            <>
                                {data.map((item) => {
                                   const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex  w-wk items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex  items-center  md:w-[7.56rem] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                                      <div class="  text-blue-500  font-poppins font-semibold  cursor-pointer">
                      
                                                                                          {item.priority === "High" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                                          )}
                                                                                       
                                                                                          {item.priority === "Low" && (
                                                                                              <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                                      </div>
                                                                                  </div>
                                                                              </Tooltip>
                                                                          </div>
                      
                                              <div class="max-sm:w-full items-center  md:w-[10.02rem]">
                                                <Tooltip>
                                                  <div class="max-sm:w-full  justify-between flex md:flex flex-row text-xs">
                                                  <span
                                                                                          class="underline font-bold cursor-pointer text-[#1890ff]"
                                                                                          onClick={() => {
                                                                                              props.handleProcureDetailsModal(true);
                                                                                              handleSetParticularOrderData(item);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-[0.65rem] text-[tomato] font-bold">
                                            {/* New */}
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                            </div>
                                            <div className=" flex ml-2 md:w-[4.31rem] text-xs  max-sm:flex-row w-full max-sm:justify-between ">
                                                    {date}
                                                    </div>
                                          </div>
                                        
                                          <div class="flex flex-row text-xs items-center md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                                        
                                            
                                            <div class="max-sm:w-full justify-between flex md:text-xs">
                                            {` ${dayjs(item.deliveryDate).format("DD/MM/YYYY")}`}
                                                  </div>
                      
                                         
                                          </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex   md:w-[18.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-xs">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        {/* <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.budget}
                                            </div>
                                        </div> */}
                                     
                                        <div class="flex flex-row items-center md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {/* {item.contactPersonName} */}
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.paymentInTerms}
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.status}                                              
                                            </div>
                                        </div>
                                        <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {editsuppliesId === item.orderId ? (
                                                         
                                                                <input
          type="date"
          // value={date}
          value={dayjs(item.packingDate).format("YYYY-MM-DD")}
          onChange={(e) => handleDateChange(e,item)}
        //   min={moment(item.deliveryDate).format("YYYY-MM-DD")}
          class="border border-black rounded"
        /> ) : (
            <div className="font-normal text-sm  font-poppins">
               {item.packingDate === null ? "" :
              <div> 
              {dayjs(item.packingDate).format("YYYY/MM/DD")} 
              </div>}
            </div>
          )}
                                                        </div>
                                                    </div>
                                        <div class="flex flex-row items-center md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <Button type="primary" onClick={()=>{setopenInvoiceModal(true);
                     handleSetParticularOrderData(item);
                  }}>
                    {translatedMenuItems[10]}
                    </Button>
                  </div>
                                        <div style={{ filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))" }} class="rounded-full bg-white md:w-5 h-5 cursor-pointer">
                                            <Tooltip title= {translatedMenuItems[12]}>
                                            {/* // {<FormattedMessage
                                            //                     id="app.status"
                                            //                     defaultMessage="Status"
                                            //                 />}> */}
                                                                <EventRepeatIcon

                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatuShowDrawer(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                            
                                                            <div class="w-6">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-[red]"/>
                           </span>
          </div>
                                            </div> 

                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex w-20  md:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
    {editsuppliesId === item.orderId ? (
                        <>
                      <Button 
                      type="primary"
                      // loading={props.updatingOrdrSuplrItems}
                      onClick={() => handlePostChange(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.orderId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <>
                      
                      <Button
                      type="primary"
                        onClick={() => handleEditClick(item.orderId)}
                      >Pack</Button>
                  
                    </>
                    )}
    </div>
    </div>

                                      </div>
                                    
                                    </div>


                                    )
                                })}
                            </> : !data.length && !props.fetchingDistributorOfHigh ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
     
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky text-xs font-poppins z-10">
        <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[teal]">
        {translatedMenuItems[8]} {/* Normal */}
           </div>
                        <div className=" md:w-[4.4rem] ml-2">
                        {translatedMenuItems[1]} ID{/* <FormattedMessage id="app.orderid" defaultMessage="Order ID"/> */}
                          </div>
                          <div className=" md:w-[2rem]">
                          {translatedMenuItems[9]}
                          </div>
                        <div className=" md:w-[4.1rem]">
                        {translatedMenuItems[2]} {/* <FormattedMessage id="app.delivery" defaultMessage="Delivery"/> */}
                          </div>
                        <div className=" md:w-[8.8rem] ">
                        {translatedMenuItems[3]} {/* <FormattedMessage id="app.location" defaultMessage="Location"/> */}
                          </div>
                          <div className=" md:w-[4.1rem]">
                        {/* {translatedMenuItems[2]}  */} Items
                          </div>
                        <div className="md:w-[1.8rem]">
                        {translatedMenuItems[5]} {/* <FormattedMessage id="app.contact" defaultMessage="Contact"/> */}
                          </div>
                        <div className="md:w-[1.8rem]">
                        {translatedMenuItems[6]}{/* <FormattedMessage id="app.payment" defaultMessage="Payment"/> */}
                          </div>
                        <div className="md:w-[1.8rem]">
                        {translatedMenuItems[7]} {/* <FormattedMessage id="app.Status" defaultMessage="Status"/> */}
                          </div>
                       
                     
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.lowDistributorOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfLow ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"33vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.lowDistributorOrder.length ?
                            <>
                                {props.lowDistributorOrder.map((item) => {
                                  const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
               <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                  <div class="flex">
                    <div className=" flex w-wk items-center   max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                      <div className=" flex  items-center  md:w-[7.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class="  text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>

                        <div class="max-sm:w-full items-center  md:w-[10.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full  justify-between flex md:flex flex-row text-xs">
                            <span
                                                                    class="underline cursor-pointer font-bold text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleProcureDetailsModal(true);
                                                                    }}
                                                                >{item.newOrderNo}</span>
                                                                 <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-[0.65rem] text-[tomato] font-bold">
                  {translatedMenuItems[11]}     {/* New */}
                    </span>
                  ) : null} </span>
                             
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                      <div className=" flex ml-2 md:w-[4.31rem] max-sm:flex-row w-full max-sm:justify-between text-xs ">
                                                    {date}
                                                    </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[11rem] max-sm:flex-row w-full text-xs max-sm:justify-between">
                  
                      
                      <div class="max-sm:w-full justify-between flex md:text-xs">
                   {dayjs(item.deliveryDate).format("DD/MM/YYYY")}
                            </div>

                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex  md:w-[18.01rem] max-sm:flex-row w-full max-sm:justify-between text-xs ">
                      <div class=" font-poppins text-xs">

                      {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
         
        `}
                      </div>
                    </div>
                  </div>
                  {/* <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
                        {item.budget}
                      </div>
                  </div> */}
               
                  <div class="flex flex-row items-center md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
                        {/* {item.contactPersonName} */}
                        <MultiAvatar
                                primaryTitle={item.contactPersonName}
                            
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                      </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
                        {item.paymentInTerms}
                      </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.shipById}
                                            </div>
                                        </div>
                  <div class="flex flex-row items-center md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <Button type="primary" onClick={()=>{
                    setopenInvoiceModal(true);
                     handleSetParticularOrderData(item);
                  }}>
                    {translatedMenuItems[10]}
                    </Button>
                    
                  </div>
                  <div class="flex w-6 max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                        {/* <Tooltip title={<FormattedMessage
                                                                id="app.edit"
                                                                defaultMessage="Edit"
                                                            />}>
                                                                <BorderColorIcon 
                                                                    className=" !text-icon cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditProcure(item)
                                                                        props.handleUpdateProcureDetailModal(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                                </Tooltip> */}
                                                       <div style={{ filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))" }} class="rounded-full bg-white md:w-5 h-5 cursor-pointer">
                                            <Tooltip title={translatedMenuItems[12]}>
                                             {/* {<FormattedMessage
                                                                id="app.status"
                                                                defaultMessage="Status"
                                                            />}> */}
                                                                <EventRepeatIcon

                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatuShowDrawer(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                            
                                                            <div class="w-6">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-[red]"/>
                           </span>
          </div>
                                            </div> 
                                                        </div>
                                                     

                                                    </div>
                </div>
              </div>


                                    )
                                })}
                            </> : !props.lowDistributorOrder.length && !props.fetchingDistributorOfLow ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
      
      <UpdateProcureModal
      selectedLanguage={props.selectedLanguage}
      translateText={props.translateText} 
                    particularRowData={particularRowData}
                    distributorId={props.distributorId}
                    handleUpdateProcureDetailModal={props.handleUpdateProcureDetailModal}
                    updateProcureDetailModal={props.updateProcureDetailModal}
                />

                <AccountProcureDetailsModal
                particularRowData={particularRowData}
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                handleProcureDetailsModal={props.handleProcureDetailsModal}
                addProcureDetailsModal={props.addProcureDetailsModal} />

<ProcureStatusShowDrawer
selectedLanguage={props.selectedLanguage}
translateText={props.translateText} 
           particularRowData={particularRowData}
           showStatusDrwr={props.showStatusDrwr}
           handleStatuShowDrawer={props.handleStatuShowDrawer}
           />
         
         <ProcureInvoiceListDrawer
                    particularRowData={particularRowData}
         openInvoiceModal={openInvoiceModal}
         setopenInvoiceModal={setopenInvoiceModal}
         translatedMenuItems={translatedMenuItems}
         />
    </>
  );



}

const mapStateToProps = ({ distributor }) => ({
  addProcureDetailsModal:distributor.addProcureDetailsModal,
  procurementOrder: distributor.procurementOrder,
  updateProcureDetailModal:distributor.updateProcureDetailModal,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,
  procureRecordData:distributor.procureRecordData,
  highDistributorOrder:distributor.highDistributorOrder,
    fetchingDistributorOfHigh:distributor.fetchingDistributorOfHigh,
    mediumDistributorOrder:distributor.mediumDistributorOrder,
    fetchingDistributorOfMedium:distributor.fetchingDistributorOfMedium,
    lowDistributorOrder:distributor.lowDistributorOrder,
    fetchingDistributorOfLow:distributor.fetchingDistributorOfLow,
    showStatusDrwr:distributor.showStatusDrwr,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistributorOrderOfHigh,
      getDistributorOrderOfMedium,
      getDistributorOrderOfLow,
      // getOrderProcurement,
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords,
      handleProcureDetailsModal,
      handleStatuShowDrawer,
      ClearReducerData,
      searchCustomerOrderNoData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerProcurementTable);
