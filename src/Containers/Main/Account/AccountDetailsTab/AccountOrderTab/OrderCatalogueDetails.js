import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductionOrderDetails } from "../../AccountAction";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";

function OrderCatalogueDetails(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    'Name', // 0
    'Category', // 1
    'Attribute', // 2
    ' Units', // 3
  


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
        props.getProductionOrderDetails(props.particularRowData.orderId)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <>
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[9.41rem]">
                        {translatedMenuItems[0]}{/* <FormattedMessage
                                id="app.name"
                                defaultMessage="Name"
                            /> */}
                        </div>
                        <div className=" md:w-[8.1rem]">
                        {translatedMenuItems[1]}  {/* <FormattedMessage
                                id="app.category"
                                defaultMessage="Category"
                            /> */}
                        </div>
                        <div className=" md:w-[11.2rem]">
                        {translatedMenuItems[2]} {/* <FormattedMessage
                                id="app.attribute"
                                defaultMessage="Attribute"
                            /> */}
                        </div>
                        <div className="md:w-[5.8rem]">
                        {translatedMenuItems[3]} {/* <FormattedMessage
                                id="app.units"
                                defaultMessage="Units"
                            /> */}
                        </div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.productionOrderDetail.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingProductionDetailById ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.productionOrderDetail.map((item) => {

                            return (
                                <div >
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
                                        <div class="flex w-3/4">

                                            <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.name}

                                                </div>
                                            </div>

                                            <div className=" flex  md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.categoryName} {item.subCategoryName}

                                                </div>
                                            </div>
                                            <div className=" flex  md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.attributeName} {item.subAttributeName}

                                                </div>
                                            </div>
                                            <div className=" flex  md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.quantity}

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

        </>
    )
}

const mapStateToProps = ({ distributor }) => ({
    productionOrderDetail: distributor.productionOrderDetail,
    fetchingProductionDetailById: distributor.fetchingProductionDetailById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionOrderDetails
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderCatalogueDetails);
