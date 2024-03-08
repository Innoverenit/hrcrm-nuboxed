import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Popconfirm } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import MoveToggleProduction from "../Child/MoveToggleProduction";
import ButtonGroup from "antd/lib/button/button-group";
import { getProductionsbyLocId, handleBuilderProduction, handleProductionIDrawer } from "../ProductionAction"
import { DeleteOutlined } from "@ant-design/icons";
import PrintIcon from '@mui/icons-material/Print';
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
const BuilderProductionDrawer = lazy(() => import("./BuilderProductionDrawer"));
const ProductionIDrawer = lazy(() => import("./ProductionIDrawer"));

function ProductionCardView(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

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

    function StatusIcon({ type, size, iconType, tooltip, status, id, onClick, productId, indStatus }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button
                    className="p-[6px] border-transparent"
                    ghost={status !== type}
                    style={{
                        color: indStatus === type ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip>
        );
    }

    const [active, setActive] = useState("To Start")

    function handleQCStatus(type, item) {
        setActive(type)

        // const data = {
        //     qcStatus: type,
        //     orderproductId: props.rowData.orderId,
        //     productId: item.productId,
        //     qcTechnicianId: props.userId,
        //     qcInspectionInd: type === "Complete" ? 2 : 1
        // }
        // props.updateQCStatus(data, item.productId, props.rowData.orderproductId, handleCallBack)
    }
    const handleCallBack = () => {
        // props.getPhoneOrderIdByUser(props.rowData.orderproductId, props.userId)
        // props.getOrderByUser(props.locationId, props.userId)
    }
    const {
        fetchingProductionLocId,
        productionByLocsId,
        user,
        openbUILDERProductiondrawer, handleBuilderProduction, clickedProductionIdrwr, handleProductionIDrawer
    } = props;
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[10rem]">Id</div>
                        <div className=" md:w-[7rem]">Item</div>
                        <div className="md:w-[5rem]">Category</div>
                        <div className="md:w-[5rem]">Attribute</div>
                        <div className=" md:w-[5rem]">Start Date</div>
                        <div className=" md:w-[5rem]">End Date</div>
                        <div className="md:w-[5.2rem]">Workflow</div>
                        <div className="md:w-[5.2rem]"></div>
                        <div className=" md:w-[5rem] ">Status</div>
                        <div className="md:w-[5rem]"></div>
                        <div className="md:w-[5rem]">Inspected</div>
                        <div className="md:w-[5rem]"> Dispatch </div>
                        <div className="md:w-[3rem]"></div>
                        <div className="md:w-[2rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={productionByLocsId.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingProductionLocId ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {productionByLocsId.length ?
                            <>
                                {productionByLocsId.map((item) => {
                                    return (
                                        <div>
                                            <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                                <div class="flex">
                                                    <div className=" flex font-medium flex-col  md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" underline text-[#1890ff] cursor-pointer w-[8rem] flex text-xs  font-poppins"
                                                            onClick={() => {
                                                                handleParticularRowData(item);
                                                                props.handleProductionIDrawer(true)
                                                            }}
                                                        >
                                                            {item.manufactureId}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium flex-col  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {item.productName}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {item.categoryName}  {item.subCategoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.attributeName}  {item.subAttributeName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {item.startDate}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.endDate}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.workFlow}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">

                                                        <ButtonGroup>
                                                            <StatusIcon
                                                                type="In Progress"
                                                                iconType="fa-hourglass-half"
                                                                tooltip="In Progress"
                                                                id={item.productId}
                                                                indStatus={item.qcStatus}
                                                                // productId={RowData.productId}
                                                                status={active}
                                                                onClick={() => {
                                                                    handleQCStatus("In Progress", item);
                                                                }}
                                                            />
                                                            <StatusIcon
                                                                type="Complete"
                                                                iconType="fa-hourglass"
                                                                tooltip="Complete"
                                                                indStatus={item.qcStatus}
                                                                status={active}
                                                                id={item.productId}
                                                                // productId={RowData.productId}
                                                                onClick={() => {
                                                                    handleQCStatus("Complete", item);
                                                                }}
                                                            />
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">

                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        <Button
                                                            type="primary"
                                                            onClick={() => {
                                                                handleParticularRowData(item);
                                                                handleBuilderProduction(true);
                                                            }}
                                                        >
                                                            Add Parts
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        <MoveToggleProduction item={item} />
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        <Tooltip title="Print QR Code">
                                                            <PrintIcon />
                                                        </Tooltip>
                                                    </div>
                                                </div>

                                                {(user.productionDeleteInd === true || user.role === "ADMIN") && (
                                                    <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <Tooltip title="Delete">
                                                                <Popconfirm
                                                                    title="Do you want to delete?"
                                                                //   onConfirm={() => props.deleteShipperData(item.shipperId)}
                                                                >
                                                                    <DeleteOutlined
                                                                        className=" !text-base cursor-pointer text-[red]"

                                                                    />
                                                                </Popconfirm>
                                                            </Tooltip>
                                                        </div>


                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                            : !productionByLocsId.length
                                && !fetchingProductionLocId ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                </div>
            </div>

            <BuilderProductionDrawer
                particularDiscountData={particularDiscountData}
                openbUILDERProductiondrawer={openbUILDERProductiondrawer}
                handleBuilderProduction={handleBuilderProduction}
            />
            <ProductionIDrawer
                particularDiscountData={particularDiscountData}
                clickedProductionIdrwr={clickedProductionIdrwr}
                handleProductionIDrawer={handleProductionIDrawer}
            />
        </>
    );
}


const mapStateToProps = ({ production, auth, }) => ({
    productionByLocsId: production.productionByLocsId,
    fetchingProductionLocId: production.fetchingProductionLocId,
    locationId: auth.userDetails.locationId,
    user: auth.userDetails,
    openbUILDERProductiondrawer: production.openbUILDERProductiondrawer,
    clickedProductionIdrwr: production.clickedProductionIdrwr
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionsbyLocId,
            handleBuilderProduction,
            handleProductionIDrawer
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionCardView);
