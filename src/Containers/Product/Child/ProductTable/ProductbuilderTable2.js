import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getBuilderByProId,removeProductBuilder,updateProSupplBuilder } from "../../ProductAction";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { MultiAvatar } from "../../../../Components/UI/Elements";

function ProductbuilderTable2 (props) {

  useEffect(()=> {
    props.getBuilderByProId(props.particularDiscountData.productId);
  },[]);

  const [editedFields, setEditedFields] = useState({});
  const [editproductSupplyLinkId, setEditproductSupplyLinkId] = useState(null);

  const handleChange = (productSupplyLinkId, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [productSupplyLinkId]: {
        ...prevFields[productSupplyLinkId],
        [fieldName]: value,
      },
    }));
  };

  const handleEditClick = (productSupplyLinkId) => {
    setEditproductSupplyLinkId(productSupplyLinkId);
  };
  const handleCancelClick = (productSupplyLinkId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [productSupplyLinkId]: undefined }));
    setEditproductSupplyLinkId(null);
  };

  const handleUpdateSupplies = (suppliesId,suppliesName,description,categoryName,subCategoryName, quantity,productSupplyLinkId
    ) => {
    const data = {
      suppliesId: suppliesId, 
      // productSupplyLinkId: productSupplyLinkId,
      productId:props.particularDiscountData.productId, 
      suppliesName:editedFields[productSupplyLinkId]?.suppliesName !== undefined ? editedFields[productSupplyLinkId].suppliesName : suppliesName,
      description:editedFields[productSupplyLinkId]?.description !== undefined ? editedFields[productSupplyLinkId].description : description,
      categoryName:editedFields[productSupplyLinkId]?.categoryName !== undefined ? editedFields[productSupplyLinkId].categoryName : categoryName,
      subCategoryName: editedFields[productSupplyLinkId]?.subCategoryName !== undefined ? editedFields[productSupplyLinkId].subCategoryName : subCategoryName,                 
      quantity: editedFields[productSupplyLinkId]?.quantity !== undefined ? editedFields[productSupplyLinkId].quantity : quantity,        
                      
    };
  
    props.updateProSupplBuilder(data)
      setEditedFields((prevFields) => ({ ...prevFields, [productSupplyLinkId]: undefined }));
      setEditproductSupplyLinkId(null);
    
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
      
             {props.builderbyProductId.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "    >
<div className=" flex font-medium flex-col w-[10rem]   max-sm:w-full">
                    <div className="flex max-sm:w-full ">
                      <div>
                       
                         <MultiAvatar
                            // primaryTitle={item.name}
                            imageId={item.imageId}
                            // imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                       
                      </div>
                      <div class="w-[4%]"></div>

                      <div class="max-sm:w-full md:flex items-center">
                     
                      <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.suppliesName}
                            </div>
    </div>
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
                   {editproductSupplyLinkId === item.productSupplyLinkId ? (
                       <input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.productSupplyLinkId]?.quantity !== undefined ? editedFields[item.productSupplyLinkId].quantity : item.quantity}
                       onChange={(e) => handleChange(item.productSupplyLinkId, 'quantity', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.quantity}</div>
                      </div>
                    )}
                    </div>
  </div>
  <div class="flex flex-col w-24 max-sm:flex-row max-sm:w-[10%]">
    <div class="flex">
    {editproductSupplyLinkId === item.productSupplyLinkId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdateSupplies(item.productSupplyLinkId,item.hsn, item.name, item.description,item.categoryName, item.subCategoryName )}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.productSupplyLinkId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.productSupplyLinkId)}
                      />
                    )}
    </div>
    <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductBuilder({active:false},item.productSupplyLinkId)}
                          >
                     <Tooltip title="Delete">
                          <DeleteIcon
                           className="!text-base cursor-pointer text-[red]"
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

const mapStateToProps = ({product }) => ({
    builderbyProductId: product.builderbyProductId,
    fetchingBuilderByProductId: product.fetchingBuilderByProductId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBuilderByProId,
            removeProductBuilder,
            updateProSupplBuilder
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable2);

// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Tooltip } from "antd";
// import { StyledTable } from "../../../../Components/UI/Antd";
// import { getBuilderByProId } from "../../ProductAction";
// import { elipsize } from "../../../../Helpers/Function/Functions";

// function ProductbuilderTable2 (props) {

//   useEffect(()=> {
//     props.getBuilderByProId(props.particularDiscountData.productId);
//   },[]);


// const columns = [
//       {
//         title: "Name",
//         dataIndex: "suppliesName",
//         width: "15%",
//       },

//       {
//         title: "Description",
//         dataIndex: "description",
//         width: "20%",
//         render: (name, item, i) => {
//           return (
//             <div style={{ cursor: "pointer" }}>
//               <Tooltip title={item.description}>
//                 {elipsize(item.description || "", 70)}
//               </Tooltip>
//             </div>
//           );
//         },
//       },
//        {
//             title: "Category",
//             dataIndex: "categoryName",

//         },
//         {
//             title: "Sub Category",
//             dataIndex: "subCategoryName",
//             width: "10%"
//         },
//       {
//         title: "Unit",
//         dataIndex: "quantity",
//         width: "10%",

//       },
     
  
//     ];
// const tab = document.querySelector(".ant-layout-sider-children");
// const tableHeight = tab && tab.offsetHeight - 200;

// return (
//     <>
  
//         <StyledTable
//             rowKey="productSupplyLinkId"
//             columns={columns}
//             dataSource={props.builderbyProductId}
//             loading={props.fetchingBuilderByProductId}
//             pagination={false}
//             scroll={{ y: tableHeight }}
        
//         />
 
//     </>
// );
// }

// const mapStateToProps = ({product }) => ({
//     builderbyProductId: product.builderbyProductId,
//     fetchingBuilderByProductId: product.fetchingBuilderByProductId
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getBuilderByProId,
            
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable2);