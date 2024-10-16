import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select,Input,Button } from 'antd';
import dayjs from "dayjs";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { base_url2 } from "../../../../../Config/Auth";
import axios from "axios";
const { Option } = Select;

function ProcureInvoiceList (props) {
    const [pageNo, setPageNo] = useState(0);
    const [particularRowData, setParticularRowData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [openStatus,setopenStatus] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [date, setDate] = useState('');
    const [trackId, settrackId] = useState('');
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);
    const [invoicDataCount, setinvoicDataCount] = useState({});
    const [invoicDataCountLoading, setinvoicDataCountLoading] = useState(true);

      const fetchData = async () => {
        try {
          const response = await axios.get(`${base_url2}/invoice/listOfInvoice/${props.orderPhoneId}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      const invoiceDataCount = async () => {
        try {
          const response = await axios.get(`${base_url2}/invoice/invoice/count/${props.orderPhoneId}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setinvoicDataCount(response.data);
          setinvoicDataCountLoading(false);
        } catch (error) {
          setError(error);
          setinvoicDataCountLoading(false);
        }
      };
  
 useEffect(()=> {
    fetchData();
    invoiceDataCount();
 },[]);


    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }

    const handleInputChange = (value, key, dataIndex) => {
        const updatedData = data.map((item) =>
            item.procureOrderInvoiceId === key ? { ...item, [dataIndex]: value } : item
        );
        setData(updatedData);
        const updatedTrackId = updatedData.find(item => item.procureOrderInvoiceId === key)?.trackId;
    settrackId(updatedTrackId);
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
    
    
      const handleEditClick = (procureOrderInvoiceId) => {
        setEditsuppliesId(procureOrderInvoiceId);
      };
      const handleCancelClick = (procureOrderInvoiceId) => {
        setEditedFields((prevFields) => ({ ...prevFields, [procureOrderInvoiceId]: undefined }));
        setEditsuppliesId(null);
      };
    
   
    

    const handlePostChange =  async (item) => {
        let updatedItem={
            shippingDate: new Date(date).toISOString(),
          trackId:trackId?trackId:item.trackId,
          procureOrderInvoiceId:item.procureOrderInvoiceId,
        }
        // props.updateOrdrSuplrItems(data);
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${props.token}`  // Replace with your actual token if required
          };

            const response = await axios.put(`${base_url2}/invoice/order/ship`, updatedItem, { headers });
            console.log("API Response:", response.data);
        setData(prevData => 
              prevData.map(cat =>
                cat.procureOrderInvoiceId === item.procureOrderInvoiceId ? response.data : cat
              )
            );
        
            setEditsuppliesId(null);
        
          } catch (error) {
            // Handle errors
            console.error("Error updating item:", error);
            setEditsuppliesId(null);
          }
      };


    return (
        <>
<div class="text-xs">Total Invoice: {invoicDataCount.orderProcureInvoice || 0}
  {/* <Badge
                                    size="small"
                                    count={(invoicDataCount.orderProcureInvoice) || 0}
                                    overflowCount={999}
                                    offset={[ 0, -16]}
                                /> */}
                                </div>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold  font-poppins text-xs sticky z-10">
                   
                    <div class=" w-[8.5rem]">
                    {props.translatedMenuItems[10]} ID 
                        </div>
                        <div className=" md:w-[7.4rem]">
                            {/* {props.translatedMenuItems[1]} */}
                             Track ID 
                            </div>
                        <div className=" md:w-[7.1rem]">
                            {props.translatedMenuItems[2]} 
                        </div>
                        <div className=" md:w-[8rem]">
                            {props.translatedMenuItems[7]} 

                        </div>
                    </div>
                    <div class="h-[75vh]">
                          
                    { data.length === 0 ? (
    <div className="text-center text-gray-500">Data not available</div>
  ) : data.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                          
                                                           <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleInvoiceModal(true);
                                                                    }}
                                                                > {item.invoiceId} </span>

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    {/* New */}
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                   
                                                    
                                                   
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {editsuppliesId === item.procureOrderInvoiceId ? (
                       <Input
                       style={{ width: "5rem" }}
                       value={item.trackId}
                       onChange={(e) => handleInputChange(e.target.value, item.procureOrderInvoiceId, 'trackId')}
                     />
                       
                    ) : (
                      <div className="font-normal text-sm  font-poppins">
                        <div> {item.trackId}</div>
                      </div>
                    )}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {editsuppliesId === item.procureOrderInvoiceId ? (
                                                         
                                                                <input
          type="date"
          // value={date}
          value={dayjs(item.shippingDate).format("YYYY-MM-DD")}
          onChange={(e) => handleDateChange(e,item)}
        //   min={moment(item.deliveryDate).format("YYYY-MM-DD")}
          class="border border-black rounded"
        /> ) : (
            <div className="font-normal text-sm  font-poppins">
               {item.shippingDate === null ? "" :
              <div> 
              {dayjs(item.shippingDate).format("YYYY/MM/DD")} 
              </div>}
            </div>
          )}
                                                        </div>
                                                    </div>
                                                   
                                                       <div className=" flex   w-[8rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                       
                                                   {item.paidInd ? "Paid":"Unpaid"}
                                                    </div>
                                                                                                    </div>
                                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex w-20  md:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
    {editsuppliesId === item.procureOrderInvoiceId ? (
                        <>
                      <Button 
                      type="primary"
                      loading={props.updatingOrdrSuplrItems}
                      onClick={() => handlePostChange(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.procureOrderInvoiceId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <>
                      {item.paidInd===true &&
                      <Button
                      type="primary"
                        onClick={() => handleEditClick(item.procureOrderInvoiceId)}
                      >Ship</Button>
                    }
                    </>
                    )}
    </div>
    </div>
                                            </div>
                                        </>
                                    )
                                })}
                          
                    </div>
                </div>
            </div>
        

           
        </>
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    token: auth.token,
    fetchingAccountInvoice:distributor.fetchingAccountInvoice,
    accountInvoice:distributor.accountInvoice,
    invoiceOrders:distributor.invoiceOrders,
    fetchingGeneratedInvoice: distributor.fetchingGeneratedInvoice,
    generatedInvoice: distributor.generatedInvoice,
    invoiceO: distributor.invoiceO,
    invoiceSearch: distributor.invoiceSearch,
    addPaidButtonModal: distributor.addPaidButtonModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProcureInvoiceList);


















                       
