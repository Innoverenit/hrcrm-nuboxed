import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select } from 'antd';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2';

const { Option } = Select;

function CommerceOpenTrackDrawerCard(props) {
    const [pageNo, setPageNo] = useState(0);
    
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [trackId, settrackId] = useState('');
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
   "1169", // 'Invoice ', // 0
   "660", // 'Order', // 1
   "218" ,// 'Value', // 2
   "71" ,// 'Type', // 3
 "660"   // ' Status', // 4
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

      const fetchData = async () => {
        try {
          const response = await axios.get(`${base_url2}/invoice/procureFullInvoiceData/${props.particularRowData.procureOrderInvoiceId}`,{
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
  
 const handleInputChange = (value, key, dataIndex) => {
        const updatedData = data.map((item) =>
            item.procureOrderInvoiceId === key ? { ...item, [dataIndex]: value } : item
        );
        setData(updatedData);
        const updatedTrackId = updatedData.find(item => item.procureOrderInvoiceId === key)?.trackId;
    settrackId(updatedTrackId);
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
            'Authorization':  `Bearer ${props.token}`
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


 useEffect(()=> {
    fetchData();
 },[]);

    
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

    const [hasMore, setHasMore] = useState(true);



    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} ID</div>
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[2]}</div>
          
                      
                    </div>
                    <div class="">
                        
                            {data.length ? <>
                                {data.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                           {/* {item.distributorId} */}
                                                           

                                                        </div>
                                                        {/* {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null} */}
                                                    </div>
                                                    <div className=" flex  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                       // handleRowData(item);
                                                                        props.handleInvoiceModal(true);
                                                                    }}
                                                                > 
                                                                {item.newOrderNo}
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.category}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.brand}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {/* {item.model} */}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                         </>
                                   )
                                })}
                            </>
                                : !data.length
                                    && !props.fetchingOrderInvoice ? <NodataFoundPage /> : null}  
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>
          
        </>
    )
}
const mapStateToProps = ({ auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CommerceOpenTrackDrawerCard);
