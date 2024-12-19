import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocationList, addLocationInOrder } from "../../AccountAction"
import { Button, DatePicker, Select } from 'antd';
import dayjs from "dayjs";
const { Option } = Select;


const OrderPickupForm = (props) => {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateError, setdateError] = useState("");
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    '658', // 0 Location650
    '74', // 1 Date74
    '154', // 2 Submit
   
          ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
    useEffect(() => {
        props.getLocationList(props.orgId);
    }, [])
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")

    const handleLocation = (val) => {
        setLocation(val)
    }
    const handleDate = (val) => {
        setDate(val);
        setdateError(""); 
    }
    console.log(location)
    console.log(date)
    console.log(props.particularRowData.creationDate)

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
            orderType:"Repair"
        }
        props.addLocationInOrder(data, props.distributorId)
    }

    const givenDate = props.particularRowData.creationDate

    const disabledDate = (current, givenDate) => {
        return current && current < dayjs(givenDate).startOf('day');
    };
    return (
        <div>
            <div class="mt-2 flex ">
                <div>
                    <div class="text-sm font-semibold">{translatedMenuItems[0]}</div>
                    <Select
                        className="w-[8rem]"
                        value={location}
                        onChange={(value) => handleLocation(value)}
                    >
                        {props.locationlist.map((a) => {
                            return <Option value={a.locationDetailsId}>{a.locationName}</Option>;
                        })}
                    </Select>
                </div>

                <div class=" ml-2">
                    <div class="text-sm font-semibold m-[10px]">{translatedMenuItems[1]}</div>
                    <DatePicker
                        className="w-[8rem]"
                        value={date}
                        onChange={(value) => handleDate(value)}
                        style={{borderRight:"1px solid red"}}
                        // disabledDate={current => disabledDate(current, givenDate)}
                    />
                    {/* {dateError && <div className="text-red-500 text-sm mt-2">{dateError}</div>} */}
                </div>
                {(location.length === 0 && date.length === 0) ? null : <div>
                    <Button
                        loading={props.addingLocationInOrder}
                        type="primary"
                        onClick={handleSubmit}

                    >{translatedMenuItems[2]}</Button>
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth, distributor }) => ({
    locationlist: distributor.locationlist,
    userId: auth.userDetails.userId,
    addingLocationInOrder: distributor.addingLocationInOrder,
    orgId: auth.userDetails.organizationId,
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
)(OrderPickupForm);

