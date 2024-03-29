import React, { useState, useEffect,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllProductList } from "../../Product/ProductAction";
import {  Select } from "../../../Components/UI/Elements";
import {getSearchedProduction} from "../ProductionAction";

const CreateProductionCard =lazy(()=>import("./CreateProductionCard"));
const ProductionSearchedCard =lazy(()=>import("./ProductionSearchedCard"));

const { Option } = Select;

function CreateProduction (props) {

  useEffect(()=> {
    props.getAllProductList();
    
  },[]);

  const [rowData,setRowData]=useState({});

  const producs=props.productAlls

  const [selectedValue, setSelectedValue] = useState('');

  const [showCard, setshowCard] = useState(false);

  function handleRowItem(item){
    setRowData(item)
  }
  const handleChange = (ev) => {
    setSelectedValue(ev);
      props.getSearchedProduction(ev);
      setshowCard(true)
  };

  return (
    <>

    <div class=" flex" >
                                <div class=" w-full h-full">

                                    <div class="flex justify-between">
                                    <div class=" w-[18%]">
                                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Product List</div>
      <Select value={selectedValue} onChange={handleChange}>
        {producs.map(option => {
          return <Option key={option.productId} value={option.name}>{option.name}</Option>
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
 <ProductionSearchedCard handleRowItem={handleRowItem} rowData={rowData}/> 
}
{/* <CreateProductionCard/> */}
</Suspense>

    </>
);
}

const mapStateToProps = ({product }) => ({
    productAlls: product.productAlls,
    fetchingProductBuilder: product.fetchingProductBuilder,
    addingProductBuilder:product.addingProductBuilder,
    addedProBuilder:product.addedProBuilder
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllProductList,
            getSearchedProduction,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduction);
