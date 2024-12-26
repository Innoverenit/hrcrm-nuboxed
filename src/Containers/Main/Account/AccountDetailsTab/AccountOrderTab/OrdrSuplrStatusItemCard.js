import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  updateOrdrSuplrItems,
  getLocationNamesByProductId,
} from "../../AccountAction";
import { Tooltip, Button, Input, Select } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import { base_url2 } from "../../../../../Config/Auth";
import axios from "axios";
const { Option } = Select;
function OrdrSuplrStatusItemCard(props) {
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setData(props.statusItems.orderItemInfo || []);
  }, [props.statusItems.orderItemInfo]);

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
      alert("Shipping date cannot be earlier than delivery date");
    }
  };
  const handleSelectChange = (value, key, dataIndex) => {
    const updatedData = data.map((item) =>
      item.itemId === key ? { ...item, [dataIndex]: value } : item
    );
    setData(updatedData);
  };

  const handleEditClick = (item, itemId) => {
    setEditsuppliesId(itemId);
    props.getLocationNamesByProductId(item.productId);
  };
  const handleCancelClick = (itemId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [itemId]: undefined }));
    setEditsuppliesId(null);
  };

  const handleSave = (item) => {
    console.log(item);
    const updatedItem = {
      productId: item.productId,
      orderId: props.particularRowData.orderId,
      shipBy: item.locationId,
      shippingDate: new Date(date).toISOString(),
      locationId: item.locationId,
      shippingNo: item.shippingNo,
    };

    console.log("resd", updatedItem);
    props.updateOrdrSuplrItems(updatedItem, props.particularRowData.orderId);
    setEditsuppliesId(null);
  };

  const [drb, setDrb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //       const fetchData = async () => {
  //           setLoading(true);
  //           try {
  //               const response = await axios.get(`${base_url2}/po/getPoStock/locationList/PD10985606347262024`,{
  //                   headers: {
  //                     Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //                   },
  //                 });
  //               if (response.drb.length === 0) {

  //               }
  //               setDrb(prevData => [...prevData, ...response.drb]);
  //           } catch (error) {
  //               setError(error);
  //               console.error('Error fetching data:', error);
  //           } finally {
  //               setLoading(false);
  //           }
  //       };

  //       fetchData();
  //   }, []);

  const stss = [
    {
      stsid: "3434",
      stsnm: "ADASd",
    },
    {
      stsid: "4556",
      stsnm: "Ddsgfh",
    },
  ];
  return (
    <>
      <div>
        <div className=" flex justify-end sticky flex-col z-auto">
          <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className=" flex rounded  max-sm:hidden w-[100%]  mt-1 p-1 bg-transparent font-bold sticky top-0 z-10">
              <div className=" md:w-[10rem]">
                {props.translatedMenuItems[122]}
              </div>
              <div className=" md:w-[4.5rem]">
                {props.translatedMenuItems[31]}
              </div>
              <div className=" md:w-[4.5rem]">
                {props.translatedMenuItems[123]}
              </div>
              <div className=" md:w-[4.5rem]">
                {props.translatedMenuItems[129]} ID
              </div>
              <div className=" md:w-[5.1rem]">
                {props.translatedMenuItems[125]}
              </div>
              <div className=" md:w-[5rem]">
                {props.translatedMenuItems[20]}
              </div>
              <div className="md:w-[6.2rem]">
                {props.translatedMenuItems[130]}
              </div>
              <div className=" md:w-[5rem]">AWB</div>
              <div className=" md:w-[6.5rem]">
                {props.translatedMenuItems[131]}
              </div>
              <div className="md:w-[2rem]"></div>
            </div>
            <div class="overflow-y-auto h-[65vh]">
              {data.map((item) => {
                const date =
                  item && item.deliveryDate
                    ? dayjs(item.deliveryDate).format("YYYY/MM/DD")
                    : "";
                const date1 =
                  item && item.shippingDate
                    ? dayjs(item.shippingDate).format("YYYY/MM/DD")
                    : "";
                return (
                  <div>
                    <div
                      key={item.itemId}
                      className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  "
                    >
                      <div class="flex max-sm:justify-between max-sm:w-wk border-green-500 bg-[#eef2f9] items-center">
                        <div className=" flex font-medium h-8  bg-[#eef2f9]  md:w-[6rem] max-sm:flex-row max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            {item.productFullName}
                          </div>
                        </div>

                        <div className=" flex font-medium  h-8 ml-gap  bg-[#eef2f9] md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            {item.category}
                          </div>
                        </div>
                        <div className=" flex font-medium h-8 ml-gap  bg-[#eef2f9]  md:w-[4.5rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            {item.attribute}
                          </div>
                        </div>
                        <div className=" flex font-medium  h-8 ml-gap  bg-[#eef2f9] md:w-[rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            {item.newProductId}
                          </div>
                        </div>
                      </div>
                      <div className=" flex font-medium h-8 ml-gap  bg-[#eef2f9]  md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.unit}
                        </div>
                      </div>
                      <div className=" flex font-medium h-8 ml-gap  bg-[#eef2f9]  md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {date}
                        </div>
                      </div>
                      <div className=" flex font-medium  h-8 ml-gap  bg-[#eef2f9] md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {editsuppliesId === item.itemId ? (
                            <input
                              type="date"
                              value={date}
                              onChange={(e) => handleDateChange(e, item)}
                              min={date}
                              class="border border-black rounded"
                            />
                          ) : (
                            <div className="font-normal text-sm  font-poppins">
                              <div>{date1}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" flex font-medium  h-8 ml-gap  bg-[#eef2f9]  md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {editsuppliesId === item.itemId ? (
                            <Input
                              style={{ width: "3rem" }}
                              value={item.shippingNo}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.value,
                                  item.itemId,
                                  "shippingNo"
                                )
                              }
                            />
                          ) : (
                            <div className="font-normal text-sm  font-poppins">
                              <div> {item.shippingNo}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className=" flex font-medium h-8 ml-gap  bg-[#eef2f9]  md:w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {editsuppliesId === item.itemId ? (
                            <Select
                              style={{ width: "100%" }}
                              placeholder="Select Location"
                              value={item.locationId}
                              onChange={(value) =>
                                handleSelectChange(
                                  value,
                                  item.itemId,
                                  "locationId"
                                )
                              }
                            >
                              {props.locationNamesByProductId.map(
                                (location) => (
                                  <Option
                                    key={location.locationId}
                                    value={location.locationId}
                                  >
                                    {location.locationName} {location.balanced}
                                  </Option>
                                )
                              )}
                            </Select>
                          ) : (
                            <div className="font-normal text-sm  font-poppins">
                              <div> {item.shipBy}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex font-medium h-8 ml-gap  bg-[#eef2f9] md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          {editsuppliesId === item.itemId ? (
                            <>
                              <Button
                                type="primary"
                                loading={props.updatingOrdrSuplrItems}
                                onClick={() => handleSave(item)}
                              >
                                {/* Save */} {props.translatedMenuItems[48]}
                              </Button>
                              <Button
                                type="primary"
                                onClick={() => handleCancelClick(item.itemId)}
                                className="ml-[0.5rem]"
                              >
                                {/* Cancel */} {props.translatedMenuItems[49]}
                              </Button>
                            </>
                          ) : (
                            <BorderColorIcon
                              className="!text-xl cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                              tooltipTitle="Edit"
                              iconType="edit"
                              onClick={() => handleEditClick(item, item.itemId)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ distributor }) => ({
  locationNamesByProductId: distributor.locationNamesByProductId,
  updatingOrdrSuplrItems: distributor.updatingOrdrSuplrItems,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateOrdrSuplrItems,
      getLocationNamesByProductId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdrSuplrStatusItemCard);
