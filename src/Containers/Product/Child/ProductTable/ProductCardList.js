import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import QrGenerate from "../ProductTable/QrGenerate"
import {
  getProducts,
  getProductByGroup,
  getAllProductCatagory,
  setEditProducts,
  handleUpdateProductModal,
  handleHistoryModal,
  handleCatalogueConfigureModal,
  deleteCatalogData,
  handleCatalogueWipModal,
  handleProductBuilderDrawer,
  handlePriceDrawer,
  handleProdCellDrawer,
} from "../../ProductAction";
import Token from '@mui/icons-material/Token';
import ProductPublishToggle from "./ProductPublishToggle";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import {  Tooltip } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import NodataFoundPage from '../../../../Helpers/ErrorBoundary/NodataFoundPage';
const UpdateProductModal = lazy(() => import("../../Child/UpdateProductModal"));
const PriceDrawer = lazy(() => import("./PriceDrawer"));
const ProductBuilderDrawer = lazy(() => import("./ProductBuilderDrawer"));
const ProductCellDrawer=lazy(()=>import("./ProductCellDrawer"));

function ProductCardList(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    props.getProducts(page);
    setPage(page + 1);
  }, []);

  const handleDelete = (item) => {
    let data = {
    active:false,
      reason: "",
      productId:item.productId,
    };
     props.deleteCatalogData(data,item.productId);
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

  const handleLoadMore = () => {

    // setPage(page + 1);
    // props.getProducts(page);
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
    priceOpenDrawer,
    deleteCatalogData
  } = props;

  return (
    <>

      <div className=' flex sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between max-sm:hidden w-[99%] p-1 bg-transparent font-bold sticky  z-10">  
          <div className="w-[7.01rem]"></div>        
            <div className=" w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.5rem] max-lg:w-[6.7rem]">Article #</div>
            <div className=" w-[13.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.11rem] max-lg:w-[7.11rem]">Name</div>
            <div className=" w-[9.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[2.21rem] max-lg:w-[3.21rem] ">Category</div>
            <div className="w-[9.511rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem]">Attribute</div>
            <div className="w-[8.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.51rem]">Brand</div>
            <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.51rem]">Model</div>
            <div className="w-[12.22rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[1.22rem] max-lg:w-[3.22rem]">Website</div>
            <div className="w-[7rem]"></div>
          </div>
          <InfiniteScroll
            dataLength={products.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingProducts ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"85vh"}
            endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          >
             {products.length ?
              <>
                {products.map((item) => {
               return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow-2xl  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium flex-col w-[6.5rem] max-sm:w-auto   ">
                        <SubTitle>
                          {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"2.8rem"}
                              imgWidth={"2.8rem"}
                              imgRadius={20}
                            />
                          ) : (
                            <div class="font-bold text-xs" >
                              No Image
                            </div>
                          )}
                        </SubTitle>
                      </div>
                      <div className=" flex font-medium flex-col w-[5.3rem] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
                        <div class="text-xs text-cardBody  max-sm:text-sm  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.articleNo}
                        </div>
                      </div>

                      <div className=" flex font-medium flex-col  w-[11.5rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <div class=" text-xs text-cardBody max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.name}
                        </div>

                      </div>

                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium flex-col w-[8.1rem] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs text-cardBody max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                        {item.categoryName}  {item.subCategoryName}
                      </div>
                    </div>
                   

                    <div className=" flex font-medium flex-col w-[8.5rem] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                      <div class=" text-xs text-cardBody max-sm:text-sm   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {item.attributeName}  {item.subAttributeName}
                      </div>
                    </div>
</div>
<div class="flex max-sm:justify-between max-sm:w-wk items-center">
<div className=" flex font-medium flex-col w-[8.51rem] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs text-cardBody max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                        {item.brand}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col w-[10.8rem] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs text-cardBody max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                        {item.model}
                      </div>
                    </div>
</div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                      {/* <div className=" flex font-medium flex-col  w-[7.2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                      
                        <Button type="primary" >
                                <div class="max-sm:text-sm"> Print QR Code</div>
                                </Button>
                      </div> */}
                      <div className=" flex font-medium flex-col  w-[10.9rem] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <ProductPublishToggle item={item} />

                      </div>
    
                      <div>
                        <Tooltip title="Add Price">
                          <EuroIcon
                            className="!text-icon cursor-pointer text-[blue]"
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
                            className="!text-icon cursor-pointer text-[#4bc076]"
                            onClick={() => {
                              props.handleProductBuilderDrawer(true);
                              handleParticularRowData(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                 
                   
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title={item.description}>
                        <ContactSupportIcon className="!text-icon"/>
                        </Tooltip>
                      </div>
<div>
<Tooltip title="Cell">
                                                            <Token 
                                                            className=" !text-icon cursor-pointer text-[blue]"
                                                            onClick={()=>{
                                                              handleParticularRowData(item);
                                                                props.handleProdCellDrawer(true);
                                                            }}
                                                            />
                                                          </Tooltip>
</div>

                    
              
                      <div class=" text-xs text-cardBody font-poppins mt-1">
                        <Tooltip title="Edit">
                          <BorderColorIcon
                            className="!text-icon cursor-pointer text-[tomato]"
                            onClick={() => {
                              props.setEditProducts(item);
                              handleUpdateProductModal(true);
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div className="mt-1">
                          <StyledPopconfirm
                            title="Do you want to delete?"
                            onConfirm={() => handleDelete(item)}

                          >
                            
                            <DeleteOutlined
                              type="delete"
                              className=" !text-icon cursor-pointer text-[red]"
                            />
                         
                          </StyledPopconfirm>
                        </div>

                   
                    
                
                    </div>
                   
                  </div>
                </div>
             )
            })}
             </>
              : !products.length && !fetchingProducts ? <NodataFoundPage /> : null}
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
        <ProductCellDrawer
         particularDiscountData={particularDiscountData}
        clickProdclDrwr={props.clickProdclDrwr}
        handleProdCellDrawer={props.handleProdCellDrawer}
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
  orgId: auth.userDetails.organizationId,
  addCatalogueConfigureModal: product.addCatalogueConfigureModal,
  addCatalogueWipModal: product.addCatalogueWipModal,
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  addCurrencyValue: supplies.addCurrencyValue,
  proBuilderDrawer: product.proBuilderDrawer,
  priceOpenDrawer: product.priceOpenDrawer,
  clickProdclDrwr:product.clickProdclDrwr
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProductByGroup,
      setEditProducts,
      handleUpdateProductModal,
      handleHistoryModal,
      deleteCatalogData,
      handleCatalogueConfigureModal,
      getAllProductCatagory,
      handleCatalogueWipModal,
      getProducts,
      handleProductBuilderDrawer,
      handlePriceDrawer,
      handleProdCellDrawer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCardList);
