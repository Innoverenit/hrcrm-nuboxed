import React, { useEffect, useState } from "react";
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
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { Button, Input } from "antd";
import { BorderColor as BorderColorIcon } from "@mui/icons-material";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../Components/Placeholder";

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
        <div className="flex justify-end sticky z-auto">
          <div className="rounded-lg m-5 max-sm:m-1 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className="flex max-sm:hidden justify-between w-[100%] p-2 bg-transparent font-bold sticky top-0 z-10">
              <div className="w-[11.4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">
                <FormattedMessage id="app.name" defaultMessage="Name" />
              </div>
              <div className="w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.8rem]">
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
              <div className="w-[5rem]"></div>
            </div>
            <div className="overflow-x-auto h-[89vh]">
              {props.supplierPriceList.length ? (
                props.supplierPriceList.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  return (
                    <div  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[3rem] items-center max-sm:h-[6rem] max-sm:flex-col">
                      <div className="flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                        <div className="font-medium ml-2 flex items-center w-[15.9rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem]">
                          <div className="font-semibold text-[0.85rem] text-cardBody font-poppins">{item.suppliesFullName}</div>
                          &nbsp;{date === currentdate && <div className="text-xs text-[tomato] font-bold">New</div>}
                        </div>
                        <div className="flex font-medium flex-col w-[13.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem]">
                          <div className="font-normal text-[0.85rem] text-cardBody font-poppins">{item.categoryName}</div>
                        </div>
                        <div className="flex font-medium flex-col w-[12.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem]">
                          <div className="font-normal text-[0.85rem] text-cardBody font-poppins">{item.attributeName}</div>
                        </div>
                       <div className="flex font-medium flex-col w-[13.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem]">
                          <div className="font-normal text-[0.85rem] text-cardBody font-poppins">{item.quality}</div>
                        </div>
                        <div className="flex font-medium flex-col w-[10rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem]">
                          <div className="font-normal text-[0.85rem] text-cardBody font-poppins">{item.price}</div>
                        </div>
                        {/* <div className="flex font-medium flex-col w-[18.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem]">
                          <div className="font-normal text-[0.85rem] text-cardBody font-poppins">{item.updatePrice}</div>
                        </div> */}
                        <div className="flex font-medium flex-col md:w-[13rem] max-sm:justify-between w-full max-sm:flex-row">
                          <div className="font-normal text-[0.85rem] text-cardBody font-poppins">
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
                                Add
                              </Button>
                              <Button onClick={handleCancelEdit}>Cancel</Button>
                            </>
                          ) : (
                            <span>{item.updatePrice}</span>
                          )}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col md:w-[5rem] max-sm:justify-between w-full max-sm:flex-row">
                          <div className="font-normal text-[0.85rem] text-cardBody font-poppins">
                          <BorderColorIcon
                              className="!text-base cursor-pointer text-[tomato]"
                              onClick={() => handleEditRow(item.suppliesId)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <NodataFoundPage />
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
