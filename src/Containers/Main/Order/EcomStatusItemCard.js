import React, { useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';
import InfiniteScroll from "react-infinite-scroll-component";
// import {updateOrdrSuplrItems} from "../MyOrder/MyOrderAction";
import { Tooltip,Button,Input,Popconfirm } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import moment from "moment";

function EcomStatusItemCard (props) {
  
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');

    useEffect(() => {
        setData(props.statusEcomItems.orderItemInfo || []);
    }, [props.statusEcomItems.orderItemInfo]);



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
                      
             <div className=' flex justify-end sticky flex-col z-auto'>
             <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
             <div className=" flex rounded  max-sm:hidden w-[99%] mt-1 p-1 bg-transparent font-bold sticky top-0 z-10">
                                    <div className=" md:w-[10rem]"><FormattedMessage
                                        id="app.name"
                                        defaultMessage="Name"
                                    /></div>
                                     <div className=" md:w-[4.5rem]"><FormattedMessage
                                       id="app."
                                        defaultMessage="Category"
                                    /></div>
                                        <div className=" md:w-[4.5rem]"><FormattedMessage
                                       id="app."
                                        defaultMessage="Attribute"
                                    /></div>
                                    <div className=" md:w-[4.5rem]"><FormattedMessage
                                       id="app.itemid"
                                        defaultMessage="Item ID"
                                    /></div>
                                     <div className=" md:w-[5.1rem]"><FormattedMessage
                                        id="app.units"
                                        defaultMessage="Units"
                                    /></div>
                                    <div className=" md:w-[5rem]"><FormattedMessage
                                        id="app.loc"
                                        defaultMessage="Delivery"
                                    /></div>
                                    <div className="md:w-[6.2rem]"><FormattedMessage
                                        id="app.shippingno"
                                        defaultMessage="Shipping "
                                    /></div>
                                    <div className=" md:w-[5rem]"><FormattedMessage
                                        id="app.awb"
                                        defaultMessage="AWB"
                                    /></div>
                                   
                                   <div className=" md:w-[5rem]"><FormattedMessage
                                        id="app."
                                        defaultMessage="Ship By"
                                    /></div>
                     
                        
                                   
                                    <div className=" md:w-[2rem]"></div>
                 
                                </div>
                               <div class="overflow-y-auto h-[65vh]">

                                        {data.map((item) => {
                                            return (
                                                <div>
                                                    <div key={item.itemId}
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                                                         <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex font-medium   md:w-[6rem] max-sm:flex-row max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.productFullName}
                                                                </div>
                                                            </div>

                                                            <div className=" flex font-medium   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.category}
                                                                </div>

                                                            </div>
                                                            <div className=" flex font-medium   md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.attribute}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium   md:w-[rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.newProductId}
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.unit}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                {moment(item.deliveryDate).format("YYYY/MM/DD")} 
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                 {editsuppliesId === item.itemId ? (
                                                                <input
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e,item)}
          min={moment(item.deliveryDate).format("YYYY-MM-DD")}
          class="border border-black rounded"
        /> ) : (
            <div className="font-normal text-sm  font-poppins">
              <div> 
              {moment(item.shippingDate).format("YYYY/MM/DD")}</div>
            </div>
          )}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.shippingNo} 
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
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
                                                            <div className=" flex font-medium  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                        tooltipTitle="Edit"
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

