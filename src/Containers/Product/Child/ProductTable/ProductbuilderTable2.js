import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input,Popconfirm } from "antd";
import { getBuilderByProId,removeProductBuilder,updateProductSuplrBuilder,handleProductNotesDrawerModal } from "../../ProductAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { MultiAvatar } from "../../../../Components/UI/Elements";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { DeleteOutlined } from "@ant-design/icons";
import AddProductNotesDrawerModal from "./AddProductNotesDrawerModal";
function ProductbuilderTable2 (props) {

  useEffect(()=> {
    props.getBuilderByProId(props.particularDiscountData.productId);
  },[]);

  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState("");
  const [rowdata, setrowdata] = useState("");

  useEffect(() => {
    setData(props.builderbyProductId.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.builderbyProductId]);


  const handleChange = (suppliesId, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [suppliesId]: {
        ...prevFields[suppliesId],
        [fieldName]: value,
      },
    }));
  };
  const handleRowData = (data) => {
    setrowdata(data);
  };
  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };

  function handleSetCurrentCustomer(item) {
    setCurrentCustomer(item);
  }

  const handleEditClick = (productionBuilderId) => {
    setEditsuppliesId(productionBuilderId);
  };
  const handleCancelClick = (productionBuilderId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [productionBuilderId]: undefined }));
    setEditsuppliesId(null);
  };

  // const handleUpdateSupplies = (suppliesId,suppliesName,categoryName,subCategoryName, quantity,steps,description,productionBuilderId
  //   ) => {
  //   const data = {
  //     suppliesId:suppliesId,
  //     suppliesName:editedFields[suppliesId]?.suppliesName !== undefined ? editedFields[suppliesId].suppliesName : suppliesName,
  //     categoryName:editedFields[suppliesId]?.categoryName !== undefined ? editedFields[suppliesId].categoryName : categoryName,
  //     subCategoryName: editedFields[suppliesId]?.subCategoryName !== undefined ? editedFields[suppliesId].subCategoryName : subCategoryName,                 
  //     quantity: editedFields[suppliesId]?.quantity !== undefined ? editedFields[suppliesId].quantity : quantity,        
  //     productId:props.particularDiscountData.productId,  
  //     productionBuilderId:productionBuilderId,   
  //     steps:steps,
  //     description:description      
  //   };
  
  //   props.updateProductSuplrBuilder(data)
  //     setEditedFields((prevFields) => ({ ...prevFields, [suppliesId]: undefined }));
  //     setEditsuppliesId(null);
    
  // };
const handleSave = (key) => {
    console.log(key)
    // const targetRow = data.find((row) => row.key === key);
      // const { } = targetRow;
  
      const result = {
        hsn: key.hsn,
        suppliesName:key.suppliesName,
        attributeName:key.attributeName,
        subAttributeName:key.subAttributeName,
              categoryName:key.categoryName,
              subCategoryName:key.subCategoryName,
              quantity:key.quantity,
              productId:props.particularDiscountData.productId,
              suppliesId:key.suppliesId,
              // imageId:imageId,
              steps:key.steps,
              description:key.description,
              productionBuilderId:key.productionBuilderId
            };
      props.updateProductSuplrBuilder(result,key.productionBuilderId)
    
  };
  const {
    addDrawerProductNotesModal,
    handleProductNotesDrawerModal
  } = props;
return (
    <>
  
  <div className=' flex justify-end sticky z-auto'> 
  <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[9.5rem]">Name</div>
         <div className=" md:w-[8.2rem] ">HSN</div>
        <div className=" md:w-[8.2rem] ">Category</div>
        <div className="md:w-[9.8rem]">Attribute</div>
        <div className=" md:w-[4.21rem] ">Unit</div>
        <div className=" md:w-[3.22rem] ">Step</div>
         <div className=" md:w-[8.23rem] ">Description</div>
        <div className="w-12"></div>
            </div>
      
             {data.map((item) => {
          return (
<div key={item.productionBuilderId}>
<div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "    >
<div className=" flex font-medium  w-[9rem]   max-sm:w-full">
                    <div className="flex max-sm:w-full ">
                      <div>
                       
                         <MultiAvatar
                            imageId={item.imageId}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                       
                      </div>
                      <div class="w-[4%]"></div>

                      <div class="max-sm:w-full md:flex items-center">
                     
                      <div className=" flex font-medium  md:w-[8.1rem] max-sm:w-full  ">
    <div class="text-xs text-cardBody   font-poppins cursor-pointer">
                              {item.suppliesName}
                            </div>
    </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex font-medium  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
                      {item.hsn}
                     
                    </div>
    </div>

    <div className=" flex font-medium  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
                      {item.categoryName}{item.subCategoryName}
                     
                    </div>
    </div>
    <div className=" flex font-medium  md:w-[10.21rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs text-cardBody   font-poppins">
        {item.attribute}{item.subattribute}
       
                    </div>
    </div>
    <div className=" flex font-medium  md:w-[4.22rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                   {editsuppliesId === item.productionBuilderId ? (
                       <Input
                       style={{ width: "3rem" }}
                       value={item.quantity}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'quantity')}
                     />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.quantity}</div>
                      </div>
                    )}
                    </div>
  </div>
  <div className=" flex font-medium  md:w-[4.23rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                   {editsuppliesId === item.productionBuilderId ? (
                                         <Input
                                         style={{ width: "3rem" }}
                                         value={item.steps}
                                         onChange={(e) => handleInputChange(e.target.value, item.key, 'steps')}
                                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.steps}</div>
                      </div>
                    )}
                    </div>
  </div>
  <div className=" flex font-medium  md:w-[6.24rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                   {editsuppliesId === item.productionBuilderId ? (
                                             <Input
                                             style={{ width: "3rem" }}
                                             value={item.description}
                                             onChange={(e) => handleInputChange(e.target.value, item.key, 'description')}
                                           />
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <Tooltip title={item.description}>
                        <div> {item.description}</div>
                        </Tooltip>
                      </div>
                    )}
                    </div>
  </div>
  <div class="flex flex-col w-8 max-sm:flex-row max-sm:w-[10%]">
    <div class="flex">
    {editsuppliesId === item.productionBuilderId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleSave(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.productionBuilderId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.productionBuilderId)}
                      />
                    )}
    </div>
    <div>
      <Popconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductBuilder(item.productionBuilderId,props.particularDiscountData.productId)}

                          >
                     <Tooltip title="Delete">
                          <DeleteOutlined
                           className=" !text-base cursor-pointer !text-[red]"
                          />
                       </Tooltip>
                       </Popconfirm>
                       </div>
                       
                       
                        </div>
                        <div>
                          <Tooltip title="Notes">
                            <NoteAltIcon
                              className=" !text-xl cursor-pointer text-[#4bc076]"
                              onClick={() => {
                                handleProductNotesDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}

                            />
                          </Tooltip>

                        </div>
</div>
</div>
          );
        })}
             
              </div>
              </div>
 
              <AddProductNotesDrawerModal
        rowdata={rowdata}
       addDrawerProductNotesModal={addDrawerProductNotesModal}
        handleProductNotesDrawerModal={handleProductNotesDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />

    </>
);
}

const mapStateToProps = ({product }) => ({
    builderbyProductId: product.builderbyProductId,
    fetchingBuilderByProductId: product.fetchingBuilderByProductId,
    addDrawerProductNotesModal:product.addDrawerProductNotesModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBuilderByProId,
            removeProductBuilder,
            updateProductSuplrBuilder,
            handleProductNotesDrawerModal
            
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
//             rowKey="suppliesId"
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