import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Tooltip, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToPrint from "react-to-print";
import MoveToggleProduction from "./MoveToggleProduction";
import { getProductionsbyLocId } from "../ProductionAction"
import QRCode from "qrcode.react";

function CreateProductionCard(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };
    useEffect(() => {
        props.getProductionsbyLocId(props.locationId, page);
        setPage(page + 1);
    }, []);

    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    const handleLoadMore = () => {
        const proPag = props.productionByLocsId && props.productionByLocsId.length && props.productionByLocsId[0].pageCount
        setTimeout(() => {
            if (props.productionByLocsId) {
                if (page < proPag) {
                    setPage(page + 1);
                    props.getProductionsbyLocId(props.locationId, page);
                }
                if (page === proPag) {
                    setHasMore(false)
                }
            }
        }, 100);
    };

    const {
        fetchingProductionLocId,
        productionByLocsId,

    } = props;
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className="w-[7rem]">Manufacture ID</div>
                        <div className=" w-[5rem]">Name</div>
                        <div className=" w-[6.1rem]">Category</div>
                        <div className=" w-[4.2rem] ">Attribute</div>   
                        <div className=" w-[14.21rem] ">To Dispatch</div>                     
                        <div className="w-12"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={productionByLocsId.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingProductionLocId ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {productionByLocsId.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                        <div class="flex">
                                        <div className=" flex font-medium flex-col  w-[14.12rem] max-sm:flex-row  max-sm:justify-between  ">

<div class=" text-xs text-cardBody font-poppins">
    {item.manufactureId}
</div>

</div>
                                            <div className=" flex font-medium flex-col  w-[10.1rem] max-sm:flex-row  max-sm:justify-between  ">

                                                <div class=" text-xs text-cardBody font-poppins">
                                                    {item.productName}
                                                </div>

                                            </div>

                                        </div>

                                        <div className=" flex font-medium flex-col w-[9.5rem] max-sm:flex-row  max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins">

                                                {item.categoryName}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col w-[9.2rem] max-sm:flex-row  max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.subCategoryName}
                                            </div>
                                        </div>

                                        <div className=" flex font-medium flex-col w-[3.2rem] max-sm:flex-row  max-sm:justify-between ">

                                            <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.attributeName}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col w-[3.2rem] max-sm:flex-row  max-sm:justify-between ">

                                            <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                <MoveToggleProduction item={item} />
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
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
                                        <div className=" flex font-medium   w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
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
                                            <div style={{ fontSize: "2rem" }}>{item.manufactureId}</div>
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


const mapStateToProps = ({ production, auth, }) => ({
    productionByLocsId: production.productionByLocsId,
    fetchingProductionLocId: production.fetchingProductionLocId,
    locationId: auth.userDetails.locationId,
    user: auth.userDetails,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionsbyLocId
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProductionCard);
