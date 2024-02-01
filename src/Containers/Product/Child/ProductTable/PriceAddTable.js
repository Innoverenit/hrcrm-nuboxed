import React, { useEffect,lazy, Suspense,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrency } from "../../../Auth/AuthAction";
import { Button } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getProductCurrency,createProductCurrency,handleDiscountModal,handleOfferModal } from "../../ProductAction";

const ProductDiscountModal =lazy(()=>import("./ProductDiscountModal"));
const ProductOfferModal =lazy(()=>import("./ProductOfferModal"));

function ProductbuilderTable (props) {

  useEffect(()=> {
    props.getProductCurrency(props.particularDiscountData.productId);
    props.getCurrency();
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

  const handleUpdateSupplies = (productSupplyLinkId,hsn, name,description,categoryName,subCategoryName, quantity, 
    ) => {
    const data = {
      productSupplyLinkId: productSupplyLinkId,
      productId:props.particularDiscountData.productId, 
      hsn:editedFields[productSupplyLinkId]?.hsn !== undefined ? editedFields[productSupplyLinkId].hsn : hsn,
      suppliesName:editedFields[productSupplyLinkId]?.name !== undefined ? editedFields[productSupplyLinkId].name : name,
      description:editedFields[productSupplyLinkId]?.description !== undefined ? editedFields[productSupplyLinkId].description : description,
      categoryName:editedFields[productSupplyLinkId]?.categoryName !== undefined ? editedFields[productSupplyLinkId].categoryName : categoryName,
      subCategoryName: editedFields[productSupplyLinkId]?.subCategoryName !== undefined ? editedFields[productSupplyLinkId].subCategoryName : subCategoryName,                 
      quantity: editedFields[productSupplyLinkId]?.quantity !== undefined ? editedFields[productSupplyLinkId].quantity : quantity,        
                          
    };
  
    props.createProductCurrency(data)
      setEditedFields((prevFields) => ({ ...prevFields, [productSupplyLinkId]: undefined }));
      setEditproductSupplyLinkId(null);
    
  };

return (
    <>
        <div className=' flex justify-end sticky z-auto'> 
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Currency</div>
        <div className=" md:w-[6.1rem]">Price(B2B)</div>
        <div className=" md:w-[4.2rem] ">Price(B2C)</div>
        <div className="md:w-[5.8rem]">VAT(%)</div>
        <div className="w-12"></div>
            </div>
      
             {props.currencies.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
    >
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.currency_name}
                            </h4>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <h4 class=" text-xs text-cardBody font-poppins">
                        {item.price} 
                    </h4>
    
    </div> 
 
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <h4 class=" text-xs text-cardBody font-poppins">
                      
                      {item.price}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.VAT}
                    </h4>
    </div>
    
    <div class="flex md:items-center"> 
    
    {/* <div className=" flex font-medium flex-col  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
    <Button
    className="bg-[teal] text-xs"
                  type="primary"
                  shape="round"
                  onClick={() => {
                    props.handleDiscountModal(true);
                    // handleParticularRowData(item);
                  }}
                >
                  Discount
                </Button>            
</div>  */}
{/* <div className=" flex font-medium flex-col  md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">

<Button
                                    type="primary"
                                    shape="round"
                                    style={{
                                        backgroundColor: "Tomato",
                                        color: "white",
                                        fontSize: "11px",
                                    }}
                                    onClick={() => {
                                        handleOfferModal(true);
                                    }}
                                >
                                    Offer
                                </Button>

</div>  */}
 <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
    <div>
    {editproductSupplyLinkId === item.productSupplyLinkId ? (
                        <>
                      <Button onClick={() => handleUpdateSupplies(item.productSupplyLinkId,item.hsn, item.name, item.description,item.categoryName, item.subCategoryName )}>
                        Save
                      </Button>
                        <Button onClick={() => handleCancelClick(item.productSupplyLinkId)} style={{ marginLeft: '0.5rem' }}>
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.productSupplyLinkId)}
                        style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      />
                    )}
    </div>
  
                        </div>
</div>

</div>
</div>
          );
        })}
             
              </div>
              </div>




              <Suspense fallback={"Loading"}>
<ProductDiscountModal
                addDiscountModal={props.addDiscountModal}
                handleDiscountModal={props.handleDiscountModal}
                // particularDiscountData={particularDiscountData}
            />
            <ProductOfferModal
                addProductOfferModal={props.addProductOfferModal}
                handleOfferModal={props.handleOfferModal}
                // particularDiscountData={particularDiscountData}
            />
            </Suspense>
    </>
);
}

const mapStateToProps = ({product,auth }) => ({
    ProductCurrency: product.ProductCurrency,
    fetchingProductCurrency: product.fetchingProductCurrency,
    addDiscountModal: product.addDiscountModal,
    addProductOfferModal: product.addProductOfferModal,
    currencies:auth.currencies
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getProductCurrency,
          createProductCurrency,
            handleDiscountModal,
            handleOfferModal,
            getCurrency
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);

// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Input, Popconfirm, Button, Form,Typography } from "antd";
// import { StyledTable } from "../../../../Components/UI/Antd";
// import { getProductbuilder,addProductBuilder,handleDiscountModal,handleOfferModal } from "../../ProductAction";
// import { EditOutlined } from "@ant-design/icons";
// import { Select } from "../../../../Components/UI/Elements";
// import ProductDiscountModal from "./ProductDiscountModal";
// import ProductOfferModal from "./ProductOfferModal";

// const { Option } = Select;
// const ButtonGroup = Button.Group;

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = <Input />;
//   return (
//       <td {...restProps}>
//           {editing && inputType === "picker"  ? (
//               <Form.Item
//                   name={dataIndex}
//                   style={{
//                       margin: 0,
//                   }}
//                   rules={[
//                       {
//                           required: true,
//                           message: `Please Input ${title}!`,
//                       },
//                   ]}
//               >
//                   {inputNode}
//               </Form.Item>
//           ) : editing && inputType !== "picker" ? (
//               <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           <Select>
//             {["USD", "EURO","GBP","INR"].map((item) => {
//               return <Option value={item}>{item} </Option>;
//             })}
//           </Select>
//         </Form.Item>
//     ):(
//               children
//           )}
//       </td>
//   );
// };

// function ProductbuilderTable (props) {

//   useEffect(()=> {
//     props.getProductbuilder();
//   },[]);

//   const [form] = Form.useForm();
//   const [data, setData] = useState([]);
//   const [editingKey, setEditingKey] = useState('');

//   useEffect(() => {
//       setData(props.productBuilder)
//   }, [props.productBuilder])

//   const isEditing = (record) => record.suppliesId === editingKey;

//   const edit = (record) => {
//       form.setFieldsValue({
//           quantity: '',
//           subCategoryName: '',
//           categoryName: '',
//           attributeName: '',
         
//           ...record,
//       });
//       setEditingKey(record.suppliesId);
//   };

//   const cancel = () => {
//       setEditingKey('');
//   };
//   const save = async (key) => {
//       try {
//           const row = await form.validateFields();
//           const newData = [...data];
//           const index = newData.findIndex((item) => key === item.suppliesId);
//           if (index > -1) {
//               // alert("if");
//               const item = newData[index];
//               console.log(item)
//               newData.splice(index, 1, { ...item, ...row });
//               const a = newData[index];
              
//                   props.addProductBuilder(
//                       {
//                           quantity: a.quantity,
//                           subCategoryName: a.subCategoryName,
//                           categoryName: a.categoryName,
//                           attributeName: a.attributeName,
//                           subAttributeName:a.subAttributeName,
//                           suppliesId: a.suppliesId,
//                           productId:props.particularDiscountData.productId,
//                           creationDate:a.creationDate,
//                           suppliesName:a.name,
//                       }, 
//                   );

//               setEditingKey('');
//           } else {
//               alert("else");
//               newData.push(row);
//               // setData(newData);
//               setEditingKey('');
//           }
//       } catch (errInfo) {
//           console.log('Validate Failed:', errInfo);
//       }
//   };


// const columns = [
//     {
//         title: "",
//         dataIndex: "",
//         width: "2%",
//       },
//       {
//         title: "Country",
//         dataIndex: "country",
//         width: "15%",

//       },
//       {
//         title: "Price(B2B)",
//         dataIndex: "price",
//         width: "15%",
//       },
//       {
//         title: "Price(B2C)",
//         dataIndex: "price",
//         width: "15%",
//       },
//        {
//             title: "VAT",
//             dataIndex: "VAT",

//         },
//         {
//             title: "",
//             width: "12%",
//             render: (name, item, i) => {
//                 return (
                    
//                                   <Button
//                   type="primary"
//                   shape="round"
//                   style={{
//                     backgroundColor: "teal",
//                     // backgroundColor: "Yellow",
//                     fontSize: "11px",
//                   }}
//                   onClick={() => {
//                     props.handleDiscountModal(true);
//                     // handleParticularRowData(item);
//                   }}
//                 >
//                   Discount
//                 </Button>            
//                 )          
//             },
//         },
//         {
//             title: "",
//             width: "12%",
//             render: (name, item, i) => {
//                 return (
                   
//                                 <Button
//                                     type="primary"
//                                     shape="round"
//                                     style={{
//                                         backgroundColor: "Tomato",
//                                         color: "white",
//                                         fontSize: "11px",
//                                     }}
//                                     onClick={() => {
//                                         handleOfferModal(true);
//                                         // handleParticularRowData(item);
//                                     }}
//                                 >
//                                     Offer
//                                 </Button>
//                             ) 
//             },
//         },
//       {
//         title: '',
//         width: "6%",
//         dataIndex: 'operation',
//         render: (_, record) => {
//             const editable = isEditing(record);
//             return editable ? (
//                 <span>
//                     <Typography.Link
//                         onClick={() =>
//                             save(record.suppliesId)
//                             // alert("Save success")
//                         }
//                         style={{
//                             marginRight: 8,
//                         }}
//                     >
//                         Save
//                     </Typography.Link>
//                     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                         <a>Cancel</a>
//                     </Popconfirm>
//                 </span>
//             ) : (
//                 <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//                     <EditOutlined />
//                 </Typography.Link>
//             )
//         },
//     },
//     ];
// const tab = document.querySelector(".ant-layout-sider-children");
// const tableHeight = tab && tab.offsetHeight - 200;
// const mergedColumns = columns.map((col) => {
//   if (!col.editable) {
//       return col;
//   }

//   return {
//       ...col,
//       onCell: (record) => ({
//           record,
//           inputType: col.dataIndex === 'currency1' ? 'text' : 'picker',
//           dataIndex: col.dataIndex,
//           title: col.title,
//           editing: isEditing(record),
//       }),
//   };
// });
// return (
//     <>
//      <Form form={form} component={false}>
//         <StyledTable
//             rowKey="suppliesId"
//             // columns={columns}
//             dataSource={data}
//             loading={props.fetchingProductBuilder}
//             pagination={false}
//             scroll={{ y: tableHeight }}
//             components={{
//               body: {
//                   cell: EditableCell,
//               },
//           }}
//           columns={mergedColumns}
//           rowClassName="editable-row"
//         />
// </Form>
// <ProductDiscountModal
//                 addDiscountModal={props.addDiscountModal}
//                 handleDiscountModal={props.handleDiscountModal}
//                 // particularDiscountData={particularDiscountData}
//             />
//             <ProductOfferModal
//                 addProductOfferModal={props.addProductOfferModal}
//                 handleOfferModal={props.handleOfferModal}
//                 // particularDiscountData={particularDiscountData}
//             />
          
           
    

//     </>
// );
// }

// const mapStateToProps = ({product }) => ({
//     productBuilder: product.productBuilder,
//     fetchingProductBuilder: product.fetchingProductBuilder,
//     addDiscountModal: product.addDiscountModal,
//     addProductOfferModal: product.addProductOfferModal,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getProductbuilder,
//            
//             handleDiscountModal,
//             handleOfferModal,
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);
