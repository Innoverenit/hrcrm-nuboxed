import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MaterialBuilderSearchedToggle from "./MaterialBuilderSearchedToggle";

function MaterialBuilderSearchedCard (props) {

return (
    <>
  
  <div className=' flex justify-end sticky z-auto'> 
  <div class="rounded m-1 p-1 w-[99%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Name</div>
        <div className=" md:w-[4.2rem] ">Category</div>
        <div className="md:w-[5.8rem]">Sub Category</div>
        <div className=" md:w-[4.2rem] ">Unit</div>
        <div className="w-12"></div>
            </div>
      
             {props.searchedMaterialBuilders.map((item) => {
          return (
<div>
<div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 "    >
       <div class="flex">
    <div className=" flex  md:w-[13.1rem] max-sm:w-full  ">
    <div class="text-xs font-semibold  font-poppins cursor-pointer">
                              {item.name}
                            </div>
    </div>
    </div>
    
    <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs  font-poppins">
                      
                      {item.categoryName}
                    </div>
    </div>
    <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs  font-semibold  font-poppins">
                      {item.subCategoryName}
                    </div>
    </div>
    <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">  
                       {item.quantity}
                    </div>
  </div>
  <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      <MaterialBuilderSearchedToggle item={item} linkSuppliesId={item.suppliesId} 
      suppliesId={props.particularDiscountData.suppliesId}/>
      
  </div>

</div>
</div>
          );
        })}
             
              </div>
              </div>
 
    </>
);
}
const mapStateToProps = ({supplies }) => ({
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
               
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialBuilderSearchedCard);
