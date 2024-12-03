import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button  } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import ButtonGroup from "antd/lib/button/button-group";
import { getAllProductionsbyOrgId, updateProStatus,handleBuilderProduction, handleProductionIDrawer } from "../ProductionAction"
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MultiAvatar } from "../../../Components/UI/Elements";
const BuilderProductionDrawer = lazy(() => import("./BuilderProductionDrawer"));
const ProductionIDrawer = lazy(() => import("./ProductionIDrawer"));

function ProductionAllCardView(props) {

    const [page, setPage] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getAllProductionsbyOrgId(props.organizationId);
        setPage(page + 1);
    }, []);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
            "1061",//  "MFG ID",//0
           "658" ,//   "Location",//1
            "744",//   "Cell",//1
           "679" ,//   "Created",//1
            "1044",//   "Item",//1
           "14", //   "Category",//1
           "259", //   "Attribute",//1
            "158",//   "Start",//1
           "111", //   "End",//1
            "141",//   "Workflow",//1
            "142",//   "Status",//1
           "1051", //   "Inspected",//1
            "1063"//   "Dispatch",//1
          
          
           
              
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);

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
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  justify-between w-[100%]  p-1 bg-transparent font-bold sticky h-8 z-10">
                        <div className=""></div>
                        <div className=" md:w-[8.1rem]">
                            {/* MFG ID */}
                            {translatedMenuItems[0]}
                            </div>
                        <div className=" md:w-[7rem]">
                            {/* Location */}
                            {translatedMenuItems[1]}
                            </div>
                        <div className=" md:w-[7rem]">
                            {/* Cell */}
                            {translatedMenuItems[2]}
                            </div>
                        <div className=" md:w-[7rem]">
                            {/* Created */}
                            {translatedMenuItems[3]}
                            </div>
                        <div className=" md:w-[9rem]">
                            {/* Item */}
                            {translatedMenuItems[4]}
                            
                                </div>
                        <div className="md:w-[8rem]">
                            {/* Category */}
                            {translatedMenuItems[5]}
                            </div>
                        <div className="md:w-[9rem]">
                            {/* Attribute */}
                            {translatedMenuItems[6]}
                            </div>
                        <div className=" md:w-[5rem]">
                            {/* Start */}
                            {translatedMenuItems[7]}
                            </div>
                        <div className=" md:w-[5rem]">
                            {/* End */}
                            {translatedMenuItems[8]}
                            </div>
                        <div className="md:w-[5.2rem]">
                            {/* Workflow */}
                            {translatedMenuItems[9]}
                            </div>
                        <div className="md:w-[5.2rem]"></div>
                        <div className=" md:w-[5rem] ">
                            {/* Status */}
                            {translatedMenuItems[10]}
                            </div>
                        <div className="md:w-[5rem]"></div>
                        <div className="md:w-[5rem]">
                            {/* Inspected */}
                            {translatedMenuItems[11]}
                            </div>
                        <div className="md:w-[5rem]"> 
                            {/* Dispatch  */}
                            {translatedMenuItems[12]}
                            </div>
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
                                            <div className="flex rounded justify-between mt-1 bg-white h-8  p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                                <div class="flex items-center">
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
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {item.cellChamberName}
                                                    </div>
                                                </div>
                                                    <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                            {/* {props.productionTableData.createdBy} */}
                                                            <MultiAvatar
                  primaryTitle={item.createdBy}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                                        </div>
                                                        <div class=" text-xs  font-poppins">
                                                            {date}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs  font-poppins">
                                                            {item.productName}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" flex font-medium  md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins">

                                                        {item.categoryName}  {item.subCategoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {item.attributeName}  {item.subAttributeName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins">

                                                        {item.startDate}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {item.endDate}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {item.workflowName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                   
                                                        <ButtonGroup>
                                                        {item.type===null && item.type==="In Progress" && (
                                                            <StatusIcon
                                                                type="In Progress"
                                                                // iconType="fa-hourglass-half"
                                                                iconType={<HourglassTopIcon className="!text-icon text-orange-600 cursor-pointer"/>}
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
                                                                // iconType="fa-hourglass"
                                                                iconType={<HourglassBottomIcon className="!text-icon text-orange-600 cursor-pointer"/>}
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
                                                    <div class=" text-xs  font-semibold  font-poppins">

                                                    </div>
                                                </div>
                                                {/* <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                {item.type==="Complete" ? 
                                                    <div class=" text-xs  font-semibold  font-poppins">
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
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {/* <InpectProductionToggle item={item}/> */}
                                                        <div class=" text-xs  font-poppins">
                                                            {/* {props.productionTableData.createdBy} */}
                                                            <MultiAvatar
                  primaryTitle={item.inspectedUserName}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                                                        </div>
                                                        <div class=" text-xs  font-poppins">
                                                            {/* {date} */}
                                                            {`  ${dayjs(item.inspectedDate).format("DD-MM-YYYY")}`}
                                                        </div>
                                                   
        
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {/* <MoveToggleProduction item={item} /> */}
                                                    </div>
                                                </div>
                                           

                                              
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
