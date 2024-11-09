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
    doc.save("Creditmemo.pdf");
};

// Creditmemo
  return (
    <>
      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-y-auto  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold text-xs font-poppins sticky items-end  z-10">
            <div className="text-[#00A2E8] text-base  w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <DynamicFeedIcon className='!text-base  text-[#e4eb2f]'/>{translatedMenuItems[1]} </div>
            <div className=" w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <ReceiptIcon className="!text-icon text-[#b91372]"/>{translatedMenuItems[2]}</div>         
            <div className="w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {/* Date */}
            <DateRangeIcon className='!text-icon'  /> {translatedMenuItems[5]}</div>
            <div className="w-[5.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {/* Amount */}
            <CurrencyExchangeIcon className="!text-icon text-[#b91372]"/> {translatedMenuItems[6]}</div>         
            <div className="w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            <DateRangeIcon className='!text-icon '  />  {translatedMenuItems[9]}</div>   {/* Created */}
          </div>
          <div className=" overflow-scroll h-[73vh]">
            {data1.map((item) => {
              return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white py-ygap items-center  max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex border-l-2 border-green-500 bg-[#eef2f9]   w-[19.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.newOrderNo}
                      </div>

                    </div>

                    <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]   w-[8.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
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
                    <div className=" flex  items-center justify-center h-8 ml-gap  bg-[#eef2f9]  w-[9.02rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs  font-poppins text-center">
                        {item.creditMemo}

                      </div>
                    </div>
                  
                  </div>
                 

                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
                     
                   

                    
                      <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]   w-[4.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins">
                          <span>
                            <MultiAvatar
                              primaryTitle={item.salesExecutive}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </span>
                        </div>

                        <div class="w-6 ">
                        <a
              href={`${base_url2}/customer/pdf/${item.creditMemoId}`}
            target="_blank"
            >
            <PictureAsPdfIcon className="!text-icon text-[red]"/>
                           </a>
          </div>
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
