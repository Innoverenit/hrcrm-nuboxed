
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getmaterialsBySuppliesId } from "./InventoryAction";

import styled from "styled-components";
import { Select } from "../../../../Components/UI/Elements";
import MaterialsDetailsCardViewId from "./MaterialsDetailsCardViewId";
import {getMaterialsBySuppliesId,UpdateMaterialIamge} from "../SuppliesAction";
import "../Supplies.scss";
import img from "../../../../Assets/Images/Erp.jpg";

const { Option } = Select;

function MaterialsDetailsbyId(props) {
  useEffect(() => {
  
      props.getMaterialsBySuppliesId(props.particularDiscountData.suppliesId);
    
  }, []);

//   if (props.fetchingProductsList) {
//     return <BundleLoader />;PD10985606347262024
//   }
const puzzleDescription = `
  Elephants are the largest existing land animals! They are strong, unique in their built, and caring. Watch these
  majestic animals travel with their herd in this 3D, immersive puzzle.
  Each piece is made with great detail and quality craftsmanship doing justice to the vibrant colours that pop out
  (pun intended!) as you assemble this unique illustration. High-quality pieces that don’t break and are easy to fit.
  Develop a new hobby, or engage in some brain training as puzzles are known to stimulate the brain, and improve
  our spatial reasoning, memory, problem-solving abilities and even increase our IQ! Puzzles are also a great way
  to boost the mood, relieve stress and increase self-confidence!
  You can do it yourself, with your family and friends or even use it for gifting!
`;
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 500, itemsToShow: 2 },
  { width: 768, itemsToShow: 2, itemToScroll: 2 },
  { width: 1100, itemsToShow: 4, itemToScroll: 4 },
];

  return (
    
    <div className="bg-[#F7F8FC]">
 <div className="flex justify-between items-center w-[44rem]">
      <div >
        <div>
          {props.materialsBySuppliesId.suppliesName}
          </div>
        <div>
          {props.materialsBySuppliesId.newSuppliesNo}
          </div>

        <div className='flex items-center justify-center w-[w-wk]'>
        <div className="flex items-center justify-center">
        <div class="text-sm text-black w-16">
         USD 
         {props.materialsBySuppliesId ?.discounts?.[0]?.allowedDiscount}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div class="text-sm text-black">
        USD 
        {props.materialsBySuppliesId ?.suppliesPrices?.[0].suppliesPrice}
        </div>
      </div>
       
      
       
        </div>
      
      </div>
      {/* <div >
      <img  src={img}  className="w-[20rem]" />
      
      </div> */}
 
    </div>
    <div dangerouslySetInnerHTML={{ __html: `<p>${props.materialsBySuppliesId.description}</p>` }} />
    
    <div className="cardDs-bottom">
      <MaterialsDetailsCardViewId 
      UpdateMaterialIamge={props.UpdateMaterialIamge}
   materialsBySuppliesId={props.materialsBySuppliesId}
      />
    
      </div>
      <hr class=" mt-4 w-auto ml-0 h-1 mx-auto  bg-black border-0 rounded " />
      <div class="text-sm flex justify-center  text-gray-700 bottom-0 absolute w-wk items-center" >
         © {new Date().getFullYear()} {` `}  1Di inc
      </div>
   </div>
  
  );
}
const mapStateToProps = ({ supplies,auth }) => ({
    materialsBySuppliesId: supplies.materialsBySuppliesId,
  fetchingMaterialsBySuppliesId:supplies.fetchingMaterialsBySuppliesId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialsBySuppliesId,
      UpdateMaterialIamge
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsDetailsbyId);
const Desc= styled.div`
font-size: 1.25rem;
`;

const DescName= styled.div`
  text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    // color:white;
`;


