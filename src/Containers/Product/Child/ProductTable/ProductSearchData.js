import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QrCodeIcon from '@mui/icons-material/QrCode';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContactsIcon from '@mui/icons-material/Contacts';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import ExploreIcon from "@mui/icons-material/Explore";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import PixIcon from '@mui/icons-material/Pix';

// import ConstructionIcon from"@mui/icons-material/ConstructionIcon";

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
  handleProductQuality,
  updateDateYearProduct
} from "../../ProductAction";
import Token from '@mui/icons-material/Token';
import ProductPublishToggle from "./ProductPublishToggle";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NewspaperIcon from '@mui/icons-material/Newspaper'
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import {  Tooltip,Button,Input } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import FeatureProductToggle from "./FeatureProductToggle";
import WarrentyProductToggle from "./WarrentyProductToggle";
import EmptyPage from "../../../Main/EmptyPage";
import MaterialBarCodeInput from "../../../Main/Supplies/MaterialBarCodeInput";
const UpdateProductModal = lazy(() => import("../../Child/UpdateProductModal"));
const PriceDrawer = lazy(() => import("./PriceDrawer"));
const ProductBuilderDrawer = lazy(() => import("./ProductBuilderDrawer"));
const ProductCellDrawer=lazy(()=>import("./ProductCellDrawer"));
const ProductDetailsDrawer=lazy(()=>import("./ProductDetailsDrawer"));
const ProductQualityDrawer=lazy(()=>import("../ProductTable/ProductQualityDrawer"));



function ProductSearchData(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const componentRefs = useRef([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [barCodeOpen,setbarCodeOpen]= useState(false);
  const [data, setData] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
            "264",//5Brand
            "265",//5 Model
            "700",//6Website
            "1203", //7 Feature
            "1204",//8 Warranty
              "1371",//9 year
              "654",//Quality10
              "742",//Add Price11
              "743",//Product Builder12
              "744",//Cell13
              "170",//Edit14
              "1078", // Save15
              "1079",// Cancel16
             "1259", // Do you want to delete?"17
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

  const handlePrint = () => {
    window.print();
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
useEffect(() => {
    setData(props.products.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.products]);

  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  const handleLoadMore = () => {

    // setPage(page + 1);
    // props.getProducts(page);
    const proPag = data && data.length && data[0].pageCount
    setTimeout(() => {
      if (data) {
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
    deleteCatalogData,
    categorySearch,
    fetchingCatalogueCatSrch
  } = props;

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };
  const handleEditClick = (productId) => {
    setEditsuppliesId(productId);
  };
  const handleCancelClick = (productId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [productId]: undefined }));
    setEditsuppliesId(null);
  };
  const handleSave = (key) => {
    console.log(key)
  
      const result = {
        year: key.year,
        productId:key.productId,  
            };
      props.updateDateYearProduct(result,key.productId)
      setEditsuppliesId(null);
  };

  return (
    <>

      <div className=' flex sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex font-poppins text-xs justify-between w-[91%] max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm   p-1 bg-transparent font-bold sticky items-end z-10 max-sm:hidden">  
          <div className="w-[5.01rem]"></div>        
            <div className=" w-[4.5rem] truncate max-md:w-[4.5rem] text-sm text-[#00A2E8]   max-xl:w-[6.5rem] max-lg:w-[6.7rem]">
            <NewspaperIcon className='!text-base mr-1  text-[#00A2E8]'/>
             {translatedMenuItems[0]} {/* Article # */}
              </div>
              
            <div className=" w-[13.9rem]  truncate max-md:w-[14.71rem]   max-xl:w-[5.11rem] max-lg:w-[7.11rem]">
            <ContactsIcon className="!text-icon mr-1 text-[#3af64a]"/>
            {translatedMenuItems[1]}  {/* Name */}
              </div>
            <div className=" w-[6.21rem] truncate max-md:w-[6.21rem]   max-xl:w-[2.21rem] max-lg:w-[3.21rem] ">
            <FormatListNumberedIcon className='!text-icon  mr-1   text-[#42858c]' />
            {translatedMenuItems[2]}
            {/* Category */}
              </div>
            <div className=" w-[8.5rem] truncate max-md:w-[8.5rem]   max-xl:w-[11.51rem]">           
            <AttractionsIcon className="  !text-icon text-[#8e71ed]" />   {translatedMenuItems[3]} {/* Attribute */}
              </div>
            <div className=" w-[9rem] truncate max-md:w-[10rem]   max-xl:w-[5.51rem]">
            <BrandingWatermarkIcon className="!text-icon text-[#0f3337]  mr-1" />
            {translatedMenuItems[4]}{/* Brand */}
              </div>
            <div className=" w-[6.51rem] truncate max-md:w-[6.51rem]   max-xl:w-[4.51rem]">
            <ModelTrainingIcon className=" !text-icon text-[#e862cf]" />
            {translatedMenuItems[5]} {/* Model */}
            
            </div>
            <div className=" w-[6.24rem] truncate max-md:w-[6.24rem]   max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
            <ExploreIcon className=" !text-icon cursor-pointer text-[green]"/>
            {translatedMenuItems[6]}  {/* Website */}
              </div>
              <div className=" w-[4.9rem] truncate max-md:w-[4.9rem]   max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
              {/* Feature */}
               <  PixIcon  className=" !text-icon text-[#124348]" />   {translatedMenuItems[7]}  
              </div>
              <div className=" w-[4.8rem] truncate max-md:w-[4.8rem]   max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
              < AddModeratorIcon className=" !text-icon text-[#e53838]" />   {translatedMenuItems[8]}  
            {/* Warranty */}
              </div>
              <div className=" w-[4.2rem] truncate max-md:w-[4.2rem]   max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
              < WatchLaterIcon className=" !text-icon text-[#381b72]" />   {translatedMenuItems[9]}  
            {/* Year */}
              </div>
            {/* <div className="w-[7rem]"></div> */}
          </div>
          {/* <InfiniteScroll
            dataLength={data.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingProducts ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"85vh"}
            style={{scrollbarWidth:"thin"}}
            endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          > */}
             {categorySearch.length ?
              <>
                {categorySearch.map((item,index) => {
               return (
                <div>
                  <div key={item.productId} className="flex rounded justify-between mt-1  bg-white  items-center py-ygap max-sm:h-[9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                      <div className=" flex w-[4.5rem] items-center max-sm:w-auto h-8  border-l-2 border-green-500 bg-[#eef2f9] ">
                       <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">
                          {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8rem"}
                              imgWidth={"1.8rem"}
                             
                            />
                          ) : (
                            <div class="font-bold ml-gap text-[0.65rem]" >
                              No Image
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" flex w-[4.5rem] h-8 items-center ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
                        <div class="text-xs  text-blue-600  ml-gap  max-sm:text-sm  font-poppins cursor-pointer  "
                        onClick={() => {
                          openModal();
                          handleParticularRowData(item);
                        }}
                        >
                          {item.articleNo}
                        </div>
                      </div>

                      <div className=" flex  w-[14.5rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <div class=" text-xs  ml-gap text-blue-600 cursor-pointer max-sm:text-sm font-poppins  "
                        onClick={() => {
                          openModal();
                          handleParticularRowData(item);
                        }}>
                          {`${item.productFullName ? `${item.productFullName}`:`${item.name}`}`}
                        </div>

                      </div>

                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex w-[6.1rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs  ml-gap  max-sm:text-sm font-poppins ">

                        {item.categoryName}  {item.subCategoryName}
                      </div>
                    </div>
                   

                    <div className=" flex w-[8.5rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                      <div class=" text-xs   ml-gap max-sm:text-sm   font-poppins  ">
                        {item.attributeName}  {item.subAttributeName}
                      </div>
                    </div>
</div>
    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
    <div className=" flex w-[9.51rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs  ml-gap max-sm:text-sm font-poppins  ">

                        {item.brand}
                      </div>
                    </div>
                    <div className=" flex w-[6.8rem] h-8 ml-gap items-center bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs  ml-gap max-sm:text-sm font-poppins  ">

                        {item.model}
                      </div>
                    </div>
</div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                     <div className=" flex  w-[5.96rem] h-8 ml-gap items-center justify-center bg-[#eef2f9] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <ProductPublishToggle item={item} />

                      </div>
                      <div className=" flex  w-[4.7rem] h-8 ml-gap items-center justify-center bg-[#eef2f9] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                  
                     <FeatureProductToggle item={item}    featureInd={item.featureInd}  productId={item.productId}/>

                    </div>
                    <div className=" flex  w-[4.8rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<WarrentyProductToggle item={item}    warrantyInd={item.warrantyInd}  productId={item.productId}/>

</div>
<QrCodeIcon className="!text-icon cursor-pointer"
                          onClick={() => {
                            setbarCodeOpen(true);
                            handleParticularRowData(item);
                          }}
                          />
<div className=" flex  w-[3.9rem] items-center max-xl:w-[6.9rem] h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
{item.warrantyInd ? 
<> 
{editsuppliesId === item.productId ? (
                       <Input
                       style={{ width: "3rem" }}
                       value={item.year}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'year')}
                     />
                       
                    ) : (
                      <div className="  text-xs  font-poppins">
                        <div> {item.year}</div>
                      </div>
                    )}
<div className=" flex   items-center md:w-[2rem]  h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
    {editsuppliesId === item.productId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleSave(item)}>
                     {translatedMenuItems[15]}     {/* Save */}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.productId)} className="ml-[0.5rem]">
                     {translatedMenuItems[16]}     {/* Cancel */}
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle={translatedMenuItems[14]}  
                        iconType="edit"
                        onClick={() => handleEditClick(item.productId)}
                      />
                    )}
    </div> 
  </>
    :null}  
</div>

<div className="flex h-8 ml-gap bg-[#eef2f9] items-center">


                      <div>
                        <Tooltip title={translatedMenuItems[10]}  >
                          <VerifiedUserIcon
                            className="!text-icon cursor-pointer text-[blue]"
                            onClick={() => {
                              props.handleProductQuality(true);
                              handleParticularRowData(item);
                            }}
                          />
                        </Tooltip>
                      </div>
    
                      <div>
                        <Tooltip title={translatedMenuItems[11]}  >
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
                        <Tooltip title={translatedMenuItems[12]}  >
                          <ViewQuiltIcon
                            className="!text-icon cursor-pointer text-[#28a355]"
                            onClick={() => {
                              props.handleProductBuilderDrawer(true);
                              handleParticularRowData(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                 
                   
                      {/* <div class=" text-xs  font-poppins">
                        <Tooltip title={item.description}>
                        <ContactSupportIcon className="!text-icon"
                        onClick={() => {
                          openModal();
                          handleParticularRowData(item);
                        }}
                        />
                        </Tooltip>
                      </div> */}
<div>
<Tooltip title={translatedMenuItems[13]}  >
                                                            <Token 
                                                            className=" !text-icon cursor-pointer text-[blue]"
                                                            onClick={()=>{
                                                              handleParticularRowData(item);
                                                                props.handleProdCellDrawer(true);
                                                            }}
                                                            />
                                                          </Tooltip>
</div>
 
                      <div class=" text-xs  font-poppins mt-1">
                        <Tooltip title={translatedMenuItems[14]}  >
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
                            title={translatedMenuItems[17]}  
                            onConfirm={() => handleDelete(item)}
                            >
                           <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                         
                          </StyledPopconfirm>
                        </div>

                        </div>
                   
                    
                
                    </div>
                   
                  </div>
                </div>
             )
            })}
             </>
              : !categorySearch.length && !fetchingCatalogueCatSrch ? <EmptyPage/> : null}
          {/* </InfiniteScroll> */}
        </div>
      </div>
      <Suspense fallback={"Loading"}>
        <UpdateProductModal
          updateProductModal={updateProductModal}
          handleUpdateProductModal={handleUpdateProductModal}
           translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />

        <ProductBuilderDrawer
          particularDiscountData={particularDiscountData}
          proBuilderDrawer={proBuilderDrawer}
          handleProductBuilderDrawer={handleProductBuilderDrawer}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <MaterialBarCodeInput
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData}
          barCodeOpen={barCodeOpen}
          setbarCodeOpen={setbarCodeOpen}
        />
        <PriceDrawer
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData}
          handlePriceDrawer={handlePriceDrawer}
          priceOpenDrawer={priceOpenDrawer}
        />
        <ProductCellDrawer
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
         particularDiscountData={particularDiscountData}
        clickProdclDrwr={props.clickProdclDrwr}
        handleProdCellDrawer={props.handleProdCellDrawer}
        />

<ProductQualityDrawer
  translateText={props.translateText}
  selectedLanguage={props.selectedLanguage}
         particularDiscountData={particularDiscountData}
         productQualityDrawer={props.productQualityDrawer}
         handleProductQuality={props.handleProductQuality}
        />
        <ProductDetailsDrawer
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        particularDiscountData={particularDiscountData}
        modalVisible={modalVisible}
        closeModal={closeModal}
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
  productQualityDrawer:product.productQualityDrawer,
  clickProdclDrwr:product.clickProdclDrwr,

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
      handleProdCellDrawer,
      handleProductQuality,
      updateDateYearProduct
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearchData);
