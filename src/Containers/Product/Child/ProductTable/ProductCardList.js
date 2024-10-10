import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { DeleteOutlined } from "@ant-design/icons";
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
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import {  Tooltip,Button,Input } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import FeatureProductToggle from "./FeatureProductToggle";
import NodataFoundPage from '../../../../Helpers/ErrorBoundary/NodataFoundPage';
import WarrentyProductToggle from "./WarrentyProductToggle";
const UpdateProductModal = lazy(() => import("../../Child/UpdateProductModal"));
const PriceDrawer = lazy(() => import("./PriceDrawer"));
const ProductBuilderDrawer = lazy(() => import("./ProductBuilderDrawer"));
const ProductCellDrawer=lazy(()=>import("./ProductCellDrawer"));
const ProductDetailsDrawer=lazy(()=>import("./ProductDetailsDrawer"));
const ProductQualityDrawer=lazy(()=>import("../ProductTable/ProductQualityDrawer"));

function ProductCardList(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const componentRefs = useRef([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
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
            "1203",//7 Feature
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
    deleteCatalogData
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
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between max-sm:hidden w-[90%]  p-1 bg-transparent font-bold font-poppins text-xs sticky  z-10">  
          <div className="w-[3.51rem]"></div>        
            <div className=" w-[4.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.5rem] max-lg:w-[6.7rem]">
            {translatedMenuItems[0]} {/* Article # */}
              </div>
            <div className=" w-[11.71rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.11rem] max-lg:w-[7.11rem]">
            {translatedMenuItems[1]}  {/* Name */}
              </div>
            <div className=" w-[4.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[2.21rem] max-lg:w-[3.21rem] ">
            {translatedMenuItems[2]}
            {/* Category */}
              </div>
            <div className=" w-[5.511rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem]">
            {translatedMenuItems[3]} {/* Attribute */}
              </div>
            <div className=" w-[7.151rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.51rem]">
            {translatedMenuItems[4]}{/* Brand */}
              </div>
            <div className=" w-[8.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.51rem]">
            {translatedMenuItems[5]} {/* Model */}
            
            </div>
            <div className=" w-[3.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
            {translatedMenuItems[6]}  {/* Website */}
              </div>
              <div className=" w-[2.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
            {translatedMenuItems[7]}  
              </div>
              <div className=" w-[3.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
            {translatedMenuItems[8]}  
              </div>
              <div className=" w-[3.20rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[1.22rem] max-lg:w-[3.22rem]">
            {translatedMenuItems[9]}  
              </div>
            {/* <div className="w-[7rem]"></div> */}
          </div>
          <InfiniteScroll
            dataLength={data.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingProducts ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"85vh"}
            style={{scrollbarWidth:"thin"}}
            endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          >
             {data.length ?
              <>
                {data.map((item,index) => {
               return (
                <div>
                  <div key={item.productId} className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                      <div className=" flex w-[4.5rem] max-sm:w-auto   ">
                        <SubTitle>
                          {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8rem"}
                              imgWidth={"1.8rem"}
                             
                            />
                          ) : (
                            <div class="font-bold text-[0.65rem]" >
                              No Image
                            </div>
                          )}
                        </SubTitle>
                      </div>
                      <div className=" flex w-[4.5rem] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
                        <div class="text-xs  text-blue-600   max-sm:text-sm  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem]"
                        onClick={() => {
                          openModal();
                          handleParticularRowData(item);
                        }}
                        >
                          {item.articleNo}
                        </div>
                      </div>

                      <div className=" flex  w-[14.5rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <div class=" text-xs text-blue-600 cursor-pointer max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]"
                        onClick={() => {
                          openModal();
                          handleParticularRowData(item);
                        }}>
                          {`${item.productFullName ? `${item.productFullName}`:`${item.name}`}`}
                        </div>

                      </div>

                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex w-[6.1rem] max-xl:w-[7.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                        {item.categoryName}  {item.subCategoryName}
                      </div>
                    </div>
                   

                    <div className=" flex w-[6.5rem] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                      <div class=" text-xs  max-sm:text-sm   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {item.attributeName}  {item.subAttributeName}
                      </div>
                    </div>
</div>
    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
    <div className=" flex w-[9.51rem] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                        {item.brand}
                      </div>
                    </div>
                    <div className=" flex w-[8.8rem] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                        {item.model}
                      </div>
                    </div>
</div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                     <div className=" flex  w-[5.96rem] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <ProductPublishToggle item={item} />

                      </div>
                      <div className=" flex  w-[3.7rem] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                     <FeatureProductToggle item={item}    featureInd={item.featureInd}  productId={item.productId}/>

                    </div>
                    <div className=" flex  w-[3.8rem] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<WarrentyProductToggle item={item}    warrantyInd={item.warrantyInd}  productId={item.productId}/>

</div>
<div className=" flex  w-[3.9rem] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
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
<div className=" flex    md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
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
)(ProductCardList);
