import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    getProductionOrderDetails,
    getLocationList,
    searchItemInLocation,
    getLocationByProductId
} from "../../AccountAction"
import { Input, Select } from 'antd';
import SearchedListItems from './SearchedListItems';
import { BundleLoader } from '../../../../../Components/Placeholder';
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
        }, product, val, props.particularRowData.orderId)
    }
    const locationsName = props.locationlist.filter((item) => {
        return item.inventoryInd === true
    })
    console.log(locationsName)
    return (
        <>
            {props.fetchingProductionDetailById ? <BundleLoader /> :
                <>
                    <div class=" flex justify-around">
                        <div class=" w-2/5">
                            <div class="font-bold text-xs font-poppins text-black">Product</div>
                            <Select
                                value={product}
                                onChange={(value) =>
                                    handleSetProduct(value)
                                }
                            >
                                {props.productionOrderDetail.map((a) => {
                                    return <Option value={a.productId}>{`${a.productFullName} - ${a.remainingQuantity}`}</Option>;
                                })}
                            </Select>
                        </div>
                        <div class=" w-2/5">
                            <div class="font-bold text-xs font-poppins text-black">Location</div>
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
                </>}
            <SearchedListItems
                orderId={props.particularRowData.orderId}
                productId={product}
                locationId={location}
            />
        </>

    )
}

const mapStateToProps = ({ distributor, auth }) => ({
    productionOrderDetail: distributor.productionOrderDetail,
    orgId: auth.userDetails.organizationId,
    locationlist: distributor.locationlist,
    locationByProduct: distributor.locationByProduct,
    fetchingProductionDetailById: distributor.fetchingProductionDetailById
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


