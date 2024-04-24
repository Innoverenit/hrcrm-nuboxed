import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocationList, addLocationInOrder } from "../../AccountAction"
import { Button } from 'antd';

const OrderPickUpForm = () => {
    useEffect(() => {
        props.getLocationList(props.orgId);
    }, [])
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")

    const handleLocation = (val) => {
        setLocation(val)
    }
    const handleDate = (val) => {
        setDate(val)
    }
    const handleSubmit = () => {
        let data = {
            inventoryPickUpDate: date,
            transferInd: 1,
            locationId: location,
            userId: props.userId,
            orderPhoneId: props.orderPhoneId,
        }
        props.addLocationInOrder(data, props.distributorId)
    }
    return (
        <div>
            <div class="mt-[10px] flex justify-between">
                <div>
                    <label class="text-[15px] font-semibold m-[10px]">Location</label>
                    <Select
                        className="w-[350px]"
                        value={location}
                        onChange={(value) => handleLocation(value)}
                    >
                        {props.locationlist.map((a) => {
                            return <Option value={a.locationDetailsId}>{a.name}</Option>;
                        })}
                    </Select>
                </div>

                <div>
                    <label class="text-[15px] font-semibold m-[10px]">Date</label>
                    <DatePicker
                        className="w-[300]"
                        value={date}
                        onChange={(value) => handleDate(value)}
                    // disabledDate={disabledDate}

                    />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={handleSubmit}

                    >Submit</Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth, distributor }) => ({
    locationlist: distributor.locationlist,
    userId: auth.userDetails.userId,
    distributorId: distributor.distributorDetailsByDistributorId.distributorId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getLocationList,
            addLocationInOrder
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderPickUpForm);

