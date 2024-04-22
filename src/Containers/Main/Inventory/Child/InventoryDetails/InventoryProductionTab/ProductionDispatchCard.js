import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, Tooltip } from "antd";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDispatchProductionsbyLocId } from "../../../InventoryAction";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";

function ProductionDispatchCard(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getDispatchProductionsbyLocId(props.locationId, page);
        setPage(page + 1);
    }, []);
    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };
    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    const handleLoadMore = () => {
        const proPag = props.productionDispatchByLocsId && props.productionDispatchByLocsId.length && props.productionDispatchByLocsId[0].pageCount
        setTimeout(() => {
            if (props.productionDispatchByLocsId) {
                if (page < proPag) {
                    setPage(page + 1);
                    props.getDispatchProductionsbyLocId(props.locationId, page);
                }
                if (page === proPag) {
                    setHasMore(false)
                }
            }
        }, 100);
    };

    const {
        fetchingDispatchProductionLocId,
        productionDispatchByLocsId,

    } = props;
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 max-sm:m-1 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex max-sm:hidden justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className="w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[16rem]">Manufacture ID</div>
                        <div className=" w-[8.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.01rem]">Name</div>
                        <div className=" w-[10.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.1rem]">Category</div>
                        <div className=" w-[11.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[19.2rem] ">Attribute</div>
                        <div className=" w-[11.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[19.2rem] ">Dispatch By</div>
                        <div className=" md:w-[4.01rem]">Zone</div>
                        <div className=" md:w-[4.01rem]">#Rack</div>
                        <div className="w-12"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={productionDispatchByLocsId.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingDispatchProductionLocId ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {productionDispatchByLocsId.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 max-sm:h-[6rem] max-sm:flex-col ">
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium flex-col  w-[14.12rem] max-xl:w-[14.12rem] max-lg:w-[11.12rem] max-sm:w-auto max max-sm:flex-row  max-sm:justify-between  ">

                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    {item.manufactureId}
                                                </div>

                                            </div>
                                            <div className=" flex font-medium flex-col  w-[7.5rem] max-xl:w-[7.5rem] max-lg:w-[5.9rem]  max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    {item.productName}
                                                </div>

                                            </div>

                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium flex-col w-[15.5rem] max-xl:w-[8.5rem] max-lg:w-[6.5rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                                                    {item.categoryName}  {item.subCategoryName}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col w-[17.2rem] max-xl:w-[13.2rem] max-lg:w-[10.2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                                                <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    {item.attributeName}  {item.subAttributeName}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col w-[5.5rem] max-sm:flex-row  max-sm:justify-between ">

                                                <div class="text-xs text-cardBody font-semibold  font-poppins">
                                                    {/* {item.userName} */}
                                                    <MultiAvatar
                                                        primaryTitle={item.userName}
                                                        imageId={item.imageId}
                                                        imgWidth={"1.8rem"}
                                                        imgHeight={"1.8rem"}
                                                    />
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col w-[4.5rem] max-sm:flex-row  max-sm:justify-between ">


                                            </div>
                                            <div className=" flex font-medium flex-col w-[4.5rem] max-sm:flex-row  max-sm:justify-between ">


                                            </div>
                                            <div className=" flex font-medium flex-col w-[1rem] max-xl:w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    <Tooltip title="Edit">
                                                        <BorderColorIcon
                                                            className="!text-base cursor-pointer text-[tomato]"
                                                        // onClick={() => {
                                                        //     props.setEditProducts(item);
                                                        //     handleUpdateProductModal(true);
                                                        // }}
                                                        />
                                                    </Tooltip>
                                                </div>


                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    <Tooltip title="Print">

                                                        <ReactToPrint
                                                            trigger={() => <Button class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}>Print QR </Button>}
                                                            content={() => componentRefs.current[index]}
                                                        />
                                                    </Tooltip>

                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: "none", textAlign: "center" }}>

                                            <div
                                                ref={(el) => (componentRefs.current[index] = el)}
                                                style={{
                                                    fontSize: "16px",
                                                    marginBottom: "20px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div class=" mt-8"><QRCode size={130} value={item.manufactureId} /></div>
                                                <div style={{ fontSize: "2rem", marginTop: "10px" }}> {item.manufactureId}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>



        </>
    );
}


const mapStateToProps = ({ inventory, auth, }) => ({
    productionDispatchByLocsId: inventory.productionDispatchByLocsId,
    fetchingDispatchProductionLocId: inventory.fetchingDispatchProductionLocId,
    locationId: auth.userDetails.locationId,
    user: auth.userDetails,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDispatchProductionsbyLocId
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionDispatchCard);
