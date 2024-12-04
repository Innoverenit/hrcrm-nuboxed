import React, { useEffect, useState, lazy, suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliersPriceList,
  emptysUPPLIERSPrice,
  deleteSupplierData,
  handleUpdateSupplierModal,
  setEditSuppliers,
  updatePriceSuppliers,
  handleSuppliersPriceDrawer
} from "../SuppliersAction";
import dayjs from "dayjs";
import { Tooltip, Button, Input } from "antd";
import { BorderColor as BorderColorIcon } from "@mui/icons-material";
import { BundleLoader } from "../../../../Components/Placeholder";
const EmptyPage =lazy(()=>import("../../EmptyPage"));

function SuppliersPriceCardList(props) {
  const [editRowId, setEditRowId] = useState(null);
  const [inputPrice, setInputPrice] = useState("");

  const handleEditRow = (itemId) => {
    setEditRowId(itemId);
    setInputPrice(""); 
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setInputPrice(""); 
  };

  const handleInputChange = (e) => {
    setInputPrice(e.target.value);
  };

  const handleUpdatePrice = (item) => {
    if (inputPrice.trim() !== "") {
      props.updatePriceSuppliers({
        updatePrice: inputPrice,
        supplierId: item.supplierId,
        userId: props.userId,
        suppliesId: item.suppliesId,
        poSupplierDetailsId: item.poSupplierDetailsId,
      });
      setEditRowId(null); 
      setInputPrice(""); 
    }
  };
  const [price, setPrice] = useState("");
  const [edit, setEdit] = useState(false);
  const [row, setRow] = useState({});

  const handleRowData = (item) => {
    setRow(item);
  };

  const handlePrice = () => {
    setEdit(!edit);
  };

  const handleCallback = () => {
    setEdit(false);
    setPrice("");
  };

  const handleInputPrice = (val) => {
    setPrice(val);
  };
  useEffect(() => {
    props.emptysUPPLIERSPrice();
  }, []);

  useEffect(() => {
    props.getSuppliersPriceList(props.rowdata.supplierId);
  }, []);

  return (
    <>
      {props.fetchingSupplierPriceList ? (
        <BundleLoader />
      ) : (
        <div className="flex  sticky z-auto">
          <div className="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className="flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
              <div className="w-[9.4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">
               {/* "Name" */}
               {props.translatedMenuItems[0]}
              </div>
              <div className="w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.8rem]">
               {/* Category  */}
               {props.translatedMenuItems[26]}
              </div>
              <div className="w-[6.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[15.9rem]">
               {/* Attribute  */}
               {props.translatedMenuItems[27]}
              </div>
              <div className="w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">             
                {/* Quality    */}
                 {props.translatedMenuItems[28]}
              </div>
              <div className="w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
              {/* Price (Last PO) */}
              {`${props.translatedMenuItems[19]} (${props.translatedMenuItems[29]} PO)`}
              </div>
              <div className="w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
              {/* Price (Date) */}
               {`${props.translatedMenuItems[19]} (${props.translatedMenuItems[30]})`}
              </div>
              <div className="w-[5rem]"></div>
            </div>
            <div className="overflow-x-auto h-[75vh]">
              {props.supplierPriceList.length ? (
                props.supplierPriceList.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  return (
                    <div  className="flex flex-col rounded justify-between bg-white mt-1 p-1 h-8 items-center max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                      <div className="flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                        <div className="font-medium ml-2 flex items-center w-[15.9rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem]">
                          <div className="font-semibold text-xs  font-poppins">{item.suppliesFullName}</div>
                          &nbsp;{date === currentdate && <div className="text-xs text-[tomato] font-bold">{props.translatedMenuItems[23]}</div>}
                        </div>
                        <div className="flex  w-[13.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem]">
                          <div className=" text-xs  font-poppins">{item.categoryName}</div>
                        </div>
                        <div className="flex  w-[12.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem]">
                          <div className=" text-xs  font-poppins">{item.attributeName}</div>
                        </div>
                       <div className="flex font-medium flex-col w-[13.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem]">
                          <div className=" text-xs  font-poppins">{item.quality}</div>
                        </div>
                        <div className="flex  w-[10rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem]">
                          <div className=" text-xs  font-poppins">{item.price}</div>
                        </div>
                        {/* <div className="flex font-medium flex-col w-[18.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem]">
                          <div className="font-normal text-xs  font-poppins">{item.updatePrice}</div>
                        </div> */}
                        <div className="flex  md:w-[13rem] max-sm:justify-between w-full max-sm:flex-row">
                          <div className=" text-xs  font-poppins">
                          {editRowId === item.suppliesId ? (
                            <>
                              <Input
                                value={inputPrice}
                                type="text"
                                placeholder="Enter Price"
                                onChange={handleInputChange}
                              />
                              <Button
                                loading={props.updatePriceSupplierListItem}
                                type="primary"
                                onClick={() => handleUpdatePrice(item)}
                              >
                                {/* Add */} {props.translatedMenuItems[9]}
                              </Button>
                              <Button onClick={handleCancelEdit}>
                              {props.translatedMenuItems[31]}
                                </Button>
                            </>
                          ) : (
                            <span>{item.updatePrice} &nbsp; {dayjs(item.updateDate).format('DD/MM/YYYY')}</span>
                          )}
                          </div>
                        </div>
                        <div className="flex  md:w-[5rem] max-sm:justify-between w-full max-sm:flex-row">
                          <div className=" text-xs  font-poppins">
                          <Tooltip title={props.translatedMenuItems[20]}>
                          <BorderColorIcon
                              className="!text-icon cursor-pointer text-[tomato]"
                              onClick={() => handleEditRow(item.suppliesId)}
                            />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <suspense><EmptyPage /></suspense>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = ({ shipper, suppliers, auth }) => ({
  supplierPriceList: suppliers.supplierPriceList,
  userId: auth.userDetails.userId,
  fetchingSupplierPriceList: suppliers.fetchingSupplierPriceList,
  suppliersPriceOpenDrawer: suppliers.suppliersPriceOpenDrawer,
  fetchingSupplierPriceListError: suppliers.fetchingSupplierPriceListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  updateSupplierModal: suppliers.updateSupplierModal,
  updatePriceSupplierListItem:suppliers.updatePriceSupplierListItem,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliersPriceList,
      emptysUPPLIERSPrice,
      deleteSupplierData,
      setEditSuppliers,
      handleUpdateSupplierModal,
      handleSuppliersPriceDrawer,
      updatePriceSuppliers
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersPriceCardList);
