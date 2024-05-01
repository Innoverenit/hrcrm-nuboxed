import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSuppliersPriceList, emptysUPPLIERSPrice ,deleteSupplierData,
  handleUpdateSupplierModal,setEditSuppliers,
  handleSuppliersPriceDrawer} from "../SuppliersAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import EuroIcon from '@mui/icons-material/Euro';
import { DeleteOutlined } from "@ant-design/icons";
import {Popconfirm,Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from 'react-router-dom';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import UpdateSupplierModal from "./UpdateSupplierModal";
import SupplierPriceModal from "./SupplierPriceModal";
import { BundleLoader } from "../../../../Components/Placeholder";

function SuppliersPriceCardList(props) {
  const [editItemId, setEditItemId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);

  const handleEditItem = (itemId) => {
    setEditItemId(itemId);

    const currentItem = props.supplierPriceList.find(item => item.poSupplierSuppliesId === itemId);
    if (currentItem) {
      setEditedValues({
        ...editedValues,
        [itemId]: { ...currentItem }
      });
    }
  };
  const handleSaveItem = (itemId) => {
 
    if (editedValues[itemId]) {
      props.updateSupplierItem(itemId, editedValues[itemId]);
    }
    setEditItemId(null);
    setEditedValues({});
  };
  
  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditedValues({});
  };
  
  useEffect(() => {
    // setPage(page + 1);
    props.getSuppliersPriceList(props.rowdata.supplierId);
  }, []);


  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  // const handleLoadMore = () => {
  //   const PageMapd = props.supplierPriceList && props.supplierPriceList.length &&props.supplierPriceList[0].pageCount
  //   setTimeout(() => {
  //     const {
  //       getSuppliersPriceList,

  //       userId
  //     } = props;
  //     if  (props.supplierPriceList)
  //     {
  //       if (page < PageMapd) {
  //         setPage(page + 1);
  //         getSuppliersPriceList(userId, page);
  //     }
  //     if (page === PageMapd){
  //       setHasMore(false)
  //     }
  //   }
  //   }, 100);
  // };

  useEffect(() => {
    props.emptysUPPLIERSPrice();
  }, []);

  if (props.fetchingSupplierPriceList) {
    return <BundleLoader />;
  }
  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden justify-between w-[100%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[15.4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
            <div className=" w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.8rem]">
              <FormattedMessage id="app.category" defaultMessage="Category" />
            </div>
          
            <div className="w-[6.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[15.9rem]">
              <FormattedMessage id="app.attribute" defaultMessage="Attribute" />

            </div>
            <div className="w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
              <FormattedMessage id="app.quality" defaultMessage="Quality" />

            </div>
            <div className="w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
              <FormattedMessage id="app.unitprice" defaultMessage="Price (Last PO)" />

            </div>
            <div className="w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
              <FormattedMessage id="app.priceDate" defaultMessage="Price (Date)" />

            </div>
            <div class=" w-[2rem]"></div>
          </div>
          <div class="overflow-x-auto h-[89vh]">
            {/* <InfiniteScroll
              dataLength={props.supplierPriceList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplierPriceList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"75vh"}
            > */}
              {props.supplierPriceList.length ?
                <>
                  {props.supplierPriceList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                      <>
                        <div  key={item.poSupplierSuppliesId}
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[3rem] items-center  max-sm:h-[6rem] max-sm:flex-col">
                          <div class=" flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className="font-medium ml-2  flex items-center w-[15.9rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                              <div class=" font-semibold text-[0.85rem] text-cardBody font-poppins">
                             {item.suppliesFullName}

                              </div>
                          
                                  {date === currentdate ? (
                                    <div class="text-xs  text-[tomato] font-bold"
                                    >
                                      New
                                    </div>
                                  ) : null}
                            </div>

                            
                            <div className=" flex font-medium flex-col w-[7.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">



                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.categoryName} 
                              </div>

                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[18.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.attributeName}
                              </div>

                            </div>


                            <div className=" flex font-medium flex-col w-[16.22rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.04rem] max-lg:w-[10.03rem] ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-w-[25ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
             {item.quality}
                              </div>

                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[13.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[8.05rem] max-lg:w-[6.02rem] ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.price}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col w-[7.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[4.06rem] max-lg:w-[5.61rem] ">
                            {editItemId === item.poSupplierSuppliesId ? (
                  <input
                  style={{border:"2px solid black", width:"90%"}}
                  value={editedValues[item.poSupplierSuppliesId]?.priceDate || item.priceDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEditedValues({
                      ...editedValues,
                      [item.poSupplierSuppliesId]: {
                        ...editedValues[item.poSupplierSuppliesId],
                        name: value
                      }
                    });
                  }}
              />
                 ) : (
                   <div className="font-normal text-sm text-cardBody font-poppins">
                    
                    <div>
        {item.priceDate}
        <button onClick={() => handleEditItem(item.poSupplierSuppliesId)}>Edit</button>
      </div>
                             
                   </div>
                 )}
                   {editItemId === item.poSupplierSuppliesId && (
      <>
        <button onClick={() => handleSaveItem(item.poSupplierSuppliesId)}>Save</button>
        <button onClick={handleCancelEdit}>Cancel</button>
      </>
    )}
                            </div>
                            </div>
             

                          </div>




                        </div>
                      </>
                    )
                  })}
                </> :
                !props.supplierPriceList.length &&
                  !props.fetchingSupplierPriceList ? <NodataFoundPage /> : null}
            {/* </InfiniteScroll> */}
          </div>
        </div>
      </div>

   
    </>
  )
}
const mapStateToProps = ({ shipper, suppliers, auth }) => ({
  supplierPriceList: suppliers.supplierPriceList,
  userId: auth.userDetails.userId,
  fetchingSupplierPriceList: suppliers.fetchingSupplierPriceList,
  suppliersPriceOpenDrawer:suppliers.suppliersPriceOpenDrawer,
  fetchingSupplierPriceListError: suppliers.fetchingSupplierPriceListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  updateSupplierModal:suppliers.updateSupplierModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliersPriceList,
      emptysUPPLIERSPrice,
      deleteSupplierData,
      setEditSuppliers,
      handleUpdateSupplierModal,
      handleSuppliersPriceDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersPriceCardList);