import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input,Popconfirm } from "antd";
import { getBuilderByProId,removeProductBuilder,updateProductSuplrBuilder,handleProductNotesDrawerModal } from "../../ProductAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MultiAvatar } from "../../../../Components/UI/Elements";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddProductNotesDrawerModal from "./AddProductNotesDrawerModal";
import ContactsIcon from '@mui/icons-material/Contacts';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AttractionsIcon from '@mui/icons-material/Attractions';
import AcUnitIcon from '@mui/icons-material/AcUnit';

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

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
      "110",  //  "Name",//0
       "799", //   "HSN",//1
      "14",  //   "Category",//2
       "259", //   "Attribute",
       "254", //   "Unit",//4
      "1043",  //   "Step",5
       "147", //   "Description"  6
      "316",  // Notes
      "1078",  // Save
      "179",  // Cancel
     "170",   // "Edit"
     "1259",   // "Do you want to delete?"
      "84",  // "Delete"
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

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
const handleSave = (key) => {
    console.log(key)
  
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
  
  <div className=' flex sticky z-auto'> 
  <div class="rounded m-1 p-1  w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
         <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10 max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm   items-end ">
         
         <div className=" w-[11.5rem] truncate  text-sm text-[#00A2E8]">
         <ContactsIcon className="!text-icon mr-1 text-[#00A2E8]"/>
          {translatedMenuItems[0]}</div>
         <div className=" md:w-[8.2rem] ">{
         translatedMenuItems[1]}</div>
        <div className=" md:w-[7.2rem] ">
          <FormatListNumberedIcon className="!text-icon mr-1 text-[#42858c]" />
          {translatedMenuItems[2]}</div>
        <div className="md:w-[9.8rem]">
        <AttractionsIcon className="  !text-icon text-[#8e71ed]" /> 
        {translatedMenuItems[3]}</div>
    
        <div className=" md:w-[4.21rem] ">
        <AcUnitIcon className="  !text-icon text-[#8e71ed]" />
        {translatedMenuItems[4]}</div>
        <div className=" md:w-[3.22rem] ">{translatedMenuItems[5]}</div>
         <div className=" md:w-[10.23rem] ">{translatedMenuItems[6]}</div>
        <div className="w-12"></div>
            </div>
            <div className="z-auto" style={{ maxHeight: "500px", overflowX: "hidden",overflowY:"auto",position: "sticky", scrollbarWidth:"thin" }}>
             {data.map((item) => {
          return (
<div key={item.productionBuilderId} className="flex rounded justify-between mt-1  bg-white  items-center py-ygap max-sm:h-[9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  md:flex row-auto    max-sm:border-b-4 max-sm:border-blue-500">

<div className="flex max-sm:justify-between max-sm:w-wk items-center "    >
<div className="  flex w-[12.5rem] items-center max-sm:w-auto h-8  border-l-2 border-green-500 bg-[#eef2f9] ">
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
                     
                      <div className=" flex    md:w-[8.1rem] max-sm:w-full  ">
    <div class="text-xs  font-poppins cursor-pointer">
                              {item.suppliesName}
                            </div>
    </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex    md:w-[9.5rem] max-sm:flex-row w-full max-sm:justify-between h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto ">
    <div class=" text-xs  font-poppins">
                      
                      {item.hsn}
                     
                    </div>
    </div>

    <div className=" flex    md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
    <div class=" text-xs  font-poppins">
                      
                      {item.categoryName} {item.subCategoryName}
                     
                    </div>
    </div>
    <div className=" flex    md:w-[12.21rem] max-sm:flex-row w-full max-sm:justify-between h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto ">
      
        <div class=" text-xs    font-poppins">
        {item.attributeName} {item.subAttributeName}
       
                    </div>
    </div>
    <div className=" flex  md:w-[5.22rem] max-sm:flex-row w-full max-sm:justify-between h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
      
      <div class=" text-xs  font-bold  font-poppins">
                   {editsuppliesId === item.productionBuilderId ? (
                       <Input
                       style={{ width: "3rem" }}
                       value={item.quantity}
                       onChange={(e) => handleInputChange(e.target.value, item.key, 'quantity')}
                     />
                       
                    ) : (
                      <div className="  text-xs  font-poppins">
                        <div> {item.quantity}</div>
                      </div>
                    )}
                    </div>
  </div>
  <div className=" flex md:w-[5.23rem] max-sm:flex-row w-full max-sm:justify-between h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
      
      <div class=" text-xs  font-bold  font-poppins">
                   {editsuppliesId === item.productionBuilderId ? (
                                         <Input
                                         style={{ width: "3rem" }}
                                         value={item.steps}
                                         onChange={(e) => handleInputChange(e.target.value, item.key, 'steps')}
                                       />
                       
                    ) : (
                      <div className="  text-xs  font-poppins">
                        <div> {item.steps}</div>
                      </div>
                    )}
                    </div>
  </div>
  <div className=" flex    md:w-[10.24rem] max-sm:flex-row w-full max-sm:justify-between h-8  ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto ">
      
      <div class=" text-xs  font-bold  font-poppins">
                   {editsuppliesId === item.productionBuilderId ? (
                                             <Input
                                             style={{ width: "3rem" }}
                                             value={item.description}
                                             onChange={(e) => handleInputChange(e.target.value, item.key, 'description')}
                                           />
                    ) : (
                      <div className="  text-xs  font-poppins">
                        <Tooltip title={item.description}>
                        <div> {item.description}</div>
                        </Tooltip>
                      </div>
                    )}
                    </div>
  </div>
  <div class="flex max-sm:justify-between h-8  items-center ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.7rem] max-sm:w-auto ">
 
                        <div>
                          <Tooltip title={translatedMenuItems[7]}>
                            <NoteAltIcon
                              className=" !text-icon cursor-pointer text-[#28a355]"
                              onClick={() => {
                                handleProductNotesDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}

                            />
                          </Tooltip>

                        </div>
                        <div className=" flex    md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between  ">
    {editsuppliesId === item.productionBuilderId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleSave(item)}>
                       {translatedMenuItems[8]} {/* Save */}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.productionBuilderId)} className="ml-[0.5rem]">
                        {translatedMenuItems[9]}{/* Cancel */}
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle={translatedMenuItems[10]}
                        iconType="edit"
                        onClick={() => handleEditClick(item.productionBuilderId)}
                      />
                    )}
    </div>
  <div class="flex  w-4 max-sm:flex-row max-sm:w-[10%]">
   
    <div>
      <Popconfirm
                          title={translatedMenuItems[11]}
                          onConfirm={() => props.removeProductBuilder(item.productionBuilderId,props.particularDiscountData.productId)}

                          >
                     <Tooltip title={translatedMenuItems[12]}>
                     <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                       </Tooltip>
                       </Popconfirm>
                       </div>
                       
                       
                        </div>
                        </div>
</div>

</div>
          );
        })}
            </div>  
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