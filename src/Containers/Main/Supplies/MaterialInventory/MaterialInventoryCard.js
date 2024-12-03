import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMaterialInventory,removeMaterialBuilder,updateMaterialBuilder } from "../SuppliesAction";

function MaterialInventoryCard (props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(()=> {
    props.getMaterialInventory(props.particularDiscountData.suppliesId);
  },[]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
      "658" , //  "Location",//0
        "1077",
        "1073",
        "260",
        "824" ,
      "248",  //   "Unit",
          
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  const [editedFields, setEditedFields] = useState({});
  const [editlinkSuppliesId, setEditlinkSuppliesId] = useState(null);

  const handleChange = (linkSuppliesId, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [linkSuppliesId]: {
        ...prevFields[linkSuppliesId],
        [fieldName]: value,
      },
    }));
    console.log("linn1",linkSuppliesId)
  };
  
  const handleEditClick = (linkSuppliesId,) => 
  {
    setEditlinkSuppliesId(linkSuppliesId);
  };
  const handleCancelClick = (linkSuppliesId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [linkSuppliesId]: undefined }));
    setEditlinkSuppliesId(null);
  };

  const handleUpdateSupplies = (linkSuppliesId,supplySupplyLinkId,suppliesName,description,categoryName,subCategoryName,quantity,
    ) => {
      console.log("linn",linkSuppliesId,supplySupplyLinkId)
    const data = {
      linkSuppliesId:linkSuppliesId,
      supplySupplyLinkId: supplySupplyLinkId, 
      suppliesName:editedFields[linkSuppliesId]?.suppliesName !== undefined ? editedFields[linkSuppliesId].suppliesName : suppliesName,
      description:editedFields[linkSuppliesId]?.description !== undefined ? editedFields[linkSuppliesId].description : description,
      categoryName:editedFields[linkSuppliesId]?.categoryName !== undefined ? editedFields[linkSuppliesId].categoryName : categoryName,
      subCategoryName: editedFields[linkSuppliesId]?.subCategoryName !== undefined ? editedFields[linkSuppliesId].subCategoryName : subCategoryName,                 
      quantity: editedFields[linkSuppliesId]?.quantity !== undefined ? editedFields[linkSuppliesId].quantity : quantity,     
      suppliesId:props.particularDiscountData.suppliesId,                      
    };
  
    // props.updateMaterialBuilder(data)
      setEditedFields((prevFields) => ({ ...prevFields, [linkSuppliesId]: undefined }));
      setEditlinkSuppliesId(null);
    
  };

  const materialInventory =[]

return (
    <>
  
  <div className=' flex sticky z-auto'> 
  <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
         <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">
         {translatedMenuItems[0]} {/* Location */}
          </div>
        <div className=" md:w-[4.2rem] ">
        {translatedMenuItems[1]}  {/* Unit */}
          {/* {props.translatedMenuItems[2]} */}
          </div>
        <div className="md:w-[5.8rem]">
        {translatedMenuItems[2]}
          </div>
          <div className=" md:w-[4.2rem] ">
      Batch
          </div>
        <div className=" md:w-[4.2rem] ">
        {translatedMenuItems[3]}
          </div>
        <div className="w-40">
          Best Use Before
        </div>
        <div className="w-12">
        {translatedMenuItems[4]}
        </div>
        <div className="w-12">
       Po#
        </div>
            </div>
      
             {props.materialInventory.map((item) => {
          return (
<div>
<div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 "    >
       
    <div className=" flex font-medium flex-col md:w-[13.1rem] max-sm:w-full  ">
    <div class="text-xs  font-semibold  font-poppins cursor-pointer">
                              {item.locationName}
                            </div>
    </div>
    
    
    <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs  font-poppins">
                      
                      {item.balanced}
                    </div>
    </div>
    <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs  font-semibold  font-poppins">
                      {item.subCategoryName}
                    </div>
    </div>
    <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      <div class=" text-xs  font-semibold  font-poppins">
                   {editlinkSuppliesId === item.linkSuppliesId ? (
                       <input
                       class="w-8 border-2 border-black "
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.linkSuppliesId]?.quantity !== undefined ? editedFields[item.linkSuppliesId].quantity : item.quantity}
                       onChange={(e) => handleChange(item.linkSuppliesId, 'quantity', e.target.value)}
                       />
                       
                    ) : (
                      <div className=" text-xs  font-poppins">
                        <span> {item.quantity}</span>
                      </div>
                    )}
                    </div>
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
  materialInventory: supplies.materialInventory,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialInventory,
            removeMaterialBuilder,
            updateMaterialBuilder
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialInventoryCard);
