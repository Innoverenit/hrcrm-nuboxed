import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QrGenerate from "../ProductTable/QrGenerate"
import {
  getProducts,
  getProductByGroup,
  getAllProductCatagory,
  setEditProducts,
  handleUpdateProductModal,
  handleHistoryModal,
  handleCatalogueConfigureModal,
  deleteProductData,
  handleCatalogueWipModal,
  handleProductBuilderDrawer,
  handlePriceDrawer
} from "../../ProductAction";
import ProductPublishToggle from "./ProductPublishToggle";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import { Tooltip } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import NodataFoundPage from '../../../../Helpers/ErrorBoundary/NodataFoundPage';
const UpdateProductModal = lazy(() => import("../../Child/UpdateProductModal"));
const PriceDrawer = lazy(() => import("./PriceDrawer"));
const ProductBuilderDrawer = lazy(() => import("./ProductBuilderDrawer"));

function ProductCardList(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    props.getProducts(page);
    setPage(page + 1);
  }, []);

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

  const handleLoadMore = () => {
    const proPag = props.products && props.products.length && props.products[0].pageCount
    setTimeout(() => {
      if (props.products) {
        if (page < proPag) {
          setPage(page + 1);
          props.getProducts(page);
        }
        if (page === proPag) {
          setHasMore(false)
        }
      }
    }, 100);
  };

  const {
    fetchingProducts,
    products,
    handleUpdateProductModal,
    updateProductModal,
    user,
    proBuilderDrawer,
    handleProductBuilderDrawer,
    handlePriceDrawer,
    priceOpenDrawer
  } = props;

  if (isMobile) {
    return (
      <>
        <div className=' flex justify-end sticky top-28 z-auto'>
          <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">

            <InfiniteScroll
              dataLength={products.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={fetchingProducts ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"75vh"}
              endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
            >
              {products.length ?
                <>
                  {products.map((item) => {
                    return (
                      <div>
                        <div
                          className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
                        >
                          <div class="flex justify-between items-center w-wk ">
                            <div className=" flex font-medium flex-col w-[14rem]   max-sm:w-full">
                              <div className="flex max-sm:w-full ">
                                <div>

                                  <SubTitle>
                                    {item.imageId ? (
                                      <MultiAvatar
                                        imageId={item.imageId ? item.imageId : ''}
                                        imgHeight={"1.8em"}
                                        imgWidth={"1.8em"}
                                        imgRadius={20}
                                      />
                                    ) : (
                                      <div class="font-bold text-xs" >
                                        No Image
                                      </div>
                                    )}
                                  </SubTitle>

                                </div>
                                <div class="w-[4%]"></div>

                                <div class="w-full flex items-center">
                                  <Tooltip>
                                    <div class="max-sm:w-full justify-between flex md:flex-col">
                                      <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer w-28">
                                        {item.articleNo}
                                      </div>
                                    </div>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-between items-center w-full ">
                            <div className=" flex font-medium f ">

                              <div class=" text-xs text-cardBody font-poppins">
                                {item.name}

                              </div>
                            </div>
                            <div className=" flex font-medium ">

                              <div class=" text-xs text-cardBody font-poppins">
                                {item.categoryName}
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-between items-center w-wk ">
                            <div className=" flex font-medium flex-col  ">

                              <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                {item.subCategoryName}
                              </div>
                            </div>
                            <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                              {item.attributeName}
                            </div>

                            <div className=" flex font-medium flex-col ">

                              <div class=" text-xs text-cardBody font-poppins">
                                <QrGenerate />
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-between items-center w-wk ">
                            <div className=" flex font-medium   ">


                              <div class=" text-xs text-cardBody font-poppins">
                                <div>
                                  <ProductPublishToggle item={item} />
                                </div>
                              </div>
                            </div>

                            <div className=" flex font-medium  ">

                              <div class=" text-xs text-cardBody font-poppins"></div>
                              <div>
                                <Tooltip title="Add Price">
                                  <EuroIcon
                                    className="!text-base cursor-pointer text-[blue]"
                                    onClick={() => {
                                      props.handlePriceDrawer(true);
                                      handleParticularRowData(item);
                                    }}
                                  />
                                </Tooltip>

                              </div>
                            </div>

                            <div>
                              <Tooltip title="Product Builder">
                                <ViewQuiltIcon
                                  className="!text-base cursor-pointer text-[#4bc076]"
                                  onClick={() => {
                                    props.handleProductBuilderDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div>
                              <Tooltip title="Edit">
                                <BorderColorIcon
                                  className="!text-base cursor-pointer text-[tomato]"
                                  onClick={() => {
                                    props.setEditProducts(item);
                                    handleUpdateProductModal(true);
                                  }}
                                />
                              </Tooltip>
                            </div>

                            <div></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}</>
                : !products.length && !props.fetchingProducts
                  ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>

        <Suspense fallback={"Loading"}>
          <UpdateProductModal
            updateProductModal={updateProductModal}
            handleUpdateProductModal={handleUpdateProductModal}
          />

          <ProductBuilderDrawer
            particularDiscountData={particularDiscountData}
            proBuilderDrawer={proBuilderDrawer}
            handleProductBuilderDrawer={handleProductBuilderDrawer}
          />
          <PriceDrawer
            particularDiscountData={particularDiscountData}
            handlePriceDrawer={handlePriceDrawer}
            priceOpenDrawer={priceOpenDrawer}
          />
        </Suspense>

      </>
    );
  }
  return (
    <>

      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className=" md:w-[7%]">Article #</div>
            <div className=" md:w-[6.1rem]">Name</div>
            <div className=" md:w-[4.2rem] ">Category</div>
            <div className="md:w-[5.8rem]">Sub</div>
            <div className="md:w-[8.5rem]">Attribute</div>
            <div className="md:w-[5.2rem]">Website</div>
            <div className="w-12"></div>
          </div>
          <InfiniteScroll
            dataLength={products.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingProducts ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"75vh"}
            endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          >
            {products.map((item) => {
              return (
                <div>
                  <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                    <div class="flex">
                      <div className=" flex font-medium flex-col md:w-[5.1rem] max-sm:w-full  ">
                        <SubTitle>
                          {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8em"}
                              imgWidth={"1.8em"}
                              imgRadius={20}
                            />
                          ) : (
                            <div class="font-bold text-xs" >
                              No Image
                            </div>
                          )}
                        </SubTitle>
                      </div>
                      <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
                        <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                          {item.articleNo}
                        </div>
                      </div>

                      <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        <div class=" text-xs text-cardBody font-poppins">
                          {item.name}
                        </div>

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

                    <div class="flex md:items-center">

                      <div className=" flex font-medium flex-col  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                        <QrGenerate />
                      </div>
                      <div className=" flex font-medium flex-col  md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        <ProductPublishToggle item={item} />

                      </div>

                    </div>
                    <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
                      <div>
                        <Tooltip title="Add Price">
                          <EuroIcon
                            className="!text-base cursor-pointer text-[blue]"
                            onClick={() => {
                              props.handlePriceDrawer(true);
                              handleParticularRowData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                      <div>
                        <Tooltip title="Product Builder">
                          <ViewQuiltIcon
                            className="!text-base cursor-pointer text-[#4bc076]"
                            onClick={() => {
                              props.handleProductBuilderDrawer(true);
                              handleParticularRowData(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Edit">
                          <BorderColorIcon
                            className="!text-base cursor-pointer text-[tomato]"
                            onClick={() => {
                              props.setEditProducts(item);
                              handleUpdateProductModal(true);
                            }}
                          />
                        </Tooltip>
                      </div>


                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
      <Suspense fallback={"Loading"}>
        <UpdateProductModal
          updateProductModal={updateProductModal}
          handleUpdateProductModal={handleUpdateProductModal}
        />

        <ProductBuilderDrawer
          particularDiscountData={particularDiscountData}
          proBuilderDrawer={proBuilderDrawer}
          handleProductBuilderDrawer={handleProductBuilderDrawer}
        />
        <PriceDrawer
          particularDiscountData={particularDiscountData}
          handlePriceDrawer={handlePriceDrawer}
          priceOpenDrawer={priceOpenDrawer}
        />
      </Suspense>
    </>
  );
}


const mapStateToProps = ({ product, auth, supplies }) => ({
  productByGroup: product.productByGroup,
  fetchingProductByGroup: product.fetchingProductByGroup,
  groupId: auth.userDetails.groupId,
  fetchingProducts: product.fetchingProducts,
  fetchingAllProducts: product.fetchingAllProducts,
  fetchingAllProductsError: product.fetchingAllProductsError,
  products: product.products,
  allproducts: product.allproducts,
  updateProductModal: product.updateProductModal,
  // addDiscountModal: product.addDiscountModal,
  // addProductOfferModal: product.addProductOfferModal,
  addHistoryModal: product.addHistoryModal,
  addCatalogueConfigureModal: product.addCatalogueConfigureModal,
  addCatalogueWipModal: product.addCatalogueWipModal,
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  addCurrencyValue: supplies.addCurrencyValue,
  proBuilderDrawer: product.proBuilderDrawer,
  priceOpenDrawer: product.priceOpenDrawer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProductByGroup,
      setEditProducts,
      handleUpdateProductModal,
      handleHistoryModal,
      deleteProductData,
      handleCatalogueConfigureModal,
      getAllProductCatagory,
      handleCatalogueWipModal,
      getProducts,
      handleProductBuilderDrawer,
      handlePriceDrawer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCardList);
