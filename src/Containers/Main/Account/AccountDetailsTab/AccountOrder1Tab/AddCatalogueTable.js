import React, { useEffect, useState } from 'react'
import { getProductListByDistributor, addAllProductInOrder } from "../../AccountAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
import dayjs from 'dayjs'

const AddCatalogueTable = (props) => {
    useEffect(() => {
        props.getProductListByDistributor(props.distributorId, props.orderId)
    }, [])
    const handleFinalSubmit = () => {
        props.addAllProductInOrder({
            type: "Catalogue",
            distributorId: props.distributorId,
            orderId: props.orderId,
            products: props.productByDistributor,
            userId: props.userId,
            createdBy: props.userId,
            subscriptionType: "Onetime",
            deliveryType: "Daily",
            deliveryUnit: "Instance",
            noOfDays: 1,
            orgId: props.orgId,
            deliveryStartDate: dayjs(),
            deliveryEndDate: dayjs(),
            subscriptionStartDate: dayjs()
        }, props.distributorId, props.orderId)
    }
    return (
        <>
            <div className='sticky z-auto'>
                <div class="rounded m-1  p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold stickyz-10">
                        <div className=" md:w-[9.41rem]">
                           Name
                        </div>
                        <div className=" md:w-[8.1rem]">
                          Category
                        </div>
                        <div className=" md:w-[11.2rem]">
                          "Attribute
                        </div>
                        <div className="md:w-[5.8rem]">
                            Units
                        </div>
                    </div>
                    <div class="overflow-x-auto h-[38vh]">
                        {props.productByDistributor.map((item) => {

                            return (
                                <div >
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
                                        <div class="flex w-3/4">

                                            <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.name}

                                                </div>
                                            </div>

                                            <div className=" flex  md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.categoryName} {item.subCategoryName}

                                                </div>
                                            </div>
                                            <div className=" flex  md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.attributeName} {item.subAttributeName}

                                                </div>
                                            </div>
                                            <div className=" flex  md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.quantity}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>
                <div class=' flex justify-end mr-20'>
                    <Button
                        disabled={!props.productByDistributor.length}
                        type="primary"
                        loading={props.addingAllProductForOrder}
                        onClick={handleFinalSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>

        </>
    )
}
const mapStateToProps = ({ distributor, auth, inventory }) => ({
    productByDistributor: distributor.productByDistributor,
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    addingAllProductForOrder: distributor.addingAllProductForOrder
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getProductListByDistributor,
    addAllProductInOrder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueTable);
