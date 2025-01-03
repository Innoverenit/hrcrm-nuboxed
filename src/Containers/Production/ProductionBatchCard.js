import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button  } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import ButtonGroup from "antd/lib/button/button-group";
// import { getAllProductionsbyOrgId, updateProStatus,handleBuilderProduction, handleProductionIDrawer } from "../ProductionAction"
// import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
// import { MultiAvatar } from "../../../Components/UI/Elements";


function ProductionBatchCard(props) {

    const [page, setPage] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // useEffect(() => {
    //     props.getAllProductionsbyOrgId(props.organizationId);
    //     setPage(page + 1);
    // }, []);

    // useEffect(() => {
    //     const fetchMenuTranslations = async () => {
    //       try {
    //         const itemsToTranslate = [
    //         "1061",//  "MFG ID",//0
    //        "658" ,//   "Location",//1
    //         "744",//   "Cell",//1
    //        "679" ,//   "Created",//1
    //         "1044",//   "Item",//1
    //        "14", //   "Category",//1
    //        "259", //   "Attribute",//1
    //         "158",//   "Start",//1
    //        "111", //   "End",//1
    //         "141",//   "Workflow",//1
    //         "142",//   "Status",//1
    //        "1051", //   "Inspected",//1
    //         "1063"//   "Dispatch",//1
          
    //        ];
    
    //         const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
    //         setTranslatedMenuItems(translations);
    //       } catch (error) {
    //         console.error('Error translating menu items:', error);
    //       }
    //     };
    
    //     fetchMenuTranslations();
    //   }, [props.selectedLanguage]);

    const [particularDiscountData, setParticularDiscountData] = useState({});


    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    // const handleLoadMore = () => {
    //     const proPag = props.productionAllByOrgId && props.productionAllByOrgId.length && props.productionAllByOrgId[0].pageCount
    //     setTimeout(() => {
    //         if (props.productionAllByOrgId) {
    //             if (page < proPag) {
    //                 setPage(page + 1);
    //                 props.getAllProductionsbyOrgId(props.locationId, page);
    //             }
    //             if (page === proPag) {
    //                 setHasMore(false)
    //             }
    //         }
    //     }, 100);
    // };

    // function StatusIcon({ type, role, iconType, tooltip,size, status, id, onClick, productId, indStatus }) {
       
    //     if (role === type) {
    //         size = "30px";
    //     } else {
    //         size = "16px";
    //     }
    //     return (
    //         <Tooltip title={tooltip}>
    //             <Button
    //                 className="p-[6px] border-transparent"
    //                 ghost={role !== type}
    //                 style={{
    //                     color: role === type ? "orange" : "grey",
    //                 }}
    //                 onClick={onClick}
    //             >
    //                 <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
    //             </Button>
    //         </Tooltip>
    //     );
    // }

    const handleCallBack = () => {
        // props.getPhoneOrderIdByUser(props.rowData.orderproductId, props.userId)
        // props.getOrderByUser(props.locationId, props.userId)
    }
    // const {
    //     fetchingAllProductionOrgId,
    //     productionAllByOrgId,
    //     user,
    //     openbUILDERProductiondrawer, handleBuilderProduction, clickedProductionIdrwr, handleProductionIDrawer
    // } = props;
    return (
        <>
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky h-8 z-10">
                        <div className=""></div>
                        <div className=" w-[8.1rem] text-[#00A2E8] truncate text-sm  max-md:w-[8.1rem]">
                            MFG ID
                            {/* {translatedMenuItems[0]} */}
                            </div>
                        <div className="w-[7.09rem] truncate max-md:w-[7rem]">
                            Location
                            {/* {translatedMenuItems[1]} */}
                            </div>
                        <div className="w-[7.1rem] truncate  max-md:w-[7rem]">
                            Cell
                            {/* {translatedMenuItems[2]} */}
                            </div>
                        <div className="w-[8.2rem] truncate  max-md:w-[7rem]">
                            Created
                            {/* {translatedMenuItems[3]} */}
                            </div>
                        <div className="w-[9.1rem] truncate  max-md:w-[9rem]">
                            Item
                            {/* {translatedMenuItems[4]} */}
                            
                                </div>
                        <div className="w-[8.3rem] truncate  max-md:w-[8rem]">
                            Category
                            {/* {translatedMenuItems[5]} */}
                            </div>
                        <div className="w-[9.2rem] truncate  max-md:w-[9rem]">
                            Attribute
                            {/* {translatedMenuItems[6]} */}
                            </div>
                        <div className="w-[9.4rem] truncate  max-md:w-[5rem]">
                            Start
                            {/* {translatedMenuItems[7]} */}
                            </div>
                        <div className="w-[9.5rem] truncate  max-md:w-[5rem]">
                            End
                            {/* {translatedMenuItems[8]} */}
                            </div>
                        <div className="w-[8.4rem] truncate  max-md:w-[5.2rem]">
                            Workflow
                            {/* {translatedMenuItems[9]} */}
                            </div>
                        <div className="w-[5.1rem] truncate  max-md:w-[5.2rem]"></div>
                        <div className="w-[5.3rem] truncate  max-md:w-[5rem] ">
                            Status
                            {/* {translatedMenuItems[10]} */}
                            </div>
                        <div className=" w-[5.6rem] truncate  max-md:w-[5rem]"></div>
                        <div className="w-[5.8rem] truncate  max-md:w-[5rem]">
                            Inspected
                            {/* {translatedMenuItems[11]} */}
                            </div>
                        <div className="w-[6.2rem] truncate  max-md:w-[5rem]"> 
                            Dispatch 
                            {/* {translatedMenuItems[12]} */}
                            </div>
                        <div className="w-[3.1rem] truncate  max-md:w-[3rem]"></div>
                        <div className=" w-[3.2rem] truncate  max-md:w-[2rem]"></div>
                    </div>
                    {/* <InfiniteScroll
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
                                           <div className="flex rounded justify-between  bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "  >                 
                                                <div class="flex items-center">
                                                <div className=" flex w-[8.01rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-start border-l-2 border-green-500 bg-[#eef2f9]  max-sm:w-auto">

                                                        <div class=" text-[#1890ff]  ml-gap cursor-pointer  flex text-xs  font-poppins"
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
                                                    <div className=" flex w-[7rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-start ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs ml-gap font-poppins">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[7.01rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs    font-poppins"> 
                                                        {item.cellChamberName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[7.04rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs  font-poppins">
                                                          
                                                            <MultiAvatar
                  primaryTitle={item.createdBy}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                                        </div>
                                                       

                                                    </div>
                                                    <div className=" flex w-[7.07rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-start ml-gap bg-[#eef2f9]  max-sm:w-auto">

                                                        <div class=" text-xs ml-gap  font-poppins">
                                                            {item.productName}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" flex w-[7.08rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-start ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs ml-gap font-poppins">

                                                        {item.categoryName}  {item.subCategoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[6.9rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-start ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs  ml-gap  font-poppins">
                                                        {item.attributeName}  {item.subAttributeName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[6.7rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs  font-poppins">

                                                        {item.startDate}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[6.06rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs   font-poppins">
                                                        {item.endDate}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[7.10rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs    font-poppins">
                                                        {item.workflowName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[6.03rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs   font-poppins">
                                                   
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
                                                <div className=" flex w-[6.5rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs   font-poppins">

                                                    </div>
                                                </div>
                                               
                                                <div className=" flex w-[5.1rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                    <div class=" text-xs   font-poppins">
                                                       
                                                        <div class=" text-xs  font-poppins">
                                                           
                                                            <MultiAvatar
                  primaryTitle={item.inspectedUserName}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                                                        </div>
                                                        </div>
                                                        <div className=" flex w-[5.9rem] h-8 max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] items-center justify-center ml-gap bg-[#eef2f9]  max-sm:w-auto">
                                                        <div class=" text-xs  font-poppins">
                                                        
                                                            {`  ${dayjs(item.inspectedDate).format("DD-MM-YYYY")}`}
                                                        </div>
                                                        </div>
                                                   
        
                                                    </div>
                                             
                                              
                                                 
                                              
                                           

                                              
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                            : !productionAllByOrgId.length
                                && !fetchingAllProductionOrgId ? <NodataFoundPage /> : null}
                    </InfiniteScroll> */}
                </div>
            </div>

        
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
         
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionBatchCard);
