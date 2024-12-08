import React, { useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
 import {getOrdrSuppierDetails} from "./OrderAction";


function OrderSupplierItemViewer (props) {
  
const [pageNo, setPageNo] = useState(0);
const [hasMore, setHasMore] = useState(true);


useEffect(()=>{
    props.getOrdrSuppierDetails(props.rowDatas.orderId);
},[]);


const [RowData, setRowData] = useState("");

function handleSetRowData(item) {
    setRowData(item);
}


    return (
        <>
             <div> 
                      
<div className=' flex justify-end sticky flex-col z-auto'>
<div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
<div className=" flex rounded  max-sm:hidden w-[99%] mt-1 p-1 bg-transparent font-bold sticky top-0 z-10">
                                    <div className=" md:w-[10rem]">Name</div>
                                    <div className=" md:w-[4.5rem]">Model</div>
                                    <div className="md:w-[6.2rem]">Brand</div>
                                    <div className=" md:w-[5rem]">Category</div>
                                    <div className=" md:w-[5.1rem]">Attribute</div>
        
                                    <div className=" md:w-[6.5rem]">Price</div>
                         <div className=" md:w-[6.5rem]">Units</div>
                                   
                                    <div className=" md:w-[2rem]"></div>
                 
                                </div>
                              
                                    <InfiniteScroll
                                        dataLength={props.ordrSuplrItem.length}
                                        loader={props.fetchingOrdrSuplrDetails ? <div class="flex justify-center">Loading...</div> : null}
                                  
                                        hasMore={hasMore}
     
                                        height={"65vh"}
                                    >
                                        {props.ordrSuplrItem.map((item) => {
                                            return (
                                                <div>
                                                   <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                                                         <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex font-medium   md:w-[10rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.productFullName}
                                                                </div>
                                                            </div>

                                                            <div className=" flex font-medium   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.model}
                                                                </div>

                                                            </div>
                                                            </div>
                                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex font-medium   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.brand}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.category}
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.attribute} 
                                                                </div>
                                                            </div>
                                                    
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.price} 
                                                                </div>
                                                            </div>     
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.unit} 
                                                                </div>
                                                            </div>     
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
    ordrSuplrItem:order.ordrSuplrItem,
    fetchingOrdrSuplrDetails:order.fetchingOrdrSuplrDetails
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
             getOrdrSuppierDetails,

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderSupplierItemViewer);

