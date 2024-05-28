import React, { useState, useEffect,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductbuilder,addProductBuilder,getSearchBuilder } from "../../ProductAction";
// import {  Select } from "../../../../Components/UI/Elements";
import { Select } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";

const ProBuildSearchedCard =lazy(()=>import("./ProBuildSearchedCard"));

const { Option } = Select;

function ProductbuilderTable (props) {

  useEffect(()=> {
    props.getProductbuilder();
  },[]);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const prosb=props.productBuilder

  const [selectedValue, setSelectedValue] = useState('');

  const [showCard, setshowCard] = useState(false);

  const handleChange = (ev) => {
    setSelectedValue(ev);
      props.getSearchBuilder(ev);
      setshowCard(true)
  };

  if(props.fetchingProductBuilder){
    return <BundleLoader/>
  }



  return (
    <>

    <div class=" flex" >
                                <div class=" w-full h-full">

                                    <div class="flex justify-between">
                                    <div class={`${isMobile ? "w-wk" : "w-[18%]"}`}>
                                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">HSN</div>
                                    <Select
                                    showSearch
                // value={selectedValue}
                style={{ width: "100%" }}
                onChange={handleChange}
                placeholder="Select"
              >
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
<ProBuildSearchedCard particularDiscountData={props.particularDiscountData}/>
}
{/* <ProductbuilderTable2 particularDiscountData={props.particularDiscountData}/> */}
</Suspense>

    </>
);
}

const mapStateToProps = ({product }) => ({
    productBuilder: product.productBuilder,
    fetchingProductBuilder: product.fetchingProductBuilder,
    addingProductBuilder:product.addingProductBuilder,
    addedProBuilder:product.addedProBuilder
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductbuilder,
            addProductBuilder,
            getSearchBuilder,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);
