import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button  } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import ButtonGroup from "antd/lib/button/button-group";
import { getAllProductionsbyOrgId, updateProStatus,handleBuilderProduction, handleProductionIDrawer } from "../ProductionAction"
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MultiAvatar } from "../../../Components/UI/Elements";
const BuilderProductionDrawer = lazy(() => import("./BuilderProductionDrawer"));
const ProductionIDrawer = lazy(() => import("./ProductionIDrawer"));

function ProductionAllCardView(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getAllProductionsbyOrgId(props.organizationId);
        setPage(page + 1);
    }, []);

    const [particularDiscountData, setParticularDiscountData] = useState({});


    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    const handleLoadMore = () => {
        const proPag = props.productionAllByOrgId && props.productionAllByOrgId.length && props.productionAllByOrgId[0].pageCount
        setTimeout(() => {
            if (props.productionAllByOrgId) {
                if (page < proPag) {
                    setPage(page + 1);
                    props.getAllProductionsbyOrgId(props.locationId, page);
                }
                if (page === proPag) {
                    setHasMore(false)
                }
            }
        }, 100);
    };

    function StatusIcon({ type, role, iconType, tooltip,size, status, id, onClick, productId, indStatus }) {
       
        if (role === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button
                    className="p-[6px] border-transparent"
                    ghost={role !== type}
                    style={{
                        color: role === type ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip>
        );
    }

    const handleCallBack = () => {
        // props.getPhoneOrderIdByUser(props.rowData.orderproductId, props.userId)
        // props.getOrderByUser(props.locationId, props.userId)
    }
    const {
        fetchingAllProductionOrgId,
        productionAllByOrgId,
        user,
        openbUILDERProductiondrawer, handleBuilderProduction, clickedProductionIdrwr, handleProductionIDrawer
    } = props;
    return (
        <>
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky h-8 z-10">
                        <div className=""></div>
                        <div className=" md:w-[8.1rem]">MFG ID</div>
                        <div className=" md:w-[7rem]">Location</div>
                        <div className=" md:w-[7rem]">Cell</div>
                        <div className=" md:w-[7rem]">Created</div>
                        <div className=" md:w-[9rem]">Item</div>
                        <div className="md:w-[8rem]">Category</div>
                        <div className="md:w-[9rem]">Attribute</div>
                        <div className=" md:w-[5rem]">Start</div>
                        <div className=" md:w-[5rem]">End</div>
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
                        dataLength={productionAllByOrgId.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingAllProductionOrgId ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"80vh"}
                        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {productionAllByOrgId.length ?
                            <>
                                {productionAllByOrgId.map((item) => {
                                     const currentdate = dayjs().format("DD/MM/YYYY");
                                     const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div>
                                            <div className="flex rounded justify-between mt-2 bg-white h-8  p-1 ">
                                                <div class="flex">
                                                    <div className=" flex font-medium   md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-[#1890ff] cursor-pointer  flex text-xs  font-poppins"
                                                            onClick={() => {
                                                                handleParticularRowData(item);
                                                                props.handleProductionIDrawer(true)
                                                            }}
                                                        >
                                                            {item.manufactureId}
                                
                                {date === currentdate ? (
                                  <div class="text-xs text-[tomato] mt-[0.4rem] font-bold"
                                  >
                                    New
                                  </div>
                                ) : null}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.cellChamberName}
                                                    </div>
                                                </div>
                                                    <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                            {/* {props.productionTableData.createdBy} */}
                                                            <MultiAvatar
                  primaryTitle={item.createdBy}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                                                        </div>
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {date}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {item.productName}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" flex font-medium  md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {item.categoryName}  {item.subCategoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.attributeName}  {item.subAttributeName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {item.startDate}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.endDate}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.workflowName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                   
                                                        <ButtonGroup>
                                                        {item.type===null && item.type==="In Progress" && (
                                                            <StatusIcon
                                                                type="In Progress"
                                                                iconType="fa-hourglass-half"
                                                                tooltip="In Progress"
                                                                role={item.type}
                                                                onClick={() => {
                                                                    props.updateProStatus({ 
                                                                        type:"In Progress",
                                                                  },item.productionProductId);
                                                                  }}
                                                            />)}

                                                            {item.type==="In Progress" ? 
                                                            <StatusIcon
                                                                type="Complete"
                                                                iconType="fa-hourglass"
                                                                tooltip="Complete"
                                                                role={item.type}
                                                                onClick={() => {
                                                                    props.updateProStatus({ 
                                                                        type:"Complete",
                                                                  },item.productionProductId);
                                                                  }}
                                                            />:null}
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">

                                                    </div>
                                                </div>
                                                {/* <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                {item.type==="Complete" ? 
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
                                                    </div>:null}
                                                </div> */}
                                                <div className=" flex font-medium  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* <InpectProductionToggle item={item}/> */}
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {/* {props.productionTableData.createdBy} */}
                                                            <MultiAvatar
                  primaryTitle={item.inspectedUserName}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                                                        </div>
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {/* {date} */}
                                                            {`  ${dayjs(item.inspectedDate).format("DD-MM-YYYY")}`}
                                                        </div>
                                                   
        
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* <MoveToggleProduction item={item} /> */}
                                                    </div>
                                                </div>
                                                {/* <div className=" flex font-medium flex-col md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        <Tooltip title="Print QR Code">
                                                           <Button type="primary">
                                                            Print QR 
                                                           </Button>
                                                        </Tooltip>
                                                    </div>
                                                </div> */}

                                                {/* {(user.productionDeleteInd === true || user.role === "ADMIN") && (
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
                                                )} */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                            : !productionAllByOrgId.length
                                && !fetchingAllProductionOrgId ? <NodataFoundPage /> : null}
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
    productionAllByOrgId: production.productionAllByOrgId,
    fetchingAllProductionOrgId: production.fetchingAllProductionOrgId,
    locationId: auth.userDetails.locationId,
    user: auth.userDetails,
    openbUILDERProductiondrawer: production.openbUILDERProductiondrawer,
    clickedProductionIdrwr: production.clickedProductionIdrwr,
    organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllProductionsbyOrgId,
            handleBuilderProduction,
            handleProductionIDrawer,
            updateProStatus
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionAllCardView);
