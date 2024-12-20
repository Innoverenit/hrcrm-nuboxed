import React, { useState,useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import MoveToggleQualityProduct from "../ProductTable/MoveToggleQualityProduct"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {createQualityProduct,getQualityProducts,deleteQualityProductData,addDragQuality,updateQualityProduct} from "../../ProductAction"
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const QualityProductForm = (props) => {
  const [qualityProducts, setQualityProducts] = useState(props.qualityProducts);
  const [form] = Form.useForm();

  const [editingIndex, setEditingIndex] = useState(null);
  const [newQualityName, setNewQualityName] = useState("");
  const [isDragAndDropEnabled, setIsDragAndDropEnabled] = useState(false);



  const [currentData, setCurrentData] = useState(false);



  const toggleDragAndDrop = () => {
    setIsDragAndDropEnabled(!isDragAndDropEnabled);
  };



  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(qualityProducts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update steps to reflect the new order
    const updatedItems = items.map((item, index) => ({
      ...item,
      steps:parseInt(`${index + 1}`) ,
    }));
    console.log(updatedItems)
    props.addDragQuality(updatedItems)

    setQualityProducts(updatedItems);
  };

  const onFinish = (values) => {
    // console.log('Input 1:', values.input1);
    // console.log('Input 2:', values.input2);
    let data={
qualityName:values.qualityName,
productId:props.particularDiscountData.productId,
steps:values.steps,
    }
    props.createQualityProduct(data)
    form.resetFields();
  };
console.log(props.particularDiscountData)


const handleEditClick = (index, qualityName) => {
  setEditingIndex(index);
  setNewQualityName(qualityName);
};

const handleSaveClick = (index,item) => {
  console.log(item)
  console.log(newQualityName)
  props.updateQualityProduct(
    {
qualityName:newQualityName,
  },
 item.qualityCheckBuilderId
)
setNewQualityName(newQualityName)
  // Call a function to save the new quality name (e.g., an API call)
  // props.saveQualityName(index, newQualityName);
  setEditingIndex(null);
};

const handleCancelClick = () => {
  setEditingIndex(null);
  setNewQualityName("");
};

// function handleSetCurrentData(item) {
//   setCurrentData(item);
//   // console.log("opp",item);
// }
useEffect(() => {
    props.getQualityProducts(props.particularDiscountData.productId);
    // setPage(page + 1);
  }, []);

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
   
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
       "1624",   //  "Serial Nos",
       "1043",   //  "Step",
       "154",   //   "Submit"
       "1078",  //  Save
       "1079",  //  Cancel
       "1259",  //  Do you want to delete?
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);
  useEffect(() => {
    // Check if data is available
    if (props.qualityProducts.length > 0) {
      // Update activeTab when data is available
      setQualityProducts(props.qualityProducts);
    }
  }, [props.qualityProducts]); 

  return (
    <>
    <div className=' flex flex-row items-center'>
    <Form form={form} name="basic" onFinish={onFinish} layout="inline">
      <Form.Item
        label= {translatedMenuItems[1]}
        // "Step"
        name="qualityName"
        rules={[{ required: true, message: 'Please input your first value!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label= {translatedMenuItems[0]}
        // "Serial Nos"
        name="steps"
        rules={[{ required: true, message: 'Please input your second value!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
        {translatedMenuItems[2]} {/* Submit */}
        </Button>
      </Form.Item>
      
    </Form> 
    <button
        onClick={toggleDragAndDrop}
        className="m-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isDragAndDropEnabled ? 'Disable Order Change' : 'Change Order'}
      </button>
      </div>
    <div className='flex sticky z-auto'>
            <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] ">
                <div className="flex w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                    <div className=""> </div>
                    <div className="md:w-[22.12rem]   max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between"> {translatedMenuItems[1]}</div>
                    <div className="md:w-[15.5rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between"> {translatedMenuItems[0]}</div>
                   
                  
                </div>
             
               

{isDragAndDropEnabled ? (
<DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="qualityProducts">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {qualityProducts.map((item, index) => (
                  <Draggable key={item.qualityCheckBuilderId} draggableId={item.qualityCheckBuilderId} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex rounded mt-1 bg-white  items-center p-1"
                      >
                        <div className="flex md:w-[36.1rem] h-8 border-l-2 border-green-500   max-sm:w-full shadow-[#a3abb980] bg-[white]">
                          <div className="flex justify-between text-xs font-semibold font-poppins">
                            {/* {item.qualityName} */}
                            {editingIndex === index ? (
                <Input
                  value={newQualityName}
                  onChange={(e) => setNewQualityName(e.target.value)}
                  onPressEnter={() => handleSaveClick(index,item)}
                />
              ) : (
                item.qualityName
              )}
                          </div>
                        </div>

                        <div className="flex md:w-26 max-sm:justify-between w-full max-sm:flex-row shadow-[#a3abb980] bg-[white]">
                          <div className="  text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {item.steps}
                          </div>
                        </div>

                        <div className="flex md:w-26 max-sm:justify-between w-full max-sm:flex-row shadow-[#a3abb980] bg-[white]">
                          <div className="  text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {/* {item.steps} */}

                            <MoveToggleQualityProduct 
                                                        // selectedZone={selectedZone}
                                                        // selectedRack={selectedRack}
                                                        item={item} 
                                                        // selectedZone={selectedZone}
                                                        // selectedRack={selectedRack}
                                                    className=' !text-icon'
                                                        />
                          </div>
                        </div>



                        <div className="flex md:w-26 max-sm:justify-between w-full max-sm:flex-row shadow-[#a3abb980] bg-[white]aQ1 ">
                          <div className="  text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {/* {item.steps} */}

                            {editingIndex === index ? (
                <>
                  <Button type="link" onClick={() => handleSaveClick(index,item)}>{translatedMenuItems[3]}</Button>
                  <Button type="link" onClick={handleCancelClick}>{translatedMenuItems[4]}</Button>
                </>
              ) : (
                <VisibilityIcon onClick={() => handleEditClick(index, item.qualityName)} />
              )} 
                          </div>
                        </div>



                        <div className="flex md:w-26 max-sm:justify-between w-full max-sm:flex-row shadow-[#a3abb980] bg-[white]">
                          <div className="  text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {/* {item.steps} */}
                            <StyledPopconfirm
            title={translatedMenuItems[5]}
            onConfirm={() => props.deleteQualityProductData(item.qualityCheckBuilderId)}
          >
   <DeleteOutlineIcon/>
   </StyledPopconfirm>
                          </div>
                        </div>

                       
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (

        <div  
       
        >
                {qualityProducts.map((item, index) => (
                  
                 
                      <div
                       
                        className="flex rounded mt-1 bg-white h-8 items-center p-1"
                      >
                        <div className="flex md:w-[36.1rem] max-sm:w-full  h-8  ml-gap border-l-2 border-green-500  shadow-[#a3abb980] bg-[white]">
                          <div className="flex justify-between text-sm font-semibold font-poppins">
                            {/* {item.qualityName} */}

                            {editingIndex === index ? (
                <Input
                  value={newQualityName}
                  onChange={(e) => setNewQualityName(e.target.value)}
                  onPressEnter={() => handleSaveClick(index,item)}
                />
              ) : (
                item.qualityName
              )}
                          </div>
                        </div>

                        <div className="flex md:w-26 max-sm:justify-between w-full max-sm:flex-row shadow-[#a3abb980] bg-[white]">
                          <div className="  text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {item.steps}
                          </div>
                        </div>

                        <div className="flex md:w-26 max-sm:justify-between w-full max-sm:flex-row shadow-[#a3abb980] bg-[white]">
                          <div className="  text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {/* {item.steps} */}

                            <MoveToggleQualityProduct 
                                                        // selectedZone={selectedZone}
                                                        // selectedRack={selectedRack}
                                                        item={item} 
                                                        // selectedZone={selectedZone}
                                                        // selectedRack={selectedRack}
                                                    className=' !text-icon' />
                          </div>
                        </div>


                        <div className="flex md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                          <div className="  text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {/* {item.steps} */}

   {/* <VisibilityIcon/> */}
   {editingIndex === index ? (
                <>
                  <Button type="link" onClick={() => handleSaveClick(index,item)}>{translatedMenuItems[3]}</Button>
                  <Button type="link" onClick={handleCancelClick}>{translatedMenuItems[4]}</Button>
                </>
              ) : (
                <VisibilityIcon onClick={() => handleEditClick(index, item.qualityName)} />
              )}
                          </div>
                        </div>



                        <div className="flex md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                          <div className="  text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {/* {item.steps} */}
                            <StyledPopconfirm
            title={translatedMenuItems[5]}
            onConfirm={() => props.deleteQualityProductData(item.qualityCheckBuilderId,props.particularDiscountData.productId)}
          >
   <DeleteOutlineIcon className='!text-icon text-red-600'/>
   </StyledPopconfirm>
                          </div>
                        </div>

                       
                      </div>
                  
                ))}
               
              </div>
      )}
            </div>
          
        </div>
      
    </>
  );
};


const mapStateToProps = ({ auth,location,departments,distributor,product }) => ({
    qualityProducts:product.qualityProducts
    });

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createQualityProduct,
            getQualityProducts,
            addDragQuality,
            deleteQualityProductData,
            updateQualityProduct
        
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QualityProductForm);
