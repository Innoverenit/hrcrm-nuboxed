import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import {getlinkedProductWithOpportunity} from "../OpportunityAction";

const OppoProduLinkedCard = (props) => {
    useEffect(() => {
       props.getlinkedProductWithOpportunity(props.addedOpportunity.opportunityId);
    }, [])
    // const handleFinalSubmit = () => {
    //     props.addAllProductInOrder({
    //         type: "Catalogue",
    //         distributorId: props.distributorId,
    //         orderId: props.orderId,
    //         products: props.productByDistributor,
    //         userId: props.userId,
    //         createdBy: props.userId,
    //         subscriptionType: "Onetime",
    //         deliveryType: "Daily",
    //         deliveryUnit: "Instance",
    //         noOfDays: 1,
    //         orgId: props.orgId,
    //         deliveryStartDate: moment(),
    //         deliveryEndDate: moment(),
    //         subscriptionStartDate: moment()
    //     }, props.distributorId, props.orderId)
    // }
    return (
        <>
            <div className='sticky top-20 z-auto'>
                <div class="rounded-lg mx-5 my-2 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[9.41rem]">
                            <FormattedMessage
                                id="app.name"
                                defaultMessage="Name"
                            />
                        </div>
                        <div className=" md:w-[8.1rem]">
                            <FormattedMessage
                                id="app.category"
                                defaultMessage="Category"
                            />
                        </div>
                        <div className=" md:w-[11.2rem]">
                            <FormattedMessage
                                id="app.attribute"
                                defaultMessage="Attribute"
                            />
                        </div>
                        <div className="md:w-[5.8rem]">
                            <FormattedMessage
                                id="app.units"
                                defaultMessage="Units"
                            />
                        </div>
                    </div>
                    <div class="overflow-x-auto h-[38vh]">
                        {/* {props.linkedProdOppolist.map((item) => {

                            return (
                                <div >
                                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3">
                                        <div class="flex w-3/4">

                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.name}

                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.categoryName} {item.subCategoryName}

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.attributeName} {item.subAttributeName}

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.quantity}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })} */}
                    </div>
                </div>
                
            </div>

        </>
    )
}
const mapStateToProps = ({ opportunity, auth }) => ({
    linkedProdOppolist: opportunity.linkedProdOppolist,
    getlinkingProductOpportunity: opportunity.getlinkingProductOpportunity
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getlinkedProductWithOpportunity
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OppoProduLinkedCard);
