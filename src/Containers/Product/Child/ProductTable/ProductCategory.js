import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    handleCategoryModal,
    getCategory
} from "../../ProductAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Button, Input,Popconfirm } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { base_url, base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import EditUpload from "../../../../Components/Forms/Edit/EditUpload";
import Tooltip from '@mui/material/Tooltip';
import styled from "styled-components";
import dayjs from "dayjs"; 
import Carousel from "react-elastic-carousel";

const ProductCategoryPUnblishToggle = lazy(() => import("./ProductCategoryPUnblishToggle"));
const ProductAddQualityCheckModal = lazy(() => import("./ProductAddQualityCheckModal"));
const CategoryProductModal = lazy(() => import("../CategoryProductModal"));

function ProductCategory(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null)
  const [open,setOpen]= useState(false)


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
            "14",//0 Category
      
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
    props.getCategory()
  }, []);

 useEffect(() => {
        setData(props.categoryProducts);
    }, [props.categoryProducts]);

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

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((item) =>
        item.categoryId === key ? { ...item, [dataIndex]: value } : item
    );
    setData(updatedData);
};
const [newimageId, setnewimageId] = useState("");
function handleSetImage(imageId) {
  setnewimageId(imageId);
}

const handleEditClick = (categoryId) => {
    setEditsuppliesId(categoryId);
  };
  const handleCancelClick = (categoryId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [categoryId]: undefined }));
    setEditsuppliesId(null);
  };

  const handleSave = async (item) => {
    console.log(item)
    const updatedItem = {
        categoryId:item.categoryId,
        // orderId:props.particularRowData.orderId,
        categoryName: item.categoryName, 
        imageId: newimageId
    }; 
 console.log("resd",updatedItem);  
 try {

  const response = await axios.put(`${base_url2}/product/categoryUpdate/${item.categoryId}`, updatedItem, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  });
  console.log("API Response:", response.data);
  setData(prevData => 
    prevData.map(cat =>
      cat.categoryId === item.categoryId ? response.data : cat
    )
  );

  setEditsuppliesId(null);

} catch (error) {
  // Handle errors
  console.error("Error updating item:", error);
  setEditsuppliesId(null);
}
};

const DeleteOnClick = async (item) => {

  try {
    const result = await axios.put(
      `${base_url2}/product/deleteCatagory/${item.categoryId}`,{active:false},{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    );

    if (result.data === 'Deleted successfully') {
      const updatedOrderItems = props.categoryProducts.filter(itm => itm.categoryId !== item.categoryId);
      setData(updatedOrderItems);
    } else {
      console.log(result.data);
    }
  } catch (error) {
    setError(error);
    console.error(error); 
  }
};

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 500, itemsToShow: 2 },
  { width: 768, itemsToShow: 4, itemToScroll: 4 },
  { width: 1100, itemsToShow: 5, itemToScroll: 5 },
];

  return (
    <>
 <div class="h-[24rem] overflow-auto">
 <CardWrapper>
<Carousel
    // ref={carouselRef}
    pagination={false}
    breakPoints={breakPoints}
    style={{ minHeight: "6em", justifyContent: "center" }}
    class="w-2/12 mt-8 ml-margin10"
    // onNextEnd={next}
    // onPrevEnd={previous}
                   >

{data.map((item, index) => {
                 const currentdate = dayjs().format("YYYY/MM/DD");
                 const date = dayjs(item.creationDate).format("YYYY/MM/DD");
                
                 return (
                  <CardElement >
                    <div  key={item.categoryId} className="card-element">
<div class=" h-[18rem] flex-col flex bg-[cornsilk] items-center scale-90 hover:scale-95 ease-in  duration-500 hover:shadow-lg  w-[18rem] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 object-cover object-center max-sm:w-48 flex-grow-3 md:flex-grow-0">
<div class="mt-1"> 
{editsuppliesId === item.categoryId ? (
                            <Input
                            style={{ width: "3rem" }}
                            value={item.categoryName}
                            onChange={(e) => handleInputChange(e.target.value, item.categoryId, 'categoryName')}
                          />
                      
                       
                    ) : (
                      <Tooltip title={item.categoryName} placement="top" arrow>
                      <Header>{item.categoryName || ""}</Header> 
                    </Tooltip>
                    )}

</div>
<div class="max-sm:mr-0 md:flex  my-2 h-hwk flex-col">
                              <div class="object-cover object-center  flex items-center">
                                <div>
                                {editsuppliesId === item.categoryId ? (
    
    <EditUpload
    imageId={item.imageId}
    imgWidth={100}
    imgHeight={100}
    getImage={handleSetImage}
  />
                       
                    ) : (
                            <img
                                        src={`${base_url}/image/${item.imageId}`} alt=""
                                        style={{ height: "7rem", width: "7rem" }}
                                    />
)}
                                     </div>
                                                      </div>  
                                                                                                   
                                                      <div class="w-40  flex justify-between max-sm:flex items-center  flex-col">                                             
                                                      <h3 class=" mt-2 h-4 font-bold text-xs ">
                                                        {item.model} &nbsp;&nbsp;&nbsp;
                                                        {dayjs(item.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                        >
                                         {translatedMenuItems[6]} {/* New */}
                                        </span> : null}
                                                      </h3>
                                                      <h3 class=" mt-2 h-4 font-bold text-xs ">
                                                      <ProductCategoryPUnblishToggle item={item}    publishInd={item.publishInd}  categoryId={item.categoryId}/>
                                                      </h3> 
                                                    </div>
                                                    </div>                                           
                                                      <div class="mt-px flex  justify-end w-wk m-5 items-center">
        
                                <div><CircleNotificationsIcon className="!cursor-pointer" onClick={() => {
                                setOpen(true);
                                handleParticularRowData(item);
                              }}/></div>

                                                              <div>
                              <Popconfirm
                                title="Do you want to delete?"
                                onConfirm={() => DeleteOnClick(item)}
                              >

<DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                              </Popconfirm>
                            </div>
                                                          <div className=" flex   max-sm:flex-row  max-sm:justify-between ">
    {editsuppliesId === item.categoryId ? (
                        <>
                      <Button 
                      type="primary"
                    //   loading={props.updatingOrdrSuplrItems}
                      onClick={() => handleSave(item)}
                      >
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.categoryId)} className="ml-[0.5rem]"
                        >
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] "
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.categoryId)}
                      />
                    )}
    </div> 
</div>
                   </div>
                   </div>
                 </CardElement>
                );
              })}

</Carousel>
</CardWrapper> 
 </div>
    
      <Suspense fallback={"Loading"}>
      <CategoryProductModal
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
          categoryProductModal={categoryProductModal}
          handleCategoryModal={handleCategoryModal}
        />
        <ProductAddQualityCheckModal
translateText={props.translateText}
selectedLanguage={props.selectedLanguage}
setOpen={setOpen}
open={open}
particularDiscountData={particularDiscountData}
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
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media only screen and (max-width: 600px) {
    justify-content: center;
    flex-direction: column;
  }
`;
const CardElement = styled.div`

  /* border:2px solid orange */
   padding: 0 10px;
   margin-top: 2.5em;
  display: flex;
    justify-content: center;
  /* margin:0px 20px; */
  @media only screen and (max-width: 600px) {
    display: flex;
    padding:0;
    margin-top: 1rem;
    justify-content: center;
    width: 100%;
  }
`;
const Header = styled.div`
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1.3em;
  font-family: Poppins;
  font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%
text-align:center
  }
`;
const Desc = styled.p`
  height: 1.5em;
  overflow: hidden;
  padding: 1%;
  text-align: center;
`;
const Desc2 = styled.p`
  height: 60px;
  overflow: auto;
  color: white;
  padding: 3%;
  text-align: center;
`;