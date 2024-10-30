import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from '../../../../../../Components/Placeholder';
import { getPurchaseOrderDetailsList, updatePriceOfPoItem } from "../../../SuppliersAction"
import { Button, Input } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

function PoSupplierDetailsTable(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
  
           "110", //"Name",//0
           "14", //"Category",//1
           "259", //   "Attribute",
           "254",//   "Unit",
           "788",//   "Price/Unit",
           "85", //   "Add",
           "1079",  //   "Cancel"
  
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
        props.getPurchaseOrderDetailsList(props.poSupplierDetailsId);
    }, []);

    const [price, setPrice] = useState("")
    const [edit, setEdit] = useState(false)
    const [row, setRow] = useState({})

    const handleRowData = (item) => {
        setRow(item)
    }

    const handlePrice = () => {
        setEdit(!edit)
    }
    const handleInputPrice = (val) => {
        setPrice(val)
    }
    const handleCallback = () => {
        setEdit(false)
        setPrice("")
    }

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <>
            {props.fetchingPoDetailsList ? <BundleLoader /> : <div className=' flex justify-end sticky z-auto'>
                <div class="rounded m-1 p-1   w-[100%] h-77vh  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between  w-[100%]  p-1 bg-transparent font-bold sticky top-0 z-10">
                        <div className="text-[#00A2E8] text-base w-[28.1rem] font-poppins font-bold md:w-[28.1rem]">
                        {translatedMenuItems[0]} 
                        {/* Name" */}
                           
                            </div>

                            <div className="text-[#00A2E8] text-base w-[28.1rem] font-poppins font-bold md:w-[28.1rem]">
                        Supplies Id
                        {/* Name" */}
                           
                            </div>

                            <div className="text-[#00A2E8] text-base w-[28.1rem] font-poppins font-bold md:w-[28.1rem]">
                       HSN
                        {/* Name" */}
                           
                            </div>
                            <div className="text-[#00A2E8] text-base w-[28.1rem] font-poppins font-bold md:w-[28.1rem]">
                       Contact
                        {/* Name" */}
                           
                            </div>
                        <div className="w-[16.1rem] font-poppins font-bold text-xs md:w-[13.1rem]">
                        {translatedMenuItems[1]} 
                        {/* Category */}
                        </div>

                        <div className="w-[15.12rem] font-poppins font-bold text-xs md:w-[10.12rem]">
                        {translatedMenuItems[2]} 
                         {/* Attribute */}
                        </div>

                        <div className="w-[13.13rem] font-poppins font-bold text-xs md:w-[8.13rem]">
                        {translatedMenuItems[3]}  
                        {/* Unit */}
                        </div>
                        <div className="w-[9.14rem] font-poppins font-bold text-xs md:w-[9.14rem]">
                        {translatedMenuItems[4]}  
                        {/* Price/Unit */}
                        </div>

                    </div>
                    <InfiniteScroll
                        dataLength={props.poDetails.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingPoDetailsList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"79vh"}
                        style={{scrollbarWidth:"thin"}}                    
                    >
                        {props.poDetails.map((item) => {
                            return (
                                <>
                                    <div className="flex rounded justify-between mt-[0.5rem] bg-white items-center py-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center"></div> 
                                        <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                                            <div className=" flex font-medium  justify-start  border-l-2 border-green-500 bg-[#eef2f9] w-[23.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex font-normal items-center  ml-gap text-xs font-poppins">
                                                    <span>
                                                        {item.suppliesFullName}
                                                    </span>

                                                </div>
                                            </div>


                                            <div className=" flex font-medium  justify-start  border-l-2 border-green-500 bg-[#eef2f9] w-[23.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex font-normal items-center  ml-gap text-xs font-poppins">
                                                    <span>
                                                       {item.suppliesId}
                                                    </span>

                                                </div>
                                            </div>

                                            <div className=" flex font-medium  justify-start  border-l-2 border-green-500 bg-[#eef2f9] w-[23.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex font-normal items-center  ml-gap text-xs font-poppins">
                                                    <span>
                                                       {item.hsn}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex font-medium  justify-start  border-l-2 border-green-500 bg-[#eef2f9] w-[23.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex font-normal items-center  ml-gap text-xs font-poppins">
                                                    <span>
                                                      {item.poContactPersonName}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex  w-[13.2rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs ml-gap font-poppins">
                                                    <span>
                                                        {item.categoryName} {item.subCategoryName}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex w-[12.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center  text-xs ml-gap font-poppins">
                                                    <span>
                                                        {item.attributeName} {item.subAttributeName}
                                                    </span>

                                                </div>
                                            </div>

                                            <div className=" flex  w-[8.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs font-poppins">
                                                    <span>
                                                        {item.unit}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex   w-[8.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs font-poppins">

                                                    {edit && row.suppliesId === item.suppliesId ?
                                                        <>
                                                            <Input
                                                                value={price}
                                                                type="text"
                                                                placeholder="Enter Price"
                                                                onChange={(e) => handleInputPrice(e.target.value)}
                                                            />
                                                            <Button
                                                                type="primary"
                                                                onClick={() => props.updatePriceOfPoItem({
                                                                    price: price,
                                                                    supplierId: props.supplierId,
                                                                    userId: props.userId,
                                                                    suppliesId: item.suppliesId,
                                                                    poSupplierDetailsId: props.poSupplierDetailsId
                                                                }, handleCallback())}
                                                            >{translatedMenuItems[5]}</Button>
                                                            <Button onClick={handlePrice}>{translatedMenuItems[6]}</Button>
                                                        </>
                                                        : <span>
                                                            {item.price}
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                            <div className=" flex  w-[1.5rem] max-sm:justify-between items-center justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row ">
                                                <div class="  text-xs font-poppins">
                                                    <BorderColorIcon
                                                        className=" !text-icon cursor-pointer text-[tomato]"
                                                        onClick={() => {
                                                            handlePrice()
                                                            handleRowData(item)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </InfiniteScroll>
                </div>
            </div>}

        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    poDetails: suppliers.poDetails,
    userId: auth.userDetails.userId,
    fetchingPoDetailsList: suppliers.fetchingPoDetailsList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPurchaseOrderDetailsList,
            updatePriceOfPoItem
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PoSupplierDetailsTable);