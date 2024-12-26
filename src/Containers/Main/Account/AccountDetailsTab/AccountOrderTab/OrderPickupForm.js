import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLocationList, addLocationInOrder } from "../../AccountAction";
import { Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";
const { Option } = Select;
const OrderPickupForm = (props) => {
  const [dateError, setdateError] = useState("");
  useEffect(() => {
    props.getLocationList(props.orgId);
  }, []);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleLocation = (val) => {
    setLocation(val);
  };
  const handleDate = (val) => {
    setDate(val);
    setdateError("");
  };
  const handleSubmit = () => {
    if (!date) {
      setdateError("Please select a date");
      return;
    }
    let data = {
      inventoryPickUpDate: date,
      transferInd: 1,
      locationId: location,
      userId: props.userId,
      orderPhoneId: props.particularRowData.orderId,
      orderType: "Repair",
    };
    props.addLocationInOrder(data, props.distributorId);
  };
  const givenDate = props.particularRowData.creationDate;
  const disabledDate = (current, givenDate) => {
    return current && current < dayjs(givenDate).startOf("day");
  };
  return (
    <div>
      <div class="mt-2 flex ">
        <div>
          <div class="text-sm font-semibold">
            {props.translatedMenuItems[21]}
          </div>
          <Select
            className="w-[8rem]"
            value={location}
            onChange={(value) => handleLocation(value)}
          >
            {props.locationlist.map((a) => {
              return (
                <Option value={a.locationDetailsId}>{a.locationName}</Option>
              );
            })}
          </Select>
        </div>

        <div class=" ml-2">
          <div class="text-sm font-semibold m-[10px]">
            {props.translatedMenuItems[65]}
          </div>
          <DatePicker
            className="w-[8rem]"
            value={date}
            onChange={(value) => handleDate(value)}
            style={{ borderRight: "1px solid red" }}
          />
        </div>
        {location.length === 0 && date.length === 0 ? null : (
          <div>
            <Button
              loading={props.addingLocationInOrder}
              type="primary"
              onClick={handleSubmit}
            >
              {props.translatedMenuItems[84]}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth, distributor }) => ({
  locationlist: distributor.locationlist,
  userId: auth.userDetails.userId,
  addingLocationInOrder: distributor.addingLocationInOrder,
  orgId: auth.userDetails.organizationId,
  distributorId: distributor.distributorDetailsByDistributorId.distributorId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocationList,
      addLocationInOrder,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OrderPickupForm);
