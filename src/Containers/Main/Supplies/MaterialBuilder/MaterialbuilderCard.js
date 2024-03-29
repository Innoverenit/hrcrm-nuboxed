import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getMaterialBuilderById,removeMaterialBuilder,updateMaterialBuilder } from "../SuppliesAction";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

function MaterialbuilderCard (props) {

  useEffect(()=> {
    props.getMaterialBuilderById(props.particularDiscountData.suppliesId);
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
  
    props.updateMaterialBuilder(data)
      setEditedFields((prevFields) => ({ ...prevFields, [linkSuppliesId]: undefined }));
      setEditlinkSuppliesId(null);
    
  };

return (
    <>
  
  <div className=' flex justify-end sticky z-auto'> 
  <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Name</div>
        <div className=" md:w-[4.2rem] ">Category</div>
        <div className="md:w-[5.8rem]">Sub Category</div>
        <div className=" md:w-[4.2rem] ">Unit</div>
        <div className="w-12"></div>
            </div>
      
             {props.builderMaterialbyId.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "    >
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.suppliesName}
                            </div>
    </div>
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
                      {item.categoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.subCategoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                   {editlinkSuppliesId === item.linkSuppliesId ? (
                       <input
                       class="w-8 border-2 border-black "
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.linkSuppliesId]?.quantity !== undefined ? editedFields[item.linkSuppliesId].quantity : item.quantity}
                       onChange={(e) => handleChange(item.linkSuppliesId, 'quantity', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span> {item.quantity}</span>
                      </div>
                    )}
                    </div>
  </div>
  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
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
                      <BorderColorIcon
                      className="text-[blue] flex justify-items-center justify-center text-xs cursor-pointer"
                        onClick={() => handleEditClick(item.linkSuppliesId)}
                        // style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      />
                    )}
    </div>
    <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeMaterialBuilder({active:false},item.supplySupplyLinkId)}
                          >
                     <Tooltip title="Delete">
                          <DeleteIcon
                          className="text-base cursor-pointer text-[red]"
                           
                            // style={{
                            //   cursor: "pointer",
                            //   color: "red",
                            //   fontSize: "1rem",
                            // }}
                          />
                       </Tooltip>
                       </StyledPopconfirm>
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
  builderMaterialbyId: supplies.builderMaterialbyId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialBuilderById,
            removeMaterialBuilder,
            updateMaterialBuilder
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialbuilderCard);
