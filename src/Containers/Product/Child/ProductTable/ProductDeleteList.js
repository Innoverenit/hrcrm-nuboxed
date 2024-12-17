import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ContactsIcon from '@mui/icons-material/Contacts';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import ExploreIcon from "@mui/icons-material/Explore";
import {
    getdeleteProducts,
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
} from "../../ProductAction";
import ProductPublishToggle from "./ProductPublishToggle";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import { Tooltip } from "antd";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import ReInstateProductToggle from "./ReInstateProductToggle";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateProductModal = lazy(() => import("../../Child/UpdateProductModal"));
const PriceDrawer = lazy(() => import("./PriceDrawer"));
const ProductBuilderDrawer = lazy(() => import("./ProductBuilderDrawer"));

function ProductDeleteList(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
          "732",//0 Article #
            "110",//1 Name
            "14",//2  Category
            "259",//3 Attribute
            "264",//4Brand
            "265",//5 Model
            "700",//6Website
            "1069"//7Reinstate

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  
  useEffect(() => {
    props.getdeleteProducts();
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
  const {
    fetchingProducts,
    products,
    handleUpdateProductModal,
    updateProductModal,
    user,
    proBuilderDrawer,
    fetchingdeleteProducts,
    handleProductBuilderDrawer,
    handlePriceDrawer,
    priceOpenDrawer,
    deleteCatalogData,
    deleteproducts
  } = props;
 if (fetchingdeleteProducts) {
    return <BundleLoader />;
  }
  return (
    <>

      <div className=' flex sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between max-sm:hidden w-[97%]  p-1 bg-transparent font-bold font-poppins !text-lm  max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-end sticky  z-10">  
          <div className="w-[7.3rem]"></div>        
          <div className=" w-[10rem] truncate text-[#00A2E8] text-sm max-xl:w-[6.5rem] max-lg:w-[6.7rem]">
          <NewspaperIcon className='!text-base mr-1  text-[#00A2E8]'/>
            {translatedMenuItems[0]} {/* Article # */}
              </div>
            <div className=" w-[16.9rem] truncate  max-xl:w-[5.11rem] max-lg:w-[7.11rem]">
            <ContactsIcon className="!text-icon mr-1 text-[#44ea44] "/>  {translatedMenuItems[1]}  {/* Name */}
              </div>
            <div className=" w-[12.21rem] truncate  max-xl:w-[2.21rem] max-lg:w-[3.21rem] ">
            <FormatListNumberedIcon className='!text-icon  mr-1   text-[#6a49ec]' />  {translatedMenuItems[2]}
            {/* Category */}
              </div>
            <div className=" w-[12.8rem] truncate  max-xl:w-[11.51rem]">
            <AttractionsIcon className="  !text-icon text-[#c23150]" />   {translatedMenuItems[3]} {/* Attribute */}
              </div>
            <div className=" w-[11.7rem] truncate  max-xl:w-[5.51rem]">
            <BrandingWatermarkIcon className="!text-icon  mr-1 text-[#f33b3b]" />{translatedMenuItems[4]}{/* Brand */}
              </div>
            <div className=" w-[10.51rem] truncate  max-xl:w-[4.51rem]">
            <ModelTrainingIcon className=" !text-icon text-[#942cbd]" /> {translatedMenuItems[5]} {/* Model */}
            
            </div>
            <div className=" w-[9.22rem] truncate  max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
            <ExploreIcon className=" !text-icon cursor-pointer text-[#272d27]"/>{translatedMenuItems[6]}  {/* Website */}
              </div>
            <div className=" w-[8.23rem] truncate  max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
            {translatedMenuItems[7]} {/* Reinstate */}
              </div>
            
          </div>
            {props.deleteproducts.map((item) => {
              return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white items-center py-ygap max-sm:h-[9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]    md:flex row-auto    max-sm:border-b-4 max-sm:border-blue-500 ">
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex w-[5.5rem] items-center max-sm:w-auto  h-8  border-l-2 border-green-500 bg-[#eef2f9] ">
                        <div>
                          {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8rem"}
                              imgWidth={"1.8rem"}
                            
                            />
                          ) : (
                            <div class="font-bold ml-gap text-[0.6rem]" >
                              No Image
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" flex w-[8.1rem]  h-8 items-center ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
                        <div class="text-xs ml-gap  font-semibold max-sm:text-sm  font-poppins cursor-pointer ">
                          {item.articleNo}
                        </div>
                      </div>

                      <div className=" flex w-[14.1rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <div class=" text-xs  max-sm:text-sm font-poppins ">
                          {item.name}
                        </div>

                      </div>

                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex w-[10.1rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs ml-gap max-sm:text-sm font-poppins ">

                        {item.categoryName} {item.subCategoryName}
                      </div>
                    </div>
                   

                    <div className=" flex w-[10.5rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                      <div class=" text-xs ml-gap  max-sm:text-sm   font-poppins ">
                        {item.attributeName}{item.subAttributeName}
                      </div>
                    </div>
</div>
<div class="flex max-sm:justify-between max-sm:w-wk items-center">
<div className=" flex w-[9.51rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs ml-gap max-sm:text-sm font-poppins ">

                        {item.brand}
                      </div>
                    </div>
                    <div className=" flex w-[8.8rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs ml-gap max-sm:text-sm font-poppins ">

                        {item.model}
                      </div>
                    </div>
</div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex w-[6.9rem] items-center  justify-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <ProductPublishToggle item={item} />
                      </div>
                      <div className=" flex w-[6.7rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
<ReInstateProductToggle item={item} />
</div>
<div className=" flex  w-[3.2rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
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
                            className="!text-icon cursor-pointer text-[#28a355]"
                            onClick={() => {
                              props.handleProductBuilderDrawer(true);
                              handleParticularRowData(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                    <div className=" flexw-[1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title={item.description}>
                        <ContactSupportIcon
                         className="!text-icon cursor-pointer "
                        />
                        </Tooltip>
                      </div>
                    </div>
                    </div>  
                    </div>                
                  </div>
                </div>
              );
            })}
          {/* </InfiniteScroll> */}
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
    deleteproducts:product.deleteproducts,
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
  fetchingdeleteProducts:product.fetchingdeleteProducts,
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
      getdeleteProducts,
      handleProductBuilderDrawer,
      handlePriceDrawer,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDeleteList);
