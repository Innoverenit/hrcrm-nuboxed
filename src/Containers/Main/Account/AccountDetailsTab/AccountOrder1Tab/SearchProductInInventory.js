import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    getProductionOrderDetails,
    getLocationList,
    searchItemInLocation,
    getLocationByProductId
} from "../../AccountAction"
import { Select } from 'antd';
import SearchedListItems from './SearchedListItems';
const { Option } = Select;

const SearchProductInInventory = (props) => {
    console.log(props.particularRowData)

    useEffect(() => {
        props.getLocationList(props.orgId);
        props.getProductionOrderDetails(props.particularRowData.orderId)
    }, [])

    const [product, setProduct] = useState("")
    const [location, setLocation] = useState("")

    const handleSetProduct = (val) => {
        setProduct(val)
        props.getLocationByProductId(val)
    }
    const handleSetLocation = (val) => {
        setLocation(val)
        console.log(val)
        props.searchItemInLocation({
            productId: product,
            locationDetailsId: val,
            orderId: props.particularRowData.orderId,
            orgId: props.orgId
        })
    }
    const locationsName = props.locationlist.filter((item) => {
        return item.inventoryInd === true
    })
    console.log(locationsName)
    return (
        <>
            <div class=" flex justify-around">
                <div class=" w-2/5">
                    <label>Product</label>
                    <Select
                        value={product}
                        onChange={(value) =>
                            handleSetProduct(value)
                        }
                    // placeholder={`select`}
                    >
                        {props.productionOrderDetail.map((a) => {
                            return <Option value={a.productId}>{a.name}</Option>;
                        })}
                    </Select>
                </div>
                <div class=" w-2/5">
                    <label>Location</label>
                    <Select
                        value={location}
                        onChange={(value) =>
                            handleSetLocation(value)
                        }
                    // placeholder={`select`}
                    >
                        {props.locationByProduct.map((a) => {
                            return <Option value={a.locationDetailsId}>{a.locationName}</Option>;
                        })}
                    </Select>
                </div>
            </div>
            <SearchedListItems />
        </>

    )
}

const mapStateToProps = ({ distributor, auth }) => ({
    productionOrderDetail: distributor.productionOrderDetail,
    orgId: auth.userDetails.organizationId,
    locationlist: distributor.locationlist,
    locationByProduct: distributor.locationByProduct
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionOrderDetails,
            getLocationList,
            getLocationByProductId,
            searchItemInLocation
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SearchProductInInventory);


