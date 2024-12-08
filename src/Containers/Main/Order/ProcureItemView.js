import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {getProcureOrderDetails} from "./OrderAction";
import {  Button } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";

function ProcureItemView (props) {
  
const [pageNo, setPageNo] = useState(0);
const [hasMore, setHasMore] = useState(true);
const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
const [loading, setLoading] = useState(true);




useEffect(()=>{
    props.getProcureOrderDetails(props.rowDatas.orderId);
},[]);

useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    '660', // 0    Repeat Order
'110', // 1 Name
'265', // 2 Model
'264', // 3 Brand
'14', // 4 Category
'259', // 5 Attribute
'657', // 6 Price
'260', // 7 Units
'1079',//Cancel Order

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

const [RowData, setRowData] = useState("");

function handleSetRowData(item) {
    setRowData(item);
}
if (loading) {
    return <div><BundleLoader/></div>;
  }

    return (
        <>
             <div> 
             <Button
                                                type='primary'
                                            //   onClick={() => {
                                            //             props.repeatOrder({ordreId:item.orderId});
                                            //             handleRowData(item);
                                            //         }}
                                                >
                                                    <div class="font-bold text-xs font-poppins">Repeat {translatedMenuItems[0]}</div>
                                                    {/* Repeat Order */}
                                                    </Button>  
<div className=' flex justify-end sticky flex-col z-auto'>
<div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
<div className=" flex rounded  max-sm:hidden w-[99%] mt-1 p-1 bg-transparent font-bold font-poppins text-xs sticky top-0 z-10">
                                    <div className="text-[#00A2E8] text-base  w-[10rem] md:w-[10.1rem]">{translatedMenuItems[1]}
                                        {/* "Name"
                                    /> */}
                                    </div>
                                    <div className="w-[4.5rem] md:w-[4.4rem]">{translatedMenuItems[2]}
                                        {/* Model"
                                    /> */}
                                    </div>
                                    <div className=" w-[6.2rem] md:w-[6.1rem]">{translatedMenuItems[3]}
                                        {/* Brand"
                                    /> */}
                                    </div>
                                    <div className=" md:w-[5rem]"> {translatedMenuItems[4]}
                                        {translatedMenuItems[0]}
                                        {/* Category" */}
                                    </div>
                                    <div className="w-[5.1rem] md:w-[5.4rem]">{translatedMenuItems[5]}
                                        {/* "Attribute"
                                    /> */}
                                    </div>
        
                                    <div className="w-[6.5rem] md:w-[6.6rem]">{translatedMenuItems[6]}
                                        {/*"Price"
                                    /> */}
                                    </div>
                         <div className=" md:w-[6.7rem]">{translatedMenuItems[7]}
                            {/* Units"
                                    /> */}
                                    </div>
                                   
                                    <div className=" md:w-[2rem]"></div>
                 
                                </div>
                              
                                    <InfiniteScroll
                                        dataLength={props.orderProcureDetails.length}
                                        loader={props.fetchingProcureOrderDetails ? <div class="flex justify-center">Loading...</div> : null}
                                  
                                        hasMore={hasMore}
     
                                        height={"79vh"}
                                    >
                                        {props.orderProcureDetails.map((item) => {
                                            return (
                                                <div>
                                                   <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center  max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                                                         <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className="font-medium   md:w-[10.1rem] max-sm:flex-row border-l-2 border-green-500 bg-[#eef2f9] max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.productFullName}
                                                                </div>
                                                            </div>

                                                            <div className=" flex font-medium items-center justify-center h-8 ml-gap  bg-[#eef2f9]  md:w-[4.15rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.model}
                                                                </div>

                                                            </div>
                                                            </div>
                                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex font-medium   md:w-[4.5rem] max-sm:flex-row  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.brand}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className=" flex font-medium   md:w-[5.12rem] max-sm:flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.category}
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex font-medium   md:w-[5.3rem] max-sm:flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.attribute} 
                                                                </div>
                                                            </div>
                                                    
                                                            <div className=" flex font-medium   md:w-[5.1rem] max-sm:flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.price} 
                                                                </div>
                                                            </div>     
                                                            <div className=" flex font-medium   md:w-[5.2rem] max-sm:flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.unit} 
                                                                </div>
                                                            </div>   

                                                            <Button
                                                type='primary'
                                            //   onClick={() => {
                                            //             props.repeatOrder({ordreId:item.orderId});
                                            //             handleRowData(item);
                                            //         }}
                                                >
                                                     <div class="font-bold text-xs font-poppins">{translatedMenuItems[8]} Order</div>
                                                    {/* Cancel Order */}
                                                    </Button>  
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </InfiniteScroll>
                               
                            </div>

                        </div>
               
        
                
            </div>
            
        </>
    );
}
const mapStateToProps = ({ order}) => ({
    // phonListNoteModal: myorder.phonListNoteModal,
    orderProcureDetails:order.orderProcureDetails,
    // openFeedbackpHnOrDrawer:myorder.openFeedbackpHnOrDrawer,
    fetchingProcureOrderDetails:order.fetchingProcureOrderDetails
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProcureOrderDetails,
            // handlePhoneListOrderNoteModal,
            // handleFeedbackPhoneOrderDrawer,

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProcureItemView);

