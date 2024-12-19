import dayjs from "dayjs";
import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input, Select } from "antd";
import { getDistributorOrderPayment, updateOrderPayment, deleteOrderPaymentData, getPaymentMode } from "../../AccountAction";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { BundleLoader } from "../../../../../Components/Placeholder";
import "jspdf-autotable";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import { base_url2 } from "../../../../../Config/Auth";
import AddIcon from '@mui/icons-material/Add';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from "axios";

const MultiOrderList = lazy(() => import("./MultiOrderList"));
const { Option } = Select;

function OrderPaymentTable(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPay, setShowPay] = useState(false);

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


  useEffect(() => {
    // props.getDistributorOrderPayment(props.particularRowData.procureOrderInvoiceId ? props.particularRowData.procureOrderInvoiceId:props.particularRowData.orderPhoneId);
    props.getDistributorOrderPayment(props.particularRowData.orderPhoneId ? props.particularRowData.orderPhoneId:props.particularRowData.procureOrderInvoiceId);
    props.getPaymentMode(props.orgId)
  }, [])
  const [mode, setMode] = useState("");
  const [amount, setAmount] = useState("");
  const [edit, setEdit] = useState(false);
  const [row, setRow] = useState({});

  const handleShowPay = () => {
    setShowPay(!showPay)
}

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
  const viewAnDownloadPdf= async (item) => {  
    try {
      const response = await axios.get(`${base_url2}/quotation/customer/pdf/${`order`}/${item.orderPhoneId}`, {
        responseType: 'blob',
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
  
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const filename = 'custom-pdf-name.pdf';
  
      window.open(url, '_blank');
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename; 
      downloadLink.click(); 
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }  
  
  }; 

  return (
    <>

      {props.fetchingPaymentHistory ? <BundleLoader /> : <div className=' flex sticky z-auto'>
        <div class="rounded m-1 p-1  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-semibold fonr-poppins items-end !text-lm sticky z-10">
         
            <div className="w-[7.09rem] max-max-md:w-[7rem] text-sm"> <ReadMoreIcon className=" !text-icon"/>{translatedMenuItems[0]}  ID</div>
            {/* <div className=" max-md:w-[4.21rem] ">Invoice Id</div>  */}
            <div className="w-[4.5rem] max-max-md:w-[4.5rem] "><DateRangeIcon className=" !text-icon"/>{translatedMenuItems[1]}</div>
            <div className="w-[5.8rem] max-max-md:w-[5.8rem] "><ArrowForwardIcon className=" !text-icon"/>{translatedMenuItems[2]}</div>
            <div className="w-[4.25rem] max-max-md:w-[4.2rem] "><CurrencyExchangeIcon className=" !text-icon"/>{translatedMenuItems[3]}</div>  {/* 929 */}
            <div className="w-[4.24rem] max-max-md:w-[4.2rem] ">{translatedMenuItems[4]}</div>
            {/* 86 */}
            <div className="w-[4.22rem] max-max-md:w-[4.2rem] ">{translatedMenuItems[5]}</div>
            <div className="w-[6.21rem] max-max-md:w-[6.2rem] ">{translatedMenuItems[6]}</div>
         
          </div>

          {props.paymentHistory.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white items-center py-ygap  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "    >
                  <div class="flex">
                  <div className=" flex w-[4rem]  h-8  border-l-2 border-green-500 bg-[#eef2f9]  max-md:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                                                         {item.approveByFinanceInd && (
                                                         <div class=" text-xs  font-poppins text-center">
                                                                 <AddIcon

                                                                     onClick={() => {
                                                                         handleShowPay();
                                                                         handleRowData(item)
                                                                     }
                                                                     }
                                                                 />
                                                              
                                                         </div>)}
                                                   </div>
                    <div className=" flex w-[7rem] max-md:w-[7rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:  ">
                      <div class="text-xs text-ellipsis overflow-hidden  cursor-pointer">
                        {item.transactionNumber}
                      </div>
                    </div>
                    {/* <div className=" flex  max-md:w-[6.12rem] max-sm:  ">
                      <div class="text-xs   cursor-pointer">
                        {item.invoiceId}
                      </div>
                    </div> */}
                  </div>

                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row">
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
                  <div className=" flex w-[6.2rem] max-max-md:w-[6.2rem] max-sm:flex-row  items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between ">

                    <div class=" text-xs  ">
                      {dayjs(item.date).format("DD-MM-YY")}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
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

                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      {row.paymentId === item.paymentId && edit ? <Select onChange={handlePaymentMode}>
                        {props.paymentModee.map((a) => {
                          return <Option value={a.paymentCatagoryId}>{a.name}</Option>;
                        })}
                      </Select> :
                        item.paymentModeName}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">

                      {item.remarks}
                    </div>
                  </div>
                  <div className=" flex  max-md:w-[6.5rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
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
                  <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>
                  <div class="flex  max-md:w-[6rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row max-sm:w-[10%]">
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

                {showPay && (row.paymentId === item.paymentId) &&
                                             <MultiOrderList 
                                             newOrderNo={props.newOrderNo}
                                             row={row}
                                             paymentId={item.paymentId}
                                            selectedLanguage={props.selectedLanguage}
                                            particularRowData={props.particularRowData}
                                            translateText={props.translateText} 
                                                              />
                                        }
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
