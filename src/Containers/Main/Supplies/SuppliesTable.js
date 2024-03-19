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

const MaterialBuilderDrawer = lazy(() => import("./MaterialBuilder/MaterialBuilderDrawer"));
const UpdateSuppliesFormDrawer = lazy(() => import("./UpdateSuppliesFormDrawer"));
const TagBrandModel = lazy(() => import("./TagBrandModel"));
const SuppliersListDrawer = lazy(() => import("./SuppliesSupplierList/SuppliersListDrawer"));

function SuppliesTable(props) {

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getSuppliesList();
    setPage(page + 1);
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getSuppliesList();
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
  if (isMobile) {
    return (
      <>
        <div className=" flex justify-end sticky top-28 z-auto">
          <div class="rounded-lg  p-2 w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">

            {props.purchaseList.map((item) => {
              return (
                <>
                  <div
                    className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
                  >
                    <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                      <div class="flex justify-between w-wk items-center ">

                        <div className="flex max-sm:w-full ">
                          <div>

                            <MultiAvatar
                              // primaryTitle={item.name}
                              imageId={item.imageId}
                              // imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />

                          </div>
                          <div class="w-[4%]"></div>

                          <div class="max-sm:w-full md:flex items-center">

                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                                {item.hsn}
                              </div>
                            </div>
                          </div>
                        </div>


                        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {item.suppliesName}
                        </div>

                      </div>
                      <div class="flex justify-between w-wk items-center ">
                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {item.categoryName}
                          </div>
                        </div>

                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {item.subCategoryName}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-28 max-sm:justify-between w-full max-sm:flex-row ">
                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            {item.attributeName} {item.subAttributeName}
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between w-wk items-center ">

                        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {item.reorder}
                        </div>


                        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          {`${moment(item.creationDate).format("ll")}`}
                        </div>


                        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                          <QrCode />
                        </div>

                      </div>
                      <div class="flex justify-between w-wk items-center ">

                        <div>
                          <Tooltip title="Material Builder">
                            <ViewQuiltIcon
                              className="cursor-pointer text-base"
                              onClick={() => {
                                props.handleMaterialBuilderDrawer(true);
                                handleParticularRowData(item);
                              }}
                            />
                          </Tooltip>
                        </div>


                        <div>
                          {props.repairInd && <Tooltip title="Brand Model">
                            <PhoneFilled
                              onClick={() => {
                                props.handleBrandModel(true);
                                handleParticularRowData(item);
                              }}
                              style={{ color: "blue", cursor: "pointer" }}
                            />
                          </Tooltip>
                          }
                        </div>
                        {/* <div>

                          <InventoryIcon
                            style={{ cursor: "pointer", fontSize: "1rem", }}
                          />

                        </div> */}


                        <div>
                          <Tooltip title="Edit">
                            <BorderColorIcon
                              onClick={() => {
                                handleUpdateSupplieDrawer(true);
                                handleParticularRowData(item);
                              }}
                              style={{
                                color: "grey",
                                cursor: "pointer",
                                fontSize: "1rem",
                              }}
                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Popconfirm
                            title="Do you want to delete?"
                            onConfirm={() => props.deletePurchaseData(item.suppliesId)}
                          >
                            <DeleteFilled
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </Popconfirm>
                        </div>

                      </div>
                    </div>
                  </div>
                </>
              );
            })}
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
        </Suspense>

      </>
    );
  }
  return (
    <>
      <div className=" flex justify-end sticky top-28 z-auto">
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[1rem]"></div>
            <div className=" md:w-[6.1rem]">HSN</div>
            <div className=" md:w-[5.1rem]">Name</div>
            <div className=" md:w-[6.2rem] ">Category</div>
            <div className="md:w-[6.1rem]">Sub Category</div>
            <div className="md:w-[4.8rem]">Attribute</div>
            <div className="md:w-[6.1rem]">Re-order level</div>
            <div className="md:w-[4.2rem]">Created</div>
            {/* <div className="md:w-[4.2rem]">Scan</div> */}
            <div className="w-[3.8rem]"></div>
          </div>

          <InfiniteScroll
            dataLength={props.purchaseList.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingPurchaseList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"75vh"}
          >
            {props.purchaseList.length ?
              <>
                {props.purchaseList.map((item) => {
                  return (
                    <>
                      <div className="flex rounded-xl justify-center bg-white mt-[0.5rem]  h-[2.75rem]  p-3">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                          <div className=" flex font-medium flex-col w-[17rem]   max-sm:w-full">
                            <div className="flex max-sm:w-full ">
                              <div>

                                <MultiAvatar
                                  // primaryTitle={item.name}
                                  imageId={item.imageId}
                                  // imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />

                              </div>
                              <div class="w-[4%]">

                              </div>

                              <div class="max-sm:w-full md:flex items-center">

                                <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                                  <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                                    {item.hsn}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                              {item.suppliesName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                              {item.categoryName}
                            </div>
                          </div>

                          <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                              {item.subCategoryName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                              {item.attributeName} {item.subAttributeName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                              {item.reorder}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                              {`${moment(item.creationDate).format("ll")}`}
                            </div>
                          </div>
                          {/* <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <QrCode />
                      </div>
                    </div> */}
                          <div class="flex flex-col w-[3%] justify-center max-sm:flex-row max-sm:w-[10%]">
                            <div>

                            </div>
                          </div>
                          <div class="flex flex-col w-[3%] justify-center max-sm:flex-row max-sm:w-[10%]">
                            <div>

                            </div>
                            <div>
                            </div>
                          </div>
                          <div class="flex flex-col justify-center w-[3%] max-sm:flex-row max-sm:w-[10%]">
                            <div>
                              <Tooltip title="Material Builder">
                                <ViewQuiltIcon
                                  className="cursor-pointer text-base"
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
                                  className=" !text-base cursor-pointer text-[blue]"
                                />
                              </Tooltip>}
                            </div>
                          </div>
                          <div class="flex flex-col justify-center w-[3%] max-sm:flex-row max-sm:w-[10%]">
                            <div>
                              <Tooltip title="Suppliers">
                                <CategoryIcon
                                  onClick={() => {
                                    props.handleSuppliersListDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-base cursor-pointer"
                                />
                              </Tooltip>
                            </div>
                            <div>
                              <InventoryIcon className=" !text-base cursor-pointer" />
                            </div>
                          </div>
                          <div class="flex flex-col justify-center w-[3%] max-sm:flex-row max-sm:w-[10%]">
                            <div>
                              <Tooltip title="Edit">
                                <BorderColorIcon
                                  onClick={() => {
                                    handleUpdateSupplieDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-base cursor-pointer text-[tomato]"
                                />
                              </Tooltip>
                            </div>
                            <div>
                              <Popconfirm
                                title="Do you want to delete?"
                                onConfirm={() => props.deletePurchaseData(item.suppliesId)}
                              >

                                <DeleteOutlined className=" !text-base cursor-pointer text-[red]" />
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
