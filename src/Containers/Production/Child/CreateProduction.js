import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllProductList,getAllProductCatagory } from "../../Product/ProductAction";
import { Select } from "../../../Components/UI/Elements";
import { getSearchedProduction } from "../ProductionAction";
import { BundleLoader } from "../../../Components/Placeholder";
const ProductionSearchedCard = lazy(() => import("./ProductionSearchedCard"));

const { Option } = Select;

function CreateProduction(props) {

  useEffect(() => {
    props.getAllProductList();
    props.getAllProductCatagory();
  }, []);

  const [rowData, setRowData] = useState({});

  const producs = props.productAlls

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showCard, setshowCard] = useState(false);

  function handleRowItem(item) {
    setRowData(item)
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedProduct(null); // Reset selected product when category changes
  };

  const handleProductChange = (ev) => {
    setSelectedProduct(ev);
    props.getSearchedProduction(ev);
    setshowCard(true)
    setSelectedProduct('')
  };

  // const filteredProducts = props.productAlls.filter(
  //   (product) => product.categoryName === selectedCategory
  // );

  return (
    <>

      <div class=" flex" >
        <div class=" w-full h-full">
       
          {props.fetchingAllProducts ?
            <BundleLoader /> :
            <div class="flex justify-between">
              <div class="w-28">
              <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Select Category</div>
              <Select value={selectedCategory} onChange={handleCategoryChange}>
                  {props.allproducts.map(option => {
                    return <Option key={option.id} value={option.categoryName}>{option.categoryName}</Option>
                  })}
                </Select>
              </div>
              <div class=" w-[18%]">
                <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Select Product</div>
                <Select value={selectedProduct} onChange={handleProductChange}>
                  {producs.map(option => {
                    return <Option key={option.productId} value={option.productName}>{option.productName}</Option>
                  })}
                </Select>
              </div>

              <div>
              </div>
            </div>}
        </div>
      </div>


      <Suspense fallback={"Loading..."}>
        {showCard &&
          <ProductionSearchedCard handleRowItem={handleRowItem} rowData={rowData} />
        }
      </Suspense>

    </>
  );
}

const mapStateToProps = ({ product }) => ({
  productAlls: product.productAlls,
  fetchingAllProducts: product.fetchingAllProducts,
  allproducts:product.allproducts
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllProductList,
      getSearchedProduction,
      getAllProductCatagory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduction);
