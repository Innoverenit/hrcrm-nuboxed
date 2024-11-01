import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getInvoiveL,
   // handleInvoiceModal
} from "../AccountAction";
import {  Select,Input,Button } from 'antd';
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import { BundleLoader } from "../../../../Components/Placeholder";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
const { Option } = Select;

function InvouiceSTable(props) {
    const [pageNo, setPageNo] = useState(0);
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [trackId, settrackId] = useState('');
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    '110', // 0
    '14', // 1
    '218', // 2
    '71', // 3
    '260', // 4
    '142', // 5
   '259',//6
    "1492",// Value
  "1379", // Ship on
   "1486", // track ID
   "1169"


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
       // setPageNo(pageNo + 1);
        props.getInvoiveL(props.particularRowData.procureOrderInvoiceId)
    }, []);
    const [particularRowData, setParticularRowData] = useState({})
    const handleRowData = (item) => {
        setParticularRowData(item)
    }
    const [currency, setCurrency] = useState("")
    const [showIcon, setShowIcon] = useState(false)
    const handleCurrencyField = () => {
        setShowIcon(!showIcon)

    }
    const handleChangeCurrency = (val) => {
        setCurrency(val)
    }
    const handleCallback = () => {
        setShowIcon(false)
        setCurrency("")
    }
    useEffect(() => {
        setData(props.invoiceL);
    }, [props.invoiceL]);

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
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold text-xs font-poppins sticky z-10">
                    <div class=" w-[8.5rem]">{translatedMenuItems[10]}ID </div>
                        <div className=" md:w-[12.4rem]">{translatedMenuItems[1]} </div>
                        <div className=" md:w-[5rem] ">{translatedMenuItems[6]}</div>
                        <div className=" md:w-[5.1rem]">{translatedMenuItems[2]}</div>
                        <div className="md:w-[13rem]">{translatedMenuItems[7]}</div>
                        <div className=" md:w-[5.01rem] ">{translatedMenuItems[4]}</div>
                        {/* <div className="md:w-[3.8rem]">{translatedMenuItems[9]} ID</div>
                        <div className="md:w-[3.8rem]">{translatedMenuItems[8]}</div> */}
                    </div>
                    <div class="">
                        {/* <InfiniteScroll
                            dataLength={props.invoiceL.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingInvoiceL ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"79vh"}
                            style={{scrollbarWidth:"thin"}}
                        > */}
                            {props.invoiceL.length ? <>
                                {props.invoiceL.length === 0 ? "No data available" : props.invoiceL.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex items-center font-medium justify-between  ml-gap bg-[#eef2f9] h-8 w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-xs  font-poppins flex items-center">
                                                           {item.invoiceId}
                                                           

                                                        </div>
                                                        {/* {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null} */}
                                                    </div>
                                                    <div className=" flex items-center ml-gap bg-[#eef2f9] h-8 truncate w-[14.12rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {item.category}
                                                        </div>
                                                    </div>
                                                    <div className=" flex items-center ml-gap bg-[#eef2f9] h-8 w-[7.12rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.attribute}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center ml-gap bg-[#eef2f9] h-8 w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.price}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center ml-gap bg-[#eef2f9] h-8  w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.totalPrice}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center ml-gap bg-[#eef2f9] h-8  w-[7.21rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                    {item.unit}
                                                        {/* <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
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
                                                        </div> */}
                                                    </div>
                                                    
                                                      
                                                        {/* {editsuppliesId === item.procureOrderInvoiceId ? (
                                                         
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
          )} */}
                                                       

                                                    {/* <div class="flex max-sm:justify-between max-sm:w-wk items-center">
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
              
                      <Button
                      type="primary"
                        onClick={() => handleEditClick(item.procureOrderInvoiceId)}
                      >Ship</Button>
          
                    </>
                    )}
    </div>
                                                </div>   */}
                                                 </div>


                                            </div>
                                         </>
                                     )
                                })}
                            </>
                                : !props.invoiceL.length
                                    && !props.fetchingInvoiceL ? <NodataFoundPage /> : null}  
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>
            {/* <InvoiceModal
                    particularRowData={particularRowData}
                    handleInvoiceModal={props.handleInvoiceModal}
                    invoiceO={props.invoiceO}
                    selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                />   */}
        </>
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingInvoiceL:distributor.fetchingInvoiceL,
    invoiceL:distributor.invoiceL,
    invoiceO:distributor.invoiceO
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getInvoiveL,
           // handleInvoiceModal
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InvouiceSTable);