import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    handleCategoryModal,
    getCategory
} from "../../ProductAction";
import ProductPublishToggle from "./ProductPublishToggle";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import { Button, Tooltip } from "antd";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfiniteScroll from "react-infinite-scroll-component";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import NodataFoundPage from '../../../../Helpers/ErrorBoundary/NodataFoundPage';
const CategoryProductModal = lazy(() => import("../CategoryProductModal"));


function ProductCategory(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    props.getCategory()
  }, []);



  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

 

  const {
    fetchingProducts,
    products,
    handleCategoryModal,
    categoryProductModal,
    user,
    proBuilderDrawer,
    handleProductBuilderDrawer,
    handlePriceDrawer,
    priceOpenDrawer,
    categoryProducts
  } = props;

  return (
    <>

      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 h-[85vh] max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between max-sm:hidden w-[99%] p-1 bg-transparent font-bold sticky  z-10">          
            <div className=" w-[6.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.5rem] max-lg:w-[6.7rem]">Category</div>
            <div className=" w-[4.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.11rem] max-lg:w-[4.11rem]"></div>
            <div className=" flex font-medium flex-col w-[1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Add">
                          <AddCircleIcon
                            className="!text-icon cursor-pointer text-[tomato]"
                            onClick={() => {
                              //props.setEditProducts(item);
                              handleCategoryModal(true);
                            }}
                          />
                        </Tooltip>
                      </div>


                    </div>
          </div>
          
            {categoryProducts.map((item) => {
              return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow-2xl  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    

                      <div className=" flex font-medium flex-col  w-[7.1rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <div class=" text-xs text-cardBody max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.categoryName}
                        </div>

                      </div>
      
                    </div>
                    <div className=" flex font-medium flex-col  w-[7.21rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<div class=" text-xs text-cardBody max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

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
                      
</div>

</div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                     
                     
                    
                    {/* <div className=" flex font-medium flex-col w-[1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Add">
                          <AddCircleIcon
                            className="!text-base cursor-pointer text-[tomato]"
                            onClick={() => {
                              //props.setEditProducts(item);
                              handleCategoryModal(true);
                            }}
                          />
                        </Tooltip>
                      </div>


                    </div> */}
                    </div>
                   
                  </div>
                </div>
               );
            })} 
          
        </div>
      </div>
      <Suspense fallback={"Loading"}>
      <CategoryProductModal
          categoryProductModal={categoryProductModal}
          handleCategoryModal={handleCategoryModal}
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
  categoryProductModal: product.categoryProductModal,
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
  categoryProducts:product.categoryProducts
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleCategoryModal,
        getCategory
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCategory);
