import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, Tooltip } from "antd";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import InfiniteScroll from "react-infinite-scroll-component";
import { getArchieveProductionbyLocId } from "../../../InventoryAction";

function ProductionArchieveCard(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getArchieveProductionbyLocId(props.locationId, props.userId, page);
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
        const proPag = props.archieveInProduction && props.archieveInProduction.length && props.archieveInProduction[0].pageCount
        setTimeout(() => {
            if (props.archieveInProduction) {
                if (page < proPag) {
                    setPage(page + 1);
                    props.getArchieveProductionbyLocId(props.locationId, props.userId, page);
                }
                if (page === proPag) {
                    setHasMore(false)
                }
            }
        }, 100);
    };

    const {
        fetchingArchieveProductionLocId,
        archieveInProduction,

    } = props;
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[7%]">Order#</div>
                        <div className=" md:w-[7%]">Name</div>
                        <div className=" md:w-[6.1rem]">Category</div>
                        <div className=" md:w-[6rem]">SubCategory</div>
                        <div className=" md:w-[4.2rem] ">Attribute</div>
                        <div className="md:w-[5.8rem]">Sub Attribute</div>
                        <div className="w-12"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={archieveInProduction.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingArchieveProductionLocId ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {archieveInProduction.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">

                                        <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.newOrderNo}
                                            </div>

                                        </div>

                                        <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.productName}
                                            </div>

                                        </div>



                                        <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins">

                                                {item.categoryName}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.subCategoryName}
                                            </div>
                                        </div>

                                        <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">

                                            <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.attributeName}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
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
                                        <div className=" flex font-medium   md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Print">

                                                    <ReactToPrint
                                                        trigger={() => <Button class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}>Print </Button>}
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
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>



        </>
    );
}


const mapStateToProps = ({ inventory, auth, }) => ({
    archieveInProduction: inventory.archieveInProduction,
    fetchingArchieveProductionLocId: inventory.fetchingArchieveProductionLocId,
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getArchieveProductionbyLocId
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionArchieveCard);
