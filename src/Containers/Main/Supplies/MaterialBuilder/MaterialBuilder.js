import React, { useState, useEffect,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductHsn } from "../../../Product/ProductAction";
import {  Select } from "../../../../Components/UI/Elements";
import {getSearchedMaterialBuilder} from "../SuppliesAction";
import { BundleLoader } from "../../../../Components/Placeholder";

const MaterialbuilderCard =lazy(()=>import("./MaterialbuilderCard"));
const MaterialBuilderSearchedCard =lazy(()=>import("./MaterialBuilderSearchedCard"));

const { Option } = Select;

function MaterialBuilder (props) {

  useEffect(()=> {
    props.getProductHsn();
    
  },[]);

  const prosb=props.productHsn

  const [selectedValue, setSelectedValue] = useState('');

  const [showCard, setshowCard] = useState(false);

  const handleChange = (ev) => {
    setSelectedValue(ev);
      props.getSearchedMaterialBuilder(ev);
      setshowCard(true)
  };
  if(props.fetchingProductHsn){
    return <BundleLoader/>
  }

  return (
    <>

    <div class=" flex" >
                                <div class=" w-full h-full">

                                    <div class="flex justify-between">
                                    <div class=" w-[18%]">
                                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">HSN</div>
      <Select value={selectedValue} onChange={handleChange}>
        {prosb.map(option => {
          return <Option key={option.suppliesId} value={option.hsn}>{option.hsn}</Option>
})}
      </Select>
      </div>

        <div>
                                </div>
                                    </div>
                                </div>
                            </div>     

                            
 <Suspense fallback={"Loading"}>
{showCard &&
<MaterialBuilderSearchedCard particularDiscountData={props.particularDiscountData} searchedMaterialBuilders={props.searchedMaterialBuilders}/>
}
<MaterialbuilderCard particularDiscountData={props.particularDiscountData}/>
</Suspense>
                       
    </>
);
}

const mapStateToProps = ({product, supplies}) => ({
  productHsn: product.productHsn,
  fetchingProductHsn: product.fetchingProductHsn,
    addingProductBuilder:product.addingProductBuilder,
    addedProBuilder:product.addedProBuilder,
    searchedMaterialBuilders: supplies.searchedMaterialBuilders,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getProductHsn,
            getSearchedMaterialBuilder,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialBuilder);
