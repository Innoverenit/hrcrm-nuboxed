import React, { useEffect, useState,lazy ,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip} from "antd";
import dayjs from "dayjs";
import {
  getQuotationRepairOrder,
  getQuotationProcureOrder,
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords,
  handleProcureDetailsModal,
  quotationToOrder
} from "../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { BundleLoader } from "../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import OpportunitytProcureDetailsModal from "./OpportunitytProcureDetailsModal";
import OpportuniyConvertDrawer from "./OpportuniyConvertDrawer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";

const AccountProcureDetailsModal = lazy(() => import('../AccountDetailsTab/AccountProcureDetailsModal'));

function LinkedOpportunityTable(props) {

  const [page, setPage] = useState(0);
  useEffect(() => {
    // props.getProcureRecords(props.distributorData.distributorId,"Quotation");
    props.getQuotationRepairOrder(props.distributorData.distributorId, page, "Repair",);
    props.getQuotationProcureOrder(props.distributorData.distributorId, page, "Procure",);
  

    setPage(page + 1);
  }, []);

  const [openConvertModal,setopenConvertModal]=useState(false);
  const [particularRowItem, setParticularRowItem] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
           "661", //   "Repair",0
          "213",  //   "Quotation",1
           "772", //   "Delivery",2
          "658",  //   "Location",3
           "218", //  "Value",4
          "73",  //   "Contact",5
         "1171",   //  "Payment",6
           "142", //   "Status",7
          "1172", //   "To Order",8
           "1212", //   "Commerce",9
           "679", //   "Created Date"10
        "100",  //  New11
        "1300",  //  Change status to Customer?12
          "387", //  Convert13
         "1341",   // "Change status to Order?
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
 
    
  const [hasMore, setHasMore] = useState(true);

  function handleRowItem(item) {
    setParticularRowItem(item);


}
const handleLoadMore = () => {
  setPage(page + 1);
  
  props.getQuotationRepairOrder(props.distributorData.distributorId, page, "Repair")
};

const handleLoadMoreMedium = () => {
  setPage(page + 1);
  
  props.getQuotationProcureOrder(props.distributorData.distributorId, page, "Procure",)
};

const handleConfirm = (quotationId) => {
  // Call the function to change the status to "Lost" here
  props.quotationToOrder(quotationId,props.userId);
};




  const exportPDFAnnexure = () => {
    const doc = new jsPDF();

    // Add the header details
    doc.text('1 Di Inc.', 20, 20);
    doc.text('21A-81 Northern Heights Drive', 20, 30);
    doc.text('Richmond Hill ON L4B 4C9', 20, 40);
    doc.text('+14162780878', 20, 50);
    doc.text('sales@1di.ca', 20, 60);
    doc.text('GST/HST Registration No.: 71265570', 20, 70);

    // Add title
    doc.setFontSize(26);
    doc.setTextColor(0, 128, 128); // Teal color
    doc.text('ORDER', 105, 90, { align: 'center' });

    // Billing & Shipping Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text('BILL TO', 20, 110);
    doc.text('Robert Cowman', 20, 120);
    doc.text('FG Bradley\'s Fairview', 20, 130);
    doc.text('1800 Sheppard Ave E. Fairview', 20, 140);
    doc.text('Mall, Unit 2045', 20, 150);
    doc.text('Toronto Ontario M2J 5A7', 20, 160);

    doc.text('SHIP TO', 105, 110);
    doc.text('Robert Cowman', 105, 120);
    doc.text('FG Bradley\'s Fairview', 105, 130);
    doc.text('1800 Sheppard Ave E. Fairview', 105, 140);
    doc.text('Avenue E', 105, 150);
    doc.text('Mall, Unit 2045', 105, 160);
    doc.text('Toronto Ontario M2J 5A7', 105, 170);

    // Invoice Details
    doc.text('INVOICE', 160, 110);
    doc.text('1361', 160, 120);
    doc.text('DATE', 160, 130);
    doc.text('30/08/2024', 160, 140);
    doc.text('DUE DATE', 160, 150);
    doc.text('29/09/2024', 160, 160);
    doc.text('TERMS Net', 160, 170);
    doc.text('30', 160, 180);

    // Ship Details
    doc.text('SHIP DATE', 20, 190);
    doc.text('30/08/2024', 20, 200);
    doc.text('SHIP VIA', 60, 190);
    doc.text('MIKE DROPOFF', 60, 200);
    doc.text('SALES REP', 120, 190);
    doc.text('Tracy Sales', 120, 200);
    doc.text('PURCHASE ORDER #', 170, 190);
    doc.text('BO-TM9456525', 170, 200);

    // Order Table
    doc.autoTable({
      head: [['SKU', 'DESCRIPTION', 'QTY', 'RATE', 'AMOUNT']],
      body: [
        ['KES477', '477 | Jumbo Foam D20', '36', '12.50', '450.00'],
      ],
      startY: 210,
      theme: 'striped',
      headStyles: { fillColor: [140, 190, 230], textColor: [0, 128, 128] },
    });

    // Subtotal, Tax, Total
    doc.text('SUBTOTAL', 130, doc.previousAutoTable.finalY + 20);
    doc.text('450.00', 180, doc.previousAutoTable.finalY + 20);
    doc.text('HST (ON) @ 13%', 130, doc.previousAutoTable.finalY + 30);
    doc.text('58.50', 180, doc.previousAutoTable.finalY + 30);
    doc.text('TOTAL', 130, doc.previousAutoTable.finalY + 40);
    doc.text('508.50', 180, doc.previousAutoTable.finalY + 40);
    doc.text('BALANCE DUE', 130, doc.previousAutoTable.finalY + 50);
    doc.setFontSize(22);
    doc.setFont('bold');
    doc.text('CAD 508.50', 180, doc.previousAutoTable.finalY + 50);

    // Tax Summary
    doc.setFontSize(14);
    doc.setFont('normal');
    doc.text('TAX SUMMARY', 20, doc.previousAutoTable.finalY + 70);
    doc.autoTable({
      head: [['RATE', 'TAX', 'NET']],
      body: [['HST (ON) @ 13%', '58.50', '450.00']],
      startY: doc.previousAutoTable.finalY + 80,
      theme: 'striped',
      headStyles: { fillColor: [140, 190, 230], textColor: [0, 128, 128] },
    });

    // Footer
    doc.text(
      'Please send all EFT remittance to Sales@1Di.ca',
      105,
      280,
      { align: 'center' }
    );

    doc.save('invoice.pdf');
  };


// Quotation
  return (
    <>
     { props.user.repairInd === true &&(
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent  sticky  z-10">
        <div className='flex   justify-between w-[81%]  text-xs font-bold font-poppins'>
             <div class="text-[#00A2E8] text-base w-[9.55rem]"> {translatedMenuItems[0]}</div>
                        <div className="  w-[11.4rem] md:w-[7.4rem]"> {translatedMenuItems[1]} ID</div>
                        <div className=" md:w-[8rem]">
                        {translatedMenuItems[10]}  
                          </div>
                        <div className=" md:w-[12.1rem]"> {translatedMenuItems[2]}</div>
                        <div className=" md:w-[14.8rem] "> {translatedMenuItems[3]}</div>
                        <div className="md:w-[7.8rem]"> {translatedMenuItems[4]}</div>
                        <div className="md:w-[8.7rem]"> {translatedMenuItems[5]}</div>
                    
                        <div className="md:w-[8.8rem]"> {translatedMenuItems[8]}</div>
                        
                       </div>
                        </div>
    
                    <InfiniteScroll
                        dataLength={props.quotationRepairOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingQuotationRepairOrder ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"34vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.quotationRepairOrder.length ?
                            <>
                                {props.quotationRepairOrder.map((item) => {
                                   const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                        <div className="flex rounded mt-1 bg-white h-8 items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex   w-wk items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex  items-center  md:w-[7.56rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:">
                                                                                      <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                      
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
                      
                                              <div class="max-sm:w-full   md:w-[7.02rem] items-center justify-center ml-gap bg-[#eef2f9] h-8">
                                                <Tooltip>
                                                  <div class="max-sm:w-full   flex md:flex flex-row text-xs">
                                                  <span
                                                                                          class="underline cursor-pointer font-bold text-[#1890ff]"
                                                                                          onClick={() => {
                                                                                            handleRowItem(item);
                                                                                              props.handleProcureDetailsModal(true);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-[0.65rem] text-[tomato] font-bold ml-1">
                                           {translatedMenuItems[11]} {/* New */}
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                              <div className="  ml-2 items-center justify-center ml-gap bg-[#eef2f9] h-8 text-xs flex md:w-[7.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    {date}
                                                    </div>
                                            </div>
                                            
                                          </div>
                      
                                          <div class="flex flex-row items-center md:w-[9rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between text-xs">
                                        
                                            
                                        <div class="max-sm:w-full justify-between flex md: text-xs">
                                        {date}
                                              </div>
                  
                                     
                                      </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  text-xs md:w-[16.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-xs">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.budget}
                                            </div>
                                        </div>
                                     
                                        <div class="flex flex-row items-center md:w-[5.03rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                            </div>
                                        </div>
                                   
                                      
                  <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[14.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
               
                          
                            <Button type="primary"
                              style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}
                             onClick={()=> { handleRowItem(item);
                              setopenConvertModal(true)}}
                              >
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] flex justify-between items-center " >
                              <NextPlanIcon  className="!text-icon"/>
                              {translatedMenuItems[13]} {/* Convert */}
                          
                              </div>
                            </Button>
                          
                        {/* </Popconfirm> */}
                      </div>

                     
                  </div>
                  <div class="w-[9.40rem] items-center  ml-gap bg-[#eef2f9] h-8 justify-end flex">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-[red]"/>
                           </span>
          </div>            
                                      </div>
                                    </div>


                                    )
                                })}
                            </> : !props.quotationRepairOrder.length && !props.fetchingQuotationRepairOrder ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
     )}
     { props.user.moduleMapper.ecomModInd === true &&(
      <div class="rounded m-1 mt-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent  sticky  z-10">
        <div className='flex   justify-between w-[86%]  text-xs font-bold font-poppins'>
<div class="text-[#00A2E8] text-base w-[6.55rem]"> {translatedMenuItems[9]}</div>
<div className=" md:w-[7.4rem]"> {translatedMenuItems[1]} ID</div>
<div className=" md:w-[7rem]">
{translatedMenuItems[10]}
                        </div>
                        <div className=" md:w-[10.1rem]"> {translatedMenuItems[2]}</div>
                        <div className=" md:w-[8.8rem] "> {translatedMenuItems[3]}</div>
                        <div className="md:w-[7.8rem]"> {translatedMenuItems[4]}</div>
                        <div className="md:w-[8.7rem]"> {translatedMenuItems[5]}</div>           
                        <div className="md:w-[8.8rem]"> {translatedMenuItems[8]}</div>
                      
                   </div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.quotationProcureOrder.length}
                        next={handleLoadMoreMedium}
                        hasMore={hasMore}
                        loader={props.fetchingQuotationProcureOrder ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"34vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.quotationProcureOrder.length ?
                            <>
                                {props.quotationProcureOrder.map((item) => {
                                 const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    const date1 =  dayjs(item.deliveryDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                      <div className="flex rounded  mt-1 bg-white h-8 items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex  w-wk items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex items-center  md:w-[7.56rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:">
                                                                                      <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                      
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
                      
                                              <div class="max-sm:w-full text-xs items-center justify-center ml-gap bg-[#eef2f9] h-8  md:w-[8.02rem]">
                                                <Tooltip>
                                                  <div class="font-bold max-sm:w-full   flex md:flex flex-row text-xs">
                                                  <span
                                                                                          class="underline font-bold cursor-pointer text-[#1890ff]"
                                                                                          onClick={() => {
                                                                                              handleRowItem(item);
                                                                                              props.handleProcureDetailsModal(true);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-[0.65rem] text-[tomato] font-bold ml-1">
                                           {translatedMenuItems[11]} {/* New */}
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                              <div className=" ml-2 flex md:w-[7.31rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between text-xs ">
                                                    {date}
                                                    </div>
                                            </div> 
                                          </div>
                      
                                          <div class="flex flex-row md:w-[9rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between text-xs">
                                        
                                            
                                            <div class="max-sm:w-full justify-between flex md: text-xs">
                                            {date1}
                                                  </div>
                      
                                         
                                          </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex   text-xs md:w-[16.01rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-xs">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[6.03rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.budget}
                                            </div>
                                        </div>
                                     
                                        <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[12.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {/* {item.contactPersonName} */}
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                            </div>
                                        </div>
                                    
                                        <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[14.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
             
                  <Button type="primary"  style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }} 
                  onClick={()=>{  handleRowItem(item); setopenConvertModal(true)}}
                  >
                  <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] flex justify-between items-center " >
                  <NextPlanIcon  className="!text-icon"/>
                  {translatedMenuItems[13]}  {/* Convert */}
                       
                              </div>
                     </Button>
                  {/* </Popconfirm> */}
                
                      </div>

                      
                  </div>
                  <div class="w-[12.40rem] items-center  ml-gap bg-[#eef2f9] h-8 justify-end flex">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-[red]"/>
                           </span>
          </div>
                         </div>
                          </div>  )
                                })}
                            </> : !props.quotationProcureOrder.length && !props.fetchingQuotationProcureOrder ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
)} 
  <Suspense fallback={<BundleLoader />}>
 <OpportunitytProcureDetailsModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}
                particularRowItem={particularRowItem}
                handleProcureDetailsModal={props.handleProcureDetailsModal}
                addProcureDetailsModal={props.addProcureDetailsModal} />

                <OpportuniyConvertDrawer
                particularRowItem={particularRowItem}
                openConvertModal={openConvertModal}
                setopenConvertModal={setopenConvertModal}
                />
                </Suspense>
    </>
  );
}

const mapStateToProps = ({ distributor,auth }) => ({
  addProcureDetailsModal:distributor.addProcureDetailsModal,
  procurementOrder: distributor.procurementOrder,
  updateProcureDetailModal:distributor.updateProcureDetailModal,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,
  procureRecordData:distributor.procureRecordData,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  quotationRepairOrder:distributor.quotationRepairOrder,
  fetchingQuotationRepairOrder:distributor.fetchingQuotationRepairOrder,
  quotationProcureOrder:distributor.quotationProcureOrder,
    fetchingQuotationProcureOrder:distributor.fetchingQuotationProcureOrder,
    lowDistributorOrder:distributor.lowDistributorOrder,
    fetchingDistributorOfLow:distributor.fetchingDistributorOfLow,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getQuotationRepairOrder,
      getQuotationProcureOrder,
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords,
      handleProcureDetailsModal,
      quotationToOrder
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedOpportunityTable);
