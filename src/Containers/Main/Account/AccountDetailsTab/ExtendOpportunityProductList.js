import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select,Tooltip,Button,Input,Popconfirm } from 'antd';
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../Components/Placeholder";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const { Option } = Select;

function ExtendOpportunityProductList(props) {
     
    const [pageNo, setPageNo] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [payAmount, setpayAmount] = useState('');
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
   "1169", // 'Invoice ', // 0
   "660", // 'Order', // 1
   "1492" ,// 'totalValue', // 2
   "1309" ,// 'totalUnit', // 3
 "929",  // ' Amount', // 4
 "1078",//Save //5
 "1079",//Cancel 6
 "170",//Edit 7
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
        let suppliesId =props.RowItem.productId;
        try {
          const response = await axios.get(`${base_url2}/po/getStockAndTransitNo/${suppliesId}`,{
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
                    {/* <div class=" w-[8.5rem]">{translatedMenuItems[0]} ID</div> */}
                        <div className=" md:w-[7rem]">Supplier ID</div>
                        <div className=" md:w-[8rem]">Batch #</div>
                       <div className="md:w-[5rem]">Units</div>
                       <div className=" md:w-[14rem]">Country</div>
                       <div className="md:w-[12rem]">Best Before</div>
                         {/* <div className=" md:w-[22rem] ">{translatedMenuItems[4]}</div> */}
                      
                    </div>
                    <div class="overflow-x-auto ">
                    
                            {data.length ? <>
                                {data.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div key={item.procureInvoiceId} 
                                            className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    {/* <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                          
                                                           

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null} 
                                                    </div>  */}
                                                    <div className=" flex  w-[7rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    // onClick={() => {
                                                                    //    // handleRowData(item);
                                                                       
                                                                    // }}
                                                                > 
                                                                {item.newOrderNo}
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.totalValue}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {item.totalUnit}
                                                         
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[10rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.remainingApproveValue}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {item.remainingTotalValue}
                                                         
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[10rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
        
                      <div className="  text-xs  font-poppins">
                        <div> {item.amount}</div>
                      </div>
                
                                                        </div>
                                                    </div>
                                                    {/* <div className=" flex    md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
    {editsuppliesId === item.procureInvoiceId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handlePostChange(item)}>
                       {translatedMenuItems[5]}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.procureInvoiceId)} className="ml-[0.5rem]">
                        {translatedMenuItems[6]}
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle={translatedMenuItems[7]}
                        iconType="edit"
                        onClick={() => handleEditClick(item.procureInvoiceId)}
                      />
                    )}
    </div> */}
                                                </div>
                                            </div>
                                         </>
                                   )
                                })}
                            </>
                                : !data.length
                                    && !props.fetchingOrderInvoice ? "No data" : null}  
                      
                    </div>
                </div>
            </div>

        </>
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           // getOrderInvoiveList,   
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ExtendOpportunityProductList);