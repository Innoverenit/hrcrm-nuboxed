
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getmaterialsBySuppliesId } from "./InventoryAction";
import {getUOM} from "../../../Settings/SettingsAction"
import styled from "styled-components";
import axios from "axios";
import { Select } from "../../../../Components/UI/Elements";
import MaterialFastMovingToggle from "../MaterialById/MaterialFastMovingToggle"
import MaterialsDetailsCardViewId from "./MaterialsDetailsCardViewId";
import {getMaterialsBySuppliesId,UpdateMaterialIamge} from "../SuppliesAction";
import MaterialRecommendToggle from "../MaterialRecommendToggle";
import MaterialFifoToggle from "../MaterialFifoToggle";
import MaterialFeatureToggle from "../MaterialFeatureToggle";
import { base_url2 } from "../../../../Config/Auth";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

function MaterialsDetailsbyId(props) {

  const [sName, setsName] = useState(props.materialsBySuppliesId.suppliesName);
  const [sDesc, setsDesc] = useState(props.materialsBySuppliesId.description);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  useEffect(() => {
  
      props.getMaterialsBySuppliesId(props.particularDiscountData.suppliesId);
    props.getUOM()
  }, []);
  // useEffect(() => {
  //   if (props.materialsBySuppliesId.suppliesName) {
  //     setsName(props.materialsBySuppliesId.suppliesName);
  //   }
  // }, [props.materialsBySuppliesId]);
  useEffect(() => {
    if (props.materialsBySuppliesId.suppliesName) {
      setsName(props.materialsBySuppliesId.suppliesName);
    }
    if (props.materialsBySuppliesId.description) {
      setsDesc(props.materialsBySuppliesId.description);
    }
  }, [props.materialsBySuppliesId]);
//   if (props.fetchingProductsList) {
//     return <BundleLoader />;PD10985606347262024
//   }
const sendPutRequest =  async (item) => {
    
  try {
      const response = await axios.put(`${base_url2}/supplies/infoEdit`,item);
    
     if (response.data === 'Successfully !!!!') {
    } else {
      console.log(response.data);
    }
    } catch (error) {
      console.error("Error updating item:", error);
    }
};

const handleUpdateName = () => {
  const updatedName = {
    name:sName,
      suppliesId: props.particularDiscountData.suppliesId, // Use the updated quiz name from local state
  };
 sendPutRequest(updatedName);
  setIsEditingName(false); // Close the input box after updating
};
const handleUpdateDesc = () => {
  const updatedName = {
    description:sDesc,
      suppliesId: props.particularDiscountData.suppliesId, // Use the updated quiz name from local state
  };
 sendPutRequest(updatedName);
 setIsEditingDesc(false); // Close the input box after updating
};


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 500, itemsToShow: 2 },
  { width: 768, itemsToShow: 2, itemToScroll: 2 },
  { width: 1100, itemsToShow: 4, itemToScroll: 4 },
];
console.log(props.UOMListData)
  return (
    
    <div className="bg-[#F7F8FC]">
      <div className="flex justify-between">
 <div className="flex justify-between items-center w-[30rem]">
      <div >
        <div>
        {isEditingName ? (
        <input
          type="text"
          className="h-10 w-[10rem] text-xl"
          value={sName}
          onChange={(e) => setsName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdateName()} // Trigger update on 'Enter'
          onBlur={handleUpdateName} // Optional: Update on blur as well
          autoFocus // Focus the input automatically when editing
        />
      ) : (
        <div onClick={() => setIsEditingName(true)} className="cursor-pointer text-xl font-[Poppins]">{sName  }</div> // Click to enter edit mode
      )}
          {/* {props.materialsBySuppliesId.suppliesName} */}
          </div>
        <div class="mt-2">
          {props.materialsBySuppliesId.newSuppliesNo}
          </div>

        <div className='flex items-center mt-2 justify-center w-[w-wk]'>
        <div className="flex items-center">
        <div class="text-sm text-black w-16">
         USD 
         {props.materialsBySuppliesId ?.discounts?.[0]?.allowedDiscount}
        </div>
      </div>
      <div className="flex items-center ">
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
    <div className="flex flex-col"> 
    <div className="flex items-center justify-between w-[30rem]">

                            <div className=" flex flex-col w-[6.8rem] mr-[3rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div className="text-base">Fast Moving</div>
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialFastMovingToggle
                                   maxOdU={props.materialsBySuppliesId.maxOdU}
                                   suppliesId={props.particularDiscountData.suppliesId}
                                />
                              </div>
                            </div>
                            <div className=" flex flex-col  w-[4.8rem] mr-[3rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div className="text-base">Fulfillment</div>
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialFifoToggle
                                  fifoInd={props.fifoInd}
                                  suppliesId={props.suppliesId}
                                />
                              </div>
                            </div>
                            </div>
                            <div className="flex items-center justify-between w-[30rem]">
                            <div className=" flex flex-col w-[7.2rem] mr-[3rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
     <div className="text-base">Recommend</div>
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialRecommendToggle
                                  recomendInd={props.recomendInd}
                                  suppliesId={props.suppliesId}
                                />
                              </div>
                            </div>
                          
                            <div className=" flex flex-col mr-[3rem] w-[4.8rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div className="text-base">Featured</div>
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialFeatureToggle
                                  featureInd={props.featureInd}
                                  suppliesId={props.suppliesId}
                                />
                              </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            {isEditingDesc ? (
        <TextArea
          type="text"
          value={sDesc}
           className="h-10 w-[30rem] text-xl"
          onChange={(e) => setsDesc(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdateDesc()} // Trigger update on 'Enter'
          onBlur={handleUpdateDesc} // Optional: Update on blur as well
          autoFocus // Focus the input automatically when editing
        />
      ) : (
        <div onClick={() => setIsEditingDesc(true)} className="cursor-pointer border overflow-x-auto h-[6rem] mt-2 w-[40rem] text-sm font-[Poppins]" title=
        {sDesc}><div dangerouslySetInnerHTML={{ __html: `<p>${sDesc}</p>` }} /></div> // Click to enter edit mode
      )}
    {/* <div dangerouslySetInnerHTML={{ __html: `<p>${props.materialsBySuppliesId.description}</p>` }} /> */}
    
    <div className="p-4">
      <MaterialsDetailsCardViewId 
      UpdateMaterialIamge={props.UpdateMaterialIamge}
   materialsBySuppliesId={props.materialsBySuppliesId}
   particularDiscountData={props.particularDiscountData}
   mydata={props.UOMListData}
      />
    
      </div>
      {/* <hr class=" mt-4 w-auto ml-0 h-1 mx-auto  bg-black border-0 rounded " />
      <div class="text-sm flex justify-center  text-gray-700 bottom-0 absolute w-wk items-center" >
         © {new Date().getFullYear()} {` `}  HR Tekorero
      </div> */}
   </div>
  
  );
}
const mapStateToProps = ({ supplies,auth ,settings}) => ({
    materialsBySuppliesId: supplies.materialsBySuppliesId,
  fetchingMaterialsBySuppliesId:supplies.fetchingMaterialsBySuppliesId,
  UOMListData:settings.UOMListData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialsBySuppliesId,
      UpdateMaterialIamge,
      getUOM
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


