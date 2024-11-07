import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input, Select } from "antd";
import { getDistributorOrderPayment, updateOrderPayment, deleteOrderPaymentData, getPaymentMode } from "../../AccountAction";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { BundleLoader } from "../../../../../Components/Placeholder";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import { base_url2 } from "../../../../../Config/Auth";

const { Option } = Select;

function OrderPaymentTable(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
  '926', // 0Transaction 650
  '679', // 1 679Created
  '1424', // 1424Entry
    "929",    // Amount
    "86",   // Mode
    "1422",   // 422Reason
    "116",     // 116Approved
   "1078", // 1078 Save
   "1079", // 1079  Cancel
   "1259",     //  Do you want to delete?1259"
    "84",    //  Delete84
       "1423", //  1423Refund
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
      var name2 =`1912 Harvest Lane New York ,NY 12210 `
      var name3 =`BILL TO`
      var name4 = `SHIP TO`
      var name5 = `PAYMENT #`
      var name6 = `PAYMENT DATE`
      var name7 = `P.O.#`
      var name8 = `PAYMENT Total`
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
    
      doc.save("Payment.pdf")
    
    }

  useEffect(() => {
    // props.getDistributorOrderPayment(props.particularRowData.procureOrderInvoiceId ? props.particularRowData.procureOrderInvoiceId:props.particularRowData.orderPhoneId);
    props.getDistributorOrderPayment(props.particularRowData.orderPhoneId ? props.particularRowData.orderPhoneId:props.particularRowData.procureOrderInvoiceId);
    props.getPaymentMode(props.orgId)
  }, [])
  const [mode, setMode] = useState("");
  const [amount, setAmount] = useState("");
  const [edit, setEdit] = useState(false);
  const [row, setRow] = useState({});

  const handlePaymentMode = (val) => {
    setMode(val)
  }
  const handleChange = (val) => {
    setAmount(val)
  }
  const handleRowData = (item) => {
    setRow(item);
  };
  const handleEditIcon = () => {
    setEdit(!edit);
  };
  const hnadleCallback = () => {
    setAmount("")
    setMode("")
    setEdit(false)
  }

  return (
    <>

      {props.fetchingPaymentHistory ? <BundleLoader /> : <div className=' flex sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">

            <div className=" md:w-[6.1rem]">{translatedMenuItems[0]}  ID</div>
            {/* <div className=" md:w-[4.21rem] ">Invoice Id</div>  */}
            <div className=" md:w-[4.5rem] ">{translatedMenuItems[1]} </div>
            <div className="md:w-[5.8rem]">{translatedMenuItems[2]}</div>
            <div className=" md:w-[4.2rem] ">{translatedMenuItems[3]}</div>  {/* 929 */}
            <div className=" md:w-[4.2rem] ">{translatedMenuItems[4]}</div>
            {/* 86 */}
            <div className=" md:w-[4.2rem] ">{translatedMenuItems[5]}</div>
            <div className=" md:w-[6.2rem] ">{translatedMenuItems[6]} </div>
            <div className="md:w-[6rem]"></div>
          </div>

          {props.paymentHistory.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 "    >
                  <div class="flex">
                    <div className=" flex  md:w-[6.1rem] max-sm:w-full  ">
                      <div class="text-xs  font-semibold  font-poppins cursor-pointer">
                        {item.transactionNumber}
                      </div>
                    </div>
                    {/* <div className=" flex  md:w-[6.12rem] max-sm:w-full  ">
                      <div class="text-xs  font-semibold  font-poppins cursor-pointer">
                        {item.invoiceId}
                      </div>
                    </div> */}
                  </div>

                  <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                  <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">

                    <div class=" text-xs  font-semibold  font-poppins">
                      {dayjs(item.date).format("DD-MM-YY")}
                    </div>
                  </div>
                  <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      {row.paymentId === item.paymentId && edit ? (
                        <Input
                          value={amount}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                      ) : (
                        <div className="font-normal text-xs  font-poppins">
                          <span>  {item.paymentAmount} {item.orderCurrencyName}</span>
                        </div>
                      )}

                    </div>
                  </div>

                  <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      {row.paymentId === item.paymentId && edit ? <Select onChange={handlePaymentMode}>
                        {props.paymentModee.map((a) => {
                          return <Option value={a.paymentCatagoryId}>{a.name}</Option>;
                        })}
                      </Select> :
                        item.paymentModeName}
                    </div>
                  </div>
                  <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">

                      {item.remarks}
                    </div>
                  </div>
                  <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                  

                      {item.approveByFinanceInd === true ? (
                        <div class="flex items-center">
                         <span className=" flex items-center justify-center">
                         <MultiAvatar
                              primaryTitle={item.salesExecutive}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            /> on
                          </span>
                          &nbsp;
                          <span class="text-green-700"> {dayjs(item.approveDate).format('YYYY-MM-DD')}</span>

                        </div>
                      ) : "None"}
                    </div>
                  </div>

                  <div class="w-6">
                  <a
              href={`${base_url2}/customer/pdf/${item.paymentId}`}
            target="_blank"
            >
            <PictureAsPdfIcon className="!text-icon"/>
                           </a>
          </div>
                  <div class="flex  md:w-[6rem] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      {row.paymentId === item.paymentId && edit ? (
                        <>
                          <Button
                            type="primary"
                            onClick={() => {
                              props.updateOrderPayment({
                                paymentId: item.paymentId,
                                transactionNumber: item.transactionNumber,
                                remarks: item.remarks,
                                orderPaymentType: "Repair",
                                paymentMode: mode,
                                paymentAmount: amount,
                                docId: item.docId,
                                date: `${item.date}T00:00:00Z`,
                                orderCurrencyId: item.orderCurrencyId,
                                userId: props.userId,
                                orderId: props.particularRowData.orderId
                              }, item.paymentId, hnadleCallback())
                            }}>
                          {translatedMenuItems[7]}
                          </Button>
                          <Button
                            className="ml-2"
                            onClick={() => handleEditIcon()}>
                          {translatedMenuItems[8]}
                          </Button>
                        </>

                      ) : (
                        <>
                          {item.approveByFinanceInd === false && (
                            <BorderColorIcon
                              className="text-[blue] flex justify-items-center justify-center !text-icon cursor-pointer"
                              onClick={() => {
                                handleRowData(item);
                                handleEditIcon()
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                    {item.approveByFinanceInd === false ? <div>
                      <StyledPopconfirm
                        title={translatedMenuItems[9]}
                        onConfirm={() => props.deleteOrderPaymentData({
                          orderPaymentType: "Repair",
                          reason: "",
                          paymentId: item.paymentId
                        }, item.paymentId)}
                      >
                        <Tooltip title={translatedMenuItems[10]}>
                          <DeleteIcon
                            className="!text-icon cursor-pointer text-[red]"
                          />
                        </Tooltip>
                      </StyledPopconfirm>
                    </div> :
                      <div>
                        <Button type="primary">{translatedMenuItems[11]}</Button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>}

    </>
  );
}

const mapStateToProps = ({ distributor, auth }) => ({
  paymentHistory: distributor.paymentHistory,
  fetchingPaymentHistory: distributor.fetchingPaymentHistory,
  userId: auth.userDetails.userId,
  paymentModee: distributor.paymentModee,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistributorOrderPayment,
      updateOrderPayment,
      getPaymentMode,
      deleteOrderPaymentData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentTable);
