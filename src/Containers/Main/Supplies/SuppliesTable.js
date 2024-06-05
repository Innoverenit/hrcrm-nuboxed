import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QrCode from "./QrCode"
import {
  getSuppliesList,
  deletePurchaseData,
  handleUpdateSupplieDrawer,
  setEditSupplies,
  handleCurrencyPriceModal,
  handleBrandModel,
  handleMaterialBuilderDrawer,
  handleSuppliersListDrawer
} from "./SuppliesAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip, Popconfirm } from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import CategoryIcon from '@mui/icons-material/Category'
import moment from "moment";
import InventoryIcon from '@mui/icons-material/Inventory';
import { BundleLoader } from "../../../Components/Placeholder";
import { MultiAvatar } from "../../../Components/UI/Elements";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import MaterialStatusToggle from "./MaterialStatusToggle";
import MaterialFifoToggle from "./MaterialFifoToggle";

const MaterialBuilderDrawer = lazy(() => import("./MaterialBuilder/MaterialBuilderDrawer"));
const UpdateSuppliesFormDrawer = lazy(() => import("./UpdateSuppliesFormDrawer"));
const TagBrandModel = lazy(() => import("./TagBrandModel"));
const SuppliersListDrawer = lazy(() => import("./SuppliesSupplierList/SuppliersListDrawer"));

function SuppliesTable(props) {

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setPage(page + 1);
    props.getSuppliesList(page);
   
  }, []);

  const handleLoadMore = () => {
    const PageMapd = props.purchaseList && props.purchaseList.length &&props.purchaseList[0].pageCount
    setTimeout(() => {
      const {
        getSuppliesList,

        userId
      } = props;
      if  (props.purchaseList)
      {
        if (page < PageMapd) {
          setPage(page + 1);
          getSuppliesList(page);
      }
      if (page === PageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  const { updateSuppliesDrawer, handleUpdateSupplieDrawer, materialBuildrawer, handleMaterialBuilderDrawer } = props;
  return (
    <>
      <div className=" flex justify-end sticky z-auto">
        <div class="rounded-lg m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[1rem] max-xl:w-[2rem]"></div>
            <div className=" w-[2.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">HSN</div>
            <div className=" w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
            <div className=" w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Category</div>
            <div className="w-[8.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sub Category</div>
            <div className="w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Attribute</div>
            <div className="w-[6.14rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Re-order level</div>
            <div className="w-[4.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Created</div>
            <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Unique ID</div>
            {/* <div className="md:w-[4.2rem]">Scan</div> */}
            <div className="w-[11.8rem]"></div>
          </div>

          <InfiniteScroll
            dataLength={props.purchaseList.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingPurchaseList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"79vh"}
          >
            {props.purchaseList.length ?
              <>
                {props.purchaseList.map((item) => {
                    const currentDate = moment().format("DD/MM/YYYY");
                  return (
                    <>
                      <div className="flex rounded justify-center bg-white mt-1  h-8  p-1 max-sm:h-[7.5rem] max-sm:flex-col">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[8.91rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem]   max-sm:w-auto">
                            <div className="flex max-sm:w-wk max-sm:justify-between ">
                              <div>
                                {item.imageId && (
<span>
                                <MultiAvatar
                                  // primaryTitle={item.name}
                                  imageId={item.imageId}
                                  // imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                </span>
)}
                              </div>
                              <div class="w-[3.2rem] max-sm:w-auto max-xl:w-[1.2rem] max-lg:w-[0.2rem]">

                              </div>

                              <div class="max-sm:w-auto flex items-center">

                                <div className=" flex font-medium flex-col w-[4rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                  <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  {item.hsn} <span> {currentDate === moment(item.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-xs text-[tomato] font-bold">
                      New
                    </span>
                  ) : null} </span> &nbsp;  
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[8.12rem] max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.suppliesName}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.categoryName}
                            </div>
                          </div>

                          <div className=" flex font-medium flex-col w-[8.63rem] max-xl:w-[6.23rem] max-lg:w-[5.23rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.subCategoryName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[7.12rem] max-xl:w-[6.32rem] max-lg:w-[5.32rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.attributeName} {item.subAttributeName}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.reorder}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[8.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <MultiAvatar
                              primaryTitle={item.userName}
                               imageId={item.userImageId}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                               {`${moment(item.creationDate).format("ll")}`}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <MaterialStatusToggle
uniqueIdInd={item.uniqueIdInd}
suppliesId={item.suppliesId}
/> 
                            </div>
                          </div>

                          <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <MaterialFifoToggle
fifoInd={item.fifoInd}
suppliesId={item.suppliesId}
/> 
                            </div>
                          </div>
                          
                          
                          </div>
                   
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        
                            <div>
                              <Tooltip title="Material Builder">
                                <ViewQuiltIcon
                                  className="cursor-pointer text-xl"
                                  onClick={() => {
                                    props.handleMaterialBuilderDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div>
                              {props.repairInd && <Tooltip title="Tag Brand">
                                <PhoneFilled
                                  onClick={() => {
                                    props.handleBrandModel(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-xl cursor-pointer text-[blue]"
                                />
                              </Tooltip>}
                            </div>
                        
                         
                            <div>
                              <Tooltip title="Suppliers">
                                <CategoryIcon
                                  onClick={() => {
                                    props.handleSuppliersListDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-xl cursor-pointer"
                                />
                              </Tooltip>
                            </div>
                            <div>
                              <InventoryIcon className=" !text-xl cursor-pointer" />
                            </div>
                        
                         
                            <div>
                              <Tooltip title="Edit">
                                <BorderColorIcon
                                  onClick={() => {
                                    handleUpdateSupplieDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-xl cursor-pointer text-[tomato]"
                                />
                              </Tooltip>
                            </div>
                            <div>
                              <Popconfirm
                                title="Do you want to delete?"
                                onConfirm={() => props.deletePurchaseData(item.suppliesId)}
                              >

                                <DeleteOutlined className=" !text-xl cursor-pointer text-[red]" />
                              </Popconfirm>
                            </div>
                         
                          </div>
                       
                        </div>
                      </div>
                    </>
                  );
                })}
              </> :
              !props.purchaseList.length
                && !props.fetchingPurchaseList ? <NodataFoundPage /> : null}
          </InfiniteScroll>
        </div>
      </div>

      <Suspense fallback={<BundleLoader />}>
        <TagBrandModel
          addBrandModel={props.addBrandModel}
          handleBrandModel={props.handleBrandModel}
          particularDiscountData={particularDiscountData}
        />
        <UpdateSuppliesFormDrawer
          particularDiscountData={particularDiscountData}
          updateSuppliesDrawer={updateSuppliesDrawer}
          handleUpdateSupplieDrawer={handleUpdateSupplieDrawer}
        />
        <MaterialBuilderDrawer
          particularDiscountData={particularDiscountData}
          materialBuildrawer={materialBuildrawer}
          handleMaterialBuilderDrawer={handleMaterialBuilderDrawer}
        />
        <SuppliersListDrawer
          particularDiscountData={particularDiscountData}
          suppliersListDrwr={props.suppliersListDrwr}
          handleSuppliersListDrawer={props.handleSuppliersListDrawer}
        />
      </Suspense>

    </>
  );
}


const mapStateToProps = ({ supplies, auth }) => ({
  fetchingPurchaseList: supplies.fetchingPurchaseList,
  purchaseList: supplies.purchaseList,
  updateSuppliesDrawer: supplies.updateSuppliesDrawer,
  addCurrencyValue: supplies.addCurrencyValue,
  addBrandModel: supplies.addBrandModel,
  materialBuildrawer: supplies.materialBuildrawer,
  repairInd: auth.userDetails.repairInd,
  suppliersListDrwr: supplies.suppliersListDrwr
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliesList,
      deletePurchaseData,
      handleUpdateSupplieDrawer,
      setEditSupplies,
      handleCurrencyPriceModal,
      handleBrandModel,
      handleMaterialBuilderDrawer,
      handleSuppliersListDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesTable);
