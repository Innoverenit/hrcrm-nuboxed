import React, { useState,useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {createQualityProduct,getQualityProducts,addDragQuality} from "../../ProductAction"

const QualityProductForm = (props) => {
  const [qualityProducts, setQualityProducts] = useState(props.qualityProducts);
  const [form] = Form.useForm();



  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    // const items = Array.from(qualityProducts);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    // console.log(items)

    // setQualityProducts(items);
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
  };
console.log(props.particularDiscountData)
useEffect(() => {
    props.getQualityProducts(props.particularDiscountData.productId);
    // setPage(page + 1);
  }, []);


  useEffect(() => {
    // Check if data is available
    if (props.qualityProducts.length > 0) {
      // Update activeTab when data is available
      setQualityProducts(props.qualityProducts);
    }
  }, [props.qualityProducts]); 

  return (
    <>
    <Form form={form} name="basic" onFinish={onFinish} layout="inline">
      <Form.Item
        label="Step"
        name="qualityName"
        rules={[{ required: true, message: 'Please input your first value!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Serial No"
        name="steps"
        rules={[{ required: true, message: 'Please input your second value!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    <div className='flex justify-end sticky z-auto'>
            <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.step" defaultMessage="Step" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.serialno" defaultMessage="Serial No" /></div>
                    <div className=""></div>
                  
                </div>
             
                {/* {qualityProducts.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded-xl mt-2 bg-white h-12 items-center p-3">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div className="flex justify-between text-sm  font-semibold font-poppins">
                                        {item.qualityName}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.steps}
                                    </div>
                                </div>

                              
                            </div>
                        </div>
                    );
                })} */}


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
                        className="flex rounded-xl mt-2 bg-white h-12 items-center p-3"
                      >
                        <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                          <div className="flex justify-between text-sm font-semibold font-poppins">
                            {item.qualityName}
                          </div>
                        </div>

                        <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                          <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {item.steps}
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
              
            </div>
        </div>
    </>
  );
};


const mapStateToProps = ({ auth,location,departments,distributor,product }) => ({
    // userId: auth.userDetails.userId,
    // orgId:auth.userDetails.organizationId,
    // //locationId:auth.userDetails.locationId,
    // allLoCell:location.allLoCell,
    // cellCode:location.cellCode,
    // userCell:location.userCell,
    qualityProducts:product.qualityProducts
    // departments: departments.departments,
    // userListLocation:location.userListLocation,
    // locationMachine:location.locationMachine,
    // locationMachineData:location.locationMachineData

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createQualityProduct,
            getQualityProducts,
            addDragQuality
        //   getLocationMachine,
        //   createMachinary,
        //   getLocationMachineData,
        //   createMachinaryCell
        //     getAlLoCell,
        //    getDepartments,
        //    getUserListLocation,
        //    createUserCell,
        //    getUserCell,
        //    getCellCode,
        //    deleteUserCell
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QualityProductForm);

// import React, { useState } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const initialQualityProducts = [
//   {
//     qualityName: "Quality A",
//     steps: "Step 1",
//     serialNo: "001",
//   },
//   {
//     qualityName: "Quality B",
//     steps: "Step 2",
//     serialNo: "002",
//   },
//   {
//     qualityName: "Quality C",
//     steps: "Step 3",
//     serialNo: "003",
//   },
// ];

// const QualityProductsComponent = () => {
//   const [qualityProducts, setQualityProducts] = useState(initialQualityProducts);

//   const handleOnDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(qualityProducts);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     console.log(items)

//     setQualityProducts(items);
//   };

//   return (
//     <div className='flex justify-end sticky z-auto'>
//       <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
//         <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
//           <div className=""></div>
//           <div className="md:w-[22.12rem]"><FormattedMessage id="app.step" defaultMessage="Step" /></div>
//           <div className="md:w-[15.5rem]"><FormattedMessage id="app.serialno" defaultMessage="Serial No" /></div>
//           <div className=""></div>
//         </div>

//         <DragDropContext onDragEnd={handleOnDragEnd}>
//           <Droppable droppableId="qualityProducts">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {qualityProducts.map((item, index) => (
//                   <Draggable key={item.serialNo} draggableId={item.serialNo} index={index}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="flex rounded-xl mt-2 bg-white h-12 items-center p-3"
//                       >
//                         <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
//                           <div className="flex justify-between text-sm font-semibold font-poppins">
//                             {item.qualityName}
//                           </div>
//                         </div>

//                         <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
//                           <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
//                             {item.steps}
//                           </div>
//                         </div>

//                         <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
//                           <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "2em" }}>
//                             {item.serialNo}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
//     </div>
//   );
// };

// export default QualityProductsComponent;



