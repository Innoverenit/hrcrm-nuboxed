import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Button,Input } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";

function EcomStatusItemCard (props) {
  
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    useEffect(() => {
        setData(props.statusEcomItems.orderItemInfo || []);
    }, [props.statusEcomItems.orderItemInfo]);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
             "110",//0  Name
              "14",//1 Category
              "259",//2 Attribute
              "1044",//3 Item ID
              "260",//4 Units
              "772",//5 Delivery
               "1377",//6 Shipping
              "1486",//7  Track (AWB)
              "891",//8 Ship By
              "170",// 9Edit
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);

const [RowData, setRowData] = useState("");

function handleSetRowData(item) {
    setRowData(item);
}

const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((item) =>
        item.itemId === key ? { ...item, [dataIndex]: value } : item
    );
    setData(updatedData);
};

  const handleDateChange = (e, item) => {
    const selectedDate = new Date(e.target.value);
    const deliveryDate = new Date(item.deliveryDate);

    if (selectedDate >= deliveryDate) {
        setDate(e.target.value);
    } else {   
        alert('Shipping date cannot be earlier than delivery date');
    }
};


  const handleEditClick = (itemId) => {
    setEditsuppliesId(itemId);
  };
  const handleCancelClick = (itemId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [itemId]: undefined }));
    setEditsuppliesId(null);
  };

  const handleSave = (item) => {
    console.log(item)
    const updatedItem = {
        productId:item.productId,
        orderId:props.particularRowData.orderId,
        shipBy: item.shipBy, 
        shippingDate: new Date(date).toISOString()
    };
       
//  props.updateOrdrSuplrItems(updatedItem,props.particularRowData.orderId);  
            setEditsuppliesId(null);
  };


    return (
        <>
             <div> 
                      
             <div className=' flex  w-[99%] sticky flex-col z-auto'>
             <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
             <div className=" flex rounded  max-sm:hidden w-[100%]  mt-1 p-1 bg-transparent font-bold sticky top-0 z-10">
                                    <div className="text-xs font-bold font-poppins md:w-[3rem]"> {translatedMenuItems[0]}
                                    {/* Name */}
                                    </div>
                                     <div className="text-xs font-bold font-poppins md:w-[4.5rem]"> {translatedMenuItems[1]}
                                     {/* Category */}
                                     </div>
                                        <div className="text-xs font-bold font-poppins md:w-[6.5rem]"> {translatedMenuItems[2]}
                                        {/* Attribute */}
                                        </div>
                                    <div className="text-xs font-bold font-poppins md:w-[6.5rem]"> {translatedMenuItems[3]}
                                    {/* Item ID */}
                                    </div>
                                     <div className="text-xs font-bold font-poppins md:w-[6.1rem]"> {translatedMenuItems[4]}
                                     {/* Units */}
                                     </div>
                                    <div className="text-xs font-bold font-poppins md:w-[6rem]"> {translatedMenuItems[5]}
                                    {/* Delivery */}
                                    </div>
                                    <div className=" text-xs font-bold font-poppins md:w-[6.2rem]"> {translatedMenuItems[6]}
                                    {/* Shipping */}
                                    </div>
                                    <div className="text-xs font-bold font-poppins md:w-[6rem]"> {translatedMenuItems[7]}
                                     {/* AWB */}
                                    </div>
                                   
                                   <div className="text-xs font-bold font-poppins  md:w-[5rem]"> {translatedMenuItems[8]}
                                    {/* Ship By */}
                                   </div>
                                </div>
                               <div class="overflow-y-auto h-[55vh]">

                                        {data.map((item) => {
                                            return (
                                                <div>
                                                    <div key={item.itemId}
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                                                         <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex   md:w-[6rem] max-sm:flex-row max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.productFullName}
                                                                </div>
                                                            </div>

                                                            <div className=" flex   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.category}
                                                                </div>

                                                            </div>
                                                            <div className=" flex   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.attribute}
                                                                </div>
                                                            </div>
                                                            <div className=" flex   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.newProductId}
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div className=" flex   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.unit}
                                                                </div>
                                                            </div>
                                                            <div className=" flex   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                       {item.deliveryDate=== true ? dayjs(item.deliveryDate).format("YYYY/MM/DD"): "Not Available"}       
                                                                </div>
                                                            </div>
                                                            <div className=" flex   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                 {editsuppliesId === item.itemId ? (
                                                                <input
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e,item)}
          min={dayjs(item.deliveryDate).format("YYYY-MM-DD")}
          class="border border-black rounded"
        /> ) : (
            <div className="font-normal text-xs  font-poppins">
              <div> 
              {dayjs(item.shippingDate).format("YYYY/MM/DD")}</div>
            </div>
          )}
                                                                </div>
                                                            </div>
                                                            <div className=" flex   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.shippingNo} 
                                                                </div>
                                                            </div>
                                                            <div className=" flex   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                {editsuppliesId === item.itemId ? (
                       <Input
                       style={{ width: "3rem" }}
                       value={item.shipBy}
                       onChange={(e) => handleInputChange(e.target.value, item.itemId, 'shipBy')}
                     />
                       
                    ) : (
                      <div className="font-normal text-sm  font-poppins">
                        <div> {item.shipBy}</div>
                      </div>
                    )}
                                                                     
                                                                </div>
                                                            </div>
                                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
    {editsuppliesId === item.itemId ? (
                        <>
                      <Button 
                      type="primary"
                      loading={props.updatingOrdrSuplrItems}
                      onClick={() => handleSave(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.itemId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-xl cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle={translatedMenuItems[9]}
                        iconType="edit"
                        onClick={() => handleEditClick(item.itemId)}
                      />
                    )}
    </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })}
      
                                </div>
                            </div>

                        </div>
               
        </div>
                
            
            
        </>
    );
}
const mapStateToProps = ({ myorder}) => ({

    // updatingOrdrSuplrItems:myorder.updatingOrdrSuplrItems
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // updateOrdrSuplrItems,

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EcomStatusItemCard);

