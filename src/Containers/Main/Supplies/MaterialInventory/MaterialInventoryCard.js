import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMaterialInventory,removeMaterialBuilder,updateMaterialBuilder } from "../SuppliesAction";

function MaterialInventoryCard (props) {

  useEffect(()=> {
    props.getMaterialInventory(props.particularDiscountData.suppliesId);
  },[]);

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
  
  <div className=' flex justify-end sticky z-auto'> 
  <div class="rounded-lg m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">
          Location
          </div>
        <div className=" md:w-[4.2rem] ">
          Unit
          {/* {props.translatedMenuItems[2]} */}
          </div>
        <div className="md:w-[5.8rem]">
         
          </div>
        <div className=" md:w-[4.2rem] ">
        
          </div>
        <div className="w-12"></div>
            </div>
      
             {props.materialInventory.map((item) => {
          return (
<div>
<div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 "    >
       
    <div className=" flex font-medium flex-col md:w-[13.1rem] max-sm:w-full  ">
    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
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
                      <div className="font-normal text-sm  font-poppins">
                        <span> {item.quantity}</span>
                      </div>
                    )}
                    </div>
  </div>
  {/* <div class="flex flex-row justify-between max-sm:flex-row max-sm:w-[10%]">
    <div>
      
    {editlinkSuppliesId === item.linkSuppliesId ? (
                        <>
                      <Button onClick={() => handleUpdateSupplies(item.linkSuppliesId,item.supplySupplyLinkId,item.suppliesName,item.description,item.categoryName,item.subCategoryName)}>
                        Save
                      </Button>
                        <Button 
                        className="ml-2"
                        onClick={() => handleCancelClick(item.linkSuppliesId)}>
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <Tooltip title="Edit">
                      <BorderColorIcon
                      className=" flex justify-items-center justify-center !text-icon cursor-pointer  text-[tomato] "
                        onClick={() => handleEditClick(item.linkSuppliesId)}
                        // style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      /></Tooltip>
                    )}
    </div>
    <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeMaterialBuilder({active:false},item.supplySupplyLinkId)}
                          >
                     <Tooltip title="Delete">
                          <DeleteOutlined
                          className="!text-icon cursor-pointer "
                          style={{
                       
                            color: "red",
                          
                          }}
                           
                          />
                       </Tooltip>
                       </StyledPopconfirm>
                       </div>
                        </div> */}
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
